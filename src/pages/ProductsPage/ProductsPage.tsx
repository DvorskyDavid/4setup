import { Fragment } from 'react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { useT } from '../../i18n'
import bg01UpscaledPng from '../../assets/backgrounds/bg01upscaled.png'
import './products.css'

export function ProductsPage() {
  const t = useT()

  return (
    <main className="products-cyber" style={{ '--bg-image': `url(${bg01UpscaledPng})` } as CSSProperties}>
      {/* Hero Block */}
      <section className="cyber-hero">
        <div className="cyber-grid-bg"></div>
        <div className="cyber-hero-content">
          <div className="cyber-corner top-left"></div>
          <div className="cyber-corner top-right"></div>
          <div className="cyber-corner bottom-left"></div>
          <div className="cyber-corner bottom-right"></div>
          <h1 className="cyber-hero-title">{t('products.hero.title')}</h1>
          <div className="cyber-divider"></div>
        </div>
      </section>

      {/* Block Grid Layout */}
      <div className="cyber-blocks-container">
        {/* Large Featured Block */}
        <div className="cyber-block cyber-block-large">
          <div className="cyber-block-inner">
            <div className="cyber-image-wrapper">
              <div className="cyber-block-corner tl"></div>
              <div className="cyber-block-corner tr"></div>
              <div className="cyber-block-corner bl"></div>
              <div className="cyber-block-corner br"></div>
              <img 
                src="https://via.placeholder.com/1200x800/0a0f17/0ea5e9?text=PRECISION" 
                alt="Precision"
                className="cyber-block-image"
              />
            </div>
            <div className="cyber-block-text">
              <span className="cyber-block-label">01</span>
              <h3 className="cyber-block-title">{t('products.block1.text').split('\n').map((line, i) => <Fragment key={i}>{line}{i === 0 && <br/>}</Fragment>)}</h3>
            </div>
          </div>
        </div>

        {/* Two Medium Blocks */}
        <div className="cyber-block cyber-block-medium">
          <div className="cyber-block-inner">
            <div className="cyber-image-wrapper">
              <div className="cyber-block-corner tl"></div>
              <div className="cyber-block-corner tr"></div>
              <div className="cyber-block-corner bl"></div>
              <div className="cyber-block-corner br"></div>
              <img 
                src="https://via.placeholder.com/800x600/0a0f17/0ea5e9?text=CRAFTED" 
                alt="Crafted"
                className="cyber-block-image"
              />
            </div>
            <div className="cyber-block-text">
              <span className="cyber-block-label">02</span>
              <h3 className="cyber-block-title">{t('products.block2.text').split('\n').map((line, i) => <Fragment key={i}>{line}{i === 0 && <br/>}</Fragment>)}</h3>
            </div>
          </div>
        </div>

        <div className="cyber-block cyber-block-medium">
          <div className="cyber-block-inner">
            <div className="cyber-image-wrapper">
              <div className="cyber-block-corner tl"></div>
              <div className="cyber-block-corner tr"></div>
              <div className="cyber-block-corner bl"></div>
              <div className="cyber-block-corner br"></div>
              <img 
                src="https://via.placeholder.com/800x600/0a0f17/0ea5e9?text=PERFORMANCE" 
                alt="Performance"
                className="cyber-block-image"
              />
            </div>
            <div className="cyber-block-text">
              <span className="cyber-block-label">03</span>
              <h3 className="cyber-block-title">{t('products.block3.text').split('\n').map((line, i) => <Fragment key={i}>{line}{i === 0 && <br/>}</Fragment>)}</h3>
            </div>
          </div>
        </div>

        {/* Wide Block */}
        <div className="cyber-block cyber-block-wide">
          <div className="cyber-block-inner">
            <div className="cyber-image-wrapper">
              <div className="cyber-block-corner tl"></div>
              <div className="cyber-block-corner tr"></div>
              <div className="cyber-block-corner bl"></div>
              <div className="cyber-block-corner br"></div>
              <img 
                src="https://via.placeholder.com/1600x600/0a0f17/0ea5e9?text=EXCELLENCE" 
                alt="Excellence"
                className="cyber-block-image"
              />
            </div>
            <div className="cyber-block-text">
              <span className="cyber-block-label">04</span>
              <h3 className="cyber-block-title">{t('products.block4.text')}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <section className="cyber-footer">
        <div className="cyber-footer-frame">
          <div className="cyber-corner top-left"></div>
          <div className="cyber-corner top-right"></div>
          <Link to="/contact" className="btn primary cyber-footer-btn">
            {t('products.footer.customOrder')}
          </Link>
        </div>
      </section>
    </main>
  )
}

