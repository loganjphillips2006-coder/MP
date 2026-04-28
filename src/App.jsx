import { useState } from 'react'
import { loadData, saveData } from './utils/storage'
import { getToday } from './utils/streaks'
import TodayScreen from './screens/TodayScreen'
import ManageHabitsScreen from './screens/ManageHabitsScreen'
import StatsScreen from './screens/StatsScreen'

export default function App() {
  const [screen, setScreen] = useState('today')
  const [data, setData] = useState(() => loadData())

  function updateData(newData) {
    setData(newData)
    saveData(newData)
  }

  function addHabit(name) {
    const habit = {
      id: crypto.randomUUID(),
      name: name.trim(),
      createdAt: getToday(),
    }
    updateData({ ...data, habits: [...data.habits, habit] })
  }

  function deleteHabit(id) {
    const habits = data.habits.filter(h => h.id !== id)
    const completions = { ...data.completions }
    delete completions[id]
    updateData({ habits, completions })
  }

  function toggleCompletion(habitId) {
    const today = getToday()
    const dates = data.completions[habitId] || []
    const newDates = dates.includes(today)
      ? dates.filter(d => d !== today)
      : [...dates, today]
    updateData({
      ...data,
      completions: { ...data.completions, [habitId]: newDates },
    })
  }

  if (screen === 'manage') {
    return (
      <ManageHabitsScreen
        habits={data.habits}
        onAdd={addHabit}
        onDelete={deleteHabit}
        onNavigate={() => setScreen('today')}
      />
    )
  }

  if (screen === 'stats') {
    return (
      <StatsScreen
        habits={data.habits}
        completions={data.completions}
        onNavigate={() => setScreen('today')}
      />
    )
  }

  return (
    <TodayScreen
      habits={data.habits}
      completions={data.completions}
      onToggle={toggleCompletion}
      onNavigate={() => setScreen('manage')}
      onStats={() => setScreen('stats')}
    />
  )
}
