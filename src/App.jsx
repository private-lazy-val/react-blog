import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import Layout from './Layout';
import EditPost from "./EditPost";
import {Route, Routes, useLocation} from 'react-router-dom';
import {DataProvider} from "./context/DataContext";
import {useEffect} from 'react';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

function App() {

    return (
        <DataProvider>
            <Routes>
                <Route path='/' element={
                    <>
                    <ScrollToTop />
                    <Layout/>
                    </>
                }>
                    <Route index element={<Home/>}/>
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
        </DataProvider>
    );
}

export default App;
