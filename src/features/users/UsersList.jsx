import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {selectAllUsers} from "./usersSlice";
import styles from './styles/UsersList.module.css';

const UsersList = () => {
    const users = useSelector(selectAllUsers);
    const renderedUsers = users.map(user => (
        <li key={user.id}>
            <Link to={`/user/${user.id}`}>{user.name}</Link>
        </li>
    ))

    return (
        <main className='users'>
            <h2>Users</h2>
            <ul className={styles['users-list']}>{renderedUsers}</ul>
        </main>
    )
}

export default UsersList;