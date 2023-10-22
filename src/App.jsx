import Home from './features/posts/home/Home';
import NewPost from './features/posts/new-post/NewPost';
import PostPage from './features/posts/post-page/PostPage';
import About from './components/about/About';
import Missing from './components/missing/Missing';
import Layout from './components/layout/Layout';
import EditPost from "./features/posts/edit-post/EditPost";
import ConfirmDelete from "./features/modals/confirm-delete/ConfirmDelete";
import UsersList from "./features/users/user-list/UsersList";
import UserPage from "./features/users/user-page/UserPage";
import Modal from "./features/modals/modal/Modal";
import useScrollToTop from "./hooks/useScrollToTop";
import useModal from "./hooks/useModal";
import {Route, Routes} from 'react-router-dom';
import {PostSearchProvider} from "./context/PostSearchContext";
import {UserSearchProvider} from "./context/UserSearchContext";
import {useRef} from "react";
import {CSSTransition} from "react-transition-group";

import transitions from "./features/modals/modal/ModalTransitions.module.css";
import {PostFormProvider} from "./context/PostFormContext";

function App() {
    useScrollToTop();

    const {
        isModalOpen,
        modalType,
        closeConfirmDeleteModal,
        openConfirmDeleteModal
    } = useModal();

    // Used in CSSTransition
    const nodeRef = useRef(null);

    return (
        <>
            <PostSearchProvider>
                <UserSearchProvider>
                    <PostFormProvider>
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
                                    <Route index element={<EditPost openModal={openConfirmDeleteModal}/>}/>
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
                    </PostFormProvider>
                </UserSearchProvider>
            </PostSearchProvider>

            <CSSTransition
                in={isModalOpen && modalType === 'confirm-delete'}
                nodeRef={nodeRef}
                timeout={600}
                classNames={{...transitions}}
                unmountOnExit
            >
                <Modal ref={nodeRef} closeModal={closeConfirmDeleteModal}>
                    <PostFormProvider>
                        <ConfirmDelete title='Are you fur-real?'/>
                    </PostFormProvider>
                </Modal>
            </CSSTransition>
        </>
    );
}

export default App;
