'use client'

import { useState } from 'react'
import './contact.css'

// ── FAQ Data ────────────────────────────────────────────────────────
const FAQS = [
  [
    {
      q: 'How quickly can I expect a response?',
      a: 'Our team responds to all general enquiries within 4–6 business hours. Emergency blood requests are prioritised and handled within minutes by our 24/7 duty team.',
    },
    {
      q: 'How do I report an issue with a donor profile?',
      a: 'Use the "Report" option on any donor card, or write to us directly via this form selecting "Report a Profile" as the subject. We investigate all reports within 2 hours.',
    },
    {
      q: 'Can hospitals partner with Blood Circle?',
      a: 'Yes — we have a dedicated hospital partnership programme. Select "Hospital / Organisation" as your enquiry type and our partnerships team will reach out within one business day.',
    },
    {
      q: 'Is my contact information shared with donors?',
      a: 'Never without your consent. Your details are routed through our secure messaging layer and only passed on when you explicitly authorise it.',
    },
  ],
  [
    {
      q: 'How do I update or delete my donor profile?',
      a: 'Log in to your account dashboard and go to Profile Settings. You can edit, deactivate, or permanently delete your profile at any time.',
    },
    {
      q: 'What if I donated blood elsewhere and need to update my record?',
      a: 'Write to us via this form selecting "Profile Update" as the subject, or update the "Last Donated" field directly from your donor dashboard.',
    },
    {
      q: 'Can I volunteer or intern with Blood Circle?',
      a: 'We welcome volunteers and interns year-round. Please select "Volunteer / Career" when submitting your enquiry and attach your brief introduction.',
    },
    {
      q: 'How do I raise a press or media enquiry?',
      a: 'Select "Press & Media" as the subject type and include your publication and deadline. Our communications team prioritises press requests within 3 hours.',
    },
  ],
]

// ── Page ────────────────────────────────────────────────────────────
export default function ContactPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', subject: '', message: '', newsletter: false,
  })
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [openFaqs, setOpenFaqs] = useState<Record<string, boolean>>({})

  // ── Handlers ──
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setForm(prev => ({ ...prev, [id]: type === 'checkbox' ? checked : value }))
    if (errors[id]) setErrors(prev => ({ ...prev, [id]: false }))
  }

  const handleSubject = (val: string) => {
    setForm(prev => ({ ...prev, subject: val }))
    if (errors.subject) setErrors(prev => ({ ...prev, subject: false }))
  }

  const validate = () => {
    const e: Record<string, boolean> = {}
    if (!form.name.trim())                                     e.name    = true
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))       e.email   = true
    if (!form.subject)                                          e.subject = true
    if (!form.message.trim() || form.message.trim().length < 10) e.message = true
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    setSending(true)
    // Simulate API call
    setTimeout(() => {
      setSending(false)
      setSent(true)
    }, 1800)
  }

  const toggleFaq = (key: string) => {
    setOpenFaqs(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const SUBJECTS = [
    'General Enquiry', 'Emergency Blood Request', 'Donor Registration Help',
    'Report a Profile', 'Hospital / Organisation', 'Volunteer / Career',
    'Profile Update', 'Press & Media', 'Technical Issue',
  ]

  return (
    <>
      {/* ── HERO ── */}
      <section className="contact-hero">
        <div className="contact-hero-pattern">
          <svg viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cgrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#8C1F28" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cgrid)"/>
            <circle cx="300" cy="300" r="220" fill="none" stroke="#8C1F28" strokeWidth="1"/>
            <circle cx="300" cy="300" r="140" fill="none" stroke="#8C1F28" strokeWidth="1"/>
            <circle cx="300" cy="300" r="60"  fill="none" stroke="#8C1F28" strokeWidth="1"/>
          </svg>
        </div>
        <div className="contact-hero-inner">
          <div className="contact-hero-left reveal">
            <div className="contact-hero-badge">
              <span className="tag">Get in Touch</span>
            </div>
            <h1 className="contact-hero-title">
              We&rsquo;re Here<br/><em>When It Matters.</em>
            </h1>
            <p className="contact-hero-desc">
              Whether you need urgent help finding blood, have a question about your donor profile,
              or want to partner with us — our team is ready. Every message is a priority.
            </p>
            <div className="contact-hero-chips">
              <span className="contact-chip">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                </svg>
                Replies within 4–6 hrs
              </span>
              <span className="contact-chip">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
                </svg>
                24/7 Emergency Line
              </span>
              <span className="contact-chip">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                </svg>
                100% Confidential
              </span>
            </div>
          </div>

          <div className="contact-hero-right reveal">
            <div className="ch-stat-card">
              <div className="ch-stat-num">4–6<span>hr</span></div>
              <div className="ch-stat-label">Average Response Time</div>
            </div>
            <div className="ch-stat-card">
              <div className="ch-stat-num">24<span>/7</span></div>
              <div className="ch-stat-label">Emergency Support Available</div>
            </div>
            <div className="ch-stat-card">
              <div className="ch-stat-num">98<span>%</span></div>
              <div className="ch-stat-label">Issues Resolved First Contact</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN ── */}
      <div className="contact-main">

        {/* ── FORM PANEL ── */}
        <div className="contact-form-panel reveal">
          {!sent ? (
            <>
              <div className="cfp-head">
                <div className="cfp-head-tag"><span className="tag">Send a Message</span></div>
                <h2 className="cfp-head-title">Write to <em>Us</em></h2>
                <p className="cfp-head-desc">
                  Fill in the form below and we&rsquo;ll be in touch. For life-threatening emergencies,
                  please call our hotline directly — don&rsquo;t wait for a form response.
                </p>
                <div className="cfp-head-num" aria-hidden="true">01</div>
              </div>

              <div className="cfp-body">
                {/* Row 1 — Name + Email */}
                <div className="cf-row">
                  <div className="cf-group">
                    <label className="cf-label" htmlFor="name">
                      Full Name <span className="req">*</span>
                    </label>
                    <input
                      className={`cf-input ${errors.name ? 'error' : ''}`}
                      type="text" id="name" placeholder="Full Name"
                      value={form.name} onChange={handleChange}
                    />
                    <span className={`cf-error ${errors.name ? 'show' : ''}`}>Please enter your name.</span>
                  </div>
                  <div className="cf-group">
                    <label className="cf-label" htmlFor="email">
                      Email Address <span className="req">*</span>
                    </label>
                    <input
                      className={`cf-input ${errors.email ? 'error' : ''}`}
                      type="email" id="email" placeholder="example@mail.com"
                      value={form.email} onChange={handleChange}
                    />
                    <span className={`cf-error ${errors.email ? 'show' : ''}`}>Please enter a valid email.</span>
                  </div>
                </div>

                {/* Row 2 — Phone */}
                <div className="cf-row">
                  <div className="cf-group">
                    <label className="cf-label" htmlFor="phone">Phone Number</label>
                    <input
                      className="cf-input"
                      type="tel" id="phone" placeholder="+880 18765 43210"
                      value={form.phone} onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Subject tags */}
                <div className="cf-divider">
                  <div className="cf-divider-line"></div>
                  <div className="cf-divider-text">Subject</div>
                  <div className="cf-divider-line"></div>
                </div>
                <div className="cf-group" style={{ marginBottom: 22 }}>
                  <label className="cf-label">
                    What is this about? <span className="req">*</span>
                  </label>
                  <div className="cf-subject-tags">
                    {SUBJECTS.map(s => (
                      <div key={s}>
                        <input
                          className="cf-subj-opt" type="radio"
                          name="subject" id={`subj-${s}`} value={s}
                          checked={form.subject === s}
                          onChange={() => handleSubject(s)}
                        />
                        <label className="cf-subj-label" htmlFor={`subj-${s}`}>{s}</label>
                      </div>
                    ))}
                  </div>
                  <span className={`cf-error ${errors.subject ? 'show' : ''}`} style={{ marginTop: 8 }}>
                    Please select a subject.
                  </span>
                </div>

                {/* Message */}
                <div className="cf-divider">
                  <div className="cf-divider-line"></div>
                  <div className="cf-divider-text">Your Message</div>
                  <div className="cf-divider-line"></div>
                </div>
                <div className="cf-group" style={{ marginBottom: 22 }}>
                  <label className="cf-label" htmlFor="message">
                    Message <span className="req">*</span>
                  </label>
                  <textarea
                    className={`cf-textarea ${errors.message ? 'error' : ''}`}
                    id="message"
                    placeholder="Tell us how we can help. For blood requests, include the patient's blood type, hospital name, city, and urgency…"
                    value={form.message} onChange={handleChange}
                  />
                  <span className={`cf-error ${errors.message ? 'show' : ''}`}>
                    Please write at least 10 characters.
                  </span>
                </div>

                {/* Newsletter */}
                <div className="cf-check-item">
                  <input type="checkbox" id="newsletter" checked={form.newsletter} onChange={handleChange}/>
                  <label className="cf-check-box" htmlFor="newsletter"></label>
                  <label className="cf-check-label" htmlFor="newsletter">
                    Keep me updated with BloodCircle news, urgent drives, and impact stories.
                    (Optional — unsubscribe any time.)
                  </label>
                </div>
              </div>

              <div className="cfp-footer">
                <div className="cfp-footer-note">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0110 0v4"/>
                  </svg>
                  End-to-end encrypted · Never sold
                </div>
                <button
                  className={`cf-submit ${sending ? 'loading' : ''}`}
                  onClick={handleSubmit}
                  disabled={sending}
                >
                  {sending ? (
                    <>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                        <path d="M21 12a9 9 0 11-6.219-8.56"/>
                      </svg>
                      <span>Sending…</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            /* ── Success State ── */
            <div className="cf-success show">
              <div className="cf-success-icon">✉️</div>
              <h2 className="cf-success-title">Message <em>Received!</em></h2>
              <p className="cf-success-desc">
                Thank you, {form.name.split(' ')[0]}. We&rsquo;ve received your message and will
                reply to <strong>{form.email}</strong> within 4–6 hours.
                For life-threatening emergencies, please call <strong>+91 1800 000 0000</strong> now.
              </p>
              <button
                className="cf-submit"
                onClick={() => { setSent(false); setForm({ name:'', email:'', phone:'', subject:'', message:'', newsletter:false }) }}
              >
                <span>Send Another Message</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* ── SIDEBAR ── */}
        <aside className="contact-sidebar">

          {/* Emergency card */}
          <div className="csc-card emergency reveal">
            <div className="csc-head">
              <div className="csc-head-icon">
                <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 3v14M3 10h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="csc-head-title">Emergency Hotline</div>
            </div>
            <div className="csc-body">
              <div className="emerg-hotline">1622</div>
              <div className="emerg-sub">
                Toll-free · Available 24 hours a day, 7 days a week.<br/>
                For urgent blood requests only.
              </div>
              <a href="tel:18000000000" className="emerg-btn">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M13 10.5c-1.4 0-2.7-.2-3.9-.6-.3-.1-.7 0-.9.3l-1.2 1.5c-2-1-3.7-2.7-4.7-4.7l1.5-1.3c.3-.2.4-.6.3-.9C3.7 3.7 3.5 2.4 3.5 1c0-.3-.2-.5-.5-.5H1C.7.5.5.7.5 1 .5 9 7 15.5 14.5 15.5c.3 0 .5-.2.5-.5V11c0-.3-.2-.5-.5-.5h-2z" stroke="white" strokeWidth="1.2"/>
                </svg>
                Call Now
              </a>
            </div>
          </div>

          {/* Contact details */}
          <div className="csc-card reveal">
            <div className="csc-head">
              <div className="csc-head-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div className="csc-head-title">Contact Details</div>
            </div>
            <div className="csc-body">
              <div className="csc-row">
                <div className="csc-row-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <div className="csc-row-label">Office Address</div>
                  <div className="csc-row-val">Level 4, Technopark Tower,<br/>Bandra Kurla Complex,<br/>Mumbai, Maharashtra 400 051</div>
                </div>
              </div>
              <div className="csc-row">
                <div className="csc-row-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.07 8.81 19.79 19.79 0 012 2.18 2 2 0 014 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 7.91a16 16 0 006.16 6.16l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
                  </svg>
                </div>
                <div>
                  <div className="csc-row-label">Phone</div>
                  <div className="csc-row-val">
                    <a href="tel:+912244556677">+91 22 4455 6677</a>
                  </div>
                  <div className="csc-row-sub">Mon – Sat, 9 AM – 7 PM IST</div>
                </div>
              </div>
              <div className="csc-row">
                <div className="csc-row-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <div className="csc-row-label">Email</div>
                  <div className="csc-row-val">
                    <a href="mailto:hello@bloodcircle.in">hello@bloodcircle.in</a>
                  </div>
                  <div className="csc-row-sub">General enquiries</div>
                </div>
              </div>
              <div className="csc-row">
                <div className="csc-row-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <div className="csc-row-label">Press & Partnerships</div>
                  <div className="csc-row-val">
                    <a href="mailto:press@bloodcircle.in">press@bloodcircle.in</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Office Hours */}
          <div className="csc-card reveal">
            <div className="csc-head">
              <div className="csc-head-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <div className="csc-head-title">Office Hours</div>
            </div>
            <div className="csc-body">
              <div className="hours-grid">
                {[
                  { d: 'Monday – Friday', t: '9:00 AM – 7:00 PM', open: true },
                  { d: 'Saturday',        t: '10:00 AM – 4:00 PM', open: true },
                  { d: 'Sunday',          t: 'Closed', open: false },
                ].map((h, i) => (
                  <div key={i} className="hours-row">
                    <span className="hours-day">{h.d}</span>
                    {h.open
                      ? <span className="hours-time">{h.t}</span>
                      : <span className="hours-badge closed">Closed</span>
                    }
                  </div>
                ))}
                <div className="hours-row" style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid var(--cream-d)' }}>
                  <span className="hours-day" style={{ fontWeight: 500, color: 'var(--crimson)' }}>Emergency Line</span>
                  <span className="hours-badge open">24 / 7</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social links */}
          <div className="csc-card reveal">
            <div className="csc-head">
              <div className="csc-head-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
              </div>
              <div className="csc-head-title">Follow Us</div>
            </div>
            <div className="csc-body">
              <div className="social-grid">
                {[
                  {
                    label: 'Twitter',
                    href: '#',
                    icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>,
                  },
                  {
                    label: 'Instagram',
                    href: '#',
                    icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>,
                  },
                  {
                    label: 'Facebook',
                    href: '#',
                    icon: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>,
                  },
                  {
                    label: 'LinkedIn',
                    href: '#',
                    icon: <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z"/>,
                  },
                ].map((s, i) => (
                  <a key={i} href={s.href} className="sc-social-btn" aria-label={s.label}>
                    <svg viewBox="0 0 24 24">
                      {i < 3 ? <path d={undefined}>{/* SVG path rendered inline below */}</path> : null}
                    </svg>
                    <span className="sc-social-label">{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

        </aside>
      </div>

      {/* ── FAQ ── */}
      <section className="contact-faq">
        <div className="container">
          <div className="section-header reveal" style={{ marginBottom: 0 }}>
            <span className="tag">Common Questions</span>
            <h2 className="section-title" style={{ marginTop: 14 }}>
              Frequently Asked <em>Questions</em>
            </h2>
            <p className="section-desc">
              Can&rsquo;t find what you&rsquo;re looking for? Use the contact form above and we&rsquo;ll get back to you.
            </p>
          </div>
          <div className="faq-grid reveal">
            {FAQS.map((col, ci) => (
              <div key={ci} className="faq-col">
                {col.map((item, qi) => {
                  const key = `${ci}-${qi}`
                  const isOpen = !!openFaqs[key]
                  return (
                    <div key={key} className="faq-item">
                      <button className={`faq-q ${isOpen ? 'open' : ''}`} onClick={() => toggleFaq(key)}>
                        <span>{item.q}</span>
                        <div className="faq-q-icon">
                          <svg viewBox="0 0 10 10" fill="none">
                            <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                        </div>
                      </button>
                      <div className={`faq-a ${isOpen ? 'open' : ''}`}>{item.a}</div>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Strip ── */}
      <div className="contact-cta-strip">
        <h3>Still Need Help? <em>We&rsquo;re a Click Away.</em></h3>
        <p>Our support team has helped thousands of patients and donors across Bangladesh. Whatever your question, we&rsquo;re ready.</p>
        <div className="cta-strip-actions">
          <a href="/become-donor" className="cta-strip-primary">
            <span>Register as Donor</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="/search-donors" className="cta-strip-ghost">
            <span>Find Blood Donors</span>
          </a>
        </div>
      </div>

      {/* Spin keyframe for loading spinner */}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </>
  )
}