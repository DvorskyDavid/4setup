/**
 * Analytics Module
 * 
 * Handles GA4 and Microsoft Clarity initialization and event tracking.
 * Only initializes if user has given cookie consent.
 */

import { getConsent, getAnalyticsConsent } from '../components/CookieConsent'

// ============================================================================
// CONFIGURATION - Replace these with your actual IDs
// ============================================================================
export const GA4_MEASUREMENT_ID = 'G-93B9VGT80V'
export const CLARITY_PROJECT_ID = 'vfppecncdq'

// ============================================================================
// State tracking
// ============================================================================
let ga4Initialized = false
let clarityInitialized = false

// ============================================================================
// GA4 Functions
// ============================================================================

/**
 * Initialize Google Analytics 4
 * Only runs if consent was given and not already initialized
 */
export function initGA4(measurementId: string = GA4_MEASUREMENT_ID): boolean {
  if (ga4Initialized) return true
  if (typeof window === 'undefined') return false
  if (!getAnalyticsConsent()) return false
  if (!measurementId || measurementId.startsWith('G-XXXX')) {
    console.warn('[Analytics] GA4 measurement ID not configured')
    return false
  }

  try {
    // Create gtag script
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    document.head.appendChild(script)

    // Initialize gtag - must use arguments object, not rest params
    window.dataLayer = window.dataLayer || [];
    (window as any).gtag = function() {
      window.dataLayer.push(arguments);
    }
    
    window.gtag('js', new Date())
    window.gtag('config', measurementId)

    ga4Initialized = true
    console.log('[Analytics] GA4 initialized')
    
    // Send initial page view immediately
    window.gtag('event', 'page_view', {
      page_path: window.location.pathname,
      page_title: document.title,
      page_location: window.location.href
    })
    console.log('[Analytics] Initial page view sent:', window.location.pathname)
    
    return true
  } catch (error) {
    console.error('[Analytics] Failed to initialize GA4:', error)
    return false
  }
}

/**
 * Track page view in GA4
 */
export function trackPageView(path: string, title: string): void {
  if (!ga4Initialized || typeof window === 'undefined') return
  if (!window.gtag) return

  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title,
    page_location: window.location.href
  })
  console.log('[Analytics] Page view:', path)
}

/**
 * Track custom event in GA4
 */
export function trackEvent(eventName: string, params?: Record<string, any>): void {
  if (!ga4Initialized || typeof window === 'undefined') return
  if (!window.gtag) return

  window.gtag('event', eventName, params)
  console.log('[Analytics] Event:', eventName, params)
}

// ============================================================================
// Clarity Functions
// ============================================================================

/**
 * Initialize Microsoft Clarity
 * Only runs if consent was given and not already initialized
 */
export function initClarity(projectId: string = CLARITY_PROJECT_ID): boolean {
  if (clarityInitialized) return true
  if (typeof window === 'undefined') return false
  if (!getAnalyticsConsent()) return false
  if (!projectId || projectId === 'xxxxxxxxxx') {
    console.warn('[Analytics] Clarity project ID not configured')
    return false
  }

  try {
    // Clarity initialization script
    (function(c: any, l: Document, a: string, r: string, i: string, t?: HTMLScriptElement, y?: Element) {
      c[a] = c[a] || function() { (c[a].q = c[a].q || []).push(arguments) }
      t = l.createElement(r) as HTMLScriptElement
      t.async = true
      t.src = 'https://www.clarity.ms/tag/' + i
      y = l.getElementsByTagName(r)[0]
      y?.parentNode?.insertBefore(t, y)
    })(window, document, 'clarity', 'script', projectId)

    clarityInitialized = true
    console.log('[Analytics] Clarity initialized')
    return true
  } catch (error) {
    console.error('[Analytics] Failed to initialize Clarity:', error)
    return false
  }
}

// ============================================================================
// Combined initialization
// ============================================================================

/**
 * Initialize all analytics services if analytics consent was given
 */
export function initAllAnalytics(): void {
  if (!getAnalyticsConsent()) return
  
  initGA4()
  initClarity()
}

// ============================================================================
// Predefined tracking functions
// ============================================================================

/**
 * Track contact form submission
 */
export function trackContactFormSubmission(formData?: { subject?: string }): void {
  trackEvent('contact_form_submit', {
    event_category: 'engagement',
    event_label: formData?.subject || 'contact'
  })
}

/**
 * Track newsletter signup
 */
export function trackNewsletterSignup(): void {
  trackEvent('newsletter_signup', {
    event_category: 'engagement',
    event_label: 'newsletter'
  })
}

/**
 * Track language switch
 */
export function trackLanguageSwitch(newLang: string): void {
  trackEvent('language_switch', {
    event_category: 'preferences',
    event_label: newLang
  })
}

/**
 * Track external link click (e.g., e-shop)
 */
export function trackExternalLinkClick(url: string, linkType: string = 'external'): void {
  trackEvent('click', {
    event_category: 'outbound',
    event_label: linkType,
    link_url: url
  })
}

/**
 * Track CTA button click
 */
export function trackCTAClick(ctaName: string, location: string): void {
  trackEvent('cta_click', {
    event_category: 'engagement',
    event_label: ctaName,
    cta_location: location
  })
}

// ============================================================================
// Type declarations for window
// ============================================================================
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
    clarity: (...args: any[]) => void
  }
}

