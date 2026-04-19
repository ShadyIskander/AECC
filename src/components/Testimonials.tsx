'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const mockTestimonials = [
  { id: '1', name: 'Ahmed Hassan', role: 'Student, Cairo University', text: 'AECC has completely transformed how I think about faith and reason. The courses and events have given me tools to have deeper conversations.', text_ar: 'غيّر AECC طريقة تفكيري حول الإيمان والعقل تماماً. الدورات والأحداث أعطتني أدوات للحوار الأعمق.', rating: 5 },
  { id: '2', name: 'Fatima Ali', role: 'Professional, Alexandria', text: "The Third Space has been a sanctuary for genuine conversation. It's rare to find a community that values both intellect and spirituality.", text_ar: 'المساحة الثالثة كانت ملاذاً للحوار الحقيقي. من النادر إيجاد مجتمع يقدّر العقل والروح معاً.', rating: 5 },
  { id: '3', name: 'Mohamed Ibrahim', role: 'Entrepreneur, Giza', text: 'The quality of speakers and depth of content is unmatched. I recommend AECC to anyone seeking intellectual and spiritual growth.', text_ar: 'مستوى المتحدثين وعمق المحتوى لا مثيل له. أنصح أي شخص يبحث عن النمو الفكري والروحي.', rating: 5 },
  { id: '4', name: 'Layla Mohammed', role: 'Student, AUC', text: 'Credologos gave me confidence to engage with my faith intellectually. The courses are challenging but incredibly rewarding.', text_ar: 'أعطتني كريدولوجوس ثقة للتعامل مع إيماني بعقل. الدورات صعبة لكن مفيدة جداً.', rating: 5 },
]

export default function Testimonials() {
  const [isAr, setIsAr] = useState(false)
  const pathname = usePathname()
  useEffect(() => { setIsAr(pathname.startsWith('/ar')) }, [pathname])

  return (
    <section className="section-padding bg-white">
      <div className="container-pad">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-14">
          <p className="label-gold mb-2">{isAr ? 'تقييمات' : 'Testimonials'}</p>
          <h2 className="text-4xl font-bold text-[#2A317B] font-display mb-3">
            {isAr ? 'ما يقول عنا الآخرون' : 'What Our Community Says'}
          </h2>
          <div className="gold-bar mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-7">
          {mockTestimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(42,49,123,0.12)' }}
              className="bg-gradient-to-br from-white to-[#f8f9ff] p-8 rounded-2xl border border-[#EDEDED] transition-all"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <span key={i} className="text-[#F1A91E]">★</span>
                ))}
              </div>
              <p className="text-[#6b7280] leading-relaxed mb-6 text-sm">
                "{isAr ? t.text_ar : t.text}"
              </p>
              <div className="flex items-center gap-4 pt-5 border-t border-[#EDEDED]">
                <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ background: 'linear-gradient(135deg,#2A317B,#546AB2)' }}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-[#2A317B] text-sm">{t.name}</p>
                  <p className="text-xs text-[#6b7280]">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
