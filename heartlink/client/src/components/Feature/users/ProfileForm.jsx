import { useState } from "react";

// ─── Styles ───────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400;1,500&family=Outfit:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:        #f7f4f0;
    --white:     #ffffff;
    --border:    #e8e0d8;
    --accent:    #c0694a;
    --accent2:   #8b4a6e;
    --text:      #1c1714;
    --muted:     #9a8f88;
    --soft:      #f0ebe5;
    --radius:    16px;
    --ff-head:   'Lora', serif;
    --ff-body:   'Outfit', sans-serif;
    --shadow:    0 2px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04);
    --shadow-lg: 0 8px 48px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.05);
  }

  .pf-root {
    min-height: 100vh;
    background: var(--bg);
    background-image:
      radial-gradient(ellipse 55% 45% at 90% 5%,  rgba(192,105,74,0.08)  0%, transparent 60%),
      radial-gradient(ellipse 40% 55% at 5%  95%,  rgba(139,74,110,0.07)  0%, transparent 55%),
      radial-gradient(ellipse 70% 30% at 50% 50%,  rgba(247,244,240,1)    0%, transparent 80%);
    font-family: var(--ff-body);
    color: var(--text);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 56px 20px 80px;
  }

  /* ── Noise grain overlay ── */
  .pf-root::before {
    content: '';
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
    opacity: 0.4;
  }

  /* ── everything above grain ── */
  .pf-inner { position: relative; z-index: 1; width: 100%; display: flex; flex-direction: column; align-items: center; }

  /* ── Header ── */
  .pf-header {
    text-align: center; margin-bottom: 44px;
    animation: fadeUp 0.65s cubic-bezier(0.22,1,0.36,1) both;
  }
  .pf-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--accent); font-weight: 600; margin-bottom: 14px;
  }
  .pf-eyebrow::before,
  .pf-eyebrow::after { content: ''; width: 24px; height: 1px; background: var(--accent); opacity: 0.5; }
  .pf-title {
    font-family: var(--ff-head); font-size: clamp(30px, 5vw, 46px);
    font-weight: 400; line-height: 1.15; color: var(--text); letter-spacing: -0.01em;
  }
  .pf-title em { font-style: italic; color: var(--accent); }
  .pf-subtitle { margin-top: 10px; font-size: 14.5px; color: var(--muted); font-weight: 300; line-height: 1.6; }

  /* ── Steps ── */
  .pf-steps {
    display: flex; align-items: center; margin-bottom: 32px;
    background: var(--white); border: 1px solid var(--border);
    border-radius: 999px; padding: 6px 10px; gap: 2px;
    box-shadow: var(--shadow);
    animation: fadeUp 0.65s 0.08s cubic-bezier(0.22,1,0.36,1) both;
  }
  .pf-step-btn {
    display: flex; align-items: center; gap: 8px;
    padding: 8px 16px; border-radius: 999px; border: none;
    background: none; cursor: default; transition: background 0.25s;
    font-family: var(--ff-body);
  }
  .pf-step-btn.done   { cursor: pointer; }
  .pf-step-btn.active { background: var(--accent); }
  .pf-step-dot {
    width: 22px; height: 22px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 600; flex-shrink: 0;
    transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
  }
  .pf-step-btn.done   .pf-step-dot { background: rgba(192,105,74,0.15); color: var(--accent); }
  .pf-step-btn.active .pf-step-dot { background: rgba(255,255,255,0.25); color: #fff; }
  .pf-step-btn.pending .pf-step-dot { background: var(--soft); color: var(--muted); }
  .pf-step-name {
    font-size: 12px; font-weight: 500; letter-spacing: 0.05em;
    transition: color 0.25s;
  }
  .pf-step-btn.active  .pf-step-name { color: #fff; }
  .pf-step-btn.done    .pf-step-name { color: var(--accent); }
  .pf-step-btn.pending .pf-step-name { color: var(--muted); }
  .pf-step-sep { width: 16px; height: 1px; background: var(--border); flex-shrink: 0; }

  @media (max-width: 480px) {
    .pf-step-name { display: none; }
    .pf-step-btn { padding: 8px 10px; }
  }

  /* ── Card ── */
  .pf-card {
    width: 100%; max-width: 560px;
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 44px 44px 40px;
    box-shadow: var(--shadow-lg);
    animation: fadeUp 0.65s 0.15s cubic-bezier(0.22,1,0.36,1) both;
    overflow: hidden;
  }
  @media (max-width: 520px) { .pf-card { padding: 30px 22px 26px; } }

  .pf-card-head { margin-bottom: 30px; }
  .pf-card-step-tag {
    display: inline-block;
    font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase;
    font-weight: 600; color: var(--accent);
    background: rgba(192,105,74,0.08); border: 1px solid rgba(192,105,74,0.18);
    padding: 3px 10px; border-radius: 20px; margin-bottom: 10px;
  }
  .pf-card-title {
    font-family: var(--ff-head); font-size: 24px; font-weight: 400;
    color: var(--text); line-height: 1.25; margin-bottom: 6px;
  }
  .pf-card-desc { font-size: 13.5px; color: var(--muted); font-weight: 300; line-height: 1.65; }

  /* ── Divider ── */
  .pf-divider { width: 100%; height: 1px; background: var(--border); margin: 28px 0; }

  /* ── Avatar row ── */
  .pf-avatar-row { display: flex; align-items: center; gap: 20px; margin-bottom: 28px; }
  .pf-avatar-wrap {
    width: 76px; height: 76px; border-radius: 50%; flex-shrink: 0;
    background: var(--soft); border: 2px dashed var(--border);
    display: flex; align-items: center; justify-content: center;
    overflow: hidden; transition: border-color 0.3s, box-shadow 0.3s;
    position: relative;
  }
  .pf-avatar-wrap.live {
    border: 2px solid var(--accent);
    box-shadow: 0 0 0 4px rgba(192,105,74,0.12);
  }
  .pf-avatar-wrap img { width: 100%; height: 100%; object-fit: cover; }
  .pf-avatar-empty { font-size: 26px; color: var(--border); }
  .pf-avatar-hint strong { display: block; font-size: 13px; font-weight: 500; color: var(--text); margin-bottom: 3px; }
  .pf-avatar-hint p { font-size: 12px; color: var(--muted); font-weight: 300; line-height: 1.55; }

  /* ── Floating label field ── */
  .pf-field {
    position: relative; margin-bottom: 26px;
    padding-bottom: 2px;
    border-bottom: 1.5px solid var(--border);
    transition: border-color 0.25s;
  }
  .pf-field:focus-within { border-color: var(--accent); }
  .pf-field label {
    position: absolute; top: 17px; left: 0;
    font-size: 14px; color: var(--muted); font-weight: 400;
    pointer-events: none; transition: all 0.22s cubic-bezier(0.4,0,0.2,1);
  }
  .pf-field.filled label,
  .pf-field:focus-within label {
    top: 0; font-size: 10px; letter-spacing: 0.15em;
    text-transform: uppercase; color: var(--accent); font-weight: 600;
  }
  .pf-field input,
  .pf-field textarea {
    width: 100%; background: transparent; border: none; outline: none;
    padding: 22px 0 7px; font-family: var(--ff-body);
    font-size: 15px; color: var(--text); font-weight: 400;
    resize: none;
  }
  .pf-field input::placeholder,
  .pf-field textarea::placeholder { color: transparent; }
  .pf-field:focus-within input::placeholder,
  .pf-field:focus-within textarea::placeholder { color: rgba(154,143,136,0.55); transition: color 0.2s 0.1s; }
  .pf-hint-text { font-size: 11px; color: var(--muted); margin-top: 5px; letter-spacing: 0.03em; }

  /* ── Tags ── */
  .pf-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
  .pf-tag {
    display: inline-flex; align-items: center;
    padding: 4px 12px; border-radius: 999px;
    background: var(--soft); border: 1px solid var(--border);
    font-size: 12px; color: var(--text); font-weight: 400;
    animation: tagPop 0.25s cubic-bezier(0.34,1.56,0.64,1) both;
  }
  .pf-tag.accent-tag {
    background: rgba(192,105,74,0.08); border-color: rgba(192,105,74,0.22);
    color: var(--accent);
  }
  @keyframes tagPop { from { transform: scale(0.6); opacity: 0; } to { transform: scale(1); opacity: 1; } }

  /* ── Two-col row ── */
  .pf-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  @media (max-width: 400px) { .pf-row { grid-template-columns: 1fr; } }

  /* ── Progress bar ── */
  .pf-progress-track {
    width: 100%; height: 3px; background: var(--soft);
    border-radius: 99px; margin-bottom: 32px; overflow: hidden;
  }
  .pf-progress-bar {
    height: 100%; border-radius: 99px;
    background: linear-gradient(90deg, var(--accent), var(--accent2));
    transition: width 0.45s cubic-bezier(0.4,0,0.2,1);
  }

  /* ── Nav buttons ── */
  .pf-nav { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 32px; }
  .pf-btn-back {
    display: flex; align-items: center; gap: 6px;
    background: none; border: 1.5px solid var(--border); color: var(--muted);
    padding: 12px 20px; border-radius: 10px; font-family: var(--ff-body);
    font-size: 13px; font-weight: 500; cursor: pointer;
    transition: border-color 0.2s, color 0.2s, background 0.2s;
  }
  .pf-btn-back:hover { border-color: var(--accent); color: var(--accent); background: rgba(192,105,74,0.04); }

  .pf-btn-next {
    flex: 1; max-width: 220px; margin-left: auto;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    background: var(--accent); color: #fff;
    border: none; padding: 14px 24px; border-radius: 10px;
    font-family: var(--ff-body); font-size: 13px; font-weight: 600;
    letter-spacing: 0.06em; cursor: pointer;
    box-shadow: 0 4px 20px rgba(192,105,74,0.30);
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  }
  .pf-btn-next:hover { background: #b05a3d; transform: translateY(-1px); box-shadow: 0 6px 28px rgba(192,105,74,0.38); }
  .pf-btn-next:active { transform: translateY(0); }
  .pf-btn-next.full { max-width: 100%; }

  /* ── Success ── */
  .pf-success { text-align: center; padding: 16px 0; animation: fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both; }
  .pf-success-ring {
    width: 88px; height: 88px; border-radius: 50%; margin: 0 auto 28px;
    background: linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%);
    display: flex; align-items: center; justify-content: center;
    font-size: 34px; color: #fff;
    box-shadow: 0 8px 32px rgba(192,105,74,0.35), 0 0 0 8px rgba(192,105,74,0.10);
    animation: bloom 0.55s 0.1s cubic-bezier(0.34,1.56,0.64,1) both;
  }
  @keyframes bloom { from { transform: scale(0.3); opacity: 0; } to { transform: scale(1); opacity: 1; } }
  .pf-success-title { font-family: var(--ff-head); font-size: 30px; font-weight: 400; color: var(--text); margin-bottom: 10px; }
  .pf-success-title em { font-style: italic; color: var(--accent); }
  .pf-success-body { font-size: 14.5px; color: var(--muted); font-weight: 300; line-height: 1.7; }

  /* ── Slide transitions ── */
  .slide-fwd  { animation: slideFwd  0.38s cubic-bezier(0.22,1,0.36,1) both; }
  .slide-back { animation: slideBack 0.38s cubic-bezier(0.22,1,0.36,1) both; }
  @keyframes slideFwd  { from { opacity: 0; transform: translateX(28px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes slideBack { from { opacity: 0; transform: translateX(-28px); } to { opacity: 1; transform: translateX(0); } }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
`;

// ─── Helpers ──────────────────────────────────────────────────────────────────
const parseTags = (str) =>
  str
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

const Field = ({
  label,
  name,
  value,
  onChange,
  textarea,
  hint,
  type = "text",
}) => (
  <div className={`pf-field${value ? " filled" : ""}`}>
    <label htmlFor={name}>{label}</label>
    {textarea ? (
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        rows={3}
      />
    ) : (
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    )}
    {hint && <p className="pf-hint-text">{hint}</p>}
  </div>
);

const TagField = ({ label, name, value, onChange, accent }) => {
  const tags = parseTags(value);
  return (
    <div className={`pf-field${value ? " filled" : ""}`}>
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} value={value} onChange={onChange} />
      {tags.length > 0 && (
        <div className="pf-tags">
          {tags.map((t, i) => (
            <span key={i} className={`pf-tag${accent ? " accent-tag" : ""}`}>
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

const STEPS = [
  { label: "Identity" },
  { label: "Passions" },
  { label: "Journey" },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function ProfileForm() {
  const [profile, setProfile] = useState({
    profilePic: "",
    bio: "",
    skills: "",
    experience: "",
    education: "",
    interest: "",
    location: "",
    age: "",
  });
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState("fwd");
  const [submitted, setSubmitted] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((p) => ({ ...p, [name]: value }));
    if (name === "profilePic") setImgErr(false);
  };

  const go = (next) => {
    setDir(next > step ? "fwd" : "back");
    setStep(next);
  };

  const submit = () => {
    const data = {
      ...profile,
      skills: parseTags(profile.skills),
      experience: parseTags(profile.experience),
      education: parseTags(profile.education),
      interest: parseTags(profile.interest),
    };
    console.log("Profile:", data);
    setSubmitted(true);
  };

  const slideClass = dir === "fwd" ? "slide-fwd" : "slide-back";
  const hasImg = profile.profilePic && !imgErr;
  // const progress = (step / (STEPS.length - 1)) * 100;

  return (
    <>
      <style>{css}</style>
      <div className="pf-root">
        <div className="pf-inner">
          {/* Header */}
          <header className="pf-header">
            <p className="pf-eyebrow">Your profile</p>
            <h1 className="pf-title">
              Let's get to <em>know you</em>
            </h1>
            <p className="pf-subtitle">
              Fill in the details — it only takes a minute.
            </p>
          </header>

          {/* Step pills */}
          {!submitted && (
            <div className="pf-steps">
              {STEPS.map((s, i) => (
                <>
                  <button
                    key={s.label}
                    className={`pf-step-btn ${i < step ? "done" : i === step ? "active" : "pending"}`}
                    onClick={() => i < step && go(i)}
                  >
                    <div className="pf-step-dot">{i < step ? "✓" : i + 1}</div>
                    <span className="pf-step-name">{s.label}</span>
                  </button>
                  {i < STEPS.length - 1 && (
                    <div key={`sep-${i}`} className="pf-step-sep" />
                  )}
                </>
              ))}
            </div>
          )}

          {/* Card */}
          <div className="pf-card">
            {submitted ? (
              <div className="pf-success">
                <div className="pf-success-ring">✦</div>
                <h2 className="pf-success-title">
                  You're all <em>set!</em>
                </h2>
                <p className="pf-success-body">
                  Your profile is ready.
                  <br />
                  Time to find your perfect connection.
                </p>
              </div>
            ) : (
              <div key={step} className={slideClass}>
                {/* Progress bar */}
                <div className="pf-progress-track">
                  <div
                    className="pf-progress-bar"
                    style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
                  />
                </div>

                {/* ── Step 0 ── */}
                {step === 0 && (
                  <>
                    <div className="pf-card-head">
                      <span className="pf-card-step-tag">Step 1 of 3</span>
                      <h2 className="pf-card-title">Who are you?</h2>
                      <p className="pf-card-desc">
                        A photo and a few words go a long way.
                      </p>
                    </div>

                    <div className="pf-avatar-row">
                      <div className={`pf-avatar-wrap${hasImg ? " live" : ""}`}>
                        {hasImg ? (
                          <img
                            src={profile.profilePic}
                            alt="preview"
                            onError={() => setImgErr(true)}
                          />
                        ) : (
                          <span className="pf-avatar-empty">◎</span>
                        )}
                      </div>
                      <div className="pf-avatar-hint">
                        <strong>Profile photo</strong>
                        <p>
                          Paste a direct image URL to preview it here instantly.
                        </p>
                      </div>
                    </div>

                    <Field
                      label="Photo URL"
                      name="profilePic"
                      value={profile.profilePic}
                      onChange={handleChange}
                    />
                    <Field
                      label="Bio"
                      name="bio"
                      value={profile.bio}
                      onChange={handleChange}
                      textarea
                      hint="What makes you, you?"
                    />
                    <div className="pf-row">
                      <Field
                        label="Age"
                        name="age"
                        type="number"
                        value={profile.age}
                        onChange={handleChange}
                      />
                      <Field
                        label="City"
                        name="location"
                        value={profile.location}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="pf-nav">
                      <button
                        className="pf-btn-next full"
                        onClick={() => go(1)}
                      >
                        Continue <span>→</span>
                      </button>
                    </div>
                  </>
                )}

                {/* ── Step 1 ── */}
                {step === 1 && (
                  <>
                    <div className="pf-card-head">
                      <span className="pf-card-step-tag">Step 2 of 3</span>
                      <h2 className="pf-card-title">What lights you up?</h2>
                      <p className="pf-card-desc">
                        Separate each item with a comma — watch the tags appear.
                      </p>
                    </div>

                    <TagField
                      label="Interests"
                      name="interest"
                      value={profile.interest}
                      onChange={handleChange}
                      accent
                    />
                    <TagField
                      label="Skills"
                      name="skills"
                      value={profile.skills}
                      onChange={handleChange}
                    />

                    <div className="pf-nav">
                      <button className="pf-btn-back" onClick={() => go(0)}>
                        ← Back
                      </button>
                      <button className="pf-btn-next" onClick={() => go(2)}>
                        Continue →
                      </button>
                    </div>
                  </>
                )}

                {/* ── Step 2 ── */}
                {step === 2 && (
                  <>
                    <div className="pf-card-head">
                      <span className="pf-card-step-tag">Step 3 of 3</span>
                      <h2 className="pf-card-title">Your journey so far</h2>
                      <p className="pf-card-desc">
                        Where you've been shapes who you are.
                      </p>
                    </div>

                    <TagField
                      label="Experience"
                      name="experience"
                      value={profile.experience}
                      onChange={handleChange}
                    />
                    <TagField
                      label="Education"
                      name="education"
                      value={profile.education}
                      onChange={handleChange}
                      accent
                    />

                    <div className="pf-nav">
                      <button className="pf-btn-back" onClick={() => go(1)}>
                        ← Back
                      </button>
                      <button className="pf-btn-next" onClick={submit}>
                        Finish ✦
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
