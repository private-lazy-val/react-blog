import { Link } from 'react-router-dom';
import styles from './styles/UsersList.module.css';
import {useContext} from "react";
import UserSearchContext from "../../context/UserSearchContext";

const UsersList = () => {
    const {searchUserResults} = useContext(UserSearchContext);

    const renderedUsers =
        searchUserResults.length ?
        searchUserResults.map(user => (
            <li key={user.id}>
                <Link to={`/user/${user.id}`}>{user.name}</Link>
            </li>))
        : <p className='status-msg'>No users to display.</p>

    return (
        <main className='users'>
            <h2>Users</h2>
            <ul className={styles['users-list']}>{renderedUsers}</ul>
        </main>
    )
}

export default UsersList;