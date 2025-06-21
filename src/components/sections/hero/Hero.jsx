import './Hero.css';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Hero({ info, skills, certifications }) {
    const { t, i18n } = useTranslation();

    const dataInfo = info?.data;
    const dataSkills = skills?.data;
    const dataCertifications = certifications?.data;

    const [showAllSkills, setShowAllSkills] = useState(false);
    const [showAllCertifications, setShowAllCertifications] = useState(false);
    const SKILLS_TO_SHOW_INITIALLY = 6;
    const CERTIFICATIONS_TO_SHOW_INITIALLY = 2;

    const TECH_CATEGORIES = [
        "Core",
        "Database",
        "Version Control",
        "Language",
        "Framework",
        "DevOps/Infra"
    ];

    const getLocalizedContent = (baseKey, isMulti) => {
        const localizedKey = `${baseKey}_${i18n.language}`;

        const fallbackEnglishKey = `${baseKey}_en`;
        const fallbackVietnameseKey = `${baseKey}_vi`;

        if (isMulti) {
            return dataInfo?.[localizedKey]
                || dataInfo?.[fallbackEnglishKey]
                || dataInfo?.[fallbackVietnameseKey]
                || 'N/A';
        } else {
            return dataInfo?.[baseKey] || 'N/A';
        }
    };

    const name = getLocalizedContent('name', true);
    const bio = getLocalizedContent('bio', true);
    const title = getLocalizedContent('title', false);

    const visibleTechSkills = dataSkills && Array.isArray(dataSkills)
        ? dataSkills.filter(skill =>
            !skill.isHidden &&
            TECH_CATEGORIES.includes(skill.category)
        )
        : [];

    const skillsToDisplay = showAllSkills
        ? visibleTechSkills
        : visibleTechSkills.slice(0, SKILLS_TO_SHOW_INITIALLY);

    const visibleCertifications = dataCertifications && Array.isArray(dataCertifications)
        ? dataCertifications.filter(cert => !cert.isHidden)
        : [];

    const certificationsToDisplay = showAllCertifications
        ? visibleCertifications
        : visibleCertifications.slice(0, CERTIFICATIONS_TO_SHOW_INITIALLY);

    const shouldShowCertificationToggleButton = visibleCertifications.length > CERTIFICATIONS_TO_SHOW_INITIALLY;

    const handleToggleCertifications = (event) => {
        event.preventDefault();
        setShowAllCertifications(prevState => !prevState);
    };

    const shouldShowSkillsToggleButton = visibleTechSkills.length > SKILLS_TO_SHOW_INITIALLY;

    const handleToggleSkills = (event) => {
        event.preventDefault();
        setShowAllSkills(prevState => !prevState);
    };

    return (
        <section className="hero-section" id="about">
            <p className="greeting">Hi, I am</p>
            <div className="name-and-title-group">
                <p className="name">{name}.</p>
                <p className="title">{title}</p>
            </div>

            <p className="description">{bio}</p>

            <div className="stack-container">
                <p>{t('technologies')}</p>
                <ul className="stack-list technologies-list">
                    {skillsToDisplay.map((skill) => (
                        <li key={skill.id} className='item-li'>{skill.name}</li>
                    ))}
                </ul>
                {shouldShowSkillsToggleButton && (
                    <a href="#more" className="get-more-link" onClick={handleToggleSkills}>
                        {showAllSkills ? `${t('showLess')} <<` : `${t('showMore')} >>`}
                    </a>
                )}
            </div>
            <div className="stack-container">
                <p>{t('certifications')}</p>
                <ul className="stack-list certifications-list">
                    {certificationsToDisplay.map((certification) => (
                        <li key={certification.id} className='item-li'><a href={certification.url} target="_blank">{t('certificate') + certification.name}</a></li>
                    ))}
                </ul>
                {shouldShowCertificationToggleButton && (
                    <a href="#more" className="get-more-link" onClick={handleToggleCertifications}>
                        {showAllCertifications ? `${t('showLess')} <<` : `${t('showMore')} >>`}
                    </a>
                )}
            </div>
        </section>

    );
};