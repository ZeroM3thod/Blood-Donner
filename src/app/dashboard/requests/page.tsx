'use client'

import React, { useState, useEffect, useRef } from 'react'
import DashboardSidebar, { SIDEBAR_W } from '@/components/DashboardSidebar'

/* ══════════════════════════════════════════
   SVG Icon Library
══════════════════════════════════════════ */
const IcoDrop     = ({ s = 18 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2C12 2 4 10.5 4 15.5a8 8 0 0016 0C20 10.5 12 2 12 2z"/></svg>
const IcoSearch   = ({ s = 14 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
const IcoBell     = ({ s = 18 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
const IcoPlus     = ({ s = 16 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
const IcoPin      = ({ s = 13 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
const IcoCal      = ({ s = 13 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
const IcoPhone    = ({ s = 13 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
const IcoHospital = ({ s = 13 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
const IcoUser     = ({ s = 13 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
const IcoChevronD = ({ s = 14 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6,9 12,15 18,9"/></svg>
const IcoChevronR = ({ s = 12 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9,18 15,12 9,6"/></svg>
const IcoCheck    = ({ s = 13 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20,6 9,17 4,12"/></svg>
const IcoX        = ({ s = 13 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
const IcoClock    = ({ s = 13 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
const IcoFilter   = ({ s = 14 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"/></svg>
const IcoActivity = ({ s = 13 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/></svg>
const IcoAlert    = ({ s = 13 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
const IcoShare    = ({ s = 13 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
const IcoEdit     = ({ s = 13 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
const IcoTrash    = ({ s = 13 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="3,6 5,6 21,6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
const IcoClose    = ({ s = 18 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
const IcoBag      = ({ s = 13 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
const IcoHeartPulse = ({ s = 22 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
const IcoMinus      = ({ s = 16 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
const IcoShield     = ({ s = 13 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
const IcoStar       = ({ s = 13 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>
const IcoConfetti   = ({ s = 38 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5.8 11.3L2 22l10.7-3.79"/><path d="M4 3h.01M22 8h.01M15 2h.01M22 20h.01M22 2l-2.24 6.28A4 4 0 0016 11H8a4 4 0 00-3.76 2.72L2 22"/><path d="M10 9l3 3-3 3"/></svg>

/* ══════════════════════════════════════════
   Types
══════════════════════════════════════════ */
type UrgencyLevel = 'Critical' | 'Urgent' | 'Moderate'
type StatusType   = 'Active' | 'Fulfilled' | 'Cancelled' | 'Pending'
type TabType      = 'my' | 'incoming'

interface BloodRequest {
  id: string
  patient: string
  age: number
  bloodGroup: string
  hospital: string
  location: string
  distance?: string
  urgency: UrgencyLevel
  status: StatusType
  unitsNeeded: number
  unitsFulfilled: number
  postedDate: string
  requiredBy: string
  postedBy: string
  contactPhone: string
  notes: string
  reason: string
  respondents: { name: string; initials: string; confirmedAt?: string; status: 'confirmed' | 'pending' }[]
  timeline: { event: string; time: string; color: string }[]
}

/* ══════════════════════════════════════════
   Mock Data
══════════════════════════════════════════ */
const myRequests: BloodRequest[] = [
  {
    id: 'REQ-2026-0041',
    patient: 'Farida Begum',
    age: 52,
    bloodGroup: 'A+',
    hospital: 'Dhaka Medical College Hospital',
    location: 'Bakshi Bazar, Dhaka',
    urgency: 'Critical',
    status: 'Active',
    unitsNeeded: 4,
    unitsFulfilled: 2,
    postedDate: '14 May 2026',
    requiredBy: '16 May 2026',
    postedBy: 'Rakibul Hasan',
    contactPhone: '+880 1712-345678',
    notes: 'Patient is undergoing emergency cardiac surgery. Requires fresh whole blood. Please arrive before 6 PM.',
    reason: 'Cardiac Surgery',
    respondents: [
      { name: 'Tariq Aziz', initials: 'TA', confirmedAt: '14 May, 11:30 AM', status: 'confirmed' },
      { name: 'Sumaiya Khanam', initials: 'SK', confirmedAt: '14 May, 2:15 PM', status: 'confirmed' },
      { name: 'Rafiqul Islam', initials: 'RI', status: 'pending' },
    ],
    timeline: [
      { event: 'Request created', time: '14 May, 9:00 AM', color: '#3A7D44' },
      { event: 'Tariq Aziz confirmed', time: '14 May, 11:30 AM', color: '#3A7D44' },
      { event: 'Sumaiya Khanam confirmed', time: '14 May, 2:15 PM', color: '#3A7D44' },
      { event: 'Rafiqul Islam responded', time: '15 May, 8:40 AM', color: '#B8922A' },
    ],
  },
  {
    id: 'REQ-2026-0038',
    patient: 'Arif Hossain',
    age: 34,
    bloodGroup: 'O+',
    hospital: 'BIRDEM General Hospital',
    location: 'Shahbag, Dhaka',
    urgency: 'Urgent',
    status: 'Fulfilled',
    unitsNeeded: 2,
    unitsFulfilled: 2,
    postedDate: '8 May 2026',
    requiredBy: '10 May 2026',
    postedBy: 'Rakibul Hasan',
    contactPhone: '+880 1898-765432',
    notes: 'Patient has thalassemia and requires regular transfusions. Blood must be cross-matched before transfusion.',
    reason: 'Thalassemia Transfusion',
    respondents: [
      { name: 'Nusrat Jahan', initials: 'NJ', confirmedAt: '8 May, 4:00 PM', status: 'confirmed' },
      { name: 'Mahbub Alam', initials: 'MA', confirmedAt: '9 May, 10:15 AM', status: 'confirmed' },
    ],
    timeline: [
      { event: 'Request created', time: '8 May, 3:30 PM', color: '#3A7D44' },
      { event: 'Nusrat Jahan confirmed', time: '8 May, 4:00 PM', color: '#3A7D44' },
      { event: 'Mahbub Alam confirmed', time: '9 May, 10:15 AM', color: '#3A7D44' },
      { event: 'Request fulfilled', time: '9 May, 1:00 PM', color: '#3A7D44' },
    ],
  },
  {
    id: 'REQ-2026-0029',
    patient: 'Masum Billah',
    age: 19,
    bloodGroup: 'B-',
    hospital: 'Green Life Medical College',
    location: 'Green Road, Dhaka',
    urgency: 'Moderate',
    status: 'Cancelled',
    unitsNeeded: 1,
    unitsFulfilled: 0,
    postedDate: '1 Apr 2026',
    requiredBy: '5 Apr 2026',
    postedBy: 'Rakibul Hasan',
    contactPhone: '+880 1611-223344',
    notes: 'Planned surgery was rescheduled.',
    reason: 'Elective Surgery',
    respondents: [],
    timeline: [
      { event: 'Request created', time: '1 Apr, 10:00 AM', color: '#3A7D44' },
      { event: 'Request cancelled by poster', time: '2 Apr, 9:00 AM', color: '#8C1F28' },
    ],
  },
  {
    id: 'REQ-2026-0022',
    patient: 'Shirin Akter',
    age: 41,
    bloodGroup: 'AB+',
    hospital: 'United Hospital Ltd.',
    location: 'Gulshan-2, Dhaka',
    urgency: 'Urgent',
    status: 'Fulfilled',
    unitsNeeded: 3,
    unitsFulfilled: 3,
    postedDate: '15 Mar 2026',
    requiredBy: '18 Mar 2026',
    postedBy: 'Rakibul Hasan',
    contactPhone: '+880 1733-556677',
    notes: 'Post-delivery hemorrhage. Stable now. Thank you to all donors.',
    reason: 'Post-partum Hemorrhage',
    respondents: [
      { name: 'Iqbal Karim', initials: 'IK', confirmedAt: '15 Mar, 6:00 PM', status: 'confirmed' },
      { name: 'Nasrin Sultana', initials: 'NS', confirmedAt: '16 Mar, 9:00 AM', status: 'confirmed' },
      { name: 'Kabir Uddin', initials: 'KU', confirmedAt: '16 Mar, 3:30 PM', status: 'confirmed' },
    ],
    timeline: [
      { event: 'Request created', time: '15 Mar, 5:45 PM', color: '#3A7D44' },
      { event: 'Iqbal Karim confirmed', time: '15 Mar, 6:00 PM', color: '#3A7D44' },
      { event: 'Nasrin Sultana confirmed', time: '16 Mar, 9:00 AM', color: '#3A7D44' },
      { event: 'Kabir Uddin confirmed', time: '16 Mar, 3:30 PM', color: '#3A7D44' },
      { event: 'Request fulfilled', time: '17 Mar, 11:00 AM', color: '#3A7D44' },
    ],
  },
]

const incomingRequests: BloodRequest[] = [
  {
    id: 'REQ-2026-0043',
    patient: 'Nusrat Jahan',
    age: 27,
    bloodGroup: 'A+',
    hospital: 'Shaheed Tajuddin Ahmad Medical College',
    location: 'Konabari, Gazipur',
    distance: '1.2 km',
    urgency: 'Critical',
    status: 'Active',
    unitsNeeded: 3,
    unitsFulfilled: 1,
    postedDate: '15 May 2026',
    requiredBy: '16 May 2026',
    postedBy: 'Karim Molla',
    contactPhone: '+880 1788-112233',
    notes: 'Patient is in ICU following a road accident. A+ blood required urgently. Please bring ID.',
    reason: 'Road Accident / Trauma',
    respondents: [
      { name: 'Abir Rahman', initials: 'AR', confirmedAt: '15 May, 10:00 AM', status: 'confirmed' },
      { name: 'You', initials: 'R', status: 'pending' },
    ],
    timeline: [
      { event: 'Request posted by Karim Molla', time: '15 May, 9:00 AM', color: '#3A7D44' },
      { event: 'Abir Rahman confirmed', time: '15 May, 10:00 AM', color: '#3A7D44' },
      { event: 'You responded', time: '15 May, 10:45 AM', color: '#B8922A' },
    ],
  },
  {
    id: 'REQ-2026-0040',
    patient: 'Habibur Rahman',
    age: 63,
    bloodGroup: 'A+',
    hospital: 'Gazipur Sadar Hospital',
    location: 'Joydebpur, Gazipur',
    distance: '3.5 km',
    urgency: 'Urgent',
    status: 'Active',
    unitsNeeded: 2,
    unitsFulfilled: 0,
    postedDate: '14 May 2026',
    requiredBy: '17 May 2026',
    postedBy: 'Shamim Ahmed',
    contactPhone: '+880 1622-998877',
    notes: 'Kidney disease patient, weekly dialysis support. Matched and tested blood only.',
    reason: 'Chronic Kidney Disease / Dialysis',
    respondents: [],
    timeline: [
      { event: 'Request posted by Shamim Ahmed', time: '14 May, 2:00 PM', color: '#3A7D44' },
    ],
  },
  {
    id: 'REQ-2026-0036',
    patient: 'Rehana Parvin',
    age: 38,
    bloodGroup: 'A+',
    hospital: 'Dhaka Medical College Hospital',
    location: 'Bakshi Bazar, Dhaka',
    distance: '18.3 km',
    urgency: 'Moderate',
    status: 'Active',
    unitsNeeded: 1,
    unitsFulfilled: 0,
    postedDate: '12 May 2026',
    requiredBy: '20 May 2026',
    postedBy: 'Rifat Hossain',
    contactPhone: '+880 1555-667788',
    notes: 'Scheduled bone marrow procedure. No urgency but needs confirmed donation by 19 May.',
    reason: 'Bone Marrow Procedure',
    respondents: [
      { name: 'Sadia Islam', initials: 'SI', status: 'pending' },
    ],
    timeline: [
      { event: 'Request posted by Rifat Hossain', time: '12 May, 11:00 AM', color: '#3A7D44' },
      { event: 'Sadia Islam responded', time: '13 May, 4:30 PM', color: '#B8922A' },
    ],
  },
]

/* ══════════════════════════════════════════
   Constants
══════════════════════════════════════════ */
const urgencyConfig: Record<UrgencyLevel, { color: string; bg: string; border: string }> = {
  Critical: { color: '#8C1F28', bg: 'rgba(140,31,40,0.09)', border: 'rgba(140,31,40,0.22)' },
  Urgent:   { color: '#B8922A', bg: 'rgba(184,146,42,0.09)', border: 'rgba(184,146,42,0.22)' },
  Moderate: { color: '#3A7D44', bg: 'rgba(58,125,68,0.09)',  border: 'rgba(58,125,68,0.22)' },
}
const statusConfig: Record<StatusType, { color: string; bg: string; border: string; dot: string }> = {
  Active:    { color: '#3A7D44', bg: 'rgba(58,125,68,0.09)',  border: 'rgba(58,125,68,0.2)',   dot: '#3A9D4A' },
  Fulfilled: { color: '#2A6DB5', bg: 'rgba(42,109,181,0.09)', border: 'rgba(42,109,181,0.2)', dot: '#3A7DC8' },
  Cancelled: { color: '#6B6B6B', bg: 'rgba(107,107,107,0.09)',border: 'rgba(107,107,107,0.2)',dot: '#999'    },
  Pending:   { color: '#B8922A', bg: 'rgba(184,146,42,0.09)', border: 'rgba(184,146,42,0.2)', dot: '#D4A83A' },
}
const donor = { name: 'Rakibul Hasan', bloodGroup: 'A+', location: 'Konabari, Gazipur' }

const FILTERS: StatusType[] = ['Active', 'Fulfilled', 'Cancelled']
const BLOOD_GROUPS = ['All', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

/* ══════════════════════════════════════════
   Sub-components
══════════════════════════════════════════ */
function UrgencyDot({ level }: { level: UrgencyLevel }) {
  const cfg = urgencyConfig[level]
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      fontSize: 10, fontWeight: 700,
      padding: '3px 8px', borderRadius: 3,
      background: cfg.bg, color: cfg.color,
      border: `1px solid ${cfg.border}`,
      letterSpacing: '0.06em', textTransform: 'uppercase',
    }}>
      {level === 'Critical' && (
        <span style={{ width: 5, height: 5, borderRadius: '50%', background: cfg.color, display: 'inline-block', animation: 'rq-pulse 1.4s ease infinite' }} />
      )}
      {level}
    </span>
  )
}

function StatusPill({ status }: { status: StatusType }) {
  const cfg = statusConfig[status]
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      fontSize: 10, fontWeight: 600,
      padding: '3px 8px', borderRadius: 3,
      background: cfg.bg, color: cfg.color,
      border: `1px solid ${cfg.border}`,
      letterSpacing: '0.05em', textTransform: 'uppercase',
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: cfg.dot, display: 'inline-block' }} />
      {status}
    </span>
  )
}

function ProgressBar({ filled, total, color }: { filled: number; total: number; color: string }) {
  const pct = total === 0 ? 0 : Math.min((filled / total) * 100, 100)
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
        <span style={{ fontSize: 10, color: 'rgba(60,60,60,0.5)', fontWeight: 500 }}>Donors secured</span>
        <span style={{ fontSize: 10, fontWeight: 700, color }}>{filled} / {total} units</span>
      </div>
      <div style={{ height: 4, borderRadius: 3, background: 'rgba(28,28,28,0.07)', overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${pct}%`,
          background: `linear-gradient(90deg, ${color}, ${color}bb)`,
          borderRadius: 3,
          transition: 'width 0.8s cubic-bezier(.4,0,.2,1)',
        }} />
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   Respond Modal
══════════════════════════════════════════ */
const DONATION_TYPES = [
  { id: 'whole',     label: 'Whole Blood',  desc: 'Most common · ~1 hr',        icon: '🩸' },
  { id: 'platelets', label: 'Platelets',    desc: 'High demand · ~2.5 hrs',     icon: '🔬' },
  { id: 'plasma',    label: 'Plasma',       desc: 'Universal · ~1.5 hrs',       icon: '💉' },
]

function RespondModal({ req, onClose }: { req: BloodRequest; onClose: () => void }) {
  const urgCfg      = urgencyConfig[req.urgency]
  const [step, setStep]         = useState<'form' | 'confirm' | 'done'>('form')
  const [units, setUnits]       = useState(1)
  const [donationType, setDonationType] = useState('whole')
  const [availableDate, setAvailableDate] = useState('')
  const [availableTime, setAvailableTime] = useState('10:00')
  const [note, setNote]         = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)
  const maxUnits = Math.max(1, req.unitsNeeded - req.unitsFulfilled)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const selectedType = DONATION_TYPES.find(d => d.id === donationType)!

  return (
    <>
      {/* Sits on top of the drawer overlay — higher z-index */}
      <div className="rsp-overlay" onClick={step !== 'done' ? onClose : undefined} />
      <div className="rsp-modal">

        {/* ── Done state ── */}
        {step === 'done' ? (
          <div className="rsp-done">
            <div className="rsp-done-ring">
              <div className="rsp-done-ico"><IcoConfetti s={34} /></div>
            </div>
            <div className="rsp-done-title">Response Submitted!</div>
            <div className="rsp-done-sub">
              You've pledged <strong>{units} unit{units > 1 ? 's' : ''}</strong> of <strong>{selectedType.label}</strong> for {req.patient}.
              The requester will be notified shortly.
            </div>
            <div className="rsp-done-card">
              <div className="rsp-done-row">
                <span>Patient</span><span>{req.patient}</span>
              </div>
              <div className="rsp-done-row">
                <span>Hospital</span><span>{req.hospital.split(' ').slice(0,3).join(' ')}</span>
              </div>
              <div className="rsp-done-row">
                <span>Blood Group</span>
                <span style={{ color: '#8C1F28', fontWeight: 700 }}>{req.bloodGroup}</span>
              </div>
              <div className="rsp-done-row">
                <span>Units Pledged</span>
                <span style={{ color: '#8C1F28', fontWeight: 700 }}>{units}</span>
              </div>
              <div className="rsp-done-row">
                <span>Type</span><span>{selectedType.label}</span>
              </div>
              <div className="rsp-done-row">
                <span>Availability</span>
                <span>{availableDate ? `${availableDate} at ${availableTime}` : 'Not specified'}</span>
              </div>
            </div>
            <button className="rsp-btn-primary" style={{ width: '100%', marginTop: 6 }} onClick={onClose}>
              <IcoCheck s={14} /> Done
            </button>
          </div>
        ) : step === 'confirm' ? (
          /* ── Confirm state ── */
          <>
            <div className="rsp-hdr">
              <div>
                <div className="rsp-hdr-pre">Confirm Your Response</div>
                <div className="rsp-hdr-title">Review & Submit</div>
              </div>
              <button className="rq-drawer-close" onClick={onClose}><IcoClose s={16} /></button>
            </div>
            <div className="rsp-body">

              {/* Summary banner */}
              <div className="rsp-confirm-banner" style={{ borderColor: `${urgCfg.color}28`, background: `${urgCfg.color}06` }}>
                <div className="rsp-group-badge" style={{ background: `linear-gradient(135deg,${urgCfg.color},${urgCfg.color}cc)` }}>
                  {req.bloodGroup}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#1C1C1C' }}>{req.patient}</div>
                  <div style={{ fontSize: 11.5, color: 'rgba(60,60,60,0.5)', marginTop: 2 }}>{req.hospital}</div>
                  <div style={{ marginTop: 6 }}><UrgencyDot level={req.urgency} /></div>
                </div>
              </div>

              {/* Detail summary */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1, border: '1px solid rgba(28,28,28,0.08)', borderRadius: 8, overflow: 'hidden', marginBottom: 16 }}>
                {[
                  { label: 'Donation Type',   value: `${selectedType.icon} ${selectedType.label}` },
                  { label: 'Units Pledged',   value: `${units} unit${units > 1 ? 's' : ''}` },
                  { label: 'Your Blood Group',value: donor.bloodGroup },
                  { label: 'Available From',  value: availableDate ? `${availableDate} at ${availableTime}` : 'Not specified' },
                  { label: 'Note',            value: note || '—' },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '10px 14px', background: '#fff', borderBottom: '1px solid rgba(28,28,28,0.05)' }}>
                    <span style={{ fontSize: 11, color: 'rgba(60,60,60,0.45)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>{label}</span>
                    <span style={{ fontSize: 12.5, fontWeight: 500, color: '#1C1C1C', textAlign: 'right' }}>{value}</span>
                  </div>
                ))}
              </div>

              {/* Eligibility note */}
              <div style={{ display: 'flex', gap: 9, padding: '11px 13px', background: 'rgba(58,125,68,0.06)', border: '1px solid rgba(58,125,68,0.18)', borderRadius: 7, marginBottom: 16 }}>
                <span style={{ color: '#3A7D44', flexShrink: 0, marginTop: 1 }}><IcoShield s={14} /></span>
                <span style={{ fontSize: 11.5, color: '#2D5E34', lineHeight: 1.6 }}>
                  Based on your last donation on <strong>12 Apr 2026</strong>, you are eligible to donate. Please ensure you are well-rested and hydrated before donating.
                </span>
              </div>

              {/* Terms */}
              <label className="rsp-terms-row" onClick={() => setAgreeTerms(a => !a)}>
                <div className={`rsp-checkbox${agreeTerms ? ' checked' : ''}`}>
                  {agreeTerms && <IcoCheck s={9} />}
                </div>
                <span style={{ fontSize: 11.5, color: 'rgba(60,60,60,0.6)', lineHeight: 1.5 }}>
                  I confirm that I am medically eligible, have not consumed alcohol in the last 24 hours, and will appear at the hospital on the specified date.
                </span>
              </label>
            </div>

            <div className="rsp-footer">
              <button className="rq-btn-outline" onClick={() => setStep('form')}>Edit</button>
              <button
                className="rsp-btn-primary"
                style={{ flex: 1, opacity: agreeTerms ? 1 : 0.45, cursor: agreeTerms ? 'pointer' : 'not-allowed' }}
                disabled={!agreeTerms}
                onClick={() => setStep('done')}
              >
                <IcoHeartPulse s={15} /> Confirm Response
              </button>
            </div>
          </>
        ) : (
          /* ── Form state ── */
          <>
            <div className="rsp-hdr">
              <div>
                <div className="rsp-hdr-pre">{req.id} · {req.bloodGroup} needed</div>
                <div className="rsp-hdr-title">Respond to Request</div>
              </div>
              <button className="rq-drawer-close" onClick={onClose}><IcoClose s={16} /></button>
            </div>

            <div className="rsp-body">

              {/* Request mini-card */}
              <div className="rsp-req-card">
                <div className="rsp-req-dot" style={{ background: `linear-gradient(135deg,${urgCfg.color},${urgCfg.color}cc)` }}>
                  {req.bloodGroup}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 13, color: '#1C1C1C' }}>{req.patient}</div>
                  <div style={{ fontSize: 11, color: 'rgba(60,60,60,0.5)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{req.hospital}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <UrgencyDot level={req.urgency} />
                  <div style={{ fontSize: 10, color: 'rgba(60,60,60,0.4)', marginTop: 5 }}>
                    {req.unitsNeeded - req.unitsFulfilled} unit{req.unitsNeeded - req.unitsFulfilled !== 1 ? 's' : ''} still needed
                  </div>
                </div>
              </div>

              {/* ── Units selector ── */}
              <div className="rsp-section">
                <div className="rsp-section-title">
                  <IcoDrop s={12} /> How many units can you donate?
                </div>
                <div className="rsp-units-row">
                  <button
                    className="rsp-unit-btn"
                    onClick={() => setUnits(u => Math.max(1, u - 1))}
                    disabled={units <= 1}
                  ><IcoMinus s={16} /></button>

                  <div className="rsp-units-display">
                    <div className="rsp-units-val">{units}</div>
                    <div className="rsp-units-lbl">unit{units > 1 ? 's' : ''}</div>
                  </div>

                  <button
                    className="rsp-unit-btn"
                    onClick={() => setUnits(u => Math.min(maxUnits, u + 1))}
                    disabled={units >= maxUnits}
                  ><IcoPlus s={16} /></button>
                </div>

                {/* Visual unit bubbles */}
                <div className="rsp-unit-bubbles">
                  {Array.from({ length: maxUnits }, (_, i) => (
                    <button
                      key={i}
                      className={`rsp-bubble${i < units ? ' filled' : ''}`}
                      onClick={() => setUnits(i + 1)}
                      title={`${i + 1} unit${i > 0 ? 's' : ''}`}
                    >
                      <IcoDrop s={13} />
                    </button>
                  ))}
                </div>
                <div style={{ fontSize: 10.5, color: 'rgba(60,60,60,0.4)', marginTop: 6, textAlign: 'center' }}>
                  Up to {maxUnits} unit{maxUnits > 1 ? 's' : ''} available for this request
                </div>
              </div>

              {/* ── Donation type ── */}
              <div className="rsp-section">
                <div className="rsp-section-title">
                  <IcoBag s={12} /> Donation type
                </div>
                <div className="rsp-type-grid">
                  {DONATION_TYPES.map(t => (
                    <button
                      key={t.id}
                      className={`rsp-type-card${donationType === t.id ? ' selected' : ''}`}
                      onClick={() => setDonationType(t.id)}
                    >
                      <div className="rsp-type-emoji">{t.icon}</div>
                      <div className="rsp-type-label">{t.label}</div>
                      <div className="rsp-type-desc">{t.desc}</div>
                      {donationType === t.id && (
                        <div className="rsp-type-check"><IcoCheck s={8} /></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Availability ── */}
              <div className="rsp-section">
                <div className="rsp-section-title">
                  <IcoCal s={12} /> Your availability
                </div>
                <div className="rsp-avail-row">
                  <div className="rq-field" style={{ flex: 2 }}>
                    <label className="rq-label">Date</label>
                    <input
                      className="rq-input"
                      type="date"
                      value={availableDate}
                      onChange={e => setAvailableDate(e.target.value)}
                    />
                  </div>
                  <div className="rq-field" style={{ flex: 1 }}>
                    <label className="rq-label">Time</label>
                    <input
                      className="rq-input"
                      type="time"
                      value={availableTime}
                      onChange={e => setAvailableTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* ── Note ── */}
              <div className="rsp-section" style={{ marginBottom: 4 }}>
                <div className="rsp-section-title">
                  <IcoEdit s={12} /> Message to requester <span style={{ fontWeight: 400, color: 'rgba(60,60,60,0.35)' }}>(optional)</span>
                </div>
                <textarea
                  className="rq-input rq-textarea"
                  placeholder="e.g. I'll be there by morning, please keep me posted on any updates…"
                  rows={3}
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  style={{ resize: 'none', width: '100%' }}
                />
              </div>

              {/* Donor eligibility strip */}
              <div className="rsp-eligibility">
                <div className="rsp-elig-item rsp-elig-ok">
                  <IcoCheck s={11} /> Blood group <strong>{donor.bloodGroup}</strong> matches
                </div>
                <div className="rsp-elig-item rsp-elig-ok">
                  <IcoCheck s={11} /> Last donated 34 days ago
                </div>
                <div className="rsp-elig-item rsp-elig-ok">
                  <IcoShield s={11} /> KYC verified
                </div>
              </div>
            </div>

            <div className="rsp-footer">
              <button className="rq-btn-outline" onClick={onClose}>Cancel</button>
              <button className="rsp-btn-primary" style={{ flex: 1 }} onClick={() => setStep('confirm')}>
                Review Response <IcoChevronR s={12} />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

/* ══════════════════════════════════════════
   Detail Drawer
══════════════════════════════════════════ */
function DetailDrawer({ req, onClose, isIncoming }: { req: BloodRequest; onClose: () => void; isIncoming: boolean }) {
  const urgCfg = urgencyConfig[req.urgency]
  const stsCfg = statusConfig[req.status]
  const [showRespond, setShowRespond] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <>
      <div className="rq-overlay" onClick={onClose} />
      <div className="rq-drawer">
        {/* Drawer Header */}
        <div className="rq-drawer-hdr">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 11, fontWeight: 600, letterSpacing: '0.18em',
                textTransform: 'uppercase', color: 'rgba(140,31,40,0.6)',
              }}>{req.id}</span>
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, color: '#1C1C1C', lineHeight: 1.1 }}>
              {req.patient}
            </div>
            <div style={{ display: 'flex', gap: 6, marginTop: 7, flexWrap: 'wrap' }}>
              <UrgencyDot level={req.urgency} />
              <StatusPill status={req.status} />
            </div>
          </div>
          <button className="rq-drawer-close" onClick={onClose}><IcoClose s={18} /></button>
        </div>

        {/* Scrollable body */}
        <div className="rq-drawer-body">

          {/* Blood group hero */}
          <div className="rq-blood-hero" style={{ borderColor: `${urgCfg.color}28`, background: `${urgCfg.color}06` }}>
            <div className="rq-blood-group" style={{ background: `linear-gradient(135deg, ${urgCfg.color}, ${urgCfg.color}cc)` }}>
              {req.bloodGroup}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: 'rgba(60,60,60,0.45)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Required Blood Type</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 700, color: '#1C1C1C', lineHeight: 1 }}>{req.bloodGroup}</div>
              <div style={{ fontSize: 11.5, color: 'rgba(60,60,60,0.55)', marginTop: 4 }}>
                {req.unitsNeeded - req.unitsFulfilled > 0
                  ? `${req.unitsNeeded - req.unitsFulfilled} unit${req.unitsNeeded - req.unitsFulfilled > 1 ? 's' : ''} still needed`
                  : 'All units fulfilled ✓'
                }
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 700, color: urgCfg.color, lineHeight: 1 }}>{req.unitsFulfilled}<span style={{ fontSize: 16, color: 'rgba(60,60,60,0.35)' }}>/{req.unitsNeeded}</span></div>
              <div style={{ fontSize: 9.5, color: 'rgba(60,60,60,0.4)', marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Units</div>
            </div>
          </div>

          {/* Progress */}
          <div style={{ marginBottom: 20 }}>
            <ProgressBar filled={req.unitsFulfilled} total={req.unitsNeeded} color={urgCfg.color} />
          </div>

          {/* Details grid */}
          <div className="rq-detail-grid">
            {[
              { icon: <IcoUser s={12} />, label: 'Patient', value: `${req.patient}, ${req.age} yrs` },
              { icon: <IcoBag s={12} />, label: 'Reason', value: req.reason },
              { icon: <IcoHospital s={12} />, label: 'Hospital', value: req.hospital },
              { icon: <IcoPin s={12} />, label: 'Location', value: req.location + (req.distance ? ` · ${req.distance}` : '') },
              { icon: <IcoCal s={12} />, label: 'Posted', value: req.postedDate },
              { icon: <IcoClock s={12} />, label: 'Required By', value: req.requiredBy },
              { icon: <IcoUser s={12} />, label: 'Posted By', value: req.postedBy },
              { icon: <IcoPhone s={12} />, label: 'Contact', value: req.contactPhone },
            ].map(({ icon, label, value }) => (
              <div key={label} className="rq-detail-row">
                <div className="rq-detail-ico">{icon}</div>
                <div>
                  <div className="rq-detail-lbl">{label}</div>
                  <div className="rq-detail-val">{value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Notes */}
          {req.notes && (
            <div className="rq-notes-box">
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(140,31,40,0.6)', marginBottom: 7 }}>Additional Notes</div>
              <p style={{ fontSize: 12.5, lineHeight: 1.7, color: '#3C3C3C' }}>{req.notes}</p>
            </div>
          )}

          {/* Respondents */}
          {req.respondents.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div className="rq-section-lbl">Respondents ({req.respondents.length})</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {req.respondents.map((r, i) => (
                  <div key={i} className="rq-respondent">
                    <div className="rq-respondent-av" style={{
                      background: r.name === 'You'
                        ? 'linear-gradient(135deg, #8C1F28, #A8323D)'
                        : 'linear-gradient(135deg, #3A5A7D, #4A7AAD)',
                    }}>{r.initials}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12.5, fontWeight: 500, color: '#1C1C1C' }}>{r.name}</div>
                      {r.confirmedAt && <div style={{ fontSize: 10.5, color: 'rgba(60,60,60,0.45)' }}>Confirmed {r.confirmedAt}</div>}
                      {!r.confirmedAt && <div style={{ fontSize: 10.5, color: '#B8922A' }}>Awaiting confirmation</div>}
                    </div>
                    <div style={{
                      width: 22, height: 22, borderRadius: '50%',
                      background: r.status === 'confirmed' ? 'rgba(58,125,68,0.1)' : 'rgba(184,146,42,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {r.status === 'confirmed'
                        ? <span style={{ color: '#3A7D44' }}><IcoCheck s={11} /></span>
                        : <span style={{ color: '#B8922A' }}><IcoClock s={11} /></span>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timeline */}
          <div style={{ marginBottom: 12 }}>
            <div className="rq-section-lbl">Timeline</div>
            <div className="rq-timeline">
              {req.timeline.map((t, i) => (
                <div key={i} className="rq-tl-item">
                  <div className="rq-tl-dot" style={{ background: `${t.color}18`, border: `1px solid ${t.color}30` }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: t.color, display: 'block' }} />
                  </div>
                  {i < req.timeline.length - 1 && <div className="rq-tl-line" />}
                  <div>
                    <div style={{ fontSize: 12.5, fontWeight: 500, color: '#1C1C1C' }}>{t.event}</div>
                    <div style={{ fontSize: 10.5, color: 'rgba(60,60,60,0.45)', marginTop: 1 }}>{t.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="rq-drawer-footer">
          {isIncoming && req.status === 'Active' && (
            <button className="rq-btn-primary" style={{ flex: 1 }} onClick={() => setShowRespond(true)}>
              <IcoHeartPulse s={15} /> Respond to Request
            </button>
          )}
          {!isIncoming && req.status === 'Active' && (
            <>
              <button className="rq-btn-outline" style={{ flex: 1 }}>
                <IcoShare s={13} /> Share
              </button>
              <button className="rq-btn-outline" style={{ flex: 1 }}>
                <IcoEdit s={13} /> Edit
              </button>
              <button className="rq-btn-danger">
                <IcoTrash s={13} />
              </button>
            </>
          )}
          {req.status === 'Fulfilled' && (
            <div style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              fontSize: 12.5, fontWeight: 500, color: '#3A7D44',
              background: 'rgba(58,125,68,0.07)', borderRadius: 6,
              padding: '10px 16px', border: '1px solid rgba(58,125,68,0.18)',
            }}>
              <IcoCheck s={14} /> Request successfully fulfilled
            </div>
          )}
          {req.status === 'Cancelled' && (
            <div style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              fontSize: 12.5, fontWeight: 500, color: '#6B6B6B',
              background: 'rgba(107,107,107,0.07)', borderRadius: 6,
              padding: '10px 16px', border: '1px solid rgba(107,107,107,0.18)',
            }}>
              <IcoX s={14} /> This request was cancelled
            </div>
          )}
        </div>
      </div>

      {/* Respond Modal — layered above the drawer */}
      {showRespond && (
        <RespondModal req={req} onClose={() => setShowRespond(false)} />
      )}
    </>
  )
}

/* ══════════════════════════════════════════
   Request Card
══════════════════════════════════════════ */
function RequestCard({ req, onClick, isIncoming, index }: {
  req: BloodRequest; onClick: () => void; isIncoming: boolean; index: number
}) {
  const urgCfg = urgencyConfig[req.urgency]
  const pct    = req.unitsNeeded === 0 ? 0 : Math.round((req.unitsFulfilled / req.unitsNeeded) * 100)

  return (
    <div
      className="rq-card"
      onClick={onClick}
      style={{ animationDelay: `${index * 55}ms` }}
    >
      {/* Top row */}
      <div className="rq-card-top">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
          <div className="rq-card-group" style={{
            background: `linear-gradient(135deg, ${urgCfg.color}, ${urgCfg.color}cc)`,
          }}>{req.bloodGroup}</div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div className="rq-card-name">{req.patient}</div>
            <div className="rq-card-reason">{req.reason}</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5, flexShrink: 0 }}>
          <UrgencyDot level={req.urgency} />
          <StatusPill status={req.status} />
        </div>
      </div>

      {/* Meta */}
      <div className="rq-card-meta">
        <span className="rq-meta-item"><IcoHospital s={11} />{req.hospital}</span>
        <span className="rq-meta-item"><IcoPin s={11} />{isIncoming ? req.distance : req.location.split(',')[0]}</span>
        <span className="rq-meta-item"><IcoClock s={11} />By {req.requiredBy}</span>
      </div>

      {/* Progress */}
      <div className="rq-card-prog">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
          <span style={{ fontSize: 10, color: 'rgba(60,60,60,0.5)' }}>
            {req.respondents.length} respondent{req.respondents.length !== 1 ? 's' : ''}
          </span>
          <span style={{ fontSize: 10, fontWeight: 700, color: urgCfg.color }}>{req.unitsFulfilled}/{req.unitsNeeded} units</span>
        </div>
        <div style={{ height: 3, borderRadius: 2, background: 'rgba(28,28,28,0.07)', overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: `${pct}%`,
            background: `linear-gradient(90deg, ${urgCfg.color}, ${urgCfg.color}bb)`,
            borderRadius: 2, transition: 'width 0.8s',
          }} />
        </div>
      </div>

      {/* Footer */}
      <div className="rq-card-foot">
        <span style={{ fontSize: 9.5, color: 'rgba(60,60,60,0.38)', fontFamily: "'DM Mono', monospace", letterSpacing: '0.06em' }}>{req.id}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 10.5, color: '#8C1F28', fontWeight: 500 }}>
          View Details <IcoChevronR s={10} />
        </span>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   New Request Modal
══════════════════════════════════════════ */
function NewRequestModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    patient: '', age: '', bloodGroup: 'A+', unitsNeeded: '1',
    hospital: '', location: '', requiredBy: '', urgency: 'Urgent' as UrgencyLevel,
    contactPhone: '', reason: '', notes: '',
  })
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <>
      <div className="rq-overlay" onClick={onClose} />
      <div className="rq-modal">
        <div className="rq-modal-hdr">
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 21, fontWeight: 700, color: '#1C1C1C' }}>
              New Blood Request
            </div>
            <div style={{ fontSize: 11.5, color: 'rgba(60,60,60,0.45)', marginTop: 3 }}>
              Step {step} of 2 — {step === 1 ? 'Patient & Blood Details' : 'Hospital & Contact'}
            </div>
          </div>
          <button className="rq-drawer-close" onClick={onClose}><IcoClose s={16} /></button>
        </div>

        {/* Step indicator */}
        <div style={{ padding: '0 24px', display: 'flex', gap: 6, marginBottom: 22 }}>
          {[1, 2].map(s => (
            <div key={s} style={{
              flex: 1, height: 3, borderRadius: 2,
              background: s <= step ? '#8C1F28' : 'rgba(28,28,28,0.1)',
              transition: 'background 0.3s',
            }} />
          ))}
        </div>

        <div className="rq-modal-body">
          {step === 1 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="rq-field-row">
                <div className="rq-field">
                  <label className="rq-label">Patient Name</label>
                  <input className="rq-input" placeholder="Full name" value={form.patient} onChange={e => set('patient', e.target.value)} />
                </div>
                <div className="rq-field" style={{ flex: '0 0 90px' }}>
                  <label className="rq-label">Age</label>
                  <input className="rq-input" type="number" placeholder="Age" value={form.age} onChange={e => set('age', e.target.value)} />
                </div>
              </div>
              <div className="rq-field-row">
                <div className="rq-field">
                  <label className="rq-label">Blood Group</label>
                  <select className="rq-input" value={form.bloodGroup} onChange={e => set('bloodGroup', e.target.value)}>
                    {BLOOD_GROUPS.filter(g => g !== 'All').map(g => <option key={g}>{g}</option>)}
                  </select>
                </div>
                <div className="rq-field">
                  <label className="rq-label">Units Needed</label>
                  <select className="rq-input" value={form.unitsNeeded} onChange={e => set('unitsNeeded', e.target.value)}>
                    {[1,2,3,4,5,6].map(n => <option key={n}>{n}</option>)}
                  </select>
                </div>
                <div className="rq-field">
                  <label className="rq-label">Urgency Level</label>
                  <select className="rq-input" value={form.urgency} onChange={e => set('urgency', e.target.value as UrgencyLevel)}>
                    <option>Critical</option>
                    <option>Urgent</option>
                    <option>Moderate</option>
                  </select>
                </div>
              </div>
              <div className="rq-field">
                <label className="rq-label">Medical Reason</label>
                <input className="rq-input" placeholder="e.g. Surgery, Accident, Thalassemia…" value={form.reason} onChange={e => set('reason', e.target.value)} />
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="rq-field">
                <label className="rq-label">Hospital Name</label>
                <input className="rq-input" placeholder="Full hospital name" value={form.hospital} onChange={e => set('hospital', e.target.value)} />
              </div>
              <div className="rq-field-row">
                <div className="rq-field">
                  <label className="rq-label">Location / Area</label>
                  <input className="rq-input" placeholder="Area, City" value={form.location} onChange={e => set('location', e.target.value)} />
                </div>
                <div className="rq-field">
                  <label className="rq-label">Required By</label>
                  <input className="rq-input" type="date" value={form.requiredBy} onChange={e => set('requiredBy', e.target.value)} />
                </div>
              </div>
              <div className="rq-field">
                <label className="rq-label">Contact Phone</label>
                <input className="rq-input" placeholder="+880 1XXX-XXXXXX" value={form.contactPhone} onChange={e => set('contactPhone', e.target.value)} />
              </div>
              <div className="rq-field">
                <label className="rq-label">Additional Notes <span style={{ color: 'rgba(60,60,60,0.35)' }}>(optional)</span></label>
                <textarea className="rq-input rq-textarea" placeholder="Any special requirements, instructions, or context…" value={form.notes} onChange={e => set('notes', e.target.value)} rows={3} />
              </div>
            </div>
          )}
        </div>

        <div className="rq-modal-footer">
          {step === 2 && (
            <button className="rq-btn-outline" onClick={() => setStep(1)}>Back</button>
          )}
          {step === 1 && (
            <button className="rq-btn-outline" onClick={onClose}>Cancel</button>
          )}
          {step === 1
            ? <button className="rq-btn-primary" style={{ flex: 1 }} onClick={() => setStep(2)}>Continue <IcoChevronR s={12} /></button>
            : <button className="rq-btn-primary" style={{ flex: 1 }} onClick={onClose}><IcoCheck s={14} /> Post Request</button>
          }
        </div>
      </div>
    </>
  )
}

/* ══════════════════════════════════════════
   Page
══════════════════════════════════════════ */
export default function RequestsPage() {
  const [activeNav, setActiveNav] = useState('My Requests')
  const [tab, setTab]             = useState<TabType>('my')
  const [loading, setLoading]     = useState(true)
  const [selectedReq, setSelectedReq] = useState<BloodRequest | null>(null)
  const [showNewModal, setShowNewModal] = useState(false)
  const [filter, setFilter]       = useState<StatusType | 'All'>('All')
  const [bgFilter, setBgFilter]   = useState('All')
  const [search, setSearch]       = useState('')

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(t)
  }, [])

  const source = tab === 'my' ? myRequests : incomingRequests

  const filtered = source.filter(r => {
    const matchStatus = filter === 'All' || r.status === filter
    const matchBg     = bgFilter === 'All' || r.bloodGroup === bgFilter
    const matchSearch = search === '' || [r.patient, r.hospital, r.bloodGroup, r.reason, r.id]
      .some(f => f.toLowerCase().includes(search.toLowerCase()))
    return matchStatus && matchBg && matchSearch
  })

  const stats = {
    total:     myRequests.length,
    active:    myRequests.filter(r => r.status === 'Active').length,
    fulfilled: myRequests.filter(r => r.status === 'Fulfilled').length,
    incoming:  incomingRequests.length,
  }

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes rq-pulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.5; transform: scale(1.3); }
        }
        @keyframes rq-fade-up {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes rq-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .rq-page   { min-height: 100vh; background: #F2EEE7; font-family: 'DM Sans', sans-serif; }
        .rq-main   { margin-left: ${SIDEBAR_W}px; display: flex; flex-direction: column; min-height: 100vh; transition: margin-left 0.32s ease; }
        @media (max-width: 1024px) { .rq-main { margin-left: 0; } }

        /* Header */
        .rq-hdr {
          position: sticky; top: 0; z-index: 100;
          background: rgba(242,238,231,0.92);
          backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(28,28,28,0.08);
          padding: 0 28px; height: 62px;
          display: flex; align-items: center; justify-content: space-between;
        }
        @media (max-width: 1024px) { .rq-hdr { padding-left: 62px; } }
        @media (max-width: 640px)  { .rq-hdr { padding-left: 58px; padding-right: 14px; } }

        .rq-search-wrap { position: relative; display: flex; align-items: center; }
        .rq-search-ico  { position: absolute; left: 11px; color: rgba(60,60,60,0.35); pointer-events: none; }
        .rq-search {
          height: 36px; padding: 0 14px 0 34px;
          background: rgba(28,28,28,0.055);
          border: 1px solid transparent; border-radius: 6px;
          font-family: 'DM Sans', sans-serif; font-size: 13px; color: #1C1C1C;
          width: 220px; outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .rq-search::placeholder { color: rgba(60,60,60,0.3); }
        .rq-search:focus { border-color: rgba(140,31,40,0.2); background: #fff; box-shadow: 0 0 0 3px rgba(140,31,40,0.07); }
        @media (max-width: 640px) { .rq-search { width: 150px; } }

        .rq-hdr-right   { display: flex; align-items: center; gap: 8px; }
        .rq-icon-btn {
          width: 36px; height: 36px; border-radius: 6px;
          background: rgba(28,28,28,0.055); border: 1px solid transparent;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: rgba(40,40,40,0.5);
          transition: all 0.18s; position: relative;
        }
        .rq-icon-btn:hover { background: rgba(140,31,40,0.1); color: #8C1F28; border-color: rgba(140,31,40,0.15); }
        .rq-notif-dot {
          position: absolute; top: 8px; right: 8px;
          width: 6px; height: 6px; background: #8C1F28; border-radius: 50%;
          border: 1.5px solid #F2EEE7;
          animation: rq-pulse 2.5s ease infinite;
        }
        .rq-avatar-hdr {
          width: 36px; height: 36px;
          background: linear-gradient(135deg, #8C1F28, #A8323D);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px; font-weight: 700; color: #fff;
          cursor: pointer; box-shadow: 0 2px 8px rgba(140,31,40,0.3);
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .rq-avatar-hdr:hover { box-shadow: 0 4px 14px rgba(140,31,40,0.4); transform: scale(1.05); }

        /* Content */
        .rq-content { flex: 1; padding: 28px 28px 64px; }
        @media (max-width: 640px) { .rq-content { padding: 20px 14px 56px; } }

        /* Page title */
        .rq-page-title {
          display: flex; align-items: flex-start; justify-content: space-between;
          gap: 16px; margin-bottom: 22px;
          animation: rq-fade-up 0.5s 0.05s ease both;
        }
        .rq-title-h {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px; font-weight: 600; color: #1C1C1C; line-height: 1.1;
        }
        .rq-title-sub { font-size: 13px; color: rgba(60,60,60,0.48); margin-top: 4px; }
        .rq-new-btn {
          display: flex; align-items: center; gap: 7px;
          padding: 9px 16px;
          background: #8C1F28; color: #fff;
          border: none; border-radius: 6px;
          font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 500;
          cursor: pointer; white-space: nowrap; flex-shrink: 0;
          box-shadow: 0 4px 14px rgba(140,31,40,0.28);
          transition: background 0.15s, transform 0.15s, box-shadow 0.15s;
        }
        .rq-new-btn:hover { background: #7A1B24; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(140,31,40,0.36); }

        /* Summary stats */
        .rq-summary {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 11px; margin-bottom: 22px;
          animation: rq-fade-up 0.5s 0.1s ease both;
        }
        @media (max-width: 900px) { .rq-summary { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .rq-summary { grid-template-columns: repeat(2, 1fr); gap: 8px; } }

        .rq-stat {
          background: #fff;
          border: 1px solid rgba(28,28,28,0.08);
          border-radius: 8px; padding: 16px 18px;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .rq-stat:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.08); transform: translateY(-2px); }
        .rq-stat-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px; font-weight: 700; color: #1C1C1C; line-height: 1;
        }
        .rq-stat-lbl { font-size: 10px; font-weight: 600; color: rgba(60,60,60,0.45); margin-top: 4px; text-transform: uppercase; letter-spacing: 0.08em; }
        .rq-stat-bar { height: 2px; border-radius: 2px; margin-top: 12px; overflow: hidden; }
        .rq-stat-bar-fill { height: 100%; border-radius: 2px; }

        /* Tab + filters row */
        .rq-controls {
          display: flex; flex-wrap: wrap; gap: 10px;
          align-items: center; justify-content: space-between;
          margin-bottom: 16px;
          animation: rq-fade-up 0.5s 0.15s ease both;
        }
        .rq-tabs { display: flex; gap: 2px; background: rgba(28,28,28,0.06); border-radius: 7px; padding: 3px; }
        .rq-tab {
          padding: 7px 16px; border-radius: 5px; border: none;
          font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 500;
          cursor: pointer; transition: all 0.18s; color: rgba(60,60,60,0.55); background: transparent;
          white-space: nowrap;
        }
        .rq-tab.active { background: #fff; color: #1C1C1C; box-shadow: 0 1px 4px rgba(0,0,0,0.1); }
        .rq-tab-badge {
          display: inline-flex; align-items: center; justify-content: center;
          width: 18px; height: 18px; border-radius: 50%;
          font-size: 9px; font-weight: 700; margin-left: 5px;
        }
        .rq-tab.active .rq-tab-badge { background: rgba(140,31,40,0.1); color: #8C1F28; }
        .rq-tab:not(.active) .rq-tab-badge { background: rgba(60,60,60,0.1); color: rgba(60,60,60,0.5); }

        .rq-filters { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; }
        .rq-filter-btn {
          padding: 5px 12px; border-radius: 4px; border: 1px solid rgba(28,28,28,0.1);
          background: #fff; font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500;
          color: rgba(60,60,60,0.6); cursor: pointer;
          transition: all 0.15s; white-space: nowrap;
        }
        .rq-filter-btn:hover { border-color: rgba(140,31,40,0.2); color: #8C1F28; }
        .rq-filter-btn.active { background: rgba(140,31,40,0.07); border-color: rgba(140,31,40,0.22); color: #8C1F28; font-weight: 600; }

        .rq-filter-divider { width: 1px; height: 20px; background: rgba(28,28,28,0.1); margin: 0 2px; }
        @media (max-width: 640px) {
          .rq-controls { flex-direction: column; align-items: stretch; }
          .rq-filters  { gap: 5px; }
          .rq-filter-btn { padding: 4px 9px; font-size: 10.5px; }
        }

        /* Cards grid */
        .rq-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 13px;
        }
        @media (max-width: 900px) { .rq-grid { grid-template-columns: 1fr; } }

        .rq-card {
          background: #fff;
          border: 1px solid rgba(28,28,28,0.08);
          border-radius: 8px; padding: 16px 18px;
          cursor: pointer;
          transition: box-shadow 0.22s, transform 0.22s, border-color 0.2s;
          animation: rq-fade-up 0.5s ease both;
          display: flex; flex-direction: column; gap: 12px;
          position: relative; overflow: hidden;
        }
        .rq-card::after {
          content: ''; position: absolute; left: 0; top: 0; bottom: 0;
          width: 3px; background: rgba(140,31,40,0.25);
          transform: scaleY(0); transform-origin: center;
          transition: transform 0.25s ease;
        }
        .rq-card:hover { box-shadow: 0 8px 28px rgba(0,0,0,0.09); transform: translateY(-2px); border-color: rgba(140,31,40,0.18); }
        .rq-card:hover::after { transform: scaleY(1); }

        .rq-card-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; }
        .rq-card-group {
          width: 42px; height: 42px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 13px; font-weight: 700; color: #fff;
          box-shadow: 0 3px 10px rgba(140,31,40,0.28);
        }
        .rq-card-name   { font-size: 14px; font-weight: 600; color: #1C1C1C; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .rq-card-reason { font-size: 11px; color: rgba(60,60,60,0.5); margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        .rq-card-meta {
          display: flex; flex-wrap: wrap; gap: 8px;
        }
        .rq-meta-item {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 10.5px; color: rgba(60,60,60,0.5);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          max-width: 100%;
        }
        .rq-card-prog { /* filled by inline styles */ }
        .rq-card-foot {
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 10px; border-top: 1px solid rgba(28,28,28,0.06);
        }

        /* Skeleton */
        .sk {
          background: linear-gradient(90deg,
            rgba(28,28,28,0.06) 25%,
            rgba(28,28,28,0.11) 50%,
            rgba(28,28,28,0.06) 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite; border-radius: 6px;
        }

        /* Empty state */
        .rq-empty {
          grid-column: 1 / -1;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 60px 24px; text-align: center;
          animation: rq-fade-in 0.4s ease both;
        }
        .rq-empty-ico {
          width: 60px; height: 60px; border-radius: 50%;
          background: rgba(140,31,40,0.06);
          display: flex; align-items: center; justify-content: center;
          color: rgba(140,31,40,0.35); margin: 0 auto 14px;
        }
        .rq-empty-title { font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 600; color: #1C1C1C; margin-bottom: 5px; }
        .rq-empty-sub   { font-size: 12.5px; color: rgba(60,60,60,0.45); }

        /* Overlay + Drawer */
        .rq-overlay {
          position: fixed; inset: 0; z-index: 800;
          background: rgba(0,0,0,0.45);
          backdrop-filter: blur(4px);
          animation: rq-fade-in 0.25s ease both;
        }
        .rq-drawer {
          position: fixed; top: 0; right: 0; bottom: 0; z-index: 900;
          width: 440px; max-width: 100vw;
          background: #fff;
          display: flex; flex-direction: column;
          box-shadow: -8px 0 48px rgba(0,0,0,0.14);
          animation: rq-drawer-in 0.32s cubic-bezier(0.32,0,0.15,1) both;
        }
        @keyframes rq-drawer-in {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
        .rq-drawer-hdr {
          padding: 22px 22px 18px;
          border-bottom: 1px solid rgba(28,28,28,0.08);
          display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;
          flex-shrink: 0;
        }
        .rq-drawer-close {
          width: 34px; height: 34px; border-radius: 6px;
          background: rgba(28,28,28,0.06); border: none;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: rgba(60,60,60,0.5);
          flex-shrink: 0; transition: all 0.15s;
        }
        .rq-drawer-close:hover { background: rgba(140,31,40,0.1); color: #8C1F28; }
        .rq-drawer-body { flex: 1; overflow-y: auto; padding: 20px 22px; }
        .rq-drawer-body::-webkit-scrollbar { width: 3px; }
        .rq-drawer-body::-webkit-scrollbar-thumb { background: rgba(140,31,40,0.25); border-radius: 2px; }
        .rq-drawer-footer {
          padding: 14px 22px 22px; flex-shrink: 0;
          border-top: 1px solid rgba(28,28,28,0.08);
          display: flex; gap: 8px; align-items: center;
        }

        /* Blood hero inside drawer */
        .rq-blood-hero {
          display: flex; align-items: center; gap: 16px;
          padding: 16px; border-radius: 8px;
          border: 1px solid; margin-bottom: 14px;
        }
        .rq-blood-group {
          width: 60px; height: 60px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px; font-weight: 700; color: #fff;
          box-shadow: 0 4px 14px rgba(0,0,0,0.2);
        }

        /* Detail rows */
        .rq-detail-grid { display: flex; flex-direction: column; gap: 1px; margin-bottom: 16px; border: 1px solid rgba(28,28,28,0.08); border-radius: 8px; overflow: hidden; }
        .rq-detail-row  { display: flex; align-items: flex-start; gap: 10px; padding: 10px 14px; background: #fff; border-bottom: 1px solid rgba(28,28,28,0.05); }
        .rq-detail-row:last-child { border-bottom: none; }
        .rq-detail-ico  { color: rgba(140,31,40,0.5); margin-top: 2px; flex-shrink: 0; }
        .rq-detail-lbl  { font-size: 9.5px; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(60,60,60,0.4); font-weight: 600; }
        .rq-detail-val  { font-size: 12.5px; font-weight: 500; color: #1C1C1C; margin-top: 1px; }

        /* Notes */
        .rq-notes-box {
          background: rgba(140,31,40,0.03); border: 1px solid rgba(140,31,40,0.1);
          border-radius: 7px; padding: 14px; margin-bottom: 16px;
        }

        /* Section label */
        .rq-section-lbl {
          font-size: 9.5px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: rgba(60,60,60,0.38);
          margin-bottom: 10px;
        }

        /* Respondents */
        .rq-respondent {
          display: flex; align-items: center; gap: 10px;
          padding: 9px 12px; border-radius: 7px;
          border: 1px solid rgba(28,28,28,0.07); background: #FAFAF9;
        }
        .rq-respondent-av {
          width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 14px; font-weight: 700; color: #fff;
        }

        /* Timeline */
        .rq-timeline { display: flex; flex-direction: column; }
        .rq-tl-item  {
          display: grid; grid-template-columns: 24px 16px 1fr;
          column-gap: 10px; align-items: start;
          padding-bottom: 14px; position: relative;
        }
        .rq-tl-item:last-child { padding-bottom: 0; }
        .rq-tl-dot {
          width: 24px; height: 24px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }
        .rq-tl-line {
          width: 1px; height: calc(100% - 24px); background: rgba(28,28,28,0.1);
          margin: 24px 0 0 11px; grid-column: 1; grid-row: 2;
          position: absolute; top: 24px; left: 11px;
        }

        /* Buttons */
        .rq-btn-primary {
          display: flex; align-items: center; justify-content: center; gap: 7px;
          padding: 10px 18px; background: #8C1F28; color: #fff;
          border: none; border-radius: 6px;
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
          cursor: pointer; transition: background 0.15s, transform 0.15s;
        }
        .rq-btn-primary:hover { background: #7A1B24; transform: translateY(-1px); }
        .rq-btn-outline {
          display: flex; align-items: center; justify-content: center; gap: 6px;
          padding: 10px 16px;
          background: #fff; color: #1C1C1C;
          border: 1px solid rgba(28,28,28,0.15);
          border-radius: 6px;
          font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 500;
          cursor: pointer; transition: all 0.15s;
        }
        .rq-btn-outline:hover { border-color: rgba(140,31,40,0.3); color: #8C1F28; background: rgba(140,31,40,0.03); }
        .rq-btn-danger {
          display: flex; align-items: center; justify-content: center;
          padding: 10px 12px;
          background: rgba(140,31,40,0.07); color: #8C1F28;
          border: 1px solid rgba(140,31,40,0.18); border-radius: 6px;
          cursor: pointer; transition: all 0.15s;
        }
        .rq-btn-danger:hover { background: rgba(140,31,40,0.15); }

        /* Modal */
        .rq-modal {
          position: fixed; top: 50%; left: 50%; z-index: 900;
          transform: translate(-50%, -50%);
          width: 500px; max-width: calc(100vw - 32px);
          background: #fff; border-radius: 10px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.18), 0 0 0 1px rgba(28,28,28,0.07);
          display: flex; flex-direction: column;
          animation: rq-modal-in 0.3s cubic-bezier(0.32,0,0.15,1) both;
          max-height: calc(100vh - 60px);
        }
        @keyframes rq-modal-in {
          from { opacity: 0; transform: translate(-50%,-50%) scale(0.94); }
          to   { opacity: 1; transform: translate(-50%,-50%) scale(1); }
        }
        .rq-modal-hdr {
          padding: 22px 24px 14px;
          border-bottom: 1px solid rgba(28,28,28,0.07);
          display: flex; align-items: flex-start; justify-content: space-between;
          gap: 12px; flex-shrink: 0;
        }
        .rq-modal-body { flex: 1; overflow-y: auto; padding: 0 24px 10px; }
        .rq-modal-footer {
          padding: 14px 24px 20px; flex-shrink: 0;
          border-top: 1px solid rgba(28,28,28,0.07);
          display: flex; gap: 8px;
        }

        /* Form fields */
        .rq-field-row { display: flex; gap: 10px; }
        @media (max-width: 540px) { .rq-field-row { flex-direction: column; } }
        .rq-field { display: flex; flex-direction: column; gap: 5px; flex: 1; }
        .rq-label {
          font-size: 10.5px; font-weight: 600; color: rgba(60,60,60,0.55);
          text-transform: uppercase; letter-spacing: 0.08em;
        }
        .rq-input {
          height: 38px; padding: 0 12px;
          background: rgba(28,28,28,0.04);
          border: 1px solid rgba(28,28,28,0.12);
          border-radius: 6px;
          font-family: 'DM Sans', sans-serif; font-size: 13px; color: #1C1C1C;
          outline: none; width: 100%;
          transition: border-color 0.18s, box-shadow 0.18s;
          appearance: none;
        }
        .rq-input:focus { border-color: rgba(140,31,40,0.35); box-shadow: 0 0 0 3px rgba(140,31,40,0.07); }
        .rq-textarea { height: auto; padding: 10px 12px; resize: vertical; }

        /* ══ Respond Modal ══ */
        .rsp-overlay {
          position: fixed; inset: 0; z-index: 1100;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(6px);
          animation: rq-fade-in 0.2s ease both;
        }
        .rsp-modal {
          position: fixed; top: 50%; left: 50%; z-index: 1200;
          transform: translate(-50%, -50%);
          width: 480px; max-width: calc(100vw - 24px);
          max-height: calc(100vh - 48px);
          background: #fff; border-radius: 12px;
          box-shadow: 0 24px 80px rgba(0,0,0,0.22), 0 0 0 1px rgba(28,28,28,0.07);
          display: flex; flex-direction: column;
          overflow: hidden;
          animation: rsp-pop 0.3s cubic-bezier(0.34,1.3,0.64,1) both;
        }
        @keyframes rsp-pop {
          from { opacity: 0; transform: translate(-50%,-50%) scale(0.92); }
          to   { opacity: 1; transform: translate(-50%,-50%) scale(1); }
        }

        /* Modal header */
        .rsp-hdr {
          padding: 20px 22px 14px;
          border-bottom: 1px solid rgba(28,28,28,0.07);
          display: flex; align-items: flex-start; justify-content: space-between;
          gap: 10px; flex-shrink: 0;
          background: #fff;
        }
        .rsp-hdr-pre {
          font-size: 10px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: rgba(140,31,40,0.55);
          margin-bottom: 5px;
        }
        .rsp-hdr-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 21px; font-weight: 700; color: #1C1C1C; line-height: 1.1;
        }

        /* Scrollable body */
        .rsp-body {
          flex: 1; overflow-y: auto; padding: 18px 22px 4px;
        }
        .rsp-body::-webkit-scrollbar { width: 3px; }
        .rsp-body::-webkit-scrollbar-thumb { background: rgba(140,31,40,0.25); border-radius: 2px; }

        /* Footer */
        .rsp-footer {
          padding: 13px 22px 20px; flex-shrink: 0;
          border-top: 1px solid rgba(28,28,28,0.07);
          display: flex; gap: 8px; background: #fff;
        }

        /* Request mini-card */
        .rsp-req-card {
          display: flex; align-items: center; gap: 12px;
          padding: 12px 14px; border-radius: 8px;
          border: 1px solid rgba(28,28,28,0.09);
          background: #FAFAF8; margin-bottom: 18px;
        }
        .rsp-req-dot {
          width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 13px; font-weight: 700; color: #fff;
          box-shadow: 0 3px 10px rgba(140,31,40,0.25);
        }

        /* Section */
        .rsp-section {
          margin-bottom: 18px;
        }
        .rsp-section-title {
          display: flex; align-items: center; gap: 6px;
          font-size: 10.5px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: rgba(60,60,60,0.5);
          margin-bottom: 10px;
        }

        /* Units row */
        .rsp-units-row {
          display: flex; align-items: center; justify-content: center;
          gap: 20px; margin-bottom: 14px;
        }
        .rsp-unit-btn {
          width: 40px; height: 40px; border-radius: 50%;
          border: 1.5px solid rgba(140,31,40,0.25);
          background: rgba(140,31,40,0.05);
          color: #8C1F28; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.15s; flex-shrink: 0;
        }
        .rsp-unit-btn:hover:not(:disabled) { background: rgba(140,31,40,0.12); border-color: rgba(140,31,40,0.4); transform: scale(1.06); }
        .rsp-unit-btn:disabled { opacity: 0.3; cursor: not-allowed; }
        .rsp-units-display {
          text-align: center; min-width: 70px;
        }
        .rsp-units-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: 52px; font-weight: 700; color: #8C1F28; line-height: 1;
          transition: all 0.15s;
        }
        .rsp-units-lbl {
          font-size: 10.5px; color: rgba(60,60,60,0.4); font-weight: 500;
          text-transform: uppercase; letter-spacing: 0.1em; margin-top: 1px;
        }

        /* Blood drop bubbles */
        .rsp-unit-bubbles {
          display: flex; justify-content: center; gap: 8px; flex-wrap: wrap;
        }
        .rsp-bubble {
          width: 36px; height: 36px; border-radius: 50%;
          border: 1.5px solid rgba(140,31,40,0.18);
          background: rgba(140,31,40,0.04);
          color: rgba(140,31,40,0.25);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.18s;
        }
        .rsp-bubble:hover { border-color: rgba(140,31,40,0.4); color: rgba(140,31,40,0.5); transform: scale(1.08); }
        .rsp-bubble.filled {
          background: #8C1F28; border-color: #8C1F28;
          color: #fff; box-shadow: 0 3px 10px rgba(140,31,40,0.3);
          animation: rsp-drop-in 0.2s cubic-bezier(0.34,1.4,0.64,1) both;
        }
        @keyframes rsp-drop-in {
          from { transform: scale(0.7); opacity: 0.5; }
          to   { transform: scale(1);   opacity: 1; }
        }

        /* Donation type grid */
        .rsp-type-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;
        }
        @media (max-width: 420px) { .rsp-type-grid { grid-template-columns: 1fr; } }
        .rsp-type-card {
          padding: 12px 10px; border-radius: 8px;
          border: 1.5px solid rgba(28,28,28,0.1);
          background: #FAFAF8; cursor: pointer;
          text-align: center; position: relative;
          transition: all 0.18s;
        }
        .rsp-type-card:hover { border-color: rgba(140,31,40,0.25); background: rgba(140,31,40,0.03); }
        .rsp-type-card.selected {
          border-color: #8C1F28; background: rgba(140,31,40,0.05);
          box-shadow: 0 0 0 3px rgba(140,31,40,0.07);
        }
        .rsp-type-emoji { font-size: 20px; margin-bottom: 5px; }
        .rsp-type-label { font-size: 11.5px; font-weight: 600; color: #1C1C1C; }
        .rsp-type-desc  { font-size: 9.5px; color: rgba(60,60,60,0.45); margin-top: 2px; }
        .rsp-type-check {
          position: absolute; top: 6px; right: 6px;
          width: 16px; height: 16px; border-radius: 50%;
          background: #8C1F28; color: #fff;
          display: flex; align-items: center; justify-content: center;
        }

        /* Availability */
        .rsp-avail-row { display: flex; gap: 10px; }
        @media (max-width: 420px) { .rsp-avail-row { flex-direction: column; } }

        /* Eligibility strip */
        .rsp-eligibility {
          display: flex; flex-wrap: wrap; gap: 6px;
          padding: 10px 12px;
          background: rgba(58,125,68,0.05);
          border: 1px solid rgba(58,125,68,0.15);
          border-radius: 7px; margin-top: 14px;
        }
        .rsp-elig-item {
          display: flex; align-items: center; gap: 5px;
          font-size: 11px; font-weight: 500; padding: 2px 0;
        }
        .rsp-elig-ok { color: #2D6A38; }

        /* Confirm banner */
        .rsp-confirm-banner {
          display: flex; align-items: center; gap: 14px;
          padding: 14px; border-radius: 8px; border: 1px solid;
          margin-bottom: 16px;
        }
        .rsp-group-badge {
          width: 54px; height: 54px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px; font-weight: 700; color: #fff;
          box-shadow: 0 4px 14px rgba(0,0,0,0.18);
        }

        /* Terms */
        .rsp-terms-row {
          display: flex; align-items: flex-start; gap: 10px;
          cursor: pointer; padding: 10px 12px;
          border: 1px solid rgba(28,28,28,0.1);
          border-radius: 7px; background: #FAFAF8;
          transition: border-color 0.15s;
        }
        .rsp-terms-row:hover { border-color: rgba(140,31,40,0.25); }
        .rsp-checkbox {
          width: 18px; height: 18px; border-radius: 4px; flex-shrink: 0;
          border: 1.5px solid rgba(28,28,28,0.2);
          background: #fff; margin-top: 1px;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.15s;
        }
        .rsp-checkbox.checked { background: #8C1F28; border-color: #8C1F28; color: #fff; }

        /* Done state */
        .rsp-done {
          padding: 32px 28px 26px; display: flex; flex-direction: column; align-items: center; text-align: center;
        }
        .rsp-done-ring {
          width: 80px; height: 80px; border-radius: 50%;
          background: linear-gradient(135deg, rgba(140,31,40,0.1), rgba(140,31,40,0.06));
          border: 2px solid rgba(140,31,40,0.2);
          display: flex; align-items: center; justify-content: center;
          color: #8C1F28; margin-bottom: 18px;
          animation: rsp-pop 0.5s 0.1s cubic-bezier(0.34,1.3,0.64,1) both;
        }
        .rsp-done-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px; font-weight: 700; color: #1C1C1C; margin-bottom: 8px;
        }
        .rsp-done-sub {
          font-size: 13px; color: rgba(60,60,60,0.55); line-height: 1.7; margin-bottom: 20px;
        }
        .rsp-done-card {
          width: 100%; border: 1px solid rgba(28,28,28,0.09);
          border-radius: 8px; overflow: hidden; margin-bottom: 18px;
        }
        .rsp-done-row {
          display: flex; justify-content: space-between; gap: 12px;
          padding: 9px 14px; border-bottom: 1px solid rgba(28,28,28,0.05);
          font-size: 12px;
        }
        .rsp-done-row:last-child { border-bottom: none; }
        .rsp-done-row span:first-child { color: rgba(60,60,60,0.4); font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; font-size: 10px; }
        .rsp-done-row span:last-child  { color: #1C1C1C; font-weight: 500; }

        /* Respond primary button */
        .rsp-btn-primary {
          display: flex; align-items: center; justify-content: center; gap: 7px;
          padding: 11px 18px;
          background: linear-gradient(135deg, #8C1F28, #A8323D);
          color: #fff; border: none; border-radius: 7px;
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(140,31,40,0.3);
          transition: opacity 0.15s, transform 0.15s, box-shadow 0.15s;
        }
        .rsp-btn-primary:hover:not(:disabled) { opacity: 0.92; transform: translateY(-1px); box-shadow: 0 6px 22px rgba(140,31,40,0.38); }
      `}</style>

      <div className="rq-page">
        <DashboardSidebar
          activeNav={activeNav}
          onNavChange={setActiveNav}
          user={{ name: donor.name, initials: 'R', bloodGroup: donor.bloodGroup, location: donor.location }}
        />

        <div className="rq-main">
          {/* Header */}
          <header className="rq-hdr">
            <div className="rq-search-wrap">
              <span className="rq-search-ico"><IcoSearch /></span>
              <input
                className="rq-search"
                type="text"
                placeholder="Search requests…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="rq-hdr-right">
              <button className="rq-icon-btn">
                <IcoBell />
                <span className="rq-notif-dot" />
              </button>
              <div className="rq-avatar-hdr" title={donor.name}>R</div>
            </div>
          </header>

          {/* Content */}
          <div className="rq-content">

            {/* Page title row */}
            <div className="rq-page-title">
              <div>
                <div className="rq-title-h">Blood Requests</div>
                <div className="rq-title-sub">Manage and track all blood donation requests</div>
              </div>
              <button className="rq-new-btn" onClick={() => setShowNewModal(true)}>
                <IcoPlus s={14} /> New Request
              </button>
            </div>

            {/* Summary stats */}
            {loading
              ? (
                <div className="rq-summary">
                  {[...Array(4)].map((_, i) => <div key={i} className="sk" style={{ height: 80 }} />)}
                </div>
              )
              : (
                <div className="rq-summary">
                  {[
                    { label: 'Total Posted',  value: stats.total,     color: '#8C1F28', bar: `${(stats.total / 10) * 100}%` },
                    { label: 'Active',        value: stats.active,    color: '#3A7D44', bar: `${(stats.active / stats.total) * 100}%` },
                    { label: 'Fulfilled',     value: stats.fulfilled, color: '#2A6DB5', bar: `${(stats.fulfilled / stats.total) * 100}%` },
                    { label: 'Incoming (You)',value: stats.incoming,  color: '#B8922A', bar: `${(stats.incoming / 10) * 100}%` },
                  ].map(({ label, value, color, bar }) => (
                    <div key={label} className="rq-stat">
                      <div className="rq-stat-val">{value}</div>
                      <div className="rq-stat-lbl">{label}</div>
                      <div className="rq-stat-bar" style={{ background: `${color}12` }}>
                        <div className="rq-stat-bar-fill" style={{ width: bar, background: color, transition: 'width 1s ease' }} />
                      </div>
                    </div>
                  ))}
                </div>
              )
            }

            {/* Controls */}
            <div className="rq-controls">
              <div className="rq-tabs">
                <button
                  className={`rq-tab${tab === 'my' ? ' active' : ''}`}
                  onClick={() => { setTab('my'); setFilter('All'); setBgFilter('All') }}
                >
                  My Requests
                  <span className="rq-tab-badge">{myRequests.length}</span>
                </button>
                <button
                  className={`rq-tab${tab === 'incoming' ? ' active' : ''}`}
                  onClick={() => { setTab('incoming'); setFilter('All'); setBgFilter('All') }}
                >
                  Incoming
                  <span className="rq-tab-badge">{incomingRequests.length}</span>
                </button>
              </div>

              <div className="rq-filters">
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10.5, color: 'rgba(60,60,60,0.45)' }}>
                  <IcoFilter s={11} /> Status:
                </span>
                {(['All', ...FILTERS] as const).map(f => (
                  <button
                    key={f}
                    className={`rq-filter-btn${filter === f ? ' active' : ''}`}
                    onClick={() => setFilter(f as StatusType | 'All')}
                  >{f}</button>
                ))}
                <div className="rq-filter-divider" />
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10.5, color: 'rgba(60,60,60,0.45)' }}>
                  <IcoDrop s={10} />
                </span>
                {['All', 'A+', 'A-', 'B+', 'O+', 'AB+'].map(g => (
                  <button
                    key={g}
                    className={`rq-filter-btn${bgFilter === g ? ' active' : ''}`}
                    onClick={() => setBgFilter(g)}
                  >{g}</button>
                ))}
              </div>
            </div>

            {/* Cards */}
            {loading
              ? (
                <div className="rq-grid">
                  {[...Array(4)].map((_, i) => <div key={i} className="sk" style={{ height: 160 }} />)}
                </div>
              )
              : (
                <div className="rq-grid">
                  {filtered.length === 0 ? (
                    <div className="rq-empty">
                      <div className="rq-empty-ico"><IcoAlert s={26} /></div>
                      <div className="rq-empty-title">No requests found</div>
                      <div className="rq-empty-sub">Try adjusting your filters or search query</div>
                    </div>
                  ) : (
                    filtered.map((req, i) => (
                      <RequestCard
                        key={req.id}
                        req={req}
                        onClick={() => setSelectedReq(req)}
                        isIncoming={tab === 'incoming'}
                        index={i}
                      />
                    ))
                  )}
                </div>
              )
            }
          </div>
        </div>
      </div>

      {/* Detail Drawer */}
      {selectedReq && (
        <DetailDrawer
          req={selectedReq}
          onClose={() => setSelectedReq(null)}
          isIncoming={tab === 'incoming'}
        />
      )}

      {/* New Request Modal */}
      {showNewModal && (
        <NewRequestModal onClose={() => setShowNewModal(false)} />
      )}
    </>
  )
}