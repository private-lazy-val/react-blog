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
import { selectIsModalOpen, selectModalType } from './features/modals/modalsSlice';
import {Route, Routes} from 'react-router-dom';
import {useRef} from "react";
import {CSSTransition} from "react-transition-group";
import transitions from "./features/modals/modal/ModalTransitions.module.css";
import {PostFormProvider} from "./context/PostFormContext";
import ViewImage from "./features/modals/view-image/ViewImage";
import {useSelector} from "react-redux";

function App() {
    useScrollToTop();

    const isModalOpen = useSelector(selectIsModalOpen);
    const modalType = useSelector(selectModalType);
    const {
        openConfirmDeleteModal,
        openViewImageModal,
        closeModal
    } = useModal();

    // Used in CSSTransition
    const nodeRef = useRef(null);

    return (
        <>
                    <PostFormProvider>
                        <Routes>
                            <Route path='/' element={<Layout/>}>
                                {/*indexed route will be rendered when the parent path is exactly matched*/}
                                <Route index element={<Home/>}/>

                                <Route path='post'>
                                    <Route index element={<NewPost/>}/>
                                    <Route path=':postId' element={<PostPage openModal={openViewImageModal}/>}/>
                                </Route>

                                <Route path='edit/:postId'>
                                    <Route index element={<EditPost openModal={openConfirmDeleteModal}/>}/>
                                </Route>

                                <Route path="user">
                                    <Route index element={<UsersList/>}></Route>
                                    <Route path=":userId" element={<UserPage/>}></Route>
                                </Route>

                                <Route path='about' element={<About/>}/>

                                <Route path='*' element={<Missing/>}/>
                            </Route>
                        </Routes>
                    </PostFormProvider>

            <CSSTransition
                in={isModalOpen && modalType === 'confirm-delete'}
                nodeRef={nodeRef}
                timeout={600}
                classNames={{...transitions}}
                unmountOnExit
            >
                <Modal ref={nodeRef} closeModal={closeModal}>
                    <PostFormProvider>
                        <ConfirmDelete title='Are you fur-real?'/>
                    </PostFormProvider>
                </Modal>
            </CSSTransition>

            <CSSTransition
                in={isModalOpen && modalType === 'view-image'}
                nodeRef={nodeRef}
                timeout={600}
                classNames={{...transitions}}
                unmountOnExit
            >
                <Modal ref={nodeRef} closeModal={closeModal}>
                    <ViewImage/>
                </Modal>
            </CSSTransition>
        </>
    );
}

export default App;
