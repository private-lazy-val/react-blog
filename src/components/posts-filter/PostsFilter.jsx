import styles from "../nav/Nav.module.css";
import React, {useCallback, useState} from 'react';
import PropTypes from "prop-types";
import {useSearchParams} from "react-router-dom";
import { BsSearchHeartFill } from 'react-icons/bs';

const PostsFilter = React.memo(() => {
    const [searchParams, setSearchParams] = useSearchParams();
    const postQuery = searchParams.get('post') || '';
    const [search, setSearch] = useState(postQuery);

    const handlePostSubmit = useCallback((e) => {
        e.preventDefault();
        const form = e.target;
        const query = form.elements[`post-search`].value;

        setSearchParams({post: query});
    }, [setSearchParams]);

    return (
        <form className={styles.search} onSubmit={handlePostSubmit}>
            <label htmlFor='post-search'>Search Posts</label>
            <input
                id='post-search'
                name='post-search'
                type='input'
                placeholder='Search Posts'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button type='submit' className={styles[`submit-btn`]}><BsSearchHeartFill /></button>
        </form>
    );
});

PostsFilter.propTypes = {
    postId: PropTypes.func,
};

export default PostsFilter;