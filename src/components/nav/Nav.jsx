import {NavLink, useLocation} from 'react-router-dom';
import styles from './Nav.module.css';
import PostsFilter from "../posts-filter/PostsFilter";
import UsersFilter from "../users-filter/UsersFilter";

const Nav = () => {

    const location = useLocation();
    const showPostSearch = location.pathname === '/';
    const showUserSearch = location.pathname === '/user';

    const setActive = ({isActive}) => isActive ? styles.active : '';

    return (
        <nav className={styles.nav}>
            {showPostSearch && <PostsFilter/>}
            {showUserSearch && <UsersFilter/>}

            <ul>
                {/*NavLink has an 'active' class applied to it*/}
                {/*The Link component renders an anchor (<a>) and it doesn't cause re-render*/}
                <li><NavLink to='/' className={setActive}>Home</NavLink></li>
                <li><NavLink to='post' className={setActive}>Post</NavLink></li>
                <li><NavLink to="user" className={setActive}>Users</NavLink></li>
                <li><NavLink to='about' className={setActive}>About</NavLink></li>
            </ul>
        </nav>
    );
};

export default Nav;