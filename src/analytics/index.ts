/**
 * Analytics Module
 * 
 * Handles GA4, Microsoft Clarity, and Meta Pixel initialization and event tracking.
 * GA4 uses Consent Mode v2 - loads for all users but only collects full data with consent.
 * Clarity and Meta Pixel only initialize with explicit consent.
 */

import { getAnalyticsConsent, getMarketingConsent } from '../components/CookieConsent'

// ============================================================================
// CONFIGURATION - Replace these with your actual IDs
// ============================================================================
export const GA4_MEASUREMENT_ID = 'G-93B9VGT80V'
export const CLARITY_PROJECT_ID = 'vfppecncdq'
export const META_PIXEL_ID = '2378458622666214'

// ============================================================================
// State tracking
// ============================================================================
let ga4ScriptLoaded = false
let ga4ConsentGranted = false
let clarityInitialized = false
let metaPixelLoaded = false
let metaPixelConsentGranted = false

// ============================================================================
// GA4 Functions (with Consent Mode v2)
// ============================================================================

/**
 * Load GA4 script with default consent denied
 * This should be called on page load (before consent decision)
 * Enables cookieless pings for basic analytics even without consent
 */
export function loadGA4Script(measurementId: string = GA4_MEASUREMENT_ID): boolean {
  if (ga4ScriptLoaded) return true
  if (typeof window === 'undefined') return false
  if (!measurementId || measurementId.startsWith('G-XXXX')) {
    console.warn('[Analytics] GA4 measurement ID not configured')
    return false
  }

  try {
    // Initialize gtag and dataLayer first
    window.dataLayer = window.dataLayer || [];
    (window as any).gtag = function() {
      window.dataLayer.push(arguments);
    }

    // Set default consent state to denied (Consent Mode v2)
    window.gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      wait_for_update: 500
    })

    // Enable URL passthrough for campaign data even without consent
    window.gtag('set', 'url_passthrough', true)
    
    // Enable ads data redaction when consent denied
    window.gtag('set', 'ads_data_redaction', true)

    // Load the gtag script
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    document.head.appendChild(script)

    // Initialize GA4
    window.gtag('js', new Date())
    window.gtag('config', measurementId)

    ga4ScriptLoaded = true
    console.log('[Analytics] GA4 loaded with consent mode (default: denied)')

    return true
  } catch (error) {
    console.error('[Analytics] Failed to load GA4:', error)
    return false
  }
}

/**
 * Update GA4 consent state when user grants analytics consent
 */
export function grantGA4Consent(): void {
  if (!ga4ScriptLoaded || typeof window === 'undefined') return
  if (ga4ConsentGranted) return

  window.gtag('consent', 'update', {
    analytics_storage: 'granted'
  })

  ga4ConsentGranted = true
  console.log('[Analytics] GA4 consent granted')

  // Send page view now that full tracking is enabled
  window.gtag('event', 'page_view', {
    page_path: window.location.pathname,
    page_title: document.title,
    page_location: window.location.href
  })
}

/**
 * Update GA4 consent for ad/marketing when user grants marketing consent
 */
export function grantGA4MarketingConsent(): void {
  if (!ga4ScriptLoaded || typeof window === 'undefined') return

  window.gtag('consent', 'update', {
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted'
  })

  console.log('[Analytics] GA4 marketing consent granted')
}

/**
 * Initialize GA4 with consent (legacy function for compatibility)
 * Now just grants consent if script is already loaded
 */
export function initGA4(measurementId: string = GA4_MEASUREMENT_ID): boolean {
  if (!ga4ScriptLoaded) {
    loadGA4Script(measurementId)
  }
  if (getAnalyticsConsent()) {
    grantGA4Consent()
  }
  if (getMarketingConsent()) {
    grantGA4MarketingConsent()
  }
  return ga4ScriptLoaded
}

/**
 * Track page view in GA4
 * Works in consent mode - sends cookieless ping if consent not granted
 */
export function trackPageView(path: string, title: string): void {
  if (!ga4ScriptLoaded || typeof window === 'undefined') return
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
 * Works in consent mode - sends cookieless ping if consent not granted
 */
export function trackEvent(eventName: string, params?: Record<string, any>): void {
  if (!ga4ScriptLoaded || typeof window === 'undefined') return
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
// Meta Pixel Functions (with consent handling)
// ============================================================================

/**
 * Check if Meta Pixel is loaded (from index.html)
 * The pixel base code and init are in index.html for verification
 * This function just marks it as ready for our tracking functions
 */
export function loadMetaPixelScript(): boolean {
  if (metaPixelLoaded) return true
  if (typeof window === 'undefined') return false

  // Check if fbq exists (loaded from index.html)
  if (window.fbq) {
    metaPixelLoaded = true
    console.log('[Analytics] Meta Pixel detected (awaiting consent for tracking)')
    return true
  }

  console.warn('[Analytics] Meta Pixel not found - check index.html')
  return false
}

/**
 * Grant Meta Pixel consent and start tracking
 */
export function grantMetaPixelConsent(): void {
  if (!metaPixelLoaded || typeof window === 'undefined') return
  if (metaPixelConsentGranted) return
  if (!window.fbq) return

  // Fire initial PageView now that we have consent
  window.fbq('track', 'PageView')

  metaPixelConsentGranted = true
  console.log('[Analytics] Meta Pixel consent granted, tracking enabled')
}

/**
 * Initialize Meta Pixel (legacy function for compatibility)
 */
export function initMetaPixel(): boolean {
  if (!metaPixelLoaded) {
    loadMetaPixelScript()
  }
  if (getMarketingConsent()) {
    grantMetaPixelConsent()
  }
  return metaPixelLoaded
}

/**
 * Track Meta Pixel page view
 * Only tracks if consent was granted
 */
export function trackMetaPageView(): void {
  if (!metaPixelConsentGranted || typeof window === 'undefined') return
  if (!window.fbq) return

  window.fbq('track', 'PageView')
  console.log('[Analytics] Meta PageView tracked')
}

/**
 * Track Meta Pixel standard event
 * Only tracks if consent was granted
 */
export function trackMetaEvent(eventName: string, params?: Record<string, any>): void {
  if (!metaPixelConsentGranted || typeof window === 'undefined') return
  if (!window.fbq) return

  window.fbq('track', eventName, params)
  console.log('[Analytics] Meta Event:', eventName, params)
}

/**
 * Track Meta Pixel custom event
 * Only tracks if consent was granted
 */
export function trackMetaCustomEvent(eventName: string, params?: Record<string, any>): void {
  if (!metaPixelConsentGranted || typeof window === 'undefined') return
  if (!window.fbq) return

  window.fbq('trackCustom', eventName, params)
  console.log('[Analytics] Meta Custom Event:', eventName, params)
}

// ============================================================================
// Combined initialization
// ============================================================================

/**
 * Load tracking scripts immediately (before consent)
 * Call this on app startup
 */
export function loadAnalyticsScripts(): void {
  loadGA4Script()
  loadMetaPixelScript()
}

/**
 * Initialize/update all analytics services based on consent
 * Call this when consent is given or on startup if consent already exists
 */
export function initAllAnalytics(): void {
  // GA4 - grant consent if analytics consent given
  if (getAnalyticsConsent()) {
    grantGA4Consent()
    initClarity()
  }
  
  // GA4 marketing consent + Meta Pixel - require marketing consent
  if (getMarketingConsent()) {
    grantGA4MarketingConsent()
    grantMetaPixelConsent()
  }
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
    fbq: (...args: any[]) => void
  }
}

