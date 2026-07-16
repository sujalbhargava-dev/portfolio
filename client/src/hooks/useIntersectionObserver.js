import { useEffect } from 'react'

/**
 * Applies the 'visible' class to elements matching the selector
 * when they enter the viewport. This recreates the IntersectionObserver
 * logic from the original script.js.
 */
export default function useIntersectionObserver(selector = '.fade-up, .fade-in, .stagger') {
  useEffect(() => {
    const elements = document.querySelectorAll(selector)
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [selector])
}
