import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import {Outlet} from 'react-router-dom';

const Layout = () => {
    return (
        <div className='app'>
            <Header title='Pekingese Corner &#128054;'/>
            <Nav/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Layout;