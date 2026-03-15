import React from 'react'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section id="hero">
      <div className="hero-bg"></div>
      <div className="hero-img-wrap">
        <img src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=900&q=80" alt="Couple"/>
      </div>
      <div className="hero-content">
        <div className="hero-eyebrow">Where Deep Connections Begin</div>
        <h1 className="hero-h1">
          Find Your<em>Perfect Someone</em>
        </h1>
        <p className="hero-sub">Velour uses intelligent matching to connect souls who are truly compatible — not just physically, but intellectually, emotionally, and deeply.</p>
        <div className="hero-actions">
          <Link to="/register" style={ { textDecoration: 'none' } }>
          <button className="btn-primary" >Start Your Journey</button>
          </Link>
          <Link to="/login" style={ { textDecoration: 'none' } }>
          <button className="btn-ghost">Sign In</button>
          </Link>
         
        </div>
      </div>
      <div className="hero-stats">
        <div className="hero-stat">
          <div className="hero-stat-num">4.2M+</div>
          <div className="hero-stat-label">Members</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-num">98K</div>
          <div className="hero-stat-label">Couples</div>
        
        </div>
        <div className="hero-stat">
          <div className="hero-stat-num">142</div>
          <div className="hero-stat-label">Countries</div>
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="scroll-line"></div>
        <div className="scroll-text">Scroll</div>
      </div>
    </section>
  )
}

export default Hero