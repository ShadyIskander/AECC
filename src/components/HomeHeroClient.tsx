'use client'
import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import type { Dictionary } from '@/lib/dictionaries'

interface HomeHeroClientProps { lang: string; dict: Dictionary }

// ── Particle canvas ──────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let animId: number

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const COLORS = ['#F1A91E', '#65CBE3', '#A8B0D9', '#546AB2', '#6ec99a', '#a8b0ff']
    const NUM = 65

    const particles = Array.from({ length: NUM }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.45 + 0.1,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.fill()
      })
      ctx.globalAlpha = 1
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 90) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(168,176,217,${0.1 * (1 - dist / 90)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ mixBlendMode: 'screen' }} />
}

// ── Morphing blob ────────────────────────────────────────────────
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

// ── Scroll indicator ─────────────────────────────────────────────
function ScrollIndicator() {
  return (
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
  )
}

// ── Main ─────────────────────────────────────────────────────────
export default function HomeHeroClient({ lang, dict }: HomeHeroClientProps) {
  const isAr = lang === 'ar'
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const y = useTransform(scrollYProgress, [0, 1], [0, 140])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.85])

  const lines = dict.hero.tagline.split('\n')

  const badges = [
    { label: isAr ? 'كريدولوجوس' : 'Credologos', href: `/${lang}/credologos`, color: '#546AB2' },
    { label: isAr ? 'المساحة الثالثة' : 'Third Space', href: `/${lang}/third-space`, color: '#1a7a8a' },
    { label: isAr ? 'شرق' : 'East', href: `/${lang}/east`, color: '#a0650e' },
    { label: isAr ? 'ماجستير الإرشاد' : 'Counseling Masters', href: `/${lang}/counseling`, color: '#2d7a52' },
    { label: 'E30', href: `/${lang}/e30`, color: '#2e2e8a' },
  ]

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg,#05081a 0%,#0c1238 28%,#1a2055 58%,#2A317B 100%)' }}
    >
      {/* Blobs */}
      <MorphBlob color="rgba(42,49,123,0.55)"   style={{ width: 700, height: 700, top: '-20%', left: '-15%' }} duration={10} />
      <MorphBlob color="rgba(101,203,227,0.1)"  style={{ width: 500, height: 500, top: '10%', right: '-10%' }} duration={13} />
      <MorphBlob color="rgba(241,169,30,0.07)"  style={{ width: 400, height: 400, bottom: '0%', left: '20%' }} duration={9} />
      <MorphBlob color="rgba(110,201,154,0.06)" style={{ width: 350, height: 350, bottom: '10%', right: '5%' }} duration={11} />

      {/* Particles */}
      <ParticleCanvas />

      {/* Radial spotlight */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 65% 55% at 50% 42%, rgba(84,106,178,0.22) 0%, transparent 70%)' }} />

      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(168,176,217,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(168,176,217,0.6) 1px,transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Content */}
      <motion.div style={{ y, opacity }} className="relative z-10 text-center container-pad px-6 py-24">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 rounded-full px-5 py-2 mb-10"
          style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)' }}
        >
          <motion.span
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2.2, repeat: Infinity }}
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: '#F1A91E' }}
          />
          <span className="text-white/90 text-[13px] font-bold uppercase tracking-[0.14em]">
            {isAr ? 'المركز الثقافي الإنجيلي العربي' : 'Arab Evangelical Cultural Center'}
          </span>
        </motion.div>

        {/* Headline — word by word */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display text-white mb-10 leading-[1.1] flex flex-col items-center gap-2">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex gap-[0.3em]"
              style={{ textShadow: '0 0 40px rgba(255,255,255,0.05)' }}
            >
              {line.split(' ').map((word, j) => (
                <span key={j} style={{ color: j === 0 ? 'white' : '#F1A91E' }}>
                  {word}
                </span>
              ))}
            </motion.div>
          ))}
        </h1>

        {dict.hero.subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            {dict.hero.subtitle}
          </motion.p>
        )}

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href={`/${lang}/events`}>
            <motion.span
              whileHover={{ scale: 1.05, boxShadow: '0 0 38px rgba(241,169,30,0.45)' }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary !py-4 !px-10 text-base inline-block"
            >
              {dict.hero.viewEvents}
            </motion.span>
          </Link>
          <Link href={`/${lang}/about`}>
            <motion.span
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.14)' }}
              whileTap={{ scale: 0.97 }}
              className="btn-secondary !py-4 !px-10 text-base inline-block"
            >
              {dict.hero.explore} AECC
            </motion.span>
          </Link>
        </motion.div>

        {/* Initiative badges — all 5 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex flex-wrap gap-3 justify-center mt-14"
        >
          {badges.map((b, i) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 + i * 0.09 }}
            >
              <Link href={b.href}>
                <motion.span
                  whileHover={{ scale: 1.08, borderColor: b.color, color: 'rgba(255,255,255,0.9)' }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white/55 transition-colors cursor-pointer"
                  style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: b.color }} />
                  {b.label}
                </motion.span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

    
    </section>
  )
}
