import { useEffect, useRef } from 'react'

export function useScrollAnimation() {
  const observerRef = useRef(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observerRef.current?.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    return () => {
      observerRef.current?.disconnect()
    }
  }, [])

  const animateRef = (el) => {
    if (el && observerRef.current) {
      observerRef.current.observe(el)
    }
  }

  return animateRef
}
