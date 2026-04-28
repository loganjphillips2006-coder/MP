import { calculateStreak, getToday } from '../utils/streaks'

export default function TodayScreen({ habits, completions, onToggle, onNavigate, onStats }) {
  const today = getToday()
  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  const doneCount = habits.filter(h => (completions[h.id] || []).includes(today)).length
  const total = habits.length
  const pct = total > 0 ? Math.round((doneCount / total) * 100) : 0
  const allDone = total > 0 && doneCount === total

  return (
    <div className="screen">
      <header>
        <h1>Today</h1>
        <div style={{ display: 'flex', gap: 4 }}>
          <button className="link-btn" onClick={onStats}>Stats</button>
          <button className="link-btn" onClick={onNavigate}>Manage</button>
        </div>
      </header>

      <p className="date">{formattedDate}</p>

      {total > 0 && (
        <div className="progress-wrap">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
          <span className="progress-label">
            {allDone ? '🎉 All done!' : `${doneCount} / ${total} complete`}
          </span>
        </div>
      )}

      {habits.length === 0 ? (
        <p className="empty">No habits yet. Tap Manage to add some.</p>
      ) : (
        <ul className="habit-list">
          {habits.map(habit => {
            const dates = completions[habit.id] || []
            const done = dates.includes(today)
            const streak = calculateStreak(dates)
            return (
              <li key={habit.id} className={`habit-item${done ? ' done' : ''}`}>
                <label>
                  <input
                    type="checkbox"
                    checked={done}
                    onChange={() => onToggle(habit.id)}
                  />
                  <span className="name">{habit.name}</span>
                </label>
                {streak > 0 && <span className="streak">🔥 {streak}</span>}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
