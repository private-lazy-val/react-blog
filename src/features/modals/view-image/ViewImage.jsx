import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectPostById} from "../../posts/postsSlice";
import styles from "./ViewImage.module.css";

const ViewImage = () => {
    const location = useLocation();
    const postId = location.pathname.split('/').pop();

    const post = useSelector((state) => selectPostById(state, Number(postId)));

    return (
        <figure>
            <img className={styles.img} src={post.image} alt='His majesty Pekingese'/>
            <figcaption className={styles.caption}>{post.title}</figcaption>
        </figure>
    );
};

export default ViewImage;