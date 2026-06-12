import type { Metadata } from 'next'
import './globals.css'
import ClientShell from '@/components/ClientShell'
import BloodCircleLoader from '@/components/BloodCircleLoader'

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
        {/*
          Inline script — runs synchronously before the browser paints
          a single pixel. Hides the body instantly on every page load/refresh.
          BloodCircleLoader removes this style tag once the overlay is live.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                var s = document.createElement('style');
                s.id = 'bc-block-style';
                s.textContent = 'body{visibility:hidden!important}';
                document.head.appendChild(s);
              })();
            `,
          }}
        />

        {/* Loader — removes bc-block-style and reveals body once overlay is live */}
        <BloodCircleLoader />

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