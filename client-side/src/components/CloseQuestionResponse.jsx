import React from 'react';

const CloseQuestionResponse = ({ question,  responses }) => {
  if (!responses) return <p>Loading...</p>;

  return (
    <div>
      <h3>Responses for {question}</h3>
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
