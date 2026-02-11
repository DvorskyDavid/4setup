import { useState, useEffect } from 'react'
import { useT } from '../../i18n'
import './cookie-consent.css'

const CONSENT_KEY = 'cookie-consent'
const ANALYTICS_KEY = 'cookie-analytics'

export type ConsentValue = 'accepted' | 'rejected' | null

export function getConsent(): ConsentValue {
  if (typeof window === 'undefined') return null
  const value = localStorage.getItem(CONSENT_KEY)
  if (value === 'accepted' || value === 'rejected') return value
  return null
}

export function getAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(ANALYTICS_KEY) === 'true'
}

export function setConsent(value: 'accepted' | 'rejected', analytics: boolean = true): void {
  localStorage.setItem(CONSENT_KEY, value)
  localStorage.setItem(ANALYTICS_KEY, analytics ? 'true' : 'false')
  // Dispatch custom event so analytics can react
  window.dispatchEvent(new CustomEvent('cookie-consent-change', { 
    detail: { consent: value, analytics } 
  }))
}

type Screen = 'main' | 'customize'

export function CookieConsent() {
  const t = useT()
  const [visible, setVisible] = useState(false)
  const [screen, setScreen] = useState<Screen>('main')
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true)

  useEffect(() => {
    // Only show banner if no preference is stored
    const consent = getConsent()
    if (consent === null) {
      setVisible(true)
      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const handleAcceptAll = () => {
    setConsent('accepted', true)
    document.body.style.overflow = ''
    setVisible(false)
  }

  const handleCustomize = () => {
    setScreen('customize')
  }

  const handleBack = () => {
    setScreen('main')
  }

  const handleSave = () => {
    // If analytics is disabled, we store as 'rejected' for backwards compatibility
    // but with explicit analytics preference
    setConsent(analyticsEnabled ? 'accepted' : 'rejected', analyticsEnabled)
    document.body.style.overflow = ''
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="cookie-overlay" role="dialog" aria-modal="true" aria-label="Cookie consent">
      <div className="cookie-modal">
        <div className="cookie-modal-corner top-left"></div>
        <div className="cookie-modal-corner top-right"></div>
        <div className="cookie-modal-corner bottom-left"></div>
        <div className="cookie-modal-corner bottom-right"></div>

        {screen === 'main' ? (
          <>
            <div className="cookie-icon">🍪</div>
            <h2 className="cookie-title">{t('cookies.title')}</h2>
            <p className="cookie-message">{t('cookies.message')}</p>
            <div className="cookie-actions">
              <button 
                className="cookie-btn cookie-btn-secondary"
                onClick={handleCustomize}
              >
                {t('cookies.customize')}
              </button>
              <button 
                className="cookie-btn cookie-btn-primary"
                onClick={handleAcceptAll}
              >
                {t('cookies.acceptAll')}
              </button>
            </div>
          </>
        ) : (
          <>
            <button className="cookie-back" onClick={handleBack}>
              ← {t('cookies.back')}
            </button>
            <h2 className="cookie-title">{t('cookies.customizeTitle')}</h2>
            <p className="cookie-message-small">{t('cookies.customizeDesc')}</p>
            
            <div className="cookie-options">
              {/* Functional - always on */}
              <div className="cookie-option">
                <div className="cookie-option-info">
                  <span className="cookie-option-label">{t('cookies.functional')}</span>
                  <span className="cookie-option-desc">{t('cookies.functionalDesc')}</span>
                </div>
                <label className="cookie-toggle cookie-toggle-disabled">
                  <input type="checkbox" checked disabled />
                  <span className="cookie-toggle-slider"></span>
                </label>
              </div>

              {/* Analytics - can be toggled */}
              <div className="cookie-option">
                <div className="cookie-option-info">
                  <span className="cookie-option-label">{t('cookies.analytics')}</span>
                  <span className="cookie-option-desc">{t('cookies.analyticsDesc')}</span>
                </div>
                <label className="cookie-toggle">
                  <input 
                    type="checkbox" 
                    checked={analyticsEnabled}
                    onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                  />
                  <span className="cookie-toggle-slider"></span>
                </label>
              </div>
            </div>

            <div className="cookie-actions">
              <button 
                className="cookie-btn cookie-btn-secondary"
                onClick={handleSave}
              >
                {t('cookies.save')}
              </button>
              <button 
                className="cookie-btn cookie-btn-primary"
                onClick={handleAcceptAll}
              >
                {t('cookies.allowAll')}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
