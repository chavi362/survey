import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useGetData from '../hooks/useGetData';

const SurveyResponses = () => {
  const { surveyCode } = useParams();
  const location = useLocation();
  const { surveyTitle, numberOfResponses } = location.state;
  const [responses, setResponses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const data = await useGetData(`surveys/${surveyCode}/responses`);
        setResponses(data.responses);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, [surveyCode]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Survey Responses for {surveyTitle}</h2>
      <p>Number of Responses: {numberOfResponses}</p>
      {responses.length > 0 ? (
        <ul>
          {responses.map((response, index) => (
            <li key={index}>{JSON.stringify(response)}</li>
          ))}
        </ul>
      ) : (
        <p>No responses yet.</p>
      )}
    </div>
  );
};

export default SurveyResponses;
