import {IoMdClose} from "react-icons/io";
import {useEffect} from "react";
import styles from './NewPost.module.css';
import {handleSetImage} from "../../../utils/postForm";
import usePostForm from "../../../hooks/usePostForm";

const NewPost = () => {
    const {
        handleSubmit,
        title,
        setTitle,
        onTitleChanged,
        setContent,
        setUserName,
        userName,
        onUserNameChanged,
        content,
        image,
        onContentChanged,
        setImage,
        setFileName,
        fileName
    } = usePostForm();

    useEffect(() => {
        setTitle('');
        setUserName('');
        setContent('');
        setImage('');
        setFileName('');
    }, [setTitle, setUserName, setContent, setImage, setFileName]);

    return (
        <main className='new-post'>
            <h2>New Post</h2>
            <form className={styles[`new-post-form`]} onSubmit={(e) => handleSubmit(e, {
                title,
                body: content,
                user_name: userName,
                image,
                file_name: fileName
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