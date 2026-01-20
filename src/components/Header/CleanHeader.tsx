import { Link } from 'react-router-dom'
import logoCleanPng from '../../assets/logos/logo-clean.png'
import { LangSelector } from './LangSelector'
import { useHeaderLayout } from './useHeaderLayout'

type HeaderProps = {
  menuOpen: boolean
  setMenuOpen: (v: boolean | ((v: boolean) => boolean)) => void
  t: (key: string) => string
}

export function CleanHeader({ menuOpen, setMenuOpen, t }: HeaderProps) {
  const { isCompact, brandRef, navRef, headerRef } = useHeaderLayout()

  return (
    <header 
      ref={headerRef}
      className={`site-header clean-header ${isCompact ? 'header-compact' : ''}`}
    >
      <div className="header-main-row">
        <div className="brand" ref={brandRef}>
          <Link to="/">
            <img src={logoCleanPng} alt="4setup" className="brand-mark clean-brand-mark" />
          </Link>
        </div>
        <button className={`menu-toggle ${menuOpen ? 'open' : ''}`} aria-expanded={menuOpen} aria-label="Toggle navigation" onClick={() => setMenuOpen(v => !v)}>
          <span className="line1" />
          <span className="line2" />
        </button>
        <div className={`nav-backdrop ${menuOpen ? 'show' : ''}`} onClick={() => setMenuOpen(false)} />
        <div className="header-right" ref={navRef}>
          <nav className={`nav ${menuOpen ? 'open' : ''}`}>
            <Link to="/products">{t('nav.products')}</Link>
            <Link to="/spaces">{t('nav.spaces')}</Link>
            <Link to="/blog">{t('nav.blog')}</Link>
            <a href="https://store.4setup.cz" target="_blank" rel="noreferrer">{t('nav.eshop')}</a>
            <Link to="/contact">{t('nav.contact')}</Link>
            <LangSelector />
          </nav>
        </div>
      </div>
    </header>
  )
}
