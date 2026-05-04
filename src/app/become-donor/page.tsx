'use client'

import { useState } from 'react'
import './become-donor.css'

export default function BecomeDonor() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', dob: '', gender: '', weight: '',
    bloodType: '', idType: '', idNumber: '', email: '', phone: '',
    whatsapp: '', altPhone: '', address: '', city: '', state: '',
    pincode: '', emergencyName: '', emergencyPhone: '', emergencyRelation: '',
    lastDonated: '', totalDonations: '', availability: '', frequency: '',
    donationType: '', travelDistance: '5', preferredTime: 'any',
    availNotes: '', medNotes: '', medications: '',
    idUpload: null as File | null,
    profilePhoto: null as File | null,
  })
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [donorId, setDonorId] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value, name, type } = e.target as HTMLInputElement
    if (type === 'radio') setFormData(prev => ({ ...prev, [name]: value }))
    else setFormData(prev => ({ ...prev, [id]: value }))
    if (errors[id || name]) setErrors(prev => ({ ...prev, [id || name]: false }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, files } = e.target
    if (files?.[0]) {
      setFormData(prev => ({ ...prev, [id]: files[0] }))
      setErrors(prev => ({ ...prev, [id]: false }))
    }
  }

  const validateStep = (n: number) => {
    const newErrors: Record<string, boolean> = {}
    if (n === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = true
      if (!formData.lastName.trim())  newErrors.lastName  = true
      if (!formData.dob) { newErrors.dob = true } else {
        const age = (Date.now() - new Date(formData.dob).getTime()) / (365.25 * 24 * 3600 * 1000)
        if (age < 18 || age > 65) newErrors.dob = true
      }
      if (!formData.gender) newErrors.gender = true
      if (!formData.weight || parseInt(formData.weight) < 45) newErrors.weight = true
      if (!formData.bloodType)  newErrors.bloodType = true
      if (!formData.idType)     newErrors.idType    = true
      if (!formData.idNumber.trim()) newErrors.idNumber = true
    } else if (n === 2) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = true
      if (!formData.phone.trim())            newErrors.phone            = true
      if (!formData.address.trim())          newErrors.address          = true
      if (!formData.city.trim())             newErrors.city             = true
      if (!formData.state)                   newErrors.state            = true
      if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode          = true
      if (!formData.emergencyName.trim())    newErrors.emergencyName    = true
      if (!formData.emergencyPhone.trim())   newErrors.emergencyPhone   = true
      if (!formData.emergencyRelation)       newErrors.emergencyRelation = true
    } else if (n === 4) {
      if (!formData.availability) newErrors.availability = true
      if (!formData.frequency)    newErrors.frequency    = true
    } else if (n === 5) {
      if (!formData.idUpload) newErrors.idUpload = true
      const ids = ['consentInfo','consentShare','consentHealth','consentTerms']
      const allChecked = ids.every(id => (document.getElementById(id) as HTMLInputElement)?.checked)
      if (!allChecked) newErrors.consent = true
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const goNext = (n: number) => {
    if (validateStep(n)) { setCurrentStep(n + 1); window.scrollTo({top:0,behavior:'smooth'}) }
  }
  const goPrev = (n: number) => { setCurrentStep(n - 1); window.scrollTo({top:0,behavior:'smooth'}) }

  const submitForm = () => {
    if (validateStep(5)) {
      setTimeout(() => {
        setDonorId('BC-2025-' + Math.floor(10000 + Math.random() * 90000))
        setIsSubmitted(true)
        window.scrollTo({top:0,behavior:'smooth'})
      }, 1800)
    }
  }

  return (
    <div className="donor-page">
      {/* ── PAGE HERO ── */}
      <div className="reg-hero">
        <div className="reg-hero-pattern">
          <svg viewBox="0 0 600 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#8C1F28" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)"/>
            <circle cx="300" cy="250" r="200" fill="none" stroke="#8C1F28" strokeWidth="1"/>
            <circle cx="300" cy="250" r="130" fill="none" stroke="#8C1F28" strokeWidth="1"/>
          </svg>
        </div>
        <div className="reg-hero-inner">
          <div className="reg-hero-left reveal">
            <div className="reg-hero-badge"><span className="tag">Donor Registration</span></div>
            <h1 className="reg-hero-title">Join the Circle.<br/><em>Save a Life.</em></h1>
            <p className="reg-hero-desc">
              Complete your donor profile in under 5 minutes. Your details are safe, private,
              and only shared with verified recipients in genuine emergencies.
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
              {[1,2,3,4,5].map(s => (
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
        <div className="reg-progress-wrap">
          <div className="reg-progress">
            {[
              {n:1,l:'Personal Info'},
              {n:2,l:'Contact Details'},
              {n:3,l:'Medical History'},
              {n:4,l:'Availability'},
              {n:5,l:'Verification'},
            ].map((s,i) => (
              <div key={s.n} style={{display:'flex',alignItems:'center'}}>
                <div className={`prog-step ${currentStep===s.n?'active':currentStep>s.n?'done':''}`}>
                  <div className="prog-step-num"><span className="step-n">{s.n}</span></div>
                  <div className="prog-step-label">{s.l}</div>
                </div>
                {i < 4 && <div className="prog-connector"></div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── MAIN ── */}
      <div className="reg-main container">
        <div className="form-panel">
          {!isSubmitted ? (
            <>
              {/* STEP 1 */}
              <div className={`form-section ${currentStep===1?'active':''}`}>
                <div className="section-head">
                  <div className="section-head-tag"><span className="tag">Step 01 of 05</span></div>
                  <h2 className="section-head-title">Personal <em>Information</em></h2>
                  <p className="section-head-desc">Tell us about yourself. This helps recipients find compatible donors quickly.</p>
                </div>
                <div className="form-body">
                  <div className="field-row">
                    <div className="field-group">
                      <label className="field-label" htmlFor="firstName">First Name <span className="req">*</span></label>
                      <input className={`field-input ${errors.firstName?'error':''}`} type="text" id="firstName" placeholder="Aryan" value={formData.firstName} onChange={handleInputChange}/>
                      <span className={`field-error ${errors.firstName?'show':''}`}>Please enter your first name.</span>
                    </div>
                    <div className="field-group">
                      <label className="field-label" htmlFor="lastName">Last Name <span className="req">*</span></label>
                      <input className={`field-input ${errors.lastName?'error':''}`} type="text" id="lastName" placeholder="Mehta" value={formData.lastName} onChange={handleInputChange}/>
                      <span className={`field-error ${errors.lastName?'show':''}`}>Please enter your last name.</span>
                    </div>
                  </div>
                  <div className="field-row three">
                    <div className="field-group">
                      <label className="field-label" htmlFor="dob">Date of Birth <span className="req">*</span></label>
                      <input className={`field-input ${errors.dob?'error':''}`} type="date" id="dob" value={formData.dob} onChange={handleInputChange}/>
                      <span className={`field-error ${errors.dob?'show':''}`}>Must be 18–65 years old.</span>
                    </div>
                    <div className="field-group">
                      <label className="field-label" htmlFor="gender">Gender <span className="req">*</span></label>
                      <select className={`field-select ${errors.gender?'error':''}`} id="gender" value={formData.gender} onChange={handleInputChange}>
                        <option value="">Select gender</option>
                        <option>Male</option><option>Female</option>
                        <option>Non-binary</option><option>Prefer not to say</option>
                      </select>
                      <span className={`field-error ${errors.gender?'show':''}`}>Please select your gender.</span>
                    </div>
                    <div className="field-group">
                      <label className="field-label" htmlFor="weight">Weight (kg) <span className="req">*</span></label>
                      <input className={`field-input ${errors.weight?'error':''}`} type="number" id="weight" placeholder="70" value={formData.weight} onChange={handleInputChange}/>
                      <div className="field-hint">Minimum 45 kg required</div>
                      <span className={`field-error ${errors.weight?'show':''}`}>Minimum weight is 45 kg.</span>
                    </div>
                  </div>

                  <div className="field-divider"><div className="field-divider-line"></div><div className="field-divider-text">Blood Type</div><div className="field-divider-line"></div></div>

                  <div className="field-group">
                    <label className="field-label">Your Blood Group <span className="req">*</span></label>
                    <div className="blood-type-grid">
                      {['A+','A−','B+','B−','AB+','AB−','O+','O−'].map(bt => (
                        <div key={bt}>
                          <input className="bt-option" type="radio" name="bloodType" id={`bt${bt.replace('+','Pos').replace('−','Neg')}`} value={bt} checked={formData.bloodType===bt} onChange={handleInputChange}/>
                          <label className="bt-label" htmlFor={`bt${bt.replace('+','Pos').replace('−','Neg')}`}>
                            <span className="bt-label-type">{bt}</span>
                            <span className="bt-label-sub">{bt.includes('+') ? 'Pos' : 'Neg'}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                    <span className={`field-error ${errors.bloodType?'show':''}`}>Please select your blood group.</span>
                  </div>

                  <div className="field-divider" style={{marginTop:28}}><div className="field-divider-line"></div><div className="field-divider-text">Government ID</div><div className="field-divider-line"></div></div>

                  <div className="field-row">
                    <div className="field-group">
                      <label className="field-label" htmlFor="idType">ID Type <span className="req">*</span></label>
                      <select className={`field-select ${errors.idType?'error':''}`} id="idType" value={formData.idType} onChange={handleInputChange}>
                        <option value="">Select ID type</option>
                        <option>Aadhaar Card</option><option>PAN Card</option>
                        <option>Voter ID</option><option>Passport</option><option>Driving Licence</option>
                      </select>
                      <span className={`field-error ${errors.idType?'show':''}`}>Please select an ID type.</span>
                    </div>
                    <div className="field-group">
                      <label className="field-label" htmlFor="idNumber">ID Number <span className="req">*</span></label>
                      <input className={`field-input ${errors.idNumber?'error':''}`} type="text" id="idNumber" placeholder="XXXX XXXX XXXX" value={formData.idNumber} onChange={handleInputChange}/>
                      <div className="field-hint">Used for identity verification only</div>
                      <span className={`field-error ${errors.idNumber?'show':''}`}>Please enter a valid ID number.</span>
                    </div>
                  </div>
                </div>
                <div className="form-actions">
                  <span className="step-counter">Step <strong>1</strong> of 5</span>
                  <button className="btn-next" onClick={() => goNext(1)}>
                    <span>Continue</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
              </div>

              {/* STEP 2 */}
              <div className={`form-section ${currentStep===2?'active':''}`}>
                <div className="section-head">
                  <div className="section-head-tag"><span className="tag">Step 02 of 05</span></div>
                  <h2 className="section-head-title">Contact <em>Details</em></h2>
                  <p className="section-head-desc">Your contact details are never publicly visible. They're only shared through our secure messaging layer.</p>
                </div>
                <div className="form-body">
                  <div className="field-row">
                    <div className="field-group">
                      <label className="field-label" htmlFor="email">Email Address <span className="req">*</span></label>
                      <input className={`field-input ${errors.email?'error':''}`} type="email" id="email" placeholder="aryan@example.com" value={formData.email} onChange={handleInputChange}/>
                      <span className={`field-error ${errors.email?'show':''}`}>Please enter a valid email.</span>
                    </div>
                    <div className="field-group">
                      <label className="field-label" htmlFor="phone">Phone Number <span className="req">*</span></label>
                      <input className={`field-input ${errors.phone?'error':''}`} type="tel" id="phone" placeholder="+91 98765 43210" value={formData.phone} onChange={handleInputChange}/>
                      <span className={`field-error ${errors.phone?'show':''}`}>Please enter a valid phone.</span>
                    </div>
                  </div>
                  <div className="field-row">
                    <div className="field-group">
                      <label className="field-label" htmlFor="whatsapp">WhatsApp Number</label>
                      <input className="field-input" type="tel" id="whatsapp" placeholder="Same as phone" value={formData.whatsapp} onChange={handleInputChange}/>
                    </div>
                    <div className="field-group">
                      <label className="field-label" htmlFor="altPhone">Alternate Contact</label>
                      <input className="field-input" type="tel" id="altPhone" placeholder="+91 XXXXX XXXXX" value={formData.altPhone} onChange={handleInputChange}/>
                    </div>
                  </div>

                  <div className="field-divider"><div className="field-divider-line"></div><div className="field-divider-text">Address</div><div className="field-divider-line"></div></div>

                  <div className="field-row full">
                    <div className="field-group">
                      <label className="field-label" htmlFor="address">Street Address <span className="req">*</span></label>
                      <input className={`field-input ${errors.address?'error':''}`} type="text" id="address" placeholder="House No., Street, Area" value={formData.address} onChange={handleInputChange}/>
                      <span className={`field-error ${errors.address?'show':''}`}>Please enter your address.</span>
                    </div>
                  </div>
                  <div className="field-row three">
                    <div className="field-group">
                      <label className="field-label" htmlFor="city">City <span className="req">*</span></label>
                      <input className={`field-input ${errors.city?'error':''}`} type="text" id="city" placeholder="Mumbai" value={formData.city} onChange={handleInputChange}/>
                      <span className={`field-error ${errors.city?'show':''}`}>Please enter your city.</span>
                    </div>
                    <div className="field-group">
                      <label className="field-label" htmlFor="state">State <span className="req">*</span></label>
                      <select className={`field-select ${errors.state?'error':''}`} id="state" value={formData.state} onChange={handleInputChange}>
                        <option value="">Select state</option>
                        {['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Delhi','Jammu & Kashmir','Ladakh','Chandigarh','Puducherry'].map(s => <option key={s}>{s}</option>)}
                      </select>
                      <span className={`field-error ${errors.state?'show':''}`}>Please select your state.</span>
                    </div>
                    <div className="field-group">
                      <label className="field-label" htmlFor="pincode">Pincode <span className="req">*</span></label>
                      <input className={`field-input ${errors.pincode?'error':''}`} type="text" id="pincode" placeholder="400001" maxLength={6} value={formData.pincode} onChange={handleInputChange}/>
                      <span className={`field-error ${errors.pincode?'show':''}`}>Enter a valid 6-digit pincode.</span>
                    </div>
                  </div>

                  <div className="field-divider"><div className="field-divider-line"></div><div className="field-divider-text">Emergency Contact</div><div className="field-divider-line"></div></div>

                  <div className="field-row">
                    <div className="field-group">
                      <label className="field-label" htmlFor="emergencyName">Contact Name <span className="req">*</span></label>
                      <input className={`field-input ${errors.emergencyName?'error':''}`} type="text" id="emergencyName" placeholder="Full name" value={formData.emergencyName} onChange={handleInputChange}/>
                      <span className={`field-error ${errors.emergencyName?'show':''}`}>Please enter emergency contact name.</span>
                    </div>
                    <div className="field-group">
                      <label className="field-label" htmlFor="emergencyPhone">Contact Phone <span className="req">*</span></label>
                      <input className={`field-input ${errors.emergencyPhone?'error':''}`} type="tel" id="emergencyPhone" placeholder="+91 XXXXX XXXXX" value={formData.emergencyPhone} onChange={handleInputChange}/>
                      <span className={`field-error ${errors.emergencyPhone?'show':''}`}>Please enter emergency contact phone.</span>
                    </div>
                  </div>
                  <div className="field-row">
                    <div className="field-group">
                      <label className="field-label" htmlFor="emergencyRelation">Relationship <span className="req">*</span></label>
                      <select className={`field-select ${errors.emergencyRelation?'error':''}`} id="emergencyRelation" value={formData.emergencyRelation} onChange={handleInputChange}>
                        <option value="">Select relationship</option>
                        <option>Spouse / Partner</option><option>Parent</option><option>Sibling</option>
                        <option>Child</option><option>Friend</option><option>Colleague</option><option>Other</option>
                      </select>
                      <span className={`field-error ${errors.emergencyRelation?'show':''}`}>Please select a relationship.</span>
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

              {/* STEP 3 */}
              <div className={`form-section ${currentStep===3?'active':''}`}>
                <div className="section-head">
                  <div className="section-head-tag"><span className="tag">Step 03 of 05</span></div>
                  <h2 className="section-head-title">Medical <em>History</em></h2>
                  <p className="section-head-desc">Accurate medical information ensures safe donations. All data is kept strictly confidential.</p>
                </div>
                <div className="form-body">
                  <div className="field-row">
                    <div className="field-group">
                      <label className="field-label" htmlFor="lastDonated">Last Donation Date</label>
                      <input className="field-input" type="date" id="lastDonated" value={formData.lastDonated} onChange={handleInputChange}/>
                      <div className="field-hint">Leave blank if first time</div>
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
                  <div className="field-divider"><div className="field-divider-line"></div><div className="field-divider-text">Current Health Status</div><div className="field-divider-line"></div></div>
                  <div className="field-group" style={{marginBottom:20}}>
                    <label className="field-label">Pre-existing Conditions</label>
                    <div className="condition-tags">
                      {[{id:'cNone',l:'None'},{id:'cDiab',l:'Diabetes'},{id:'cHyper',l:'Hypertension'},{id:'cAsthma',l:'Asthma'},{id:'cHeart',l:'Heart Disease'},{id:'cThyroid',l:'Thyroid'},{id:'cAnemia',l:'Anemia'},{id:'cOther',l:'Other'}].map(c => (
                        <div key={c.id}>
                          <input className="cond-option" type="checkbox" id={c.id} name="cond"/>
                          <label className="cond-label" htmlFor={c.id}>{c.l}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="field-row full">
                    <div className="field-group">
                      <label className="field-label" htmlFor="medications">Current Medications</label>
                      <input className="field-input" type="text" id="medications" placeholder="e.g., Metformin 500mg, or None" value={formData.medications} onChange={handleInputChange}/>
                    </div>
                  </div>
                  <div className="field-row full">
                    <div className="field-group">
                      <label className="field-label" htmlFor="medNotes">Additional Medical Notes</label>
                      <textarea className="field-textarea" id="medNotes" placeholder="Any other relevant medical information..." value={formData.medNotes} onChange={handleInputChange}></textarea>
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

              {/* STEP 4 */}
              <div className={`form-section ${currentStep===4?'active':''}`}>
                <div className="section-head">
                  <div className="section-head-tag"><span className="tag">Step 04 of 05</span></div>
                  <h2 className="section-head-title">Donation <em>Availability</em></h2>
                  <p className="section-head-desc">Let recipients know when and how often you're willing to donate.</p>
                </div>
                <div className="form-body">
                  <div className="field-group" style={{marginBottom:24}}>
                    <label className="field-label">Current Availability Status <span className="req">*</span></label>
                    <div className="avail-grid">
                      {[
                        {id:'avImmediate',v:'immediate',t:'Available Immediately',s:'Ready to donate within 24 hours'},
                        {id:'avWeek',v:'within_week',t:'Within a Week',s:'Can arrange within 2–7 days'},
                        {id:'avScheduled',v:'scheduled',t:'Scheduled Only',s:'Prefer advance notice'},
                        {id:'avUnavailable',v:'unavailable',t:'Currently Unavailable',s:'Register now, activate later'},
                      ].map(a => (
                        <div key={a.id}>
                          <input className="avail-option" type="radio" name="availability" id={a.id} value={a.v} checked={formData.availability===a.v} onChange={handleInputChange}/>
                          <label className="avail-label" htmlFor={a.id}>
                            <div className="avail-radio"></div>
                            <div><div className="avail-text-title">{a.t}</div><div className="avail-text-sub">{a.s}</div></div>
                          </label>
                        </div>
                      ))}
                    </div>
                    <span className={`field-error ${errors.availability?'show':''}`}>Please select your availability.</span>
                  </div>
                  <div className="field-row">
                    <div className="field-group">
                      <label className="field-label" htmlFor="frequency">Donation Frequency <span className="req">*</span></label>
                      <select className={`field-select ${errors.frequency?'error':''}`} id="frequency" value={formData.frequency} onChange={handleInputChange}>
                        <option value="">How often?</option>
                        <option value="3months">Every 3 months (recommended)</option>
                        <option value="6months">Every 6 months</option>
                        <option value="yearly">Once a year</option>
                        <option value="emergency">Emergency only</option>
                      </select>
                      <span className={`field-error ${errors.frequency?'show':''}`}>Please select frequency.</span>
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
                  <div className="field-divider"><div className="field-divider-line"></div><div className="field-divider-text">Travel & Preferences</div><div className="field-divider-line"></div></div>
                  <div className="field-row">
                    <div className="field-group">
                      <label className="field-label" htmlFor="travelDistance">Willing to Travel</label>
                      <select className="field-select" id="travelDistance" value={formData.travelDistance} onChange={handleInputChange}>
                        <option value="5">Within 5 km</option><option value="10">Within 10 km</option>
                        <option value="25">Within 25 km</option><option value="50">Within 50 km</option>
                        <option value="any">Any distance</option>
                      </select>
                    </div>
                    <div className="field-group">
                      <label className="field-label" htmlFor="preferredTime">Preferred Time</label>
                      <select className="field-select" id="preferredTime" value={formData.preferredTime} onChange={handleInputChange}>
                        <option value="any">Any time</option>
                        <option value="morning">Morning (6am–12pm)</option>
                        <option value="afternoon">Afternoon (12pm–6pm)</option>
                        <option value="evening">Evening (6pm–9pm)</option>
                        <option value="weekends">Weekends only</option>
                      </select>
                    </div>
                  </div>
                  <div className="field-row full">
                    <div className="field-group">
                      <label className="field-label" htmlFor="availNotes">Additional Notes</label>
                      <textarea className="field-textarea" id="availNotes" style={{minHeight:90}} value={formData.availNotes} onChange={handleInputChange} placeholder="E.g., 'Available on weekends only'..."></textarea>
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

              {/* STEP 5 */}
              <div className={`form-section ${currentStep===5?'active':''}`}>
                <div className="section-head">
                  <div className="section-head-tag"><span className="tag">Step 05 of 05</span></div>
                  <h2 className="section-head-title">Verification & <em>Consent</em></h2>
                  <p className="section-head-desc">Upload a photo ID and confirm your agreement. You're almost there.</p>
                </div>
                <div className="form-body">
                  <div className="field-group" style={{marginBottom:24}}>
                    <label className="field-label">Upload Photo ID <span className="req">*</span></label>
                    <div className="upload-zone">
                      <input type="file" id="idUpload" accept="image/*,.pdf" onChange={handleFileChange}/>
                      <div className="upload-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                      </div>
                      <div className="upload-title">Drop your ID here or <span style={{color:'var(--crimson)'}}>browse</span></div>
                      <div className="upload-sub">Aadhaar, PAN, Passport · JPG, PNG or PDF · Max 5MB</div>
                    </div>
                    {formData.idUpload && (
                      <div className="upload-preview show">
                        <span className="upload-preview-name">{formData.idUpload.name}</span>
                        <button className="upload-preview-remove" onClick={() => setFormData(p => ({...p,idUpload:null}))} type="button">×</button>
                      </div>
                    )}
                    <span className={`field-error ${errors.idUpload?'show':''}`}>Please upload a valid photo ID.</span>
                  </div>
                  <div className="field-divider"><div className="field-divider-line"></div><div className="field-divider-text">Consent & Agreement</div><div className="field-divider-line"></div></div>
                  <div className="checkbox-group">
                    {[
                      {id:'consentInfo',  l:'I confirm that all information provided is accurate and truthful.'},
                      {id:'consentShare', l:'I consent to Blood Circle sharing my contact details with verified recipients in genuine medical emergencies.'},
                      {id:'consentHealth',l:"I confirm I am in good health and medically eligible to donate blood."},
                      {id:'consentTerms', l:'I have read and agree to the Terms of Service.'},
                      {id:'consentNotify',l:'I agree to receive SMS/email notifications for urgent blood requests matching my blood group. (Recommended)'},
                    ].map(c => (
                      <div key={c.id} className="check-item">
                        <input type="checkbox" id={c.id}/>
                        <label className="check-box" htmlFor={c.id}></label>
                        <label className="check-label" htmlFor={c.id}>{c.l}</label>
                      </div>
                    ))}
                  </div>
                  <span className={`field-error ${errors.consent?'show':''}`} style={{marginTop:12}}>Please accept the required consent agreements.</span>
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
            <div className="success-screen show">
              <div className="success-icon">❤️</div>
              <h2 className="success-title">You're in the <em>Circle!</em></h2>
              <p className="success-desc">
                Your donor profile is now pending verification. You'll receive a confirmation email within 24 hours.
              </p>
              <div className="success-ref">Donor ID: <span>{donorId}</span></div>
              <div className="success-actions">
                <a href="#" className="btn btn-primary"><span>View My Profile</span></a>
                <a href="/search-donors" className="btn btn-outline"><span>Find Donors Near You</span></a>
              </div>
            </div>
          )}
        </div>

        {/* ── SIDEBAR ── */}
        <aside className="reg-sidebar">
          <div className="sidebar-card">
            <div className="sc-head"><div className="sc-title">Your Donor Card</div></div>
            <div className="donor-preview">
              <div className={`dp-blood ${formData.bloodType?'filled':''}`}>
                {formData.bloodType || '?'}
              </div>
              <div className="dp-name">
                {formData.firstName || formData.lastName ? `${formData.firstName} ${formData.lastName}`.trim() : 'Your Name'}
              </div>
              <div className="dp-location">
                📍 {formData.city || formData.state ? `${formData.city}${formData.city && formData.state ? ', ' : ''}${formData.state}` : 'City, State'}
              </div>
              <div className="dp-divider"></div>
              <div className="dp-row">
                <span className="dp-row-label">Blood Group</span>
                <span className="dp-row-val">{formData.bloodType || '—'}</span>
              </div>
              <div className="dp-row">
                <span className="dp-row-label">Donations</span>
                <span className="dp-row-val">
                  {formData.totalDonations ? ({'0':'First timer','1-5':'1–5 times','6-10':'6–10 times','11-20':'11–20 times','20+':'20+ times'} as Record<string,string>)[formData.totalDonations] || '—' : '—'}
                </span>
              </div>
              <div className="dp-row">
                <span className="dp-row-label">Availability</span>
                <span className="dp-row-val">
                  {formData.availability ? ({'immediate':'Available Now','within_week':'Within a Week','scheduled':'By Appointment','unavailable':'Unavailable'} as Record<string,string>)[formData.availability] || '—' : '—'}
                </span>
              </div>
              <div className="dp-status">{isSubmitted ? 'Verification Pending' : 'Pending Activation'}</div>
            </div>
          </div>

          <div className="sidebar-card">
            <div className="sc-head"><div className="sc-title">Eligibility Criteria</div></div>
            <div className="sc-body">
              <div className="elig-list">
                {[
                  {ok:true, t:'Aged between 18 and 65 years'},
                  {ok:true, t:'Body weight above 45 kg'},
                  {ok:true, t:'Haemoglobin level ≥ 12.5 g/dL'},
                  {ok:true, t:'Not donated in the last 3 months'},
                  {ok:false,t:'No active infection or fever in last 2 weeks'},
                  {ok:false,t:'No pregnancy or delivery within 6 months'},
                ].map((e,i) => (
                  <div key={i} className="elig-item">
                    <div className={`elig-icon ${e.ok?'yes':'no'}`}>{e.ok?'✓':'×'}</div>
                    <div className="elig-text">{e.t}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="sidebar-card">
            <div className="stats-strip">
              <div className="stat-s"><div className="stat-s-num">48<span>K+</span></div><div className="stat-s-label">Donors</div></div>
              <div className="stat-s"><div className="stat-s-num">12<span>K+</span></div><div className="stat-s-label">Lives Saved</div></div>
              <div className="stat-s"><div className="stat-s-num">190<span>+</span></div><div className="stat-s-label">Cities</div></div>
            </div>
          </div>
        </aside>
      </div>

      {!isSubmitted && (
        <div className="reg-cta-strip">
          <h3>Every Second Counts.</h3>
          <p>While you register, someone out there is waiting. Thank you for being their hope.</p>
        </div>
      )}
    </div>
  )
}
