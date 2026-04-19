'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface Event {
  id: string; title: string; title_ar: string; description: string; description_ar: string
  date: string; date_ar: string; sub_brand: string; type: string; price: number
  capacity: number | null; location: string; location_ar: string
}

interface EventsClientProps {
  events: Event[]; isAr: boolean; lang: string
  brandColors: Record<string, { name: string; color: string }>
}

const eventTypes = ['event', 'course', 'workshop'] as const

export default function EventsClient({ events: allEvents, isAr, lang, brandColors }: EventsClientProps) {
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedType, setSelectedType] = useState('')

  const filteredEvents = useMemo(() => {
    let f = allEvents
    if (selectedBrand) f = f.filter((e) => e.sub_brand === selectedBrand)
    if (selectedType) f = f.filter((e) => e.type === selectedType)
    return f
  }, [allEvents, selectedBrand, selectedType])

  const brandLabelAr = (b: string) => {
    const map: Record<string, string> = {
      credologos: 'كريدولوجوس',
      third_space: 'المساحة الثالثة',
      east: 'شرق',
      counseling: 'ماجستير الإرشاد',
      e30: 'E30',
    }
    return map[b] ?? b
  }
  const typeLabelAr = (t: string) =>
    t === 'event' ? 'حدث' : t === 'course' ? 'دورة' : 'ورشة'

  return (
    <section className="section-padding">
      <div className="container-pad">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
          <p className="label-gold mb-1">{isAr ? 'استكشف' : 'Explore'}</p>
          <h1 className="text-5xl md:text-6xl font-bold text-[#2A317B] font-display mb-2">
            {isAr ? 'الأحداث' : 'Events'}
          </h1>
          <p className="text-[#6b7280] max-w-2xl">
            {isAr ? 'استكشف مجموعة متنوعة من الأحداث والدورات والورش' : 'Explore our diverse range of events, courses, and workshops'}
          </p>
        </motion.div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 mb-10 shadow-sm border border-[#EDEDED]">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-[#2A317B] uppercase tracking-widest mb-3">
                {isAr ? 'المبادرة' : 'Initiative'}
              </label>
              <div className="flex flex-wrap gap-2">
                <FilterBtn active={selectedBrand === ''} onClick={() => setSelectedBrand('')} color="#2A317B">
                  {isAr ? 'الكل' : 'All'}
                </FilterBtn>
                {Object.keys(brandColors).map((b) => (
                  <FilterBtn key={b} active={selectedBrand === b} onClick={() => setSelectedBrand(b)} color={brandColors[b].color}>
                    {isAr ? brandLabelAr(b) : brandColors[b].name}
                  </FilterBtn>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#2A317B] uppercase tracking-widest mb-3">
                {isAr ? 'النوع' : 'Type'}
              </label>
              <div className="flex flex-wrap gap-2">
                <FilterBtn active={selectedType === ''} onClick={() => setSelectedType('')} color="#2A317B">
                  {isAr ? 'الكل' : 'All'}
                </FilterBtn>
                {eventTypes.map((t) => (
                  <FilterBtn key={t} active={selectedType === t} onClick={() => setSelectedType(t)} color="#F1A91E">
                    {isAr ? typeLabelAr(t) : t.charAt(0).toUpperCase() + t.slice(1)}
                  </FilterBtn>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-[#6b7280] mb-6 font-medium">
          {isAr ? `${filteredEvents.length} نتيجة` : `${filteredEvents.length} results`}
        </p>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredEvents.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={`/${lang}/events/${event.id}`} className="group block">
                <div className="bg-white rounded-2xl overflow-hidden border border-[#EDEDED] hover:border-[#2A317B]/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                  <div className="h-32 flex items-end p-5 relative overflow-hidden"
                    style={{ backgroundColor: brandColors[event.sub_brand]?.color ?? '#2A317B' }}>
                    <div className="absolute inset-0 opacity-20"
                      style={{ background: 'radial-gradient(circle at 70% 30%,rgba(255,255,255,0.4),transparent 60%)' }} />
                    <div className="relative">
                      <span className="inline-block bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium capitalize">
                        {isAr ? typeLabelAr(event.type) : event.type}
                      </span>
                      <p className="text-white/75 text-xs mt-1">{isAr ? event.date_ar : event.date}</p>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-[#2A317B] text-base leading-snug mb-2 group-hover:text-[#F1A91E] transition-colors line-clamp-2">
                      {isAr ? event.title_ar : event.title}
                    </h3>
                    <p className="text-[#6b7280] text-sm leading-relaxed mb-auto line-clamp-2">
                      {isAr ? event.description_ar : event.description}
                    </p>
                    <div className="flex items-center gap-1 text-[#6b7280] text-xs mt-3 mb-4">
                      <span>📍</span> {isAr ? event.location_ar : event.location}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-[#EDEDED]">
                      <span className="font-bold text-[#2A317B] text-sm">
                        {event.price === 0 ? (isAr ? 'مجاني' : 'Free') : `${event.price} EGP`}
                      </span>
                      <span className="text-[#F1A91E] font-semibold text-xs">
                        {isAr ? 'اعرف أكثر ←' : 'Learn more →'}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-[#6b7280] text-lg">{isAr ? 'لا توجد أحداث مطابقة' : 'No events match your filters'}</p>
          </div>
        )}
      </div>
    </section>
  )
}

function FilterBtn({ active, onClick, color, children }: {
  active: boolean; onClick: () => void; color: string; children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
      style={{
        backgroundColor: active ? color : '#EDEDED',
        color: active ? '#fff' : '#2A317B',
      }}
    >
      {children}
    </button>
  )
}
