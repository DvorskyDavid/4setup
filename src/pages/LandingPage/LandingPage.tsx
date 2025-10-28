import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import productsPng from '../../assets/backgrounds/products.png'
import customRoomsPng from '../../assets/backgrounds/custom-rooms.png'
import './landing.css'

export function LandingPage() {
  return (
    <main className="landing-page">
      <div className="split-selector">
        <Link to="/products" className="split-half split-left" style={{ '--bg-image': `url(${productsPng})` } as CSSProperties}>
          <div className="split-bg"></div>
          <div className="split-content">
            <h1 className="split-title">PRODUCTS</h1>
          </div>
        </Link>
        <Link to="/spaces" className="split-half split-right" style={{ '--bg-image': `url(${customRoomsPng})` } as CSSProperties}>
          <div className="split-bg"></div>
          <div className="split-content">
            <h1 className="split-title">CUSTOM SPACES</h1>
          </div>
        </Link>
      </div>
    </main>
  )
}

