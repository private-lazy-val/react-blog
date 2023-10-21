import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import {IoMdClose} from "react-icons/io";
import {deletePost, editPost, selectPostById} from "../postsSlice";
import {useSelector, useDispatch} from "react-redux";
import Missing from "../../../components/missing/Missing";
import styles from "./EditPost.module.css";
import {handleSetImage} from "../../../utils/utils";

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
        // Check if post exists
        if (post) {
            setTitle(post.title);
            setContent(post.body);
            setImage(post?.image);
            setFileName(post?.file_name);
        }
    }, [post]);

    if (!post) {
        return (
            <Missing/>
        )
    }

    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);

    const canSave = [title, content, post.user_name].every(Boolean) && isPending === false;

    const handleEdit = async () => {
        if (canSave) {
            try {
                setIsPending(true);
                await dispatch(editPost({
                    id: post.id,
                    title,
                    body: content,
                    user_id: post.user_id,
                    user_name: post.user_name,
                    image,
                    file_name: fileName,
                    reactions: post.reactions
                })).unwrap();
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
        <main className='edit-post'>
            <h2>Edit Post</h2>
            <form className={styles[`new-post-form`]} onSubmit={(e) => e.preventDefault()}>
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
                <div className={styles[`edit-btns`]}>
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
                    <button className='delete-btn' type='button' onClick={() => handleDelete(post.id)}>
                        Delete Post
                    </button>
                </div>

                <button className='submit-btn' type='submit' onClick={() => handleEdit(post.id)}>
                    Submit
                </button>
            </form>
        </main>
    );
};

export default EditPost;