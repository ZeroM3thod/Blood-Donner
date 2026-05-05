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
            <li><a href="/search-donors">Find Donors</a></li>
            <li><a href="/emergency">Emergency Request</a></li>
            <li><a href="#">About</a></li>
            <li><a href="/contact">Contact</a></li>
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
            <li><a href="/search-donors">Find Donors</a></li>
            <li><a href="/emergency">Emergency Request</a></li>
            <li><a href="#">About</a></li>
            <li><a href="/contact">Contact</a></li>
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
