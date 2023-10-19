import {Link} from 'react-router-dom';
import {useSelector} from "react-redux";
import {selectPostById} from "./postsSlice";
import ReactionButtons from "./ReactionButtons";
import PostAuthor from "./PostAuthor";
import styles from './styles/Post.module.css';

const Post = ({postId}) => {
    const post = useSelector(state => selectPostById(state, postId));

    return (
        <article className='post'>
            <Link to={`post/${post.id}`}>
                <h2>{post.title}</h2>
            </Link>
            <div className={styles.credits}>
                <p className='post-date'>{post.date}</p>
                <Link to={`user/${post.user_id}`}>
                    <PostAuthor userId={post.user_id}></PostAuthor>
                </Link>
            </div>
            <p className='post-body'>{post.body.substring(0, 80)}</p>
            {post.image && <img className='post-image_preview' src={post.image} alt={post.title}/>}
            <ReactionButtons post={post}/>
        </article>
    );
};


export default Post;