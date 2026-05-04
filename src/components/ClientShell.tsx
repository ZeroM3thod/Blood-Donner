'use client'

import { useEffect } from 'react'

export default function ClientShell({ children }: { children: React.ReactNode }) {
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
      mx = e.clientX
      my = e.clientY
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
      document.querySelectorAll('a, button, label, .donor-card, .bt-card, .step-card, .feature-item, .bt-f-label, .filter-check-item, .avail-label, .cond-label, .bt-label').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    attachCursorHover()

    // ── Nav Scroll
    const nav = document.getElementById('main-nav')
    const handleScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)

    // ── Scroll Reveal
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
    }
  }, [])

  return <>{children}</>
}
