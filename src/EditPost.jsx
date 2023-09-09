import {useEffect, useContext, useState} from "react";
import {useParams, Link} from "react-router-dom";
import DataContext from "./context/DataContext";
import {format} from "date-fns";
import api from "./api/posts";
import {useNavigate} from 'react-router-dom';

const EditPost = () => {
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const {posts, setPosts, postImage, setPostImage, handleImageChange} = useContext(DataContext);
    const {id} = useParams();
    const post = posts.find(post => (post.id).toString() === id);
    const navigate = useNavigate();

    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
            setPostImage(post.image);
        }
    }, [post, setEditTitle, setEditBody])

    const handleEdit = async (id) => {
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const updatedPost = {id, title: editTitle, datetime, body: editBody, image: postImage};
        try {
            const response = await api.put(`/posts/${id}`, updatedPost);
            setPosts(posts.map(post => { if(post.id === id) {
                return {...response.data} } else { return  post}}));
            setEditTitle('');
            setEditBody('');
            setPostImage(null);
            navigate('/');
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }

    return (
        <main className='NewPost'>
            {editTitle &&
                <>
                    <h2>Edit Post</h2>
                    <form className='newPostForm' onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor='postTitle'>Title:</label>
                        <input
                            id='postTitle'
                            type='text'
                            required
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <label htmlFor='postBody'>Post:</label>
                        <textarea
                            id='postBody'
                            required
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                        />
                        <label htmlFor='postImage' style={{ marginBottom: ".5rem" }}>Upload an image:</label>
                        <input
                            id='postImage'
                            type='file'
                            onChange={handleImageChange}
                        />
                        <button type='submit' onClick={() => handleEdit(post.id)}>Submit</button>
                    </form>
                </>
            }
            {!editTitle &&
                <>
                    <h2>Post Not Found</h2>
                    <p>Well, that's disappointing</p>
                    <p>
                        <Link to='/'>Visit Out Homepage</Link>
                    </p>
                </>
            }
        </main>
    );
};

export default EditPost;