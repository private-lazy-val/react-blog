import styles from './About.module.css';
import {Link} from "react-router-dom";
const About = () => {
    return (
        <main className='about'>
            <h2>About</h2>
            <p className={styles[`about-text`]}>
                Welcome to <Link to='/' className={styles.title}><span>Pekingese Corner</span></Link>, your ultimate sanctuary for everything Pekingese!
            </p>
            <p className={styles[`about-text`]}>
                If you've ever
                wondered what makes these small, fluffy companions so enchanting, you've come to the right place. This
                blog is dedicated to celebrating the beauty, quirks, and majestic history of the Pekingese breed.
            </p>
        </main>
    );
};

export default About;