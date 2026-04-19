'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AccordionItem {
  title: string
  content: string
}

interface InfoAccordionProps {
  items: AccordionItem[]
  accentColor?: string
}

export default function InfoAccordion({ items, accentColor = '#F1A91E' }: InfoAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div 
            key={index} 
            className="rounded-2xl border border-[#EDEDED] overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md"
            style={{ 
              borderColor: isOpen ? `${accentColor}40` : '#EDEDED',
              backgroundColor: isOpen ? `${accentColor}05` : 'white'
             }}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <h4 className="font-bold text-[#2A317B] text-lg lg:text-xl font-display transition-colors"
                  style={{ color: isOpen ? accentColor : '#2A317B' }}>
                {item.title}
              </h4>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                className="text-xl"
                style={{ color: accentColor }}
              >
                ▼
              </motion.span>
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <div className="px-6 pb-6 pt-0 text-[#6b7280] leading-relaxed text-sm lg:text-base">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
