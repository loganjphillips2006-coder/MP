export function getToday() {
  return new Date().toISOString().slice(0, 10);
}

export function calculateStreak(dates) {
  if (!dates || dates.length === 0) return 0;

  const dateSet = new Set(dates);
  const today = getToday();
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  // Start from today if completed, otherwise yesterday
  let checkDate = dateSet.has(today) ? today : yesterday;
  if (!dateSet.has(checkDate)) return 0;

  let streak = 0;
  let current = new Date(checkDate + 'T12:00:00');

  while (dateSet.has(current.toISOString().slice(0, 10))) {
    streak++;
    current.setDate(current.getDate() - 1);
  }

  return streak;
}