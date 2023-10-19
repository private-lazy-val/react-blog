import {useNavigate} from 'react-router-dom';
import {IoMdClose} from "react-icons/io";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {addNewPost} from './postsSlice';

const AddPost = () => {
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
                setImage(reader.result);
                setFileName(file.name);
            };
        }
    };

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
            <form className='new-post-form' onSubmit={handleSubmit}>
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
                        className="default-file-input"
                        id='post-image'
                        type='file'
                        // Hide the default input
                        onChange={handleSetImage}
                    />
                    <button className="custom-file-input" type="button"
                            onClick={() => document.getElementById('post-image').click()}>
                        Choose File
                    </button>
                    <span>{fileName || 'No file chosen'}</span> {/* Displaying the name of the file */}
                    {fileName && <button className="remove-file-btn" type="button" onClick={() => {
                        setImage(null);
                        setFileName('');
                    }}><IoMdClose/></button>}
                </div>
                <button className="submit-btn" type='submit'>Submit</button>
            </form>
        </main>
    );
};

export default AddPost;