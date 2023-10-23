import {Link, useLocation} from 'react-router-dom';
import {useContext, useEffect, useRef} from "react";
import PostSearchContext from "../../context/PostSearchContext";
import styles from './Nav.module.css';
import UserSearchContext from "../../context/UserSearchContext";

const Nav = () => {
    const {searchPost, setSearchPost, resetPostSearch} = useContext(PostSearchContext);
    const {searchUser, setSearchUser, resetUserSearch} = useContext(UserSearchContext);

    const location = useLocation();
    const previousRoute = useRef(location.pathname);

    // Reset search input when navigating to another section of the website
    useEffect(() => {
        if (previousRoute.current === '/' && location.pathname !== '/') {
            resetPostSearch();
        }
        if (previousRoute.current === '/user' && location.pathname !== '/user') {
            resetUserSearch();
        }
        previousRoute.current = location.pathname;
    }, [location.pathname, resetUserSearch, resetPostSearch]);

    const showPostSearch = location.pathname === '/';
    const showUserSearch = location.pathname === '/user';

    return (
        <nav className={styles.nav}>
            { showPostSearch && (
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
                )}
            { showUserSearch && (
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
            )}

            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='post'>Post</Link></li>
                <li><Link to="user">Users</Link></li>
                <li><Link to='about'>About</Link></li>
                {/*The Link component renders an anchor (<a>) and it doesn't cause re-render*/}
                {/*the component is user-initiated*/}
            </ul>
        </nav>
    );
};

export default Nav;