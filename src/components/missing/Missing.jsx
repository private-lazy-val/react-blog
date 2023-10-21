import {Link} from 'react-router-dom';
import styles from './Missing.module.css';

const Missing = () => {
    return (
        <main className='missing'>
            <h2>Page Not Found</h2>
            <p className={styles[`missing-text`]}>Well, that's disappointing</p>
            <p className={styles[`missing-text`]}>
                <Link className={styles['go-back']} to='/'>Visit Out Homepage</Link>
            </p>
        </main>
    );
};

export default Missing;