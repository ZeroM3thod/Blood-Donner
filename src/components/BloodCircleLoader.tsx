'use client';

import { useEffect, useState } from 'react';

export default function BloodCircleLoader() {
  const [visible, setVisible]   = useState(true);
  const [exiting, setExiting]   = useState(false);
  const [pct, setPct]           = useState(0);
  const [label, setLabel]       = useState('Initializing…');

  useEffect(() => {
    const steps: [number, number, string][] = [
      [260,  18, 'Initializing…'],
      [560,  38, 'Loading donor registry…'],
      [900,  58, 'Verifying network…'],
      [1280, 78, 'Securing session…'],
      [1700, 92, 'Almost ready…'],
      [2100, 100,'System ready.'],
    ];

    const timers: ReturnType<typeof setTimeout>[] = [];

    steps.forEach(([delay, val, lbl]) => {
      timers.push(setTimeout(() => {
        setPct(val);
        setLabel(lbl);
      }, delay));
    });

    // Start exit after 2.4 s
    const exitTimer = setTimeout(() => setExiting(true), 2400);
    // Remove from DOM after fade
    const doneTimer = setTimeout(() => setVisible(false), 3400);

    timers.push(exitTimer, doneTimer);
    return () => timers.forEach(clearTimeout);
  }, []);

  if (!visible) return null;

  return (
    <>
      <style>{`
        #bc-loader {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: #F7F3EC;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          transition: opacity 0.9s cubic-bezier(.4,0,.2,1),
                      visibility 0.9s cubic-bezier(.4,0,.2,1);
          will-change: opacity;
        }
        #bc-loader.exiting {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        /* Subtle radial glow */
        #bc-loader::after {
          content: '';
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle,
            rgba(140,31,40,0.06) 0%,
            transparent 70%);
          top: 50%; left: 50%;
          transform: translate(-50%,-50%);
          animation: bc-breathe 3s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes bc-breathe {
          0%,100% { transform: translate(-50%,-50%) scale(1);    opacity: 0.7; }
          50%      { transform: translate(-50%,-50%) scale(1.15); opacity: 1; }
        }

        /* Corner brackets */
        .bc-corner {
          position: absolute;
          width: 22px; height: 22px;
          opacity: 0;
          animation: bc-in 0.5s 0.25s ease forwards;
        }
        .bc-corner.tl { top:32px; left:32px;  border-top:1px solid rgba(140,31,40,0.18); border-left:1px solid rgba(140,31,40,0.18); }
        .bc-corner.tr { top:32px; right:32px; border-top:1px solid rgba(140,31,40,0.18); border-right:1px solid rgba(140,31,40,0.18); }
        .bc-corner.bl { bottom:32px; left:32px;  border-bottom:1px solid rgba(140,31,40,0.18); border-left:1px solid rgba(140,31,40,0.18); }
        .bc-corner.br { bottom:32px; right:32px; border-bottom:1px solid rgba(140,31,40,0.18); border-right:1px solid rgba(140,31,40,0.18); }
        @keyframes bc-in { to { opacity:1; } }

        /* Content */
        .bc-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Ring wrap */
        .bc-ring-wrap {
          position: relative;
          width: 190px; height: 190px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .bc-orbit { position: absolute; inset: 0; }
        .bc-orbit-track { stroke: rgba(140,31,40,0.08); fill: none; stroke-width: 1; }
        .bc-orbit-arc {
          fill: none;
          stroke: rgba(140,31,40,0.3);
          stroke-width: 1;
          stroke-linecap: round;
          stroke-dasharray: 489;
          stroke-dashoffset: 489;
          transform-origin: center;
          transform: rotate(-90deg);
          animation: bc-arc 2s 0.35s cubic-bezier(.4,0,.2,1) forwards;
        }
        @keyframes bc-arc { to { stroke-dashoffset: 0; } }

        .bc-ticks {
          position: absolute; inset: 0;
          animation: bc-spin 14s linear infinite;
        }
        @keyframes bc-spin { to { transform: rotate(360deg); } }

        /* Badge */
        .bc-badge {
          width: 108px; height: 108px;
          background: #8C1F28;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow:
            0 0 0 1px rgba(140,31,40,0.15),
            0 8px 32px rgba(140,31,40,0.22),
            0 20px 60px rgba(140,31,40,0.10);
          animation: bc-badge-in 0.55s 0.18s ease both;
        }
        @keyframes bc-badge-in {
          from { opacity:0; transform:scale(0.82); }
          to   { opacity:1; transform:scale(1); }
        }

        /* Inner ring on badge */
        .bc-badge::after {
          content: '';
          width: 52px; height: 52px;
          border: 1.5px solid rgba(255,255,255,0.35);
          border-radius: 50%;
          position: absolute;
        }
        .bc-badge::before {
          content: '';
          width: 20px; height: 20px;
          background: rgba(255,255,255,0.9);
          border-radius: 50%;
          position: absolute;
          z-index: 1;
          animation: bc-dot-pulse 2s ease-in-out infinite;
        }
        @keyframes bc-dot-pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(255,255,255,0.4); }
          50%      { box-shadow: 0 0 0 8px rgba(255,255,255,0); }
        }

        /* Brand */
        .bc-brand {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.9rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: #1C1C1C;
          margin-top: 26px;
          opacity: 0;
          animation: bc-fadeup 0.65s 1.8s ease forwards;
          line-height: 1;
        }
        .bc-brand span { color: #8C1F28; }

        .bc-tagline {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.58rem;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: rgba(107,107,107,0.55);
          margin-top: 6px;
          opacity: 0;
          animation: bc-fadeup 0.6s 2s ease forwards;
        }

        /* Progress bar */
        .bc-bar-wrap {
          width: 160px; height: 1px;
          background: rgba(140,31,40,0.1);
          margin-top: 28px;
          border-radius: 2px;
          overflow: visible;
          opacity: 0;
          animation: bc-fadeup 0.4s 0.5s ease forwards;
          position: relative;
        }
        .bc-bar {
          height: 100%;
          width: 0%;
          background: linear-gradient(90deg, #8C1F28, #A8323D);
          border-radius: 2px;
          transition: width 0.25s cubic-bezier(.4,0,.2,1);
          position: relative;
        }
        /* Leading dot */
        .bc-bar::after {
          content: '';
          position: absolute;
          right: -4px; top: 50%;
          transform: translateY(-50%);
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #A8323D;
          box-shadow: 0 0 8px rgba(168,50,61,0.7), 0 0 18px rgba(168,50,61,0.3);
        }

        /* Label + pct */
        .bc-meta {
          display: flex;
          justify-content: space-between;
          width: 160px;
          margin-top: 10px;
          opacity: 0;
          animation: bc-fadeup 0.4s 0.6s ease forwards;
        }
        .bc-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(107,107,107,0.5);
        }
        .bc-pct {
          font-family: 'Cormorant Garamond', serif;
          font-size: 11px;
          font-weight: 600;
          color: rgba(140,31,40,0.6);
          letter-spacing: 0.04em;
        }

        @keyframes bc-fadeup {
          from { opacity:0; transform:translateY(8px); }
          to   { opacity:1; transform:translateY(0); }
        }

        /* Mobile */
        @media (max-width: 480px) {
          .bc-ring-wrap { width:160px; height:160px; }
          .bc-badge { width:90px; height:90px; }
          .bc-badge::after { width:42px; height:42px; }
          .bc-brand { font-size:1.55rem; }
          .bc-corner { display:none; }
        }
      `}</style>

      <div id="bc-loader" className={exiting ? 'exiting' : ''}>

        {/* Corner marks */}
        <div className="bc-corner tl" />
        <div className="bc-corner tr" />
        <div className="bc-corner bl" />
        <div className="bc-corner br" />

        <div className="bc-content">

          {/* Orbital ring */}
          <div className="bc-ring-wrap">
            <svg className="bc-orbit" viewBox="0 0 190 190" xmlns="http://www.w3.org/2000/svg">
              <circle className="bc-orbit-track" cx="95" cy="95" r="89" />
              <circle className="bc-orbit-arc"   cx="95" cy="95" r="89" />
              <g className="bc-ticks">
                {Array.from({ length: 36 }, (_, i) => {
                  const a  = (i * 10 * Math.PI) / 180;
                  const r1 = 89, r2 = i % 3 === 0 ? 83 : 86;
                  return (
                    <line key={i}
                      x1={95 + r1 * Math.cos(a)} y1={95 + r1 * Math.sin(a)}
                      x2={95 + r2 * Math.cos(a)} y2={95 + r2 * Math.sin(a)}
                      stroke={`rgba(140,31,40,${i % 3 === 0 ? '0.3' : '0.13'})`}
                      strokeWidth={i % 3 === 0 ? '1.2' : '0.7'}
                    />
                  );
                })}
              </g>
            </svg>

            {/* Logo badge */}
            <div className="bc-badge" />
          </div>

          {/* Brand name */}
          <div className="bc-brand">Blood<span>Circle</span></div>
          <div className="bc-tagline">Life · Humanity · Hope</div>

          {/* Progress */}
          <div className="bc-bar-wrap">
            <div className="bc-bar" style={{ width: `${pct}%` }} />
          </div>
          <div className="bc-meta">
            <span className="bc-label">{label}</span>
            <span className="bc-pct">{pct}%</span>
          </div>

        </div>
      </div>
    </>
  );
}