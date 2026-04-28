import { getToday } from '../utils/streaks'

function getLast7Days() {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    return d.toISOString().slice(0, 10)
  })
}

function getCompletionRate(dates) {
  const last30 = Array.from({ length: 30 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - i)
    return d.toISOString().slice(0, 10)
  })
  const hits = last30.filter(d => dates.includes(d)).length
  return Math.round((hits / 30) * 100)
}

export default function StatsScreen({ habits, completions, onNavigate }) {
  const days = getLast7Days()
  const today = getToday()

  const totalToday = habits.filter(h =>
    (completions[h.id] || []).includes(today)
  ).length

  return (
    <div className="screen">
      <header>
        <button className="link-btn" onClick={onNavigate}>← Back</button>
        <h1>Stats</h1>
      </header>

      <div className="stats-summary">
        <div className="stat-box">
          <span className="stat-num">{habits.length}</span>
          <span className="stat-label">Total Habits</span>
        </div>
        <div className="stat-box">
          <span className="stat-num">{totalToday}/{habits.length}</span>
          <span className="stat-label">Done Today</span>
        </div>
      </div>

      {habits.length === 0 ? (
        <p className="empty">No habits yet. Add some to see stats.</p>
      ) : (
        <>
          <h2 className="section-title">Last 7 Days</h2>
          <div className="week-header">
            {days.map(d => (
              <span key={d} className="week-day-label">
                {new Date(d + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'narrow' })}
              </span>
            ))}
          </div>
          <ul className="stats-list">
            {habits.map(habit => {
              const dates = completions[habit.id] || []
              const rate = getCompletionRate(dates)
              return (
                <li key={habit.id} className="stats-item">
                  <div className="stats-item-top">
                    <span className="name">{habit.name}</span>
                    <span className="rate-badge">{rate}%</span>
                  </div>
                  <div className="week-dots">
                    {days.map(d => (
                      <span
                        key={d}
                        className={`dot${dates.includes(d) ? ' dot-done' : ''}${d === today ? ' dot-today' : ''}`}
                      />
                    ))}
                  </div>
                </li>
              )
            })}
          </ul>
        </>
      )}
    </div>
  )
}
