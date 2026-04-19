import { notFound } from 'next/navigation'
import { hasLocale, getDictionary, type Locale } from '@/lib/dictionaries'
import Link from 'next/link'
import Newsletter from '@/components/Newsletter'
import ScrollReveal from '@/components/ScrollReveal'
import InitiativeHero from '@/components/InitiativeHero'
import InfoAccordion from '@/components/InfoAccordion'

export default async function ThirdSpacePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang as Locale)
  const isAr = lang === 'ar'

  const philosophyItems = [
    {
      title: isAr ? 'الضيافة الجذرية' : 'Radical Hospitality',
      content: isAr 
        ? 'نحن نؤمن بخلق مائدة يرحب فيها بالجميع، تماماً كما هم. الضيافة عندنا ليست مجرد استقبال، بل هي فعل مقدّس يجعل كل شخص يشعر بأنه مرئي ومسموع.'
        : 'We believe in creating a table where everyone is welcome, exactly as they are. Hospitality for us is not just reception; it is a sacred act that makes everyone feel seen and heard.'
    },
    {
      title: isAr ? 'ثقافة الاستماع' : 'A Culture of Listening',
      content: isAr
        ? 'في عالم يضج بالأصوات، نحن نعطي الأولوية للصمت والاستماع النشط. الاستماع المتفهم هو حجر الزاوية في كل لقاءاتنا، حيث نعطي فرصة لكل قصة أن تُروى.'
        : 'In a world full of noise, we prioritize silence and active listening. Understanding listening is the cornerstone of all our gatherings, where we give a chance for every story to be told.'
    },
    {
      title: isAr ? 'إنسانية مشتركة' : 'Shared Humanity',
      content: isAr
        ? 'نحن نركز على ما يربطنا كبشر قبل أي شيء آخر. المساحة الثالثة هي المكان الذي نسقط فيه الأقنعة لنتلاقى في جوهر إنسانيتنا المشترك.'
        : 'We focus on what connects us as human beings above all else. Third Space is where we drop our masks to meet in the essence of our shared humanity.'
    },
    {
      title: isAr ? 'الانتماء قبل الاعتقاد' : 'Belonging Before Belief',
      content: isAr
        ? 'مساحتنا مفتوحة للجميع بغض النظر عن خلفياتهم أو معتقداتهم. نحن نوفر بيئة آمنة للتساؤل والبحث والنمو معاً في جو من الاحترام المتبادل.'
        : 'Our space is open to everyone regardless of their backgrounds or beliefs. We provide a safe environment for questioning, searching, and growing together in an atmosphere of mutual respect.'
    }
  ]

  const pillars = [
    { icon: '🏡', title_en: 'A Safe Space', title_ar: 'مساحة آمنة', desc_en: 'A place where you can be honest, vulnerable, and heard.', desc_ar: 'مكان يمكنك فيه أن تكون صادقاً وصريحاً ومستمَعاً إليه.' },
    { icon: '🤝', title_en: 'Genuine Community', title_ar: 'مجتمع حقيقي', desc_en: 'Real people building real relationships without agendas.', desc_ar: 'أناس حقيقيون يبنون علاقات حقيقية دون أجندات.' },
    { icon: '💬', title_en: 'Open Conversation', title_ar: 'حوار مفتوح', desc_en: 'Discussing life, faith, doubt, and purpose with honesty.', desc_ar: 'الحديث عن الحياة والإيمان والشك والهدف بصدق.' },
    { icon: '🌿', title_en: 'Belonging', title_ar: 'الانتماء', desc_en: 'The place between home and church where you belong.', desc_ar: 'المكان بين البيت والكنيسة حيث تنتمي ببساطة.' },
  ]

  const formats = [
    { icon: '☕', title_en: 'Monthly Gatherings', title_ar: 'لقاءات شهرية', desc_en: 'Casual, warm evenings of conversation and connection.', desc_ar: 'أمسيات غير رسمية ودافئة من الحوار والتواصل.' },
    { icon: '📖', title_en: 'Story Nights', title_ar: 'ليالي القصص', desc_en: 'People sharing their journeys — raw, honest, and human.', desc_ar: 'أناس يشاركون رحلاتهم — بصدق وإنسانية.' },
    { icon: '🎙️', title_en: 'Dialogue Evenings', title_ar: 'أمسيات الحوار', desc_en: 'Guided conversations on questions that matter most.', desc_ar: 'محادثات موجّهة حول الأسئلة الأكثر أهمية.' },
    { icon: '🌟', title_en: 'Annual Retreat', title_ar: 'الخلوة السنوية', desc_en: 'A deeper, slower experience of community and reflection.', desc_ar: 'تجربة أعمق وأهدأ من المجتمع والتأمل.' },
  ]

  const upcomingEvents = [
    {
      id: 'ts-1',
      title: isAr ? 'ليلة القصص المجتمعية' : 'Community Story Night',
      date: isAr ? '٢٢ سبتمبر ٢٠٢٦' : 'Sep 22, 2026',
      type: isAr ? 'أمسية' : 'Story Night'
    },
    {
      id: 'ts-2',
      title: isAr ? 'حوار مفتوح: الإيمان والشك' : 'Open Dialogue: Faith & Doubt',
      date: isAr ? '٥ أكتوبر ٢٠٢٦' : 'Oct 5, 2026',
      type: isAr ? 'حلقة نقاش' : 'Dialogue'
    },
    {
      id: 'ts-3',
      title: isAr ? 'عشاء المساحة الثالثة' : 'Third Space Community Dinner',
      date: isAr ? '١٢ نوفمبر ٢٠٢٦' : 'Nov 12, 2026',
      type: isAr ? 'لقاء اجتماعي' : 'Gathering'
    }
  ]

  return (
    <main>
      <InitiativeHero 
        title={isAr ? 'المساحة الثالثة' : 'Third Space'}
        brandName="Space"
        tagline={isAr ? 'مجتمع. انتماء. ملاذ آمن.' : 'Community. Belonging. Safe Harbor.'}
        description={isAr
          ? 'مساحة مجتمعية مرحّبة يجتمع فيها الناس للتشارك والاستماع والانتماء — لا تحركها الأعمال، بل الاتصال الإنساني الحقيقي.'
          : 'A welcoming community space where people gather to share, listen, and belong — not driven by business, but by genuine human connection.'}
        isAr={isAr}
        accentColor="#a0650e"
        secondaryColor="#2A317B"
        backgroundGradient="linear-gradient(135deg,#031a22 0%,#2A317B 45%,#2d1200 100%)"
        visitUrl="#"
        visitText={isAr ? 'زيارة الموقع' : 'Visit Website'}
        ctaText={isAr ? 'انضم إلينا' : 'Join Us'}
        ctaUrl={`/${lang}/events`}
      />

      {/* ── QUOTE SECTION ── */}
      <section className="section-padding bg-white overflow-hidden relative">
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-[#a0650e] opacity-[0.03] rounded-full blur-[100px]" />
        <div className="container-pad relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal direction="up">
              <span className="text-6xl text-[#a0650e]/20 font-display italic block mb-[-20px]">"</span>
              <h2 className="text-3xl md:text-5xl font-bold font-display text-[#2A317B] leading-tight mb-8">
                {isAr
                   ? 'المكان الذي بينهما — حيث يمكنك أن تكون أنت، دون أقنعة أو توقعات.'
                   : 'The Place In Between — where you can be yourself, without masks or expectations.'}
              </h2>
              <div className="gold-bar mx-auto w-20" style={{ backgroundColor: '#a0650e' }} />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── PILLARS ── */}
      <section className="section-padding bg-[#fcfdfa]">
        <div className="container-pad">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <ScrollReveal direction="left">
               <div className="grid grid-cols-2 gap-6">
                {pillars.map((p, i) => (
                  <div key={i} className="bg-white p-8 rounded-[2rem] border border-[#EDEDED] hover:border-[#a0650e]/30 hover:shadow-xl transition-all duration-500 group">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{p.icon}</div>
                    <h4 className="font-bold text-[#2A317B] mb-2">{isAr ? p.title_ar : p.title_en}</h4>
                    <p className="text-xs text-[#6b7280] leading-relaxed">{isAr ? p.desc_ar : p.desc_en}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="right">
              <div>
                <p className="label-gold mb-3" style={{ color: '#a0650e' }}>{isAr ? 'فلسفتنا' : 'Our Philosophy'}</p>
                <h2 className="text-4xl md:text-5xl font-bold font-display text-[#2A317B] mb-8 leading-tight">
                  {isAr ? 'أكثر من مجرد مكان لللقاء' : 'More Than Just a Gathering Place'}
                </h2>
                <InfoAccordion items={philosophyItems} accentColor="#a0650e" />
              </div>
            </ScrollReveal>
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
                <h2 className="text-4xl font-bold font-display text-[#2A317B]">{isAr ? 'كن جزءاً من الحوار' : 'Be Part of the Conversation'}</h2>
                <div className="gold-bar mt-4" style={{ backgroundColor: '#a0650e' }} />
              </div>
            </ScrollReveal>
            <Link href={`/${lang}/events`} className="btn-secondary !text-[#a0650e] border-[#a0650e]/20 hover:bg-[#a0650e]/5 transition-colors">
              {isAr ? 'عرض الجميع' : 'Show All'}
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {upcomingEvents.map((ev, i) => (
              <ScrollReveal key={ev.id} delay={i * 100}>
                <div className="p-8 rounded-[2rem] border border-slate-100 hover:border-[#a0650e]/30 transition-all duration-500 group bg-[#fffdfa] shadow-sm">
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

      {/* ── FORMATS ── */}
      <section className="section-padding" style={{ backgroundColor: '#2A317B' }}>
        <div className="container-pad">
          <div className="text-center mb-20">
            <p className="label-gold mb-3" style={{ color: '#F1A91E' }}>{isAr ? 'كيف نلتقي' : 'How We Gather'}</p>
            <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">
              {isAr ? 'أشكال مختلفة من التواصل الإنساني' : 'Diverse Forms of Human Connection'}
            </h2>
            <div className="gold-bar mx-auto" style={{ backgroundColor: '#F1A91E' }} />
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {formats.map((f, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="relative group p-10 rounded-[2.5rem] border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#a0650e] transition-all duration-500 hover:-translate-y-2">
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-4xl mb-6 group-hover:bg-[#a0650e]/20 transition-colors">
                      {f.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 font-display transition-colors">
                      {isAr ? f.title_ar : f.title_en}
                    </h3>
                    <p className="text-white/50 group-hover:text-white/80 text-sm leading-relaxed transition-colors">
                      {isAr ? f.desc_ar : f.desc_en}
                    </p>
                  </div>
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
