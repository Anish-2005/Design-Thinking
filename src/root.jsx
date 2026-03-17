import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const processSteps = [
    {
        title: 'Empathize',
        description:
            'Understand the people, context, and emotions behind the challenge through observation and interviews.'
    },
    {
        title: 'Define',
        description:
            'Synthesize insights into a clear, human-centered problem statement that guides the work.'
    },
    {
        title: 'Ideate',
        description:
            'Generate a wide range of possibilities and explore bold alternatives before narrowing.'
    },
    {
        title: 'Prototype',
        description:
            'Build lightweight representations that make ideas tangible and testable.'
    },
    {
        title: 'Test',
        description:
            'Validate assumptions, collect feedback, and iterate toward a stronger solution.'
    }
];

const insights = [
    {
        title: 'Teamwork Excellence',
        description:
            'Learning to coordinate effectively and lead toward shared outcomes was a defining part of the course.'
    },
    {
        title: 'Root Cause Focus',
        description:
            'Identifying the real drivers of time management issues unlocked more meaningful solutions.'
    },
    {
        title: 'Prototype Momentum',
        description:
            'Seeing ideas early accelerated alignment, feedback, and confidence in the final direction.'
    }
];

const Landing = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const canvasRef = useRef(null);
    const homeRef = useRef(null);
    const designThinkingRef = useRef(null);
    const timeManagementRef = useRef(null);
    const contactRef = useRef(null);

    const scrollToSection = (ref) => {
        if (!ref?.current) return;
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setIsMenuOpen(false);
    };

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    useEffect(() => {
        if (!canvasRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            alpha: true,
            antialias: true
        });

        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);

        const particlesGeometry = new THREE.BufferGeometry();
        const particleCount = 2200;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 18;
            positions[i + 1] = (Math.random() - 0.5) * 18;
            positions[i + 2] = (Math.random() - 0.5) * 18;

            const intensity = Math.random() * 0.6 + 0.35;
            colors[i] = intensity;
            colors[i + 1] = intensity + 0.05;
            colors[i + 2] = intensity + 0.15;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            vertexColors: true,
            transparent: true,
            opacity: 0.75,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);
        camera.position.z = 5.6;

        let frameId;
        const animate = () => {
            frameId = requestAnimationFrame(animate);
            particles.rotation.x += 0.0002;
            particles.rotation.y += 0.00035;
            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (frameId) cancelAnimationFrame(frameId);
            scene.remove(particles);
            particlesGeometry.dispose();
            particlesMaterial.dispose();
            renderer.dispose();
        };
    }, []);

    useEffect(() => {
        const elements = document.querySelectorAll('[data-reveal]');
        if (!elements.length) return undefined;

        if (!('IntersectionObserver' in window)) {
            elements.forEach((element) => element.classList.add('is-visible'));
            return undefined;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
        );

        elements.forEach((element) => observer.observe(element));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="page">
            <canvas ref={canvasRef} className="bg-canvas" aria-hidden="true" />
            <div className="bg-overlay" aria-hidden="true" />
            <div className="orb orb-one" aria-hidden="true" />
            <div className="orb orb-two" aria-hidden="true" />

            <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
                <div className="container header-inner">
                    <button
                        type="button"
                        className="brand"
                        onClick={() => scrollToSection(homeRef)}
                        aria-label="Go to top"
                    >
                        <div className="brand-mark">DT</div>
                        <div>
                            <div className="brand-title">Design Thinking Lab</div>
                            <div className="brand-subtitle">Human-centered innovation</div>
                        </div>
                    </button>

                    <nav className="nav" aria-label="Primary">
                        <button type="button" className="nav-link" onClick={() => scrollToSection(homeRef)}>
                            Home
                        </button>
                        <button
                            type="button"
                            className="nav-link"
                            onClick={() => scrollToSection(designThinkingRef)}
                        >
                            Process
                        </button>
                        <button
                            type="button"
                            className="nav-link"
                            onClick={() => scrollToSection(timeManagementRef)}
                        >
                            Case Study
                        </button>
                        <button type="button" className="nav-link" onClick={() => scrollToSection(contactRef)}>
                            Contact
                        </button>
                    </nav>

                    <button
                        type="button"
                        className="menu-toggle"
                        aria-expanded={isMenuOpen}
                        aria-label="Toggle menu"
                        onClick={() => setIsMenuOpen((open) => !open)}
                    >
                        <span className="menu-line" />
                        <span className="menu-line" />
                    </button>
                </div>

                <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
                    <button type="button" className="mobile-link" onClick={() => scrollToSection(homeRef)}>
                        Home
                    </button>
                    <button
                        type="button"
                        className="mobile-link"
                        onClick={() => scrollToSection(designThinkingRef)}
                    >
                        Process
                    </button>
                    <button
                        type="button"
                        className="mobile-link"
                        onClick={() => scrollToSection(timeManagementRef)}
                    >
                        Case Study
                    </button>
                    <button type="button" className="mobile-link" onClick={() => scrollToSection(contactRef)}>
                        Contact
                    </button>
                </div>
            </header>

            <main>
                <section ref={homeRef} id="home" className="section hero">
                    <div className="container hero-grid">
                        <div className="hero-content" data-reveal style={{ '--delay': '0s' }}>
                            <p className="eyebrow">Design Thinking Capstone</p>
                            <h1 className="hero-title">
                                Design thinking for <span>real-world impact</span>.
                            </h1>
                            <p className="hero-subtitle">
                                A studio-style showcase of the five-stage methodology, brought to life through a
                                student-led time management case study.
                            </p>
                            <div className="hero-actions">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => scrollToSection(designThinkingRef)}
                                >
                                    Explore the process
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => scrollToSection(timeManagementRef)}
                                >
                                    View the case study
                                </button>
                            </div>
                            <div className="hero-badges">
                                <div className="badge">5-stage framework</div>
                                <div className="badge">Research to prototype</div>
                                <div className="badge">Student-led product</div>
                            </div>
                        </div>

                        <div className="hero-card" data-reveal style={{ '--delay': '0.15s' }}>
                            <div className="glass-card">
                                <p className="card-kicker">Featured work</p>
                                <h3 className="card-title">Time Management App</h3>
                                <p className="card-text">
                                    A solution that blends empathy-driven research with practical habit-building tools to
                                    reduce procrastination and improve clarity.
                                </p>
                                <div className="card-meta">
                                    <span className="tag">Research</span>
                                    <span className="tag">Strategy</span>
                                    <span className="tag">Prototype</span>
                                </div>
                                <a
                                    className="btn btn-ghost"
                                    href="https://time-management-app-theta.vercel.app"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Open the prototype
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <section ref={designThinkingRef} id="process" className="section">
                    <div className="container">
                        <div className="section-head" data-reveal>
                            <p className="section-kicker">The process</p>
                            <h2 className="section-title">A structured path from insight to action</h2>
                            <p className="section-subtitle">
                                The project follows a disciplined, human-centered workflow that balances empathy,
                                creativity, and experimentation.
                            </p>
                        </div>

                        <div className="process-grid">
                            {processSteps.map((step, index) => (
                                <article
                                    key={step.title}
                                    className="process-card"
                                    data-reveal
                                    style={{ '--delay': `${index * 0.08}s` }}
                                >
                                    <div className="process-index">{String(index + 1).padStart(2, '0')}</div>
                                    <h3>{step.title}</h3>
                                    <p>{step.description}</p>
                                </article>
                            ))}
                        </div>

                        <div className="quote-card" data-reveal style={{ '--delay': '0.15s' }}>
                            <p>
                                My biggest takeaway from this course was learning to work effectively as a team and lead
                                toward excellence.
                            </p>
                            <span>- Anish Seth</span>
                        </div>
                    </div>
                </section>

                <section ref={timeManagementRef} id="time-management" className="section section-contrast">
                    <div className="container">
                        <div className="section-head" data-reveal>
                            <p className="section-kicker">Case study</p>
                            <h2 className="section-title">Time Management App</h2>
                            <p className="section-subtitle">
                                Designed for students juggling deadlines, distractions, and limited time.
                            </p>
                        </div>

                        <div className="case-grid">
                            <div className="case-content" data-reveal>
                                <div className="glass-card">
                                    <h3 className="card-title">The challenge</h3>
                                    <p className="card-text">
                                        Managing multiple responsibilities while fighting procrastination creates stress
                                        and inconsistent performance. The goal was to build clarity, not guilt.
                                    </p>
                                </div>
                                <div className="glass-card">
                                    <h3 className="card-title">Our approach</h3>
                                    <ul className="feature-list">
                                        <li>Interviewed peers to uncover friction points and triggers.</li>
                                        <li>Mapped routines to identify high-impact, low-effort interventions.</li>
                                        <li>Built a prototype focused on accountability and momentum.</li>
                                        <li>Iterated with feedback loops to keep it realistic and usable.</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="case-visual" data-reveal style={{ '--delay': '0.1s' }}>
                                <div className="case-card">
                                    <div className="case-header">
                                        <p className="card-kicker">Prototype preview</p>
                                        <h3>Focus, plan, and progress.</h3>
                                    </div>
                                    <div className="case-body">
                                        <div className="metric">
                                            <span>Root-cause mapping</span>
                                            <strong>Identify blockers</strong>
                                        </div>
                                        <div className="metric">
                                            <span>Time insights</span>
                                            <strong>Track usage patterns</strong>
                                        </div>
                                        <div className="metric">
                                            <span>Momentum tools</span>
                                            <strong>Build daily wins</strong>
                                        </div>
                                    </div>
                                    <div className="case-actions">
                                        <a
                                            className="btn btn-primary"
                                            href="https://time-management-app-theta.vercel.app"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Explore the live app
                                        </a>
                                        <p className="case-note">Built with React, Vite, Three.js, and GSAP.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section">
                    <div className="container">
                        <div className="quote-highlight" data-reveal>
                            <div className="quote-mark">"</div>
                            <p>
                                I enjoyed the entire journey from ideation to implementation and would love to build
                                products that add value to real people.
                            </p>
                            <span>Design Thinking Course Reflection</span>
                        </div>
                    </div>
                </section>

                <section className="section section-muted">
                    <div className="container">
                        <div className="section-head" data-reveal>
                            <p className="section-kicker">Key insights</p>
                            <h2 className="section-title">What the course reinforced</h2>
                            <p className="section-subtitle">
                                The project highlighted the habits and mindsets that move good ideas into outcomes.
                            </p>
                        </div>

                        <div className="insight-grid">
                            {insights.map((insight, index) => (
                                <article
                                    key={insight.title}
                                    className="insight-card"
                                    data-reveal
                                    style={{ '--delay': `${index * 0.08}s` }}
                                >
                                    <h3>{insight.title}</h3>
                                    <p>{insight.description}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section ref={contactRef} id="contact" className="section">
                    <div className="container">
                        <div className="section-head" data-reveal>
                            <p className="section-kicker">Contact</p>
                            <h2 className="section-title">Let's connect</h2>
                            <p className="section-subtitle">
                                Interested in design thinking, time management, or collaborating on new ideas? Reach out
                                anytime.
                            </p>
                        </div>

                        <div className="contact-grid">
                            <div className="glass-card" data-reveal>
                                <h3 className="card-title">Get in touch</h3>
                                <p className="card-text">
                                    I am always open to discussing design thinking, product strategy, and new project
                                    opportunities.
                                </p>
                                <div className="contact-list">
                                    <a
                                        className="contact-item"
                                        href="https://linkedin.com/in/anishseth"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <span>LinkedIn</span>
                                        <strong>Anish Seth</strong>
                                    </a>
                                    <a className="contact-item" href="mailto:anishseth0510@gmail.com">
                                        <span>Email</span>
                                        <strong>anishseth0510@gmail.com</strong>
                                    </a>
                                </div>
                            </div>
                            <div className="glass-card" data-reveal style={{ '--delay': '0.1s' }}>
                                <h3 className="card-title">Future focus</h3>
                                <p className="card-text">
                                    I want to build products that benefit college and engineering communities through
                                    thoughtful, human-centered design.
                                </p>
                                <div className="brand-row">
                                    <div className="brand-mark">DT</div>
                                    <div>
                                        <p className="brand-title">Design Thinking Lab</p>
                                        <p className="brand-subtitle">Transforming ideas into practical solutions</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="footer">
                <div className="container footer-inner">
                    <div className="brand-row">
                        <div className="brand-mark">DT</div>
                        <div>
                            <div className="brand-title">Design Thinking Lab</div>
                            <div className="brand-subtitle">Design thinking course project</div>
                        </div>
                    </div>
                    <div className="footer-meta">
                        <p>(c) {new Date().getFullYear()} Design Thinking Lab | Anish Seth</p>
                        <p>Built with React, Vite, Three.js, and GSAP.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
