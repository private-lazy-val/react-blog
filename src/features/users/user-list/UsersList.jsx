import {Link} from 'react-router-dom';
import styles from './UsersList.module.css';
import {useContext} from "react";
import UserSearchContext from "../../../context/UserSearchContext";
import {useSelector} from "react-redux";
import {selectUsersAreLoading, selectUserError, selectUsersHaveError} from "../usersSlice";

const UsersList = () => {
    const {searchUserResults} = useContext(UserSearchContext);
    const isLoading = useSelector(selectUsersAreLoading);
    const hasError = useSelector(selectUsersHaveError);
    const error = useSelector(selectUserError);

    const renderedUsers =
        searchUserResults.length ?
            searchUserResults.map(user => (
                <li key={user.id}>
                    <Link to={`/user/${user.id}`}>{user.name}</Link>
                </li>))
            : <li className='status-msg'>No users to display.</li>

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