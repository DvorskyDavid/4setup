import { useState, useRef, useEffect } from 'react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { useT } from '../../i18n'
import bgImage from '../../assets/backgrounds/custom-rooms.png'
import './spaces.css'

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

export function SpacesPage() {
  const t = useT()
  const formRef = useRef<HTMLDivElement>(null)
  const formLoadTime = useRef(Date.now())
  
  const [status, setStatus] = useState<FormStatus>('idle')
  const [expandedStep, setExpandedStep] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredContact: 'email' as 'email' | 'phone',
    purpose: '',
    currentState: '',
    budget: '',
    problems: [] as string[],
    message: ''
  })

  useEffect(() => {
    formLoadTime.current = Date.now()
  }, [])

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const processSteps = [
    { 
      num: '01', 
      icon: '💬',
      titleKey: 'spaces.process.step1.title',
      descKey: 'spaces.process.step1.desc'
    },
    { 
      num: '02', 
      icon: '🎨',
      titleKey: 'spaces.process.step2.title',
      descKey: 'spaces.process.step2.desc'
    },
    { 
      num: '03', 
      icon: '🚀',
      titleKey: 'spaces.process.step3.title',
      descKey: 'spaces.process.step3.desc'
    },
  ]

  const setups = [
    { 
      key: 'gaming', 
      path: '/spaces/gaming',
      image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800&q=80',
    },
    { 
      key: 'office', 
      path: '/spaces/office',
      image: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800&q=80',
    },
    { 
      key: 'streaming', 
      path: '/spaces/streaming',
      image: 'https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?w=800&q=80',
    },
  ]

  const purposes = ['gaming', 'work', 'streaming', 'podcast', 'other']
  const currentStates = ['fromScratch', 'upgrade']
  const budgets = ['under500k', '500kTo1m', 'over1m']
  const problems = ['cables', 'lighting', 'storage', 'design', 'performance', 'space']

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleProblemToggle = (problem: string) => {
    setFormData(prev => ({
      ...prev,
      problems: prev.problems.includes(problem)
        ? prev.problems.filter(p => p !== problem)
        : [...prev.problems, problem]
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const timeSinceLoad = Date.now() - formLoadTime.current
    if (timeSinceLoad < 3000) {
      setStatus('error')
      return
    }

    const form = e.currentTarget
    const honeypot = form.querySelector<HTMLInputElement>('input[name="_gotcha"]')
    if (honeypot && honeypot.value) {
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
        body: JSON.stringify({
          ...formData,
          problems: formData.problems.join(', '),
          formType: 'Custom Spaces Request'
        })
      })

      if (response.ok) {
        setStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          preferredContact: 'email',
          purpose: '',
          currentState: '',
          budget: '',
          problems: [],
          message: ''
        })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className="spaces-cyber" style={{ '--bg-image': `url(${bgImage})` } as CSSProperties}>
      {/* Hero Section */}
      <section className="spaces-hero">
        <div className="spaces-grid-bg"></div>
        <div className="spaces-hero-content">
          <div className="cyber-corner top-left"></div>
          <div className="cyber-corner top-right"></div>
          <div className="cyber-corner bottom-left"></div>
          <div className="cyber-corner bottom-right"></div>
          <h1 className="spaces-hero-title">{t('hero.title')}</h1>
          <div className="spaces-divider"></div>
          <p className="spaces-hero-subtitle">{t('spaces.hero.subtitle')}</p>
          <button onClick={scrollToForm} className="btn primary spaces-hero-cta desktop-only">
            {t('hero.cta')}
          </button>
        </div>
      </section>

      {/* Process Section */}
      <section className="spaces-process">
        <h2 className="spaces-section-title">{t('spaces.process.title')}</h2>
        <p className="spaces-section-subtitle">{t('spaces.process.subtitle')}</p>
        
        <div className="process-timeline">
          {processSteps.map((step, idx) => (
            <div key={step.num} className="process-node" style={{ '--delay': `${0.6 + idx * 0.15}s` } as CSSProperties}>
              <div 
                className={`process-card ${expandedStep === idx ? 'expanded' : ''}`}
                onClick={() => setExpandedStep(expandedStep === idx ? null : idx)}
              >
                <div className="cyber-corner top-left"></div>
                <div className="cyber-corner top-right"></div>
                <span className="process-icon">{step.icon}</span>
                <span className="process-num">{step.num}</span>
                <span className="process-label">{t(step.titleKey as any)}</span>
                <button className="process-details-btn">
                  {expandedStep === idx ? t('spaces.process.hideDetails') : t('spaces.process.showDetails')}
                </button>
                {expandedStep === idx && (
                  <p className="process-description">{t(step.descKey as any)}</p>
                )}
              </div>
              {idx < processSteps.length - 1 && (
                <div className="process-connector">
                  <div className="connector-line"></div>
                  <div className="connector-glow"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Quality Statement */}
      <section className="spaces-quality">
        <div className="quality-frame">
          <div className="cyber-corner top-left"></div>
          <div className="cyber-corner top-right"></div>
          <div className="cyber-corner bottom-left"></div>
          <div className="cyber-corner bottom-right"></div>
          <p className="quality-statement">{t('quality.text')}</p>
        </div>
      </section>

      {/* Setups Gallery */}
      <section className="spaces-setups">
        <h2 className="spaces-section-title">{t('ourSetups.title')}</h2>
        <p className="spaces-section-subtitle">{t('ourSetups.subtitle')}</p>
        
        <div className="setups-gallery">
          {setups.map((setup, idx) => (
            <Link 
              key={setup.key} 
              to={setup.path}
              className={`setup-block setup-block-${idx + 1}`}
              style={{ '--delay': `${0.8 + idx * 0.15}s` } as CSSProperties}
            >
              <div className="setup-image-wrapper">
                <div className="cyber-corner top-left"></div>
                <div className="cyber-corner top-right"></div>
                <div className="cyber-corner bottom-left"></div>
                <div className="cyber-corner bottom-right"></div>
                <img 
                  src={setup.image} 
                  alt={t(`ourSetups.${setup.key}` as any)}
                  className="setup-img"
                />
                <div className="setup-overlay">
                  <span className="setup-label">{String(idx + 1).padStart(2, '0')}</span>
                  <h3 className="setup-title">{t(`ourSetups.${setup.key}` as any)}</h3>
                  <span className="setup-view-btn">{t('spaces.gallery.view')}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Custom Spaces Form */}
      <section className="spaces-form-section" ref={formRef}>
        <div className="form-frame">
          <div className="cyber-corner top-left"></div>
          <div className="cyber-corner top-right"></div>
          <div className="cyber-corner bottom-left"></div>
          <div className="cyber-corner bottom-right"></div>
          
          <h2 className="form-title">{t('spaces.form.title')}</h2>
          <p className="form-subtitle">{t('spaces.form.subtitle')}</p>

          {status === 'success' ? (
            <div className="form-status success">
              {t('spaces.form.success')}
            </div>
          ) : (
            <form className="spaces-form" onSubmit={handleSubmit}>
              {/* Honeypot */}
              <input
                type="text"
                name="_gotcha"
                className="form-honeypot"
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Purpose */}
              <div className="form-group">
                <label>{t('spaces.form.purpose')}</label>
                <div className="form-options">
                  {purposes.map(p => (
                    <label key={p} className={`form-option ${formData.purpose === p ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="purpose"
                        value={p}
                        checked={formData.purpose === p}
                        onChange={handleChange}
                      />
                      <span>{t(`spaces.form.purposes.${p}` as any)}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Current State */}
              <div className="form-group">
                <label>{t('spaces.form.currentState')}</label>
                <div className="form-options">
                  {currentStates.map(s => (
                    <label key={s} className={`form-option ${formData.currentState === s ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="currentState"
                        value={s}
                        checked={formData.currentState === s}
                        onChange={handleChange}
                      />
                      <span>{t(`spaces.form.states.${s}` as any)}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div className="form-group">
                <label>{t('spaces.form.budget')}</label>
                <div className="form-options budget-options">
                  {budgets.map(b => (
                    <label key={b} className={`form-option ${formData.budget === b ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="budget"
                        value={b}
                        checked={formData.budget === b}
                        onChange={handleChange}
                      />
                      <span>{t(`spaces.form.budgets.${b}` as any)}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Problems */}
              <div className="form-group">
                <label>{t('spaces.form.problems')}</label>
                <div className="form-options problems-options">
                  {problems.map(p => (
                    <label key={p} className={`form-option checkbox ${formData.problems.includes(p) ? 'selected' : ''}`}>
                      <input
                        type="checkbox"
                        checked={formData.problems.includes(p)}
                        onChange={() => handleProblemToggle(p)}
                      />
                      <span>{t(`spaces.form.problemOptions.${p}` as any)}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="form-group">
                <label htmlFor="message">{t('spaces.form.message')}</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('spaces.form.messagePlaceholder')}
                />
              </div>

              {/* Photo Upload Note */}
              <div className="form-group">
                <label>{t('spaces.form.photoLabel')}</label>
                <p className="form-note">{t('spaces.form.photoNote')}</p>
              </div>

              {/* Contact Info */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">{t('contact.name')} *</label>
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
                  <label htmlFor="email">{t('contact.emailPlaceholder')} *</label>
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

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">{t('spaces.form.phone')}</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-input"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>{t('spaces.form.preferredContact')}</label>
                  <div className="form-options contact-options">
                    <label className={`form-option ${formData.preferredContact === 'email' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="preferredContact"
                        value="email"
                        checked={formData.preferredContact === 'email'}
                        onChange={handleChange}
                      />
                      <span>Email</span>
                    </label>
                    <label className={`form-option ${formData.preferredContact === 'phone' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="preferredContact"
                        value="phone"
                        checked={formData.preferredContact === 'phone'}
                        onChange={handleChange}
                      />
                      <span>{t('spaces.form.phoneOption')}</span>
                    </label>
                  </div>
                </div>
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
                {status === 'sending' ? t('contact.sending') : t('spaces.form.submit')}
              </button>
              
              <p className="form-response-note">{t('spaces.form.responseNote')}</p>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}
