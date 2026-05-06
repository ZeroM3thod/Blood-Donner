'use client'

import React, { useState, useEffect, useRef } from 'react'
import DashboardSidebar, { SIDEBAR_W } from '@/components/DashboardSidebar'

/* ══════════════════════════════════════════
   SVG Icon Library
══════════════════════════════════════════ */
const IcoDrop      = ({ s = 18 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2C12 2 4 10.5 4 15.5a8 8 0 0016 0C20 10.5 12 2 12 2z"/></svg>
const IcoHeart     = ({ s = 18 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
const IcoCal       = ({ s = 18 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
const IcoFlame     = ({ s = 18 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14c0-3.5 3.5-7 3.5-10 0 0 4 4 4 8a4 4 0 01-8 0z"/><path d="M12 18c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" fill="currentColor" stroke="none"/></svg>
const IcoSearch    = ({ s = 14 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
const IcoBell      = ({ s = 18 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
const IcoPin       = ({ s = 13 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
const IcoBook      = ({ s = 20 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>
const IcoMap       = ({ s = 20 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="1,6 1,22 8,18 16,22 23,18 23,2 16,6 8,2"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>
const IcoAlert     = ({ s = 20 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
const IcoCard      = ({ s = 20 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
const IcoChevron   = ({ s = 12 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9,18 15,12 9,6"/></svg>
const IcoCheck     = ({ s = 13 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20,6 9,17 4,12"/></svg>
const IcoShield    = ({ s = 13 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
const IcoTrophy    = ({ s = 20 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="8,21 12,17 16,21"/><line x1="12" y1="17" x2="12" y2="11"/><path d="M6 3H18V9C18 12.3137 15.3137 15 12 15C8.68629 15 6 12.3137 6 9V3Z"/><path d="M6 5H2V8C2 9.10457 2.89543 10 4 10H6"/><path d="M18 5H22V8C22 9.10457 21.1046 10 20 10H18"/></svg>
const IcoStar      = ({ s = 20 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>
const IcoUsers     = ({ s = 20 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
const IcoActivity  = ({ s = 13 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/></svg>
const IcoMedal     = ({ s = 13 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="15" r="6"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/></svg>

/* ══════════════════════════════════════════
   Mock Data
══════════════════════════════════════════ */
const donor = {
  name: 'Rakibul Hasan',
  age: 28,
  bloodGroup: 'A+',
  lastDonation: '12 Apr 2026',
  lastDonationDaysAgo: 24,
  totalDonations: 14,
  medicalStatus: 'Healthy',
  kycStatus: 'Verified',
  location: 'Konabari, Gazipur',
  responseRate: '98%',
}

const stats = [
  { label: 'Total Donations', value: 14, sub: 'lifetime',          Icon: IcoDrop,  color: '#8C1F28' },
  { label: 'Lives Saved',     value: 42, sub: 'estimated',         Icon: IcoHeart, color: '#C0404C' },
  { label: 'This Year',       value: 4,  sub: 'donations in 2026', Icon: IcoCal,   color: '#B8922A' },
  { label: 'Streak',          value: 6,  sub: 'months',            Icon: IcoFlame, color: '#3A7D44' },
]

const campaigns = [
  { title: 'Dhaka Blood Drive',    date: '15 May 2026', location: 'Dhaka Medical College',    distance: '2.1 km', groups: ['A+','O+','B-'] },
  { title: 'Gazipur Camp',         date: '22 May 2026', location: 'Shaheed Tajuddin Hospital', distance: '0.8 km', groups: ['AB+','A-'] },
  { title: 'BIRDEM Drive',         date: '01 Jun 2026', location: 'BIRDEM Hospital',           distance: '5.4 km', groups: ['O-','B+'] },
  { title: 'United Hospital Camp', date: '10 Jun 2026', location: 'United Hospital',           distance: '7.2 km', groups: ['A+','AB-'] },
]

const nearbyRequests = [
  { patient: 'Farida Begum', hospital: 'Dhaka Medical College', group: 'A+', distance: '2.4 km', urgency: 'Critical', color: '#8C1F28' },
  { patient: 'Arif Hossain', hospital: 'BIRDEM General',        group: 'O+', distance: '4.1 km', urgency: 'Urgent',   color: '#B8922A' },
  { patient: 'Nusrat Jahan', hospital: 'Shaheed Hospital',      group: 'A+', distance: '1.2 km', urgency: 'Moderate', color: '#3A7D44' },
  { patient: 'Masum Billah', hospital: 'Green Life Medical',    group: 'B-', distance: '6.8 km', urgency: 'Critical', color: '#8C1F28' },
]

const activities = [
  { action: 'Donated Whole Blood',            date: '12 Apr 2026', Icon: IcoDrop,  color: '#8C1F28' },
  { action: 'Badge Earned — Life Saver',      date: '12 Apr 2026', Icon: IcoMedal, color: '#B8922A' },
  { action: 'Donated Platelets',              date: '05 Feb 2026', Icon: IcoDrop,  color: '#8C1F28' },
  { action: 'Badge Earned — 6-Month Streak',  date: '05 Feb 2026', Icon: IcoFlame, color: '#B8922A' },
  { action: 'Donated Whole Blood',            date: '18 Nov 2025', Icon: IcoDrop,  color: '#8C1F28' },
  { action: 'Joined BloodCircle',             date: '02 Jan 2025', Icon: IcoShield,color: '#3A7D44' },
]

const badges = [
  { name: 'First Drop',     Icon: IcoDrop,   desc: 'Completed your first donation',        earned: true  },
  { name: 'Life Saver',     Icon: IcoHeart,  desc: 'Saved 3+ lives through donations',     earned: true  },
  { name: '6-Mo Streak',    Icon: IcoFlame,  desc: 'Donated 6 months consecutively',       earned: true  },
  { name: 'Verified Hero',  Icon: IcoShield, desc: 'KYC fully verified donor',             earned: true  },
  { name: 'Camp Champion',  Icon: IcoMap,    desc: 'Attended 3+ donation camps',           earned: true  },
  { name: 'Guardian',       Icon: IcoTrophy, desc: 'Responded to 5+ emergency requests',   earned: true  },
  { name: 'Platinum',       Icon: IcoStar,   desc: 'Reach 20 total donations',             earned: false },
  { name: 'Mentor',         Icon: IcoUsers,  desc: 'Refer 5+ donors who donate',           earned: false },
  { name: 'Marathon',       Icon: IcoCal,    desc: 'Donate for 12 consecutive months',     earned: false },
  { name: 'First Aid',      Icon: IcoAlert,  desc: 'Respond to first emergency request',   earned: false },
  { name: 'Ambassador',     Icon: IcoCard,   desc: 'Share your donor card 3+ times',       earned: false },
  { name: 'Elite',          Icon: IcoMedal,  desc: 'Top 1% of all BloodCircle donors',     earned: false },
]

/* ══════════════════════════════════════════
   Animated counter hook
══════════════════════════════════════════ */
function useCounter(target: number, duration = 1200, start = false) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!start) return
    let frame: number
    const startTime = performance.now()
    const tick = (now: number) => {
      const pct = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - pct, 3)
      setVal(Math.round(eased * target))
      if (pct < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, duration, start])
  return val
}

function AnimatedStat({ target, color, sub, label, Icon, delay, ready }: {
  target: number; color: string; sub: string; label: string;
  Icon: ({ s }: { s?: number }) => React.ReactElement; delay: number; ready: boolean
}) {
  const val = useCounter(target, 1000, ready)
  return (
    <div className="stat-card" style={{ animationDelay: `${delay}ms` }}>
      <div className="stat-ico-wrap" style={{ background: `${color}14`, border: `1px solid ${color}22` }}>
        <span style={{ color }}><Icon s={17} /></span>
      </div>
      <div className="stat-val">{val}</div>
      <div className="stat-lbl">{label}</div>
      <div className="stat-sub">{sub}</div>
      <div className="stat-bar" style={{ background: `${color}18` }}>
        <div className="stat-bar-fill" style={{ background: color, width: ready ? `${Math.min((target / 50) * 100, 100)}%` : '0%' }} />
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   Page
══════════════════════════════════════════ */
export default function DashboardPage() {
  const [loading, setLoading]     = useState(true)
  const [activeNav, setActiveNav] = useState('Dashboard')
  const [statsReady, setStatsReady] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false)
      setTimeout(() => setStatsReady(true), 200)
    }, 900)
    return () => clearTimeout(t)
  }, [])

  const greeting = () => {
    const h = new Date().getHours()
    return h < 12 ? 'Good Morning' : h < 17 ? 'Good Afternoon' : 'Good Evening'
  }

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── Page shell ── */
        .db-page {
          min-height: 100vh;
          background: #F2EEE7;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── Main area ── */
        .db-main {
          margin-left: ${SIDEBAR_W}px;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          transition: margin-left 0.32s ease;
        }
        @media (max-width: 1024px) { .db-main { margin-left: 0; } }

        /* ── Header ── */
        .db-hdr {
          position: sticky; top: 0; z-index: 100;
          background: rgba(242,238,231,0.9);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(28,28,28,0.08);
          padding: 0 28px;
          height: 62px;
          display: flex; align-items: center; justify-content: space-between;
        }
        @media (max-width: 1024px) { .db-hdr { padding-left: 62px; } }
        @media (max-width: 640px)  { .db-hdr { padding-left: 58px; padding-right: 14px; } }

        .db-search-wrap { position: relative; display: flex; align-items: center; }
        .db-search-ico  { position: absolute; left: 11px; color: rgba(60,60,60,0.35); pointer-events: none; }
        .db-search {
          height: 36px; padding: 0 14px 0 34px;
          background: rgba(28,28,28,0.055);
          border: 1px solid transparent;
          border-radius: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; color: #1C1C1C;
          width: 220px; outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .db-search::placeholder { color: rgba(60,60,60,0.3); }
        .db-search:focus {
          border-color: rgba(140,31,40,0.2);
          background: #fff;
          box-shadow: 0 0 0 3px rgba(140,31,40,0.07);
        }
        @media (max-width: 640px) { .db-search { width: 160px; } }

        .db-hdr-right { display: flex; align-items: center; gap: 8px; }
        .db-icon-btn {
          width: 36px; height: 36px; border-radius: 6px;
          background: rgba(28,28,28,0.055);
          border: 1px solid transparent;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: rgba(40,40,40,0.5);
          transition: all 0.18s; position: relative;
        }
        .db-icon-btn:hover { background: rgba(140,31,40,0.1); color: #8C1F28; border-color: rgba(140,31,40,0.15); }
        .db-notif-dot {
          position: absolute; top: 8px; right: 8px;
          width: 6px; height: 6px;
          background: #8C1F28; border-radius: 50%;
          border: 1.5px solid #F2EEE7;
          animation: notif-pulse 2.5s ease infinite;
        }
        @keyframes notif-pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(140,31,40,0.5); }
          60%      { box-shadow: 0 0 0 5px rgba(140,31,40,0); }
        }
        .db-avatar-hdr {
          width: 36px; height: 36px;
          background: linear-gradient(135deg, #8C1F28, #A8323D);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px; font-weight: 700; color: #fff;
          cursor: pointer; flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(140,31,40,0.3);
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .db-avatar-hdr:hover { box-shadow: 0 4px 14px rgba(140,31,40,0.4); transform: scale(1.05); }

        /* ── Content ── */
        .db-content { flex: 1; padding: 30px 28px 64px; }
        @media (max-width: 640px) { .db-content { padding: 20px 14px 56px; } }

        /* ── Skeleton ── */
        .sk {
          background: linear-gradient(90deg,
            rgba(28,28,28,0.06) 25%,
            rgba(28,28,28,0.11) 50%,
            rgba(28,28,28,0.06) 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 6px;
        }
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

        /* ── Entrance animations ── */
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .anim-up  { animation: fade-up 0.5s ease both; }
        .anim-in  { animation: fade-in 0.4s ease both; }

        /* ── Greeting ── */
        .db-greeting { margin-bottom: 26px; }
        .db-greeting-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 30px; font-weight: 600; color: #1C1C1C; line-height: 1.15;
          animation: fade-up 0.5s 0.05s ease both;
        }
        .db-greeting-sub {
          font-size: 13.5px; color: rgba(60,60,60,0.5);
          margin-top: 4px;
          animation: fade-up 0.5s 0.1s ease both;
        }

        /* ── Profile card ── */
        .db-profile {
          background: #1C1C1C;
          border-radius: 8px;
          padding: 24px 26px;
          margin-bottom: 20px;
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 22px; align-items: center;
          position: relative; overflow: hidden;
          animation: fade-up 0.55s 0.15s ease both;
        }
        .db-profile::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 90% 50%, rgba(140,31,40,0.22) 0%, transparent 65%);
          pointer-events: none;
        }
        .db-profile::after {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(140,31,40,0.6), transparent);
        }
        .db-profile-av {
          width: 64px; height: 64px;
          background: linear-gradient(135deg, #8C1F28, #A8323D);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 27px; font-weight: 700; color: #fff;
          flex-shrink: 0;
          box-shadow: 0 0 0 3px rgba(140,31,40,0.3), 0 6px 24px rgba(140,31,40,0.25);
          position: relative;
        }
        .db-profile-av-online {
          position: absolute; bottom: 2px; right: 2px;
          width: 11px; height: 11px;
          background: #3A9D4A; border-radius: 50%;
          border: 2px solid #1C1C1C;
        }
        .db-profile-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 23px; font-weight: 600; color: #fff;
        }
        .db-chips { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 7px; }
        .chip {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 10.5px; font-weight: 500;
          padding: 3px 9px; border-radius: 3px;
        }
        .chip-blood  { background: rgba(140,31,40,0.22); color: #E07070; border: 1px solid rgba(140,31,40,0.38); font-family: 'Cormorant Garamond', serif; font-size: 12.5px; font-weight: 600; }
        .chip-green  { background: rgba(58,157,74,0.15); color: #5CB86B; border: 1px solid rgba(58,157,74,0.28); }
        .chip-gold   { background: rgba(184,146,42,0.13); color: #D4A83A; border: 1px solid rgba(184,146,42,0.26); }
        .db-profile-meta { display: flex; gap: 20px; margin-top: 11px; }
        .pml { font-size: 9.5px; color: rgba(255,255,255,0.25); letter-spacing: 0.1em; text-transform: uppercase; }
        .pmv { color: #fff; font-weight: 500; font-size: 12.5px; margin-top: 2px; }
        .pmv-note { font-size: 10px; color: rgba(255,255,255,0.3); }
        .db-profile-right { display: flex; gap: 24px; flex-shrink: 0; }
        .pr-item { text-align: right; }
        .prv { font-family: 'Cormorant Garamond', serif; font-size: 30px; font-weight: 700; color: #fff; line-height: 1; }
        .prl { font-size: 9.5px; color: rgba(255,255,255,0.28); letter-spacing: 0.1em; text-transform: uppercase; margin-top: 3px; }
        .pr-divider { width: 1px; background: rgba(255,255,255,0.07); align-self: stretch; }
        @media (max-width: 900px) { .db-profile-right { display: none; } .db-profile { grid-template-columns: auto 1fr; } }
        @media (max-width: 520px) { .db-profile { grid-template-columns: 1fr; } .db-profile-av { display: none; } }

        /* ── Stats grid ── */
        .db-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 13px; margin-bottom: 20px; }
        @media (max-width: 900px) { .db-stats { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .db-stats { grid-template-columns: repeat(2, 1fr); gap: 10px; } }

        .stat-card {
          background: #fff;
          border: 1px solid rgba(28,28,28,0.08);
          border-radius: 8px;
          padding: 18px 20px 16px;
          position: relative; overflow: hidden;
          cursor: default;
          animation: fade-up 0.5s ease both;
          transition: box-shadow 0.22s, transform 0.22s;
        }
        .stat-card:hover { box-shadow: 0 8px 28px rgba(0,0,0,0.09); transform: translateY(-3px); }
        .stat-ico-wrap {
          width: 34px; height: 34px; border-radius: 7px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 13px;
          transition: transform 0.2s;
        }
        .stat-card:hover .stat-ico-wrap { transform: scale(1.08); }
        .stat-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px; font-weight: 700; color: #1C1C1C; line-height: 1;
        }
        .stat-lbl {
          font-size: 10.5px; color: rgba(60,60,60,0.55);
          font-weight: 600; margin-top: 4px;
          text-transform: uppercase; letter-spacing: 0.07em;
        }
        .stat-sub { font-size: 10px; color: rgba(60,60,60,0.35); margin-top: 1px; }
        .stat-bar { height: 2px; border-radius: 2px; margin-top: 14px; overflow: hidden; }
        .stat-bar-fill {
          height: 100%; border-radius: 2px;
          transition: width 1.2s cubic-bezier(.4,0,.2,1);
        }

        /* ── Section title ── */
        .sec-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 19px; font-weight: 600; color: #1C1C1C;
          margin-bottom: 12px;
          display: flex; align-items: center; gap: 10px;
          animation: fade-up 0.5s ease both;
        }
        .sec-title-line { display: block; width: 18px; height: 1px; background: #8C1F28; }

        /* ── Quick actions ── */
        .db-actions {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 11px; margin-bottom: 24px;
          animation: fade-up 0.5s 0.25s ease both;
        }
        @media (max-width: 768px) { .db-actions { grid-template-columns: repeat(2, 1fr); } }

        .act-btn {
          background: #fff;
          border: 1px solid rgba(28,28,28,0.08);
          border-radius: 8px;
          padding: 16px 14px 15px;
          text-align: center; cursor: pointer;
          transition: box-shadow 0.22s, transform 0.22s, background 0.18s;
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          position: relative; overflow: hidden;
        }
        .act-btn::before {
          content: '';
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 2px; background: rgba(140,31,40,0.35);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.3s ease;
        }
        .act-btn:hover { box-shadow: 0 6px 22px rgba(0,0,0,0.09); transform: translateY(-2px); }
        .act-btn:hover::before { transform: scaleX(1); }
        .act-btn.act-emergency {
          background: #8C1F28;
          border-color: #7A1B24;
        }
        .act-btn.act-emergency:hover {
          background: #7A1B24;
          box-shadow: 0 10px 32px rgba(140,31,40,0.3);
          transform: translateY(-3px);
        }
        .act-btn.act-emergency::before { display: none; }
        .act-ico-wrap {
          width: 40px; height: 40px; border-radius: 8px;
          background: rgba(140,31,40,0.08);
          display: flex; align-items: center; justify-content: center;
          color: #8C1F28;
          transition: background 0.18s, transform 0.18s;
        }
        .act-btn:hover .act-ico-wrap { background: rgba(140,31,40,0.13); transform: scale(1.06); }
        .act-btn.act-emergency .act-ico-wrap {
          background: rgba(255,255,255,0.15); color: #fff;
        }
        .act-lbl { font-size: 12px; font-weight: 500; color: #1C1C1C; line-height: 1.3; }
        .act-btn.act-emergency .act-lbl { color: #fff; }
        .act-emergency-dot {
          position: absolute; top: 9px; right: 9px;
          width: 6px; height: 6px;
          background: rgba(255,255,255,0.7); border-radius: 50%;
          animation: notif-pulse 1.6s infinite;
        }

        /* ── Two-column grid ── */
        .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
        @media (max-width: 860px) { .two-col { grid-template-columns: 1fr; } }

        /* ── Section card ── */
        .sec-card {
          background: #fff;
          border: 1px solid rgba(28,28,28,0.08);
          border-radius: 8px; overflow: hidden;
          animation: fade-up 0.5s ease both;
        }
        .sec-hdr {
          padding: 15px 20px;
          border-bottom: 1px solid rgba(28,28,28,0.07);
          display: flex; align-items: center; justify-content: space-between;
        }
        .sec-hdr-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px; font-weight: 600; color: #1C1C1C;
          display: flex; align-items: center; gap: 7px;
        }
        .sec-hdr-ico { color: #8C1F28; display: flex; align-items: center; }
        .view-all-btn {
          display: flex; align-items: center; gap: 3px;
          font-size: 11px; color: #8C1F28; font-weight: 500;
          cursor: pointer; background: none; border: none;
          letter-spacing: 0.04em; opacity: 0.8;
          transition: opacity 0.15s;
        }
        .view-all-btn:hover { opacity: 1; }

        /* ── Campaign items ── */
        .camp-item {
          padding: 12px 20px;
          border-bottom: 1px solid rgba(28,28,28,0.055);
          cursor: pointer;
          transition: background 0.15s;
          display: flex; align-items: flex-start; gap: 12px;
        }
        .camp-item:last-child { border-bottom: none; }
        .camp-item:hover { background: rgba(140,31,40,0.023); }
        .camp-date-box {
          flex-shrink: 0; width: 40px; text-align: center;
          background: rgba(140,31,40,0.07);
          border: 1px solid rgba(140,31,40,0.12);
          border-radius: 5px; padding: 5px 4px;
        }
        .cdb-day { font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 700; color: #8C1F28; line-height: 1; }
        .cdb-mon { font-size: 8.5px; font-weight: 600; color: rgba(140,31,40,0.6); letter-spacing: 0.08em; text-transform: uppercase; margin-top: 1px; }
        .camp-info { flex: 1; min-width: 0; }
        .camp-top  { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; margin-bottom: 3px; }
        .camp-ttl  { font-size: 13px; font-weight: 500; color: #1C1C1C; }
        .camp-dist { font-size: 10.5px; color: #8C1F28; font-weight: 600; background: rgba(140,31,40,0.07); padding: 2px 7px; border-radius: 3px; white-space: nowrap; }
        .camp-loc  { font-size: 11px; color: rgba(60,60,60,0.5); margin-bottom: 6px; display: flex; align-items: center; gap: 3px; }
        .camp-groups { display: flex; gap: 4px; flex-wrap: wrap; }
        .gtag {
          font-family: 'Cormorant Garamond', serif;
          font-size: 11px; font-weight: 600;
          padding: 2px 6px; border-radius: 2px;
          background: rgba(140,31,40,0.07); color: #8C1F28;
          border: 1px solid rgba(140,31,40,0.14);
        }

        /* ── Request items ── */
        .req-item {
          padding: 12px 20px;
          border-bottom: 1px solid rgba(28,28,28,0.055);
          cursor: pointer;
          transition: background 0.15s;
        }
        .req-item:last-child { border-bottom: none; }
        .req-item:hover { background: rgba(140,31,40,0.023); }
        .req-row  { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
        .req-left { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; }
        .req-badge {
          width: 36px; height: 36px; flex-shrink: 0; border-radius: 50%;
          background: linear-gradient(135deg, #8C1F28, #A8323D);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 11px; font-weight: 700; color: #fff;
          box-shadow: 0 2px 8px rgba(140,31,40,0.25);
        }
        .req-patient { font-size: 12.5px; font-weight: 500; color: #1C1C1C; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .req-hosp    { font-size: 10.5px; color: rgba(60,60,60,0.5); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .req-right   { display: flex; align-items: center; gap: 7px; flex-shrink: 0; }
        .urgency-tag {
          font-size: 9px; font-weight: 700;
          padding: 2px 7px; border-radius: 3px;
          letter-spacing: 0.07em; text-transform: uppercase;
        }
        .respond-btn {
          padding: 5px 11px;
          background: #8C1F28; color: #fff;
          border: none; border-radius: 4px;
          font-size: 10.5px; font-weight: 500;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: background 0.15s, transform 0.15s;
        }
        .respond-btn:hover { background: #7A1B24; transform: scale(1.03); }

        /* ── Timeline ── */
        .timeline { padding: 6px 20px 18px; }
        .tl-item {
          display: flex; gap: 12px; padding: 9px 0;
          border-bottom: 1px solid rgba(28,28,28,0.055);
        }
        .tl-item:last-child { border-bottom: none; }
        .tl-dot {
          width: 30px; height: 30px; flex-shrink: 0;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin-top: 1px;
        }
        .tl-act  { font-size: 12.5px; font-weight: 500; color: #1C1C1C; }
        .tl-date { font-size: 10.5px; color: rgba(60,60,60,0.45); margin-top: 2px; }

        /* ── Badges ── */
        .badges-grid {
          display: grid; grid-template-columns: repeat(6, 1fr);
          gap: 8px; padding: 16px 20px 20px;
        }
        @media (max-width: 768px) { .badges-grid { grid-template-columns: repeat(4, 1fr); } }
        @media (max-width: 480px) { .badges-grid { grid-template-columns: repeat(3, 1fr); } }

        .badge-item {
          text-align: center; cursor: pointer;
          padding: 12px 6px 10px;
          border-radius: 7px;
          border: 1px solid rgba(28,28,28,0.08);
          background: #F7F3EC;
          transition: all 0.2s;
          position: relative;
        }
        .badge-item.earned {
          background: #fff;
          border-color: rgba(140,31,40,0.15);
        }
        .badge-item.locked { opacity: 0.45; filter: grayscale(0.6); }
        .badge-item.earned:hover {
          border-color: rgba(140,31,40,0.3);
          background: rgba(140,31,40,0.03);
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(0,0,0,0.07);
        }
        .badge-ico-wrap {
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(140,31,40,0.08);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 7px; color: #8C1F28;
        }
        .badge-item.locked .badge-ico-wrap { background: rgba(60,60,60,0.08); color: rgba(60,60,60,0.4); }
        .badge-name { font-size: 9px; font-weight: 600; color: rgba(40,40,40,0.7); letter-spacing: 0.04em; line-height: 1.35; }
        .badge-tip {
          position: absolute; bottom: calc(100% + 7px); left: 50%;
          transform: translateX(-50%);
          background: #1C1C1C; color: #fff;
          font-size: 10px; padding: 5px 9px; border-radius: 4px;
          white-space: nowrap; z-index: 20;
          pointer-events: none; opacity: 0;
          transition: opacity 0.15s;
        }
        .badge-item:hover .badge-tip { opacity: 1; }
        .badge-tip::after {
          content: ''; position: absolute; top: 100%; left: 50%;
          transform: translateX(-50%);
          border: 4px solid transparent; border-top-color: #1C1C1C;
        }
        .badge-check {
          position: absolute; top: 6px; right: 6px;
          width: 14px; height: 14px; border-radius: 50%;
          background: #3A9D4A;
          display: flex; align-items: center; justify-content: center;
          color: #fff;
        }

        /* ── Bottom row ── */
        .bottom-row {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 16px; margin-bottom: 20px;
          animation: fade-up 0.5s 0.45s ease both;
        }
        @media (max-width: 860px) { .bottom-row { grid-template-columns: 1fr; } }

        .impact-card {
          background: #1C1C1C; border-radius: 8px;
          padding: 24px; position: relative; overflow: hidden;
        }
        .impact-card::before {
          content: ''; position: absolute; top: 0; right: 0;
          width: 180px; height: 180px;
          background: radial-gradient(ellipse, rgba(140,31,40,0.28) 0%, transparent 70%);
          pointer-events: none;
        }
        .impact-card::after {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(140,31,40,0.5), transparent);
        }
        .impact-lbl {
          font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase;
          color: rgba(255,255,255,0.22); margin-bottom: 16px;
        }
        .impact-figures { display: flex; gap: 0; }
        .i-fig { flex: 1; padding: 0 16px; border-right: 1px solid rgba(255,255,255,0.06); }
        .i-fig:first-child { padding-left: 0; }
        .i-fig:last-child  { border-right: none; }
        .i-val { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 700; color: #fff; line-height: 1; }
        .i-val em { color: #C0404C; font-style: normal; font-size: 22px; vertical-align: top; margin-top: 4px; display: inline-block; }
        .i-sub { font-size: 9.5px; color: rgba(255,255,255,0.28); margin-top: 3px; letter-spacing: 0.06em; text-transform: uppercase; }
        .prog-wrap { margin-top: 20px; }
        .prog-track { height: 3px; background: rgba(255,255,255,0.07); border-radius: 2px; overflow: hidden; }
        .prog-fill  {
          height: 100%; width: 70%;
          background: linear-gradient(90deg, #8C1F28, #C0404C);
          border-radius: 2px;
          transition: width 1.4s 0.6s cubic-bezier(.4,0,.2,1);
          position: relative;
        }
        .prog-fill::after {
          content: '';
          position: absolute; right: 0; top: 50%;
          transform: translateY(-50%);
          width: 7px; height: 7px; border-radius: 50%;
          background: #C0404C;
          box-shadow: 0 0 8px rgba(192,64,76,0.8);
        }
        .prog-meta { display: flex; justify-content: space-between; margin-top: 6px; }
        .prog-lbl  { font-size: 9.5px; color: rgba(255,255,255,0.22); }
        .prog-val  { font-size: 9.5px; color: rgba(255,255,255,0.35); font-weight: 600; }

        .quote-card {
          background: #fff;
          border: 1px solid rgba(28,28,28,0.08);
          border-radius: 8px; padding: 24px;
          display: flex; flex-direction: column; justify-content: center;
          position: relative;
        }
        .quote-mark {
          font-family: 'Cormorant Garamond', serif;
          font-size: 80px; font-weight: 700; color: #8C1F28;
          opacity: 0.08; position: absolute; top: 0px; left: 16px;
          line-height: 1; pointer-events: none; user-select: none;
        }
        .quote-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 17.5px; font-style: italic; color: #1C1C1C;
          line-height: 1.7; position: relative; z-index: 1;
        }
        .quote-divider {
          width: 28px; height: 1px; background: #8C1F28;
          margin: 14px 0 10px;
        }
        .quote-auth { font-size: 10.5px; color: rgba(60,60,60,0.45); font-weight: 500; letter-spacing: 0.06em; }

        /* ── Responsive tweaks ── */
        @media (max-width: 640px) {
          .db-profile-meta { flex-wrap: wrap; gap: 12px; }
          .db-search { width: 140px; }
        }
      `}</style>

      <div className="db-page">
        {/* Sidebar */}
        <DashboardSidebar
          activeNav={activeNav}
          onNavChange={setActiveNav}
          user={{ name: donor.name, initials: 'R', bloodGroup: donor.bloodGroup, location: donor.location }}
        />

        {/* Main */}
        <div className="db-main">

          {/* Header */}
          <header className="db-hdr">
            <div className="db-search-wrap">
              <span className="db-search-ico"><IcoSearch /></span>
              <input className="db-search" type="text" placeholder="Search donors, campaigns…" />
            </div>
            <div className="db-hdr-right">
              <button className="db-icon-btn">
                <IcoBell />
                <span className="db-notif-dot" />
              </button>
              <div className="db-avatar-hdr" title={donor.name}>R</div>
            </div>
          </header>

          {/* Content */}
          <div className="db-content" ref={contentRef}>

            {/* Greeting */}
            {loading
              ? (
                <div className="db-greeting">
                  <div className="sk" style={{ height: 34, width: 280, marginBottom: 8 }} />
                  <div className="sk" style={{ height: 14, width: 210 }} />
                </div>
              )
              : (
                <div className="db-greeting">
                  <div className="db-greeting-title">{greeting()}, {donor.name.split(' ')[0]}</div>
                  <div className="db-greeting-sub">Here's your donation overview — <strong style={{ color: '#8C1F28', fontWeight: 600 }}>Wednesday, 6 May 2026</strong></div>
                </div>
              )
            }

            {/* Profile card */}
            {loading
              ? <div className="sk" style={{ height: 118, marginBottom: 20 }} />
              : (
                <div className="db-profile">
                  <div className="db-profile-av">
                    R
                    <div className="db-profile-av-online" />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div className="db-profile-name">{donor.name}</div>
                    <div className="db-chips">
                      <span className="chip chip-blood"><IcoDrop s={11} /> {donor.bloodGroup}</span>
                      <span className="chip chip-green"><IcoActivity s={10} /> Eligible to Donate</span>
                      <span className="chip chip-green"><IcoCheck s={10} /> {donor.medicalStatus}</span>
                      <span className="chip chip-gold"><IcoShield s={10} /> KYC {donor.kycStatus}</span>
                    </div>
                    <div className="db-profile-meta">
                      <div><div className="pml">Age</div><div className="pmv">{donor.age} yrs</div></div>
                      <div><div className="pml">Last Donated</div><div className="pmv">{donor.lastDonation} <span className="pmv-note">({donor.lastDonationDaysAgo}d ago)</span></div></div>
                      <div><div className="pml">Response Rate</div><div className="pmv">{donor.responseRate}</div></div>
                      <div><div className="pml">Location</div><div className="pmv">{donor.location}</div></div>
                    </div>
                  </div>
                  <div className="db-profile-right">
                    <div className="pr-item">
                      <div className="prv">{donor.totalDonations}</div>
                      <div className="prl">Donations</div>
                    </div>
                    <div className="pr-divider" />
                    <div className="pr-item">
                      <div className="prv">42</div>
                      <div className="prl">Lives Saved</div>
                    </div>
                  </div>
                </div>
              )
            }

            {/* Stats */}
            {loading
              ? (
                <div className="db-stats">
                  {[...Array(4)].map((_,i) => <div key={i} className="sk" style={{ height: 110 }} />)}
                </div>
              )
              : (
                <div className="db-stats">
                  {stats.map((s, i) => (
                    <AnimatedStat
                      key={s.label}
                      target={s.value}
                      color={s.color}
                      sub={s.sub}
                      label={s.label}
                      Icon={s.Icon}
                      delay={i * 70}
                      ready={statsReady}
                    />
                  ))}
                </div>
              )
            }

            {/* Quick Actions */}
            <div className="sec-title" style={{ animationDelay: '0.22s' }}>
              <span className="sec-title-line" />Quick Actions
            </div>
            {loading
              ? (
                <div className="db-actions">
                  {[...Array(4)].map((_,i) => <div key={i} className="sk" style={{ height: 88 }} />)}
                </div>
              )
              : (
                <div className="db-actions">
                  {[
                    { label: 'Book Donation', Icon: IcoBook },
                    { label: 'Find Nearby Camp', Icon: IcoMap },
                    { label: 'Emergency Request', Icon: IcoAlert, emergency: true },
                    { label: 'Download Donor Card', Icon: IcoCard },
                  ].map(({ label, Icon, emergency }) => (
                    <button key={label} className={`act-btn${emergency ? ' act-emergency' : ''}`}>
                      {emergency && <div className="act-emergency-dot" />}
                      <div className="act-ico-wrap"><Icon s={20} /></div>
                      <div className="act-lbl">{label}</div>
                    </button>
                  ))}
                </div>
              )
            }

            {/* Campaigns + Requests */}
            <div className="two-col">
              {loading
                ? <div className="sk" style={{ height: 300 }} />
                : (
                  <div className="sec-card" style={{ animationDelay: '0.3s' }}>
                    <div className="sec-hdr">
                      <div className="sec-hdr-title">
                        <span className="sec-hdr-ico"><IcoCal s={15} /></span>
                        Upcoming Campaigns
                      </div>
                      <button className="view-all-btn">View All <IcoChevron s={11} /></button>
                    </div>
                    {campaigns.map((c, i) => {
                      const [day, mon] = c.date.split(' ')
                      return (
                        <div className="camp-item" key={i}>
                          <div className="camp-date-box">
                            <div className="cdb-day">{day}</div>
                            <div className="cdb-mon">{mon}</div>
                          </div>
                          <div className="camp-info">
                            <div className="camp-top">
                              <div className="camp-ttl">{c.title}</div>
                              <span className="camp-dist">{c.distance}</span>
                            </div>
                            <div className="camp-loc">
                              <IcoPin s={11} />
                              {c.location}
                            </div>
                            <div className="camp-groups">
                              {c.groups.map(g => <span key={g} className="gtag">{g}</span>)}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )
              }
              {loading
                ? <div className="sk" style={{ height: 300 }} />
                : (
                  <div className="sec-card" style={{ animationDelay: '0.35s' }}>
                    <div className="sec-hdr">
                      <div className="sec-hdr-title">
                        <span className="sec-hdr-ico"><IcoDrop s={13} /></span>
                        Nearby Blood Requests
                      </div>
                      <button className="view-all-btn">View All <IcoChevron s={11} /></button>
                    </div>
                    {nearbyRequests.map((r, i) => (
                      <div className="req-item" key={i}>
                        <div className="req-row">
                          <div className="req-left">
                            <div className="req-badge" style={{ background: `linear-gradient(135deg, ${r.color}, ${r.color}cc)` }}>{r.group}</div>
                            <div style={{ minWidth: 0 }}>
                              <div className="req-patient">{r.patient}</div>
                              <div className="req-hosp">{r.hospital} · {r.distance}</div>
                            </div>
                          </div>
                          <div className="req-right">
                            <span className="urgency-tag" style={{ background: `${r.color}14`, color: r.color, border: `1px solid ${r.color}28` }}>{r.urgency}</span>
                            <button className="respond-btn">Respond</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              }
            </div>

            {/* Activities + Badges */}
            <div className="two-col">
              {loading
                ? <div className="sk" style={{ height: 300 }} />
                : (
                  <div className="sec-card" style={{ animationDelay: '0.38s' }}>
                    <div className="sec-hdr">
                      <div className="sec-hdr-title">
                        <span className="sec-hdr-ico"><IcoActivity s={14} /></span>
                        Recent Activity
                      </div>
                    </div>
                    <div className="timeline">
                      {activities.map((a, i) => (
                        <div className="tl-item" key={i} style={{ animationDelay: `${0.38 + i * 0.05}s` }}>
                          <div className="tl-dot" style={{ background: `${a.color}12`, border: `1px solid ${a.color}22` }}>
                            <span style={{ color: a.color }}><a.Icon s={14} /></span>
                          </div>
                          <div>
                            <div className="tl-act">{a.action}</div>
                            <div className="tl-date">{a.date}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              }
              {loading
                ? <div className="sk" style={{ height: 300 }} />
                : (
                  <div className="sec-card" style={{ animationDelay: '0.42s' }}>
                    <div className="sec-hdr">
                      <div className="sec-hdr-title">
                        <span className="sec-hdr-ico"><IcoMedal s={14} /></span>
                        Badges Earned
                      </div>
                      <span style={{ fontSize: 11, color: 'rgba(60,60,60,0.45)', fontWeight: 500 }}>6 of 12</span>
                    </div>
                    <div className="badges-grid">
                      {badges.map((b, i) => (
                        <div key={i} className={`badge-item${b.earned ? ' earned' : ' locked'}`}>
                          <div className="badge-tip">{b.desc}</div>
                          {b.earned && (
                            <div className="badge-check"><IcoCheck s={8} /></div>
                          )}
                          <div className="badge-ico-wrap"><b.Icon s={15} /></div>
                          <div className="badge-name">{b.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              }
            </div>

            {/* Impact + Quote */}
            <div className="bottom-row">
              {loading
                ? <><div className="sk" style={{ height: 160 }} /><div className="sk" style={{ height: 160 }} /></>
                : (
                  <>
                    <div className="impact-card">
                      <div className="impact-lbl">Your Impact Summary</div>
                      <div className="impact-figures">
                        <div className="i-fig">
                          <div className="i-val">42<em>+</em></div>
                          <div className="i-sub">Lives Saved</div>
                        </div>
                        <div className="i-fig">
                          <div className="i-val">14</div>
                          <div className="i-sub">Donations</div>
                        </div>
                        <div className="i-fig">
                          <div className="i-val">6<em>mo</em></div>
                          <div className="i-sub">Streak</div>
                        </div>
                      </div>
                      <div className="prog-wrap">
                        <div className="prog-track">
                          <div className="prog-fill" style={{ width: statsReady ? '70%' : '0%' }} />
                        </div>
                        <div className="prog-meta">
                          <span className="prog-lbl">Progress to Gold Donor</span>
                          <span className="prog-val">14 / 20</span>
                        </div>
                      </div>
                    </div>

                    <div className="quote-card">
                      <div className="quote-mark">"</div>
                      <p className="quote-text">The blood you donate gives someone another chance at life. One day that someone may be a close relative, a friend, or even yourself.</p>
                      <div className="quote-divider" />
                      <div className="quote-auth">Tip of the Day — BloodCircle</div>
                    </div>
                  </>
                )
              }
            </div>

          </div>{/* /db-content */}
        </div>{/* /db-main */}
      </div>
    </>
  )
}