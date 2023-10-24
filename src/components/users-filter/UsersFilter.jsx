import styles from "../nav/Nav.module.css";
import {useContext} from "react";
import UserSearchContext from "../../context/UserSearchContext";

const UsersFilter = () => {
    const {searchUser, setSearchUser} = useContext(UserSearchContext);

    return (
        <form className={styles.search} onSubmit={(e) => e.preventDefault()}>
            <label htmlFor='search'>Search User</label>
            <input
                id='user-search'
                type='text'
                placeholder='Search User'
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
            />
        </form>
    );
};

export default UsersFilter;