import { useState, useEffect } from 'react'

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const holidays = [
  { month: 0, day: 1, name: "New Year's Day", emoji: "🎆" },
  { month: 0, day: 26, name: "Republic Day", emoji: "🇮🇳" },
  { month: 2, day: 25, name: "Holi", emoji: "🎨" },
  { month: 7, day: 15, name: "Independence Day", emoji: "🇮🇳" },
  { month: 9, day: 2, name: "Gandhi Jayanti", emoji: "🕊️" },
  { month: 9, day: 31, name: "Diwali", emoji: "🪔" },
  { month: 11, day: 25, name: "Christmas Day", emoji: "🎄" }
]

export default function CalendarWidget() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [tasksData, setTasksData] = useState({})
  
  // Popover state
  const [popover, setPopover] = useState({ show: false, dateKey: null, dateStr: '', tasks: [] })
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    setTasksData(JSON.parse(localStorage.getItem('calendarTasks') || '{}'))
  }, [])

  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1)
  }
  
  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1)
  }

  const getDateKey = (y, m, d) => `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`

  const firstDay = new Date(currentYear, currentMonth, 1).getDay()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate()
  const today = new Date()
  const isCurrentMonth = today.getMonth() === currentMonth && today.getFullYear() === currentYear

  const openPopover = (dateKey, dayNum) => {
    setPopover({
      show: true,
      dateKey,
      dateStr: `${months[currentMonth]} ${dayNum}, ${currentYear}`,
      tasks: tasksData[dateKey] || []
    })
    setInputValue('')
  }

  const saveTask = () => {
    if (!inputValue.trim() || !popover.dateKey) return
    const newTasks = [...(tasksData[popover.dateKey] || []), inputValue.trim()]
    const newData = { ...tasksData, [popover.dateKey]: newTasks }
    setTasksData(newData)
    localStorage.setItem('calendarTasks', JSON.stringify(newData))
    setPopover(p => ({ ...p, tasks: newTasks }))
    setInputValue('')
  }

  const deleteTask = (idx) => {
    const newTasks = [...popover.tasks]
    newTasks.splice(idx, 1)
    const newData = { ...tasksData, [popover.dateKey]: newTasks }
    setTasksData(newData)
    localStorage.setItem('calendarTasks', JSON.stringify(newData))
    setPopover(p => ({ ...p, tasks: newTasks }))
  }

  const monthHolidays = holidays.filter(h => h.month === currentMonth)

  return (
    <div className="upload-card" style={{ marginBottom: 24 }}>
      <div className="upload-card-logo" style={{ justifyContent: 'space-between', marginBottom: 20 }}>
        <i className="fa-solid fa-chevron-left" onClick={prevMonth} style={{ cursor: 'pointer', opacity: 0.8, padding: 4 }}></i>
        <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>{months[currentMonth]}, {currentYear}</span>
        <i className="fa-solid fa-chevron-right" onClick={nextMonth} style={{ cursor: 'pointer', opacity: 0.8, padding: 4 }}></i>
      </div>
      
      <div className="dash-calendar" style={{ position: 'relative' }}>
        <div className="cal-grid" style={{ color: 'white', fontWeight: 500 }}>
          {['S','M','T','W','T','F','S'].map((d, i) => <div key={'h'+i} className="cal-day-name" style={{ color: 'rgba(255,255,255,0.7)' }}>{d}</div>)}
          
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={'prev'+i} className="cal-date" style={{ opacity: 0.4 }}>{daysInPrevMonth - firstDay + i + 1}</div>
          ))}
          
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1
            const dateKey = getDateKey(currentYear, currentMonth, dayNum)
            const isActiveToday = isCurrentMonth && dayNum === today.getDate()
            const isSelected = popover.show && popover.dateKey === dateKey
            const hasTasks = tasksData[dateKey] && tasksData[dateKey].length > 0
            
            return (
              <div 
                key={dateKey} 
                className={`cal-date ${isActiveToday ? 'active' : ''}`}
                style={{ 
                  cursor: 'pointer', 
                  position: 'relative',
                  background: isSelected && !isActiveToday ? 'rgba(255,255,255,0.2)' : (isActiveToday ? 'white' : 'transparent'),
                  borderRadius: isSelected && !isActiveToday ? 8 : '50%',
                  color: isActiveToday ? 'var(--accent)' : 'inherit'
                }}
                onClick={() => openPopover(dateKey, dayNum)}
              >
                {dayNum}
                {hasTasks && (
                  <div style={{ position: 'absolute', bottom: 4, left: '50%', transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: '50%', backgroundColor: isActiveToday ? 'var(--accent)' : 'white' }}></div>
                )}
              </div>
            )
          })}
          
          {Array.from({ length: 42 - (firstDay + daysInMonth) }).map((_, i) => (
            <div key={'next'+i} className="cal-date" style={{ opacity: 0.4 }}>{i + 1}</div>
          ))}
        </div>
        
        {popover.show && (
          <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translate(-50%, -10px)', width: 260, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 16, boxShadow: '0 10px 25px rgba(0,0,0,0.5)', zIndex: 100 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, borderBottom: '1px solid var(--border)', paddingBottom: 8 }}>
              <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{popover.dateStr}</span>
              <i className="fa-solid fa-xmark" onClick={() => setPopover(p => ({ ...p, show: false }))} style={{ cursor: 'pointer', color: 'var(--text-muted)' }}></i>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12, maxHeight: 150, overflowY: 'auto' }}>
              {popover.tasks.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>No tasks yet.</div>
              ) : (
                popover.tasks.map((task, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '6px 10px', borderRadius: 4 }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)', wordBreak: 'break-all' }}>{task}</span>
                    <i className="fa-solid fa-trash" onClick={() => deleteTask(idx)} style={{ color: '#ef4444', fontSize: '0.8rem', cursor: 'pointer', paddingLeft: 8 }}></i>
                  </div>
                ))
              )}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={e => e.key === 'Enter' && saveTask()} placeholder="Add schedule..." style={{ flex: 1, border: '1px solid var(--border)', background: 'var(--bg-alt)', color: 'var(--text-primary)', borderRadius: 6, padding: '6px 10px', fontSize: '0.85rem' }} />
              <button onClick={saveTask} style={{ background: 'var(--accent)', color: 'white', border: 'none', borderRadius: 6, padding: '0 10px', cursor: 'pointer' }}><i className="fa-solid fa-plus"></i></button>
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: 24, borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: 16, position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 12, letterSpacing: '0.05em' }}>Holidays This Month</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {monthHolidays.length === 0 ? (
            <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>No major holidays this month.</div>
          ) : (
            monthHolidays.map((h, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>{h.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'white' }}>{h.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>{months[currentMonth]} {h.day}, {currentYear}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <i className="fa-regular fa-calendar-days" style={{ position: 'absolute', bottom: -20, right: -20, fontSize: '10rem', opacity: 0.05 }}></i>
    </div>
  )
}
