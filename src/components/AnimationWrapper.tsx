'use client'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimationWrapperProps {
  children: ReactNode
  delay?: number
  duration?: number
  type?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scale' | 'scaleUp'
}

const variants = {
  fadeUp:    { initial: { opacity: 0, y: 20 },    animate: { opacity: 1, y: 0 } },
  fadeIn:    { initial: { opacity: 0 },            animate: { opacity: 1 } },
  slideLeft: { initial: { opacity: 0, x: -30 },   animate: { opacity: 1, x: 0 } },
  slideRight:{ initial: { opacity: 0, x: 30 },    animate: { opacity: 1, x: 0 } },
  scale:     { initial: { opacity: 0, scale: 0.9 },animate: { opacity: 1, scale: 1 } },
  scaleUp:   { initial: { opacity: 0, scale: 0.95, y: 10 }, animate: { opacity: 1, scale: 1, y: 0 } },
}

export default function AnimationWrapper({
  children, delay = 0, duration = 0.5, type = 'fadeUp',
}: AnimationWrapperProps) {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration, delay }}
      variants={variants[type]}
    >
      {children}
    </motion.div>
  )
}
