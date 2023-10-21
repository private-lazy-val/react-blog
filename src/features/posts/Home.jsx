import Feed from './Feed';
import {selectPostsIsLoading, selectPostsHasError, selectPostError} from './postsSlice';
import {useSelector} from "react-redux";
import {useContext, useEffect, useState} from "react";
import PostSearchContext from "../../context/PostSearchContext";

const Home = () => {
    const {searchPostResults} = useContext(PostSearchContext);
    const postsAreLoading = useSelector(selectPostsIsLoading);
    const postsHaveError = useSelector(selectPostsHasError);
    const error = useSelector(selectPostError);

    const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);

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