'use client'

import React from 'react'

/* ── SVG Icon helper ── */
const Ic = ({ d, size = 16, children }: { d?: string; size?: number; children?: React.ReactNode }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">
    {d ? <path d={d} /> : children}
  </svg>
)

/* ══════════════════════════════════════════
   NAV GROUPS — 5 core items only
══════════════════════════════════════════ */
export const navGroups = [
  {
    section: 'Navigation',
    items: [
      { id: 'dashboard',    label: 'Dashboard',  icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',                                                                        badge: null },
      { id: 'campaigns',    label: 'Campaigns',  icon: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z',                                                                         badge: null },
      { id: 'appointments', label: 'Book',       icon: 'M8 2h8M12 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',                         badge: '2', badgeType: 'gold' },
      { id: 'requests',     label: 'Requests',   icon: 'M22 12h-4l-3 9L9 3l-3 9H2',                                                                                               badge: '5' },
      { id: 'profile',      label: 'Profile',    icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2',                                                                               badge: null },
    ],
  },
]

/* ══════════════════════════════════════════
   PROPS
══════════════════════════════════════════ */
export interface SidebarProps {
  active: string
  onNavigate: (id: string) => void
  isOpen: boolean
  onClose: () => void
  donor?: {
    name: string
    initials: string
    bloodGroup: string
    donorId: string
  }
}

/* ══════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════ */
export default function Sidebar({
  active,
  onNavigate,
  isOpen,
  onClose,
  donor = {
    name: 'Rakibul Hasan',
    initials: 'R',
    bloodGroup: 'A+',
    donorId: 'BC-2026-00427',
  },
}: SidebarProps) {
  const go = (id: string) => { onNavigate(id); onClose() }

  return (
    <>
      {/* ── Mobile overlay ── */}
      <div
        className={`ds-overlay ${isOpen ? 'show' : ''}`}
        onClick={onClose}
        aria-hidden
      />

      {/* ── Sidebar ── */}
      <aside className={`ds-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="ds-sb-inner">

          {/* Brand */}
          <div className="ds-sb-brand">
            <a href="/" className="ds-logo">
              <div className="ds-logo-mark" />
              <div>
                <div className="ds-logo-name">Life<span>Flow</span></div>
                <div className="ds-logo-tag">Donor Portal</div>
              </div>
            </a>
            <button className="ds-sb-close" onClick={onClose} aria-label="Close sidebar">
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M1 1l12 12M13 1L1 13" />
              </svg>
            </button>
          </div>

          {/* User Card */}
          <div className="ds-sb-user">
            <div className="ds-sb-user-row">
              <div className="ds-sb-avatar">
                {donor.initials}
                <div className="ds-sb-avatar-dot" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="ds-sb-user-name">{donor.name}</div>
                <div className="ds-sb-user-id">{donor.donorId}</div>
              </div>
              <div className="ds-sb-blood">{donor.bloodGroup}</div>
            </div>
            {/* Quick donor stats */}
            <div style={{ display: 'flex', gap: 16, marginTop: 10, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              {[
                { num: '7',  lbl: 'Donations' },
                { num: '42', lbl: 'Days ago'  },
                { num: '21', lbl: 'Lives saved' },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 16, fontWeight: 700, color: 'var(--white)', lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', marginTop: 2, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Nav */}
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
                      <span className={`ds-nav-badge ${'badgeType' in item && item.badgeType ? item.badgeType : ''}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            ))}
          </nav>

          {/* Eligibility prompt */}
          <div className="ds-sb-prompt">
            <div className="ds-sb-prompt-title">🩸 Ready to Donate!</div>
            <div className="ds-sb-prompt-sub">Your next eligible date is <strong style={{ color: 'rgba(255,255,255,0.7)' }}>May 20, 2026</strong> — book your slot now.</div>
            <button className="ds-sb-prompt-btn" onClick={() => go('appointments')}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Book Now
            </button>
          </div>

          {/* Footer */}
          <div className="ds-sb-footer">
            {/* Emergency CTA */}
            <button
              className="ds-sb-prompt-btn"
              style={{ background: 'var(--error)', width: '100%', justifyContent: 'center', padding: '9px 12px', borderRadius: 4, fontSize: 12, fontWeight: 700, letterSpacing: '0.04em' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/>
                <line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              🚨 Emergency Blood Request
            </button>

            {/* Language toggle */}
            <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
              {['English', 'বাংলা'].map((lang, i) => (
                <button
                  key={lang}
                  style={{
                    flex: 1, padding: '5px 0', fontSize: 10.5, fontWeight: 500,
                    background: i === 0 ? 'rgba(140,31,40,0.25)' : 'rgba(255,255,255,0.04)',
                    border: i === 0 ? '1px solid rgba(140,31,40,0.4)' : '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 3, color: i === 0 ? 'var(--crimson-l)' : 'rgba(255,255,255,0.28)',
                    cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
                  }}
                >
                  {lang}
                </button>
              ))}
            </div>

            <button className="ds-logout-btn" style={{ marginTop: 2 }}>
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
    </>
  )
}