import { useState, useEffect, useRef } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const sections = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    icon: "§1",
    content: [
      {
        type: "paragraph",
        text: "By accessing or using our platform, you confirm that you are at least 18 years of age, have read and understood these Terms, and agree to be legally bound by them. If you do not agree, you must discontinue use immediately.",
      },
      {
        type: "paragraph",
        text: "These Terms constitute a legally binding agreement between you and the Company. Your continued use of the platform following any modifications constitutes acceptance of the revised Terms.",
      },
    ],
  },
  {
    id: "eligibility",
    title: "Eligibility",
    icon: "§2",
    content: [
      {
        type: "paragraph",
        text: "To use our services, you must be 18 years of age or older, legally capable of entering into a binding contract, and not prohibited from using the service under applicable law.",
      },
      {
        type: "list",
        heading: "You are not eligible if you:",
        items: [
          "Have been previously removed from the platform",
          "Are a convicted sex offender",
          "Are acting on behalf of a competitor",
          "Are using the platform for commercial solicitation",
        ],
      },
    ],
  },
  {
    id: "account",
    title: "Account Responsibilities",
    icon: "§3",
    content: [
      {
        type: "paragraph",
        text: "You are solely responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account. You agree to notify us immediately of any unauthorized access.",
      },
      {
        type: "list",
        heading: "You agree to:",
        items: [
          "Provide accurate, complete, and current information",
          "Keep your profile photo as a true likeness of yourself",
          "Not share your account with any third party",
          "Use one account per person only",
        ],
      },
    ],
  },
  {
    id: "conduct",
    title: "User Conduct",
    icon: "§4",
    content: [
      {
        type: "paragraph",
        text: "We are committed to maintaining a respectful and safe community. Any behavior that harms, harasses, or deceives other members will result in immediate suspension or permanent termination of your account.",
      },
      {
        type: "list",
        heading: "Strictly prohibited activities include:",
        items: [
          "Harassment, abuse, or threatening behavior toward other users",
          "Posting false, misleading, or deceptive content",
          "Soliciting money, gifts, or financial information",
          "Distributing spam, malware, or unsolicited communications",
          "Impersonating any person or entity",
          "Scraping or harvesting user data without consent",
        ],
      },
    ],
  },
  {
    id: "content",
    title: "Content & Intellectual Property",
    icon: "§5",
    content: [
      {
        type: "paragraph",
        text: "You retain ownership of the content you submit, but by posting it, you grant us a non-exclusive, royalty-free, worldwide license to use, display, reproduce, and distribute that content solely in connection with operating the platform.",
      },
      {
        type: "paragraph",
        text: "All platform design, software, trademarks, and proprietary content are owned exclusively by the Company and may not be reproduced without prior written consent.",
      },
    ],
  },
  {
    id: "privacy",
    title: "Privacy & Data",
    icon: "§6",
    content: [
      {
        type: "paragraph",
        text: "Your privacy matters deeply to us. Our Privacy Policy, incorporated herein by reference, describes how we collect, use, and protect your personal data. By using the platform, you consent to those practices.",
      },
      {
        type: "paragraph",
        text: "We implement industry-standard security measures, but no system is entirely impenetrable. You acknowledge that you provide data at your own risk and agree to notify us of any suspected breach.",
      },
    ],
  },
  {
    id: "subscription",
    title: "Subscriptions & Payments",
    icon: "§7",
    content: [
      {
        type: "paragraph",
        text: "Certain features require a paid subscription. All fees are stated in the applicable currency, are non-refundable except as required by law, and auto-renew unless cancelled before the renewal date.",
      },
      {
        type: "list",
        heading: "Billing terms:",
        items: [
          "Subscriptions renew automatically at the end of each billing period",
          "You may cancel anytime from your account settings",
          "Refunds are not provided for partial billing periods",
          "We reserve the right to adjust pricing with 30 days notice",
        ],
      },
    ],
  },
  {
    id: "termination",
    title: "Termination",
    icon: "§8",
    content: [
      {
        type: "paragraph",
        text: "We reserve the right to suspend or permanently terminate your account at our sole discretion, with or without notice, for conduct that we believe violates these Terms or is harmful to other users, the Company, or third parties.",
      },
      {
        type: "paragraph",
        text: "Upon termination, your right to use the platform ceases immediately. Provisions that by their nature should survive — including intellectual property, disclaimers, and limitations of liability — shall remain in full effect.",
      },
    ],
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    icon: "§9",
    content: [
      {
        type: "paragraph",
        text: "To the fullest extent permitted by law, the Company shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the platform.",
      },
      {
        type: "paragraph",
        text: "Our total liability to you for any claim arising from these Terms shall not exceed the greater of (a) the amount you paid us in the 12 months preceding the claim, or (b) $100 USD.",
      },
    ],
  },
  {
    id: "governing",
    title: "Governing Law",
    icon: "§10",
    content: [
      {
        type: "paragraph",
        text: "These Terms are governed by and construed in accordance with applicable law, without regard to conflict of law principles. Any disputes shall be resolved through binding arbitration, except where prohibited by law.",
      },
      {
        type: "paragraph",
        text: "You waive any right to participate in class-action lawsuits or class-wide arbitration. All claims must be brought in your individual capacity.",
      },
    ],
  },
];

// ─── useIsMobile ──────────────────────────────────────────────────────────────
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768,
  );
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return isMobile;
};

// ─── TOC ──────────────────────────────────────────────────────────────────────
const TableOfContents = ({ active, onSelect, onClose, isMobile }) => (
  <nav style={{ position: isMobile ? "static" : "sticky", top: 40 ,flexDirection:"column"}}>
    <p
      style={{
        fontSize: "10px",
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: "#9e8878",
        fontWeight: 500,
        marginBottom: "20px",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      Contents
    </p>
    {sections.map((s) => (
      <button
        key={s.id}
        onClick={() => {
          onSelect(s.id);
          onClose?.();
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          width: "100%",
          background: "none",
          border: "none",
          padding: "10px 0 10px 14px",
          cursor: "pointer",
          textAlign: "left",
          borderLeft: `2px solid ${active === s.id ? "#c9714a" : "transparent"}`,
          transition: "border-color 0.2s",
        }}
      >
        <span
          style={{
            fontSize: "10px",
            fontFamily: "'DM Sans', sans-serif",
            color: active === s.id ? "#c9714a" : "#c4b5a5",
            fontWeight: 500,
            letterSpacing: "0.06em",
            minWidth: "28px",
          }}
        >
          {s.icon}
        </span>
        <span
          style={{
            fontSize: "13px",
            fontFamily: "'DM Sans', sans-serif",
            color: active === s.id ? "#1a1a2e" : "#8a7a70",
            fontWeight: active === s.id ? 500 : 300,
            lineHeight: 1.3,
            transition: "color 0.2s",
          }}
        >
          {s.title}
        </span>
      </button>
    ))}
  </nav>
);

// ─── SectionBlock ─────────────────────────────────────────────────────────────
const SectionBlock = ({ section, isVisible, isMobile }) => (
  <div
    id={section.id}
    style={{
      marginBottom: isMobile ? "44px" : "64px",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(18px)",
      transition:
        "opacity 0.5s ease, transform 0.5s cubic-bezier(0.22,1,0.36,1)",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: "14px",
        marginBottom: "18px",
      }}
    >
      <span
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "13px",
          color: "#c9714a",
          fontWeight: 400,
          letterSpacing: "0.06em",
          flexShrink: 0,
        }}
      >
        {section.icon}
      </span>
      <h2
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: isMobile ? "22px" : "28px",
          fontWeight: 400,
          color: "#1a1a2e",
          letterSpacing: "-0.01em",
          lineHeight: 1.2,
        }}
      >
        {section.title}
      </h2>
    </div>

    <div
      style={ {
        borderLeft: "1px solid #ede5dc",
        paddingLeft: isMobile ? "16px" : "32px",
      }}
    >
      {section.content.map((block, i) => {
        if (block.type === "paragraph")
          return (
            <p
              key={i}
              style={{
                fontSize: isMobile ? "14px" : "15px",
                lineHeight: 1.85,
                color: "#5a4f48",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                marginBottom: "14px",
              }}
            >
              {block.text}
            </p>
          );
        if (block.type === "list")
          return (
            <div key={i} style={{ marginBottom: "14px" }}>
              <p
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#9e8878",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                  marginBottom: "12px",
                }}
              >
                {block.heading}
              </p>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                      fontSize: isMobile ? "13.5px" : "14.5px",
                      color: "#5a4f48",
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 300,
                      lineHeight: 1.7,
                      marginBottom: "10px",
                    }}
                  >
                    <span
                      style={{
                        color: "#c9714a",
                        marginTop: "7px",
                        fontSize: "5px",
                        flexShrink: 0,
                      }}
                    >
                      ◆
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        return null;
      })}
    </div>
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
const TermsAndConditions = () => {
  const [activeSection, setActiveSection] = useState("acceptance");
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [accepted, setAccepted] = useState(false);
  const [done, setDone] = useState(false);
  const [pageVisible, setPageVisible] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const observerRef = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const t = setTimeout(() => setPageVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, e.target.id]));
            setActiveSection(e.target.id);
          }
        });
      },
      { threshold: 0.1, rootMargin: "-60px 0px -40% 0px" },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observerRef.current.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

  const scrollTo = (id) =>
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        .tp-root {
          min-height: 100vh;
          background-color: #faf7f4;
          background-image:
            radial-gradient(ellipse 70% 40% at 100% 0%, rgba(201,113,74,0.06) 0%, transparent 65%),
            radial-gradient(ellipse 50% 50% at 0% 100%, rgba(139,90,60,0.05) 0%, transparent 60%);
          font-family: 'DM Sans', sans-serif;
          color: #1a1a2e;
        }

        /* fade-in */
        .tp-fade { opacity: 0; transform: translateY(16px); transition: opacity 0.65s ease, transform 0.65s cubic-bezier(0.22,1,0.36,1); }
        .tp-fade.in { opacity: 1; transform: translateY(0); }
        .d0 { transition-delay: 0ms; }
        .d1 { transition-delay: 130ms; }
        .d2 { transition-delay: 230ms; }

        /* header */
        .tp-header {
          border-bottom: 1px solid rgba(196,181,165,0.3);
          padding: 32px 48px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }

        /* intro */
        .tp-intro { max-width: 1100px; margin: 0 auto; padding: 0 48px; }

        /* layout */
        .tp-layout { display: flex; max-width: 1100px; margin: 0 auto; padding: 0 48px; gap: 72px; }
        .tp-sidebar { width: 210px; flex-shrink: 0; padding: 48px 0; }
        .tp-content { flex: 1; padding: 56px 0 140px; min-width: 0; }

        /* accept bar */
        .tp-accept {
          position: sticky; bottom: 0; z-index: 10;
          background: rgba(250,247,244,0.94);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-top: 1px solid rgba(196,181,165,0.35);
          padding: 16px 48px;
          display: flex; align-items: center;
          justify-content: space-between; gap: 20px;
        }

        /* accept btn */
        .tp-btn {
          padding: 13px 28px; background: #1a1a2e; color: #faf7f4;
          border: none; border-radius: 2px;
          font-family: 'DM Sans', sans-serif; font-size: 11px;
          letter-spacing: 0.16em; text-transform: uppercase; font-weight: 500;
          cursor: pointer; white-space: nowrap; flex-shrink: 0;
          transition: background 0.25s, transform 0.15s;
        }
        .tp-btn:hover:not(:disabled) { background: #c9714a; transform: translateY(-1px); }
        .tp-btn:disabled { background: #d4c9c1; cursor: not-allowed; transform: none; }
        .tp-btn.done { background: #4a7c59; }

        /* version chip */
        .tp-chip {
          display: inline-flex; align-items: center;
          padding: 5px 12px;
          background: rgba(201,113,74,0.08);
          border: 1px solid rgba(201,113,74,0.2);
          border-radius: 20px; font-size: 11px; color: #c9714a;
          letter-spacing: 0.08em; font-weight: 500;
          font-family: 'DM Sans', sans-serif;
        }

        /* mobile jump btn */
        .tp-jump {
          display: flex; align-items: center; gap: 8px;
          padding: 9px 16px; background: #fff;
          border: 1px solid rgba(196,181,165,0.4); border-radius: 20px;
          font-family: 'DM Sans', sans-serif; font-size: 12px;
          font-weight: 500; color: #1a1a2e; letter-spacing: 0.05em;
          cursor: pointer; box-shadow: 0 2px 10px rgba(0,0,0,0.06);
        }

        /* drawer overlay */
        .tp-overlay {
          position: fixed; inset: 0;
          background: rgba(26,26,46,0.45);
          backdrop-filter: blur(4px); z-index: 50;
          animation: tpFadeO 0.2s ease forwards;
        }
        @keyframes tpFadeO { from { opacity:0 } to { opacity:1 } }

        /* drawer */
        .tp-drawer {
          position: fixed; bottom: 0; left: 0; right: 0;
          background: #faf7f4; border-radius: 16px 16px 0 0;
          padding: 28px 24px 44px; z-index: 51;
          max-height: 78vh; overflow-y: auto;
          animation: tpSlideUp 0.3s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        @keyframes tpSlideUp { from { transform: translateY(100%) } to { transform: translateY(0) } }
        .tp-handle { width: 36px; height: 4px; background: #d4c9c1; border-radius: 2px; margin: 0 auto 24px; }

        /* ── Tablet (768–1023px) ── */
        @media (min-width: 768px) and (max-width: 1023px) {
          .tp-header  { padding: 28px 32px; }
          .tp-intro   { padding: 0 32px; }
          .tp-layout  { padding: 0 32px; gap: 40px; }
          .tp-sidebar { width: 170px; }
          .tp-accept  { padding: 16px 32px; }
        }

        /* ── Mobile (<768px) ── */
        @media (max-width: 767px) {
          .tp-header  { padding: 22px 20px; align-items: flex-start; }
          .tp-intro   { padding: 0 20px; }
          .tp-layout  { padding: 0 20px; gap: 0; }
          .tp-sidebar { display: none; }
          .tp-content { padding: 28px 0 140px; }
          .tp-accept  {
            padding: 14px 16px;
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
          }
          .tp-btn { width: 100%; text-align: center; padding: 15px 20px; }
          .tp-accept-label { font-size: 12px !important; }
        }
      `}</style>

      <div className="tp-root">
        {/* Header */}
        <div className={`tp-header tp-fade d0 ${pageVisible ? "in" : ""}`}>
          <div>
            <p
              style={{
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#c9714a",
                fontWeight: 500,
                marginBottom: "10px",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Legal
            </p>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(30px, 5vw, 56px)",
                fontWeight: 300,
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
              }}
            >
              Terms &amp;{" "}
              <em style={{ fontStyle: "italic", color: "#c9714a" }}>
                Conditions
              </em>
            </h1>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "8px",
            }}
          >
            <span className="tp-chip">Version 2.4</span>
            <p
              style={{
                fontSize: "12px",
                color: "#9e8878",
                fontWeight: 300,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Effective: January 1, 2026
            </p>
          </div>
        </div>

        {/* Intro banner */}
        <div className={`tp-intro tp-fade d1 ${pageVisible ? "in" : ""}`}>
          <div
            style={{
              margin: "24px 0 0",
              padding: "18px 22px",
              background: "rgba(201,113,74,0.05)",
              borderLeft: "3px solid #c9714a",
              borderRadius: "0 2px 2px 0",
            }}
          >
            <p
              style={{
                fontSize: "14px",
                lineHeight: 1.8,
                color: "#5a4f48",
                fontWeight: 300,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <strong style={{ fontWeight: 500, color: "#1a1a2e" }}>
                Please read these terms carefully.
              </strong>{" "}
              This agreement governs your use of our platform. By creating an
              account, you acknowledge that you have read, understood, and agree
              to be bound by all of the following terms.
            </p>
          </div>
        </div>

        {/* Mobile: Jump to section */}
        {isMobile && (
          <div
            style={{
              padding: "16px 20px 0",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button className="tp-jump" onClick={() => setTocOpen(true)}>
              <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
                <rect y="0" width="14" height="1.6" rx="0.8" fill="#c9714a" />
                <rect y="5" width="10" height="1.6" rx="0.8" fill="#c9714a" />
                <rect y="10" width="12" height="1.6" rx="0.8" fill="#c9714a" />
              </svg>
              Jump to section
            </button>
          </div>
        )}

        {/* Layout */}
        <div className={`tp-layout tp-fade d2 ${pageVisible ? "in" : ""}`}>
          <div className="tp-sidebar">
            <TableOfContents
              active={activeSection}
              onSelect={scrollTo}
              isMobile={false}
            />
          </div>

          <div className="tp-content">
            {sections.map((s) => (
              <SectionBlock
                key={s.id}
                section={s}
                isVisible={visibleSections.has(s.id)}
                isMobile={isMobile}
              />
            ))}

            <div
              style={{
                borderTop: "1px solid #ede5dc",
                paddingTop: "28px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              <p
                style={{
                  fontSize: "12px",
                  color: "#b0a09a",
                  fontWeight: 300,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Last updated: January 1, 2026 &nbsp;·&nbsp; Questions?{" "}
                <a
                  href="/contact"
                  style={{ color: "#c9714a", textDecoration: "none" }}
                >
                  Contact us
                </a>
              </p>
              <p
                style={{
                  fontSize: "12px",
                  color: "#b0a09a",
                  fontWeight: 300,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                © 2026 Your Company, Inc.
              </p>
            </div>
          </div>
        </div>

        {/* Accept bar */}
        <div className="tp-accept">
          <label
            onClick={() => !done && setAccepted((a) => !a)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "13px",
              cursor: done ? "default" : "pointer",
            }}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                flexShrink: 0,
                borderRadius: "2px",
                border: `1.5px solid ${accepted ? "#1a1a2e" : "#c4b5a5"}`,
                background: accepted ? "#1a1a2e" : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
              }}
            >
              {accepted && (
                <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                  <path
                    d="M1 4L4 7.5L10 1"
                    stroke="#faf7f4"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <span
              className="tp-accept-label"
              style={{
                fontSize: "13px",
                color: "#5a4f48",
                fontWeight: 300,
                lineHeight: 1.5,
                userSelect: "none",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              I have read and agree to the Terms &amp; Conditions
            </span>
          </label>

          <button
            className={`tp-btn ${done ? "done" : ""}`}
            disabled={!accepted || done}
            onClick={() => setDone(true)}
          >
            {done ? "✓ Accepted" : "Accept Terms"}
          </button>
        </div>

        {/* Mobile TOC drawer */}
        {tocOpen && (
          <>
            <div className="tp-overlay" onClick={() => setTocOpen(false)} />
            <div className="tp-drawer">
              <div className="tp-handle" />
              <TableOfContents
                active={activeSection}
                onSelect={scrollTo}
                onClose={() => setTocOpen(false)}
                isMobile={true}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default TermsAndConditions;
