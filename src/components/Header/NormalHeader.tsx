import { Link } from 'react-router-dom'
import logoPng from '../../assets/logos/4setup-outlines.png'
import { LangSelector } from './LangSelector'

type HeaderProps = {
  menuOpen: boolean
  setMenuOpen: (v: boolean | ((v: boolean) => boolean)) => void
  t: (key: string) => string
}

export function SiteHeader({ menuOpen, setMenuOpen, t }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="header-main-row">
        <Link to="/" className="brand">
          <img src={logoPng} alt="4setup" className="brand-mark" />
        </Link>
        <div className="header-nav-group">
          <nav className={`nav ${menuOpen ? 'open' : ''}`}>
            <Link to="/spaces">{t('nav.spaces')}</Link>
            <Link to="/products">{t('nav.products')}</Link>
            <Link to="/blog">{t('nav.blog')}</Link>
            <a href="https://store.4setup.cz" target="_blank" rel="noreferrer">{t('nav.eshop')}</a>
            <Link to="/contact">{t('nav.contact')}</Link>
            <LangSelector className="nav-lang-mobile" />
          </nav>
          <LangSelector className="nav-lang-desktop" />
        </div>
        <button className={`menu-toggle ${menuOpen ? 'open' : ''}`} aria-expanded={menuOpen} aria-label="Toggle navigation" onClick={() => setMenuOpen(v => !v)}>
          <span className="line1" />
          <span className="line2" />
        </button>
        <div className={`nav-backdrop ${menuOpen ? 'show' : ''}`} onClick={() => setMenuOpen(false)} />
      </div>
    </header>
  )
}

// Keep backwards compatibility
export const NormalHeader = SiteHeader
