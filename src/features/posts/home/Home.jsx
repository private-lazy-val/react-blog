import Feed from '../feed/Feed';
import {selectPostsAreLoading, selectPostsHaveError, selectPostError} from '../postsSlice';
import {useSelector} from "react-redux";
import {useContext, useEffect, useState} from "react";
import PostSearchContext from "../../../context/PostSearchContext";

const Home = () => {
    const {searchPostResults} = useContext(PostSearchContext);
    const postsAreLoading = useSelector(selectPostsAreLoading);
    const postsHaveError = useSelector(selectPostsHaveError);
    const error = useSelector(selectPostError);

    const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);

    // By combining the states postsAreLoading and hasAttemptedFetch,
    // the code is aiming to determine if the fetch attempt has completed (whether successfully or with an error).
    useEffect(() => {
        if (!postsAreLoading && !hasAttemptedFetch) {
            setHasAttemptedFetch(true);
        }
    }, [postsAreLoading, hasAttemptedFetch]);

    return (
        <main className='home'>
            {postsAreLoading && <p className='status-msg'>Loading posts...</p>}
            {postsHaveError && <p className='status-msg status-msg_err'>{error}</p>}
            {!postsAreLoading && !postsHaveError && hasAttemptedFetch && (searchPostResults.length ?
                <Feed posts={searchPostResults}/> :
                <p className='status-msg'>No posts to display.</p>)}
        </main>
    );
};

export default Home;