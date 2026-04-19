'use client'
import { useEffect, useRef, useState } from 'react'

interface AnimatedCounterProps {
  value: string | number
  duration?: number
}

export default function AnimatedCounter({ value, duration = 2 }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState('0')
  const hasStarted = useRef(false)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Extract number from value (e.g., "50+" -> 50, "5k+" -> 5000)
  const extractNumber = (val: string | number): number => {
    if (typeof val === 'number') return val
    const str = String(val)
    if (str.includes('k')) return parseInt(str) * 1000
    return parseInt(str)
  }

  const numValue = extractNumber(value)
  const suffix = String(value).replace(/\d+/g, '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          setIsVisible(true)
          hasStarted.current = true
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)

      const currentValue = Math.floor(progress * numValue)
      setDisplayValue(currentValue.toString())

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [isVisible, numValue, duration])

  return (
    <div ref={ref}>
      <p className="text-3xl font-bold font-display">
        {displayValue}
        {suffix}
      </p>
    </div>
  )
}
