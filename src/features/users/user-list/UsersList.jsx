import {Link} from 'react-router-dom';
import styles from './UsersList.module.css';
import {useContext} from "react";
import UserSearchContext from "../../../context/UserSearchContext";
import {useSelector} from "react-redux";
import {selectUserAreLoading, selectUserError, selectUsersHaveError} from "../usersSlice";

const UsersList = () => {
    const {searchUserResults} = useContext(UserSearchContext);
    const usersAreLoading = useSelector(selectUserAreLoading);
    const usersHaveError = useSelector(selectUsersHaveError);
    const error = useSelector(selectUserError);

    const renderedUsers =
        searchUserResults.length ?
            searchUserResults.map(user => (
                <li key={user.id}>
                    <Link to={`/user/${user.id}`}>{user.name}</Link>
                </li>))
            : <p className='status-msg'>No users to display.</p>

    return (
        <main className='users'>
            {usersAreLoading && <p className='status-msg'>Loading posts...</p>}
            {usersHaveError && <p className='status-msg status-msg_err'>{error}</p>}
            {!usersAreLoading && !usersHaveError &&
                <>
                    <h2>Users</h2>
                    <ul className={styles['users-list']}>{renderedUsers}</ul>
                </>
            }
        </main>
    )
}

export default UsersList;