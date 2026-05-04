I'll give you the code one by one in order. Here's the plan first:

**Files we'll create/update:**
1. `src/components/Navbar.tsx`
2. `src/components/Footer.tsx`
3. `src/components/ClientShell.tsx` (loader + cursor + scroll effects)
4. `src/app/layout.tsx` (updated — wraps everything)
5. `src/app/search-donors/search-donors.css`
6. `src/app/search-donors/page.tsx`
7. `src/app/page.tsx` (updated — remove duplicate nav/footer)
8. `src/app/become-donor/page.tsx` (updated — remove duplicate nav/footer)

---

### File 1 — `src/components/Navbar.tsx`

```tsx
'use client'

import { useRef } from 'react'

export default function Navbar() {
  const navToggleRef = useRef<HTMLButtonElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const toggleMobileMenu = () => {
    navToggleRef.current?.classList.toggle('open')
    mobileMenuRef.current?.classList.toggle('open')
  }

  return (
    <>
      <nav id="main-nav">
        <div className="nav-inner">
          <a href="/" className="logo">
            <div className="logo-mark"></div>
            <div className="logo-text">
              <span className="logo-name">Blood<span>Circle</span></span>
              <span className="logo-tagline">Life · Humanity · Hope</span>
            </div>
          </a>
          <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/#how-it-works">How It Works</a></li>
            <li><a href="/#features">Our Mission</a></li>
            <li><a href="/search-donors">Find Donors</a></li>
            <li><a href="#">About</a></li>
          </ul>
          <div className="nav-cta">
            <a href="#" className="btn btn-ghost"><span>Sign In</span></a>
            <a href="/become-donor" className="btn btn-primary">
              <span>Become a Donor</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
          <button
            className="nav-toggle"
            aria-label="Menu"
            ref={navToggleRef}
            onClick={toggleMobileMenu}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      <div className="mobile-menu" ref={mobileMenuRef}>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/#how-it-works">How It Works</a></li>
          <li><a href="/#features">Our Mission</a></li>
          <li><a href="/search-donors">Find Donors</a></li>
          <li><a href="#">About</a></li>
        </ul>
        <div className="mobile-btns">
          <a href="#" className="btn btn-outline"><span>Sign In</span></a>
          <a href="/become-donor" className="btn btn-primary">
            <span>Become a Donor</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </>
  )
}
```

---

### File 2 — `src/components/Footer.tsx`

```tsx
export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo-name">Blood<span>Circle</span></div>
            <div className="footer-logo-tagline">Life · Humanity · Hope</div>
            <p className="footer-brand-desc">
              A trusted platform connecting blood donors with recipients across India.
              Every profile is verified. Every drop is precious.
            </p>
          </div>
          <div>
            <div className="footer-col-title">Platform</div>
            <ul className="footer-links">
              <li><a href="/become-donor">Register as Donor</a></li>
              <li><a href="/search-donors">Search Donors</a></li>
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
              <svg viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" className="social-btn" aria-label="Instagram">
              <svg viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" className="social-btn" aria-label="Facebook">
              <svg viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

---

### File 3 — `src/components/ClientShell.tsx`

This handles the page loader, cursor, and nav scroll — things that need `useEffect` but apply globally.

```tsx
'use client'

import { useEffect } from 'react'

export default function ClientShell({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // ── Page Loader
    const loader = document.getElementById('page-loader')
    if (loader) {
      setTimeout(() => loader.classList.add('hidden'), 1400)
    }

    // ── Custom Cursor
    const dot = document.getElementById('cursor-dot')
    const ring = document.getElementById('cursor-ring')
    let mx = -100, my = -100, rx = -100, ry = -100

    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      if (dot) { dot.style.left = mx + 'px'; dot.style.top = my + 'px' }
    }
    document.addEventListener('mousemove', handleMouseMove)

    let rafId: number
    const animateRing = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px' }
      rafId = requestAnimationFrame(animateRing)
    }
    animateRing()

    const onEnter = () => document.body.classList.add('cursor-hover')
    const onLeave = () => document.body.classList.remove('cursor-hover')
    const attachCursorHover = () => {
      document.querySelectorAll('a, button, label, .donor-card, .bt-card, .step-card, .feature-item, .bt-f-label, .filter-check-item, .avail-label, .cond-label, .bt-label').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    attachCursorHover()

    // ── Nav Scroll
    const nav = document.getElementById('main-nav')
    const handleScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)

    // ── Scroll Reveal
    const reveals = document.querySelectorAll('.reveal')
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 60)
          revealObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' })
    reveals.forEach(r => revealObserver.observe(r))

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return <>{children}</>
}
```

---

### File 4 — `src/app/layout.tsx` (updated)

```tsx
import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ClientShell from '@/components/ClientShell'

export const metadata: Metadata = {
  title: 'Blood Circle — Give Life, Save Lives',
  description: 'Blood Circle connects verified blood donors with those who need them most — instantly, safely, and compassionately.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
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

        <ClientShell>
          <Navbar />
          {children}
          <Footer />
        </ClientShell>
      </body>
    </html>
  )
}
```

---

### File 5 — `src/app/search-donors/search-donors.css`

```css
/* ── Search Hero ── */
.search-hero {
  padding-top: 90px;
  background:
    radial-gradient(ellipse 70% 60% at 80% 40%, rgba(140,31,40,0.07) 0%, transparent 70%),
    radial-gradient(ellipse 40% 50% at 5% 70%, rgba(184,146,42,0.05) 0%, transparent 60%),
    var(--cream);
  position: relative;
  overflow: hidden;
}
.search-hero-pattern {
  position: absolute; right: 0; top: 0; bottom: 0;
  width: 45%; z-index: 0; opacity: 0.04; pointer-events: none;
}
.search-hero-pattern svg { width: 100%; height: 100%; }
.search-hero-inner {
  position: relative; z-index: 1;
  max-width: 1200px; margin: 0 auto;
  padding: 72px 32px 64px;
  display: flex; align-items: flex-end; justify-content: space-between;
  gap: 40px; flex-wrap: wrap;
}
.search-hero-left { max-width: 600px; }
.search-hero-badge { margin-bottom: 24px; }
.search-hero-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(36px, 4.5vw, 60px);
  font-weight: 600; line-height: 1.1;
  letter-spacing: -0.02em; color: var(--ink); margin-bottom: 20px;
}
.search-hero-title em { font-style: italic; color: var(--crimson); }
.search-hero-desc {
  font-size: 15.5px; line-height: 1.8; color: var(--ink-soft);
  font-weight: 300; max-width: 460px; margin-bottom: 32px;
}
.search-hero-pills { display: flex; flex-wrap: wrap; gap: 10px; }
.hero-pill {
  display: inline-flex; align-items: center; gap: 7px;
  font-size: 12px; font-weight: 500; letter-spacing: 0.04em;
  color: var(--ink-mid); padding: 7px 14px;
  border: 1px solid var(--border); border-radius: 2px;
  background: rgba(255,255,255,0.6);
}
.hero-pill svg { width: 13px; height: 13px; color: var(--crimson); flex-shrink: 0; }
.search-hero-stats {
  display: flex; gap: 0; flex-shrink: 0;
  border: 1px solid var(--border); background: var(--white);
  box-shadow: var(--shadow-md); border-radius: 2px;
  overflow: hidden; align-self: flex-end;
}
.sh-stat {
  padding: 24px 32px; text-align: center;
  border-right: 1px solid var(--border);
}
.sh-stat:last-child { border-right: none; }
.sh-stat-num {
  font-family: 'Cormorant Garamond', serif;
  font-size: 34px; font-weight: 700; color: var(--ink); line-height: 1;
}
.sh-stat-num span { color: var(--crimson); }
.sh-stat-label {
  font-size: 11px; color: var(--ink-soft);
  letter-spacing: 0.1em; text-transform: uppercase; margin-top: 5px;
}

/* ── Quick Search Bar ── */
.quick-search-wrap {
  background: var(--white); border-bottom: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  position: sticky; top: 76px; z-index: 100;
}
.quick-search-inner {
  max-width: 1200px; margin: 0 auto; padding: 20px 32px;
  display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
}
.qs-label {
  font-size: 11px; font-weight: 600; letter-spacing: 0.14em;
  text-transform: uppercase; color: var(--ink-soft);
  white-space: nowrap; flex-shrink: 0;
}
.qs-divider { width: 1px; height: 32px; background: var(--border); flex-shrink: 0; }
.qs-field {
  display: flex; align-items: center; gap: 8px;
  flex: 1; min-width: 140px;
}
.qs-field svg { color: var(--crimson); flex-shrink: 0; opacity: 0.7; }
.qs-input, .qs-select {
  font-family: 'DM Sans', sans-serif; font-size: 13.5px;
  color: var(--ink); background: transparent;
  border: none; outline: none; width: 100%; appearance: none;
}
.qs-select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='7' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%236B6B6B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat; background-position: right 0 center;
  padding-right: 16px;
}
.qs-btn {
  background: var(--crimson); color: var(--white);
  border: none; border-radius: 2px;
  font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
  letter-spacing: 0.06em; padding: 12px 28px;
  cursor: pointer; display: flex; align-items: center; gap: 8px;
  flex-shrink: 0; transition: background 0.25s;
}
.qs-btn:hover { background: var(--crimson-d); }
.qs-results-count {
  font-size: 12px; color: var(--ink-soft); white-space: nowrap; flex-shrink: 0;
  margin-left: auto;
}
.qs-results-count strong { color: var(--crimson); font-weight: 600; }

/* ── Emergency Strip ── */
.emergency-strip {
  background: var(--ink);
  padding: 20px 0;
  border-top: 1px solid rgba(255,255,255,0.05);
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.emergency-inner {
  max-width: 1200px; margin: 0 auto; padding: 0 32px;
  display: flex; align-items: center; justify-content: space-between;
  gap: 24px; flex-wrap: wrap;
}
.emerg-left { display: flex; align-items: center; gap: 16px; }
.emerg-icon {
  width: 44px; height: 44px; border-radius: 50%;
  background: var(--crimson); display: flex; align-items: center;
  justify-content: center; flex-shrink: 0;
}
.emerg-text-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 20px; font-weight: 600; color: var(--white);
}
.emerg-text-sub { font-size: 12.5px; color: rgba(255,255,255,0.5); margin-top: 2px; }
.emerg-btn {
  background: var(--crimson); color: var(--white);
  font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
  letter-spacing: 0.06em; padding: 13px 28px; border: none; border-radius: 2px;
  cursor: pointer; display: flex; align-items: center; gap: 8px;
  flex-shrink: 0; transition: background 0.25s;
}
.emerg-btn:hover { background: var(--crimson-l); }

/* ── Main Layout ── */
.search-main {
  max-width: 1264px; margin: 0 auto;
  padding: 48px 32px 100px;
  display: grid; grid-template-columns: 280px 1fr;
  gap: 40px; align-items: start;
}

/* ── Filter Sidebar ── */
.filter-sidebar { position: sticky; top: 148px; }
.filter-panel {
  background: var(--white); border: 1px solid var(--border);
  border-radius: 2px; overflow: hidden;
}
.filter-head {
  padding: 20px 24px;
  border-bottom: 1px solid var(--cream-d);
  background: linear-gradient(to right, rgba(140,31,40,0.04) 0%, transparent 70%);
  display: flex; align-items: center; justify-content: space-between;
}
.filter-head-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 20px; font-weight: 600; color: var(--ink);
}
.filter-clear {
  font-size: 11px; font-weight: 500; letter-spacing: 0.08em;
  text-transform: uppercase; color: var(--crimson);
  background: none; border: none; cursor: pointer;
  text-decoration: underline; text-underline-offset: 3px;
}
.filter-clear:hover { opacity: 0.7; }
.filter-section { border-bottom: 1px solid var(--cream-d); padding: 20px 24px; }
.filter-section:last-child { border-bottom: none; }
.filter-section-title {
  font-size: 11px; font-weight: 600; letter-spacing: 0.14em;
  text-transform: uppercase; color: var(--ink-mid); margin-bottom: 14px;
}

/* Blood Type Filter */
.bt-filter-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; }
.bt-f-opt { display: none; }
.bt-f-label {
  display: flex; flex-direction: column; align-items: center;
  padding: 10px 4px; border: 1.5px solid var(--cream-d);
  border-radius: 2px; cursor: pointer; transition: all 0.2s;
  background: var(--cream);
}
.bt-f-label:hover { border-color: rgba(140,31,40,0.4); background: rgba(140,31,40,0.04); }
.bt-f-opt:checked + .bt-f-label {
  border-color: var(--crimson); background: var(--crimson); color: var(--white);
}
.bt-f-type {
  font-family: 'Cormorant Garamond', serif;
  font-size: 17px; font-weight: 700; color: var(--ink); transition: color 0.2s;
}
.bt-f-opt:checked + .bt-f-label .bt-f-type { color: var(--white); }

/* Checkbox Filters */
.filter-check-list { display: flex; flex-direction: column; gap: 10px; }
.filter-check-item { display: flex; align-items: center; gap: 10px; cursor: pointer; }
.filter-check-item input[type="checkbox"] { display: none; }
.fc-box {
  width: 18px; height: 18px; border: 1.5px solid var(--cream-d);
  border-radius: 2px; background: var(--cream); flex-shrink: 0;
  position: relative; transition: all 0.2s;
}
.filter-check-item input:checked + .fc-box {
  background: var(--crimson); border-color: var(--crimson);
}
.filter-check-item input:checked + .fc-box::after {
  content: '';
  position: absolute; left: 4px; top: 1px;
  width: 6px; height: 10px;
  border: 2px solid var(--white);
  border-left: none; border-top: none;
  transform: rotate(45deg);
}
.fc-label { font-size: 13px; color: var(--ink-mid); line-height: 1.4; }
.fc-count {
  margin-left: auto; font-size: 11px; color: var(--ink-soft);
  background: var(--cream-d); padding: 2px 7px; border-radius: 10px;
}

/* Filter Selects */
.filter-select {
  width: 100%; font-family: 'DM Sans', sans-serif;
  font-size: 13px; color: var(--ink);
  background: var(--cream); border: 1.5px solid var(--cream-d);
  border-radius: 2px; padding: 10px 14px;
  outline: none; cursor: pointer; appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='7' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%236B6B6B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat; background-position: right 12px center;
  padding-right: 32px; transition: border-color 0.2s;
}
.filter-select:focus { border-color: var(--crimson); background-color: var(--white); }
.filter-apply-btn {
  width: 100%; padding: 13px;
  background: var(--crimson); color: var(--white);
  font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
  letter-spacing: 0.06em; border: none; border-radius: 2px;
  cursor: pointer; margin-top: 4px; transition: background 0.25s;
}
.filter-apply-btn:hover { background: var(--crimson-d); }

/* Mobile Filter Toggle */
.mobile-filter-toggle {
  display: none;
  width: 100%; padding: 13px 20px;
  background: var(--white); border: 1.5px solid var(--border);
  border-radius: 2px; cursor: pointer;
  font-family: 'DM Sans', sans-serif; font-size: 13.5px; font-weight: 500;
  color: var(--ink); align-items: center; justify-content: space-between;
  margin-bottom: 20px;
}
.mobile-filter-toggle svg { color: var(--crimson); }

/* ── Results Area ── */
.results-header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 28px; flex-wrap: wrap; gap: 16px;
}
.results-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 28px; font-weight: 600; color: var(--ink); letter-spacing: -0.01em;
}
.results-subtitle { font-size: 13px; color: var(--ink-soft); margin-top: 4px; }
.results-subtitle strong { color: var(--crimson); }
.results-sort { display: flex; align-items: center; gap: 10px; }
.sort-label {
  font-size: 12px; color: var(--ink-soft); letter-spacing: 0.06em;
  text-transform: uppercase; white-space: nowrap;
}
.sort-select {
  font-family: 'DM Sans', sans-serif; font-size: 13px; color: var(--ink);
  background: var(--white); border: 1.5px solid var(--border);
  border-radius: 2px; padding: 9px 32px 9px 14px; outline: none;
  cursor: pointer; appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='7' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%236B6B6B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat; background-position: right 10px center;
  transition: border-color 0.2s;
}
.sort-select:focus { border-color: var(--crimson); }

/* Active Filters */
.active-filters { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
.af-chip {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 12px; font-weight: 500; color: var(--crimson);
  background: rgba(140,31,40,0.07); border: 1px solid rgba(140,31,40,0.2);
  border-radius: 2px; padding: 5px 10px; letter-spacing: 0.03em;
}
.af-chip-remove {
  background: none; border: none; cursor: pointer; color: var(--crimson);
  font-size: 14px; line-height: 1; padding: 0; opacity: 0.7;
}
.af-chip-remove:hover { opacity: 1; }

/* ── Donor Cards Grid ── */
.donors-grid {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 2px;
}

/* ── Donor Card ── */
.donor-card {
  background: var(--white); border: 1px solid var(--border);
  border-radius: 2px; overflow: hidden;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  position: relative;
}
.donor-card:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); }
.donor-card-head {
  padding: 24px 24px 0;
  display: flex; align-items: flex-start; gap: 18px;
}
.donor-avatar {
  width: 56px; height: 56px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Cormorant Garamond', serif;
  font-size: 22px; font-weight: 700; color: var(--white);
  flex-shrink: 0; position: relative;
}
.donor-avatar.av-crimson { background: var(--crimson); }
.donor-avatar.av-ink    { background: var(--ink); }
.donor-avatar.av-gold   { background: var(--gold); }
.donor-avatar.av-teal   { background: #2A7A6B; }
.donor-avatar.av-navy   { background: #1E3A5F; }
.donor-blood {
  position: absolute; bottom: -4px; right: -4px;
  width: 22px; height: 22px; border-radius: 50%;
  background: var(--crimson); border: 2px solid var(--white);
  display: flex; align-items: center; justify-content: center;
  font-size: 7px; font-weight: 700; color: var(--white);
  font-family: 'DM Sans', sans-serif; letter-spacing: 0;
}
.donor-info { flex: 1; min-width: 0; }
.donor-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 20px; font-weight: 600; color: var(--ink);
  line-height: 1.2; letter-spacing: -0.01em;
}
.donor-location {
  font-size: 12px; color: var(--ink-soft); margin-top: 3px;
  display: flex; align-items: center; gap: 5px;
}
.donor-location svg { color: var(--crimson); flex-shrink: 0; }
.donor-badges { display: flex; gap: 6px; margin-top: 8px; flex-wrap: wrap; }
.d-badge {
  font-size: 10px; font-weight: 600; letter-spacing: 0.1em;
  text-transform: uppercase; padding: 3px 8px; border-radius: 2px;
}
.d-badge-avail  { background: rgba(45,122,74,0.1); color: var(--success); }
.d-badge-verify { background: rgba(140,31,40,0.08); color: var(--crimson); }
.d-badge-soon   { background: rgba(184,146,42,0.12); color: var(--gold); }

.donor-card-body { padding: 18px 24px; }
.donor-divider { height: 1px; background: var(--cream-d); margin-bottom: 16px; }
.donor-meta-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 10px 16px;
  margin-bottom: 16px;
}
.dmi-label {
  font-size: 10px; font-weight: 600; letter-spacing: 0.12em;
  text-transform: uppercase; color: var(--ink-soft);
}
.dmi-val { font-size: 13px; font-weight: 500; color: var(--ink); margin-top: 2px; }

.donor-blood-badge {
  position: absolute; top: 20px; right: 20px;
  width: 48px; height: 48px; border-radius: 50%;
  background: rgba(140,31,40,0.07); border: 1.5px solid rgba(140,31,40,0.2);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Cormorant Garamond', serif;
  font-size: 18px; font-weight: 700; color: var(--crimson);
}
.donor-card-footer {
  padding: 0 24px 20px;
  display: flex; align-items: center; gap: 10px;
}
.dc-btn-contact {
  flex: 1; padding: 11px 16px;
  background: var(--crimson); color: var(--white);
  font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 500;
  letter-spacing: 0.05em; border: none; border-radius: 2px;
  cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;
  transition: background 0.25s;
}
.dc-btn-contact:hover { background: var(--crimson-d); }
.dc-btn-save {
  width: 40px; height: 40px; border-radius: 2px;
  background: transparent; border: 1.5px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all 0.2s; flex-shrink: 0;
}
.dc-btn-save:hover { border-color: var(--crimson); background: rgba(140,31,40,0.05); }
.dc-btn-save svg { color: var(--ink-soft); transition: color 0.2s; }
.dc-btn-save:hover svg { color: var(--crimson); }
.dc-btn-save.saved { background: rgba(140,31,40,0.08); border-color: var(--crimson); }
.dc-btn-save.saved svg { color: var(--crimson); fill: var(--crimson); }

.urgent-tag {
  position: absolute; top: 0; left: 0;
  background: var(--crimson); color: var(--white);
  font-size: 9px; font-weight: 700; letter-spacing: 0.14em;
  text-transform: uppercase; padding: 5px 12px;
  border-radius: 0 0 4px 0;
}

/* ── No Results ── */
.no-results {
  grid-column: 1 / -1;
  text-align: center; padding: 80px 40px;
  display: none;
}
.no-results.show { display: block; }
.no-results-icon {
  width: 72px; height: 72px; border-radius: 50%;
  background: rgba(140,31,40,0.08); border: 1.5px solid rgba(140,31,40,0.2);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 24px;
}
.no-results-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 28px; font-weight: 600; color: var(--ink); margin-bottom: 10px;
}
.no-results-desc {
  font-size: 14px; color: var(--ink-soft); font-weight: 300;
  line-height: 1.7; max-width: 360px; margin: 0 auto 24px;
}

/* ── Pagination ── */
.pagination {
  display: flex; align-items: center; justify-content: center;
  gap: 4px; margin-top: 48px;
}
.page-btn {
  width: 40px; height: 40px; border-radius: 2px;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 500; cursor: pointer;
  border: 1.5px solid var(--border);
  background: var(--white); color: var(--ink-mid);
  transition: all 0.2s;
}
.page-btn:hover { border-color: var(--crimson); color: var(--crimson); }
.page-btn.active { background: var(--crimson); border-color: var(--crimson); color: var(--white); }
.page-dots {
  width: 40px; height: 40px;
  display: flex; align-items: center; justify-content: center;
  color: var(--ink-soft); font-size: 16px;
}

/* ── CTA Banner ── */
.search-cta-banner {
  background: var(--crimson);
  padding: 100px 0; position: relative; overflow: hidden;
}
.search-cta-banner::before {
  content: '';
  position: absolute; inset: 0;
  background: radial-gradient(ellipse 60% 70% at 80% 50%, rgba(255,255,255,0.06) 0%, transparent 60%);
}
.search-cta-inner {
  max-width: 900px; margin: 0 auto; padding: 0 32px;
  text-align: center; position: relative; z-index: 1;
}
.search-cta-inner .tag {
  background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.2);
  color: rgba(255,255,255,0.85);
}
.search-cta-inner .tag::before { background: rgba(255,255,255,0.85); }
.search-cta-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(36px, 5vw, 60px); font-weight: 600;
  color: var(--white); line-height: 1.1;
  letter-spacing: -0.02em; margin: 20px 0 18px;
}
.search-cta-title em { font-style: italic; opacity: 0.75; }
.search-cta-desc {
  font-size: 15.5px; color: rgba(255,255,255,0.7); font-weight: 300;
  line-height: 1.8; max-width: 520px; margin: 0 auto 36px;
}
.cta-actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
.btn-cta-white {
  background: var(--white); color: var(--crimson);
  font-family: 'DM Sans', sans-serif; font-weight: 500;
  font-size: 14px; letter-spacing: 0.06em;
  padding: 15px 32px; border-radius: 2px; border: none;
  cursor: pointer; text-decoration: none;
  display: inline-flex; align-items: center; gap: 10px;
  position: relative; overflow: hidden; transition: color 0.3s;
}
.btn-cta-white::before {
  content: ''; position: absolute; inset: 0;
  background: var(--ink); transform: scaleX(0);
  transform-origin: left; transition: transform 0.35s cubic-bezier(0.77,0,0.18,1);
}
.btn-cta-white span { position: relative; z-index: 1; }
.btn-cta-white svg  { position: relative; z-index: 1; transition: transform 0.3s; }
.btn-cta-white:hover::before { transform: scaleX(1); }
.btn-cta-white:hover { color: var(--white); }
.btn-cta-white:hover svg { transform: translateX(4px); }

/* ── Contact Modal ── */
.modal-overlay {
  position: fixed; inset: 0; z-index: 1000;
  background: rgba(28,28,28,0.65);
  backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center;
  opacity: 0; pointer-events: none;
  transition: opacity 0.3s ease; padding: 32px;
}
.modal-overlay.open { opacity: 1; pointer-events: all; }
.modal {
  background: var(--white); border-radius: 2px;
  width: 100%; max-width: 480px;
  box-shadow: var(--shadow-lg);
  transform: translateY(20px); opacity: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
}
.modal-overlay.open .modal { transform: translateY(0); opacity: 1; }
.modal-head {
  padding: 28px 32px 24px;
  border-bottom: 1px solid var(--cream-d);
  background: linear-gradient(to right, rgba(140,31,40,0.04) 0%, transparent 60%);
  display: flex; align-items: flex-start; justify-content: space-between; gap: 16px;
}
.modal-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 26px; font-weight: 600; color: var(--ink);
}
.modal-subtitle { font-size: 13px; color: var(--ink-soft); margin-top: 4px; font-weight: 300; }
.modal-close {
  background: none; border: none; cursor: pointer;
  color: var(--ink-soft); font-size: 20px; padding: 4px;
  line-height: 1; transition: color 0.2s; flex-shrink: 0; margin-top: 4px;
}
.modal-close:hover { color: var(--ink); }
.modal-body { padding: 28px 32px 32px; }
.modal-donor-card {
  display: flex; align-items: center; gap: 14px;
  background: var(--cream); border: 1px solid var(--border);
  padding: 16px 18px; border-radius: 2px; margin-bottom: 24px;
}
.mdc-avatar {
  width: 44px; height: 44px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Cormorant Garamond', serif; font-size: 18px;
  font-weight: 700; color: var(--white); flex-shrink: 0;
  background: var(--crimson);
}
.mdc-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 17px; font-weight: 600; color: var(--ink);
}
.mdc-meta { font-size: 12px; color: var(--ink-soft); margin-top: 2px; }
.mdc-bt {
  margin-left: auto; font-family: 'Cormorant Garamond', serif;
  font-size: 24px; font-weight: 700; color: var(--crimson);
}
.modal-note {
  font-size: 12px; color: var(--ink-soft); line-height: 1.6;
  background: rgba(140,31,40,0.04); border-left: 2px solid var(--crimson);
  padding: 10px 14px; margin-bottom: 20px;
}
.modal-field-group { margin-bottom: 18px; }
.modal-field-label {
  font-size: 11px; font-weight: 600; letter-spacing: 0.13em;
  text-transform: uppercase; color: var(--ink-mid); margin-bottom: 7px;
  display: block;
}
.modal-field-label .req { color: var(--crimson); }
.modal-input, .modal-select, .modal-textarea {
  width: 100%; font-family: 'DM Sans', sans-serif;
  font-size: 13.5px; color: var(--ink);
  background: var(--cream); border: 1.5px solid var(--cream-d);
  border-radius: 2px; padding: 12px 14px; outline: none; appearance: none;
  transition: border-color 0.25s, background 0.25s;
}
.modal-textarea { resize: vertical; min-height: 90px; line-height: 1.6; }
.modal-input:focus, .modal-select:focus, .modal-textarea:focus {
  border-color: var(--crimson); background: var(--white);
}
.modal-submit {
  width: 100%; padding: 14px;
  background: var(--crimson); color: var(--white);
  font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
  letter-spacing: 0.06em; border: none; border-radius: 2px;
  cursor: pointer; transition: background 0.25s;
  display: flex; align-items: center; justify-content: center; gap: 8px;
}
.modal-submit:hover { background: var(--crimson-d); }

/* ── Pulse ── */
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.75); }
}
.pulse-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--success); display: inline-block;
  animation: pulse 2s infinite;
}
.pulse-dot.orange { background: var(--gold); }

/* ── Responsive ── */
@media (max-width: 1024px) {
  .search-main { grid-template-columns: 1fr; }
  .filter-sidebar { position: static; }
  .filter-panel { display: none; }
  .filter-panel.mobile-open { display: block; }
  .search-hero-stats { display: none; }
  .donors-grid { grid-template-columns: 1fr; }
  .mobile-filter-toggle { display: flex; }
}
@media (max-width: 768px) {
  .search-hero-inner { padding: 48px 24px 40px; }
  .search-main { padding: 32px 24px 80px; }
}
@media (max-width: 520px) {
  .donors-grid { grid-template-columns: 1fr; }
  .donor-blood-badge { display: none; }
}
```

---

### File 6 — `src/app/search-donors/page.tsx`

```tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import './search-donors.css'

// ─── Donor data ───────────────────────────────────────────────────────────────
const DONORS = [
  {
    id: 1, name: 'Rajesh Kumar', initials: 'R', avatar: 'av-crimson',
    location: 'Andheri West, Mumbai', blood: 'O+', avail: 'now',
    state: 'Maharashtra', verified: true, gender: 'Male', exp: 'seasoned',
    donations: '14 times', lastDonated: '4 months ago', age: '34', urgent: true,
  },
  {
    id: 2, name: 'Priya Sharma', initials: 'P', avatar: 'av-teal',
    location: 'Indiranagar, Bangalore', blood: 'A+', avail: 'now',
    state: 'Karnataka', verified: true, gender: 'Female', exp: 'moderate',
    donations: '6 times', lastDonated: '5 months ago', age: '28',
  },
  {
    id: 3, name: 'Arjun Nair', initials: 'A', avatar: 'av-ink',
    location: 'T. Nagar, Chennai', blood: 'B−', avail: 'soon',
    state: 'Tamil Nadu', verified: true, gender: 'Male', exp: 'seasoned',
    donations: '11 times', lastDonated: '3 months ago', age: '31',
  },
  {
    id: 4, name: 'Sneha Menon', initials: 'S', avatar: 'av-gold',
    location: 'Kakkanad, Kochi', blood: 'AB+', avail: 'now',
    state: 'Kerala', verified: true, gender: 'Female', exp: 'first',
    donations: '1st time', lastDonated: 'Never', age: '25',
  },
  {
    id: 5, name: 'Vikram Singh', initials: 'V', avatar: 'av-navy',
    location: 'Vasant Kunj, Delhi', blood: 'O−', avail: 'now',
    state: 'Delhi', verified: true, gender: 'Male', exp: 'seasoned',
    donations: '22 times', lastDonated: '6 months ago', age: '40',
  },
  {
    id: 6, name: 'Deepika Rao', initials: 'D', avatar: 'av-crimson',
    location: 'Banjara Hills, Hyderabad', blood: 'B+', avail: 'soon',
    state: 'Telangana', verified: true, gender: 'Female', exp: 'moderate',
    donations: '4 times', lastDonated: '7 months ago', age: '30',
  },
  {
    id: 7, name: 'Saurav Ghosh', initials: 'S', avatar: 'av-teal',
    location: 'Salt Lake, Kolkata', blood: 'A−', avail: 'now',
    state: 'West Bengal', verified: true, gender: 'Male', exp: 'seasoned',
    donations: '8 times', lastDonated: '4 months ago', age: '36',
  },
  {
    id: 8, name: 'Hardik Patel', initials: 'H', avatar: 'av-navy',
    location: 'Navrangpura, Ahmedabad', blood: 'AB−', avail: 'soon',
    state: 'Gujarat', verified: true, gender: 'Male', exp: 'moderate',
    donations: '3 times', lastDonated: '8 months ago', age: '29',
  },
  {
    id: 9, name: 'Meena Choudhary', initials: 'M', avatar: 'av-gold',
    location: 'Malviya Nagar, Jaipur', blood: 'O+', avail: 'now',
    state: 'Rajasthan', verified: true, gender: 'Female', exp: 'moderate',
    donations: '5 times', lastDonated: '4 months ago', age: '27',
  },
  {
    id: 10, name: 'Nikhil Gupta', initials: 'N', avatar: 'av-ink',
    location: 'Gomti Nagar, Lucknow', blood: 'A+', avail: 'now',
    state: 'Uttar Pradesh', verified: true, gender: 'Male', exp: 'seasoned',
    donations: '9 times', lastDonated: '5 months ago', age: '33',
  },
  {
    id: 11, name: 'Aisha Khan', initials: 'A', avatar: 'av-crimson',
    location: 'Bandra East, Mumbai', blood: 'B+', avail: 'now',
    state: 'Maharashtra', verified: true, gender: 'Female', exp: 'first',
    donations: '2 times', lastDonated: '1 year ago', age: '24',
  },
  {
    id: 12, name: 'Karthik Iyer', initials: 'K', avatar: 'av-navy',
    location: 'Koramangala, Bangalore', blood: 'O−', avail: 'soon',
    state: 'Karnataka', verified: true, gender: 'Male', exp: 'seasoned',
    donations: '16 times', lastDonated: '3 months ago', age: '38',
  },
]

type Donor = typeof DONORS[0]

// ─── Modal ────────────────────────────────────────────────────────────────────
function ContactModal({
  donor, onClose,
}: {
  donor: Donor | null
  onClose: () => void
}) {
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (donor) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [donor])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const handleSubmit = () => {
    setSubmitted(true)
    setTimeout(() => { setSubmitted(false); onClose() }, 2000)
  }

  return (
    <div
      className={`modal-overlay ${donor ? 'open' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="modal">
        <div className="modal-head">
          <div>
            <div className="modal-title">Contact Donor</div>
            <div className="modal-subtitle">Your message is routed securely — contact details remain private.</div>
          </div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        {donor && (
          <div className="modal-body">
            <div className="modal-donor-card">
              <div className="mdc-avatar">{donor.initials}</div>
              <div>
                <div className="mdc-name">{donor.name}</div>
                <div className="mdc-meta">{donor.location}</div>
              </div>
              <div className="mdc-bt">{donor.blood}</div>
            </div>
            <div className="modal-note">
              🔒 Blood Circle never shares donor phone numbers or addresses. Requests are reviewed and forwarded by our team.
            </div>
            <div className="modal-field-group">
              <label className="modal-field-label">Your Name <span className="req">*</span></label>
              <input className="modal-input" type="text" placeholder="Full name" />
            </div>
            <div className="modal-field-group">
              <label className="modal-field-label">Your Phone <span className="req">*</span></label>
              <input className="modal-input" type="tel" placeholder="+91 00000 00000" />
            </div>
            <div className="modal-field-group">
              <label className="modal-field-label">Urgency Level <span className="req">*</span></label>
              <select className="modal-select">
                <option value="">Select urgency</option>
                <option>Emergency (within 4 hours)</option>
                <option>Urgent (within 24 hours)</option>
                <option>Planned (within a week)</option>
              </select>
            </div>
            <div className="modal-field-group">
              <label className="modal-field-label">Message</label>
              <textarea
                className="modal-textarea"
                placeholder="Briefly describe the need — hospital name, patient condition, location..."
              />
            </div>
            <button
              className="modal-submit"
              onClick={handleSubmit}
              style={submitted ? { background: '#2D7A4A' } : {}}
            >
              {submitted ? (
                <span>✓ Request Sent!</span>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7h12M7 1l6 6-6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Send Request to Donor
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Donor Card ───────────────────────────────────────────────────────────────
function DonorCard({ donor, onContact }: { donor: Donor; onContact: (d: Donor) => void }) {
  const [saved, setSaved] = useState(false)
  const availBadge = donor.avail === 'now'
    ? <span className="d-badge d-badge-avail"><span className="pulse-dot" style={{width:5,height:5,marginRight:4}}></span>Available Now</span>
    : <span className="d-badge d-badge-soon"><span className="pulse-dot orange" style={{width:5,height:5,marginRight:4}}></span>Available Soon</span>

  return (
    <div
      className="donor-card reveal"
      data-blood={donor.blood}
      data-avail={donor.avail}
      data-state={donor.state}
      data-verified={String(donor.verified)}
      data-gender={donor.gender}
      data-exp={donor.exp}
    >
      {donor.urgent && <div className="urgent-tag">Urgent Match</div>}
      <div className="donor-blood-badge">{donor.blood}</div>

      <div className="donor-card-head">
        <div className="donor-avatar" style={donor.urgent ? {marginTop:28} : {}} className={`donor-avatar ${donor.avatar}`}>
          {donor.initials}
          <div className="donor-blood" style={{fontSize: donor.blood.length > 2 ? 6 : undefined}}>
            {donor.blood}
          </div>
        </div>
        <div className="donor-info" style={donor.urgent ? {marginTop:28} : {}}>
          <div className="donor-name">{donor.name}</div>
          <div className="donor-location">
            <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
              <path d="M8 1.5C5.5 1.5 3.5 3.7 3.5 6.5c0 3.7 4.5 8 4.5 8s4.5-4.3 4.5-8c0-2.8-2-5-4.5-5z" stroke="currentColor" strokeWidth="1.3"/>
              <circle cx="8" cy="6.5" r="1.5" fill="currentColor"/>
            </svg>
            {donor.location}
          </div>
          <div className="donor-badges">
            {availBadge}
            {donor.verified && <span className="d-badge d-badge-verify">✓ Verified</span>}
          </div>
        </div>
      </div>

      <div className="donor-card-body">
        <div className="donor-divider"></div>
        <div className="donor-meta-grid">
          <div className="donor-meta-item">
            <div className="dmi-label">Blood Type</div>
            <div className="dmi-val">{donor.blood}</div>
          </div>
          <div className="donor-meta-item">
            <div className="dmi-label">Donations</div>
            <div className="dmi-val">{donor.donations}</div>
          </div>
          <div className="donor-meta-item">
            <div className="dmi-label">Last Donated</div>
            <div className="dmi-val">{donor.lastDonated}</div>
          </div>
          <div className="donor-meta-item">
            <div className="dmi-label">Age / Gender</div>
            <div className="dmi-val">{donor.age} · {donor.gender}</div>
          </div>
        </div>
      </div>

      <div className="donor-card-footer">
        <button className="dc-btn-contact" onClick={() => onContact(donor)}>
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path d="M13 10.5c-1.4 0-2.7-.2-3.9-.6-.3-.1-.7 0-.9.3l-1.2 1.5c-2-1-3.7-2.7-4.7-4.7l1.5-1.3c.3-.2.4-.6.3-.9C3.7 3.7 3.5 2.4 3.5 1c0-.3-.2-.5-.5-.5H1C.7.5.5.7.5 1 .5 9 7 15.5 14.5 15.5c.3 0 .5-.2.5-.5V11c0-.3-.2-.5-.5-.5h-2z" stroke="white" strokeWidth="1.2"/>
          </svg>
          Contact Donor
        </button>
        <button
          className={`dc-btn-save ${saved ? 'saved' : ''}`}
          onClick={() => setSaved(s => !s)}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 13.5S1.5 9.5 1.5 5.5A3.5 3.5 0 018 3a3.5 3.5 0 016.5 2.5C14.5 9.5 8 13.5 8 13.5z" stroke="currentColor" strokeWidth="1.3"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function SearchDonors() {
  const [qsCity, setQsCity]   = useState('')
  const [qsBlood, setQsBlood] = useState('')
  const [qsState, setQsState] = useState('')

  const [btFilter, setBtFilter]         = useState('')
  const [stateFilter, setStateFilter]   = useState('')
  const [genderFilter, setGenderFilter] = useState('')
  const [availNow, setAvailNow]   = useState(true)
  const [availSoon, setAvailSoon] = useState(true)
  const [availLater, setAvailLater] = useState(false)
  const [verifiedOnly, setVerifiedOnly] = useState(true)

  const [activePage, setActivePage] = useState(1)
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const [modalDonor, setModalDonor] = useState<Donor | null>(null)

  // Counter animation
  const cnt1Ref = useRef<HTMLSpanElement>(null)
  const cnt2Ref = useRef<HTMLSpanElement>(null)
  const cnt3Ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const animate = (el: HTMLSpanElement | null, target: number) => {
      if (!el) return
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
    }
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        animate(cnt1Ref.current, 12400)
        animate(cnt2Ref.current, 280)
        animate(cnt3Ref.current, 98)
        obs.disconnect()
      }
    }, { threshold: 0.5 })
    if (cnt1Ref.current) obs.observe(cnt1Ref.current)
    return () => obs.disconnect()
  }, [])

  // Filter logic
  const visibleDonors = DONORS.filter(d => {
    if (btFilter && d.blood !== btFilter) return false
    if (stateFilter && d.state !== stateFilter) return false
    if (genderFilter && d.gender !== genderFilter) return false
    if (verifiedOnly && !d.verified) return false
    if (qsBlood && d.blood !== qsBlood) return false
    if (qsState && d.state !== qsState) return false
    if (qsCity && !d.location.toLowerCase().includes(qsCity.toLowerCase())) return false
    const availMatch =
      (availNow && d.avail === 'now') ||
      (availSoon && d.avail === 'soon') ||
      (availLater && d.avail === 'later')
    if (!availMatch) return false
    return true
  })

  const clearFilters = () => {
    setBtFilter(''); setStateFilter(''); setGenderFilter('')
    setAvailNow(true); setAvailSoon(true); setAvailLater(false)
    setVerifiedOnly(true)
    setQsCity(''); setQsBlood(''); setQsState('')
  }

  const BLOOD_TYPES = ['A+', 'A−', 'B+', 'B−', 'AB+', 'AB−', 'O+', 'O−']
  const STATES = ['Maharashtra', 'Karnataka', 'Tamil Nadu', 'Kerala', 'Delhi', 'Telangana', 'West Bengal', 'Gujarat', 'Rajasthan', 'Uttar Pradesh']

  return (
    <>
      {/* ── Hero ── */}
      <section className="search-hero">
        <div className="search-hero-pattern">
          <svg viewBox="0 0 600 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="300" cy="400" r="280" stroke="#8C1F28" strokeWidth="1"/>
            <circle cx="300" cy="400" r="200" stroke="#8C1F28" strokeWidth="1"/>
            <circle cx="300" cy="400" r="120" stroke="#8C1F28" strokeWidth="1"/>
            <circle cx="300" cy="400" r="40"  stroke="#8C1F28" strokeWidth="1"/>
            <line x1="300" y1="0" x2="300" y2="800" stroke="#8C1F28" strokeWidth="0.5"/>
            <line x1="0" y1="400" x2="600" y2="400" stroke="#8C1F28" strokeWidth="0.5"/>
          </svg>
        </div>
        <div className="search-hero-inner">
          <div className="search-hero-left reveal">
            <div className="search-hero-badge"><span className="tag">Verified Donor Network</span></div>
            <h1 className="search-hero-title">
              Find a Donor,<br/><em>Save a Life Today.</em>
            </h1>
            <p className="search-hero-desc">
              Search across thousands of verified blood donors in your area. Filter by blood type, location, and availability — and connect within minutes.
            </p>
            <div className="search-hero-pills">
              <span className="hero-pill">
                <svg viewBox="0 0 16 16" fill="none"><path d="M8 1.5C5.5 1.5 3.5 3.7 3.5 6.5c0 3.7 4.5 8 4.5 8s4.5-4.3 4.5-8c0-2.8-2-5-4.5-5z" stroke="currentColor" strokeWidth="1.3"/><circle cx="8" cy="6.5" r="1.5" fill="currentColor"/></svg>
                All Major Cities
              </span>
              <span className="hero-pill">
                <svg viewBox="0 0 16 16" fill="none"><path d="M8 2a6 6 0 100 12A6 6 0 008 2zm0 0v6l3 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Real-Time Availability
              </span>
              <span className="hero-pill">
                <svg viewBox="0 0 16 16" fill="none"><path d="M13 5l-6 6-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                ID-Verified Donors
              </span>
              <span className="hero-pill">
                <svg viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.3"/><path d="M5 8h6M8 5v6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                All 8 Blood Types
              </span>
            </div>
          </div>

          <div className="search-hero-stats reveal">
            <div className="sh-stat">
              <div className="sh-stat-num"><span ref={cnt1Ref}>0</span><span style={{color:'var(--crimson)'}}>+</span></div>
              <div className="sh-stat-label">Active Donors</div>
            </div>
            <div className="sh-stat">
              <div className="sh-stat-num"><span ref={cnt2Ref}>0</span><span style={{color:'var(--crimson)'}}>+</span></div>
              <div className="sh-stat-label">Cities Covered</div>
            </div>
            <div className="sh-stat">
              <div className="sh-stat-num"><span ref={cnt3Ref}>0</span><span style={{color:'var(--crimson)'}}>%</span></div>
              <div className="sh-stat-label">Verified Profiles</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick Search Bar ── */}
      <div className="quick-search-wrap">
        <div className="quick-search-inner">
          <span className="qs-label">Find Donors</span>
          <div className="qs-divider"></div>
          <div className="qs-field">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M8 1.5C5.5 1.5 3.5 3.7 3.5 6.5c0 3.7 4.5 8 4.5 8s4.5-4.3 4.5-8c0-2.8-2-5-4.5-5z" stroke="currentColor" strokeWidth="1.3"/>
              <circle cx="8" cy="6.5" r="1.5" fill="currentColor"/>
            </svg>
            <input
              className="qs-input" type="text" placeholder="City or area..."
              value={qsCity} onChange={e => setQsCity(e.target.value)}
            />
          </div>
          <div className="qs-divider"></div>
          <div className="qs-field">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M8 5v3l2 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            <select className="qs-select" value={qsBlood} onChange={e => setQsBlood(e.target.value)}>
              <option value="">Any Blood Type</option>
              {BLOOD_TYPES.map(bt => <option key={bt}>{bt}</option>)}
            </select>
          </div>
          <div className="qs-divider"></div>
          <div className="qs-field">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            <select className="qs-select" value={qsState} onChange={e => setQsState(e.target.value)}>
              <option value="">Any State</option>
              {STATES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <button className="qs-btn">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4"/>
              <path d="M10.5 10.5l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            Search
          </button>
          <div className="qs-results-count">
            Showing <strong>{visibleDonors.length}</strong> donors
          </div>
        </div>
      </div>

      {/* ── Emergency Strip ── */}
      <div className="emergency-strip">
        <div className="emergency-inner">
          <div className="emerg-left">
            <div className="emerg-icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 3v14M3 10h14" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <div className="emerg-text-title">Need Blood Urgently?</div>
              <div className="emerg-text-sub">Post an emergency request and get notified within minutes.</div>
            </div>
          </div>
          <button className="emerg-btn">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Post Emergency Request
          </button>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="search-main">

        {/* ── Filter Sidebar ── */}
        <aside className="filter-sidebar">
          <button
            className="mobile-filter-toggle"
            onClick={() => setMobileFilterOpen(o => !o)}
          >
            <span>
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" style={{display:'inline',verticalAlign:'middle',marginRight:6}}>
                <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              Filters
            </span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{transform: mobileFilterOpen ? 'rotate(180deg)' : ''}}>
              <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className={`filter-panel reveal ${mobileFilterOpen ? 'mobile-open' : ''}`}>
            <div className="filter-head">
              <div className="filter-head-title">Filters</div>
              <button className="filter-clear" onClick={clearFilters}>Clear All</button>
            </div>

            {/* Blood Type */}
            <div className="filter-section">
              <div className="filter-section-title">Blood Type</div>
              <div className="bt-filter-grid">
                <input type="radio" name="btFilter" id="bt-all" value="" className="bt-f-opt"
                  checked={btFilter === ''} onChange={() => setBtFilter('')} />
                <label htmlFor="bt-all" className="bt-f-label">
                  <span className="bt-f-type" style={{fontSize:13,fontFamily:'DM Sans,sans-serif',fontWeight:600}}>All</span>
                </label>
                {BLOOD_TYPES.map(bt => (
                  <div key={bt}>
                    <input type="radio" name="btFilter" id={`bt-${bt}`} value={bt} className="bt-f-opt"
                      checked={btFilter === bt} onChange={() => setBtFilter(bt)} />
                    <label htmlFor={`bt-${bt}`} className="bt-f-label">
                      <span className="bt-f-type">{bt}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* State */}
            <div className="filter-section">
              <div className="filter-section-title">State</div>
              <select className="filter-select" value={stateFilter} onChange={e => setStateFilter(e.target.value)}>
                <option value="">All States</option>
                {STATES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>

            {/* Availability */}
            <div className="filter-section">
              <div className="filter-section-title">Availability</div>
              <div className="filter-check-list">
                <label className="filter-check-item">
                  <input type="checkbox" checked={availNow} onChange={e => setAvailNow(e.target.checked)} />
                  <div className="fc-box"></div>
                  <span className="fc-label">Available Now</span>
                  <span className="fc-count">8</span>
                </label>
                <label className="filter-check-item">
                  <input type="checkbox" checked={availSoon} onChange={e => setAvailSoon(e.target.checked)} />
                  <div className="fc-box"></div>
                  <span className="fc-label">Available Soon</span>
                  <span className="fc-count">4</span>
                </label>
                <label className="filter-check-item">
                  <input type="checkbox" checked={availLater} onChange={e => setAvailLater(e.target.checked)} />
                  <div className="fc-box"></div>
                  <span className="fc-label">On Request Only</span>
                  <span className="fc-count">12</span>
                </label>
              </div>
            </div>

            {/* Gender */}
            <div className="filter-section">
              <div className="filter-section-title">Gender</div>
              <select className="filter-select" value={genderFilter} onChange={e => setGenderFilter(e.target.value)}>
                <option value="">Any Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            {/* Verification */}
            <div className="filter-section">
              <div className="filter-section-title">Verification</div>
              <label className="filter-check-item">
                <input type="checkbox" checked={verifiedOnly} onChange={e => setVerifiedOnly(e.target.checked)} />
                <div className="fc-box"></div>
                <span className="fc-label">Verified Only</span>
              </label>
            </div>

            <div style={{padding:'16px 24px 20px'}}>
              <button className="filter-apply-btn">Apply Filters</button>
            </div>
          </div>
        </aside>

        {/* ── Results ── */}
        <div className="results-area">
          <div className="results-header reveal">
            <div>
              <h2 className="results-title">Blood Donors</h2>
              <p className="results-subtitle">
                Showing <strong>{visibleDonors.length}</strong> verified donors · Updated just now
              </p>
            </div>
            <div className="results-sort">
              <span className="sort-label">Sort by</span>
              <select className="sort-select">
                <option>Nearest First</option>
                <option>Most Donations</option>
                <option>Recently Active</option>
                <option>Urgency Match</option>
              </select>
            </div>
          </div>

          {/* Active filter chips */}
          <div className="active-filters">
            {verifiedOnly && (
              <div className="af-chip">
                <span>Verified Only</span>
                <button className="af-chip-remove" onClick={() => setVerifiedOnly(false)}>×</button>
              </div>
            )}
            {(availNow || availSoon) && (
              <div className="af-chip">
                <span>Available Now / Soon</span>
                <button className="af-chip-remove" onClick={() => { setAvailNow(false); setAvailSoon(false) }}>×</button>
              </div>
            )}
            {btFilter && (
              <div className="af-chip">
                <span>Blood Type: {btFilter}</span>
                <button className="af-chip-remove" onClick={() => setBtFilter('')}>×</button>
              </div>
            )}
            {stateFilter && (
              <div className="af-chip">
                <span>State: {stateFilter}</span>
                <button className="af-chip-remove" onClick={() => setStateFilter('')}>×</button>
              </div>
            )}
          </div>

          {/* Donor Grid */}
          <div className="donors-grid">
            {visibleDonors.map(donor => (
              <DonorCard key={donor.id} donor={donor} onContact={setModalDonor} />
            ))}

            {visibleDonors.length === 0 && (
              <div className="no-results show">
                <div className="no-results-icon">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <circle cx="13" cy="13" r="8" stroke="#8C1F28" strokeWidth="1.5"/>
                    <path d="M20 20l5 5" stroke="#8C1F28" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M10 13h6M13 10v6" stroke="#8C1F28" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="no-results-title">No Donors Found</div>
                <p className="no-results-desc">
                  No donors match your current filters. Try broadening your search criteria or clearing some filters.
                </p>
                <button className="btn btn-ghost" onClick={clearFilters} style={{margin:'0 auto',display:'inline-flex'}}>
                  <span>Clear All Filters</span>
                </button>
              </div>
            )}
          </div>

          {/* Pagination */}
          {visibleDonors.length > 0 && (
            <div className="pagination">
              <button className="page-btn">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M7 2L3 6l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {[1,2,3].map(p => (
                <button key={p} className={`page-btn ${activePage === p ? 'active' : ''}`} onClick={() => setActivePage(p)}>
                  {p}
                </button>
              ))}
              <span className="page-dots">···</span>
              <button className="page-btn" onClick={() => setActivePage(12)}>12</button>
              <button className="page-btn">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M5 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── CTA Banner ── */}
      <section className="search-cta-banner">
        <div className="search-cta-inner reveal">
          <span className="tag">Join the Circle</span>
          <h2 className="search-cta-title">One Pint. <em>Three Lives.</em><br/>Your Call.</h2>
          <p className="search-cta-desc">
            Hundreds of patients search for donors every single day. The decision to register takes two minutes. The impact lasts forever.
          </p>
          <div className="cta-actions">
            <a href="/become-donor" className="btn-cta-white">
              <span>Register as Donor</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#" className="btn" style={{background:'rgba(255,255,255,0.1)',color:'white',border:'1px solid rgba(255,255,255,0.3)'}}>
              <span>Post Emergency Request</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Contact Modal ── */}
      <ContactModal donor={modalDonor} onClose={() => setModalDonor(null)} />
    </>
  )
}
```

---

### File 7 — `src/app/page.tsx` (updated — remove duplicate nav/footer/loader/cursor)

Replace the entire file content. The only change is removing the `<nav>`, mobile menu, `#page-loader`, cursor divs, and `<footer>` blocks since they now live in `layout.tsx`. Also remove the `useRef` for nav/toggle since `Navbar.tsx` handles that internally.

```tsx
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
```

---

### File 8 — `src/app/become-donor/page.tsx` (updated — strip duplicate nav/footer/loader/cursor)

Only the beginning and end of the file need to change. Remove everything inside the outer `<div className="donor-page">` that duplicates what layout.tsx now provides — specifically the `#page-loader` div, `#cursor-dot`, `#cursor-ring`, the `<nav>` block, `<div className="mobile-menu">`, and `<footer>`. Also remove the `navRef`, `navToggleRef`, `mobileMenuRef` refs and the `toggleMobileMenu` function, since `Navbar.tsx` handles that. The `useEffect` cursor/loader/scroll code inside the component can also be removed since `ClientShell.tsx` handles it globally.

The component's return should start directly at the hero:

```tsx
'use client'

import { useState } from 'react'
import './become-donor.css'

export default function BecomeDonor() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', dob: '', gender: '', weight: '',
    bloodType: '', idType: '', idNumber: '', email: '', phone: '',
    whatsapp: '', altPhone: '', address: '', city: '', state: '',
    pincode: '', emergencyName: '', emergencyPhone: '', emergencyRelation: '',
    lastDonated: '', totalDonations: '', availability: '', frequency: '',
    donationType: '', travelDistance: '5', preferredTime: 'any',
    availNotes: '', medNotes: '', medications: '',
    idUpload: null as File | null,
    profilePhoto: null as File | null,
  })
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [donorId, setDonorId] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value, name, type } = e.target as HTMLInputElement
    if (type === 'radio') setFormData(prev => ({ ...prev, [name]: value }))
    else setFormData(prev => ({ ...prev, [id]: value }))
    if (errors[id || name]) setErrors(prev => ({ ...prev, [id || name]: false }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, files } = e.target
    if (files?.[0]) {
      setFormData(prev => ({ ...prev, [id]: files[0] }))
      setErrors(prev => ({ ...prev, [id]: false }))
    }
  }

  const validateStep = (n: number) => {
    const newErrors: Record<string, boolean> = {}
    if (n === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = true
      if (!formData.lastName.trim())  newErrors.lastName  = true
      if (!formData.dob) { newErrors.dob = true } else {
        const age = (Date.now() - new Date(formData.dob).getTime()) / (365.25 * 24 * 3600 * 1000)
        if (age < 18 || age > 65) newErrors.dob = true
      }
      if (!formData.gender) newErrors.gender = true
      if (!formData.weight || parseInt(formData.weight) < 45) newErrors.weight = true
      if (!formData.bloodType)  newErrors.bloodType = true
      if (!formData.idType)     newErrors.idType    = true
      if (!formData.idNumber.trim()) newErrors.idNumber = true
    } else if (n === 2) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = true
      if (!formData.phone.trim())            newErrors.phone            = true
      if (!formData.address.trim())          newErrors.address          = true
      if (!formData.city.trim())             newErrors.city             = true
      if (!formData.state)                   newErrors.state            = true
      if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode          = true
      if (!formData.emergencyName.trim())    newErrors.emergencyName    = true
      if (!formData.emergencyPhone.trim())   newErrors.emergencyPhone   = true
      if (!formData.emergencyRelation)       newErrors.emergencyRelation = true
    } else if (n === 4) {
      if (!formData.availability) newErrors.availability = true
      if (!formData.frequency)    newErrors.frequency    = true
    } else if (n === 5) {
      if (!formData.idUpload) newErrors.idUpload = true
      const ids = ['consentInfo','consentShare','consentHealth','consentTerms']
      const allChecked = ids.every(id => (document.getElementById(id) as HTMLInputElement)?.checked)
      if (!allChecked) newErrors.consent = true
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const goNext = (n: number) => {
    if (validateStep(n)) { setCurrentStep(n + 1); window.scrollTo({top:0,behavior:'smooth'}) }
  }
  const goPrev = (n: number) => { setCurrentStep(n - 1); window.scrollTo({top:0,behavior:'smooth'}) }

  const submitForm = () => {
    if (validateStep(5)) {
      setTimeout(() => {
        setDonorId('BC-2025-' + Math.floor(10000 + Math.random() * 90000))
        setIsSubmitted(true)
        window.scrollTo({top:0,behavior:'smooth'})
      }, 1800)
    }
  }

  return (
    <div className="donor-page">
      {/* ── PAGE HERO ── */}
      <div className="reg-hero">
        <div className="reg-hero-pattern">
          <svg viewBox="0 0 600 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#8C1F28" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)"/>
            <circle cx="300" cy="250" r="200" fill="none" stroke="#8C1F28" strokeWidth="1"/>
            <circle cx="300" cy="250" r="130" fill="none" stroke="#8C1F28" strokeWidth="1"/>
          </svg>
        </div>
        <div className="reg-hero-inner">
          <div className="reg-hero-left reveal">
            <div className="reg-hero-badge"><span className="tag">Donor Registration</span></div>
            <h1 className="reg-hero-title">Join the Circle.<br/><em>Save a Life.</em></h1>
            <p className="reg-hero-desc">
              Complete your donor profile in under 5 minutes. Your details are safe, private,
              and only shared with verified recipients in genuine emergencies.
            </p>
            <div className="reg-hero-pills">
              <span className="reg-pill">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Verified & Secure
              </span>
              <span className="reg-pill">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                5 Min Setup
              </span>
              <span className="reg-pill">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                48,200+ Donors
              </span>
              <span className="reg-pill">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                Free Forever
              </span>
            </div>
          </div>
          <div className="reg-hero-right reveal">
            <div className="reg-step-indicators">
              {[1,2,3,4,5].map(s => (
                <div key={s} className="rsi-item">
                  <div className={`rsi-bar ${currentStep === s ? 'active' : currentStep > s ? 'done' : ''}`}></div>
                  <div className="rsi-num">0{s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── PROGRESS BAR ── */}
      {!isSubmitted && (
        <div className="reg-progress-wrap">
          <div className="reg-progress">
            {[
              {n:1,l:'Personal Info'},
              {n:2,l:'Contact Details'},
              {n:3,l:'Medical History'},
              {n:4,l:'Availability'},
              {n:5,l:'Verification'},
            ].map((s,i) => (
              <div key={s.n} style={{display:'flex',alignItems:'center'}}>
                <div className={`prog-step ${currentStep===s.n?'active':currentStep>s.n?'done':''}`}>
                  <div className="prog-step-num"><span className="step-n">{s.n}</span></div>
                  <div className="prog-step-label">{s.l}</div>
                </div>
                {i < 4 && <div className="prog-connector"></div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── MAIN ── */}
      <div className="reg-main container">
        <div className="form-panel">
          {!isSubmitted ? (
            <>
              {/* STEP 1 */}
              <div className={`form-section ${currentStep===1?'active':''}`}>
                <div className="section-head">
                  <div className="section-head-tag"><span className="tag">Step 01 of 05</span></div>
                  <h2 className="section-head-title">Personal <em>Information</em></h2>
                  <p className="section-head-desc">Tell us about yourself. This helps recipients find compatible donors quickly.</p>
                </div>
                <div className="form-body">
                  <div className="field-row">
                    <div className="field-group">
                      <label className="field-label" htmlFor="firstName">First Name <span className="req">*</span></label>
                      <input className={`field-input ${errors.firstName?'error':''}`} type="text" id="firstName" placeholder="Aryan" value={formData.firstName} onChange={handleInputChange}/>
                      <span className={`field-error ${errors.firstName?'show':''}`}>Please enter your first name.</span>
                    </div>
                    <div className="field-group">
                      <label className="field-label" htmlFor="lastName">Last Name <span className="req">*</span></label>
                      <input className={`field-input ${errors.lastName?'error':''}`} type="text" id="lastName" placeholder="Mehta" value={formData.lastName} onChange={handleInputChange}/>
                      <span className={`field-error ${errors.lastName?'show':''}`}>Please enter your last name.</span>
                    </div>
                  </div>
                  <div className="field-row three">
                    <div className="field-group">
                      <label className="field-label" htmlFor="dob">Date of Birth <span className="req">*</span></label>
                      <input className={`field-input ${errors.dob?'error':''}`} type="date" id="dob" value={formData.dob} onChange={handleInputChange}/>
                      <span className={`field-error ${errors.dob?'show':''}`}>Must be 18–65 years old.</span>
                    </div>
                    <div className="field-group">
                      <label className="field-label" htmlFor="gender">Gender <span className="req">*</span></label>
                      <select className={`field-select ${errors.gender?'error':''}`} id="gender" value={formData.gender} onChange={handleInputChange}>
                        <option value="">Select gender</option>
                        <option>Male</option><option>Female</option>
                        <option>Non-binary</option><option>Prefer not to say</option>
                      </select>
                      <span className={`field-error ${errors.gender?'show':''}`}>Please select your gender.</span>
                    </div>
                    <div className="field-group">
                      <label className="field-label" htmlFor="weight">Weight (kg) <span className="req">*</span></label>
                      <input className={`field-input ${errors.weight?'error':''}`} type="number" id="weight" placeholder="70" value={formData.weight} onChange={handleInputChange}/>
                      <div className="field-hint">Minimum 45 kg required</div>
                      <span className={`field-error ${errors.weight?'show':''}`}>Minimum weight is 45 kg.</span>
                    </div>
                  </div>

                  <div className="field-divider"><div className="field-divider-line"></div><div className="field-divider-text">Blood Type</div><div className="field-divider-line"></div></div>

                  <div className="field-group">
                    <label className="field-label">Your Blood Group <span className="req">*</span></label>
                    <div className="blood-type-grid">
                      {['A+','A−','B+','B−','AB+','AB−','O+','O−'].map(bt => (
                        <div key={bt}>
                          <input className="bt-option" type="radio" name="bloodType" id={`bt${bt.replace('+','Pos').replace('−','Neg')}`} value={bt} checked={formData.bloodType===bt} onChange={handleInputChange}/>
                          <label className="bt-label" htmlFor={`bt${bt.replace('+','Pos').replace('−','Neg')}`}>
                            <span className="bt-label-type">{bt}</span>
                            <span className="bt-label-sub">{bt.includes('+') ? 'Pos' : 'Neg'}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                    <span className={`field-error ${errors.bloodType?'show':''}`}>Please select your blood group.</span>
                  </div>

                  <div className="field-divider" style={{marginTop:28}}><div className="field-divider-line"></div><div className="field-divider-text">Government ID</div><div className="field-divider-line"></div></div>

                  <div className="field-row">
                    <div className="field-group">
                      <label className="field-label" htmlFor="idType">ID Type <span className="req">*</span></label>
                      <select className={`field-select ${errors.idType?'error':''}`} id="idType" value={formData.idType} onChange={handleInputChange}>
                        <option value="">Select ID type</option>
                        <option>Aadhaar Card</option><option>PAN Card</option>
                        <option>Voter ID</option><option>Passport</option><option>Driving Licence</option>
                      </select>
                      <span className={`field-error ${errors.idType?'show':''}`}>Please select an ID type.</span>
                    </div>
                    <div className="field-group">
                      <label className="field-label" htmlFor="idNumber">ID Number <span className="req">*</span></label>
                      <input className={`field-input ${errors.idNumber?'error':''}`} type="text" id="idNumber" placeholder="XXXX XXXX XXXX" value={formData.idNumber} onChange={handleInputChange}/>
                      <div className="field-hint">Used for identity verification only</div>
                      <span className={`field-error ${errors.idNumber?'show':''}`}>Please enter a valid ID number.</span>
                    </div>
                  </div>
                </div>
                <div className="form-actions">
                  <span className="step-counter">Step <strong>1</strong> of 5</span>
                  <button className="btn-next" onClick={() => goNext(1)}>
                    <span>Continue</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
              </div>

              {/* STEP 2 */}
              <div className={`form-section ${currentStep===2?'active':''}`}>
                <div className="section-head">
                  <div className="section-head-tag"><span className="tag">Step 02 of 05</span></div>
                  <h2 className="section-head-title">Contact <em>Details</em></h2>
                  <p className="section-head-desc">Your contact details are never publicly visible. They're only shared through our secure messaging layer.</p>
                </div>
                <div className="form-body">
                  <div className="field-row">
                    <div className="field-group">
                      <label className="field-label" htmlFor="email">Email Address <span className="req">*</span></label>
                      <input className={`field-input ${errors.email?'error':''}`} type="email" id="email" placeholder="aryan@example.com" value={formData.email} onChange={handleInputChange}/>
                      <span className={`field-error ${errors.email?'show':''}`}>Please enter a valid email.</span>
                    </div>
                    <div className="field-group">
                      <label className="field-label" htmlFor="phone">Phone Number <span className="req">*</span></label>
                      <input className={`field-input ${errors.phone?'error':''}`} type="tel" id="phone" placeholder="+91 98765 43210" value={formData.phone} onChange={handleInputChange}/>
                      <span className={`field-error ${errors.phone?'show':''}`}>Please enter a valid phone.</span>
                    </div>
                  </div>
                  <div className="field-row">
                    <div className="field-group">
                      <label className="field-label" htmlFor="whatsapp">WhatsApp Number</label>
                      <input className="field-input" type="tel" id="whatsapp" placeholder="Same as phone" value={formData.whatsapp} onChange={handleInputChange}/>
                    </div>
                    <div className="field-group">
                      <label className="field-label" htmlFor="altPhone">Alternate Contact</label>
                      <input className="field-input" type="tel" id="altPhone" placeholder="+91 XXXXX XXXXX" value={formData.altPhone} onChange={handleInputChange}/>
                    </div>
                  </div>

                  <div className="field-divider"><div className="field-divider-line"></div><div className="field-divider-text">Address</div><div className="field-divider-line"></div></div>

                  <div className="field-row full">
                    <div className="field-group">
                      <label className="field-label" htmlFor="address">Street Address <span className="req">*</span></label>
                      <input className={`field-input ${errors.address?'error':''}`} type="text" id="address" placeholder="House No., Street, Area" value={formData.address} onChange={handleInputChange}/>
                      <span className={`field-error ${errors.address?'show':''}`}>Please enter your address.</span>
                    </div>
                  </div>
                  <div className="field-row three">
                    <div className="field-group">
                      <label className="field-label" htmlFor="city">City <span className="req">*</span></label>
                      <input className={`field-input ${errors.city?'error':''}`} type="text" id="city" placeholder="Mumbai" value={formData.city} onChange={handleInputChange}/>
                      <span className={`field-error ${errors.city?'show':''}`}>Please enter your city.</span>
                    </div>
                    <div className="field-group">
                      <label className="field-label" htmlFor="state">State <span className="req">*</span></label>
                      <select className={`field-select ${errors.state?'error':''}`} id="state" value={formData.state} onChange={handleInputChange}>
                        <option value="">Select state</option>
                        {['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Delhi','Jammu & Kashmir','Ladakh','Chandigarh','Puducherry'].map(s => <option key={s}>{s}</option>)}
                      </select>
                      <span className={`field-error ${errors.state?'show':''}`}>Please select your state.</span>
                    </div>
                    <div className="field-group">
                      <label className="field-label" htmlFor="pincode">Pincode <span className="req">*</span></label>
                      <input className={`field-input ${errors.pincode?'error':''}`} type="text" id="pincode" placeholder="400001" maxLength={6} value={formData.pincode} onChange={handleInputChange}/>
                      <span className={`field-error ${errors.pincode?'show':''}`}>Enter a valid 6-digit pincode.</span>
                    </div>
                  </div>

                  <div className="field-divider"><div className="field-divider-line"></div><div className="field-divider-text">Emergency Contact</div><div className="field-divider-line"></div></div>

                  <div className="field-row">
                    <div className="field-group">
                      <label className="field-label" htmlFor="emergencyName">Contact Name <span className="req">*</span></label>
                      <input className={`field-input ${errors.emergencyName?'error':''}`} type="text" id="emergencyName" placeholder="Full name" value={formData.emergencyName} onChange={handleInputChange}/>
                      <span className={`field-error ${errors.emergencyName?'show':''}`}>Please enter emergency contact name.</span>
                    </div>
                    <div className="field-group">
                      <label className="field-label" htmlFor="emergencyPhone">Contact Phone <span className="req">*</span></label>
                      <input className={`field-input ${errors.emergencyPhone?'error':''}`} type="tel" id="emergencyPhone" placeholder="+91 XXXXX XXXXX" value={formData.emergencyPhone} onChange={handleInputChange}/>
                      <span className={`field-error ${errors.emergencyPhone?'show':''}`}>Please enter emergency contact phone.</span>
                    </div>
                  </div>
                  <div className="field-row">
                    <div className="field-group">
                      <label className="field-label" htmlFor="emergencyRelation">Relationship <span className="req">*</span></label>
                      <select className={`field-select ${errors.emergencyRelation?'error':''}`} id="emergencyRelation" value={formData.emergencyRelation} onChange={handleInputChange}>
                        <option value="">Select relationship</option>
                        <option>Spouse / Partner</option><option>Parent</option><option>Sibling</option>
                        <option>Child</option><option>Friend</option><option>Colleague</option><option>Other</option>
                      </select>
                      <span className={`field-error ${errors.emergencyRelation?'show':''}`}>Please select a relationship.</span>
                    </div>
                  </div>
                </div>
                <div className="form-actions">
                  <div className="form-actions-left">
                    <button className="btn-back" onClick={() => goPrev(2)}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M13 7H1M7 1L1 7l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      Back
                    </button>
                    <span className="step-counter">Step <strong>2</strong> of 5</span>
                  </div>
                  <button className="btn-next" onClick={() => goNext(2)}>
                    <span>Continue</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
              </div>

              {/* STEP 3 */}
              <div className={`form-section ${currentStep===3?'active':''}`}>
                <div className="section-head">
                  <div className="section-head-tag"><span className="tag">Step 03 of 05</span></div>
                  <h2 className="section-head-title">Medical <em>History</em></h2>
                  <p className="section-head-desc">Accurate medical information ensures safe donations. All data is kept strictly confidential.</p>
                </div>
                <div className="form-body">
                  <div className="field-row">
                    <div className="field-group">
                      <label className="field-label" htmlFor="lastDonated">Last Donation Date</label>
                      <input className="field-input" type="date" id="lastDonated" value={formData.lastDonated} onChange={handleInputChange}/>
                      <div className="field-hint">Leave blank if first time</div>
                    </div>
                    <div className="field-group">
                      <label className="field-label" htmlFor="totalDonations">Total Past Donations</label>
                      <select className="field-select" id="totalDonations" value={formData.totalDonations} onChange={handleInputChange}>
                        <option value="">Select range</option>
                        <option value="0">First time donor</option>
                        <option value="1-5">1 – 5 times</option>
                        <option value="6-10">6 – 10 times</option>
                        <option value="11-20">11 – 20 times</option>
                        <option value="20+">More than 20 times</option>
                      </select>
                    </div>
                  </div>
                  <div className="field-divider"><div className="field-divider-line"></div><div className="field-divider-text">Current Health Status</div><div className="field-divider-line"></div></div>
                  <div className="field-group" style={{marginBottom:20}}>
                    <label className="field-label">Pre-existing Conditions</label>
                    <div className="condition-tags">
                      {[{id:'cNone',l:'None'},{id:'cDiab',l:'Diabetes'},{id:'cHyper',l:'Hypertension'},{id:'cAsthma',l:'Asthma'},{id:'cHeart',l:'Heart Disease'},{id:'cThyroid',l:'Thyroid'},{id:'cAnemia',l:'Anemia'},{id:'cOther',l:'Other'}].map(c => (
                        <div key={c.id}>
                          <input className="cond-option" type="checkbox" id={c.id} name="cond"/>
                          <label className="cond-label" htmlFor={c.id}>{c.l}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="field-row full">
                    <div className="field-group">
                      <label className="field-label" htmlFor="medications">Current Medications</label>
                      <input className="field-input" type="text" id="medications" placeholder="e.g., Metformin 500mg, or None" value={formData.medications} onChange={handleInputChange}/>
                    </div>
                  </div>
                  <div className="field-row full">
                    <div className="field-group">
                      <label className="field-label" htmlFor="medNotes">Additional Medical Notes</label>
                      <textarea className="field-textarea" id="medNotes" placeholder="Any other relevant medical information..." value={formData.medNotes} onChange={handleInputChange}></textarea>
                    </div>
                  </div>
                </div>
                <div className="form-actions">
                  <div className="form-actions-left">
                    <button className="btn-back" onClick={() => goPrev(3)}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M13 7H1M7 1L1 7l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      Back
                    </button>
                    <span className="step-counter">Step <strong>3</strong> of 5</span>
                  </div>
                  <button className="btn-next" onClick={() => goNext(3)}>
                    <span>Continue</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
              </div>

              {/* STEP 4 */}
              <div className={`form-section ${currentStep===4?'active':''}`}>
                <div className="section-head">
                  <div className="section-head-tag"><span className="tag">Step 04 of 05</span></div>
                  <h2 className="section-head-title">Donation <em>Availability</em></h2>
                  <p className="section-head-desc">Let recipients know when and how often you're willing to donate.</p>
                </div>
                <div className="form-body">
                  <div className="field-group" style={{marginBottom:24}}>
                    <label className="field-label">Current Availability Status <span className="req">*</span></label>
                    <div className="avail-grid">
                      {[
                        {id:'avImmediate',v:'immediate',t:'Available Immediately',s:'Ready to donate within 24 hours'},
                        {id:'avWeek',v:'within_week',t:'Within a Week',s:'Can arrange within 2–7 days'},
                        {id:'avScheduled',v:'scheduled',t:'Scheduled Only',s:'Prefer advance notice'},
                        {id:'avUnavailable',v:'unavailable',t:'Currently Unavailable',s:'Register now, activate later'},
                      ].map(a => (
                        <div key={a.id}>
                          <input className="avail-option" type="radio" name="availability" id={a.id} value={a.v} checked={formData.availability===a.v} onChange={handleInputChange}/>
                          <label className="avail-label" htmlFor={a.id}>
                            <div className="avail-radio"></div>
                            <div><div className="avail-text-title">{a.t}</div><div className="avail-text-sub">{a.s}</div></div>
                          </label>
                        </div>
                      ))}
                    </div>
                    <span className={`field-error ${errors.availability?'show':''}`}>Please select your availability.</span>
                  </div>
                  <div className="field-row">
                    <div className="field-group">
                      <label className="field-label" htmlFor="frequency">Donation Frequency <span className="req">*</span></label>
                      <select className={`field-select ${errors.frequency?'error':''}`} id="frequency" value={formData.frequency} onChange={handleInputChange}>
                        <option value="">How often?</option>
                        <option value="3months">Every 3 months (recommended)</option>
                        <option value="6months">Every 6 months</option>
                        <option value="yearly">Once a year</option>
                        <option value="emergency">Emergency only</option>
                      </select>
                      <span className={`field-error ${errors.frequency?'show':''}`}>Please select frequency.</span>
                    </div>
                    <div className="field-group">
                      <label className="field-label" htmlFor="donationType">Donation Type</label>
                      <select className="field-select" id="donationType" value={formData.donationType} onChange={handleInputChange}>
                        <option value="">Select preference</option>
                        <option value="whole">Whole Blood</option>
                        <option value="plasma">Plasma</option>
                        <option value="platelets">Platelets</option>
                        <option value="any">Any / No Preference</option>
                      </select>
                    </div>
                  </div>
                  <div className="field-divider"><div className="field-divider-line"></div><div className="field-divider-text">Travel & Preferences</div><div className="field-divider-line"></div></div>
                  <div className="field-row">
                    <div className="field-group">
                      <label className="field-label" htmlFor="travelDistance">Willing to Travel</label>
                      <select className="field-select" id="travelDistance" value={formData.travelDistance} onChange={handleInputChange}>
                        <option value="5">Within 5 km</option><option value="10">Within 10 km</option>
                        <option value="25">Within 25 km</option><option value="50">Within 50 km</option>
                        <option value="any">Any distance</option>
                      </select>
                    </div>
                    <div className="field-group">
                      <label className="field-label" htmlFor="preferredTime">Preferred Time</label>
                      <select className="field-select" id="preferredTime" value={formData.preferredTime} onChange={handleInputChange}>
                        <option value="any">Any time</option>
                        <option value="morning">Morning (6am–12pm)</option>
                        <option value="afternoon">Afternoon (12pm–6pm)</option>
                        <option value="evening">Evening (6pm–9pm)</option>
                        <option value="weekends">Weekends only</option>
                      </select>
                    </div>
                  </div>
                  <div className="field-row full">
                    <div className="field-group">
                      <label className="field-label" htmlFor="availNotes">Additional Notes</label>
                      <textarea className="field-textarea" id="availNotes" style={{minHeight:90}} value={formData.availNotes} onChange={handleInputChange} placeholder="E.g., 'Available on weekends only'..."></textarea>
                    </div>
                  </div>
                </div>
                <div className="form-actions">
                  <div className="form-actions-left">
                    <button className="btn-back" onClick={() => goPrev(4)}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M13 7H1M7 1L1 7l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      Back
                    </button>
                    <span className="step-counter">Step <strong>4</strong> of 5</span>
                  </div>
                  <button className="btn-next" onClick={() => goNext(4)}>
                    <span>Continue</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
              </div>

              {/* STEP 5 */}
              <div className={`form-section ${currentStep===5?'active':''}`}>
                <div className="section-head">
                  <div className="section-head-tag"><span className="tag">Step 05 of 05</span></div>
                  <h2 className="section-head-title">Verification & <em>Consent</em></h2>
                  <p className="section-head-desc">Upload a photo ID and confirm your agreement. You're almost there.</p>
                </div>
                <div className="form-body">
                  <div className="field-group" style={{marginBottom:24}}>
                    <label className="field-label">Upload Photo ID <span className="req">*</span></label>
                    <div className="upload-zone">
                      <input type="file" id="idUpload" accept="image/*,.pdf" onChange={handleFileChange}/>
                      <div className="upload-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                      </div>
                      <div className="upload-title">Drop your ID here or <span style={{color:'var(--crimson)'}}>browse</span></div>
                      <div className="upload-sub">Aadhaar, PAN, Passport · JPG, PNG or PDF · Max 5MB</div>
                    </div>
                    {formData.idUpload && (
                      <div className="upload-preview show">
                        <span className="upload-preview-name">{formData.idUpload.name}</span>
                        <button className="upload-preview-remove" onClick={() => setFormData(p => ({...p,idUpload:null}))} type="button">×</button>
                      </div>
                    )}
                    <span className={`field-error ${errors.idUpload?'show':''}`}>Please upload a valid photo ID.</span>
                  </div>
                  <div className="field-divider"><div className="field-divider-line"></div><div className="field-divider-text">Consent & Agreement</div><div className="field-divider-line"></div></div>
                  <div className="checkbox-group">
                    {[
                      {id:'consentInfo',  l:'I confirm that all information provided is accurate and truthful.'},
                      {id:'consentShare', l:'I consent to Blood Circle sharing my contact details with verified recipients in genuine medical emergencies.'},
                      {id:'consentHealth',l:"I confirm I am in good health and medically eligible to donate blood."},
                      {id:'consentTerms', l:'I have read and agree to the Terms of Service.'},
                      {id:'consentNotify',l:'I agree to receive SMS/email notifications for urgent blood requests matching my blood group. (Recommended)'},
                    ].map(c => (
                      <div key={c.id} className="check-item">
                        <input type="checkbox" id={c.id}/>
                        <label className="check-box" htmlFor={c.id}></label>
                        <label className="check-label" htmlFor={c.id}>{c.l}</label>
                      </div>
                    ))}
                  </div>
                  <span className={`field-error ${errors.consent?'show':''}`} style={{marginTop:12}}>Please accept the required consent agreements.</span>
                </div>
                <div className="form-actions">
                  <div className="form-actions-left">
                    <button className="btn-back" onClick={() => goPrev(5)}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M13 7H1M7 1L1 7l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      Back
                    </button>
                    <span className="step-counter">Step <strong>5</strong> of 5</span>
                  </div>
                  <button className="btn-next" onClick={submitForm} id="submitBtn">
                    <span>Complete Registration</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="success-screen show">
              <div className="success-icon">❤️</div>
              <h2 className="success-title">You're in the <em>Circle!</em></h2>
              <p className="success-desc">
                Your donor profile is now pending verification. You'll receive a confirmation email within 24 hours.
              </p>
              <div className="success-ref">Donor ID: <span>{donorId}</span></div>
              <div className="success-actions">
                <a href="#" className="btn btn-primary"><span>View My Profile</span></a>
                <a href="/search-donors" className="btn btn-outline"><span>Find Donors Near You</span></a>
              </div>
            </div>
          )}
        </div>

        {/* ── SIDEBAR ── */}
        <aside className="reg-sidebar">
          <div className="sidebar-card">
            <div className="sc-head"><div className="sc-title">Your Donor Card</div></div>
            <div className="donor-preview">
              <div className={`dp-blood ${formData.bloodType?'filled':''}`}>
                {formData.bloodType || '?'}
              </div>
              <div className="dp-name">
                {formData.firstName || formData.lastName ? `${formData.firstName} ${formData.lastName}`.trim() : 'Your Name'}
              </div>
              <div className="dp-location">
                📍 {formData.city || formData.state ? `${formData.city}${formData.city && formData.state ? ', ' : ''}${formData.state}` : 'City, State'}
              </div>
              <div className="dp-divider"></div>
              <div className="dp-row">
                <span className="dp-row-label">Blood Group</span>
                <span className="dp-row-val">{formData.bloodType || '—'}</span>
              </div>
              <div className="dp-row">
                <span className="dp-row-label">Donations</span>
                <span className="dp-row-val">
                  {formData.totalDonations ? ({'0':'First timer','1-5':'1–5 times','6-10':'6–10 times','11-20':'11–20 times','20+':'20+ times'} as Record<string,string>)[formData.totalDonations] || '—' : '—'}
                </span>
              </div>
              <div className="dp-row">
                <span className="dp-row-label">Availability</span>
                <span className="dp-row-val">
                  {formData.availability ? ({'immediate':'Available Now','within_week':'Within a Week','scheduled':'By Appointment','unavailable':'Unavailable'} as Record<string,string>)[formData.availability] || '—' : '—'}
                </span>
              </div>
              <div className="dp-status">{isSubmitted ? 'Verification Pending' : 'Pending Activation'}</div>
            </div>
          </div>

          <div className="sidebar-card">
            <div className="sc-head"><div className="sc-title">Eligibility Criteria</div></div>
            <div className="sc-body">
              <div className="elig-list">
                {[
                  {ok:true, t:'Aged between 18 and 65 years'},
                  {ok:true, t:'Body weight above 45 kg'},
                  {ok:true, t:'Haemoglobin level ≥ 12.5 g/dL'},
                  {ok:true, t:'Not donated in the last 3 months'},
                  {ok:false,t:'No active infection or fever in last 2 weeks'},
                  {ok:false,t:'No pregnancy or delivery within 6 months'},
                ].map((e,i) => (
                  <div key={i} className="elig-item">
                    <div className={`elig-icon ${e.ok?'yes':'no'}`}>{e.ok?'✓':'×'}</div>
                    <div className="elig-text">{e.t}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="sidebar-card">
            <div className="stats-strip">
              <div className="stat-s"><div className="stat-s-num">48<span>K+</span></div><div className="stat-s-label">Donors</div></div>
              <div className="stat-s"><div className="stat-s-num">12<span>K+</span></div><div className="stat-s-label">Lives Saved</div></div>
              <div className="stat-s"><div className="stat-s-num">190<span>+</span></div><div className="stat-s-label">Cities</div></div>
            </div>
          </div>
        </aside>
      </div>

      {!isSubmitted && (
        <div className="reg-cta-strip">
          <h3>Every Second Counts.</h3>
          <p>While you register, someone out there is waiting. Thank you for being their hope.</p>
        </div>
      )}
    </div>
  )
}
```

---

That's all 8 files. Here's a quick summary of the final structure:

```
src/
├── components/
│   ├── Navbar.tsx        ← shared nav + mobile menu
│   ├── Footer.tsx        ← shared footer
│   └── ClientShell.tsx   ← shared loader, cursor, scroll reveal
├── app/
│   ├── layout.tsx        ← injects Navbar, Footer, ClientShell on every page
│   ├── globals.css       ← unchanged
│   ├── page.tsx          ← home page (no duplicate nav/footer)
│   ├── become-donor/
│   │   ├── page.tsx      ← cleaned up (no duplicate nav/footer)
│   │   └── become-donor.css
│   └── search-donors/
│       ├── page.tsx      ← new page, fully React state-driven
│       └── search-donors.css
```