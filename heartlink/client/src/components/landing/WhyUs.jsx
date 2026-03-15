import React from 'react'

function WhyUs() {
  return (
    <section id="features">
      <div style={{textAlign:"center", maxWidth:"600px", margin:"0 auto 0"}}>
        <div className="section-label" style={{justifyContent:"center"}}>
          Why Velour
        </div>
        <h2 className="section-title">
          Crafted for Meaningful<em> Relationships</em>
        </h2>
      </div>
      <div className="features-grid">
        <div className="feature-item" data-reveal>
          <div className="feature-icon">🧠</div>
          <div className="feature-title">Deep Compatibility</div>
          <div className="feature-desc">
            Our proprietary algorithm analyses over 200 personality dimensions
            to match you with people who truly complement who you are.
          </div>
        </div>
        <div className="feature-item" data-reveal>
          <div className="feature-icon">🛡️</div>
          <div className="feature-title">Verified Profiles</div>
          <div className="feature-desc">
            Every member undergoes photo verification and identity checks.
            You'll only meet real, genuine people — no bots, no ghosts.
          </div>
        </div>
        <div className="feature-item" data-reveal>
          <div className="feature-icon">🔒</div>
          <div className="feature-title">Private & Secure</div>
          <div className="feature-desc">
            Your data stays yours. End-to-end encrypted messages, private mode
            browsing, and granular privacy controls at every step.
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyUs