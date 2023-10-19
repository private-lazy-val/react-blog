import {createContext, useState, useEffect} from 'react';
import {useSelector} from "react-redux";
import {selectAllPosts} from "../features/posts/postsSlice";

// React Context is a way to pass data through the component tree without having to pass props down manually at every level.
const PostSearchContext = createContext({});

export const PostSearchProvider = ({children}) => {

    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const posts = useSelector(selectAllPosts);

    useEffect(() => {
        const filteredResults = posts.filter((post) =>
            (post.body && post.body.toLowerCase().includes(search.toLowerCase()))
            || (post.title && post.title.toLowerCase().includes(search.toLowerCase())));

        setSearchResults(filteredResults.reverse());
    }, [posts, search]);


    return (
        <PostSearchContext.Provider value={{search, setSearch, searchResults}}>
            {children}
        </PostSearchContext.Provider>
        // DataProvider has some internal state.
        // When this state changes, the DataProvider will re-render, and its value prop gets updated.
        // Components consuming the context will check if the part of the context they are using has changed.
        // If it has, they will re-render. Otherwise, they won't.
    )
}

export default PostSearchContext;