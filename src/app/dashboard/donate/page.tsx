'use client'

import React, { useState, useEffect } from 'react'
import DashboardSidebar, { SIDEBAR_W } from '@/components/DashboardSidebar'

/* ══════════════════════════════════════════
   SVG Icon Library
══════════════════════════════════════════ */
const IcoDrop      = ({ s = 18 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2C12 2 4 10.5 4 15.5a8 8 0 0016 0C20 10.5 12 2 12 2z"/></svg>
const IcoHeart     = ({ s = 18 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
const IcoCal       = ({ s = 18 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
const IcoSearch    = ({ s = 14 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
const IcoBell      = ({ s = 18 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
const IcoPin       = ({ s = 13 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
const IcoCheck     = ({ s = 13 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20,6 9,17 4,12"/></svg>
const IcoShield    = ({ s = 13 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
const IcoChevron   = ({ s = 12 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9,18 15,12 9,6"/></svg>
const IcoChevronD  = ({ s = 12 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6,9 12,15 18,9"/></svg>
const IcoActivity  = ({ s = 13 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/></svg>
const IcoAlert     = ({ s = 18 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
const IcoFlask     = ({ s = 18 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h6M9 3v7L5 17a3 3 0 003 4h8a3 3 0 003-4l-4-7V3"/><line x1="6.8" y1="15" x2="17.2" y2="15"/></svg>
const IcoClock     = ({ s = 18 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
const IcoStar      = ({ s = 18 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>
const IcoUsers     = ({ s = 18 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
const IcoMap       = ({ s = 18 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="1,6 1,22 8,18 16,22 23,18 23,2 16,6 8,2"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>

/* ══════════════════════════════════════════
   Mock Data
══════════════════════════════════════════ */
const donor = {
  name: 'Rakibul Hasan',
  bloodGroup: 'A+',
  location: 'Konabari, Gazipur',
  lastDonation: '12 Apr 2026',
  lastDonationDaysAgo: 24,
  nextEligible: '12 Jul 2026',
  daysUntilEligible: 21,
  totalDonations: 14,
}

const donationTypes = [
  {
    id: 'whole',
    title: 'Whole Blood',
    sub: 'Most common · 1 pint collected',
    duration: '45–60 min',
    interval: 'Every 56 days',
    impact: 'Up to 3 lives',
    color: '#8C1F28',
    Icon: IcoDrop,
    recommended: true,
  },
  {
    id: 'platelets',
    title: 'Platelets',
    sub: 'For cancer & surgery patients',
    duration: '2–3 hrs',
    interval: 'Every 7 days',
    impact: 'Up to 5 patients',
    color: '#B8922A',
    Icon: IcoFlask,
    recommended: false,
  },
  {
    id: 'plasma',
    title: 'Plasma',
    sub: 'For burn & trauma victims',
    duration: '1–2 hrs',
    interval: 'Every 28 days',
    impact: 'Critical treatments',
    color: '#3A7D44',
    Icon: IcoActivity,
    recommended: false,
  },
]

const centers = [
  { name: 'Dhaka Medical College Hospital', address: 'Bakshibazar, Dhaka 1000', distance: '2.1 km', slots: 6, rating: 4.8 },
  { name: 'Shaheed Tajuddin Ahmed Med. College', address: 'Gazipur Sadar, Gazipur', distance: '0.8 km', slots: 3, rating: 4.6 },
  { name: 'BIRDEM General Hospital', address: 'Shahbag, Dhaka 1000', distance: '5.4 km', slots: 9, rating: 4.9 },
  { name: 'Green Life Medical College', address: 'Green Road, Dhaka 1205', distance: '7.2 km', slots: 2, rating: 4.5 },
]

const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM']

const eligibilityChecks = [
  { label: 'Age (18–65)',           pass: true  },
  { label: 'Weight ≥ 50 kg',        pass: true  },
  { label: 'Hemoglobin level OK',   pass: true  },
  { label: 'No recent illness',     pass: true  },
  { label: 'No recent tattoo/piercing', pass: true },
  { label: 'Blood pressure normal', pass: true  },
]

const recentDonations = [
  { type: 'Whole Blood',  date: '12 Apr 2026', center: 'Dhaka Medical College',    units: '1 pint', status: 'Completed' },
  { type: 'Platelets',    date: '05 Feb 2026', center: 'BIRDEM General Hospital',  units: '2 units', status: 'Completed' },
  { type: 'Whole Blood',  date: '18 Nov 2025', center: 'Shaheed Tajuddin Hospital',units: '1 pint', status: 'Completed' },
  { type: 'Whole Blood',  date: '07 Sep 2025', center: 'Green Life Medical',       units: '1 pint', status: 'Completed' },
]

const tips = [
  { icon: IcoAlert,  color: '#8C1F28', title: 'Hydrate well',        desc: 'Drink at least 2–3 extra glasses of water before donating.' },
  { icon: IcoHeart,  color: '#3A7D44', title: 'Eat a light meal',    desc: 'Avoid fatty foods 4 hours before. A light meal is ideal.' },
  { icon: IcoClock,  color: '#B8922A', title: 'Rest afterward',      desc: 'Take 10–15 minutes to sit and recover post-donation.' },
  { icon: IcoShield, color: '#4A6FA5', title: 'Avoid alcohol',       desc: 'No alcohol 24 hours before and after donation.' },
]

/* ══════════════════════════════════════════
   Page
══════════════════════════════════════════ */
export default function DonatePage() {
  const [loading, setLoading]         = useState(true)
  const [activeNav, setActiveNav]     = useState('Donate')
  const [selectedType, setSelectedType] = useState('whole')
  const [selectedCenter, setSelectedCenter] = useState<number | null>(null)
  const [selectedSlot, setSelectedSlot]     = useState<string | null>(null)
  const [selectedDate, setSelectedDate]     = useState('')
  const [step, setStep]               = useState(1)  // 1=type, 2=center+slot, 3=confirm
  const [booked, setBooked]           = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900)
    return () => clearTimeout(t)
  }, [])

  const greeting = () => {
    const h = new Date().getHours()
    return h < 12 ? 'Good Morning' : h < 17 ? 'Good Afternoon' : 'Good Evening'
  }

  const selectedTypeData = donationTypes.find(d => d.id === selectedType)!
  const selectedCenterData = selectedCenter !== null ? centers[selectedCenter] : null

  const handleBook = () => {
    if (!selectedCenterData || !selectedSlot || !selectedDate) return
    setBooked(true)
    setStep(3)
  }

  const canProceedStep1 = !!selectedType
  const canProceedStep2 = selectedCenter !== null && !!selectedSlot && !!selectedDate

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

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

        /* ── Eligibility banner ── */
        .elig-banner {
          background: #1C1C1C;
          border-radius: 8px;
          padding: 20px 24px;
          margin-bottom: 20px;
          display: flex; align-items: center; justify-content: space-between; gap: 20px;
          flex-wrap: wrap;
          position: relative; overflow: hidden;
          animation: fade-up 0.5s 0.15s ease both;
        }
        .elig-banner::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 90% 50%, rgba(140,31,40,0.22) 0%, transparent 65%);
          pointer-events: none;
        }
        .elig-banner::after {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(140,31,40,0.6), transparent);
        }
        .elig-left { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
        .elig-icon-wrap {
          width: 48px; height: 48px; border-radius: 50%;
          background: rgba(140,31,40,0.18);
          border: 1px solid rgba(140,31,40,0.3);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; color: #C0404C;
        }
        .elig-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 21px; font-weight: 600; color: #fff; line-height: 1.15;
        }
        .elig-sub { font-size: 12px; color: rgba(255,255,255,0.35); margin-top: 3px; }
        .elig-chips { display: flex; gap: 10px; flex-wrap: wrap; }
        .elig-chip {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 5px 12px; border-radius: 4px;
          font-size: 11px; font-weight: 500;
        }
        .elig-chip-green { background: rgba(58,157,74,0.15); color: #5CB86B; border: 1px solid rgba(58,157,74,0.28); }
        .elig-chip-gold  { background: rgba(184,146,42,0.13); color: #D4A83A; border: 1px solid rgba(184,146,42,0.26); }
        .elig-cta {
          padding: 10px 22px;
          background: #8C1F28; color: #fff;
          border: none; border-radius: 5px;
          font-size: 13px; font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer; white-space: nowrap;
          transition: background 0.15s, transform 0.15s, box-shadow 0.15s;
          flex-shrink: 0;
        }
        .elig-cta:hover { background: #7A1B24; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(140,31,40,0.3); }

        /* ── Section title ── */
        .sec-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 19px; font-weight: 600; color: #1C1C1C;
          margin-bottom: 12px;
          display: flex; align-items: center; gap: 10px;
          animation: fade-up 0.5s ease both;
        }
        .sec-title-line { display: block; width: 18px; height: 1px; background: #8C1F28; }

        /* ── Steps indicator ── */
        .steps-wrap {
          display: flex; align-items: center; gap: 0;
          margin-bottom: 22px;
          animation: fade-up 0.5s 0.2s ease both;
        }
        .step-item {
          display: flex; align-items: center; gap: 8px;
          flex-shrink: 0;
        }
        .step-circle {
          width: 28px; height: 28px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 600;
          transition: all 0.25s;
        }
        .step-circle.done    { background: #3A9D4A; color: #fff; }
        .step-circle.active  { background: #8C1F28; color: #fff; box-shadow: 0 0 0 3px rgba(140,31,40,0.18); }
        .step-circle.pending { background: rgba(28,28,28,0.08); color: rgba(60,60,60,0.4); }
        .step-lbl {
          font-size: 11.5px; font-weight: 500; color: rgba(60,60,60,0.5);
          white-space: nowrap;
        }
        .step-lbl.active  { color: #1C1C1C; font-weight: 600; }
        .step-lbl.done    { color: #3A9D4A; }
        .step-line {
          flex: 1; height: 1px;
          background: rgba(28,28,28,0.12);
          margin: 0 10px; min-width: 20px;
        }
        .step-line.done { background: #3A9D4A; }
        @media (max-width: 480px) { .step-lbl { display: none; } .steps-wrap { gap: 0; } }

        /* ── Two-column layout ── */
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

        /* ── Donation type cards ── */
        .dtype-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 12px; padding: 18px 20px;
        }
        @media (max-width: 700px) { .dtype-grid { grid-template-columns: 1fr; } }

        .dtype-card {
          border: 1.5px solid rgba(28,28,28,0.1);
          border-radius: 7px;
          padding: 16px 15px 14px;
          cursor: pointer;
          position: relative; overflow: hidden;
          transition: border-color 0.18s, box-shadow 0.18s, transform 0.18s;
          background: #F9F6F1;
        }
        .dtype-card.selected {
          border-color: #8C1F28;
          background: #fff;
          box-shadow: 0 4px 18px rgba(140,31,40,0.1), 0 0 0 3px rgba(140,31,40,0.06);
          transform: translateY(-2px);
        }
        .dtype-card:hover:not(.selected) {
          border-color: rgba(140,31,40,0.3);
          box-shadow: 0 4px 14px rgba(0,0,0,0.07);
          transform: translateY(-1px);
          background: #fff;
        }
        .dtype-badge {
          position: absolute; top: 10px; right: 10px;
          font-size: 8.5px; font-weight: 700;
          padding: 2px 7px; border-radius: 2px;
          letter-spacing: 0.08em; text-transform: uppercase;
          background: rgba(140,31,40,0.09); color: #8C1F28;
          border: 1px solid rgba(140,31,40,0.18);
        }
        .dtype-ico {
          width: 40px; height: 40px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 12px;
        }
        .dtype-title { font-size: 14px; font-weight: 600; color: #1C1C1C; margin-bottom: 3px; }
        .dtype-sub   { font-size: 10.5px; color: rgba(60,60,60,0.5); margin-bottom: 12px; }
        .dtype-meta  { display: flex; flex-direction: column; gap: 5px; }
        .dtype-row   { display: flex; align-items: center; gap: 6px; font-size: 10.5px; color: rgba(60,60,60,0.6); }
        .dtype-row span { font-weight: 500; color: #1C1C1C; }
        .dtype-sel-dot {
          position: absolute; bottom: 10px; right: 10px;
          width: 16px; height: 16px; border-radius: 50%;
          background: #8C1F28;
          display: flex; align-items: center; justify-content: center;
          color: #fff;
          opacity: 0; transform: scale(0.5);
          transition: opacity 0.18s, transform 0.18s;
        }
        .dtype-card.selected .dtype-sel-dot { opacity: 1; transform: scale(1); }

        /* ── Center list ── */
        .center-item {
          padding: 13px 20px;
          border-bottom: 1px solid rgba(28,28,28,0.055);
          cursor: pointer;
          transition: background 0.15s;
          display: flex; align-items: center; gap: 13px;
        }
        .center-item:last-child { border-bottom: none; }
        .center-item:hover { background: rgba(140,31,40,0.023); }
        .center-item.selected { background: rgba(140,31,40,0.04); }
        .center-radio {
          width: 18px; height: 18px; border-radius: 50%;
          border: 2px solid rgba(28,28,28,0.2);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: border-color 0.15s;
        }
        .center-item.selected .center-radio { border-color: #8C1F28; }
        .center-radio-inner {
          width: 8px; height: 8px; border-radius: 50%;
          background: #8C1F28;
          transform: scale(0);
          transition: transform 0.18s;
        }
        .center-item.selected .center-radio-inner { transform: scale(1); }
        .center-info { flex: 1; min-width: 0; }
        .center-name { font-size: 13px; font-weight: 500; color: #1C1C1C; }
        .center-addr { font-size: 11px; color: rgba(60,60,60,0.48); margin-top: 2px; display: flex; align-items: center; gap: 3px; }
        .center-right { text-align: right; flex-shrink: 0; }
        .center-dist { font-size: 11px; font-weight: 600; color: #8C1F28; background: rgba(140,31,40,0.07); padding: 2px 8px; border-radius: 3px; }
        .center-slots { font-size: 10px; color: rgba(60,60,60,0.4); margin-top: 4px; }
        .center-rating { font-size: 10px; color: #B8922A; display: flex; align-items: center; gap: 2px; margin-top: 2px; justify-content: flex-end; }

        /* ── Slot picker ── */
        .slot-grid {
          display: flex; flex-wrap: wrap; gap: 8px;
          padding: 16px 20px 20px;
        }
        .slot-btn {
          padding: 7px 14px;
          border-radius: 5px;
          border: 1.5px solid rgba(28,28,28,0.12);
          background: #F9F6F1;
          font-size: 12.5px; font-weight: 500; color: rgba(60,60,60,0.7);
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: all 0.16s;
        }
        .slot-btn:hover:not(.selected) { border-color: rgba(140,31,40,0.3); color: #1C1C1C; background: #fff; }
        .slot-btn.selected { background: #8C1F28; border-color: #8C1F28; color: #fff; }

        /* ── Date input ── */
        .date-wrap { padding: 0 20px 20px; }
        .date-lbl { font-size: 11px; font-weight: 600; color: rgba(60,60,60,0.5); letter-spacing: 0.07em; text-transform: uppercase; margin-bottom: 7px; }
        .date-input {
          height: 40px; width: 100%; padding: 0 14px;
          border: 1.5px solid rgba(28,28,28,0.12);
          border-radius: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; color: #1C1C1C;
          background: #F9F6F1; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .date-input:focus {
          border-color: rgba(140,31,40,0.3);
          background: #fff;
          box-shadow: 0 0 0 3px rgba(140,31,40,0.07);
        }

        /* ── Eligibility checklist ── */
        .elig-list { padding: 14px 20px 18px; }
        .elig-row {
          display: flex; align-items: center; gap: 10px;
          padding: 8px 0;
          border-bottom: 1px solid rgba(28,28,28,0.05);
        }
        .elig-row:last-child { border-bottom: none; }
        .elig-ico {
          width: 22px; height: 22px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .elig-ico.pass { background: rgba(58,157,74,0.12); color: #3A9D4A; }
        .elig-ico.fail { background: rgba(140,31,40,0.1); color: #8C1F28; }
        .elig-lbl { font-size: 12.5px; color: #1C1C1C; }
        .elig-lbl.fail { color: rgba(60,60,60,0.45); }

        /* ── Tips grid ── */
        .tips-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 10px; padding: 16px 20px 20px;
        }
        @media (max-width: 640px) { .tips-grid { grid-template-columns: 1fr; } }

        .tip-item {
          background: #F9F6F1;
          border: 1px solid rgba(28,28,28,0.07);
          border-radius: 6px;
          padding: 13px 14px;
          display: flex; gap: 11px;
        }
        .tip-ico {
          width: 32px; height: 32px; border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .tip-title { font-size: 12px; font-weight: 600; color: #1C1C1C; margin-bottom: 3px; }
        .tip-desc  { font-size: 10.5px; color: rgba(60,60,60,0.5); line-height: 1.55; }

        /* ── Donation history ── */
        .hist-item {
          padding: 12px 20px;
          border-bottom: 1px solid rgba(28,28,28,0.055);
          display: flex; align-items: center; gap: 12px;
        }
        .hist-item:last-child { border-bottom: none; }
        .hist-ico-wrap {
          width: 36px; height: 36px; border-radius: 50%;
          background: rgba(140,31,40,0.08);
          border: 1px solid rgba(140,31,40,0.14);
          display: flex; align-items: center; justify-content: center;
          color: #8C1F28; flex-shrink: 0;
        }
        .hist-type  { font-size: 12.5px; font-weight: 500; color: #1C1C1C; }
        .hist-meta  { font-size: 10.5px; color: rgba(60,60,60,0.45); margin-top: 2px; }
        .hist-right { margin-left: auto; text-align: right; flex-shrink: 0; }
        .hist-units { font-size: 11px; font-weight: 600; color: #1C1C1C; }
        .hist-status {
          font-size: 9.5px; font-weight: 600;
          padding: 2px 7px; border-radius: 2px;
          background: rgba(58,157,74,0.1); color: #3A9D4A;
          border: 1px solid rgba(58,157,74,0.22);
          letter-spacing: 0.06em;
          margin-top: 3px; display: inline-block;
        }

        /* ── Action buttons ── */
        .action-row {
          display: flex; align-items: center; gap: 10px;
          margin-top: 20px;
          animation: fade-up 0.5s 0.3s ease both;
          flex-wrap: wrap;
        }
        .btn-primary {
          padding: 11px 26px;
          background: #8C1F28; color: #fff;
          border: none; border-radius: 5px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px; font-weight: 500;
          cursor: pointer;
          transition: background 0.15s, transform 0.15s, box-shadow 0.15s;
          display: flex; align-items: center; gap: 7px;
        }
        .btn-primary:hover { background: #7A1B24; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(140,31,40,0.28); }
        .btn-primary:disabled { opacity: 0.4; cursor: not-allowed; transform: none; box-shadow: none; }
        .btn-ghost {
          padding: 10px 20px;
          background: transparent; color: rgba(60,60,60,0.6);
          border: 1.5px solid rgba(28,28,28,0.14);
          border-radius: 5px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 500;
          cursor: pointer;
          transition: all 0.15s;
        }
        .btn-ghost:hover { border-color: rgba(140,31,40,0.3); color: #8C1F28; background: rgba(140,31,40,0.03); }

        /* ── Confirmation card ── */
        .confirm-card {
          background: #1C1C1C;
          border-radius: 8px;
          padding: 32px 28px;
          margin-bottom: 20px;
          text-align: center;
          position: relative; overflow: hidden;
          animation: fade-up 0.55s 0.1s ease both;
        }
        .confirm-card::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(140,31,40,0.3) 0%, transparent 65%);
          pointer-events: none;
        }
        .confirm-card::after {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(140,31,40,0.6), transparent);
        }
        .confirm-check {
          width: 64px; height: 64px; border-radius: 50%;
          background: rgba(58,157,74,0.15);
          border: 1px solid rgba(58,157,74,0.3);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 18px;
          color: #3A9D4A;
          position: relative; z-index: 1;
        }
        @keyframes check-pop {
          0%   { transform: scale(0.5); opacity: 0; }
          70%  { transform: scale(1.08); }
          100% { transform: scale(1); opacity: 1; }
        }
        .confirm-check { animation: check-pop 0.5s 0.2s ease both; }
        .confirm-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 26px; font-weight: 600; color: #fff;
          margin-bottom: 6px; position: relative; z-index: 1;
        }
        .confirm-sub { font-size: 13px; color: rgba(255,255,255,0.35); margin-bottom: 24px; position: relative; z-index: 1; }
        .confirm-details {
          display: inline-grid; grid-template-columns: 1fr 1fr;
          gap: 1px; background: rgba(255,255,255,0.06);
          border-radius: 6px; overflow: hidden;
          border: 1px solid rgba(255,255,255,0.07);
          text-align: left; position: relative; z-index: 1;
          width: 100%; max-width: 480px;
        }
        .conf-cell {
          padding: 12px 16px;
          background: rgba(255,255,255,0.03);
        }
        .conf-lbl { font-size: 9.5px; color: rgba(255,255,255,0.22); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 4px; }
        .conf-val { font-size: 13px; font-weight: 500; color: #fff; }
        @media (max-width: 480px) { .confirm-details { grid-template-columns: 1fr; } }

        /* ── Next steps ── */
        .next-steps {
          display: flex; gap: 10px; flex-wrap: wrap;
          justify-content: center; margin-top: 20px;
          position: relative; z-index: 1;
        }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .elig-banner { flex-direction: column; align-items: flex-start; }
          .action-row  { flex-direction: column; align-items: stretch; }
          .action-row .btn-primary,
          .action-row .btn-ghost { width: 100%; justify-content: center; }
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
          <div className="db-content">

            {/* Greeting */}
            {loading
              ? (
                <div className="db-greeting">
                  <div className="sk" style={{ height: 34, width: 280, marginBottom: 8 }} />
                  <div className="sk" style={{ height: 14, width: 210 }} />
                </div>
              ) : (
                <div className="db-greeting">
                  <div className="db-greeting-title">Schedule a Donation</div>
                  <div className="db-greeting-sub">
                    {greeting()}, {donor.name.split(' ')[0]} — book your next donation in a few steps
                  </div>
                </div>
              )
            }

            {/* Eligibility Banner */}
            {loading
              ? <div className="sk" style={{ height: 88, marginBottom: 20 }} />
              : (
                <div className="elig-banner">
                  <div className="elig-left">
                    <div className="elig-icon-wrap"><IcoDrop s={20} /></div>
                    <div>
                      <div className="elig-title">You are eligible to donate today</div>
                      <div className="elig-sub">Last donated {donor.lastDonation} · {donor.lastDonationDaysAgo} days ago</div>
                    </div>
                    <div className="elig-chips">
                      <span className="elig-chip elig-chip-green"><IcoCheck s={10} /> A+ Compatible</span>
                      <span className="elig-chip elig-chip-gold"><IcoClock s={10} /> {donor.totalDonations} lifetime donations</span>
                    </div>
                  </div>
                  <button className="elig-cta" onClick={() => { if (!booked) setStep(1); }}>
                    Book Now
                  </button>
                </div>
              )
            }

            {/* Booking Wizard */}
            {!loading && !booked && (
              <>
                {/* Steps indicator */}
                <div className="steps-wrap">
                  <div className="step-item">
                    <div className={`step-circle ${step > 1 ? 'done' : step === 1 ? 'active' : 'pending'}`}>
                      {step > 1 ? <IcoCheck s={11} /> : '1'}
                    </div>
                    <span className={`step-lbl ${step === 1 ? 'active' : step > 1 ? 'done' : ''}`}>Type</span>
                  </div>
                  <div className={`step-line ${step > 1 ? 'done' : ''}`} />
                  <div className="step-item">
                    <div className={`step-circle ${step > 2 ? 'done' : step === 2 ? 'active' : 'pending'}`}>
                      {step > 2 ? <IcoCheck s={11} /> : '2'}
                    </div>
                    <span className={`step-lbl ${step === 2 ? 'active' : step > 2 ? 'done' : ''}`}>Centre & Slot</span>
                  </div>
                  <div className={`step-line ${step > 2 ? 'done' : ''}`} />
                  <div className="step-item">
                    <div className={`step-circle ${step === 3 ? 'active' : 'pending'}`}>3</div>
                    <span className={`step-lbl ${step === 3 ? 'active' : ''}`}>Confirm</span>
                  </div>
                </div>

                {/* Step 1 — Donation Type */}
                {step === 1 && (
                  <div className="sec-card" style={{ marginBottom: 20, animationDelay: '0.22s' }}>
                    <div className="sec-hdr">
                      <div className="sec-hdr-title">
                        <span className="sec-hdr-ico"><IcoFlask s={15} /></span>
                        Select Donation Type
                      </div>
                    </div>
                    <div className="dtype-grid">
                      {donationTypes.map((d) => (
                        <div
                          key={d.id}
                          className={`dtype-card${selectedType === d.id ? ' selected' : ''}`}
                          onClick={() => setSelectedType(d.id)}
                        >
                          {d.recommended && <div className="dtype-badge">Recommended</div>}
                          <div className="dtype-ico" style={{ background: `${d.color}12` }}>
                            <span style={{ color: d.color }}><d.Icon s={19} /></span>
                          </div>
                          <div className="dtype-title">{d.title}</div>
                          <div className="dtype-sub">{d.sub}</div>
                          <div className="dtype-meta">
                            <div className="dtype-row"><IcoClock s={11} /> Duration: <span>{d.duration}</span></div>
                            <div className="dtype-row"><IcoCal s={11} /> Interval: <span>{d.interval}</span></div>
                            <div className="dtype-row"><IcoHeart s={11} /> Impact: <span>{d.impact}</span></div>
                          </div>
                          <div className="dtype-sel-dot"><IcoCheck s={9} /></div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2 — Centre + Slot */}
                {step === 2 && (
                  <div className="two-col">
                    <div className="sec-card" style={{ animationDelay: '0.22s' }}>
                      <div className="sec-hdr">
                        <div className="sec-hdr-title">
                          <span className="sec-hdr-ico"><IcoMap s={15} /></span>
                          Choose Donation Centre
                        </div>
                        <span style={{ fontSize: 11, color: 'rgba(60,60,60,0.4)', fontWeight: 500 }}>Near you</span>
                      </div>
                      {centers.map((c, i) => (
                        <div
                          key={i}
                          className={`center-item${selectedCenter === i ? ' selected' : ''}`}
                          onClick={() => setSelectedCenter(i)}
                        >
                          <div className="center-radio">
                            <div className="center-radio-inner" />
                          </div>
                          <div className="center-info">
                            <div className="center-name">{c.name}</div>
                            <div className="center-addr"><IcoPin s={10} />{c.address}</div>
                          </div>
                          <div className="center-right">
                            <div className="center-dist">{c.distance}</div>
                            <div className="center-slots">{c.slots} slots left</div>
                            <div className="center-rating">
                              <IcoStar s={10} style={{ fill: '#B8922A', stroke: 'none' }} />
                              {c.rating}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                      <div className="sec-card" style={{ animationDelay: '0.28s' }}>
                        <div className="sec-hdr">
                          <div className="sec-hdr-title">
                            <span className="sec-hdr-ico"><IcoCal s={15} /></span>
                            Pick a Date
                          </div>
                        </div>
                        <div className="date-wrap" style={{ paddingTop: 16 }}>
                          <div className="date-lbl">Preferred Date</div>
                          <input
                            className="date-input"
                            type="date"
                            value={selectedDate}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={e => setSelectedDate(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="sec-card" style={{ animationDelay: '0.33s' }}>
                        <div className="sec-hdr">
                          <div className="sec-hdr-title">
                            <span className="sec-hdr-ico"><IcoClock s={15} /></span>
                            Select Time Slot
                          </div>
                        </div>
                        <div className="slot-grid">
                          {timeSlots.map(slot => (
                            <button
                              key={slot}
                              className={`slot-btn${selectedSlot === slot ? ' selected' : ''}`}
                              onClick={() => setSelectedSlot(slot)}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action row */}
                <div className="action-row">
                  {step > 1 && (
                    <button className="btn-ghost" onClick={() => setStep(s => s - 1)}>
                      ← Back
                    </button>
                  )}
                  {step === 1 && (
                    <button
                      className="btn-primary"
                      disabled={!canProceedStep1}
                      onClick={() => setStep(2)}
                    >
                      Continue <IcoChevron s={13} />
                    </button>
                  )}
                  {step === 2 && (
                    <button
                      className="btn-primary"
                      disabled={!canProceedStep2}
                      onClick={handleBook}
                    >
                      Confirm Booking <IcoCheck s={13} />
                    </button>
                  )}
                </div>
              </>
            )}

            {/* Confirmation */}
            {!loading && booked && (
              <div className="confirm-card">
                <div className="confirm-check">
                  <IcoCheck s={28} />
                </div>
                <div className="confirm-title">Appointment Confirmed</div>
                <div className="confirm-sub">
                  You'll receive an SMS reminder 24 hours before your visit.
                </div>
                <div className="confirm-details">
                  <div className="conf-cell">
                    <div className="conf-lbl">Donation Type</div>
                    <div className="conf-val">{selectedTypeData.title}</div>
                  </div>
                  <div className="conf-cell">
                    <div className="conf-lbl">Date</div>
                    <div className="conf-val">{selectedDate}</div>
                  </div>
                  <div className="conf-cell">
                    <div className="conf-lbl">Time</div>
                    <div className="conf-val">{selectedSlot}</div>
                  </div>
                  <div className="conf-cell">
                    <div className="conf-lbl">Centre</div>
                    <div className="conf-val" style={{ fontSize: 11.5 }}>{selectedCenterData?.name}</div>
                  </div>
                </div>
                <div className="next-steps">
                  <button
                    className="btn-ghost"
                    style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}
                    onClick={() => { setBooked(false); setStep(1); setSelectedSlot(null); setSelectedCenter(null); setSelectedDate(''); }}
                  >
                    Book Another
                  </button>
                  <button
                    className="btn-primary"
                    onClick={() => {}}
                  >
                    Download Pass
                  </button>
                </div>
              </div>
            )}

            {/* Lower sections — always visible */}
            {!loading && (
              <div className="two-col" style={{ marginTop: 24 }}>

                {/* Eligibility Checklist */}
                <div className="sec-card" style={{ animationDelay: '0.35s' }}>
                  <div className="sec-hdr">
                    <div className="sec-hdr-title">
                      <span className="sec-hdr-ico"><IcoShield s={14} /></span>
                      Eligibility Checklist
                    </div>
                    <span style={{ fontSize: 11, color: '#3A9D4A', fontWeight: 600 }}>All Clear</span>
                  </div>
                  <div className="elig-list">
                    {eligibilityChecks.map((e, i) => (
                      <div className="elig-row" key={i}>
                        <div className={`elig-ico ${e.pass ? 'pass' : 'fail'}`}>
                          {e.pass ? <IcoCheck s={11} /> : <IcoAlert s={11} />}
                        </div>
                        <div className={`elig-lbl${e.pass ? '' : ' fail'}`}>{e.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pre-Donation Tips */}
                <div className="sec-card" style={{ animationDelay: '0.4s' }}>
                  <div className="sec-hdr">
                    <div className="sec-hdr-title">
                      <span className="sec-hdr-ico"><IcoAlert s={14} /></span>
                      Before You Donate
                    </div>
                  </div>
                  <div className="tips-grid">
                    {tips.map((t, i) => (
                      <div className="tip-item" key={i}>
                        <div className="tip-ico" style={{ background: `${t.color}10` }}>
                          <span style={{ color: t.color }}><t.icon s={16} /></span>
                        </div>
                        <div>
                          <div className="tip-title">{t.title}</div>
                          <div className="tip-desc">{t.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Donation History */}
            {!loading && (
              <div className="sec-card" style={{ animationDelay: '0.45s', marginBottom: 20 }}>
                <div className="sec-hdr">
                  <div className="sec-hdr-title">
                    <span className="sec-hdr-ico"><IcoCal s={14} /></span>
                    Donation History
                  </div>
                  <button style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 11, color: '#8C1F28', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', opacity: 0.8 }}>
                    View All <IcoChevron s={11} />
                  </button>
                </div>
                {recentDonations.map((d, i) => (
                  <div className="hist-item" key={i}>
                    <div className="hist-ico-wrap"><IcoDrop s={15} /></div>
                    <div>
                      <div className="hist-type">{d.type}</div>
                      <div className="hist-meta">{d.date} · {d.center}</div>
                    </div>
                    <div className="hist-right">
                      <div className="hist-units">{d.units}</div>
                      <div className="hist-status">{d.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>{/* /db-content */}
        </div>{/* /db-main */}
      </div>
    </>
  )
}