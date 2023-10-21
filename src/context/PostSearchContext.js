import {createContext, useState, useEffect} from 'react';
import {useSelector} from "react-redux";
import {selectAllPosts} from "../features/posts/postsSlice";

// React Context is a way to pass data through the component tree without having to pass props down manually at every level.
const PostSearchContext = createContext({});

export const PostSearchProvider = ({children}) => {

    const [searchPost, setSearchPost] = useState('');
    const [searchPostResults, setSearchPostResults] = useState([]);

    const posts = useSelector(selectAllPosts);

    useEffect(() => {
        const filteredResults = posts.filter((post) =>
            (post.body && post.body.toLowerCase().includes(searchPost.toLowerCase()))
            || (post.title && post.title.toLowerCase().includes(searchPost.toLowerCase())));

        setSearchPostResults(filteredResults.reverse());
    }, [posts, searchPost]);

    // Reset search input when navigating to another section of the website
    const resetPostSearch = () => {
        setSearchPost('');
    }

    return (
        <PostSearchContext.Provider value={{searchPost, setSearchPost, searchPostResults, resetPostSearch}}>
            {children}
        </PostSearchContext.Provider>
        // DataProvider has some internal state.
        // When this state changes, the DataProvider will re-render, and its value prop gets updated.
        // Components consuming the context will check if the part of the context they are using has changed.
        // If it has, they will re-render. Otherwise, they won't.
    )
}

export default PostSearchContext;