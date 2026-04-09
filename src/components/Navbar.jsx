import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__brand">
        <span className="navbar__logo">WS</span>
        <div>
          <div className="navbar__title">WarScope</div>
          <div className="navbar__subtitle">Global War Analyzer</div>
        </div>
      </div>
      <nav className="navbar__nav">
        <NavLink to="/" end className="navbar__link">
          Dashboard
        </NavLink>
        <NavLink to="/chat" className="navbar__link">
          AI Explainer
        </NavLink>
        <NavLink to="/news" className="navbar__link">
          News
        </NavLink>
        <NavLink to="/donate" className="navbar__link navbar__link--primary">
          Donate
        </NavLink>
      </nav>
    </header>
  );
}

export default Navbar;

