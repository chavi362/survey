import React, { useEffect,useState } from "react";
import WithLoader from "../hoc/WithLoader";
import ManagerSurveysList from "../components/ManagerSurveysList";
import useGetData from "../hooks/useGetData";

import { useParams } from "react-router-dom";

const ManagerSurveys = () => {

  const { managerCode } = useParams(); // Extract managerCode from URL params
  console.log(managerCode)
  const [data, error, loading] = useGetData(`surveys?managerCode=${managerCode}`);
  const [surveys, setSurveys] = useState([]);
  useEffect(() => {
    if (error) {
      console.error('Error fetching surveys:', error);
    } else if (data) {
        setSurveys(data.surveys);
      console.log(data);
    }
  }, [data, error]);
  if (error) return <div>Error: {error}</div>;
  return <ManagerSurveysList data={surveys} loading={loading} />;
};

export default WithLoader(ManagerSurveys);
