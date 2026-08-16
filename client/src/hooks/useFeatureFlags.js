import { useState, useEffect } from 'react'
import { useAuth } from './useAuth'

export function useFeatureFlags() {
  const [features, setFeatures] = useState({})
  const { isAdmin } = useAuth()

  useEffect(() => {
    fetch('/api/features')
      .then(res => res.ok ? res.json() : {})
      .then(data => setFeatures(data))
      .catch(() => setFeatures({}))
  }, [])

  const isFeatureEnabled = (featureId) => {
    const status = features[featureId] || 'hidden'
    const urlParams = new URLSearchParams(window.location.search)
    const isTest = urlParams.get('test') === 'true'

    if (status === 'public') return true
    if (status === 'admin' && isAdmin) return true
    if (status === 'testing' && isTest) return true
    return false
  }

  return { features, isFeatureEnabled }
}
