const STORAGE_KEY = 'habit-tracker-data';

export function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { habits: [], completions: {} };
    return JSON.parse(raw);
  } catch {
    return { habits: [], completions: {} };
  }
}

export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}