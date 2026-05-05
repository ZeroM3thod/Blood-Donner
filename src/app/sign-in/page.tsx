'use client'

import { useState, useRef, useCallback } from 'react'
import './sign-in.css'

// ── Types ──────────────────────────────────────────────────────────────────────
type TabMode = 'email' | 'phone'
type PhaseMode = 'credentials' | 'otp' | 'success'

// ── OTP Input ─────────────────────────────────────────────────────────────────
function OtpInput({ onComplete }: { onComplete: (val: string) => void }) {
  const [digits, setDigits] = useState(['', '', '', '', '', ''])
  const refs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  const handleChange = (idx: number, val: string) => {
    if (!/^\d*$/.test(val)) return
    const next = [...digits]
    next[idx] = val.slice(-1)
    setDigits(next)
    if (val && idx < 5) refs[idx + 1].current?.focus()
    const full = next.join('')
    if (full.length === 6) onComplete(full)
  }

  const handleKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !digits[idx] && idx > 0) {
      refs[idx - 1].current?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    const next = pasted.split('').concat(Array(6).fill('')).slice(0, 6)
    setDigits(next)
    refs[Math.min(pasted.length, 5)].current?.focus()
    if (pasted.length === 6) onComplete(pasted)
  }

  return (
    <div className="otp-group">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={refs[i]}
          className="otp-input"
          type="tel"
          maxLength={1}
          value={d}
          onChange={e => handleChange(i, e.target.value)}
          onKeyDown={e => handleKeyDown(i, e)}
          onPaste={handlePaste}
          autoFocus={i === 0}
        />
      ))}
    </div>
  )
}

// ── Eye Icon ──────────────────────────────────────────────────────────────────
function EyeIcon({ show }: { show: boolean }) {
  return show ? (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z"
        stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.4"/>
    </svg>
  ) : (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 3l14 14M8.93 5.17A7.98 7.98 0 0110 5c5 0 8 5 8 5a14.4 14.4 0 01-2.07 2.73M6.07 6.07A14.4 14.4 0 002 10s3 5 8 5c1.55 0 2.95-.47 4.1-1.24"
        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M11.9 11.9A2.5 2.5 0 018.1 8.1"
        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function SignInPage() {
  const [tab, setTab]           = useState<TabMode>('email')
  const [phase, setPhase]       = useState<PhaseMode>('credentials')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [remember, setRemember] = useState(false)

  // Email tab fields
  const [email, setEmail]     = useState('')
  const [password, setPass]   = useState('')
  const [emailErr, setEmailErr] = useState('')
  const [passErr,  setPassErr]  = useState('')

  // Phone tab fields
  const [phone, setPhone]     = useState('')
  const [phoneErr, setPhoneErr] = useState('')

  // OTP phase
  const [otpErr, setOtpErr]   = useState('')
  const [resendCd, setResendCd] = useState(0)

  // ── Validation helpers ──
  const validateEmail = useCallback((v: string) => {
    if (!v) return 'Email is required'
    if (!/\S+@\S+\.\S+/.test(v)) return 'Enter a valid email address'
    return ''
  }, [])

  const validatePass = useCallback((v: string) => {
    if (!v) return 'Password is required'
    if (v.length < 6) return 'Password must be at least 6 characters'
    return ''
  }, [])

  const validatePhone = useCallback((v: string) => {
    if (!v) return 'Phone number is required'
    if (!/^\d{10}$/.test(v.replace(/\s/g, ''))) return 'Enter a valid 10-digit number'
    return ''
  }, [])

  // ── Resend countdown ──
  const startResendCd = () => {
    setResendCd(30)
    const t = setInterval(() => {
      setResendCd(c => { if (c <= 1) { clearInterval(t); return 0 } return c - 1 })
    }, 1000)
  }

  // ── Submit handlers ──
  const handleEmailSubmit = () => {
    const eErr = validateEmail(email)
    const pErr = validatePass(password)
    setEmailErr(eErr)
    setPassErr(pErr)
    if (eErr || pErr) return

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setPhase('success')
    }, 1800)
  }

  const handlePhoneSubmit = () => {
    const pErr = validatePhone(phone)
    setPhoneErr(pErr)
    if (pErr) return

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setPhase('otp')
      startResendCd()
    }, 1200)
  }

  const handleOtpComplete = (val: string) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      if (val === '123456') {
        setPhase('success')
      } else {
        setOtpErr('Incorrect OTP. Please try again.')
      }
    }, 1000)
  }

  const handleResend = () => {
    if (resendCd > 0) return
    startResendCd()
    setOtpErr('')
  }

  const switchTab = (t: TabMode) => {
    setTab(t)
    setPhase('credentials')
    setEmailErr(''); setPassErr(''); setPhoneErr(''); setOtpErr('')
  }

  // ────────────────────────────────────────────────────────────────────────────
  return (
    <div className="signin-page">

      {/* ════════════════════════════════════════════════════════════════
          LEFT PANEL
      ════════════════════════════════════════════════════════════════ */}
      <div className="signin-left">
        <div className="sl-grain"></div>
        <div className="sl-glow sl-glow-1"></div>
        <div className="sl-glow sl-glow-2"></div>
        <div className="sl-rings">
          <div className="sl-ring sl-ring-1"></div>
          <div className="sl-ring sl-ring-2"></div>
          <div className="sl-ring sl-ring-3"></div>
          <div className="sl-ring sl-ring-4"></div>
        </div>

        {/* Top */}
        <div className="sl-top">
          <div className="sl-tag">Donor Network</div>
          <h2 className="sl-headline">
            Welcome<br/>
            <em>Back, Hero.</em>
          </h2>
          <p className="sl-sub">
            Log in to manage your donor profile, respond to blood requests,
            and track your lifesaving impact — all in one place.
          </p>
        </div>

        {/* Stats Card */}
        <div className="sl-stats-card">
          <div className="sl-stats-label">Live Network — Right Now</div>
          <div className="sl-stats-row">
            <div className="sl-stat">
              <div className="sl-stat-num">1<span>,</span>284</div>
              <div className="sl-stat-lbl">Donors Online</div>
            </div>
            <div className="sl-stat">
              <div className="sl-stat-num">47<span>+</span></div>
              <div className="sl-stat-lbl">Active Requests</div>
            </div>
            <div className="sl-stat">
              <div className="sl-stat-num">12<span>m</span></div>
              <div className="sl-stat-lbl">Avg Response</div>
            </div>
          </div>
          <div className="sl-bt-strip">
            {['A+','A−','B+','B−','O+','O−','AB+','AB−'].map((bt, i) => (
              <span key={bt} className={`sl-bt-pill${i < 3 ? ' active' : ''}`}>{bt}</span>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="sl-testimonial">
          <p className="sl-testi-quote">
            I've donated 14 times through Blood Circle. The dashboard makes it so easy
            to know when I'm eligible again and where I'm needed most.
          </p>
          <div className="sl-testi-author">
            <div className="sl-testi-avatar">A</div>
            <div>
              <div className="sl-testi-name">Rakibul Hasan</div>
              <div className="sl-testi-role">Verified Donor · Mumbai, Maharashtra</div>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          RIGHT PANEL
      ════════════════════════════════════════════════════════════════ */}
      <div className="signin-right">
        <div className="sr-bg"></div>

        <div className="signin-form-wrap">

          {/* ── Logo ── */}
          <a href="/" className="sf-logo">
            <div className="sf-logo-mark"></div>
            <span className="sf-logo-name">Blood<span>Circle</span></span>
          </a>

          {/* ════ SUCCESS STATE ════ */}
          {phase === 'success' && (
            <div className="signin-success show">
              <div className="success-icon">
                <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 14l7 7 12-12"
                    stroke="currentColor" strokeWidth="2.2"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="success-title">Welcome back!</div>
              <p className="success-msg">
                You're signed in. Redirecting to your donor dashboard…
              </p>
            </div>
          )}

          {/* ════ OTP PHASE ════ */}
          {phase === 'otp' && (
            <>
              <div className="sf-header">
                <h1 className="sf-title">Enter the<br/><em>OTP</em></h1>
                <p className="sf-subtitle">
                  We sent a 6-digit code to <strong>+91 {phone}</strong>.
                  <br/>Enter it below to sign in.
                </p>
              </div>

              <div className="sf-field">
                <div className="sf-label">One-Time Password</div>
                <OtpInput onComplete={handleOtpComplete} />
                {otpErr && (
                  <div className="sf-error-msg">
                    <svg viewBox="0 0 12 12" fill="none">
                      <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
                      <path d="M6 4v3M6 8.5v.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                    </svg>
                    {otpErr}
                  </div>
                )}
              </div>

              <button
                className={`sf-submit ${loading ? 'loading' : ''}`}
                onClick={() => {}}
              >
                <div className="sf-spinner"></div>
                <span className="sf-btn-text" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span>Verifying…</span>
                </span>
              </button>

              <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--ink-soft)' }}>
                Didn't receive it?{' '}
                <button
                  onClick={handleResend}
                  style={{
                    background: 'none', border: 'none', cursor: resendCd > 0 ? 'default' : 'pointer',
                    color: resendCd > 0 ? 'var(--ink-soft)' : 'var(--crimson)',
                    fontSize: 13, fontWeight: 500, fontFamily: 'DM Sans, sans-serif',
                    borderBottom: resendCd > 0 ? 'none' : '1px solid rgba(140,31,40,0.3)',
                    padding: 0,
                  }}
                >
                  {resendCd > 0 ? `Resend in ${resendCd}s` : 'Resend OTP'}
                </button>
              </p>

              <div style={{ marginTop: 20, textAlign: 'center' }}>
                <button
                  onClick={() => { setPhase('credentials'); setOtpErr('') }}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--ink-soft)', fontSize: 13, fontFamily: 'DM Sans, sans-serif',
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M13 7H1M7 13L1 7l6-6"
                      stroke="currentColor" strokeWidth="1.4"
                      strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Back to sign in
                </button>
              </div>
            </>
          )}

          {/* ════ CREDENTIALS PHASE ════ */}
          {phase === 'credentials' && (
            <>
              <div className="sf-header">
                <h1 className="sf-title">Sign <em>In</em></h1>
                <p className="sf-subtitle">
                  New to Blood Circle?{' '}
                  <a href="/become-donor">Create a free account →</a>
                </p>
              </div>

              {/* Tab switcher */}
              <div className="sf-tabs">
                <button
                  className={`sf-tab ${tab === 'email' ? 'active' : ''}`}
                  onClick={() => switchTab('email')}
                >
                  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1.5" y="3.5" width="13" height="9" rx="1.5"
                      stroke="currentColor" strokeWidth="1.3"/>
                    <path d="M1.5 5.5l6.5 4 6.5-4"
                      stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                  Email
                </button>
                <button
                  className={`sf-tab ${tab === 'phone' ? 'active' : ''}`}
                  onClick={() => switchTab('phone')}
                >
                  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="1" width="8" height="14" rx="1.5"
                      stroke="currentColor" strokeWidth="1.3"/>
                    <circle cx="8" cy="12.5" r="0.8" fill="currentColor"/>
                  </svg>
                  Phone / OTP
                </button>
              </div>

              {/* ── EMAIL FORM ── */}
              {tab === 'email' && (
                <>
                  {/* Email */}
                  <div className="sf-field">
                    <label className="sf-label">Email Address</label>
                    <div className="sf-input-wrap">
                      <span className="sf-icon">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <rect x="1.5" y="3.5" width="13" height="9" rx="1.5"
                            stroke="currentColor" strokeWidth="1.3"/>
                          <path d="M1.5 5.5l6.5 4 6.5-4"
                            stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                        </svg>
                      </span>
                      <input
                        className={`sf-input ${emailErr ? 'has-error' : email ? 'has-success' : ''}`}
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={e => { setEmail(e.target.value); if (emailErr) setEmailErr('') }}
                        onBlur={() => setEmailErr(validateEmail(email))}
                        autoComplete="email"
                      />
                      {email && !emailErr && (
                        <span className="sf-status-icon success">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8l4 4 6-6" stroke="currentColor" strokeWidth="1.5"
                              strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      )}
                    </div>
                    {emailErr && (
                      <div className="sf-error-msg">
                        <svg viewBox="0 0 12 12" fill="none">
                          <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
                          <path d="M6 4v3M6 8.5v.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                        </svg>
                        {emailErr}
                      </div>
                    )}
                  </div>

                  {/* Password */}
                  <div className="sf-field">
                    <label className="sf-label">
                      Password
                      <a href="/forgot-password" className="sf-label-link">Forgot password?</a>
                    </label>
                    <div className="sf-input-wrap">
                      <span className="sf-icon">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <rect x="3" y="7" width="10" height="7" rx="1.5"
                            stroke="currentColor" strokeWidth="1.3"/>
                          <path d="M5 7V5a3 3 0 016 0v2"
                            stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                          <circle cx="8" cy="10.5" r="1" fill="currentColor"/>
                        </svg>
                      </span>
                      <input
                        className={`sf-input ${passErr ? 'has-error' : ''}`}
                        type={showPass ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={password}
                        onChange={e => { setPass(e.target.value); if (passErr) setPassErr('') }}
                        onBlur={() => setPassErr(validatePass(password))}
                        autoComplete="current-password"
                      />
                      <button
                        className="sf-eye"
                        type="button"
                        onClick={() => setShowPass(s => !s)}
                        aria-label={showPass ? 'Hide password' : 'Show password'}
                      >
                        <EyeIcon show={showPass} />
                      </button>
                    </div>
                    {passErr && (
                      <div className="sf-error-msg">
                        <svg viewBox="0 0 12 12" fill="none">
                          <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
                          <path d="M6 4v3M6 8.5v.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                        </svg>
                        {passErr}
                      </div>
                    )}
                  </div>

                  {/* Remember */}
                  <div className="sf-options">
                    <label className="sf-remember">
                      <input
                        type="checkbox"
                        checked={remember}
                        onChange={e => setRemember(e.target.checked)}
                      />
                      <div className="sf-check-box"></div>
                      <span className="sf-remember-label">Keep me signed in</span>
                    </label>
                  </div>

                  {/* Submit */}
                  <button
                    className={`sf-submit ${loading ? 'loading' : ''}`}
                    onClick={handleEmailSubmit}
                    disabled={loading}
                  >
                    <div className="sf-spinner"></div>
                    <span className="sf-btn-text" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span>Sign In to Blood Circle</span>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5"
                          strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </button>

                  {/* Divider */}
                  <div className="sf-divider">
                    <div className="sf-divider-line"></div>
                    <span className="sf-divider-text">or continue with</span>
                    <div className="sf-divider-line"></div>
                  </div>

                  {/* Social */}
                  <div className="sf-socials">
                    <button className="sf-social-btn">
                      {/* Google */}
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      Google
                    </button>
                    <button className="sf-social-btn" onClick={() => switchTab('phone')}>
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="4" y="1" width="8" height="14" rx="1.5"
                          stroke="var(--crimson)" strokeWidth="1.3"/>
                        <circle cx="8" cy="12.5" r="0.8" fill="var(--crimson)"/>
                      </svg>
                      <span style={{ color: 'var(--crimson)' }}>Phone OTP</span>
                    </button>
                  </div>
                </>
              )}

              {/* ── PHONE FORM ── */}
              {tab === 'phone' && (
                <>
                  <div className="sf-field">
                    <label className="sf-label">Mobile Number</label>
                    <div className="sf-phone-wrap">
                      <select className="sf-country-code" defaultValue="+880">
                        <option value="+880">🇧🇩 +880</option>
<option value="+93">🇦🇫 +93</option>
<option value="+355">🇦🇱 +355</option>
<option value="+213">🇩🇿 +213</option>
<option value="+376">🇦🇩 +376</option>
<option value="+244">🇦🇴 +244</option>
<option value="+1264">🇦🇮 +1264</option>
<option value="+1268">🇦🇬 +1268</option>
<option value="+54">🇦🇷 +54</option>
<option value="+374">🇦🇲 +374</option>
<option value="+297">🇦🇼 +297</option>
<option value="+61">🇦🇺 +61</option>
<option value="+43">🇦🇹 +43</option>
<option value="+994">🇦🇿 +994</option>
<option value="+1242">🇧🇸 +1242</option>
<option value="+973">🇧🇭 +973</option>
<option value="+1246">🇧🇧 +1246</option>
<option value="+375">🇧🇾 +375</option>
<option value="+32">🇧🇪 +32</option>
<option value="+501">🇧🇿 +501</option>
<option value="+229">🇧🇯 +229</option>
<option value="+1441">🇧🇲 +1441</option>
<option value="+975">🇧🇹 +975</option>
<option value="+591">🇧🇴 +591</option>
<option value="+387">🇧🇦 +387</option>
<option value="+267">🇧🇼 +267</option>
<option value="+55">🇧🇷 +55</option>
<option value="+673">🇧🇳 +673</option>
<option value="+359">🇧🇬 +359</option>
<option value="+226">🇧🇫 +226</option>
<option value="+257">🇧🇮 +257</option>
<option value="+855">🇰🇭 +855</option>
<option value="+237">🇨🇲 +237</option>
<option value="+1">🇨🇦 +1</option>
<option value="+238">🇨🇻 +238</option>
<option value="+1345">🇰🇾 +1345</option>
<option value="+236">🇨🇫 +236</option>
<option value="+56">🇨🇱 +56</option>
<option value="+86">🇨🇳 +86</option>
<option value="+57">🇨🇴 +57</option>
<option value="+269">🇰🇲 +269</option>
<option value="+242">🇨🇬 +242</option>
<option value="+682">🇨🇰 +682</option>
<option value="+506">🇨🇷 +506</option>
<option value="+385">🇭🇷 +385</option>
<option value="+53">🇨🇺 +53</option>
<option value="+357">🇨🇾 +357</option>
<option value="+420">🇨🇿 +420</option>
<option value="+45">🇩🇰 +45</option>
<option value="+253">🇩🇯 +253</option>
<option value="+1767">🇩🇲 +1767</option>
<option value="+1809">🇩🇴 +1809</option>
<option value="+593">🇪🇨 +593</option>
<option value="+20">🇪🇬 +20</option>
<option value="+503">🇸🇻 +503</option>
<option value="+240">🇬🇶 +240</option>
<option value="+291">🇪🇷 +291</option>
<option value="+372">🇪🇪 +372</option>
<option value="+251">🇪🇹 +251</option>
<option value="+500">🇫🇰 +500</option>
<option value="+298">🇫🇴 +298</option>
<option value="+679">🇫🇯 +679</option>
<option value="+358">🇫🇮 +358</option>
<option value="+33">🇫🇷 +33</option>
<option value="+594">🇬🇫 +594</option>
<option value="+689">🇵🇫 +689</option>
<option value="+241">🇬🇦 +241</option>
<option value="+220">🇬🇲 +220</option>
<option value="+995">🇬🇪 +995</option>
<option value="+49">🇩🇪 +49</option>
<option value="+233">🇬🇭 +233</option>
<option value="+350">🇬🇮 +350</option>
<option value="+30">🇬🇷 +30</option>
<option value="+299">🇬🇱 +299</option>
<option value="+1473">🇬🇩 +1473</option>
<option value="+590">🇬🇵 +590</option>
<option value="+671">🇬🇺 +671</option>
<option value="+502">🇬🇹 +502</option>
<option value="+224">🇬🇳 +224</option>
<option value="+245">🇬🇼 +245</option>
<option value="+592">🇬🇾 +592</option>
<option value="+509">🇭🇹 +509</option>
<option value="+504">🇭🇳 +504</option>
<option value="+852">🇭🇰 +852</option>
<option value="+36">🇭🇺 +36</option>
<option value="+354">🇮🇸 +354</option>
<option value="+91">🇮🇳 +91</option>
<option value="+62">🇮🇩 +62</option>
<option value="+98">🇮🇷 +98</option>
<option value="+964">🇮🇶 +964</option>
<option value="+353">🇮🇪 +353</option>
<option value="+972">🇮🇱 +972</option>
<option value="+39">🇮🇹 +39</option>
<option value="+1876">🇯🇲 +1876</option>
<option value="+81">🇯🇵 +81</option>
<option value="+962">🇯🇴 +962</option>
<option value="+7">🇰🇿 +7</option>
<option value="+254">🇰🇪 +254</option>
<option value="+686">🇰🇮 +686</option>
<option value="+850">🇰🇵 +850</option>
<option value="+82">🇰🇷 +82</option>
<option value="+965">🇰🇼 +965</option>
<option value="+996">🇰🇬 +996</option>
<option value="+856">🇱🇦 +856</option>
<option value="+371">🇱🇻 +371</option>
<option value="+961">🇱🇧 +961</option>
<option value="+266">🇱🇸 +266</option>
<option value="+231">🇱🇷 +231</option>
<option value="+218">🇱🇾 +218</option>
<option value="+417">🇱🇮 +417</option>
<option value="+370">🇱🇹 +370</option>
<option value="+352">🇱🇺 +352</option>
<option value="+853">🇲🇴 +853</option>
<option value="+389">🇲🇰 +389</option>
<option value="+261">🇲🇬 +261</option>
<option value="+265">🇲🇼 +265</option>
<option value="+60">🇲🇾 +60</option>
<option value="+960">🇲🇻 +960</option>
<option value="+223">🇲🇱 +223</option>
<option value="+356">🇲🇹 +356</option>
<option value="+692">🇲🇭 +692</option>
<option value="+596">🇲🇶 +596</option>
<option value="+222">🇲🇷 +222</option>
<option value="+230">🇲🇺 +230</option>
<option value="+269">🇾🇹 +269</option>
<option value="+52">🇲🇽 +52</option>
<option value="+691">🇫🇲 +691</option>
<option value="+373">🇲🇩 +373</option>
<option value="+377">🇲🇨 +377</option>
<option value="+976">🇲🇳 +976</option>
<option value="+1664">🇲🇸 +1664</option>
<option value="+212">🇲🇦 +212</option>
<option value="+258">🇲🇿 +258</option>
<option value="+95">🇲🇲 +95</option>
<option value="+264">🇳🇦 +264</option>
<option value="+674">🇳🇷 +674</option>
<option value="+977">🇳🇵 +977</option>
<option value="+31">🇳🇱 +31</option>
<option value="+687">🇳🇨 +687</option>
<option value="+64">🇳🇿 +64</option>
<option value="+505">🇳🇮 +505</option>
<option value="+227">🇳🇪 +227</option>
<option value="+234">🇳🇬 +234</option>
<option value="+683">🇳🇺 +683</option>
<option value="+672">🇳🇫 +672</option>
<option value="+670">🇲🇵 +670</option>
<option value="+47">🇳🇴 +47</option>
<option value="+968">🇴🇲 +968</option>
<option value="+92">🇵🇰 +92</option>
<option value="+680">🇵🇼 +680</option>
<option value="+507">🇵🇦 +507</option>
<option value="+675">🇵🇬 +675</option>
<option value="+595">🇵🇾 +595</option>
<option value="+51">🇵🇪 +51</option>
<option value="+63">🇵🇭 +63</option>
<option value="+48">🇵🇱 +48</option>
<option value="+351">🇵🇹 +351</option>
<option value="+1787">🇵🇷 +1787</option>
<option value="+974">🇶🇦 +974</option>
<option value="+262">🇷🇪 +262</option>
<option value="+40">🇷🇴 +40</option>
<option value="+7">🇷🇺 +7</option>
<option value="+250">🇷🇼 +250</option>
<option value="+378">🇸🇲 +378</option>
<option value="+239">🇸🇹 +239</option>
<option value="+966">🇸🇦 +966</option>
<option value="+221">🇸🇳 +221</option>
<option value="+381">🇷🇸 +381</option>
<option value="+248">🇸🇨 +248</option>
<option value="+232">🇸🇱 +232</option>
<option value="+65">🇸🇬 +65</option>
<option value="+421">🇸🇰 +421</option>
<option value="+386">🇸🇮 +386</option>
<option value="+677">🇸🇧 +677</option>
<option value="+252">🇸🇴 +252</option>
<option value="+27">🇿🇦 +27</option>
<option value="+34">🇪🇸 +34</option>
<option value="+94">🇱🇰 +94</option>
<option value="+290">🇸🇭 +290</option>
<option value="+1869">🇰🇳 +1869</option>
<option value="+1758">🇱🇨 +1758</option>
<option value="+508">🇵🇲 +508</option>
<option value="+1784">🇻🇨 +1784</option>
<option value="+249">🇸🇩 +249</option>
<option value="+597">🇸🇷 +597</option>
<option value="+268">🇸🇿 +268</option>
<option value="+46">🇸🇪 +46</option>
<option value="+41">🇨🇭 +41</option>
<option value="+963">🇸🇾 +963</option>
<option value="+886">🇹🇼 +886</option>
<option value="+992">🇹🇯 +992</option>
<option value="+255">🇹🇿 +255</option>
<option value="+66">🇹🇭 +66</option>
<option value="+228">🇹🇬 +228</option>
<option value="+690">🇹🇰 +690</option>
<option value="+676">🇹🇴 +676</option>
<option value="+1868">🇹🇹 +1868</option>
<option value="+216">🇹🇳 +216</option>
<option value="+90">🇹🇷 +90</option>
<option value="+993">🇹🇲 +993</option>
<option value="+1649">🇹🇨 +1649</option>
<option value="+688">🇹🇻 +688</option>
<option value="+256">🇺🇬 +256</option>
<option value="+380">🇺🇦 +380</option>
<option value="+971">🇦🇪 +971</option>
<option value="+44">🇬🇧 +44</option>
<option value="+1">🇺🇸 +1</option>
<option value="+598">🇺🇾 +598</option>
<option value="+998">🇺🇿 +998</option>
<option value="+678">🇻🇺 +678</option>
| <option value="+379">🇻🇦 +379</option>
<option value="+58">🇻🇪 +58</option>
<option value="+84">🇻🇳 +84</option>
<option value="+1284">🇻🇬 +1284</option>
<option value="+1340">🇻🇮 +1340</option>
<option value="+681">🇼🇫 +681</option>
<option value="+969">🇾🇪 +969</option>
<option value="+260">🇿🇲 +260</option>
<option value="+263">🇿🇼 +263</option>
                      </select>
                      <input
                        className={`sf-input ${phoneErr ? 'has-error' : phone ? 'has-success' : ''}`}
                        type="tel"
                        placeholder="10-digit mobile number"
                        value={phone}
                        onChange={e => {
                          const v = e.target.value.replace(/\D/g, '').slice(0, 10)
                          setPhone(v)
                          if (phoneErr) setPhoneErr('')
                        }}
                        onBlur={() => setPhoneErr(validatePhone(phone))}
                        autoComplete="tel"
                      />
                    </div>
                    {phoneErr && (
                      <div className="sf-error-msg">
                        <svg viewBox="0 0 12 12" fill="none">
                          <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
                          <path d="M6 4v3M6 8.5v.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                        </svg>
                        {phoneErr}
                      </div>
                    )}
                  </div>

                  <p style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginBottom: 20, lineHeight: 1.6 }}>
                    We'll send a one-time password to this number. Standard SMS rates may apply.
                  </p>

                  <div className="sf-options">
                    <label className="sf-remember">
                      <input
                        type="checkbox"
                        checked={remember}
                        onChange={e => setRemember(e.target.checked)}
                      />
                      <div className="sf-check-box"></div>
                      <span className="sf-remember-label">Keep me signed in</span>
                    </label>
                  </div>

                  <button
                    className={`sf-submit ${loading ? 'loading' : ''}`}
                    onClick={handlePhoneSubmit}
                    disabled={loading}
                  >
                    <div className="sf-spinner"></div>
                    <span className="sf-btn-text" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span>Send OTP</span>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5"
                          strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </button>

                  <div className="sf-divider">
                    <div className="sf-divider-line"></div>
                    <span className="sf-divider-text">or</span>
                    <div className="sf-divider-line"></div>
                  </div>

                  <div className="sf-socials" style={{ gridTemplateColumns: '1fr' }}>
                    <button className="sf-social-btn">
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      Continue with Google
                    </button>
                  </div>
                </>
              )}

              {/* ── Footer ── */}
              <div className="sf-footer">
                <p className="sf-footer-text">
                  Don't have an account?{' '}
                  <a href="/become-donor">Register as a Donor →</a>
                </p>
                <p className="sf-terms">
                  By signing in you agree to our{' '}
                  <a href="#">Terms of Service</a> and{' '}
                  <a href="#">Privacy Policy</a>.
                </p>
              </div>
            </>
          )}

        </div>{/* /signin-form-wrap */}
      </div>{/* /signin-right */}

    </div>/* /signin-page */
  )
}