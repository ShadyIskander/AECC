import { notFound } from 'next/navigation'
import { hasLocale, getDictionary, type Locale } from '@/lib/dictionaries'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang as Locale)
  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  return (
    <div dir={dir} lang={lang} className="min-h-screen flex flex-col">
      <Navbar lang={lang as Locale} dict={dict} />
      <main className="flex-1">{children}</main>
      <Footer lang={lang as Locale} dict={dict} />
    </div>
  )
}
