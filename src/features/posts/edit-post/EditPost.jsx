import React, {useContext, useEffect} from "react";
import {useParams} from "react-router-dom";
import {IoMdClose} from "react-icons/io";
import {selectPostById} from "../postsSlice";
import {useSelector} from "react-redux";
import styles from "./EditPost.module.css";
import {handleSetImage} from "../../../utils/postForm";
import PostFormContext from "../../../context/PostFormContext";
import Missing from "../../../components/missing/Missing";
import PropTypes from "prop-types";

const EditPost =({openModal}) => {

    const {postId} = useParams();
    const post = useSelector((state) => selectPostById(state, Number(postId)));

    const {
        handleEdit,
        title,
        setTitle,
        onTitleChanged,
        content,
        setContent,
        onContentChanged,
        image,
        setImage,
        setUserName,
        setFileName,
        fileName
    } = useContext(PostFormContext);

    useEffect(() => {
        // Check if post exists
        if (post) {
            setTitle(post.title);
            setContent(post.body);
            setUserName(post.user_name);
            setImage(post?.image);
            setFileName(post?.file_name);
        }
    }, [post, setTitle, setContent, setImage, setFileName, setUserName]);

    if (!post) {
        return (
            <Missing/>
        )
    }

    return (
        <main className='edit-post'>
            <h2>Edit Post</h2>
            <form className={styles[`new-post-form`]} onSubmit={(e) => handleEdit(e, {
                id: post.id,
                title,
                body: content,
                user_id: post.user_id,
                user_name: post.user_name,
                image,
                file_name: fileName,
                reactions: post.reactions
            })}>
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
                    <button className='delete-btn' type='button' onClick={() => openModal()}>
                        Delete Post
                    </button>
                </div>

                <button className='submit-btn' type='submit'>
                    Submit
                </button>
            </form>
        </main>
    );
};

EditPost.propTypes = {
    posts: PropTypes.func,
};

export default EditPost;