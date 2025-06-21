import './App.css';
import { Container } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import { fetchDataFromAPI } from './services/api';
import Header from './components/header/Header'
import Loading from './components/loading/Loading';
import EmailSidebar from './components/sidebar/EmailSidebar';
import Hero from './components/sections/hero/Hero';
import Experience from './components/sections/experience/Experience';
import Project from './components/sections/project/Project';
import Footer from './components/footer/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const [info, setInfo] = useState(null);
  const [skills, setSkills] = useState(null);
  const [certifications, setCertifications] = useState(null);
  const [experiences, setExperiences] = useState(null);
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [
          infoRes,
          skillsRes,
          experienceRes,
          projectsRes,
          certificationsRes
        ] = await Promise.all([
          fetchDataFromAPI('PersonalInfo'),
          fetchDataFromAPI('Skills'),
          fetchDataFromAPI('Experience'),
          fetchDataFromAPI('Projects'),
          fetchDataFromAPI('Certifications')
        ]);

        setInfo(infoRes);
        setSkills(skillsRes);
        setCertifications(certificationsRes);
        setExperiences(experienceRes);
        setProjects(projectsRes);

        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const handleLanguageChange = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (<Loading />) : (
        <Container fluid className="px-md-5 px-3 app-container">
          <Header onLanguageChange={handleLanguageChange} />
          <EmailSidebar position="left" email={info.data.email} />
          <EmailSidebar position="right" email={info.data.email} />
          <div className='app-content'>
            <Hero info={info} skills={skills} certifications={certifications} />
            <Experience experiences={experiences} />
            <Project projects={projects} />
            <Footer phone={info.data.phone} email={info.data.email} github={info.data.github} />
          </div>
        </Container>
      )}
    </ >
  )
}

export default App
