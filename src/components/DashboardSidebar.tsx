'use client'

import { useState } from 'react'

/* ── Icons ── */
const Home     = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>
const Plus     = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
const ListIco  = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
const Cal      = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
const HeartIco = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
const Trophy   = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="8,21 12,17 16,21"/><line x1="12" y1="17" x2="12" y2="11"/><path d="M6 3H18V9C18 12.3137 15.3137 15 12 15C8.68629 15 6 12.3137 6 9V3Z"/><path d="M6 5H2V8C2 9.10457 2.89543 10 4 10H6"/><path d="M18 5H22V8C22 9.10457 21.1046 10 20 10H18"/></svg>
const UsersIco = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
const UserIco  = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
const Gear     = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
const LogoutIco= () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
const MenuIco  = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
const XIco     = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>

/* ── Sidebar width constant — import this in pages ── */
export const SIDEBAR_W = 260

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

function NavBtn({ label, Icon, active, onClick }: { label: string; Icon: () => JSX.Element; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display:     'flex',
        alignItems:  'center',
        gap:         10,
        width:       'calc(100% - 16px)',
        margin:      '1px 8px',
        padding:     '10px 12px',
        borderRadius: 5,
        border:      'none',
        background:  active ? 'rgba(140,31,40,0.22)' : 'transparent',
        color:       active ? '#ffffff' : 'rgba(255,255,255,0.42)',
        fontFamily:  "'DM Sans', sans-serif",
        fontSize:    13,
        fontWeight:  active ? 500 : 400,
        cursor:      'pointer',
        textAlign:   'left',
        whiteSpace:  'nowrap',
        position:    'relative',
        borderLeft:  active ? '3px solid #8C1F28' : '3px solid transparent',
        transition:  'background 0.15s, color 0.15s',
      }}
      onMouseEnter={e => {
        if (!active) {
          const el = e.currentTarget as HTMLElement
          el.style.background = 'rgba(255,255,255,0.06)'
          el.style.color = 'rgba(255,255,255,0.8)'
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          const el = e.currentTarget as HTMLElement
          el.style.background = 'transparent'
          el.style.color = 'rgba(255,255,255,0.42)'
        }
      }}
    >
      <Icon />
      {label}
    </button>
  )
}

export default function DashboardSidebar({
  activeNav = 'Dashboard',
  onNavChange,
  user = { name: 'Rakibul Hasan', initials: 'R', bloodGroup: 'A+', location: 'Konabari, Gazipur' },
}: Props) {
  const [open, setOpen] = useState(false)
  const go = (label: string) => { onNavChange?.(label); setOpen(false) }

  return (
    <>
      <style>{`
        /* scrollbar */
        .dbs-aside::-webkit-scrollbar { width: 3px; }
        .dbs-aside::-webkit-scrollbar-thumb { background: rgba(140,31,40,0.4); border-radius: 2px; }

        /* Sidebar: always visible on desktop */
        .dbs-aside {
          position: fixed;
          top: 0; left: 0; bottom: 0;
          width: ${SIDEBAR_W}px;
          background: #1C1C1C;
          z-index: 500;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          overflow-x: hidden;
          font-family: 'DM Sans', sans-serif;
        }

        /* Hamburger — hidden on desktop */
        .dbs-ham {
          display: none;
          position: fixed;
          top: 13px; left: 13px;
          z-index: 600;
          width: 38px; height: 38px;
          background: #1C1C1C;
          border: none; border-radius: 6px;
          color: rgba(255,255,255,0.75);
          cursor: pointer;
          align-items: center; justify-content: center;
          box-shadow: 0 2px 12px rgba(0,0,0,0.4);
        }

        /* Backdrop — hidden on desktop */
        .dbs-backdrop {
          display: none;
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.55);
          z-index: 490;
          backdrop-filter: blur(2px);
        }

        /* Mobile (<= 1024px): sidebar becomes a drawer */
        @media (max-width: 1024px) {
          .dbs-aside {
            transform: translateX(-100%);
            transition: transform 0.3s cubic-bezier(0.77,0,0.175,1);
            box-shadow: 4px 0 40px rgba(0,0,0,0.5);
          }
          .dbs-aside.open { transform: translateX(0); }
          .dbs-ham { display: flex; }
          .dbs-backdrop.open { display: block; }
        }
      `}</style>

      {/* Hamburger */}
      <button className="dbs-ham" onClick={() => setOpen(true)} aria-label="Open sidebar">
        <MenuIco />
      </button>

      {/* Backdrop */}
      <div className={`dbs-backdrop${open ? ' open' : ''}`} onClick={() => setOpen(false)} />

      {/* Sidebar */}
      <aside className={`dbs-aside${open ? ' open' : ''}`}>

        {/* Logo row */}
        <div style={{ padding: '22px 20px 17px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ width: 32, height: 32, background: '#8C1F28', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative' }}>
              <div style={{ position: 'absolute', width: 13, height: 13, border: '1.5px solid rgba(255,255,255,0.5)', borderRadius: '50%' }} />
              <div style={{ width: 5, height: 5, background: 'white', borderRadius: '50%', position: 'relative', zIndex: 1 }} />
            </div>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: '#fff', lineHeight: 1, letterSpacing: '0.02em' }}>
                Blood<span style={{ color: '#C0404C' }}>Circle</span>
              </div>
              <div style={{ fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', marginTop: 3 }}>
                Life · Humanity · Hope
              </div>
            </div>
          </a>
          <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', padding: 4, display: 'flex', lineHeight: 1 }}>
            <XIco />
          </button>
        </div>

        {/* User mini */}
        <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <div style={{ width: 42, height: 42, background: '#8C1F28', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond', serif", fontSize: 19, fontWeight: 700, color: '#fff', flexShrink: 0, position: 'relative' }}>
            {user.initials}
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, background: '#3A7D44', borderRadius: '50%', border: '2px solid #1C1C1C' }} />
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</div>
            <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.3)', marginTop: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>📍 {user.location}</div>
            <div style={{ display: 'inline-flex', background: 'rgba(140,31,40,0.28)', border: '1px solid rgba(140,31,40,0.5)', color: '#E08080', fontSize: 10, fontWeight: 600, padding: '1px 7px', borderRadius: 2, letterSpacing: '0.06em', marginTop: 3 }}>
              {user.bloodGroup}
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '10px 0', overflowY: 'auto' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', fontWeight: 500, padding: '7px 20px 4px' }}>Main</div>
          {NAV_MAIN.map(({ label, Icon }) => (
            <NavBtn key={label} label={label} Icon={Icon} active={activeNav === label} onClick={() => go(label)} />
          ))}

          <div style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', fontWeight: 500, padding: '14px 20px 4px' }}>Account</div>
          <NavBtn label="Settings" Icon={Gear} active={activeNav === 'Settings'} onClick={() => go('Settings')} />
        </nav>

        {/* Logout */}
        <div style={{ padding: '10px 8px 22px', borderTop: '1px solid rgba(255,255,255,0.07)', flexShrink: 0 }}>
          <button
            onClick={() => console.log('logout')}
            style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 12px', borderRadius: 5, border: 'none', background: 'transparent', color: 'rgba(200,70,70,0.5)', fontFamily: "'DM Sans', sans-serif", fontSize: 13, cursor: 'pointer', textAlign: 'left' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(140,31,40,0.15)'; (e.currentTarget as HTMLElement).style.color = '#E05555' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'rgba(200,70,70,0.5)' }}
          >
            <LogoutIco />
            Logout
          </button>
        </div>

      </aside>
    </>
  )
}