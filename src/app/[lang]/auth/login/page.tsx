import { notFound } from 'next/navigation'
import { hasLocale, getDictionary, type Locale } from '@/lib/dictionaries'
import Link from 'next/link'

export default async function LoginPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang as Locale)
  const isAr = lang === 'ar'

  return (
    <div className="min-h-screen flex items-center justify-center py-16"
      style={{ background: 'linear-gradient(135deg,#06091a,#0e1540,#2A317B)' }}>
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'linear-gradient(rgba(168,176,217,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(168,176,217,0.5) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="relative z-10 w-full max-w-md px-6">
        {/* Card */}
        <div className="rounded-3xl p-10"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(24px)' }}>
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-white text-xl mx-auto mb-4"
              style={{ background: 'linear-gradient(135deg,#F1A91E,#f7c44e)' }}>A</div>
            <h1 className="text-2xl font-bold font-display text-white">{dict.auth.login}</h1>
            <p className="text-white/45 text-sm mt-1">AECC</p>
          </div>

          {/* Form */}
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                {dict.auth.email}
              </label>
              <input type="email" placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#F1A91E] text-sm transition-all"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">
                {dict.auth.password}
              </label>
              <input type="password" placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#F1A91E] text-sm transition-all"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }} />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/40">{dict.auth.noAccount}</span>
              <Link href={`/${lang}/auth/signup`} className="text-[#F1A91E] hover:text-[#f7c44e] font-semibold transition-colors">
                {dict.auth.signup}
              </Link>
            </div>
            <button className="w-full btn-primary !py-3.5 text-base">{dict.auth.login}</button>
            <p className="text-center text-xs text-white/35 hover:text-white/60 cursor-pointer transition-colors">
              {dict.auth.forgotPassword}
            </p>
          </div>
        </div>

        <p className="text-center text-white/25 text-xs mt-6">
          © {new Date().getFullYear()} AECC
        </p>
      </div>
    </div>
  )
}
