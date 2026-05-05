'use client'

import { useState, useEffect, useRef } from 'react'
import './dashboard.css'

/* ── SVG Icon helper ── */
const Ic = ({ d, size = 16, children }: { d?: string; size?: number; children?: React.ReactNode }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
    {d ? <path d={d} /> : children}
  </svg>
)

/* ── Nav items ── */
const navGroups = [
  {
    section: 'Main',
    items: [
      { id: 'dashboard',   label: 'Dashboard',      icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',              badge: null },
      { id: 'leaderboard', label: 'Leaderboard',     icon: 'M18 20V10M12 20V4M6 20v-6',                                    badge: null },
    ]
  },
  {
    section: 'Donations',
    items: [
      { id: 'requests',    label: 'Blood Requests',  icon: 'M22 12h-4l-3 9L9 3l-3 9H2',                                    badge: '5' },
      { id: 'my-requests', label: 'My Requests',     icon: 'M9 11l3 3L22 4',                                               badge: null },
      { id: 'history',     label: 'Donation History',icon: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',           badge: null },
      { id: 'appointments',label: 'Appointments',    icon: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',           badge: '2', badgeType: 'gold' },
    ]
  },
  {
    section: 'Profile & Health',
    items: [
      { id: 'profile',     label: 'My Profile',      icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2',                  badge: null },
      { id: 'health',      label: 'Health Tracker',  icon: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z', badge: null },
      { id: 'badges',      label: 'Achievements',    icon: 'M12 15l-2 5L7 9l11 4-5 2z',                                    badge: null },
    ]
  },
  {
    section: 'Account',
    items: [
      { id: 'settings',    label: 'Settings',        icon: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z', badge: null },
      { id: 'support',     label: 'Support & FAQ',   icon: 'M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10zm0-14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2z', badge: null },
    ]
  },
]

/* ── Mock Data ── */
const recentActivity = [
  { type: 'donated',  title: 'Whole Blood Donated', sub: 'Fortis Hospital, Mumbai · Unit: 450ml', time: '3 days ago' },
  { type: 'badge',    title: 'Badge Earned: "Champion"', sub: 'Reached 14 total donations milestone', time: '3 days ago' },
  { type: 'request',  title: 'Responded to Request', sub: 'AB+ request near Andheri — matched', time: '2 weeks ago' },
  { type: 'donated',  title: 'Plasma Donated', sub: 'Lilavati Hospital, Mumbai · Unit: 600ml', time: '3 months ago' },
  { type: 'profile',  title: 'Profile Verified', sub: 'Identity confirmed by Blood Circle team', time: '4 months ago' },
]

const nearbyRequests = [
  { blood: 'B+',  name: 'Ramesh S.',      loc: 'KEM Hospital · 2.1 km',       urgency: 'critical' as const },
  { blood: 'O-',  name: 'Sunita Verma',   loc: 'Nanavati Hospital · 4.5 km',  urgency: 'critical' as const },
  { blood: 'AB+', name: 'Deepak Joshi',   loc: 'Hinduja Hospital · 7.2 km',   urgency: 'moderate' as const },
  { blood: 'A-',  name: 'Meera Nair',     loc: 'Kokilaben Hospital · 9.0 km', urgency: 'moderate' as const },
  { blood: 'O+',  name: 'Vikram Chandra', loc: 'Wockhardt · 11.3 km',         urgency: 'stable' as const },
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

const leaderboardData = [
  { rank: 1, name: 'Priya Menon', city: 'Bengaluru', donations: 38, initial: 'P' },
  { rank: 2, name: 'Rohit Sharma', city: 'Mumbai', donations: 31, initial: 'R' },
  { rank: 3, name: 'Kavita Iyer', city: 'Chennai', donations: 27, initial: 'K' },
  { rank: 4, name: 'Aryan Mehta', city: 'Mumbai', donations: 14, initial: 'A', isMe: true },
  { rank: 5, name: 'Sneha Gupta', city: 'Delhi', donations: 12, initial: 'S' },
]

/* ── Page label map ── */
const pageLabel: Record<string, string> = {
  dashboard: 'Dashboard', profile: 'My Profile', health: 'Health Tracker',
  badges: 'Achievements', history: 'Donation History', appointments: 'Appointments',
  requests: 'Blood Requests', 'my-requests': 'My Requests',
  leaderboard: 'Leaderboard', settings: 'Settings', support: 'Support & FAQ',
}

/* ══════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════ */
export default function UserDashboard() {
  const [activeNav, setActiveNav] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notifDismissed, setNotifDismissed] = useState(false)
  const sidebarRef = useRef<HTMLElement>(null)

  /* Hide global site nav / footer and lock scroll */
  useEffect(() => {
    const siteNav    = document.querySelector('nav') as HTMLElement | null
    const siteFooter = document.querySelector('footer') as HTMLElement | null
    if (siteNav)    siteNav.style.display    = 'none'
    if (siteFooter) siteFooter.style.display = 'none'
    document.body.style.overflow = 'hidden'
    return () => {
      if (siteNav)    siteNav.style.display    = ''
      if (siteFooter) siteFooter.style.display = ''
      document.body.style.overflow = ''
    }
  }, [])

  /* Close sidebar on outside click */
  const closeSidebar = () => setSidebarOpen(false)

  const navigate = (id: string) => {
    setActiveNav(id)
    setSidebarOpen(false)
  }

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  })

  /* ── Sidebar JSX ── */
  const Sidebar = (
    <aside className={`dash-sidebar ${sidebarOpen ? 'open' : ''}`} ref={sidebarRef}>
      <div className="sb-inner">

        {/* Brand */}
        <div className="sb-brand">
          <a href="/" className="sb-logo">
            <div className="sb-logo-mark" />
            <div className="sb-logo-text">
              <div className="sb-logo-name">Blood<span>Circle</span></div>
              <div className="sb-logo-tag">Donor Portal</div>
            </div>
          </a>
          <button className="sb-close-btn" onClick={closeSidebar} aria-label="Close sidebar">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M1 1l12 12M13 1L1 13"/>
            </svg>
          </button>
        </div>

        {/* User Card */}
        <div className="sb-user">
          <div className="sb-user-row">
            <div className="sb-avatar">
              A
              <div className="sb-avatar-badge" />
            </div>
            <div className="sb-user-info">
              <div className="sb-user-name">Aryan Mehta</div>
              <div className="sb-user-id">BC-2025-84237</div>
            </div>
            <div className="sb-blood-pill">A+</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="sb-nav">
          {navGroups.map(group => (
            <div key={group.section}>
              <div className="sb-section-label">{group.section}</div>
              {group.items.map(item => (
                <button
                  key={item.id}
                  className={`sb-nav-item ${activeNav === item.id ? 'active' : ''}`}
                  onClick={() => navigate(item.id)}
                >
                  <span className="sb-nav-icon">
                    <Ic d={item.icon} size={15} />
                  </span>
                  {item.label}
                  {item.badge && (
                    <span className={`sb-nav-badge ${(item as any).badgeType || ''}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </nav>

        {/* Donation Prompt */}
        <div className="sb-prompt">
          <div className="sb-prompt-title">Next Donation</div>
          <div className="sb-prompt-sub">Eligible again on June 18 — schedule now!</div>
          <button className="sb-prompt-btn" onClick={() => navigate('appointments')}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Schedule
          </button>
        </div>

        {/* Footer + Logout */}
        <div className="sb-footer">
          <button className="sb-logout-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Log Out
          </button>
          <div className="sb-footer-links">
            <a href="#" className="sb-footer-link">Privacy</a>
            <a href="#" className="sb-footer-link">Terms</a>
            <a href="#" className="sb-footer-link">Help</a>
          </div>
        </div>

      </div>
    </aside>
  )

  /* ── Shared Stat Cards ── */
  const StatCards = (
    <div className="dash-stats-row">
      {[
        {
          cls: 'c-crimson', icon: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
          num: '14', sup: '×', label: 'Total Donations', trend: 'up', trendText: '2 this year',
        },
        {
          cls: 'c-gold', icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2',
          num: '42', sup: '+', label: 'Lives Impacted', trend: 'up', trendText: 'Each unit saves 3',
        },
        {
          cls: 'c-success', icon: 'M20 6L9 17l-5-5',
          num: '98', sup: '%', label: 'Response Rate', trend: 'neutral', trendText: 'Excellent',
        },
        {
          cls: 'c-ink', icon: 'M8 2h8M12 2v4M12 10v4M12 18v2',
          num: '4', sup: 'yr', label: 'Donor Since', trend: 'neutral', trendText: 'Since May 2021',
        },
      ].map((s, i) => (
        <div key={i} className={`dash-stat-card ${s.cls}`}>
          <div className={`dsc-icon ${s.cls}`}>
            <Ic d={s.icon} size={18} />
          </div>
          <div className="dsc-num">{s.num}<span className="dsc-num-sup">{s.sup}</span></div>
          <div className="dsc-label">{s.label}</div>
          <div className={`dsc-trend ${s.trend}`}>
            {s.trend === 'up' && (
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" width="11" height="11"><path d="M2 9l4-4 4 4"/></svg>
            )}
            {s.trend === 'neutral' && (
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" width="11" height="11"><path d="M2 6h8"/></svg>
            )}
            {s.trendText}
          </div>
        </div>
      ))}
    </div>
  )

  /* ── Page views ── */
  const renderPage = () => {
    switch (activeNav) {

      case 'leaderboard':
        return (
          <div className="page-view">
            {StatCards}
            <div className="d-panel">
              <div className="d-panel-head">
                <div className="d-panel-title">🏆 Global <em>Leaderboard</em></div>
                <span className="d-panel-action">This Month</span>
              </div>
              <div className="d-panel-body">
                <div className="leaderboard-list">
                  {leaderboardData.map(p => (
                    <div key={p.rank} className="lb-row" style={p.isMe ? {background:'rgba(140,31,40,0.04)',margin:'0 -24px',padding:'12px 24px',borderRadius:0} : {}}>
                      <div className={`lb-rank ${p.rank <= 3 ? `r${p.rank}` : 'rn'}`}>
                        {p.rank === 1 ? '🥇' : p.rank === 2 ? '🥈' : p.rank === 3 ? '🥉' : p.rank}
                      </div>
                      <div className="lb-avatar">{p.initial}</div>
                      <div className="lb-info">
                        <div className="lb-name">{p.name} {p.isMe && <span style={{fontSize:10,background:'var(--crimson)',color:'#fff',padding:'1px 6px',borderRadius:3,marginLeft:4}}>YOU</span>}</div>
                        <div className="lb-city">{p.city}</div>
                      </div>
                      <div className="lb-score">{p.donations}<span> donations</span></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 'profile':
        return (
          <div className="page-view">
            <div className="d-panel">
              <div className="d-panel-head">
                <div className="d-panel-title">My <em>Profile</em></div>
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
                  <div><div className="dpc-stat-num">14<span>×</span></div><div className="dpc-stat-label">Donations</div></div>
                  <div><div className="dpc-stat-num">4<span>yr</span></div><div className="dpc-stat-label">Experience</div></div>
                  <div><div className="dpc-stat-num">4<span>★</span></div><div className="dpc-stat-label">Badges</div></div>
                </div>
                <div style={{marginTop:24}}>
                  <div className="prog-bar-wrap">
                    <div className="prog-bar-head"><span className="prog-bar-label">Progress to Diamond Level</span><span className="prog-bar-val">14 / 20</span></div>
                    <div className="prog-bar-track"><div className="prog-bar-fill gold" style={{width:'70%'}}></div></div>
                  </div>
                  <div className="prog-bar-wrap">
                    <div className="prog-bar-head"><span className="prog-bar-label">Profile Completion</span><span className="prog-bar-val">85%</span></div>
                    <div className="prog-bar-track"><div className="prog-bar-fill" style={{width:'85%'}}></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'requests':
        return (
          <div className="page-view">
            <div className="d-panel">
              <div className="d-panel-head">
                <div className="d-panel-title">Nearby Blood <em>Requests</em></div>
                <a href="#" className="d-panel-action">Refresh →</a>
              </div>
              <div className="dash-tabs">
                <button className="dash-tab active">All (5)</button>
                <button className="dash-tab">Critical (2)</button>
                <button className="dash-tab">Compatible</button>
              </div>
              <div className="d-panel-body">
                {nearbyRequests.map((r, i) => (
                  <div key={i} className="req-row">
                    <div className="req-blood">{r.blood}</div>
                    <div className="req-info"><div className="req-name">{r.name}</div><div className="req-loc">{r.loc}</div></div>
                    <div className={`req-urgency ${r.urgency}`}>{r.urgency === 'critical' ? '⚡ Critical' : r.urgency === 'moderate' ? '• Moderate' : '○ Stable'}</div>
                    <button className="req-respond">Respond →</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'my-requests':
        return (
          <div className="page-view">
            <div className="d-panel">
              <div className="d-panel-head">
                <div className="d-panel-title">My <em>Requests</em></div>
                <button className="dash-btn dash-btn-primary" style={{fontSize:11,padding:'6px 14px'}}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  <span>New Request</span>
                </button>
              </div>
              <div className="d-panel-body">
                <div style={{textAlign:'center',padding:'40px 0',color:'var(--ink-soft)'}}>
                  <div style={{fontSize:40,marginBottom:12}}>📋</div>
                  <div style={{fontFamily:'Cormorant Garamond, serif',fontSize:20,fontWeight:600,color:'var(--ink)',marginBottom:6}}>No Active Requests</div>
                  <div style={{fontSize:13,fontWeight:300,lineHeight:1.6}}>You haven't posted any blood requests yet.<br/>Post a request to find donors near you.</div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'history':
        return (
          <div className="page-view">
            <div className="d-panel">
              <div className="d-panel-head">
                <div className="d-panel-title">Donation <em>History</em></div>
                <a href="#" className="d-panel-action">Export →</a>
              </div>
              <div className="d-panel-body">
                <div className="activity-list">
                  {recentActivity.filter(a => a.type === 'donated').map((a, i) => (
                    <div key={i} className="act-item">
                      <div className="act-icon-col">
                        <div className="act-icon donated">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                        </div>
                        {i < 1 && <div className="act-line"></div>}
                      </div>
                      <div className="act-body"><div className="act-title">{a.title}</div><div className="act-sub">{a.sub}</div></div>
                      <div className="act-time">{a.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 'appointments':
        return (
          <div className="page-view">
            <div className="d-panel">
              <div className="d-panel-head">
                <div className="d-panel-title">Upcoming <em>Appointments</em></div>
                <button className="dash-btn dash-btn-primary" style={{fontSize:11,padding:'6px 14px'}}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  <span>Book Slot</span>
                </button>
              </div>
              <div className="d-panel-body">
                <div className="appt-list">
                  {appointments.map((a, i) => (
                    <div key={i} className="appt-item">
                      <div className="appt-date">
                        <div className="appt-date-day">{a.day}</div>
                        <div className="appt-date-month">{a.month}</div>
                      </div>
                      <div className="appt-divider" />
                      <div className="appt-info"><div className="appt-title">{a.title}</div><div className="appt-loc">{a.loc}</div></div>
                      <div className={`appt-status ${a.status}`}>{a.status}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 'health':
        return (
          <div className="page-view">
            <div className="d-panel">
              <div className="d-panel-head">
                <div className="d-panel-title">Health <em>Tracker</em></div>
                <a href="#" className="d-panel-action">Update →</a>
              </div>
              <div className="d-panel-body">
                <div className="health-grid">
                  {[
                    { label:'Haemoglobin', val:'14.2', unit:'g/dL', status:'good', statusText:'Normal' },
                    { label:'Blood Pressure', val:'118', unit:'/78', status:'good', statusText:'Healthy' },
                    { label:'Weight', val:'72', unit:'kg', status:'good', statusText:'Eligible' },
                    { label:'Iron Level', val:'88', unit:'μg/dL', status:'warn', statusText:'Monitor' },
                  ].map((h, i) => (
                    <div key={i} className="health-card">
                      <div className="hc-label">{h.label}</div>
                      <div className="hc-val">{h.val} <span>{h.unit}</span></div>
                      <div className={`hc-status ${h.status}`}>{h.statusText}</div>
                    </div>
                  ))}
                </div>
                <div style={{marginTop:20}}>
                  {[
                    {label:'Whole Blood', val:'9 times', pct:65, cls:''},
                    {label:'Plasma', val:'3 times', pct:22, cls:'success'},
                    {label:'Platelets', val:'2 times', pct:14, cls:'gold'},
                  ].map((b, i) => (
                    <div key={i} className="prog-bar-wrap" style={{marginBottom:12}}>
                      <div className="prog-bar-head"><span className="prog-bar-label">{b.label}</span><span className="prog-bar-val">{b.val}</span></div>
                      <div className="prog-bar-track"><div className={`prog-bar-fill ${b.cls}`} style={{width:`${b.pct}%`}}></div></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 'badges':
        return (
          <div className="page-view">
            <div className="d-panel">
              <div className="d-panel-head">
                <div className="d-panel-title">My <em>Achievements</em></div>
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
        )

      case 'settings':
        return (
          <div className="page-view">
            <div className="d-panel">
              <div className="d-panel-head"><div className="d-panel-title">Account <em>Settings</em></div></div>
              <div className="d-panel-body">
                {[
                  {label:'Full Name', val:'Aryan Mehta'},
                  {label:'Email', val:'aryan.mehta@email.com'},
                  {label:'Phone', val:'+91 98765 43210'},
                  {label:'City', val:'Mumbai, Maharashtra'},
                  {label:'Blood Group', val:'A+'},
                ].map((f, i) => (
                  <div key={i} style={{marginBottom:16,paddingBottom:16,borderBottom:'1px solid var(--cream-d)'}}>
                    <div style={{fontSize:11,fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--ink-soft)',marginBottom:4}}>{f.label}</div>
                    <div style={{fontSize:14,color:'var(--ink)',fontWeight:500}}>{f.val}</div>
                  </div>
                ))}
                <button className="dash-btn dash-btn-primary" style={{marginTop:8}}>
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </div>
        )

      case 'support':
        return (
          <div className="page-view">
            <div className="d-panel">
              <div className="d-panel-head"><div className="d-panel-title">Support & <em>FAQ</em></div></div>
              <div className="d-panel-body">
                {[
                  { q:'How often can I donate blood?', a:'Whole blood can be donated every 56 days (8 weeks). Platelets every 7 days, up to 24 times/year.' },
                  { q:'How do I edit my availability status?', a:'Go to My Profile → Edit Profile and toggle your availability status at the top of the form.' },
                  { q:'What happens after I respond to a request?', a:'The requester receives your anonymous contact details. You can then coordinate directly to confirm the donation.' },
                  { q:'How do I earn badges?', a:'Badges are awarded automatically when you reach milestones — first donation, 5 donations, responses to requests, and more.' },
                ].map((faq, i) => (
                  <div key={i} style={{marginBottom:20,paddingBottom:20,borderBottom:'1px solid var(--cream-d)'}}>
                    <div style={{fontSize:14,fontWeight:600,color:'var(--ink)',marginBottom:6}}>{faq.q}</div>
                    <div style={{fontSize:13,color:'var(--ink-soft)',fontWeight:300,lineHeight:1.65}}>{faq.a}</div>
                  </div>
                ))}
                <div style={{marginTop:8,padding:'16px',background:'rgba(140,31,40,0.05)',border:'1px solid rgba(140,31,40,0.15)',borderRadius:6}}>
                  <div style={{fontSize:13,fontWeight:600,color:'var(--ink)',marginBottom:4}}>Still need help?</div>
                  <div style={{fontSize:12.5,color:'var(--ink-soft)',marginBottom:12}}>Our team typically responds within 24 hours.</div>
                  <button className="dash-btn dash-btn-primary" style={{fontSize:12,padding:'8px 16px'}}><span>Contact Support</span></button>
                </div>
              </div>
            </div>
          </div>
        )

      /* ── Default: Dashboard ── */
      default:
        return (
          <div className="page-view">
            {StatCards}
            <div className="dash-grid">
              {/* LEFT */}
              <div className="dash-grid-left">

                {/* Profile Overview */}
                <div className="d-panel">
                  <div className="d-panel-head">
                    <div className="d-panel-title">Donor <em>Profile</em></div>
                    <button className="d-panel-action" onClick={() => navigate('profile')}>Edit Profile →</button>
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
                          <span className="dpc-tag level">🏆 Champion</span>
                        </div>
                      </div>
                    </div>
                    <div className="dpc-stats">
                      <div><div className="dpc-stat-num">14<span>×</span></div><div className="dpc-stat-label">Donations</div></div>
                      <div><div className="dpc-stat-num">4<span>yr</span></div><div className="dpc-stat-label">Experience</div></div>
                      <div><div className="dpc-stat-num">4<span>★</span></div><div className="dpc-stat-label">Badges</div></div>
                    </div>
                    <div style={{marginTop:20}}>
                      <div className="prog-bar-wrap">
                        <div className="prog-bar-head"><span className="prog-bar-label">Progress to Diamond Level</span><span className="prog-bar-val">14 / 20</span></div>
                        <div className="prog-bar-track"><div className="prog-bar-fill gold" style={{width:'70%'}}></div></div>
                      </div>
                      <div className="prog-bar-wrap">
                        <div className="prog-bar-head"><span className="prog-bar-label">Profile Completion</span><span className="prog-bar-val">85%</span></div>
                        <div className="prog-bar-track"><div className="prog-bar-fill" style={{width:'85%'}}></div></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Nearby Requests */}
                <div className="d-panel">
                  <div className="d-panel-head">
                    <div className="d-panel-title">Nearby <em>Requests</em></div>
                    <button className="d-panel-action" onClick={() => navigate('requests')}>View All →</button>
                  </div>
                  <div className="dash-tabs">
                    <button className="dash-tab active">All (5)</button>
                    <button className="dash-tab">Critical (2)</button>
                    <button className="dash-tab">Compatible</button>
                  </div>
                  <div className="d-panel-body">
                    {nearbyRequests.map((r, i) => (
                      <div key={i} className="req-row">
                        <div className="req-blood">{r.blood}</div>
                        <div className="req-info"><div className="req-name">{r.name}</div><div className="req-loc">{r.loc}</div></div>
                        <div className={`req-urgency ${r.urgency}`}>{r.urgency === 'critical' ? '⚡ Critical' : r.urgency === 'moderate' ? '• Moderate' : '○ Stable'}</div>
                        <button className="req-respond">Respond →</button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Activity */}
                <div className="d-panel">
                  <div className="d-panel-head">
                    <div className="d-panel-title">Recent <em>Activity</em></div>
                    <button className="d-panel-action" onClick={() => navigate('history')}>Full History →</button>
                  </div>
                  <div className="d-panel-body">
                    <div className="activity-list">
                      {recentActivity.map((a, i) => (
                        <div key={i} className="act-item">
                          <div className="act-icon-col">
                            <div className={`act-icon ${a.type}`}>
                              {a.type === 'donated' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>}
                              {a.type === 'badge' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 15l-2 5L7 9l11 4-5 2z"/></svg>}
                              {a.type === 'request' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                              {a.type === 'profile' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
                            </div>
                            {i < recentActivity.length - 1 && <div className="act-line" />}
                          </div>
                          <div className="act-body"><div className="act-title">{a.title}</div><div className="act-sub">{a.sub}</div></div>
                          <div className="act-time">{a.time}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="dash-grid-right">

                {/* ID Card */}
                <div className="donor-id-card">
                  <div className="dic-top">
                    <div className="dic-brand">BloodCircle</div>
                    <div className="dic-blood">A+</div>
                  </div>
                  <div className="dic-name">Aryan Mehta</div>
                  <div className="dic-id">BC-2025-84237</div>
                  <div className="dic-divider" />
                  {[['Donations','14 times'],['Last Donated','3 days ago'],['City','Mumbai, MH'],['Member Since','May 2021']].map(([l,v]) => (
                    <div key={l} className="dic-row"><span className="dic-row-label">{l}</span><span className="dic-row-val">{v}</span></div>
                  ))}
                  <div className="dic-status">Available to Donate</div>
                </div>

                {/* Quick Actions */}
                <div className="d-panel">
                  <div className="d-panel-head"><div className="d-panel-title">Quick <em>Actions</em></div></div>
                  <div className="d-panel-body">
                    <div className="qa-grid">
                      {[
                        { icon:'M12 5v14M5 12h14', cls:'c1', label:'Schedule', sub:'Book next slot', page:'appointments' },
                        { icon:'M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z', cls:'c2', label:'Find Requests', sub:'Browse needs', page:'requests' },
                        { icon:'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2', cls:'c3', label:'My Profile', sub:'View & edit', page:'profile' },
                        { icon:'M18 20V10M12 20V4M6 20v-6', cls:'c4', label:'Leaderboard', sub:'See rankings', page:'leaderboard' },
                      ].map((q, i) => (
                        <button key={i} className="qa-btn" onClick={() => navigate(q.page)}>
                          <div className={`qa-icon ${q.cls}`}><Ic d={q.icon} size={14}/></div>
                          <div><div className="qa-label">{q.label}</div><div className="qa-sub">{q.sub}</div></div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Appointments */}
                <div className="d-panel">
                  <div className="d-panel-head">
                    <div className="d-panel-title">Upcoming</div>
                    <button className="d-panel-action" onClick={() => navigate('appointments')}>Manage →</button>
                  </div>
                  <div className="d-panel-body">
                    <div className="appt-list">
                      {appointments.map((a, i) => (
                        <div key={i} className="appt-item">
                          <div className="appt-date">
                            <div className="appt-date-day">{a.day}</div>
                            <div className="appt-date-month">{a.month}</div>
                          </div>
                          <div className="appt-divider" />
                          <div className="appt-info"><div className="appt-title">{a.title}</div><div className="appt-loc">{a.loc}</div></div>
                          <div className={`appt-status ${a.status}`}>{a.status}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                <div className="d-panel">
                  <div className="d-panel-head">
                    <div className="d-panel-title">Achievements</div>
                    <button className="d-panel-action" onClick={() => navigate('badges')}>All →</button>
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
          </div>
        )
    }
  }

  return (
    <div className="dash-shell">
      {/* Mobile overlay — click to close sidebar */}
      <div
        className={`sb-overlay ${sidebarOpen ? 'active' : ''}`}
        onClick={closeSidebar}
        aria-hidden="true"
      />

      {Sidebar}

      {/* ── Main ── */}
      <div className="dash-main">

        {/* Topbar */}
        <header className="dash-topbar">
          <button
            className="topbar-hamburger"
            onClick={() => setSidebarOpen(o => !o)}
            aria-label="Open menu"
          >
            <span /><span /><span />
          </button>

          <div className="topbar-breadcrumb">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M3 2l4 3-4 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span>{pageLabel[activeNav] ?? 'Dashboard'}</span>
          </div>

          <div className="topbar-spacer" />

          <div className="topbar-search">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input type="text" placeholder="Search donors, requests…" />
          </div>

          <div className="topbar-actions">
            <button className="topbar-btn" aria-label="Notifications">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <div className="topbar-notif-dot" />
            </button>
            <div className="topbar-user">
              <div className="topbar-user-avatar">A</div>
              <span className="topbar-user-name">Aryan Mehta</span>
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="dash-content">
          {/* Urgent banner */}
          {!notifDismissed && activeNav === 'dashboard' && (
            <div className="notif-banner">
              <div className="notif-banner-icon">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              </div>
              <div className="notif-banner-body">
                <div className="notif-banner-title">🚨 Urgent B+ request — Ramesh S. at KEM Hospital (2.1 km)</div>
                <div className="notif-banner-text">Critical need · Posted 12 minutes ago · You are eligible to donate.</div>
              </div>
              <button className="notif-banner-close" onClick={() => setNotifDismissed(true)}>×</button>
            </div>
          )}

          {/* Page Header */}
          <div className="dash-page-header">
            <div>
              <div className="dash-greeting-sub">Active Donor</div>
              <h1 className="dash-greeting-title">
                {activeNav === 'dashboard' ? <>Welcome back, <em>Aryan.</em></> : pageLabel[activeNav]}
              </h1>
              <div className="dash-greeting-date">{today}</div>
            </div>
            {activeNav === 'dashboard' && (
              <div className="dash-header-actions">
                <button className="dash-btn dash-btn-ghost">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                  <span>Share Profile</span>
                </button>
                <button className="dash-btn dash-btn-primary" onClick={() => navigate('appointments')}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  <span>Schedule Donation</span>
                </button>
              </div>
            )}
          </div>

          {renderPage()}
        </main>
      </div>
    </div>
  )
}