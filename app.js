/* ============================================================
   app.js  —  Final Exam Reviewer
   All UI logic, rendering, and interactivity.

   Sections:
     1. Content Block Renderer   (topic page content)
     2. Home Page                (topic grid, category filter)
     3. Topic Page               (render topic, aside panel)
     4. Quiz                     (render questions, scoring)
     5. Navigation               (page switching, sidebar state)
     6. Init                     (entry point)

   Dependencies (must load before this file):
     data.js   — T[], Q, PAL, CAT(), CATL()
     graphs.js — drawGraph()
   ============================================================ */


/* ══════════════════════════════════════════════════════════════
   1. CONTENT BLOCK RENDERER
   Converts a topic block object into an HTML string.
   Block types: 'rule' | 'formula' | 'ex'
══════════════════════════════════════════════════════════════ */

/**
 * buildBlock(block)
 * @param {object} block - a content block from T[i].blocks
 * @returns {string} HTML string
 */
function buildBlock(block) {
  switch (block.t) {
    case 'rule':
      return `<div class="rule-h">${block.h}</div>
              <div class="rule-b">${block.b}</div>`;

    case 'formula':
      return `<div class="formula">${block.f}</div>`;

    case 'ex':
      return `<div class="example">
                <div class="ex-lbl">${block.lbl || 'Example'}</div>
                ${block.txt}
              </div>`;

    default:
      return '';
  }
}


/* ══════════════════════════════════════════════════════════════
   2. HOME PAGE
══════════════════════════════════════════════════════════════ */

/**
 * renderGrid()
 * Builds and injects all topic cards into #tgrid.
 * Called once on init.
 */
function renderGrid() {
  const grid = document.getElementById('tgrid');
  grid.innerHTML = T.map(topic => {
    const cat   = CAT(topic.id);
    const color = PAL[cat];
    return `
      <button class="tcard" data-id="${topic.id}" onclick="goTopic(${topic.id})">
        <div class="tc-top">
          <div class="tc-num"
            style="background:${color.bg}; color:${color.text}; border:1.5px solid ${color.border}">
            ${topic.id}
          </div>
          <div class="tc-title">${topic.title}</div>
        </div>
        <div class="tc-desc">
          ${topic.intro.replace(/<[^>]+>/g, '').substring(0, 85)}…
        </div>
        <div class="tc-foot">
          ${topic.graph ? '📊 Graph · ' : ''}📖 View Notes →
        </div>
      </button>`;
  }).join('');
}

/**
 * filterCat(cat, btn)
 * Shows only topic cards matching the selected category.
 * @param {string} cat - 'all' | 'algebra' | 'conic' | 'calculus'
 * @param {HTMLElement} btn - the clicked tab button
 */
function filterCat(cat, btn) {
  // update active tab
  document.querySelectorAll('.ctab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // show/hide cards
  document.querySelectorAll('.tcard').forEach(card => {
    const id       = parseInt(card.dataset.id);
    const cardCat  = CAT(id);
    card.style.display = (cat === 'all' || cardCat === cat) ? '' : 'none';
  });
}


/* ══════════════════════════════════════════════════════════════
   3. TOPIC PAGE
══════════════════════════════════════════════════════════════ */

/**
 * goTopic(id)
 * Renders the full topic view for the given topic id.
 * Updates breadcrumb, main content, aside panel, and sidebar state.
 * @param {number} id - topic id (1–15)
 */
function goTopic(id) {
  const topic = T.find(x => x.id === id);
  const cat   = CAT(id);
  const color = PAL[cat];
  const prev  = T.find(x => x.id === id - 1);
  const next  = T.find(x => x.id === id + 1);

  // update breadcrumb
  document.getElementById('bc-cat').textContent   = CATL(cat);
  document.getElementById('bc-title').textContent = topic.title;

  // build graph HTML (or empty string)
  const graphHTML = topic.graph
    ? `<div class="graph-box">
         <div class="graph-lbl">📊 Visual Graph</div>
         ${drawGraph(topic.graph)}
       </div>`
    : '';

  // build prev/next navigation
  const prevBtn = prev
    ? `<button class="tnav-btn" onclick="goTopic(${prev.id})">
         <span class="tnav-lbl">← Previous</span>${prev.title}
       </button>`
    : '<div></div>';

  const nextBtn = next
    ? `<button class="tnav-btn fwd" onclick="goTopic(${next.id})">
         <span class="tnav-lbl">Next →</span>${next.title}
       </button>`
    : '';

  // inject main content
  document.getElementById('tmain').innerHTML = `
    <div class="t-badge"
      style="background:${color.bg}; color:${color.text}; border:1.5px solid ${color.border}">
      <b style="font-family:JetBrains Mono,monospace">${topic.icon}</b>
      Topic ${topic.id} · ${CATL(cat)}
    </div>

    <h2 class="t-h">${topic.title}</h2>
    <p class="t-intro">${topic.intro}</p>

    <div class="cl">📘 Explanation &amp; Examples</div>
    ${topic.blocks.map(buildBlock).join('')}

    ${graphHTML}

    <div class="tnav">
      ${prevBtn}
      ${nextBtn}
    </div>`;

  // inject aside panel
  document.getElementById('taside').innerHTML = buildAside(id, topic, color);

  // update sidebar & show page
  setActive('n' + id);
  showPage('pg-topic');
}

/**
 * buildAside(currentId, topic, color)
 * Builds the HTML for the right-hand aside panel:
 *   - Key facts card
 *   - Mini topic navigation list
 * @param {number} currentId
 * @param {object} topic
 * @param {object} color - PAL entry {bg, border, text, dot}
 * @returns {string} HTML string
 */
function buildAside(currentId, topic, color) {
  // key facts card
  const factsHTML = topic.facts.map(fact => `
    <div class="kf">
      <div class="kf-dot" style="background:${color.dot}"></div>
      <div class="kf-txt">${fact}</div>
    </div>`).join('');

  // mini topic navigation list
  const miniNavHTML = T.map(x => {
    const xColor   = PAL[CAT(x.id)];
    const isActive = x.id === currentId;
    const activeStyle = isActive
      ? `background:${xColor.bg}; color:${xColor.text}; font-weight:600`
      : '';
    return `
      <button class="mini-nav-item"
        onclick="goTopic(${x.id})"
        style="${activeStyle}"
        onmouseover="if(${x.id} !== ${currentId}) this.style.background='var(--bg)'"
        onmouseout="if(${x.id} !== ${currentId}) this.style.background='none'">
        <span style="font-size:11px; color:var(--muted);
          font-family:JetBrains Mono,monospace; min-width:18px">${x.id}</span>
        ${x.title}
      </button>`;
  }).join('');

  return `
    <div class="aside-box">
      <h4>🔑 Key Facts</h4>
      ${factsHTML}
    </div>
    <div class="aside-box">
      <h4>📋 All Topics</h4>
      ${miniNavHTML}
    </div>`;
}


/* ══════════════════════════════════════════════════════════════
   4. QUIZ
══════════════════════════════════════════════════════════════ */

/** Currently active test key: 'test1' | 'test2' | 'test3' */
let curTest = 'test1';

/**
 * Quiz state map.
 * Key: question index (number)
 * Value: { open, hinted, revealed, score }
 */
let quizState = {};

/**
 * getQuestionState(i)
 * Returns the state object for question i,
 * creating a default one if it doesn't exist yet.
 */
function getQuestionState(i) {
  if (!quizState[i]) {
    quizState[i] = { open: false, hinted: false, revealed: false, score: null };
  }
  return quizState[i];
}

/* ── Switching Tests ──────────────────────────────────────── */

/**
 * setTest(testKey, btn)
 * Switches to a different test section and re-renders the quiz.
 * @param {string} testKey - 'test1' | 'test2' | 'test3'
 * @param {HTMLElement} btn - the clicked tab button
 */
function setTest(testKey, btn) {
  curTest    = testKey;
  quizState  = {};

  document.querySelectorAll('.ttab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  document.getElementById('result-box').classList.remove('show');
  renderQuiz();
}

/* ── Rendering ────────────────────────────────────────────── */

/**
 * renderQuiz()
 * Builds and injects all question cards for the current test into #qlist.
 * Also resets the progress bar.
 */
function renderQuiz() {
  const questions = Q[curTest];

  // accent colour and label per test
  const tagColor = curTest === 'test1' ? 'var(--blue)'
                 : curTest === 'test2' ? 'var(--amber)'
                 : 'var(--green)';
  const tagLabel = curTest === 'test1' ? 'Short Response'
                 : curTest === 'test2' ? 'Find Derivative'
                 : 'Problem Solving';

  document.getElementById('qlist').innerHTML = questions.map((q, i) => {
    const s = getQuestionState(i);
    return buildQuestionCard(q, i, s, tagColor, tagLabel);
  }).join('');

  updateProgress();
}

/**
 * buildQuestionCard(q, i, s, tagColor, tagLabel)
 * Returns the HTML string for one question card.
 */
function buildQuestionCard(q, i, s, tagColor, tagLabel) {
  const ruleTag = q.rule
    ? `<span class="q-rtag">${q.rule}</span>` : '';

  const hintBtn = q.hint
    ? `<button class="qbtn btn-h" id="hbtn-${i}" onclick="toggleHint(${i})">
         ${s.hinted ? 'Hide Hint' : '💡 Hint'}
       </button>` : '';

  const markButtons = s.revealed ? `
    <span class="mark-sep">Mark:</span>
    <button class="qbtn btn-ok ${s.score === true  ? 'on' : ''}" onclick="markQuestion(${i}, true)">✓ Correct</button>
    <button class="qbtn btn-no ${s.score === false ? 'on' : ''}" onclick="markQuestion(${i}, false)">✗ Wrong</button>`
    : '';

  return `
    <div class="qcard ${s.open ? 'open' : ''} ${s.score === true ? 'correct' : s.score === false ? 'wrong' : ''}"
      id="qc-${i}">

      <div class="qcard-head" onclick="toggleOpen(${i})">
        <div style="display:flex; gap:12px; align-items:flex-start; flex:1">
          <div class="q-nbadge">${i + 1}</div>
          <div class="q-inner">
            <div class="q-tag" style="color:${tagColor}">${tagLabel}${ruleTag}</div>
            <div class="q-txt">${q.q}</div>
          </div>
        </div>
        <div class="q-chev">⌄</div>
      </div>

      <div class="qbody">
        <div class="qbody-pad">

          <div class="hint-strip ${s.hinted ? 'show' : ''}" id="hs-${i}">
            💡 ${q.hint || ''}
          </div>

          <div class="ans-strip ${s.revealed ? 'show' : ''}" id="as-${i}">
            <div class="ans-lbl">✓ Answer</div>
            <div class="ans-txt">${q.a}</div>
          </div>

          <div class="qbtn-row" id="btnrow-${i}">
            ${hintBtn}
            <button class="qbtn btn-r" id="rbtn-${i}" onclick="toggleReveal(${i})">
              ${s.revealed ? 'Hide Answer' : '👁 Show Answer'}
            </button>
            ${markButtons}
          </div>

        </div>
      </div>
    </div>`;
}

/* ── Question Interactions ────────────────────────────────── */

/**
 * toggleOpen(i)
 * Expands or collapses the question card body.
 */
function toggleOpen(i) {
  const s = getQuestionState(i);
  s.open  = !s.open;
  document.getElementById(`qc-${i}`).classList.toggle('open', s.open);
}

/**
 * toggleHint(i)
 * Shows or hides the hint strip for question i.
 */
function toggleHint(i) {
  const s   = getQuestionState(i);
  s.hinted  = !s.hinted;
  document.getElementById(`hs-${i}`).classList.toggle('show', s.hinted);

  const btn = document.getElementById(`hbtn-${i}`);
  if (btn) btn.textContent = s.hinted ? 'Hide Hint' : '💡 Hint';
}

/**
 * toggleReveal(i)
 * Shows or hides the answer strip for question i.
 * On first reveal, injects the Mark Correct/Wrong buttons.
 */
function toggleReveal(i) {
  const s    = getQuestionState(i);
  s.revealed = !s.revealed;

  document.getElementById(`as-${i}`).classList.toggle('show', s.revealed);

  const revealBtn = document.getElementById(`rbtn-${i}`);
  if (revealBtn) revealBtn.textContent = s.revealed ? 'Hide Answer' : '👁 Show Answer';

  // inject mark buttons on first reveal
  if (s.revealed) {
    const row = document.getElementById(`btnrow-${i}`);
    if (!row.querySelector('.btn-ok')) {
      const sep = document.createElement('span');
      sep.className   = 'mark-sep';
      sep.textContent = 'Mark:';

      const okBtn = document.createElement('button');
      okBtn.className   = 'qbtn btn-ok';
      okBtn.textContent = '✓ Correct';
      okBtn.onclick     = () => markQuestion(i, true);

      const noBtn = document.createElement('button');
      noBtn.className   = 'qbtn btn-no';
      noBtn.textContent = '✗ Wrong';
      noBtn.onclick     = () => markQuestion(i, false);

      row.append(sep, okBtn, noBtn);
    }
  }
}

/**
 * markQuestion(i, correct)
 * Toggles the correct/wrong score for question i.
 * Clicking the same button again clears the mark.
 * @param {number} i - question index
 * @param {boolean} correct
 */
function markQuestion(i, correct) {
  const s     = getQuestionState(i);
  s.score     = (s.score === correct) ? null : correct; // toggle off if same

  const card  = document.getElementById(`qc-${i}`);
  card.classList.remove('correct', 'wrong');
  if (s.score === true)  card.classList.add('correct');
  if (s.score === false) card.classList.add('wrong');

  card.querySelectorAll('.btn-ok').forEach(b => b.classList.toggle('on', s.score === true));
  card.querySelectorAll('.btn-no').forEach(b => b.classList.toggle('on', s.score === false));

  updateProgress();
  checkAllDone();
}

/* ── Progress & Results ───────────────────────────────────── */

/**
 * updateProgress()
 * Refreshes the progress text and fill bar based on current marks.
 */
function updateProgress() {
  const questions = Q[curTest];
  const marked    = Object.values(quizState).filter(s => s.score !== null).length;
  const correct   = Object.values(quizState).filter(s => s.score === true).length;
  const pct       = questions.length ? Math.round(marked / questions.length * 100) : 0;

  document.getElementById('prog-txt').textContent = marked > 0
    ? `${marked}/${questions.length} answered · ${correct} correct`
    : 'Expand a question, reveal the answer, and mark it to track your score.';

  document.getElementById('prog-fill').style.width = pct + '%';
}

/**
 * checkAllDone()
 * Shows the result banner when all questions have been marked.
 */
function checkAllDone() {
  const questions = Q[curTest];
  const marked    = Object.values(quizState).filter(s => s.score !== null).length;

  if (marked !== questions.length) return;

  const correct = Object.values(quizState).filter(s => s.score === true).length;
  const pct     = Math.round(correct / questions.length * 100);

  const message = pct >= 80 ? "🌟 Excellent! You're ready for the exam!"
                : pct >= 60 ? '📚 Good work! Review the topics you missed.'
                :             '💪 Keep at it — you\'ve got this!';

  document.getElementById('r-score').textContent = `${correct} / ${questions.length}  (${pct}%)`;
  document.getElementById('r-msg').textContent   = message;

  const box = document.getElementById('result-box');
  box.classList.add('show');
  box.scrollIntoView({ behavior: 'smooth' });
}


/* ══════════════════════════════════════════════════════════════
   5. NAVIGATION
══════════════════════════════════════════════════════════════ */

/**
 * showPage(pageId)
 * Hides all .page elements and shows the one with the given id.
 * Scrolls to the top of the window.
 * @param {string} pageId - 'pg-home' | 'pg-topic' | 'pg-quiz'
 */
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
  window.scrollTo(0, 0);
}

/**
 * setActive(navId)
 * Removes active state from all sidebar nav items
 * and sets it on the item with the given id.
 * @param {string} navId - e.g. 'nav-home', 'n1', 'n2', …
 */
function setActive(navId) {
  document.querySelectorAll('.ni').forEach(n => n.classList.remove('active'));
  const el = document.getElementById(navId);
  if (el) el.classList.add('active');
}

/**
 * goHome()
 * Navigates to the home/overview page.
 */
function goHome() {
  showPage('pg-home');
  setActive('nav-home');
}

/**
 * goQuiz()
 * Navigates to the quiz page, resetting state for a fresh attempt.
 */
function goQuiz() {
  quizState = {};
  showPage('pg-quiz');
  setActive('');   // no sidebar item highlighted for quiz
  renderQuiz();
}


/* ══════════════════════════════════════════════════════════════
   6. INIT
   Entry point — runs once the DOM is ready.
══════════════════════════════════════════════════════════════ */

renderGrid();
