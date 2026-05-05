'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith('/dashboard')

  useEffect(() => {
    const loader = document.getElementById('page-loader') as HTMLDivElement | null

    /* ── On dashboard: immediately kill the loader ── */
    if (isDashboard) {
      if (loader) loader.style.display = 'none'
    } else {
      /* ── Page Loader ── */
      if (loader) {
        const fillRect = loader.querySelector('.drop-fill') as SVGRectElement | null
        const pctEl    = loader.querySelector('#ldr-pct')   as HTMLElement | null
        const outline  = loader.querySelector('.drop-outline') as SVGPathElement | null

        /* ── Draw the drop outline (Safari-safe) ── */
        if (outline) {
          let len = 180
          try {
            // getTotalLength can throw or return 0 in some Safari versions
            const computed = outline.getTotalLength?.()
            if (computed && computed > 0) len = computed
          } catch (_) { /* ignore */ }
          outline.style.strokeDasharray  = String(len)
          outline.style.strokeDashoffset = String(len)
          // Use rAF to trigger the CSS transition
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              outline.style.strokeDashoffset = '0'
            })
          })
        }

        /* ── Progress ticker ── */
        let pct = 0
        let done = false

        const finish = () => {
          if (done) return
          done = true
          // Snap to 100% immediately
          if (pctEl)    pctEl.textContent = '100%'
          if (fillRect) fillRect.setAttribute('y', String(92 - 84)) // fully filled
          setTimeout(() => {
            loader.classList.add('exiting')
            setTimeout(() => {
              loader.classList.add('hidden')
              loader.style.pointerEvents = 'none'
            }, 700)
          }, 200)
        }

        // Faster, more consistent increment — never gets stuck
        const INTERVAL = 60   // ms per tick
        const MIN_STEP = 8    // min % per tick
        const MAX_STEP = 20   // max % per tick

        const tick = setInterval(() => {
          if (done) { clearInterval(tick); return }

          // Slow down near 90% to feel natural, but still always advance
          const step = pct < 80
            ? MIN_STEP + Math.random() * (MAX_STEP - MIN_STEP)
            : 3 + Math.random() * 5

          pct = Math.min(pct + step, 99) // never auto-complete to 100 — window load does that

          if (pctEl)    pctEl.textContent = Math.floor(pct) + '%'
          if (fillRect) fillRect.setAttribute('y', String(92 - (pct / 100) * 84))
        }, INTERVAL)

        /* ── Complete on window load OR hard timeout (whichever is first) ── */
        const onLoad = () => { clearInterval(tick); finish() }

        if (document.readyState === 'complete') {
          // Page already loaded (e.g. fast cache hit)
          clearInterval(tick)
          finish()
        } else {
          window.addEventListener('load', onLoad, { once: true })
        }

        // Hard safety net: force-close after 4 s no matter what
        const safetyTimer = setTimeout(() => {
          clearInterval(tick)
          window.removeEventListener('load', onLoad)
          finish()
        }, 4000)

        // Clean up safety timer if load fired naturally
        window.addEventListener('load', () => clearTimeout(safetyTimer), { once: true })
      }
    }

    /* ── Custom Cursor (desktop only) ── */
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
      entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add('visible')
          revealObs.unobserve(e.target)
        }
      })
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
  }, [isDashboard])

  return (
    <>
      {!isDashboard && <Navbar />}
      {children}
      {!isDashboard && <Footer />}
    </>
  )
}