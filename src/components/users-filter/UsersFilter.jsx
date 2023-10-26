import styles from "../nav/Nav.module.css";
import React, {useCallback, useState} from 'react';
import PropTypes from "prop-types";
import {useSearchParams} from "react-router-dom";
import {BsSearchHeartFill} from "react-icons/bs";

const UsersFilter = React.memo(() => {
    const [searchParams, setSearchParams] = useSearchParams();
    const userQuery = searchParams.get('user') || '';
    const [search, setSearch] = useState(userQuery);

    const handleUserSubmit = useCallback((e) => {
        e.preventDefault();
        const form = e.target;
        const query = form.elements[`user-search`].value;

        setSearchParams({user: query});
    }, [setSearchParams]);

    return (
        <form
            className={styles.search}
            onSubmit={handleUserSubmit}
            autoComplete="off">
            <label htmlFor='search'>Search User</label>
            <input
                id='user-search'
                name='user-search'
                type='input'
                placeholder='Search User'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button type='submit' className={styles[`submit-btn`]}><BsSearchHeartFill/></button>
        </form>
    );
});

UsersFilter.propTypes = {
    postId: PropTypes.func,
};
export default UsersFilter;
