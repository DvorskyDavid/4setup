import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { useT } from '../../i18n'
import './spaces.css'

type RoomType = 'gaming' | 'office' | 'streaming'

interface RoomTypePageProps {
  type: RoomType
}

const roomImages: Record<RoomType, string> = {
  gaming: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=1200&q=80',
  office: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=1200&q=80',
  streaming: 'https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?w=1200&q=80',
}

export function RoomTypePage({ type }: RoomTypePageProps) {
  const t = useT()

  return (
    <main className="room-type-page" style={{ '--bg-image': `url(${roomImages[type]})` } as CSSProperties}>
      {/* Hero Section */}
      <section className="room-hero">
        <div className="spaces-grid-bg"></div>
        <div className="room-hero-content">
          <div className="cyber-corner top-left"></div>
          <div className="cyber-corner top-right"></div>
          <div className="cyber-corner bottom-left"></div>
          <div className="cyber-corner bottom-right"></div>
          <Link to="/spaces" className="room-back-link">
            ← {t('rooms.backToSpaces')}
          </Link>
          <h1 className="room-hero-title">{t(`ourSetups.${type}` as any)}</h1>
          <div className="spaces-divider"></div>
          <p className="room-hero-subtitle">{t(`rooms.${type}.subtitle` as any)}</p>
        </div>
      </section>

      {/* Content Placeholder */}
      <section className="room-content">
        <div className="room-content-frame">
          <div className="cyber-corner top-left"></div>
          <div className="cyber-corner top-right"></div>
          <div className="cyber-corner bottom-left"></div>
          <div className="cyber-corner bottom-right"></div>
          <p className="room-placeholder">{t('rooms.comingSoon')}</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="room-cta">
        <div className="room-cta-frame">
          <div className="cyber-corner top-left"></div>
          <div className="cyber-corner top-right"></div>
          <h3 className="room-cta-title">{t('rooms.cta.title')}</h3>
          <Link to="/spaces#form" className="btn primary room-cta-btn">
            {t('hero.cta')}
          </Link>
        </div>
      </section>
    </main>
  )
}

// Export individual page components
export function GamingRoomPage() {
  return <RoomTypePage type="gaming" />
}

export function OfficeRoomPage() {
  return <RoomTypePage type="office" />
}

export function StreamingRoomPage() {
  return <RoomTypePage type="streaming" />
}
