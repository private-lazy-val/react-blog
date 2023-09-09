import {useParams, Link} from "react-router-dom"; // useParams allows to access the URL parameters from the current route
import {useContext} from "react";
import DataContext from "./context/DataContext";
import api from "./api/posts";
import {useNavigate} from 'react-router-dom';

const PostPage = () => {
    const {posts, setPosts} = useContext(DataContext);
    const navigate = useNavigate();
    const {id} = useParams(); // id is de-structured directly from the object returned by useParams().
    // This ID is then used to find the relevant post from the posts array
    const post = posts.find(post => (post.id).toString() === id) // toString to use ===

    const handleDelete = async (id) => {
        try {
            await api.delete(`/posts/${id}`);
            const postsList = posts.filter((post) => post.id !== id);
            setPosts(postsList);
            navigate('/');
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }

    return (
        <main className='PostPage'>
            <article className='post'>
                {post &&
                    <>
                        <h2>{post.title}</h2>
                        <p className='postDate'>{post.datetime}</p>
                        <p className='postBody'>{post.body}</p>
                        {post.image && <img className='postImage_full-size' src={post.image} alt={post.title}/>}
                        <div className='optionsButtons'>
                            <Link to={`/edit/${post.id}`}>
                                <button className='editButton'>Edit Post</button>
                            </Link>
                            <button className='deleteButton' onClick={() => handleDelete(post.id)}>
                                Delete Post
                            </button>
                        </div>
                    </>
                }
                {!post &&
                    <>
                        <h2>Post Not Found</h2>
                        <p>Well, that's disappointing.</p>
                        <p>
                            <Link to='/'>Visit our Homepage</Link>
                        </p>
                    </>
                }
            </article>
        </main>
    );
};

export default PostPage;