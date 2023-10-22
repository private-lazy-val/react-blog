import {Link} from 'react-router-dom';
import {useSelector} from "react-redux";
import {selectPostById} from "../postsSlice";
import ReactionButtons from "../reaction-buttons/ReactionButtons";
import PostAuthor from "../post-author/PostAuthor";
import styles from './Post.module.css';
import {truncateOnWord} from "../../../utils/truncateOnWord";
import PropTypes from "prop-types";

const Post = ({postId}) => {
    const post = useSelector(state => selectPostById(state, postId));

    return (
        <article className={styles.post}>
            <Link to={`post/${post.id}`}>
                <h2>{post.title}</h2>
            </Link>
            <div className={styles.wrapper}>
                <p className={styles[`post-date`]}>{post.date}</p>
                <Link to={`user/${post.user_id}`}>
                    <PostAuthor userId={post.user_id}></PostAuthor>
                </Link>
            </div>
            <p className={styles[`post-body`]}>{truncateOnWord(post.body, 80)}</p>
            {post.image &&
                <img className={styles[`post-image_preview`]} src={post.image} alt={post.title}/>}
            <ReactionButtons post={post}/>
        </article>
    );
};


Post.propTypes = {
    postId: PropTypes.number.isRequired,
};

export default Post;