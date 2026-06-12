'use client';

import { useEffect, useRef, useState } from 'react';

export default function PortfolioLoader() {
  const [visible, setVisible] = useState(true);
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    // Block ALL visibility immediately — before any paint
    document.documentElement.style.visibility = 'hidden';

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
    script.onload = () => {
      // Show the overlay itself, keep rest hidden
      document.documentElement.style.visibility = 'visible';
      const overlay = document.getElementById('pl-overlay');
      if (overlay) overlay.style.visibility = 'visible';

      // Keep page content hidden until wipe covers the screen
      const pageContent = document.querySelector<HTMLElement>('#page-content, main, .layout');
      const navbar = document.querySelector<HTMLElement>('nav, .navbar, header');
      if (pageContent) pageContent.style.visibility = 'hidden';
      if (navbar) navbar.style.visibility = 'hidden';

      init(pageContent, navbar);
    };
    document.head.appendChild(script);

    return () => {
      document.documentElement.style.visibility = '';
      if (document.head.contains(script)) document.head.removeChild(script);
    };
  }, []);

  function init(
    pageContent: HTMLElement | null,
    navbar: HTMLElement | null,
  ) {
    const gsap = (window as any).gsap;
    const path1 = path1Ref.current;
    const path2 = path2Ref.current;
    if (!path1 || !path2 || !gsap) return;

    const paths = [path1, path2];

    paths.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = String(length);
      path.style.strokeDashoffset = String(length);
    });

    // ── Phase 1: draw paths in (covers screen) ──
    const tl = gsap.timeline({
      onComplete: () => {
        // Screen is now fully covered — safe to reveal page behind
        if (pageContent) pageContent.style.visibility = 'visible';
        if (navbar) navbar.style.visibility = 'visible';
        exitAnimation(gsap, paths);
      },
    });

    paths.forEach((path) => {
      tl.to(
        path,
        {
          strokeDashoffset: 0,
          attr: { 'stroke-width': 700 },
          duration: 1,
          ease: 'power1.inOut',
        },
        0,
      );
    });
  }

  function exitAnimation(gsap: any, paths: SVGPathElement[]) {
    // ── Phase 2: sweep paths out, reveal page ──
    const tl = gsap.timeline({
      onComplete: () => setVisible(false),
    });

    paths.forEach((path) => {
      const length = path.getTotalLength();
      tl.to(
        path,
        {
          strokeDashoffset: -length,
          attr: { 'stroke-width': 200 },
          duration: 1,
          ease: 'power1.inOut',
          onComplete: () => gsap.set(path, { strokeDashoffset: length }),
        },
        0,
      );
    });
  }

  if (!visible) return null;

  return (
    <>
      <style>{`
        #pl-overlay {
          position: fixed;
          inset: 0;
          z-index: 99999;
          pointer-events: none;
          /* solid background so nothing bleeds through the transparent stroke gaps */
          background: #f0f2ef;
          visibility: hidden;
        }
        #pl-overlay svg {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(1.5);
          width: 100%;
          height: 100%;
        }
        #pl-overlay path {
          stroke-dashoffset: 99999;
          stroke-dasharray: 99999;
        }
      `}</style>

      <div id="pl-overlay" aria-hidden="true">
        <svg
          viewBox="0 0 2453 2535"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            ref={path1Ref}
            d="M227.549 1818.76C227.549 1818.76 406.016 2207.75 569.049 2130.26C843.431 1999.85 -264.104 1002.3 227.549 876.262C552.918 792.849 773.647 2456.11 1342.05 2130.26C1885.43 1818.76 14.9644 455.772 760.548 137.262C1342.05 -111.152 1663.5 2266.35 2209.55 1972.76C2755.6 1679.18 1536.63 384.467 1826.55 137.262C2013.5 -22.1463 2209.55 381.262 2209.55 381.262"
            stroke="rgba(200,70,70)"
            strokeWidth="200"
            strokeLinecap="round"
          />
          <path
            ref={path2Ref}
            d="M1661.28 2255.51C1661.28 2255.51 2311.09 1960.37 2111.78 1817.01C1944.47 1696.67 718.456 2870.17 499.781 2255.51C308.969 1719.17 2457.51 1613.83 2111.78 963.512C1766.05 313.198 427.949 2195.17 132.281 1455.51C-155.219 736.292 2014.78 891.514 1708.78 252.012C1437.81 -314.29 369.471 909.169 132.281 566.512C18.1772 401.672 244.781 193.012 244.781 193.012"
            stroke="rgba(200,70,70)"
            strokeWidth="200"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </>
  );
}