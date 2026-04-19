import { notFound } from 'next/navigation'
import { hasLocale, getDictionary, type Locale } from '@/lib/dictionaries'
import Link from 'next/link'
import Newsletter from '@/components/Newsletter'
import ScrollReveal from '@/components/ScrollReveal'
import InitiativeHero from '@/components/InitiativeHero'
import InfoAccordion from '@/components/InfoAccordion'

export default async function EastPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang as Locale)
  const isAr = lang === 'ar'

  const programItems = [
    {
      title: isAr ? 'ماجستير الخدمة في سوق العمل' : 'Master in Ministry in the Marketplace',
      content: isAr
        ? 'برنامج أكاديمي متكامل يجمع بين اللاهوت والعلوم الإدارية والقيادية، مصمم خصيصاً للمهنيين الذين يرغبون في ممارسة إيمانهم بفعالية في بيئات العمل المعاصرة.'
        : 'A comprehensive academic program combining theology with management and leadership sciences, specifically designed for professionals who wish to practice their faith effectively in modern work environments.'
    },
    {
      title: isAr ? 'شهادة اللاهوت العام' : 'Certificate in Public Theology',
      content: isAr
        ? 'دراسة معمقة حول كيفية تفاعل اللاهوت المسيحي مع القضايا العامة والسياسة والاقتصاد والفنون، مما يجهز الطالب ليكون صوتاً مؤثراً في المجتمع.'
        : 'An in-depth study of how Christian theology interacts with public issues, politics, economics, and the arts, equipping the student to be an influential voice in society.'
    },
    {
      title: isAr ? 'دبلوم أخلاقيات الأعمال' : 'Diploma in Business Ethics',
      content: isAr
        ? 'تركيز خاص على النزاهة والأمانة المسيحية في اتخاذ القرارات المهنية، وبناء ثقافة مؤسسية تعكس قيم الملكوت.'
        : 'A special focus on Christian integrity and honesty in professional decision-making, and building a corporate culture that reflects kingdom values.'
    },
    {
      title: isAr ? 'لاهوت العمل والمهنة' : 'Theology of Work & Vocation',
      content: isAr
        ? 'استكشاف لاهوتي لمفهوم "الدعوة" في الحياة اليومية، وفهم العمل كفعل عبادة ومساهمة في خطة الله للعالم.'
        : 'A theological exploration of the concept of "vocation" in daily life, and understanding work as an act of worship and contribution to God\'s plan for the world.'
    }
  ]

  const themes = [
    { icon: '📖', title_en: 'Theology of Work', title_ar: 'لاهوت العمل', desc_en: 'Biblical foundations for professional life.', desc_ar: 'الأسس الكتابية للحياة المهنية.' },
    { icon: '🏛️', title_en: 'Public Theology', title_ar: 'اللاهوت العام', desc_en: 'Engaging society with a Christian mind.', desc_ar: 'التفاعل مع المجتمع بعقل مسيحي.' },
    { icon: '💼', title_en: 'Professional Excellence', title_ar: 'التميز المهني', desc_en: 'Ethics as a form of worship.', desc_ar: 'الأخلاق كنوع من العبادة.' },
    { icon: '🎓', title_en: 'Academic Programs', title_ar: 'البرامج الأكاديمية', desc_en: 'Rigorous certificates and Master\'s tracks.', desc_ar: 'شهادات دقيقة ومسارات ماجستير.' },
  ]

  const upcomingEvents = [
    {
      id: 'east-1',
      title: isAr ? 'لاهوت سوق العمل: الكورسات الأساسية' : 'Theology of the Marketplace: Core Courses',
      date: isAr ? '١٠ سبتمبر ٢٠٢٦' : 'Sep 10, 2026',
      type: isAr ? 'كورس' : 'Course'
    },
    {
      id: 'east-2',
      title: isAr ? 'ندوة: المسيحي في الفضاء العام' : 'Symposium: The Christian in Public Space',
      date: isAr ? '١٥ أكتوبر ٢٠٢٦' : 'Oct 15, 2026',
      type: isAr ? 'ندوة' : 'Symposium'
    },
    {
      id: 'east-3',
      title: isAr ? 'ماجستير الخدمة: دفعة ٢٠٢٧' : 'Ministry Master Intake 2027',
      date: isAr ? 'يناير ٢٠٢٧' : 'Jan 2027',
      type: isAr ? 'برنامج أكاديمي' : 'Degree Program'
    }
  ]

  return (
    <main>
      <InitiativeHero 
        title="EAST"
        brandName="Academy"
        tagline={isAr ? 'اللاهوت. المجتمع. الخدمة في سوق العمل.' : 'Theology. Society. Ministry in the Marketplace.'}
        description={isAr
          ? 'أكاديمية لاهوتية متخصصة تقدم برامج دراسية وشهادات أكاديمية لتجهيز المؤمنين للخدمة والشهادة في قلب المجتمع وسوق العمل.'
          : 'A specialized theological academy offering academic programs and certificates to equip believers for service and witness in the heart of society and the marketplace.'}
        isAr={isAr}
        accentColor="#a0650e"
        secondaryColor="#2A317B"
        backgroundGradient="linear-gradient(135deg,#150800 0%,#2d1200 45%,#2A317B 100%)"
        visitUrl="#"
        visitText={isAr ? 'زيارة الأكاديمية' : 'Visit Academy'}
        ctaText={isAr ? 'البرامج الدراسية' : 'Academic Programs'}
        ctaUrl={`/${lang}/events`}
      />

      {/* ── ACADEMIC FOCUS ── */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#a0650e] opacity-[0.02] rotate-45 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2A317B] opacity-[0.02] -rotate-12 -translate-x-1/2 translate-y-1/2 pointer-events-none" />
        
        <div className="container-pad relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <ScrollReveal direction="left">
              <div>
                <p className="label-gold mb-3" style={{ color: '#a0650e' }}>{isAr ? 'رؤيتنا التعليمية' : 'Educational Vision'}</p>
                <h2 className="text-4xl md:text-6xl font-bold font-display text-[#2A317B] mb-8 leading-tight">
                  {isAr ? 'تجسير الفجوة بين اللاهوت والحياة' : 'Bridging the Gap Between Theology & Life'}
                </h2>
                <div className="gold-bar w-24 mb-10" style={{ backgroundColor: '#a0650e' }} />
                <p className="text-[#6b7280] text-lg leading-relaxed mb-10">
                  {isAr
                    ? 'نحن لا ندرّس اللاهوت كعلم نظري منعزل، بل كقوة حية تشكل قراراتنا في المكتب والمنزل والشارع. تهدف EAST إلى خلق جيل من القادة المهنيين الذين يحملون فكراً لاهوتياً ناضجاً.'
                    : 'We do not teach theology as an isolated theoretical science, but as a living force that shapes our decisions in the office, home, and street. EAST aims to create a generation of professional leaders who carry mature theological thought.'}
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div className="flex gap-4">
                    <span className="text-3xl">🏛️</span>
                    <div>
                      <h5 className="font-bold text-[#2A317B] mb-1">{isAr ? 'تميز أكاديمي' : 'Academic Rigor'}</h5>
                      <p className="text-xs text-[#6b7280]">{isAr ? 'مناهج قوية ومعترف بها.' : 'Robust and recognized curriculum.'}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-3xl">💼</span>
                    <div>
                      <h5 className="font-bold text-[#2A317B] mb-1">{isAr ? 'تطبيق مهني' : 'Marketplace Focus'}</h5>
                      <p className="text-xs text-[#6b7280]">{isAr ? 'ربط مباشر بالعمل اليومي.' : 'Direct link to daily work.'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="bg-[#fcf7f0] p-1 rounded-[2.5rem] shadow-inner">
                <InfoAccordion items={programItems} accentColor="#a0650e" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── THEMES GRID ── */}
      <section className="section-padding" style={{ backgroundColor: '#1a1a2e' }}>
        <div className="container-pad">
          <div className="text-center mb-20">
            <p className="label-gold mb-3" style={{ color: '#F1A91E' }}>{isAr ? 'ما الذي نستكشفه' : 'What We Explore'}</p>
            <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">
              {isAr ? 'محاورنا الدراسية الأساسية' : 'Our Core Learning Pillars'}
            </h2>
            <div className="gold-bar mx-auto" style={{ backgroundColor: '#F1A91E' }} />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {themes.map((t, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="group bg-white/5 border border-white/10 p-10 rounded-[2rem] hover:bg-white/10 hover:border-[#a0650e] transition-all duration-500 h-full">
                  <div className="text-5xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-500">{t.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-4 font-display">{isAr ? t.title_ar : t.title_en}</h3>
                  <p className="text-white/40 group-hover:text-white/70 text-sm leading-relaxed transition-colors">
                    {isAr ? t.desc_ar : t.desc_en}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── UPCOMING EVENTS ── */}
      <section className="section-padding bg-white relative">
        <div className="container-pad">
          <div className="flex items-end justify-between mb-16 flex-wrap gap-8">
            <ScrollReveal direction="left">
              <div>
                <p className="label-gold mb-3" style={{ color: '#a0650e' }}>{isAr ? 'الأحداث القادمة' : 'Upcoming Events'}</p>
                <h2 className="text-4xl font-bold font-display text-[#2A317B]">{isAr ? 'سجل اهتمامك الآن' : 'Register Your Interest'}</h2>
                <div className="gold-bar mt-4" style={{ backgroundColor: '#a0650e' }} />
              </div>
            </ScrollReveal>
            <Link href={`/${lang}/events`} className="btn-secondary !text-[#a0650e] border-[#a0650e]/20 hover:bg-[#a0650e]/5 transition-colors">
              {isAr ? 'كل الفعاليات' : 'All Events'}
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {upcomingEvents.map((ev, i) => (
              <ScrollReveal key={ev.id} delay={i * 100}>
                <div className="p-8 rounded-[2rem] border border-slate-100 hover:border-[#a0650e]/30 transition-all duration-500 group bg-[#fffdfa]">
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 bg-[#a0650e]/10 text-[#a0650e]">
                    {ev.type}
                  </span>
                  <p className="text-xs text-slate-400 mb-2">{ev.date}</p>
                  <h4 className="text-xl font-bold text-[#2A317B] mb-6 group-hover:text-[#a0650e] transition-colors h-14 line-clamp-2">
                    {ev.title}
                  </h4>
                  <Link href={`/${lang}/events`} className="inline-flex items-center text-sm font-bold text-[#a0650e] gap-2 group/link">
                    {isAr ? 'التفاصيل والاشتراك' : 'Details & Registration'}
                    <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </main>
  )
}
