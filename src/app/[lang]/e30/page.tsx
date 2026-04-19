import { notFound } from 'next/navigation'
import { hasLocale, getDictionary, type Locale } from '@/lib/dictionaries'
import Link from 'next/link'
import Newsletter from '@/components/Newsletter'
import ScrollReveal from '@/components/ScrollReveal'
import InitiativeHero from '@/components/InitiativeHero'
import InfoAccordion from '@/components/InfoAccordion'

export default async function E30Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang as Locale)
  const isAr = lang === 'ar'

  const networkItems = [
    {
      title: isAr ? 'شبكة المرشدين' : 'Mentorship Network',
      content: isAr
        ? 'نحن نصلك برواد أعمال مسيحيين متمرسين لديهم عقود من الخبرة في السوق. التوجيه الفردي هو مفتاحنا لتحويل الأفكار الوليدة إلى مشاريع ناجحة ومستدامة.'
        : 'We connect you with experienced Christian entrepreneurs who have decades of marketplace experience. Individual guidance is our key to transforming nascent ideas into successful and sustainable projects.'
    },
    {
      title: isAr ? 'تمويل ملكوت' : 'Kingdom Funding',
      content: isAr
        ? 'نوفر منصة لربط المشاريع الناشئة بمستثمرين مسيحيين يؤمنون بأهمية الاستثمار في مشاريع تحمل قيماً أخلاقية وتساهم في نمو المجتمع.'
        : 'We provide a platform to connect startups with Christian investors who believe in the importance of investing in projects that carry ethical values and contribute to community growth.'
    },
    {
      title: isAr ? 'أخلاقيات السوق' : 'Marketplace Ethics',
      content: isAr
        ? 'في E30، النجاح ليس فقط في الأرقام، بل في النزاهة. نحن ندرّب رواد الأعمال على كيفية بناء بيئة عمل عادلة وشفافة تعكس أمانة وكالة الله.'
        : 'At E30, success is not just in numbers, but in integrity. We train entrepreneurs on how to build a fair and transparent work environment that reflects the honesty of God\'s stewardship.'
    },
    {
      title: isAr ? 'الابتكار والتقنية' : 'Innovation & Tech',
      content: isAr
        ? 'نشجع على استخدام أحدث الأدوات التقنية والذكاء الاصطناعي لزيادة كفاءة المشاريع، مع الحفاظ على البعد الإنساني والأخلاقي في كل خطوة.'
        : 'We encourage the use of the latest technical tools and AI to increase project efficiency, while maintaining the human and ethical dimension at every step.'
    }
  ]

  const metrics = [
    { label: isAr ? 'مشاريع مدعومة' : 'Projects Supported', val: '30+' },
    { label: isAr ? 'مرشدون مهنيون' : 'Professional Mentors', val: '15' },
    { label: isAr ? 'دول مستهدفة' : 'Target Countries', val: '5' },
    { label: isAr ? 'تدريبات سنوية' : 'Annual Trainings', val: '8' },
  ]

  const upcomingEvents = [
    {
      id: 'e30-1',
      title: isAr ? 'قمة أعمال الملكوت ٢٠٢٦' : 'Kingdom Business Summit 2026',
      date: isAr ? '١٨ نوفمبر ٢٠٢٦' : 'Nov 18, 2026',
      type: isAr ? 'قمة' : 'Summit'
    },
    {
      id: 'e30-2',
      title: isAr ? 'دورة: أسس ريادة الأعمال الأخلاقية' : 'Course: Ethical Entrepreneurship Foundations',
      date: isAr ? '٥ فبراير ٢٠٢٧' : 'Feb 5, 2027',
      type: isAr ? 'كورس' : 'Course'
    },
    {
      id: 'e30-3',
      title: isAr ? 'ليلة التشبيك المهني' : 'Professional Networking Night',
      date: isAr ? '١٠ مارس ٢٠٢٧' : 'Mar 10, 2027',
      type: isAr ? 'تشبيك' : 'Networking'
    }
  ]

  return (
    <main className="bg-white">
      <InitiativeHero 
        title="E30"
        brandName="Invest"
        tagline={isAr ? 'عشرة. ثلاثون. مائة.' : 'Ten. Thirty. Hundred.'}
        description={isAr
          ? 'مبادرة تمكينية تهدف لدعم رواد الأعمال المسيحيين في بناء مشاريع ناجحة وأخلاقية تساهم في نمو الاقتصاد وخدمة الملكوت.'
          : 'An empowering initiative aimed at supporting Christian entrepreneurs in building successful and ethical projects that contribute to economic growth and kingdom service.'}
        isAr={isAr}
        accentColor="#a0650e"
        secondaryColor="#2A317B"
        backgroundGradient="linear-gradient(135deg,#050a1a 0%,#2A317B 45%,#2d1200 100%)"
        visitUrl="#"
        visitText={isAr ? 'زيارة المنصة' : 'Visit Platform'}
        ctaText={isAr ? 'انضم للشبكة' : 'Join Network'}
        ctaUrl={`/${lang}/events`}
      />

      {/* ── METRICS OVERLAY ── */}
      <section className="relative -mt-16 z-20 container-pad">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-2xl flex flex-col items-center">
              <span className="text-4xl font-black text-[#2A317B] mb-2">{m.val}</span>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{m.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── EMPOWERMENT SECTION ── */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-[0.02] pointer-events-none"
             style={{ backgroundImage: 'radial-gradient(#a0650e 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="container-pad relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <ScrollReveal direction="left">
              <div>
                <p className="label-gold mb-3" style={{ color: '#a0650e' }}>{isAr ? 'رؤيتنا' : 'Our Vision'}</p>
                <h2 className="text-4xl md:text-5xl font-bold font-display text-[#2A317B] mb-8 leading-tight">
                  {isAr ? 'تمكين الجيل القادم من رواد الأعمال' : 'Empowering the Next Generation of Entrepreneurs'}
                </h2>
                <div className="gold-bar w-24 mb-10" style={{ backgroundColor: '#a0650e' }} />
                <p className="text-slate-600 text-lg leading-relaxed mb-10">
                  {isAr
                    ? 'في E30، نحن لا نعطي أسماكاً، بل نعلّم الصيد ونبني السفن. نهدف إلى خلق بيئة خصبة ينمو فيها رواد الأعمال المسيحيون ليكونوا ملحاً ونوراً في قلب الاقتصاد.'
                    : 'At E30, we don\'t just give fish; we teach fishing and build boats. We aim to create a fertile environment where Christian entrepreneurs grow to be salt and light in the heart of the economy.'}
                </p>
                <div className="space-y-6">
                  {[
                    { t: isAr ? 'تدريب ريادي' : 'Entrepreneurial Training', d: isAr ? 'من الفكرة إلى النموذج العملي.' : 'From idea to working prototype.' },
                    { t: isAr ? 'تمويل ذكي' : 'Smart Funding', d: isAr ? 'دعم مالي بمشاركة القيم.' : 'Financial support with shared values.' },
                    { t: isAr ? 'توجيه مهني' : 'Professional Mentoring', d: isAr ? 'نقل الخبرات من جيل لجيل.' : 'Transferring expertise from generation to generation.' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-5">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#a0650e]">✓</div>
                      <div>
                        <h5 className="font-bold text-[#2A317B] mb-1">{item.t}</h5>
                        <p className="text-xs text-slate-400">{item.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="bg-slate-50 p-1 rounded-[2.5rem] border border-slate-100 shadow-inner">
                <InfoAccordion items={networkItems} accentColor="#a0650e" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── UPCOMING EVENTS ── */}
      <section className="section-padding bg-[#fffdfa] relative">
        <div className="container-pad">
          <div className="flex items-end justify-between mb-16 flex-wrap gap-8">
            <ScrollReveal direction="left">
              <div>
                <p className="label-gold mb-3" style={{ color: '#a0650e' }}>{isAr ? 'الفعاليات القادمة' : 'Upcoming Events'}</p>
                <h2 className="text-4xl font-bold font-display text-[#2A317B]">{isAr ? 'استثمر في مستقبلك' : 'Invest in Your Future'}</h2>
                <div className="gold-bar mt-4" style={{ backgroundColor: '#a0650e' }} />
              </div>
            </ScrollReveal>
            <Link href={`/${lang}/events`} className="btn-secondary !text-[#a0650e] border-[#a0650e]/20 hover:bg-[#a0650e]/5 transition-colors">
              {isAr ? 'عرض الكل' : 'View All'}
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {upcomingEvents.map((ev, i) => (
              <ScrollReveal key={ev.id} delay={i * 100}>
                <div className="p-8 rounded-[2rem] border border-slate-100 hover:border-[#a0650e]/30 transition-all duration-500 group bg-white shadow-sm hover:shadow-xl">
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 bg-[#a0650e]/10 text-[#a0650e]">
                    {ev.type}
                  </span>
                  <p className="text-xs text-slate-400 mb-2">{ev.date}</p>
                  <h4 className="text-xl font-bold text-[#2A317B] mb-6 group-hover:text-[#a0650e] transition-colors h-14 line-clamp-2">
                    {ev.title}
                  </h4>
                  <Link href={`/${lang}/events`} className="inline-flex items-center text-sm font-bold text-[#a0650e] gap-2 group/link">
                    {isAr ? 'التفاصيل' : 'Details'}
                    <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FUTURE SECTION ── */}
      <section className="section-padding bg-[#050a1a] text-white">
        <div className="container-pad text-center">
          <ScrollReveal direction="up">
            <h2 className="text-4xl md:text-6xl font-black font-display mb-8 max-w-4xl mx-auto leading-tight">
              {isAr ? 'بناء اقتصاد يعكس قيم الملكوت' : 'Building an Economy That Reflects Kingdom Values'}
            </h2>
            <div className="gold-bar mx-auto mb-10" style={{ backgroundColor: '#a0650e' }} />
            <Link href={`/${lang}/events`} className="btn-primary !py-5 !px-16 text-xl tracking-widest !bg-[#a0650e] !text-white hover:!bg-white hover:!text-[#a0650e] transition-all">
              {isAr ? 'ابدأ رحلتك الآن' : 'Start Your Journey Now'}
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <Newsletter />
    </main>
  )
}
