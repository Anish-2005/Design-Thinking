const ContactSection = ({ sectionRef }) => {
  return (
    <section ref={sectionRef} id="contact" className="section">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="section-kicker">Contact</p>
          <h2 className="section-title">Let's connect</h2>
          <p className="section-subtitle">
            Interested in design thinking, time management, or collaborating on new ideas? Reach out anytime.
          </p>
        </div>

        <div className="contact-grid">
          <div className="glass-card" data-reveal>
            <h3 className="card-title">Get in touch</h3>
            <p className="card-text">
              I am always open to discussing design thinking, product strategy, and new project opportunities.
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
              I want to build products that benefit college and engineering communities through thoughtful,
              human-centered design.
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
  );
};

export default ContactSection;
