import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import CloseQuestionResponse from '../components/CloseQuestionResponse';
import OpenQuestionResponse from '../components/OpenQuestionResponse';
import { serverRequests } from '../Api';
import useGetData from '../hooks/useGetData';
import { Range, getTrackBackground } from 'react-range';

const SurveyResponses = () => {
  const { surveyCode } = useParams();
  const location = useLocation();
  const state = location.state || {};
  const { surveyTitle = 'Default Title', numberOfResponses = 0 } = state;

  const [questions, setQuestions] = useState([]);
  const [data, error, loading, setLoading] = useGetData(`surveys/${surveyCode}/questions`);

  useEffect(() => {
    if (error) {
      console.error('Error fetching questions:', error);
    } else if (data) {
      setQuestions(data);
      console.log(data);
    }
  }, [data, error]);

  const [filteredResponses, setFilteredResponses] = useState({});
  const [filters, setFilters] = useState({
    ageRange: [0, 100],
    areaID: '',
    incomeRange: [0, 100000],
    genderID: '',
    educationID: '',
    sectorID: ''
  });

  const [genders, setGenders] = useState([]);
  const [areas, setAreas] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [educationLevels, setEducationLevels] = useState([]);
  const [incomeLevels, setIncomeLevels] = useState([]);

  const [agesData, agesError, agesLoading] = useGetData('properties/ages');
  const [gendersData, gendersError, gendersLoading] = useGetData('properties/genders');
  const [areasData, areasError, areasLoading] = useGetData('properties/areas');
  const [sectorsData, sectorsError, sectorsLoading] = useGetData('properties/sectors');
  const [educationLevelsData, educationLevelsError, educationLevelsLoading] = useGetData('properties/education_levels');
  const [incomeLevelsData, incomeLevelsError, incomeLevelsLoading] = useGetData('properties/family_income_levels');

  useEffect(() => {
    if (agesData) {
      const minAge = Math.min(...agesData.map(age => age.startYear));
      const maxAge = Math.max(...agesData.map(age => age.endYear));
      setFilters(prevFilters => ({
        ...prevFilters,
        ageRange: [minAge, maxAge]
      }));
    }
  }, [agesData]);

  useEffect(() => {
    if (gendersData) setGenders(gendersData);
  }, [gendersData]);

  useEffect(() => {
    if (areasData) setAreas(areasData);
  }, [areasData]);

  useEffect(() => {
    if (sectorsData) setSectors(sectorsData);
  }, [sectorsData]);

  useEffect(() => {
    if (educationLevelsData) setEducationLevels(educationLevelsData);
  }, [educationLevelsData]);

  useEffect(() => {
    if (incomeLevelsData) {
      setIncomeLevels(incomeLevelsData);
      const minIncome = Math.min(...incomeLevelsData.map(income => income.startRange));
      const maxIncome = Math.max(...incomeLevelsData.map(income => income.endRange));
      setFilters(prevFilters => ({
        ...prevFilters,
        incomeRange: [minIncome, maxIncome]
      }));
    }
  }, [incomeLevelsData]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleRangeChange = (name, values) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: values,
    }));
  };

  useEffect(() => {
    // Implement filtering logic here based on `filters`
    // Update `filteredResponses` accordingly
  }, [filters]);

  useEffect(() => {
    setLoading(
      agesLoading ||
      gendersLoading ||
      areasLoading ||
      sectorsLoading ||
      educationLevelsLoading ||
      incomeLevelsLoading
    );
  }, [agesLoading, gendersLoading, areasLoading, sectorsLoading, educationLevelsLoading, incomeLevelsLoading]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (agesError || gendersError || areasError || sectorsError || educationLevelsError || incomeLevelsError) {
    return <p>Error loading data.</p>;
  }

  return (
    <div>
      <h2>Survey Responses for {surveyTitle}</h2>
      <p>Number of Responses: {numberOfResponses}</p>
      <div>
        <h3>Filters</h3>
        <div>
          <label>Age Range:</label>
          <Range
            values={filters.ageRange}
            step={1}
            min={filters.ageRange[0]}
            max={filters.ageRange[1]}
            onChange={(values) => handleRangeChange('ageRange', values)}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: '6px',
                  width: '100%',
                  background: getTrackBackground({
                    values: filters.ageRange,
                    colors: ['#ccc', '#548BF4', '#ccc'],
                    min: filters.ageRange[0],
                    max: filters.ageRange[1]
                  })
                }}
              >
                {children}
              </div>
            )}
            renderThumb={({ props, isDragged }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: '24px',
                  width: '24px',
                  backgroundColor: '#FFF',
                  borderRadius: '50%',
                  boxShadow: '0px 2px 6px #AAA'
                }}
              />
            )}
          />
          <span>{filters.ageRange[0]} - {filters.ageRange[1]}</span>
        </div>
        <div>
          <label>Income Range:</label>
          <Range
            values={filters.incomeRange}
            step={1000}
            min={filters.incomeRange[0]}
            max={filters.incomeRange[1]}
            onChange={(values) => handleRangeChange('incomeRange', values)}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: '6px',
                  width: '100%',
                  background: getTrackBackground({
                    values: filters.incomeRange,
                    colors: ['#ccc', '#548BF4', '#ccc'],
                    min: filters.incomeRange[0],
                    max: filters.incomeRange[1]
                  })
                }}
              >
                {children}
              </div>
            )}
            renderThumb={({ props, isDragged }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: '24px',
                  width: '24px',
                  backgroundColor: '#FFF',
                  borderRadius: '50%',
                  boxShadow: '0px 2px 6px #AAA'
                }}
              />
            )}
          />
          <span>{filters.incomeRange[0]} - {filters.incomeRange[1]}</span>
        </div>
        <div>
          <label>Area:</label>
          <select name="areaID" onChange={handleFilterChange} value={filters.areaID}>
            <option value="">Select Area</option>
            {areas.map((area) => (
              <option key={area.areaID} value={area.areaID}>{area.area}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Gender:</label>
          <select name="genderID" onChange={handleFilterChange} value={filters.genderID}>
            <option value="">Select Gender</option>
            {genders.map((gender) => (
              <option key={gender.genderID} value={gender.genderID}>{gender.gender}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Education Level:</label>
          <select name="educationID" onChange={handleFilterChange} value={filters.educationID}>
            <option value="">Select Education Level</option>
            {educationLevels.map((education) => (
              <option key={education.educationID} value={education.educationID}>{education.education_level}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Sector:</label>
          <select name="sectorID" onChange={handleFilterChange} value={filters.sectorID}>
            <option value="">Select Sector</option>
            {sectors.map((sector) => (
              <option key={sector.sectorID} value={sector.sectorID}>{sector.sector}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <h3>Questions</h3>
        {questions.map((question) => (
          <div key={question.questionCode}>
            <h4>{question.questionText}</h4>
            {question.questionType === 'close' ? (
              <CloseQuestionResponse responses={filteredResponses[question.questionCode]} />
            ) : (
              <OpenQuestionResponse responses={filteredResponses[question.questionCode]} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurveyResponses;
