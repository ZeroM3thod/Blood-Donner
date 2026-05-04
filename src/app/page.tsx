'use client'

import { useEffect, useRef } from 'react'

export default function Home() {
  const navRef = useRef<HTMLElement>(null)
  const navToggleRef = useRef<HTMLButtonElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // ── Page Loader
    const loader = document.getElementById('page-loader')
    if (loader) {
      setTimeout(() => {
        loader.classList.add('hidden')
      }, 1500)
    }

    // ── Custom Cursor
    const dot = document.getElementById('cursor-dot')
    const ring = document.getElementById('cursor-ring')
    let mx = -100, my = -100, rx = -100, ry = -100

    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      if (dot) {
        dot.style.left = mx + 'px'
        dot.style.top = my + 'px'
      }
    }

    document.addEventListener('mousemove', handleMouseMove)

    let animationFrameId: number
    const animateRing = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      if (ring) {
        ring.style.left = rx + 'px'
        ring.style.top = ry + 'px'
      }
      animationFrameId = requestAnimationFrame(animateRing)
    }
    animateRing()

    const hoverElements = document.querySelectorAll('a, button, .bt-card, .step-card, .feature-item')
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'))
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'))
    })

    // ── Nav Scroll
    const handleScroll = () => {
      if (navRef.current) {
        navRef.current.classList.toggle('scrolled', window.scrollY > 40)
      }
    }
    window.addEventListener('scroll', handleScroll)

    // ── Mobile Menu
    const handleToggle = () => {
      if (navToggleRef.current && mobileMenuRef.current) {
        navToggleRef.current.classList.toggle('open')
        mobileMenuRef.current.classList.toggle('open')
      }
    }
    if (navToggleRef.current) {
      navToggleRef.current.addEventListener('click', handleToggle)
    }

    const mobileMenuLinks = mobileMenuRef.current?.querySelectorAll('a')
    mobileMenuLinks?.forEach(a => a.addEventListener('click', () => {
      navToggleRef.current?.classList.remove('open')
      mobileMenuRef.current?.classList.remove('open')
    }))

    // ── Scroll Reveal
    const reveals = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80)
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })
    reveals.forEach(r => observer.observe(r))

    // ── Counter Animation
    function animateCounter(el: HTMLElement, target: number) {
      let start: number | null = null
      const duration = 2000
      const step = (timestamp: number) => {
        if (!start) start = timestamp
        const progress = Math.min((timestamp - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        const current = Math.floor(eased * target)
        if (el.childNodes[0]) {
          el.childNodes[0].nodeValue = current.toLocaleString()
        }
        if (progress < 1) requestAnimationFrame(step)
        else if (el.childNodes[0]) {
          el.childNodes[0].nodeValue = target.toLocaleString()
        }
      }
      requestAnimationFrame(step)
    }

    const statNums = document.querySelectorAll('.stat-num[data-target]')
    const statObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement
          const targetValue = el.getAttribute('data-target')
          if (targetValue) {
            animateCounter(el, parseInt(targetValue))
          }
          statObserver.unobserve(el)
        }
      })
    }, { threshold: 0.5 })
    statNums.forEach(n => statObserver.observe(n))

    // ── Smooth mobile link scroll
    const smoothLinks = document.querySelectorAll('a[href^="#"]')
    smoothLinks.forEach(a => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href')
        if (href && href !== '#') {
          const target = document.querySelector(href)
          if (target) {
            e.preventDefault()
            target.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }
      })
    })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('scroll', handleScroll)
      navToggleRef.current?.removeEventListener('click', handleToggle)
    }
  }, [])

  return (
    <>
      {/* Page Loader */}
      <div id="page-loader">
        <div className="loader-content">
          <div className="loader-logo">Blood<span>Circle</span></div>
          <div className="loader-bar-wrap"><div className="loader-bar"></div></div>
        </div>
      </div>

      {/* Custom Cursor */}
      <div id="cursor-dot"></div>
      <div id="cursor-ring"></div>

      {/* ── NAVIGATION ── */}
      <nav id="main-nav" ref={navRef}>
        <div className="nav-inner">
          <a href="#" className="logo">
            <div className="logo-mark"></div>
            <div className="logo-text">
              <span className="logo-name">Blood<span>Circle</span></span>
              <span className="logo-tagline">Life · Humanity · Hope</span>
            </div>
          </a>
          <ul className="nav-links">
            <li><a href="#">Home</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#features">Our Mission</a></li>
            <li><a href="#donors">Find Donors</a></li>
            <li><a href="#about">About</a></li>
          </ul>
          <div className="nav-cta">
            <a href="#" className="btn btn-ghost"><span>Sign In</span></a>
            <a href="/become-donor" className="btn btn-primary">
              <span>Become a Donor</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
          <button className="nav-toggle" id="navToggle" aria-label="Menu" ref={navToggleRef}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className="mobile-menu" id="mobileMenu" ref={mobileMenuRef}>
        <ul>
          <li><a href="#">Home</a></li>
            <li><a href="#">How It Works</a></li>
            <li><a href="#">Our Mission</a></li>
            <li><a href="#">Find Donors</a></li>
            <li><a href="#">About</a></li>
        </ul>
        <div className="mobile-btns">
          <a href="#" className="btn btn-outline"><span>Sign In</span></a>
          <a href="/become-donor" className="btn btn-primary">
            <span>Become a Donor</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-pattern">
          <svg viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="#8C1F28" strokeWidth="1"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#grid)"/>
            <circle cx="300" cy="400" r="200" fill="none" stroke="#8C1F28" strokeWidth="1"/>
            <circle cx="300" cy="400" r="140" fill="none" stroke="#8C1F28" strokeWidth="1"/>
            <circle cx="300" cy="400" r="80" fill="none" stroke="#8C1F28" strokeWidth="1"/>
          </svg>
        </div>
        <div className="hero-inner">
          <div className="hero-left reveal">
            <div className="hero-badge"><span className="tag">Verified Donor Network</span></div>
            <h1 className="hero-title">
              Every Drop<br/>
              <em>Saves a Life</em>
              <br/><span style={{fontSize:'0.7em',fontStyle:'normal',color:'var(--ink-soft)',fontWeight:'300'}}><span className="rule-line"></span>You Are Someone's Hope</span>
            </h1>
            <p className="hero-desc">
              Blood Circle connects verified blood donors with those who need them most — instantly, safely, and compassionately. Register today. Save a life tomorrow.
            </p>
            <div className="hero-actions">
              <a href="#" className="btn btn-primary">
                <span>Register as Donor</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a href="#" className="btn btn-outline">
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
                <div className="hc-name">Aryan Mehta</div>
                <div className="hc-location">📍 Mumbai, Maharashtra</div>
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
            <span className="trust-item">AIIMS New Delhi</span>
            <span className="trust-item">Fortis Healthcare</span>
            <span className="trust-item">Apollo Hospitals</span>
            <span className="trust-item">Red Cross India</span>
            <span className="trust-item">Max Healthcare</span>
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
            <p className="section-desc">From registration to donation, we've made every step of the process seamless, secure, and dignified.</p>
          </div>
          <div className="steps-grid reveal">
            <div className="step-card">
              <div className="step-num">01</div>
              <div className="step-icon-wrap">
                <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 3C6.58 3 3 6.58 3 11s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z" stroke="#8C1F28" strokeWidth="1.5"/>
                  <path d="M8 11l2 2 4-4" stroke="#8C1F28" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="step-title">Donate & Save Lives</div>
              <div className="step-desc">Connect directly, coordinate your visit, and give the gift that no machine can manufacture. Every donation adds your chapter to our story.</div>
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
            <div className="bt-card">
              <div className="bt-type">A+</div>
              <div className="bt-compat">Donates to A+, AB+</div>
              <div className="bt-count">8,240 donors</div>
            </div>
            <div className="bt-card">
              <div className="bt-type">A−</div>
              <div className="bt-compat">Donates to A, AB</div>
              <div className="bt-count">2,180 donors</div>
            </div>
            <div className="bt-card">
              <div className="bt-type">B+</div>
              <div className="bt-compat">Donates to B+, AB+</div>
              <div className="bt-count">7,650 donors</div>
            </div>
            <div className="bt-card">
              <div className="bt-type">B−</div>
              <div className="bt-compat">Donates to B, AB</div>
              <div className="bt-count">1,920 donors</div>
            </div>
            <div className="bt-card">
              <div className="bt-type">O+</div>
              <div className="bt-compat">Universal+ donor</div>
              <div className="bt-count">12,400 donors</div>
            </div>
            <div className="bt-card">
              <div className="bt-type">O−</div>
              <div className="bt-compat">Universal donor</div>
              <div className="bt-count">4,100 donors</div>
            </div>
            <div className="bt-card">
              <div className="bt-type">AB+</div>
              <div className="bt-compat">Universal recipient</div>
              <div className="bt-count">6,300 donors</div>
            </div>
            <div className="bt-card">
              <div className="bt-type">AB−</div>
              <div className="bt-compat">Rarest type</div>
              <div className="bt-count">890 donors</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES / MISSION ── */}
      <section className="features" id="features">
        <div className="container">
          <div className="features-grid">
            <div className="features-left">
              <div className="section-header reveal">
                <span className="tag">Why Blood Circle</span>
                <h2 className="section-title">Built on <em>Trust</em><br/>& Technology</h2>
                <p className="section-desc">We take the responsibility of connecting lives seriously — every feature exists to protect donors and recipients alike.</p>
              </div>
              <div className="features-list reveal">
                <div className="feature-item">
                  <div className="feat-icon">
                    <svg viewBox="0 0 18 18" fill="none"><path d="M9 1L2 4v5c0 3.87 2.97 7.5 7 8.5C13.03 16.5 16 12.87 16 9V4L9 1z" stroke="#8C1F28" strokeWidth="1.4" strokeLinejoin="round"/></svg>
                  </div>
                  <div className="feat-content">
                    <div className="feat-title">Identity Verified Donors</div>
                    <div className="feat-desc">Every donor is manually reviewed and identity-verified before listing. Zero tolerance for unverified entries.</div>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feat-icon">
                    <svg viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7.5" stroke="#8C1F28" strokeWidth="1.4"/><path d="M6 9l2 2 4-4" stroke="#8C1F28" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div className="feat-content">
                    <div className="feat-title">Real-Time Availability</div>
                    <div className="feat-desc">Donors update availability live. Recipients never reach a stale listing — every contact is timely and relevant.</div>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feat-icon">
                    <svg viewBox="0 0 18 18" fill="none"><path d="M9 2C6.24 2 4 4.24 4 7c0 2.5 3.5 8 5 9.5C10.5 15 14 9.5 14 7c0-2.76-2.24-5-5-5z" stroke="#8C1F28" strokeWidth="1.4" strokeLinejoin="round"/><circle cx="9" cy="7" r="1.5" stroke="#8C1F28" strokeWidth="1.4"/></svg>
                  </div>
                  <div className="feat-content">
                    <div className="feat-title">Location-Based Search</div>
                    <div className="feat-desc">Filter donors by city, neighborhood, or within a custom radius. Proximity matters most in emergencies.</div>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feat-icon">
                    <svg viewBox="0 0 18 18" fill="none"><rect x="2" y="3" width="14" height="11" rx="1.5" stroke="#8C1F28" strokeWidth="1.4"/><path d="M5 7h8M5 10h5" stroke="#8C1F28" strokeWidth="1.4" strokeLinecap="round"/></svg>
                  </div>
                  <div className="feat-content">
                    <div className="feat-title">Private & Confidential</div>
                    <div className="feat-desc">Contact information is never publicly visible. Requests go through our secure messaging layer.</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="features-right reveal">
              <div className="feat-testimonial">
                <p className="testi-text">"Within two hours of posting a request for B− blood, Blood Circle connected us with a verified donor nearby. My father is alive today because of this platform."</p>
                <div className="testi-author">
                  <div className="testi-avatar">P</div>
                  <div>
                    <div className="testi-name">Priya Nair</div>
                    <div className="testi-role">Daughter of patient · Kochi, Kerala</div>
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
            <a href="#" className="btn btn-white">
              <span>Register as Donor</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a href="#" className="btn" style={{background:'rgba(255,255,255,0.1)',color:'white',border:'1px solid rgba(255,255,255,0.3)'}}>
              <span>Search Donors</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo-name">Blood<span>Circle</span></div>
              <div className="footer-logo-tagline">Life · Humanity · Hope</div>
              <p className="footer-brand-desc">A trusted platform connecting blood donors with recipients across India. Every profile is verified. Every drop is precious.</p>
            </div>
            <div>
              <div className="footer-col-title">Platform</div>
              <ul className="footer-links">
                <li><a href="#">Register as Donor</a></li>
                <li><a href="#">Search Donors</a></li>
                <li><a href="#">Blood Banks</a></li>
                <li><a href="#">Emergency Request</a></li>
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Company</div>
              <ul className="footer-links">
                <li><a href="#">About Us</a></li>
                <li><a href="#">Our Mission</a></li>
                <li><a href="#">Press</a></li>
                <li><a href="#">Careers</a></li>
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Support</div>
              <ul className="footer-links">
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span className="footer-copy">© 2025 Blood Circle. All rights reserved. Made with purpose.</span>
            <div className="footer-socials">
              <a href="#" className="social-btn" aria-label="Twitter">
                <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" className="social-btn" aria-label="Instagram">
                <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="social-btn" aria-label="Facebook">
                <svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
