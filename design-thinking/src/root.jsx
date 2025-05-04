import { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useLayoutEffect } from 'react';
import { useInView } from 'react-intersection-observer';
const Landing = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Refs
    const canvasRef = useRef(null);
    const headerRef = useRef(null);
    const heroContentRef = useRef(null);
    const projectsRef = useRef(null);
    const processRef = useRef(null);
    const contactRef = useRef(null);
    const timeManagementRef = useRef(null);
    const homeRef = useRef(null);
    const designThinkingRef = useRef(null);
    const [timeManagementInViewRef, timeManagementInView] = useInView({ threshold: 0.2, triggerOnce: true });
    // Three.js space background
    const scrollToSection = (ref) => {
        if (ref.current) {
            window.scrollTo({
                top: ref.current.offsetTop,
                behavior: 'smooth'
            });
        }
        setIsMenuOpen(false); // Close mobile menu if open
    };

    useEffect(() => {
        if (!canvasRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            alpha: true,
            antialias: true
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Create star particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particleCount = 3000;

        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 15;
            colors[i] = Math.random() * 0.5 + 0.5; // Random colors between 0.5 and 1.0
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.03,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

        camera.position.z = 5;

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            particles.rotation.x += 0.0002;
            particles.rotation.y += 0.0003;
            renderer.render(scene, camera);
        };

        animate();

        // Handle window resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            scene.remove(particles);
            particlesGeometry.dispose();
            particlesMaterial.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div className="landing-container bg-gray-950 text-gray-100 min-h-screen overflow-x-hidden">
            {/* Three.js Canvas Background */}
            {/* Space Background */}
            <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 opacity-50" />

            {/* Header */}
            <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b border-gray-800/50 shadow-sm">
                <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center shadow-lg">
                            <span className="font-bold text-lg text-white">DT</span>
                        </div>
                        <span className="font-semibold text-xl text-gray-100 tracking-tight hidden sm:block">Design Thinking Lab</span>
                    </div>

                    <nav className="hidden md:flex items-center space-x-1  rounded-full px-4 py-2 border border-gray-800/50">
                        {[
                            { name: "Home", ref: homeRef },
                            { name: "Design Thinking", ref: designThinkingRef },
                            { name: "Projects", ref: timeManagementRef },
                            { name: "Contact", ref: contactRef }
                        ].map((item) => (
                            <button
                                key={item.name}
                                onClick={() => scrollToSection(item.ref)}
                                className="relative group px-4 py-2 transition-all duration-300 rounded-full"
                            >
                                <span className="text-purple-300 group-hover:text-white transition-colors duration-300 relative z-10">
                                    {item.name}
                                </span>
                            </button>
                        ))}
                    </nav>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden text-gray-300 focus:outline-none p-1"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile menu with smooth scroll */}
                {isMenuOpen && (
                    <div className="md:hidden bg-gray-900/95 backdrop-blur-lg px-6 py-4 border-t border-gray-800/50">
                        <nav className="flex flex-col space-y-4">
                            <button onClick={() => scrollToSection(homeRef)} className="text-gray-300 hover:text-purple-400 py-2 px-3 rounded-lg hover:bg-gray-800/50 text-lg font-medium">
                                Home
                            </button>
                            <button onClick={() => scrollToSection(designThinkingRef)} className="text-gray-300 hover:text-purple-400 py-2 px-3 rounded-lg hover:bg-gray-800/50 text-lg font-medium">
                                Design Thinking
                            </button>
                            <button onClick={() => scrollToSection(projectsRef)} className="text-gray-300 hover:text-purple-400 py-2 px-3 rounded-lg hover:bg-gray-800/50 text-lg font-medium">
                                Projects
                            </button>
                            <button onClick={() => scrollToSection(timeManagementRef)} className="text-gray-300 hover:text-purple-400 py-2 px-3 rounded-lg hover:bg-gray-800/50 text-lg font-medium">
                                Time Management
                            </button>
                            <button onClick={() => scrollToSection(contactRef)} className="text-gray-300 hover:text-purple-400 py-2 px-3 rounded-lg hover:bg-gray-800/50 text-lg font-medium">
                                Contact
                            </button>
                        </nav>
                    </div>
                )}
            </header>


            {/* Hero Section */}
            <section ref={homeRef} id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16">
                <div className="container mx-auto text-center relative z-10">
                    <h1 className="font-bold text-5xl md:text-7xl lg:text-8xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-indigo-600 leading-none md:leading-tight py-4">
                        Design Thinking
                    </h1>
                    <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-4xl mx-auto mb-10 leading-relaxed">
                        Transforming ideas into innovative solutions through creative problem-solving
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
                        <a
                            href="#design-thinking"
                            className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-full text-white font-medium hover:opacity-90 shadow-lg"
                        >
                            Explore Process
                        </a>
                        <a
                            href="#time-management"
                            className="px-8 py-3.5 bg-transparent border-2 border-purple-500/50 rounded-full text-purple-400 font-medium hover:bg-purple-900/20"
                        >
                            View Project
                        </a>
                    </div>
                </div>
            </section>

            {/* Design Thinking Section */}
            <section ref={designThinkingRef} id="design-thinking" className="relative py-24 px-6">
                <div className="container mx-auto relative z-10">
                    <h2 className="font-bold text-4xl md:text-5xl lg:text-6xl mb-16 text-center">
                        The Design Thinking Process
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-20">
                        {[
                            {
                                title: "Empathize",
                                icon: "👥",
                                description: "Understanding the user's needs, experiences, and challenges through observation and engagement."
                            },
                            {
                                title: "Define",
                                icon: "✏️",
                                description: "Clearly articulating the problem statement based on insights gathered during the Empathize phase."
                            },
                            {
                                title: "Ideate",
                                icon: "💡",
                                description: "Generating a wide range of creative solutions and ideas to address the defined problem."
                            },
                            {
                                title: "Prototype",
                                icon: "🛠️",
                                description: "Building physical or digital representations of potential solutions to test and refine concepts."
                            },
                            {
                                title: "Test",
                                icon: "✅",
                                description: "Gathering feedback from users to improve and refine the prototypes before final implementation."
                            }
                        ].map((step, index) => (
                            <div
                                key={index}
                                className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50"
                            >
                                <div className="text-4xl mb-4">{step.icon}</div>
                                <h3 className="text-xl font-semibold mb-3 text-purple-300">{step.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{step.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center max-w-4xl mx-auto">
                        <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed italic">
                            "My biggest takeaway from this course was learning to work effectively as a team and lead towards excellence."
                        </p>
                        <p className="text-purple-400 mt-4 font-medium">— Anish Seth</p>
                    </div>
                </div>
            </section>

            {/* Time Management Project Section */}
            <section ref={timeManagementRef} id="time-management" className="relative py-24 px-6 bg-gradient-to-b from-gray-900/80 to-gray-950/80">
                <div
                    ref={timeManagementInViewRef}
                    className="container mx-auto relative z-10"
                >
                    <div className="text-center mb-16">
                        <h2 className="font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Time Management</span> App
                        </h2>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                            A solution to help identify and address the root causes of time management issues and procrastination.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="project-content space-y-8">
                            <div className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 transition-all duration-500 hover:shadow-lg hover:shadow-purple-500/10">
                                <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-purple-400">The Problem</h3>
                                <p className="text-gray-300 leading-relaxed">
                                    Managing multiple tasks in limited time while battling procrastination is a common challenge many face, including myself. This affects productivity, creates stress, and impacts overall well-being.
                                </p>
                            </div>

                            <div className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 transition-all duration-500 hover:shadow-lg hover:shadow-purple-500/10">
                                <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-purple-400">Our Approach</h3>
                                <p className="text-gray-300 mb-6 leading-relaxed">
                                    We applied design thinking principles to understand the root causes of time management issues and developed a solution that helps users:
                                </p>
                                <ul className="space-y-4 text-gray-300">
                                    {[
                                        "Identify the root causes of their time management issues",
                                        "Track and analyze time usage patterns",
                                        "Implement customized strategies to overcome procrastination",
                                        "Set realistic goals and track progress over time"
                                    ].map((item, index) => (
                                        <li key={index} className="flex items-start">
                                            <svg className="w-6 h-6 text-purple-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            <span className="leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="project-visual relative">
                            <div className="py-6 sm:py-8 md:py-11 bg-gray-800/30 backdrop-blur-sm p-1 rounded-2xl border border-gray-700/50 shadow-xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-purple-500/20">
                                <div className="relative rounded-xl overflow-hidden aspect-video bg-gradient-to-br from-gray-900 to-gray-800">
                                    {/* Placeholder for project image */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center p-4 sm:p-6 md:p-8">
                                            <svg className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-purple-500 mx-auto mb-3 sm:mb-4"
                                                fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                            <h4 className="text-lg sm:text-xl md:text-xl font-semibold text-purple-300 mb-1 sm:mb-2">
                                                Time Management App
                                            </h4>
                                            <p className="text-sm sm:text-base text-gray-400">
                                                Interactive prototype showcasing our solution
                                            </p>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
                                        <a
                                            href="https://time-management-app-theta.vercel.app"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-4 py-1.5 sm:px-5 py-2 md:px-6 md:py-2.5 bg-purple-600 rounded-lg text-white font-medium hover:bg-purple-700 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-md text-sm sm:text-base"
                                        >
                                            <span>Visit Project</span>
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                            </svg>
                                        </a>
                                    </div>
                                </div>

                                <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 sm:p-4 space-y-2 sm:space-y-0">
                                    <div className="flex-1">
                                        <h4 className="font-medium text-purple-300 text-sm sm:text-base">Time Management Solution</h4>
                                        <p className="text-xs sm:text-sm text-gray-400">Finding the root cause of mishaps in time management</p>
                                    </div>
                                    <div className="flex space-x-1 sm:space-x-2">
                                        <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-gray-700/50 rounded-md text-xs text-gray-300">React</span>
                                        <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-gray-700/50 rounded-md text-xs text-gray-300">Tailwind</span>
                                        <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-gray-700/50 rounded-md text-xs text-gray-300">GSAP</span>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative elements - adjusted for mobile */}
                            <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 md:-top-8 md:-right-8 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-purple-600/10 rounded-full blur-xl z-0"></div>
                            <div className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 md:-bottom-10 md:-left-10 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-indigo-600/10 rounded-full blur-xl z-0"></div>
                        </div>
                    </div>

                    <div className="mt-20 text-center">
                        <a
                            href="https://time-management-app-theta.vercel.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-full text-white font-medium hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-purple-500/40 transform hover:-translate-y-1"
                        >
                            <span className="text-lg">Explore the Time Management App</span>
                            <svg className="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </section>

            {/* Testimonial Section */}
            <section className="relative py-24 px-6">
                <div className="container mx-auto relative z-10 max-w-5xl">
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/70 backdrop-blur-sm p-10 md:p-14 rounded-3xl border border-gray-700/50 shadow-2xl overflow-hidden">
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-600/10 rounded-full blur-3xl"></div>

                        <svg className="w-16 h-16 text-purple-500/20 mb-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"></path>
                        </svg>
                        <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed mb-10">
                            I quite liked the journey of this Design Thinking course. From ideation to implementation to actual finishing of the product, I enjoyed the entire process of how it flowed through. I would actually like working on real projects in the future that add value to the real world.
                        </p>
                        <footer className="flex items-center">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-md">
                                AS
                            </div>
                            <div className="ml-5">
                                <cite className="text-purple-300 font-medium not-italic text-lg">Anish Seth</cite>
                                <p className="text-gray-400">Design Thinking Course Participant</p>
                            </div>
                        </footer>
                    </div>
                </div>
            </section>

            {/* Key Insights Section */}
            <section className="relative py-24 px-6 bg-gradient-to-b from-gray-800/80 to-gray-900">
                <div className="container mx-auto relative z-10">
                    <h2 className="font-bold text-4xl md:text-5xl lg:text-6xl mb-20 text-center">
                        Key <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Insights</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                title: "Teamwork is Essential",
                                icon: (
                                    <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                    </svg>
                                ),
                                description: "Learning to coordinate effectively among team members and lead a team towards perfection was one of my biggest takeaways from the course."
                            },
                            {
                                title: "Root Cause Analysis",
                                icon: (
                                    <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                                    </svg>
                                ),
                                description: "Finding the root cause of mishaps in time management is 50% of the problem solved. This insight helped shape our solution approach."
                            },
                            {
                                title: "Prototyping Power",
                                icon: (
                                    <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path>
                                    </svg>
                                ),
                                description: "The prototype phase was the most powerful stage, helping us visualize and refine solutions that were later implemented in our final product."
                            }
                        ].map((insight, index) => (
                            <div
                                key={index}
                                className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 transition-all duration-500 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-2"
                            >
                                <div className="w-14 h-14 bg-gradient-to-br from-purple-900/50 to-indigo-900/50 rounded-full flex items-center justify-center mb-6 shadow-inner">
                                    {insight.icon}
                                </div>
                                <h3 className="text-xl md:text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-purple-400">
                                    {insight.title}
                                </h3>
                                <p className="text-gray-300 leading-relaxed">
                                    {insight.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section ref={contactRef} id="contact" className="relative py-24 px-6">
                <div
                    className="container mx-auto relative z-10 max-w-5xl"
                >
                    <div className="text-center mb-16">
                        <h2 className="font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
                            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Connect</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Interested in design thinking or want to collaborate on future projects? Reach out!
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/50 backdrop-blur-sm p-10 rounded-3xl border border-gray-700/50 shadow-xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-purple-400">
                                    Get in Touch
                                </h3>
                                <p className="text-gray-300 mb-8 leading-relaxed">
                                    I'm always open to discussing design thinking, time management solutions, or exploring new project opportunities.
                                </p>

                                <div className="space-y-5">
                                    <a
                                        href="https://linkedin.com/in/anishseth"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center text-gray-300 hover:text-purple-400 transition-colors duration-300 group"
                                    >
                                        <div className="w-12 h-12 bg-gray-800/50 rounded-lg flex items-center justify-center mr-4 group-hover:bg-purple-900/30 transition-colors duration-300">
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="font-medium">LinkedIn</div>
                                            <div className="text-sm text-gray-400">Anish Seth</div>
                                        </div>
                                    </a>

                                    <a
                                        href="mailto:anishseth0510@gmail.com"
                                        className="flex items-center text-gray-300 hover:text-purple-400 transition-colors duration-300 group"
                                    >
                                        <div className="w-12 h-12 bg-gray-800/50 rounded-lg flex items-center justify-center mr-4 group-hover:bg-purple-900/30 transition-colors duration-300">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="font-medium">Email</div>
                                            <div className="text-sm text-gray-400">anishseth0510@gmail.com</div>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-purple-400">
                                    Future Projects
                                </h3>
                                <p className="text-gray-300 mb-8 leading-relaxed italic">
                                    "I would like to build real life apps which would actually benefit the people around, especially in college and engineering environments."
                                </p>

                                <div className="flex items-center border-t border-gray-700/50 pt-8 mt-8">
                                    <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                        DT
                                    </div>
                                    <div className="ml-5">
                                        <p className="text-gray-300 font-medium text-lg">Design Thinking Lab</p>
                                        <p className="text-gray-400 text-sm">Transforming ideas into impactful solutions</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative py-12 px-6 border-t border-gray-800/50">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-3 mb-6 md:mb-0">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center shadow-md">
                                <span className="font-bold text-lg text-white">DT</span>
                            </div>
                            <span className="font-semibold text-lg text-gray-100 tracking-tight">Design Thinking Lab</span>
                        </div>

                        <div className="text-center md:text-right">
                            <p className="text-gray-400 mb-2">© {new Date().getFullYear()} Design Thinking Lab | Anish Seth</p>
                            <p className="text-sm text-gray-500">
                                "Out of the Box" — Design Thinking Course Project
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;