'use client'

import { useEffect } from 'react'

export default function ClientShell({ children }: { children: React.ReactNode }) {
  useEffect(() => {

    // ── ENHANCED PAGE LOADER ──────────────────────────────────────────────
    const loader    = document.getElementById('page-loader')
    const pctEl     = document.getElementById('ldr-pct')
    const dropFill  = document.querySelector('.drop-fill') as SVGRectElement | null
    const dropOutline = document.querySelector('.drop-outline') as SVGPathElement | null

    if (loader && pctEl && dropFill) {

      // Phase 1 — Animate the percentage counter & drop fill (0 → 100 over ~1400ms)
      const DURATION = 1400
      let start: number | null = null

      // Set the drop-outline stroke-dasharray once we know its length
      if (dropOutline) {
        const len = dropOutline.getTotalLength()
        dropOutline.style.strokeDasharray  = `${len}`
        dropOutline.style.strokeDashoffset = `${len}`
      }

      const tick = (ts: number) => {
        if (!start) start = ts
        const elapsed = ts - start
        const raw = Math.min(elapsed / DURATION, 1)
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - raw, 3)
        const pct = Math.round(eased * 100)

        // Update counter text
        pctEl.textContent = `${pct}%`

        // Rise the fill rect: y goes from 92 (bottom) → 0 (fully filled)
        // drop coords: top≈8, bottom≈92, so height = 84
        // We start at y=92 (no fill) and move to y=8 (full)
        const fillY = 92 - eased * 84
        dropFill.setAttribute('y', String(fillY))
        dropFill.setAttribute('height', String(92 - fillY + 92)) // ensure it always covers

        // Draw the outline stroke
        if (dropOutline) {
          const len = parseFloat(dropOutline.style.strokeDasharray)
          dropOutline.style.strokeDashoffset = String(len * (1 - eased))
        }

        if (raw < 1) {
          requestAnimationFrame(tick)
        } else {
          // Phase 2 — Brief pause then exit
          setTimeout(exitLoader, 300)
        }
      }

      requestAnimationFrame(tick)

      // Phase 3 — Exit: scale up + fade out
      const exitLoader = () => {
        loader.classList.add('exiting')
        setTimeout(() => {
          loader.classList.add('hidden')
        }, 800)
      }
    }

    // ── CUSTOM CURSOR ────────────────────────────────────────────────────
    const dot  = document.getElementById('cursor-dot')
    const ring = document.getElementById('cursor-ring')
    let mx = -100, my = -100, rx = -100, ry = -100

    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      if (dot) { dot.style.left = mx + 'px'; dot.style.top = my + 'px' }
    }
    document.addEventListener('mousemove', handleMouseMove)

    let rafId: number
    const animateRing = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px' }
      rafId = requestAnimationFrame(animateRing)
    }
    animateRing()

    const onEnter = () => document.body.classList.add('cursor-hover')
    const onLeave = () => document.body.classList.remove('cursor-hover')
    const attachCursorHover = () => {
      document.querySelectorAll(
        'a, button, label, .donor-card, .bt-card, .step-card, .feature-item, .bt-f-label, .filter-check-item, .avail-label, .cond-label, .bt-label'
      ).forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    attachCursorHover()

    // ── NAV SCROLL ───────────────────────────────────────────────────────
    const nav = document.getElementById('main-nav')
    const handleScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)

    // ── SCROLL REVEAL ────────────────────────────────────────────────────
    const reveals = document.querySelectorAll('.reveal')
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 60)
          revealObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' })
    reveals.forEach(r => revealObserver.observe(r))

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', handleScroll)
      revealObserver.disconnect()
    }
  }, [])

  return <>{children}</>
}