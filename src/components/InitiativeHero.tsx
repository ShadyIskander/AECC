'use client'
import { motion } from 'framer-motion'
import MorphBlob from './MorphBlob'

interface InitiativeHeroProps {
  title: string
  tagline: string
  description: string
  brandName: string
  isAr?: boolean
  accentColor: string
  secondaryColor?: string
  visitUrl?: string
  ctaText?: string
  ctaUrl?: string
  visitText?: string
  backgroundGradient: string
}

export default function InitiativeHero({
  title,
  tagline,
  description,
  brandName,
  isAr = false,
  accentColor,
  secondaryColor = '#ffffff',
  visitUrl = '#',
  ctaText,
  ctaUrl = '#',
  visitText = 'Visit Website',
  backgroundGradient
}: InitiativeHeroProps) {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden noise-overlay" style={{ background: backgroundGradient }}>
      {/* Background Blobs */}
      <MorphBlob color={accentColor} style={{ width: 600, height: 600, top: '-10%', right: '-10%' }} opacity={0.25} duration={12} />
      <MorphBlob color={secondaryColor} style={{ width: 400, height: 400, bottom: '5%', left: '-5%' }} opacity={0.15} duration={10} />
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `linear-gradient(${accentColor} 1px,transparent 1px),linear-gradient(90deg,${accentColor} 1px,transparent 1px)`, backgroundSize: '80px 80px' }} />

      <div className="container-pad relative z-10 py-32">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: isAr ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2.5 rounded-full px-5 py-2 mb-10"
              style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <span className="w-2.5 h-2.5 rounded-full pulse-ring relative" style={{ backgroundColor: accentColor }} />
              <span className="text-white/70 text-xs font-bold uppercase tracking-[0.2em]">
                {isAr ? 'مبادرة AECC' : 'AECC Initiative'}
              </span>
            </div>

            <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold font-display text-white mb-6 leading-[0.9] tracking-tight">
              {title}
            </h1>
            
            <p className="text-xl md:text-2xl font-bold mb-8 uppercase tracking-wider" style={{ color: accentColor }}>
              {tagline}
            </p>

            <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl">
              {description}
            </p>

            <div className="flex flex-wrap gap-5">
              {ctaText && (
                <motion.a
                  href={ctaUrl}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary !py-4 !px-12 text-lg shadow-2xl"
                  style={{ backgroundColor: accentColor, color: '#000' }}
                >
                  {ctaText}
                </motion.a>
              )}
              <motion.a
                href={visitUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                whileTap={{ scale: 0.98 }}
                className="btn-secondary !py-4 !px-12 text-lg border-white/20"
              >
                {visitText}
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Decal */}
      <div className="absolute top-1/2 right-[-10%] -translate-y-1/2 pointer-events-none select-none opacity-[0.03] text-[25vw] font-black text-white font-display whitespace-nowrap">
        {brandName}
      </div>
    </section>
  )
}
