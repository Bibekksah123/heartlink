import React from "react";

function LoveStory() {
  return (
    <section id="stories">
      <div className="stories-intro">
        <div className="section-label">Love Stories</div>
        <h2 className="section-title">
          They Found Love.<em> You're Next.</em>
        </h2>
        <p className="section-sub">
          Real couples who found their forever on Velour. Their stories remind
          us why we do what we do.
        </p>
      </div>
      <div className="stories-grid">
        <div className="story-card" data-reveal>
          <div className="story-stars">★★★★★</div>
          <div className="story-quote">
            "I was skeptical of dating apps. Then Velour matched me with Marco.
            Six months later we were inseparable. One year later — engaged. This
            app changed my life."
          </div>
          <div className="story-author">
            <div className="story-avatar">
              <img
                src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80"
                alt="Sofia"
              />
            </div>
            <div>
              <div className="story-name">Sofia & Marco</div>
              <div className="story-location">Milan, Italy</div>
            </div>
          </div>
        </div>
        <div className="story-card" data-reveal style={{transitionDelay: "0.15s"}}>
          <div className="story-stars">★★★★★</div>
          <div className="story-quote">
            "The match percentage feature is eerily accurate. When I saw 97%
            with James I thought it was a gimmick. Now we've been together 2
            years. It knew before we did."
          </div>
          <div className="story-author">
            <div className="story-avatar">
              <img
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&q=80"
                alt="Amara"
              />
            </div>
            <div>
              <div className="story-name">Amara & James</div>
              <div className="story-location">London, UK</div>
            </div>
          </div>
        </div>
        <div className="story-card" data-reveal style={{transitionDelay: "0.3s"}}>
          <div className="story-stars">★★★★★</div>
          <div className="story-quote">
            "After years of meaningless swipes on other apps, Velour felt
            different. Real conversations, real chemistry. We met for coffee. We
            didn't leave until midnight."
          </div>
          <div className="story-author">
            <div className="story-avatar">
              <img
                src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&q=80"
                alt="Elena"
              />
            </div>
            <div>
              <div className="story-name">Elena & Daniel</div>
              <div className="story-location">Barcelona, Spain</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoveStory;
