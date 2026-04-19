import { notFound } from 'next/navigation'
import { hasLocale, getDictionary, type Locale } from '@/lib/dictionaries'
import Link from 'next/link'
import Newsletter from '@/components/Newsletter'
import AnimatedCounter from '@/components/AnimatedCounter'
import InitiativeHero from '@/components/InitiativeHero'
import InfoAccordion from '@/components/InfoAccordion'
import ScrollReveal from '@/components/ScrollReveal'

const courses = [
  { id: 'c1', title: 'God & Science', title_ar: 'الله والعلم', speaker: 'يوسف يعقوب', speaker_en: 'Youssef Yaqoub', price: 350, date_en: 'Mar 5 – May 7, 2026', date_ar: '٥ مارس – ٧ مايو ٢٠٢٦', type: 'course' },
  { id: 'c2', title: 'Philosophy & Christian Faith', title_ar: 'الفلسفة والإيمان المسيحي', speaker: 'وسيم صبري', speaker_en: 'Waseem Sabry', price: 280, date_en: 'Oct 30 – Dec 18, 2025', date_ar: '٣٠ أكتوبر – ١٨ ديسمبر ٢٠٢٥', type: 'course' },
  { id: 'c3', title: 'How to Trust the Bible?', title_ar: 'كيف نثق في الكتاب المقدس؟', speaker: 'فريق متعدد', speaker_en: 'Multiple Speakers', price: 250, date_en: 'Sep 18 – Oct 23, 2025', date_ar: '١٨ سبتمبر – ٢٣ أكتوبر ٢٠٢٥', type: 'course' },
  { id: 'c4', title: 'Evil & Pain – Part 1', title_ar: 'الشر والألم – الجزء الأول', speaker: 'فريق متعدد', speaker_en: 'Multiple Speakers', price: 300, date_en: 'Mar 20 – Apr 17, 2025', date_ar: '٢٠ مارس – ١٧ أبريل ٢٠٢٥', type: 'course' },
  { id: 'c5', title: 'Value, Acceptance & Shame', title_ar: 'القيمة والقبول والخزي', speaker: 'أندرو أشرف', speaker_en: 'Andrew Ashraf', price: 270, date_en: 'Jan 22 – Mar 12, 2026', date_ar: '٢٢ يناير – ١٢ مارس ٢٠٢٦', type: 'course' },
  { id: 'e1', title: 'Summer School 2025', title_ar: 'المدرسة الصيفية ٢٠٢٥', speaker: 'الفريق كاملاً', speaker_en: 'Full Team', price: 0, date_en: 'Aug 14 – 29, 2025', date_ar: '١٤ – ٢٩ أغسطس ٢٠٢٥', type: 'event' },
]

export default async function CredologosPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang as Locale)
  const isAr = lang === 'ar'

  const academyItems = [
    {
      title: isAr ? 'قوانين الإيمان التاريخية' : 'Historical Creeds',
      content: isAr
        ? 'نؤمن أن القوانين الإيمانية التاريخية لا تقتصر على ربطنا بالماضي، بل تقدم إطارًا واضحًا وعميقًا لفهم الإيمان والتعبير عنه اليوم. نتعامل مع هذه الصياغات لا كنهايات مغلقة، بل كنقاط انطلاق للتفكير الأعمق، وطرح الأسئلة بصدق، والدخول في حوار هادف في عالم متغير ومعقد.'
        : 'We believe that historic Christian creeds offer more than a connection to the past they provide a clear and thoughtful framework for understanding and articulating faith today. Our study engages these creeds not as endpoints, but as starting points for deeper reflection, honest questions, and meaningful dialogue in a complex and changing world.'
    },
    {
      title: isAr ? 'التفكير النقدي والمنطق' : 'Critical Thinking & Logic',
      content: isAr
        ? 'لا نكتفي بالإيمان الأعمى، بل نشجع على التساؤل المخطط والبحث الرصين. نستخدم أدوات الفلسفة والمنطق لفحص الأفكار وبناء حجج متماسكة تعبر عن الحق الإلهي.'
        : 'We do not settle for blind faith; we encourage structured questioning and rigorous research. We use tools of philosophy and logic to examine ideas and build coherent arguments for divine truth.'
    },
    {
      title: isAr ? 'الدفاعيات المعاصرة' : 'Contemporary Apologetics',
      content: isAr
        ? 'كيف نجيب على أسئلة العلوم، الألم، والشك؟ برنامجنا يجهزك بإجابات منطقية ومقنعة تخاطب عقل وقلب الإنسان المعاصر في القرن الحادي والعشرين.'
        : 'How do we answer questions of science, pain, and doubt? Our program equips you with reasonable and persuasive answers that address the mind and heart of the 21st-century person.'
    },
    {
      title: isAr ? 'اللاهوت العربي والبحث العلمي' : 'Arabic Theology & Scholarship',
      content: isAr
        ? 'نسعى لخلق مساحة لاهوتية ناطقة بالعربية تتفاعل مع البحث العلمي العالمي وتنتج فكراً مسيحياً أصيلاً يخدم الكنيسة والمجتمع في الشرق الأوسط.'
        : 'We seek to create an Arabic-speaking theological space that interacts with global scholarship and produces authentic Christian thought serving the church and society in the Middle East.'
    },
  ]

  return (
    <>
      <InitiativeHero
        title="Credologos"
        brandName="Logos"
        tagline={dict.brands.credologos.tagline}
        description={dict.brands.credologos.description}
        isAr={isAr}
        accentColor="#F1A91E"
        secondaryColor="#2A317B"
        backgroundGradient="linear-gradient(135deg,#06091a 0%,#0e1540 45%,#1e2460 100%)"
        visitUrl="https://credologos.org"
        visitText={isAr ? 'زيارة الموقع' : 'Visit Website'}
        ctaText={isAr ? 'استكشف الكورسات' : 'Explore Courses'}
        ctaUrl={`/${lang}/events`}
      />

      {/* ── STATS OVERLAY ── */}
      <section className="relative -mt-20 z-20 container-pad">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { num: '50+', label: isAr ? 'فيديو مسجّل' : 'Recorded Videos' },
            { num: '10+', label: isAr ? 'كورس أونلاين' : 'Online Courses' },
            { num: '5k+', label: isAr ? 'طالب' : 'Students' },
            { num: '5', label: isAr ? 'متحدثون' : 'Speakers' },
          ].map((s, i) => (
            <div key={i} className="glass p-8 rounded-3xl text-center border-white/10 shadow-2xl">
              <div className="text-white text-3xl font-bold mb-2">
                <AnimatedCounter value={s.num} duration={2} />
              </div>
              <p className="text-white/40 text-xs uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ACADEMY DETAILS ── */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#f8f9ff] -skew-x-12 translate-x-1/2 pointer-events-none" />
        <div className="container-pad relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <ScrollReveal direction="left">
              <div>
                <p className="label-gold mb-3">{isAr ? 'منهجنا' : 'Our Approach'}</p>
                <h2 className="text-5xl md:text-6xl font-bold font-display text-[#2A317B] mb-8 leading-tight">
                  {isAr ? 'العقل في خدمة الإيمان' : 'Reason in Service of Faith'}
                </h2>
                <div className="gold-bar w-24 h-1.5 mb-10" />
                <p className="text-[#6b7280] text-lg leading-relaxed mb-8">
                  {isAr
                    ? 'في كريدولوجوس، نؤمن أن الإيمان المسيحي ليس قفزة في الظلام، بل هو استجابة مدروسة ومنطقية للحق المعلن. نحن نجمع بين الصرامة الأكاديمية والتقوى الروحية.'
                    : 'At Credologos, we believe that Christian faith is not a leap into the dark, but a reasoned response to revealed truth. We combine academic rigor with spiritual devotion.'}
                </p>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#F1A91E10] flex items-center justify-center text-3xl">☕</div>
                  <div>
                    <h5 className="font-bold text-[#2A317B] mb-1">{isAr ? 'بيئة تفاعلية' : 'Interactive Environment'}</h5>
                    <p className="text-sm text-[#6b7280]">{isAr ? 'نقاشات مفتوحة تحترم العقل والشك.' : 'Open discussions that respect reason and doubt.'}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <InfoAccordion items={academyItems} accentColor="#F1A91E" />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── COURSES ── */}
      <section className="section-padding" style={{ backgroundColor: '#fcfcfc' }}>
        <div className="container-pad">
          <div className="flex items-end justify-between mb-16 flex-wrap gap-4">
            <div>
              <p className="label-gold mb-2">{isAr ? 'تعلّم' : 'Learn'}</p>
              <h2 className="text-4xl md:text-5xl font-bold font-display text-[#2A317B]">{isAr ? 'الكورسات والأحداث' : 'Courses & Events'}</h2>
              <div className="gold-bar mt-4" />
            </div>
            <Link href={`/${lang}/events`} className="btn-outline !rounded-xl text-sm font-bold uppercase tracking-widest">{dict.events.viewAll}</Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((c) => (
              <Link key={c.id} href={`/${lang}/events/${c.id}`} className="group block">
                <div className="bg-white rounded-[2rem] overflow-hidden border border-[#EDEDED] hover:border-[#F1A91E] hover:shadow-2xl transition-all duration-500 h-full">
                  <div className="h-40 flex items-end p-8 relative overflow-hidden"
                    style={{ background: 'linear-gradient(135deg,#0e1540,#1e2460)' }}>
                    <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(circle at 80% 20%,#F1A91E,transparent 70%)' }} />
                    <span className="relative bg-white/10 backdrop-blur-md text-white/90 text-[10px] px-4 py-1.5 rounded-full font-bold uppercase tracking-[0.2em] border border-white/10">
                      {isAr ? (c.type === 'course' ? 'دورة' : 'حدث') : c.type}
                    </span>
                    <div className="absolute top-8 right-8 text-white/10 group-hover:text-[#F1A91E]/20 transition-colors">
                      <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                    </div>
                  </div>
                  <div className="p-8">
                    <p className="text-[10px] text-[#A8B0D9] font-bold uppercase tracking-[0.2em] mb-4">{isAr ? c.date_ar : c.date_en}</p>
                    <h3 className="text-2xl font-bold text-[#2A317B] mb-3 group-hover:text-[#F1A91E] transition-colors leading-snug">
                      {isAr ? c.title_ar : c.title}
                    </h3>
                    <p className="text-sm text-[#6b7280] mb-8 flex items-center gap-2">
                      <span className="w-6 h-px bg-[#EDEDED]" /> {isAr ? c.speaker : c.speaker_en}
                    </p>
                    <div className="flex items-center justify-between pt-6 border-t border-[#f0f0f0]">
                      <span className="font-black text-xl text-[#2A317B]">{c.price === 0 ? (isAr ? 'مجاني' : 'Free') : `${c.price} EGP`}</span>
                      <span className="text-[#F1A91E] group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  )
}
