import styles from "../nav/Nav.module.css";
import {useContext} from "react";
import PostSearchContext from "../../context/PostSearchContext";

const PostsFilter = () => {
    const {searchPost, setSearchPost} = useContext(PostSearchContext);

    return (
        <form className={styles.search} onSubmit={(e) => e.preventDefault()}>
            <label htmlFor='post-search'>Search Posts</label>
            <input
                id='post-search'
                type='text'
                placeholder='Search Posts'
                value={searchPost}
                onChange={(e) => setSearchPost(e.target.value)}
            />
        </form>
    );
};

export default PostsFilter;