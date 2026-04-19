import { notFound } from 'next/navigation'
import { hasLocale, getDictionary, type Locale } from '@/lib/dictionaries'
import Link from 'next/link'

const mockStats = { totalEvents: 8, publishedEvents: 6, totalBookings: 150, revenue: 45000 }
const mockBookings = [
  { id: '1', userName: 'Ahmed Hassan', eventTitle: 'Credologos Summer School', amount: 500, date: '2025-01-10', status: 'confirmed' },
  { id: '2', userName: 'Fatima Ali', eventTitle: 'God & Science Course', amount: 350, date: '2025-01-09', status: 'confirmed' },
  { id: '3', userName: 'Mohamed Ibrahim', eventTitle: 'Philosophy & Faith', amount: 280, date: '2025-01-08', status: 'pending' },
]

export default async function AdminPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang as Locale)
  const isAr = lang === 'ar'

  return (
    <>
      {/* Header */}
      <section className="py-14 relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#1e2460,#2A317B)' }}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'linear-gradient(rgba(168,176,217,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(168,176,217,0.5) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="container-pad relative z-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="label-gold mb-1">{isAr ? 'لوحة التحكم' : 'Dashboard'}</p>
              <h1 className="text-4xl font-bold font-display text-white">{dict.nav.admin}</h1>
              <p className="text-white/50 text-sm mt-1">{isAr ? 'إدارة الأحداث والحجوزات' : 'Manage events and bookings'}</p>
            </div>
            <Link href={`/${lang}/admin/events/new`} className="btn-primary">
              + {dict.admin.newEvent}
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-pad">
          {/* Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { label: dict.admin.totalEvents, value: mockStats.totalEvents, color: '#2A317B', bg: '#f0f2ff' },
              { label: dict.admin.publishedEvents, value: mockStats.publishedEvents, color: '#F1A91E', bg: '#fffbf0' },
              { label: dict.admin.totalBookings, value: mockStats.totalBookings, color: '#1a7a8a', bg: '#f0fbff' },
              { label: dict.admin.revenue, value: `${mockStats.revenue.toLocaleString()} EGP`, color: '#16a34a', bg: '#f0fdf4' },
            ].map((s, i) => (
              <div key={i} className="p-6 rounded-2xl border" style={{ backgroundColor: s.bg, borderColor: `${s.color}22` }}>
                <p className="text-sm font-medium text-[#6b7280] mb-2">{s.label}</p>
                <p className="text-3xl font-bold font-display" style={{ color: s.color }}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Bookings table */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold font-display text-[#2A317B]">{dict.admin.bookings}</h2>
              <span className="text-[#F1A91E] text-sm font-semibold cursor-pointer hover:text-[#f7c44e]">
                {isAr ? 'عرض الكل ←' : 'View All →'}
              </span>
            </div>
            <div className="bg-white border border-[#EDEDED] rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#EDEDED] bg-[#f8f9ff]">
                    {[isAr ? 'المستخدم' : 'User', isAr ? 'الحدث' : 'Event', isAr ? 'المبلغ' : 'Amount', isAr ? 'الحالة' : 'Status', isAr ? 'التاريخ' : 'Date'].map((h) => (
                      <th key={h} className="px-5 py-4 text-left text-xs font-bold text-[#2A317B] uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockBookings.map((b) => (
                    <tr key={b.id} className="border-b border-[#EDEDED] hover:bg-[#f8f9ff] transition-colors">
                      <td className="px-5 py-4 text-sm font-medium text-[#2A317B]">{b.userName}</td>
                      <td className="px-5 py-4 text-sm text-[#6b7280]">{b.eventTitle}</td>
                      <td className="px-5 py-4 text-sm font-bold text-[#2A317B]">{b.amount} EGP</td>
                      <td className="px-5 py-4">
                        <span className="text-xs px-2.5 py-1 rounded-full font-semibold"
                          style={{ backgroundColor: b.status === 'confirmed' ? 'rgba(22,163,74,0.1)' : 'rgba(241,169,30,0.15)', color: b.status === 'confirmed' ? '#16a34a' : '#a0650e' }}>
                          {b.status === 'confirmed' ? (isAr ? 'مؤكد' : 'Confirmed') : (isAr ? 'معلق' : 'Pending')}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-[#6b7280]">{b.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick actions */}
          <h2 className="text-2xl font-bold font-display text-[#2A317B] mb-6">
            {isAr ? 'إجراءات سريعة' : 'Quick Actions'}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { href: `/${lang}/admin/events`, icon: '📅', label: dict.admin.events, desc: isAr ? 'إدارة الأحداث' : 'Manage events', color: '#2A317B' },
              { href: `/${lang}/admin/bookings`, icon: '✅', label: dict.admin.bookings, desc: isAr ? 'عرض الحجوزات' : 'View bookings', color: '#546AB2' },
              { href: `/${lang}/admin/users`, icon: '👥', label: dict.admin.users, desc: isAr ? 'إدارة المستخدمين' : 'Manage users', color: '#1a7a8a' },
            ].map((a) => (
              <Link key={a.href} href={a.href}
                className="group p-6 rounded-2xl border border-[#EDEDED] hover:shadow-lg hover:-translate-y-1 transition-all bg-white">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: a.color }}>
                  <span>{a.icon}</span>
                </div>
                <h3 className="font-bold text-[#2A317B] text-lg">{a.label}</h3>
                <p className="text-[#6b7280] text-sm mt-1">{a.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
