'use client'

interface SocialLink { label: string; path: string; href?: string }
interface SocialLinksProps { links: SocialLink[] }

export default function SocialLinks({ links }: SocialLinksProps) {
  return (
    <div className="flex gap-3">
      {links.map((s) => (
        <a
          key={s.label}
          href={s.href ?? '#'}
          aria-label={s.label}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{ backgroundColor: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.15)' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#F1A91E' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(255,255,255,0.10)' }}
        >
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d={s.path} />
          </svg>
        </a>
      ))}
    </div>
  )
}
