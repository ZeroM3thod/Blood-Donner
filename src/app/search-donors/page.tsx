'use client'
import { useState, useRef, useEffect } from 'react'
import './search-donors.css'
// ─── Donor data ───────────────────────────────────────────────────────────────
const DONORS = [
  {
    id: 1, name: 'Rafiqul Islam', initials: 'R', avatar: 'av-crimson',
    location: 'Mirpur, Dhaka', blood: 'O+', avail: 'now',
    state: 'Dhaka', verified: true, gender: 'Male', exp: 'seasoned',
    donations: '14 times', lastDonated: '4 months ago', age: '34', urgent: true,
  },
  {
    id: 2, name: 'Farida Begum', initials: 'F', avatar: 'av-teal',
    location: 'Agrabad, Chattogram', blood: 'A+', avail: 'now',
    state: 'Chattogram', verified: true, gender: 'Female', exp: 'moderate',
    donations: '6 times', lastDonated: '5 months ago', age: '28',
  },
  {
    id: 3, name: 'Aminul Haque', initials: 'A', avatar: 'av-ink',
    location: 'Shaheb Bazar, Rajshahi', blood: 'B−', avail: 'soon',
    state: 'Rajshahi', verified: true, gender: 'Male', exp: 'seasoned',
    donations: '11 times', lastDonated: '3 months ago', age: '31',
  },
  {
    id: 4, name: 'Sumaiya Akter', initials: 'S', avatar: 'av-gold',
    location: 'Jessore Road, Khulna', blood: 'AB+', avail: 'now',
    state: 'Khulna', verified: true, gender: 'Female', exp: 'first',
    donations: '1st time', lastDonated: 'Never', age: '25',
  },
  {
    id: 5, name: 'Moniruzzaman Khan', initials: 'M', avatar: 'av-navy',
    location: 'Zindabazar, Sylhet', blood: 'O−', avail: 'now',
    state: 'Sylhet', verified: true, gender: 'Male', exp: 'seasoned',
    donations: '22 times', lastDonated: '6 months ago', age: '40',
  },
  {
    id: 6, name: 'Nasrin Sultana', initials: 'N', avatar: 'av-crimson',
    location: 'Notun Bazar, Barishal', blood: 'B+', avail: 'soon',
    state: 'Barishal', verified: true, gender: 'Female', exp: 'moderate',
    donations: '4 times', lastDonated: '7 months ago', age: '30',
  },
  {
    id: 7, name: 'Shahadat Hossain', initials: 'S', avatar: 'av-teal',
    location: 'Thanapara, Rajshahi', blood: 'A−', avail: 'now',
    state: 'Rajshahi', verified: true, gender: 'Male', exp: 'seasoned',
    donations: '8 times', lastDonated: '4 months ago', age: '36',
  },
  {
    id: 8, name: 'Habibur Rahman', initials: 'H', avatar: 'av-navy',
    location: 'Chandina, Cumilla', blood: 'AB−', avail: 'soon',
    state: 'Chattogram', verified: true, gender: 'Male', exp: 'moderate',
    donations: '3 times', lastDonated: '8 months ago', age: '29',
  },
  {
    id: 9, name: 'Roksana Parvin', initials: 'R', avatar: 'av-gold',
    location: 'Mymensingh Sadar, Mymensingh', blood: 'O+', avail: 'now',
    state: 'Mymensingh', verified: true, gender: 'Female', exp: 'moderate',
    donations: '5 times', lastDonated: '4 months ago', age: '27',
  },
  {
    id: 10, name: 'Tanvir Ahmed', initials: 'T', avatar: 'av-ink',
    location: 'Uttara, Dhaka', blood: 'A+', avail: 'now',
    state: 'Dhaka', verified: true, gender: 'Male', exp: 'seasoned',
    donations: '9 times', lastDonated: '5 months ago', age: '33',
  },
  {
    id: 11, name: 'Shirin Akter', initials: 'S', avatar: 'av-crimson',
    location: 'Mouchak, Dhaka', blood: 'B+', avail: 'now',
    state: 'Dhaka', verified: true, gender: 'Female', exp: 'first',
    donations: '2 times', lastDonated: '1 year ago', age: '24',
  },
  {
    id: 12, name: 'Zahirul Islam', initials: 'Z', avatar: 'av-navy',
    location: 'Nasirabad, Chattogram', blood: 'O−', avail: 'soon',
    state: 'Chattogram', verified: true, gender: 'Male', exp: 'seasoned',
    donations: '16 times', lastDonated: '3 months ago', age: '38',
  },
]

type Donor = typeof DONORS[0]

// ─── Modal ────────────────────────────────────────────────────────────────────
function ContactModal({
  donor, onClose,
}: {
  donor: Donor | null
  onClose: () => void
}) {
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (donor) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [donor])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const handleSubmit = () => {
    setSubmitted(true)
    setTimeout(() => { setSubmitted(false); onClose() }, 2000)
  }

  return (
    <div
      className={`modal-overlay ${donor ? 'open' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="modal">
        <div className="modal-head">
          <div>
            <div className="modal-title">Contact Donor</div>
            <div className="modal-subtitle">Your message is routed securely — contact details remain private.</div>
          </div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        {donor && (
          <div className="modal-body">
            <div className="modal-donor-card">
              <div className="mdc-avatar">{donor.initials}</div>
              <div>
                <div className="mdc-name">{donor.name}</div>
                <div className="mdc-meta">{donor.location}</div>
              </div>
              <div className="mdc-bt">{donor.blood}</div>
            </div>
            <div className="modal-note">
              🔒 Blood Circle never shares donor phone numbers or addresses. Requests are reviewed and forwarded by our team.
            </div>
            <div className="modal-field-group">
              <label className="modal-field-label">Your Name <span className="req">*</span></label>
              <input className="modal-input" type="text" placeholder="Full name" />
            </div>
            <div className="modal-field-group">
              <label className="modal-field-label">Your Phone <span className="req">*</span></label>
              <input className="modal-input" type="tel" placeholder="+880 01XXX-XXXXXX" />
            </div>
            <div className="modal-field-group">
              <label className="modal-field-label">Urgency Level <span className="req">*</span></label>
              <select className="modal-select">
                <option value="">Select urgency</option>
                <option>Emergency (within 4 hours)</option>
                <option>Urgent (within 24 hours)</option>
                <option>Planned (within a week)</option>
              </select>
            </div>
            <div className="modal-field-group">
              <label className="modal-field-label">Message</label>
              <textarea
                className="modal-textarea"
                placeholder="Briefly describe the need — hospital name, patient condition, location..."
              />
            </div>
            <button
              className="modal-submit"
              onClick={handleSubmit}
              style={submitted ? { background: '#2D7A4A' } : {}}
            >
              {submitted ? (
                <span>✓ Request Sent!</span>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7h12M7 1l6 6-6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Send Request to Donor
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Donor Card ───────────────────────────────────────────────────────────────
function DonorCard({ donor, onContact }: { donor: Donor; onContact: (d: Donor) => void }) {
  const [saved, setSaved] = useState(false)
  const availBadge = donor.avail === 'now'
    ? <span className="d-badge d-badge-avail"><span className="pulse-dot" style={{width:5,height:5,marginRight:4}}></span>Available Now</span>
    : <span className="d-badge d-badge-soon"><span className="pulse-dot orange" style={{width:5,height:5,marginRight:4}}></span>Available Soon</span>

  return (
    <div
      className="donor-card reveal"
      data-blood={donor.blood}
      data-avail={donor.avail}
      data-state={donor.state}
      data-verified={String(donor.verified)}
      data-gender={donor.gender}
      data-exp={donor.exp}
    >
      {donor.urgent && <div className="urgent-tag">Urgent Match</div>}
      <div className="donor-blood-badge">{donor.blood}</div>

      <div className="donor-card-head">
        <div className={`donor-avatar ${donor.avatar}`} style={donor.urgent ? {marginTop:28} : {}}>
          {donor.initials}
          <div className="donor-blood" style={{fontSize: donor.blood.length > 2 ? 6 : undefined}}>
            {donor.blood}
          </div>
        </div>
        <div className="donor-info" style={donor.urgent ? {marginTop:28} : {}}>
          <div className="donor-name">{donor.name}</div>
          <div className="donor-location">
            <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
              <path d="M8 1.5C5.5 1.5 3.5 3.7 3.5 6.5c0 3.7 4.5 8 4.5 8s4.5-4.3 4.5-8c0-2.8-2-5-4.5-5z" stroke="currentColor" strokeWidth="1.3"/>
              <circle cx="8" cy="6.5" r="1.5" fill="currentColor"/>
            </svg>
            {donor.location}
          </div>
          <div className="donor-badges">
            {availBadge}
            {donor.verified && <span className="d-badge d-badge-verify">✓ Verified</span>}
          </div>
        </div>
      </div>

      <div className="donor-card-body">
        <div className="donor-divider"></div>
        <div className="donor-meta-grid">
          <div className="donor-meta-item">
            <div className="dmi-label">Blood Type</div>
            <div className="dmi-val">{donor.blood}</div>
          </div>
          <div className="donor-meta-item">
            <div className="dmi-label">Donations</div>
            <div className="dmi-val">{donor.donations}</div>
          </div>
          <div className="donor-meta-item">
            <div className="dmi-label">Last Donated</div>
            <div className="dmi-val">{donor.lastDonated}</div>
          </div>
          <div className="donor-meta-item">
            <div className="dmi-label">Age / Gender</div>
            <div className="dmi-val">{donor.age} · {donor.gender}</div>
          </div>
        </div>
      </div>

      <div className="donor-card-footer">
        <button className="dc-btn-contact" onClick={() => onContact(donor)}>
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path d="M13 10.5c-1.4 0-2.7-.2-3.9-.6-.3-.1-.7 0-.9.3l-1.2 1.5c-2-1-3.7-2.7-4.7-4.7l1.5-1.3c.3-.2.4-.6.3-.9C3.7 3.7 3.5 2.4 3.5 1c0-.3-.2-.5-.5-.5H1C.7.5.5.7.5 1 .5 9 7 15.5 14.5 15.5c.3 0 .5-.2.5-.5V11c0-.3-.2-.5-.5-.5h-2z" stroke="white" strokeWidth="1.2"/>
          </svg>
          Contact Donor
        </button>
        <button
          className={`dc-btn-save ${saved ? 'saved' : ''}`}
          onClick={() => setSaved(s => !s)}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 13.5S1.5 9.5 1.5 5.5A3.5 3.5 0 018 3a3.5 3.5 0 016.5 2.5C14.5 9.5 8 13.5 8 13.5z" stroke="currentColor" strokeWidth="1.3"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function SearchDonors() {
  const [qsCity, setQsCity]   = useState('')
  const [qsBlood, setQsBlood] = useState('')
  const [qsState, setQsState] = useState('')

  const [btFilter, setBtFilter]         = useState('')
  const [stateFilter, setStateFilter]   = useState('')
  const [genderFilter, setGenderFilter] = useState('')
  const [availNow, setAvailNow]   = useState(true)
  const [availSoon, setAvailSoon] = useState(true)
  const [availLater, setAvailLater] = useState(false)
  const [verifiedOnly, setVerifiedOnly] = useState(true)

  const [activePage, setActivePage] = useState(1)
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const [modalDonor, setModalDonor] = useState<Donor | null>(null)

  // Counter animation
  const cnt1Ref = useRef<HTMLSpanElement>(null)
  const cnt2Ref = useRef<HTMLSpanElement>(null)
  const cnt3Ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const animate = (el: HTMLSpanElement | null, target: number) => {
      if (!el) return
      let start: number | null = null
      const step = (ts: number) => {
        if (!start) start = ts
        const p = Math.min((ts - start) / 2000, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        el.textContent = Math.floor(eased * target).toLocaleString()
        if (p < 1) requestAnimationFrame(step)
        else el.textContent = target.toLocaleString()
      }
      requestAnimationFrame(step)
    }
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        animate(cnt1Ref.current, 12400)
        animate(cnt2Ref.current, 60)
        animate(cnt3Ref.current, 98)
        obs.disconnect()
      }
    }, { threshold: 0.5 })
    if (cnt1Ref.current) obs.observe(cnt1Ref.current)
    return () => obs.disconnect()
  }, [])

  // Filter logic
  const visibleDonors = DONORS.filter(d => {
    if (btFilter && d.blood !== btFilter) return false
    if (stateFilter && d.state !== stateFilter) return false
    if (genderFilter && d.gender !== genderFilter) return false
    if (verifiedOnly && !d.verified) return false
    if (qsBlood && d.blood !== qsBlood) return false
    if (qsState && d.state !== qsState) return false
    if (qsCity && !d.location.toLowerCase().includes(qsCity.toLowerCase())) return false
    const availMatch =
      (availNow && d.avail === 'now') ||
      (availSoon && d.avail === 'soon') ||
      (availLater && d.avail === 'later')
    if (!availMatch) return false
    return true
  })

  const clearFilters = () => {
    setBtFilter(''); setStateFilter(''); setGenderFilter('')
    setAvailNow(true); setAvailSoon(true); setAvailLater(false)
    setVerifiedOnly(true)
    setQsCity(''); setQsBlood(''); setQsState('')
  }

 const BLOOD_TYPES = ['A+', 'A−', 'B+', 'B−', 'AB+', 'AB−', 'O+', 'O−']

const DISTRICTS = [
  // Dhaka Division
  'Dhaka', 'Gazipur', 'Kishoreganj', 'Manikganj', 'Munshiganj', 'Narayanganj', 'Narsingdi', 'Tangail', 'Faridpur', 'Gopalganj', 'Madaripur', 'Rajbari', 'Shariatpur',
  
  // Chattogram Division
  'Chattogram', 'Cox’s Bazar', 'Rangamati', 'Bandarban', 'Khagrachhari', 'Feni', 'Lakshmipur', 'Noakhali', 'Cumilla', 'Brahmanbaria', 'Chandpur',
  
  // Rajshahi Division
  'Rajshahi', 'Sirajganj', 'Pabna', 'Bogura', 'Chapai Nawabganj', 'Naogaon', 'Natore', 'Joypurhat',
  
  // Khulna Division
  'Khulna', 'Bagherhat', 'Sathkhira', 'Jashore', 'Magura', 'Narail', 'Kushtia', 'Chuadanga', 'Meherpur', 'Jhenaidah',
  
  // Barishal Division
  'Barishal', 'Barguna', 'Bhola', 'Jhalokathi', 'Patuakhali', 'Pirojpur',
  
  // Sylhet Division
  'Sylhet', 'Habiganj', 'Moulvibazar', 'Sunamganj',
  
  // Rangpur Division
  'Rangpur', 'Dinajpur', 'Gaibandha', 'Kurigram', 'Lalmonirhat', 'Nilphamari', 'Panchagarh', 'Thakurgaon',
  
  // Mymensingh Division
  'Mymensingh', 'Jamalpur', 'Netrokona', 'Sherpur'
]
  return (
    <>
      {/* ── Hero ── */}
      <section className="search-hero">
        <div className="search-hero-pattern">
          <svg viewBox="0 0 600 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="300" cy="400" r="280" stroke="#8C1F28" strokeWidth="1"/>
            <circle cx="300" cy="400" r="200" stroke="#8C1F28" strokeWidth="1"/>
            <circle cx="300" cy="400" r="120" stroke="#8C1F28" strokeWidth="1"/>
            <circle cx="300" cy="400" r="40"  stroke="#8C1F28" strokeWidth="1"/>
            <line x1="300" y1="0" x2="300" y2="800" stroke="#8C1F28" strokeWidth="0.5"/>
            <line x1="0" y1="400" x2="600" y2="400" stroke="#8C1F28" strokeWidth="0.5"/>
          </svg>
        </div>
        <div className="search-hero-inner">
          <div className="search-hero-left reveal">
            <div className="search-hero-badge"><span className="tag">Verified Donor Network</span></div>
            <h1 className="search-hero-title">
              Find a Donor,<br/><em>Save a Life Today.</em>
            </h1>
            <p className="search-hero-desc">
              Search across thousands of verified blood donors in your area. Filter by blood type, location, and availability — and connect within minutes.
            </p>
            <div className="search-hero-pills">
              <span className="hero-pill">
                <svg viewBox="0 0 16 16" fill="none"><path d="M8 1.5C5.5 1.5 3.5 3.7 3.5 6.5c0 3.7 4.5 8 4.5 8s4.5-4.3 4.5-8c0-2.8-2-5-4.5-5z" stroke="currentColor" strokeWidth="1.3"/><circle cx="8" cy="6.5" r="1.5" fill="currentColor"/></svg>
                All Major Cities
              </span>
              <span className="hero-pill">
                <svg viewBox="0 0 16 16" fill="none"><path d="M8 2a6 6 0 100 12A6 6 0 008 2zm0 0v6l3 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Real-Time Availability
              </span>
              <span className="hero-pill">
                <svg viewBox="0 0 16 16" fill="none"><path d="M13 5l-6 6-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                ID-Verified Donors
              </span>
              <span className="hero-pill">
                <svg viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.3"/><path d="M5 8h6M8 5v6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                All 8 Blood Types
              </span>
            </div>
          </div>

          <div className="search-hero-stats reveal">
            <div className="sh-stat">
              <div className="sh-stat-num"><span ref={cnt1Ref}>0</span><span style={{color:'var(--crimson)'}}>+</span></div>
              <div className="sh-stat-label">Active Donors</div>
            </div>
            <div className="sh-stat">
              <div className="sh-stat-num"><span ref={cnt2Ref}>0</span><span style={{color:'var(--crimson)'}}>+</span></div>
              <div className="sh-stat-label">Cities Covered</div>
            </div>
            <div className="sh-stat">
              <div className="sh-stat-num"><span ref={cnt3Ref}>0</span><span style={{color:'var(--crimson)'}}>%</span></div>
              <div className="sh-stat-label">Verified Profiles</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick Search Bar ── */}
      <div className="quick-search-wrap">
        <div className="quick-search-inner">
          <span className="qs-label">Find Donors</span>
          <div className="qs-divider"></div>
          <div className="qs-field">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M8 1.5C5.5 1.5 3.5 3.7 3.5 6.5c0 3.7 4.5 8 4.5 8s4.5-4.3 4.5-8c0-2.8-2-5-4.5-5z" stroke="currentColor" strokeWidth="1.3"/>
              <circle cx="8" cy="6.5" r="1.5" fill="currentColor"/>
            </svg>
            <input
              className="qs-input" type="text" placeholder="City or area..."
              value={qsCity} onChange={e => setQsCity(e.target.value)}
            />
          </div>
          <div className="qs-divider"></div>
          <div className="qs-field">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M8 5v3l2 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            <select className="qs-select" value={qsBlood} onChange={e => setQsBlood(e.target.value)}>
              <option value="">Any Blood Type</option>
              {BLOOD_TYPES.map(bt => <option key={bt}>{bt}</option>)}
            </select>
          </div>
          <div className="qs-divider"></div>
          <div className="qs-field">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            <select className="qs-select" value={qsState} onChange={e => setQsState(e.target.value)}>
              <option value="">Any State</option>
              {DISTRICTS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <button className="qs-btn">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4"/>
              <path d="M10.5 10.5l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            Search
          </button>
          <div className="qs-results-count">
            Showing <strong>{visibleDonors.length}</strong> donors
          </div>
        </div>
      </div>

      {/* ── Emergency Strip ── */}
      <div className="emergency-strip">
        <div className="emergency-inner">
          <div className="emerg-left">
            <div className="emerg-icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 3v14M3 10h14" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <div className="emerg-text-title">Need Blood Urgently?</div>
              <div className="emerg-text-sub">Post an emergency request and get notified within minutes.</div>
            </div>
          </div>
          <button className="emerg-btn">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Post Emergency Request
          </button>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="search-main">

        {/* ── Filter Sidebar ── */}
        <aside className="filter-sidebar">
          <button
            className="mobile-filter-toggle"
            onClick={() => setMobileFilterOpen(o => !o)}
          >
            <span>
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" style={{display:'inline',verticalAlign:'middle',marginRight:6}}>
                <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              Filters
            </span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{transform: mobileFilterOpen ? 'rotate(180deg)' : ''}}>
              <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className={`filter-panel reveal ${mobileFilterOpen ? 'mobile-open' : ''}`}>
            <div className="filter-head">
              <div className="filter-head-title">Filters</div>
              <button className="filter-clear" onClick={clearFilters}>Clear All</button>
            </div>

            {/* Blood Type */}
            <div className="filter-section">
              <div className="filter-section-title">Blood Type</div>
              <div className="bt-filter-grid">
                <input type="radio" name="btFilter" id="bt-all" value="" className="bt-f-opt"
                  checked={btFilter === ''} onChange={() => setBtFilter('')} />
                <label htmlFor="bt-all" className="bt-f-label">
                  <span className="bt-f-type" style={{fontSize:13,fontFamily:'DM Sans,sans-serif',fontWeight:600}}>All</span>
                </label>
                {BLOOD_TYPES.map(bt => (
                  <div key={bt}>
                    <input type="radio" name="btFilter" id={`bt-${bt}`} value={bt} className="bt-f-opt"
                      checked={btFilter === bt} onChange={() => setBtFilter(bt)} />
                    <label htmlFor={`bt-${bt}`} className="bt-f-label">
                      <span className="bt-f-type">{bt}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* State */}
            <div className="filter-section">
              <div className="filter-section-title">City</div>
              <select className="filter-select" value={stateFilter} onChange={e => setStateFilter(e.target.value)}>
                <option value="">All City</option>
                {DISTRICTS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>

            {/* Availability */}
            <div className="filter-section">
              <div className="filter-section-title">Availability</div>
              <div className="filter-check-list">
                <label className="filter-check-item">
                  <input type="checkbox" checked={availNow} onChange={e => setAvailNow(e.target.checked)} />
                  <div className="fc-box"></div>
                  <span className="fc-label">Available Now</span>
                  <span className="fc-count">8</span>
                </label>
                <label className="filter-check-item">
                  <input type="checkbox" checked={availSoon} onChange={e => setAvailSoon(e.target.checked)} />
                  <div className="fc-box"></div>
                  <span className="fc-label">Available Soon</span>
                  <span className="fc-count">4</span>
                </label>
                <label className="filter-check-item">
                  <input type="checkbox" checked={availLater} onChange={e => setAvailLater(e.target.checked)} />
                  <div className="fc-box"></div>
                  <span className="fc-label">On Request Only</span>
                  <span className="fc-count">12</span>
                </label>
              </div>
            </div>

            {/* Gender */}
            <div className="filter-section">
              <div className="filter-section-title">Gender</div>
              <select className="filter-select" value={genderFilter} onChange={e => setGenderFilter(e.target.value)}>
                <option value="">Any Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            {/* Verification */}
            <div className="filter-section">
              <div className="filter-section-title">Verification</div>
              <label className="filter-check-item">
                <input type="checkbox" checked={verifiedOnly} onChange={e => setVerifiedOnly(e.target.checked)} />
                <div className="fc-box"></div>
                <span className="fc-label">Verified Only</span>
              </label>
            </div>

            <div style={{padding:'16px 24px 20px'}}>
              <button className="filter-apply-btn">Apply Filters</button>
            </div>
          </div>
        </aside>

        {/* ── Results ── */}
        <div className="results-area">
          <div className="results-header reveal">
            <div>
              <h2 className="results-title">Blood Donors</h2>
              <p className="results-subtitle">
                Showing <strong>{visibleDonors.length}</strong> verified donors · Updated just now
              </p>
            </div>
            <div className="results-sort">
              <span className="sort-label">Sort by</span>
              <select className="sort-select">
                <option>Nearest First</option>
                <option>Most Donations</option>
                <option>Recently Active</option>
                <option>Urgency Match</option>
              </select>
            </div>
          </div>

          {/* Active filter chips */}
          <div className="active-filters">
            {verifiedOnly && (
              <div className="af-chip">
                <span>Verified Only</span>
                <button className="af-chip-remove" onClick={() => setVerifiedOnly(false)}>×</button>
              </div>
            )}
            {(availNow || availSoon) && (
              <div className="af-chip">
                <span>Available Now / Soon</span>
                <button className="af-chip-remove" onClick={() => { setAvailNow(false); setAvailSoon(false) }}>×</button>
              </div>
            )}
            {btFilter && (
              <div className="af-chip">
                <span>Blood Type: {btFilter}</span>
                <button className="af-chip-remove" onClick={() => setBtFilter('')}>×</button>
              </div>
            )}
            {stateFilter && (
              <div className="af-chip">
                <span>State: {stateFilter}</span>
                <button className="af-chip-remove" onClick={() => setStateFilter('')}>×</button>
              </div>
            )}
          </div>

          {/* Donor Grid */}
          <div className="donors-grid">
            {visibleDonors.map(donor => (
              <DonorCard key={donor.id} donor={donor} onContact={setModalDonor} />
            ))}

            {visibleDonors.length === 0 && (
              <div className="no-results show">
                <div className="no-results-icon">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <circle cx="13" cy="13" r="8" stroke="#8C1F28" strokeWidth="1.5"/>
                    <path d="M20 20l5 5" stroke="#8C1F28" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M10 13h6M13 10v6" stroke="#8C1F28" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="no-results-title">No Donors Found</div>
                <p className="no-results-desc">
                  No donors match your current filters. Try broadening your search criteria or clearing some filters.
                </p>
                <button className="btn btn-ghost" onClick={clearFilters} style={{margin:'0 auto',display:'inline-flex'}}>
                  <span>Clear All Filters</span>
                </button>
              </div>
            )}
          </div>

          {/* Pagination */}
          {visibleDonors.length > 0 && (
            <div className="pagination">
              <button className="page-btn">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M7 2L3 6l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {[1,2,3].map(p => (
                <button key={p} className={`page-btn ${activePage === p ? 'active' : ''}`} onClick={() => setActivePage(p)}>
                  {p}
                </button>
              ))}
              <span className="page-dots">···</span>
              <button className="page-btn" onClick={() => setActivePage(12)}>12</button>
              <button className="page-btn">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M5 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── CTA Banner ── */}
      <section className="search-cta-banner">
        <div className="search-cta-inner reveal">
          <span className="tag">Join the Circle</span>
          <h2 className="search-cta-title">One Pint. <em>Three Lives.</em><br/>Your Call.</h2>
          <p className="search-cta-desc">
            Hundreds of patients search for donors every single day. The decision to register takes two minutes. The impact lasts forever.
          </p>
          <div className="cta-actions">
            <a href="/become-donor" className="btn-cta-white">
              <span>Register as Donor</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#" className="btn" style={{background:'rgba(255,255,255,0.1)',color:'white',border:'1px solid rgba(255,255,255,0.3)'}}>
              <span>Post Emergency Request</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Contact Modal ── */}
      <ContactModal donor={modalDonor} onClose={() => setModalDonor(null)} />
    </>
  )
}
