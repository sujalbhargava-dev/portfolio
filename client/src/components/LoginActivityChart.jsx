import { useState, useEffect } from 'react'

export default function LoginActivityChart() {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    let lastUpdate = Date.now()

    const updateChart = () => {
      const trackingData = JSON.parse(localStorage.getItem('loginTracking') || '{}')
      
      const days = []
      for (let i = 6; i >= 0; i--) {
        const d = new Date()
        d.setDate(d.getDate() - i)
        const dateString = d.toISOString().split('T')[0]
        const dayName = d.toLocaleDateString('en-US', { weekday: 'short' }).substring(0, 2)
        days.push({ dateString, dayName })
      }

      if (Object.keys(trackingData).length === 0) {
        const baseDate = new Date()
        const d1 = new Date(baseDate.setDate(baseDate.getDate() - 1)).toISOString().split('T')[0]
        const d2 = new Date(baseDate.setDate(baseDate.getDate() - 1)).toISOString().split('T')[0]
        trackingData[d1] = 2 * 60 * 60000 + 15 * 60000 // 2h 15m
        trackingData[d2] = 4 * 60 * 60000 + 30 * 60000 // 4h 30m
        localStorage.setItem('loginTracking', JSON.stringify(trackingData))
      }

      let maxMs = 3600000
      days.forEach(d => {
        if (trackingData[d.dateString] && trackingData[d.dateString] > maxMs) {
          maxMs = trackingData[d.dateString]
        }
      })

      const formatTime = (ms) => {
        const totalMinutes = Math.floor(ms / 60000)
        const hours = Math.floor(totalMinutes / 60)
        const minutes = totalMinutes % 60
        if (hours > 0) return `${hours}h ${minutes}m`
        if (minutes > 0) return `${minutes}m`
        return '< 1m'
      }

      const newChartData = days.map((d, index) => {
        const ms = trackingData[d.dateString] || 0
        const heightPercent = Math.max((ms / maxMs) * 100, 2)
        return {
          dayName: d.dayName,
          height: `${heightPercent}%`,
          value: formatTime(ms),
          isActive: index === 6
        }
      })

      setChartData(newChartData)
    }

    updateChart()

    const interval = setInterval(() => {
      const now = Date.now()
      const delta = now - lastUpdate
      lastUpdate = now

      const today = new Date().toISOString().split('T')[0]
      const trackingData = JSON.parse(localStorage.getItem('loginTracking') || '{}')
      trackingData[today] = (trackingData[today] || 0) + delta
      localStorage.setItem('loginTracking', JSON.stringify(trackingData))

      updateChart()
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div className="chart-mockup">
        {chartData.map((d, i) => (
          <div key={i} className={`chart-bar ${d.isActive ? 'active' : ''}`} style={{ height: d.height }} data-value={d.value}></div>
        ))}
      </div>
      <div className="chart-labels">
        {chartData.map((d, i) => (
          <span key={i}>{d.dayName}</span>
        ))}
      </div>
    </>
  )
}
