import {Link, useLocation} from 'react-router-dom';
import {useContext} from "react";
import PostSearchContext from "../context/PostSearchContext";

const Nav = () => {
    const {search, setSearch} = useContext(PostSearchContext);

    const location = useLocation();
    const showSearch = location.pathname === '/';

    return (
        <nav className='nav'>
            { showSearch && (
            <form className='search-form' onSubmit={(e) => e.preventDefault()}>
                <label htmlFor='search'>Search Posts</label>
                <input
                    id='search'
                    type='text'
                    placeholder='Search Posts'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
                )}
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='post'>Post</Link></li>
                <li><Link to="user">Users</Link></li>
                <li><Link to='about'>About</Link></li>
                {/*The Link component renders an anchor (<a>) element, making it accessible by default*/}
                {/*the component is user-initiated*/}
            </ul>
        </nav>
    );
};

export default Nav;