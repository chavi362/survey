import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import CloseQuestionResponse from '../components/CloseQuestionResponse';
import OpenQuestionResponse from '../components/OpenQuestionResponse';
import { serverRequests } from '../Api';
import useGetData from '../hooks/useGetData';
const SurveyResponses = () => {
  const { surveyCode } = useParams();
  const location = useLocation();
  const state = location.state || {};
  const { surveyTitle = 'Default Title', numberOfResponses = 0 } = state;

  const [questions, setQuestions] = useState([]);
  const [filteredResponses, setFilteredResponses] = useState({});
  const [filters, setFilters] = useState({
    ageRange: [0, 100],
    areaID: '',
    incomeRange: [0, 100000],
    genderID: '',
    educationID: '',
    sectorID: ''
  });

  const [ages, setAges] = useState([]);
  const [genders, setGenders] = useState([]);
  const [areas, setAreas] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [educationLevels, setEducationLevels] = useState([]);
  const [incomeLevels, setIncomeLevels] = useState([]);

  // Assuming these hooks handle data fetching
  const [agesData, agesError, agesLoading] = useGetData('properties/ages');
  const [gendersData, gendersError, gendersLoading] = useGetData('properties/genders');
  const [areasData, areasError, areasLoading] = useGetData('properties/areas');
  const [sectorsData, sectorsError, sectorsLoading] = useGetData('properties/sectors');
  const [educationLevelsData, educationLevelsError, educationLevelsLoading] = useGetData('properties/education_levels');
  const [incomeLevelsData, incomeLevelsError, incomeLevelsLoading] = useGetData('properties/family_income_levels');

  useEffect(() => {
    if (agesData) setAges(agesData);
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
    if (incomeLevelsData) setIncomeLevels(incomeLevelsData);
  }, [incomeLevelsData]);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const data = await serverRequests('GET', `/surveys/${surveyCode}/questions`);
        setQuestions(data);
      } catch (err) {
        console.error('Error fetching questions:', err);
      }
    }

    fetchQuestions();
  }, [surveyCode]);

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Handle range change (for age and income)
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

  const loading=agesLoading || gendersLoading || areasLoading || sectorsLoading || educationLevelsLoading || incomeLevelsLoading;
  if (loading) {
    return <p>Loading...</p>;
  }

  // Render error state
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
          <input
            type="range"
            name="ageRange"
            min={filters.ageRange[0]}
            max={filters.ageRange[1]}
            value={filters.ageRange[0]}
            onChange={(e) => handleRangeChange('ageRange', [e.target.value, filters.ageRange[1]])}
          />
          {filters.ageRange[0]} - {filters.ageRange[1]}
        </div>
        <div>
          <label>Income Range:</label>
          <input
            type="range"
            name="incomeRange"
            min={filters.incomeLevels[0]}
            max={filters.incomeLevels[1]}
            value={filters.incomeLevels[0]}
            onChange={(e) => handleRangeChange('incomeRange', [e.target.value, filters.incomeRange[1]])}
          />
          {filters.incomeRange[0]} - {filters.incomeRange[1]}
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

      {Object.keys(filteredResponses).length > 0 ? (
        <ul>
          {Object.entries(filteredResponses).map(([questionCode, responses]) => (
            <li key={questionCode}>{JSON.stringify(responses)}</li>
          ))}
        </ul>
      ) : (
        <p>No responses yet.</p>
      )}

      {/* {questions.map((question) =>
        question.questionType === 'open' ? (
          <OpenQuestionResponse 
            key={question.questionCode} 
            questionCode={question.questionCode} 
            filters={filters} 
            responses={filteredResponses[question.questionCode] || []} 
          />
        ) : (
          <CloseQuestionResponse 
            key={question.questionCode} 
            questionCode={question.questionCode} 
            filters={filters} 
            responses={filteredResponses[question.questionCode] || []} 
          />
        )
      )} */}
    </div>
  );
};

export default SurveyResponses;
