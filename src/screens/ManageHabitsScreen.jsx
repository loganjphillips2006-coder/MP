import { useState } from 'react'

export default function ManageHabitsScreen({ habits, onAdd, onDelete, onNavigate }) {
  const [input, setInput] = useState('')

  function handleAdd() {
    if (!input.trim()) return
    onAdd(input)
    setInput('')
  }

  return (
    <div className="screen">
      <header>
        <button className="link-btn" onClick={onNavigate}>← Back</button>
        <h1>Manage Habits</h1>
      </header>

      <div className="add-row">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
          placeholder="New habit name"
        />
        <button className="primary-btn" onClick={handleAdd} disabled={!input.trim()}>
          Add
        </button>
      </div>

      {habits.length === 0 ? (
        <p className="empty">No habits yet. Add one above.</p>
      ) : (
        <ul className="habit-list">
          {habits.map(habit => (
            <li key={habit.id} className="habit-item">
              <span className="name">{habit.name}</span>
              <button className="delete-btn" onClick={() => onDelete(habit.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}