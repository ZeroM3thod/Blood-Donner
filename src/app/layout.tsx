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
        {/* Page Loader */}
        <div id="page-loader">
          <div className="loader-content">
            <div className="loader-logo">Blood<span>Circle</span></div>
            <div className="loader-bar-wrap"><div className="loader-bar"></div></div>
          </div>
        </div>

        {/* Custom Cursor */}
        <div id="cursor-dot"></div>
        <div id="cursor-ring"></div>

        <ClientShell>
          <Navbar />
          {children}
          <Footer />
        </ClientShell>
      </body>
    </html>
  )
}
