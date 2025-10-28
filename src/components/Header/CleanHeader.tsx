import { Link } from 'react-router-dom'
import logoCleanPng from '../../assets/logos/logo-clean.png'
import { LangSelector } from './LangSelector'

type HeaderProps = {
  menuOpen: boolean
  setMenuOpen: (v: boolean | ((v: boolean) => boolean)) => void
  t: (key: string) => string
}

export function CleanHeader({ menuOpen, setMenuOpen, t }: HeaderProps) {
  return (
    <header className="site-header clean-header">
      <div className="header-main-row">
        <div className="brand">
          <Link to="/">
            <img src={logoCleanPng} alt="4setup" className="brand-mark clean-brand-mark" />
          </Link>
        </div>
        <button className={`menu-toggle ${menuOpen ? 'open' : ''}`} aria-expanded={menuOpen} aria-label="Toggle navigation" onClick={() => setMenuOpen(v => !v)}>
          <span className="line1" />
          <span className="line2" />
        </button>
        <div className={`nav-backdrop ${menuOpen ? 'show' : ''}`} onClick={() => setMenuOpen(false)} />
        <div className="header-right">
          <nav className={`nav ${menuOpen ? 'open' : ''}`}>
            <Link to="/products">{t('nav.products')}</Link>
            <Link to="/spaces">{t('nav.spaces')}</Link>
            <Link to="/blog">{t('nav.blog')}</Link>
            <a href="https://store.4setup.cz" target="_blank" rel="noreferrer">{t('nav.eshop')}</a>
            <Link to="/contact">{t('nav.contact')}</Link>
            <LangSelector />
            <div className="business-section mobile-only">
              <span className="business-label">{t('nav.businessLabel')}</span>
              <a className="btn primary business-btn" href="#business">{t('nav.business')}</a>
            </div>
          </nav>
          <div className="business-section desktop-only">
            <span className="business-label">{t('nav.businessLabel')}</span>
            <a className="btn primary business-btn" href="#business">{t('nav.business')}</a>
          </div>
        </div>
      </div>
    </header>
  )
}

