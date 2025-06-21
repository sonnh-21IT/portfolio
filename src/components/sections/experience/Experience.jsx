import './Experience.css';
import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export default function Experience({ experiences }) {
    const { t, i18n } = useTranslation();

    const [selectedTab, setSelectedTab] = useState('');
    const [localizedCompanyName, setLocalizedCompanyName] = useState('');
    const [localizedResponsibilities, setLocalizedResponsibilities] = useState([]);

    const currentJob = experiences?.data?.find(
        (exp) => exp.id === selectedTab
    );

    const getLocalizedExperienceContent = useCallback((experience, keyPrefix) => {
        if (!experience) {
            return '';
        }

        const localizedKey = `${keyPrefix}_${i18n.language}`;
        const fallbackEnglishKey = `${keyPrefix}_en`;
        const fallbackVietnameseKey = `${keyPrefix}_vi`;

        const value = experience?.[localizedKey]
            || experience?.[fallbackEnglishKey]
            || experience?.[fallbackVietnameseKey];

        return value || '';
    }, [i18n.language]);

    const parseDescriptionIntoList = useCallback((description) => {
        if (!description) return [];

        const sentences = description
            .split(/(?<=[.?!])\s*(?=[A-ZÀÁẠẢÃĂẰẮẶẲẴÂẦẤẬẨẪĐÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸ])/g)
            .map(sentence => sentence.trim())
            .filter(sentence => sentence !== '');

        return sentences;
    }, []);

    useEffect(() => {
        if (experiences && experiences.data && experiences.data.length > 0) {
            const currentTabIdIsValid = experiences.data.some(exp => exp.id === selectedTab);

            if (!selectedTab || !currentTabIdIsValid) {
                setSelectedTab(experiences.data[0].id);
            }
        } else {
            setSelectedTab('');
        }
    }, [experiences, i18n.language, selectedTab]);

    useEffect(() => {
        if (currentJob) {
            setLocalizedCompanyName(getLocalizedExperienceContent(currentJob, 'company'));

            const description = getLocalizedExperienceContent(currentJob, 'description');
            setLocalizedResponsibilities(parseDescriptionIntoList(description));
        } else {
            setLocalizedCompanyName('');
            setLocalizedResponsibilities([]);
        }
    }, [
        currentJob,
        i18n.language,
        getLocalizedExperienceContent,
        parseDescriptionIntoList
    ]);


    const handleTabClick = (experienceId) => {
        setSelectedTab(experienceId);
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);

        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${month}/${year}`;
    };

    return (
        <section className="experience-section section-container" id="experience">
            <h1 className="section-title">{t('whereIWorkedTitle')}</h1>

            <div className="experience-tabbar">
                {experiences.data &&
                    experiences.data.map((experience) => (
                        <button
                            key={experience.id}
                            className={`tab-button ${selectedTab === experience.id
                                ? 'tab-active'
                                : ''
                                }`}
                            onClick={() => handleTabClick(experience.id)}
                        >
                            {getLocalizedExperienceContent(experience, 'company')}
                        </button>
                    ))}
            </div>

            {currentJob && (
                <div className="job-entry">
                    <p className="job-title">
                        <span>{currentJob.position}</span>
                        <span> @{localizedCompanyName}</span>
                    </p>

                    <p className="worked-duration">
                        {formatDate(currentJob.startDate)} -{' '}
                        {currentJob.endDate ? formatDate(currentJob.endDate) : t('present')}
                    </p>

                    <ul className="worked-responsibilities">
                        {localizedResponsibilities.map((responsibility, index) => (
                            <li key={index} className='item-li'>
                                {responsibility}
                                {![".", "!", "?"].includes(responsibility.slice(-1)) ? "." : ""}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    );
}