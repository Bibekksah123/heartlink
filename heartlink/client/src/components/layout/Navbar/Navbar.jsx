import React from 'react'
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav id="nav">
      <a href="#" className="nav-logo">
        HeartLink<span>.</span>
      </a>
      <ul className="nav-links">
        <li>
          <a href="#how">How It Works</a>
        </li>
        <li>
          <a href="#profiles">Explore</a>
        </li>
        <li>
          <a href="#stories">Stories</a>
        </li>
        <li>
          <a href="#pricing">Plans</a>
        </li>
      </ul>
      <button className="nav-cta" >
        <Link to="/register" style={ { color: 'inherit', textDecoration: 'none' } }>
        Join Free
        </Link>
      </button>
    </nav>
  );
}

export default Navbar