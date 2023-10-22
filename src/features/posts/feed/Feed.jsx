import Post from '../post/Post';
import PropTypes from "prop-types";
import postPropTypes from '../../../utils/propTypes';
const Feed = ({posts}) => {
    return (
        <>
            {posts.map((post) => (
                <Post key={post.id} postId={post.id}/>
            ))}
        </>
    );
};

Feed.propTypes = {
    posts: PropTypes.arrayOf(postPropTypes).isRequired,
};
export default Feed;