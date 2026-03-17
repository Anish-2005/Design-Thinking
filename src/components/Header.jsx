const Header = ({ isScrolled, isMenuOpen, navItems, onNavigate, onToggleMenu }) => {
  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="container header-inner">
        <button type="button" className="brand" onClick={() => onNavigate(navItems[0].ref)} aria-label="Go to top">
          <div className="brand-mark">DT</div>
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
          aria-label="Toggle menu"
          onClick={onToggleMenu}
        >
          <span className="menu-line" />
          <span className="menu-line" />
        </button>
      </div>

      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
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
