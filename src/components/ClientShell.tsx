'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith('/dashboard')
  const loaderRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    /* ── Page Loader ── */
    const loader = document.getElementById('page-loader') as HTMLDivElement | null
    if (loader) {
      // Animate blood drop fill
      const fillRect = loader.querySelector('.drop-fill') as SVGRectElement | null
      const pctEl   = loader.querySelector('#ldr-pct') as HTMLElement | null
      const outline  = loader.querySelector('.drop-outline') as SVGPathElement | null

      if (outline) {
        const len = outline.getTotalLength?.() ?? 180
        outline.style.strokeDasharray  = String(len)
        outline.style.strokeDashoffset = String(len)
        requestAnimationFrame(() => { outline.style.strokeDashoffset = '0' })
      }

      let pct = 0
      const tick = setInterval(() => {
        pct = Math.min(pct + Math.random() * 18 + 4, 100)
        if (pctEl) pctEl.textContent = Math.floor(pct) + '%'
        if (fillRect) fillRect.setAttribute('y', String(92 - (pct / 100) * 84))
        if (pct >= 100) {
          clearInterval(tick)
          setTimeout(() => {
            loader.classList.add('exiting')
            setTimeout(() => loader.classList.add('hidden'), 700)
          }, 300)
        }
      }, 80)
    }

    /* ── Custom Cursor ── */
    const dot  = document.getElementById('cursor-dot')
    const ring = document.getElementById('cursor-ring')
    if (!dot || !ring) return

    let mx = 0, my = 0, rx = 0, ry = 0
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    document.addEventListener('mousemove', onMove)

    let raf: number
    const animate = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      dot.style.left  = mx + 'px'
      dot.style.top   = my + 'px'
      ring.style.left = rx + 'px'
      ring.style.top  = ry + 'px'
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    const hoverEls = 'a, button, [data-hover], input, select, textarea, label'
    const onEnter = () => document.body.classList.add('cursor-hover')
    const onLeave = () => document.body.classList.remove('cursor-hover')
    document.querySelectorAll(hoverEls).forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    /* ── Scroll-reveal ── */
    const revealObs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { (e.target as HTMLElement).classList.add('visible'); revealObs.unobserve(e.target) } })
    }, { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el))

    /* ── Nav scroll state ── */
    const nav = document.querySelector('nav')
    const onScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 20)
    window.addEventListener('scroll', onScroll)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
      revealObs.disconnect()
    }
  }, [])

  return (
    <>
      {!isDashboard && <Navbar />}
      {children}
      {!isDashboard && <Footer />}
    </>
  )
}