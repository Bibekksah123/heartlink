import React from 'react'
import { Link } from 'react-router-dom';

function OurStoryWaitingForU() {
  return (
    <section id="cta">
      <div className="cta-glow"></div>
      <h2 className="cta-title">
        Your Story is Waiting<em> to Begin</em>
      </h2>
      <p className="cta-sub">
        Join over 4 million members who have found meaningful connections on
        Velour.
      </p>
      <div className="cta-actions">
        <button className="btn-primary">
          <Link to="/register" style={ { color: 'inherit', textDecoration: 'none' } }>
          Create Free Account
            </Link>
        </button>
        <button className="btn-ghost" >
          <Link to="/login" style={ { color: 'inherit', textDecoration: 'none' } }>
          Already a Member
            </Link>
        </button>
      </div>
    </section>
  );
}

export default OurStoryWaitingForU