import { useState } from 'react'
import { useT } from '../../i18n'
import './spaces.css'

export function SpacesPage() {
  const t = useT()
  const [email, setEmail] = useState('')
  
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement newsletter subscription
    alert('Newsletter subscription: ' + email)
  }

  return (
    <main>
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <h1>{t('hero.title')}</h1>
            <p className="hero-subtitle">{t('hero.subtitle')}</p>
            <div className="cta-row">
              <a className="btn primary" href="#contact">{t('hero.cta')}</a>
            </div>
          </div>
        </div>
      </section>

      <section className="process-section">
        <h2 className="section-title">{t('process.title')}</h2>
        <div className="process-steps">
          <div className="process-step">
            <div className="step-content">{t('process.step1')}</div>
          </div>
          <div className="process-arrow">→</div>
          <div className="process-step">
            <div className="step-content">{t('process.step2')}</div>
          </div>
          <div className="process-arrow">→</div>
          <div className="process-step">
            <div className="step-content">{t('process.step3')}</div>
          </div>
          <div className="process-arrow">→</div>
          <div className="process-step">
            <div className="step-content">{t('process.step4')}</div>
          </div>
        </div>
      </section>

      <section className="quality-section">
        <h2 className="quality-text">{t('quality.text')}</h2>
      </section>

      <section className="podcast-section">
        <h2 className="section-title">{t('podcast.title')}</h2>
        <a className="btn primary" href="#podcast">{t('podcast.cta')}</a>
      </section>

      <section className="our-setups-section">
        <h2 className="section-title">{t('ourSetups.title')}</h2>
        <div className="setups-grid">
          <div className="setup-card">
            <div className="setup-image">[OBRÁZEK]</div>
            <h3>{t('ourSetups.gaming')}</h3>
          </div>
          <div className="setup-card">
            <div className="setup-image">[OBRÁZEK]</div>
            <h3>{t('ourSetups.office')}</h3>
          </div>
          <div className="setup-card">
            <div className="setup-image">[OBRÁZEK]</div>
            <h3>{t('ourSetups.podcast')}</h3>
          </div>
        </div>
      </section>

      <section className="newsletter-section">
        <h2 className="section-title">{t('newsletter.title')}</h2>
        <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
          <input 
            type="email" 
            placeholder={t('newsletter.placeholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="newsletter-input"
          />
          <button type="submit" className="btn primary">{t('newsletter.cta')}</button>
        </form>
      </section>
    </main>
  )
}

