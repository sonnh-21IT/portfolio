import './EmailSidebar.css'
export default function EmailSidebar({ position, email }) {
    const sidebarClassName = `email-sidebar ${position}`;

    const content = (
        <>
            {position === 'left' && <div className="email-line"></div>}
            <a href={"mailto:" + email} className="email-link">
                {email}
            </a>
            {position === 'right' && <div className="email-line"></div>}
        </>
    );

    return (
        <div className={sidebarClassName}>
            {content}
        </div>
    );
};