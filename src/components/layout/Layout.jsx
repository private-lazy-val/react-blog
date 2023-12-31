import Header from "../header/Header";
import Nav from "../nav/Nav";
import Footer from "../footer/Footer";
import {Outlet} from 'react-router-dom';
import styles from './Layout.module.css';

const Layout = () => {
    return (
        <div className={styles.app}>
            <Header/>
            <Nav/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Layout;