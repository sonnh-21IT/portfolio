import './Footer.css';
import token from '../../assets/token.png';

export default function Footer({ phone, email, github }) {
    return (
        <footer className="footer-container" id="contact">
            <div className="footer-logo">
                <img src={token} />
            </div>
            <div className="footer-contact-info">
                <span className="contact-item contact-link">{phone}</span>
                <span className="contact-separator"> • </span>
                <a href={"mailto:" + email} className="contact-item contact-link">{email}</a>
                <span className="contact-separator"> • </span>
                <a href={github} target="_blank" rel="noopener noreferrer" className="contact-item contact-link">{github}</a>
            </div>
        </footer>
    );
}