import './Header.css';
import token from '../../assets/token.png';
import { Navbar, Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export default function Header() {
    const { t } = useTranslation();

    const navItems = [
        { id: 'about', labelKey: 'about' },
        { id: 'experience', labelKey: 'experience' },
        { id: 'projects', labelKey: 'projects' },
        { id: 'contact', labelKey: 'contact' },
    ];

    return (
        <Navbar className="minimal-header-navbar">
            <Navbar.Brand href="#home" className="d-flex align-items-center me-auto">
                <img src={token} alt="SON" style={{ height: '56px', width: 'auto' }} className="d-inline-block align-top" />
            </Navbar.Brand>
            <div className="d-none d-md-flex ms-auto align-items-center">
                <Nav style={{ fontFamily: 'Fira Mono, monospace' }}>
                    {navItems.map((item, index) => (
                        <Nav.Link
                            key={item.id}
                            href={`#${item.id}`}
                            className="mx-md-3 mx-sm-2 minimal-nav-link">
                            <span className="nav-item-number">0{index + 1}.</span>{t(item.labelKey)}
                        </Nav.Link>
                    ))}
                </Nav>
            </div>
        </Navbar>
    );
};