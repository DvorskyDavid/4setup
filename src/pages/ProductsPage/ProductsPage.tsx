import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { useT } from '../../i18n'
import bg01UpscaledPng from '../../assets/backgrounds/bg01upscaled.png'
import stoneLightImg from '../../assets/products/kamen03_MAIN.png'
import matrixImg from '../../assets/products/ledmatrix01_MAIN.png'
import speakerImg from '../../assets/products/repro01_MAIN.png'
import './products.css'

export function ProductsPage() {
  const t = useT()

  const products = [
    {
      key: 'stoneLight',
      path: '/products/stone-light',
      image: stoneLightImg,
    },
    {
      key: 'matrix',
      path: '/products/matrix',
      image: matrixImg,
    },
    {
      key: 'speaker',
      path: '/products/speaker',
      image: speakerImg,
    },
  ]

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

      {/* Product Blocks */}
      <div className="cyber-blocks-container">
        {products.map((product, idx) => (
          <Link
            key={product.key}
            to={product.path}
            className={`cyber-block cyber-block-link ${idx === 0 ? 'cyber-block-large' : 'cyber-block-medium'} cyber-block-${idx + 1}`}
          >
            <div className="cyber-block-inner">
              <div className="cyber-image-wrapper">
                <div className="cyber-block-corner tl"></div>
                <div className="cyber-block-corner tr"></div>
                <div className="cyber-block-corner bl"></div>
                <div className="cyber-block-corner br"></div>
                <img
                  src={product.image}
                  alt={t(`products.${product.key}.name` as any)}
                  className="cyber-block-image"
                />
              </div>
              <div className="cyber-block-text">
                <span className="cyber-block-label">{String(idx + 1).padStart(2, '0')}</span>
                <h3 className="cyber-block-title">{t(`products.${product.key}.name` as any)}</h3>
                <p className="cyber-block-desc">{t(`products.${product.key}.tagline` as any)}</p>
                <span className="cyber-block-cta">{t('products.viewDetails')} →</span>
              </div>
            </div>
          </Link>
        ))}
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

