import { useState, useEffect } from "react";
import { serverRequests } from "../Api";
const useGetData = (urlParam) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); 
        const response = await serverRequests("GET", urlParam);
        const responseData = await response.json(); // Parse the response to JSON
        setData(responseData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, [urlParam]);


  return [data, error, loading, setLoading];
};


export default useGetData;
