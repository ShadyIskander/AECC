'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import type { Locale, Dictionary } from '@/lib/dictionaries'

interface NavbarProps {
  lang: Locale
  dict: Dictionary
}

export default function Navbar({ lang, dict }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [initiativesOpen, setInitiativesOpen] = useState(false)
  const pathname = usePathname()
  const otherLang = lang === 'en' ? 'ar' : 'en'

  // Color mapping based on current page
  const getPageColors = () => {
    if (pathname.includes('/credologos')) return { nav: '#546AB2', dark: '#3d4a85' }
    if (pathname.includes('/third-space')) return { nav: '#1a7a8a', dark: '#0f4c5c' }
    if (pathname.includes('/east')) return { nav: '#a0650e', dark: '#6d4609' }
    if (pathname.includes('/counseling')) return { nav: '#2d6e4e', dark: '#1f5236' }
    if (pathname.includes('/e30')) return { nav: '#2e2e8a', dark: '#1f1f5c' }
    return { nav: '#2A317B', dark: '#1e2460' } // Default purple
  }

  const pageColors = getPageColors()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const initiatives = [
    { href: `/${lang}/credologos`, label: dict.nav.credologos, color: '#546AB2', dot: '#546AB2' },
    { href: `/${lang}/third-space`, label: dict.nav.thirdSpace, color: '#1a7a8a', dot: '#65CBE3' },
    { href: `/${lang}/east`, label: dict.nav.east, color: '#a0650e', dot: '#F1A91E' },
    { href: `/${lang}/counseling`, label: dict.nav.counseling, color: '#2d6e4e', dot: '#6ec99a' },
    { href: `/${lang}/e30`, label: dict.nav.e30, color: '#2e2e7a', dot: '#a8b0ff' },
  ]

  const mainLinks = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/team`, label: dict.nav.speakers },
    { href: `/${lang}/events`, label: dict.nav.events },
  ]

  return (
    <nav
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? `${pageColors.dark}f5` : pageColors.nav,
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.25)' : '0 2px 8px rgba(0,0,0,0.15)',
      }}
    >
      <div className="container-pad">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center gap-3 group">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm transition-transform group-hover:scale-110"
              style={{ background: 'linear-gradient(135deg,#F1A91E,#f7c44e)' }}
            >
              A
            </div>
            <span className="text-white font-bold text-xl tracking-wide font-display">AECC</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-white/75 hover:text-white rounded-lg hover:bg-white/10 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}

            {/* Initiatives dropdown */}
            <div className="relative"
              onMouseEnter={() => setInitiativesOpen(true)}
              onMouseLeave={() => setInitiativesOpen(false)}
            >
              <button className="px-3 py-2 text-sm font-medium text-white/75 hover:text-white rounded-lg hover:bg-white/10 transition-all duration-200 flex items-center gap-1.5">
                {lang === 'ar' ? 'مبادراتنا' : 'Initiatives'}
                <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${initiativesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {initiativesOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                  style={{ backgroundColor: '#1e2460' }}>
                  {initiatives.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all"
                      onClick={() => setInitiativesOpen(false)}
                    >
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.dot }} />
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <Link
              href={`/${otherLang}`}
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-white/60 hover:text-white transition-colors border border-white/20 rounded-full px-3 py-1.5 hover:border-white/50"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth={2}/>
                <path strokeLinecap="round" strokeWidth={2} d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20"/>
              </svg>
              {lang === 'en' ? 'عربي' : 'EN'}
            </Link>
            <Link
              href={`/${lang}/auth/login`}
              className="hidden md:block text-sm text-white/70 hover:text-white transition-colors"
            >
              {dict.nav.login}
            </Link>
            <Link
              href={`/${lang}/events`}
              className="btn-primary !py-2 !px-5 text-sm hidden md:inline-block"
            >
              {dict.nav.bookNow}
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 pt-2 border-t border-white/15 space-y-0.5 animate-fade-in">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex py-2.5 px-2 text-white/80 hover:text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-all"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 pb-1">
              <p className="px-2 text-white/30 text-xs font-bold uppercase tracking-widest mb-1">
                {lang === 'ar' ? 'مبادراتنا' : 'Initiatives'}
              </p>
              {initiatives.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 py-2.5 px-2 text-white/70 hover:text-white text-sm font-medium rounded-lg hover:bg-white/10 transition-all"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.dot }} />
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="flex gap-3 pt-3 pb-1">
              <Link
                href={`/${lang}/events`}
                className="btn-primary !py-2 !px-5 text-sm flex-1 text-center"
                onClick={() => setMenuOpen(false)}
              >
                {dict.nav.bookNow}
              </Link>
              <Link href={`/${otherLang}`} className="btn-secondary !py-2 !px-4 text-sm">
                {lang === 'en' ? 'ع' : 'EN'}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
