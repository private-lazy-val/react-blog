import Home from './features/posts/Home';
import NewPost from './features/posts/NewPost';
import PostPage from './features/posts/PostPage';
import About from './components/about/About';
import Missing from './components/missing/Missing';
import Layout from './components/layout/Layout';
import EditPost from "./features/posts/EditPost";
import {Route, Routes} from 'react-router-dom';
import useScrollToTop from "./hooks/useScrollToTop";
import {PostSearchProvider} from "./context/PostSearchContext";
import UsersList from "./features/users/UsersList";
import UserPage from "./features/users/UserPage";

function App() {
    useScrollToTop();

    return (
        <PostSearchProvider>
            <Routes>
                <Route path='/' element={
                    <Layout/>
                }>
                    {/*indexed route will be rendered when the parent path is exactly matched*/}
                    <Route index element={<Home/>}/>

                    <Route path='post'>
                        <Route index element={<NewPost/>}/>
                        <Route path=':postId' element={<PostPage/>}/>
                    </Route>

                    <Route path='edit/:postId'>
                        <Route index element={<EditPost/>}/>
                    </Route>

                    <Route path="user">
                        <Route index element={<UsersList/>}></Route>
                        <Route path=":userId" element={<UserPage/>}></Route>
                    </Route>

                    <Route path='about' element={<About/>}/>

                    {/*Catch all*/}
                    {/*With 'replace' the current history entry is replaced by the new one, */}
                    {/*so the back button will take you to the page before the last one*/}
                    <Route path='*' element={<Missing/>}/>
                </Route>
            </Routes>
        </PostSearchProvider>
    );
}

export default App;
