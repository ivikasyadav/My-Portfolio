import React, { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import Fitness from './assets/Fitness.png'
import Hire from './assets/Hire.png'
import Feedback from './assets/Feedback.png'
import Social from './assets/Social.png'
import Ecom from './assets/Ecom.png'
import Chat from './assets/Chat.png'
import Profile from './assets/Profile.jpg'
import iMG from './assets/iMG.jpg'


const App = () => {
  
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  
  const [activeSection, setActiveSection] = useState('about');

  
  const scrollToSection = (ref, sectionName) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionName);
    }
  };

  
  useEffect(() => {
    const observerOptions = {
      root: null, 
      rootMargin: '0px',
      threshold: 0.5, 
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    
    const sections = [aboutRef, skillsRef, experienceRef, projectsRef, contactRef];
    sections.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    
    return () => {
      sections.forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  
  const sectionBackgrounds = ['bg-gray-950', 'bg-gray-900'];

  return (
    
    <div className="bg-black text-gray-100 min-h-screen font-inter">
     
      <Navbar
        scrollToSection={scrollToSection}
        aboutRef={aboutRef}
        skillsRef={skillsRef}
        experienceRef={experienceRef}
        projectsRef={projectsRef}
        contactRef={contactRef}
        activeSection={activeSection}
      />

     
      <main className="container mx-auto px-0 py-0">
        <section id="about" ref={aboutRef} className={`min-h-screen flex items-center justify-center py-20 ${sectionBackgrounds[0]}`}>
          <About />
        </section>

        <section id="skills" ref={skillsRef} className={`min-h-screen flex items-center justify-center py-20 ${sectionBackgrounds[1]}`}>
          <Skills />
        </section>

        <section id="experience" ref={experienceRef} className={`min-h-screen flex items-center justify-center py-20 ${sectionBackgrounds[0]}`}>
          <Experience />
        </section>

        <section id="projects" ref={projectsRef} className={`min-h-screen flex items-center justify-center py-20 ${sectionBackgrounds[1]}`}>
          <Projects />
        </section>

        <section id="contact" ref={contactRef} className={`min-h-screen flex items-center justify-center py-20 ${sectionBackgrounds[0]}`}>
          <Contact />
        </section>
      </main>

     
      <footer className="bg-gray-950 text-center py-6 text-gray-400">
        <p>&copy; {new Date().getFullYear()} Vikas Yadav. All rights reserved.</p>
      </footer>
    </div>
  );
};


const Navbar = ({ scrollToSection, aboutRef, skillsRef, experienceRef, projectsRef, contactRef, activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'About', ref: aboutRef, id: 'about' },
    { name: 'Skills', ref: skillsRef, id: 'skills' },
    { name: 'Experience', ref: experienceRef, id: 'experience' },
    { name: 'Projects', ref: projectsRef, id: 'projects' },
    { name: 'Contact', ref: contactRef, id: 'contact' },
  ];

  return (
    <nav className="bg-gray-950 p-4 fixed w-full z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
       
        <div className="text-2xl font-bold text-indigo-400">Vikas Yadav</div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-100 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        <ul className={`md:flex space-x-6 ${isOpen ? 'block' : 'hidden'} md:block absolute md:static bg-gray-950 md:bg-transparent w-full md:w-auto left-0 top-16 py-4 md:py-0 text-center md:text-left`}>
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => {
                  
                  if (item.id === 'projects') {
                    scrollToSection(skillsRef, 'skills'); 
                  } else {
                    scrollToSection(item.ref, item.id);
                  }
                  setIsOpen(false); 
                }}
                
                className={`text-lg transition duration-300 ease-in-out hover:text-indigo-400 focus:outline-none ${activeSection === item.id ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-300'
                  }`}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};


const TypingAnimation = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeoutId);
    }
  }, [text, index, speed]);

  return <span>{displayedText}</span>;
};



const About = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto px-4 animate-fade-in">
     
      <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0 md:pr-8">
       
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-600">
          Hello, I'm <TypingAnimation text="Vikas Yadav" speed={150} />
        </h1>
        <p className="text-gray-400 mb-10 text-lg italic leading-relaxed tracking-wide">
          Developer with strong full-stack and backend expertise, experienced in real-time systems, WebRTC, and AI-powered
          applications. Passionate about building performant, scalable fintech solutions using FastAPI, Python, Node.js, React, and
          MongoDB. Strong foundation in data structures, algorithms, and system design. 
        </p>

        <div className="flex justify-center md:justify-start space-x-4">
         
          <a
            href="#contact"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Get In Touch
          </a>
          <a
            href="/Vikas_Yadav_Resume_.pdf"
            download
            className="bg-gray-700 hover:bg-gray-600 text-gray-200 font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Download CV
          </a>
        </div>
      </div>

     
      {/* <div className="md:w-1/2 flex justify-center md:justify-end">
        <img
          src="https://placehold.co/400x400/1a202c/ffffff?text=Your+Image" 
          alt="Vikas Yadav"
          className="rounded-full shadow-lg max-w-xs md:max-w-sm lg:max-w-md w-full h-auto object-cover border-4 border-indigo-500 transform transition-transform duration-300 hover:scale-105"
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x400/1a202c/ffffff?text=Image+Error'; }}
        />
      </div> */}
      <div className="md:w-1/2 flex justify-center md:justify-end">
        <img
          src={iMG}
          alt="Vikas Yadav"
          className="rounded-full shadow-lg max-w-xs md:max-w-sm lg:max-w-md w-full h-auto object-cover border-4 border-indigo-500 transform transition-transform duration-300 hover:scale-105"
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x400/1a202c/ffffff?text=Image+Error'; }}
        />
      </div>
    </div>
  );
};


const Skills = () => {
  
  const skills = [
    { name: 'React', icon: '⚛️', description: 'Building interactive user interfaces with reusable components.' },
    { name: 'Next.js', icon: '⚡', description: 'Framework for production-ready React applications with server-side rendering.' },
    { name: 'JavaScript', icon: '📜', description: 'Core language for web development, enabling dynamic content.' },
    { name: 'TypeScript', icon: '🟦', description: 'Superset of JavaScript that adds static typing.' },
    { name: 'Node.js', icon: '🌳', description: 'Server-side JavaScript runtime for scalable applications.' },
    { name: 'Express.js', icon: '🚀', description: 'Minimalist web framework for Node.js, used for building APIs.' },
    { name: 'HTML5', icon: '📄', description: 'Structuring web content with semantic markup.' },
    { name: 'CSS', icon: '💅', description: 'Cascading Style Sheets for styling web pages.' },
    { name: 'Tailwind CSS', icon: '💨', description: 'Utility-first CSS framework for rapid UI development.' },
    { name: 'Bootstrap', icon: '🅱️', description: 'Popular CSS framework for responsive, mobile-first front-end development.' },
    { name: 'Redux', icon: '🔴', description: 'Predictable state container for JavaScript apps.' },
    { name: 'Material UI', icon: '🎨', description: 'React component library implementing Google\'s Material Design.' },
    { name: 'MySQL', icon: '🗄️', description: 'Open-source relational database management system.' },
    { name: 'Firebase', icon: '🔥', description: 'Google\'s mobile and web application development platform.' },
    { name: 'Docker', icon: '🐳', description: 'Platform for developing, shipping, and running applications in containers.' },
    { name: 'Figma', icon: '📐', description: 'Collaborative interface design tool.' },
    { name: 'Git', icon: '�', description: 'Version control system for collaborative development.' },
    { name: 'Responsive Design', icon: '📱', description: 'Ensuring web applications look great on all devices.' },
    { name: 'Python', icon: '🐍', description: 'Versatile language for backend logic, scripting, and data analysis.' },
    { name: 'C++', icon: '➕', description: 'High-performance programming language for system-level programming and game development.' },
    { name: 'Java', icon: '☕', description: 'Object-oriented programming language widely used for enterprise-level applications.' },
  ];

  return (
    <div className="text-center max-w-6xl px-4 animate-fade-in">
     
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-indigo-400">Technical Skills</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="group relative bg-gray-900 p-6 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-2 hover:border-indigo-500 border border-transparent flex flex-col items-center justify-center"
          >
            <span className="text-5xl mb-3">{skill.icon}</span>
            <p className="text-xl font-semibold text-gray-200">{skill.name}</p>
           
            <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-700 text-gray-200 text-sm rounded-md px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full max-w-[200px] text-center">
              {skill.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


const Experience = () => {
  const experiences = [
    {
      title: 'Frontend Developer',
      company: 'Fintelelect',
      duration: '25-April-2025 - Present',
      description: 'Working as a frontend developer, contributing to the development and enhancement of user interfaces.',
      icon: '✨' 
    },
    {
      title: 'Internship',
      company: 'MakeInnovative',
      duration: '02-02-2024 - 12-18-2024',
      description: 'Developed and maintained websites through WordPress, gaining hands-on experience in web development.',
      icon: '🌱' 
    },

  ];

  return (
    <div className="text-center max-w-4xl px-4 animate-fade-in">
     
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-indigo-400">Experience</h2>
      <div className="relative pt-8 pb-16">
       
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-indigo-700 h-full rounded-full hidden md:block"></div>

        {experiences.map((exp, index) => (
          <div
            key={index}
            
            className={`flex flex-col md:flex-row items-center w-full my-8 animate-fade-in ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end' 
              }`}
            style={{ animationDelay: `${index * 0.2}s` }} 
          >
           
            <div
              className={`w-full md:w-1/2 p-4 md:p-8 bg-gray-900 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-2 border border-transparent hover:border-indigo-500 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8' 
                }`}
            >
             
              <h3 className="text-3xl font-semibold text-indigo-300 mb-2 flex items-center justify-center md:justify-start">
                {exp.icon && <span className="mr-3 text-4xl">{exp.icon}</span>}
                {exp.title}
              </h3>
              <p className="text-xl text-gray-400 mb-2">{exp.company} | {exp.duration}</p>
              <p className="text-lg text-gray-300">{exp.description}</p>
            </div>

           
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 -ml-0.5 w-6 h-6 bg-indigo-500 rounded-full border-4 border-gray-950 z-10"></div>
          </div>
        ))}
      </div>
    </div>
  );
};


const Projects = () => {
  const projects = [
   
    {
      title: 'AI-Powered Exercise Form Tracker',
      description: 'Designed an AI system using FastAPI + MediaPipe to track form accuracy for workouts like push-ups, squats, and bicep curls. Processed 500+ videos and improved user accuracy by 40%.',
      technologies: ['FastAPI', 'Python', 'React','MediaPipe'],
      githubLink: 'https://github.com/ivikasyadav/AI-pose-detection-Backend', 
      liveLink: 'https://ai-pose-detection-frontend1.onrender.com//', 
      image: Fitness,
    },
    {
      title: 'HireHub',
      description: 'HireHub – Full-Stack Job Portal with Email Notifications A modern job portal where employers can post jobs and applicants can apply. Candidates receive email updates when job status changes.',
      technologies: ['React', 'Firebase', 'Tailwind CSS'],
      githubLink: 'https://github.com/ivikasyadav/HireHub-', 
      liveLink: 'https://job-fronted-theta.vercel.app/', 
      image: Hire,
    },
    {
      title: 'FeedbackFlow',
      description: 'FeedbackFlow – Real-Time Feedback Form with Live Admin Updates A real-time feedback system where users submit feedback through a form, and admins view submissions instantly using WebSockets.',
      technologies: ['React', 'Tailwind CSS', 'Framer Motion'],
      githubLink: 'https://github.com/ivikasyadav/PulseForm-', 
      liveLink: 'https://feedback-frontend-blond.vercel.app/', 
      image: Feedback,
    },
    {
      title: 'InstaWave ',
      description: 'A full-stack photo-sharing platform where users can sign up, post images, follow others, like posts, and explore new content',
      technologies: ['React', 'Tailwind CSS', 'Framer Motion'],
      githubLink: 'https://github.com/ivikasyadav/InstaWave', 
      liveLink: 'https://social-zwmd.vercel.app/', 
      image: Social,
    },
    {
      title: 'Chat Application clone ',
      description: 'A chatting Application clone LIke WhatApp, Which Support Live Chatting Through chat',
      technologies: ['React', 'Tailwind CSS', 'Framer Motion'],
      githubLink: 'https://github.com/ivikasyadav/Chat', 
      liveLink: 'https://chat-wxkx.onrender.com//', 
      image: Chat,
    },
    {
      title: 'E-commerce Platform',
      description: 'A full-stack e-commerce application with user authentication, product listings, shopping cart, and payment integration.',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
      githubLink: 'https://github.com/ivikasyadav/E-Commerce', 
      liveLink: 'https://e-commerce-rkeg.onrender.com/', 
      image: Ecom,
    },
  ];

  return (
    <div className="text-center max-w-6xl px-4 animate-fade-in">
     
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-indigo-400">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-gray-900 p-6 rounded-lg shadow-xl text-left flex flex-col hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-2"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover rounded-md mb-4"
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x250/333333/FFFFFF?text=Image+Error'; }}
            />
           
            <h3 className="text-2xl font-semibold text-indigo-300 mb-2">{project.title}</h3>
            <p className="text-gray-300 mb-4 flex-grow">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
             
              {project.technologies.map((tech, techIndex) => (
                <span key={techIndex} className="bg-indigo-700 text-indigo-100 text-sm px-3 py-1 rounded-full">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex justify-between space-x-4 mt-auto">
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-200 font-bold py-2 px-4 rounded-full text-center transition duration-300 ease-in-out"
                >
                  GitHub
                </a>
              )}
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full text-center transition duration-300 ease-in-out"
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};





const Contact = () => {
  
  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);

  
  const copyToClipboard = async (text, setter) => {
    try {
      await navigator.clipboard.writeText(text);
      setter(true); 
      setTimeout(() => setter(false), 2000); 
    } catch (err) {
      console.error('Failed to copy text: ', err);
      
      alert('Failed to copy. Please try again or copy manually.');
    }
  };

  return (
    
    <div className="bg-[#1a1a1a] py-16 px-4 sm:px-6 lg:px-8">
     
      <div className="max-w-6xl mx-auto">
       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
         
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Connect With Me</h2>
            <p className="text-xl text-gray-300 mb-8">
              Have a project in mind or a question to discuss? Reach out, and let's bring your
              ideas to reality with innovative solutions.
            </p>
            <div className="space-y-4">
             
              <div
                className="flex items-center text-gray-300 cursor-pointer hover:text-white transition-colors duration-200 group"
                onClick={() => copyToClipboard('245yadavjii@gmail.com', setEmailCopied)}
              >
               
                <svg className="w-6 h-6 mr-3 text-blue-400 group-hover:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <span className="text-lg mr-5">245yadavjii@gmail.com</span>
                {emailCopied && (
                  <span className="ml-2 text-sm text-green-400 animate-fade-in-out">Copied!</span>
                )}
               
                {!emailCopied && (
                  <FontAwesomeIcon icon={faCopy} /> 
                )}
              </div>
             
              <div
                className="flex items-center text-gray-300 cursor-pointer hover:text-white transition-colors duration-200 group"
                onClick={() => copyToClipboard('+91 93216 35898', setPhoneCopied)}
              >
               
                <svg className="w-6 h-6 mr-3 text-blue-400 group-hover:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.293 1.293a1 1 0 00-.817 1.246l.707 3.621a1 1 0 00.707.707l3.621.707a1 1 0 001.246-.817l1.293-2.293a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                <span className="text-lg mr-5">+91 93216 35898</span>
                {phoneCopied && (
                  <span className="ml-2 text-sm text-green-400 mr-5 animate-fade-in-out">Copied!</span>
                )}
               
                {!phoneCopied && (
                  <FontAwesomeIcon icon={faCopy} /> 
                )}
              </div>
             
              <div className="flex items-center text-gray-300">
               
                <svg className="w-6 h-6 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657A8 8 0 1117.657 16.657z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span className="text-lg">Mumbai, India</span>
              </div>
            </div>
          </div>

         
          <div className="bg-[#2a2a2a] p-8 rounded-lg shadow-xl">
            <form className="space-y-6">
             
              <div className="relative">
               
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full pl-10 p-3 rounded-md bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Name"
                />
              </div>

             
              <div className="relative">
               
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full pl-10 p-3 rounded-md bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Email"
                />
              </div>

             
              <div className="relative">
               
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full pl-10 p-3 rounded-md bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Subject"
                />
              </div>

             
              <div className="relative">
               
                <svg className="absolute left-3 top-4 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  className="w-full pl-10 p-3 rounded-md bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Message"
                ></textarea>
              </div>

             
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-md text-white font-semibold flex items-center justify-center
                           bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700
                           transition duration-300 ease-in-out transform hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

