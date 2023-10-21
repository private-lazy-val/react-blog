import Post from '../post/Post';
const Feed = ({posts}) => {
    return (
        <>
            {posts.map((post) => (
                <Post key={post.id} postId={post.id}/>
            ))}
        </>
    );
};

export default Feed;