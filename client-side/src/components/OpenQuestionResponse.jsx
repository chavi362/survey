import React, { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';
import { serverRequests } from '../Api';

const OpenQuestionResponse = ({ surveyCode, questionCode, filters }) => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResponses = async () => {
      setLoading(true);
      setError(null);
      const questionType = 'open';
      try {
        const response = await serverRequests("POST", `surveys/${surveyCode}/responses/${questionCode}/filtered-responses`, {
          questionType,
          filters
        });
        const responseData = await response.json();
        console.log(responseData);
        setResponses(responseData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, [questionCode, filters, surveyCode]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Extract labels and values from responses
  const responseCounts = responses.reduce((acc, response) => {
    acc[response.answer] = (acc[response.answer] || 0) + response.numberOfResponses;
    return acc;
  }, {});

  const responseLabels = Object.keys(responseCounts);
  const responseValues = Object.values(responseCounts);

  const chartData = {
    labels: responseLabels,
    datasets: [
      {
        label: 'Responses',
        data: responseValues,
        backgroundColor: '#42A5F5',
        hoverBackgroundColor: '#64B5F6',
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const label = responseLabels[tooltipItem.dataIndex];
            const value = responseValues[tooltipItem.dataIndex];
            return `${label}: ${value}`;
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          autoSkip: false
        }
      },
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div>
      {responses.length > 0 ? (
        <div>
          <h3>Responses for {questionCode}</h3>
          <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
      ) : (
        <p>No responses yet.</p>
      )}
    </div>
  );
};

export default OpenQuestionResponse;
