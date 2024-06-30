import { useState, useEffect } from "react";
import { serverRequests } from "../Api";

const useGetPaginationData = (urlParam) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [prevPage, setPrevPage] = useState(false);
    const [nextPage, setNextPage] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await serverRequests("GET", urlParam);
                const responseData = await response.json();
                setData(responseData);
                console.log(response.headers)
                const linkHeader = response.headers.get('Link');
                if (linkHeader) {
                    pagination(linkHeader);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        const pagination = (linkHeader) => {
            const links = linkHeader.split(',');
            const pages = { nextPage: false, prevPage: false };

            links.forEach((link) => {
                const [url, rel] = link.split(';');
                const cleanRel = rel.replace(/\s/g, '').replace(/rel="(.*)"/, '$1');

                switch (cleanRel) {
                    case 'next':
                        pages.nextPage = true;
                        break;
                    case 'prev':
                        pages.prevPage = true;
                        break;
                    default:
                        break;
                }
            });

            setNextPage(pages.nextPage);
            setPrevPage(p.pages.prevPage);
        };

        fetchData();
    }, [urlParam]);

    return [data, error, loading, setLoading, prevPage, setPrevPage, nextPage, setNextPage];
};

export default useGetPaginationData;
