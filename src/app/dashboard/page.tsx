'use client'

import { useState, useEffect, useRef } from 'react'

/* ── Mock Data ── */
const donor = {
  name: 'Rakibul Hasan',
  age: 28,
  bloodGroup: 'A+',
  eligible: true,
  lastDonation: '12 Apr 2026',
  lastDonationDaysAgo: 24,
  totalDonations: 14,
  medicalStatus: 'Healthy',
  kycStatus: 'Verified',
  location: 'Konabari, Gazipur',
  responseRate: '98%',
}

const stats = [
  { label: 'Total Donations', value: '14', sub: 'lifetime', icon: '🩸' },
  { label: 'Lives Saved', value: '42', sub: 'estimated', icon: '❤️' },
  { label: 'This Year', value: '4', sub: 'donations in 2026', icon: '📅' },
  { label: 'Streak', value: '6', sub: 'months', icon: '🔥' },
]

const campaigns = [
  { title: 'Dhaka Blood Drive', date: '15 May 2026', location: 'Dhaka Medical College', distance: '2.1 km', groups: ['A+', 'O+', 'B-'] },
  { title: 'Gazipur Camp', date: '22 May 2026', location: 'Shaheed Tajuddin Hospital', distance: '0.8 km', groups: ['AB+', 'A-'] },
  { title: 'BIRDEM Drive', date: '01 Jun 2026', location: 'BIRDEM Hospital', distance: '5.4 km', groups: ['O-', 'B+'] },
  { title: 'United Hospital Camp', date: '10 Jun 2026', location: 'United Hospital', distance: '7.2 km', groups: ['A+', 'AB-'] },
]

const nearbyRequests = [
  { patient: 'Farida Begum', hospital: 'Dhaka Medical College', group: 'A+', distance: '2.4 km', urgency: 'Critical', urgencyColor: '#8C1F28' },
  { patient: 'Arif Hossain', hospital: 'BIRDEM General', group: 'O+', distance: '4.1 km', urgency: 'Urgent', urgencyColor: '#B8922A' },
  { patient: 'Nusrat Jahan', hospital: 'Shaheed Hospital', group: 'A+', distance: '1.2 km', urgency: 'Moderate', urgencyColor: '#3A7D44' },
  { patient: 'Masum Billah', hospital: 'Green Life Medical', group: 'B-', distance: '6.8 km', urgency: 'Critical', urgencyColor: '#8C1F28' },
]

const activities = [
  { action: 'Donated Whole Blood', date: '12 Apr 2026', icon: '🩸', color: '#8C1F28' },
  { action: 'Badge Earned: "Life Saver"', date: '12 Apr 2026', icon: '🏅', color: '#B8922A' },
  { action: 'Donated Platelets', date: '05 Feb 2026', icon: '🩸', color: '#8C1F28' },
  { action: 'Badge Earned: "6-Month Streak"', date: '05 Feb 2026', icon: '🔥', color: '#B8922A' },
  { action: 'Donated Whole Blood', date: '18 Nov 2025', icon: '🩸', color: '#8C1F28' },
  { action: 'Joined BloodCircle', date: '02 Jan 2025', icon: '✨', color: '#3A7D44' },
]

const badges = [
  { name: 'First Drop', icon: '🩸', desc: 'Completed your first donation' },
  { name: 'Life Saver', icon: '❤️', desc: 'Saved 3+ lives through donations' },
  { name: '6-Month Streak', icon: '🔥', desc: 'Donated 6 months consecutively' },
  { name: 'Verified Hero', icon: '✅', desc: 'KYC fully verified donor' },
  { name: 'Camp Champion', icon: '🏕️', desc: 'Attended 3+ donation camps' },
  { name: 'Guardian', icon: '🛡️', desc: 'Responded to 5+ emergency requests' },
]

const navItems = [
  { label: 'Dashboard', icon: HomeIcon, active: true },
  { label: 'Request', icon: PlusCircleIcon },
  { label: 'My Requests', icon: ListIcon },
  { label: 'Campaigns', icon: CalendarIcon },
  { label: 'Donate', icon: HeartIcon },
  { label: 'Leaderboard', icon: TrophyIcon },
  { label: 'Referral', icon: UsersIcon },
  { label: 'Profile', icon: UserIcon },
]

/* ── SVG Icons ── */
function HomeIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>
}
function PlusCircleIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
}
function ListIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
}
function CalendarIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
}
function HeartIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
}
function TrophyIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="8,21 12,17 16,21"/><line x1="12" y1="17" x2="12" y2="11"/><path d="M6 3H18V9C18 12.3137 15.3137 15 12 15C8.68629 15 6 12.3137 6 9V3Z"/><path d="M6 5H2V8C2 9.10457 2.89543 10 4 10H6"/><path d="M18 5H22V8C22 9.10457 21.1046 10 20 10H18"/></svg>
}
function UsersIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
}
function UserIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
}
function LogoutIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
}
function BellIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
}
function SearchIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
}
function MenuIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
}
function XIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
}
function ChevronIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9,18 15,12 9,6"/></svg>
}

/* ── Main Component ── */
export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [activeNav, setActiveNav] = useState('Dashboard')
  const [tooltipBadge, setTooltipBadge] = useState<number | null>(null)
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(t)
  }, [])

  const closeSidebar = () => setSidebarOpen(false)

  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Good Morning'
    if (h < 17) return 'Good Afternoon'
    return 'Good Evening'
  }

  return (
    <>
      <style>{`
        /* ── Dashboard Reset & Base ── */
        .db-root {
          display: flex;
          min-height: 100vh;
          background: var(--cream);
          font-family: 'DM Sans', sans-serif;
          position: relative;
        }

        /* ── Sidebar ── */
        .db-sidebar {
          width: 280px;
          background: var(--ink);
          position: fixed;
          top: 0; left: 0; bottom: 0;
          z-index: 800;
          display: flex;
          flex-direction: column;
          transition: transform 0.35s cubic-bezier(0.77,0,0.18,1);
          overflow-y: auto;
          overflow-x: hidden;
        }
        .db-sidebar::-webkit-scrollbar { width: 3px; }
        .db-sidebar::-webkit-scrollbar-thumb { background: rgba(140,31,40,0.4); border-radius: 2px; }

        .db-sidebar-logo {
          padding: 28px 28px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
        }
        .db-logo-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }
        .db-logo-mark {
          width: 34px; height: 34px;
          background: var(--crimson);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          position: relative; flex-shrink: 0;
        }
        .db-logo-mark::after {
          content: '';
          width: 13px; height: 13px;
          border: 1.5px solid rgba(255,255,255,0.7);
          border-radius: 50%;
          position: absolute;
        }
        .db-logo-mark::before {
          content: '';
          width: 5px; height: 5px;
          background: white;
          border-radius: 50%;
          position: absolute; z-index: 1;
        }
        .db-logo-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px; font-weight: 600;
          color: var(--white); letter-spacing: 0.02em; line-height: 1;
        }
        .db-logo-name span { color: var(--crimson-l); }

        .db-sidebar-close {
          display: none;
          background: none; border: none;
          color: rgba(255,255,255,0.4);
          cursor: pointer; padding: 4px;
          transition: color 0.2s;
        }
        .db-sidebar-close:hover { color: white; }

        /* User mini-profile */
        .db-user-mini {
          padding: 20px 28px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          display: flex;
          align-items: center;
          gap: 14px;
          flex-shrink: 0;
        }
        .db-user-avatar {
          width: 46px; height: 46px;
          background: var(--crimson);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px; font-weight: 700;
          color: white; flex-shrink: 0;
          position: relative;
        }
        .db-user-avatar::after {
          content: '';
          position: absolute; bottom: 1px; right: 1px;
          width: 10px; height: 10px;
          background: #3A7D44;
          border-radius: 50%;
          border: 2px solid var(--ink);
        }
        .db-blood-badge {
          display: inline-flex; align-items: center; justify-content: center;
          background: rgba(140,31,40,0.25);
          border: 1px solid rgba(140,31,40,0.5);
          color: var(--crimson-l);
          font-size: 11px; font-weight: 600;
          padding: 2px 8px; border-radius: 2px;
          letter-spacing: 0.04em;
          margin-top: 3px;
        }
        .db-user-name {
          font-size: 14px; font-weight: 500;
          color: white; line-height: 1.2;
        }
        .db-user-loc {
          font-size: 11.5px; color: rgba(255,255,255,0.35);
          margin-top: 2px;
        }

        /* Nav */
        .db-nav {
          flex: 1;
          padding: 16px 0;
          overflow-y: auto;
        }
        .db-nav-section { padding: 8px 20px 4px; }
        .db-nav-section-label {
          font-size: 9px; letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
          font-weight: 500;
        }
        .db-nav-item {
          display: flex; align-items: center; gap: 12px;
          padding: 11px 20px;
          margin: 2px 10px;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
          color: rgba(255,255,255,0.45);
          font-size: 13.5px; font-weight: 400;
          position: relative;
          border: none; background: transparent; width: calc(100% - 20px);
          text-align: left;
        }
        .db-nav-item:hover {
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.8);
        }
        .db-nav-item.active {
          background: rgba(140,31,40,0.25);
          color: white;
          font-weight: 500;
        }
        .db-nav-item.active::before {
          content: '';
          position: absolute; left: -10px; top: 50%;
          transform: translateY(-50%);
          width: 3px; height: 20px;
          background: var(--crimson);
          border-radius: 0 2px 2px 0;
        }
        .db-nav-item svg { flex-shrink: 0; }

        /* Logout */
        .db-sidebar-footer {
          padding: 16px 10px 28px;
          border-top: 1px solid rgba(255,255,255,0.07);
          flex-shrink: 0;
        }
        .db-logout {
          display: flex; align-items: center; gap: 12px;
          padding: 11px 20px;
          border-radius: 4px;
          cursor: pointer;
          color: rgba(200,60,60,0.6);
          font-size: 13.5px;
          transition: background 0.2s, color 0.2s;
          border: none; background: transparent; width: 100%; text-align: left;
        }
        .db-logout:hover {
          background: rgba(140,31,40,0.15);
          color: #E05555;
        }

        /* Backdrop */
        .db-backdrop {
          display: none;
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.55);
          z-index: 799;
          backdrop-filter: blur(3px);
          animation: db-fade-in 0.25s ease;
        }
        @keyframes db-fade-in { from { opacity: 0; } to { opacity: 1; } }

        /* ── Main Layout ── */
        .db-main {
          flex: 1;
          margin-left: 280px;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        /* ── Top Header ── */
        .db-header {
          position: sticky; top: 0; z-index: 100;
          background: rgba(247,243,236,0.92);
          backdrop-filter: blur(16px) saturate(1.4);
          border-bottom: 1px solid var(--border);
          padding: 0 32px;
          height: 68px;
          display: flex; align-items: center;
          justify-content: space-between;
          gap: 20px;
        }
        .db-header-left { display: flex; align-items: center; gap: 16px; }
        .db-hamburger {
          display: none;
          background: none; border: none; cursor: pointer;
          color: var(--ink); padding: 4px;
          transition: color 0.2s;
        }
        .db-hamburger:hover { color: var(--crimson); }

        .db-search-wrap {
          position: relative;
          display: flex; align-items: center;
        }
        .db-search-icon {
          position: absolute; left: 12px;
          color: var(--ink-soft); pointer-events: none;
        }
        .db-search {
          height: 38px;
          padding: 0 16px 0 38px;
          background: rgba(28,28,28,0.05);
          border: 1px solid transparent;
          border-radius: 4px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; color: var(--ink);
          width: 240px;
          transition: border-color 0.2s, background 0.2s;
          outline: none;
        }
        .db-search::placeholder { color: var(--ink-soft); }
        .db-search:focus {
          border-color: var(--border);
          background: white;
          box-shadow: var(--shadow-sm);
        }

        .db-header-right { display: flex; align-items: center; gap: 12px; }
        .db-icon-btn {
          width: 38px; height: 38px;
          border-radius: 4px;
          background: rgba(28,28,28,0.05);
          border: 1px solid transparent;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: var(--ink-mid);
          transition: background 0.2s, border-color 0.2s, color 0.2s;
          position: relative;
        }
        .db-icon-btn:hover {
          background: rgba(140,31,40,0.08);
          border-color: var(--border);
          color: var(--crimson);
        }
        .db-notif-dot {
          position: absolute; top: 7px; right: 7px;
          width: 7px; height: 7px;
          background: var(--crimson);
          border-radius: 50%;
          border: 1.5px solid var(--cream);
          animation: pulse 2s infinite;
        }
        .db-header-avatar {
          width: 38px; height: 38px;
          background: var(--crimson);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px; font-weight: 700;
          color: white; cursor: pointer;
          transition: box-shadow 0.2s;
          flex-shrink: 0;
        }
        .db-header-avatar:hover {
          box-shadow: 0 0 0 3px rgba(140,31,40,0.2);
        }

        /* ── Content ── */
        .db-content {
          flex: 1;
          padding: 36px 32px 60px;
          max-width: 1200px;
          width: 100%;
        }

        /* Greeting */
        .db-greeting { margin-bottom: 32px; }
        .db-greeting-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px; font-weight: 600;
          color: var(--ink); line-height: 1.1;
        }
        .db-greeting-sub {
          font-size: 14px; color: var(--ink-soft);
          margin-top: 5px;
        }

        /* ── Skeleton ── */
        .db-skeleton {
          background: linear-gradient(90deg, rgba(28,28,28,0.06) 25%, rgba(28,28,28,0.1) 50%, rgba(28,28,28,0.06) 75%);
          background-size: 200% 100%;
          animation: db-shimmer 1.5s infinite;
          border-radius: 3px;
        }
        @keyframes db-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* ── Profile Card ── */
        .db-profile-card {
          background: var(--ink);
          border-radius: 4px;
          padding: 28px 32px;
          margin-bottom: 28px;
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 28px; align-items: center;
          position: relative; overflow: hidden;
        }
        .db-profile-card::before {
          content: '';
          position: absolute; right: 0; top: 0; bottom: 0;
          width: 220px;
          background: radial-gradient(ellipse at right, rgba(140,31,40,0.25) 0%, transparent 70%);
          pointer-events: none;
        }
        .db-profile-avatar-lg {
          width: 72px; height: 72px;
          background: var(--crimson);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 30px; font-weight: 700;
          color: white; flex-shrink: 0;
          box-shadow: 0 0 0 4px rgba(140,31,40,0.3);
        }
        .db-profile-info {}
        .db-profile-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 26px; font-weight: 600;
          color: white; line-height: 1.1;
        }
        .db-profile-meta {
          display: flex; flex-wrap: wrap; gap: 8px;
          margin-top: 8px;
        }
        .db-meta-chip {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 11.5px; font-weight: 500;
          padding: 4px 10px; border-radius: 2px;
        }
        .db-meta-chip.eligible {
          background: rgba(58,125,68,0.2);
          color: #5CB86B;
          border: 1px solid rgba(58,125,68,0.3);
        }
        .db-meta-chip.verified {
          background: rgba(184,146,42,0.15);
          color: var(--gold-l);
          border: 1px solid rgba(184,146,42,0.3);
        }
        .db-meta-chip.healthy {
          background: rgba(58,125,68,0.15);
          color: #5CB86B;
          border: 1px solid rgba(58,125,68,0.25);
        }
        .db-meta-chip.blood {
          background: rgba(140,31,40,0.25);
          color: #E87070;
          border: 1px solid rgba(140,31,40,0.4);
          font-family: 'Cormorant Garamond', serif;
          font-size: 14px;
        }
        .db-profile-right {
          display: flex; flex-direction: column;
          gap: 14px; align-items: flex-end;
          flex-shrink: 0;
        }
        .db-profile-stat {
          text-align: right;
        }
        .db-profile-stat-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 700;
          color: white; line-height: 1;
        }
        .db-profile-stat-label {
          font-size: 10.5px; color: rgba(255,255,255,0.35);
          letter-spacing: 0.1em; text-transform: uppercase;
          margin-top: 2px;
        }

        /* ── Stats Row ── */
        .db-stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 28px;
        }
        .db-stat-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: 22px 24px;
          transition: box-shadow 0.25s, transform 0.25s, border-color 0.25s;
          cursor: default;
          position: relative; overflow: hidden;
        }
        .db-stat-card::after {
          content: '';
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 2px; background: var(--crimson);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s ease;
        }
        .db-stat-card:hover {
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
          border-color: var(--border);
        }
        .db-stat-card:hover::after { transform: scaleX(1); }
        .db-stat-icon {
          font-size: 22px; margin-bottom: 10px; display: block;
        }
        .db-stat-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px; font-weight: 700;
          color: var(--ink); line-height: 1;
        }
        .db-stat-label {
          font-size: 12px; color: var(--ink-soft);
          font-weight: 500; margin-top: 4px;
          text-transform: uppercase; letter-spacing: 0.08em;
        }
        .db-stat-sub {
          font-size: 11.5px; color: rgba(107,107,107,0.6);
          margin-top: 2px;
        }

        /* ── Quick Actions ── */
        .db-section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 600;
          color: var(--ink); margin-bottom: 16px;
          display: flex; align-items: center; gap: 10px;
        }
        .db-section-title span {
          display: block; width: 24px; height: 1px;
          background: var(--crimson);
        }

        .db-quick-actions {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 32px;
        }
        .db-action-btn {
          background: var(--white);
          border: 1.5px solid var(--border);
          border-radius: 4px;
          padding: 20px 18px;
          text-align: center;
          cursor: pointer;
          transition: all 0.25s ease;
          position: relative; overflow: hidden;
        }
        .db-action-btn:hover {
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }
        .db-action-btn.emergency {
          background: var(--crimson);
          border-color: var(--crimson);
          color: white;
        }
        .db-action-btn.emergency:hover {
          background: var(--crimson-d);
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(140,31,40,0.35);
        }
        .db-action-icon { font-size: 26px; margin-bottom: 8px; display: block; }
        .db-action-label {
          font-size: 12.5px; font-weight: 600;
          color: var(--ink); letter-spacing: 0.03em;
        }
        .db-action-btn.emergency .db-action-label { color: white; }
        .db-emergency-pulse {
          position: absolute; top: 10px; right: 10px;
          width: 8px; height: 8px;
          background: rgba(255,255,255,0.8);
          border-radius: 50%;
          animation: pulse 1.5s infinite;
        }

        /* ── Two-col grid ── */
        .db-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 28px;
        }

        /* ── Campaigns ── */
        .db-section-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 4px;
          overflow: hidden;
        }
        .db-section-header {
          padding: 20px 24px;
          border-bottom: 1px solid var(--border);
          display: flex; align-items: center; justify-content: space-between;
        }
        .db-section-header-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px; font-weight: 600;
          color: var(--ink);
        }
        .db-view-all {
          font-size: 12px; color: var(--crimson);
          font-weight: 500; cursor: pointer;
          transition: opacity 0.2s;
          background: none; border: none; letter-spacing: 0.06em;
        }
        .db-view-all:hover { opacity: 0.7; }

        .db-campaigns-scroll {
          display: flex; gap: 0;
          flex-direction: column;
        }
        .db-campaign-item {
          padding: 16px 24px;
          border-bottom: 1px solid var(--border);
          transition: background 0.2s;
          cursor: pointer;
        }
        .db-campaign-item:last-child { border-bottom: none; }
        .db-campaign-item:hover { background: rgba(140,31,40,0.03); }
        .db-campaign-top {
          display: flex; align-items: flex-start; justify-content: space-between;
          margin-bottom: 6px;
        }
        .db-campaign-title {
          font-size: 13.5px; font-weight: 500;
          color: var(--ink);
        }
        .db-campaign-dist {
          font-size: 11.5px; color: var(--crimson);
          font-weight: 500; flex-shrink: 0;
          background: rgba(140,31,40,0.07);
          padding: 2px 8px; border-radius: 2px;
        }
        .db-campaign-date {
          font-size: 12px; color: var(--ink-soft); margin-bottom: 8px;
        }
        .db-campaign-groups { display: flex; gap: 5px; flex-wrap: wrap; }
        .db-group-tag {
          font-size: 10.5px; font-weight: 600;
          padding: 2px 7px; border-radius: 2px;
          background: rgba(140,31,40,0.08);
          color: var(--crimson);
          border: 1px solid rgba(140,31,40,0.15);
          font-family: 'Cormorant Garamond', serif;
          font-size: 12px;
        }

        /* ── Nearby Requests ── */
        .db-request-item {
          padding: 16px 24px;
          border-bottom: 1px solid var(--border);
          transition: background 0.2s;
          cursor: pointer;
        }
        .db-request-item:last-child { border-bottom: none; }
        .db-request-item:hover { background: rgba(140,31,40,0.03); }
        .db-request-row {
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px;
        }
        .db-request-left { display: flex; align-items: center; gap: 12px; flex: 1; min-width: 0; }
        .db-request-bg-badge {
          width: 40px; height: 40px; flex-shrink: 0;
          border-radius: 50%;
          background: var(--crimson);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 14px; font-weight: 700; color: white;
        }
        .db-request-info { flex: 1; min-width: 0; }
        .db-request-patient {
          font-size: 13.5px; font-weight: 500; color: var(--ink);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .db-request-hospital {
          font-size: 11.5px; color: var(--ink-soft);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .db-request-right { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
        .db-urgency-tag {
          font-size: 10px; font-weight: 600;
          padding: 3px 8px; border-radius: 2px;
          letter-spacing: 0.06em; text-transform: uppercase;
        }
        .db-respond-btn {
          padding: 6px 14px;
          background: var(--crimson);
          color: white; border: none;
          border-radius: 3px; font-size: 11.5px;
          font-weight: 500; cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          font-family: 'DM Sans', sans-serif;
        }
        .db-respond-btn:hover {
          background: var(--crimson-d);
          transform: scale(1.03);
        }

        /* ── Timeline / Activities ── */
        .db-timeline { padding: 8px 24px 24px; }
        .db-timeline-item {
          display: flex; gap: 16px;
          padding: 12px 0;
          border-bottom: 1px solid var(--border);
          position: relative;
        }
        .db-timeline-item:last-child { border-bottom: none; }
        .db-timeline-dot {
          width: 34px; height: 34px; flex-shrink: 0;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px; margin-top: 2px;
        }
        .db-timeline-action {
          font-size: 13.5px; font-weight: 500; color: var(--ink);
        }
        .db-timeline-date {
          font-size: 11.5px; color: var(--ink-soft); margin-top: 3px;
        }

        /* ── Badges ── */
        .db-badges-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 12px;
          padding: 20px 24px 24px;
        }
        .db-badge-item {
          text-align: center;
          cursor: pointer;
          padding: 14px 8px;
          border-radius: 4px;
          border: 1px solid var(--border);
          background: var(--cream);
          transition: all 0.2s;
          position: relative;
        }
        .db-badge-item:hover {
          border-color: rgba(140,31,40,0.3);
          background: rgba(140,31,40,0.04);
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
        }
        .db-badge-emoji { font-size: 28px; display: block; margin-bottom: 6px; }
        .db-badge-name {
          font-size: 10px; font-weight: 600;
          color: var(--ink-mid);
          letter-spacing: 0.05em;
          line-height: 1.3;
        }
        .db-badge-tooltip {
          position: absolute; bottom: calc(100% + 8px); left: 50%;
          transform: translateX(-50%);
          background: var(--ink);
          color: white; font-size: 11px;
          padding: 6px 10px; border-radius: 3px;
          white-space: nowrap; z-index: 10;
          pointer-events: none;
          opacity: 0; transition: opacity 0.2s;
        }
        .db-badge-item:hover .db-badge-tooltip { opacity: 1; }
        .db-badge-tooltip::after {
          content: '';
          position: absolute; top: 100%; left: 50%;
          transform: translateX(-50%);
          border: 5px solid transparent;
          border-top-color: var(--ink);
        }

        /* ── Impact / Quote ── */
        .db-bottom-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 28px;
        }
        .db-impact-card {
          background: var(--ink);
          border-radius: 4px; padding: 28px;
          position: relative; overflow: hidden;
        }
        .db-impact-card::before {
          content: '';
          position: absolute; top: 0; right: 0;
          width: 160px; height: 160px;
          background: radial-gradient(ellipse, rgba(140,31,40,0.4) 0%, transparent 70%);
        }
        .db-impact-label {
          font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(255,255,255,0.3); margin-bottom: 20px;
        }
        .db-impact-row {
          display: flex; gap: 20px;
        }
        .db-impact-stat {}
        .db-impact-stat-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: 40px; font-weight: 700;
          color: white; line-height: 1;
        }
        .db-impact-stat-val span { color: var(--crimson-l); }
        .db-impact-stat-sub {
          font-size: 11px; color: rgba(255,255,255,0.35);
          margin-top: 3px; letter-spacing: 0.06em;
        }

        .db-quote-card {
          background: white;
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
        }
        .db-quote-mark {
          font-family: 'Cormorant Garamond', serif;
          font-size: 80px; font-weight: 700;
          color: var(--crimson); opacity: 0.12;
          position: absolute; top: 4px; left: 20px;
          line-height: 1;
        }
        .db-quote-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 19px; font-style: italic;
          color: var(--ink); line-height: 1.6;
          position: relative; z-index: 1;
        }
        .db-quote-author {
          font-size: 12px; color: var(--ink-soft);
          margin-top: 12px; font-weight: 500;
          letter-spacing: 0.05em;
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .db-sidebar { transform: translateX(-100%); }
          .db-sidebar.open { transform: translateX(0); }
          .db-sidebar-close { display: flex; }
          .db-backdrop.open { display: block; }
          .db-main { margin-left: 0; }
          .db-hamburger { display: flex; }
          .db-stats-row { grid-template-columns: repeat(2, 1fr); }
          .db-quick-actions { grid-template-columns: repeat(2, 1fr); }
          .db-two-col { grid-template-columns: 1fr; }
          .db-bottom-row { grid-template-columns: 1fr; }
          .db-badges-grid { grid-template-columns: repeat(3, 1fr); }
          .db-profile-card { grid-template-columns: auto 1fr; }
          .db-profile-right { display: none; }
        }
        @media (max-width: 640px) {
          .db-header { padding: 0 16px; }
          .db-search { width: 160px; }
          .db-content { padding: 20px 16px 48px; }
          .db-stats-row { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .db-quick-actions { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .db-badges-grid { grid-template-columns: repeat(3, 1fr); }
          .db-profile-card { padding: 20px; gap: 16px; }
          .db-greeting-text { font-size: 24px; }
        }
        @media (max-width: 400px) {
          .db-search { display: none; }
          .db-profile-card { grid-template-columns: 1fr; }
          .db-profile-avatar-lg { display: none; }
        }
      `}</style>

      <div className="db-root">
        {/* ── Backdrop ── */}
        <div
          className={`db-backdrop ${sidebarOpen ? 'open' : ''}`}
          onClick={closeSidebar}
        />

        {/* ── Sidebar ── */}
        <aside className={`db-sidebar ${sidebarOpen ? 'open' : ''}`}>
          {/* Logo */}
          <div className="db-sidebar-logo">
            <a href="/" className="db-logo-wrap">
              <div className="db-logo-mark" />
              <div style={{display:'flex',flexDirection:'column'}}>
                <span className="db-logo-name">Blood<span>Circle</span></span>
                <span style={{fontSize:'8px',letterSpacing:'0.18em',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',marginTop:'2px'}}>
                  Life · Humanity · Hope
                </span>
              </div>
            </a>
            <button className="db-sidebar-close" onClick={closeSidebar} aria-label="Close menu">
              <XIcon />
            </button>
          </div>

          {/* User mini */}
          <div className="db-user-mini">
            <div className="db-user-avatar">R</div>
            <div>
              <div className="db-user-name">{donor.name}</div>
              <div className="db-user-loc">📍 {donor.location}</div>
              <div className="db-blood-badge">{donor.bloodGroup}</div>
            </div>
          </div>

          {/* Nav items */}
          <nav className="db-nav">
            <div className="db-nav-section">
              <div className="db-nav-section-label">Main</div>
            </div>
            {navItems.map((item) => (
              <button
                key={item.label}
                className={`db-nav-item ${activeNav === item.label ? 'active' : ''}`}
                onClick={() => { setActiveNav(item.label); closeSidebar() }}
              >
                <item.icon />
                {item.label}
              </button>
            ))}
            <div className="db-nav-section" style={{marginTop:'12px'}}>
              <div className="db-nav-section-label">Account</div>
            </div>
            <button className="db-nav-item" onClick={() => setActiveNav('Profile')}>
              <UserIcon />
              Settings
            </button>
          </nav>

          {/* Logout */}
          <div className="db-sidebar-footer">
            <button className="db-logout" onClick={() => console.log('Logout clicked')}>
              <LogoutIcon />
              Logout
            </button>
          </div>
        </aside>

        {/* ── Main ── */}
        <div className="db-main">
          {/* Header */}
          <header className="db-header">
            <div className="db-header-left">
              <button
                className="db-hamburger"
                aria-label="Open menu"
                onClick={() => setSidebarOpen(true)}
              >
                <MenuIcon />
              </button>
              <div className="db-search-wrap">
                <span className="db-search-icon"><SearchIcon /></span>
                <input
                  className="db-search"
                  type="text"
                  placeholder="Search donors, campaigns…"
                />
              </div>
            </div>
            <div className="db-header-right">
              <button className="db-icon-btn" onClick={() => console.log('Notifications')}>
                <BellIcon />
                <span className="db-notif-dot" />
              </button>
              <div className="db-header-avatar" title={donor.name}>R</div>
            </div>
          </header>

          {/* Content */}
          <div className="db-content">

            {/* Greeting */}
            <div className="db-greeting">
              {loading ? (
                <div className="db-skeleton" style={{height:'36px',width:'300px',marginBottom:'8px'}} />
              ) : (
                <div className="db-greeting-text">
                  {greeting()}, {donor.name.split(' ')[0]} 👋
                </div>
              )}
              <div className="db-greeting-sub">
                {loading
                  ? <div className="db-skeleton" style={{height:'16px',width:'220px'}} />
                  : `Here's your donation overview for today.`
                }
              </div>
            </div>

            {/* Profile Card */}
            {loading ? (
              <div className="db-skeleton" style={{height:'130px',borderRadius:'4px',marginBottom:'28px'}} />
            ) : (
              <div className="db-profile-card">
                <div className="db-profile-avatar-lg">R</div>
                <div className="db-profile-info">
                  <div className="db-profile-name">{donor.name}</div>
                  <div className="db-profile-meta">
                    <span className="db-meta-chip blood">🩸 {donor.bloodGroup}</span>
                    <span className="db-meta-chip eligible">● Eligible to Donate</span>
                    <span className="db-meta-chip healthy">✔ {donor.medicalStatus}</span>
                    <span className="db-meta-chip verified">✦ KYC {donor.kycStatus}</span>
                  </div>
                  <div style={{marginTop:'12px',display:'flex',gap:'24px'}}>
                    <div>
                      <div style={{fontSize:'11px',color:'rgba(255,255,255,0.35)',letterSpacing:'0.08em',textTransform:'uppercase'}}>Age</div>
                      <div style={{color:'white',fontWeight:'500',fontSize:'14px'}}>{donor.age} yrs</div>
                    </div>
                    <div>
                      <div style={{fontSize:'11px',color:'rgba(255,255,255,0.35)',letterSpacing:'0.08em',textTransform:'uppercase'}}>Last Donated</div>
                      <div style={{color:'white',fontWeight:'500',fontSize:'14px'}}>{donor.lastDonation} <span style={{fontSize:'11.5px',color:'rgba(255,255,255,0.4)'}}>({donor.lastDonationDaysAgo}d ago)</span></div>
                    </div>
                    <div>
                      <div style={{fontSize:'11px',color:'rgba(255,255,255,0.35)',letterSpacing:'0.08em',textTransform:'uppercase'}}>Response Rate</div>
                      <div style={{color:'white',fontWeight:'500',fontSize:'14px'}}>{donor.responseRate}</div>
                    </div>
                  </div>
                </div>
                <div className="db-profile-right">
                  <div className="db-profile-stat">
                    <div className="db-profile-stat-val">{donor.totalDonations}</div>
                    <div className="db-profile-stat-label">Total Donations</div>
                  </div>
                  <div style={{width:'1px',height:'30px',background:'rgba(255,255,255,0.08)'}} />
                  <div className="db-profile-stat">
                    <div className="db-profile-stat-val">42</div>
                    <div className="db-profile-stat-label">Lives Saved</div>
                  </div>
                </div>
              </div>
            )}

            {/* Stats Row */}
            {loading ? (
              <div className="db-stats-row">
                {[...Array(4)].map((_,i) => (
                  <div key={i} className="db-skeleton" style={{height:'110px',borderRadius:'4px'}} />
                ))}
              </div>
            ) : (
              <div className="db-stats-row">
                {stats.map((s) => (
                  <div className="db-stat-card" key={s.label}>
                    <span className="db-stat-icon">{s.icon}</span>
                    <div className="db-stat-value">{s.value}</div>
                    <div className="db-stat-label">{s.label}</div>
                    <div className="db-stat-sub">{s.sub}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Quick Actions */}
            <div className="db-section-title">
              <span />Quick Actions
            </div>
            {loading ? (
              <div className="db-quick-actions">
                {[...Array(4)].map((_,i) => (
                  <div key={i} className="db-skeleton" style={{height:'90px',borderRadius:'4px'}} />
                ))}
              </div>
            ) : (
              <div className="db-quick-actions">
                <div className="db-action-btn" onClick={() => console.log('Book Donation')}>
                  <span className="db-action-icon">📋</span>
                  <div className="db-action-label">Book Donation</div>
                </div>
                <div className="db-action-btn" onClick={() => console.log('Find Nearby Camp')}>
                  <span className="db-action-icon">📍</span>
                  <div className="db-action-label">Find Nearby Camp</div>
                </div>
                <div className="db-action-btn emergency" onClick={() => console.log('Emergency Blood Request')}>
                  <div className="db-emergency-pulse" />
                  <span className="db-action-icon">🆘</span>
                  <div className="db-action-label">Emergency Request</div>
                </div>
                <div className="db-action-btn" onClick={() => console.log('Download Donor Card')}>
                  <span className="db-action-icon">💳</span>
                  <div className="db-action-label">Download Donor Card</div>
                </div>
              </div>
            )}

            {/* Campaigns + Nearby Requests */}
            <div className="db-two-col">
              {/* Campaigns */}
              {loading ? (
                <div className="db-skeleton" style={{height:'320px',borderRadius:'4px'}} />
              ) : (
                <div className="db-section-card">
                  <div className="db-section-header">
                    <div className="db-section-header-title">Upcoming Campaigns</div>
                    <button className="db-view-all">View All →</button>
                  </div>
                  <div className="db-campaigns-scroll">
                    {campaigns.map((c, i) => (
                      <div className="db-campaign-item" key={i}>
                        <div className="db-campaign-top">
                          <div className="db-campaign-title">{c.title}</div>
                          <span className="db-campaign-dist">{c.distance}</span>
                        </div>
                        <div className="db-campaign-date">📅 {c.date} · 📍 {c.location}</div>
                        <div className="db-campaign-groups">
                          {c.groups.map(g => (
                            <span key={g} className="db-group-tag">{g}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Nearby Requests */}
              {loading ? (
                <div className="db-skeleton" style={{height:'320px',borderRadius:'4px'}} />
              ) : (
                <div className="db-section-card">
                  <div className="db-section-header">
                    <div className="db-section-header-title">Nearby Blood Requests</div>
                    <button className="db-view-all">View All →</button>
                  </div>
                  {nearbyRequests.map((r, i) => (
                    <div className="db-request-item" key={i}>
                      <div className="db-request-row">
                        <div className="db-request-left">
                          <div className="db-request-bg-badge">{r.group}</div>
                          <div className="db-request-info">
                            <div className="db-request-patient">{r.patient}</div>
                            <div className="db-request-hospital">{r.hospital} · {r.distance}</div>
                          </div>
                        </div>
                        <div className="db-request-right">
                          <span
                            className="db-urgency-tag"
                            style={{
                              background: r.urgencyColor + '18',
                              color: r.urgencyColor,
                              border: `1px solid ${r.urgencyColor}30`,
                            }}
                          >
                            {r.urgency}
                          </span>
                          <button
                            className="db-respond-btn"
                            onClick={() => console.log('Respond to', r.patient)}
                          >
                            Respond
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Activities + Badges */}
            <div className="db-two-col">
              {/* Recent Activities */}
              {loading ? (
                <div className="db-skeleton" style={{height:'320px',borderRadius:'4px'}} />
              ) : (
                <div className="db-section-card">
                  <div className="db-section-header">
                    <div className="db-section-header-title">Recent Activities</div>
                  </div>
                  <div className="db-timeline">
                    {activities.map((a, i) => (
                      <div className="db-timeline-item" key={i}>
                        <div
                          className="db-timeline-dot"
                          style={{background: a.color + '15', border: `1px solid ${a.color}30`}}
                        >
                          <span style={{fontSize:'16px'}}>{a.icon}</span>
                        </div>
                        <div>
                          <div className="db-timeline-action">{a.action}</div>
                          <div className="db-timeline-date">{a.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Badges */}
              {loading ? (
                <div className="db-skeleton" style={{height:'320px',borderRadius:'4px'}} />
              ) : (
                <div className="db-section-card">
                  <div className="db-section-header">
                    <div className="db-section-header-title">Badges Earned</div>
                    <span style={{fontSize:'12px',color:'var(--ink-soft)'}}>6 / 12</span>
                  </div>
                  <div className="db-badges-grid">
                    {badges.map((b, i) => (
                      <div
                        className="db-badge-item"
                        key={i}
                        ref={el => { badgeRefs.current[i] = el }}
                      >
                        <div className="db-badge-tooltip">{b.desc}</div>
                        <span className="db-badge-emoji">{b.icon}</span>
                        <div className="db-badge-name">{b.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Impact + Quote */}
            <div className="db-bottom-row">
              {loading ? (
                <>
                  <div className="db-skeleton" style={{height:'160px',borderRadius:'4px'}} />
                  <div className="db-skeleton" style={{height:'160px',borderRadius:'4px'}} />
                </>
              ) : (
                <>
                  <div className="db-impact-card">
                    <div className="db-impact-label">Your Impact Summary</div>
                    <div className="db-impact-row">
                      <div className="db-impact-stat">
                        <div className="db-impact-stat-val">42<span>+</span></div>
                        <div className="db-impact-stat-sub">Lives Saved</div>
                      </div>
                      <div style={{width:'1px',background:'rgba(255,255,255,0.08)',margin:'0 20px'}} />
                      <div className="db-impact-stat">
                        <div className="db-impact-stat-val">14</div>
                        <div className="db-impact-stat-sub">Donations</div>
                      </div>
                      <div style={{width:'1px',background:'rgba(255,255,255,0.08)',margin:'0 20px'}} />
                      <div className="db-impact-stat">
                        <div className="db-impact-stat-val">6<span>mo</span></div>
                        <div className="db-impact-stat-sub">Streak</div>
                      </div>
                    </div>
                    <div style={{marginTop:'20px'}}>
                      <div style={{height:'4px',background:'rgba(255,255,255,0.08)',borderRadius:'2px',overflow:'hidden'}}>
                        <div style={{height:'100%',width:'70%',background:'linear-gradient(90deg,#8C1F28,#A8323D)',borderRadius:'2px'}} />
                      </div>
                      <div style={{display:'flex',justifyContent:'space-between',marginTop:'6px'}}>
                        <span style={{fontSize:'11px',color:'rgba(255,255,255,0.3)'}}>Progress to Gold Donor</span>
                        <span style={{fontSize:'11px',color:'rgba(255,255,255,0.4)',fontWeight:'500'}}>14 / 20</span>
                      </div>
                    </div>
                  </div>
                  <div className="db-quote-card">
                    <div className="db-quote-mark">"</div>
                    <p className="db-quote-text">
                      The blood you donate gives someone another chance at life. One day that someone may be a close relative, a friend, or even yourself.
                    </p>
                    <div className="db-quote-author">— Tip of the Day · BloodCircle</div>
                  </div>
                </>
              )}
            </div>

          </div>{/* /db-content */}
        </div>{/* /db-main */}
      </div>{/* /db-root */}
    </>
  )
}