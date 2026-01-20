import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { useT } from '../../i18n'
import { LangSelector } from '../../components/Header/LangSelector'
import logoClean from '../../assets/logos/logo-clean.png'
import productsPng from '../../assets/backgrounds/products.png'
import customRoomsPng from '../../assets/backgrounds/custom-rooms.png'
import './landing.css'

export function LandingPage() {
  const t = useT()
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY
        heroRef.current.style.setProperty('--scroll-y', `${scrolled}px`)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="landing-new">
      {/* Floating Header */}
      <header className="landing-header">
        <Link to="/" className="landing-brand">
          <img src={logoClean} alt="4setup" className="landing-header-logo" />
        </Link>
        <nav className="landing-nav">
          <Link to="/spaces">{t('nav.spaces')}</Link>
          <Link to="/products">{t('nav.products')}</Link>
          <Link to="/blog">{t('nav.blog')}</Link>
          <Link to="/contact">{t('nav.contact')}</Link>
        </nav>
        <LangSelector />
      </header>

      {/* Animated background */}
      <div className="landing-bg">
        <div className="landing-gradient"></div>
        <div className="landing-grid"></div>
        <div className="landing-glow"></div>
      </div>

      {/* Hero Section */}
      <section className="landing-hero" ref={heroRef}>
        <div className="hero-content">
          <div className="hero-logo-wrapper">
            <img src={logoClean} alt="4setup" className="hero-logo" />
          </div>
          
          <h1 className="hero-headline">
            <span className="hero-headline-line">{t('landing.hero.line1')}</span>
            <span className="hero-headline-accent">{t('landing.hero.line2')}</span>
          </h1>
          
          <p className="hero-tagline">{t('landing.hero.tagline')}</p>
          
          <div className="hero-cta-group">
            <Link to="/spaces" className="btn primary hero-btn">
              {t('landing.hero.ctaPrimary')}
            </Link>
            <Link to="/products" className="btn ghost hero-btn">
              {t('landing.hero.ctaSecondary')}
            </Link>
          </div>
        </div>

        <div className="hero-scroll-indicator">
          <span>{t('landing.hero.scroll')}</span>
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* Services Section */}
      <section className="landing-services">
        <div className="services-header">
          <span className="section-label">{t('landing.services.label')}</span>
          <h2 className="section-title">{t('landing.services.title')}</h2>
        </div>

        <div className="services-grid">
          {/* Custom Spaces Card */}
          <Link 
            to="/spaces" 
            className="service-card service-spaces"
            style={{ '--card-bg': `url(${customRoomsPng})` } as CSSProperties}
          >
            <div className="service-card-bg"></div>
            <div className="service-card-overlay"></div>
            <div className="service-card-content">
              <h3 className="service-title">{t('landing.services.spaces.title')}</h3>
              <p className="service-desc">{t('landing.services.spaces.desc')}</p>
              <div className="service-tags">
                <span className="service-tag">{t('landing.services.spaces.tag1')}</span>
                <span className="service-tag">{t('landing.services.spaces.tag2')}</span>
                <span className="service-tag">{t('landing.services.spaces.tag3')}</span>
              </div>
              <span className="service-link">
                {t('landing.services.spaces.cta')}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>
            <div className="service-card-glow"></div>
          </Link>

          {/* Products Card */}
          <Link 
            to="/products" 
            className="service-card service-products"
            style={{ '--card-bg': `url(${productsPng})` } as CSSProperties}
          >
            <div className="service-card-bg"></div>
            <div className="service-card-overlay"></div>
            <div className="service-card-content">
              <h3 className="service-title">{t('landing.services.products.title')}</h3>
              <p className="service-desc">{t('landing.services.products.desc')}</p>
              <div className="service-tags">
                <span className="service-tag">{t('landing.services.products.tag1')}</span>
                <span className="service-tag">{t('landing.services.products.tag2')}</span>
                <span className="service-tag">{t('landing.services.products.tag3')}</span>
              </div>
              <span className="service-link">
                {t('landing.services.products.cta')}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>
            <div className="service-card-glow"></div>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="landing-features">
        <div className="features-header">
          <span className="section-label">{t('landing.features.label')}</span>
          <h2 className="section-title">{t('landing.features.title')}</h2>
        </div>

        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-number">01</div>
            <h3 className="feature-title">{t('landing.features.f1.title')}</h3>
            <p className="feature-desc">{t('landing.features.f1.desc')}</p>
          </div>
          <div className="feature-item">
            <div className="feature-number">02</div>
            <h3 className="feature-title">{t('landing.features.f2.title')}</h3>
            <p className="feature-desc">{t('landing.features.f2.desc')}</p>
          </div>
          <div className="feature-item">
            <div className="feature-number">03</div>
            <h3 className="feature-title">{t('landing.features.f3.title')}</h3>
            <p className="feature-desc">{t('landing.features.f3.desc')}</p>
          </div>
          <div className="feature-item">
            <div className="feature-number">04</div>
            <h3 className="feature-title">{t('landing.features.f4.title')}</h3>
            <p className="feature-desc">{t('landing.features.f4.desc')}</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="landing-cta">
        <div className="cta-content">
          <h2 className="cta-title">{t('landing.cta.title')}</h2>
          <p className="cta-desc">{t('landing.cta.desc')}</p>
          <Link to="/contact" className="btn primary cta-btn">
            {t('landing.cta.button')}
          </Link>
        </div>
        <div className="cta-decoration">
          <div className="cta-ring"></div>
          <div className="cta-ring"></div>
          <div className="cta-ring"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>© {new Date().getFullYear()} 4setup. All rights reserved.</p>
      </footer>
    </main>
  )
}
