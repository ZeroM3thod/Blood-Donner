'use client'

import { useState, useEffect } from 'react'
import './emergency.css'

// ── Types ──────────────────────────────────────────────────────────────────
type Urgency = 'critical' | 'urgent' | 'moderate'

interface EmergencyRequest {
  id: number
  blood: string
  patientName: string
  hospital: string
  city: string
  state: string
  units: number
  urgency: Urgency
  description: string
  postedBy: string
  phone: string
  timeAgo: string
  respondedCount: number
  isNew?: boolean
}

// ── Seed Data ──────────────────────────────────────────────────────────────
const SEED_REQUESTS: EmergencyRequest[] = [
  {
    id: 1, blood: 'O−', patientName: 'Rakesh Sharma (58)',
    hospital: 'AIIMS New Delhi', city: 'New Delhi', state: 'Delhi',
    units: 3, urgency: 'critical',
    description: 'Post-surgery complication. Patient in ICU. O− universal donor blood required immediately. Please contact as soon as possible.',
    postedBy: 'Priya Sharma', phone: '+91 98765 43210',
    timeAgo: '4 mins ago', respondedCount: 2, isNew: true,
  },
  {
    id: 2, blood: 'AB−', patientName: 'Sunita Devi (34)',
    hospital: 'Fortis Hospital, BKC', city: 'Mumbai', state: 'Maharashtra',
    units: 2, urgency: 'critical',
    description: 'Emergency C-section. AB− blood needed urgently. Very rare type. Please respond immediately if you or someone you know can donate.',
    postedBy: 'Amit Devi', phone: '+91 91234 56789',
    timeAgo: '12 mins ago', respondedCount: 0, isNew: true,
  },
  {
    id: 3, blood: 'B+', patientName: 'Mohan Reddy (45)',
    hospital: 'Apollo Hospitals', city: 'Hyderabad', state: 'Telangana',
    units: 4, urgency: 'urgent',
    description: 'Bypass surgery scheduled tomorrow morning. Need 4 units of B+ blood. Hospital blood bank running low. Patient in stable condition.',
    postedBy: 'Kavitha Reddy', phone: '+91 88765 43210',
    timeAgo: '38 mins ago', respondedCount: 3,
  },
  {
    id: 4, blood: 'A+', patientName: 'Ananya Singh (12)',
    hospital: 'Narayana Health City', city: 'Bangalore', state: 'Karnataka',
    units: 2, urgency: 'urgent',
    description: 'Child with thalassemia requires periodic transfusions. Next transfusion due in 2 days. Parents looking for regular donors for long-term support.',
    postedBy: 'Ramesh Singh', phone: '+91 77654 32109',
    timeAgo: '1 hr ago', respondedCount: 5,
  },
  {
    id: 5, blood: 'O+', patientName: 'Geetha Nair (67)',
    hospital: 'Medical Trust Hospital', city: 'Kochi', state: 'Kerala',
    units: 2, urgency: 'moderate',
    description: 'Hip replacement surgery next week. Looking for O+ donors in advance to ensure adequate supply is ready before the procedure.',
    postedBy: 'Suresh Nair', phone: '+91 98123 45678',
    timeAgo: '2 hrs ago', respondedCount: 4,
  },
  {
    id: 6, blood: 'B−', patientName: 'Farhan Ansari (29)',
    hospital: 'KEM Hospital', city: 'Mumbai', state: 'Maharashtra',
    units: 1, urgency: 'urgent',
    description: 'Road accident victim. Stabilised but needs blood transfusion. B− is a rare type — please reach out if you are a B− donor in the Mumbai area.',
    postedBy: 'Zara Ansari', phone: '+91 96543 21098',
    timeAgo: '2 hrs ago', respondedCount: 1,
  },
]

const BLOOD_TYPES = ['A+', 'A−', 'B+', 'B−', 'AB+', 'AB−', 'O+', 'O−']
const STATES = ['Maharashtra', 'Karnataka', 'Tamil Nadu', 'Kerala', 'Delhi', 'Telangana', 'West Bengal', 'Gujarat', 'Rajasthan', 'Uttar Pradesh', 'Andhra Pradesh', 'Punjab', 'Madhya Pradesh', 'Bihar', 'Rajasthan']

const URGENCY_MAP: Record<Urgency, string> = {
  critical: 'Critical',
  urgent: 'Urgent',
  moderate: 'Moderate',
}

// ── Response Modal ─────────────────────────────────────────────────────────
function ResponseModal({
  request, onClose,
}: {
  request: EmergencyRequest | null
  onClose: () => void
}) {
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (request) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [request])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  const handleSubmit = () => {
    setSubmitted(true)
    setTimeout(() => { setSubmitted(false); onClose() }, 2200)
  }

  return (
    <div
      className={`resp-overlay ${request ? 'open' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="resp-modal">
        <div className="resp-modal-head">
          <div>
            <div className="resp-modal-title">I Can <em>Help</em></div>
            <div style={{ fontSize: 13, color: 'var(--ink-soft)', marginTop: 4, fontWeight: 300 }}>
              Your contact will be forwarded securely to the requester.
            </div>
          </div>
          <button className="resp-modal-close" onClick={onClose}>×</button>
        </div>
        {request && (
          <div className="resp-modal-body">
            <div className="resp-req-mini">
              <div className="resp-req-blood">{request.blood}</div>
              <div>
                <div className="resp-req-name">{request.patientName}</div>
                <div className="resp-req-hospital">{request.hospital} · {request.city}</div>
              </div>
            </div>
            <div className="resp-note">
              🔒 Blood Circle forwards your details directly to the person who posted this request. Please only respond if you are eligible and available to donate.
            </div>
            <div className="resp-field">
              <label className="resp-label">Your Name <span className="req">*</span></label>
              <input className="resp-input" type="text" placeholder="Full name" />
            </div>
            <div className="resp-field">
              <label className="resp-label">Phone Number <span className="req">*</span></label>
              <input className="resp-input" type="tel" placeholder="+91 00000 00000" />
            </div>
            <div className="resp-field">
              <label className="resp-label">Your Blood Type <span className="req">*</span></label>
              <select className="resp-select">
                <option value="">Select your blood type</option>
                {BLOOD_TYPES.map(bt => <option key={bt}>{bt}</option>)}
              </select>
            </div>
            <div className="resp-field">
              <label className="resp-label">Your Location</label>
              <input className="resp-input" type="text" placeholder="City / Area" />
            </div>
            <div className="resp-field" style={{ marginBottom: 20 }}>
              <label className="resp-label">Message (Optional)</label>
              <textarea className="resp-textarea" placeholder="Let them know your availability, distance, etc..." />
            </div>
            <button
              className={`resp-submit ${submitted ? 'success' : ''}`}
              onClick={handleSubmit}
            >
              {submitted ? (
                <>
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <path d="M3 7.5l3 3 6-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Response Sent! Thank You ❤️
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7h12M7 1l6 6-6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Confirm I Can Donate
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Request Card ────────────────────────────────────────────────────────────
function RequestCard({
  req,
  onRespond,
  onShare,
}: {
  req: EmergencyRequest
  onRespond: (r: EmergencyRequest) => void
  onShare: (r: EmergencyRequest) => void
}) {
  const [responded, setResponded] = useState(false)

  const handleRespond = () => {
    onRespond(req)
  }

  return (
    <div className={`request-card ${req.urgency} reveal`}>
      <div className={`req-urgency-ribbon ${req.urgency}`}>{URGENCY_MAP[req.urgency]}</div>
      <div className="req-card-inner">
        <div className="req-head">
          <div className={`req-blood-badge ${req.blood === 'O−' || req.blood === 'AB−' ? 'rare-bg' : ''}`}>
            <div className="req-blood-pulse"></div>
            {req.blood}
          </div>
          <div className="req-info">
            <div className="req-patient">{req.patientName}</div>
            <div className="req-hospital">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="4" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M6 14V9h4v5M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M8 7v3M6.5 8.5h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              {req.hospital}
            </div>
            <div className="req-location">
              <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                <path d="M8 1.5C5.5 1.5 3.5 3.7 3.5 6.5c0 3.7 4.5 8 4.5 8s4.5-4.3 4.5-8c0-2.8-2-5-4.5-5z" stroke="currentColor" strokeWidth="1.3"/>
                <circle cx="8" cy="6.5" r="1.5" fill="currentColor"/>
              </svg>
              {req.city}, {req.state}
            </div>
          </div>
        </div>

        <div className="req-meta-row">
          <span className="req-meta-chip units-chip">
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M8 2l1.5 4h4l-3.2 2.5 1.2 4L8 10l-3.5 2.5 1.2-4L2.5 6h4z" stroke="currentColor" strokeWidth="1.2"/>
            </svg>
            {req.units} {req.units === 1 ? 'unit' : 'units'} needed
          </span>
          <span className="req-meta-chip">
            <svg viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M8 5v3l2 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            Posted {req.timeAgo}
          </span>
          <span className="req-meta-chip">
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M13 10.5c-1.4 0-2.7-.2-3.9-.6-.3-.1-.7 0-.9.3l-1.2 1.5c-2-1-3.7-2.7-4.7-4.7l1.5-1.3c.3-.2.4-.6.3-.9C3.7 3.7 3.5 2.4 3.5 1c0-.3-.2-.5-.5-.5H1C.7.5.5.7.5 1 .5 9 7 15.5 14.5 15.5c.3 0 .5-.2.5-.5V11c0-.3-.2-.5-.5-.5h-2z" stroke="currentColor" strokeWidth="1.2"/>
            </svg>
            {req.respondedCount} {req.respondedCount === 1 ? 'donor' : 'donors'} responded
          </span>
          {req.isNew && (
            <span className="req-meta-chip" style={{ background: 'rgba(140,31,40,0.07)', color: 'var(--crimson)' }}>
              🔴 New
            </span>
          )}
        </div>

        <p className="req-desc">{req.description}</p>

        <div className="req-footer">
          <span className="req-time">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1112 0A6 6 0 012 8z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
              <path d="M8 5.5v2.75l1.5 1.5" stroke="var(--cream)" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            {req.timeAgo} · Posted by {req.postedBy}
          </span>
          {responded ? (
            <span className="req-responded-badge">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Responded
            </span>
          ) : (
            <button
              className="req-btn-respond"
              onClick={() => { handleRespond(); setResponded(true) }}
            >
              <span>I Can Donate</span>
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M7 1l6 6-6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
          <button className="req-btn-share" onClick={() => onShare(req)} title="Share request">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <circle cx="13" cy="3" r="1.5" stroke="currentColor" strokeWidth="1.3"/>
              <circle cx="3"  cy="8" r="1.5" stroke="currentColor" strokeWidth="1.3"/>
              <circle cx="13" cy="13" r="1.5" stroke="currentColor" strokeWidth="1.3"/>
              <line x1="4.5" y1="7" x2="11.5" y2="4"  stroke="currentColor" strokeWidth="1.2"/>
              <line x1="4.5" y1="9" x2="11.5" y2="12" stroke="currentColor" strokeWidth="1.2"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Page ────────────────────────────────────────────────────────────────────
export default function EmergencyPage() {
  const [requests, setRequests] = useState<EmergencyRequest[]>(SEED_REQUESTS)
  const [btFilter, setBtFilter] = useState('')
  const [urgencyFilter, setUrgencyFilter] = useState<Urgency | ''>('')
  const [sortBy, setSortBy] = useState('newest')
  const [responseTarget, setResponseTarget] = useState<EmergencyRequest | null>(null)
  const [toast, setToast] = useState('')
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)

  // ── Post form state ──
  const [pBlood, setPBlood] = useState('')
  const [pUrgency, setPUrgency] = useState<Urgency | ''>('')
  const [pPatient, setPPatient] = useState('')
  const [pHospital, setPHospital] = useState('')
  const [pCity, setPCity] = useState('')
  const [pState, setPState] = useState('')
  const [pUnits, setPUnits] = useState('1')
  const [pPhone, setPPhone] = useState('')
  const [pName, setPName] = useState('')
  const [pDesc, setPDesc] = useState('')
  const [formErrors, setFormErrors] = useState<Record<string, boolean>>({})

  // ── Filtered / sorted feed ──
  const visibleRequests = requests
    .filter(r => {
      if (btFilter && r.blood !== btFilter) return false
      if (urgencyFilter && r.urgency !== urgencyFilter) return false
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'critical') {
        const order: Record<Urgency, number> = { critical: 0, urgent: 1, moderate: 2 }
        return order[a.urgency] - order[b.urgency]
      }
      if (sortBy === 'responded') return b.respondedCount - a.respondedCount
      return a.id > b.id ? -1 : 1 // newest first
    })

  // ── Toast ──
  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3500)
  }

  // ── Validate & submit post form ──
  const validatePost = () => {
    const errs: Record<string, boolean> = {}
    if (!pBlood) errs.blood = true
    if (!pUrgency) errs.urgency = true
    if (!pPatient.trim()) errs.patient = true
    if (!pHospital.trim()) errs.hospital = true
    if (!pCity.trim()) errs.city = true
    if (!pState) errs.state = true
    if (!pPhone.trim()) errs.phone = true
    if (!pName.trim()) errs.name = true
    setFormErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handlePost = () => {
    if (!validatePost()) return
    setFormSubmitting(true)
    setTimeout(() => {
      const newReq: EmergencyRequest = {
        id: Date.now(),
        blood: pBlood,
        patientName: pPatient,
        hospital: pHospital,
        city: pCity,
        state: pState,
        units: parseInt(pUnits) || 1,
        urgency: pUrgency as Urgency,
        description: pDesc || 'Urgent blood required. Please contact the poster for more details.',
        postedBy: pName,
        phone: pPhone,
        timeAgo: 'Just now',
        respondedCount: 0,
        isNew: true,
      }
      setRequests(prev => [newReq, ...prev])
      setFormSubmitting(false)
      setFormSuccess(true)
      setPBlood(''); setPUrgency(''); setPPatient(''); setPHospital('')
      setPCity(''); setPState(''); setPUnits('1'); setPPhone('')
      setPName(''); setPDesc('')
      showToast('✓ Your emergency request is now live!')
      setTimeout(() => setFormSuccess(false), 3000)
    }, 1600)
  }

  const handleShare = (req: EmergencyRequest) => {
    const text = `🩸 URGENT: ${req.blood} blood needed — ${req.patientName} at ${req.hospital}, ${req.city}. Please help! #BloodCircle`
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
      showToast('Share text copied to clipboard!')
    }
  }

  const criticalCount = requests.filter(r => r.urgency === 'critical').length
  const urgentCount   = requests.filter(r => r.urgency === 'urgent').length

  return (
    <>
      {/* ── HERO ── */}
      <section className="emrg-hero">
        <div className="emrg-hero-pattern">
          <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="emrg-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#8C1F28" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#emrg-grid)"/>
            <circle cx="200" cy="300" r="250" stroke="#8C1F28" strokeWidth="1"/>
            <circle cx="200" cy="300" r="160" stroke="#8C1F28" strokeWidth="1"/>
            <circle cx="200" cy="300" r="80"  stroke="#8C1F28" strokeWidth="1"/>
          </svg>
        </div>
        <div className="emrg-scan-line"></div>

        <div className="emrg-hero-inner">
          <div className="emrg-hero-left reveal">
            <div className="emrg-hero-badge">
              <div className="emrg-live-badge">
                <div className="emrg-live-dot"></div>
                Live Feed
              </div>
              <span className="tag" style={{ color: 'rgba(255,255,255,0.5)', borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)' }}>
                Emergency Board
              </span>
            </div>
            <h1 className="emrg-hero-title">
              Every Minute<br/>
              <em>Counts.</em>
            </h1>
            <p className="emrg-hero-desc">
              Post a blood emergency and reach thousands of verified donors instantly.
              Browse live requests and respond to those who need you most — right now.
            </p>
            <div className="emrg-hero-actions">
              <a href="#post-request" className="btn-emrg-primary">
                <span>Post Emergency Request</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#live-feed" className="btn-emrg-ghost">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3"/>
                  <circle cx="7" cy="7" r="2"   fill="currentColor"/>
                </svg>
                View Live Feed
              </a>
            </div>
          </div>

          {/* Live ticker */}
          <div className="emrg-hero-right reveal">
            <div className="emrg-ticker-label">Recent Requests</div>
            {SEED_REQUESTS.slice(0, 4).map((r, i) => (
              <div key={r.id} className={`emrg-ticker-item ${r.urgency === 'critical' ? 'critical' : ''}`}
                style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="eti-blood">{r.blood}</div>
                <div className="eti-info">
                  <div className="eti-hospital">{r.hospital}</div>
                  <div className="eti-city">{r.city}</div>
                </div>
                <div className="eti-time">{r.timeAgo}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div className="emrg-stats-bar">
          <div className="emrg-stats-inner">
            <div className="emrg-stat">
              <div className="emrg-stat-num">{requests.length}<span>+</span></div>
              <div className="emrg-stat-label">Active Requests</div>
            </div>
            <div className="emrg-stat">
              <div className="emrg-stat-num" style={{ color: '#ff6666' }}>{criticalCount}</div>
              <div className="emrg-stat-label">Critical Right Now</div>
            </div>
            <div className="emrg-stat">
              <div className="emrg-stat-num">{urgentCount}</div>
              <div className="emrg-stat-label">Urgent Within 24h</div>
            </div>
            <div className="emrg-stat">
              <div className="emrg-stat-num">48<span>K+</span></div>
              <div className="emrg-stat-label">Donors on Standby</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN ── */}
      <div className="emrg-main container">

        {/* ── LIVE FEED ── */}
        <div className="emrg-feed-col" id="live-feed">
          <div className="feed-toolbar reveal">
            <div className="feed-toolbar-left">
              <h2 className="feed-title">Live Emergency Feed</h2>
              <p className="feed-subtitle">
                Showing <strong>{visibleRequests.length}</strong> active {visibleRequests.length === 1 ? 'request' : 'requests'} · Updated live
              </p>
            </div>
            <div className="feed-sort">
              <span className="feed-sort-label">Sort</span>
              <select className="feed-sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="newest">Newest First</option>
                <option value="critical">Most Critical</option>
                <option value="responded">Most Responded</option>
              </select>
            </div>
          </div>

          {/* Blood type filter chips */}
          <div className="feed-bt-filters reveal">
            <div>
              <input className="fbt-opt" type="radio" name="fbt" id="fbt-all" value="" checked={btFilter === ''} onChange={() => setBtFilter('')}/>
              <label className="fbt-label" htmlFor="fbt-all" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 700 }}>All Types</label>
            </div>
            {BLOOD_TYPES.map(bt => (
              <div key={bt}>
                <input className="fbt-opt" type="radio" name="fbt" id={`fbt-${bt}`} value={bt} checked={btFilter === bt} onChange={() => setBtFilter(bt)}/>
                <label className="fbt-label" htmlFor={`fbt-${bt}`}>{bt}</label>
              </div>
            ))}
          </div>

          {/* Urgency quick filters */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }} className="reveal">
            {([['', 'All Urgencies'], ['critical', '🔴 Critical'], ['urgent', '🟠 Urgent'], ['moderate', '🟡 Moderate']] as [Urgency | '', string][]).map(([val, label]) => (
              <button
                key={val}
                onClick={() => setUrgencyFilter(val)}
                style={{
                  fontSize: 11.5, fontWeight: 600, letterSpacing: '0.06em',
                  padding: '6px 14px', borderRadius: 2,
                  border: `1.5px solid ${urgencyFilter === val ? 'var(--crimson)' : 'var(--cream-d)'}`,
                  background: urgencyFilter === val ? 'rgba(140,31,40,0.07)' : 'var(--white)',
                  color: urgencyFilter === val ? 'var(--crimson)' : 'var(--ink-mid)',
                  cursor: 'pointer', transition: 'all 0.2s',
                  fontFamily: 'DM Sans, sans-serif',
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Cards */}
          {visibleRequests.length > 0 ? (
            visibleRequests.map(req => (
              <RequestCard
                key={req.id}
                req={req}
                onRespond={setResponseTarget}
                onShare={handleShare}
              />
            ))
          ) : (
            <div className="feed-empty">
              <div className="feed-empty-icon">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M14 3C8 3 3 8 3 14s5 11 11 11 11-5 11-11S20 3 14 3z" stroke="#8C1F28" strokeWidth="1.5"/>
                  <path d="M10 14h8M14 10v8" stroke="#8C1F28" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="feed-empty-title">No Active Requests</div>
              <p className="feed-empty-desc">
                No emergency requests match your current filters. Try clearing the blood type or urgency filter.
              </p>
              <button
                onClick={() => { setBtFilter(''); setUrgencyFilter('') }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '11px 24px', borderRadius: 2,
                  border: '1.5px solid var(--border)', background: 'transparent',
                  color: 'var(--crimson)', fontSize: 13, fontWeight: 500,
                  cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* ── SIDEBAR ── */}
        <aside className="emrg-sidebar">

          {/* Post Form */}
          <div className="post-form-card" id="post-request">
            <div className="pfc-head">
              <div className="pfc-head-tag">Emergency Request</div>
              <div className="pfc-head-title">Need Blood<br/><em>Right Now?</em></div>
            </div>

            {formSuccess ? (
              <div style={{ padding: '40px 28px', textAlign: 'center' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🩸</div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, fontWeight: 600, color: 'var(--ink)', marginBottom: 10 }}>
                  Request is Live!
                </div>
                <p style={{ fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.7, fontWeight: 300 }}>
                  Your emergency has been posted. Matching donors are being notified right now.
                </p>
              </div>
            ) : (
              <div className="pfc-body">
                {/* Blood Type */}
                <div className={`pfc-field ${formErrors.blood ? 'error-field' : ''}`}>
                  <label className="pfc-label">Blood Type Needed <span className="req">*</span></label>
                  <div className="pfc-blood-grid">
                    {BLOOD_TYPES.map(bt => (
                      <div key={bt}>
                        <input className="pfc-bt-opt" type="radio" name="pBlood" id={`pbt-${bt}`}
                          value={bt} checked={pBlood === bt}
                          onChange={() => { setPBlood(bt); setFormErrors(p => ({ ...p, blood: false })) }}/>
                        <label className="pfc-bt-label" htmlFor={`pbt-${bt}`}>
                          <span className="pfc-bt-type">{bt}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className={`pfc-field-error ${formErrors.blood ? 'show' : ''}`}>Select a blood type.</div>
                </div>

                {/* Urgency */}
                <div className="pfc-field">
                  <label className="pfc-label">Urgency Level <span className="req">*</span></label>
                  <div className="pfc-urgency-grid">
                    {([
                      ['critical', 'Critical', 'Need within 4 hours'],
                      ['urgent',   'Urgent',   'Need within 24 hours'],
                      ['moderate', 'Moderate', 'Need within a week'],
                    ] as [Urgency, string, string][]).map(([val, label, sub]) => (
                      <div key={val}>
                        <input className="pfc-urg-opt" type="radio" name="pUrgency" id={`purg-${val}`}
                          value={val} checked={pUrgency === val}
                          onChange={() => { setPUrgency(val); setFormErrors(p => ({ ...p, urgency: false })) }}/>
                        <label className="pfc-urg-label" htmlFor={`purg-${val}`}>
                          <div className="pfc-urg-radio"></div>
                          <div className={`pfc-urg-dot ${val}`}></div>
                          <div className="pfc-urg-text">{label}</div>
                          <div className="pfc-urg-sub">{sub}</div>
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className={`pfc-field-error ${formErrors.urgency ? 'show' : ''}`}>Select urgency level.</div>
                </div>

                {/* Patient name */}
                <div className="pfc-field">
                  <label className="pfc-label" htmlFor="pPatient">Patient Name & Age <span className="req">*</span></label>
                  <input className={`pfc-input ${formErrors.patient ? 'error' : ''}`}
                    id="pPatient" type="text" placeholder="e.g. Ramesh Kumar (45)"
                    value={pPatient} onChange={e => { setPPatient(e.target.value); setFormErrors(p => ({ ...p, patient: false })) }}/>
                  <div className={`pfc-field-error ${formErrors.patient ? 'show' : ''}`}>Enter patient name.</div>
                </div>

                {/* Hospital */}
                <div className="pfc-field">
                  <label className="pfc-label" htmlFor="pHospital">Hospital / Centre <span className="req">*</span></label>
                  <input className={`pfc-input ${formErrors.hospital ? 'error' : ''}`}
                    id="pHospital" type="text" placeholder="Hospital name"
                    value={pHospital} onChange={e => { setPHospital(e.target.value); setFormErrors(p => ({ ...p, hospital: false })) }}/>
                  <div className={`pfc-field-error ${formErrors.hospital ? 'show' : ''}`}>Enter hospital name.</div>
                </div>

                {/* City + State */}
                <div className="pfc-row">
                  <div className="pfc-field" style={{ marginBottom: 0 }}>
                    <label className="pfc-label" htmlFor="pCity">City <span className="req">*</span></label>
                    <input className={`pfc-input ${formErrors.city ? 'error' : ''}`}
                      id="pCity" type="text" placeholder="City"
                      value={pCity} onChange={e => { setPCity(e.target.value); setFormErrors(p => ({ ...p, city: false })) }}/>
                    <div className={`pfc-field-error ${formErrors.city ? 'show' : ''}`}>Enter city.</div>
                  </div>
                  <div className="pfc-field" style={{ marginBottom: 0 }}>
                    <label className="pfc-label" htmlFor="pState">State <span className="req">*</span></label>
                    <select className={`pfc-select ${formErrors.state ? 'error' : ''}`}
                      id="pState" value={pState}
                      onChange={e => { setPState(e.target.value); setFormErrors(p => ({ ...p, state: false })) }}>
                      <option value="">State</option>
                      {STATES.map(s => <option key={s}>{s}</option>)}
                    </select>
                    <div className={`pfc-field-error ${formErrors.state ? 'show' : ''}`}>Select state.</div>
                  </div>
                </div>

                {/* Units + Phone */}
                <div className="pfc-row" style={{ marginTop: 16 }}>
                  <div className="pfc-field" style={{ marginBottom: 0 }}>
                    <label className="pfc-label" htmlFor="pUnits">Units Needed</label>
                    <select className="pfc-select" id="pUnits" value={pUnits} onChange={e => setPUnits(e.target.value)}>
                      {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} unit{n > 1 ? 's' : ''}</option>)}
                    </select>
                  </div>
                  <div className="pfc-field" style={{ marginBottom: 0 }}>
                    <label className="pfc-label" htmlFor="pPhone">Contact Phone <span className="req">*</span></label>
                    <input className={`pfc-input ${formErrors.phone ? 'error' : ''}`}
                      id="pPhone" type="tel" placeholder="+91 XXXXX XXXXX"
                      value={pPhone} onChange={e => { setPPhone(e.target.value); setFormErrors(p => ({ ...p, phone: false })) }}/>
                    <div className={`pfc-field-error ${formErrors.phone ? 'show' : ''}`}>Enter phone.</div>
                  </div>
                </div>

                {/* Poster name */}
                <div className="pfc-field" style={{ marginTop: 16 }}>
                  <label className="pfc-label" htmlFor="pName">Your Name <span className="req">*</span></label>
                  <input className={`pfc-input ${formErrors.name ? 'error' : ''}`}
                    id="pName" type="text" placeholder="Your full name"
                    value={pName} onChange={e => { setPName(e.target.value); setFormErrors(p => ({ ...p, name: false })) }}/>
                  <div className={`pfc-field-error ${formErrors.name ? 'show' : ''}`}>Enter your name.</div>
                </div>

                {/* Description */}
                <div className="pfc-field">
                  <label className="pfc-label" htmlFor="pDesc">Additional Details</label>
                  <textarea className="pfc-textarea" id="pDesc"
                    placeholder="Diagnosis, special requirements, ward number..."
                    value={pDesc} onChange={e => setPDesc(e.target.value)}/>
                </div>

                <button
                  className={`pfc-submit ${formSubmitting ? 'loading' : ''} ${formSuccess ? 'success' : ''}`}
                  onClick={handlePost}
                  disabled={formSubmitting}
                >
                  {formSubmitting ? (
                    <>
                      <svg className="pfc-spinner" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M21 12a9 9 0 11-6.219-8.56"/>
                      </svg>
                      <span>Posting Request…</span>
                    </>
                  ) : (
                    <>
                      <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                        <path d="M8 3v10M3 8h10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      <span>Post Emergency Request</span>
                    </>
                  )}
                </button>
                <p className="pfc-footer-note">
                  Your request will go live instantly and notify matching donors near you.
                </p>
              </div>
            )}
          </div>

          {/* How It Works */}
          <div className="emrg-how-card reveal">
            <div className="ehc-head">
              <div className="ehc-title">How It Works</div>
            </div>
            <div className="ehc-body">
              <div className="ehc-step">
                <div className="ehc-step-num">1</div>
                <div className="ehc-step-text"><strong>Post your request</strong> with blood type, hospital, and urgency. Goes live in seconds.</div>
              </div>
              <div className="ehc-step">
                <div className="ehc-step-num">2</div>
                <div className="ehc-step-text"><strong>Donors are notified</strong> automatically — all matching donors within 25 km get an alert.</div>
              </div>
              <div className="ehc-step">
                <div className="ehc-step-num">3</div>
                <div className="ehc-step-text"><strong>Donors respond</strong> directly. You receive their contact details via our secure channel.</div>
              </div>
              <div className="ehc-step">
                <div className="ehc-step-num">4</div>
                <div className="ehc-step-text"><strong>Coordinate and donate</strong>. The donor visits the hospital at a time that works for both.</div>
              </div>
            </div>
          </div>

          {/* Safety note */}
          <div className="emrg-safety-card reveal">
            <div className="esc-title">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M8 1l6 2.5V8c0 3.5-3 6-6 7C5 14 2 11.5 2 8V3.5L8 1z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
              </svg>
              Platform Safety
            </div>
            <ul className="esc-list">
              <li>All donor responses are reviewed before contact details are shared.</li>
              <li>Requests are verified against hospital records where possible.</li>
              <li>Abuse of the emergency board is taken seriously and results in a ban.</li>
              <li>We do not charge any fees for posting or responding to requests.</li>
            </ul>
          </div>
        </aside>
      </div>

      {/* ── CTA STRIP ── */}
      <div className="emrg-cta-strip">
        <h3>Are You a Donor? <em>Someone Needs You Today.</em></h3>
        <p>Thousands of patients are waiting. If you're eligible to donate, register now and we'll match you with those who need you most.</p>
        <div className="emrg-cta-actions">
          <a href="/become-donor" className="emrg-cta-white">
            <span>Register as Donor</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="/search-donors" className="btn-emrg-ghost">
            <span>Browse All Donors</span>
          </a>
        </div>
      </div>

      {/* ── RESPONSE MODAL ── */}
      <ResponseModal
        request={responseTarget}
        onClose={() => setResponseTarget(null)}
      />

      {/* ── TOAST ── */}
      <div className={`emrg-toast ${toast ? 'show' : ''}`}>
        <span className="emrg-toast-icon">✓</span>
        {toast}
      </div>
    </>
  )
}