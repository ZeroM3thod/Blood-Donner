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

        {/* ── ENHANCED PAGE LOADER ── */}
        <div id="page-loader">

          {/* Noise texture overlay */}
          <div className="ldr-bg"></div>

          {/* Expanding ripple rings */}
          <div className="ldr-rings">
            <div className="ldr-ring r1"></div>
            <div className="ldr-ring r2"></div>
            <div className="ldr-ring r3"></div>
          </div>

          {/* Blood drop with fill animation */}
          <div className="ldr-drop-wrap">
            <svg className="ldr-drop-svg" viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <clipPath id="dropClip">
                  <path d="M40 8 C40 8 10 40 10 62 C10 80 24 92 40 92 C56 92 70 80 70 62 C70 40 40 8 40 8 Z"/>
                </clipPath>
                <linearGradient id="fillGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#A8323D"/>
                  <stop offset="100%" stopColor="#6B1520"/>
                </linearGradient>
              </defs>
              {/* Drop outline — draws itself */}
              <path
                className="drop-outline"
                d="M40 8 C40 8 10 40 10 62 C10 80 24 92 40 92 C56 92 70 80 70 62 C70 40 40 8 40 8 Z"
                stroke="#8C1F28" strokeWidth="2" fill="none"
              />
              {/* Fill rect clipped to drop shape, rises upward */}
              <rect
                className="drop-fill"
                x="0" y="92" width="80" height="92"
                fill="url(#fillGrad)"
                clipPath="url(#dropClip)"
              />
              {/* Inner shine highlight */}
              <ellipse
                className="drop-shine"
                cx="30" cy="45" rx="6" ry="10"
                fill="rgba(255,255,255,0.15)"
                clipPath="url(#dropClip)"
              />
            </svg>
            {/* Percentage counter */}
            <div className="ldr-drop-pct" id="ldr-pct">0%</div>
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
                stroke="#8C1F28" strokeWidth="2" fill="none"
                strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Logo — letter-by-letter stagger reveal */}
          <div className="ldr-logo">
            {'Blood'.split('').map((ch, i) => (
              <span key={i} className="ldr-ch" style={{ '--i': i } as React.CSSProperties}>{ch}</span>
            ))}
            <span className="ldr-ch ldr-accent" style={{ '--i': 5 } as React.CSSProperties}>C</span>
            {'ircle'.split('').map((ch, i) => (
              <span key={i + 6} className="ldr-ch" style={{ '--i': i + 6 } as React.CSSProperties}>{ch}</span>
            ))}
          </div>

          {/* Tagline */}
          <div className="ldr-tagline">Life · Humanity · Hope</div>

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