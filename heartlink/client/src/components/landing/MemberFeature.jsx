import React from "react";

function MemberFeature() {
  const profileData = [
    {
      name: "Sophia Laurent",
      age: 26,
      city: "Paris",
      tags: ["Art", "Wine", "Travel"],
      match: 94,
      img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=80",
    },
    {
      name: "Isabella Chen",
      age: 28,
      city: "New York",
      tags: ["Design", "Coffee", "Books"],
      match: 88,
      img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
    },
    {
      name: "Amara Osei",
      age: 25,
      city: "Lagos",
      tags: ["Music", "Poetry", "Dance"],
      match: 91,
      img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80",
    },
    {
      name: "Elena Voss",
      age: 27,
      city: "Berlin",
      tags: ["Photography", "Hiking"],
      match: 87,
      img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80",
    },
  ];
  return (
    <section id="profiles">
      <div className="profiles-header">
        <div>
          <div className="section-label">Featured Members</div>
          <h2 className="section-title">
            Real People,<em> Real Connections</em>
          </h2>
        </div>
        <button className="btn-ghost" style={{ flexShrink: 0 }}>
          Explore All →
        </button>
      </div>
      <div className="profiles-grid" id="profilesGrid">
        {profileData.map((p, index) => (
          <div
            key={index}
            className="profile-card"
            style={{ transitionDelay: `${index * 0.12}s` }}
            data-reveal
          >
            <img src={p.img} alt={p.name} loading="lazy" />
            <div className="profile-overlay"></div>
            <div className="match-badge">
              <span className="match-heart">♥</span> {p.match}%
            </div>
            <div className="profile-body">
              <div className="profile-name">{p.name}</div>
              <div className="profile-meta">
                {p.age} · {p.city}
              </div>
              <div className="profile-tags">
                {p.tags.map((t) => (
                  <span className="ptag" key={t}>{t}</span>
                ))}
              </div>
              <div className="profile-actions">
                <button className="pa-btn pa-like">♥ Like</button>
                <button className="pa-btn pa-view">View</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MemberFeature;
