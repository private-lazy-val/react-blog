import {useParams, Link, useNavigate} from "react-router-dom"; // useParams allows to access the URL parameters from the current route
import {useStoreState, useStoreActions} from "easy-peasy";

const PostPage = () => {
    const navigate = useNavigate();
    const {id} = useParams(); // id is de-structured directly from the url returned by useParams().
    // This ID is then used to find the relevant post from the posts array

    const getPostById = useStoreState((state) => state.getPostById);
    const deletePost = useStoreActions((actions) => actions.deletePost);
    const post = getPostById(id);

    const handleDelete = (id) => {
        deletePost(id);
        navigate('/');
    }

    return (
        <main className='post-page'>
            <article className='post'>
                {post &&
                    <>
                        <h2>{post.title}</h2>
                        <p className='post-date'>{post.datetime}</p>
                        <p className='post-body'>{post.body}</p>
                        {post.image && <img className='post-image_full-size' src={post.image} alt={post.title}/>}
                        <div className='options-btn'>
                            <Link to={`/edit/${post.id}`}>
                                <button className='edit-btn'>Edit Post</button>
                            </Link>
                            <button className='delete-btn' onClick={() => handleDelete(post.id)}>
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
