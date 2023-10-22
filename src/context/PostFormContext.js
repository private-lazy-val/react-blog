import React, {createContext, useState} from 'react';
import {addNewPost, deletePost, editPost} from "../features/posts/postsSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import useModal from "../hooks/useModal";

// React Context is a way to pass data through the component tree without having to pass props down manually at every level.
const PostFormContext = createContext({});

export const PostFormProvider = ({children}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        closeModal
    } = useModal();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userName, setUserName] = useState('');
    const [image, setImage] = useState(null);
    const [fileName, setFileName] = useState('');
    const [isPending, setIsPending] = useState(false);

    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);
    const onUserNameChanged = e => setUserName(e.target.value);

    const canEditPostSave = [title, content, userName].every(Boolean) && isPending === false;
    const canNewPostSave = [title, content, userName].every(Boolean) && isPending === false;
    const handleEdit = async (e, postData) => {
        e.preventDefault();
        if (canEditPostSave) {
            try {
                setIsPending(true);
                await dispatch(editPost(postData)).unwrap();
                const {id} = postData;

                navigate(`/post/${id}`);
            } catch (err) {
                console.error('Failed to save the post', err);
            } finally {
                setIsPending(false);
            }
        }
    }

    const handleSubmit = async (e, postData) => {
        e.preventDefault();
        if (canNewPostSave) {
            try {
                setIsPending(true);
                // When you dispatch an async thunk, it returns a promise that resolves into
                // a SerializedError object if the thunk gets rejected, and resolves into the result of the payloadCreator function
                // if the thunk is fulfilled.
                // However, working with these outcomes directly could be somewhat verbose,
                // which is where unwrapResult and thunkApi.unwrap come into play.
                await dispatch(addNewPost(postData)).unwrap();

                navigate('/');
                // after submitting a new post, the navigate('/') function call will change the application's current route
                // to the home page
                // the hook is non user-initiated
            } catch (err) {
                console.log('Failed to save the post', err);
            } finally {
                setIsPending(false);
            }
        }
    }

    const handleDelete = async (postData) => {
        try {
            setIsPending(true);
            await dispatch(deletePost(postData)).unwrap();
            closeModal();
            navigate('/');
        } catch (err) {
            console.error('Failed to delete the post', err);
        } finally {
            setIsPending(false);
        }
    }

    return (
        <PostFormContext.Provider value={{
            title,
            setTitle,
            onTitleChanged,
            userName,
            setUserName,
            onUserNameChanged,
            content,
            setContent,
            onContentChanged,
            image,
            setImage,
            fileName,
            setFileName,
            handleSubmit,
            handleEdit,
            handleDelete
        }}>
            {children}
        </PostFormContext.Provider>
    )
}

export default PostFormContext;