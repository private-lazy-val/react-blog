import {createContext, useState, useEffect} from 'react';
import useAxiosFetch from '../hooks/useAxiosFetch';
// React Context is a way to pass data through the component tree without having to pass props down manually at every level.
const DataContext = createContext({});

export const DataProvider = ({children}) => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [postImage, setPostImage] = useState(null);
    const [fileName, setFileName] = useState('');

    const {data, fetchError, isLoading} = useAxiosFetch('http://localhost:3500/posts');

    useEffect(() => {
        setPosts(data);
    }, [data])

    useEffect(() => {
        const filteredResults = posts.filter((post) =>
            (post.body && post.body.toLowerCase().includes(search.toLowerCase()))
            || (post.title && post.title.toLowerCase().includes(search.toLowerCase())));

        setSearchResults(filteredResults.reverse());
    }, [posts, search]);

    const handleSetImage = (e) => {
        if (e && e.target && e.target.files) {
            // the user selects a file via the file input dialog. This triggers.
            // the onChange event for the file input, and the handleSetImage function is called.
            const file = e.target.files[0];
            const reader = new FileReader(); // this is a JS object that can read data from Blob or File objects.

            if (file) {
                reader.readAsDataURL(file);
            }

            reader.onloadend = () => { // onloadend event handler for the FileReader will update the state to hold the Data URL representation
                // of the file once the read is complete in readAsDataURL.
                setPostImage(reader.result);
                setFileName(file.name);
            };
        }
    };

    return (
        <DataContext.Provider value={{
            search, setSearch,
            searchResults, fetchError, isLoading,
            posts, setPosts, postImage,setPostImage, handleSetImage, fileName, setFileName
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