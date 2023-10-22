import {selectUserById} from '../usersSlice';
import {selectPostsByUser} from '../../posts/postsSlice';
import {Link, useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import styles from './UserPage.module.css';
import Missing from "../../../components/missing/Missing";
import useIsLoading from "../../../hooks/useIsLoading";

const UserPage = () => {
    const { userId } = useParams();

    const user = useSelector(state => selectUserById(state, userId));
    const postsByUser = useSelector(state => selectPostsByUser(state, userId));

    const { isLoading } = useIsLoading(user);

    let content;

    if (isLoading) {
        content = <p className='status-msg'>Loading posts...</p>;
    } else if (!user) {
        content = <Missing/>;
    } else {
        content = (
            <>
                <h2>{user.name}</h2>
                <ol className={styles['user-list']}>
                    {postsByUser.map(post => (
                        <li key={post.id}>
                            <Link to={`/post/${post.id}`}>{post.title}</Link>
                        </li>
                    ))}
                </ol>
            </>
        );
    }

    return (
        <main className='user'>
            {content}
        </main>
    );
}
export default UserPage;