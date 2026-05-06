'use client'

import { useState, useEffect } from 'react'
import DashboardSidebar, { SIDEBAR_W } from '@/components/DashboardSidebar'

/* ── Mock Data ── */
const donor = {
  name: 'Rakibul Hasan', age: 28, bloodGroup: 'A+',
  lastDonation: '12 Apr 2026', lastDonationDaysAgo: 24,
  totalDonations: 14, medicalStatus: 'Healthy',
  kycStatus: 'Verified', location: 'Konabari, Gazipur', responseRate: '98%',
}
const stats = [
  { label: 'Total Donations', value: '14', sub: 'lifetime',          icon: '🩸' },
  { label: 'Lives Saved',     value: '42', sub: 'estimated',         icon: '❤️' },
  { label: 'This Year',       value: '4',  sub: 'donations in 2026', icon: '📅' },
  { label: 'Streak',          value: '6',  sub: 'months',            icon: '🔥' },
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
  { action: 'Donated Whole Blood',           date: '12 Apr 2026', icon: '🩸', color: '#8C1F28' },
  { action: 'Badge Earned: "Life Saver"',    date: '12 Apr 2026', icon: '🏅', color: '#B8922A' },
  { action: 'Donated Platelets',             date: '05 Feb 2026', icon: '🩸', color: '#8C1F28' },
  { action: 'Badge Earned: "6-Month Streak"',date: '05 Feb 2026', icon: '🔥', color: '#B8922A' },
  { action: 'Donated Whole Blood',           date: '18 Nov 2025', icon: '🩸', color: '#8C1F28' },
  { action: 'Joined BloodCircle',            date: '02 Jan 2025', icon: '✨', color: '#3A7D44' },
]
const badges = [
  { name: 'First Drop',     icon: '🩸', desc: 'Completed your first donation' },
  { name: 'Life Saver',     icon: '❤️', desc: 'Saved 3+ lives through donations' },
  { name: '6-Month Streak', icon: '🔥', desc: 'Donated 6 months consecutively' },
  { name: 'Verified Hero',  icon: '✅', desc: 'KYC fully verified donor' },
  { name: 'Camp Champion',  icon: '🏕️', desc: 'Attended 3+ donation camps' },
  { name: 'Guardian',       icon: '🛡️', desc: 'Responded to 5+ emergency requests' },
]

/* ── Header icons ── */
const BellIco   = () => <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
const SearchIco = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>

export default function DashboardPage() {
  const [loading, setLoading]   = useState(true)
  const [activeNav, setActiveNav] = useState('Dashboard')

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1100)
    return () => clearTimeout(t)
  }, [])

  const greeting = () => {
    const h = new Date().getHours()
    return h < 12 ? 'Good Morning' : h < 17 ? 'Good Afternoon' : 'Good Evening'
  }

  /* ── colour helpers (no CSS vars) ── */
  const C = {
    bg:       '#F7F3EC',
    white:    '#FFFFFF',
    ink:      '#1C1C1C',
    crimson:  '#8C1F28',
    border:   'rgba(28,28,28,0.09)',
    soft:     'rgba(107,107,107,0.65)',
  }

  return (
    <>
      <style>{`
        /* ── reset only what we need ── */
        *, *::before, *::after { box-sizing: border-box; }

        .db-page {
          min-height: 100vh;
          background: #F7F3EC;
          font-family: 'DM Sans', sans-serif;
        }

        /* Main area: always offset by sidebar width on desktop */
        .db-main {
          margin-left: ${SIDEBAR_W}px;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        /* Header */
        .db-hdr {
          position: sticky; top: 0; z-index: 100;
          background: rgba(247,243,236,0.94);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(28,28,28,0.09);
          padding: 0 28px;
          height: 64px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .db-search-wrap { position: relative; display: flex; align-items: center; }
        .db-search-ico  { position: absolute; left: 11px; color: rgba(107,107,107,0.55); pointer-events: none; }
        .db-search {
          height: 36px; padding: 0 14px 0 34px;
          background: rgba(28,28,28,0.05);
          border: 1px solid transparent; border-radius: 5px;
          font-family: 'DM Sans', sans-serif; font-size: 13px; color: #1C1C1C;
          width: 230px; outline: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .db-search::placeholder { color: rgba(107,107,107,0.5); }
        .db-search:focus { border-color: rgba(28,28,28,0.14); background: #fff; box-shadow: 0 1px 6px rgba(0,0,0,0.06); }

        .db-icon-btn {
          width: 36px; height: 36px; border-radius: 5px;
          background: rgba(28,28,28,0.05); border: 1px solid transparent;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: rgba(60,60,60,0.6);
          transition: background 0.2s, color 0.2s; position: relative;
        }
        .db-icon-btn:hover { background: rgba(140,31,40,0.08); color: #8C1F28; }
        .db-notif {
          position: absolute; top: 7px; right: 7px;
          width: 7px; height: 7px; background: #8C1F28;
          border-radius: 50%; border: 1.5px solid #F7F3EC;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(140,31,40,0.4); }
          50%      { box-shadow: 0 0 0 5px rgba(140,31,40,0); }
        }
        .db-avatar-hdr {
          width: 36px; height: 36px; background: #8C1F28; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', serif; font-size: 16px; font-weight: 700;
          color: #fff; cursor: pointer; flex-shrink: 0;
          transition: box-shadow 0.2s;
        }
        .db-avatar-hdr:hover { box-shadow: 0 0 0 3px rgba(140,31,40,0.2); }

        /* Content */
        .db-content { flex: 1; padding: 32px 28px 60px; }

        /* Skeleton */
        .sk {
          background: linear-gradient(90deg, rgba(28,28,28,0.06) 25%, rgba(28,28,28,0.10) 50%, rgba(28,28,28,0.06) 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
          border-radius: 5px;
        }
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

        /* Profile card */
        .db-profile {
          background: #1C1C1C; border-radius: 6px;
          padding: 26px 28px; margin-bottom: 22px;
          display: grid; grid-template-columns: auto 1fr auto;
          gap: 24px; align-items: center;
          position: relative; overflow: hidden;
        }
        .db-profile::before {
          content: ''; position: absolute; right: 0; top: 0; bottom: 0; width: 200px;
          background: radial-gradient(ellipse at right, rgba(140,31,40,0.2) 0%, transparent 70%);
          pointer-events: none;
        }
        .db-profile-av {
          width: 66px; height: 66px; background: #8C1F28; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 700;
          color: #fff; flex-shrink: 0; box-shadow: 0 0 0 4px rgba(140,31,40,0.22);
        }
        .db-profile-name { font-family: 'Cormorant Garamond', serif; font-size: 24px; font-weight: 600; color: #fff; }
        .db-chips { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 8px; }
        .chip { display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 500; padding: 3px 9px; border-radius: 3px; }
        .chip-blood    { background: rgba(140,31,40,0.25); color: #E07070; border: 1px solid rgba(140,31,40,0.4); font-family: 'Cormorant Garamond', serif; font-size: 13px; }
        .chip-green    { background: rgba(58,125,68,0.18); color: #5CB86B; border: 1px solid rgba(58,125,68,0.3); }
        .chip-gold     { background: rgba(184,146,42,0.14); color: #D4A83A; border: 1px solid rgba(184,146,42,0.28); }
        .db-profile-details { display: flex; gap: 22px; margin-top: 12px; }
        .pdl { font-size: 10px; color: rgba(255,255,255,0.28); letter-spacing: 0.08em; text-transform: uppercase; }
        .pdv { color: #fff; font-weight: 500; font-size: 13px; margin-top: 1px; }
        .db-profile-right { display: flex; flex-direction: column; gap: 12px; align-items: flex-end; flex-shrink: 0; }
        .prv { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 700; color: #fff; line-height: 1; text-align: right; }
        .prl { font-size: 10px; color: rgba(255,255,255,0.3); letter-spacing: 0.1em; text-transform: uppercase; margin-top: 2px; }

        /* Stats */
        .db-stats { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; margin-bottom: 22px; }
        .stat-card {
          background: #fff; border: 1px solid rgba(28,28,28,0.09); border-radius: 6px;
          padding: 20px 22px; cursor: default; position: relative; overflow: hidden;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .stat-card::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0;
          height: 2px; background: #8C1F28; transform: scaleX(0); transform-origin: left;
          transition: transform 0.3s;
        }
        .stat-card:hover { box-shadow: 0 6px 26px rgba(0,0,0,0.09); transform: translateY(-2px); }
        .stat-card:hover::after { transform: scaleX(1); }
        .stat-ico { font-size: 20px; margin-bottom: 9px; display: block; }
        .stat-val { font-family: 'Cormorant Garamond', serif; font-size: 34px; font-weight: 700; color: #1C1C1C; line-height: 1; }
        .stat-lbl { font-size: 11px; color: rgba(107,107,107,0.75); font-weight: 500; margin-top: 4px; text-transform: uppercase; letter-spacing: 0.07em; }
        .stat-sub { font-size: 10.5px; color: rgba(107,107,107,0.4); margin-top: 2px; }

        /* Section title */
        .sec-title {
          font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 600;
          color: #1C1C1C; margin-bottom: 13px;
          display: flex; align-items: center; gap: 10px;
        }
        .sec-title-line { display: block; width: 20px; height: 1px; background: #8C1F28; }

        /* Quick actions */
        .db-actions { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; margin-bottom: 26px; }
        .act-btn {
          background: #fff; border: 1.5px solid rgba(28,28,28,0.09); border-radius: 6px;
          padding: 18px 16px; text-align: center; cursor: pointer;
          transition: box-shadow 0.2s, transform 0.2s; position: relative; overflow: hidden;
        }
        .act-btn:hover { box-shadow: 0 6px 22px rgba(0,0,0,0.09); transform: translateY(-2px); }
        .act-btn.emergency { background: #8C1F28; border-color: #8C1F28; }
        .act-btn.emergency:hover { background: #7A1B24; transform: translateY(-3px); box-shadow: 0 10px 34px rgba(140,31,40,0.3); }
        .act-ico  { font-size: 24px; margin-bottom: 7px; display: block; }
        .act-lbl  { font-size: 12px; font-weight: 600; color: #1C1C1C; }
        .act-btn.emergency .act-lbl { color: #fff; }
        .emg-dot { position: absolute; top: 10px; right: 10px; width: 7px; height: 7px; background: rgba(255,255,255,0.7); border-radius: 50%; animation: pulse 1.5s infinite; }

        /* Two-col */
        .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 22px; }

        /* Section card */
        .sec-card { background: #fff; border: 1px solid rgba(28,28,28,0.09); border-radius: 6px; overflow: hidden; }
        .sec-hdr { padding: 17px 22px; border-bottom: 1px solid rgba(28,28,28,0.07); display: flex; align-items: center; justify-content: space-between; }
        .sec-hdr-title { font-family: 'Cormorant Garamond', serif; font-size: 17px; font-weight: 600; color: #1C1C1C; }
        .view-all { font-size: 11.5px; color: #8C1F28; font-weight: 500; cursor: pointer; background: none; border: none; letter-spacing: 0.05em; }
        .view-all:hover { opacity: 0.65; }

        /* Campaign items */
        .camp-item { padding: 13px 22px; border-bottom: 1px solid rgba(28,28,28,0.06); cursor: pointer; transition: background 0.15s; }
        .camp-item:last-child { border-bottom: none; }
        .camp-item:hover { background: rgba(140,31,40,0.025); }
        .camp-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 4px; }
        .camp-ttl  { font-size: 13px; font-weight: 500; color: #1C1C1C; }
        .camp-dist { font-size: 11px; color: #8C1F28; font-weight: 500; background: rgba(140,31,40,0.07); padding: 2px 7px; border-radius: 2px; }
        .camp-date { font-size: 11px; color: rgba(107,107,107,0.65); margin-bottom: 7px; }
        .camp-groups { display: flex; gap: 4px; flex-wrap: wrap; }
        .gtag { font-family: 'Cormorant Garamond', serif; font-size: 11.5px; font-weight: 600; padding: 2px 6px; border-radius: 2px; background: rgba(140,31,40,0.07); color: #8C1F28; border: 1px solid rgba(140,31,40,0.14); }

        /* Request items */
        .req-item { padding: 13px 22px; border-bottom: 1px solid rgba(28,28,28,0.06); cursor: pointer; transition: background 0.15s; }
        .req-item:last-child { border-bottom: none; }
        .req-item:hover { background: rgba(140,31,40,0.025); }
        .req-row  { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
        .req-left { display: flex; align-items: center; gap: 11px; flex: 1; min-width: 0; }
        .req-badge { width: 38px; height: 38px; flex-shrink: 0; border-radius: 50%; background: #8C1F28; display: flex; align-items: center; justify-content: center; font-family: 'Cormorant Garamond', serif; font-size: 12px; font-weight: 700; color: #fff; }
        .req-patient  { font-size: 13px; font-weight: 500; color: #1C1C1C; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .req-hosp     { font-size: 11px; color: rgba(107,107,107,0.65); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .req-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
        .urgency-tag { font-size: 9.5px; font-weight: 600; padding: 2px 7px; border-radius: 2px; letter-spacing: 0.06em; text-transform: uppercase; }
        .respond-btn { padding: 5px 12px; background: #8C1F28; color: #fff; border: none; border-radius: 3px; font-size: 11px; font-weight: 500; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: background 0.15s; }
        .respond-btn:hover { background: #7A1B24; }

        /* Timeline */
        .timeline { padding: 6px 22px 20px; }
        .tl-item { display: flex; gap: 13px; padding: 10px 0; border-bottom: 1px solid rgba(28,28,28,0.06); }
        .tl-item:last-child { border-bottom: none; }
        .tl-dot  { width: 32px; height: 32px; flex-shrink: 0; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; margin-top: 1px; }
        .tl-act  { font-size: 13px; font-weight: 500; color: #1C1C1C; }
        .tl-date { font-size: 11px; color: rgba(107,107,107,0.6); margin-top: 2px; }

        /* Badges */
        .badges-grid { display: grid; grid-template-columns: repeat(6,1fr); gap: 10px; padding: 18px 22px 22px; }
        .badge-item { text-align: center; cursor: pointer; padding: 12px 6px; border-radius: 5px; border: 1px solid rgba(28,28,28,0.08); background: #F7F3EC; transition: all 0.18s; position: relative; }
        .badge-item:hover { border-color: rgba(140,31,40,0.28); background: rgba(140,31,40,0.03); transform: translateY(-2px); box-shadow: 0 3px 12px rgba(0,0,0,0.07); }
        .badge-emoji { font-size: 26px; display: block; margin-bottom: 5px; }
        .badge-name  { font-size: 9.5px; font-weight: 600; color: rgba(60,60,60,0.75); letter-spacing: 0.04em; line-height: 1.3; }
        .badge-tip   { position: absolute; bottom: calc(100% + 7px); left: 50%; transform: translateX(-50%); background: #1C1C1C; color: #fff; font-size: 10.5px; padding: 5px 9px; border-radius: 3px; white-space: nowrap; z-index: 20; pointer-events: none; opacity: 0; transition: opacity 0.15s; }
        .badge-item:hover .badge-tip { opacity: 1; }
        .badge-tip::after { content: ''; position: absolute; top: 100%; left: 50%; transform: translateX(-50%); border: 4px solid transparent; border-top-color: #1C1C1C; }

        /* Bottom row */
        .bottom-row { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-bottom: 22px; }
        .impact-card { background: #1C1C1C; border-radius: 6px; padding: 26px; position: relative; overflow: hidden; }
        .impact-card::before { content: ''; position: absolute; top: 0; right: 0; width: 140px; height: 140px; background: radial-gradient(ellipse, rgba(140,31,40,0.3) 0%, transparent 70%); }
        .impact-lbl { font-size: 9.5px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.26); margin-bottom: 16px; }
        .impact-row { display: flex; gap: 18px; align-items: flex-start; }
        .i-val { font-family: 'Cormorant Garamond', serif; font-size: 38px; font-weight: 700; color: #fff; line-height: 1; }
        .i-val em { color: #C0404C; font-style: normal; }
        .i-sub { font-size: 10px; color: rgba(255,255,255,0.28); margin-top: 2px; letter-spacing: 0.05em; }
        .i-div { width: 1px; background: rgba(255,255,255,0.07); align-self: stretch; }
        .prog-wrap { margin-top: 18px; }
        .prog-bg   { height: 3px; background: rgba(255,255,255,0.08); border-radius: 2px; overflow: hidden; }
        .prog-fill { height: 100%; width: 70%; background: linear-gradient(90deg,#8C1F28,#A8323D); border-radius: 2px; }
        .prog-meta { display: flex; justify-content: space-between; margin-top: 5px; }
        .prog-lbl  { font-size: 10px; color: rgba(255,255,255,0.25); }
        .prog-val  { font-size: 10px; color: rgba(255,255,255,0.38); font-weight: 500; }

        .quote-card { background: #fff; border: 1px solid rgba(28,28,28,0.09); border-radius: 6px; padding: 26px; display: flex; flex-direction: column; justify-content: center; position: relative; }
        .quote-mark { font-family: 'Cormorant Garamond', serif; font-size: 76px; font-weight: 700; color: #8C1F28; opacity: 0.1; position: absolute; top: 2px; left: 18px; line-height: 1; pointer-events: none; }
        .quote-text { font-family: 'Cormorant Garamond', serif; font-size: 18px; font-style: italic; color: #1C1C1C; line-height: 1.65; position: relative; z-index: 1; }
        .quote-auth { font-size: 11px; color: rgba(107,107,107,0.6); margin-top: 12px; font-weight: 500; letter-spacing: 0.04em; }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          /* Sidebar becomes drawer — DashboardSidebar handles the toggle */
          .db-main    { margin-left: 0; }
          /* Push header content away from the hamburger */
          .db-hdr     { padding-left: 62px; }
          .db-stats   { grid-template-columns: repeat(2,1fr); }
          .db-actions { grid-template-columns: repeat(2,1fr); }
          .two-col    { grid-template-columns: 1fr; }
          .bottom-row { grid-template-columns: 1fr; }
          .badges-grid{ grid-template-columns: repeat(3,1fr); }
          .db-profile { grid-template-columns: auto 1fr; }
          .db-profile-right { display: none; }
        }
        @media (max-width: 640px) {
          .db-hdr     { padding: 0 14px 0 60px; }
          .db-search  { width: 150px; }
          .db-content { padding: 18px 14px 48px; }
          .db-stats   { gap: 10px; }
          .db-profile { padding: 18px 16px; gap: 14px; }
          .db-profile-av { width: 54px; height: 54px; font-size: 22px; }
          .db-profile-name { font-size: 20px; }
        }
        @media (max-width: 420px) {
          .db-search  { display: none; }
          .db-profile { grid-template-columns: 1fr; }
          .db-profile-av { display: none; }
        }
      `}</style>

      <div className="db-page">

        {/* ── Sidebar ── */}
        <DashboardSidebar
          activeNav={activeNav}
          onNavChange={setActiveNav}
          user={{ name: donor.name, initials: 'R', bloodGroup: donor.bloodGroup, location: donor.location }}
        />

        {/* ── Main ── */}
        <div className="db-main">

          {/* Header */}
          <header className="db-hdr">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div className="db-search-wrap">
                <span className="db-search-ico"><SearchIco /></span>
                <input className="db-search" type="text" placeholder="Search donors, campaigns…" />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button className="db-icon-btn">
                <BellIco />
                <span className="db-notif" />
              </button>
              <div className="db-avatar-hdr" title={donor.name}>R</div>
            </div>
          </header>

          {/* Content */}
          <div className="db-content">

            {/* Greeting */}
            <div style={{ marginBottom: 26 }}>
              {loading
                ? <div className="sk" style={{ height: 33, width: 270, marginBottom: 7 }} />
                : <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, fontWeight: 600, color: C.ink, lineHeight: 1.1 }}>
                    {greeting()}, {donor.name.split(' ')[0]} 👋
                  </div>
              }
              {loading
                ? <div className="sk" style={{ height: 14, width: 200 }} />
                : <div style={{ fontSize: 13.5, color: C.soft, marginTop: 4 }}>Here's your donation overview for today.</div>
              }
            </div>

            {/* Profile Card */}
            {loading
              ? <div className="sk" style={{ height: 124, marginBottom: 22 }} />
              : (
                <div className="db-profile">
                  <div className="db-profile-av">R</div>
                  <div>
                    <div className="db-profile-name">{donor.name}</div>
                    <div className="db-chips">
                      <span className="chip chip-blood">🩸 {donor.bloodGroup}</span>
                      <span className="chip chip-green">● Eligible to Donate</span>
                      <span className="chip chip-green">✔ {donor.medicalStatus}</span>
                      <span className="chip chip-gold">✦ KYC {donor.kycStatus}</span>
                    </div>
                    <div className="db-profile-details">
                      <div><div className="pdl">Age</div><div className="pdv">{donor.age} yrs</div></div>
                      <div>
                        <div className="pdl">Last Donated</div>
                        <div className="pdv">{donor.lastDonation} <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.36)' }}>({donor.lastDonationDaysAgo}d ago)</span></div>
                      </div>
                      <div><div className="pdl">Response Rate</div><div className="pdv">{donor.responseRate}</div></div>
                    </div>
                  </div>
                  <div className="db-profile-right">
                    <div><div className="prv">{donor.totalDonations}</div><div className="prl">Total Donations</div></div>
                    <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.07)' }} />
                    <div><div className="prv">42</div><div className="prl">Lives Saved</div></div>
                  </div>
                </div>
              )
            }

            {/* Stats */}
            {loading
              ? <div className="db-stats">{[...Array(4)].map((_,i) => <div key={i} className="sk" style={{ height: 108 }} />)}</div>
              : (
                <div className="db-stats">
                  {stats.map(s => (
                    <div className="stat-card" key={s.label}>
                      <span className="stat-ico">{s.icon}</span>
                      <div className="stat-val">{s.value}</div>
                      <div className="stat-lbl">{s.label}</div>
                      <div className="stat-sub">{s.sub}</div>
                    </div>
                  ))}
                </div>
              )
            }

            {/* Quick Actions */}
            <div className="sec-title"><span className="sec-title-line" />Quick Actions</div>
            {loading
              ? <div className="db-actions">{[...Array(4)].map((_,i) => <div key={i} className="sk" style={{ height: 86 }} />)}</div>
              : (
                <div className="db-actions">
                  <div className="act-btn"><span className="act-ico">📋</span><div className="act-lbl">Book Donation</div></div>
                  <div className="act-btn"><span className="act-ico">📍</span><div className="act-lbl">Find Nearby Camp</div></div>
                  <div className="act-btn emergency"><div className="emg-dot" /><span className="act-ico">🆘</span><div className="act-lbl">Emergency Request</div></div>
                  <div className="act-btn"><span className="act-ico">💳</span><div className="act-lbl">Download Donor Card</div></div>
                </div>
              )
            }

            {/* Campaigns + Requests */}
            <div className="two-col">
              {loading
                ? <div className="sk" style={{ height: 290 }} />
                : (
                  <div className="sec-card">
                    <div className="sec-hdr">
                      <div className="sec-hdr-title">Upcoming Campaigns</div>
                      <button className="view-all">View All →</button>
                    </div>
                    {campaigns.map((c,i) => (
                      <div className="camp-item" key={i}>
                        <div className="camp-top"><div className="camp-ttl">{c.title}</div><span className="camp-dist">{c.distance}</span></div>
                        <div className="camp-date">📅 {c.date} · 📍 {c.location}</div>
                        <div className="camp-groups">{c.groups.map(g => <span key={g} className="gtag">{g}</span>)}</div>
                      </div>
                    ))}
                  </div>
                )
              }
              {loading
                ? <div className="sk" style={{ height: 290 }} />
                : (
                  <div className="sec-card">
                    <div className="sec-hdr">
                      <div className="sec-hdr-title">Nearby Blood Requests</div>
                      <button className="view-all">View All →</button>
                    </div>
                    {nearbyRequests.map((r,i) => (
                      <div className="req-item" key={i}>
                        <div className="req-row">
                          <div className="req-left">
                            <div className="req-badge">{r.group}</div>
                            <div style={{ minWidth: 0 }}>
                              <div className="req-patient">{r.patient}</div>
                              <div className="req-hosp">{r.hospital} · {r.distance}</div>
                            </div>
                          </div>
                          <div className="req-right">
                            <span className="urgency-tag" style={{ background: `${r.color}18`, color: r.color, border: `1px solid ${r.color}28` }}>{r.urgency}</span>
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
                ? <div className="sk" style={{ height: 290 }} />
                : (
                  <div className="sec-card">
                    <div className="sec-hdr"><div className="sec-hdr-title">Recent Activities</div></div>
                    <div className="timeline">
                      {activities.map((a,i) => (
                        <div className="tl-item" key={i}>
                          <div className="tl-dot" style={{ background: `${a.color}14`, border: `1px solid ${a.color}28` }}><span style={{ fontSize: 14 }}>{a.icon}</span></div>
                          <div><div className="tl-act">{a.action}</div><div className="tl-date">{a.date}</div></div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              }
              {loading
                ? <div className="sk" style={{ height: 290 }} />
                : (
                  <div className="sec-card">
                    <div className="sec-hdr">
                      <div className="sec-hdr-title">Badges Earned</div>
                      <span style={{ fontSize: 11.5, color: C.soft }}>6 / 12</span>
                    </div>
                    <div className="badges-grid">
                      {badges.map((b,i) => (
                        <div className="badge-item" key={i}>
                          <div className="badge-tip">{b.desc}</div>
                          <span className="badge-emoji">{b.icon}</span>
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
                ? <><div className="sk" style={{ height: 152 }} /><div className="sk" style={{ height: 152 }} /></>
                : (
                  <>
                    <div className="impact-card">
                      <div className="impact-lbl">Your Impact Summary</div>
                      <div className="impact-row">
                        <div><div className="i-val">42<em>+</em></div><div className="i-sub">Lives Saved</div></div>
                        <div className="i-div" />
                        <div><div className="i-val">14</div><div className="i-sub">Donations</div></div>
                        <div className="i-div" />
                        <div><div className="i-val">6<em>mo</em></div><div className="i-sub">Streak</div></div>
                      </div>
                      <div className="prog-wrap">
                        <div className="prog-bg"><div className="prog-fill" /></div>
                        <div className="prog-meta">
                          <span className="prog-lbl">Progress to Gold Donor</span>
                          <span className="prog-val">14 / 20</span>
                        </div>
                      </div>
                    </div>
                    <div className="quote-card">
                      <div className="quote-mark">"</div>
                      <p className="quote-text">The blood you donate gives someone another chance at life. One day that someone may be a close relative, a friend, or even yourself.</p>
                      <div className="quote-auth">— Tip of the Day · BloodCircle</div>
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