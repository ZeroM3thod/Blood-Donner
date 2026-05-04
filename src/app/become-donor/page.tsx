'use client'

import { useEffect, useRef, useState } from 'react'
import './become-donor.css'

export default function BecomeDonor() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    weight: '',
    bloodType: '',
    idType: '',
    idNumber: '',
    email: '',
    phone: '',
    whatsapp: '',
    altPhone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    emergencyName: '',
    emergencyPhone: '',
    emergencyRelation: '',
    lastDonated: '',
    totalDonations: '',
    availability: '',
    frequency: '',
    donationType: '',
    travelDistance: '5',
    preferredTime: 'any',
    availNotes: '',
    medNotes: '',
    medications: '',
    idUpload: null as File | null,
    profilePhoto: null as File | null,
  })

  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [donorId, setDonorId] = useState('')

  const navRef = useRef<HTMLElement>(null)
  const navToggleRef = useRef<HTMLButtonElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const uploadZoneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // ── Page Loader
    const loader = document.getElementById('page-loader')
    if (loader) {
      setTimeout(() => loader.classList.add('hidden'), 1400)
    }

    // ── Custom Cursor
    const dot = document.getElementById('cursor-dot')
    const ring = document.getElementById('cursor-ring')
    let mx = -100, my = -100, rx = -100, ry = -100
    
    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      if (dot) {
        dot.style.left = mx + 'px'; dot.style.top = my + 'px'
      }
    }
    document.addEventListener('mousemove', handleMouseMove)

    let animationFrameId: number
    const animateRing = () => {
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12
      if (ring) {
        ring.style.left = rx + 'px'; ring.style.top = ry + 'px'
      }
      animationFrameId = requestAnimationFrame(animateRing)
    }
    animateRing()

    const handleMouseEnter = () => document.body.classList.add('cursor-hover')
    const handleMouseLeave = () => document.body.classList.remove('cursor-hover')

    const hoverElements = document.querySelectorAll('a, button, label, .bt-label, .avail-label, .cond-label')
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    // ── Nav Scroll
    const handleScroll = () => {
      if (navRef.current) {
        navRef.current.classList.toggle('scrolled', window.scrollY > 40)
      }
    }
    window.addEventListener('scroll', handleScroll)

    // ── Scroll Reveal
    const reveals = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80)
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
    reveals.forEach(r => observer.observe(r))

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('scroll', handleScroll)
      hoverElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value, name, type } = e.target as HTMLInputElement
    if (type === 'radio') {
      setFormData(prev => ({ ...prev, [name]: value }))
    } else {
      setFormData(prev => ({ ...prev, [id]: value }))
    }
    // Clear error when user types
    if (errors[id || name]) {
      setErrors(prev => ({ ...prev, [id || name]: false }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, files } = e.target
    if (files && files[0]) {
      setFormData(prev => ({ ...prev, [id]: files[0] }))
      setErrors(prev => ({ ...prev, [id]: false }))
    }
  }

  const validateStep = (n: number) => {
    const newErrors: Record<string, boolean> = {}
    let isValid = true

    if (n === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = true
      if (!formData.lastName.trim()) newErrors.lastName = true
      if (!formData.dob) {
        newErrors.dob = true
      } else {
        const age = (new Date().getTime() - new Date(formData.dob).getTime()) / (365.25 * 24 * 3600 * 1000)
        if (age < 18 || age > 65) newErrors.dob = true
      }
      if (!formData.gender) newErrors.gender = true
      if (!formData.weight || parseInt(formData.weight) < 45) newErrors.weight = true
      if (!formData.bloodType) newErrors.bloodType = true
      if (!formData.idType) newErrors.idType = true
      if (!formData.idNumber.trim()) newErrors.idNumber = true
    } else if (n === 2) {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRe.test(formData.email)) newErrors.email = true
      if (!formData.phone.trim()) newErrors.phone = true
      if (!formData.address.trim()) newErrors.address = true
      if (!formData.city.trim()) newErrors.city = true
      if (!formData.state) newErrors.state = true
      if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = true
      if (!formData.emergencyName.trim()) newErrors.emergencyName = true
      if (!formData.emergencyPhone.trim()) newErrors.emergencyPhone = true
      if (!formData.emergencyRelation) newErrors.emergencyRelation = true
    } else if (n === 4) {
      if (!formData.availability) newErrors.availability = true
      if (!formData.frequency) newErrors.frequency = true
    } else if (n === 5) {
      if (!formData.idUpload) newErrors.idUpload = true
      // Checkboxes are handled by DOM in the original but we should use state
      const consentInfo = (document.getElementById('consentInfo') as HTMLInputElement)?.checked
      const consentShare = (document.getElementById('consentShare') as HTMLInputElement)?.checked
      const consentHealth = (document.getElementById('consentHealth') as HTMLInputElement)?.checked
      const consentTerms = (document.getElementById('consentTerms') as HTMLInputElement)?.checked
      
      if (!consentInfo || !consentShare || !consentHealth || !consentTerms) {
        newErrors.consent = true
      }
    }

    setErrors(newErrors)
    isValid = Object.keys(newErrors).length === 0
    return isValid
  }

  const goNext = (n: number) => {
    if (validateStep(n)) {
      setCurrentStep(n + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const goPrev = (n: number) => {
    setCurrentStep(n - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const submitForm = () => {
    if (validateStep(5)) {
      const btn = document.getElementById('submitBtn')
      if (btn) {
        btn.innerHTML = '<span>Submitting...</span>'
        btn.style.opacity = '0.7'
      }

      setTimeout(() => {
        const id = 'BC-2025-' + Math.floor(10000 + Math.random() * 90000)
        setDonorId(id)
        setIsSubmitted(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 1800)
    }
  }

  const toggleMobileMenu = () => {
    if (navToggleRef.current && mobileMenuRef.current) {
      navToggleRef.current.classList.toggle('open')
      mobileMenuRef.current.classList.toggle('open')
    }
  }

  return (
    <div className="donor-page">
      {/* Page Loader */}
      <div id="page-loader">
        <div className="loader-content">
          <div className="loader-logo">Blood<span>Circle</span></div>
          <div className="loader-bar-wrap"><div className="loader-bar"></div></div>
        </div>
      </div>

      {/* Custom Cursor */}
      <div id="cursor-dot"></div>
      <div id="cursor-ring"></div>

      {/* ── NAVIGATION ── */}
      <nav id="main-nav" ref={navRef}>
        <div className="nav-inner">
          <a href="/" className="logo">
            <div className="logo-mark"></div>
            <div className="logo-text">
              <span className="logo-name">Blood<span>Circle</span></span>
              <span className="logo-tagline">Life · Humanity · Hope</span>
            </div>
          </a>
          <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="#">How It Works</a></li>
            <li><a href="#">Our Mission</a></li>
            <li><a href="#">Find Donors</a></li>
            <li><a href="#">About</a></li>
          </ul>
          <div className="nav-cta">
            <a href="#" className="btn btn-ghost"><span>Sign In</span></a>
            <a href="/become-donor" className="btn btn-primary">
              <span>Become a Donor</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
          <button className="nav-toggle" id="navToggle" aria-label="Menu" ref={navToggleRef} onClick={toggleMobileMenu}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className="mobile-menu" id="mobileMenu" ref={mobileMenuRef}>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="#">How It Works</a></li>
          <li><a href="#">Our Mission</a></li>
          <li><a href="#">Find Donors</a></li>
          <li><a href="#">About</a></li>
        </ul>
        <div className="mobile-btns">
          <a href="#" className="btn btn-outline"><span>Sign In</span></a>
          <a href="/become-donor" className="btn btn-primary">
            <span>Become a Donor</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>
      </div>

      {/* ── PAGE HERO ── */}
      <div className="reg-hero">
        <div className="reg-hero-pattern">
          <svg viewBox="0 0 600 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="#8C1F28" strokeWidth="1"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#grid)"/>
            <circle cx="300" cy="250" r="200" fill="none" stroke="#8C1F28" strokeWidth="1"/>
            <circle cx="300" cy="250" r="130" fill="none" stroke="#8C1F28" strokeWidth="1"/>
          </svg>
        </div>
        <div className="reg-hero-inner">
          <div className="reg-hero-left reveal">
            <div className="reg-hero-badge"><span className="tag">Donor Registration</span></div>
            <h1 className="reg-hero-title">
              Join the Circle.<br/>
              <em>Save a Life.</em>
            </h1>
            <p className="reg-hero-desc">
              Complete your donor profile in under 5 minutes. Your details are safe, private, and only shared with verified recipients in genuine emergencies.
            </p>
            <div className="reg-hero-pills">
              <span className="reg-pill">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Verified & Secure
              </span>
              <span className="reg-pill">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                5 Min Setup
              </span>
              <span className="reg-pill">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                48,200+ Donors
              </span>
              <span className="reg-pill">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                Free Forever
              </span>
            </div>
          </div>
          <div className="reg-hero-right reveal">
            <div className="reg-step-indicators">
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} className="rsi-item">
                  <div className={`rsi-bar ${currentStep === s ? 'active' : currentStep > s ? 'done' : ''}`}></div>
                  <div className="rsi-num">0{s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── PROGRESS BAR ── */}
      {!isSubmitted && (
        <div className="reg-progress-wrap" id="progressWrap">
          <div className="reg-progress" id="progressBar">
            {[
              { n: 1, l: 'Personal Info' },
              { n: 2, l: 'Contact Details' },
              { n: 3, l: 'Medical History' },
              { n: 4, l: 'Availability' },
              { n: 5, l: 'Verification' }
            ].map((s, i) => (
              <div key={s.n} style={{ display: 'flex', alignItems: 'center' }}>
                <div className={`prog-step ${currentStep === s.n ? 'active' : currentStep > s.n ? 'done' : ''}`} data-step={s.n}>
                  <div className="prog-step-num"><span className="step-n">{s.n}</span></div>
                  <div className="prog-step-label">{s.l}</div>
                </div>
                {i < 4 && <div className="prog-connector"></div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      <div className="reg-main container">

        {/* ── FORM PANEL ── */}
        <div className="form-panel" id="formPanel">
          {!isSubmitted ? (
            <>
              {/* ── STEP 1: Personal Info ── */}
              <div className={`form-section ${currentStep === 1 ? 'active' : ''}`} id="step1">
                <div className="section-head">
                  <div className="section-head-tag"><span className="tag">Step 01 of 05</span></div>
                  <h2 className="section-head-title">Personal <em>Information</em></h2>
                  <p className="section-head-desc">Tell us about yourself. This information helps recipients find compatible donors quickly during emergencies.</p>
                </div>
                <div className="form-body">
                  <div className="field-row">
                    <div className="field-group">
                      <label className="field-label" htmlFor="firstName">First Name <span className="req">*</span></label>
                      <input className={`field-input ${errors.firstName ? 'error' : ''}`} type="text" id="firstName" placeholder="Aryan" value={formData.firstName} onChange={handleInputChange} />
                      <span className={`field-error ${errors.firstName ? 'show' : ''}`}>Please enter your first name.</span>
                    </div>
                    <div className="field-group">
                      <label className="field-label" htmlFor="lastName">Last Name <span className="req">*</span></label>
                      <input className={`field-input ${errors.lastName ? 'error' : ''}`} type="text" id="lastName" placeholder="Mehta" value={formData.lastName} onChange={handleInputChange} />
                      <span className={`field-error ${errors.lastName ? 'show' : ''}`}>Please enter your last name.</span>
                    </div>
                  </div>

                  <div className="field-row three">
                    <div className="field-group">
                      <label className="field-label" htmlFor="dob">Date of Birth <span className="req">*</span></label>
                      <input className={`field-input ${errors.dob ? 'error' : ''}`} type="date" id="dob" value={formData.dob} onChange={handleInputChange} />
                      <span className={`field-error ${errors.dob ? 'show' : ''}`}>Must be 18–65 years old.</span>
                    </div>
                    <div className="field-group">
                      <label className="field-label" htmlFor="gender">Gender <span className="req">*</span></label>
                      <select className={`field-select ${errors.gender ? 'error' : ''}`} id="gender" value={formData.gender} onChange={handleInputChange}>
                        <option value="">Select gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Non-binary</option>
                        <option>Prefer not to say</option>
                      </select>
                      <span className={`field-error ${errors.gender ? 'show' : ''}`}>Please select your gender.</span>
                    </div>
                    <div className="field-group">
                      <label className="field-label" htmlFor="weight">Weight (kg) <span className="req">*</span></label>
                      <input className={`field-input ${errors.weight ? 'error' : ''}`} type="number" id="weight" placeholder="70" value={formData.weight} onChange={handleInputChange} />
                      <div className="field-hint">Minimum 45 kg required to donate</div>
                      <span className={`field-error ${errors.weight ? 'show' : ''}`}>Minimum weight is 45 kg.</span>
                    </div>
                  </div>

                  <div className="field-divider">
                    <div className="field-divider-line"></div>
                    <div className="field-divider-text">Blood Type</div>
                    <div className="field-divider-line"></div>
                  </div>

                  <div className="field-group">
                    <label className="field-label">Your Blood Group <span className="req">*</span></label>
                    <div className="blood-type-grid">
                      {['A+', 'A−', 'B+', 'B−', 'AB+', 'AB−', 'O+', 'O−'].map((type) => (
                        <div key={type}>
                          <input 
                            className="bt-option" 
                            type="radio" 
                            name="bloodType" 
                            id={`bt${type.replace('+', 'Pos').replace('−', 'Neg')}`} 
                            value={type} 
                            checked={formData.bloodType === type}
                            onChange={handleInputChange}
                          />
                          <label className="bt-label" htmlFor={`bt${type.replace('+', 'Pos').replace('−', 'Neg')}`}>
                            <span className="bt-label-type">{type}</span>
                            <span className="bt-label-sub">{type.includes('+') ? 'Pos' : 'Neg'}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                    <span className={`field-error ${errors.bloodType ? 'show' : ''}`}>Please select your blood group.</span>
                  </div>

                  <div className="field-divider" style={{marginTop: '28px'}}>
                    <div className="field-divider-line"></div>
                    <div className="field-divider-text">Government ID</div>
                    <div className="field-divider-line"></div>
                  </div>

                  <div className="field-row">
                    <div className="field-group">
                      <label className="field-label" htmlFor="idType">ID Type <span className="req">*</span></label>
                      <select className={`field-select ${errors.idType ? 'error' : ''}`} id="idType" value={formData.idType} onChange={handleInputChange}>
                        <option value="">Select ID type</option>
                        <option>Aadhaar Card</option>
                        <option>PAN Card</option>
                        <option>Voter ID</option>
                        <option>Passport</option>
                        <option>Driving Licence</option>
                      </select>
                      <span className={`field-error ${errors.idType ? 'show' : ''}`}>Please select an ID type.</span>
                    </div>
                    <div className="field-group">
                      <label className="field-label" htmlFor="idNumber">ID Number <span className="req">*</span></label>
                      <input className={`field-input ${errors.idNumber ? 'error' : ''}`} type="text" id="idNumber" placeholder="XXXX XXXX XXXX" value={formData.idNumber} onChange={handleInputChange} />
                      <div className="field-hint">Used for identity verification only</div>
                      <span className={`field-error ${errors.idNumber ? 'show' : ''}`}>Please enter a valid ID number.</span>
                    </div>
                  </div>
                </div>
                <div className="form-actions">
                  <div className="form-actions-left">
                    <span className="step-counter">Step <strong>1</strong> of 5</span>
                  </div>
                  <button className="btn-next" onClick={() => goNext(1)}>
                    <span>Continue</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
              </div>

              {/* ── STEP 2: Contact Details ── */}
              <div className={`form-section ${currentStep === 2 ? 'active' : ''}`} id="step2">
                <div className="section-head">
                  <div className="section-head-tag"><span className="tag">Step 02 of 05</span></div>
                  <h2 className="section-head-title">Contact <em>Details</em></h2>
                  <p className="section-head-desc">Your contact details are never publicly visible. They're only shared with verified recipients through our secure messaging layer.</p>
                </div>
                <div className="form-body">
                  <div className="field-row">
                    <div className="field-group">
                      <label className="field-label" htmlFor="email">Email Address <span className="req">*</span></label>
                      <input className={`field-input ${errors.email ? 'error' : ''}`} type="email" id="email" placeholder="aryan@example.com" value={formData.email} onChange={handleInputChange} />
                      <span className={`field-error ${errors.email ? 'show' : ''}`}>Please enter a valid email address.</span>
                    </div>
                    <div className="field-group">
                      <label className="field-label" htmlFor="phone">Phone Number <span className="req">*</span></label>
                      <input className={`field-input ${errors.phone ? 'error' : ''}`} type="tel" id="phone" placeholder="+91 98765 43210" value={formData.phone} onChange={handleInputChange} />
                      <span className={`field-error ${errors.phone ? 'show' : ''}`}>Please enter a valid phone number.</span>
                    </div>
                  </div>

                  <div className="field-row">
                    <div className="field-group">
                      <label className="field-label" htmlFor="whatsapp">WhatsApp Number</label>
                      <input className="field-input" type="tel" id="whatsapp" placeholder="Same as phone number" value={formData.whatsapp} onChange={handleInputChange} />
                      <div className="field-hint">Leave blank if same as phone</div>
                    </div>
                    <div className="field-group">
                      <label className="field-label" htmlFor="altPhone">Alternate Contact</label>
                      <input className="field-input" type="tel" id="altPhone" placeholder="+91 XXXXX XXXXX" value={formData.altPhone} onChange={handleInputChange} />
                    </div>
                  </div>

                  <div className="field-divider">
                    <div className="field-divider-line"></div>
                    <div className="field-divider-text">Address</div>
                    <div className="field-divider-line"></div>
                  </div>

                  <div className="field-row full">
                    <div className="field-group">
                      <label className="field-label" htmlFor="address">Street Address <span className="req">*</span></label>
                      <input className={`field-input ${errors.address ? 'error' : ''}`} type="text" id="address" placeholder="House No., Street, Area" value={formData.address} onChange={handleInputChange} />
                      <span className={`field-error ${errors.address ? 'show' : ''}`}>Please enter your address.</span>
                    </div>
                  </div>

                  <div className="field-row three">
                    <div className="field-group">
                      <label className="field-label" htmlFor="city">City <span className="req">*</span></label>
                      <input className={`field-input ${errors.city ? 'error' : ''}`} type="text" id="city" placeholder="Mumbai" value={formData.city} onChange={handleInputChange} />
                      <span className={`field-error ${errors.city ? 'show' : ''}`}>Please enter your city.</span>
                    </div>
                    <div className="field-group">
                      <label className="field-label" htmlFor="state">State <span className="req">*</span></label>
                      <select className={`field-select ${errors.state ? 'error' : ''}`} id="state" value={formData.state} onChange={handleInputChange}>
                        <option value="">Select state</option>
                        {['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Chandigarh', 'Puducherry'].map(s => <option key={s}>{s}</option>)}
                      </select>
                      <span className={`field-error ${errors.state ? 'show' : ''}`}>Please select your state.</span>
                    </div>
                    <div className="field-group">
                      <label className="field-label" htmlFor="pincode">Pincode <span className="req">*</span></label>
                      <input className={`field-input ${errors.pincode ? 'error' : ''}`} type="text" id="pincode" placeholder="400001" maxLength={6} value={formData.pincode} onChange={handleInputChange} />
                      <span className={`field-error ${errors.pincode ? 'show' : ''}`}>Enter a valid 6-digit pincode.</span>
                    </div>
                  </div>

                  <div className="field-divider">
                    <div className="field-divider-line"></div>
                    <div className="field-divider-text">Emergency Contact</div>
                    <div className="field-divider-line"></div>
                  </div>

                  <div className="field-row">
                    <div className="field-group">
                      <label className="field-label" htmlFor="emergencyName">Contact Name <span className="req">*</span></label>
                      <input className={`field-input ${errors.emergencyName ? 'error' : ''}`} type="text" id="emergencyName" placeholder="Full name" value={formData.emergencyName} onChange={handleInputChange} />
                      <span className={`field-error ${errors.emergencyName ? 'show' : ''}`}>Please enter emergency contact name.</span>
                    </div>
                    <div className="field-group">
                      <label className="field-label" htmlFor="emergencyPhone">Contact Phone <span className="req">*</span></label>
                      <input className={`field-input ${errors.emergencyPhone ? 'error' : ''}`} type="tel" id="emergencyPhone" placeholder="+91 XXXXX XXXXX" value={formData.emergencyPhone} onChange={handleInputChange} />
                      <span className={`field-error ${errors.emergencyPhone ? 'show' : ''}`}>Please enter emergency contact phone.</span>
                    </div>
                  </div>

                  <div className="field-row">
                    <div className="field-group">
                      <label className="field-label" htmlFor="emergencyRelation">Relationship <span className="req">*</span></label>
                      <select className={`field-select ${errors.emergencyRelation ? 'error' : ''}`} id="emergencyRelation" value={formData.emergencyRelation} onChange={handleInputChange}>
                        <option value="">Select relationship</option>
                        <option>Spouse / Partner</option>
                        <option>Parent</option>
                        <option>Sibling</option>
                        <option>Child</option>
                        <option>Friend</option>
                        <option>Colleague</option>
                        <option>Other</option>
                      </select>
                      <span className={`field-error ${errors.emergencyRelation ? 'show' : ''}`}>Please select a relationship.</span>
                    </div>
                  </div>
                </div>
                <div className="form-actions">
                  <div className="form-actions-left">
                    <button className="btn-back" onClick={() => goPrev(2)}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M13 7H1M7 1L1 7l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      Back
                    </button>
                    <span className="step-counter">Step <strong>2</strong> of 5</span>
                  </div>
                  <button className="btn-next" onClick={() => goNext(2)}>
                    <span>Continue</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
              </div>

              {/* ── STEP 3: Medical History ── */}
              <div className={`form-section ${currentStep === 3 ? 'active' : ''}`} id="step3">
                <div className="section-head">
                  <div className="section-head-tag"><span className="tag">Step 03 of 05</span></div>
                  <h2 className="section-head-title">Medical <em>History</em></h2>
                  <p className="section-head-desc">Accurate medical information ensures safe donations for both you and the recipient. All data is kept strictly confidential.</p>
                </div>
                <div className="form-body">
                  <div className="field-row">
                    <div className="field-group">
                      <label className="field-label" htmlFor="lastDonated">Last Donation Date</label>
                      <input className="field-input" type="date" id="lastDonated" value={formData.lastDonated} onChange={handleInputChange} />
                      <div className="field-hint">Leave blank if you've never donated before</div>
                    </div>
                    <div className="field-group">
                      <label className="field-label" htmlFor="totalDonations">Total Past Donations</label>
                      <select className="field-select" id="totalDonations" value={formData.totalDonations} onChange={handleInputChange}>
                        <option value="">Select range</option>
                        <option value="0">First time donor</option>
                        <option value="1-5">1 – 5 times</option>
                        <option value="6-10">6 – 10 times</option>
                        <option value="11-20">11 – 20 times</option>
                        <option value="20+">More than 20 times</option>
                      </select>
                    </div>
                  </div>

                  <div className="field-divider">
                    <div className="field-divider-line"></div>
                    <div className="field-divider-text">Current Health Status</div>
                    <div className="field-divider-line"></div>
                  </div>

                  <div className="field-group" style={{marginBottom: '20px'}}>
                    <label className="field-label">Pre-existing Conditions <span style={{fontWeight: 300, fontSize: '11px', letterSpacing: 0, textTransform: 'none', color: 'var(--ink-soft)'}}>(select all that apply)</span></label>
                    <div className="condition-tags">
                      {[
                        { id: 'cNone', l: 'None', v: 'none' },
                        { id: 'cDiab', l: 'Diabetes', v: 'diabetes' },
                        { id: 'cHyper', l: 'Hypertension', v: 'hypertension' },
                        { id: 'cAsthma', l: 'Asthma', v: 'asthma' },
                        { id: 'cHeart', l: 'Heart Disease', v: 'heart' },
                        { id: 'cThyroid', l: 'Thyroid', v: 'thyroid' },
                        { id: 'cAnemia', l: 'Anemia', v: 'anemia' },
                        { id: 'cOther', l: 'Other', v: 'other' }
                      ].map(c => (
                        <div key={c.id}>
                          <input className="cond-option" type="checkbox" id={c.id} name="cond" value={c.v} />
                          <label className="cond-label" htmlFor={c.id}>{c.l}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="field-row full">
                    <div className="field-group">
                      <label className="field-label" htmlFor="medications">Current Medications</label>
                      <input className="field-input" type="text" id="medications" placeholder="e.g., Metformin 500mg, Atorvastatin 10mg, or None" value={formData.medications} onChange={handleInputChange} />
                      <div className="field-hint">List any regular medications. Certain medications may temporarily defer donation.</div>
                    </div>
                  </div>

                  <div className="field-row full">
                    <div className="field-group">
                      <label className="field-label" htmlFor="medNotes">Additional Medical Notes</label>
                      <textarea className="field-textarea" id="medNotes" placeholder="Any other relevant medical information, allergies, or special conditions we should know about..." value={formData.medNotes} onChange={handleInputChange}></textarea>
                    </div>
                  </div>
                </div>
                <div className="form-actions">
                  <div className="form-actions-left">
                    <button className="btn-back" onClick={() => goPrev(3)}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M13 7H1M7 1L1 7l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      Back
                    </button>
                    <span className="step-counter">Step <strong>3</strong> of 5</span>
                  </div>
                  <button className="btn-next" onClick={() => goNext(3)}>
                    <span>Continue</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
              </div>

              {/* ── STEP 4: Availability ── */}
              <div className={`form-section ${currentStep === 4 ? 'active' : ''}`} id="step4">
                <div className="section-head">
                  <div className="section-head-tag"><span className="tag">Step 04 of 05</span></div>
                  <h2 className="section-head-title">Donation <em>Availability</em></h2>
                  <p className="section-head-desc">Let recipients know when and how often you're willing to donate. You can update this any time from your profile.</p>
                </div>
                <div className="form-body">
                  <div className="field-group" style={{marginBottom: '24px'}}>
                    <label className="field-label">Current Availability Status <span className="req">*</span></label>
                    <div className="avail-grid">
                      {[
                        { id: 'avImmediate', v: 'immediate', t: 'Available Immediately', s: 'Ready to donate within 24 hours of a request' },
                        { id: 'avWeek', v: 'within_week', t: 'Within a Week', s: 'Can arrange within 2–7 days of request' },
                        { id: 'avScheduled', v: 'scheduled', t: 'Scheduled Only', s: 'Prefer advance notice, appointments only' },
                        { id: 'avUnavailable', v: 'unavailable', t: 'Currently Unavailable', s: 'Register now, activate profile later' }
                      ].map(a => (
                        <div key={a.id}>
                          <input className="avail-option" type="radio" name="availability" id={a.id} value={a.v} checked={formData.availability === a.v} onChange={handleInputChange} />
                          <label className="avail-label" htmlFor={a.id}>
                            <div className="avail-radio"></div>
                            <div>
                              <div className="avail-text-title">{a.t}</div>
                              <div className="avail-text-sub">{a.s}</div>
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>
                    <span className={`field-error ${errors.availability ? 'show' : ''}`}>Please select your availability.</span>
                  </div>

                  <div className="field-row">
                    <div className="field-group">
                      <label className="field-label" htmlFor="frequency">Donation Frequency <span className="req">*</span></label>
                      <select className={`field-select ${errors.frequency ? 'error' : ''}`} id="frequency" value={formData.frequency} onChange={handleInputChange}>
                        <option value="">How often are you willing to donate?</option>
                        <option value="3months">Every 3 months (recommended)</option>
                        <option value="6months">Every 6 months</option>
                        <option value="yearly">Once a year</option>
                        <option value="emergency">Emergency only</option>
                      </select>
                      <div className="field-hint">Whole blood can safely be donated every 3 months</div>
                      <span className={`field-error ${errors.frequency ? 'show' : ''}`}>Please select donation frequency.</span>
                    </div>
                    <div className="field-group">
                      <label className="field-label" htmlFor="donationType">Donation Type</label>
                      <select className="field-select" id="donationType" value={formData.donationType} onChange={handleInputChange}>
                        <option value="">Select preference</option>
                        <option value="whole">Whole Blood</option>
                        <option value="plasma">Plasma</option>
                        <option value="platelets">Platelets</option>
                        <option value="any">Any / No Preference</option>
                      </select>
                    </div>
                  </div>

                  <div className="field-divider">
                    <div className="field-divider-line"></div>
                    <div className="field-divider-text">Travel & Preferences</div>
                    <div className="field-divider-line"></div>
                  </div>

                  <div className="field-row">
                    <div className="field-group">
                      <label className="field-label" htmlFor="travelDistance">Willing to Travel</label>
                      <select className="field-select" id="travelDistance" value={formData.travelDistance} onChange={handleInputChange}>
                        <option value="5">Within 5 km</option>
                        <option value="10">Within 10 km</option>
                        <option value="25">Within 25 km</option>
                        <option value="50">Within 50 km</option>
                        <option value="any">Any distance</option>
                      </select>
                    </div>
                    <div className="field-group">
                      <label className="field-label" htmlFor="preferredTime">Preferred Time</label>
                      <select className="field-select" id="preferredTime" value={formData.preferredTime} onChange={handleInputChange}>
                        <option value="any">Any time</option>
                        <option value="morning">Morning (6am – 12pm)</option>
                        <option value="afternoon">Afternoon (12pm – 6pm)</option>
                        <option value="evening">Evening (6pm – 9pm)</option>
                        <option value="weekends">Weekends only</option>
                      </select>
                    </div>
                  </div>

                  <div className="field-row full">
                    <div className="field-group">
                      <label className="field-label" htmlFor="availNotes">Additional Notes on Availability</label>
                      <textarea className="field-textarea" id="availNotes" placeholder="E.g., 'Available on weekends only' or 'Please call before messaging'..." style={{minHeight: '90px'}} value={formData.availNotes} onChange={handleInputChange}></textarea>
                    </div>
                  </div>
                </div>
                <div className="form-actions">
                  <div className="form-actions-left">
                    <button className="btn-back" onClick={() => goPrev(4)}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M13 7H1M7 1L1 7l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      Back
                    </button>
                    <span className="step-counter">Step <strong>4</strong> of 5</span>
                  </div>
                  <button className="btn-next" onClick={() => goNext(4)}>
                    <span>Continue</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
              </div>

              {/* ── STEP 5: Verification & Consent ── */}
              <div className={`form-section ${currentStep === 5 ? 'active' : ''}`} id="step5">
                <div className="section-head">
                  <div className="section-head-tag"><span className="tag">Step 05 of 05</span></div>
                  <h2 className="section-head-title">Verification & <em>Consent</em></h2>
                  <p className="section-head-desc">Upload a photo ID for profile verification and confirm your agreement to our donor terms. You're almost there.</p>
                </div>
                <div className="form-body">
                  <div className="field-group" style={{marginBottom: '24px'}}>
                    <label className="field-label">Upload Photo ID <span className="req">*</span></label>
                    <div className="upload-zone" id="uploadZone" ref={uploadZoneRef}>
                      <input type="file" id="idUpload" accept="image/*,.pdf" onChange={handleFileChange} />
                      <div className="upload-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                      </div>
                      <div className="upload-title">Drop your ID here or <span style={{color: 'var(--crimson)'}}>browse</span></div>
                      <div className="upload-sub">Aadhaar, PAN, Passport, Voter ID · <span>JPG, PNG or PDF</span> · Max 5MB</div>
                    </div>
                    {formData.idUpload && (
                      <div className="upload-preview show" id="uploadPreview">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                        <span className="upload-preview-name" id="uploadPreviewName">{formData.idUpload.name}</span>
                        <button className="upload-preview-remove" onClick={() => setFormData(prev => ({ ...prev, idUpload: null }))} type="button">×</button>
                      </div>
                    )}
                    <span className={`field-error ${errors.idUpload ? 'show' : ''}`}>Please upload a valid photo ID.</span>
                  </div>

                  <div className="field-row full">
                    <div className="field-group">
                      <label className="field-label" htmlFor="profilePhoto">Profile Photo <span style={{fontSize: '11px', fontWeight: 300, textTransform: 'none', letterSpacing: 0, color: 'var(--ink-soft)'}}>(optional but recommended)</span></label>
                      <div className="upload-zone" style={{padding: '24px'}}>
                        <input type="file" id="profilePhoto" accept="image/*" onChange={handleFileChange} />
                        <div className="upload-icon" style={{width: '36px', height: '36px', marginBottom: '8px'}}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width: '16px', height: '16px'}}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        </div>
                        <div className="upload-title" style={{fontSize: '13px'}}>Upload a clear photo of your face</div>
                        <div className="upload-sub" style={{fontSize: '11.5px'}}>JPG or PNG · Square preferred · Max 2MB</div>
                      </div>
                      {formData.profilePhoto && (
                        <div className="upload-preview show" id="photoPreview">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                          <span className="upload-preview-name" id="photoPreviewName">{formData.profilePhoto.name}</span>
                          <button className="upload-preview-remove" onClick={() => setFormData(prev => ({ ...prev, profilePhoto: null }))} type="button">×</button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="field-divider">
                    <div className="field-divider-line"></div>
                    <div className="field-divider-text">Consent & Agreement</div>
                    <div className="field-divider-line"></div>
                  </div>

                  <div className="checkbox-group">
                    {[
                      { id: 'consentInfo', l: 'I confirm that all information provided is accurate and truthful to the best of my knowledge.' },
                      { id: 'consentShare', l: 'I consent to Blood Circle sharing my contact details with verified recipients in genuine medical emergencies, as outlined in the Privacy Policy.' },
                      { id: 'consentHealth', l: 'I confirm that I am in good health and am medically eligible to donate blood. I understand that Blood Circle\'s team may verify this information.' },
                      { id: 'consentTerms', l: 'I have read and agree to the Terms of Service and understand I can remove my profile at any time.' },
                      { id: 'consentNotify', l: 'I agree to receive SMS and/or email notifications for urgent blood requests matching my blood group in my area. (Recommended)' }
                    ].map(c => (
                      <div key={c.id} className="check-item">
                        <input type="checkbox" id={c.id} />
                        <label className="check-box" htmlFor={c.id}></label>
                        <label className="check-label" htmlFor={c.id}>{c.l}</label>
                      </div>
                    ))}
                  </div>
                  <span className={`field-error ${errors.consent ? 'show' : ''}`} style={{marginTop: '12px'}}>Please accept the required consent agreements (first four).</span>
                </div>
                <div className="form-actions">
                  <div className="form-actions-left">
                    <button className="btn-back" onClick={() => goPrev(5)}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M13 7H1M7 1L1 7l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      Back
                    </button>
                    <span className="step-counter">Step <strong>5</strong> of 5</span>
                  </div>
                  <button className="btn-next" onClick={submitForm} id="submitBtn">
                    <span>Complete Registration</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="success-screen show" id="successScreen">
              <div className="success-icon">❤️</div>
              <h2 className="success-title">You're in the <em>Circle!</em></h2>
              <p className="success-desc">
                Welcome to Blood Circle. Your donor profile is now pending verification. You'll receive a confirmation email within 24 hours, and your profile will go live once approved.
              </p>
              <div className="success-ref">
                Donor ID: <span id="donorIdDisplay">{donorId}</span>
              </div>
              <div className="success-actions">
                <a href="#" className="btn btn-primary">
                  <span>View My Profile</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
                <a href="/" className="btn btn-outline">
                  <span>Find Donors Near You</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* ── SIDEBAR ── */}
        <aside className="reg-sidebar">
          {/* Live Preview Card */}
          <div className="sidebar-card">
            <div className="sc-head"><div className="sc-title">Your Donor Card</div></div>
            <div className="donor-preview">
              <div className={`dp-blood ${formData.bloodType ? 'filled' : ''}`} id="dpBlood">
                {formData.bloodType || '?'}
              </div>
              <div className="dp-name" id="dpName">
                {formData.firstName || formData.lastName ? `${formData.firstName} ${formData.lastName}`.trim() : 'Your Name'}
              </div>
              <div className="dp-location" id="dpLocation">
                📍 {formData.city || formData.state ? `${formData.city}${formData.city && formData.state ? ', ' : ''}${formData.state}` : 'City, State'}
              </div>
              <div className="dp-divider"></div>
              <div className="dp-row">
                <span className="dp-row-label">Blood Group</span>
                <span className="dp-row-val" id="dpBG">{formData.bloodType || '—'}</span>
              </div>
              <div className="dp-row">
                <span className="dp-row-label">Donations</span>
                <span className="dp-row-val" id="dpDonations">
                  {formData.totalDonations ? ({ '0': 'First timer', '1-5': '1–5 times', '6-10': '6–10 times', '11-20': '11–20 times', '20+': '20+ times' } as Record<string, string>)[formData.totalDonations] || '—' : '—'}
                </span>
              </div>
              <div className="dp-row">
                <span className="dp-row-label">Availability</span>
                <span className="dp-row-val" id="dpAvail">
                  {formData.availability ? ({ immediate: 'Available Now', within_week: 'Within a Week', scheduled: 'By Appointment', unavailable: 'Unavailable' } as Record<string, string>)[formData.availability] || '—' : '—'}
                </span>
              </div>
              <div className="dp-status" id="dpStatus" style={isSubmitted ? {background: 'rgba(45,122,74,0.1)', color: '#2D7A4A'} : {}}>
                {isSubmitted ? 'Verification Pending' : 'Pending Activation'}
              </div>
            </div>
          </div>

          {/* Eligibility Checklist */}
          <div className="sidebar-card">
            <div className="sc-head"><div className="sc-title">Eligibility Criteria</div></div>
            <div className="sc-body">
              <div className="elig-list">
                <div className="elig-item">
                  <div className="elig-icon yes">✓</div>
                  <div className="elig-text">Aged between 18 and 65 years</div>
                </div>
                <div className="elig-item">
                  <div className="elig-icon yes">✓</div>
                  <div className="elig-text">Body weight above 45 kg</div>
                </div>
                <div className="elig-item">
                  <div className="elig-icon yes">✓</div>
                  <div className="elig-text">Haemoglobin level ≥ 12.5 g/dL</div>
                </div>
                <div className="elig-item">
                  <div className="elig-icon yes">✓</div>
                  <div className="elig-text">Not donated in the last 3 months</div>
                </div>
                <div className="elig-item">
                  <div className="elig-icon no">×</div>
                  <div className="elig-text">No active infection or fever in last 2 weeks</div>
                </div>
                <div className="elig-item">
                  <div className="elig-icon no">×</div>
                  <div className="elig-text">No pregnancy or delivery within 6 months</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="sidebar-card">
            <div className="stats-strip">
              <div className="stat-s">
                <div className="stat-s-num">48<span>K+</span></div>
                <div className="stat-s-label">Donors</div>
              </div>
              <div className="stat-s">
                <div className="stat-s-num">12<span>K+</span></div>
                <div className="stat-s-label">Lives Saved</div>
              </div>
              <div className="stat-s">
                <div className="stat-s-num">190<span>+</span></div>
                <div className="stat-s-label">Cities</div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* ── CTA STRIP ── */}
      {!isSubmitted && (
        <div className="reg-cta-strip" id="ctaStrip">
          <h3>Every Second Counts.</h3>
          <p>While you register, someone out there is waiting. Thank you for being their hope.</p>
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo-name">Blood<span>Circle</span></div>
              <div className="footer-logo-tagline">Life · Humanity · Hope</div>
              <p className="footer-brand-desc">A trusted platform connecting blood donors with recipients across India. Every profile is verified. Every drop is precious.</p>
            </div>
            <div>
              <div className="footer-col-title">Platform</div>
              <ul className="footer-links">
                <li><a href="/become-donor">Register as Donor</a></li>
                <li><a href="#">Search Donors</a></li>
                <li><a href="#">Blood Banks</a></li>
                <li><a href="#">Emergency Request</a></li>
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Company</div>
              <ul className="footer-links">
                <li><a href="#">About Us</a></li>
                <li><a href="#">Our Mission</a></li>
                <li><a href="#">Press</a></li>
                <li><a href="#">Careers</a></li>
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Support</div>
              <ul className="footer-links">
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span className="footer-copy">© 2025 Blood Circle. All rights reserved. Made with purpose.</span>
            <div className="footer-socials">
              <a href="#" className="social-btn" aria-label="Twitter">
                <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" className="social-btn" aria-label="Instagram">
                <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="social-btn" aria-label="Facebook">
                <svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
