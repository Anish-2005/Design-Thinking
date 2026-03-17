const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="brand-row">
          <img className="brand-mark" src="/dt-logo.svg" alt="Design Thinking Lab logo" width="44" height="44" />
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
  );
};

export default Footer;
