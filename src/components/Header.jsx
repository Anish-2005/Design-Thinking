const Header = ({ isScrolled, isMenuOpen, navItems, onNavigate, onToggleMenu, onCloseMenu }) => {
  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="container header-inner">
        <button type="button" className="brand" onClick={() => onNavigate(navItems[0].ref)} aria-label="Go to top">
          <img className="brand-mark" src="/dt-logo.svg" alt="Design Thinking Lab logo" width="44" height="44" />
          <div>
            <div className="brand-title">Design Thinking Lab</div>
            <div className="brand-subtitle">Human-centered innovation</div>
          </div>
        </button>

        <nav className="nav" aria-label="Primary">
          {navItems.map((item) => (
            <button key={item.label} type="button" className="nav-link" onClick={() => onNavigate(item.ref)}>
              {item.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
          onClick={onToggleMenu}
        >
          <span className="menu-line" />
          <span className="menu-line" />
        </button>
      </div>

      <button
        type="button"
        className={`mobile-backdrop ${isMenuOpen ? 'open' : ''}`}
        aria-label="Close menu"
        onClick={onCloseMenu}
      />

      <div id="mobile-menu" className={`mobile-menu ${isMenuOpen ? 'open' : ''}`} aria-hidden={!isMenuOpen}>
        {navItems.map((item) => (
          <button key={item.label} type="button" className="mobile-link" onClick={() => onNavigate(item.ref)}>
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};

export default Header;
