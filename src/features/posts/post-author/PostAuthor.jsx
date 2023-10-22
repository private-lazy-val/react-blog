import {useSelector} from "react-redux";
import {selectUserById} from "../../users/usersSlice";
import styles from './PostAuthor.module.css';
import PropTypes from "prop-types";

const PostAuthor = ({userId}) => {
    const author = useSelector(state => selectUserById(state, userId));
    return (
        <span className={styles.author}>by {author ? author.name : 'Unknown author'}</span>
    );
};


PostAuthor.propTypes = {
    userId: PropTypes.string.isRequired,
};
export default PostAuthor;