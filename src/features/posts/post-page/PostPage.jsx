import {useParams, Link} from "react-router-dom"; // useParams allows to access the URL parameters from the current route
import {useSelector} from "react-redux";
import {selectPostById} from "../postsSlice";
import ReactionButtons from '../reaction-buttons/ReactionButtons';
import PostAuthor from "../post-author/PostAuthor";
import Missing from "../../../components/missing/Missing";
import styles from './PostPage.module.css';
import PropTypes from "prop-types";
import useIsLoading from "../../../hooks/useIsLoading";

const PostPage = ({openModal}) => {
    const {postId} = useParams();
    // id is de-structured directly from the url returned by useParams().
    // This id is then used to find the relevant post from the posts array
    const post = useSelector((state) => selectPostById(state, Number(postId)));

    const { postIsLoading }  = useIsLoading(post);

    return (
        <main className='post-page'>
            {postIsLoading && <p>Loading...</p>}
            {!postIsLoading && !post && <Missing/>}
            {!postIsLoading && post &&
                <article className={styles[`post_full-size`]}>
                    <h2>{post.title}</h2>
                    <div className={styles[`wrapper_full-size`]}>
                        <p className={styles[`post-date_full-size`]}>{post.date}</p>
                        <Link to={`/user/${post.user_id}`}>
                            <PostAuthor userId={post.user_id}></PostAuthor>
                        </Link>
                    </div>
                    <p className={styles[`post-body_full-size`]}>{post.body}</p>

                    {post.image &&
                        <img className={styles[`post-image_full-size`]} src={post.image} alt={post.title}
                             onClick={openModal}/>}

                    <ReactionButtons post={post}/>

                    <Link to={`/edit/${post.id}`}>
                        <button className='edit-btn'>Edit Post</button>
                    </Link>
                </article>
            }
        </main>
    );
};

PostPage.propTypes = {
    openModal: PropTypes.func.isRequired,
};

export default PostPage;
