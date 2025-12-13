import { useState, useRef, useEffect } from 'react'
import { useT } from '../../i18n'
import './contact.css'

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

export function ContactPage() {
  const t = useT()
  const [status, setStatus] = useState<FormStatus>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const formLoadTime = useRef(Date.now())

  // Reset load time when component mounts
  useEffect(() => {
    formLoadTime.current = Date.now()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Time-based spam check - reject if submitted in less than 3 seconds
    const timeSinceLoad = Date.now() - formLoadTime.current
    if (timeSinceLoad < 3000) {
      setStatus('error')
      return
    }

    // Check honeypot field
    const form = e.currentTarget
    const honeypot = form.querySelector<HTMLInputElement>('input[name="_gotcha"]')
    if (honeypot && honeypot.value) {
      // Bot detected - silently fail
      setStatus('success')
      return
    }

    setStatus('sending')

    try {
      const response = await fetch('https://formspree.io/f/mrbnjoap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className="contact-page">
      <h2>{t('page.contact.title')}</h2>
      
      <div className="contact-layout">
        {/* Left Column - Company Info */}
        <div className="contact-info-section">
          <div className="cyber-corner top-left"></div>
          <div className="cyber-corner top-right"></div>
          <div className="cyber-corner bottom-left"></div>
          <div className="cyber-corner bottom-right"></div>
          
          <h3>{t('page.contact.contactUs')}</h3>
          
          <div className="contact-details">
            <p>
              <strong>{t('page.contact.phone')}</strong>
              <a href="tel:+420608689304">+420 608 689 304</a>
            </p>
            <p>
              <strong>{t('page.contact.email')}</strong>
              <a href="mailto:info@4setup.cz">info@4setup.cz</a>
            </p>
            <p>
              <strong>Instagram:</strong>
              <a href="https://www.instagram.com/4setup.cz" target="_blank" rel="noreferrer">@4setup.cz</a>
            </p>
          </div>
          
          <div className="company-info">
            <h4>{t('page.contact.companyInfo')}</h4>
            <p className="company-name">4setup s.r.o.</p>
            <p>IČO: 23616491</p>
            <p>Varšavská 715/36</p>
            <p>120 00 Praha 2</p>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="contact-form-section">
          <div className="cyber-corner top-left"></div>
          <div className="cyber-corner top-right"></div>
          <div className="cyber-corner bottom-left"></div>
          <div className="cyber-corner bottom-right"></div>
          
          <h3>{t('contact.formTitle')}</h3>
          
          {status === 'success' ? (
            <div className="form-status success">
              {t('contact.success')}
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              {/* Honeypot field - hidden from users, bots will fill it */}
              <input
                type="text"
                name="_gotcha"
                className="form-honeypot"
                tabIndex={-1}
                autoComplete="off"
              />
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">{t('contact.name')}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">{t('contact.emailPlaceholder')}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">{t('contact.subject')}</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="form-input"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">{t('contact.message')}</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              
              {status === 'error' && (
                <div className="form-status error">
                  {t('contact.error')}
                </div>
              )}
              
              <button
                type="submit"
                className="form-submit"
                disabled={status === 'sending'}
              >
                {status === 'sending' && <span className="spinner"></span>}
                {status === 'sending' ? t('contact.sending') : t('contact.send')}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}

