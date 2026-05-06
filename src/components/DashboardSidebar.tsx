'use client'

import { useState, useEffect } from 'react'

/* ── Icons ── */
const Home     = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>
const Plus     = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
const ListIco  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
const Cal      = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
const HeartIco = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
const Trophy   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="8,21 12,17 16,21"/><line x1="12" y1="17" x2="12" y2="11"/><path d="M6 3H18V9C18 12.3137 15.3137 15 12 15C8.68629 15 6 12.3137 6 9V3Z"/><path d="M6 5H2V8C2 9.10457 2.89543 10 4 10H6"/><path d="M18 5H22V8C22 9.10457 21.1046 10 20 10H18"/></svg>
const UsersIco = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
const UserIco  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
const Gear     = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
const LogoutIco= () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
const MenuIco  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
const XIco     = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
const DropIco  = () => <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2C12 2 4 10.5 4 15.5a8 8 0 0016 0C20 10.5 12 2 12 2z"/></svg>

export const SIDEBAR_W = 248

export interface SidebarUser {
  name: string
  initials: string
  bloodGroup: string
  location: string
}

interface Props {
  activeNav?: string
  onNavChange?: (label: string) => void
  user?: SidebarUser
}

const NAV_MAIN = [
  { label: 'Dashboard',   Icon: Home },
  { label: 'Request',     Icon: Plus },
  { label: 'My Requests', Icon: ListIco },
  { label: 'Campaigns',   Icon: Cal },
  { label: 'Donate',      Icon: HeartIco },
  { label: 'Leaderboard', Icon: Trophy },
  { label: 'Referral',    Icon: UsersIco },
  { label: 'Profile',     Icon: UserIco },
]

function NavBtn({
  label, Icon, active, onClick, index,
}: { label: string; Icon: () => JSX.Element; active: boolean; onClick: () => void; index: number }) {
  return (
    <button
      onClick={onClick}
      className={`dbs-nav-btn${active ? ' active' : ''}`}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <span className="dbs-nav-ico"><Icon /></span>
      <span className="dbs-nav-lbl">{label}</span>
      {active && <span className="dbs-nav-pip" />}
    </button>
  )
}

export default function DashboardSidebar({
  activeNav = 'Dashboard',
  onNavChange,
  user = { name: 'Rakibul Hasan', initials: 'R', bloodGroup: 'A+', location: 'Konabari, Gazipur' },
}: Props) {
  const [open, setOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth > 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Lock scroll when drawer is open on mobile
  useEffect(() => {
    if (!isDesktop) {
      document.body.style.overflow = open ? 'hidden' : ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open, isDesktop])

  const go = (label: string) => { onNavChange?.(label); setOpen(false) }

  return (
    <>
      <style>{`
        /* ── Sidebar shell ── */
        .dbs-aside {
          position: fixed;
          top: 0; left: 0; bottom: 0;
          width: ${SIDEBAR_W}px;
          background: #141414;
          z-index: 500;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
          border-right: 1px solid rgba(255,255,255,0.055);
          transition: transform 0.32s cubic-bezier(0.77,0,0.175,1),
                      box-shadow 0.32s ease;
        }

        /* Desktop: always visible */
        @media (min-width: 1025px) {
          .dbs-aside { transform: translateX(0) !important; }
          .dbs-ham, .dbs-backdrop { display: none !important; }
        }

        /* Mobile / tablet: drawer */
        @media (max-width: 1024px) {
          .dbs-aside {
            transform: translateX(-100%);
            box-shadow: none;
          }
          .dbs-aside.open {
            transform: translateX(0);
            box-shadow: 8px 0 48px rgba(0,0,0,0.6);
          }
        }

        /* Hamburger */
        .dbs-ham {
          position: fixed;
          top: 13px; left: 13px;
          z-index: 600;
          width: 38px; height: 38px;
          background: #141414;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 6px;
          color: rgba(255,255,255,0.7);
          cursor: pointer;
          display: none;
          align-items: center;
          justify-content: center;
          transition: background 0.15s, color 0.15s;
        }
        .dbs-ham:hover { background: rgba(140,31,40,0.2); color: #fff; }
        @media (max-width: 1024px) { .dbs-ham { display: flex; } }

        /* Backdrop */
        .dbs-backdrop {
          display: none;
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.6);
          z-index: 490;
          backdrop-filter: blur(3px);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .dbs-backdrop.open { display: block; opacity: 1; }

        /* Scrollable nav area */
        .dbs-nav-scroll {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 8px 0 6px;
        }
        .dbs-nav-scroll::-webkit-scrollbar { width: 2px; }
        .dbs-nav-scroll::-webkit-scrollbar-thumb { background: rgba(140,31,40,0.35); border-radius: 1px; }

        /* Section labels */
        .dbs-section-lbl {
          font-size: 9px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.15);
          font-weight: 600;
          padding: 10px 20px 5px;
        }

        /* Nav button */
        .dbs-nav-btn {
          position: relative;
          display: flex;
          align-items: center;
          gap: 10px;
          width: calc(100% - 14px);
          margin: 1px 7px;
          padding: 9px 11px;
          border-radius: 6px;
          border: none;
          background: transparent;
          color: rgba(255,255,255,0.38);
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 400;
          cursor: pointer;
          text-align: left;
          white-space: nowrap;
          transition: background 0.15s, color 0.15s;
          opacity: 0;
          animation: dbs-slide-in 0.4s ease forwards;
        }
        .dbs-nav-btn:hover {
          background: rgba(255,255,255,0.055);
          color: rgba(255,255,255,0.78);
        }
        .dbs-nav-btn.active {
          background: rgba(140,31,40,0.18);
          color: #fff;
          font-weight: 500;
        }
        .dbs-nav-btn.active:hover {
          background: rgba(140,31,40,0.24);
        }
        .dbs-nav-ico {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          opacity: 0.7;
          transition: opacity 0.15s;
        }
        .dbs-nav-btn.active .dbs-nav-ico { opacity: 1; }
        .dbs-nav-btn:hover .dbs-nav-ico  { opacity: 0.9; }
        .dbs-nav-pip {
          position: absolute;
          left: 0; top: 50%;
          transform: translateY(-50%);
          width: 3px; height: 18px;
          background: #8C1F28;
          border-radius: 0 2px 2px 0;
        }

        @keyframes dbs-slide-in {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* Logo */
        .dbs-logo-row {
          padding: 20px 18px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
        }
        .dbs-logo-link {
          display: flex; align-items: center; gap: 10px; text-decoration: none;
        }
        .dbs-logo-mark {
          width: 30px; height: 30px;
          background: #8C1F28;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          position: relative;
          box-shadow: 0 0 0 1px rgba(140,31,40,0.4), 0 4px 14px rgba(140,31,40,0.3);
        }
        .dbs-logo-mark::after {
          content: '';
          position: absolute;
          width: 14px; height: 14px;
          border: 1.5px solid rgba(255,255,255,0.3);
          border-radius: 50%;
        }
        .dbs-logo-inner {
          width: 5px; height: 5px;
          background: #fff;
          border-radius: 50%;
          position: relative; z-index: 1;
        }
        .dbs-logo-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 17px;
          font-weight: 600;
          color: #fff;
          line-height: 1;
          letter-spacing: 0.02em;
        }
        .dbs-logo-name em { color: #C0404C; font-style: normal; }
        .dbs-logo-tag {
          font-size: 7.5px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.18);
          margin-top: 3px;
        }
        .dbs-close-btn {
          background: none; border: none;
          color: rgba(255,255,255,0.25);
          cursor: pointer; padding: 4px;
          display: flex; line-height: 1;
          border-radius: 4px;
          transition: color 0.15s, background 0.15s;
          flex-shrink: 0;
        }
        .dbs-close-btn:hover { color: rgba(255,255,255,0.65); background: rgba(255,255,255,0.06); }

        /* User card */
        .dbs-user {
          padding: 12px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex; align-items: center; gap: 11px;
          flex-shrink: 0;
        }
        .dbs-user-av {
          width: 38px; height: 38px;
          background: linear-gradient(135deg, #8C1F28, #A8323D);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 17px; font-weight: 700; color: #fff;
          flex-shrink: 0;
          position: relative;
          box-shadow: 0 0 0 2px rgba(140,31,40,0.3);
        }
        .dbs-user-online {
          position: absolute; bottom: 0; right: 0;
          width: 9px; height: 9px;
          background: #3A9D4A;
          border-radius: 50%;
          border: 2px solid #141414;
        }
        .dbs-user-name {
          font-size: 12.5px; font-weight: 500; color: #fff;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .dbs-user-loc {
          font-size: 10px; color: rgba(255,255,255,0.28);
          margin-top: 1px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .dbs-blood-tag {
          display: inline-flex; align-items: center; gap: 4px;
          background: rgba(140,31,40,0.22);
          border: 1px solid rgba(140,31,40,0.4);
          color: #E08080;
          font-size: 9.5px; font-weight: 600;
          padding: 2px 7px; border-radius: 2px;
          letter-spacing: 0.06em;
          margin-top: 4px;
        }

        /* Logout */
        .dbs-logout-wrap {
          padding: 8px 7px 18px;
          border-top: 1px solid rgba(255,255,255,0.06);
          flex-shrink: 0;
        }
        .dbs-logout-btn {
          display: flex; align-items: center; gap: 10px;
          width: 100%; padding: 9px 12px;
          border-radius: 6px; border: none;
          background: transparent;
          color: rgba(200,70,70,0.45);
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; cursor: pointer; text-align: left;
          transition: background 0.15s, color 0.15s;
        }
        .dbs-logout-btn:hover {
          background: rgba(140,31,40,0.15);
          color: #E05555;
        }

        /* Subtle noise texture overlay */
        .dbs-aside::before {
          content: '';
          position: absolute; inset: 0;
          pointer-events: none; z-index: 0;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 128px;
        }
        .dbs-aside > * { position: relative; z-index: 1; }

        /* Crimson accent line at top */
        .dbs-aside::after {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #8C1F28, #C0404C, #8C1F28);
          z-index: 2;
        }
      `}</style>

      {/* Hamburger */}
      <button className="dbs-ham" onClick={() => setOpen(true)} aria-label="Open menu">
        <MenuIco />
      </button>

      {/* Backdrop */}
      <div
        className={`dbs-backdrop${open ? ' open' : ''}`}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`dbs-aside${open ? ' open' : ''}`}>

        {/* Logo */}
        <div className="dbs-logo-row">
          <a href="/" className="dbs-logo-link">
            <div className="dbs-logo-mark">
              <div className="dbs-logo-inner" />
            </div>
            <div>
              <div className="dbs-logo-name">Blood<em>Circle</em></div>
              <div className="dbs-logo-tag">Life · Humanity · Hope</div>
            </div>
          </a>
          <button className="dbs-close-btn" onClick={() => setOpen(false)} aria-label="Close">
            <XIco />
          </button>
        </div>

        {/* User */}
        <div className="dbs-user">
          <div className="dbs-user-av">
            {user.initials}
            <div className="dbs-user-online" />
          </div>
          <div style={{ minWidth: 0 }}>
            <div className="dbs-user-name">{user.name}</div>
            <div className="dbs-user-loc">📍 {user.location}</div>
            <div className="dbs-blood-tag">
              <DropIco />
              {user.bloodGroup}
            </div>
          </div>
        </div>

        {/* Nav */}
        <div className="dbs-nav-scroll">
          <div className="dbs-section-lbl">Main</div>
          {NAV_MAIN.map(({ label, Icon }, i) => (
            <NavBtn
              key={label}
              label={label}
              Icon={Icon}
              active={activeNav === label}
              onClick={() => go(label)}
              index={i}
            />
          ))}

          <div className="dbs-section-lbl" style={{ paddingTop: 16 }}>Account</div>
          <NavBtn label="Settings" Icon={Gear} active={activeNav === 'Settings'} onClick={() => go('Settings')} index={9} />
        </div>

        {/* Logout */}
        <div className="dbs-logout-wrap">
          <button className="dbs-logout-btn" onClick={() => console.log('logout')}>
            <LogoutIco />
            Sign Out
          </button>
        </div>

      </aside>
    </>
  )
}