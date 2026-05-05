'use client'

import { useState, useEffect } from 'react'
import './dashboard.css'

/* ── tiny SVG icon helpers ── */
const Icon = ({ d, children, size = 18, stroke = 'currentColor' }: { d?: string; children?: React.ReactNode; size?: number; stroke?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    {d ? <path d={d}/> : children}
  </svg>
)

const navItems = [
  {
    section: 'Overview',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', badge: null },
      { id: 'profile',   label: 'My Profile', icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2', badge: null },
    ]
  },
  {
    section: 'Donations',
    items: [
      { id: 'history',      label: 'Donation History', icon: 'M9 11l3 3L22 4', badge: null },
      { id: 'appointments', label: 'Appointments',     icon: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01', badge: '2' },
      { id: 'requests',     label: 'Blood Requests',   icon: 'M22 12h-4l-3 9L9 3l-3 9H2', badge: '5' },
    ]
  },
  {
    section: 'Health',
    items: [
      { id: 'health',  label: 'Health Tracker', icon: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z', badge: null },
      { id: 'badges',  label: 'Achievements',   icon: 'M12 15l-2 5L7 9l11 4-5 2z', badge: null },
    ]
  },
  {
    section: 'Account',
    items: [
      { id: 'settings', label: 'Settings',  icon: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', badge: null },
      { id: 'help',     label: 'Help & FAQ', icon: 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3', badge: null },
    ]
  },
]

const recentActivity = [
  { type: 'donated',  title: 'Whole Blood Donated', sub: 'Fortis Hospital, Mumbai · Unit: 450ml', time: '3 days ago' },
  { type: 'badge',    title: 'Badge Earned: "Champion"', sub: 'Reached 14 total donations milestone', time: '3 days ago' },
  { type: 'request',  title: 'Responded to Request', sub: 'AB+ request near Andheri — matched successfully', time: '2 weeks ago' },
  { type: 'donated',  title: 'Plasma Donated', sub: 'Lilavati Hospital, Mumbai · Unit: 600ml', time: '3 months ago' },
  { type: 'profile',  title: 'Profile Verified', sub: 'Identity confirmed by Blood Circle team', time: '4 months ago' },
]

const nearbyRequests = [
  { blood: 'B+',  name: 'Ramesh S.',        loc: 'KEM Hospital · 2.1 km', urgency: 'critical' as const },
  { blood: 'O-',  name: 'Sunita Verma',     loc: 'Nanavati Hospital · 4.5 km', urgency: 'critical' as const },
  { blood: 'AB+', name: 'Deepak Joshi',     loc: 'Hinduja Hospital · 7.2 km', urgency: 'moderate' as const },
  { blood: 'A-',  name: 'Meera Nair',       loc: 'Kokilaben Hospital · 9.0 km', urgency: 'moderate' as const },
  { blood: 'O+',  name: 'Vikram Chandra',   loc: 'Wockhardt Hospital · 11.3 km', urgency: 'stable' as const },
]

const appointments = [
  { day: '18', month: 'Jun', title: 'Whole Blood Donation', loc: 'Fortis Hospital, Andheri', status: 'confirmed' as const },
  { day: '02', month: 'Jul', title: 'Blood Group Test', loc: 'Blood Circle Clinic, Bandra', status: 'pending' as const },
]

const badges = [
  { icon: '🩸', name: 'First Drop', earned: true },
  { icon: '🔥', name: '5 Donations', earned: true },
  { icon: '⭐', name: 'Responder', earned: true },
  { icon: '🏆', name: 'Champion', earned: true },
  { icon: '💎', name: 'Diamond', earned: false },
  { icon: '🌍', name: 'City Hero', earned: false },
]

export default function UserDashboard() {
  const [activeNav, setActiveNav] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notifDismissed, setNotifDismissed] = useState(false)

  // Hide the global site Navbar and Footer on this page
  useEffect(() => {
    const siteNav    = document.querySelector('nav') as HTMLElement | null
    const siteFooter = document.querySelector('footer') as HTMLElement | null
    if (siteNav)    { siteNav.style.display    = 'none' }
    if (siteFooter) { siteFooter.style.display = 'none' }
    // Also lock body scroll — the dashboard scrolls internally
    document.body.style.overflow = 'hidden'
    return () => {
      if (siteNav)    { siteNav.style.display    = '' }
      if (siteFooter) { siteFooter.style.display = '' }
      document.body.style.overflow = ''
    }
  }, [])

  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div className="dash-shell">
      {/* ════════════════════════════ SIDEBAR ════════════════════════════ */}
      <aside className={`dash-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sb-inner">

          {/* Brand */}
          <div className="sb-brand">
            <a href="/" className="sb-logo">
              <div className="sb-logo-mark"></div>
              <div className="sb-logo-text">
                <div className="sb-logo-name">Blood<span>Circle</span></div>
                <div className="sb-logo-tag">Donor Portal</div>
              </div>
            </a>
          </div>

          {/* User Card */}
          <div className="sb-user">
            <div className="sb-user-row">
              <div className="sb-avatar">
                A
                <div className="sb-avatar-badge"></div>
              </div>
              <div className="sb-user-info">
                <div className="sb-user-name">Aryan Mehta</div>
                <div className="sb-user-id">BC-2025-84237</div>
              </div>
              <div className="sb-blood-pill">A+</div>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="sb-nav">
            {navItems.map(group => (
              <div key={group.section}>
                <div className="sb-section-label">{group.section}</div>
                {group.items.map(item => (
                  <button
                    key={item.id}
                    className={`sb-nav-item ${activeNav === item.id ? 'active' : ''}`}
                    onClick={() => { setActiveNav(item.id); setSidebarOpen(false) }}
                  >
                    <span className="sb-nav-icon">
                      <Icon d={item.icon} size={16}/>
                    </span>
                    {item.label}
                    {item.badge && <span className="sb-nav-badge">{item.badge}</span>}
                  </button>
                ))}
              </div>
            ))}
          </nav>

          {/* Donation Prompt */}
          <div className="sb-prompt">
            <div className="sb-prompt-title">Next Donation</div>
            <div className="sb-prompt-sub">You become eligible again on June 18, 2025. Schedule now!</div>
            <button className="sb-prompt-btn">
              <Icon d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" size={12}/>
              Schedule
            </button>
          </div>

          {/* Footer links */}
          <div className="sb-footer">
            <div className="sb-footer-links">
              <a href="#" className="sb-footer-link">Privacy</a>
              <a href="#" className="sb-footer-link">Terms</a>
              <a href="#" className="sb-footer-link">Logout</a>
            </div>
          </div>

        </div>
      </aside>

      {/* ════════════════════════════ MAIN ════════════════════════════ */}
      <div className="dash-main">

        {/* ── Top Navbar ── */}
        <header className="dash-topbar">
          {/* Mobile toggle */}
          <button
            onClick={() => setSidebarOpen(o => !o)}
            style={{ display:'flex', flexDirection:'column', gap:'5px', background:'none', border:'none', cursor:'pointer', padding:'4px', marginRight:'8px', flexShrink:0 }}
            className="mobile-only"
            aria-label="Menu"
          >
            <span style={{display:'block',width:'20px',height:'1.5px',background:'var(--ink)'}}></span>
            <span style={{display:'block',width:'20px',height:'1.5px',background:'var(--ink)'}}></span>
            <span style={{display:'block',width:'20px',height:'1.5px',background:'var(--ink)'}}></span>
          </button>

          <div className="topbar-breadcrumb">
            <Icon d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" size={13}/>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M3 2l4 3-4 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span>{navItems.flatMap(g=>g.items).find(i=>i.id===activeNav)?.label ?? 'Dashboard'}</span>
          </div>

          <div className="topbar-spacer"/>

          {/* Search */}
          <div className="topbar-search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input type="text" placeholder="Search donors, requests…"/>
          </div>

          {/* Actions */}
          <div className="topbar-actions">
            {/* Notifications */}
            <button className="topbar-btn" aria-label="Notifications">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <div className="topbar-notif-dot"></div>
            </button>
            {/* Messages */}
            <button className="topbar-btn" aria-label="Messages">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </button>

            {/* User pill */}
            <div className="topbar-user">
              <div className="topbar-user-avatar">A</div>
              <span className="topbar-user-name">Aryan Mehta</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        </header>

        {/* ── Dashboard Content ── */}
        <main className="dash-content">

          {/* Notification banner */}
          {!notifDismissed && (
            <div className="notif-banner">
              <div className="notif-banner-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              </div>
              <div className="notif-banner-body">
                <div className="notif-banner-title">🚨 Urgent B+ request near you — Ramesh S. at KEM Hospital (2.1 km)</div>
                <div className="notif-banner-text">Critical need · Posted 12 minutes ago · You are eligible to donate.</div>
              </div>
              <button className="notif-banner-close" onClick={() => setNotifDismissed(true)}>×</button>
            </div>
          )}

          {/* Page Header */}
          <div className="dash-page-header">
            <div className="dash-greeting">
              <div className="dash-greeting-sub">Active Donor</div>
              <h1 className="dash-greeting-title">Welcome back, <em>Aryan.</em></h1>
              <div className="dash-greeting-date">{today}</div>
            </div>
            <div className="dash-header-actions">
              <button className="dash-btn dash-btn-ghost">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                <span>Share Profile</span>
              </button>
              <button className="dash-btn dash-btn-primary">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                <span>Schedule Donation</span>
              </button>
            </div>
          </div>

          {/* ── Stats Row ── */}
          <div className="dash-stats-row">
            <div className="dash-stat-card c-crimson">
              <div className="dsc-icon c-crimson">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </div>
              <div className="dsc-num">14<span className="dsc-num-sup">×</span></div>
              <div className="dsc-label">Total Donations</div>
              <div className="dsc-trend up">
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 9l4-4 4 4"/></svg>
                2 this year
              </div>
            </div>
            <div className="dash-stat-card c-gold">
              <div className="dsc-icon c-gold">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <div className="dsc-num">42<span className="dsc-num-sup">+</span></div>
              <div className="dsc-label">Lives Impacted</div>
              <div className="dsc-trend up">
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 9l4-4 4 4"/></svg>
                Each unit saves 3
              </div>
            </div>
            <div className="dash-stat-card c-success">
              <div className="dsc-icon c-success">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div className="dsc-num">98<span className="dsc-num-sup">%</span></div>
              <div className="dsc-label">Response Rate</div>
              <div className="dsc-trend neutral">
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 6h8"/></svg>
                Excellent
              </div>
            </div>
            <div className="dash-stat-card c-ink">
              <div className="dsc-icon c-ink">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>
              </div>
              <div className="dsc-num">4<span className="dsc-num-sup">yr</span></div>
              <div className="dsc-label">Donor Since</div>
              <div className="dsc-trend neutral">
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 6h8"/></svg>
                Since May 2021
              </div>
            </div>
          </div>

          {/* ── Main Grid ── */}
          <div className="dash-grid">

            {/* ── LEFT COLUMN ── */}
            <div className="dash-grid-left">

              {/* Profile Overview */}
              <div className="d-panel">
                <div className="d-panel-head">
                  <div className="d-panel-title">Donor <em>Profile</em></div>
                  <a href="#" className="d-panel-action">Edit Profile →</a>
                </div>
                <div className="d-panel-body">
                  <div className="donor-profile-card">
                    <div className="dpc-avatar-wrap">
                      <div className="dpc-avatar">A</div>
                      <div className="dpc-verified">✓</div>
                    </div>
                    <div className="dpc-info">
                      <div className="dpc-name">Aryan Mehta</div>
                      <div className="dpc-id">ID · BC-2025-84237</div>
                      <div className="dpc-tags">
                        <span className="dpc-tag blood">A+</span>
                        <span className="dpc-tag avail">● Available</span>
                        <span className="dpc-tag city">📍 Mumbai, MH</span>
                        <span className="dpc-tag level">🏆 Champion Level</span>
                      </div>
                    </div>
                  </div>

                  <div className="dpc-stats">
                    <div className="dpc-stat">
                      <div className="dpc-stat-num">14<span>×</span></div>
                      <div className="dpc-stat-label">Donations</div>
                    </div>
                    <div className="dpc-stat">
                      <div className="dpc-stat-num">4<span>yr</span></div>
                      <div className="dpc-stat-label">Experience</div>
                    </div>
                    <div className="dpc-stat">
                      <div className="dpc-stat-num">4<span>★</span></div>
                      <div className="dpc-stat-label">Badges Earned</div>
                    </div>
                  </div>

                  {/* Progress to next level */}
                  <div style={{marginTop:24}}>
                    <div className="prog-bar-wrap">
                      <div className="prog-bar-head">
                        <span className="prog-bar-label">Progress to Diamond Level</span>
                        <span className="prog-bar-val">14 / 20 donations</span>
                      </div>
                      <div className="prog-bar-track">
                        <div className="prog-bar-fill gold" style={{width:'70%'}}></div>
                      </div>
                    </div>
                    <div className="prog-bar-wrap">
                      <div className="prog-bar-head">
                        <span className="prog-bar-label">Profile Completion</span>
                        <span className="prog-bar-val">85%</span>
                      </div>
                      <div className="prog-bar-track">
                        <div className="prog-bar-fill" style={{width:'85%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nearby Blood Requests */}
              <div className="d-panel">
                <div className="d-panel-head">
                  <div className="d-panel-title">Nearby <em>Requests</em></div>
                  <a href="#" className="d-panel-action">View All →</a>
                </div>
                <div className="dash-tabs">
                  <button className="dash-tab active">All (5)</button>
                  <button className="dash-tab">Critical (2)</button>
                  <button className="dash-tab">Compatible</button>
                </div>
                <div className="d-panel-body">
                  <div className="req-list">
                    {nearbyRequests.map((r, i) => (
                      <div key={i} className="req-row">
                        <div className="req-blood">{r.blood}</div>
                        <div className="req-info">
                          <div className="req-name">{r.name}</div>
                          <div className="req-loc">{r.loc}</div>
                        </div>
                        <div className={`req-urgency ${r.urgency}`}>
                          {r.urgency === 'critical' ? '⚡ Critical' : r.urgency === 'moderate' ? '• Moderate' : '○ Stable'}
                        </div>
                        <button className="req-respond">Respond →</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="d-panel">
                <div className="d-panel-head">
                  <div className="d-panel-title">Recent <em>Activity</em></div>
                  <a href="#" className="d-panel-action">Full History →</a>
                </div>
                <div className="d-panel-body">
                  <div className="activity-list">
                    {recentActivity.map((a, i) => (
                      <div key={i} className="act-item">
                        <div className="act-icon-col">
                          <div className={`act-icon ${a.type}`}>
                            {a.type === 'donated' && <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>}
                            {a.type === 'badge' && <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 15l-2 5L7 9l11 4-5 2z"/></svg>}
                            {a.type === 'request' && <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                            {a.type === 'profile' && <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
                          </div>
                          {i < recentActivity.length - 1 && <div className="act-line"></div>}
                        </div>
                        <div className="act-body">
                          <div className="act-title">{a.title}</div>
                          <div className="act-sub">{a.sub}</div>
                        </div>
                        <div className="act-time">{a.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* ── RIGHT COLUMN ── */}
            <div className="dash-grid-right">

              {/* Donor ID Card */}
              <div className="donor-id-card">
                <div className="dic-top">
                  <div className="dic-brand">BloodCircle</div>
                  <div className="dic-blood">A+</div>
                </div>
                <div className="dic-name">Aryan Mehta</div>
                <div className="dic-id">BC-2025-84237</div>
                <div className="dic-divider"></div>
                <div className="dic-row">
                  <span className="dic-row-label">Donations</span>
                  <span className="dic-row-val">14 times</span>
                </div>
                <div className="dic-row">
                  <span className="dic-row-label">Last Donated</span>
                  <span className="dic-row-val">3 days ago</span>
                </div>
                <div className="dic-row">
                  <span className="dic-row-label">City</span>
                  <span className="dic-row-val">Mumbai, MH</span>
                </div>
                <div className="dic-row">
                  <span className="dic-row-label">Member Since</span>
                  <span className="dic-row-val">May 2021</span>
                </div>
                <div className="dic-status">Available to Donate</div>
              </div>

              {/* Quick Actions */}
              <div className="d-panel">
                <div className="d-panel-head">
                  <div className="d-panel-title">Quick <em>Actions</em></div>
                </div>
                <div className="d-panel-body">
                  <div className="qa-grid">
                    <a href="#" className="qa-btn">
                      <div className="qa-icon c1">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                      </div>
                      <div>
                        <div className="qa-label">Schedule Donation</div>
                        <div className="qa-sub">Book next appointment</div>
                      </div>
                    </a>
                    <a href="#" className="qa-btn">
                      <div className="qa-icon c2">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                      </div>
                      <div>
                        <div className="qa-label">Find Requests</div>
                        <div className="qa-sub">Browse blood needs</div>
                      </div>
                    </a>
                    <a href="#" className="qa-btn">
                      <div className="qa-icon c3">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                      </div>
                      <div>
                        <div className="qa-label">Share Profile</div>
                        <div className="qa-sub">Spread the word</div>
                      </div>
                    </a>
                    <a href="#" className="qa-btn">
                      <div className="qa-icon c4">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </div>
                      <div>
                        <div className="qa-label">Edit Profile</div>
                        <div className="qa-sub">Update your info</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              {/* Upcoming Appointments */}
              <div className="d-panel">
                <div className="d-panel-head">
                  <div className="d-panel-title">Upcoming</div>
                  <a href="#" className="d-panel-action">Manage →</a>
                </div>
                <div className="d-panel-body">
                  <div className="appt-list">
                    {appointments.map((a, i) => (
                      <div key={i} className="appt-item">
                        <div className="appt-date">
                          <div className="appt-date-day">{a.day}</div>
                          <div className="appt-date-month">{a.month}</div>
                        </div>
                        <div className="appt-divider"></div>
                        <div className="appt-info">
                          <div className="appt-title">{a.title}</div>
                          <div className="appt-loc">{a.loc}</div>
                        </div>
                        <div className={`appt-status ${a.status}`}>{a.status}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Health Tracker */}
              <div className="d-panel">
                <div className="d-panel-head">
                  <div className="d-panel-title">Health <em>Tracker</em></div>
                  <a href="#" className="d-panel-action">Update →</a>
                </div>
                <div className="d-panel-body">
                  <div className="health-grid">
                    <div className="health-card">
                      <div className="hc-label">Haemoglobin</div>
                      <div className="hc-val">14.2 <span>g/dL</span></div>
                      <div className="hc-status good">Normal</div>
                    </div>
                    <div className="health-card">
                      <div className="hc-label">Blood Pressure</div>
                      <div className="hc-val">118<span>/78</span></div>
                      <div className="hc-status good">Healthy</div>
                    </div>
                    <div className="health-card">
                      <div className="hc-label">Weight</div>
                      <div className="hc-val">72 <span>kg</span></div>
                      <div className="hc-status good">Eligible</div>
                    </div>
                    <div className="health-card">
                      <div className="hc-label">Iron Level</div>
                      <div className="hc-val">88 <span>μg/dL</span></div>
                      <div className="hc-status warn">Monitor</div>
                    </div>
                  </div>

                  {/* Donation Type Breakdown */}
                  <div style={{marginTop:20}}>
                    <div className="prog-bar-wrap" style={{marginBottom:10}}>
                      <div className="prog-bar-head">
                        <span className="prog-bar-label">Whole Blood</span>
                        <span className="prog-bar-val">9 times</span>
                      </div>
                      <div className="prog-bar-track">
                        <div className="prog-bar-fill" style={{width:'65%'}}></div>
                      </div>
                    </div>
                    <div className="prog-bar-wrap" style={{marginBottom:10}}>
                      <div className="prog-bar-head">
                        <span className="prog-bar-label">Plasma</span>
                        <span className="prog-bar-val">3 times</span>
                      </div>
                      <div className="prog-bar-track">
                        <div className="prog-bar-fill success" style={{width:'22%'}}></div>
                      </div>
                    </div>
                    <div className="prog-bar-wrap">
                      <div className="prog-bar-head">
                        <span className="prog-bar-label">Platelets</span>
                        <span className="prog-bar-val">2 times</span>
                      </div>
                      <div className="prog-bar-track">
                        <div className="prog-bar-fill gold" style={{width:'14%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="d-panel">
                <div className="d-panel-head">
                  <div className="d-panel-title">Achievements</div>
                  <a href="#" className="d-panel-action">All Badges →</a>
                </div>
                <div className="d-panel-body">
                  <div className="badges-grid">
                    {badges.map((b, i) => (
                      <div key={i} className={`badge-item ${b.earned ? 'earned' : 'locked'}`}>
                        <div className="badge-icon">{b.icon}</div>
                        <div className="badge-name">{b.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  )
}