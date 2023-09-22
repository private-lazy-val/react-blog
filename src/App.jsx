import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import Layout from './Layout';
import EditPost from "./EditPost";
import {Route, Routes} from 'react-router-dom';
import {useEffect} from 'react';
import useScrollToTop from "./hooks/useScrollToTop";
import useAxiosFetch from "./hooks/useAxiosFetch";
import api from "./api/posts";
import {useStoreActions} from "easy-peasy";

function App() {
    useScrollToTop();

    const setPosts = useStoreActions((actions) => actions.setPosts);
    const {data, fetchError, isLoading} = useAxiosFetch(api.getUri() + "/posts");

    useEffect(() => {
        setPosts(data);
    }, [data, setPosts])

    return (
            <Routes>
                <Route path='/' element={
                    <Layout/>
                }>
                    <Route index element={<Home isLoading={isLoading} fetchError={fetchError}/>}/>
                    {/*indexed route will be rendered when the parent path is exactly matched*/}
                    <Route path='post'>
                        <Route index element={<NewPost/>}/>
                        <Route path=':id' element={<PostPage/>}/>
                    </Route>
                    <Route path='edit/:id'>
                        <Route index element={<EditPost/>}/>
                    </Route>
                    <Route path='about' element={<About/>}/>
                    <Route path='*' element={<Missing/>}/>
                </Route>
            </Routes>
    );
}

export default App;
