const Footer = () => {
    const today = new Date();
    return (
        <footer className='footer'>
            <p>Pekingese Corner &copy;{today.getFullYear()}</p>
        </footer>
    );
};

export default Footer;