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
            fileName && setFileName('')
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
        <main className='new-post'>
            <h2>New Post</h2>
            <form className='new-post-form' onSubmit={handleSubmit}>
                <label htmlFor='post-title'>Title:</label>
                <input
                    id='post-title'
                    type='text'
                    required
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                />
                <label htmlFor='post-body'>Post:</label>
                <textarea
                    id='post-body'
                    required
                    value={postBody}
                    onChange={(e) => setPostBody(e.target.value)}
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
                        setPostImage(null);
                        setFileName('');
                    }}><IoMdClose/></button>}
                </div>
                <button className="submit-btn" type='submit'>Submit</button>
            </form>
        </main>
    );
};

export default NewPost;