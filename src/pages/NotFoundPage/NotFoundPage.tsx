import { Link } from 'react-router-dom'
import { useT } from '../../i18n'
import './notfound.css'

export function NotFoundPage() {
  const t = useT()

  return (
    <main className="notfound-page">
      <div className="notfound-container">
        <div className="cyber-corner top-left"></div>
        <div className="cyber-corner top-right"></div>
        <div className="cyber-corner bottom-left"></div>
        <div className="cyber-corner bottom-right"></div>
        
        <div className="glitch-wrapper">
          <h1 className="notfound-title" data-text={t('notFound.title')}>
            {t('notFound.title')}
          </h1>
        </div>
        
        <p className="notfound-message">{t('notFound.message')}</p>
        
        <div className="scanline"></div>
        
        <Link to="/" className="btn primary notfound-btn">
          {t('notFound.backHome')}
        </Link>
      </div>
    </main>
  )
}

