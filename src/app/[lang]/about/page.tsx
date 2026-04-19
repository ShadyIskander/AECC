import { notFound } from 'next/navigation'
import { hasLocale, getDictionary, type Locale } from '@/lib/dictionaries'
import Newsletter from '@/components/Newsletter'

const team = [
  { name: 'د. ماهر صموئيل', name_en: 'Dr. Maher Samuel', title_ar: 'مؤسس — طبيب نفسي | ماجستير فلسفة ودين', title_en: 'Founder — Psychiatrist | MA Philosophy & Religion', school: 'Trinity International University', emoji: '🎓' },
  { name: 'وسيم صبري', name_en: 'Waseem Sabry', title_ar: 'ماجستير الفلسفة', title_en: 'MA Philosophy', school: 'American University in Cairo', emoji: '🏛️' },
  { name: 'يوسف يعقوب', name_en: 'Youssef Yaqoub', title_ar: 'ماجستير فلسفة العلم والدين', title_en: 'MSc Philosophy of Science & Religion', school: 'University of Edinburgh', emoji: '🔬' },
  { name: 'حسام حشمت', name_en: 'Hossam Heshmat', title_ar: 'ماجستير اللاهوت', title_en: 'MDiv Theology', school: 'Princeton Theological Seminary', emoji: '📜' },
  { name: 'أندرو أشرف', name_en: 'Andrew Ashraf', title_ar: 'ماجستير الأدب الحديث', title_en: 'MA Modern & Contemporary Literature', school: 'University of Nottingham', emoji: '✍️' },
]

const values = [
  { icon: '💡', title_en: 'Intellectual Integrity', title_ar: 'النزاهة الفكرية', desc_en: 'We engage seriously with ideas, honouring reason as a gift.', desc_ar: 'نتعامل بجدية مع الأفكار، نُكرّم العقل بوصفه هبة.' },
  { icon: '🌍', title_en: 'Cultural Engagement', title_ar: 'الانخراط الثقافي', desc_en: 'We speak to the Arab world from within its rich heritage.', desc_ar: 'نتكلم إلى العالم العربي من داخل تراثه الغني.' },
  { icon: '🤝', title_en: 'Denominational Unity', title_ar: 'الوحدة بين الطوائف', desc_en: 'We serve all denominations, presenting agreed Christian truth.', desc_ar: 'نخدم كل الطوائف، نقدم الحق المسيحي المتفق عليه.' },
  { icon: '🔥', title_en: 'Passionate Pursuit', title_ar: 'السعي الحثيث', desc_en: 'We pursue truth with both the mind and the heart.', desc_ar: 'نتعامل مع الحق بالعقل والقلب معاً.' },
]

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang as Locale)
  const isAr = lang === 'ar'

  return (
    <div className="relative overflow-x-hidden bg-[#fafafa] selection:bg-[#F1A91E] selection:text-white">

      {/* 1. HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#06091a]">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#2A317B] blur-[140px] opacity-40 animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#F1A91E] blur-[140px] opacity-10" />
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white opacity-20 animate-float"
              style={{
                width: Math.random() * 4 + 'px',
                height: Math.random() * 4 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animationDuration: Math.random() * 10 + 10 + 's',
                animationDelay: Math.random() * 5 + 's',
              }}
            />
          ))}
        </div>

        <div className="container-pad relative z-10 text-center">
          <div className="inline-block px-4 py-1 border border-[#F1A91E]/30 rounded-full mb-8 backdrop-blur-sm animate-in fade-in zoom-in duration-1000">
            <p className="text-[#F1A91E] tracking-[0.4em] font-bold text-[10px] md:text-xs uppercase">
              {isAr ? 'مركز الشرق الأوسط للفكر والتعاون' : 'Arab Evangelical Cultural Center'}
            </p>
          </div>

          <h1
            className="text-6xl md:text-9xl font-black text-white mb-8 tracking-tighter leading-none animate-in fade-in slide-in-from-top-12 duration-1000"
            style={{ wordSpacing: '0.2em' }}
          >
            {dict.about.title}
          </h1>

          <p className="max-w-3xl mx-auto text-white/50 text-xl md:text-3xl leading-relaxed font-light animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            {dict.about.subtitle}
          </p>

          <div className="mt-20 flex flex-col items-center gap-4 opacity-50">
            <div className="w-px h-24 bg-gradient-to-b from-[#F1A91E] to-transparent" />
          </div>
        </div>
      </section>

      {/* 2. STATS */}
      <section className="relative z-30 -mt-20 container-pad">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: isAr ? 'محاضرة' : 'Lectures', val: '500' },
            { label: isAr ? 'طالب' : 'Students', val: '2000' },
            { label: isAr ? 'سنة خبرة' : 'Years Experience', val: '15' },
            { label: isAr ? 'دولة' : 'Countries', val: '12' },
          ].map((stat, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-[2.5rem] border transition-all duration-500 p-10"
              style={{
                background: 'linear-gradient(135deg, rgba(42,49,123,0.85) 0%, rgba(6,9,26,0.95) 100%)',
                borderColor: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div
                className="h-1 w-12 rounded-full mb-6 transition-all duration-700 group-hover:w-full"
                style={{ backgroundColor: '#F1A91E' }}
              />
              <div className="text-4xl md:text-5xl font-black text-white mb-2 flex items-baseline gap-1">
                <span>{stat.val}</span>
                <span style={{ color: '#F1A91E' }}>+</span>
              </div>
              <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. VISION & MISSION */}
      <section className="py-40 relative">
        <div className="container-pad">
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">

            <div className="bg-white p-12 md:p-16 rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col justify-center min-h-[400px]">
              <div className="mb-6">
                <span className="text-[#F1A91E] font-bold tracking-widest text-xs uppercase">{isAr ? 'الرؤية' : 'The Vision'}</span>
                <div className="w-8 h-[2px] bg-[#F1A91E] mt-2" />
              </div>
              <h3 className="text-5xl font-black text-[#2A317B] mb-8 leading-tight">{dict.about.vision}</h3>
              <p className="text-gray-500 text-xl md:text-2xl leading-relaxed font-light italic">
                "{dict.about.visionText}"
              </p>
            </div>

            <div className="bg-[#2A317B] p-12 md:p-16 rounded-[3rem] shadow-2xl flex flex-col justify-center text-white min-h-[400px]">
              <div className="mb-6">
                <span className="text-[#F1A91E] font-bold tracking-widest text-xs uppercase">{isAr ? 'الرسالة' : 'The Mission'}</span>
                <div className="w-8 h-[2px] bg-[#F1A91E] mt-2" />
              </div>
              <h3 className="text-5xl font-black mb-8 leading-tight">{dict.about.mission}</h3>
              <p className="text-white/70 text-lg md:text-xl leading-relaxed">
                {dict.about.missionText}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. MANIFESTO */}
      <section className="py-60 bg-[#06091a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>
        <div className="container-pad relative z-10 text-center">
          <h2 className="text-white text-5xl md:text-8xl font-serif italic mb-16 leading-tight max-w-5xl mx-auto">
            {isAr ? 'نحن نؤمن بجمال الحق' : 'We believe in the beauty of truth'}
          </h2>
          <div className="grid md:grid-cols-2 gap-16 text-left max-w-5xl mx-auto">
            <p className="text-white/40 text-xl leading-relaxed">
              {isAr
                ? 'في قلب كل فكرة عظيمة يكمن الحق الذي يحررنا.'
                : 'At the heart of every great idea lies the truth that sets us free. We explore the intersection of ancient faith and modern reason.'}
            </p>
            <p className="text-white/40 text-xl leading-relaxed border-l border-white/10 pl-8">
              {isAr
                ? 'نسعى لخلق مساحة للحوار الراقي.'
                : 'Creating a sanctuary for intellectual depth and spiritual renewal within the Arab cultural heritage.'}
            </p>
          </div>
        </div>
      </section>

      {/* 5. FACULTY */}
      <section className="py-40 bg-white">
        <div className="container-pad">
          <div className="text-center mb-24">
            <h2 className="text-6xl font-black text-[#2A317B] mb-4">{isAr ? 'هيئة التدريس' : 'The Faculty'}</h2>
            <p className="text-[#F1A91E] font-bold tracking-[0.3em] uppercase">{isAr ? 'عقولنا المبدعة' : 'The Minds Guiding Us'}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {team.map((m, i) => (
              <div
                key={i}
                className="group relative overflow-hidden bg-[#fafafa] p-12 rounded-[3rem] border border-transparent hover:border-[#F1A91E]/30 transition-all duration-700 w-full md:w-[calc(50%-2rem)] lg:w-[calc(33.33%-2rem)] max-w-md"
              >
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-[#2A317B] text-white flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform">
                    {m.emoji}
                  </div>
                  <h4 className="text-3xl font-bold text-[#2A317B] mb-2">{isAr ? m.name : m.name_en}</h4>
                  <p className="text-[#F1A91E] font-bold text-sm uppercase mb-6 tracking-tighter">
                    {isAr ? m.title_ar : m.title_en}
                  </p>
                  <div className="w-12 h-1 bg-gray-200 mb-6 group-hover:w-full transition-all duration-700" />
                  <p className="text-gray-400 text-xs font-medium italic">{m.school}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PILLARS */}
      <section className="py-40 bg-[#0e1540] text-white relative">
        <div className="container-pad">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-4">
              {isAr ? 'ركائزنا' : 'Our Pillars'}
            </h2>
            <div className="w-24 h-1 bg-[#F1A91E] mx-auto opacity-50" />
          </div>

          <div className="grid lg:grid-cols-2 gap-20">
            {values.map((v, i) => (
              <div key={i} className="flex gap-8 group">
                <div className="text-6xl grayscale group-hover:grayscale-0 transition-all opacity-20 group-hover:opacity-100">
                  {v.icon}
                </div>
                <div>
                  <h4 className="text-3xl font-black text-[#F1A91E] mb-4">{isAr ? v.title_ar : v.title_en}</h4>
                  <p className="text-white/40 group-hover:text-white/70 transition-colors text-xl leading-relaxed">
                    {isAr ? v.desc_ar : v.desc_en}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0); }
            50% { transform: translateY(-40px) translateX(20px); }
          }
          .animate-float {
            animation: float linear infinite;
          }
        `
      }} />
    </div>
  )
}