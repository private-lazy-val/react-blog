import Feed from '../feed/Feed';
import {selectPostsAreLoading, selectPostsHaveError, selectPostError} from '../postsSlice';
import {useSelector} from "react-redux";
import {useContext, useEffect, useState} from "react";
import PostSearchContext from "../../../context/PostSearchContext";

const Home = () => {
    const {searchPostResults} = useContext(PostSearchContext);
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

    const renderedPosts = (
        searchPostResults.length ?
            <Feed posts={searchPostResults}/> :
            <p className='status-msg'>No posts to display.</p>
    );

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