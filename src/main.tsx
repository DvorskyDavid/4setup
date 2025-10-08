import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import logoUrl from './assets/logo-4setup.svg'

function App() {
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

  return (
    <div id="app-root">
      <header className="site-header">
        <div className="brand">
          <img src={logoUrl} alt="4setup logo" className="brand-mark" />
          <span className="brand-name">4setup</span>
        </div>
        <nav className="nav">
          <a href="#setups">Setups</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <h1>Premium Gaming Setups</h1>
          <p>Custom PCs, ergonomic desks, ambient lighting, and pro peripherals configured for peak performance.</p>
          <div className="cta-row">
            <a className="btn primary" href="#contact">Get a Quote</a>
            <a className="btn ghost" href="#setups">Explore Setups</a>
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

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} 4setup. All rights reserved.</p>
      </footer>
    </div>
  )
}

const container = document.getElementById('app')!
createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)


