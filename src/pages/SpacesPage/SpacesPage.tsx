import { useState } from 'react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { useT } from '../../i18n'
import bgImage from '../../assets/backgrounds/custom-rooms.png'
import './spaces.css'

export function SpacesPage() {
  const t = useT()
  const [email, setEmail] = useState('')
  
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement newsletter subscription
    alert('Newsletter subscription: ' + email)
  }

  const processSteps = [
    { num: '01', key: 'process.step1' },
    { num: '02', key: 'process.step2' },
    { num: '03', key: 'process.step3' },
    { num: '04', key: 'process.step4' },
  ]

  const setups = [
    { key: 'gaming', image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800&q=80' },
    { key: 'office', image: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800&q=80' },
    { key: 'streaming', image: 'https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?w=800&q=80' },
  ]

  return (
    <main className="spaces-cyber" style={{ '--bg-image': `url(${bgImage})` } as CSSProperties}>
      {/* Hero Section */}
      <section className="spaces-hero">
        <div className="spaces-grid-bg"></div>
        <div className="spaces-hero-content">
          <div className="cyber-corner top-left"></div>
          <div className="cyber-corner top-right"></div>
          <div className="cyber-corner bottom-left"></div>
          <div className="cyber-corner bottom-right"></div>
          <h1 className="spaces-hero-title">{t('hero.title')}</h1>
          <div className="spaces-divider"></div>
          <p className="spaces-hero-subtitle">{t('hero.subtitle')}</p>
          <Link to="/contact" className="btn primary spaces-hero-cta">
            {t('hero.cta')}
          </Link>
        </div>
      </section>

      {/* Process Section */}
      <section className="spaces-process">
        <h2 className="spaces-section-title">{t('process.title')}</h2>
        <div className="process-timeline">
          {processSteps.map((step, idx) => (
            <div key={step.num} className="process-node" style={{ '--delay': `${0.6 + idx * 0.15}s` } as CSSProperties}>
              <div className="process-card">
                <div className="cyber-corner top-left"></div>
                <div className="cyber-corner top-right"></div>
                <span className="process-num">{step.num}</span>
                <span className="process-label">{t(step.key as any)}</span>
              </div>
              {idx < processSteps.length - 1 && (
                <div className="process-connector">
                  <div className="connector-line"></div>
                  <div className="connector-glow"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Quality Statement */}
      <section className="spaces-quality">
        <div className="quality-frame">
          <div className="cyber-corner top-left"></div>
          <div className="cyber-corner top-right"></div>
          <div className="cyber-corner bottom-left"></div>
          <div className="cyber-corner bottom-right"></div>
          <p className="quality-statement">{t('quality.text')}</p>
        </div>
      </section>

      {/* Setups Gallery */}
      <section className="spaces-setups">
        <h2 className="spaces-section-title">{t('ourSetups.title')}</h2>
        <p className="spaces-section-subtitle">{t('ourSetups.subtitle')}</p>
        
        <div className="setups-gallery">
          {setups.map((setup, idx) => (
            <div 
              key={setup.key} 
              className={`setup-block setup-block-${idx + 1}`}
              style={{ '--delay': `${0.8 + idx * 0.15}s` } as CSSProperties}
            >
              <div className="setup-image-wrapper">
                <div className="cyber-corner top-left"></div>
                <div className="cyber-corner top-right"></div>
                <div className="cyber-corner bottom-left"></div>
                <div className="cyber-corner bottom-right"></div>
                <img 
                  src={setup.image} 
                  alt={t(`ourSetups.${setup.key}` as any)}
                  className="setup-img"
                />
                <div className="setup-overlay">
                  <span className="setup-label">{String(idx + 1).padStart(2, '0')}</span>
                  <h3 className="setup-title">{t(`ourSetups.${setup.key}` as any)}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="spaces-newsletter">
        <div className="newsletter-frame">
          <div className="cyber-corner top-left"></div>
          <div className="cyber-corner top-right"></div>
          <div className="cyber-corner bottom-left"></div>
          <div className="cyber-corner bottom-right"></div>
          <h2 className="newsletter-title">{t('newsletter.title')}</h2>
          <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
            <div className="input-wrapper">
              <input 
                type="email" 
                placeholder={t('newsletter.placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="newsletter-input"
              />
            </div>
            <button type="submit" className="btn primary newsletter-btn">
              {t('newsletter.cta')}
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}
