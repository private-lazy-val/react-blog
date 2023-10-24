import {NavLink, useLocation} from 'react-router-dom';
import {useContext, useEffect, useRef} from "react";
import styles from './Nav.module.css';
import UserSearchContext from "../../context/UserSearchContext";
import PostsFilter from "../posts-filter/PostsFilter";
import UsersFilter from "../users-filter/UsersFilter";
import PostSearchContext from "../../context/PostSearchContext";

const Nav = () => {
    const {resetPostSearch} = useContext(PostSearchContext);
    const {resetUserSearch} = useContext(UserSearchContext);

    const location = useLocation();
    const previousRoute = useRef(location.pathname);

    const showPostSearch = location.pathname === '/';
    const showUserSearch = location.pathname === '/user';

    // Reset search input when navigating to another section of the website
    useEffect(() => {
        if (previousRoute.current === '/user' && location.pathname !== '/user') {
            resetUserSearch();
        }
        if (previousRoute.current === '/' && location.pathname !== '/') {
            resetPostSearch();
        }
        previousRoute.current = location.pathname;
    }, [location.pathname, resetUserSearch, resetPostSearch]);

    const setActive = ({isActive}) => isActive ? styles.active : '';

    return (
        <nav className={styles.nav}>
            {showPostSearch && <PostsFilter/>}
            {showUserSearch && <UsersFilter/>}

            <ul>
                <li><NavLink to='/' className={setActive}>Home</NavLink></li>
                <li><NavLink to='post' className={setActive}>Post</NavLink></li>
                <li><NavLink to="user" className={setActive}>Users</NavLink></li>
                <li><NavLink to='about' className={setActive}>About</NavLink></li>
                {/*The Link component renders an anchor (<a>) and it doesn't cause re-render*/}
            </ul>
        </nav>
    );
};

export default Nav;