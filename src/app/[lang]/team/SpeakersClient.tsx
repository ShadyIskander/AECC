'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import type { Dictionary } from '@/lib/dictionaries'
import type { Speaker } from './page'
import Newsletter from '@/components/Newsletter'

function MorphBlob({ style, duration = 8, color }: { style: React.CSSProperties; duration?: number; color: string }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ ...style, backgroundColor: color, filter: 'blur(90px)' }}
      animate={{
        borderRadius: ['60% 40% 30% 70% / 60% 30% 70% 40%', '30% 60% 70% 40% / 50% 60% 30% 60%', '60% 40% 30% 70% / 60% 30% 70% 40%'],
        scale: [1, 1.07, 1],
      }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

interface Props {
  lang: string
  dict: Dictionary
  speakers: Speaker[]
}

const FILTERS = ['All', 'Philosophy', 'Theology', 'Science', 'Literature', 'Healthcare', 'Other']
const FILTERS_AR = ['الكل', 'الفلسفة', 'اللاهوت', 'العلوم', 'الأدب', 'الرعاية الصحية', 'أخرى']

export default function SpeakersClient({ lang, dict, speakers }: Props) {
  const isAr = lang === 'ar'
  const [activeFilter, setActiveFilter] = useState('All')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const heroWords = (isAr ? 'المتحدثون والقادة' : 'Speakers & Leaders').split(' ')

  const filters = isAr ? FILTERS_AR : FILTERS
  const filterMap: Record<string, string[]> = {
    'All': [], 'الكل': [],
    'Philosophy': ['Philosophy', 'Epistemology', 'Logic'],
    'الفلسفة': ['الفلسفة', 'نظرية المعرفة', 'المنطق'],
    'Theology': ['Theology', 'Biblical Studies', 'Systematic Theology'],
    'اللاهوت': ['اللاهوت', 'الدراسات الكتابية', 'اللاهوت النظامي'],
    'Science': ['Science & Faith', 'Philosophy of Science'],
    'العلوم': ['العلم والإيمان', 'فلسفة العلم'],
    'Literature': ['Literature', 'Narrative Theology'],
    'الأدب': ['الأدب','اللاهوت السردي'],
    'Healthcare': ['Healthcare & Faith', 'Medical Ethics'],
    'الرعاية الصحية': ['الرعاية الصحية والإيمان', 'الأخلاقيات الطبية'],
    'Other': ['Political Science', 'Economics'],
    'أخرى': ['العلوم السياسية', 'الاقتصاد'],
  }

  const filtered = speakers.filter(s => {
    const keys = filterMap[activeFilter]
    if (!keys || keys.length === 0) return true
    const expertiseList = isAr ? s.expertise_ar : s.expertise
    return expertiseList.some(e => keys.some(k => e.includes(k)))
  })

  return (
    <div className="relative overflow-x-hidden bg-[#fafafa] selection:bg-[#F1A91E] selection:text-white">

      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#05081a 0%,#0c1238 28%,#1a2055 58%,#2A317B 100%)' }}
      >
        <MorphBlob color="rgba(42,49,123,0.55)"  style={{ width: 700, height: 700, top: '-20%', left: '-15%' }} duration={10} />
        <MorphBlob color="rgba(101,203,227,0.10)" style={{ width: 500, height: 500, top: '10%', right: '-10%' }} duration={13} />
        <MorphBlob color="rgba(241,169,30,0.07)"  style={{ width: 400, height: 400, bottom: '0%', left: '20%' }} duration={9} />

        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 65% 55% at 50% 42%, rgba(84,106,178,0.22) 0%, transparent 70%)' }} />

        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(168,176,217,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(168,176,217,0.6) 1px,transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{ width: 2, height: 2, left: `${(i * 7.3) % 100}%`, top: `${(i * 13.7) % 100}%`, opacity: 0.15 }}
            animate={{ y: [0, -40, 0], x: [0, 20, 0] }}
            transition={{ duration: 12 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
          />
        ))}

        <div className="container-pad relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 rounded-full px-5 py-2 mb-10"
            style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            <motion.span
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2.2, repeat: Infinity }}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: '#F1A91E' }}
            />
            <span className="text-white/65 text-xs font-semibold uppercase tracking-widest">
              {isAr ? 'فريق AECC' : 'The AECC Team'}
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            {heroWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 56, filter: 'blur(12px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.75, delay: 0.25 + i * 0.11, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block mr-4"
                style={{ color: i === heroWords.length - 1 ? '#F1A91E' : 'white' }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 + heroWords.length * 0.11 + 0.15 }}
            className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            {isAr
              ? 'تعرف على فريق الخبراء المكرسين لإثراء رحلتك الروحية والفكرية'
              : 'Meet our dedicated team of experts committed to enriching your spiritual and intellectual journey'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 + heroWords.length * 0.11 + 0.4 }}
            className="flex flex-wrap justify-center gap-8 mt-4"
          >
            {[
              { val: speakers.length.toString(), label: isAr ? 'متحدث' : 'Speakers' },
              { val: '7+', label: isAr ? 'تخصصات' : 'Disciplines' },
              { val: '5', label: isAr ? 'جامعات عالمية' : 'Global Universities' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-black text-white">{s.val}</div>
                <div className="text-white/40 text-xs uppercase tracking-widest mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <p className="text-white/25 text-xs tracking-widest uppercase">Scroll</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-5 h-9 rounded-full border border-white/15 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-white/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── FILTER BAR ── */}
      <section className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="container-pad py-4 overflow-x-auto">
          <div className="flex gap-2 min-w-max mx-auto justify-center">
            {filters.map((f) => (
              <motion.button
                key={f}
                onClick={() => setActiveFilter(f)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300"
                style={{
                  backgroundColor: activeFilter === f ? '#2A317B' : 'transparent',
                  color: activeFilter === f ? 'white' : '#888',
                  border: activeFilter === f ? '1px solid #2A317B' : '1px solid #e5e7eb',
                }}
              >
                {f}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ── UNIFIED TEAM GRID ── */}
      <section className="py-24 bg-white">
        <div className="container-pad">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="text-[#F1A91E] font-bold tracking-widest text-xs uppercase">
              {isAr ? 'فريقنا' : 'Our Team'}
            </span>
            <div className="w-8 h-[2px] bg-[#F1A91E] mt-2" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                onClick={() => setExpandedId(expandedId === s.id ? null : s.id)}
                className="group relative bg-[#fafafa] rounded-[2.5rem] border border-transparent hover:border-[#F1A91E]/30 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                {/* Top color bar */}
                <div className="h-1.5 w-full rounded-t-[2.5rem]" style={{ backgroundColor: s.color }} />

                <div className="p-10">
                  {/* Emoji avatar */}
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${s.color}18` }}
                  >
                    {s.image}
                  </div>

                  <h3 className="text-2xl font-black text-[#2A317B] mb-1">
                    {isAr ? s.name_ar : s.name}
                  </h3>
                  <p className="font-bold text-sm uppercase tracking-tight mb-4" style={{ color: s.color }}>
                    {isAr ? s.title_ar : s.title}
                  </p>

                  {/* Expanding line */}
                  <div
                    className="h-[2px] mb-6 transition-all duration-700"
                    style={{
                      width: expandedId === s.id ? '100%' : '3rem',
                      backgroundColor: s.color,
                      opacity: 0.4,
                    }}
                  />

                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    {isAr ? s.bio_ar : s.bio}
                  </p>

                  {/* Expertise tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {(isAr ? s.expertise_ar : s.expertise).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ backgroundColor: `${s.color}15`, color: s.color }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Expanded section */}
                  <motion.div
                    initial={false}
                    animate={{ height: expandedId === s.id ? 'auto' : 0, opacity: expandedId === s.id ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                        {isAr ? 'المواضيع' : 'Topics'}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {(isAr ? s.topics_ar : s.topics).map((t) => (
                          <span key={t} className="px-3 py-1 rounded-full text-xs font-medium bg-white border border-gray-200 text-gray-600">
                            {t}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs italic text-gray-400 mt-4">{isAr ? s.credentials_ar : s.credentials}</p>
                    </div>
                  </motion.div>

                  {/* Expand hint */}
                  <motion.div
                    animate={{ rotate: expandedId === s.id ? 180 : 0 }}
                    className="mt-4 flex items-center gap-2 text-xs font-semibold"
                    style={{ color: s.color }}
                  >
                    <span>{expandedId === s.id ? (isAr ? 'طي' : 'Less') : (isAr ? 'المزيد' : 'More')}</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400 text-sm">
              {isAr ? 'لا يوجد متحدثون في هذه الفئة' : 'No speakers found in this category'}
            </div>
          )}
        </div>
      </section>

      <Newsletter />
    </div>
  )
}