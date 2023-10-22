import { configureStore } from "@reduxjs/toolkit";
import postsReducer from '../features/posts/postsSlice';
import usersReducer from '../features/users/usersSlice';
import modalReducer from '../features/modals/modalsSlice';

export default configureStore({
    reducer: {
        posts: postsReducer,
        users: usersReducer,
        modal: modalReducer
    },
});