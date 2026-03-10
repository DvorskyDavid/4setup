import { useState } from 'react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { useT } from '../../i18n'
import stoneLightMain from '../../assets/products/kamen03_MAIN.png'
import stoneLight01 from '../../assets/products/kamen01.png'
import stoneLight02 from '../../assets/products/kamen02.png'
import matrixMain from '../../assets/products/ledmatrix01_MAIN.png'
import matrixPacman from '../../assets/products/ledmatrix03_pacman.png'
import speakerMain from '../../assets/products/repro01_MAIN.png'
import speaker02 from '../../assets/products/repro02.png'
import './products.css'

type ProductType = 'stoneLight' | 'matrix' | 'speaker'

interface ProductDetailPageProps {
  type: ProductType
}

const productImages: Record<ProductType, string> = {
  stoneLight: stoneLightMain,
  matrix: matrixMain,
  speaker: speakerMain,
}

interface SectionConfig {
  key: string
  image?: string
}

const productSections: Record<ProductType, SectionConfig[]> = {
  stoneLight: [
    { key: 'ambient', image: stoneLightMain },
    { key: 'design', image: stoneLight02 },
    { key: 'construction' },
    { key: 'modular', image: stoneLight01 },
    { key: 'czech' },
  ],
  matrix: [
    { key: 'pixel', image: matrixPacman },
    { key: 'diffuse', image: matrixMain },
    { key: 'development' },
  ],
  speaker: [
    { key: 'quality', image: speakerMain },
    { key: 'sweetSpot' },
    { key: 'design', image: speaker02 },
    { key: 'target' },
    { key: 'development' },
  ],
}

export function ProductDetailPage({ type }: ProductDetailPageProps) {
  const t = useT()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('sending')
    try {
      const response = await fetch('https://formspree.io/f/mrbnjoap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email,
          product: type,
          formType: 'Product Interest'
        })
      })

      if (response.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const sections = productSections[type]

  return (
    <main className="product-detail-page" style={{ '--bg-image': `url(${productImages[type]})` } as CSSProperties}>
      {/* Hero Section */}
      <section className="product-hero">
        <div className="cyber-grid-bg"></div>
        <div className="product-hero-content">
          <div className="cyber-corner top-left"></div>
          <div className="cyber-corner top-right"></div>
          <div className="cyber-corner bottom-left"></div>
          <div className="cyber-corner bottom-right"></div>
          <Link to="/products" className="product-back-link">
            ← {t('products.backToProducts')}
          </Link>
          <h1 className="product-hero-title">{t(`products.${type}.name` as any)}</h1>
          <div className="cyber-divider"></div>
          <p className="product-hero-subtitle">{t(`products.${type}.tagline` as any)}</p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="product-intro">
        <div className="product-intro-frame">
          <div className="cyber-corner top-left"></div>
          <div className="cyber-corner top-right"></div>
          <div className="cyber-corner bottom-left"></div>
          <div className="cyber-corner bottom-right"></div>
          <p className="product-intro-text">{t(`products.${type}.introText` as any)}</p>
        </div>
      </section>

      {/* Content Sections */}
      <div className="product-sections">
        {sections.map((section, idx) => (
          <section key={section.key} className={`product-section ${section.image ? 'section-with-image' : ''} ${idx % 2 === 0 ? 'section-left' : 'section-right'}`}>
            <div className={`product-section-frame ${section.image ? 'has-image' : ''}`}>
              <div className="cyber-corner top-left"></div>
              <div className="cyber-corner top-right"></div>
              <div className="cyber-corner bottom-left"></div>
              <div className="cyber-corner bottom-right"></div>
              
              <div className="product-section-content">
                <h2 className="product-section-title">{t(`products.${type}.${section.key}.title` as any)}</h2>
                <p className="product-section-text">{t(`products.${type}.${section.key}.text` as any)}</p>
                {t(`products.${type}.${section.key}.list` as any) !== `products.${type}.${section.key}.list` && (
                  <ul className="product-section-list">
                    {(t(`products.${type}.${section.key}.list` as any) as string).split('|').map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
              
              {section.image && (
                <div className="product-section-image">
                  <div className="cyber-corner top-left"></div>
                  <div className="cyber-corner top-right"></div>
                  <div className="cyber-corner bottom-left"></div>
                  <div className="cyber-corner bottom-right"></div>
                  <img src={section.image} alt="" />
                </div>
              )}
            </div>
          </section>
        ))}
      </div>

      {/* Newsletter CTA */}
      <section className="product-cta">
        <div className="product-cta-frame">
          <div className="cyber-corner top-left"></div>
          <div className="cyber-corner top-right"></div>
          <div className="cyber-corner bottom-left"></div>
          <div className="cyber-corner bottom-right"></div>
          <h3 className="product-cta-title">{t('products.newsletter.title')}</h3>
          <p className="product-cta-desc">{t('products.newsletter.desc')}</p>
          
          {status === 'success' ? (
            <p className="product-cta-success">{t('products.newsletter.success')}</p>
          ) : (
            <form className="product-cta-form" onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('newsletter.placeholder')}
                className="product-cta-input"
                required
              />
              <button type="submit" className="btn primary product-cta-btn" disabled={status === 'sending'}>
                {status === 'sending' ? t('contact.sending') : t('products.newsletter.cta')}
              </button>
            </form>
          )}
          {status === 'error' && (
            <p className="product-cta-error">{t('contact.error')}</p>
          )}
        </div>
      </section>
    </main>
  )
}

export function StoneLightPage() {
  return <ProductDetailPage type="stoneLight" />
}

export function MatrixPage() {
  return <ProductDetailPage type="matrix" />
}

export function SpeakerPage() {
  return <ProductDetailPage type="speaker" />
}
