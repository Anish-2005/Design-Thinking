const CaseStudy = ({ features, metrics, sectionRef }) => {
  return (
    <section ref={sectionRef} id="time-management" className="section section-contrast">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="section-kicker">Case study</p>
          <h2 className="section-title">Time Management App</h2>
          <p className="section-subtitle">Designed for students juggling deadlines, distractions, and limited time.</p>
        </div>

        <div className="case-grid">
          <div className="case-content" data-reveal>
            <div className="glass-card">
              <h3 className="card-title">The challenge</h3>
              <p className="card-text">
                Managing multiple responsibilities while fighting procrastination creates stress and inconsistent
                performance. The goal was to build clarity, not guilt.
              </p>
            </div>
            <div className="glass-card">
              <h3 className="card-title">Our approach</h3>
              <ul className="feature-list">
                {features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
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
                {metrics.map((metric) => (
                  <div key={metric.label} className="metric">
                    <span>{metric.label}</span>
                    <strong>{metric.value}</strong>
                  </div>
                ))}
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
  );
};

export default CaseStudy;
