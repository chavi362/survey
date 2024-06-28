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
      const response = await serverRequests("GET", urlParam)
        setData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false regardless of success or error
      }
    };

    fetchData();
  }, [urlParam]);


  return [data, error, loading, setLoading];
};

export default useGetData;
