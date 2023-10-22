import {useEffect, useState} from "react";

const useIsLoading = (data) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (data || data === null) {
            setIsLoading(false);
        }
    }, [data]);

    return {isLoading};
};

export default useIsLoading;