import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './style.css'
import logoPng from './assets/4setup-gradient.png'
 

function HomePage() {
  return (
    <main>
      <section className="hero">
        <h1>Premium Gaming Setups</h1>
        <p>Custom PCs, ergonomic desks, ambient lighting, and pro peripherals configured for peak performance.</p>
        <div className="cta-row">
          <a className="btn primary" href="#contact">Get a Quote</a>
          <Link className="btn ghost" to="/setups">Explore Setups</Link>
        </div>
      </section>

      <section id="setups" className="features">
        <div className="feature">
          <h3>Power PCs</h3>
          <p>Air or liquid-cooled builds curated for FPS stability and thermals.</p>
        </div>
        <div className="feature">
          <h3>Pro Desks</h3>
          <p>Height-adjustable, cable-managed, and purpose-lit workspace ergonomics.</p>
        </div>
        <div className="feature">
          <h3>Immersive Lighting</h3>
          <p>RGB scenes synced to gameplay and environment for total immersion.</p>
        </div>
      </section>
    </main>
  )
}

function SetupsPage() {
  return (
    <main className="page">
      <h2>Setups</h2>
      <p>Explore curated builds, desks, and lighting packages. More coming soon.</p>
    </main>
  )
}

function BlogPage() {
  return (
    <main className="page">
      <h2>Blog</h2>
      <p>Guides and inspiration for performance setups and immersive spaces.</p>
    </main>
  )
}

function ContactPage() {
  return (
    <main className="page">
      <h2>Contact</h2>
      <p>Email us at hello@4setup.cz or use the form (coming soon).</p>
    </main>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
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
          <Link to="/setups">Setups</Link>
          <Link to="/blog">Blog</Link>
          <a className="btn primary" href="https://store.4setup.cz" target="_blank" rel="noreferrer">Store</a>
          <Link className="btn primary" to="/contact">Contact us</Link>
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
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)


