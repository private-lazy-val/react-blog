import {FaLaptop, FaTabletAlt, FaMobileAlt} from 'react-icons/fa';
import useWindowSize from "../../hooks/useWindowSize";
import {Link} from "react-router-dom";
import styles from './Header.module.css';

const Header = ({title}) => {
    const {width} = useWindowSize();

    return (
        <header className={styles.header}>
            <Link to="/"><h1>{title}</h1></Link>
            {width < 768 ? <FaMobileAlt /> : width < 992 ? <FaTabletAlt/> : <FaLaptop/>}
        </header>
    );
};

export default Header;