import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  metadataBase: new URL('https://splicelist.com'),
  title: {
    default: 'SpliceList | Telecom & Fiber Optic Cable Splicing Contractors',
    template: '%s | SpliceList',
  },
  description: 'Find certified telecom, fiber optic, and copper cable splicing contractors near you. Get quotes from verified splice crews for commercial and emergency jobs.',
  keywords: ['fiber optic splicing', 'cable splicing contractors', 'telecom splicing', 'copper cable splicing', 'fusion splicing services'],
  openGraph: {
    type: 'website',
    siteName: 'SpliceList',
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PLB02BZWNG"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PLB02BZWNG');
          `}
        </Script>
      </body>
    </html>
  )
}
