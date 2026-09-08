// Per-device progress storage using localStorage.
// NOTE: the storage key stays at _v1 on purpose — defaultData() supplies any
// new fields, so an existing install keeps its history instead of resetting.

const STORAGE_KEY = 'waLifeExam_v1';

function defaultData() {
  return {
    chapterProgress: {}, // {chId:   {correct, total}}
    areaProgress: {},    // {areaKey:{correct, total}}  — PSI content areas
    missed: {},          // {qId: {streak}} — questions answered wrong, still owed
    examHistory: [],     // [{date, score, pct, breakdown, mode}]
    flashcardsSeen: {},
  };
}

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData();
    return Object.assign(defaultData(), JSON.parse(raw));
  } catch (e) {
    return defaultData();
  }
}

function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    // Storage can be full or blocked (private mode). Never let this break a quiz.
  }
}

// How many times in a row you must get a question right before it leaves the
// misses queue. Two means one lucky guess isn't enough to clear it.
const CLEAR_STREAK = 2;

// Single place that records one answer. Updates chapter + area accuracy and
// maintains the misses queue.
function recordAnswer(q, isCorrect) {
  const data = loadData();

  if (!data.chapterProgress[q.ch]) data.chapterProgress[q.ch] = { correct: 0, total: 0 };
  data.chapterProgress[q.ch].total++;
  if (isCorrect) data.chapterProgress[q.ch].correct++;

  const area = q.area || 'Basics';
  if (!data.areaProgress[area]) data.areaProgress[area] = { correct: 0, total: 0 };
  data.areaProgress[area].total++;
  if (isCorrect) data.areaProgress[area].correct++;

  if (isCorrect) {
    const entry = data.missed[q.id];
    if (entry) {
      entry.streak = (entry.streak || 0) + 1;
      if (entry.streak >= CLEAR_STREAK) delete data.missed[q.id];
    }
  } else {
    // Wrong answer: (re)queue it and reset any progress toward clearing.
    data.missed[q.id] = { streak: 0 };
  }

  saveData(data);
}

function getChapterStats(chId) {
  const cp = loadData().chapterProgress[chId];
  if (!cp || !cp.total) return { correct: 0, total: 0, pct: 0 };
  return { correct: cp.correct, total: cp.total, pct: Math.round((cp.correct / cp.total) * 100) };
}

function getAreaStats(areaKey) {
  const ap = loadData().areaProgress[areaKey];
  if (!ap || !ap.total) return { correct: 0, total: 0, pct: 0 };
  return { correct: ap.correct, total: ap.total, pct: Math.round((ap.correct / ap.total) * 100) };
}

function getMissedIds() {
  return Object.keys(loadData().missed).map(Number);
}

function clearMissed() {
  const data = loadData();
  data.missed = {};
  saveData(data);
}

function recordExamResult(result) {
  const data = loadData();
  data.examHistory.unshift(result);
  if (data.examHistory.length > 20) data.examHistory = data.examHistory.slice(0, 20);
  saveData(data);
}

function clearAllProgress() {
  try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
}

window.Storage = {
  loadData, saveData, recordAnswer, getChapterStats, getAreaStats,
  getMissedIds, clearMissed, recordExamResult, clearAllProgress,
};
