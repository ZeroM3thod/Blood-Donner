'use client'

import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    // Counter animation
    function animateCounter(el: HTMLElement, target: number) {
      let start: number | null = null
      const step = (timestamp: number) => {
        if (!start) start = timestamp
        const progress = Math.min((timestamp - start) / 2000, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        const current = Math.floor(eased * target)
        if (el.childNodes[0]) el.childNodes[0].nodeValue = current.toLocaleString()
        if (progress < 1) requestAnimationFrame(step)
        else if (el.childNodes[0]) el.childNodes[0].nodeValue = target.toLocaleString()
      }
      requestAnimationFrame(step)
    }
    const statNums = document.querySelectorAll('.stat-num[data-target]')
    const statObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement
          const t = el.getAttribute('data-target')
          if (t) animateCounter(el, parseInt(t))
          statObserver.unobserve(el)
        }
      })
    }, { threshold: 0.5 })
    statNums.forEach(n => statObserver.observe(n))
    return () => statObserver.disconnect()
  }, [])

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-pattern">
          <svg viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#8C1F28" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)"/>
            <circle cx="300" cy="400" r="200" fill="none" stroke="#8C1F28" strokeWidth="1"/>
            <circle cx="300" cy="400" r="140" fill="none" stroke="#8C1F28" strokeWidth="1"/>
            <circle cx="300" cy="400" r="80"  fill="none" stroke="#8C1F28" strokeWidth="1"/>
          </svg>
        </div>
        <div className="hero-inner">
          <div className="hero-left reveal">
            <div className="hero-badge"><span className="tag">Verified Donor Network</span></div>
            <h1 className="hero-title">
              Every Drop<br/>
              <em>Saves a Life</em>
              <br/>
              <span style={{fontSize:'0.7em',fontStyle:'normal',color:'var(--ink-soft)',fontWeight:'300'}}>
                <span className="rule-line"></span>You Are Someone's Hope
              </span>
            </h1>
            <p className="hero-desc">
              Blood Circle connects verified blood donors with those who need them most — instantly, safely, and compassionately. Register today. Save a life tomorrow.
            </p>
            <div className="hero-actions">
              <a href="/become-donor" className="btn btn-primary">
                <span>Register as Donor</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="/search-donors" className="btn btn-outline">
                <span>Find Donors Near You</span>
              </a>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-num" data-target="48200">0<span>+</span></div>
                <div className="stat-label">Verified Donors</div>
              </div>
              <div className="stat-item">
                <div className="stat-num" data-target="12900">0<span>+</span></div>
                <div className="stat-label">Lives Saved</div>
              </div>
              <div className="stat-item">
                <div className="stat-num" data-target="190">0<span>+</span></div>
                <div className="stat-label">Cities Covered</div>
              </div>
            </div>
          </div>
          <div className="hero-right reveal">
            <div className="hero-visual">
              <div className="hero-card-main">
                <div className="hc-blood-type">A+</div>
                <div className="hc-name">Rakibul Hasan</div>
                <div className="hc-location">📍 Konabari , Gazipur</div>
                <div className="hc-divider"></div>
                <div className="hc-row">
                  <span className="hc-row-label">Last Donated</span>
                  <span className="hc-row-val">3 months ago</span>
                </div>
                <div className="hc-row">
                  <span className="hc-row-label">Donations</span>
                  <span className="hc-row-val">14 times</span>
                </div>
                <div className="hc-row">
                  <span className="hc-row-label">Response Rate</span>
                  <span className="hc-row-val">98%</span>
                </div>
                <div className="hc-badge">Available to Donate</div>
              </div>
              <div className="hero-card-sm card-a">
                <div className="sm-card-title">Requests Today</div>
                <div className="sm-card-val">47</div>
                <div className="sm-card-sub">Across 12 hospitals</div>
                <div className="sm-card-bar"><div className="sm-card-fill"></div></div>
              </div>
              <div className="hero-card-sm card-b">
                <div className="sm-card-title">Donors Online</div>
                <div className="sm-card-val">1,284</div>
                <div className="sm-card-sub">Near you now</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUSTED BY ── */}
      <div className="trusted">
        <div className="trusted-inner">
          <span className="trusted-label">Trusted by</span>
          <div className="trusted-logos">
            <span className="trust-item">Dhaka Medical College</span>
            <span className="trust-item">BIRDEM General Hospital</span>
            <span className="trust-item">United Hospital Limited</span>
            <span className="trust-item">Green Life Medical College</span>
            
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section className="how" id="how-it-works">
        <div className="container">
          <div className="section-header-row section-header reveal">
            <div>
              <span className="tag">Simple Process</span>
              <h2 className="section-title">How Blood<em>Circle</em><br/>Works</h2>
            </div>
            <p className="section-desc">From registration to donation, we've made every step seamless, secure, and dignified.</p>
          </div>
          <div className="steps-grid reveal">
            <div className="step-card">
              <div className="step-num">01</div>
              <div className="step-icon-wrap">
                <svg viewBox="0 0 22 22" fill="none">
                  <path d="M11 2C8.24 2 6 4.24 6 7c0 3.5 5 11 5 11s5-7.5 5-11c0-2.76-2.24-5-5-5z" stroke="#8C1F28" strokeWidth="1.5" strokeLinejoin="round"/>
                  <circle cx="11" cy="7" r="2" stroke="#8C1F28" strokeWidth="1.5"/>
                </svg>
              </div>
              <div className="step-title">Create Your Profile</div>
              <div className="step-desc">Register with your blood type, location, and contact details. Verification takes under 5 minutes and ensures the community's safety.</div>
              <div className="step-arrow">→</div>
            </div>
            <div className="step-card">
              <div className="step-num">02</div>
              <div className="step-icon-wrap">
                <svg viewBox="0 0 22 22" fill="none">
                  <circle cx="11" cy="11" r="8.5" stroke="#8C1F28" strokeWidth="1.5"/>
                  <path d="M8 11h6M11 8v6" stroke="#8C1F28" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="step-title">Get Matched Instantly</div>
              <div className="step-desc">Our intelligent system matches blood seekers with compatible, available donors in their area — in real time, around the clock.</div>
              <div className="step-arrow">→</div>
            </div>
            <div className="step-card">
              <div className="step-num">03</div>
              <div className="step-icon-wrap">
                <svg viewBox="0 0 22 22" fill="none">
                  <path d="M11 3C6.58 3 3 6.58 3 11s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z" stroke="#8C1F28" strokeWidth="1.5"/>
                  <path d="M8 11l2 2 4-4" stroke="#8C1F28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="step-title">Donate & Save Lives</div>
              <div className="step-desc">Connect directly, coordinate your visit, and give the gift that no machine can manufacture.</div>
              <div className="step-arrow">↗</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BLOOD TYPES ── */}
      <section className="blood-types">
        <div className="container">
          <div className="section-header reveal">
            <span className="tag">All Types Welcome</span>
            <h2 className="section-title">Every Blood Type <em>Matters</em></h2>
            <p className="section-desc">From universal donors to rare types — Blood Circle maintains an active network for all eight blood groups.</p>
          </div>
          <div className="bt-grid reveal">
            {[
              {t:'A+', c:'Donates to A+, AB+',  n:'8,240 donors'},
              {t:'A−', c:'Donates to A, AB',     n:'2,180 donors'},
              {t:'B+', c:'Donates to B+, AB+',  n:'7,650 donors'},
              {t:'B−', c:'Donates to B, AB',     n:'1,920 donors'},
              {t:'O+', c:'Universal+ donor',     n:'12,400 donors'},
              {t:'O−', c:'Universal donor',      n:'4,100 donors'},
              {t:'AB+',c:'Universal recipient',  n:'6,300 donors'},
              {t:'AB−',c:'Rarest type',          n:'890 donors'},
            ].map(bt => (
              <div key={bt.t} className="bt-card">
                <div className="bt-type">{bt.t}</div>
                <div className="bt-compat">{bt.c}</div>
                <div className="bt-count">{bt.n}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="features" id="features">
        <div className="container">
          <div className="features-grid">
            <div className="features-left">
              <div className="section-header reveal">
                <span className="tag">Why Blood Circle</span>
                <h2 className="section-title">Built on <em>Trust</em><br/>& Technology</h2>
                <p className="section-desc">Every feature exists to protect donors and recipients alike.</p>
              </div>
              <div className="features-list reveal">
                {[
                  { icon: <path d="M9 1L2 4v5c0 3.87 2.97 7.5 7 8.5C13.03 16.5 16 12.87 16 9V4L9 1z" stroke="#8C1F28" strokeWidth="1.4" strokeLinejoin="round"/>, title: 'Identity Verified Donors', desc: 'Every donor is manually reviewed and identity-verified before listing.' },
                  { icon: <><circle cx="9" cy="9" r="7.5" stroke="#8C1F28" strokeWidth="1.4"/><path d="M6 9l2 2 4-4" stroke="#8C1F28" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></>, title: 'Real-Time Availability', desc: 'Donors update availability live. Recipients never reach a stale listing.' },
                  { icon: <><path d="M9 2C6.24 2 4 4.24 4 7c0 2.5 3.5 8 5 9.5C10.5 15 14 9.5 14 7c0-2.76-2.24-5-5-5z" stroke="#8C1F28" strokeWidth="1.4" strokeLinejoin="round"/><circle cx="9" cy="7" r="1.5" stroke="#8C1F28" strokeWidth="1.4"/></>, title: 'Location-Based Search', desc: 'Filter donors by city, neighborhood, or within a custom radius.' },
                  { icon: <><rect x="2" y="3" width="14" height="11" rx="1.5" stroke="#8C1F28" strokeWidth="1.4"/><path d="M5 7h8M5 10h5" stroke="#8C1F28" strokeWidth="1.4" strokeLinecap="round"/></>, title: 'Private & Confidential', desc: 'Contact information is never publicly visible. Requests go through our secure messaging layer.' },
                ].map((f, i) => (
                  <div key={i} className="feature-item">
                    <div className="feat-icon">
                      <svg viewBox="0 0 18 18" fill="none">{f.icon}</svg>
                    </div>
                    <div className="feat-content">
                      <div className="feat-title">{f.title}</div>
                      <div className="feat-desc">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="features-right reveal">
              <div className="feat-testimonial">
                <p className="testi-text">"Within two hours of posting a request for B− blood, Blood Circle connected us with a verified donor nearby. My father is alive today because of this platform."</p>
                <div className="testi-author">
                  <div className="testi-avatar">P</div>
                  <div>
                    <div className="testi-name">Mousumi Akter</div>
                    <div className="testi-role">Daughter of patient · Dhaka, Bangladesh</div>
                  </div>
                </div>
              </div>
              <div className="feat-accent-card">
                <div className="fac-num">4.9★</div>
                <div className="fac-label">Average donor rating from recipients</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="cta-banner">
        <div className="cta-inner reveal">
          <span className="tag">Join the Circle</span>
          <h2 className="cta-title">One Pint. <em>Three Lives.</em><br/>Your Call.</h2>
          <p className="cta-desc">Hundreds of patients search for donors every single day. The decision to register takes two minutes. The impact lasts forever.</p>
          <div className="cta-actions">
            <a href="/become-donor" className="btn btn-white"><span>Register as Donor</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="/search-donors" className="btn" style={{background:'rgba(255,255,255,0.1)',color:'white',border:'1px solid rgba(255,255,255,0.3)'}}>
              <span>Search Donors</span>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
