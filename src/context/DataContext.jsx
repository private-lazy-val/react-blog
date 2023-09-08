import { createContext, useState, useEffect } from 'react';
import useAxiosFetch from '../hooks/useAxiosFetch';
// React Context is a way to pass data through the component tree without having to pass props down manually at every level.
const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [postImage, setPostImage] = useState(null);

    const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

    useEffect(() => {
        setPosts(data);
    }, [data])

    useEffect(() => {
        const filteredResults = posts.filter((post) =>
            (post.body && post.body.toLowerCase().includes(search.toLowerCase()))
            || (post.title && post.title.toLowerCase().includes(search.toLowerCase())));

        setSearchResults(filteredResults.reverse());
    }, [posts, search]);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setPostImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <DataContext.Provider value={{
            search, setSearch,
            searchResults, fetchError, isLoading,
            posts, setPosts, postImage, handleImageChange
        }}>
            {children}
        </DataContext.Provider>
    // DataProvider has some internal state.
    // When this state changes, the DataProvider will re-render, and its value prop gets updated.
    // Components consuming the context (Home, NewPost, PostPage, EditPost) will check if the part of the context they are using has changed.
    // If it has, they will re-render. Otherwise, they won't.
    )
}

export default DataContext;