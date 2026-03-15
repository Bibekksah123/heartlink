import React from 'react'

function MatchInfo() {
  return (
    <section id="how">
      <div className="section-label">The Process</div>
      <h2 className="section-title">
        Simple Steps to Your<em> Perfect Match</em>
      </h2>
      <div className="how-grid">
        <div className="how-steps">
          <div className="how-step" data-reveal>
            <div className="step-num">01</div>
            <div className="step-icon rose">✨</div>
            <div className="step-body">
              <div className="step-title ">Create Your Profile</div>
              <div className="step-desc">
                Share your personality, passions and what you're looking for.
                Our intelligent system builds a deep picture of who you are
                beyond the surface.
              </div>
            </div>
          </div>
          <div className="how-step" data-reveal>
            <div className="step-num">02</div>
            <div className="step-icon amber">🔮</div>
            <div className="step-body">
              <div className="step-title">AI-Powered Matching</div>
              <div className="step-desc">
                Our algorithm analyzes thousands of compatibility signals —
                values, lifestyle, communication style — to surface your most
                meaningful matches.
              </div>
            </div>
          </div>
          <div className="how-step" data-reveal>
            <div className="step-num">03</div>
            <div className="step-icon teal">💌</div>
            <div className="step-body">
              <div className="step-title">Connect & Meet</div>
              <div className="step-desc">
                Break the ice with curated conversation starters, then when it
                feels right — step into the real world and let something
                beautiful unfold.
              </div>
            </div>
          </div>
        </div>
        <div className="how-visual">
          <div className="how-glow"></div>
          <div className="how-phone">
            <img
              src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=80"
              alt="App"
            />
          </div>
          <div className="float-card left">
            <div className="float-card-label">Match Score</div>
            <div className="float-card-val gold">96%</div>
          </div>
          <div className="float-card right">
            <div className="float-card-label">New Today</div>
            <div className="float-card-val rose">♥ 14</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MatchInfo