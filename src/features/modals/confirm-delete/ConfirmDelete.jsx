import PropTypes from "prop-types";
import styles from "./ConfirmDelete.module.css";
import pekingeseImage from '../../../images/peki-face.png';
import {useContext} from "react";
import PostFormContext from "../../../context/PostFormContext";
import {useSelector} from "react-redux";
import {selectPostById} from "../../posts/postsSlice";
import {useLocation} from "react-router-dom";

const ConfirmDelete = ({title}) => {
    const location = useLocation();
    const postId = location.pathname.split('/').pop();

    const post = useSelector((state) => selectPostById(state, Number(postId)));

    const {
        handleDelete
    } = useContext(PostFormContext);

    return (
        <>
            <h2 className={styles.title}>{title}</h2>
            <img className={styles.img} src={pekingeseImage} alt='Cute Pekingese'></img>
            <button className={`${styles[`confirm-btn`]} delete-btn`} type='button' onClick={() => handleDelete({id: post.id, user_id: post.user_id})}>
                Confirm Delete
            </button>
        </>
    )
};

ConfirmDelete.propTypes = {
    title: PropTypes.string.isRequired,
};

export default ConfirmDelete;