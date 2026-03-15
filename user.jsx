import { useState, useEffect, useRef } from "react";

const GOOGLE_FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
`;

const profiles = [
  {
    id: 1,
    name: "Sophia Laurent",
    age: 26,
    city: "Paris, France",
    bio: "Art curator by day, wine enthusiast by night. Looking for someone who appreciates both Monet and midnight adventures.",
    tags: ["Art", "Travel", "Wine", "Jazz"],
    match: 94,
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=80",
    verified: true,
  },
  {
    id: 2,
    name: "Isabella Chen",
    age: 28,
    city: "New York, USA",
    bio: "Architect designing futures. Coffee is my love language. Let's build something beautiful together.",
    tags: ["Design", "Coffee", "Yoga", "Books"],
    match: 88,
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80",
    verified: true,
  },
  {
    id: 3,
    name: "Amara Osei",
    age: 25,
    city: "Lagos, Nigeria",
    bio: "Musician & storyteller. I believe every person has a song inside them. Let me find yours.",
    tags: ["Music", "Poetry", "Dance", "Food"],
    match: 91,
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=80",
    verified: false,
  },
  {
    id: 4,
    name: "Elena Voss",
    age: 27,
    city: "Berlin, Germany",
    bio: "Photographer chasing golden hour. My camera sees the world in slow motion. Come explore with me.",
    tags: ["Photography", "Hiking", "Cinema", "Cooking"],
    match: 87,
    img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80",
    verified: true,
  },
];

const matches = [
  { id: 1, name: "Sophia", img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&q=80", lastMsg: "I'd love that 🌸", time: "2m", unread: 2 },
  { id: 2, name: "Isabella", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80", lastMsg: "See you Saturday?", time: "1h", unread: 0 },
  { id: 3, name: "Elena", img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&q=80", lastMsg: "New match! Say hello 👋", time: "3h", unread: 1 },
];

export default function DatingApp() {
  const [screen, setScreen] = useState("discover");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [swipeAnim, setSwipeAnim] = useState(null);
  const [showMatch, setShowMatch] = useState(false);
  const [likedProfiles, setLikedProfiles] = useState([]);
  const [dragState, setDragState] = useState({ dragging: false, x: 0, y: 0, startX: 0, startY: 0 });
  const cardRef = useRef(null);

  const current = profiles[currentIdx];

  const swipe = (dir) => {
    setSwipeAnim(dir);
    if (dir === "right") {
      setLikedProfiles((p) => [...p, current]);
      if (Math.random() > 0.4) {
        setTimeout(() => { setShowMatch(true); setSwipeAnim(null); }, 500);
        return;
      }
    }
    setTimeout(() => {
      setCurrentIdx((i) => (i + 1) % profiles.length);
      setSwipeAnim(null);
    }, 500);
  };

  const handleMouseDown = (e) => {
    setDragState({ dragging: true, x: 0, y: 0, startX: e.clientX, startY: e.clientY });
  };
  const handleMouseMove = (e) => {
    if (!dragState.dragging) return;
    setDragState((s) => ({ ...s, x: e.clientX - s.startX, y: e.clientY - s.startY }));
  };
  const handleMouseUp = () => {
    if (dragState.x > 80) swipe("right");
    else if (dragState.x < -80) swipe("left");
    setDragState({ dragging: false, x: 0, y: 0, startX: 0, startY: 0 });
  };

  const cardStyle = dragState.dragging
    ? { transform: `translateX(${dragState.x}px) translateY(${dragState.y * 0.3}px) rotate(${dragState.x * 0.04}deg)`, transition: "none", cursor: "grabbing" }
    : swipeAnim === "right"
    ? { transform: "translateX(150%) rotate(25deg)", transition: "transform 0.5s ease" }
    : swipeAnim === "left"
    ? { transform: "translateX(-150%) rotate(-25deg)", transition: "transform 0.5s ease" }
    : { transform: "none", transition: "transform 0.3s ease", cursor: "grab" };

  const likeOpacity = dragState.dragging ? Math.min(Math.max(dragState.x / 80, 0), 1) : 0;
  const passOpacity = dragState.dragging ? Math.min(Math.max(-dragState.x / 80, 0), 1) : 0;

  return (
    <>
      <style>{`
        ${GOOGLE_FONTS}
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --bg: #0d0a12;
          --surface: #16111f;
          --surface2: #1e1729;
          --border: rgba(255,255,255,0.07);
          --rose: #e8637a;
          --rose-light: #f5a0ae;
          --gold: #c9a84c;
          --gold-light: #e8cc85;
          --cream: #f5efe6;
          --muted: rgba(245,239,230,0.45);
          --font-display: 'Cormorant Garamond', serif;
          --font-body: 'DM Sans', sans-serif;
        }
        body { background: var(--bg); color: var(--cream); font-family: var(--font-body); min-height: 100vh; overflow-x: hidden; }

        .app { display: flex; flex-direction: column; min-height: 100vh; max-width: 430px; margin: 0 auto; position: relative; background: var(--bg); }

        /* ── Ambient Glow ── */
        .glow-orb { position: fixed; border-radius: 50%; filter: blur(80px); pointer-events: none; z-index: 0; }
        .glow-1 { width: 350px; height: 350px; background: radial-gradient(circle, rgba(232,99,122,0.15), transparent); top: -80px; right: -80px; }
        .glow-2 { width: 280px; height: 280px; background: radial-gradient(circle, rgba(201,168,76,0.1), transparent); bottom: 100px; left: -60px; }

        /* ── Header ── */
        .header { padding: 20px 24px 12px; display: flex; align-items: center; justify-content: space-between; position: relative; z-index: 10; }
        .logo { font-family: var(--font-display); font-size: 28px; font-weight: 300; letter-spacing: 0.02em; font-style: italic; }
        .logo span { color: var(--rose); }
        .header-actions { display: flex; gap: 12px; }
        .icon-btn { width: 40px; height: 40px; border-radius: 50%; background: var(--surface2); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 18px; transition: all 0.2s; position: relative; }
        .icon-btn:hover { border-color: var(--rose); background: rgba(232,99,122,0.1); }
        .badge { position: absolute; top: -3px; right: -3px; width: 16px; height: 16px; background: var(--rose); border-radius: 50%; font-size: 9px; font-family: var(--font-body); display: flex; align-items: center; justify-content: center; color: white; font-weight: 500; border: 2px solid var(--bg); }

        /* ── Discover Screen ── */
        .discover { flex: 1; display: flex; flex-direction: column; padding: 0 20px; position: relative; z-index: 5; }
        .section-title { font-family: var(--font-display); font-size: 15px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--muted); margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
        .section-title::after { content: ''; flex: 1; height: 1px; background: var(--border); }

        /* ── Card Stack ── */
        .card-stack { position: relative; height: 480px; margin-bottom: 24px; }
        .card-behind { position: absolute; inset: 0; border-radius: 28px; background: var(--surface2); transform: scale(0.94) translateY(18px); border: 1px solid var(--border); }
        .card-behind-2 { position: absolute; inset: 0; border-radius: 28px; background: var(--surface); transform: scale(0.97) translateY(9px); border: 1px solid var(--border); }

        .profile-card { position: absolute; inset: 0; border-radius: 28px; overflow: hidden; user-select: none; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 30px 80px rgba(0,0,0,0.5); }
        .card-img { width: 100%; height: 100%; object-fit: cover; display: block; pointer-events: none; }
        .card-gradient { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(13,10,18,0) 30%, rgba(13,10,18,0.4) 55%, rgba(13,10,18,0.95) 100%); }
        .card-body { position: absolute; bottom: 0; left: 0; right: 0; padding: 24px; }
        .card-name { font-family: var(--font-display); font-size: 32px; font-weight: 500; letter-spacing: 0.01em; line-height: 1.1; }
        .card-meta { display: flex; align-items: center; gap: 8px; margin-top: 4px; margin-bottom: 14px; }
        .card-age { font-size: 13px; color: var(--muted); font-weight: 300; }
        .card-city { font-size: 13px; color: var(--muted); display: flex; align-items: center; gap: 4px; }
        .verified-badge { background: linear-gradient(135deg, var(--gold), var(--gold-light)); border-radius: 20px; padding: 3px 10px; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: #1a1000; font-weight: 500; }
        .card-bio { font-size: 13.5px; color: rgba(245,239,230,0.75); line-height: 1.6; font-weight: 300; margin-bottom: 14px; }
        .card-tags { display: flex; flex-wrap: wrap; gap: 7px; }
        .tag { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); border-radius: 20px; padding: 5px 12px; font-size: 11.5px; color: rgba(245,239,230,0.7); letter-spacing: 0.05em; }

        .match-pct { position: absolute; top: 20px; right: 20px; background: rgba(13,10,18,0.75); backdrop-filter: blur(12px); border: 1px solid rgba(201,168,76,0.3); border-radius: 20px; padding: 6px 14px; display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 500; color: var(--gold-light); }
        .match-pct span { font-family: var(--font-display); font-size: 17px; font-weight: 600; }

        .swipe-like { position: absolute; top: 30px; left: 20px; background: rgba(39,174,96,0.9); border: 3px solid #27ae60; border-radius: 12px; padding: 8px 18px; font-size: 22px; font-weight: 700; letter-spacing: 0.1em; color: white; transform: rotate(-15deg); pointer-events: none; z-index: 20; }
        .swipe-pass { position: absolute; top: 30px; right: 20px; background: rgba(232,99,122,0.9); border: 3px solid var(--rose); border-radius: 12px; padding: 8px 18px; font-size: 22px; font-weight: 700; letter-spacing: 0.1em; color: white; transform: rotate(15deg); pointer-events: none; z-index: 20; }

        /* ── Action Buttons ── */
        .actions { display: flex; align-items: center; justify-content: center; gap: 18px; margin-bottom: 28px; }
        .action-btn { border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 22px; transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .action-btn.pass { width: 60px; height: 60px; border-radius: 50%; background: var(--surface2); border: 1.5px solid rgba(232,99,122,0.3); color: var(--rose); }
        .action-btn.pass:hover { background: rgba(232,99,122,0.15); transform: scale(1.1); border-color: var(--rose); }
        .action-btn.like { width: 72px; height: 72px; border-radius: 50%; background: linear-gradient(135deg, var(--rose), #c0304a); border: none; color: white; box-shadow: 0 8px 32px rgba(232,99,122,0.4); }
        .action-btn.like:hover { transform: scale(1.12); box-shadow: 0 12px 40px rgba(232,99,122,0.55); }
        .action-btn.super { width: 60px; height: 60px; border-radius: 50%; background: var(--surface2); border: 1.5px solid rgba(201,168,76,0.3); color: var(--gold); }
        .action-btn.super:hover { background: rgba(201,168,76,0.12); transform: scale(1.1); border-color: var(--gold); }

        /* ── Match Modal ── */
        .match-overlay { position: fixed; inset: 0; background: rgba(13,10,18,0.92); backdrop-filter: blur(8px); z-index: 100; display: flex; align-items: center; justify-content: center; animation: fadeIn 0.4s ease; }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        .match-modal { text-align: center; padding: 40px 32px; animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); max-width: 340px; }
        @keyframes popIn { from { opacity: 0; transform: scale(0.7) } to { opacity: 1; transform: scale(1) } }
        .match-hearts { font-size: 48px; margin-bottom: 16px; animation: pulse 1.5s infinite; }
        @keyframes pulse { 0%,100% { transform: scale(1) } 50% { transform: scale(1.1) } }
        .match-title { font-family: var(--font-display); font-size: 48px; font-weight: 300; font-style: italic; color: var(--rose-light); line-height: 1; margin-bottom: 8px; }
        .match-subtitle { color: var(--muted); font-size: 14px; margin-bottom: 32px; font-weight: 300; }
        .match-imgs { display: flex; align-items: center; justify-content: center; gap: 16px; margin-bottom: 36px; }
        .match-img-wrap { width: 110px; height: 110px; border-radius: 50%; overflow: hidden; border: 3px solid var(--rose); box-shadow: 0 0 30px rgba(232,99,122,0.4); }
        .match-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
        .match-heart-icon { font-size: 28px; }
        .match-btn { width: 100%; padding: 16px; border-radius: 50px; border: none; background: linear-gradient(135deg, var(--rose), #c0304a); color: white; font-family: var(--font-body); font-size: 15px; font-weight: 500; cursor: pointer; letter-spacing: 0.05em; margin-bottom: 12px; transition: transform 0.2s; }
        .match-btn:hover { transform: scale(1.02); }
        .match-skip { background: none; border: none; color: var(--muted); font-family: var(--font-body); font-size: 13px; cursor: pointer; padding: 8px; }
        .match-skip:hover { color: var(--cream); }

        /* ── Matches Screen ── */
        .matches-screen { flex: 1; padding: 0 20px; position: relative; z-index: 5; }
        .new-matches { margin-bottom: 28px; }
        .matches-row { display: flex; gap: 14px; overflow-x: auto; padding-bottom: 8px; scrollbar-width: none; }
        .matches-row::-webkit-scrollbar { display: none; }
        .new-match-item { flex: 0 0 auto; display: flex; flex-direction: column; align-items: center; gap: 8px; cursor: pointer; }
        .new-match-avatar { width: 68px; height: 68px; border-radius: 50%; overflow: hidden; border: 2px solid transparent; background: linear-gradient(var(--bg), var(--bg)) padding-box, linear-gradient(135deg, var(--rose), var(--gold)) border-box; padding: 2px; }
        .new-match-avatar img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
        .new-match-name { font-size: 11.5px; color: var(--muted); letter-spacing: 0.03em; }

        .conversation-list { display: flex; flex-direction: column; gap: 2px; }
        .convo-item { display: flex; align-items: center; gap: 14px; padding: 14px 0; border-bottom: 1px solid var(--border); cursor: pointer; transition: all 0.2s; border-radius: 12px; padding: 14px 12px; }
        .convo-item:hover { background: var(--surface2); }
        .convo-avatar { width: 56px; height: 56px; border-radius: 50%; overflow: hidden; flex-shrink: 0; border: 2px solid var(--border); }
        .convo-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .convo-info { flex: 1; min-width: 0; }
        .convo-name { font-size: 15px; font-weight: 500; margin-bottom: 3px; }
        .convo-msg { font-size: 13px; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-weight: 300; }
        .convo-right { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; }
        .convo-time { font-size: 11px; color: var(--muted); }
        .unread-dot { width: 20px; height: 20px; background: var(--rose); border-radius: 50%; font-size: 10px; color: white; display: flex; align-items: center; justify-content: center; font-weight: 500; }

        /* ── Profile Screen ── */
        .profile-screen { flex: 1; padding: 0 20px; position: relative; z-index: 5; }
        .my-profile-card { background: var(--surface); border: 1px solid var(--border); border-radius: 24px; overflow: hidden; margin-bottom: 24px; }
        .my-profile-bg { height: 160px; background: linear-gradient(135deg, rgba(232,99,122,0.3), rgba(201,168,76,0.2)); position: relative; display: flex; align-items: flex-end; justify-content: center; }
        .my-avatar { width: 90px; height: 90px; border-radius: 50%; overflow: hidden; border: 4px solid var(--bg); position: absolute; bottom: -45px; }
        .my-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .my-profile-info { padding: 56px 20px 24px; text-align: center; }
        .my-name { font-family: var(--font-display); font-size: 26px; font-weight: 500; margin-bottom: 4px; }
        .my-meta { color: var(--muted); font-size: 13px; font-weight: 300; margin-bottom: 16px; }
        .my-stats { display: flex; justify-content: center; gap: 32px; padding-top: 16px; border-top: 1px solid var(--border); }
        .stat { text-align: center; }
        .stat-val { font-family: var(--font-display); font-size: 24px; font-weight: 600; color: var(--rose-light); }
        .stat-label { font-size: 11px; color: var(--muted); letter-spacing: 0.08em; text-transform: uppercase; margin-top: 2px; }

        .settings-list { display: flex; flex-direction: column; gap: 2px; }
        .settings-item { display: flex; align-items: center; justify-content: space-between; padding: 16px 18px; background: var(--surface); border-radius: 14px; cursor: pointer; transition: background 0.2s; border: 1px solid var(--border); margin-bottom: 6px; }
        .settings-item:hover { background: var(--surface2); }
        .settings-left { display: flex; align-items: center; gap: 14px; }
        .settings-icon { width: 38px; height: 38px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 18px; }
        .settings-icon.rose { background: rgba(232,99,122,0.12); }
        .settings-icon.gold { background: rgba(201,168,76,0.12); }
        .settings-icon.blue { background: rgba(99,150,232,0.12); }
        .settings-name { font-size: 14.5px; font-weight: 400; }
        .settings-arrow { color: var(--muted); font-size: 16px; }

        /* ── Premium Banner ── */
        .premium-banner { background: linear-gradient(135deg, rgba(201,168,76,0.15), rgba(232,99,122,0.1)); border: 1px solid rgba(201,168,76,0.25); border-radius: 20px; padding: 20px; margin-bottom: 24px; display: flex; align-items: center; gap: 16px; cursor: pointer; }
        .premium-icon { font-size: 32px; }
        .premium-title { font-family: var(--font-display); font-size: 19px; font-weight: 500; color: var(--gold-light); }
        .premium-sub { font-size: 12px; color: var(--muted); font-weight: 300; margin-top: 2px; }
        .premium-arrow { margin-left: auto; color: var(--gold); font-size: 18px; }

        /* ── Bottom Nav ── */
        .bottom-nav { position: sticky; bottom: 0; background: rgba(13,10,18,0.92); backdrop-filter: blur(20px); border-top: 1px solid var(--border); display: flex; z-index: 50; padding: 10px 0 18px; }
        .nav-item { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 5px; cursor: pointer; padding: 6px 0; transition: all 0.2s; }
        .nav-icon { font-size: 22px; transition: transform 0.2s; }
        .nav-label { font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); }
        .nav-item.active .nav-label { color: var(--rose); }
        .nav-item.active .nav-icon { transform: scale(1.1); }
        .nav-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--rose); margin-top: -4px; }
      `}</style>

      <div className="app">
        <div className="glow-orb glow-1" />
        <div className="glow-orb glow-2" />

        {/* Header */}
        <div className="header">
          <div className="logo">amor<span>.</span></div>
          <div className="header-actions">
            <div className="icon-btn" onClick={() => setScreen("matches")}>
              💬
              <div className="badge">3</div>
            </div>
            <div className="icon-btn">🔔</div>
          </div>
        </div>

        {/* ── DISCOVER SCREEN ── */}
        {screen === "discover" && (
          <div className="discover">
            <div className="section-title">Discover</div>

            {current && (
              <div className="card-stack">
                {/* Cards behind */}
                <div className="card-behind" />
                <div className="card-behind-2" />

                {/* Main card */}
                <div
                  className="profile-card"
                  ref={cardRef}
                  style={cardStyle}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  <img className="card-img" src={current.img} alt={current.name} draggable="false" />
                  <div className="card-gradient" />

                  {/* Swipe indicators */}
                  {likeOpacity > 0.1 && (
                    <div className="swipe-like" style={{ opacity: likeOpacity }}>LIKE</div>
                  )}
                  {passOpacity > 0.1 && (
                    <div className="swipe-pass" style={{ opacity: passOpacity }}>PASS</div>
                  )}

                  {/* Match % */}
                  <div className="match-pct">
                    <span>♥</span> <span>{current.match}%</span> match
                  </div>

                  <div className="card-body">
                    <div className="card-meta">
                      <div className="card-name">{current.name}</div>
                      {current.verified && <div className="verified-badge">✦ Verified</div>}
                    </div>
                    <div className="card-meta">
                      <span className="card-age">{current.age}</span>
                      <span className="card-city">📍 {current.city}</span>
                    </div>
                    <div className="card-bio">{current.bio}</div>
                    <div className="card-tags">
                      {current.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="actions">
              <button className="action-btn pass" onClick={() => swipe("left")}>✕</button>
              <button className="action-btn like" onClick={() => swipe("right")}>♥</button>
              <button className="action-btn super" onClick={() => swipe("super")}>★</button>
            </div>
          </div>
        )}

        {/* ── MATCHES SCREEN ── */}
        {screen === "matches" && (
          <div className="matches-screen">
            <div className="section-title">Connections</div>

            <div className="premium-banner">
              <div className="premium-icon">✦</div>
              <div>
                <div className="premium-title">Upgrade to Gold</div>
                <div className="premium-sub">See who liked you · Unlimited swipes</div>
              </div>
              <div className="premium-arrow">›</div>
            </div>

            <div className="new-matches">
              <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 14, letterSpacing: "0.05em" }}>New Matches</div>
              <div className="matches-row">
                {matches.map((m) => (
                  <div className="new-match-item" key={m.id}>
                    <div className="new-match-avatar">
                      <img src={m.img} alt={m.name} />
                    </div>
                    <div className="new-match-name">{m.name}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 14, letterSpacing: "0.05em" }}>Messages</div>
            <div className="conversation-list">
              {matches.map((m) => (
                <div className="convo-item" key={m.id}>
                  <div className="convo-avatar"><img src={m.img} alt={m.name} /></div>
                  <div className="convo-info">
                    <div className="convo-name">{m.name}</div>
                    <div className="convo-msg">{m.lastMsg}</div>
                  </div>
                  <div className="convo-right">
                    <div className="convo-time">{m.time}</div>
                    {m.unread > 0 && <div className="unread-dot">{m.unread}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── PROFILE SCREEN ── */}
        {screen === "profile" && (
          <div className="profile-screen">
            <div className="section-title">My Profile</div>

            <div className="my-profile-card">
              <div className="my-profile-bg">
                <div className="my-avatar">
                  <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80" alt="Me" />
                </div>
              </div>
              <div className="my-profile-info">
                <div className="my-name">Alex Rivera</div>
                <div className="my-meta">28 · New York, USA</div>
                <div className="my-stats">
                  <div className="stat"><div className="stat-val">47</div><div className="stat-label">Likes</div></div>
                  <div className="stat"><div className="stat-val">12</div><div className="stat-label">Matches</div></div>
                  <div className="stat"><div className="stat-val">94%</div><div className="stat-label">Complete</div></div>
                </div>
              </div>
            </div>

            <div className="premium-banner">
              <div className="premium-icon">✦</div>
              <div>
                <div className="premium-title">Amor Gold</div>
                <div className="premium-sub">Unlock all premium features</div>
              </div>
              <div className="premium-arrow">›</div>
            </div>

            <div className="settings-list">
              {[
                { icon: "✏️", label: "Edit Profile", cls: "rose" },
                { icon: "🎯", label: "Preferences", cls: "gold" },
                { icon: "🔒", label: "Privacy & Safety", cls: "blue" },
                { icon: "🔔", label: "Notifications", cls: "rose" },
                { icon: "💳", label: "Subscription", cls: "gold" },
                { icon: "🚪", label: "Sign Out", cls: "blue" },
              ].map((item) => (
                <div className="settings-item" key={item.label}>
                  <div className="settings-left">
                    <div className={`settings-icon ${item.cls}`}>{item.icon}</div>
                    <div className="settings-name">{item.label}</div>
                  </div>
                  <div className="settings-arrow">›</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Match Modal */}
        {showMatch && (
          <div className="match-overlay">
            <div className="match-modal">
              <div className="match-hearts">💫</div>
              <div className="match-title">It's a Match!</div>
              <div className="match-subtitle">You and {current?.name} liked each other</div>
              <div className="match-imgs">
                <div className="match-img-wrap">
                  <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80" alt="Me" />
                </div>
                <div className="match-heart-icon">♥</div>
                <div className="match-img-wrap">
                  <img src={current?.img} alt={current?.name} />
                </div>
              </div>
              <button className="match-btn" onClick={() => { setShowMatch(false); setScreen("matches"); setCurrentIdx((i) => (i + 1) % profiles.length); }}>
                Send a Message ✉️
              </button>
              <button className="match-skip" onClick={() => { setShowMatch(false); setCurrentIdx((i) => (i + 1) % profiles.length); }}>
                Keep Swiping
              </button>
            </div>
          </div>
        )}

        {/* Bottom Nav */}
        <div className="bottom-nav">
          {[
            { id: "discover", icon: "⊕", label: "Discover" },
            { id: "matches", icon: "♥", label: "Matches" },
            { id: "profile", icon: "◎", label: "Profile" },
          ].map((n) => (
            <div key={n.id} className={`nav-item ${screen === n.id ? "active" : ""}`} onClick={() => setScreen(n.id)}>
              <div className="nav-icon">{n.icon}</div>
              <div className="nav-label">{n.label}</div>
              {screen === n.id && <div className="nav-dot" />}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}