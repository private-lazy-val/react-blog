import Post from './Post';
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