'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SocialLinks from './SocialLinks'
import type { Locale, Dictionary } from '@/lib/dictionaries'

interface FooterProps { lang: Locale; dict: Dictionary }

export default function Footer({ lang, dict }: FooterProps) {
  const year = new Date().getFullYear()
  const pathname = usePathname()

  // Color mapping based on current page
  const getFooterColors = () => {
    if (pathname.includes('/credologos')) return { bg: '#2a3d6d', lighter: '#3d4f88' }
    if (pathname.includes('/third-space')) return { bg: '#0f3d4d', lighter: '#1a5566' }
    if (pathname.includes('/east')) return { bg: '#4d3409', lighter: '#664409' }
    if (pathname.includes('/counseling')) return { bg: '#1f3d2d', lighter: '#2d5c42' }
    if (pathname.includes('/e30')) return { bg: '#1f1f4d', lighter: '#2a2a66' }
    return { bg: '#1e2460', lighter: '#2a3470' } // Default purple
  }

  const footerColors = getFooterColors()

  return (
    <footer style={{ backgroundColor: footerColors.bg, color: '#fff' }} className="mt-auto transition-colors duration-300">
      <div className="container-pad py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-base"
                style={{ background: 'linear-gradient(135deg,#F1A91E,#f7c44e)' }}>
                A
              </div>
              <span className="text-white font-bold text-xl font-display">AECC</span>
            </div>
            <p className="text-white/55 text-sm leading-relaxed mb-2">Arab Evangelical Cultural Center</p>
            <p className="text-white/55 text-sm leading-relaxed mb-5">{dict.footer.tagline}</p>
            <SocialLinks links={[
              { label: 'Facebook', href: 'https://facebook.com/credologos', path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
              { label: 'Instagram', href: '#', path: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5a1 1 0 11-1-1 1 1 0 011 1zM21 7a9 9 0 00-9-9 9 9 0 00-9 9v2a9 9 0 009 9 9 9 0 009-9z' },
              { label: 'YouTube', href: 'https://youtube.com', path: 'M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.42a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z' },
            ]} />
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-xs uppercase tracking-widest">{dict.footer.quickLinks}</h4>
            <ul className="space-y-2.5">
              {[
                { href: `/${lang}`, label: dict.nav.home },
                { href: `/${lang}/about`, label: dict.nav.about },
                { href: `/${lang}/events`, label: dict.nav.events },
                { href: `/${lang}/team`, label: dict.nav.speakers },
                { href: `/${lang}/auth/login`, label: dict.nav.login },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/55 hover:text-[#65CBE3] text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Initiatives */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-xs uppercase tracking-widest">{dict.footer.initiatives}</h4>
            <ul className="space-y-2.5">
              {[
                { href: `/${lang}/credologos`, label: dict.nav.credologos, dot: '#546AB2' },
                { href: `/${lang}/third-space`, label: dict.nav.thirdSpace, dot: '#65CBE3' },
                { href: `/${lang}/east`, label: dict.nav.east, dot: '#F1A91E' },
                { href: `/${lang}/counseling`, label: dict.nav.counseling, dot: '#6ec99a' },
                { href: `/${lang}/e30`, label: dict.nav.e30, dot: '#a8b0ff' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="flex items-center gap-2 text-white/55 hover:text-[#65CBE3] text-sm transition-colors group">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: l.dot }} />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-xs uppercase tracking-widest">{dict.footer.contact}</h4>
            <ul className="space-y-3 text-sm text-white/55">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 shrink-0 transition-colors duration-300" style={{ color: footerColors.lighter }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@aecc.org
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 shrink-0 transition-colors duration-300" style={{ color: footerColors.lighter }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Cairo, Egypt
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderColor: `${footerColors.lighter}40` }} className="border-t transition-colors duration-300">
        <div className="container-pad py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/35 text-xs">© {year} AECC. {dict.footer.rights}</p>
          <div className="flex gap-4 text-xs text-white/35">
            <Link href={`/${lang}`} className="hover:text-white/60 transition-colors">Privacy</Link>
            <Link href={`/${lang}`} className="hover:text-white/60 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
