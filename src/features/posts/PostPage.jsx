import {useParams, Link} from "react-router-dom"; // useParams allows to access the URL parameters from the current route
import {useSelector} from "react-redux";
import {selectPostById} from "./postsSlice";
import ReactionButtons from './ReactionButtons';
import styles from "./styles/Post.module.css";
import PostAuthor from "./PostAuthor";

const PostPage = () => {
    const {postId} = useParams();
    // id is de-structured directly from the url returned by useParams().
    // This id is then used to find the relevant post from the posts array

    const post = useSelector((state) => selectPostById(state, Number(postId)));

    if (!post) {
        return (
            <>
                <h2>Post Not Found</h2>
                <p>Well, that's disappointing.</p>
                <p>
                    <Link to='/'>Visit our Homepage</Link>
                </p>
            </>
        )
    }

    return (
        <main className='post-page'>
            <article className='post'>
                {<>
                    <h2>{post.title}</h2>
                    <div className={styles.credits}>
                        <p className='post-date'>{post.date}</p>
                        <Link to={`/user/${post.user_id}`}>
                            <PostAuthor userId={post.user_id}></PostAuthor>
                        </Link>
                    </div>
                    <p className='post-body'>{post.body}</p>
                    {post.image && <img className='post-image_full-size' src={post.image} alt={post.title}/>}

                    <ReactionButtons post={post}/>
                    <div className='options-btn'>
                        <Link to={`/edit/${post.id}`}>
                            <button className='edit-btn'>Edit Post</button>
                        </Link>
                    </div>
                </>
                }
            </article>
        </main>
    );
};

export default PostPage;
