'use client'

import React, { useState, useEffect } from 'react'
import DashboardSidebar, { SIDEBAR_W } from '@/components/DashboardSidebar'

/* ══════════════════════════════════════════
   SVG Icon Library
══════════════════════════════════════════ */
const IcoSearch    = ({ s = 14 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
const IcoBell      = ({ s = 18 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
const IcoPlus      = ({ s = 16 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
const IcoCal       = ({ s = 18 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
const IcoPin       = ({ s = 13 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
const IcoClock     = ({ s = 13 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
const IcoDrop      = ({ s = 18 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2C12 2 4 10.5 4 15.5a8 8 0 0016 0C20 10.5 12 2 12 2z"/></svg>
const IcoUsers     = ({ s = 13 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
const IcoCheck     = ({ s = 13 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20,6 9,17 4,12"/></svg>
const IcoChevronR  = ({ s = 12 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9,18 15,12 9,6"/></svg>
const IcoClose     = ({ s = 18 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
const IcoFilter    = ({ s = 14 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"/></svg>
const IcoMap       = ({ s = 18 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="1,6 1,22 8,18 16,22 23,18 23,2 16,6 8,2"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>
const IcoPhone     = ({ s = 13 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
const IcoUser      = ({ s = 13 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
const IcoShare     = ({ s = 13 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
const IcoStar      = ({ s = 13 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>
const IcoActivity  = ({ s = 13 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/></svg>
const IcoHospital  = ({ s = 13 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
const IcoInfo      = ({ s = 13 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
const IcoAward     = ({ s = 18 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88"/></svg>
const IcoTrend     = ({ s = 18 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/><polyline points="17,6 23,6 23,12"/></svg>

/* ══════════════════════════════════════════
   Types
══════════════════════════════════════════ */
type CampaignStatus = 'Upcoming' | 'Active' | 'Completed' | 'Cancelled'

interface Attendee {
  name: string
  initials: string
  bloodGroup: string
  confirmedAt: string
}

interface Campaign {
  id: string
  title: string
  organizer: string
  hospital: string
  location: string
  distance: string
  date: string
  day: string
  month: string
  time: string
  endTime: string
  status: CampaignStatus
  bloodGroupsNeeded: string[]
  slotsTotal: number
  slotsFilled: number
  registered: boolean
  description: string
  contactPhone: string
  contactName: string
  donationsCollected: number
  attendees: Attendee[]
  timeline: { event: string; time: string; color: string }[]
  highlights: string[]
}

/* ══════════════════════════════════════════
   Mock Data
══════════════════════════════════════════ */
const campaigns: Campaign[] = [
  {
    id: 'CAMP-2026-018',
    title: 'Dhaka Blood Drive',
    organizer: 'BloodCircle Foundation',
    hospital: 'Dhaka Medical College Hospital',
    location: 'Bakshi Bazar, Dhaka',
    distance: '2.1 km',
    date: '22 May 2026',
    day: '22',
    month: 'May',
    time: '9:00 AM',
    endTime: '5:00 PM',
    status: 'Upcoming',
    bloodGroupsNeeded: ['A+', 'O+', 'B-', 'AB+'],
    slotsTotal: 120,
    slotsFilled: 74,
    registered: true,
    description: 'Join our flagship monthly blood drive at Dhaka Medical College Hospital. Donors of all eligible blood groups are welcome. Free health checkup and refreshments provided. Every donation helps save up to three lives.',
    contactPhone: '+880 1700-000001',
    contactName: 'Dr. Aminul Islam',
    donationsCollected: 0,
    attendees: [
      { name: 'Tariq Aziz',     initials: 'TA', bloodGroup: 'A+', confirmedAt: '16 May, 9:00 AM' },
      { name: 'Sumaiya Khanam', initials: 'SK', bloodGroup: 'O+', confirmedAt: '17 May, 2:15 PM' },
      { name: 'Rafiqul Islam',  initials: 'RI', bloodGroup: 'B-', confirmedAt: '18 May, 11:00 AM' },
      { name: 'Nusrat Jahan',   initials: 'NJ', bloodGroup: 'A+', confirmedAt: '19 May, 8:40 AM' },
      { name: 'You',            initials: 'R',  bloodGroup: 'A+', confirmedAt: '19 May, 10:00 AM' },
    ],
    timeline: [
      { event: 'Campaign announced',        time: '10 May, 9:00 AM',  color: '#3A7D44' },
      { event: 'Registration opened',       time: '10 May, 9:00 AM',  color: '#3A7D44' },
      { event: '50 slots filled',           time: '15 May, 3:00 PM',  color: '#B8922A' },
      { event: 'You registered',            time: '19 May, 10:00 AM', color: '#8C1F28' },
    ],
    highlights: ['Free health checkup', 'Refreshments provided', 'Certificate of participation', 'Priority emergency response'],
  },
  {
    id: 'CAMP-2026-017',
    title: 'Gazipur Emergency Camp',
    organizer: 'Gazipur Health Initiative',
    hospital: 'Shaheed Tajuddin Ahmad Medical College',
    location: 'Konabari, Gazipur',
    distance: '0.8 km',
    date: '25 May 2026',
    day: '25',
    month: 'May',
    time: '8:00 AM',
    endTime: '4:00 PM',
    status: 'Upcoming',
    bloodGroupsNeeded: ['AB+', 'A-', 'O-'],
    slotsTotal: 60,
    slotsFilled: 18,
    registered: false,
    description: 'Emergency camp targeting rare blood groups. AB+, A- and O- donors are critically needed. The hospital is facing a shortage ahead of a scheduled surgical week. Your donation is urgent and deeply valued.',
    contactPhone: '+880 1700-000002',
    contactName: 'Nurse Fatema Begum',
    donationsCollected: 0,
    attendees: [
      { name: 'Karim Molla',  initials: 'KM', bloodGroup: 'AB+', confirmedAt: '20 May, 11:00 AM' },
      { name: 'Sadia Islam',  initials: 'SI', bloodGroup: 'A-',  confirmedAt: '21 May, 9:30 AM' },
    ],
    timeline: [
      { event: 'Campaign announced',  time: '18 May, 10:00 AM', color: '#3A7D44' },
      { event: 'Registration opened', time: '18 May, 10:00 AM', color: '#3A7D44' },
    ],
    highlights: ['Rare blood groups priority', 'Transport allowance available', 'On-site doctor screening'],
  },
  {
    id: 'CAMP-2026-016',
    title: 'BIRDEM Diabetes Drive',
    organizer: 'BIRDEM Hospital',
    hospital: 'BIRDEM General Hospital',
    location: 'Shahbag, Dhaka',
    distance: '5.4 km',
    date: '01 Jun 2026',
    day: '01',
    month: 'Jun',
    time: '10:00 AM',
    endTime: '6:00 PM',
    status: 'Upcoming',
    bloodGroupsNeeded: ['O-', 'B+', 'A+'],
    slotsTotal: 80,
    slotsFilled: 12,
    registered: false,
    description: 'BIRDEM General Hospital hosts its quarterly blood drive focused on supporting its diabetic patient ward. O- universal donors are especially welcome. The camp is air-conditioned and professionally staffed.',
    contactPhone: '+880 1700-000003',
    contactName: 'Dr. Rehnuma Akter',
    donationsCollected: 0,
    attendees: [],
    timeline: [
      { event: 'Campaign announced',  time: '22 May, 9:00 AM', color: '#3A7D44' },
      { event: 'Registration opened', time: '22 May, 9:00 AM', color: '#3A7D44' },
    ],
    highlights: ['Air-conditioned facility', 'Post-donation meal', 'Diabetic-friendly snacks', 'Free blood sugar test'],
  },
  {
    id: 'CAMP-2026-013',
    title: 'United Hospital Camp',
    organizer: 'United Hospital Ltd.',
    hospital: 'United Hospital Ltd.',
    location: 'Gulshan-2, Dhaka',
    distance: '7.2 km',
    date: '15 May 2026',
    day: '15',
    month: 'May',
    time: '9:00 AM',
    endTime: '3:00 PM',
    status: 'Active',
    bloodGroupsNeeded: ['A+', 'AB-', 'B+'],
    slotsTotal: 50,
    slotsFilled: 43,
    registered: false,
    description: 'Active drive at United Hospital. Walk-ins are welcome but registered donors are given priority slots. The camp closes at 3 PM. Bring a valid photo ID.',
    contactPhone: '+880 1700-000004',
    contactName: 'Coordinator Mahbub',
    donationsCollected: 43,
    attendees: [
      { name: 'Iqbal Karim',     initials: 'IK', bloodGroup: 'A+',  confirmedAt: '15 May, 9:10 AM' },
      { name: 'Nasrin Sultana',  initials: 'NS', bloodGroup: 'AB-', confirmedAt: '15 May, 10:30 AM' },
    ],
    timeline: [
      { event: 'Camp commenced',       time: '15 May, 9:00 AM',  color: '#3A7D44' },
      { event: '20 donations recorded', time: '15 May, 11:30 AM', color: '#3A7D44' },
      { event: '40 donations recorded', time: '15 May, 2:00 PM',  color: '#B8922A' },
    ],
    highlights: ['Walk-ins welcome', 'Photo ID required', 'Live donation count'],
  },
  {
    id: 'CAMP-2026-009',
    title: 'National Blood Week Drive',
    organizer: 'BloodCircle Foundation',
    hospital: 'Dhaka Medical College Hospital',
    location: 'Bakshi Bazar, Dhaka',
    distance: '2.1 km',
    date: '12 Apr 2026',
    day: '12',
    month: 'Apr',
    time: '8:00 AM',
    endTime: '6:00 PM',
    status: 'Completed',
    bloodGroupsNeeded: ['A+', 'O+', 'B+', 'AB+', 'A-', 'O-', 'B-', 'AB-'],
    slotsTotal: 200,
    slotsFilled: 200,
    registered: true,
    description: 'BloodCircle\'s biggest annual drive during National Blood Week. All blood groups accepted. This was a record-breaking event with 200 successful donations. Thank you to all participants.',
    contactPhone: '+880 1700-000001',
    contactName: 'Dr. Aminul Islam',
    donationsCollected: 196,
    attendees: [
      { name: 'You',            initials: 'R',  bloodGroup: 'A+', confirmedAt: '12 Apr, 9:30 AM' },
      { name: 'Tariq Aziz',     initials: 'TA', bloodGroup: 'O+', confirmedAt: '12 Apr, 10:00 AM' },
      { name: 'Sumaiya Khanam', initials: 'SK', bloodGroup: 'B-', confirmedAt: '12 Apr, 11:15 AM' },
    ],
    timeline: [
      { event: 'Camp commenced',          time: '12 Apr, 8:00 AM',  color: '#3A7D44' },
      { event: 'You donated — confirmed', time: '12 Apr, 9:30 AM',  color: '#8C1F28' },
      { event: '100 donations milestone', time: '12 Apr, 12:30 PM', color: '#B8922A' },
      { event: '200 donations — full',    time: '12 Apr, 5:15 PM',  color: '#3A7D44' },
      { event: 'Camp successfully closed', time: '12 Apr, 6:00 PM', color: '#3A7D44' },
    ],
    highlights: ['Record 200 donations', 'All blood groups collected', 'Free full blood panel report'],
  },
  {
    id: 'CAMP-2026-005',
    title: 'Gazipur Winter Drive',
    organizer: 'Gazipur Health Initiative',
    hospital: 'Gazipur Sadar Hospital',
    location: 'Joydebpur, Gazipur',
    distance: '3.5 km',
    date: '5 Feb 2026',
    day: '05',
    month: 'Feb',
    time: '9:00 AM',
    endTime: '4:00 PM',
    status: 'Completed',
    bloodGroupsNeeded: ['A+', 'O+', 'B+'],
    slotsTotal: 75,
    slotsFilled: 75,
    registered: true,
    description: 'Seasonal winter drive at Gazipur Sadar Hospital. Fully subscribed. 75 units successfully collected.',
    contactPhone: '+880 1700-000005',
    contactName: 'Dr. Shamsul Haque',
    donationsCollected: 72,
    attendees: [
      { name: 'You',           initials: 'R',  bloodGroup: 'A+', confirmedAt: '5 Feb, 10:00 AM' },
      { name: 'Mahbub Alam',   initials: 'MA', bloodGroup: 'O+', confirmedAt: '5 Feb, 11:00 AM' },
    ],
    timeline: [
      { event: 'Camp commenced',          time: '5 Feb, 9:00 AM',  color: '#3A7D44' },
      { event: 'You donated — confirmed', time: '5 Feb, 10:00 AM', color: '#8C1F28' },
      { event: 'Camp successfully closed', time: '5 Feb, 4:00 PM', color: '#3A7D44' },
    ],
    highlights: ['72 units collected', 'Certificate issued'],
  },
]

/* ══════════════════════════════════════════
   Constants
══════════════════════════════════════════ */
const statusConfig: Record<CampaignStatus, { color: string; bg: string; border: string; dot: string }> = {
  Upcoming:  { color: '#2A6DB5', bg: 'rgba(42,109,181,0.09)',  border: 'rgba(42,109,181,0.22)',  dot: '#3A7DC8' },
  Active:    { color: '#3A7D44', bg: 'rgba(58,125,68,0.09)',   border: 'rgba(58,125,68,0.22)',   dot: '#3A9D4A' },
  Completed: { color: '#6B6B6B', bg: 'rgba(107,107,107,0.09)', border: 'rgba(107,107,107,0.22)', dot: '#999'    },
  Cancelled: { color: '#8C1F28', bg: 'rgba(140,31,40,0.09)',   border: 'rgba(140,31,40,0.22)',   dot: '#C0404C' },
}

const donor = { name: 'Rakibul Hasan', bloodGroup: 'A+', location: 'Konabari, Gazipur' }
const STATUSES: CampaignStatus[] = ['Upcoming', 'Active', 'Completed']
const BLOOD_GROUPS = ['All', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

/* ══════════════════════════════════════════
   Sub-components
══════════════════════════════════════════ */
function StatusPill({ status }: { status: CampaignStatus }) {
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
      <span style={{
        width: 5, height: 5, borderRadius: '50%',
        background: cfg.dot, display: 'inline-block',
        animation: status === 'Active' ? 'cp-pulse 1.6s ease infinite' : 'none',
      }} />
      {status}
    </span>
  )
}

function SlotBar({ filled, total, color }: { filled: number; total: number; color: string }) {
  const pct = total === 0 ? 0 : Math.min((filled / total) * 100, 100)
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
        <span style={{ fontSize: 10, color: 'rgba(60,60,60,0.5)', fontWeight: 500 }}>Slots registered</span>
        <span style={{ fontSize: 10, fontWeight: 700, color }}>{filled} / {total}</span>
      </div>
      <div style={{ height: 4, borderRadius: 3, background: 'rgba(28,28,28,0.07)', overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${pct}%`,
          background: `linear-gradient(90deg, ${color}, ${color}bb)`,
          borderRadius: 3, transition: 'width 0.8s cubic-bezier(.4,0,.2,1)',
        }} />
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   Register Modal
══════════════════════════════════════════ */
function RegisterModal({ campaign, onClose }: { campaign: Campaign; onClose: () => void }) {
  const [step, setStep] = useState<'form' | 'done'>('form')
  const [agreed, setAgreed] = useState(false)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('09:00')
  const stsCfg = statusConfig[campaign.status]

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <>
      <div className="cp-overlay" onClick={step !== 'done' ? onClose : undefined} />
      <div className="cp-modal">
        {step === 'done' ? (
          <div className="cp-done">
            <div className="cp-done-ring">
              <IcoAward s={34} />
            </div>
            <div className="cp-done-title">Registration Confirmed</div>
            <div className="cp-done-sub">
              You are registered for <strong>{campaign.title}</strong> on <strong>{campaign.date}</strong>. See you there.
            </div>
            <div className="cp-done-card">
              {[
                { label: 'Campaign',    value: campaign.title },
                { label: 'Date',        value: `${campaign.date} · ${campaign.time}` },
                { label: 'Location',    value: campaign.hospital },
                { label: 'Your Blood',  value: donor.bloodGroup },
                { label: 'Availability', value: date ? `${date} at ${time}` : 'Full day' },
              ].map(({ label, value }) => (
                <div key={label} className="cp-done-row">
                  <span>{label}</span>
                  <span style={label === 'Your Blood' ? { color: '#8C1F28', fontWeight: 700 } : {}}>{value}</span>
                </div>
              ))}
            </div>
            <button className="cp-btn-primary" style={{ width: '100%' }} onClick={onClose}>
              <IcoCheck s={14} /> Done
            </button>
          </div>
        ) : (
          <>
            <div className="cp-modal-hdr">
              <div>
                <div className="cp-modal-pre">{campaign.id}</div>
                <div className="cp-modal-title">Register for Campaign</div>
              </div>
              <button className="cp-drawer-close" onClick={onClose}><IcoClose s={16} /></button>
            </div>

            <div className="cp-modal-body">
              {/* Campaign summary */}
              <div className="cp-reg-banner">
                <div className="cp-reg-date-box">
                  <div className="cp-reg-day">{campaign.day}</div>
                  <div className="cp-reg-mon">{campaign.month}</div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 13.5, color: '#1C1C1C' }}>{campaign.title}</div>
                  <div style={{ fontSize: 11.5, color: 'rgba(60,60,60,0.5)', marginTop: 2 }}>{campaign.hospital}</div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 7, flexWrap: 'wrap' }}>
                    {campaign.bloodGroupsNeeded.slice(0, 4).map(g => (
                      <span key={g} className="cp-gtag">{g}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Slots remaining */}
              <div style={{ marginBottom: 18 }}>
                <SlotBar filled={campaign.slotsFilled} total={campaign.slotsTotal} color="#8C1F28" />
                <div style={{ fontSize: 10.5, color: 'rgba(60,60,60,0.4)', marginTop: 5, textAlign: 'right' }}>
                  {campaign.slotsTotal - campaign.slotsFilled} slot{campaign.slotsTotal - campaign.slotsFilled !== 1 ? 's' : ''} remaining
                </div>
              </div>

              {/* Availability */}
              <div className="cp-reg-section">
                <div className="cp-reg-section-title"><IcoCal s={12} /> Your expected arrival</div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <div className="rq-field" style={{ flex: 2 }}>
                    <label className="rq-label">Date</label>
                    <input className="rq-input" type="date" value={date} onChange={e => setDate(e.target.value)} />
                  </div>
                  <div className="rq-field" style={{ flex: 1 }}>
                    <label className="rq-label">Time</label>
                    <input className="rq-input" type="time" value={time} onChange={e => setTime(e.target.value)} />
                  </div>
                </div>
              </div>

              {/* Eligibility strip */}
              <div className="cp-eligibility" style={{ marginBottom: 16 }}>
                <div className="cp-elig-item cp-elig-ok"><IcoCheck s={11} /> Blood group <strong>{donor.bloodGroup}</strong> eligible</div>
                <div className="cp-elig-item cp-elig-ok"><IcoCheck s={11} /> Last donated 34 days ago</div>
                <div className="cp-elig-item cp-elig-ok"><IcoCheck s={11} /> KYC verified</div>
              </div>

              {/* Terms */}
              <label className="cp-terms-row" onClick={() => setAgreed(a => !a)}>
                <div className={`cp-checkbox${agreed ? ' checked' : ''}`}>{agreed && <IcoCheck s={9} />}</div>
                <span style={{ fontSize: 11.5, color: 'rgba(60,60,60,0.6)', lineHeight: 1.5 }}>
                  I confirm I am medically eligible and will appear at the venue on the specified date. I understand that no-shows without prior notice may affect my standing.
                </span>
              </label>
            </div>

            <div className="cp-modal-footer">
              <button className="cp-btn-outline" onClick={onClose}>Cancel</button>
              <button
                className="cp-btn-primary"
                style={{ flex: 1, opacity: agreed ? 1 : 0.45, cursor: agreed ? 'pointer' : 'not-allowed' }}
                disabled={!agreed}
                onClick={() => setStep('done')}
              >
                <IcoAward s={14} /> Confirm Registration
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
function DetailDrawer({ campaign, onClose }: { campaign: Campaign; onClose: () => void }) {
  const stsCfg = statusConfig[campaign.status]
  const [showRegister, setShowRegister] = useState(false)
  const pct = campaign.slotsTotal === 0 ? 0 : Math.round((campaign.slotsFilled / campaign.slotsTotal) * 100)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <>
      <div className="cp-overlay" onClick={onClose} />
      <div className="cp-drawer">

        {/* Header */}
        <div className="cp-drawer-hdr">
          <div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 11, fontWeight: 600, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: 'rgba(140,31,40,0.6)',
              marginBottom: 6,
            }}>{campaign.id}</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, color: '#1C1C1C', lineHeight: 1.15 }}>
              {campaign.title}
            </div>
            <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap', alignItems: 'center' }}>
              <StatusPill status={campaign.status} />
              {campaign.registered && (
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 3,
                  background: 'rgba(140,31,40,0.08)', color: '#8C1F28',
                  border: '1px solid rgba(140,31,40,0.2)',
                  textTransform: 'uppercase', letterSpacing: '0.05em',
                }}>
                  <IcoCheck s={9} /> Registered
                </span>
              )}
            </div>
          </div>
          <button className="cp-drawer-close" onClick={onClose}><IcoClose s={18} /></button>
        </div>

        {/* Body */}
        <div className="cp-drawer-body">

          {/* Hero date block */}
          <div className="cp-detail-hero" style={{ borderColor: `${stsCfg.color}28`, background: `${stsCfg.color}06` }}>
            <div className="cp-detail-date-box">
              <div className="cp-detail-day">{campaign.day}</div>
              <div className="cp-detail-mon">{campaign.month}</div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11, color: 'rgba(60,60,60,0.45)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 3 }}>Campaign Date</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, color: '#1C1C1C', lineHeight: 1.1 }}>
                {campaign.date}
              </div>
              <div style={{ fontSize: 12, color: 'rgba(60,60,60,0.55)', marginTop: 3 }}>
                {campaign.time} — {campaign.endTime}
              </div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, fontWeight: 700, color: stsCfg.color, lineHeight: 1 }}>
                {pct}<span style={{ fontSize: 16, color: 'rgba(60,60,60,0.35)' }}>%</span>
              </div>
              <div style={{ fontSize: 9.5, color: 'rgba(60,60,60,0.4)', marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Full</div>
            </div>
          </div>

          {/* Slot progress */}
          <div style={{ marginBottom: 20 }}>
            <SlotBar filled={campaign.slotsFilled} total={campaign.slotsTotal} color={stsCfg.color} />
          </div>

          {/* Blood groups */}
          <div style={{ marginBottom: 18 }}>
            <div className="cp-section-lbl">Blood Groups Needed</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {campaign.bloodGroupsNeeded.map(g => (
                <span key={g} className="cp-gtag" style={{ fontSize: 12.5, padding: '4px 10px' }}>{g}</span>
              ))}
            </div>
          </div>

          {/* Details grid */}
          <div className="cp-detail-grid">
            {[
              { icon: <IcoUser s={12} />,     label: 'Organizer',  value: campaign.organizer },
              { icon: <IcoHospital s={12} />, label: 'Venue',      value: campaign.hospital },
              { icon: <IcoPin s={12} />,      label: 'Location',   value: `${campaign.location} · ${campaign.distance}` },
              { icon: <IcoClock s={12} />,    label: 'Time',       value: `${campaign.time} – ${campaign.endTime}` },
              { icon: <IcoUsers s={12} />,    label: 'Capacity',   value: `${campaign.slotsTotal} slots total` },
              { icon: <IcoPhone s={12} />,    label: 'Contact',    value: `${campaign.contactName} · ${campaign.contactPhone}` },
              ...(campaign.status === 'Completed' ? [{ icon: <IcoDrop s={12} />, label: 'Donations', value: `${campaign.donationsCollected} units collected` }] : []),
            ].map(({ icon, label, value }) => (
              <div key={label} className="cp-detail-row">
                <div className="cp-detail-ico">{icon}</div>
                <div>
                  <div className="cp-detail-lbl">{label}</div>
                  <div className="cp-detail-val">{value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="cp-notes-box" style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(140,31,40,0.6)', marginBottom: 7 }}>
              About This Campaign
            </div>
            <p style={{ fontSize: 12.5, lineHeight: 1.75, color: '#3C3C3C' }}>{campaign.description}</p>
          </div>

          {/* Highlights */}
          {campaign.highlights.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div className="cp-section-lbl">What to Expect</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {campaign.highlights.map((h, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 12.5, color: '#3C3C3C' }}>
                    <span style={{
                      width: 20, height: 20, borderRadius: '50%',
                      background: 'rgba(140,31,40,0.07)', border: '1px solid rgba(140,31,40,0.14)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, color: '#8C1F28',
                    }}><IcoCheck s={10} /></span>
                    {h}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Attendees */}
          {campaign.attendees.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div className="cp-section-lbl">Registered Donors ({campaign.attendees.length})</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {campaign.attendees.map((a, i) => (
                  <div key={i} className="cp-attendee">
                    <div className="cp-attendee-av" style={{
                      background: a.name === 'You'
                        ? 'linear-gradient(135deg, #8C1F28, #A8323D)'
                        : 'linear-gradient(135deg, #3A5A7D, #4A7AAD)',
                    }}>{a.initials}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12.5, fontWeight: 500, color: '#1C1C1C' }}>{a.name}</div>
                      <div style={{ fontSize: 10.5, color: 'rgba(60,60,60,0.45)' }}>Registered {a.confirmedAt}</div>
                    </div>
                    <span className="cp-gtag" style={{ fontSize: 11 }}>{a.bloodGroup}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timeline */}
          <div style={{ marginBottom: 12 }}>
            <div className="cp-section-lbl">Timeline</div>
            <div className="cp-timeline">
              {campaign.timeline.map((t, i) => (
                <div key={i} className="cp-tl-item">
                  <div className="cp-tl-dot" style={{ background: `${t.color}18`, border: `1px solid ${t.color}30` }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: t.color, display: 'block' }} />
                  </div>
                  {i < campaign.timeline.length - 1 && <div className="cp-tl-line" />}
                  <div>
                    <div style={{ fontSize: 12.5, fontWeight: 500, color: '#1C1C1C' }}>{t.event}</div>
                    <div style={{ fontSize: 10.5, color: 'rgba(60,60,60,0.45)', marginTop: 1 }}>{t.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="cp-drawer-footer">
          {campaign.status === 'Upcoming' && !campaign.registered && (
            <button className="cp-btn-primary" style={{ flex: 1 }} onClick={() => setShowRegister(true)}>
              <IcoAward s={15} /> Register to Donate
            </button>
          )}
          {campaign.status === 'Upcoming' && campaign.registered && (
            <>
              <div style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                fontSize: 12.5, fontWeight: 500, color: '#3A7D44',
                background: 'rgba(58,125,68,0.07)', borderRadius: 6,
                padding: '10px 16px', border: '1px solid rgba(58,125,68,0.18)',
              }}>
                <IcoCheck s={14} /> You are registered
              </div>
              <button className="cp-btn-outline"><IcoShare s={13} /> Share</button>
            </>
          )}
          {campaign.status === 'Active' && (
            <button className="cp-btn-primary" style={{ flex: 1 }} onClick={() => setShowRegister(true)}>
              <IcoDrop s={14} /> Walk-in Registration
            </button>
          )}
          {campaign.status === 'Completed' && (
            <>
              <div style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                fontSize: 12.5, fontWeight: 500, color: '#6B6B6B',
                background: 'rgba(107,107,107,0.07)', borderRadius: 6,
                padding: '10px 16px', border: '1px solid rgba(107,107,107,0.18)',
              }}>
                <IcoCheck s={14} /> Campaign completed
              </div>
              {campaign.registered && (
                <button className="cp-btn-outline"><IcoStar s={13} /> View Certificate</button>
              )}
            </>
          )}
        </div>
      </div>

      {showRegister && (
        <RegisterModal campaign={campaign} onClose={() => setShowRegister(false)} />
      )}
    </>
  )
}

/* ══════════════════════════════════════════
   Campaign Card
══════════════════════════════════════════ */
function CampaignCard({ campaign, onClick, index }: {
  campaign: Campaign; onClick: () => void; index: number
}) {
  const stsCfg = statusConfig[campaign.status]
  const pct = campaign.slotsTotal === 0 ? 0 : Math.round((campaign.slotsFilled / campaign.slotsTotal) * 100)

  return (
    <div className="cp-card" onClick={onClick} style={{ animationDelay: `${index * 55}ms` }}>

      {/* Top row */}
      <div className="cp-card-top">
        <div className="cp-card-date-box">
          <div className="cp-cdb-day">{campaign.day}</div>
          <div className="cp-cdb-mon">{campaign.month}</div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="cp-card-title">{campaign.title}</div>
          <div className="cp-card-org">{campaign.organizer}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5, flexShrink: 0 }}>
          <StatusPill status={campaign.status} />
          {campaign.registered && (
            <span style={{
              fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 2,
              background: 'rgba(140,31,40,0.07)', color: '#8C1F28',
              border: '1px solid rgba(140,31,40,0.15)',
              textTransform: 'uppercase', letterSpacing: '0.06em',
            }}>Registered</span>
          )}
        </div>
      </div>

      {/* Meta */}
      <div className="cp-card-meta">
        <span className="cp-meta-item"><IcoHospital s={11} />{campaign.hospital}</span>
        <span className="cp-meta-item"><IcoPin s={11} />{campaign.distance}</span>
        <span className="cp-meta-item"><IcoClock s={11} />{campaign.time}</span>
      </div>

      {/* Blood groups */}
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {campaign.bloodGroupsNeeded.map(g => (
          <span key={g} className="cp-gtag">{g}</span>
        ))}
      </div>

      {/* Progress */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
          <span style={{ fontSize: 10, color: 'rgba(60,60,60,0.5)' }}>
            {campaign.attendees.length} registered
          </span>
          <span style={{ fontSize: 10, fontWeight: 700, color: stsCfg.color }}>
            {campaign.slotsFilled}/{campaign.slotsTotal} slots
          </span>
        </div>
        <div style={{ height: 3, borderRadius: 2, background: 'rgba(28,28,28,0.07)', overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: `${pct}%`,
            background: `linear-gradient(90deg, ${stsCfg.color}, ${stsCfg.color}bb)`,
            borderRadius: 2, transition: 'width 0.8s',
          }} />
        </div>
      </div>

      {/* Footer */}
      <div className="cp-card-foot">
        <span style={{ fontSize: 9.5, color: 'rgba(60,60,60,0.38)', fontFamily: "'DM Mono', monospace", letterSpacing: '0.06em' }}>{campaign.id}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 10.5, color: '#8C1F28', fontWeight: 500 }}>
          View Details <IcoChevronR s={10} />
        </span>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   Create Campaign Modal
══════════════════════════════════════════ */
function CreateCampaignModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    title: '', organizer: '', hospital: '', location: '',
    date: '', startTime: '09:00', endTime: '17:00',
    bloodGroups: [] as string[],
    slotsTotal: '50', description: '', contactName: '', contactPhone: '',
  })
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))
  const toggleGroup = (g: string) => setForm(f => ({
    ...f,
    bloodGroups: f.bloodGroups.includes(g)
      ? f.bloodGroups.filter(x => x !== g)
      : [...f.bloodGroups, g],
  }))

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <>
      <div className="cp-overlay" onClick={onClose} />
      <div className="cp-modal">
        <div className="cp-modal-hdr">
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 21, fontWeight: 700, color: '#1C1C1C' }}>
              Create Campaign
            </div>
            <div style={{ fontSize: 11.5, color: 'rgba(60,60,60,0.45)', marginTop: 3 }}>
              Step {step} of 2 — {step === 1 ? 'Basic Info' : 'Blood Groups & Details'}
            </div>
          </div>
          <button className="cp-drawer-close" onClick={onClose}><IcoClose s={16} /></button>
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

        <div className="cp-modal-body">
          {step === 1 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="rq-field">
                <label className="rq-label">Campaign Title</label>
                <input className="rq-input" placeholder="e.g. Dhaka Monthly Blood Drive" value={form.title} onChange={e => set('title', e.target.value)} />
              </div>
              <div className="rq-field">
                <label className="rq-label">Organizer / Institution</label>
                <input className="rq-input" placeholder="Organization or hospital name" value={form.organizer} onChange={e => set('organizer', e.target.value)} />
              </div>
              <div className="rq-field">
                <label className="rq-label">Venue (Hospital / Venue Name)</label>
                <input className="rq-input" placeholder="Full venue name" value={form.hospital} onChange={e => set('hospital', e.target.value)} />
              </div>
              <div className="rq-field-row">
                <div className="rq-field">
                  <label className="rq-label">Area / Location</label>
                  <input className="rq-input" placeholder="Area, City" value={form.location} onChange={e => set('location', e.target.value)} />
                </div>
                <div className="rq-field">
                  <label className="rq-label">Date</label>
                  <input className="rq-input" type="date" value={form.date} onChange={e => set('date', e.target.value)} />
                </div>
              </div>
              <div className="rq-field-row">
                <div className="rq-field">
                  <label className="rq-label">Start Time</label>
                  <input className="rq-input" type="time" value={form.startTime} onChange={e => set('startTime', e.target.value)} />
                </div>
                <div className="rq-field">
                  <label className="rq-label">End Time</label>
                  <input className="rq-input" type="time" value={form.endTime} onChange={e => set('endTime', e.target.value)} />
                </div>
                <div className="rq-field">
                  <label className="rq-label">Total Slots</label>
                  <select className="rq-input" value={form.slotsTotal} onChange={e => set('slotsTotal', e.target.value)}>
                    {[20, 30, 50, 75, 100, 150, 200].map(n => <option key={n}>{n}</option>)}
                  </select>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label className="rq-label" style={{ display: 'block', marginBottom: 8 }}>Blood Groups Needed</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                  {BLOOD_GROUPS.filter(g => g !== 'All').map(g => (
                    <button
                      key={g}
                      onClick={() => toggleGroup(g)}
                      style={{
                        padding: '5px 12px', borderRadius: 4,
                        border: `1.5px solid ${form.bloodGroups.includes(g) ? '#8C1F28' : 'rgba(28,28,28,0.12)'}`,
                        background: form.bloodGroups.includes(g) ? 'rgba(140,31,40,0.08)' : '#fff',
                        color: form.bloodGroups.includes(g) ? '#8C1F28' : 'rgba(60,60,60,0.6)',
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 13, fontWeight: 600,
                        cursor: 'pointer', transition: 'all 0.15s',
                      }}
                    >{g}</button>
                  ))}
                </div>
              </div>
              <div className="rq-field-row">
                <div className="rq-field">
                  <label className="rq-label">Contact Person</label>
                  <input className="rq-input" placeholder="Full name" value={form.contactName} onChange={e => set('contactName', e.target.value)} />
                </div>
                <div className="rq-field">
                  <label className="rq-label">Contact Phone</label>
                  <input className="rq-input" placeholder="+880 1XXX-XXXXXX" value={form.contactPhone} onChange={e => set('contactPhone', e.target.value)} />
                </div>
              </div>
              <div className="rq-field">
                <label className="rq-label">Description <span style={{ color: 'rgba(60,60,60,0.35)', fontWeight: 400, textTransform: 'none' }}>(optional)</span></label>
                <textarea
                  className="rq-input rq-textarea"
                  placeholder="Describe the campaign, requirements, and any special instructions…"
                  rows={4}
                  value={form.description}
                  onChange={e => set('description', e.target.value)}
                />
              </div>
            </div>
          )}
        </div>

        <div className="cp-modal-footer">
          {step === 1
            ? <button className="cp-btn-outline" onClick={onClose}>Cancel</button>
            : <button className="cp-btn-outline" onClick={() => setStep(1)}>Back</button>
          }
          {step === 1
            ? <button className="cp-btn-primary" style={{ flex: 1 }} onClick={() => setStep(2)}>Continue <IcoChevronR s={12} /></button>
            : <button className="cp-btn-primary" style={{ flex: 1 }} onClick={onClose}><IcoCheck s={14} /> Publish Campaign</button>
          }
        </div>
      </div>
    </>
  )
}

/* ══════════════════════════════════════════
   Page
══════════════════════════════════════════ */
export default function CampaignsPage() {
  const [activeNav, setActiveNav]       = useState('Campaigns')
  const [loading, setLoading]           = useState(true)
  const [selected, setSelected]         = useState<Campaign | null>(null)
  const [showCreate, setShowCreate]     = useState(false)
  const [filter, setFilter]             = useState<CampaignStatus | 'All'>('All')
  const [bgFilter, setBgFilter]         = useState('All')
  const [search, setSearch]             = useState('')
  const [tab, setTab]                   = useState<'all' | 'mine'>('all')

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(t)
  }, [])

  const source = tab === 'mine'
    ? campaigns.filter(c => c.registered)
    : campaigns

  const filtered = source.filter(c => {
    const matchStatus = filter === 'All' || c.status === filter
    const matchBg     = bgFilter === 'All' || c.bloodGroupsNeeded.includes(bgFilter)
    const matchSearch = search === '' || [c.title, c.hospital, c.location, c.organizer, c.id]
      .some(f => f.toLowerCase().includes(search.toLowerCase()))
    return matchStatus && matchBg && matchSearch
  })

  const stats = {
    total:     campaigns.length,
    upcoming:  campaigns.filter(c => c.status === 'Upcoming').length,
    active:    campaigns.filter(c => c.status === 'Active').length,
    attended:  campaigns.filter(c => c.registered && c.status === 'Completed').length,
  }

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes cp-fade-up {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cp-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes cp-pulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.5; transform: scale(1.3); }
        }
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes cp-drawer-in {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
        @keyframes cp-modal-in {
          from { opacity: 0; transform: translate(-50%,-50%) scale(0.94); }
          to   { opacity: 1; transform: translate(-50%,-50%) scale(1); }
        }
        @keyframes cp-pop {
          from { opacity: 0; transform: translate(-50%,-50%) scale(0.92); }
          to   { opacity: 1; transform: translate(-50%,-50%) scale(1); }
        }

        .cp-page  { min-height: 100vh; background: #F2EEE7; font-family: 'DM Sans', sans-serif; }
        .cp-main  { margin-left: ${SIDEBAR_W}px; display: flex; flex-direction: column; min-height: 100vh; transition: margin-left 0.32s ease; }
        @media (max-width: 1024px) { .cp-main { margin-left: 0; } }

        /* ── Header ── */
        .cp-hdr {
          position: sticky; top: 0; z-index: 100;
          background: rgba(242,238,231,0.92);
          backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(28,28,28,0.08);
          padding: 0 28px; height: 62px;
          display: flex; align-items: center; justify-content: space-between;
        }
        @media (max-width: 1024px) { .cp-hdr { padding-left: 62px; } }
        @media (max-width: 640px)  { .cp-hdr { padding-left: 58px; padding-right: 14px; } }

        .cp-search-wrap { position: relative; display: flex; align-items: center; }
        .cp-search-ico  { position: absolute; left: 11px; color: rgba(60,60,60,0.35); pointer-events: none; }
        .cp-search {
          height: 36px; padding: 0 14px 0 34px;
          background: rgba(28,28,28,0.055);
          border: 1px solid transparent; border-radius: 6px;
          font-family: 'DM Sans', sans-serif; font-size: 13px; color: #1C1C1C;
          width: 220px; outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .cp-search::placeholder { color: rgba(60,60,60,0.3); }
        .cp-search:focus { border-color: rgba(140,31,40,0.2); background: #fff; box-shadow: 0 0 0 3px rgba(140,31,40,0.07); }
        @media (max-width: 640px) { .cp-search { width: 150px; } }

        .cp-hdr-right  { display: flex; align-items: center; gap: 8px; }
        .cp-icon-btn {
          width: 36px; height: 36px; border-radius: 6px;
          background: rgba(28,28,28,0.055); border: 1px solid transparent;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: rgba(40,40,40,0.5);
          transition: all 0.18s; position: relative;
        }
        .cp-icon-btn:hover { background: rgba(140,31,40,0.1); color: #8C1F28; border-color: rgba(140,31,40,0.15); }
        .cp-notif-dot {
          position: absolute; top: 8px; right: 8px;
          width: 6px; height: 6px; background: #8C1F28; border-radius: 50%;
          border: 1.5px solid #F2EEE7;
          animation: cp-pulse 2.5s ease infinite;
        }
        .cp-avatar-hdr {
          width: 36px; height: 36px;
          background: linear-gradient(135deg, #8C1F28, #A8323D);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px; font-weight: 700; color: #fff;
          cursor: pointer; box-shadow: 0 2px 8px rgba(140,31,40,0.3);
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .cp-avatar-hdr:hover { box-shadow: 0 4px 14px rgba(140,31,40,0.4); transform: scale(1.05); }

        /* ── Content ── */
        .cp-content { flex: 1; padding: 28px 28px 64px; }
        @media (max-width: 640px) { .cp-content { padding: 20px 14px 56px; } }

        /* ── Page title ── */
        .cp-page-title {
          display: flex; align-items: flex-start; justify-content: space-between;
          gap: 16px; margin-bottom: 22px;
          animation: cp-fade-up 0.5s 0.05s ease both;
        }
        .cp-title-h {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px; font-weight: 600; color: #1C1C1C; line-height: 1.1;
        }
        .cp-title-sub { font-size: 13px; color: rgba(60,60,60,0.48); margin-top: 4px; }
        .cp-new-btn {
          display: flex; align-items: center; gap: 7px;
          padding: 9px 16px;
          background: #8C1F28; color: #fff;
          border: none; border-radius: 6px;
          font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 500;
          cursor: pointer; white-space: nowrap; flex-shrink: 0;
          box-shadow: 0 4px 14px rgba(140,31,40,0.28);
          transition: background 0.15s, transform 0.15s, box-shadow 0.15s;
        }
        .cp-new-btn:hover { background: #7A1B24; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(140,31,40,0.36); }

        /* ── Summary stats ── */
        .cp-summary {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 11px; margin-bottom: 22px;
          animation: cp-fade-up 0.5s 0.1s ease both;
        }
        @media (max-width: 900px) { .cp-summary { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .cp-summary { grid-template-columns: repeat(2, 1fr); gap: 8px; } }

        .cp-stat {
          background: #fff;
          border: 1px solid rgba(28,28,28,0.08);
          border-radius: 8px; padding: 16px 18px;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .cp-stat:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.08); transform: translateY(-2px); }
        .cp-stat-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px; font-weight: 700; color: #1C1C1C; line-height: 1;
        }
        .cp-stat-lbl { font-size: 10px; font-weight: 600; color: rgba(60,60,60,0.45); margin-top: 4px; text-transform: uppercase; letter-spacing: 0.08em; }
        .cp-stat-bar { height: 2px; border-radius: 2px; margin-top: 12px; overflow: hidden; }
        .cp-stat-bar-fill { height: 100%; border-radius: 2px; transition: width 1s ease; }

        /* ── Controls ── */
        .cp-controls {
          display: flex; flex-wrap: wrap; gap: 10px;
          align-items: center; justify-content: space-between;
          margin-bottom: 16px;
          animation: cp-fade-up 0.5s 0.15s ease both;
        }
        .cp-tabs { display: flex; gap: 2px; background: rgba(28,28,28,0.06); border-radius: 7px; padding: 3px; }
        .cp-tab {
          padding: 7px 16px; border-radius: 5px; border: none;
          font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 500;
          cursor: pointer; transition: all 0.18s; color: rgba(60,60,60,0.55); background: transparent;
          white-space: nowrap;
        }
        .cp-tab.active { background: #fff; color: #1C1C1C; box-shadow: 0 1px 4px rgba(0,0,0,0.1); }
        .cp-tab-badge {
          display: inline-flex; align-items: center; justify-content: center;
          width: 18px; height: 18px; border-radius: 50%;
          font-size: 9px; font-weight: 700; margin-left: 5px;
        }
        .cp-tab.active .cp-tab-badge { background: rgba(140,31,40,0.1); color: #8C1F28; }
        .cp-tab:not(.active) .cp-tab-badge { background: rgba(60,60,60,0.1); color: rgba(60,60,60,0.5); }

        .cp-filters { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; }
        .cp-filter-btn {
          padding: 5px 12px; border-radius: 4px; border: 1px solid rgba(28,28,28,0.1);
          background: #fff; font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500;
          color: rgba(60,60,60,0.6); cursor: pointer; transition: all 0.15s; white-space: nowrap;
        }
        .cp-filter-btn:hover { border-color: rgba(140,31,40,0.2); color: #8C1F28; }
        .cp-filter-btn.active { background: rgba(140,31,40,0.07); border-color: rgba(140,31,40,0.22); color: #8C1F28; font-weight: 600; }
        .cp-filter-divider { width: 1px; height: 20px; background: rgba(28,28,28,0.1); margin: 0 2px; }

        @media (max-width: 768px) {
          .cp-controls { flex-direction: column; align-items: stretch; }
          .cp-filters  { gap: 5px; }
          .cp-filter-btn { padding: 4px 9px; font-size: 10.5px; }
        }

        /* ── Cards grid ── */
        .cp-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 13px;
        }
        @media (max-width: 900px) { .cp-grid { grid-template-columns: 1fr; } }

        .cp-card {
          background: #fff;
          border: 1px solid rgba(28,28,28,0.08);
          border-radius: 8px; padding: 16px 18px;
          cursor: pointer;
          transition: box-shadow 0.22s, transform 0.22s, border-color 0.2s;
          animation: cp-fade-up 0.5s ease both;
          display: flex; flex-direction: column; gap: 12px;
          position: relative; overflow: hidden;
        }
        .cp-card::after {
          content: ''; position: absolute; left: 0; top: 0; bottom: 0;
          width: 3px; background: rgba(140,31,40,0.25);
          transform: scaleY(0); transform-origin: center;
          transition: transform 0.25s ease;
        }
        .cp-card:hover { box-shadow: 0 8px 28px rgba(0,0,0,0.09); transform: translateY(-2px); border-color: rgba(140,31,40,0.18); }
        .cp-card:hover::after { transform: scaleY(1); }

        .cp-card-top    { display: flex; align-items: flex-start; gap: 12px; }
        .cp-card-date-box {
          flex-shrink: 0; width: 44px; text-align: center;
          background: rgba(140,31,40,0.07);
          border: 1px solid rgba(140,31,40,0.12);
          border-radius: 5px; padding: 6px 4px;
        }
        .cp-cdb-day { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 700; color: #8C1F28; line-height: 1; }
        .cp-cdb-mon { font-size: 8.5px; font-weight: 600; color: rgba(140,31,40,0.6); letter-spacing: 0.08em; text-transform: uppercase; margin-top: 2px; }
        .cp-card-title  { font-size: 14px; font-weight: 600; color: #1C1C1C; line-height: 1.3; }
        .cp-card-org    { font-size: 11px; color: rgba(60,60,60,0.5); margin-top: 2px; }
        .cp-card-meta   { display: flex; flex-wrap: wrap; gap: 8px; }
        .cp-meta-item {
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 10.5px; color: rgba(60,60,60,0.5);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;
        }
        .cp-card-foot {
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 10px; border-top: 1px solid rgba(28,28,28,0.06);
        }

        /* Blood group tag */
        .cp-gtag {
          font-family: 'Cormorant Garamond', serif;
          font-size: 11px; font-weight: 600;
          padding: 2px 7px; border-radius: 2px;
          background: rgba(140,31,40,0.07); color: #8C1F28;
          border: 1px solid rgba(140,31,40,0.14);
        }

        /* ── Skeleton ── */
        .sk {
          background: linear-gradient(90deg,
            rgba(28,28,28,0.06) 25%,
            rgba(28,28,28,0.11) 50%,
            rgba(28,28,28,0.06) 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite; border-radius: 6px;
        }

        /* ── Empty ── */
        .cp-empty {
          grid-column: 1 / -1;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 60px 24px; text-align: center;
          animation: cp-fade-in 0.4s ease both;
        }
        .cp-empty-ico {
          width: 60px; height: 60px; border-radius: 50%;
          background: rgba(140,31,40,0.06);
          display: flex; align-items: center; justify-content: center;
          color: rgba(140,31,40,0.35); margin: 0 auto 14px;
        }
        .cp-empty-title { font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 600; color: #1C1C1C; margin-bottom: 5px; }
        .cp-empty-sub   { font-size: 12.5px; color: rgba(60,60,60,0.45); }

        /* ── Overlay + Drawer ── */
        .cp-overlay {
          position: fixed; inset: 0; z-index: 800;
          background: rgba(0,0,0,0.45);
          backdrop-filter: blur(4px);
          animation: cp-fade-in 0.25s ease both;
        }
        .cp-drawer {
          position: fixed; top: 0; right: 0; bottom: 0; z-index: 900;
          width: 440px; max-width: 100vw;
          background: #fff;
          display: flex; flex-direction: column;
          box-shadow: -8px 0 48px rgba(0,0,0,0.14);
          animation: cp-drawer-in 0.32s cubic-bezier(0.32,0,0.15,1) both;
        }
        .cp-drawer-hdr {
          padding: 22px 22px 18px;
          border-bottom: 1px solid rgba(28,28,28,0.08);
          display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;
          flex-shrink: 0;
        }
        .cp-drawer-close {
          width: 34px; height: 34px; border-radius: 6px;
          background: rgba(28,28,28,0.06); border: none;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: rgba(60,60,60,0.5);
          flex-shrink: 0; transition: all 0.15s;
        }
        .cp-drawer-close:hover { background: rgba(140,31,40,0.1); color: #8C1F28; }
        .cp-drawer-body { flex: 1; overflow-y: auto; padding: 20px 22px; }
        .cp-drawer-body::-webkit-scrollbar { width: 3px; }
        .cp-drawer-body::-webkit-scrollbar-thumb { background: rgba(140,31,40,0.25); border-radius: 2px; }
        .cp-drawer-footer {
          padding: 14px 22px 22px; flex-shrink: 0;
          border-top: 1px solid rgba(28,28,28,0.08);
          display: flex; gap: 8px; align-items: center;
        }

        /* ── Drawer internals ── */
        .cp-detail-hero {
          display: flex; align-items: center; gap: 16px;
          padding: 16px; border-radius: 8px; border: 1px solid;
          margin-bottom: 14px;
        }
        .cp-detail-date-box {
          flex-shrink: 0; width: 52px; text-align: center;
          background: rgba(140,31,40,0.08);
          border: 1px solid rgba(140,31,40,0.14);
          border-radius: 6px; padding: 8px 6px;
        }
        .cp-detail-day { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 700; color: #8C1F28; line-height: 1; }
        .cp-detail-mon { font-size: 9px; font-weight: 700; color: rgba(140,31,40,0.6); letter-spacing: 0.1em; text-transform: uppercase; margin-top: 2px; }

        .cp-detail-grid { display: flex; flex-direction: column; gap: 1px; margin-bottom: 16px; border: 1px solid rgba(28,28,28,0.08); border-radius: 8px; overflow: hidden; }
        .cp-detail-row  { display: flex; align-items: flex-start; gap: 10px; padding: 10px 14px; background: #fff; border-bottom: 1px solid rgba(28,28,28,0.05); }
        .cp-detail-row:last-child { border-bottom: none; }
        .cp-detail-ico  { color: rgba(140,31,40,0.5); margin-top: 2px; flex-shrink: 0; }
        .cp-detail-lbl  { font-size: 9.5px; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(60,60,60,0.4); font-weight: 600; }
        .cp-detail-val  { font-size: 12.5px; font-weight: 500; color: #1C1C1C; margin-top: 1px; }

        .cp-notes-box {
          background: rgba(140,31,40,0.03); border: 1px solid rgba(140,31,40,0.1);
          border-radius: 7px; padding: 14px; margin-bottom: 16px;
        }
        .cp-section-lbl {
          font-size: 9.5px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: rgba(60,60,60,0.38);
          margin-bottom: 10px;
        }
        .cp-attendee {
          display: flex; align-items: center; gap: 10px;
          padding: 9px 12px; border-radius: 7px;
          border: 1px solid rgba(28,28,28,0.07); background: #FAFAF9;
        }
        .cp-attendee-av {
          width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 14px; font-weight: 700; color: #fff;
        }
        .cp-timeline { display: flex; flex-direction: column; }
        .cp-tl-item  {
          display: grid; grid-template-columns: 24px 16px 1fr;
          column-gap: 10px; align-items: start;
          padding-bottom: 14px; position: relative;
        }
        .cp-tl-item:last-child { padding-bottom: 0; }
        .cp-tl-dot {
          width: 24px; height: 24px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }
        .cp-tl-line {
          width: 1px; height: calc(100% - 24px); background: rgba(28,28,28,0.1);
          position: absolute; top: 24px; left: 11px;
        }

        /* ── Buttons ── */
        .cp-btn-primary {
          display: flex; align-items: center; justify-content: center; gap: 7px;
          padding: 10px 18px;
          background: linear-gradient(135deg, #8C1F28, #A8323D);
          color: #fff; border: none; border-radius: 6px;
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(140,31,40,0.28);
          transition: opacity 0.15s, transform 0.15s, box-shadow 0.15s;
        }
        .cp-btn-primary:hover:not(:disabled) { opacity: 0.92; transform: translateY(-1px); box-shadow: 0 6px 22px rgba(140,31,40,0.36); }
        .cp-btn-outline {
          display: flex; align-items: center; justify-content: center; gap: 6px;
          padding: 10px 16px;
          background: #fff; color: #1C1C1C;
          border: 1px solid rgba(28,28,28,0.15);
          border-radius: 6px;
          font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 500;
          cursor: pointer; transition: all 0.15s;
        }
        .cp-btn-outline:hover { border-color: rgba(140,31,40,0.3); color: #8C1F28; background: rgba(140,31,40,0.03); }

        /* ── Modal ── */
        .cp-modal {
          position: fixed; top: 50%; left: 50%; z-index: 1200;
          transform: translate(-50%, -50%);
          width: 500px; max-width: calc(100vw - 24px);
          max-height: calc(100vh - 48px);
          background: #fff; border-radius: 12px;
          box-shadow: 0 24px 80px rgba(0,0,0,0.22), 0 0 0 1px rgba(28,28,28,0.07);
          display: flex; flex-direction: column; overflow: hidden;
          animation: cp-pop 0.3s cubic-bezier(0.34,1.2,0.64,1) both;
        }
        .cp-modal-hdr {
          padding: 20px 24px 14px;
          border-bottom: 1px solid rgba(28,28,28,0.07);
          display: flex; align-items: flex-start; justify-content: space-between;
          gap: 10px; flex-shrink: 0;
        }
        .cp-modal-pre {
          font-size: 10px; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: rgba(140,31,40,0.55); margin-bottom: 5px;
        }
        .cp-modal-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 21px; font-weight: 700; color: #1C1C1C; line-height: 1.1;
        }
        .cp-modal-body { flex: 1; overflow-y: auto; padding: 18px 24px 4px; }
        .cp-modal-body::-webkit-scrollbar { width: 3px; }
        .cp-modal-body::-webkit-scrollbar-thumb { background: rgba(140,31,40,0.25); border-radius: 2px; }
        .cp-modal-footer {
          padding: 13px 24px 20px; flex-shrink: 0;
          border-top: 1px solid rgba(28,28,28,0.07);
          display: flex; gap: 8px; background: #fff;
        }

        /* ── Register modal internals ── */
        .cp-reg-banner {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 14px; border-radius: 8px;
          border: 1px solid rgba(28,28,28,0.09);
          background: #FAFAF8; margin-bottom: 18px;
        }
        .cp-reg-date-box {
          flex-shrink: 0; width: 42px; text-align: center;
          background: rgba(140,31,40,0.07);
          border: 1px solid rgba(140,31,40,0.12);
          border-radius: 5px; padding: 6px 4px;
        }
        .cp-reg-day { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 700; color: #8C1F28; line-height: 1; }
        .cp-reg-mon { font-size: 8.5px; font-weight: 700; color: rgba(140,31,40,0.6); letter-spacing: 0.08em; text-transform: uppercase; margin-top: 2px; }
        .cp-reg-section { margin-bottom: 16px; }
        .cp-reg-section-title {
          display: flex; align-items: center; gap: 6px;
          font-size: 10.5px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: rgba(60,60,60,0.5);
          margin-bottom: 10px;
        }
        .cp-eligibility {
          display: flex; flex-wrap: wrap; gap: 6px;
          padding: 10px 12px;
          background: rgba(58,125,68,0.05);
          border: 1px solid rgba(58,125,68,0.15);
          border-radius: 7px;
        }
        .cp-elig-item { display: flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 500; }
        .cp-elig-ok   { color: #2D6A38; }
        .cp-terms-row {
          display: flex; align-items: flex-start; gap: 10px;
          cursor: pointer; padding: 10px 12px;
          border: 1px solid rgba(28,28,28,0.1);
          border-radius: 7px; background: #FAFAF8;
          transition: border-color 0.15s;
        }
        .cp-terms-row:hover { border-color: rgba(140,31,40,0.25); }
        .cp-checkbox {
          width: 18px; height: 18px; border-radius: 4px; flex-shrink: 0;
          border: 1.5px solid rgba(28,28,28,0.2);
          background: #fff; margin-top: 1px;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.15s;
        }
        .cp-checkbox.checked { background: #8C1F28; border-color: #8C1F28; color: #fff; }

        /* ── Done state ── */
        .cp-done {
          padding: 32px 28px 26px;
          display: flex; flex-direction: column; align-items: center; text-align: center;
        }
        .cp-done-ring {
          width: 80px; height: 80px; border-radius: 50%;
          background: linear-gradient(135deg, rgba(140,31,40,0.1), rgba(140,31,40,0.06));
          border: 2px solid rgba(140,31,40,0.2);
          display: flex; align-items: center; justify-content: center;
          color: #8C1F28; margin-bottom: 18px;
          animation: cp-pop 0.5s 0.1s cubic-bezier(0.34,1.3,0.64,1) both;
        }
        .cp-done-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px; font-weight: 700; color: #1C1C1C; margin-bottom: 8px;
        }
        .cp-done-sub { font-size: 13px; color: rgba(60,60,60,0.55); line-height: 1.7; margin-bottom: 20px; }
        .cp-done-card {
          width: 100%; border: 1px solid rgba(28,28,28,0.09);
          border-radius: 8px; overflow: hidden; margin-bottom: 18px;
        }
        .cp-done-row {
          display: flex; justify-content: space-between; gap: 12px;
          padding: 9px 14px; border-bottom: 1px solid rgba(28,28,28,0.05); font-size: 12px;
        }
        .cp-done-row:last-child { border-bottom: none; }
        .cp-done-row span:first-child { color: rgba(60,60,60,0.4); font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; font-size: 10px; }
        .cp-done-row span:last-child  { color: #1C1C1C; font-weight: 500; }

        /* ── Shared form primitives (reused from requests page pattern) ── */
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
      `}</style>

      <div className="cp-page">
        <DashboardSidebar
          activeNav={activeNav}
          onNavChange={setActiveNav}
          user={{ name: donor.name, initials: 'R', bloodGroup: donor.bloodGroup, location: donor.location }}
        />

        <div className="cp-main">

          {/* Header */}
          <header className="cp-hdr">
            <div className="cp-search-wrap">
              <span className="cp-search-ico"><IcoSearch /></span>
              <input
                className="cp-search"
                type="text"
                placeholder="Search campaigns…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="cp-hdr-right">
              <button className="cp-icon-btn">
                <IcoBell />
                <span className="cp-notif-dot" />
              </button>
              <div className="cp-avatar-hdr" title={donor.name}>R</div>
            </div>
          </header>

          {/* Content */}
          <div className="cp-content">

            {/* Page title */}
            <div className="cp-page-title">
              <div>
                <div className="cp-title-h">Blood Campaigns</div>
                <div className="cp-title-sub">Browse, register, and track donation drives near you</div>
              </div>
              <button className="cp-new-btn" onClick={() => setShowCreate(true)}>
                <IcoPlus s={14} /> Create Campaign
              </button>
            </div>

            {/* Summary stats */}
            {loading ? (
              <div className="cp-summary">
                {[...Array(4)].map((_, i) => <div key={i} className="sk" style={{ height: 80 }} />)}
              </div>
            ) : (
              <div className="cp-summary">
                {[
                  { label: 'Total Campaigns', value: stats.total,    color: '#8C1F28', bar: `${(stats.total / 10) * 100}%` },
                  { label: 'Upcoming',        value: stats.upcoming, color: '#2A6DB5', bar: `${(stats.upcoming / stats.total) * 100}%` },
                  { label: 'Active Now',      value: stats.active,   color: '#3A7D44', bar: `${(stats.active / stats.total) * 100}%` },
                  { label: 'Attended',        value: stats.attended, color: '#B8922A', bar: `${(stats.attended / stats.total) * 100}%` },
                ].map(({ label, value, color, bar }) => (
                  <div key={label} className="cp-stat">
                    <div className="cp-stat-val">{value}</div>
                    <div className="cp-stat-lbl">{label}</div>
                    <div className="cp-stat-bar" style={{ background: `${color}12` }}>
                      <div className="cp-stat-bar-fill" style={{ width: bar, background: color }} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Controls */}
            <div className="cp-controls">
              <div className="cp-tabs">
                <button
                  className={`cp-tab${tab === 'all' ? ' active' : ''}`}
                  onClick={() => { setTab('all'); setFilter('All') }}
                >
                  All Campaigns
                  <span className="cp-tab-badge">{campaigns.length}</span>
                </button>
                <button
                  className={`cp-tab${tab === 'mine' ? ' active' : ''}`}
                  onClick={() => { setTab('mine'); setFilter('All') }}
                >
                  My Registrations
                  <span className="cp-tab-badge">{campaigns.filter(c => c.registered).length}</span>
                </button>
              </div>

              <div className="cp-filters">
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10.5, color: 'rgba(60,60,60,0.45)' }}>
                  <IcoFilter s={11} /> Status:
                </span>
                {(['All', ...STATUSES] as const).map(f => (
                  <button
                    key={f}
                    className={`cp-filter-btn${filter === f ? ' active' : ''}`}
                    onClick={() => setFilter(f as CampaignStatus | 'All')}
                  >{f}</button>
                ))}
                <div className="cp-filter-divider" />
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10.5, color: 'rgba(60,60,60,0.45)' }}>
                  <IcoDrop s={10} />
                </span>
                {['All', 'A+', 'A-', 'B+', 'O+', 'O-', 'AB+'].map(g => (
                  <button
                    key={g}
                    className={`cp-filter-btn${bgFilter === g ? ' active' : ''}`}
                    onClick={() => setBgFilter(g)}
                  >{g}</button>
                ))}
              </div>
            </div>

            {/* Cards */}
            {loading ? (
              <div className="cp-grid">
                {[...Array(4)].map((_, i) => <div key={i} className="sk" style={{ height: 200 }} />)}
              </div>
            ) : (
              <div className="cp-grid">
                {filtered.length === 0 ? (
                  <div className="cp-empty">
                    <div className="cp-empty-ico"><IcoCal s={26} /></div>
                    <div className="cp-empty-title">No campaigns found</div>
                    <div className="cp-empty-sub">Try adjusting your filters or search query</div>
                  </div>
                ) : (
                  filtered.map((c, i) => (
                    <CampaignCard
                      key={c.id}
                      campaign={c}
                      onClick={() => setSelected(c)}
                      index={i}
                    />
                  ))
                )}
              </div>
            )}

          </div>
        </div>
      </div>

      {selected && (
        <DetailDrawer campaign={selected} onClose={() => setSelected(null)} />
      )}

      {showCreate && (
        <CreateCampaignModal onClose={() => setShowCreate(false)} />
      )}
    </>
  )
}