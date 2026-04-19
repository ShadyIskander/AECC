import { notFound } from 'next/navigation'
import { hasLocale, type Locale } from '@/lib/dictionaries'
import Newsletter from '@/components/Newsletter'
import EventsClient from '@/components/EventsClient'

const mockEvents = [
  { id: 'e1', title: 'Credologos Summer School 2025', title_ar: 'مدرسة كريدولوجوس الصيفية ٢٠٢٥', description: 'An intensive summer program in theology, philosophy, and apologetics.', description_ar: 'برنامج صيفي مكثف في اللاهوت والفلسفة والدفاع عن الإيمان.', date: 'Aug 14–29, 2025', date_ar: '١٤–٢٩ أغسطس ٢٠٢٥', sub_brand: 'credologos', type: 'event', price: 0, capacity: 60, location: 'Cairo, Egypt', location_ar: 'القاهرة، مصر' },
  { id: 'c1', title: 'God & Science', title_ar: 'الله والعلم', description: 'A course exploring the relationship between faith and modern science.', description_ar: 'دورة تستكشف العلاقة بين الإيمان والعلم الحديث.', date: 'Mar 5 – May 7, 2026', date_ar: '٥ مارس – ٧ مايو ٢٠٢٦', sub_brand: 'credologos', type: 'course', price: 350, capacity: 40, location: 'Online', location_ar: 'أونلاين' },
  { id: 'c2', title: 'Philosophy & Christian Faith', title_ar: 'الفلسفة والإيمان المسيحي', description: 'Exploring the history and arguments of philosophy through a Christian lens.', description_ar: 'استكشاف تاريخ الفلسفة وحججها من منظور مسيحي.', date: 'Oct 30 – Dec 18, 2025', date_ar: '٣٠ أكتوبر – ١٨ ديسمبر ٢٠٢٥', sub_brand: 'credologos', type: 'course', price: 280, capacity: 35, location: 'Online', location_ar: 'أونلاين' },
  { id: 'c3', title: 'How to Trust the Bible?', title_ar: 'كيف نثق في الكتاب المقدس؟', description: 'Examining the reliability and authority of Scripture.', description_ar: 'فحص موثوقية الكتاب المقدس وسلطانه.', date: 'Sep 18 – Oct 23, 2025', date_ar: '١٨ سبتمبر – ٢٣ أكتوبر ٢٠٢٥', sub_brand: 'credologos', type: 'course', price: 250, capacity: 50, location: 'Online', location_ar: 'أونلاين' },
  { id: 'e2', title: 'Third Space Community Forum', title_ar: 'المساحة الثالثة: منتدى المجتمع', description: 'A welcoming gathering for connection, sharing, and belonging.', description_ar: 'لقاء مرحّب للتواصل والتشارك والانتماء.', date: 'Feb 20, 2026', date_ar: '٢٠ فبراير ٢٠٢٦', sub_brand: 'third_space', type: 'event', price: 200, capacity: 80, location: 'Cairo, Egypt', location_ar: 'القاهرة، مصر' },
  { id: 'e3', title: 'Third Space Gathering – Q1', title_ar: 'لقاء المساحة الثالثة – ر١', description: 'An intimate quarterly gathering for the community.', description_ar: 'لقاء ربع سنوي حميم للمجتمع.', date: 'Jan 15, 2026', date_ar: '١٥ يناير ٢٠٢٦', sub_brand: 'third_space', type: 'workshop', price: 150, capacity: 20, location: 'Cairo, Egypt', location_ar: 'القاهرة، مصر' },
  { id: 'c4', title: 'Evil & Pain – Part 1', title_ar: 'الشر والألم – الجزء الأول', description: 'A multi-speaker course examining why God permits suffering.', description_ar: 'دورة متعددة المتحدثين حول لماذا يسمح الله بالألم.', date: 'Mar 20 – Apr 17, 2025', date_ar: '٢٠ مارس – ١٧ أبريل ٢٠٢٥', sub_brand: 'credologos', type: 'course', price: 300, capacity: 45, location: 'Online', location_ar: 'أونلاين' },
  { id: 'w1', title: 'East Cultural Workshop', title_ar: 'ورشة شرق الثقافية', description: 'An interactive workshop on faith, art, and Eastern identity.', description_ar: 'ورشة تفاعلية حول الإيمان والفن والهوية الشرقية.', date: 'Apr 10, 2026', date_ar: '١٠ أبريل ٢٠٢٦', sub_brand: 'east', type: 'workshop', price: 0, capacity: 30, location: 'Cairo, Egypt', location_ar: 'القاهرة، مصر' },
  { id: 'cs1', title: 'Introduction to Christian Counseling', title_ar: 'مقدمة في الإرشاد المسيحي', description: 'Foundational principles of Christian counseling for practitioners and students.', description_ar: 'المبادئ الأساسية للإرشاد المسيحي للممارسين والطلاب.', date: 'May 1 – Jun 30, 2026', date_ar: '١ مايو – ٣٠ يونيو ٢٠٢٦', sub_brand: 'counseling', type: 'course', price: 400, capacity: 30, location: 'Cairo, Egypt', location_ar: 'القاهرة، مصر' },
  { id: 'e30a', title: 'E30 Entrepreneurs Summit', title_ar: 'قمة E30 لرواد الأعمال', description: 'A summit for Christian entrepreneurs to connect, inspire, and grow.', description_ar: 'قمة لرواد الأعمال المسيحيين للتواصل والإلهام والنمو.', date: 'Jun 15, 2026', date_ar: '١٥ يونيو ٢٠٢٦', sub_brand: 'e30', type: 'event', price: 500, capacity: 100, location: 'Cairo, Egypt', location_ar: 'القاهرة، مصر' },
]

const brandColors = {
  credologos: { name: 'Credologos', color: '#2A317B' },
  third_space: { name: 'Third Space', color: '#1a7a8a' },
  east: { name: 'East', color: '#a0650e' },
  counseling: { name: 'Counseling', color: '#2d7a52' },
  e30: { name: 'E30', color: '#2e2e8a' },
}

export default async function EventsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const isAr = lang === 'ar'

  return (
    <div className="bg-[#EDEDED] min-h-screen">
      {/* Page header */}
      <section className="py-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#1e2460,#2A317B)' }}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'linear-gradient(rgba(168,176,217,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(168,176,217,0.5) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute right-0 top-0 w-96 h-96 rounded-full opacity-10"
          style={{ backgroundColor: '#F1A91E', filter: 'blur(80px)', transform: 'translate(30%,-30%)' }} />
        <div className="container-pad relative z-10">
          <p className="label-gold mb-2">{isAr ? 'اكتشف' : 'Discover'}</p>
          <h1 className="text-5xl font-bold font-display text-white">{isAr ? 'الأحداث والكورسات' : 'Events & Courses'}</h1>
        </div>
      </section>

      <EventsClient events={mockEvents} isAr={isAr} lang={lang} brandColors={brandColors} />

      <Newsletter />
    </div>
  )
}
