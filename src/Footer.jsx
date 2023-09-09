const Footer = () => {
    const today = new Date();
    return (
        <footer className='Footer'>
            <p>Pekingese Corner &copy;{today.getFullYear()}</p>
        </footer>
    );
};

export default Footer;