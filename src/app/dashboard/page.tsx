'use client'

import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import './dashboard.css'

/* ── SVG Icon helper ── */
const Ic = ({ d, size = 16 }: { d: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
)

/* ══════════════════════════════════════════
   BOTTOM NAV (mobile)
══════════════════════════════════════════ */
const bottomNav = [
  { id: 'dashboard',    label: 'Home',      icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' },
  { id: 'find-drives',  label: 'Drives',    icon: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z' },
  { id: 'appointments', label: 'Book',      icon: 'M8 2h8M12 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', badge: '2' },
  { id: 'requests',     label: 'Requests',  icon: 'M22 12h-4l-3 9L9 3l-3 9H2', badge: '5' },
  { id: 'profile',      label: 'Profile',   icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' },
]

const pageLabel: Record<string, string> = {
  dashboard: 'Dashboard',
  'find-drives': 'Find Donation Drives',
  appointments: 'Book Appointment',
  requests: 'Blood Requests',
  'my-requests': 'My Requests',
  history: 'Donation History',
  eligibility: 'Eligibility Status',
  badges: 'Impact & Rewards',
  favorites: 'Saved Drives',
  health: 'Health & Reports',
  profile: 'Profile & Settings',
  referral: 'Referral Program',
  leaderboard: 'Leaderboard',
  support: 'Support & FAQ',
}

/* ══════════════════════════════════════════
   MOCK DATA
══════════════════════════════════════════ */
const donor = {
  name: 'Rakibul Hasan',
  initials: 'R',
  bloodGroup: 'A+',
  donorId: 'LF-2026-00427',
  lastDonationDays: 42,
  totalDonations: 7,
  livesImpacted: 21,
  nextEligible: 'May 20, 2026',
  isEligible: true,
  streak: 2,
  thisYear: 3,
  city: 'Gazipur, Dhaka',
  level: 'Regular Donor',
}

const upcomingDrives = [
  {
    date: '16 May',
    title: 'Gazipur District Blood Drive',
    org: 'Red Crescent Society',
    location: 'Gazipur City Hall, Boardbazar',
    distance: '1.4 km',
    bloodGroups: ['A+', 'O+', 'B+'],
    slots: 12,
    urgent: true,
  },
  {
    date: '18 May',
    title: 'Dhaka Medical College Camp',
    org: 'DMC Voluntary Blood Donors',
    location: 'DMC Campus, Bakshibazar',
    distance: '8.2 km',
    bloodGroups: ['O-', 'AB+', 'A+'],
    slots: 25,
    urgent: false,
  },
  {
    date: '22 May',
    title: 'Corporate Drive — Bashundhara',
    org: 'Bashundhara Group CSR',
    location: 'Bashundhara City, Panthapath',
    distance: '14.7 km',
    bloodGroups: ['All Groups'],
    slots: 80,
    urgent: false,
  },
]

const recentActivity = [
  {
    type: 'donated',
    title: 'Whole Blood Donated — 450 ml',
    sub: 'Dhaka Medical College Hospital · Your donation helped a mother during delivery',
    time: '42 days ago',
    impact: '3 lives',
  },
  {
    type: 'badge',
    title: 'Badge Earned: "Consistent Donor"',
    sub: 'Donated 3 times in a single year',
    time: '42 days ago',
  },
  {
    type: 'request',
    title: 'Responded to Emergency Request',
    sub: 'A+ blood for post-surgery patient — Shaheed Suhrawardy Hospital',
    time: '3 months ago',
  },
  {
    type: 'donated',
    title: 'Platelets Donated',
    sub: 'Square Hospital Dhaka · Thalassaemia patient treatment',
    time: '5 months ago',
    impact: '1 life',
  },
]

const leaderboardData = [
  { rank: 1, name: 'Farhan Ahmed',   city: 'Dhaka',   count: 24, init: 'F' },
  { rank: 2, name: 'Sadia Islam',    city: 'Gazipur', count: 19, init: 'S' },
  { rank: 3, name: 'Tanvir Hossain', city: 'Dhaka',   count: 16, init: 'T' },
  { rank: 4, name: 'Rakibul Hasan',  city: 'Gazipur', count: 7,  init: 'R', isMe: true },
  { rank: 5, name: 'Nusrat Jahan',   city: 'Dhaka',   count: 6,  init: 'N' },
]

const bloodRequests = [
  { blood: 'B+',  name: 'Karim Uddin',    loc: 'DMCH, Bakshibazar · 8 km',          urgency: 'critical' as const },
  { blood: 'O-',  name: 'Sharmin Akter',  loc: 'Square Hospital · 12 km',           urgency: 'critical' as const },
  { blood: 'A+',  name: 'Jahangir Alam',  loc: 'Suhrawardy Hospital · 9.3 km',      urgency: 'moderate' as const },
  { blood: 'AB+', name: 'Riya Begum',     loc: 'Holy Family Hospital · 15.2 km',    urgency: 'moderate' as const },
  { blood: 'O+',  name: 'Mostak Ahmed',   loc: 'Enam Medical College · 18 km',      urgency: 'stable'   as const },
]

const appointments = [
  { day: '20', month: 'May', title: 'Whole Blood Donation', loc: 'Gazipur City Hall Drive', status: 'confirmed' as const },
  { day: '18', month: 'Jun', title: 'Platelet Donation',    loc: 'Dhaka Medical College',   status: 'pending'   as const },
]

const badges = [
  { icon: '🩸', name: 'First Drop',   earned: true  },
  { icon: '🔥', name: '5 Donations',  earned: true  },
  { icon: '⭐', name: 'Consistent',   earned: true  },
  { icon: '🏆', name: 'Champion',     earned: false },
  { icon: '💎', name: 'Diamond',      earned: false },
  { icon: '🌍', name: 'City Hero',    earned: false },
]

/* ══════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════ */
export default function Dashboard() {
  const [active, setActive]       = useState('dashboard')
  const [sidebarOpen, setSidebar] = useState(false)
  const [alertDismissed, setAlert]= useState(false)
  const [activeTab, setTab]       = useState(0)

  useEffect(() => {
    const nav    = document.querySelector('nav[class]') as HTMLElement | null
    const footer = document.querySelector('footer')     as HTMLElement | null
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

  const today = new Date().toLocaleDateString('en-BD', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })

  /* ───────────── Stat Cards ───────────── */
  const StatCards = (
    <div className="ds-stats">
      {[
        { col: 'red',   icon: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z', num: String(donor.totalDonations), sup: '×',  label: 'Total Donations', trend: 'up',  trendTxt: '3 this year' },
        { col: 'gold',  icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2',                                                                                                    num: String(donor.livesImpacted),  sup: '+',  label: 'Lives Impacted',  trend: 'up',  trendTxt: '3 per unit donated' },
        { col: 'green', icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',                                                                                               num: String(donor.thisYear),       sup: ' ',  label: 'Donations 2026',  trend: 'up',  trendTxt: '+1 from last month' },
        { col: 'dark',  icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',                                                                                                               num: String(donor.streak),         sup: '🔥', label: 'Current Streak',  trend: 'flat', trendTxt: 'Donations in 2026' },
      ].map((s, i) => (
        <div key={i} className="ds-stat">
          <div className={`ds-stat-bar ${s.col}`} />
          <div className={`ds-stat-icon ${s.col}`}><Ic d={s.icon} size={17} /></div>
          <div className="ds-stat-num">{s.num}<span className="ds-stat-sup">{s.sup}</span></div>
          <div className="ds-stat-label">{s.label}</div>
          <div className={`ds-stat-trend ${s.trend}`}>
            {s.trend === 'up' && <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" width="10" height="10"><path d="M2 9l4-4 4 4"/></svg>}
            {s.trendTxt}
          </div>
        </div>
      ))}
    </div>
  )

  /* ══════════════════════════════════════
     PAGE RENDERER
  ══════════════════════════════════════ */
  const renderPage = () => {
    switch (active) {

      /* ─────────── FIND DRIVES ─────────── */
      case 'find-drives':
        return (
          <div className="page-view">
            {/* Filter bar */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
              {['All Drives', 'Today', 'This Week', 'Compatible Group', 'Nearby'].map((f, i) => (
                <button
                  key={f}
                  style={{
                    padding: '6px 14px', borderRadius: 4, fontSize: 11.5, fontWeight: 500,
                    background: i === 0 ? 'var(--crimson)' : 'var(--white)',
                    color: i === 0 ? 'var(--white)' : 'var(--ink-soft)',
                    border: `1.5px solid ${i === 0 ? 'var(--crimson)' : 'var(--cream-dd)'}`,
                    cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
                  }}
                >{f}</button>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {upcomingDrives.map((d, i) => (
                <div key={i} className="ds-panel" style={{ borderLeft: d.urgent ? '3px solid var(--crimson)' : undefined }}>
                  <div className="ds-panel-body" style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    {/* Date block */}
                    <div style={{ textAlign: 'center', width: 44, flexShrink: 0 }}>
                      <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>{d.date.split(' ')[1]}</div>
                      <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 30, fontWeight: 700, color: 'var(--crimson)', lineHeight: 1 }}>{d.date.split(' ')[0]}</div>
                    </div>
                    <div style={{ width: 1, height: 52, background: 'var(--cream-dd)', flexShrink: 0, alignSelf: 'center' }} />
                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 17, fontWeight: 600, color: 'var(--ink)' }}>{d.title}</div>
                        {d.urgent && <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.06em', background: 'rgba(140,31,40,0.1)', color: 'var(--crimson)', padding: '2px 7px', borderRadius: 3, textTransform: 'uppercase' }}>Urgent</span>}
                      </div>
                      <div style={{ fontSize: 11.5, color: 'var(--ink-soft)', marginBottom: 6 }}>🏥 {d.org} &nbsp;·&nbsp; 📍 {d.location}</div>
                      <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 10.5, background: 'var(--cream-d)', padding: '2px 8px', borderRadius: 3, color: 'var(--ink-mid)' }}>📍 {d.distance}</span>
                        <span style={{ fontSize: 10.5, background: 'rgba(45,122,74,0.08)', padding: '2px 8px', borderRadius: 3, color: 'var(--success)' }}>{d.slots} slots open</span>
                        {d.bloodGroups.map(bg => (
                          <span key={bg} style={{ fontSize: 10.5, background: 'rgba(140,31,40,0.08)', padding: '2px 8px', borderRadius: 3, color: 'var(--crimson)', fontFamily: 'Cormorant Garamond, serif', fontWeight: 700 }}>{bg}</span>
                        ))}
                      </div>
                    </div>
                    <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <button className="ds-btn ds-btn-primary" style={{ fontSize: 11, padding: '7px 14px' }} onClick={() => go('appointments')}><span>Register</span></button>
                      <button style={{ fontSize: 10.5, background: 'none', border: 'none', color: 'var(--ink-soft)', cursor: 'pointer', textAlign: 'center' }}>⭐ Save</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      /* ─────────── APPOINTMENTS ─────────── */
      case 'appointments':
        return (
          <div className="page-view">
            <div className="ds-panel" style={{ marginBottom: 16 }}>
              <div className="ds-panel-head">
                <div className="ds-panel-title">Upcoming <em>Appointments</em></div>
                <button className="ds-btn ds-btn-primary" style={{ fontSize: 11, padding: '6px 12px' }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  <span>Book New Slot</span>
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

            {/* Nearby drives to register */}
            <div className="ds-panel">
              <div className="ds-panel-head">
                <div className="ds-panel-title">Available <em>Drives Near You</em></div>
                <button className="ds-panel-action" onClick={() => go('find-drives')}>Browse All →</button>
              </div>
              <div className="ds-panel-body">
                {upcomingDrives.slice(0, 2).map((d, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < 1 ? '1px solid var(--cream-d)' : 'none' }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{d.title}</div>
                      <div style={{ fontSize: 11, color: 'var(--ink-soft)', marginTop: 2 }}>{d.date} · {d.distance}</div>
                    </div>
                    <button className="ds-btn ds-btn-primary" style={{ fontSize: 11, padding: '6px 12px' }}><span>Register</span></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      /* ─────────── REQUESTS ─────────── */
      case 'requests':
        return (
          <div className="page-view">
            <div className="ds-panel">
              <div className="ds-panel-head">
                <div className="ds-panel-title">Blood <em>Requests</em></div>
                <button className="ds-panel-action">Refresh →</button>
              </div>
              <div className="ds-tabs">
                {['All (5)', 'Critical (2)', 'Compatible', 'Nearby'].map((t, i) => (
                  <button key={t} className={`ds-tab ${activeTab === i ? 'active' : ''}`} onClick={() => setTab(i)}>{t}</button>
                ))}
              </div>
              <div className="ds-panel-body">
                {bloodRequests.map((r, i) => (
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
            </div>
          </div>
        )

      /* ─────────── MY REQUESTS ─────────── */
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

      /* ─────────── HISTORY ─────────── */
      case 'history':
        return (
          <div className="page-view">
            <div className="ds-panel">
              <div className="ds-panel-head">
                <div className="ds-panel-title">Donation <em>History</em></div>
                <button className="ds-panel-action">Export PDF →</button>
              </div>
              <div className="ds-panel-body">
                <div className="act-list">
                  {recentActivity.filter(a => a.type === 'donated').map((a, i) => (
                    <div key={i} className="act-item">
                      <div className="act-icon-col">
                        <div className="act-icon donated"><Ic d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" size={13} /></div>
                        {i === 0 && <div className="act-line" />}
                      </div>
                      <div className="act-body">
                        <div className="act-title">{a.title}</div>
                        <div className="act-sub">{a.sub}</div>
                        {a.impact && <div style={{ fontSize: 10.5, color: 'var(--success)', marginTop: 3, fontWeight: 600 }}>✓ Saved approx. {a.impact}</div>}
                      </div>
                      <div className="act-time">{a.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      /* ─────────── ELIGIBILITY ─────────── */
      case 'eligibility':
        return (
          <div className="page-view">
            {/* Big eligibility card */}
            <div className="ds-panel" style={{ marginBottom: 16 }}>
              <div className="ds-panel-body" style={{ textAlign: 'center', padding: '32px 24px' }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '6px 18px', borderRadius: 20,
                  background: donor.isEligible ? 'rgba(45,122,74,0.1)' : 'rgba(192,122,26,0.1)',
                  color: donor.isEligible ? 'var(--success)' : 'var(--warning)',
                  fontSize: 12, fontWeight: 700, letterSpacing: '0.07em', marginBottom: 16,
                }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
                  {donor.isEligible ? '✓ READY TO DONATE' : 'NOT ELIGIBLE YET'}
                </div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 52, fontWeight: 700, color: 'var(--crimson)', lineHeight: 1, marginBottom: 8 }}>
                  {donor.lastDonationDays}<span style={{ fontSize: 20, color: 'var(--ink-soft)' }}> days</span>
                </div>
                <div style={{ fontSize: 14, color: 'var(--ink-soft)', marginBottom: 6 }}>since your last donation</div>
                <div style={{ fontSize: 13, color: 'var(--ink-mid)', fontWeight: 500, marginBottom: 24 }}>
                  Next eligible: <strong style={{ color: 'var(--success)' }}>{donor.nextEligible}</strong>
                </div>
                <button className="ds-btn ds-btn-primary" style={{ fontSize: 14, padding: '11px 28px' }} onClick={() => go('appointments')}>
                  <span>🩸 Book Donation Now</span>
                </button>
              </div>
            </div>

            {/* Health checklist */}
            <div className="ds-panel">
              <div className="ds-panel-head"><div className="ds-panel-title">Pre-Donation <em>Checklist</em></div></div>
              <div className="ds-panel-body">
                {[
                  { item: 'Age between 18–60 years', ok: true },
                  { item: 'Weight above 50 kg', ok: true },
                  { item: 'Haemoglobin ≥ 12.5 g/dL', ok: true },
                  { item: 'No fever or cold in last 2 weeks', ok: true },
                  { item: 'Minimum 56 days since last donation', ok: true },
                  { item: 'Not pregnant or recently gave birth', ok: true },
                  { item: 'No recent tattoo or piercing (< 6 months)', ok: true },
                ].map((c, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '9px 0', borderBottom: i < 6 ? '1px solid var(--cream-d)' : 'none' }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                      background: c.ok ? 'rgba(45,122,74,0.1)' : 'rgba(192,57,43,0.1)',
                      color: c.ok ? 'var(--success)' : 'var(--error)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11,
                    }}>{c.ok ? '✓' : '✗'}</div>
                    <div style={{ fontSize: 13, color: 'var(--ink)', fontWeight: 400 }}>{c.item}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      /* ─────────── BADGES / IMPACT ─────────── */
      case 'badges':
        return (
          <div className="page-view">
            {StatCards}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
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

              <div className="ds-panel">
                <div className="ds-panel-head"><div className="ds-panel-title">Local <em>Leaderboard</em></div></div>
                <div className="ds-panel-body">
                  <div className="lb-list">
                    {leaderboardData.map(p => (
                      <div key={p.rank} className="lb-row" style={p.isMe ? { background: 'rgba(140,31,40,0.04)', margin: '0 -20px', padding: '11px 20px' } : {}}>
                        <div className={`lb-rank ${p.rank <= 3 ? `r${p.rank}` : 'rn'}`}>{p.rank === 1 ? '🥇' : p.rank === 2 ? '🥈' : p.rank === 3 ? '🥉' : p.rank}</div>
                        <div className="lb-avatar">{p.init}</div>
                        <div className="lb-info">
                          <div className="lb-name">
                            {p.name}
                            {p.isMe && <span style={{ fontSize: 9, background: 'var(--crimson)', color: '#fff', padding: '1px 5px', borderRadius: 3, marginLeft: 5 }}>YOU</span>}
                          </div>
                          <div className="lb-city">{p.city}</div>
                        </div>
                        <div className="lb-score">{p.count}<span> don.</span></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      /* ─────────── HEALTH ─────────── */
      case 'health':
        return (
          <div className="page-view">
            <div className="ds-panel" style={{ marginBottom: 16 }}>
              <div className="ds-panel-head">
                <div className="ds-panel-title">Health <em>Snapshot</em></div>
                <button className="ds-panel-action">Update →</button>
              </div>
              <div className="ds-panel-body">
                <div className="health-grid">
                  {[
                    { lbl: 'Haemoglobin',    val: '13.8', unit: 'g/dL',  status: 'good', txt: 'Normal' },
                    { lbl: 'Blood Pressure', val: '120',  unit: '/80',   status: 'good', txt: 'Healthy' },
                    { lbl: 'Weight',         val: '68',   unit: 'kg',    status: 'good', txt: 'Eligible' },
                    { lbl: 'Iron Level',     val: '82',   unit: 'μg/dL', status: 'warn', txt: 'Monitor' },
                  ].map((h, i) => (
                    <div key={i} className="health-card">
                      <div className="hc-lbl">{h.lbl}</div>
                      <div className="hc-val">{h.val}<span> {h.unit}</span></div>
                      <div className={`hc-status ${h.status}`}>{h.txt}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="ds-panel">
              <div className="ds-panel-head"><div className="ds-panel-title">Donation <em>Breakdown</em></div></div>
              <div className="ds-panel-body">
                {[
                  { lbl: 'Whole Blood', val: '4 times', pct: 57, cls: 'red' },
                  { lbl: 'Platelets',   val: '3 times', pct: 43, cls: 'gold' },
                ].map((b, i) => (
                  <div key={i} className="ds-prog" style={{ marginBottom: 14 }}>
                    <div className="ds-prog-head"><span className="ds-prog-lbl">{b.lbl}</span><span className="ds-prog-val">{b.val}</span></div>
                    <div className="ds-prog-track"><div className={`ds-prog-fill ${b.cls}`} style={{ width: `${b.pct}%` }} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      /* ─────────── PROFILE ─────────── */
      case 'profile':
        return (
          <div className="page-view">
            <div className="ds-panel" style={{ marginBottom: 16 }}>
              <div className="ds-panel-head">
                <div className="ds-panel-title">My <em>Profile</em></div>
                <button className="ds-panel-action">Edit →</button>
              </div>
              <div className="ds-panel-body">
                <div className="dpc-wrap">
                  <div className="dpc-avatar-wrap">
                    <div className="dpc-avatar">{donor.initials}</div>
                    <div className="dpc-verified">✓</div>
                  </div>
                  <div className="dpc-info">
                    <div className="dpc-name">{donor.name}</div>
                    <div className="dpc-id">ID · {donor.donorId}</div>
                    <div className="dpc-tags">
                      <span className="dpc-tag blood">{donor.bloodGroup}</span>
                      <span className="dpc-tag avail">● Available</span>
                      <span className="dpc-tag city">📍 {donor.city}</span>
                      <span className="dpc-tag level">⭐ {donor.level}</span>
                    </div>
                  </div>
                </div>
                <div className="dpc-stats">
                  <div><div className="dpc-stat-num">{donor.totalDonations}<span>×</span></div><div className="dpc-stat-lbl">Donations</div></div>
                  <div><div className="dpc-stat-num">{donor.livesImpacted}<span>+</span></div><div className="dpc-stat-lbl">Lives Saved</div></div>
                  <div><div className="dpc-stat-num">3<span>★</span></div><div className="dpc-stat-lbl">Badges</div></div>
                </div>
                <div style={{ marginTop: 18 }}>
                  {[
                    { lbl: 'Progress to Champion Level', val: '7 / 10', pct: 70, cls: 'gold' },
                    { lbl: 'Profile Completion', val: '80%', pct: 80, cls: 'red' },
                  ].map((b, i) => (
                    <div key={i} className="ds-prog">
                      <div className="ds-prog-head"><span className="ds-prog-lbl">{b.lbl}</span><span className="ds-prog-val">{b.val}</span></div>
                      <div className="ds-prog-track"><div className={`ds-prog-fill ${b.cls}`} style={{ width: `${b.pct}%` }} /></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="ds-panel">
              <div className="ds-panel-head"><div className="ds-panel-title">Account <em>Settings</em></div></div>
              <div className="ds-panel-body">
                {[
                  { lbl: 'Full Name', val: donor.name },
                  { lbl: 'Email', val: 'rakibul.hasan@email.com' },
                  { lbl: 'Phone', val: '+880 1700-000000' },
                  { lbl: 'City', val: donor.city },
                  { lbl: 'Blood Group', val: donor.bloodGroup },
                  { lbl: 'Emergency Contact', val: '+880 1800-000000' },
                ].map((f, i) => (
                  <div key={i} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: '1px solid var(--cream-d)' }}>
                    <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 3 }}>{f.lbl}</div>
                    <div style={{ fontSize: 13.5, color: 'var(--ink)', fontWeight: 500 }}>{f.val}</div>
                  </div>
                ))}
                <button className="ds-btn ds-btn-primary" style={{ marginTop: 4 }}><span>Save Changes</span></button>
              </div>
            </div>
          </div>
        )

      /* ─────────── LEADERBOARD ─────────── */
      case 'leaderboard':
        return (
          <div className="page-view">
            {StatCards}
            <div className="ds-panel">
              <div className="ds-panel-head">
                <div className="ds-panel-title">🏆 Gazipur / Dhaka <em>Leaderboard</em></div>
                <span className="ds-panel-action">This Month ▾</span>
              </div>
              <div className="ds-panel-body">
                <div className="lb-list">
                  {leaderboardData.map(p => (
                    <div key={p.rank} className="lb-row" style={p.isMe ? { background: 'rgba(140,31,40,0.04)', margin: '0 -20px', padding: '11px 20px' } : {}}>
                      <div className={`lb-rank ${p.rank <= 3 ? `r${p.rank}` : 'rn'}`}>{p.rank === 1 ? '🥇' : p.rank === 2 ? '🥈' : p.rank === 3 ? '🥉' : p.rank}</div>
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

      /* ─────────── REFERRAL ─────────── */
      case 'referral':
        return (
          <div className="page-view">
            <div className="ds-panel">
              <div className="ds-panel-head"><div className="ds-panel-title">Referral <em>Program</em></div></div>
              <div className="ds-panel-body" style={{ textAlign: 'center', padding: '32px 24px' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🤝</div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 600, color: 'var(--ink)', marginBottom: 8 }}>Invite Friends to Save Lives</div>
                <div style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.7, marginBottom: 20, maxWidth: 380, margin: '0 auto 20px' }}>
                  Invite a friend and earn <strong style={{ color: 'var(--gold)' }}>50 reward points</strong> when they complete their first donation.
                </div>
                <div style={{ background: 'var(--cream-d)', borderRadius: 6, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, maxWidth: 360, margin: '0 auto 16px' }}>
                  <div style={{ flex: 1, fontSize: 14, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--ink)', fontFamily: 'Cormorant Garamond, serif' }}>LF-REF-RAKIB427</div>
                  <button style={{ fontSize: 11, padding: '5px 12px', background: 'var(--crimson)', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>Copy</button>
                </div>
                <button className="ds-btn ds-btn-primary" style={{ margin: '0 auto' }}><span>📤 Share Invite Link</span></button>
              </div>
            </div>
          </div>
        )

      /* ─────────── SUPPORT ─────────── */
      case 'support':
        return (
          <div className="page-view">
            <div className="ds-panel">
              <div className="ds-panel-head"><div className="ds-panel-title">Support & <em>FAQ</em></div></div>
              <div className="ds-panel-body">
                {[
                  { q: 'How often can I donate blood?',                  a: 'Whole blood every 56 days. Platelets every 7 days, up to 24 times per year. Plasma every 28 days.' },
                  { q: 'What are the eligibility requirements?',         a: 'Must be 18–60 years old, weigh over 50 kg, haemoglobin ≥ 12.5 g/dL, and be in good health.' },
                  { q: 'How do I respond to an emergency request?',      a: 'Click "Respond" on any blood request. The requester receives your contact details anonymously for coordination.' },
                  { q: 'How are my impact stats calculated?',            a: 'Each whole blood donation can save up to 3 lives. Platelets and plasma contributions are counted separately.' },
                  { q: 'How do I download my donor certificate?',        a: 'Go to Donation History → select any entry → tap "Download Certificate".' },
                ].map((f, i) => (
                  <div key={i} style={{ marginBottom: 18, paddingBottom: 18, borderBottom: '1px solid var(--cream-d)' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 5 }}>{f.q}</div>
                    <div style={{ fontSize: 12.5, color: 'var(--ink-soft)', fontWeight: 300, lineHeight: 1.65 }}>{f.a}</div>
                  </div>
                ))}
                <div style={{ padding: 14, background: 'rgba(140,31,40,0.05)', border: '1px solid rgba(140,31,40,0.15)', borderRadius: 7 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>Still need help?</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-soft)', marginBottom: 10 }}>Our team responds within 24 hours.</div>
                  <button className="ds-btn ds-btn-primary" style={{ fontSize: 12, padding: '7px 14px' }}><span>Contact Support</span></button>
                </div>
              </div>
            </div>
          </div>
        )

      /* ══════════════════════════════════════
         DEFAULT — MAIN DASHBOARD
      ══════════════════════════════════════ */
      default:
        return (
          <div className="page-view">

            {/* ── Hero Eligibility Card ── */}
            <div style={{
              background: 'linear-gradient(135deg, var(--ink) 0%, #2e1215 100%)',
              borderRadius: 10, padding: '24px 28px', marginBottom: 20,
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Decorative radial */}
              <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(140,31,40,0.35), transparent 70%)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: -20, left: 80, width: 140, height: 140, borderRadius: '50%', background: 'radial-gradient(circle, rgba(184,146,42,0.12), transparent 70%)', pointerEvents: 'none' }} />

              <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>
                    👋 Good morning, {donor.name.split(' ')[0]}
                  </div>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: 6 }}>
                    Your blood group is{' '}
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      width: 48, height: 48, borderRadius: '50%',
                      background: 'var(--crimson)', fontSize: 20, fontWeight: 800,
                      verticalAlign: 'middle', marginLeft: 4,
                    }}>{donor.bloodGroup}</span>
                  </div>

                  {/* Eligibility status pill */}
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '5px 14px', borderRadius: 20,
                    background: donor.isEligible ? 'rgba(45,122,74,0.2)' : 'rgba(192,122,26,0.2)',
                    border: `1px solid ${donor.isEligible ? 'rgba(45,122,74,0.4)' : 'rgba(192,122,26,0.4)'}`,
                    marginTop: 10,
                  }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: donor.isEligible ? 'var(--success)' : 'var(--warning)', display: 'inline-block', animation: 'pulse 1.8s infinite' }} />
                    <span style={{ fontSize: 11.5, fontWeight: 600, color: donor.isEligible ? '#5ecb8a' : '#f0a64e', letterSpacing: '0.06em' }}>
                      {donor.isEligible ? 'Ready to Donate' : 'Not Eligible Yet'}
                    </span>
                  </div>

                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 8 }}>
                    Last donation: <strong style={{ color: 'rgba(255,255,255,0.7)' }}>{donor.lastDonationDays} days ago</strong>
                    &nbsp;·&nbsp; Next eligible: <strong style={{ color: '#5ecb8a' }}>{donor.nextEligible}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <button
                    className="ds-btn ds-btn-primary"
                    style={{ fontSize: 14, padding: '12px 28px', fontWeight: 700, letterSpacing: '0.06em' }}
                    onClick={() => go('appointments')}
                  >
                    <span>🩸 Book Now</span>
                  </button>
                  <button
                    style={{ fontSize: 11.5, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.6)', padding: '7px 16px', borderRadius: 5, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}
                    onClick={() => go('eligibility')}
                  >
                    View Eligibility Details
                  </button>
                </div>
              </div>
            </div>

            {/* ── Stats ── */}
            {StatCards}

            {/* ── Main grid ── */}
            <div className="ds-grid">

              {/* LEFT */}
              <div className="ds-grid-left">

                {/* Quick Actions */}
                <div className="ds-panel">
                  <div className="ds-panel-head"><div className="ds-panel-title">Quick <em>Actions</em></div></div>
                  <div className="ds-panel-body">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                      {[
                        { icon: '📅', lbl: 'Book Donation', sub: 'Schedule a slot', col: 'c1', pg: 'appointments' },
                        { icon: '📍', lbl: 'Find Nearby Camp', sub: 'View local drives', col: 'c2', pg: 'find-drives' },
                        { icon: '🆘', lbl: 'Request Blood', sub: 'For family/others', col: 'c3', pg: 'my-requests' },
                        { icon: '📄', lbl: 'Donor Certificate', sub: 'Download PDF', col: 'c4', pg: 'history' },
                      ].map((q, i) => (
                        <button key={i} className="qa-btn" style={{ alignItems: 'center', textAlign: 'center', gap: 8 }} onClick={() => go(q.pg)}>
                          <div style={{ fontSize: 26, lineHeight: 1 }}>{q.icon}</div>
                          <div><div className="qa-label" style={{ textAlign: 'center' }}>{q.lbl}</div><div className="qa-sub" style={{ textAlign: 'center' }}>{q.sub}</div></div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Upcoming Drives */}
                <div className="ds-panel">
                  <div className="ds-panel-head">
                    <div className="ds-panel-title">Upcoming <em>Drives Near You</em></div>
                    <button className="ds-panel-action" onClick={() => go('find-drives')}>View All →</button>
                  </div>
                  <div className="ds-panel-body" style={{ padding: 0 }}>
                    {upcomingDrives.map((d, i) => (
                      <div key={i} style={{
                        display: 'flex', gap: 14, padding: '14px 20px', alignItems: 'flex-start',
                        borderBottom: i < upcomingDrives.length - 1 ? '1px solid var(--cream-d)' : 'none',
                        borderLeft: d.urgent ? '3px solid var(--crimson)' : '3px solid transparent',
                      }}>
                        <div style={{ textAlign: 'center', width: 40, flexShrink: 0 }}>
                          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 700, color: 'var(--crimson)', lineHeight: 1 }}>{d.date.split(' ')[0]}</div>
                          <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>{d.date.split(' ')[1]}</div>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 15, fontWeight: 600, color: 'var(--ink)', marginBottom: 2 }}>
                            {d.title}
                            {d.urgent && <span style={{ fontSize: 9, background: 'var(--crimson)', color: '#fff', padding: '1px 5px', borderRadius: 3, marginLeft: 7, verticalAlign: 'middle' }}>URGENT</span>}
                          </div>
                          <div style={{ fontSize: 11, color: 'var(--ink-soft)', marginBottom: 5 }}>📍 {d.location} · {d.distance}</div>
                          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                            {d.bloodGroups.map(bg => (
                              <span key={bg} style={{ fontSize: 10, background: 'rgba(140,31,40,0.08)', color: 'var(--crimson)', padding: '1px 7px', borderRadius: 3, fontFamily: 'Cormorant Garamond, serif', fontWeight: 700 }}>{bg}</span>
                            ))}
                            <span style={{ fontSize: 10, background: 'rgba(45,122,74,0.08)', color: 'var(--success)', padding: '1px 7px', borderRadius: 3 }}>{d.slots} slots</span>
                          </div>
                        </div>
                        <button className="ds-btn ds-btn-primary" style={{ fontSize: 10.5, padding: '6px 12px', flexShrink: 0 }} onClick={() => go('appointments')}><span>Register</span></button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Nearby Blood Requests */}
                <div className="ds-panel">
                  <div className="ds-panel-head">
                    <div className="ds-panel-title">Nearby <em>Requests</em></div>
                    <button className="ds-panel-action" onClick={() => go('requests')}>View All →</button>
                  </div>
                  <div className="ds-tabs">
                    <button className="ds-tab active">All (5)</button>
                    <button className="ds-tab">Critical (2)</button>
                    <button className="ds-tab">Compatible</button>
                  </div>
                  <div className="ds-panel-body">
                    {bloodRequests.slice(0, 3).map((r, i) => (
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
                </div>

                {/* Recent Activity */}
                <div className="ds-panel">
                  <div className="ds-panel-head">
                    <div className="ds-panel-title">Recent <em>Activity</em></div>
                    <button className="ds-panel-action" onClick={() => go('history')}>Full History →</button>
                  </div>
                  <div className="ds-panel-body">
                    <div className="act-list">
                      {recentActivity.map((a, i) => (
                        <div key={i} className="act-item">
                          <div className="act-icon-col">
                            <div className={`act-icon ${a.type}`}>
                              {a.type === 'donated'  && <Ic d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" size={13} />}
                              {a.type === 'badge'    && <Ic d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" size={13} />}
                              {a.type === 'request'  && <Ic d="M20 6L9 17l-5-5" size={13} />}
                            </div>
                            {i < recentActivity.length - 1 && <div className="act-line" />}
                          </div>
                          <div className="act-body">
                            <div className="act-title">{a.title}</div>
                            <div className="act-sub">{a.sub}</div>
                            {a.impact && <div style={{ fontSize: 10.5, color: 'var(--success)', marginTop: 3, fontWeight: 600 }}>🌟 Saved approx. {a.impact}</div>}
                          </div>
                          <div className="act-time">{a.time}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* RIGHT */}
              <div className="ds-grid-right">

                {/* Donor ID Card */}
                <div className="ds-id-card">
                  <div className="dic-top">
                    <div className="dic-brand">LifeFlow</div>
                    <div className="dic-blood">{donor.bloodGroup}</div>
                  </div>
                  <div className="dic-name">{donor.name}</div>
                  <div className="dic-id">{donor.donorId}</div>
                  <div className="dic-divider" />
                  {[
                    ['Donations',    `${donor.totalDonations} times`],
                    ['Lives Saved',  `${donor.livesImpacted} people`],
                    ['Last Donated', `${donor.lastDonationDays} days ago`],
                    ['Location',     donor.city],
                  ].map(([l, v]) => (
                    <div key={l} className="dic-row">
                      <span className="dic-row-lbl">{l}</span>
                      <span className="dic-row-val">{v}</span>
                    </div>
                  ))}
                  <div className="dic-status">Available to Donate</div>
                </div>

                {/* Upcoming Appointments */}
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

                {/* Community Impact */}
                <div className="ds-panel">
                  <div className="ds-panel-head">
                    <div className="ds-panel-title">Community <em>Impact</em></div>
                    <button className="ds-panel-action" onClick={() => go('leaderboard')}>Leaderboard →</button>
                  </div>
                  <div className="ds-panel-body">
                    {/* Shortage alert */}
                    <div style={{ padding: '10px 12px', background: 'rgba(140,31,40,0.06)', border: '1px solid rgba(140,31,40,0.18)', borderRadius: 6, marginBottom: 14 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--crimson)', marginBottom: 3 }}>🚨 Blood Shortage Alert — Dhaka</div>
                      <div style={{ fontSize: 10.5, color: 'var(--ink-soft)', lineHeight: 1.5 }}>O- and B+ critically low at Dhaka Medical College Hospital.</div>
                    </div>
                    {/* Mini leaderboard */}
                    <div className="lb-list">
                      {leaderboardData.slice(0, 3).map(p => (
                        <div key={p.rank} className="lb-row">
                          <div className={`lb-rank ${p.rank <= 3 ? `r${p.rank}` : 'rn'}`}>{p.rank === 1 ? '🥇' : p.rank === 2 ? '🥈' : '🥉'}</div>
                          <div className="lb-avatar" style={{ width: 26, height: 26, fontSize: 11 }}>{p.init}</div>
                          <div className="lb-info"><div className="lb-name" style={{ fontSize: 12 }}>{p.name}</div></div>
                          <div className="lb-score" style={{ fontSize: 14 }}>{p.count}<span> don.</span></div>
                        </div>
                      ))}
                    </div>
                    <div style={{ paddingTop: 10, borderTop: '1px solid var(--cream-d)', marginTop: 4 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: 11, color: 'var(--ink-soft)' }}>Your rank in Gazipur</div>
                        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18, fontWeight: 700, color: 'var(--crimson)' }}>#4</div>
                      </div>
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

  /* ══════════════════════════════════════
     RENDER
  ══════════════════════════════════════ */
  return (
    <div className="ds">

      {/* Reusable Sidebar */}
      <Sidebar
        active={active}
        onNavigate={go}
        isOpen={sidebarOpen}
        onClose={() => setSidebar(false)}
        donor={{
          name: donor.name,
          initials: donor.initials,
          bloodGroup: donor.bloodGroup,
          donorId: donor.donorId,
        }}
      />

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
            <input type="text" placeholder="Search donors, drives, requests…" />
          </div>
          <div className="ds-topbar-actions">
            <button className="ds-topbar-icon-btn" aria-label="Notifications">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <div className="ds-notif-dot" />
            </button>
            {/* Location pill */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', background: 'var(--white)', border: '1.5px solid var(--cream-dd)', borderRadius: 6, fontSize: 11.5, color: 'var(--ink-mid)', cursor: 'pointer' }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/></svg>
              Gazipur, Dhaka
            </div>
            <div className="ds-topbar-user">
              <div className="ds-topbar-avatar">{donor.initials}</div>
              <span className="ds-topbar-uname">{donor.name.split(' ')[0]}</span>
              <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
            </div>
          </div>
        </header>

        {/* Scrollable body */}
        <div className="ds-body">
          <div className="ds-content">

            {/* Urgent alert banner */}
            {!alertDismissed && active === 'dashboard' && (
              <div className="ds-alert">
                <div className="ds-alert-icon">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                </div>
                <div className="ds-alert-body">
                  <div className="ds-alert-title">🚨 Urgent B+ request — Karim Uddin at DMCH (8 km)</div>
                  <div className="ds-alert-text">Critical need · Posted 8 minutes ago · You are eligible to donate.</div>
                </div>
                <button className="ds-alert-close" onClick={() => setAlert(true)}>×</button>
              </div>
            )}

            {/* Page header */}
            <div className="ds-page-header">
              <div className="ds-page-header-left">
                <div className="ds-eyebrow">
                  <div className="ds-eyebrow-dot" />
                  Active Donor · {donor.bloodGroup}
                </div>
                <h1 className="ds-page-title">
                  {active === 'dashboard'
                    ? <>Welcome back, <em>{donor.name.split(' ')[0]}.</em></>
                    : pageLabel[active]}
                </h1>
                <div className="ds-page-date">{today}</div>
              </div>
              {active === 'dashboard' && (
                <div className="ds-header-btns">
                  <button className="ds-btn ds-btn-ghost">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>
                    </svg>
                    <span>Share</span>
                  </button>
                  <button className="ds-btn ds-btn-primary" onClick={() => go('appointments')}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    <span>Book Donation</span>
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