// WA Life Insurance Exam Prep — Main App Logic
// Organized around the official PSI content areas (see js/areas.js).

(function(){
'use strict';

// ── State ──────────────────────────────────────────────────────────
let currentScreen = 'home';
let quizState = null;
let examState = null;
let fcState = null;
let examTimerInterval = null;

const PASS_MARK = 70;

function areaByKey(k){ return AREAS.find(a => a.key === k); }
function pctColor(p){ return p >= 70 ? 'var(--green)' : p >= 50 ? 'var(--yellow)' : 'var(--red)'; }

// ── Navigation ─────────────────────────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('screen-' + id).classList.add('active');
  const btn = document.querySelector('.nav-btn[data-screen="' + id + '"]');
  if (btn) btn.classList.add('active');
  currentScreen = id;
  if (id === 'home') renderHome();
  if (id === 'quiz') renderQuizHome();
  if (id === 'flashcards') renderFlashcardHome();
  if (id === 'exam') renderExamHome();
  if (id === 'dashboard') renderDashboard();
  if (id === 'misses') renderMissesHome();
  window.scrollTo(0, 0);
}

// ── HOME ───────────────────────────────────────────────────────────
function renderHome() {
  const data = Storage.loadData();
  const totalAnswered = Object.values(data.areaProgress).reduce((a, c) => a + c.total, 0);
  const totalCorrect  = Object.values(data.areaProgress).reduce((a, c) => a + c.correct, 0);
  const overall = totalAnswered ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  const missed = Storage.getMissedIds().length;

  document.getElementById('home-stats').innerHTML = `
    <div class="stats-grid">
      <div class="stat-card"><div class="stat-value">${QUESTIONS.length}</div><div class="stat-label">Total Questions</div></div>
      <div class="stat-card"><div class="stat-value">${totalAnswered}</div><div class="stat-label">Answered</div></div>
      <div class="stat-card"><div class="stat-value">${overall}%</div><div class="stat-label">Overall Accuracy</div></div>
      <div class="stat-card"><div class="stat-value" style="color:${missed ? 'var(--red)' : 'var(--green)'}">${missed}</div><div class="stat-label">To Re-Drill</div></div>
    </div>`;

  // Priority list: where the recoverable points are, worst real-exam score first.
  const rows = AREAS.map(a => {
    const s = Storage.getAreaStats(a.key);
    const realPct = Math.round((a.base / a.items) * 100);
    return { a, s, realPct, gain: a.items - a.base };
  }).sort((x, y) => y.gain - x.gain);

  document.getElementById('home-priority').innerHTML = `
    <div class="card">
      <h3>Where your points are</h3>
      <p class="text-sm text-muted" style="margin-bottom:12px;">
        From your 08/17/2026 exam (53/100). Sorted by points you can win back. Tap an area to drill it.
      </p>
      <table class="breakdown-table">
        <thead><tr><th>Content area</th><th>Exam</th><th>You</th><th>Practice</th><th>Gain</th></tr></thead>
        <tbody>
        ${rows.map(r => `
          <tr style="cursor:pointer" onclick="startAreaQuiz('${r.a.key}')">
            <td>${r.a.short}</td>
            <td>${r.a.items}</td>
            <td style="color:${pctColor(r.realPct)}">${r.a.base}/${r.a.items}</td>
            <td style="color:${r.s.total ? pctColor(r.s.pct) : 'var(--muted)'}">${r.s.total ? r.s.pct + '%' : '—'}</td>
            <td style="color:var(--accent);font-weight:700">+${r.gain}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}

// ── QUIZ (by PSI area or by chapter) ───────────────────────────────
function renderQuizHome() {
  document.getElementById('quiz-area-list').innerHTML =
    '<div class="chapter-grid">' + AREAS.map(a => {
      const n = QUESTIONS.filter(q => q.area === a.key).length;
      const s = Storage.getAreaStats(a.key);
      return `
      <div class="chapter-card" onclick="startAreaQuiz('${a.key}')">
        <div class="chapter-name">${a.name}</div>
        <div class="chapter-count">${n} questions · ${a.items} on the exam</div>
        <div class="progress-bar"><div class="progress-fill" style="width:${s.pct}%;background:${pctColor(s.pct)}"></div></div>
        <div class="progress-label">${s.total ? s.pct + '% accuracy (' + s.total + ' answered)' : 'Not started'}</div>
      </div>`;
    }).join('') + '</div>';

  document.getElementById('quiz-chapter-list').innerHTML =
    '<div class="chapter-grid">' + CHAPTERS.map(ch => {
      const qs = QUESTIONS.filter(q => q.ch === ch.id);
      const stats = Storage.getChapterStats(ch.id);
      return `
      <div class="chapter-card" onclick="startChapterQuiz(${ch.id})">
        <div class="chapter-name">${ch.name}</div>
        <div class="chapter-count">${qs.length} questions</div>
        <div class="progress-bar"><div class="progress-fill" style="width:${stats.pct}%;background:${pctColor(stats.pct)}"></div></div>
        <div class="progress-label">${stats.total ? stats.pct + '% accuracy (' + stats.total + ' answered)' : 'Not started'}</div>
      </div>`;
    }).join('') + '</div>';
}

function beginQuiz(questions, label, retry) {
  if (!questions.length) return;
  quizState = { questions, index: 0, correct: 0, answered: false, label, retry };
  document.getElementById('quiz-browse').style.display = 'none';
  document.getElementById('quiz-results').style.display = 'none';
  document.getElementById('quiz-active').style.display = 'block';
  renderQuizQuestion();
}

window.startChapterQuiz = function(chId) {
  const ch = CHAPTERS.find(c => c.id === chId);
  beginQuiz(shuffle(QUESTIONS.filter(q => q.ch === chId)).map(shuffleOptions),
            ch ? ch.name : 'Chapter', `startChapterQuiz(${chId})`);
};

window.startAreaQuiz = function(key) {
  const a = areaByKey(key);
  showScreen('quiz');
  beginQuiz(shuffle(QUESTIONS.filter(q => q.area === key)).map(shuffleOptions),
            a ? a.name : key, `startAreaQuiz('${key}')`);
};

function renderQuizQuestion() {
  const qs = quizState.questions;
  const q = qs[quizState.index];
  const a = areaByKey(q.area);

  document.getElementById('quiz-progress-text').textContent = `Question ${quizState.index + 1} of ${qs.length}`;
  document.getElementById('quiz-area-tag').textContent = a ? a.short : '';
  document.getElementById('quiz-question').textContent = q.q;

  document.getElementById('quiz-options').innerHTML = q.opts.map((o, i) =>
    `<button class="option-btn" onclick="selectQuizAnswer(${i})">${String.fromCharCode(65+i)}. ${o}</button>`
  ).join('');

  const exp = document.getElementById('quiz-explanation');
  exp.textContent = '';
  exp.classList.remove('show');
  document.getElementById('quiz-next').style.display = 'none';
  document.getElementById('quiz-finish').style.display = 'none';
  quizState.answered = false;
}

window.selectQuizAnswer = function(i) {
  if (quizState.answered) return;
  quizState.answered = true;
  const q = quizState.questions[quizState.index];
  const btns = document.querySelectorAll('#quiz-options .option-btn');
  const isCorrect = i === q.correct;

  btns.forEach(b => b.disabled = true);
  btns[q.correct].classList.add('correct');
  if (!isCorrect) btns[i].classList.add('incorrect'); else quizState.correct++;

  Storage.recordAnswer(q, isCorrect);

  const exp = document.getElementById('quiz-explanation');
  exp.textContent = q.exp;
  exp.classList.add('show');

  const isLast = quizState.index >= quizState.questions.length - 1;
  document.getElementById('quiz-next').style.display = isLast ? 'none' : 'inline-flex';
  document.getElementById('quiz-finish').style.display = isLast ? 'inline-flex' : 'none';
};

window.nextQuizQuestion = function() { quizState.index++; renderQuizQuestion(); window.scrollTo(0,0); };

window.finishQuiz = function() {
  const pct = Math.round((quizState.correct / quizState.questions.length) * 100);
  const stillMissed = Storage.getMissedIds().length;
  document.getElementById('quiz-active').style.display = 'none';
  const results = document.getElementById('quiz-results');
  results.style.display = 'block';
  results.innerHTML = `
    <div class="card text-center">
      <h2>${quizState.label}</h2>
      <div class="result-score ${pct >= PASS_MARK ? 'pass' : 'fail'}">${pct}%</div>
      <div class="result-badge">${quizState.correct} / ${quizState.questions.length} correct</div>
      <p class="text-sm text-muted" style="margin-top:10px;">
        ${stillMissed} question${stillMissed === 1 ? '' : 's'} waiting in My Misses.
      </p>
      <div class="flex gap-2" style="justify-content:center; flex-wrap:wrap; margin-top:16px;">
        <button class="btn btn-primary" onclick="${quizState.retry}">Retry</button>
        <button class="btn btn-outline" onclick="showScreen('misses')">Drill My Misses</button>
        <button class="btn btn-outline" onclick="exitQuiz()">Back</button>
      </div>
    </div>`;
};

window.exitQuiz = function() {
  document.getElementById('quiz-browse').style.display = 'block';
  document.getElementById('quiz-active').style.display = 'none';
  document.getElementById('quiz-results').style.display = 'none';
  renderQuizHome();
};

// ── MY MISSES ──────────────────────────────────────────────────────
function renderMissesHome() {
  const ids = Storage.getMissedIds();
  const missed = QUESTIONS.filter(q => ids.includes(q.id));
  const el = document.getElementById('misses-body');

  if (!missed.length) {
    el.innerHTML = `
      <div class="card text-center">
        <h3>Nothing to re-drill</h3>
        <p class="text-sm text-muted">
          Questions you answer incorrectly land here automatically. Get one right
          twice in a row and it clears itself.
        </p>
        <button class="btn btn-primary mt-4" onclick="showScreen('quiz')">Study an area</button>
      </div>`;
    return;
  }

  const byArea = {};
  missed.forEach(q => { byArea[q.area] = (byArea[q.area] || 0) + 1; });

  el.innerHTML = `
    <div class="card">
      <h3>${missed.length} question${missed.length === 1 ? '' : 's'} to re-drill</h3>
      <p class="text-sm text-muted" style="margin-bottom:12px;">
        Every question you miss is queued here. Answer one correctly twice in a row and it leaves the queue.
      </p>
      <table class="breakdown-table">
        <thead><tr><th>Content area</th><th>Missed</th></tr></thead>
        <tbody>
        ${AREAS.filter(a => byArea[a.key]).map(a => `
          <tr><td>${a.short}</td><td style="color:var(--red);font-weight:700">${byArea[a.key]}</td></tr>`).join('')}
        </tbody>
      </table>
      <div class="flex gap-2 mt-4" style="flex-wrap:wrap;">
        <button class="btn btn-primary" onclick="startMissesDrill()">Drill all ${missed.length}</button>
        <button class="btn btn-outline" onclick="resetMisses()">Clear the queue</button>
      </div>
    </div>`;
}

window.startMissesDrill = function() {
  const ids = Storage.getMissedIds();
  const qs = shuffle(QUESTIONS.filter(q => ids.includes(q.id))).map(shuffleOptions);
  if (!qs.length) return;
  showScreen('quiz');
  beginQuiz(qs, 'My Misses', 'startMissesDrill()');
};

window.resetMisses = function() {
  if (confirm('Clear the misses queue? Questions you have missed will no longer be tracked for re-drilling.')) {
    Storage.clearMissed();
    renderMissesHome();
    renderHome();
  }
};

// ── FLASHCARDS ─────────────────────────────────────────────────────
function renderFlashcardHome() {
  const chFilter = document.getElementById('fc-chapter-filter');
  if (!chFilter.children.length) {
    chFilter.innerHTML = '<option value="0">All Chapters</option>' +
      CHAPTERS.map(c => `<option value="${c.id}">${c.shortName}</option>`).join('');
  }
  startFlashcards();
}

window.startFlashcards = function() {
  const chId = parseInt(document.getElementById('fc-chapter-filter').value);
  const cards = shuffle(chId ? FLASHCARDS.filter(c => c.ch === chId) : [...FLASHCARDS]);
  fcState = { cards, index: 0 };
  renderFlashcard();
};

function renderFlashcard() {
  const card = fcState.cards[fcState.index];
  if (!card) return;
  const chName = (CHAPTERS.find(c => c.id === card.ch) || {}).shortName || '';
  document.getElementById('fc-card').className = 'flashcard';
  document.getElementById('fc-term').textContent = card.term;
  document.getElementById('fc-def').textContent = card.def;
  document.getElementById('fc-chapter-label').textContent = chName;
  document.getElementById('fc-counter').textContent = `${fcState.index + 1} / ${fcState.cards.length}`;
}

window.flipCard = function() { document.getElementById('fc-card').classList.toggle('flipped'); };
window.nextCard  = function() { if (fcState.index < fcState.cards.length - 1) { fcState.index++; renderFlashcard(); } };
window.prevCard  = function() { if (fcState.index > 0) { fcState.index--; renderFlashcard(); } };

// ── EXAM ───────────────────────────────────────────────────────────
function renderExamHome() {
  stopExamTimer();
  document.getElementById('exam-setup').style.display = 'block';
  document.getElementById('exam-active').style.display = 'none';
  document.getElementById('exam-results').style.display = 'none';
}

// Draw questions in the SAME proportions as the real exam.
// 100 questions => exactly the PSI item counts (30 WA, 20 Provisions, ...).
// Smaller exams scale down using the largest-remainder method so the totals still add up.
function drawWeighted(total) {
  const parts = AREAS.map(a => {
    const exact = a.items * (total / 100);
    return { key: a.key, n: Math.floor(exact), rem: exact - Math.floor(exact) };
  });
  let assigned = parts.reduce((s, p) => s + p.n, 0);
  parts.slice().sort((x, y) => y.rem - x.rem).forEach(p => {
    if (assigned < total) { p.n++; assigned++; }
  });

  let picked = [];
  parts.forEach(p => {
    const pool = shuffle(QUESTIONS.filter(q => q.area === p.key));
    picked = picked.concat(pool.slice(0, Math.min(p.n, pool.length)));
  });
  // If any area was short, top up from the rest of the bank so the count is right.
  if (picked.length < total) {
    const used = new Set(picked.map(q => q.id));
    picked = picked.concat(shuffle(QUESTIONS.filter(q => !used.has(q.id))).slice(0, total - picked.length));
  }
  return shuffle(picked);
}

window.startExam = function(mode) {
  let count, minutes;
  if (mode === 'quick') { count = 25; minutes = 38; }
  else if (mode === 'half') { count = 50; minutes = 75; }
  else { count = 100; minutes = 150; }

  const qs = drawWeighted(count).map(shuffleOptions);
  examState = {
    questions: qs,
    answers: new Array(qs.length).fill(null),
    index: 0, mode,
    secondsLeft: minutes * 60,
    startTime: Date.now(),
  };

  document.getElementById('exam-setup').style.display = 'none';
  document.getElementById('exam-active').style.display = 'block';
  document.getElementById('exam-results').style.display = 'none';

  startExamTimer();
  renderExamQuestion();
};

function startExamTimer() {
  updateTimerDisplay();
  examTimerInterval = setInterval(() => {
    examState.secondsLeft--;
    updateTimerDisplay();
    if (examState.secondsLeft <= 0) submitExam(true);
  }, 1000);
}

function stopExamTimer() {
  if (examTimerInterval) { clearInterval(examTimerInterval); examTimerInterval = null; }
}

function updateTimerDisplay() {
  if (!examState) return;
  const s = examState.secondsLeft;
  const el = document.getElementById('exam-timer');
  el.textContent = `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
  el.className = 'exam-timer';
  if (s <= 300) el.classList.add('danger');
  else if (s <= 600) el.classList.add('warning');
}

function renderExamQuestion() {
  const q = examState.questions[examState.index];
  const idx = examState.index;
  const total = examState.questions.length;
  const selected = examState.answers[idx];

  document.getElementById('exam-progress-text').textContent = `${idx + 1} / ${total}`;
  document.getElementById('exam-question').textContent = q.q;
  document.getElementById('exam-options').innerHTML = q.opts.map((o, i) => {
    const sel = selected === i ? 'style="border-color:var(--accent);background:rgba(79,110,247,0.12)"' : '';
    return `<button class="option-btn" onclick="selectExamAnswer(${i})" ${sel}>${String.fromCharCode(65+i)}. ${o}</button>`;
  }).join('');

  document.getElementById('exam-prev').disabled = idx === 0;
  document.getElementById('exam-next').style.display = idx < total - 1 ? 'inline-flex' : 'none';
  document.getElementById('exam-submit-btn').style.display = idx === total - 1 ? 'inline-flex' : 'none';
  document.getElementById('exam-answered-count').textContent =
    `${examState.answers.filter(a => a !== null).length}/${total} answered`;
}

window.selectExamAnswer = function(i) { examState.answers[examState.index] = i; renderExamQuestion(); };
window.examPrev = function() { if (examState.index > 0) { examState.index--; renderExamQuestion(); window.scrollTo(0,0); } };
window.examNext = function() { if (examState.index < examState.questions.length - 1) { examState.index++; renderExamQuestion(); window.scrollTo(0,0); } };

window.submitExam = function(autoSubmit) {
  const unanswered = examState.answers.filter(a => a === null).length;
  if (!autoSubmit && unanswered > 0 &&
      !confirm(`${unanswered} question(s) unanswered. Submit anyway?`)) return;

  stopExamTimer();

  const qs = examState.questions;
  let correct = 0;
  const breakdown = {};
  AREAS.forEach(a => { breakdown[a.key] = { name: a.short, correct: 0, total: 0 }; });

  qs.forEach((q, i) => {
    const isCorrect = examState.answers[i] === q.correct;
    if (isCorrect) correct++;
    // Feed the misses queue and per-area accuracy, same as a practice quiz.
    Storage.recordAnswer(q, isCorrect);
    const b = breakdown[q.area];
    if (b) { b.total++; if (isCorrect) b.correct++; }
  });

  const pct = Math.round((correct / qs.length) * 100);
  const pass = pct >= PASS_MARK;
  const elapsed = Math.round((Date.now() - examState.startTime) / 1000);

  Storage.recordExamResult({
    date: new Date().toLocaleDateString(),
    score: correct, total: qs.length, pct, pass, mode: examState.mode, breakdown,
  });

  document.getElementById('exam-active').style.display = 'none';
  document.getElementById('exam-results').style.display = 'block';
  document.getElementById('exam-result-score').textContent = pct + '%';
  document.getElementById('exam-result-score').className = 'result-score ' + (pass ? 'pass' : 'fail');
  document.getElementById('exam-result-badge').innerHTML = `
    <span class="badge ${pass ? 'badge-pass' : 'badge-fail'}">${pass ? 'PASS ✓' : 'FAIL ✗'}</span>
    &nbsp; ${correct} / ${qs.length} correct &nbsp;·&nbsp; ${Math.floor(elapsed/60)}m ${elapsed%60}s
    &nbsp;·&nbsp; pass mark ${PASS_MARK}%`;

  const rows = AREAS.filter(a => breakdown[a.key].total > 0).map(a => {
    const b = breakdown[a.key];
    const bpct = Math.round((b.correct / b.total) * 100);
    return `<tr>
      <td>${b.name}</td>
      <td>${b.correct}/${b.total}</td>
      <td style="color:${pctColor(bpct)}">${bpct}%</td>
    </tr>`;
  }).join('');

  document.getElementById('exam-breakdown').innerHTML = `
    <p class="text-sm text-muted" style="margin:12px 0 6px;">By PSI content area — the same breakdown the state sends you.</p>
    <table class="breakdown-table">
      <thead><tr><th>Content area</th><th>Score</th><th>%</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>`;
};

// ── DASHBOARD ──────────────────────────────────────────────────────
function renderDashboard() {
  const data = Storage.loadData();
  const totalAnswered = Object.values(data.areaProgress).reduce((a, c) => a + c.total, 0);
  const totalCorrect  = Object.values(data.areaProgress).reduce((a, c) => a + c.correct, 0);
  const overall = totalAnswered ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  const bestExam = data.examHistory.length ? Math.max(...data.examHistory.map(e => e.pct)) : 0;

  document.getElementById('dash-stats').innerHTML = `
    <div class="stats-grid">
      <div class="stat-card"><div class="stat-value">${totalAnswered}</div><div class="stat-label">Questions Answered</div></div>
      <div class="stat-card"><div class="stat-value">${overall}%</div><div class="stat-label">Overall Accuracy</div></div>
      <div class="stat-card"><div class="stat-value">${data.examHistory.length}</div><div class="stat-label">Exams Taken</div></div>
      <div class="stat-card"><div class="stat-value" style="color:${bestExam >= PASS_MARK ? 'var(--green)' : 'var(--red)'}">${bestExam}%</div><div class="stat-label">Best Exam Score</div></div>
    </div>`;

  const areaRows = AREAS.map(a => {
    const s = Storage.getAreaStats(a.key);
    const realPct = Math.round((a.base / a.items) * 100);
    return `<tr>
      <td>${a.short}</td>
      <td>${a.items}</td>
      <td style="color:${pctColor(realPct)}">${a.base}/${a.items}</td>
      <td>
        <div class="progress-bar" style="width:90px">
          <div class="progress-fill" style="width:${s.pct}%;background:${pctColor(s.pct)}"></div>
        </div>
      </td>
      <td style="color:${s.total ? pctColor(s.pct) : 'var(--muted)'}">${s.total ? s.pct + '%' : '—'}</td>
    </tr>`;
  }).join('');

  document.getElementById('dash-area-table').innerHTML = `
    <p class="text-sm text-muted" style="margin-bottom:10px;">
      "Real exam" is your 08/17/2026 score. "Practice" is your accuracy in this app.
    </p>
    <table class="breakdown-table">
      <thead><tr><th>Content area</th><th>Items</th><th>Real exam</th><th>Practice</th><th>%</th></tr></thead>
      <tbody>${areaRows}</tbody>
    </table>`;

  const chRows = CHAPTERS.map(ch => {
    const s = Storage.getChapterStats(ch.id);
    return `<tr>
      <td>${ch.shortName}</td>
      <td>${s.correct}/${s.total}</td>
      <td style="color:${s.total ? pctColor(s.pct) : 'var(--muted)'}">${s.total ? s.pct + '%' : '—'}</td>
    </tr>`;
  }).join('');

  document.getElementById('dash-chapter-table').innerHTML = `
    <table class="breakdown-table">
      <thead><tr><th>Chapter</th><th>Correct</th><th>Accuracy</th></tr></thead>
      <tbody>${chRows}</tbody>
    </table>`;

  document.getElementById('dash-history').innerHTML = data.examHistory.length
    ? data.examHistory.map(e => `
      <div class="history-item">
        <div>
          <strong>${e.date}</strong>
          <span class="text-muted text-sm"> · ${e.mode.charAt(0).toUpperCase() + e.mode.slice(1)} Exam · ${e.score}/${e.total}</span>
        </div>
        <span class="badge ${e.pass ? 'badge-pass' : 'badge-fail'}">${e.pct}%</span>
      </div>`).join('')
    : '<div class="text-muted">No exams taken yet.</div>';
}

window.clearProgress = function() {
  if (confirm('Clear ALL progress? This cannot be undone.')) {
    Storage.clearAllProgress();
    renderDashboard();
    renderHome();
  }
};

// ── UTILS ──────────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Randomize option order so the correct answer is never in a predictable slot.
function shuffleOptions(q) {
  const order = shuffle(q.opts.map((_, i) => i));
  return { ...q, opts: order.map(i => q.opts[i]), correct: order.indexOf(q.correct) };
}

// ── INIT ───────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => showScreen('home'));

window.showScreen = showScreen;
window.renderExamHome = renderExamHome;   // referenced by the "New Exam" button

})();
