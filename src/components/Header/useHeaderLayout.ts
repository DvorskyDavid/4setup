import { useEffect, useState, useRef, useCallback } from 'react'

/**
 * Hook that detects when the centered logo would overlap with navigation
 * and returns whether to use compact (left-aligned) layout
 */
export function useHeaderLayout() {
  const [isCompact, setIsCompact] = useState(false)
  const brandRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)

  const checkOverlap = useCallback(() => {
    const brand = brandRef.current
    const nav = navRef.current
    const header = headerRef.current

    if (!brand || !nav || !header) return

    const headerRect = header.getBoundingClientRect()
    const brandRect = brand.getBoundingClientRect()
    const navRect = nav.getBoundingClientRect()

    // Calculate the center position of the header
    const headerCenter = headerRect.width / 2
    const brandHalfWidth = brandRect.width / 2

    // The brand would be centered, so its left edge would be at:
    const brandLeftIfCentered = headerCenter - brandHalfWidth
    
    // Nav is positioned from the right, calculate its left edge position
    // relative to the header's left edge
    const navLeftRelative = navRect.left - headerRect.left

    // Add some padding/gap (40px minimum gap between logo and nav)
    const minGap = 40

    // Check if the centered brand's right edge would overlap with nav's left edge
    const brandRightIfCentered = headerCenter + brandHalfWidth + minGap
    
    // If brandRightIfCentered > navLeftRelative, there's overlap
    const wouldOverlap = brandRightIfCentered > navLeftRelative

    setIsCompact(wouldOverlap)
  }, [])

  useEffect(() => {
    // Initial check
    checkOverlap()

    // Set up ResizeObserver for responsive detection
    const resizeObserver = new ResizeObserver(() => {
      checkOverlap()
    })

    if (headerRef.current) {
      resizeObserver.observe(headerRef.current)
    }

    // Also listen to window resize as backup
    window.addEventListener('resize', checkOverlap)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', checkOverlap)
    }
  }, [checkOverlap])

  return { isCompact, brandRef, navRef, headerRef }
}

