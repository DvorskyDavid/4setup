import { useEffect, useState } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
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

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const t = useT()

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

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
      </Routes>

      {!isLandingPage && <footer className="site-footer">
        <p>© {new Date().getFullYear()} 4setup. All rights reserved.</p>
      </footer>}
    </div>
  )
}

function Root() {
  return (
    <HashRouter>
      <I18nProvider>
        <App />
      </I18nProvider>
    </HashRouter>
  )
}

const el = document.getElementById('root')
if (el) {
  createRoot(el).render(<Root />)
}
