import './Project.css';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function Project({ projects }) {
    const { t, i18n } = useTranslation();

    const [showAllProjects, setShowAllProjects] = useState(false);
    const [allFilteredProjects, setAllFilteredProjects] = useState([]);

    const getLocalizedProjectContent = (project, keyPrefix, i18n, t) => {
        if (!project) {
            return '';
        }

        const vieKey = `${keyPrefix}_vi`;
        const encKey = `${keyPrefix}_en`;

        let value;
        if (i18n.language === 'vi') {
            value = project[vieKey];
        } else {
            value = project[encKey] || project[vieKey];
        }

        return value || t(`project_section.no_${keyPrefix}`);
    };

    const INITIAL_PROJECT_COUNT = 3;

    useEffect(() => {
        if (projects && projects.data && Array.isArray(projects.data)) {
            const filtered = projects.data.filter(project => !project.is_hidden);
            setAllFilteredProjects(filtered);
            setShowAllProjects(false);
        } else {
            setAllFilteredProjects([]);
            setShowAllProjects(false);
        }
    }, [projects]);

    const projectsToDisplay = showAllProjects
        ? allFilteredProjects
        : allFilteredProjects.slice(0, INITIAL_PROJECT_COUNT);

    const shouldShowToggleButton = allFilteredProjects.length > INITIAL_PROJECT_COUNT;

    const handleToggleProjects = (event) => {
        event.preventDefault();
        setShowAllProjects(prevState => !prevState);
    };

    return (
        <section className="project-section section-container" id="projects">
            <h1 className="section-title">{t('someThingsIBuilt')}</h1>

            <div className="projects-list">
                {projectsToDisplay.map((project) => {
                    const projectName = getLocalizedProjectContent(project, 'name', i18n, t);
                    const projectDescription = getLocalizedProjectContent(project, 'description', i18n, t);

                    const technologiesList = project.technologies
                        ? project.technologies.split(',').map(tech => tech.trim())
                        : [];

                    const projectLink = project.liveUrl || project.githubUrl || '#';

                    return (
                        <div className="featured-project" key={project.id}>
                            <div className="project-header">
                                <h3 className="project-subtitle">{t('featuredProject')}</h3>
                                <a
                                    href={projectLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="arrow-icon"
                                >
                                    &#x2197;
                                </a>
                            </div>
                            <h2 className="project-title">{projectName}</h2>
                            <p className="project-description">{projectDescription}</p>
                            <ul className="tech-used">
                                {technologiesList.map((tech, index) => (
                                    <li key={index}>{tech}</li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
                {shouldShowToggleButton && (
                    <a href="#projects" className="get-more-link" onClick={handleToggleProjects}>
                        {showAllProjects ? `${t('showLess')} <<` : `${t('showMore')} >>`}
                    </a>
                )}
            </div>
        </section>
    );
}