import { useState, useEffect } from "react";

const FloatingLabel = ({ label, type = "text", name, textarea = false }) => {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);

  const handleChange = (e) => setFilled(e.target.value.length > 0);

  const sharedProps = {
    name,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    onChange: handleChange,
    style: {
      width: "100%",
      background: "transparent",
      border: "none",
      outline: "none",
      paddingTop: "22px",
      paddingBottom: "8px",
      paddingLeft: "0",
      paddingRight: "0",
      fontSize: "15px",
      color: "#1a1a2e",
      fontFamily: "'Cormorant Garamond', serif",
      resize: "none",
    },
  };

  return (
    <div
      style={{
        position: "relative",
        borderBottom: `1.5px solid ${focused ? "#c9714a" : "#c4b5a5"}`,
        marginBottom: "36px",
        transition: "border-color 0.3s",
        paddingBottom: "2px",
      }}
    >
      <label
        style={{
          position: "absolute",
          top: focused || filled ? "0px" : "22px",
          fontSize: focused || filled ? "11px" : "15px",
          color: focused ? "#c9714a" : "#9e8878",
          transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
          pointerEvents: "none",
          letterSpacing: focused || filled ? "0.12em" : "0.04em",
          textTransform: "uppercase",
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: "500",
        }}
      >
        {label}
      </label>
      {textarea ? (
        <textarea rows={4} {...sharedProps} />
      ) : (
        <input type={type} {...sharedProps} />
      )}
    </div>
  );
};

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("message");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const tabs = [
    { id: "message", label: "Send a Message" },
    { id: "report", label: "Report an Issue" },
    { id: "feedback", label: "Share Feedback" },
  ];

  const infoCards = [
    {
      icon: "✦",
      title: "Response Time",
      body: "We reply to every message within 24 hours, usually sooner.",
    },
    {
      icon: "◈",
      title: "Safety & Trust",
      body: "For urgent safety concerns, we prioritize your report immediately.",
    },
    {
      icon: "❋",
      title: "Community",
      body: "Your feedback shapes how we grow. Every word is read by a human.",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .contact-page {
          min-height: 100vh;
          background-color: #faf7f4;
          background-image:
            radial-gradient(ellipse 80% 60% at 20% 0%, rgba(201,113,74,0.07) 0%, transparent 70%),
            radial-gradient(ellipse 60% 50% at 90% 100%, rgba(139,90,60,0.06) 0%, transparent 65%);
          font-family: 'DM Sans', sans-serif;
          color: #1a1a2e;
          overflow-x: hidden;
        }

        .page-enter {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1);
        }
        .page-enter.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .stagger-1 { transition-delay: 0ms; }
        .stagger-2 { transition-delay: 100ms; }
        .stagger-3 { transition-delay: 200ms; }
        .stagger-4 { transition-delay: 320ms; }

        .hero-section {
          padding: 80px 48px 56px;
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }

        @media (max-width: 768px) {
          .hero-section {
            grid-template-columns: 1fr;
            padding: 56px 24px 40px;
            gap: 48px;
          }
        }

        .eyebrow {
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #c9714a;
          font-weight: 500;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .eyebrow::after {
          content: '';
          flex: 1;
          max-width: 40px;
          height: 1px;
          background: #c9714a;
          opacity: 0.5;
        }

        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(48px, 6vw, 72px);
          font-weight: 300;
          line-height: 1.08;
          color: #1a1a2e;
          margin-bottom: 24px;
          letter-spacing: -0.01em;
        }

        .hero-title em {
          font-style: italic;
          color: #c9714a;
        }

        .hero-body {
          font-size: 15px;
          line-height: 1.8;
          color: #6b5f56;
          max-width: 340px;
          font-weight: 300;
        }

        .info-cards {
          margin-top: 48px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .info-card {
          display: flex;
          gap: 18px;
          align-items: flex-start;
          padding: 20px 24px;
          background: rgba(255,255,255,0.65);
          border: 1px solid rgba(196,181,165,0.3);
          border-radius: 2px;
          backdrop-filter: blur(8px);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .info-card:hover {
          transform: translateX(4px);
          box-shadow: -3px 0 0 #c9714a, 4px 4px 20px rgba(0,0,0,0.06);
        }

        .info-icon {
          font-size: 18px;
          color: #c9714a;
          margin-top: 2px;
          flex-shrink: 0;
        }

        .info-card-title {
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 500;
          color: #1a1a2e;
          margin-bottom: 5px;
        }

        .info-card-body {
          font-size: 13.5px;
          color: #7a6a60;
          line-height: 1.65;
          font-weight: 300;
        }

        .form-panel {
          background: #ffffff;
          border: 1px solid rgba(196,181,165,0.25);
          border-radius: 3px;
          padding: 48px 44px;
          box-shadow: 0 2px 40px rgba(0,0,0,0.05), 0 20px 60px rgba(201,113,74,0.04);
          position: sticky;
          top: 40px;
        }

        @media (max-width: 768px) {
          .form-panel {
            padding: 32px 24px;
            position: static;
          }
        }

        .tab-row {
          display: flex;
          gap: 0;
          margin-bottom: 40px;
          border-bottom: 1px solid #ede5dc;
        }

        .tab-btn {
          background: none;
          border: none;
          padding: 10px 0;
          margin-right: 24px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.2s;
          position: relative;
          color: #a08878;
        }

        .tab-btn.active {
          color: #1a1a2e;
        }

        .tab-btn.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 1.5px;
          background: #c9714a;
        }

        .submit-btn {
          width: 100%;
          padding: 16px;
          background: #1a1a2e;
          color: #faf7f4;
          border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.3s ease, transform 0.15s ease;
          margin-top: 8px;
        }
        .submit-btn:hover {
          background: #c9714a;
          transform: translateY(-1px);
        }
        .submit-btn:active {
          transform: translateY(0);
        }

        .success-state {
          text-align: center;
          padding: 40px 0;
        }

        .success-icon {
          font-size: 40px;
          margin-bottom: 20px;
          display: block;
          animation: bloom 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        @keyframes bloom {
          from { transform: scale(0.4); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }

        .success-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px;
          font-weight: 300;
          color: #1a1a2e;
          margin-bottom: 12px;
          font-style: italic;
        }

        .success-body {
          font-size: 14px;
          color: #7a6a60;
          line-height: 1.7;
        }

        .divider-line {
          width: 40px;
          height: 1px;
          background: #c9714a;
          margin: 20px auto;
        }
      `}</style>

      <div className="contact-page">
        <div className={`hero-section page-enter ${visible ? "visible" : ""}`}>
          {/* Left column */}
          <div>
            <div className={`page-enter stagger-1 ${visible ? "visible" : ""}`}>
              <p className="eyebrow">Get in touch</p>
              <h1 className="hero-title">
                We're here
                <br />
                when you <em>need us</em>
              </h1>
              <p className="hero-body">
                Whether you have a question, a concern, or just want to share
                your story — our team reads every single message.
              </p>
            </div>

            <div
              className={`info-cards page-enter stagger-3 ${visible ? "visible" : ""}`}
            >
              {infoCards.map((card) => (
                <div key={card.title} className="info-card">
                  <span className="info-icon">{card.icon}</span>
                  <div>
                    <p className="info-card-title">{card.title}</p>
                    <p className="info-card-body">{card.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — form */}
          <div className={`page-enter stagger-4 ${visible ? "visible" : ""}`}>
            <div className="form-panel">
              {submitted ? (
                <div className="success-state">
                  <span className="success-icon">❋</span>
                  <p className="success-title">Message received</p>
                  <div className="divider-line" />
                  <p className="success-body">
                    Thank you for reaching out. We'll get back to you within 24
                    hours.
                  </p>
                </div>
              ) : (
                <>
                  <div className="tab-row">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
                        onClick={() => setActiveTab(tab.id)}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <form onSubmit={handleSubmit}>
                    <FloatingLabel label="Full Name" name="name" />
                    <FloatingLabel
                      label="Email Address"
                      type="email"
                      name="email"
                    />

                    {activeTab === "report" && (
                      <FloatingLabel
                        label="Profile or Username in Question"
                        name="reported_user"
                      />
                    )}

                    {activeTab === "feedback" && (
                      <FloatingLabel label="Feature or Area" name="feature" />
                    )}

                    <FloatingLabel
                      label={
                        activeTab === "message"
                          ? "Your Message"
                          : activeTab === "report"
                            ? "Describe the Issue"
                            : "Your Feedback"
                      }
                      name="body"
                      textarea
                    />

                    <button type="submit" className="submit-btn">
                      Send &nbsp;→
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
