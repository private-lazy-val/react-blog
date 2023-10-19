import {useSelector} from "react-redux";
import {selectUserById} from "../users/usersSlice";
import styles from './styles/PostAuthor.module.css';

import React from 'react';

const PostAuthor = ({userId}) => {
    const author = useSelector(state => selectUserById(state, userId));
    return (
        <span className={styles.author}>by {author ? author.name : 'Unknown author'}</span>
    );
};

export default PostAuthor;