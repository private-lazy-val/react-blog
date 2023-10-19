import {Link} from 'react-router-dom';
import {useSelector} from "react-redux";
import {selectPostById} from "./postsSlice";
import ReactionButtons from "./ReactionButtons";

const Post = ({postId}) => {
    const post = useSelector(state => selectPostById(state, postId));

    return (
        <article className='post'>
            <Link to={`post/${post.id}`}>
                <h2>{post.title}</h2>
                <p className='post-date'>{post.date}</p>
            </Link>
            <p className='post-body'>{post.body.substring(0, 80)}</p>
            <p>{post.user_name}</p>
            {post.image && <img className='post-image_preview' src={post.image} alt={post.title}/>}
            <ReactionButtons post={post}/>
        </article>
    );
};


export default Post;