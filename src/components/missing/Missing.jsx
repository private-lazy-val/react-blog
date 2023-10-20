import {Link} from 'react-router-dom';
import styles from './Missing.module.css';

const Missing = () => {
    return (
        <main className={styles.missing}>
            <h2>Page Not Found</h2>
            <p>Well, that's disappointing</p>
            <p>
                <Link className={styles['go-back']} to='/'>Visit Out Homepage</Link>
            </p>
        </main>
    );
};

export default Missing;