import {selectUserById} from './usersSlice';
import { selectPostsByUser } from '../posts/postsSlice';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './styles/UserPage.module.css';

const UserPage = () => {
    const { userId } = useParams();

    const user = useSelector(state => selectUserById(state, Number(userId)));

    const postsForUser = useSelector(state => selectPostsByUser(state, Number(userId)));

    const postTitles = postsForUser.map(post => (
        <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
        </li>
    ))

    return (
        <main className='user'>
            <h2>{user?.name}</h2>
            <ol className={styles[`user-list`]}>{postTitles}</ol>
        </main>
    )
}
export default UserPage;