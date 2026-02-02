import { useEffect, useState, useRef } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import { I18nProvider, useT } from './i18n'
import { SiteHeader } from './components/Header'
import { LandingPage } from './pages/LandingPage/LandingPage'
import { ProductsPage } from './pages/ProductsPage/ProductsPage'
import { SpacesPage } from './pages/SpacesPage/SpacesPage'
import { GamingRoomPage, OfficeRoomPage, StreamingRoomPage } from './pages/SpacesPage/RoomTypePage'
import { BlogPage, BlogPostPage } from './pages/BlogPage'
import { ContactPage } from './pages/ContactPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { CookieConsent, getConsent } from './components/CookieConsent'
import { initAllAnalytics, trackPageView } from './analytics'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const t = useT()
  const analyticsInitialized = useRef(false)

  // Initialize analytics on mount if consent exists, or when consent is given
  useEffect(() => {
    const tryInitAnalytics = () => {
      if (!analyticsInitialized.current && getConsent() === 'accepted') {
        initAllAnalytics()
        analyticsInitialized.current = true
      }
    }

    // Try on mount
    tryInitAnalytics()

    // Listen for consent changes
    const handleConsentChange = (e: CustomEvent) => {
      if (e.detail === 'accepted') {
        tryInitAnalytics()
      }
    }

    window.addEventListener('cookie-consent-change', handleConsentChange as EventListener)
    return () => {
      window.removeEventListener('cookie-consent-change', handleConsentChange as EventListener)
    }
  }, [])

  // Track page views on route changes
  useEffect(() => {
    if (analyticsInitialized.current) {
      trackPageView(location.pathname, document.title)
    }
  }, [location.pathname])

  // Scroll to top and close menu on route change
  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    const body = document.body
    if (menuOpen) {
      body.style.overflow = 'hidden'
    } else {
      body.style.overflow = ''
    }
    return () => { body.style.overflow = '' }
  }, [menuOpen])

  const isLandingPage = location.pathname === '/'

  return (
    <div id="app-root">
      <SiteHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} t={t} />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/spaces" element={<SpacesPage />} />
        <Route path="/spaces/gaming" element={<GamingRoomPage />} />
        <Route path="/spaces/office" element={<OfficeRoomPage />} />
        <Route path="/spaces/streaming" element={<StreamingRoomPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {!isLandingPage && <footer className="site-footer">
        <p>© {new Date().getFullYear()} 4setup. All rights reserved.</p>
      </footer>}

      <CookieConsent />
    </div>
  )
}

function Root() {
  return (
    <BrowserRouter>
      <I18nProvider>
        <App />
      </I18nProvider>
    </BrowserRouter>
  )
}

const el = document.getElementById('root')
if (el) {
  createRoot(el).render(<Root />)
}
