

import React, { useEffect, useState } from 'react';
import useGetData from '../hooks/useGetData';
import { Range, getTrackBackground } from 'react-range';
import { Form } from 'react-bootstrap';
import '../css/FilterComponent.css';

const FilterComponent = ({ filters, setFilters }) => {
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
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: values
    }));
  };

  if (agesLoading || gendersLoading || areasLoading || sectorsLoading || educationLevelsLoading || incomeLevelsLoading) {
    return <p>Loading filters...</p>;
  }

  if (agesError || gendersError || areasError || sectorsError || educationLevelsError || incomeLevelsError) {
    return <p>Error loading filters.</p>;
  }

  return (
    <div className="filter-component">
      <h3 className="filter-title">Filters</h3>
      <Form>
        <Form.Group>
          <Form.Label>Age Range:</Form.Label>
          <Range
            values={filters.ageRange}
            step={1}
            min={filters.ageRange[0]}
            max={filters.ageRange[1]}
            onChange={(values) => handleRangeChange('ageRange', values)}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                className="range-track"
                style={{
                  ...props.style,
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
            renderThumb={({ props }) => (
              <div
                {...props}
                className="range-thumb"
              />
            )}
          />
          <span>{filters.ageRange[0]} - {filters.ageRange[1]}</span>
        </Form.Group>

        <Form.Group>
          <Form.Label>Income Range:</Form.Label>
          <Range
            values={filters.incomeRange}
            step={1000}
            min={filters.incomeRange[0]}
            max={filters.incomeRange[1]}
            onChange={(values) => handleRangeChange('incomeRange', values)}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                className="range-track"
                style={{
                  ...props.style,
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
            renderThumb={({ props }) => (
              <div
                {...props}
                className="range-thumb"
              />
            )}
          />
          <span>{filters.incomeRange[0]} - {filters.incomeRange[1]}</span>
        </Form.Group>

        <Form.Group>
          <Form.Label>Area:</Form.Label>
          <Form.Control as="select" name="areaID" onChange={handleFilterChange} value={filters.areaID}>
            <option value="">Select Area</option>
            {areas.map((area) => (
              <option key={area.areaID} value={area.areaID}>{area.area}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Gender:</Form.Label>
          <Form.Control as="select" name="genderID" onChange={handleFilterChange} value={filters.genderID}>
            <option value="">Select Gender</option>
            {genders.map((gender) => (
              <option key={gender.genderID} value={gender.genderID}>{gender.gender}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Education Level:</Form.Label>
          <Form.Control as="select" name="educationID" onChange={handleFilterChange} value={filters.educationID}>
            <option value="">Select Education Level</option>
            {educationLevels.map((education) => (
              <option key={education.educationID} value={education.educationID}>{education.education_level}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Sector:</Form.Label>
          <Form.Control as="select" name="sectorID" onChange={handleFilterChange} value={filters.sectorID}>
            <option value="">Select Sector</option>
            {sectors.map((sector) => (
              <option key={sector.sectorID} value={sector.sectorID}>{sector.sector}</option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form>
    </div>
  );
};

export default FilterComponent;



// import React, { useEffect, useState } from 'react';
// import useGetData from '../hooks/useGetData';
// import { Range, getTrackBackground } from 'react-range';
// import { Form } from 'react-bootstrap';
// import '../css/FilterComponent.css';

// const FilterComponent = ({ filters, setFilters }) => {
//   const [genders, setGenders] = useState([]);
//   const [areas, setAreas] = useState([]);
//   const [sectors, setSectors] = useState([]);
//   const [educationLevels, setEducationLevels] = useState([]);
//   const [incomeLevels, setIncomeLevels] = useState([]);
//   const [ageRange, setAgeRange] = useState([0, 100]);
//   const [incomeRange, setIncomeRange] = useState([0, 100000]);

//   const [agesData, agesError, agesLoading] = useGetData('properties/ages');
//   const [gendersData, gendersError, gendersLoading] = useGetData('properties/genders');
//   const [areasData, areasError, areasLoading] = useGetData('properties/areas');
//   const [sectorsData, sectorsError, sectorsLoading] = useGetData('properties/sectors');
//   const [educationLevelsData, educationLevelsError, educationLevelsLoading] = useGetData('properties/education_levels');
//   const [incomeLevelsData, incomeLevelsError, incomeLevelsLoading] = useGetData('properties/family_income_levels');

//   useEffect(() => {
//     if (agesData) {
//       const minAge = Math.min(...agesData.map(age => age.startYear));
//       const maxAge = Math.max(...agesData.map(age => age.endYear));
//       setAgeRange([minAge, maxAge]);
//       setFilters(prevFilters => ({
//         ...prevFilters,
//         ageRange: [minAge, maxAge]
//       }));
//     }
//   }, [agesData]);

//   useEffect(() => {
//     if (gendersData) setGenders(gendersData);
//   }, [gendersData]);

//   useEffect(() => {
//     if (areasData) setAreas(areasData);
//   }, [areasData]);

//   useEffect(() => {
//     if (sectorsData) setSectors(sectorsData);
//   }, [sectorsData]);

//   useEffect(() => {
//     if (educationLevelsData) setEducationLevels(educationLevelsData);
//   }, [educationLevelsData]);

//   useEffect(() => {
//     if (incomeLevelsData) {
//       setIncomeLevels(incomeLevelsData);
//       const minIncome = Math.min(...incomeLevelsData.map(income => income.startRange));
//       const maxIncome = Math.max(...incomeLevelsData.map(income => income.endRange));
//       setIncomeRange([minIncome, maxIncome]);
//       setFilters(prevFilters => ({
//         ...prevFilters,
//         incomeRange: [minIncome, maxIncome]
//       }));
//     }
//   }, [incomeLevelsData]);

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       [name]: value,
//     }));
//   };

//   const handleRangeChange = (name, values) => {
//     if (name === 'ageRange') {
//       setAgeRange(values);
//     } else if (name === 'incomeRange') {
//       setIncomeRange(values);
//     }
//     setFilters(prevFilters => ({
//       ...prevFilters,
//       [name]: values
//     }));
//   };

//   if (agesLoading || gendersLoading || areasLoading || sectorsLoading || educationLevelsLoading || incomeLevelsLoading) {
//     return <p>Loading filters...</p>;
//   }

//   if (agesError || gendersError || areasError || sectorsError || educationLevelsError || incomeLevelsError) {
//     return <p>Error loading filters.</p>;
//   }

//   return (
//     <div className="filter-component">
//       <h3 className="filter-title">Filters</h3>
//       <Form>
//         <Form.Group>
//           <Form.Label>Age Range:</Form.Label>
//           {agesData && (
//             <Range
//               values={ageRange}
//               step={1}
//               min={Math.min(...agesData.map(age => age.startYear))}
//               max={Math.max(...agesData.map(age => age.endYear))}
//               onChange={(values) => handleRangeChange('ageRange', values)}
//               renderTrack={({ props, children }) => (
//                 <div
//                   {...props}
//                   className="range-track"
//                   style={{
//                     ...props.style,
//                     background: getTrackBackground({
//                       values: ageRange,
//                       colors: ['#ccc', '#548BF4', '#ccc'],
//                       min: Math.min(...agesData.map(age => age.startYear)),
//                       max: Math.max(...agesData.map(age => age.endYear))
//                     })
//                   }}
//                 >
//                   {children}
//                 </div>
//               )}
//               renderThumb={({ props }) => (
//                 <div
//                   {...props}
//                   className="range-thumb"
//                 />
//               )}
//             />
//           )}
//           <span>{ageRange[0]} - {ageRange[1]}</span>
//         </Form.Group>

//         <Form.Group>
//           <Form.Label>Income Range:</Form.Label>
//           {incomeLevelsData && (
//             <Range
//               values={incomeRange}
//               step={1000}
//               min={Math.min(...incomeLevelsData.map(income => income.startRange))}
//               max={Math.max(...incomeLevelsData.map(income => income.endRange))}
//               onChange={(values) => handleRangeChange('incomeRange', values)}
//               renderTrack={({ props, children }) => (
//                 <div
//                   {...props}
//                   className="range-track"
//                   style={{
//                     ...props.style,
//                     background: getTrackBackground({
//                       values: incomeRange,
//                       colors: ['#ccc', '#548BF4', '#ccc'],
//                       min: Math.min(...incomeLevelsData.map(income => income.startRange)),
//                       max: Math.max(...incomeLevelsData.map(income => income.endRange))
//                     })
//                   }}
//                 >
//                   {children}
//                 </div>
//               )}
//               renderThumb={({ props }) => (
//                 <div
//                   {...props}
//                   className="range-thumb"
//                 />
//               )}
//             />
//           )}
//           <span>{incomeRange[0]} - {incomeRange[1]}</span>
//         </Form.Group>

//         <Form.Group>
//           <Form.Label>Area:</Form.Label>
//           <Form.Control as="select" name="areaID" onChange={handleFilterChange} value={filters.areaID}>
//             <option value="">Select Area</option>
//             {areas.map((area) => (
//               <option key={area.areaID} value={area.areaID}>{area.area}</option>
//             ))}
//           </Form.Control>
//         </Form.Group>

//         <Form.Group>
//           <Form.Label>Gender:</Form.Label>
//           <Form.Control as="select" name="genderID" onChange={handleFilterChange} value={filters.genderID}>
//             <option value="">Select Gender</option>
//             {genders.map((gender) => (
//               <option key={gender.genderID} value={gender.genderID}>{gender.gender}</option>
//             ))}
//           </Form.Control>
//         </Form.Group>

//         <Form.Group>
//           <Form.Label>Education Level:</Form.Label>
//           <Form.Control as="select" name="educationID" onChange={handleFilterChange} value={filters.educationID}>
//             <option value="">Select Education Level</option>
//             {educationLevels.map((education) => (
//               <option key={education.educationID} value={education.educationID}>{education.education_level}</option>
//             ))}
//           </Form.Control>
//         </Form.Group>

//         <Form.Group>
//           <Form.Label>Sector:</Form.Label>
//           <Form.Control as="select" name="sectorID" onChange={handleFilterChange} value={filters.sectorID}>
//             <option value="">Select Sector</option>
//             {sectors.map((sector) => (
//               <option key={sector.sectorID} value={sector.sectorID}>{sector.sector}</option>
//             ))}
//           </Form.Control>
//         </Form.Group>
//       </Form>
//     </div>
//   );
// };

// export default FilterComponent;




