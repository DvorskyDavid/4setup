import { useState } from 'react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { useT } from '../../i18n'
import './spaces.css'

import gaming1 from '../../assets/gallery/gaming-1.png'
import gaming2 from '../../assets/gallery/gaming-2.png'
import gaming3 from '../../assets/gallery/gaming-3.png'
import gaming4 from '../../assets/gallery/gaming-4.png'
import gaming5 from '../../assets/gallery/gaming-5.png'
import gaming6 from '../../assets/gallery/gaming-6.png'
import gaming7 from '../../assets/gallery/gaming-7.png'

import office1 from '../../assets/gallery/office-1.png'
import office2 from '../../assets/gallery/office-2.png'
import office3 from '../../assets/gallery/office-3.png'
import office4 from '../../assets/gallery/office-4.png'
import office5 from '../../assets/gallery/office-5.png'

import streaming1 from '../../assets/gallery/streaming-1.png'
import streaming2 from '../../assets/gallery/streaming-2.png'
import streaming3 from '../../assets/gallery/streaming-3.png'
import streaming4 from '../../assets/gallery/streaming-4.png'

type RoomType = 'gaming' | 'office' | 'streaming'

interface RoomTypePageProps {
  type: RoomType
}

const roomGalleries: Record<RoomType, string[]> = {
  gaming: [gaming1, gaming2, gaming3, gaming4, gaming5, gaming6, gaming7],
  office: [office1, office2, office3, office4, office5],
  streaming: [streaming1, streaming2, streaming3, streaming4],
}

export function RoomTypePage({ type }: RoomTypePageProps) {
  const t = useT()
  const gallery = roomGalleries[type]
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  const openLightbox = (image: string) => setLightboxImage(image)
  const closeLightbox = () => setLightboxImage(null)

  return (
    <main className="room-type-page" style={{ '--bg-image': `url(${gallery[0]})` } as CSSProperties}>
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

      {/* Gallery Section */}
      <section className="room-gallery">
        <h2 className="room-gallery-title">{t('rooms.gallery.title')}</h2>
        <div className="room-gallery-grid">
          {gallery.map((image, idx) => (
            <button
              key={idx}
              className="room-gallery-item"
              onClick={() => openLightbox(image)}
              style={{ '--delay': `${0.5 + idx * 0.1}s` } as CSSProperties}
            >
              <div className="cyber-corner top-left"></div>
              <div className="cyber-corner top-right"></div>
              <div className="cyber-corner bottom-left"></div>
              <div className="cyber-corner bottom-right"></div>
              <img src={image} alt={`${t(`ourSetups.${type}` as any)} ${idx + 1}`} />
              <div className="room-gallery-overlay">
                <span className="room-gallery-zoom">+</span>
              </div>
            </button>
          ))}
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

      {/* Lightbox */}
      {lightboxImage && (
        <div className="room-lightbox" onClick={closeLightbox}>
          <button className="room-lightbox-close" onClick={closeLightbox}>×</button>
          <img src={lightboxImage} alt="" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
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
