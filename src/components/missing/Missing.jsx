import {useNavigate} from 'react-router-dom';
import styles from './Missing.module.css';

const Missing = () => {
    const navigate = useNavigate();

    function goHome() {
        navigate('/', { replace: true });
    }

    function handleLinkClick(event) {
        event.preventDefault();
        goHome();
    }
    return (
        <main className='missing'>
            <h2>Page Not Found</h2>
            <p className={styles[`missing-text`]}>Well, that's disappointing</p>
            <p className={styles[`missing-text`]}>
                <a className={styles['go-back']} href="/" onClick={handleLinkClick}>Visit Our Homepage</a>
            </p>
        </main>
    );
};

export default Missing;