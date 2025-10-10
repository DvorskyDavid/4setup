import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './style.css'
import logoPng from './assets/4setup-gradient.png'
import { I18nProvider, useT, useI18n } from './i18n'

function HomePage() {
  const t = useT()
  return (
    <main>
      <section className="hero">
        <h1>{t('hero.title')}</h1>
        <p>{t('hero.subtitle')}</p>
        <div className="cta-row">
          <a className="btn primary" href="#contact">{t('hero.getQuote')}</a>
          <Link className="btn ghost" to="/setups">{t('hero.explore')}</Link>
        </div>
      </section>

      <section id="setups" className="features">
        <div className="feature">
          <h3>{t('feature.pcs.title')}</h3>
          <p>{t('feature.pcs.desc')}</p>
        </div>
        <div className="feature">
          <h3>{t('feature.desks.title')}</h3>
          <p>{t('feature.desks.desc')}</p>
        </div>
        <div className="feature">
          <h3>{t('feature.lights.title')}</h3>
          <p>{t('feature.lights.desc')}</p>
        </div>
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
    <select
      className="lang-select"
      value={lang}
      onChange={(e) => setLang(e.target.value as any)}
      aria-label="Language selector"
    >
      <option value="en">EN</option>
      <option value="cz">CZ</option>
    </select>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const t = useT()
  useEffect(() => {
    const setParallax = () => {
      const doc = document.documentElement
      const max = Math.max(1, doc.scrollHeight - window.innerHeight)
      const ratio = Math.min(1, Math.max(0, window.scrollY / max))
      doc.style.setProperty('--parallax', ratio.toFixed(4))
    }
    setParallax()
    window.addEventListener('scroll', setParallax, { passive: true })
    window.addEventListener('resize', setParallax)
    return () => {
      window.removeEventListener('scroll', setParallax)
      window.removeEventListener('resize', setParallax)
    }
  }, [])

  useEffect(() => {
    // Close mobile menu when route changes
    setMenuOpen(false)
  }, [location])

  return (
    <div id="app-root">
      <header className="site-header">
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
        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <Link to="/setups">{t('nav.setups')}</Link>
          <Link to="/blog">{t('nav.blog')}</Link>
          <a className="btn primary" href="https://store.4setup.cz" target="_blank" rel="noreferrer">{t('nav.store')}</a>
          <Link className="btn primary" to="/contact">{t('nav.contact')}</Link>
          <LangSelector />
        </nav>
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


