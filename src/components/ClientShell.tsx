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
      /* ═══════════════════════════════════════════
         MEDICAL TERMINAL BOOT LOADER
         ═══════════════════════════════════════════ */
      if (loader) {
        const pctHuge  = document.getElementById('ldr-pct-huge')
        const barFill  = document.getElementById('ldr-bar-fill')
        const barLabel = document.getElementById('ldr-bar-label')

        // Terminal log lines & statuses
        const lines    = [0,1,2,3].map(i => document.getElementById(`ldr-line-${i}`))
        const statuses = [0,1,2,3].map(i => document.getElementById(`ldr-st-${i}`))

        // Thresholds at which each log line appears & completes
        const LINE_SHOW = [0,   18,  42,  72 ]  // pct to show line
        const LINE_OK   = [22,  45,  75,  96 ]  // pct to mark OK
        const LABELS    = [
          'Initializing…',
          'Loading registry…',
          'Verifying donors…',
          'Securing session…',
          'System ready.',
        ]

        let pct  = 0
        let done = false
        const lineShown    = [false,false,false,false]
        const lineComplete = [false,false,false,false]

        /* ── Update the UI ── */
        const updateUI = (p: number) => {
          // Big number
          if (pctHuge) {
            const numNode = pctHuge.childNodes[0]
            if (numNode) numNode.nodeValue = String(Math.floor(p))
          }

          // Bar fill
          if (barFill) barFill.style.width = p + '%'

          // Bar label
          if (barLabel) {
            const idx = p < 22 ? 0 : p < 45 ? 1 : p < 75 ? 2 : p < 96 ? 3 : 4
            barLabel.textContent = LABELS[idx]
          }

          // Terminal lines
          for (let i = 0; i < 4; i++) {
            // Show the line
            if (!lineShown[i] && p >= LINE_SHOW[i]) {
              lineShown[i] = true
              lines[i]?.classList.add('ldr-visible')
            }
            // Mark OK
            if (!lineComplete[i] && p >= LINE_OK[i]) {
              lineComplete[i] = true
              const st = statuses[i]
              if (st) {
                st.classList.remove('st-wait')
                st.classList.add('st-ok')
                st.textContent = 'ok'
              }
            }
          }
        }

        /* ── Finish animation & split-exit ── */
        const finish = () => {
          if (done) return
          done = true
          updateUI(100)
          setTimeout(() => {
            loader.classList.add('exiting')
            setTimeout(() => {
              loader.classList.add('hidden')
            }, 950)
          }, 280)
        }

        /* ── Tick ── */
        const INTERVAL = 55
        const tick = setInterval(() => {
          if (done) { clearInterval(tick); return }
          const step = pct < 75
            ? 7 + Math.random() * 14
            : 2 + Math.random() * 5
          pct = Math.min(pct + step, 99)
          updateUI(pct)
        }, INTERVAL)

        /* ── Complete on window load ── */
        const onLoad = () => { clearInterval(tick); finish() }

        if (document.readyState === 'complete') {
          clearInterval(tick)
          finish()
        } else {
          window.addEventListener('load', onLoad, { once: true })
        }

        // Hard safety net
        const safetyTimer = setTimeout(() => {
          clearInterval(tick)
          window.removeEventListener('load', onLoad)
          finish()
        }, 4000)

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