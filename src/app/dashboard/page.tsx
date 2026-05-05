'use client'

import { useState, useEffect } from 'react'
import './dashboard.css'

/* ── SVG Icon helper ── */
const Ic = ({ d, size = 16, children }: { d?: string; size?: number; children?: React.ReactNode }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
    {d ? <path d={d} /> : children}
  </svg>
)

/* ══════════════════════════════════════════
   NAV DATA
══════════════════════════════════════════ */
const navGroups = [
  {
    section: 'Main',
    items: [
      { id: 'dashboard',    label: 'Dashboard',       icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', badge: null },
      { id: 'leaderboard',  label: 'Leaderboard',     icon: 'M18 20V10M12 20V4M6 20v-6',                       badge: null },
    ],
  },
  {
    section: 'Donations',
    items: [
      { id: 'requests',     label: 'Blood Requests',  icon: 'M22 12h-4l-3 9L9 3l-3 9H2',                      badge: '5' },
      { id: 'my-requests',  label: 'My Requests',     icon: 'M9 11l3 3L22 4',                                  badge: null },
      { id: 'history',      label: 'Donation History',icon: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01', badge: null },
      { id: 'appointments', label: 'Appointments',    icon: 'M8 2h8M12 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', badge: '2', badgeType: 'gold' },
    ],
  },
  {
    section: 'Profile & Health',
    items: [
      { id: 'profile',      label: 'My Profile',      icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2',     badge: null },
      { id: 'health',       label: 'Health Tracker',  icon: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z', badge: null },
      { id: 'badges',       label: 'Achievements',    icon: 'M12 15l-2 5L7 9l11 4-5 2z',                      badge: null },
    ],
  },
  {
    section: 'Account',
    items: [
      { id: 'settings',     label: 'Settings',        icon: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',            badge: null },
      { id: 'support',      label: 'Support & FAQ',   icon: 'M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10z', badge: null },
    ],
  },
]

/* Bottom-nav shortlist (5 items for mobile) */
const bottomNav = [
  { id: 'dashboard',   label: 'Home',      icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' },
  { id: 'requests',    label: 'Requests',  icon: 'M22 12h-4l-3 9L9 3l-3 9H2', badge: '5' },
  { id: 'appointments',label: 'Book',      icon: 'M8 2h8M12 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z' },
  { id: 'health',      label: 'Health',    icon: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' },
  { id: 'profile',     label: 'Profile',   icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' },
]

/* ══════════════════════════════════════════
   MOCK DATA
══════════════════════════════════════════ */
const activity = [
  { type: 'donated',  title: 'Whole Blood Donated',       sub: 'Fortis Hospital, Mumbai · 450 ml',           time: '3 days ago' },
  { type: 'badge',    title: 'Badge Earned: "Champion"',  sub: 'Reached 14 total donations milestone',       time: '3 days ago' },
  { type: 'request',  title: 'Responded to Request',      sub: 'AB+ near Andheri — matched',                 time: '2 weeks ago' },
  { type: 'donated',  title: 'Plasma Donated',            sub: 'Lilavati Hospital, Mumbai · 600 ml',         time: '3 months ago' },
  { type: 'profile',  title: 'Profile Verified',          sub: 'Identity confirmed by Blood Circle team',    time: '4 months ago' },
]

const requests = [
  { blood: 'B+',  name: 'Ramesh S.',      loc: 'KEM Hospital · 2.1 km',           urgency: 'critical' as const },
  { blood: 'O-',  name: 'Sunita Verma',   loc: 'Nanavati Hospital · 4.5 km',      urgency: 'critical' as const },
  { blood: 'AB+', name: 'Deepak Joshi',   loc: 'Hinduja Hospital · 7.2 km',       urgency: 'moderate' as const },
  { blood: 'A-',  name: 'Meera Nair',     loc: 'Kokilaben Hospital · 9.0 km',     urgency: 'moderate' as const },
  { blood: 'O+',  name: 'Vikram Chandra', loc: 'Wockhardt · 11.3 km',             urgency: 'stable'   as const },
]

const appointments = [
  { day: '18', month: 'Jun', title: 'Whole Blood Donation', loc: 'Fortis Hospital, Andheri', status: 'confirmed' as const },
  { day: '02', month: 'Jul', title: 'Blood Group Test',     loc: 'Blood Circle Clinic, Bandra', status: 'pending' as const },
]

const badges = [
  { icon: '🩸', name: 'First Drop', earned: true  },
  { icon: '🔥', name: '5 Donations', earned: true  },
  { icon: '⭐', name: 'Responder',   earned: true  },
  { icon: '🏆', name: 'Champion',    earned: true  },
  { icon: '💎', name: 'Diamond',     earned: false },
  { icon: '🌍', name: 'City Hero',   earned: false },
]

const leaderboard = [
  { rank: 1, name: 'Priya Menon',   city: 'Bengaluru', count: 38, init: 'P' },
  { rank: 2, name: 'Rohit Sharma',  city: 'Mumbai',    count: 31, init: 'R' },
  { rank: 3, name: 'Kavita Iyer',   city: 'Chennai',   count: 27, init: 'K' },
  { rank: 4, name: 'Aryan Mehta',   city: 'Mumbai',    count: 14, init: 'A', isMe: true },
  { rank: 5, name: 'Sneha Gupta',   city: 'Delhi',     count: 12, init: 'S' },
]

const pageLabel: Record<string, string> = {
  dashboard: 'Dashboard', profile: 'My Profile', health: 'Health Tracker',
  badges: 'Achievements', history: 'Donation History', appointments: 'Appointments',
  requests: 'Blood Requests', 'my-requests': 'My Requests',
  leaderboard: 'Leaderboard', settings: 'Settings', support: 'Support & FAQ',
}

/* ══════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════ */
export default function Dashboard() {
  const [active, setActive]       = useState('dashboard')
  const [sidebarOpen, setSidebar] = useState(false)
  const [alertDismissed, setAlert]= useState(false)

  /* Hide site chrome + lock scroll */
  useEffect(() => {
    const nav    = document.querySelector('nav')    as HTMLElement | null
    const footer = document.querySelector('footer') as HTMLElement | null
    if (nav)    nav.style.display    = 'none'
    if (footer) footer.style.display = 'none'
    document.body.style.overflow = 'hidden'
    return () => {
      if (nav)    nav.style.display    = ''
      if (footer) footer.style.display = ''
      document.body.style.overflow     = ''
    }
  }, [])

  const go = (id: string) => { setActive(id); setSidebar(false) }

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })

  /* ── Shared Stat Cards ── */
  const StatCards = (
    <div className="ds-stats">
      {[
        { col: 'red',   icon: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z', num: '14', sup: '×', label: 'Total Donations',   trend: 'up',   trendTxt: '2 this year' },
        { col: 'gold',  icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2',                                                                                                    num: '42', sup: '+', label: 'Lives Impacted',    trend: 'up',   trendTxt: 'Each unit saves 3' },
        { col: 'green', icon: 'M20 6L9 17l-5-5',                                                                                                                               num: '98', sup: '%', label: 'Response Rate',     trend: 'flat', trendTxt: 'Excellent' },
        { col: 'dark',  icon: 'M12 2v20M2 12h20',                                                                                                                              num: '4',  sup: 'yr', label: 'Donor Since',       trend: 'flat', trendTxt: 'Since May 2021' },
      ].map((s, i) => (
        <div key={i} className="ds-stat">
          <div className={`ds-stat-bar ${s.col}`} />
          <div className={`ds-stat-icon ${s.col}`}><Ic d={s.icon} size={17} /></div>
          <div className="ds-stat-num">{s.num}<span className="ds-stat-sup">{s.sup}</span></div>
          <div className="ds-stat-label">{s.label}</div>
          <div className={`ds-stat-trend ${s.trend}`}>
            {s.trend === 'up' && (
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" width="10" height="10"><path d="M2 9l4-4 4 4"/></svg>
            )}
            {s.trend === 'flat' && (
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" width="10" height="10"><path d="M2 6h8"/></svg>
            )}
            {s.trendTxt}
          </div>
        </div>
      ))}
    </div>
  )

  /* ── Shared Profile Body ── */
  const ProfileBody = (
    <>
      <div className="dpc-wrap">
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
        <div><div className="dpc-stat-num">14<span>×</span></div><div className="dpc-stat-lbl">Donations</div></div>
        <div><div className="dpc-stat-num">4<span>yr</span></div><div className="dpc-stat-lbl">Experience</div></div>
        <div><div className="dpc-stat-num">4<span>★</span></div><div className="dpc-stat-lbl">Badges</div></div>
      </div>
      <div style={{ marginTop: 18 }}>
        {[
          { lbl: 'Progress to Diamond Level', val: '14 / 20', pct: 70, cls: 'gold' },
          { lbl: 'Profile Completion',         val: '85%',     pct: 85, cls: 'red' },
        ].map((b, i) => (
          <div key={i} className="ds-prog">
            <div className="ds-prog-head"><span className="ds-prog-lbl">{b.lbl}</span><span className="ds-prog-val">{b.val}</span></div>
            <div className="ds-prog-track"><div className={`ds-prog-fill ${b.cls}`} style={{ width: `${b.pct}%` }} /></div>
          </div>
        ))}
      </div>
    </>
  )

  /* ── Requests list ── */
  const RequestList = (
    <>
      <div className="ds-tabs">
        <button className="ds-tab active">All (5)</button>
        <button className="ds-tab">Critical (2)</button>
        <button className="ds-tab">Compatible</button>
      </div>
      <div className="ds-panel-body">
        {requests.map((r, i) => (
          <div key={i} className="req-row">
            <div className="req-blood">{r.blood}</div>
            <div>
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
    </>
  )

  /* ══════════════════════════════════════════
     PAGE RENDERER
  ══════════════════════════════════════════ */
  const renderPage = () => {
    switch (active) {

      /* ── LEADERBOARD ── */
      case 'leaderboard':
        return (
          <div className="page-view">
            {StatCards}
            <div className="ds-panel">
              <div className="ds-panel-head">
                <div className="ds-panel-title">🏆 Global <em>Leaderboard</em></div>
                <span className="ds-panel-action">This Month</span>
              </div>
              <div className="ds-panel-body">
                <div className="lb-list">
                  {leaderboard.map(p => (
                    <div
                      key={p.rank} className="lb-row"
                      style={p.isMe ? { background: 'rgba(140,31,40,0.04)', margin: '0 -20px', padding: '11px 20px' } : {}}
                    >
                      <div className={`lb-rank ${p.rank <= 3 ? `r${p.rank}` : 'rn'}`}>
                        {p.rank === 1 ? '🥇' : p.rank === 2 ? '🥈' : p.rank === 3 ? '🥉' : p.rank}
                      </div>
                      <div className="lb-avatar">{p.init}</div>
                      <div className="lb-info">
                        <div className="lb-name">
                          {p.name}
                          {p.isMe && <span style={{ fontSize: 9, background: 'var(--crimson)', color: '#fff', padding: '1px 5px', borderRadius: 3, marginLeft: 5 }}>YOU</span>}
                        </div>
                        <div className="lb-city">{p.city}</div>
                      </div>
                      <div className="lb-score">{p.count}<span> donations</span></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      /* ── PROFILE ── */
      case 'profile':
        return (
          <div className="page-view">
            <div className="ds-panel">
              <div className="ds-panel-head">
                <div className="ds-panel-title">My <em>Profile</em></div>
                <button className="ds-panel-action">Edit →</button>
              </div>
              <div className="ds-panel-body">{ProfileBody}</div>
            </div>
          </div>
        )

      /* ── REQUESTS ── */
      case 'requests':
        return (
          <div className="page-view">
            <div className="ds-panel">
              <div className="ds-panel-head">
                <div className="ds-panel-title">Blood <em>Requests</em></div>
                <button className="ds-panel-action">Refresh →</button>
              </div>
              {RequestList}
            </div>
          </div>
        )

      /* ── MY REQUESTS ── */
      case 'my-requests':
        return (
          <div className="page-view">
            <div className="ds-panel">
              <div className="ds-panel-head">
                <div className="ds-panel-title">My <em>Requests</em></div>
                <button className="ds-btn ds-btn-primary" style={{ fontSize: 11, padding: '6px 12px' }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  <span>New Request</span>
                </button>
              </div>
              <div className="ds-panel-body" style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ fontSize: 38, marginBottom: 10 }}>📋</div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 19, fontWeight: 600, color: 'var(--ink)', marginBottom: 6 }}>No Active Requests</div>
                <div style={{ fontSize: 13, fontWeight: 300, lineHeight: 1.6, color: 'var(--ink-soft)' }}>You haven't posted any blood requests yet.<br />Post a request to find donors near you.</div>
              </div>
            </div>
          </div>
        )

      /* ── HISTORY ── */
      case 'history':
        return (
          <div className="page-view">
            <div className="ds-panel">
              <div className="ds-panel-head">
                <div className="ds-panel-title">Donation <em>History</em></div>
                <button className="ds-panel-action">Export →</button>
              </div>
              <div className="ds-panel-body">
                <div className="act-list">
                  {activity.filter(a => a.type === 'donated').map((a, i) => (
                    <div key={i} className="act-item">
                      <div className="act-icon-col">
                        <div className="act-icon donated">
                          <Ic d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" size={13} />
                        </div>
                        {i < 1 && <div className="act-line" />}
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

      /* ── APPOINTMENTS ── */
      case 'appointments':
        return (
          <div className="page-view">
            <div className="ds-panel">
              <div className="ds-panel-head">
                <div className="ds-panel-title">Upcoming <em>Appointments</em></div>
                <button className="ds-btn ds-btn-primary" style={{ fontSize: 11, padding: '6px 12px' }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  <span>Book Slot</span>
                </button>
              </div>
              <div className="ds-panel-body">
                <div className="appt-list">
                  {appointments.map((a, i) => (
                    <div key={i} className="appt-item">
                      <div className="appt-date">
                        <div className="appt-day">{a.day}</div>
                        <div className="appt-month">{a.month}</div>
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

      /* ── HEALTH ── */
      case 'health':
        return (
          <div className="page-view">
            <div className="ds-panel">
              <div className="ds-panel-head">
                <div className="ds-panel-title">Health <em>Tracker</em></div>
                <button className="ds-panel-action">Update →</button>
              </div>
              <div className="ds-panel-body">
                <div className="health-grid">
                  {[
                    { lbl: 'Haemoglobin',    val: '14.2', unit: 'g/dL',  status: 'good', txt: 'Normal' },
                    { lbl: 'Blood Pressure', val: '118',  unit: '/78',   status: 'good', txt: 'Healthy' },
                    { lbl: 'Weight',         val: '72',   unit: 'kg',    status: 'good', txt: 'Eligible' },
                    { lbl: 'Iron Level',     val: '88',   unit: 'μg/dL', status: 'warn', txt: 'Monitor' },
                  ].map((h, i) => (
                    <div key={i} className="health-card">
                      <div className="hc-lbl">{h.lbl}</div>
                      <div className="hc-val">{h.val} <span>{h.unit}</span></div>
                      <div className={`hc-status ${h.status}`}>{h.txt}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 18 }}>
                  {[
                    { lbl: 'Whole Blood', val: '9 times', pct: 65, cls: 'red' },
                    { lbl: 'Plasma',      val: '3 times', pct: 22, cls: 'green' },
                    { lbl: 'Platelets',   val: '2 times', pct: 14, cls: 'gold' },
                  ].map((b, i) => (
                    <div key={i} className="ds-prog" style={{ marginBottom: 12 }}>
                      <div className="ds-prog-head"><span className="ds-prog-lbl">{b.lbl}</span><span className="ds-prog-val">{b.val}</span></div>
                      <div className="ds-prog-track"><div className={`ds-prog-fill ${b.cls}`} style={{ width: `${b.pct}%` }} /></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      /* ── BADGES ── */
      case 'badges':
        return (
          <div className="page-view">
            <div className="ds-panel">
              <div className="ds-panel-head"><div className="ds-panel-title">My <em>Achievements</em></div></div>
              <div className="ds-panel-body">
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

      /* ── SETTINGS ── */
      case 'settings':
        return (
          <div className="page-view">
            <div className="ds-panel">
              <div className="ds-panel-head"><div className="ds-panel-title">Account <em>Settings</em></div></div>
              <div className="ds-panel-body">
                {[
                  { lbl: 'Full Name',    val: 'Aryan Mehta' },
                  { lbl: 'Email',        val: 'aryan.mehta@email.com' },
                  { lbl: 'Phone',        val: '+91 98765 43210' },
                  { lbl: 'City',         val: 'Mumbai, Maharashtra' },
                  { lbl: 'Blood Group',  val: 'A+' },
                ].map((f, i) => (
                  <div key={i} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: '1px solid var(--cream-d)' }}>
                    <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 3 }}>{f.lbl}</div>
                    <div style={{ fontSize: 13.5, color: 'var(--ink)', fontWeight: 500 }}>{f.val}</div>
                  </div>
                ))}
                <button className="ds-btn ds-btn-primary" style={{ marginTop: 6 }}><span>Save Changes</span></button>
              </div>
            </div>
          </div>
        )

      /* ── SUPPORT ── */
      case 'support':
        return (
          <div className="page-view">
            <div className="ds-panel">
              <div className="ds-panel-head"><div className="ds-panel-title">Support & <em>FAQ</em></div></div>
              <div className="ds-panel-body">
                {[
                  { q: 'How often can I donate blood?',          a: 'Whole blood every 56 days. Platelets every 7 days, up to 24 times/year.' },
                  { q: 'How do I edit my availability status?',  a: 'My Profile → Edit Profile → toggle your availability status.' },
                  { q: 'What happens after I respond to a request?', a: 'The requester receives your anonymous contact details for coordination.' },
                  { q: 'How do I earn badges?',                  a: 'Badges are awarded automatically at key milestones — first donation, 5 donations, and more.' },
                ].map((f, i) => (
                  <div key={i} style={{ marginBottom: 18, paddingBottom: 18, borderBottom: '1px solid var(--cream-d)' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 5 }}>{f.q}</div>
                    <div style={{ fontSize: 12.5, color: 'var(--ink-soft)', fontWeight: 300, lineHeight: 1.65 }}>{f.a}</div>
                  </div>
                ))}
                <div style={{ padding: 14, background: 'rgba(140,31,40,0.05)', border: '1px solid rgba(140,31,40,0.15)', borderRadius: 7 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>Still need help?</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-soft)', marginBottom: 10 }}>Team responds within 24 hours.</div>
                  <button className="ds-btn ds-btn-primary" style={{ fontSize: 12, padding: '7px 14px' }}><span>Contact Support</span></button>
                </div>
              </div>
            </div>
          </div>
        )

      /* ══════════════════════════════════════════
         DEFAULT — DASHBOARD
      ══════════════════════════════════════════ */
      default:
        return (
          <div className="page-view">
            {StatCards}
            <div className="ds-grid">

              {/* LEFT COLUMN */}
              <div className="ds-grid-left">

                {/* Profile Panel */}
                <div className="ds-panel">
                  <div className="ds-panel-head">
                    <div className="ds-panel-title">Donor <em>Profile</em></div>
                    <button className="ds-panel-action" onClick={() => go('profile')}>Edit →</button>
                  </div>
                  <div className="ds-panel-body">{ProfileBody}</div>
                </div>

                {/* Nearby Requests */}
                <div className="ds-panel">
                  <div className="ds-panel-head">
                    <div className="ds-panel-title">Nearby <em>Requests</em></div>
                    <button className="ds-panel-action" onClick={() => go('requests')}>View All →</button>
                  </div>
                  {RequestList}
                </div>

                {/* Activity */}
                <div className="ds-panel">
                  <div className="ds-panel-head">
                    <div className="ds-panel-title">Recent <em>Activity</em></div>
                    <button className="ds-panel-action" onClick={() => go('history')}>Full History →</button>
                  </div>
                  <div className="ds-panel-body">
                    <div className="act-list">
                      {activity.map((a, i) => (
                        <div key={i} className="act-item">
                          <div className="act-icon-col">
                            <div className={`act-icon ${a.type}`}>
                              {a.type === 'donated'  && <Ic d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" size={13} />}
                              {a.type === 'badge'    && <Ic d="M12 15l-2 5L7 9l11 4-5 2z" size={13} />}
                              {a.type === 'request'  && <Ic d="M20 6L9 17l-5-5" size={13} />}
                              {a.type === 'profile'  && <Ic d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" size={13} />}
                            </div>
                            {i < activity.length - 1 && <div className="act-line" />}
                          </div>
                          <div className="act-body"><div className="act-title">{a.title}</div><div className="act-sub">{a.sub}</div></div>
                          <div className="act-time">{a.time}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="ds-grid-right">

                {/* ID Card */}
                <div className="ds-id-card">
                  <div className="dic-top">
                    <div className="dic-brand">BloodCircle</div>
                    <div className="dic-blood">A+</div>
                  </div>
                  <div className="dic-name">Aryan Mehta</div>
                  <div className="dic-id">BC-2025-84237</div>
                  <div className="dic-divider" />
                  {[['Donations','14 times'],['Last Donated','3 days ago'],['City','Mumbai, MH'],['Since','May 2021']].map(([l, v]) => (
                    <div key={l} className="dic-row"><span className="dic-row-lbl">{l}</span><span className="dic-row-val">{v}</span></div>
                  ))}
                  <div className="dic-status">Available to Donate</div>
                </div>

                {/* Quick Actions */}
                <div className="ds-panel">
                  <div className="ds-panel-head"><div className="ds-panel-title">Quick <em>Actions</em></div></div>
                  <div className="ds-panel-body">
                    <div className="qa-grid">
                      {[
                        { d: 'M12 5v14M5 12h14',                                            cls: 'c1', lbl: 'Schedule',    sub: 'Book next slot',  pg: 'appointments' },
                        { d: 'M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z',    cls: 'c2', lbl: 'Find Requests',sub: 'Browse needs',    pg: 'requests' },
                        { d: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2',                  cls: 'c3', lbl: 'My Profile',   sub: 'View & edit',     pg: 'profile' },
                        { d: 'M18 20V10M12 20V4M6 20v-6',                                   cls: 'c4', lbl: 'Leaderboard', sub: 'See rankings',     pg: 'leaderboard' },
                      ].map((q, i) => (
                        <button key={i} className="qa-btn" onClick={() => go(q.pg)}>
                          <div className={`qa-icon ${q.cls}`}><Ic d={q.d} size={13} /></div>
                          <div><div className="qa-label">{q.lbl}</div><div className="qa-sub">{q.sub}</div></div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Appointments */}
                <div className="ds-panel">
                  <div className="ds-panel-head">
                    <div className="ds-panel-title">Upcoming</div>
                    <button className="ds-panel-action" onClick={() => go('appointments')}>Manage →</button>
                  </div>
                  <div className="ds-panel-body">
                    <div className="appt-list">
                      {appointments.map((a, i) => (
                        <div key={i} className="appt-item">
                          <div className="appt-date">
                            <div className="appt-day">{a.day}</div>
                            <div className="appt-month">{a.month}</div>
                          </div>
                          <div className="appt-divider" />
                          <div className="appt-info"><div className="appt-title">{a.title}</div><div className="appt-loc">{a.loc}</div></div>
                          <div className={`appt-status ${a.status}`}>{a.status}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div className="ds-panel">
                  <div className="ds-panel-head">
                    <div className="ds-panel-title">Achievements</div>
                    <button className="ds-panel-action" onClick={() => go('badges')}>All →</button>
                  </div>
                  <div className="ds-panel-body">
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

  /* ══════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════ */
  return (
    <div className="ds">

      {/* Mobile overlay */}
      <div
        className={`ds-overlay ${sidebarOpen ? 'show' : ''}`}
        onClick={() => setSidebar(false)}
        aria-hidden
      />

      {/* ── SIDEBAR ── */}
      <aside className={`ds-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="ds-sb-inner">

          <div className="ds-sb-brand">
            <a href="/" className="ds-logo">
              <div className="ds-logo-mark" />
              <div>
                <div className="ds-logo-name">Blood<span>Circle</span></div>
                <div className="ds-logo-tag">Donor Portal</div>
              </div>
            </a>
            <button className="ds-sb-close" onClick={() => setSidebar(false)} aria-label="Close">
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M1 1l12 12M13 1L1 13" />
              </svg>
            </button>
          </div>

          <div className="ds-sb-user">
            <div className="ds-sb-user-row">
              <div className="ds-sb-avatar">
                A
                <div className="ds-sb-avatar-dot" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="ds-sb-user-name">Aryan Mehta</div>
                <div className="ds-sb-user-id">BC-2025-84237</div>
              </div>
              <div className="ds-sb-blood">A+</div>
            </div>
          </div>

          <nav className="ds-sb-nav">
            {navGroups.map(g => (
              <div key={g.section}>
                <div className="ds-sb-section">{g.section}</div>
                {g.items.map(item => (
                  <button
                    key={item.id}
                    className={`ds-nav-item ${active === item.id ? 'active' : ''}`}
                    onClick={() => go(item.id)}
                  >
                    <span className="ds-nav-icon"><Ic d={item.icon} size={14} /></span>
                    {item.label}
                    {item.badge && (
                      <span className={`ds-nav-badge ${(item as any).badgeType || ''}`}>{item.badge}</span>
                    )}
                  </button>
                ))}
              </div>
            ))}
          </nav>

          <div className="ds-sb-prompt">
            <div className="ds-sb-prompt-title">Next Donation</div>
            <div className="ds-sb-prompt-sub">Eligible again on June 18 — schedule now!</div>
            <button className="ds-sb-prompt-btn" onClick={() => go('appointments')}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Schedule
            </button>
          </div>

          <div className="ds-sb-footer">
            <button className="ds-logout-btn">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Log Out
            </button>
            <div className="ds-footer-links">
              <a href="#" className="ds-footer-link">Privacy</a>
              <a href="#" className="ds-footer-link">Terms</a>
              <a href="#" className="ds-footer-link">Help</a>
            </div>
          </div>

        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="ds-main">

        {/* Topbar */}
        <header className="ds-topbar">
          <button className="ds-hamburger" onClick={() => setSidebar(o => !o)} aria-label="Menu">
            <span /><span /><span />
          </button>

          <div className="ds-topbar-crumb">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
            <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M3 2l4 3-4 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <strong>{pageLabel[active] ?? 'Dashboard'}</strong>
          </div>

          <div className="ds-topbar-space" />

          <div className="ds-topbar-search">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input type="text" placeholder="Search donors, requests…" />
          </div>

          <div className="ds-topbar-actions">
            <button className="ds-topbar-icon-btn" aria-label="Notifications">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <div className="ds-notif-dot" />
            </button>
            <div className="ds-topbar-user">
              <div className="ds-topbar-avatar">A</div>
              <span className="ds-topbar-uname">Aryan Mehta</span>
              <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
            </div>
          </div>
        </header>

        {/* Scrollable body */}
        <div className="ds-body">
          <div className="ds-content">

            {/* Urgent alert */}
            {!alertDismissed && active === 'dashboard' && (
              <div className="ds-alert">
                <div className="ds-alert-icon">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                </div>
                <div className="ds-alert-body">
                  <div className="ds-alert-title">🚨 Urgent B+ request — Ramesh S. at KEM Hospital (2.1 km)</div>
                  <div className="ds-alert-text">Critical need · Posted 12 minutes ago · You are eligible to donate.</div>
                </div>
                <button className="ds-alert-close" onClick={() => setAlert(true)}>×</button>
              </div>
            )}

            {/* Page header */}
            <div className="ds-page-header">
              <div className="ds-page-header-left">
                <div className="ds-eyebrow">
                  <div className="ds-eyebrow-dot" />
                  Active Donor
                </div>
                <h1 className="ds-page-title">
                  {active === 'dashboard'
                    ? <>Welcome back, <em>Aryan.</em></>
                    : pageLabel[active]}
                </h1>
                <div className="ds-page-date">{today}</div>
              </div>
              {active === 'dashboard' && (
                <div className="ds-header-btns">
                  <button className="ds-btn ds-btn-ghost">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                      <polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>
                    </svg>
                    <span>Share</span>
                  </button>
                  <button className="ds-btn ds-btn-primary" onClick={() => go('appointments')}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    <span>Schedule</span>
                  </button>
                </div>
              )}
            </div>

            {renderPage()}
          </div>
        </div>

      </div>

      {/* ── BOTTOM NAV (mobile) ── */}
      <nav className="ds-bottom-nav">
        {bottomNav.map(item => (
          <button
            key={item.id}
            className={`ds-bn-item ${active === item.id ? 'active' : ''}`}
            onClick={() => go(item.id)}
          >
            {item.badge && <span className="ds-bn-badge">{item.badge}</span>}
            <span className="ds-bn-icon"><Ic d={item.icon} size={20} /></span>
            {item.label}
          </button>
        ))}
      </nav>

    </div>
  )
}