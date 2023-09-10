import {Link} from 'react-router-dom';

const Post = ({post}) => {
    return (
        <article className='post'>
            <Link to={`post/${post.id}`}>
                <h2>{post.title}</h2>
                <p className='post-date'>{post.datetime}</p>
            </Link>
            <p className='post-body'>{
                (post.body).length <= 80
                ? post.body
                    : `${(post.body).slice(0, 80)}...`
            }</p>
            {post.image && <img className='post-image_preview' src={post.image} alt={post.title}/>}
        </article>
    );
};

export default Post;