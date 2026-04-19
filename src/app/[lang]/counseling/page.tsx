import { notFound } from 'next/navigation'
import { hasLocale, getDictionary, type Locale } from '@/lib/dictionaries'
import Link from 'next/link'
import Newsletter from '@/components/Newsletter'
import ScrollReveal from '@/components/ScrollReveal'
import InitiativeHero from '@/components/InitiativeHero'
import InfoAccordion from '@/components/InfoAccordion'

export default async function CounselingPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang as Locale)
  const isAr = lang === 'ar'

  const integrationItems = [
    {
      title: isAr ? 'المركزية المسيحية' : 'Christ-Centered Framework',
      content: isAr
        ? 'نحن نؤمن بأن الشفاء الحقيقي يبدأ بفهم هويتنا في المسيح. مشورتنا متجذرة في كلمة الله، وترى الإنسان ككيان مخلوق على صورة الله ومفتدى بمحبته.'
        : 'We believe true healing begins with understanding our identity in Christ. Our counseling is rooted in God\'s Word, viewing the human being as a creature made in God\'s image and redeemed by His love.'
    },
    {
      title: isAr ? 'التميز النفسي' : 'Psychological Excellence',
      content: isAr
        ? 'نحن لا نتجاهل العلم، بل نستخدم أفضل ما وصلت إليه الأبحاث النفسية المعاصرة. ممارساتنا مبنية على أسس علمية رصينة تتفق مع الحق الكتابي.'
        : 'We do not ignore science; we use the best of contemporary psychological research. Our practices are based on sound scientific foundations that align with biblical truth.'
    },
    {
      title: isAr ? 'الاهتمام الكلي بالإنسان' : 'Holistic Care',
      content: isAr
        ? 'نتعامل مع الإنسان ككيان متكامل (روح، عقل، وجسد). نهجنا المشوري يراعي الجوانب البيولوجية والاجتماعية والروحية لكل طالب مشورة.'
        : 'We treat the person as an integrated entity (spirit, mind, and body). Our counseling approach considers the biological, social, and spiritual aspects of every counselee.'
    },
    {
      title: isAr ? 'السرية والأمان' : 'Confidentiality & Safety',
      content: isAr
        ? 'نوفر بيئة آمنة تماماً حيث تحترم الخصوصية والسرية إلى أقصى حد، مما يسمح بالصدق والشفافية الضروريين لعملية الشفاء.'
        : 'We provide a completely safe environment where privacy and confidentiality are respected to the utmost, allowing for the honesty and transparency necessary for the healing process.'
    }
  ]

  const pillars = [
    { icon: '🌱', title_en: 'Spiritual Growth', title_ar: 'النمو الروحي', desc_en: 'Healing that reaches the soul.', desc_ar: 'شفاء يصل إلى أعماق النفس.' },
    { icon: '🧠', title_en: 'Mental Wellness', title_ar: 'الصحة النفسية', desc_en: 'Coping with life\'s challenges.', desc_ar: 'التعامل مع تحديات الحياة.' },
    { icon: '❤️', title_en: 'Emotional Care', title_ar: 'الرعاية العاطفية', desc_en: 'Empathy and support for the heart.', desc_ar: 'التعاطف والدعم للقلب.' },
    { icon: '🕊️', title_en: 'Peace & Hope', title_ar: 'السلام والرجاء', desc_en: 'Restoring what was broken.', desc_ar: 'استعادة ما انكسر.' },
  ]

  const upcomingEvents = [
    {
      id: 'counsel-1',
      title: isAr ? 'أسس الإرشاد المسيحي: دورة تدريبية' : 'Foundations of Christian Counseling: Training Course',
      date: isAr ? '١٢ نوفمبر ٢٠٢٦' : 'Nov 12, 2026',
      type: isAr ? 'دورة تدريبية' : 'Training'
    },
    {
      id: 'counsel-2',
      title: isAr ? 'خلوة المشورة الزوجية المكثفة' : 'Intensive Marriage Counseling Retreat',
      date: isAr ? '٥ ديسمبر ٢٠٢٦' : 'Dec 5, 2026',
      type: isAr ? 'خلوة' : 'Retreat'
    },
    {
      id: 'counsel-3',
      title: isAr ? 'ورشة عمل: التعامل مع القلق' : 'Workshop: Dealing with Anxiety',
      date: isAr ? '١٥ يناير ٢٠٢٧' : 'Jan 15, 2027',
      type: isAr ? 'ورشة عمل' : 'Workshop'
    }
  ]

  return (
    <main>
      <InitiativeHero
        title="ICCP"
        brandName="Care"
        tagline={isAr ? 'شفاء متكامل. إرشاد مسيحي. نمو.' : 'Holistic Healing. Christian Guidance. Growth.'}
        description={isAr
          ? 'مركز متخصص يقدم خدمات المشورة والإرشاد النفسي من منظور مسيحي متكامل، يجمع بين الحق الكتابي والتميز العلمي.'
          : 'A specialized center offering counseling and psychological guidance from an integrated Christian perspective, combining biblical truth with scientific excellence.'}
        isAr={isAr}
        accentColor="#6ec99a"
        secondaryColor="#1a5238"
        backgroundGradient="linear-gradient(135deg, #0d2b1e 0%, #1a5238 45%, #2d7a52 100%)"
        visitUrl="#"
        visitText={isAr ? 'زيارة الموقع' : 'Visit website'}
        ctaText={isAr ? 'الدورات التدريبية' : 'Training Courses'}
        ctaUrl={`/${lang}/events`}
      />

      {/* ── EMPATHY SECTION ── */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#6ec99a] opacity-[0.03] rounded-full blur-[120px]" />
        <div className="container-pad relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <ScrollReveal direction="left">
              <div>
                <p className="label-gold mb-3" style={{ color: '#6ec99a' }}>{isAr ? 'رسالتنا' : 'Our Mission'}</p>
                <h2 className="text-4xl md:text-5xl font-bold font-display text-[#1a5238] mb-8 leading-tight">
                  {isAr ? 'نرافقك في رحلة الشفاء' : 'Accompanying You on the Journey of Healing'}
                </h2>
                <div className="gold-bar w-24 mb-10" style={{ backgroundColor: '#6ec99a' }} />
                <p className="text-[#6b7280] text-lg leading-relaxed mb-8">
                  {isAr
                    ? 'نحن نؤمن أن كل إنسان يستحق مكاناً ليُسمع فيه دون حكم. مركزنا يقدم مساحة آمنة للتعامل مع الصعوبات النفسية والروحية بمهنية عالية وقلب محب.'
                    : 'We believe that every person deserves a place to be heard without judgment. Our center provides a safe space to deal with psychological and spiritual difficulties with high professionalism and a loving heart.'}
                </p>
                <div className="flex flex-wrap gap-4">
                  {pillars.map((p, i) => (
                    <div key={i} className="flex items-center gap-2 bg-[#fffdfa] px-4 py-2 rounded-full border border-[#6ec99a15]">
                      <span>{p.icon}</span>
                      <span className="text-xs font-bold text-[#1a5238]">{isAr ? p.title_ar : p.title_en}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="bg-[#f8fafc] p-1 rounded-[2.5rem] shadow-xl border border-slate-100">
                <InfoAccordion items={integrationItems} accentColor="#6ec99a" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── CARDS ── */}
      <section className="section-padding bg-slate-50">
        <div className="container-pad">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-display text-[#1a5238] mb-4">{isAr ? 'مجالات اهتمامنا' : 'Our Areas of Focus'}</h2>
            <div className="gold-bar mx-auto" style={{ backgroundColor: '#6ec99a' }} />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { t: isAr ? 'مشورة فردية' : 'Individual Counseling', d: isAr ? 'جلسات خاصة للتعامل مع القلق والاكتئاب والبحث عن الذات.' : 'Private sessions to deal with anxiety, depression, and self-discovery.' },
              { t: isAr ? 'مشورة زوجية' : 'Marriage Counseling', d: isAr ? 'بناء علاقات صحية وتواصل حقيقي بين الزوجين.' : 'Building healthy relationships and genuine communication between spouses.' },
              { t: isAr ? 'تدريب المشيرين' : 'Counselor Training', d: isAr ? 'برامج متخصصة لتجهيز جيل جديد من المشيرين المسيحيين.' : 'Specialized programs to equip a new generation of Christian counselors.' },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="bg-white p-10 rounded-3xl border border-slate-200 hover:border-[#6ec99a] hover:shadow-2xl transition-all duration-500 group">
                  <h4 className="text-xl font-bold text-[#1a5238] mb-4 group-hover:text-[#6ec99a] transition-colors">{item.t}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.d}</p>
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
                <p className="label-gold mb-3" style={{ color: '#6ec99a' }}>{isAr ? 'الأحداث القادمة' : 'Upcoming Events'}</p>
                <h2 className="text-4xl font-bold font-display text-[#1a5238]">{isAr ? 'استمر في رحلة النمو' : 'Continue Your Growth Journey'}</h2>
                <div className="gold-bar mt-4" style={{ backgroundColor: '#6ec99a' }} />
              </div>
            </ScrollReveal>
            <Link href={`/${lang}/events`} className="btn-secondary !text-[#6ec99a] border-[#6ec99a]/20 hover:bg-[#6ec99a]/5 transition-colors">
              {isAr ? 'كل الفعاليات' : 'All Events'}
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {upcomingEvents.map((ev, i) => (
              <ScrollReveal key={ev.id} delay={i * 100}>
                <div className="p-8 rounded-[2rem] border border-slate-100 hover:border-[#6ec99a]/30 transition-all duration-500 group bg-[#fffdfa]">
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 bg-[#6ec99a]/10 text-[#6ec99a]">
                    {ev.type}
                  </span>
                  <p className="text-xs text-slate-400 mb-2">{ev.date}</p>
                  <h4 className="text-xl font-bold text-[#1a5238] mb-6 group-hover:text-[#6ec99a] transition-colors h-14 line-clamp-2">
                    {ev.title}
                  </h4>
                  <Link href={`/${lang}/events`} className="inline-flex items-center text-sm font-bold text-[#6ec99a] gap-2 group/link">
                    {isAr ? 'التفاصيل والحجز' : 'Details & Booking'}
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
