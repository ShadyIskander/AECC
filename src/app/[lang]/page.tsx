import { notFound } from 'next/navigation'
import { hasLocale, getDictionary, type Locale } from '@/lib/dictionaries'
import Link from 'next/link'
import HomeHeroClient from '@/components/HomeHeroClient'
import Testimonials from '@/components/Testimonials'
import Newsletter from '@/components/Newsletter'
import ScrollReveal from '@/components/ScrollReveal'
import AnimatedCounter from '@/components/AnimatedCounter'

const mockEvents = [
  { id: 'e1', title: 'Credologos Summer School 2025', title_ar: 'مدرسة كريدولوجوس الصيفية ٢٠٢٥', description: 'An intensive summer program in theology, philosophy, and apologetics.', description_ar: 'برنامج صيفي مكثف في اللاهوت والفلسفة والدفاع عن الإيمان.', date: 'Aug 14 – Aug 29, 2025', date_ar: '١٤ – ٢٩ أغسطس ٢٠٢٥', sub_brand: 'credologos', type: 'event', price: 0, capacity: 60, location: 'Cairo, Egypt', location_ar: 'القاهرة، مصر' },
  { id: 'e2', title: 'God & Science', title_ar: 'الله والعلم', description: 'A course exploring the relationship between faith and modern science.', description_ar: 'دورة تستكشف العلاقة بين الإيمان والعلم الحديث.', date: 'Mar 5 – May 7, 2026', date_ar: '٥ مارس – ٧ مايو ٢٠٢٦', sub_brand: 'credologos', type: 'course', price: 350, capacity: 40, location: 'Online', location_ar: 'أونلاين' },
  { id: 'e3', title: 'Third Space: Community Forum', title_ar: 'المساحة الثالثة: منتدى المجتمع', description: 'A gathering for connection, stories, and belonging.', description_ar: 'لقاء للتواصل والقصص والانتماء.', date: 'Feb 20, 2026', date_ar: '٢٠ فبراير ٢٠٢٦', sub_brand: 'third_space', type: 'event', price: 200, capacity: 80, location: 'Cairo, Egypt', location_ar: 'القاهرة، مصر' },
]

const stats = [
  { num: '50+', label_en: 'Video Lectures', label_ar: 'محاضرة مسجّلة' },
  { num: '10+', label_en: 'Online Courses', label_ar: 'كورس أونلاين' },
  { num: '5k+', label_en: 'Students Enrolled', label_ar: 'طالب مسجّل' },
  { num: '5', label_en: 'Initiatives', label_ar: 'مبادرة' },
]

const initiatives = [
  {
    key: 'credologos',
    href: '/credologos',
    gradient: 'linear-gradient(145deg,#1e2460,#2A317B,#546AB2)',
    accentColor: '#F1A91E',
    glowColor: 'rgba(241,169,30,0.15)',
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    key: 'thirdSpace',
    href: '/third-space',
    gradient: 'linear-gradient(145deg,#0a3040,#0f4c5c,#1a7a8a)',
    accentColor: '#65CBE3',
    glowColor: 'rgba(101,203,227,0.15)',
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    key: 'east',
    href: '/east',
    gradient: 'linear-gradient(145deg,#3d2006,#7a4010,#a0650e)',
    accentColor: '#F1A91E',
    glowColor: 'rgba(241,169,30,0.12)',
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    key: 'counseling',
    href: '/counseling',
    gradient: 'linear-gradient(145deg,#0d2b1e,#1a5238,#2d7a52)',
    accentColor: '#6ec99a',
    glowColor: 'rgba(110,201,154,0.15)',
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    key: 'e30',
    href: '/e30',
    gradient: 'linear-gradient(145deg,#0d0d30,#1a1a5c,#2e2e8a)',
    accentColor: '#a8b0ff',
    glowColor: 'rgba(168,176,255,0.15)',
    icon: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
]

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang as Locale)
  const isAr = lang === 'ar'

  return (
    <>
      {/* ── CINEMATIC HERO ── */}
      <HomeHeroClient lang={lang} dict={dict} />

      {/* ── STATS BAND ── */}
      <section className="relative z-10 -mt-10">
        <div className="container-pad">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-[#EDEDED] hover:border-[#2A317B]/20 transition-all hover:-translate-y-1 duration-300">
                  <div style={{ color: '#2A317B' }}>
                    <AnimatedCounter value={s.num} duration={2} />
                  </div>
                  <p className="text-xs text-[#6b7280] mt-1 font-medium">{isAr ? s.label_ar : s.label_en}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FIVE INITIATIVES ── */}
      <section className="section-padding bg-white">
        <div className="container-pad">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="label-gold mb-2">{isAr ? 'مبادراتنا' : 'Our Initiatives'}</p>
              <h2 className="text-4xl md:text-5xl font-bold font-display text-[#2A317B] mb-3">
                {isAr ? 'منظومة فكرية وروحية' : 'One Ecosystem. Five Voices.'}
              </h2>
              <div className="gold-bar mx-auto" />
              <p className="text-[#6b7280] max-w-xl mx-auto mt-4">{dict.brands.subtitle}</p>
            </div>
          </ScrollReveal>

          {/* First row — 3 cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {initiatives.slice(0, 3).map((init, i) => {
              const brand = dict.brands[init.key as keyof typeof dict.brands] as { name: string; tagline: string; description: string; cta: string }
              return (
                <ScrollReveal key={init.key} delay={i * 100}>
                  <Link href={`/${lang}${init.href}`} className="group relative overflow-hidden rounded-3xl block h-full">
                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                      style={{ background: init.gradient }} />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `radial-gradient(ellipse at 80% 20%, ${init.glowColor}, transparent 60%)` }} />
                    <div className="relative z-10 p-9 min-h-[320px] flex flex-col justify-between">
                      <div>
                        <div className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center"
                          style={{ backgroundColor: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}>
                          {init.icon}
                        </div>
                        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: init.accentColor }}>AECC Initiative</p>
                        <h3 className="text-2xl font-bold text-white font-display mb-2">{brand.name}</h3>
                        <p className="text-white/45 text-xs font-semibold uppercase tracking-wider mb-3">{brand.tagline}</p>
                        <p className="text-white/60 text-sm leading-relaxed">{brand.description}</p>
                      </div>
                      <div className="flex items-center gap-2 font-semibold text-sm mt-6 transition-colors"
                        style={{ color: 'rgba(255,255,255,0.6)' }}>
                        <span className="group-hover:text-white transition-colors">{brand.cta}</span>
                        <span className="transform group-hover:translate-x-1 transition-transform group-hover:text-white">→</span>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              )
            })}
          </div>

          {/* Second row — 2 cards centered */}
          <div className="grid md:grid-cols-2 gap-6 md:max-w-[66%] md:mx-auto">
            {initiatives.slice(3).map((init, i) => {
              const brand = dict.brands[init.key as keyof typeof dict.brands] as { name: string; tagline: string; description: string; cta: string }
              return (
                <ScrollReveal key={init.key} delay={i * 100 + 200}>
                  <Link href={`/${lang}${init.href}`} className="group relative overflow-hidden rounded-3xl block h-full">
                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                      style={{ background: init.gradient }} />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `radial-gradient(ellipse at 80% 20%, ${init.glowColor}, transparent 60%)` }} />
                    <div className="relative z-10 p-9 min-h-[280px] flex flex-col justify-between">
                      <div>
                        <div className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center"
                          style={{ backgroundColor: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}>
                          {init.icon}
                        </div>
                        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: init.accentColor }}>AECC Initiative</p>
                        <h3 className="text-2xl font-bold text-white font-display mb-2">{brand.name}</h3>
                        <p className="text-white/45 text-xs font-semibold uppercase tracking-wider mb-3">{brand.tagline}</p>
                        <p className="text-white/60 text-sm leading-relaxed">{brand.description}</p>
                      </div>
                      <div className="flex items-center gap-2 font-semibold text-sm mt-6 transition-colors"
                        style={{ color: 'rgba(255,255,255,0.6)' }}>
                        <span className="group-hover:text-white transition-colors">{brand.cta}</span>
                        <span className="transform group-hover:translate-x-1 transition-transform group-hover:text-white">→</span>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── FEATURED EVENTS ── */}
      <section className="section-padding" style={{ backgroundColor: '#EDEDED' }}>
        <div className="container-pad">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <div>
                <p className="label-gold mb-1">{isAr ? 'قادمًا قريبًا' : 'Coming Up'}</p>
                <h2 className="text-4xl font-bold font-display text-[#2A317B]">
                  {isAr ? 'الأحداث القادمة' : 'Upcoming Events'}
                </h2>
              </div>
              <Link href={`/${lang}/events`} className="btn-outline text-sm">{dict.events.viewAll}</Link>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {mockEvents.map((ev, i) => (
              <ScrollReveal key={ev.id} delay={i * 100}>
                <Link href={`/${lang}/events/${ev.id}`} className="group block h-full">
                  <div className="bg-white rounded-2xl overflow-hidden border border-[#EDEDED] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                    <div className="h-28 relative flex items-end p-5 overflow-hidden"
                      style={{ background: ev.sub_brand === 'third_space' ? 'linear-gradient(135deg,#0f4c5c,#2a9db5)' : ev.sub_brand === 'east' ? 'linear-gradient(135deg,#5c3d0a,#c07f1a)' : 'linear-gradient(135deg,#1e2460,#546AB2)' }}>
                      <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 80% 20%,rgba(255,255,255,0.4),transparent)' }} />
                      <span className="relative bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium capitalize">
                        {isAr ? (ev.type === 'event' ? 'حدث' : ev.type === 'course' ? 'دورة' : 'ورشة') : ev.type}
                      </span>
                    </div>
                    <div className="p-5">
                      <p className="text-xs text-[#6b7280] mb-1">{isAr ? ev.date_ar : ev.date}</p>
                      <h3 className="font-bold text-[#2A317B] text-sm leading-snug mb-3 group-hover:text-[#F1A91E] transition-colors line-clamp-2">
                        {isAr ? ev.title_ar : ev.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#2A317B] text-sm">
                          {ev.price === 0 ? (isAr ? 'مجاني' : 'Free') : `${ev.price} EGP`}
                        </span>
                        <span className="btn-primary !py-1.5 !px-4 text-xs">
                          {ev.price === 0 ? dict.events.registerFree : dict.events.bookNow}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT TEASER ── */}
      <section className="section-padding bg-white">
        <div className="container-pad">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div>
                <p className="label-gold mb-2">{isAr ? 'عن AECC' : 'About AECC'}</p>
                <h2 className="text-4xl font-bold font-display text-[#2A317B] mb-4">
                  {isAr ? 'المركز الثقافي الإنجيلي العربي' : 'Arab Evangelical Cultural Center'}
                </h2>
                <div className="gold-bar" />
                <p className="text-[#6b7280] leading-relaxed mb-4">{dict.about.visionText}</p>
                <p className="text-[#6b7280] leading-relaxed mb-8">{dict.about.missionText}</p>
                <Link href={`/${lang}/about`} className="btn-outline">{isAr ? 'اعرف أكثر' : 'Learn More'}</Link>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <div className="relative">
                <div className="rounded-3xl p-10 text-white relative overflow-hidden min-h-[360px] flex flex-col justify-between"
                  style={{ background: 'linear-gradient(145deg,#1e2460,#2A317B,#546AB2)' }}>
                  <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-15" style={{ backgroundColor: '#F1A91E' }} />
                  <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full opacity-10" style={{ backgroundColor: '#65CBE3' }} />
                  <blockquote className="relative z-10">
                    <p className="text-3xl text-[#F1A91E] font-display mb-4">"</p>
                    <p className="text-xl font-medium leading-relaxed text-white/90">
                      {isAr
                        ? 'دعوة المؤمنين ليفكروا والمفكرين أن يؤمنوا'
                        : 'Inviting believers to think, and thinkers to believe.'}
                    </p>
                    <p className="mt-4 text-white/50 text-sm">— AECC Mission</p>
                  </blockquote>
                  <div className="relative z-10 grid grid-cols-3 gap-4 mt-8">
                    {[
                      { icon: '📖', label: isAr ? 'لاهوت' : 'Theology' },
                      { icon: '🧠', label: isAr ? 'فلسفة' : 'Philosophy' },
                      { icon: '🌍', label: isAr ? 'ثقافة' : 'Culture' },
                    ].map((p) => (
                      <div key={p.label} className="text-center p-3 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                        <p className="text-2xl mb-1">{p.icon}</p>
                        <p className="text-xs text-white/60">{p.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <Testimonials />

      {/* ── NEWSLETTER ── */}
      <Newsletter />
    </>
  )
}
