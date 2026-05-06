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

const pageLabel: Record<string, string> = {
  dashboard:    'Dashboard',
  campaigns:    'Campaigns',
  appointments: 'Book Appointment',
  requests:     'Blood Requests',
  profile:      'Profile & Settings',
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
  { blood: 'B+',  name: 'Karim Uddin',   loc: 'DMCH, Bakshibazar · 8 km',       urgency: 'critical' as const },
  { blood: 'O-',  name: 'Sharmin Akter', loc: 'Square Hospital · 12 km',         urgency: 'critical' as const },
  { blood: 'A+',  name: 'Jahangir Alam', loc: 'Suhrawardy Hospital · 9.3 km',    urgency: 'moderate' as const },
  { blood: 'AB+', name: 'Riya Begum',    loc: 'Holy Family Hospital · 15.2 km',  urgency: 'moderate' as const },
  { blood: 'O+',  name: 'Mostak Ahmed',  loc: 'Enam Medical College · 18 km',    urgency: 'stable'   as const },
]

const appointments = [
  { day: '20', month: 'May', title: 'Whole Blood Donation', loc: 'Gazipur City Hall Drive', status: 'confirmed' as const },
  { day: '18', month: 'Jun', title: 'Platelet Donation',    loc: 'Dhaka Medical College',   status: 'pending'   as const },
]

const badges = [
  { icon: '🩸', name: 'First Drop',  earned: true  },
  { icon: '🔥', name: '5 Donations', earned: true  },
  { icon: '⭐', name: 'Consistent',  earned: true  },
  { icon: '🏆', name: 'Champion',    earned: false },
  { icon: '💎', name: 'Diamond',     earned: false },
  { icon: '🌍', name: 'City Hero',   earned: false },
]

/* ══════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════ */
export default function Dashboard() {
  const [active, setActive]        = useState('dashboard')
  const [sidebarOpen, setSidebar]  = useState(false)
  const [alertDismissed, setAlert] = useState(false)

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
        { col: 'red',   icon: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z', num: String(donor.totalDonations), sup: '×',  label: 'Total Donations', trend: 'up',   trendTxt: '3 this year' },
        { col: 'gold',  icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2',                                                                                                    num: String(donor.livesImpacted),  sup: '+',  label: 'Lives Impacted',  trend: 'up',   trendTxt: '3 per unit donated' },
        { col: 'green', icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',                                                                                               num: String(donor.thisYear),       sup: ' ',  label: 'Donations 2026',  trend: 'up',   trendTxt: '+1 from last month' },
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
     DASHBOARD PAGE (only page for now)
  ══════════════════════════════════════ */
  const renderPage = () => (
    <div className="page-view">

      {/* ── Hero Eligibility Card ── */}
      <div style={{
        background: 'linear-gradient(135deg, var(--ink) 0%, #2e1215 100%)',
        borderRadius: 10, padding: '24px 28px', marginBottom: 20,
        position: 'relative', overflow: 'hidden',
      }}>
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
                  { icon: '📅', lbl: 'Book Donation',    sub: 'Schedule a slot',   pg: 'appointments' },
                  { icon: '📍', lbl: 'Find Nearby Camp', sub: 'View local drives', pg: 'campaigns'    },
                  { icon: '🆘', lbl: 'Request Blood',    sub: 'For family/others', pg: 'requests'     },
                  { icon: '👤', lbl: 'My Profile',       sub: 'View & edit info',  pg: 'profile'      },
                ].map((q, i) => (
                  <button key={i} className="qa-btn" style={{ alignItems: 'center', textAlign: 'center', gap: 8 }} onClick={() => go(q.pg)}>
                    <div style={{ fontSize: 26, lineHeight: 1 }}>{q.icon}</div>
                    <div>
                      <div className="qa-label" style={{ textAlign: 'center' }}>{q.lbl}</div>
                      <div className="qa-sub" style={{ textAlign: 'center' }}>{q.sub}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Drives */}
          <div className="ds-panel">
            <div className="ds-panel-head">
              <div className="ds-panel-title">Upcoming <em>Campaigns Near You</em></div>
              <button className="ds-panel-action" onClick={() => go('campaigns')}>View All →</button>
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
            </div>
            <div className="ds-panel-body">
              <div style={{ padding: '10px 12px', background: 'rgba(140,31,40,0.06)', border: '1px solid rgba(140,31,40,0.18)', borderRadius: 6, marginBottom: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--crimson)', marginBottom: 3 }}>🚨 Blood Shortage Alert — Dhaka</div>
                <div style={{ fontSize: 10.5, color: 'var(--ink-soft)', lineHeight: 1.5 }}>O- and B+ critically low at Dhaka Medical College Hospital.</div>
              </div>
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

  /* ══════════════════════════════════════
     RENDER
  ══════════════════════════════════════ */
  return (
    <div className="ds">

      <Sidebar
        active={active}
        onNavigate={go}
        isOpen={sidebarOpen}
        onClose={() => setSidebar(false)}
        donor={{
          name:       donor.name,
          initials:   donor.initials,
          bloodGroup: donor.bloodGroup,
          donorId:    donor.donorId,
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
            {!alertDismissed && (
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
                  Welcome back, <em>{donor.name.split(' ')[0]}.</em>
                </h1>
                <div className="ds-page-date">{today}</div>
              </div>
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
            </div>

            {renderPage()}
          </div>
        </div>
      </div>

    </div>
  )
}