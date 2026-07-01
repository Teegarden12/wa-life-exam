// WA Life Insurance Exam Prep — Main App Logic

(function(){
'use strict';

// ── State ──────────────────────────────────────────────────────────
let currentScreen = 'home';
let quizState = null;
let examState = null;
let fcState = null;
let examTimerInterval = null;

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
}

// ── HOME ───────────────────────────────────────────────────────────
function renderHome() {
  const data = Storage.loadData();
  const totalQ = QUESTIONS.length;
  const totalAnswered = Object.values(data.chapterProgress).reduce((a, c) => a + c.total, 0);
  const totalCorrect = Object.values(data.chapterProgress).reduce((a, c) => a + c.correct, 0);
  const overall = totalAnswered ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  document.getElementById('home-stats').innerHTML = `
    <div class="stats-grid">
      <div class="stat-card"><div class="stat-value">${totalQ}</div><div class="stat-label">Total Questions</div></div>
      <div class="stat-card"><div class="stat-value">${FLASHCARDS.length}</div><div class="stat-label">Flashcards</div></div>
      <div class="stat-card"><div class="stat-value">${totalAnswered}</div><div class="stat-label">Answered</div></div>
      <div class="stat-card"><div class="stat-value">${overall}%</div><div class="stat-label">Overall Accuracy</div></div>
    </div>`;
}

// ── QUIZ ───────────────────────────────────────────────────────────
function renderQuizHome() {
  const container = document.getElementById('quiz-chapter-list');
  container.innerHTML = '<div class="chapter-grid">' +
    CHAPTERS.map(ch => {
      const qs = QUESTIONS.filter(q => q.ch === ch.id);
      const stats = Storage.getChapterStats(ch.id);
      return `
      <div class="chapter-card" onclick="startChapterQuiz(${ch.id})">
        <div class="chapter-name">${ch.name}</div>
        <div class="chapter-count">${qs.length} questions</div>
        <div class="progress-bar"><div class="progress-fill" style="width:${stats.pct}%"></div></div>
        <div class="progress-label">${stats.total ? stats.pct + '% accuracy (' + stats.total + ' answered)' : 'Not started'}</div>
      </div>`;
    }).join('') + '</div>';
}

window.startChapterQuiz = function(chId) {
  const qs = shuffle(QUESTIONS.filter(q => q.ch === chId));
  if (!qs.length) return;
  quizState = {
    questions: qs,
    index: 0,
    correct: 0,
    answered: false,
    chId
  };
  document.getElementById('quiz-chapter-list').style.display = 'none';
  document.getElementById('quiz-active').style.display = 'block';
  renderQuizQuestion();
};

function renderQuizQuestion() {
  const qs = quizState.questions;
  const idx = quizState.index;
  const q = qs[idx];

  document.getElementById('quiz-progress-text').textContent = `Question ${idx + 1} of ${qs.length}`;
  document.getElementById('quiz-question').textContent = q.q;

  const optContainer = document.getElementById('quiz-options');
  optContainer.innerHTML = q.opts.map((o, i) =>
    `<button class="option-btn" onclick="selectQuizAnswer(${i})">${String.fromCharCode(65+i)}. ${o}</button>`
  ).join('');

  document.getElementById('quiz-explanation').textContent = '';
  document.getElementById('quiz-explanation').classList.remove('show');
  document.getElementById('quiz-next').style.display = 'none';
  document.getElementById('quiz-finish').style.display = 'none';
  quizState.answered = false;
}

window.selectQuizAnswer = function(i) {
  if (quizState.answered) return;
  quizState.answered = true;
  const q = quizState.questions[quizState.index];
  const btns = document.querySelectorAll('#quiz-options .option-btn');

  btns.forEach(b => b.disabled = true);
  btns[q.correct].classList.add('correct');
  if (i !== q.correct) {
    btns[i].classList.add('incorrect');
  } else {
    quizState.correct++;
  }

  const exp = document.getElementById('quiz-explanation');
  exp.textContent = q.exp;
  exp.classList.add('show');

  const isLast = quizState.index >= quizState.questions.length - 1;
  document.getElementById('quiz-next').style.display = isLast ? 'none' : 'inline-flex';
  document.getElementById('quiz-finish').style.display = isLast ? 'inline-flex' : 'none';
};

window.nextQuizQuestion = function() {
  quizState.index++;
  renderQuizQuestion();
};

window.finishQuiz = function() {
  Storage.recordQuizResult(quizState.chId, quizState.correct, quizState.questions.length);
  const pct = Math.round((quizState.correct / quizState.questions.length) * 100);
  document.getElementById('quiz-active').innerHTML = `
    <div class="card text-center">
      <h2>Quiz Complete!</h2>
      <div class="result-score ${pct >= 70 ? 'pass' : 'fail'}">${pct}%</div>
      <div class="result-badge">${quizState.correct} / ${quizState.questions.length} correct</div>
      <div class="flex gap-2" style="justify-content:center; flex-wrap:wrap; margin-top:16px;">
        <button class="btn btn-primary" onclick="startChapterQuiz(${quizState.chId})">Retry Chapter</button>
        <button class="btn btn-outline" onclick="showScreen('quiz')">All Chapters</button>
      </div>
    </div>`;
};

window.exitQuiz = function() {
  document.getElementById('quiz-chapter-list').style.display = 'block';
  document.getElementById('quiz-active').style.display = 'none';
  renderQuizHome();
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
  let cards = chId ? FLASHCARDS.filter(c => c.ch === chId) : [...FLASHCARDS];
  cards = shuffle(cards);
  fcState = { cards, index: 0 };
  renderFlashcard();
};

function renderFlashcard() {
  const card = fcState.cards[fcState.index];
  if (!card) return;

  const chName = CHAPTERS.find(c => c.id === card.ch)?.shortName || '';
  document.getElementById('fc-card').className = 'flashcard';
  document.getElementById('fc-term').textContent = card.term;
  document.getElementById('fc-def').textContent = card.def;
  document.getElementById('fc-chapter-label').textContent = chName;
  document.getElementById('fc-counter').textContent = `${fcState.index + 1} / ${fcState.cards.length}`;
}

window.flipCard = function() {
  document.getElementById('fc-card').classList.toggle('flipped');
};

window.nextCard = function() {
  if (fcState.index < fcState.cards.length - 1) {
    fcState.index++;
    renderFlashcard();
  }
};

window.prevCard = function() {
  if (fcState.index > 0) {
    fcState.index--;
    renderFlashcard();
  }
};

// ── EXAM ───────────────────────────────────────────────────────────
function renderExamHome() {
  stopExamTimer();
  document.getElementById('exam-setup').style.display = 'block';
  document.getElementById('exam-active').style.display = 'none';
  document.getElementById('exam-results').style.display = 'none';
}

window.startExam = function(mode) {
  let count, minutes;
  if (mode === 'quick') { count = 25; minutes = 38; }
  else if (mode === 'half') { count = 50; minutes = 75; }
  else { count = 100; minutes = 150; }

  const qs = shuffle([...QUESTIONS]).slice(0, count);
  examState = {
    questions: qs,
    answers: new Array(count).fill(null),
    index: 0,
    mode,
    totalMinutes: minutes,
    secondsLeft: minutes * 60,
    startTime: Date.now()
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
  const m = Math.floor(s / 60);
  const sec = s % 60;
  const el = document.getElementById('exam-timer');
  el.textContent = `${m}:${sec.toString().padStart(2, '0')}`;
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

  // Flag counter
  const answered = examState.answers.filter(a => a !== null).length;
  document.getElementById('exam-answered-count').textContent = `${answered}/${total} answered`;
}

window.selectExamAnswer = function(i) {
  examState.answers[examState.index] = i;
  renderExamQuestion();
};

window.examPrev = function() {
  if (examState.index > 0) { examState.index--; renderExamQuestion(); }
};

window.examNext = function() {
  if (examState.index < examState.questions.length - 1) { examState.index++; renderExamQuestion(); }
};

window.submitExam = function(autoSubmit = false) {
  const unanswered = examState.answers.filter(a => a === null).length;
  if (!autoSubmit && unanswered > 0) {
    if (!confirm(`${unanswered} question(s) unanswered. Submit anyway?`)) return;
  }

  stopExamTimer();

  const qs = examState.questions;
  let correct = 0;
  const breakdown = {};

  CHAPTERS.forEach(c => { breakdown[c.id] = { name: c.shortName, correct: 0, total: 0 }; });

  qs.forEach((q, i) => {
    const isCorrect = examState.answers[i] === q.correct;
    if (isCorrect) correct++;
    breakdown[q.ch].total++;
    if (isCorrect) breakdown[q.ch].correct++;
  });

  const pct = Math.round((correct / qs.length) * 100);
  const pass = pct >= 70;
  const elapsed = Math.round((Date.now() - examState.startTime) / 1000);
  const mins = Math.floor(elapsed / 60), secs = elapsed % 60;

  const result = {
    date: new Date().toLocaleDateString(),
    score: correct,
    total: qs.length,
    pct,
    pass,
    mode: examState.mode,
    breakdown
  };

  Storage.recordExamResult(result);

  document.getElementById('exam-active').style.display = 'none';
  document.getElementById('exam-results').style.display = 'block';

  document.getElementById('exam-result-score').textContent = pct + '%';
  document.getElementById('exam-result-score').className = 'result-score ' + (pass ? 'pass' : 'fail');
  document.getElementById('exam-result-badge').innerHTML = `
    <span class="badge ${pass ? 'badge-pass' : 'badge-fail'}">${pass ? 'PASS ✓' : 'FAIL ✗'}</span>
    &nbsp; ${correct} / ${qs.length} correct &nbsp;·&nbsp; Time: ${mins}m ${secs}s`;

  const brkRows = CHAPTERS
    .filter(c => breakdown[c.id].total > 0)
    .map(c => {
      const b = breakdown[c.id];
      const bpct = b.total ? Math.round((b.correct / b.total) * 100) : 0;
      return `<tr>
        <td>${b.name}</td>
        <td>${b.correct}/${b.total}</td>
        <td style="color:${bpct >= 70 ? 'var(--green)' : 'var(--red)'}">${bpct}%</td>
      </tr>`;
    }).join('');

  document.getElementById('exam-breakdown').innerHTML = `
    <table class="breakdown-table">
      <thead><tr><th>Chapter</th><th>Score</th><th>%</th></tr></thead>
      <tbody>${brkRows}</tbody>
    </table>`;
};

// ── DASHBOARD ──────────────────────────────────────────────────────
function renderDashboard() {
  const data = Storage.loadData();

  const totalAnswered = Object.values(data.chapterProgress).reduce((a, c) => a + c.total, 0);
  const totalCorrect = Object.values(data.chapterProgress).reduce((a, c) => a + c.correct, 0);
  const overall = totalAnswered ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  const attempts = data.examHistory.length;
  const bestExam = data.examHistory.length ? Math.max(...data.examHistory.map(e => e.pct)) : 0;

  document.getElementById('dash-stats').innerHTML = `
    <div class="stats-grid">
      <div class="stat-card"><div class="stat-value">${totalAnswered}</div><div class="stat-label">Questions Answered</div></div>
      <div class="stat-card"><div class="stat-value">${overall}%</div><div class="stat-label">Overall Accuracy</div></div>
      <div class="stat-card"><div class="stat-value">${attempts}</div><div class="stat-label">Exams Taken</div></div>
      <div class="stat-card"><div class="stat-value">${bestExam}%</div><div class="stat-label">Best Exam Score</div></div>
    </div>`;

  // Chapter accuracy table
  const chRows = CHAPTERS.map(ch => {
    const s = Storage.getChapterStats(ch.id);
    const fill = s.pct;
    return `<tr>
      <td>${ch.shortName}</td>
      <td>${s.correct}/${s.total}</td>
      <td>
        <div class="progress-bar" style="width:120px">
          <div class="progress-fill" style="width:${fill}%;background:${fill >= 70 ? 'var(--green)' : fill >= 50 ? 'var(--yellow)' : 'var(--red)'}"></div>
        </div>
      </td>
      <td style="color:${fill >= 70 ? 'var(--green)' : fill >= 50 ? 'var(--yellow)' : 'var(--red)'}">${s.total ? fill + '%' : '—'}</td>
    </tr>`;
  }).join('');

  document.getElementById('dash-chapter-table').innerHTML = `
    <table class="breakdown-table">
      <thead><tr><th>Chapter</th><th>Correct</th><th>Progress</th><th>Accuracy</th></tr></thead>
      <tbody>${chRows}</tbody>
    </table>`;

  // Exam history
  const histHtml = data.examHistory.length ? data.examHistory.map(e => `
    <div class="history-item">
      <div>
        <strong>${e.date}</strong>
        <span class="text-muted text-sm"> · ${e.mode.charAt(0).toUpperCase() + e.mode.slice(1)} Exam · ${e.score}/${e.total}</span>
      </div>
      <span class="badge ${e.pass ? 'badge-pass' : 'badge-fail'}">${e.pct}%</span>
    </div>`) .join('') : '<div class="text-muted">No exams taken yet.</div>';

  document.getElementById('dash-history').innerHTML = histHtml;
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

// ── INIT ───────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  showScreen('home');
});

window.showScreen = showScreen;
window.startExam = window.startExam;

})();
