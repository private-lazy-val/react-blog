import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import {IoMdClose} from "react-icons/io";
import {deletePost, editPost, selectPostById} from "./postsSlice";
import {useSelector, useDispatch} from "react-redux";


const EditPost = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {postId} = useParams();
    const post = useSelector((state) => selectPostById(state, Number(postId)));

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [fileName, setFileName] = useState('');

    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        // Check if post exists here
        if (post) {
            setTitle(post.title);
            setContent(post.body);
            setImage(post?.image);
            setFileName(post?.file_name);
        }
    }, [post]);

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);

    const canSave = [title, content, post.user_name].every(Boolean) && isPending === false;

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

    const handleEdit = async () => {
        if (canSave) {
            try {
                setIsPending(true);
                await dispatch(editPost({id: post.id, title, body: content, user_id: post.user_id, user_name: post.user_name, image, file_name: fileName, reactions: post.reactions})).unwrap();
                setTitle('');
                setContent('');
                setImage(null);
                setFileName('');
                navigate(`/post/${post.id}`);
            } catch (err) {
                console.error('Failed to save the post', err);
            } finally {
                setIsPending(false);
            }
        }
    }

    const handleDelete = async () => {
        try {
            setIsPending(true);
            await dispatch(deletePost({id: post.id, user_id: post.user_id})).unwrap();

            setTitle('');
            setContent('');
            setImage(null);
            setFileName('');
            navigate('/');
        } catch (err) {
            console.error('Failed to delete the post', err);
        } finally {
            setIsPending(false);
        }
    }

    return (
        <main className='new-post'>
                <>
                    <h2>Edit Post</h2>
                    <form className='new-post-form' onSubmit={(e) => e.preventDefault()}>
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
                            value={post.user_name}
                            disabled={true}
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
                        <button className="submit-btn" type='submit' onClick={() => handleEdit(post.id)}>Submit</button>
                        <button className='delete-btn' onClick={() => handleDelete(post.id)}>
                            Delete Post
                        </button>
                    </form>
                </>
        </main>
    );
};

export default EditPost;