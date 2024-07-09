import { useState, useEffect } from "react";
import { serverRequests } from "../Api";

const useGetPaginationData = (urlParam) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [prevPage, setPrevPage] = useState(null);
    const [nextPage, setNextPage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await serverRequests("GET", urlParam);
                const responseData = await response.json();
                setData(responseData);
                setNextPage(responseData.nextPage);
                setPrevPage(responseData.prevPage);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [urlParam]);

    return [data, error, loading, setLoading, prevPage, setPrevPage, nextPage, setNextPage];
};

export default useGetPaginationData;