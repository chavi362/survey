import React, { useEffect, useState } from 'react';
import { serverRequests } from '../Api';

const CloseQuestionResponse = ({ surveyCode, questionCode, filters }) => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResponses = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await serverRequests("POST", `surveys/${surveyCode}/responses/${questionCode}/filtered-responses`, filters);
        const responseData = await response.json();
        setResponses(responseData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, [questionCode, filters]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
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

export default CloseQuestionResponse;
