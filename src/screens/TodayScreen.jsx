import { calculateStreak, getToday } from '../utils/streaks'

export default function TodayScreen({ habits, completions, onToggle, onNavigate }) {
  const today = getToday()
  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="screen">
      <header>
        <h1>Today</h1>
        <button className="link-btn" onClick={onNavigate}>Manage</button>
      </header>

      <p className="date">{formattedDate}</p>

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