import {Link, useSearchParams} from 'react-router-dom';
import styles from './UsersList.module.css';
import {useEffect, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import {selectUsersAreLoading, selectUserError, selectUsersHaveError, selectAllUsers} from "../usersSlice";

const UsersList = () => {
    const [searchParams] = useSearchParams();
    const userQuery = searchParams.get('user') || '';

    const users = useSelector(selectAllUsers);
    const [searchedUsers, setSearchedUsers] = useState([]);

    useEffect(() => {
        const filteredUsers = users.filter((user) =>
            (user.name && user.name.toLowerCase().includes(userQuery.toLowerCase())));

        setSearchedUsers(filteredUsers.reverse());
    }, [users, userQuery]);


    const isLoading = useSelector(selectUsersAreLoading);
    const hasError = useSelector(selectUsersHaveError);
    const error = useSelector(selectUserError);

    const renderedUsers = useMemo(() => (
        searchedUsers.length ?
            searchedUsers.map(user => (
                <li key={user.id}>
                    <Link to={`/user/${user.id}`}>{user.name}</Link>
                </li>
            ))
            : <li className='status-msg'>No users to display.</li>
    ), [searchedUsers]);


    let content;
    if (isLoading) {
        content = <p className='status-msg'>Loading users...</p>;
    } else if (hasError) {
        content = <p className='status-msg status-msg_err'>{error}</p>;
    } else {
        content = (
            <>
                <h2>Users</h2>
                <ul className={styles['users-list']}>{renderedUsers}</ul>
            </>
        )
    }

    return (
        <main className='users'>
            {content}
        </main>
    )
}

export default UsersList;