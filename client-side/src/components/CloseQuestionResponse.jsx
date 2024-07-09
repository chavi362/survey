import React, { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';
import { serverRequests } from '../Api';

const CloseQuestionResponse = ({ surveyCode, questionCode, filters }) => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const colors = [
    '#42A5F5', '#66BB6A', '#FFA726', '#26C6DA', '#7E57C2',
    '#FF7043', '#D4E157', '#AB47BC', '#FFCA28', '#EC407A'
  ];
  const hoverColors = [
    '#64B5F6', '#81C784', '#FFB74D', '#4DD0E1', '#9575CD',
    '#FF8A65', '#DCE775', '#BA68C8', '#FFD54F', '#F48FB1'
  ];

  useEffect(() => {
    const fetchResponses = async () => {
      setLoading(true);
      setError(null);
      const questionType = 'close';
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
  const responseLabels = responses.map(response => response.answer);
  const responseValues = responses.map(response => response.numberOfResponses);

  const totalResponses = responseValues.reduce((acc, count) => acc + count, 0);
  const responsePercentages = responseValues.map(count => ((count / totalResponses) * 100).toFixed(2));

  const chartData = {
    labels: responseLabels,
    datasets: [
      {
        data: responseValues,
        backgroundColor: colors.slice(0, responseLabels.length),
        hoverBackgroundColor: hoverColors.slice(0, responseLabels.length),
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const label = responseLabels[tooltipItem.dataIndex];
            const value = responseValues[tooltipItem.dataIndex];
            const percentage = responsePercentages[tooltipItem.dataIndex];
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div>
      {responses.length > 0 ? (
        <div>
          <h3>Responses</h3>
          <Chart type="pie" data={chartData} options={chartOptions} />
        </div>
      ) : (
        <p>No responses yet.</p>
      )}
    </div>
  );
};

export default CloseQuestionResponse;
