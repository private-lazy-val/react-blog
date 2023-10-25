import {useContext} from 'react';
import PostFormContext from "../context/PostFormContext";

const usePostForm = () => {
    return useContext(PostFormContext);
};

export default usePostForm;