const Footer = () => {
    const today = new Date();
    return (
        <footer className='Footer'>
            <p>The Pekignese Chronicles Inc. &copy;{today.getFullYear()}</p>
        </footer>
    );
};

export default Footer;