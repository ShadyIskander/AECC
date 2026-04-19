import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'AECC – Evangelical Cultural Center',
  description:
    'A place where faith meets reason. Explore theology, philosophy, and culture through Credologos, Third Space, and East.',
  keywords: ['AECC', 'Evangelical Cultural Center', 'Credologos', 'theology', 'philosophy', 'Egypt'],
  openGraph: {
    title: 'AECC – Evangelical Cultural Center',
    description: 'Where faith meets reason. Thoughtful exploration of truth.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  )
}
