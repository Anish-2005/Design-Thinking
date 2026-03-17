const Hero = ({ onPrimary, onSecondary, badges }) => {
  return (
    <section id="home" className="section hero">
      <div className="container hero-grid">
        <div className="hero-content" data-reveal style={{ '--delay': '0s' }}>
          <p className="eyebrow">Design Thinking Capstone</p>
          <h1 className="hero-title">
            Design thinking for <span>real-world impact</span>.
          </h1>
          <p className="hero-subtitle">
            A studio-style showcase of the five-stage methodology, brought to life through a student-led time
            management case study.
          </p>
          <div className="hero-actions">
            <button type="button" className="btn btn-primary" onClick={onPrimary}>
              Explore the process
            </button>
            <button type="button" className="btn btn-secondary" onClick={onSecondary}>
              View the case study
            </button>
          </div>
          <div className="hero-badges">
            {badges.map((badge) => (
              <div key={badge} className="badge">
                {badge}
              </div>
            ))}
          </div>
        </div>

        <div className="hero-card" data-reveal style={{ '--delay': '0.15s' }}>
          <div className="glass-card">
            <p className="card-kicker">Featured work</p>
            <h3 className="card-title">Time Management App</h3>
            <p className="card-text">
              A solution that blends empathy-driven research with practical habit-building tools to reduce
              procrastination and improve clarity.
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
  );
};

export default Hero;
