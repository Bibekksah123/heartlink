import React from 'react'

function PremiumMember() {
  return (
    <section id="pricing">
      <div className="pricing-header">
        <div className="section-label" style={{ justifyContent: "center" }}>
          Membership
        </div>
        <h2 className="section-title">
          Invest in Your<em> Love Life</em>
        </h2>
        <p className="section-sub" style={{ margin: "0 auto" }}>
          Choose the plan that's right for your journey. No hidden fees, cancel
          anytime.
        </p>
      </div>
      <div className="pricing-grid">
        <div className="plan-card" data-reveal>
          <div className="plan-name">Free</div>
          <div className="plan-price">
            <sup>$</sup>0
          </div>
          <div className="plan-period">forever free</div>
          <div className="plan-divider"></div>
          <ul className="plan-features">
            <li>
              <span className="check">✓</span> Create your profile
            </li>
            <li>
              <span className="check">✓</span> 10 matches per day
            </li>
            <li>
              <span className="check">✓</span> Basic messaging
            </li>
            <li>
              <span className="cross">✗</span> See who liked you
            </li>
            <li>
              <span className="cross">✗</span> Advanced filters
            </li>
            <li>
              <span className="cross">✗</span> Read receipts
            </li>
          </ul>
          <button className="plan-btn ghost" >
            Get Started
          </button>
        </div>
        <div className="plan-card featured" data-reveal>
          <div className="plan-badge">Most Popular</div>
          <div className="plan-name">Gold</div>
          <div className="plan-price">
            <sup>$</sup>19
          </div>
          <div className="plan-period">per month · billed monthly</div>
          <div className="plan-divider"></div>
          <ul className="plan-features">
            <li>
              <span className="check">✓</span> Unlimited matches
            </li>
            <li>
              <span className="check">✓</span> See who liked you
            </li>
            <li>
              <span className="check">✓</span> Advanced filters
            </li>
            <li>
              <span className="check">✓</span> Read receipts
            </li>
            <li>
              <span className="check">✓</span> Priority support
            </li>
            <li>
              <span className="cross">✗</span> Profile Boost
            </li>
          </ul>
          <button className="plan-btn primary" >
            Start Gold
          </button>
        </div>
        <div className="plan-card" data-reveal>
          <div className="plan-name">Platinum</div>
          <div className="plan-price">
            <sup>$</sup>39
          </div>
          <div className="plan-period">per month · billed monthly</div>
          <div className="plan-divider"></div>
          <ul className="plan-features">
            <li>
              <span className="check">✓</span> Everything in Gold
            </li>
            <li>
              <span className="check">✓</span> Weekly Profile Boost
            </li>
            <li>
              <span className="check">✓</span> Super Likes × 5/day
            </li>
            <li>
              <span className="check">✓</span> Incognito mode
            </li>
            <li>
              <span className="check">✓</span> Dedicated matchmaker
            </li>
            <li>
              <span className="check">✓</span> VIP events access
            </li>
          </ul>
          <button className="plan-btn ghost" >
            Go Platinum
          </button>
        </div>
      </div>
    </section>
  );
}

export default PremiumMember