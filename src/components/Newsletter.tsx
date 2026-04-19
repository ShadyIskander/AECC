'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [isAr, setIsAr] = useState(false)
  const pathname = usePathname()

  const getNewsletterGradient = () => {
    const path = pathname.toLowerCase()
    if (path.includes('/credologos')) return 'linear-gradient(135deg,#2b4c9f 0%,#546AB2 50%,#1e3a7a 100%)'
    if (path.includes('/third-space')) return 'linear-gradient(135deg,#023a48 0%,#0d6b7f 50%,#1a7a8a 100%)'
    if (path.includes('/east')) return 'linear-gradient(135deg,#704e1a 0%,#a0650e 50%,#8b5a0b 100%)'
    if (path.includes('/counseling')) return 'linear-gradient(135deg,#1a3a2a 0%,#2d5f4a 50%,#2d6e4e 100%)'
    if (path.includes('/e30')) return 'linear-gradient(135deg,#1a1a4d 0%,#2e2e8a 50%,#16163a 100%)'
    return 'linear-gradient(135deg,#2A317B 0%,#546AB2 50%,#1e2460 100%)'
  }

  useEffect(() => { setIsAr(pathname.startsWith('/ar')) }, [pathname])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 3000)
  }

  return (
    <div className="w-full">
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full py-20 relative overflow-hidden"
        style={{ background: getNewsletterGradient() }}
      >
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl" style={{ backgroundColor: '#F1A91E' }} />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: '#65CBE3' }} />
      </div>
      <div className="container-pad relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="label-gold mb-3"
          >
            {isAr ? 'النشرة البريدية' : 'Newsletter'}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4 font-display"
          >
            {isAr ? 'ابقَ على اتصال' : 'Stay Connected'}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/75 text-lg mb-8"
          >
            {isAr
              ? 'احصل على آخر الأخبار والأحداث مباشرة في بريدك الإلكتروني'
              : 'Get the latest news and events delivered to your inbox'}
          </motion.p>
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={isAr ? 'بريدك الإلكتروني' : 'your@email.com'}
              className="flex-1 px-5 py-3 rounded-xl text-[#1a1a2e] focus:outline-none focus:ring-2 focus:ring-[#F1A91E] text-sm"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary !py-3 !px-8"
            >
              {isAr ? 'اشترك' : 'Subscribe'}
            </motion.button>
          </motion.form>
          {subscribed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-green-300 font-medium text-sm"
            >
              ✓ {isAr ? 'تم الاشتراك بنجاح!' : 'Successfully subscribed!'}
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
    </div>
  )
}
