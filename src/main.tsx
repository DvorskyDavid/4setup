import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './style.css'
import logoPng from './assets/4setup-gradient.png'
import { I18nProvider, useT, useI18n } from './i18n'
 

function HomePage() {
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

function SetupsPage() {
  const t = useT()
  return (
    <main className="page">
      <h2>{t('page.setups.title')}</h2>
      <p>{t('page.setups.desc')}</p>
    </main>
  )
}

function BlogPage() {
  const t = useT()
  return (
    <main className="page">
      <h2>{t('page.blog.title')}</h2>
      <p>{t('page.blog.desc')}</p>
    </main>
  )
}

function ContactPage() {
  const t = useT()
  return (
    <main className="page">
      <h2>{t('page.contact.title')}</h2>
      <p>{t('page.contact.desc')}</p>
    </main>
  )
}

function LangSelector() {
  const { lang, setLang } = useI18n()
  return (
    <div className="lang-pill" role="group" aria-label="Language selector">
      <div className={`lang-pill-indicator ${lang === 'cz' ? 'right' : 'left'}`} />
      <button
        className={`lang-pill-btn ${lang === 'en' ? 'active' : ''}`}
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
      >
        EN
      </button>
      <button
        className={`lang-pill-btn ${lang === 'cz' ? 'active' : ''}`}
        onClick={() => setLang('cz')}
        aria-pressed={lang === 'cz'}
      >
        CZ
      </button>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const t = useT()

  useEffect(() => {
    // Close mobile menu when route changes
    setMenuOpen(false)
  }, [location])

  useEffect(() => {
    const body = document.body
    if (menuOpen) {
      body.style.overflow = 'hidden'
    } else {
      body.style.overflow = ''
    }
    return () => { body.style.overflow = '' }
  }, [menuOpen])

  return (
    <div id="app-root">
      <header className="site-header">
        <div className="header-main-row">
          <div className="brand">
            <Link to="/">
              <img src={logoPng} alt="4setup" className="brand-mark" />
            </Link>
          </div>
          <button className="menu-toggle" aria-expanded={menuOpen} aria-label="Toggle navigation" onClick={() => setMenuOpen(v => !v)}>
            <span />
            <span />
            <span />
          </button>
          <div className={`nav-backdrop ${menuOpen ? 'show' : ''}`} onClick={() => setMenuOpen(false)} />
          <div className="header-right">
            <nav className={`nav ${menuOpen ? 'open' : ''}`}>
              <Link to="/setups">{t('nav.setups')}</Link>
              <Link to="/blog">{t('nav.blog')}</Link>
              <a href="https://store.4setup.cz" target="_blank" rel="noreferrer">{t('nav.eshop')}</a>
              <Link to="/contact">{t('nav.contact')}</Link>
              <LangSelector />
            </nav>
            <div className="business-section">
              <span className="business-label">{t('nav.businessLabel')}</span>
              <a className="btn primary business-btn" href="#business">{t('nav.business')}</a>
            </div>
          </div>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/setups" element={<SetupsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} 4setup. All rights reserved.</p>
      </footer>
    </div>
  )
}

const container = document.getElementById('app')!
createRoot(container).render(
  <React.StrictMode>
    <I18nProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </I18nProvider>
  </React.StrictMode>
)


