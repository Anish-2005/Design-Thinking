import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProcessSection from './components/ProcessSection';
import CaseStudy from './components/CaseStudy';
import QuoteSection from './components/QuoteSection';
import Insights from './components/Insights';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import useRevealOnScroll from './hooks/useRevealOnScroll';
import {
  heroBadges,
  processSteps,
  insights,
  caseStudyFeatures,
  caseMetrics
} from './data/siteContent';

const SpaceBackground = lazy(() => import('./components/SpaceBackground'));

const Landing = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  const homeRef = useRef(null);
  const designThinkingRef = useRef(null);
  const timeManagementRef = useRef(null);
  const contactRef = useRef(null);

  const navItems = useMemo(
    () => [
      { label: 'Home', ref: homeRef },
      { label: 'Process', ref: designThinkingRef },
      { label: 'Case Study', ref: timeManagementRef },
      { label: 'Contact', ref: contactRef }
    ],
    [homeRef, designThinkingRef, timeManagementRef, contactRef]
  );

  const scrollToSection = useCallback((ref) => {
    if (!ref?.current) return;
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    document.body.classList.toggle('menu-open', isMenuOpen);
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('menu-open');
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  useRevealOnScroll();

  useEffect(() => {
    let timeoutId;
    let idleId;

    if (typeof window !== 'undefined') {
      const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)');
      if (reduceMotion?.matches) {
        setShowBackground(false);
        return undefined;
      }
    }

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(() => setShowBackground(true), { timeout: 1200 });
      return () => {
        if (idleId) window.cancelIdleCallback?.(idleId);
      };
    }

    timeoutId = setTimeout(() => setShowBackground(true), 300);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="page">
      {showBackground ? (
        <Suspense fallback={null}>
          <SpaceBackground />
        </Suspense>
      ) : null}

      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <Header
        isScrolled={isScrolled}
        isMenuOpen={isMenuOpen}
        navItems={navItems}
        onNavigate={scrollToSection}
        onToggleMenu={() => setIsMenuOpen((open) => !open)}
        onCloseMenu={() => setIsMenuOpen(false)}
      />

      <main id="main-content">
        <Hero
          sectionRef={homeRef}
          onPrimary={() => scrollToSection(designThinkingRef)}
          onSecondary={() => scrollToSection(timeManagementRef)}
          badges={heroBadges}
        />

        <ProcessSection
          sectionRef={designThinkingRef}
          steps={processSteps}
          quoteText="My biggest takeaway from this course was learning to work effectively as a team and lead toward excellence."
          quoteAuthor="Anish Seth"
        />

        <CaseStudy sectionRef={timeManagementRef} features={caseStudyFeatures} metrics={caseMetrics} />

        <QuoteSection
          quote="I enjoyed the entire journey from ideation to implementation and would love to build products that add value to real people."
          label="Design Thinking Course Reflection"
        />

        <Insights items={insights} />

        <ContactSection sectionRef={contactRef} />
      </main>

      <Footer />
    </div>
  );
};

export default Landing;
