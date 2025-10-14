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
      <section className="hero-scroll">
        <div className="hero hero-sticky">
          <div className="hero-inner">
          <div className="hero-copy">
            <h1>{t('hero.title')}</h1>
            <p>{t('hero.subtitle')}</p>
            <div className="cta-row">
              <a className="btn primary" href="#contact">{t('hero.getQuote')}</a>
              <Link className="btn ghost" to="/setups">{t('hero.explore')}</Link>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true" />
          </div>
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

      {/* Placeholder content to test scrolling */}
      <section className="content-section">
        <h2>Showcase</h2>
        <p>
          High-performance rigs with curated components. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          non lacus ac justo malesuada posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
          cubilia curae.
        </p>
      </section>
      <section className="content-section">
        <h2>Components</h2>
        <p>
          GPUs, CPUs, memory kits and NVMe storage tuned for low latency and sustained throughput. Vivamus elementum,
          tortor vitae pharetra varius, est mi efficitur ipsum, id tempor lorem massa in nisl.
        </p>
      </section>
      <section className="content-section">
        <h2>Desks & Ergonomics</h2>
        <p>
          Cable-managed, height-adjustable workspaces with monitor arms and acoustic treatments. Cras at nibh vitae
          sapien tempus vulputate. Curabitur tincidunt, lorem in aliquet commodo, odio turpis tempor nibh, id egestas
          arcu ligula sit amet lacus.
        </p>
      </section>
      <section className="content-section">
        <h2>Ambient Lighting</h2>
        <p>
          Addressable RGB, bias lighting, and room scenes synced to content. Nulla facilisi. Pellentesque habitant morbi
          tristique senectus et netus et malesuada fames ac turpis egestas.
        </p>
      </section>
      <section className="content-section">
        <h2>Services</h2>
        <p>
          Design consultation, on-site setup, thermal tuning, and maintenance plans. Donec non quam eget quam feugiat
          faucibus. Phasellus nec neque in sapien fermentum ultrices.
        </p>
      </section>
      <section className="content-section">
        <h2>Contact</h2>
        <p>
          Ready to start? Get in touch and we’ll tailor a build to your goals. Sed dictum placerat neque, vitae faucibus
          erat interdum vitae. Integer pulvinar, nisi id sodales facilisis, nisi velit tempor massa, ut suscipit arcu
          arcu ut lorem.
        </p>
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


