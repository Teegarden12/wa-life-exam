// Per-device progress storage using localStorage

const STORAGE_KEY = 'waLifeExam_v1';

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData();
    return Object.assign(defaultData(), JSON.parse(raw));
  } catch(e) {
    return defaultData();
  }
}

function defaultData() {
  return {
    chapterProgress: {}, // {chId: {correct:n, total:n, seen:Set}}
    examHistory: [],     // [{date, score, pct, breakdown, mode}]
    flashcardsSeen: {},  // {cardId: true}
  };
}

function saveData(data) {
  // Convert Sets to arrays for JSON
  const toSave = JSON.parse(JSON.stringify(data, (k,v) => v instanceof Set ? [...v] : v));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
}

function getChapterStats(chId) {
  const data = loadData();
  const cp = data.chapterProgress[chId];
  if (!cp) return { correct: 0, total: 0, pct: 0 };
  const pct = cp.total ? Math.round((cp.correct / cp.total) * 100) : 0;
  return { correct: cp.correct, total: cp.total, pct };
}

function recordQuizResult(chId, correct, total) {
  const data = loadData();
  if (!data.chapterProgress[chId]) {
    data.chapterProgress[chId] = { correct: 0, total: 0 };
  }
  data.chapterProgress[chId].correct += correct;
  data.chapterProgress[chId].total += total;
  saveData(data);
}

function recordExamResult(result) {
  const data = loadData();
  data.examHistory.unshift(result);
  if (data.examHistory.length > 20) data.examHistory = data.examHistory.slice(0, 20);
  saveData(data);
}

function clearAllProgress() {
  localStorage.removeItem(STORAGE_KEY);
}

window.Storage = { loadData, saveData, getChapterStats, recordQuizResult, recordExamResult, clearAllProgress };
