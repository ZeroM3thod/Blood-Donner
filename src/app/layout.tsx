import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ClientShell from '@/components/ClientShell'

export const metadata: Metadata = {
  title: 'Blood Circle — Give Life, Save Lives',
  description: 'Blood Circle connects verified blood donors with those who need them most — instantly, safely, and compassionately.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>

        {/* ══════════════════════════════════════════
            MEDICAL TERMINAL BOOT LOADER
            ══════════════════════════════════════════ */}
        <div id="page-loader">

          {/* Atmosphere layers */}
          <div className="ldr-vignette"></div>
          <div className="ldr-grain"></div>
          <div className="ldr-grid"></div>
          <div className="ldr-scan"></div>

          {/* Corner medical cross marks */}
          <div className="ldr-corner tl"></div>
          <div className="ldr-corner tr"></div>
          <div className="ldr-corner bl"></div>
          <div className="ldr-corner br"></div>

          {/* Corner labels */}
          <div className="ldr-corner-label tl">BC-SYS-2025</div>
          <div className="ldr-corner-label br">v2.4.1 · INDIA</div>

          {/* ── Main content ── */}
          <div className="ldr-content">

            {/* Brand */}
            <div className="ldr-brand">
              <div className="ldr-brand-mark"></div>
              <div className="ldr-brand-texts">
                <div className="ldr-brand-name">Blood<span>Circle</span></div>
                <div className="ldr-brand-sub">Life · Humanity · Hope</div>
              </div>
            </div>

            {/* Giant percentage number */}
            <div className="ldr-pct-huge" id="ldr-pct-huge">
              0<span className="ldr-pct-sign">%</span>
            </div>

            {/* Progress bar */}
            <div className="ldr-bar-wrap">
              <div className="ldr-bar-meta">
                <span className="ldr-bar-meta-left">System Loading</span>
                <span className="ldr-bar-meta-right" id="ldr-bar-label">Initializing…</span>
              </div>
              <div className="ldr-bar-track">
                <div className="ldr-bar-fill" id="ldr-bar-fill"></div>
              </div>
            </div>

            {/* Terminal boot log */}
            <div className="ldr-terminal">
              <div className="ldr-log-line" id="ldr-line-0">
                <span className="ldr-prompt">▸</span>
                <span className="ldr-log-text">Initializing secure donor network</span>
                <span className="ldr-status st-wait" id="ldr-st-0">wait</span>
              </div>
              <div className="ldr-log-line" id="ldr-line-1">
                <span className="ldr-prompt">▸</span>
                <span className="ldr-log-text">Loading blood type registry</span>
                <span className="ldr-status st-wait" id="ldr-st-1">wait</span>
              </div>
              <div className="ldr-log-line" id="ldr-line-2">
                <span className="ldr-prompt">▸</span>
                <span className="ldr-log-text">Verifying 48,200+ active donors</span>
                <span className="ldr-status st-wait" id="ldr-st-2">wait</span>
              </div>
              <div className="ldr-log-line" id="ldr-line-3">
                <span className="ldr-prompt">▸</span>
                <span className="ldr-log-text">Establishing secure session</span>
                <span className="ldr-status st-wait" id="ldr-st-3">wait</span>
              </div>
            </div>

            {/* EKG heartbeat line */}
            <div className="ldr-ekg-wrap">
              <svg
                className="ldr-ekg"
                viewBox="0 0 320 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <polyline
                  className="ekg-line"
                  points="0,24 40,24 52,24 58,8 64,40 70,4 76,44 82,24 94,24 134,24 140,24 146,8 152,40 158,4 164,44 170,24 182,24 222,24 228,24 234,8 240,40 246,4 252,44 258,24 270,24 320,24"
                  stroke="#8C1F28" strokeWidth="1.5" fill="none"
                  strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
            </div>

          </div>

          {/* ── Split-panel exit curtains ── */}
          <div className="ldr-panel-top"></div>
          <div className="ldr-panel-bot"></div>

        </div>

        {/* Custom Cursor */}
        <div id="cursor-dot"></div>
        <div id="cursor-ring"></div>

        <ClientShell>
          {children}
        </ClientShell>

      </body>
    </html>
  )
}