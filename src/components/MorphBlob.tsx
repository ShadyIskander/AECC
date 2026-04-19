'use client'
import { motion } from 'framer-motion'

interface MorphBlobProps {
  color: string
  style: React.CSSProperties
  duration?: number
  opacity?: number
}

export default function MorphBlob({ color, style, duration = 8, opacity = 1 }: MorphBlobProps) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ 
        ...style, 
        backgroundColor: color, 
        filter: 'blur(100px)',
        opacity: opacity 
      }}
      animate={{
        borderRadius: [
          '60% 40% 30% 70% / 60% 30% 70% 40%', 
          '30% 60% 70% 40% / 50% 60% 30% 60%', 
          '60% 40% 30% 70% / 60% 30% 70% 40%'
        ],
        scale: [1, 1.1, 1],
        rotate: [0, 90, 0]
      }}
      transition={{ 
        duration, 
        repeat: Infinity, 
        ease: 'easeInOut' 
      }}
    />
  )
}
