import {selectUserById, selectUsersAreLoading} from '../usersSlice';
import {selectPostsByUser} from '../../posts/postsSlice';
import {Link, Navigate, useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import styles from './UserPage.module.css';
import React from "react";

const UserPage = () => {

    const {userId} = useParams();
    const user = useSelector(state => selectUserById(state, userId));
    const postsByUser = useSelector(state => selectPostsByUser(state, userId));
    const isLoading = useSelector(selectUsersAreLoading);

    let content;
    if (isLoading) {
        content = <p className='status-msg'>Loading posts...</p>;
    } else if (!user) {
        return <Navigate to="/not-found" replace />;
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