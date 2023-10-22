import {useEffect, useState} from "react";

const usePostIsLoading = (post) => {
    const [postIsLoading, setPostIsLoading] = useState(true);

    useEffect(() => {
        if (post || post === null) {
            setPostIsLoading(false);
        }
    }, [post]);
    return {postIsLoading};
};

export default usePostIsLoading;