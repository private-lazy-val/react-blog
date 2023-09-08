import {createContext, useState, useEffect} from "react";

import {useNavigate} from 'react-router-dom';
import {format} from 'date-fns';
import api from '../api/posts';
import useAxiosFetch from "../hooks/useAxiosFetch";
import useWindowSize from "../hooks/useWindowSize";

const DataContext = createContext({});
// React Context is a way to pass data through the component tree without having to pass props down manually at every level.

export const DataProvider = ({children}) => {

    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const navigate = useNavigate();
    const {width} = useWindowSize();

    const {data, fetchError, isLoading} = useAxiosFetch('http://localhost:3500/posts');

    useEffect(() => {
        setPosts(data);
    }, [data])

    useEffect(() => {
        const filteredResults = posts.filter(post =>
            ((post.body).toLocaleLowerCase().includes(search.toLowerCase()))
            || ((post.title).toLocaleLowerCase().includes(search.toLowerCase())));
        setSearchResults(filteredResults.reverse());
    }, [posts, search])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const newPost = {id, title: postTitle, datetime, body: postBody};
        try {
            const response = await api.post('/posts', newPost);
            const allPosts = [...posts, response.data];
            setPosts(allPosts);
            setPostTitle('');
            setPostBody('');
            navigate('/'); // after submitting a new post, the navigate('/') function call will change the application's current route to the home page
            // the hook is non user-initiated
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }

    const handleEdit = async (id) => {
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const updatedPost = {id, title: editTitle, datetime, body: editBody};
        try {
            const response = await api.put(`/posts/${id}`, updatedPost);
            setPosts(posts.map(post => post.id === id ? {...response.data} : post));
            setEditTitle('');
            setEditBody('');
            navigate('/');
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }

    const handleDelete = async (id) => {
        try {
            await api.delete(`/posts/${id}`);
            const postsList = posts.filter((post) => post.id !== id);
            setPosts(postsList);
            navigate('/');
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }

    return (
        <DataContext.Provider value={{
            width
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;