'use client'

import { useEffect, useRef } from 'react'
import './about.css'

// ── Animated Counter ──────────────────────────────────────────────────────────
function useCounterAnimation(ref: React.RefObject<HTMLSpanElement | null>, target: number) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start: number | null = null
          const step = (ts: number) => {
            if (!start) start = ts
            const p = Math.min((ts - start) / 2000, 1)
            const eased = 1 - Math.pow(1 - p, 3)
            el.textContent = Math.floor(eased * target).toLocaleString()
            if (p < 1) requestAnimationFrame(step)
            else el.textContent = target.toLocaleString()
          }
          requestAnimationFrame(step)
          obs.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref, target])
}

export default function AboutPage() {
  const cnt1 = useRef<HTMLSpanElement>(null)
  const cnt2 = useRef<HTMLSpanElement>(null)
  const cnt3 = useRef<HTMLSpanElement>(null)
  const cnt4 = useRef<HTMLSpanElement>(null)

  useCounterAnimation(cnt1, 48200)
  useCounterAnimation(cnt2, 12900)
  useCounterAnimation(cnt3, 190)
  useCounterAnimation(cnt4, 99)

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════════ */}
      <section className="about-hero">
        <div className="about-hero-pattern">
          <svg viewBox="0 0 700 900" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="about-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#8C1F28" strokeWidth="0.8"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#about-grid)"/>
            <circle cx="350" cy="450" r="300" fill="none" stroke="#8C1F28" strokeWidth="1"/>
            <circle cx="350" cy="450" r="210" fill="none" stroke="#8C1F28" strokeWidth="1"/>
            <circle cx="350" cy="450" r="120" fill="none" stroke="#8C1F28" strokeWidth="1"/>
            <circle cx="350" cy="450" r="50"  fill="none" stroke="#8C1F28" strokeWidth="1"/>
          </svg>
        </div>

        <div className="about-hero-inner">
          {/* Left */}
          <div className="about-hero-left reveal">
            <div className="about-hero-badge">
              <span className="tag">Our Story</span>
            </div>
            <h1 className="about-hero-title">
              Born from<br/>
              <em>Urgency &amp;</em>
              <em style={{ color: 'var(--ink)', fontStyle: 'normal', fontSize: '0.72em', fontWeight: 300 }}>
                Compassion
              </em>
            </h1>
            <p className="about-hero-desc">
              Blood Circle was founded when a desperate search for blood in the middle of the night
              changed everything. That moment of helplessness became our mission: <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>no one should
              ever search in vain for blood.</strong>
            </p>
            <div className="about-hero-meta">
              <div className="ahm-item">
                <div className="ahm-num">2026<span>.</span></div>
                <div className="ahm-label">Founded</div>
              </div>
              <div className="ahm-item">
                <div className="ahm-num">48<span>K+</span></div>
                <div className="ahm-label">Donors</div>
              </div>
              <div className="ahm-item">
                <div className="ahm-num">60<span>+</span></div>
                <div className="ahm-label">Cities</div>
              </div>
            </div>
          </div>

          {/* Right — Visual Card */}
          <div className="about-hero-right reveal">
            <div className="about-visual">
              {/* Main Card */}
              <div className="av-main-card">
                <div className="av-card-top">
                  <div className="av-card-label">Our Foundation</div>
                  <div className="av-card-title">Built on the belief that every life is worth saving.</div>
                  <div className="av-card-year">2026</div>
                </div>
                <div className="av-card-body">
                  <div className="av-row">
                    <span className="av-row-key">Headquarters</span>
                    <span className="av-row-val">Dhaka, Bangladesh</span>
                  </div>
                  <div className="av-row">
                    <span className="av-row-key">Team Size</span>
                    <span className="av-row-val">48 people</span>
                  </div>
                  <div className="av-row">
                    <span className="av-row-key">Network</span>
                    <span className="av-row-val crimson">60+ cities</span>
                  </div>
                  <div className="av-row">
                    <span className="av-row-key">Avg Response</span>
                    <span className="av-row-val crimson">&lt; 12 minutes</span>
                  </div>
                </div>
              </div>

              {/* Float A */}
              <div className="av-float-a">
                <div className="av-float-label">Lives Saved</div>
                <div className="av-float-val">12,900<span style={{ color: 'var(--crimson)', fontSize: '18px' }}>+</span></div>
                <div className="av-float-sub">and counting</div>
              </div>

              {/* Float B */}
              <div className="av-float-b">
                <div className="av-float-label" style={{ display: 'flex', alignItems: 'center' }}>
                  <span className="av-float-dot"></span> Status
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '16px', fontWeight: 600, color: 'var(--ink)' }}>
                  Live Network
                </div>
                <div className="av-float-sub">Active 24 / 7</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          MISSION STRIP
      ════════════════════════════════════════════════════════════════ */}
      <div className="mission-strip">
        <div className="mission-strip-inner">
          {/* Mission */}
          <div className="ms-item reveal">
            <div className="ms-icon">
              <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2C6.69 2 4 4.69 4 8c0 4.42 6 10 6 10s6-5.58 6-10c0-3.31-2.69-6-6-6z"
                  stroke="#8C1F28" strokeWidth="1.4" strokeLinejoin="round"/>
                <circle cx="10" cy="8" r="2" stroke="#8C1F28" strokeWidth="1.4"/>
              </svg>
            </div>
            <div className="ms-title">Our Mission</div>
            <div className="ms-desc">
              To create a world where no patient waits more than an hour for compatible blood,
              anywhere across the country.
            </div>
          </div>

          <div className="ms-divider"></div>

          {/* Vision */}
          <div className="ms-item reveal">
            <div className="ms-icon">
              <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="7.5" stroke="#8C1F28" strokeWidth="1.4"/>
                <circle cx="10" cy="10" r="3" stroke="#8C1F28" strokeWidth="1.4"/>
                <path d="M10 2v2M10 16v2M2 10h2M16 10h2" stroke="#8C1F28" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="ms-title">Our Vision</div>
            <div className="ms-desc">
              A fully connected, real-time blood donation ecosystem that spans every district,
              hospital, and household.
            </div>
          </div>

          <div className="ms-divider"></div>

          {/* Promise */}
          <div className="ms-item reveal">
            <div className="ms-icon">
              <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 6l-8 8-4-4" stroke="#8C1F28" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="ms-title">Our Promise</div>
            <div className="ms-desc">
              Every donor is verified. Every recipient is protected. Every request is treated with
              the urgency it deserves.
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          OUR STORY
      ════════════════════════════════════════════════════════════════ */}
      <section className="story-section">
        <div className="container">
          <div className="story-grid">
            {/* Left — narrative */}
            <div className="story-left reveal">
              <div className="section-header" style={{ marginBottom: 36 }}>
                <span className="tag">The Beginning</span>
                <h2 className="section-title">How Blood<em>Circle</em><br/>Came to Be</h2>
              </div>

              <p className="story-lead">
                "Someone needed O− blood. It was 2 a.m. We called hospital after hospital. Nobody had it."
              </p>
              <p className="story-body">
                That moment of desperation never left <strong>Rakibul Hasan Rakib</strong>, our founder.
                After witnessing a family's frantic search for blood with no system to help them,
                Rakib partnered with <strong>Atiqur Rahman Jibon</strong> and spent the next year
                building what should have already existed: a dedicated, verified, real-time network of
                blood donors — accessible to anyone, at any hour.
              </p>
              <p className="story-body">
                Blood Circle launched in August 2026 with a clear goal: make blood donation as
                simple and reliable as calling an ambulance. What started as a bold idea between two
                friends is now a <strong>growing network of verified donors</strong> united by a
                single belief — a stranger's life is worth your time.
              </p>
              <p className="story-body">
                Every feature, every policy, every design decision is made with one question in mind:
                would this help a family at 2 a.m.?
              </p>

              <div className="story-signature">
                <div className="story-sig-avatar">R</div>
                <div>
                  <div className="story-sig-name">Rakibul Hasan Rakib</div>
                  <div className="story-sig-role">Founder &amp; CEO, Blood Circle</div>
                </div>
              </div>
            </div>

            {/* Right — timeline */}
            <div className="story-right reveal">
              <div className="story-timeline">
                <div className="tl-item">
                  <div className="tl-dot"></div>
                  <div className="tl-year">Early 2026</div>
                  <div className="tl-title">The Idea Takes Shape</div>
                  <div className="tl-desc">
                    Rakibul Hasan Rakib and Atiqur Rahman Jibon begin building Blood Circle after
                    witnessing the catastrophic gaps in the blood donor network firsthand.
                  </div>
                </div>
                <div className="tl-item">
                  <div className="tl-dot"></div>
                  <div className="tl-year">August 2026</div>
                  <div className="tl-title">Blood Circle Officially Launches</div>
                  <div className="tl-desc">
                    The platform goes live with an initial network of verified donors, a
                    real-time matching system, and a mission to leave no patient without blood.
                  </div>
                </div>
                <div className="tl-item">
                  <div className="tl-dot"></div>
                  <div className="tl-year">Late 2026</div>
                  <div className="tl-title">First Hospital Partnerships</div>
                  <div className="tl-desc">
                    Leading hospitals begin integrating Blood Circle into their emergency request
                    workflows, marking our first institutional partnerships.
                  </div>
                </div>
                <div className="tl-item">
                  <div className="tl-dot"></div>
                  <div className="tl-year">2027</div>
                  <div className="tl-title">National Expansion</div>
                  <div className="tl-desc">
                    Blood Circle expands to 100+ cities, establishing partnerships with NGOs and
                    healthcare institutions to co-organize monthly donor drives nationwide.
                  </div>
                </div>
                <div className="tl-item">
                  <div className="tl-dot"></div>
                  <div className="tl-year">Today · 2026</div>
                  <div className="tl-title">48,000+ Donors &amp; Growing</div>
                  <div className="tl-desc">
                    The network spans 190+ cities with over 48,000 verified donors, a sub-12-minute
                    average response time, and more than 12,900 lives saved.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          VALUES
      ════════════════════════════════════════════════════════════════ */}
      <section className="values-section">
        <div className="container">
          <div className="section-header reveal">
            <span className="tag">What We Stand For</span>
            <h2 className="section-title">Principles that<br/><em>Guide Us</em></h2>
            <p className="section-desc">
              Not guidelines on a wall — these are the filters every decision passes through.
            </p>
          </div>
          <div className="values-grid reveal">
            {[
              {
                icon: (
                  <path
                    d="M9 2C7.07 2 5.5 3.57 5.5 5.5 5.5 8.5 9 13 9 13s3.5-4.5 3.5-7.5C12.5 3.57 10.93 2 9 2z"
                    stroke="#8C1F28" strokeWidth="1.5" strokeLinejoin="round"
                  />
                ),
                title: 'Human First',
                desc: 'Every decision starts with the patient. The technology, the process, the design — all of it exists to serve people in their most vulnerable moments.',
              },
              {
                icon: (
                  <>
                    <path d="M9 1L2 4v5c0 3.87 2.97 7.5 7 8.5C13.03 16.5 16 12.87 16 9V4L9 1z"
                      stroke="#8C1F28" strokeWidth="1.4" strokeLinejoin="round"/>
                    <path d="M6 9l2 2 4-4" stroke="#8C1F28" strokeWidth="1.4"
                      strokeLinecap="round" strokeLinejoin="round"/>
                  </>
                ),
                title: 'Radical Trust',
                desc: 'Trust is earned through verification, not assumed. Every donor profile is manually reviewed. Every privacy boundary is strictly enforced.',
              },
              {
                icon: (
                  <>
                    <circle cx="9" cy="9" r="7.5" stroke="#8C1F28" strokeWidth="1.4"/>
                    <path d="M6 9l2 2 4-4" stroke="#8C1F28" strokeWidth="1.4"
                      strokeLinecap="round" strokeLinejoin="round"/>
                  </>
                ),
                title: 'Urgency as Default',
                desc: "When lives are on the line, 'we'll look into it' isn't an answer. Our infrastructure, our team, and our culture are built around responding at emergency speed.",
              },
              {
                icon: (
                  <>
                    <circle cx="9" cy="6" r="3" stroke="#8C1F28" strokeWidth="1.4"/>
                    <path d="M3 16c0-3.31 2.69-6 6-6s6 2.69 6 6"
                      stroke="#8C1F28" strokeWidth="1.4" strokeLinecap="round"/>
                  </>
                ),
                title: 'Community Over Platform',
                desc: 'Blood Circle is not an app. It is a community of people who believe a stranger\'s life is worth their time. We exist to nurture that belief.',
              },
              {
                icon: (
                  <>
                    <path d="M2 10h14M9 3v14" stroke="#8C1F28" strokeWidth="1.5"
                      strokeLinecap="round"/>
                  </>
                ),
                title: 'Zero Barriers',
                desc: 'Finding blood — or giving it — should never be blocked by cost, complexity, or geography. Our platform is free, simple, and built for everyone.',
              },
              {
                icon: (
                  <>
                    <path d="M15 9A6 6 0 1 1 3 9a6 6 0 0 1 12 0z"
                      stroke="#8C1F28" strokeWidth="1.4"/>
                    <path d="M9 6v3l2 2" stroke="#8C1F28" strokeWidth="1.4"
                      strokeLinecap="round"/>
                  </>
                ),
                title: 'Continuous Improvement',
                desc: 'Every missed connection is a lesson. We study our failures obsessively so the next family gets to us before the crisis does.',
              },
            ].map((v, i) => (
              <div key={i} className="value-card">
                <div className="value-num">0{i + 1}</div>
                <div className="value-icon">
                  <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {v.icon}
                  </svg>
                </div>
                <div className="value-title">{v.title}</div>
                <div className="value-desc">{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          TEAM
      ════════════════════════════════════════════════════════════════ */}
      <section className="team-section">
        <div className="container">
          <div className="section-header-row section-header reveal">
            <div>
              <span className="tag">The People</span>
              <h2 className="section-title">Who Keeps the<br/><em>Circle Moving</em></h2>
            </div>
            <p className="section-desc">
              A small, deeply committed team united by a single belief: blood donation should be
              as easy as making a phone call.
            </p>
          </div>
          <div className="team-grid reveal">
            {[
              {
                initial: 'R', bg: 'team-bg-1',
                name: 'Rakibul Hasan Rakib', role: 'Founder & CEO',
                bio: 'Visionary behind Blood Circle. Built the platform after witnessing a family\'s desperate search for blood. Speaks to donors personally every week.',
              },
              {
                initial: 'A', bg: 'team-bg-2',
                name: 'Atiqur Rahman Jibon', role: 'Co-Founder & COO',
                bio: 'Operational backbone of Blood Circle. Designed the verification protocol and hospital partnership framework from the ground up.',
              },
              {
                initial: 'A', bg: 'team-bg-3',
                name: 'Rakibul Hasan Rakib', role: 'Head of Technology',
                bio: 'Built the real-time matching algorithm that connects donors to recipients in under 12 minutes, around the clock.',
              },
              {
                initial: 'P', bg: 'team-bg-4',
                name: 'Mousumi Akter', role: 'Head of Community',
                bio: 'Manages our 48,000+ donor community with the care of a nurse and the skill of a seasoned community builder.',
              },
            ].map((member, i) => (
              <div key={i} className="team-card">
                <div className="team-card-top">
                  <div className={`team-bg ${member.bg}`}></div>
                  <div className="team-avatar">{member.initial}</div>
                </div>
                <div className="team-card-body">
                  <div className="team-name">{member.name}</div>
                  <div className="team-role">{member.role}</div>
                  <div className="team-bio">{member.bio}</div>
                  <div className="team-links">
                    <a href="#" className="team-link" aria-label="LinkedIn">
                      <svg viewBox="0 0 24 24">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                        <circle cx="4" cy="4" r="2"/>
                      </svg>
                    </a>
                    <a href="#" className="team-link" aria-label="Twitter">
                      <svg viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                    <a href="#" className="team-link" aria-label="Email">
                      <svg viewBox="0 0 24 24">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeWidth="1.5" stroke="currentColor" fill="none"/>
                        <polyline points="22,6 12,13 2,6" strokeWidth="1.5" stroke="currentColor" fill="none"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          IMPACT
      ════════════════════════════════════════════════════════════════ */}
      <section className="impact-section">
        <div className="impact-inner">
          <div className="impact-header reveal">
            <span className="tag">The Numbers</span>
            <h2 className="section-title">Impact that<em> Speaks</em></h2>
            <p className="section-desc">
              Real numbers. Real lives. Real urgency.
            </p>
          </div>
          <div className="impact-grid reveal">
            {[
              {
                icon: (
                  <path d="M7 13.5S1.5 9.5 1.5 5.5A3.5 3.5 0 018 3a3.5 3.5 0 016.5 2.5C14.5 9.5 8 13.5 8 13.5z"
                    stroke="#8C1F28" strokeWidth="1.4"/>
                ),
                ref: cnt1, target: 48200,
                suffix: '+', label: 'Verified Donors',
                sub: 'Across 190+ cities',
              },
              {
                icon: (
                  <>
                    <path d="M10 2C6.69 2 4 4.69 4 8c0 4.42 6 10 6 10s6-5.58 6-10c0-3.31-2.69-6-6-6z"
                      stroke="#8C1F28" strokeWidth="1.4" strokeLinejoin="round"/>
                    <circle cx="10" cy="8" r="2" stroke="#8C1F28" strokeWidth="1.4"/>
                  </>
                ),
                ref: cnt2, target: 12900,
                suffix: '+', label: 'Lives Saved',
                sub: 'Verified successful donations',
              },
              {
                icon: (
                  <path d="M10 2a8 8 0 1 0 0 16A8 8 0 0 0 10 2zm0 0v8l4 2"
                    stroke="#8C1F28" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                ),
                ref: cnt3, target: 12,
                suffix: ' min', label: 'Avg Response Time',
                sub: 'From request to matched donor',
              },
              {
                icon: (
                  <>
                    <path d="M9 1L2 4v5c0 3.87 2.97 7.5 7 8.5C13.03 16.5 16 12.87 16 9V4L9 1z"
                      stroke="#8C1F28" strokeWidth="1.4" strokeLinejoin="round"/>
                    <path d="M6 9l2 2 4-4" stroke="#8C1F28" strokeWidth="1.4"
                      strokeLinecap="round" strokeLinejoin="round"/>
                  </>
                ),
                ref: cnt4, target: 99,
                suffix: '%', label: 'Verified Profiles',
                sub: 'Manual ID review for every donor',
              },
            ].map((item, i) => (
              <div key={i} className="impact-card">
                <div className="impact-icon">
                  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {item.icon}
                  </svg>
                </div>
                <div className="impact-num">
                  <span ref={item.ref}>0</span>
                  <span>{item.suffix}</span>
                </div>
                <div className="impact-label">{item.label}</div>
                <div className="impact-sub">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          PARTNERS
      ════════════════════════════════════════════════════════════════ */}
      <section className="partners-section">
        <div className="partners-inner">
          <div className="section-header reveal">
            <span className="tag">Our Partners</span>
            <h2 className="section-title">Trusted by<em> Leading</em><br/>Institutions</h2>
            <p className="section-desc">
              We work alongside hospitals, NGOs, and government bodies to keep the network strong.
            </p>
          </div>
          <div className="partners-grid reveal">
            {[
              { name: 'Dhaka Medical College', type: 'Government Hospital' },
              { name: 'United Hospital Limited', type: 'Private Healthcare' },
              { name: 'Kurmitola General Hospital', type: 'Government & Military Hospital' },
              { name: 'Red Heart Foundation', type: 'NGO Partner' },
              { name: 'National Healthcare Network', type: 'Hospital Network' },
            ].map((p, i) => (
              <div key={i} className="partner-card">
                <div className="partner-logo">{p.name}</div>
                <div className="partner-type">{p.type}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          CTA
      ════════════════════════════════════════════════════════════════ */}
      <section className="about-cta">
        <div className="about-cta-inner reveal">
          <span className="tag">Join the Mission</span>
          <h2 className="about-cta-title">
            Be Part of the<br/><em>Circle of Life</em>
          </h2>
          <p className="about-cta-desc">
            Whether you give blood, spread the word, or partner with us — every action
            keeps the circle unbroken. A two-minute registration. A lifetime of impact.
          </p>
          <div className="about-cta-actions">
            <a href="/become-donor" className="about-btn-white">
              <span>Register as Donor</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="/contact" className="about-btn-ghost">
              <span>Partner With Us</span>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}