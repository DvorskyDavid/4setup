import { useState, useEffect } from 'react'
import { useT } from '../../i18n'
import './cookie-consent.css'

const CONSENT_KEY = 'cookie-consent'

export type ConsentValue = 'accepted' | 'rejected' | null

export function getConsent(): ConsentValue {
  if (typeof window === 'undefined') return null
  const value = localStorage.getItem(CONSENT_KEY)
  if (value === 'accepted' || value === 'rejected') return value
  return null
}

export function setConsent(value: 'accepted' | 'rejected'): void {
  localStorage.setItem(CONSENT_KEY, value)
  // Dispatch custom event so analytics can react
  window.dispatchEvent(new CustomEvent('cookie-consent-change', { detail: value }))
}

export function CookieConsent() {
  const t = useT()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Only show banner if no preference is stored
    const consent = getConsent()
    if (consent === null) {
      setVisible(true)
    }
  }, [])

  const handleAccept = () => {
    setConsent('accepted')
    setVisible(false)
  }

  const handleReject = () => {
    setConsent('rejected')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie consent">
      <div className="cookie-banner-inner">
        <p className="cookie-message">
          {t('cookies.message')}
        </p>
        <div className="cookie-actions">
          <button 
            className="cookie-btn cookie-btn-reject"
            onClick={handleReject}
          >
            {t('cookies.reject')}
          </button>
          <button 
            className="cookie-btn cookie-btn-accept"
            onClick={handleAccept}
          >
            {t('cookies.accept')}
          </button>
        </div>
      </div>
    </div>
  )
}

