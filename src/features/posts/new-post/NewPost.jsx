import {useNavigate} from 'react-router-dom';
import {IoMdClose} from "react-icons/io";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {addNewPost} from '../postsSlice';
import styles from './NewPost.module.css';
import {handleSetImage} from "../../../utils/utils";

const NewPost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userName, setUserName] = useState('');
    const [image, setImage] = useState(null);
    const [fileName, setFileName] = useState('');
    const [isPending, setIsPending] = useState(false);

    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);
    const onUserNameChanged = e => setUserName(e.target.value);

    const canSave = [title, content, userName].every(Boolean) && isPending === false;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (canSave) {
            try {
                setIsPending(true);
                // When you dispatch an async thunk, it returns a promise that resolves into
                // a SerializedError object if the thunk gets rejected, and resolves into the result of the payloadCreator function
                // if the thunk is fulfilled.
                // However, working with these outcomes directly could be somewhat verbose,
                // which is where unwrapResult and thunkApi.unwrap come into play.
                await dispatch(addNewPost({title, body: content, user_name: userName, image, file_name: fileName})).unwrap();

                setTitle('');
                setContent('');
                setImage(null);
                setFileName('');
                setUserName('');
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

    return (
        <main className='new-post'>
            <h2>New Post</h2>
            <form className={styles[`new-post-form`]} onSubmit={handleSubmit}>
                <label htmlFor='post-title'>Title:</label>
                <input
                    id='post-title'
                    type='text'
                    required
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor='post-author'>Author:</label>
                <input
                    id='post-author'
                    type='text'
                    required
                    value={userName}
                    onChange={onUserNameChanged}
                />
                <label htmlFor='post-body'>Content:</label>
                <textarea
                    id='post-body'
                    required
                    value={content}
                    onChange={onContentChanged}
                />
                <label htmlFor='post-image'>Upload an image:</label>
                <div>
                    <input
                        className='default-file-input'
                        id='post-image'
                        type='file'
                        // Hide the default input
                        onChange={(e) => handleSetImage(e, setImage, setFileName)}
                    />
                    <button className='custom-file-input' type="button"
                            onClick={() => document.getElementById('post-image').click()}>
                        Choose File
                    </button>
                    <span>{fileName || 'No file chosen'}</span> {/* Displaying the name of the file */}
                    {fileName && <button className='remove-file-btn' type="button" onClick={() => {
                        setImage(null);
                        setFileName('');
                    }}><IoMdClose/></button>}
                </div>
                <button className='submit-btn' type='submit'>Submit</button>
            </form>
        </main>
    );
};

export default NewPost;