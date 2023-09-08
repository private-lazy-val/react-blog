import {useState, useEffect} from "react";
import axios from "axios";

const useAxiosFetch = (dataUrl) => {
    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        // The variable isMounted serves as a flag to indicate whether the component using this hook is mounted or not.
        // This is useful to prevent state updates on an unmounted component.
        const source = axios.CancelToken.source();
        // In Axios, the CancelToken factory has a method called source(),
        // which returns an object containing two properties:
        // token: A new cancel token that you can pass to an Axios request;
        // cancel: A function to cancel the request.
        const fetchData = async (url) => {
            try {
                const response = await axios.get(url, {
                    cancelToken: source.token
                });
                if (isMounted) {
                    setData(response.data);
                    setFetchError(null)
                }
            } catch (err) {
                if (isMounted) {
                    setFetchError(err.message);
                    setData([]);
                }
            } finally {
                isMounted && setIsLoading(false);
            }
        };
        fetchData(dataUrl);

        return () => {
            isMounted = false;
            source.cancel();
        };
    }, [dataUrl]);

    return {data, fetchError, isLoading};
};

export default useAxiosFetch;