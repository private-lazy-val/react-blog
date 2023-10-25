import Feed from '../feed/Feed';
import {selectPostsAreLoading, selectPostsHaveError, selectPostError, selectAllPosts} from '../postsSlice';
import {useSelector} from "react-redux";
import {useEffect, useMemo, useState} from "react";
import {useSearchParams} from "react-router-dom";

const Home = () => {
    const [searchParams] = useSearchParams();
    const postQuery = searchParams.get('post') || '';

    const posts = useSelector(selectAllPosts);
    const [searchedPosts, setSearchedPosts] = useState([]);

    useEffect(() => {
        const filteredPosts = posts.filter((post) =>
            (post.body && post.body.toLowerCase().includes(postQuery.toLowerCase()))
            || (post.title && post.title.toLowerCase().includes(postQuery.toLowerCase())));

        setSearchedPosts(filteredPosts.reverse());
    }, [posts, postQuery]);

    const isLoading = useSelector(selectPostsAreLoading);
    const hasError = useSelector(selectPostsHaveError);
    const error = useSelector(selectPostError);

    const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);

    // By combining the states isLoading and hasAttemptedFetch,
    // the code is aiming to determine if the fetch attempt has completed (whether successfully or with an error).
    useEffect(() => {
        if (!isLoading && !hasAttemptedFetch) {
            setHasAttemptedFetch(true);
        }
    }, [isLoading, hasAttemptedFetch]);

    const renderedPosts = useMemo(() => (
        searchedPosts.length ?
            <Feed posts={searchedPosts}/> :
            <p className='status-msg'>No posts to display.</p>
    ), [searchedPosts]);


    let content;
    if (isLoading) {
        content = <p className='status-msg'>Loading posts...</p>
    } else if (hasError) {
        content = <p className='status-msg status-msg_err'>{error}</p>
    } else if (hasAttemptedFetch) {
        content = renderedPosts;
    }

    return (
        <main className='home'>
            {content}
        </main>
    );
};

export default Home;