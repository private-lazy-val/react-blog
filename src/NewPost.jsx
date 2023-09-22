import {useEffect} from 'react';
import {format} from "date-fns";
import {useNavigate} from 'react-router-dom';
import {IoMdClose} from "react-icons/io";
import {useStoreState, useStoreActions} from "easy-peasy";

const NewPost = () => {
    const navigate = useNavigate();

    const posts = useStoreState((state) => state.posts);
    const postTitle = useStoreState((state) => state.postTitle);
    const postBody = useStoreState((state) => state.postBody);
    const postImage = useStoreState((state) => state.postImage);
    const fileName = useStoreState((state) => state.fileName);

    const savePost = useStoreActions((actions) => actions.savePost);
    const uploadFile = useStoreActions((actions) => actions.uploadFile);

    const setPostTitle = useStoreActions((actions) => actions.setPostTitle);
    const setPostBody = useStoreActions((actions) => actions.setPostBody);
    const setPostImage =  useStoreActions((actions) => actions.setPostImage);
    const setFileName = useStoreActions((actions) => actions.setFileName);


    useEffect(() => {
        fileName && setFileName('');
        postTitle && setPostTitle('');
        postBody && setPostBody('');
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const newPost = {id, title: postTitle, datetime, body: postBody, image: postImage, file_name: fileName};
        savePost(newPost);
        navigate('/'); // after submitting a new post, the navigate('/') function call will change the application's current route to the home page
        // the hook is non user-initiated
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
                    {/* Hidden default input */}
                    <input
                        className="default-file-input"
                        id='post-image'
                        type='file'
                        onChange={(e) => uploadFile(e)}
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