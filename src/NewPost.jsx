import {useState, useContext, useEffect} from "react";
import DataContext from "./context/DataContext";
import {format} from "date-fns";
import api from "./api/posts";
import {useNavigate} from 'react-router-dom';
import {IoMdClose} from "react-icons/io";

const NewPost = () => {
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const {posts, setPosts, setPostImage, postImage, fileName, setFileName, handleSetImage} = useContext(DataContext);
    const navigate = useNavigate();

    useEffect(() => {
        {fileName && setFileName('')}
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const newPost = {id, title: postTitle, datetime, body: postBody, image: postImage, file_name: fileName};
        try {
            const response = await api.post('/posts', newPost);
            const allPosts = [...posts, response.data];
            setPosts(allPosts);
            setPostTitle('');
            setPostBody('');
            setPostImage(null);
            setFileName('');
            navigate('/'); // after submitting a new post, the navigate('/') function call will change the application's current route to the home page
            // the hook is non user-initiated
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }

    return (
        <main className='NewPost'>
            <h2>New Post</h2>
            <form className='newPostForm' onSubmit={handleSubmit}>
                <label htmlFor='postTitle'>Title:</label>
                <input
                    id='postTitle'
                    type='text'
                    required
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                />
                <label htmlFor='postBody'>Post:</label>
                <textarea
                    id='postBody'
                    required
                    value={postBody}
                    onChange={(e) => setPostBody(e.target.value)}
                />
                <label htmlFor='postImage'>Upload an image:</label>
                <div className="custom-file-input">
                    <input
                        id='postImage'
                        type='file'
                        style={{display: 'none'}}  // Hide the default input
                        onChange={handleSetImage}
                    />
                    <button className="chooseFileButton" type="button" onClick={() => document.getElementById('postImage').click()}>
                        Choose File
                    </button>
                    <span>{fileName || 'No file chosen'}</span>  {/* Displaying the name of the file */}
                    {fileName && <button className="removeFileButton" type="button" onClick={() => { setPostImage(null); setFileName(''); }}><IoMdClose/></button>}
                </div>
                <button className="submitButton" type='submit'>Submit</button>
            </form>
        </main>
    );
};

export default NewPost;