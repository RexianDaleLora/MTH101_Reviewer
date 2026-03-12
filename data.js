/* ============================================================
   data.js  —  Final Exam Reviewer
   Contains:
     - PAL     : color palette per category
     - CAT()   : helper to get topic category
     - CATL()  : helper to get category label
     - T[]     : all 15 topic objects (content blocks, graph key, key facts)
     - Q{}     : all quiz questions for test1, test2, test3
   ============================================================ */


/* ── CATEGORY COLOR PALETTE ───────────────────────────────── */

const PAL = {
  algebra:  { bg: '#ddeeff', border: '#b3d4f5', text: '#1d52a8', dot: '#3b82f6' },
  conic:    { bg: '#ede9fe', border: '#c4b5fd', text: '#6d28d9', dot: '#8b5cf6' },
  calculus: { bg: '#d1fae5', border: '#6ee7b7', text: '#047857', dot: '#10b981' },
};

const CAT  = id => id <= 7 ? 'algebra' : id <= 9 ? 'conic' : 'calculus';
const CATL = c  => c === 'algebra' ? 'Algebra' : c === 'conic' ? 'Conic Sections' : 'Calculus';


/* ── TOPIC DATA ───────────────────────────────────────────── */
/*
   Each topic object has:
     id      : number (1–15)
     title   : string
     icon    : short symbol shown in badge
     intro   : one-sentence description (HTML allowed)
     blocks  : array of content blocks — see block types below
     graph   : string key passed to drawGraph() in graphs.js, or null
     facts   : array of 3 key-fact strings

   Block types:
     { t:'rule',    h:'Heading', b:'Body HTML' }
     { t:'formula', f:'Formula string' }
     { t:'ex',      lbl:'Label', txt:'Monospace text (pre-line)' }
*/

const T = [

  /* ── 1. INEQUALITY ─────────────────────────────────────── */
  {
    id: 1, title: 'Inequality', icon: '≤',
    intro: 'An inequality compares two expressions using &lt;, &gt;, ≤, ≥, or ≠. The solution is a <em>range</em> of values rather than a single answer.',
    blocks: [
      { t: 'rule', h: 'Types of Inequalities',
        b: 'A <b>linear inequality</b> looks like ax + b &lt; c. A <b>compound inequality</b> has two conditions — <b>AND</b> (a &lt; x &lt; b) or <b>OR</b> (x &lt; a or x &gt; b).' },
      { t: 'formula', f: 'ax + b  <  c       (linear inequality)' },
      { t: 'rule', h: 'Solving Rules',
        b: '<b>1.</b> Add or subtract any value to both sides freely.<br><b>2.</b> Multiply/divide by a <b>positive</b> number → sign stays the same.<br><b>3.</b> Multiply/divide by a <b>negative</b> number → <b>FLIP the sign!</b>' },
      { t: 'ex', lbl: 'Worked Example',
        txt: 'Solve:  2x − 3 > 7\n→  2x > 10\n→  x > 5\nSolution: (5, ∞)' },
      { t: 'rule', h: 'Interval Notation',
        b: '<b>( )</b> = open — endpoint NOT included<br><b>[ ]</b> = closed — endpoint IS included' },
    ],
    graph: 'inequality',
    facts: [
      'Flip the inequality sign when multiplying or dividing by a NEGATIVE',
      'Open circle ○ for strict < or >; closed ● for ≤ or ≥',
      'Graph the solution on a number line with correct endpoint symbols',
    ],
  },

  /* ── 2. ABSOLUTE VALUE EQUATION ────────────────────────── */
  {
    id: 2, title: 'Absolute Value Equation', icon: '|x|',
    intro: 'Absolute value |x| is the distance of x from zero — always non-negative. Equations split into two cases.',
    blocks: [
      { t: 'rule', h: 'Definition',
        b: '|x| = x if x ≥ 0 &nbsp;|&nbsp; |x| = −x if x &lt; 0. Think of it as "remove the sign."' },
      { t: 'rule', h: 'Solving |ax + b| = c',
        b: '• c &lt; 0 → <b>No Solution</b><br>• c = 0 → one solution: ax + b = 0<br>• c &gt; 0 → two cases: ax + b = c &nbsp;<b>OR</b>&nbsp; ax + b = −c' },
      { t: 'ex', lbl: 'Worked Example',
        txt: 'Solve:  |2x − 1| = 5\nCase 1:  2x − 1 = 5   →  x = 3\nCase 2:  2x − 1 = −5  →  x = −2\n\nAnswer:  x = 3  or  x = −2' },
      { t: 'formula', f: '|x| < a  →  −a < x < a       (AND, between)' },
      { t: 'formula', f: '|x| > a  →  x < −a  or  x > a  (OR, outside)' },
    ],
    graph: 'absolute',
    facts: [
      '|x| is ALWAYS ≥ 0 — never negative',
      'Split into two equations: one positive, one negative',
      'No solution when the right side is a negative number',
    ],
  },

  /* ── 3. PLOTTING OF POINTS ──────────────────────────────── */
  {
    id: 3, title: 'Plotting of Points', icon: '(x,y)',
    intro: 'Every point in the plane is given by an ordered pair (x, y). x measures horizontal position; y measures vertical position.',
    blocks: [
      { t: 'rule', h: 'The Four Quadrants',
        b: '• <b>Q I:</b>   (+, +)  right &amp; up<br>• <b>Q II:</b>  (−, +)  left &amp; up<br>• <b>Q III:</b> (−, −)  left &amp; down<br>• <b>Q IV:</b>  (+, −)  right &amp; down' },
      { t: 'ex', lbl: 'Plotting (3, −2)',
        txt: 'Start at origin (0, 0)\nMove 3 units RIGHT → position (3, 0)\nMove 2 units DOWN  → position (3, −2)  ✓' },
      { t: 'formula', f: 'Distance:  d = √[(x₂−x₁)² + (y₂−y₁)²]' },
      { t: 'formula', f: 'Midpoint:  M = ( (x₁+x₂)/2 , (y₁+y₂)/2 )' },
    ],
    graph: 'points',
    facts: [
      'Always write as (x, y) — horizontal coordinate first',
      'x: left/right  |  y: up/down',
      'The origin (0, 0) is where both axes intersect',
    ],
  },

  /* ── 4. INTERCEPTS ──────────────────────────────────────── */
  {
    id: 4, title: 'Intercepts', icon: '∩',
    intro: 'Intercepts are where a graph crosses the axes. They are the quickest points to calculate for sketching a line.',
    blocks: [
      { t: 'rule', h: 'How to Find Intercepts',
        b: '<b>x-intercept:</b> Set y = 0, solve for x → write as (x, 0)<br><br><b>y-intercept:</b> Set x = 0, solve for y → write as (0, y)' },
      { t: 'ex', lbl: 'Example: 2x + 3y = 6',
        txt: 'x-intercept: y=0 → 2x=6 → x=3 → (3, 0)\ny-intercept: x=0 → 3y=6 → y=2 → (0, 2)' },
      { t: 'rule', h: 'Quick Graphing Tip',
        b: 'The two intercepts give you two distinct points — that is all you need to draw the entire line!' },
    ],
    graph: 'intercepts',
    facts: [
      'x-intercept: substitute y = 0 and solve',
      'y-intercept: substitute x = 0 and solve',
      'Two points are enough to define any unique line',
    ],
  },

  /* ── 5. FUNCTION ────────────────────────────────────────── */
  {
    id: 5, title: 'Function', icon: 'f(x)',
    intro: 'A function assigns exactly one output to every input. This is the key property that separates functions from ordinary relations.',
    blocks: [
      { t: 'rule', h: 'Vertical Line Test',
        b: 'Draw a vertical line anywhere on the graph. If it crosses more than once → <b>NOT a function</b>.' },
      { t: 'formula', f: 'f(x) = 3x + 2   →   f(4) = 3(4) + 2 = 14' },
      { t: 'rule', h: 'Common Types',
        b: '• <b>Linear:</b>    f(x) = mx + b (straight line)<br>• <b>Quadratic:</b> f(x) = ax² + bx + c (parabola)<br>• <b>Absolute:</b>  f(x) = |x| (V-shape)<br>• <b>Rational:</b>  f(x) = 1/x (hyperbola)' },
    ],
    graph: 'function',
    facts: [
      'Each x must map to exactly ONE y — no exceptions',
      'Use the Vertical Line Test to check graphs',
      'f(x) notation means "evaluate the function at x"',
    ],
  },

  /* ── 6. SLOPE OF A LINE ─────────────────────────────────── */
  {
    id: 6, title: 'Slope of a Line', icon: 'm',
    intro: 'Slope measures how steeply a line rises or falls. It tells you exactly how much y changes for every 1-unit increase in x.',
    blocks: [
      { t: 'formula', f: 'm  =  (y₂ − y₁) / (x₂ − x₁)  =  rise / run' },
      { t: 'rule', h: 'Four Types',
        b: '• <b>m &gt; 0</b> — rises left to right ↗<br>• <b>m &lt; 0</b> — falls left to right ↘<br>• <b>m = 0</b> — horizontal line →<br>• <b>m undefined</b> — vertical line ↑' },
      { t: 'ex', lbl: 'Example',
        txt: 'Points (1, 2) and (4, 8):\nm = (8−2)/(4−1) = 6/3 = 2' },
      { t: 'rule', h: 'Special Relationships',
        b: '<b>Parallel lines:</b> m₁ = m₂<br><b>Perpendicular lines:</b> m₁ × m₂ = −1' },
    ],
    graph: 'slope',
    facts: [
      'm = rise/run = Δy/Δx',
      'Bigger |m| = steeper line',
      'Perpendicular slopes are negative reciprocals (product = −1)',
    ],
  },

  /* ── 7. SLOPE-INTERCEPT FORM ────────────────────────────── */
  {
    id: 7, title: 'Slope-Intercept Form', icon: 'y=mx+b',
    intro: 'Slope-intercept form makes graphing a line immediate — you can read the slope and starting point directly from the equation.',
    blocks: [
      { t: 'formula', f: 'y  =  mx + b' },
      { t: 'rule', h: 'Reading the Equation',
        b: '<b>m</b> = slope (steepness &amp; direction)<br><b>b</b> = y-intercept (where line crosses y-axis)' },
      { t: 'ex', lbl: 'Graphing y = 2x + 3',
        txt: '1. Plot b = 3 on the y-axis → point (0, 3)\n2. Use slope m = 2: go up 2, right 1 → (1, 5)\n3. Draw the line through both points.' },
      { t: 'rule', h: 'Converting from Ax + By = C',
        b: 'Isolate y on the left side by moving all other terms.' },
      { t: 'ex', lbl: 'Conversion Example',
        txt: '4x − 2y = 8\n−2y = −4x + 8\ny = 2x − 4     →  m = 2,  b = −4' },
      { t: 'formula', f: 'Point-Slope Form:  y − y₁ = m(x − x₁)' },
    ],
    graph: 'slopeform',
    facts: [
      'y = mx + b — m is slope, b is y-intercept',
      'Plot b first, then use slope to find a second point',
      'Point-slope is useful when you know slope + one point',
    ],
  },

  /* ── 8. PARABOLA ────────────────────────────────────────── */
  {
    id: 8, title: 'Parabola: Vertex & Latus Rectum', icon: '∪',
    intro: 'A parabola is the U-shaped curve of a quadratic equation. The vertex is its turning point; the latus rectum gives the width at the focus.',
    blocks: [
      { t: 'formula', f: 'Vertex Form:   y = a(x − h)² + k' },
      { t: 'rule', h: 'Vertex',
        b: 'The vertex is <b>(h, k)</b>. Opens <b>up</b> when a &gt; 0; opens <b>down</b> when a &lt; 0.' },
      { t: 'formula', f: 'From y = ax²+bx+c:  h = −b/(2a),   k = f(h)' },
      { t: 'rule', h: 'Latus Rectum',
        b: 'Length = <b>|4p|</b> where p = 1/(4a). It passes through the focus, perpendicular to the axis of symmetry.' },
      { t: 'ex', lbl: 'Full Example',
        txt: 'y = x² − 4x + 3     (a=1, b=−4, c=3)\n\nh = −(−4)/(2×1) = 2\nk = 4 − 8 + 3 = −1\nVertex: (2, −1)\n\np = 1/(4×1) = 1/4\nLatus Rectum = |4p| = 1' },
    ],
    graph: 'parabola',
    facts: [
      'Vertex: h = −b/(2a), then k = f(h)',
      'Latus Rectum length = |4p| = |1/a|',
      'Axis of symmetry is the vertical line x = h',
    ],
  },

  /* ── 9. EQUATION OF A CIRCLE ────────────────────────────── */
  {
    id: 9, title: 'Equation of a Circle', icon: '○',
    intro: 'A circle is all points exactly r units from center (h, k). The equation is a direct expression of this distance definition.',
    blocks: [
      { t: 'formula', f: '(x − h)² + (y − k)²  =  r²' },
      { t: 'ex', lbl: 'Reading Standard Form',
        txt: '(x − 3)² + (y + 2)² = 25\n→ Center: (3, −2)    [note the sign flip!]\n→ r² = 25   →   r = 5' },
      { t: 'rule', h: 'Converting from General Form',
        b: 'x² + y² + Dx + Ey + F = 0<br>Group x-terms, group y-terms, then <b>complete the square</b> for each.' },
      { t: 'ex', lbl: 'Completing the Square',
        txt: 'x² + y² − 6x + 4y − 3 = 0\n(x²−6x+9) + (y²+4y+4) = 3+9+4\n(x−3)² + (y+2)² = 16\n→ Center (3,−2),  r = 4' },
    ],
    graph: 'circle',
    facts: [
      'Standard form: (x−h)²+(y−k)²=r²',
      'Watch signs! (x+2)² means h = −2',
      'Complete the square to convert from general form',
    ],
  },

  /* ── 10. DOMAIN ─────────────────────────────────────────── */
  {
    id: 10, title: 'Domain of a Function', icon: 'Dom(f)',
    intro: 'The domain is every x-value a function can legally accept. Certain inputs are forbidden — knowing the rules lets you find it systematically.',
    blocks: [
      { t: 'rule', h: 'The Three Restrictions',
        b: '<b>1. Denominators ≠ 0</b> — division by zero is undefined<br><b>2. Square roots:</b> expression inside must be ≥ 0<br><b>3. Logarithms:</b> argument must be &gt; 0<br><br><b>Polynomials:</b> no restrictions → domain is (−∞, ∞)' },
      { t: 'ex', lbl: 'Example 1 — Rational',
        txt: 'f(x) = 1/(x−3)\nx−3 ≠ 0  →  x ≠ 3\nDomain:  (−∞, 3) ∪ (3, ∞)' },
      { t: 'ex', lbl: 'Example 2 — Square Root',
        txt: 'f(x) = √(2x−4)\n2x−4 ≥ 0  →  x ≥ 2\nDomain:  [2, ∞)' },
      { t: 'ex', lbl: 'Example 3 — Combined',
        txt: 'f(x) = √x / (x−1)\nx ≥ 0  AND  x ≠ 1\nDomain:  [0, 1) ∪ (1, ∞)' },
    ],
    graph: 'domain',
    facts: [
      'Denominator = 0 is forbidden — exclude those x-values',
      'Radicand (inside √) must be ≥ 0',
      'Polynomial: domain is always all real numbers',
    ],
  },

  /* ── 11. OPERATIONS OF FUNCTIONS ───────────────────────── */
  {
    id: 11, title: 'Operations of Functions', icon: 'f∘g',
    intro: 'Functions can be added, subtracted, multiplied, divided, or composed — where one function feeds directly into another.',
    blocks: [
      { t: 'formula', f: '(f + g)(x) = f(x) + g(x)' },
      { t: 'formula', f: '(f − g)(x) = f(x) − g(x)' },
      { t: 'formula', f: '(f · g)(x) = f(x) · g(x)' },
      { t: 'formula', f: '(f / g)(x) = f(x)/g(x),   g(x) ≠ 0' },
      { t: 'formula', f: '(f ∘ g)(x) = f(g(x))       ← composition' },
      { t: 'ex', lbl: 'Example:  f(x) = x²+1,  g(x) = 2x−3',
        txt: '(f+g)(x) = x² + 2x − 2\n(f·g)(x) = (x²+1)(2x−3) = 2x³−3x²+2x−3\n\nComposition (f∘g)(2):\ng(2) = 2(2)−3 = 1\nf(1) = 1²+1 = 2' },
      { t: 'rule', h: '⚠ Important Note',
        b: 'f ∘ g ≠ g ∘ f in general. Composition is <b>not commutative!</b>' },
    ],
    graph: null,
    facts: [
      '(f∘g)(x) = f(g(x)) — apply g FIRST, then f',
      'For f/g, exclude x where g(x) = 0 from the domain',
      'Composition order matters — switching gives different results',
    ],
  },

  /* ── 12. LIMIT THEOREM ──────────────────────────────────── */
  {
    id: 12, title: 'Limit Theorem', icon: 'lim',
    intro: 'A limit describes what value a function approaches as x gets arbitrarily close to a target — not what it actually equals there.',
    blocks: [
      { t: 'formula', f: 'lim[x→a] f(x) = L' },
      { t: 'rule', h: 'Basic Limit Laws',
        b: '<b>1.</b> lim c = c<br><b>2.</b> lim x = a<br><b>3.</b> lim[f±g] = L±M<br><b>4.</b> lim[f·g] = L·M<br><b>5.</b> lim[f/g] = L/M, &nbsp;M≠0<br><b>6.</b> lim[f(x)ⁿ] = Lⁿ' },
      { t: 'rule', h: '0/0 Indeterminate Form',
        b: 'When substitution gives 0/0, <b>factor</b> to cancel the common term, then substitute.' },
      { t: 'ex', lbl: 'Factoring Example',
        txt: 'lim[x→2] (x²−4)/(x−2)\n= lim (x+2)(x−2)/(x−2)\n= lim (x+2)\n= 4' },
      { t: 'rule', h: 'One-Sided Limits',
        b: '<b>lim[x→a⁺]</b> — approach from the right<br><b>lim[x→a⁻]</b> — approach from the left<br><br>Two-sided limit exists <b>only if</b> both sides are equal.' },
    ],
    graph: 'limit',
    facts: [
      'Try direct substitution first',
      'Factor to cancel 0/0 indeterminate forms',
      'Limit exists only when left limit = right limit',
    ],
  },

  /* ── 13. GRAPH OF LIMITS ────────────────────────────────── */
  {
    id: 13, title: 'Graph of Limits', icon: '→',
    intro: 'A graph shows limits, function values, and discontinuities visually — no algebra needed.',
    blocks: [
      { t: 'rule', h: 'Reading the Graph',
        b: '<b>●</b> Solid dot — function IS defined at that point<br><b>○</b> Open circle — function is NOT defined (hole)<br><br>The <b>limit</b> is about approach — NOT the value f(a).' },
      { t: 'rule', h: 'Types of Discontinuity',
        b: '• <b>Removable (hole):</b> Both one-sided limits agree, f(a) differs → limit exists<br>• <b>Jump:</b> Left limit ≠ right limit → limit DNE<br>• <b>Infinite:</b> f(x) → ±∞ → vertical asymptote' },
      { t: 'ex', lbl: 'Reading a Graph',
        txt: 'Open circle ○ at (2, 5), solid dot ● at (2, 3):\n\nlim[x→2] f(x) = 5   ← value approached\nf(2) = 3             ← actual value\n→ Removable discontinuity at x = 2' },
      { t: 'formula', f: 'lim[x→∞] (1/x) = 0     (horizontal asymptote)' },
    ],
    graph: 'graphlimits',
    facts: [
      'The LIMIT is the approached value — not f(a)',
      'Open circle = hole = removable discontinuity',
      'If left ≠ right, the two-sided limit Does Not Exist (DNE)',
    ],
  },

  /* ── 14. DIFFERENTIATION RULES ─────────────────────────── */
  {
    id: 14, title: 'Differentiation Rules', icon: 'd/dx',
    intro: "Differentiation finds the derivative — the function's instantaneous rate of change at any point. Master these rules to differentiate any algebraic expression.",
    blocks: [
      { t: 'formula', f: "Constant:     d/dx[c]    = 0" },
      { t: 'formula', f: "Power:        d/dx[xⁿ]   = n·xⁿ⁻¹" },
      { t: 'formula', f: "Const. Mult:  d/dx[cf]   = c·f'(x)" },
      { t: 'formula', f: "Sum/Diff:     d/dx[f±g]  = f' ± g'" },
      { t: 'formula', f: "Product:      d/dx[f·g]  = f'g + fg'" },
      { t: 'formula', f: "Quotient:     d/dx[f/g]  = (f'g − fg') / g²" },
      { t: 'formula', f: "Chain:        d/dx[f(g)] = f'(g(x)) · g'(x)" },
      { t: 'ex', lbl: 'Examples',
        txt: "f(x) = 5x³         →  f'(x) = 15x²\nf(x) = (3x+1)⁵     →  f'(x) = 5(3x+1)⁴·3 = 15(3x+1)⁴\nf(x) = x²·(x+1)    →  f'(x) = 2x(x+1) + x²" },
    ],
    graph: null,
    facts: [
      "Power Rule: bring exponent down, reduce it by 1",
      "Product Rule: f'g + fg'",
      "Chain Rule: derivative of OUTER × derivative of INNER",
    ],
  },

  /* ── 15. VELOCITY PROBLEMS ──────────────────────────────── */
  {
    id: 15, title: 'Average & Instantaneous Velocity', icon: 'v(t)',
    intro: 'Velocity problems apply derivatives to real motion. Average velocity covers an interval; instantaneous velocity is the derivative at a single moment.',
    blocks: [
      { t: 'formula', f: 'Avg. Velocity  =  [s(t₂) − s(t₁)] / (t₂ − t₁)' },
      { t: 'formula', f: "Inst. Velocity =  v(t) = s'(t)" },
      { t: 'formula', f: "Acceleration   =  a(t) = v'(t) = s''(t)" },
      { t: 'ex', lbl: 'Full Problem',
        txt: 's(t) = t² − 3t + 2  (meters, t in seconds)\n\nAvg. velocity  t=1 to t=3:\n  s(1) = 1−3+2 = 0\n  s(3) = 9−9+2 = 2\n  v_avg = (2−0)/(3−1) = 1 m/s\n\nInst. velocity at t=2:\n  v(t) = 2t − 3\n  v(2) = 2(2)−3 = 1 m/s' },
      { t: 'rule', h: 'Key Facts',
        b: '• Object at rest: v(t) = 0<br>• Max/min height: v(t) = 0<br>• Constant velocity: a(t) = 0' },
    ],
    graph: 'velocity',
    facts: [
      'Average velocity = Δs / Δt over an interval',
      "Instantaneous velocity = s'(t) (derivative of position)",
      'To find max height, set v(t) = 0 and solve for t',
    ],
  },

]; // end T[]


/* ── QUIZ QUESTIONS ───────────────────────────────────────── */
/*
   Each question object has:
     q     : question text (pre-line whitespace preserved)
     a     : full answer text
     hint  : optional hint string
     rule  : optional rule label (Test II only)
*/

const Q = {

  /* Test I — Short Response (15 items) */
  test1: [
    { q: 'Solve: 3x − 7 > 8',
      a: 'x > 5\n(3x > 15  →  x > 5)',
      hint: 'Add 7 to both sides, then divide by 3.' },
    { q: 'Solve: |2x + 1| = 9',
      a: 'x = 4  or  x = −5\nCase 1: 2x+1=9 → x=4\nCase 2: 2x+1=−9 → x=−5',
      hint: 'Split into two equations: one equals 9, one equals −9.' },
    { q: 'In which quadrant is the point (−3, 5)?',
      a: 'Quadrant II\n(negative x, positive y → top-left)',
      hint: 'Recall the sign pattern for each quadrant: (−, +) is Q II.' },
    { q: 'Find the x-intercept of 3x − 2y = 12.',
      a: '(4, 0)\nSet y=0:  3x=12  →  x=4',
      hint: 'Set y = 0 and solve for x.' },
    { q: 'Is y² = x a function? Why or why not?',
      a: 'NO — not a function.\nFor x=4, y=±2 (two outputs for one input).\nFails the Vertical Line Test.',
      hint: 'Can one x-value produce two y-values?' },
    { q: 'Find the slope through (2, 5) and (6, 13).',
      a: 'm = 2\nm = (13−5)/(6−2) = 8/4 = 2',
      hint: 'Use m = (y₂−y₁)/(x₂−x₁).' },
    { q: 'Write the equation: slope 3, y-intercept −4.',
      a: 'y = 3x − 4',
      hint: 'Use y = mx + b.' },
    { q: 'Find the vertex of y = 2(x − 3)² + 1.',
      a: 'Vertex: (3, 1)\nVertex form y=a(x−h)²+k → vertex is (h, k)',
      hint: 'In vertex form y=a(x−h)²+k, the vertex is directly (h, k).' },
    { q: 'Center and radius of (x+2)² + (y−5)² = 36?',
      a: 'Center: (−2, 5),  r = 6',
      hint: 'Compare with (x−h)²+(y−k)²=r². Watch the signs!' },
    { q: 'Domain of f(x) = √(x − 4)?',
      a: '[4, ∞)\nx−4 ≥ 0  →  x ≥ 4',
      hint: 'The radicand must be ≥ 0.' },
    { q: 'f(x) = x+1, g(x) = 2x. Find (f∘g)(3).',
      a: '7\ng(3)=6 → f(6)=6+1=7',
      hint: 'Apply g first, then feed the result into f.' },
    { q: 'Evaluate: lim[x→3] (x²−9)/(x−3)',
      a: '6\nFactor: (x+3)(x−3)/(x−3)  →  lim(x+3) = 6',
      hint: 'Factor x²−9 as a difference of squares.' },
    { q: 'Graph has open circle at x=2, y=5, and f(2)=3. What is lim[x→2] f(x)?',
      a: 'lim[x→2] f(x) = 5\n(The limit is the approached value, not f(2)=3.)',
      hint: 'The limit is about approach — not the actual function value.' },
    { q: "Find f'(x) if f(x) = 4x³ − 2x² + 7x.",
      a: "f'(x) = 12x² − 4x + 7",
      hint: 'Apply power rule term-by-term.' },
    { q: 's(t) = t² − 4t. Average velocity, t=1 to t=3?',
      a: '0 m/s\ns(1)=−3,  s(3)=−3\nv_avg=(−3−(−3))/(3−1)=0',
      hint: 'v_avg = [s(3)−s(1)] / (3−1).' },
  ],

  /* Test II — Finding Derivatives (10 items) */
  test2: [
    { q: 'f(x) = 7x⁴',                        a: "f'(x) = 28x³",                                                  rule: 'Power Rule' },
    { q: 'f(x) = 3x² − 5x + 8',               a: "f'(x) = 6x − 5",                                               rule: 'Sum/Diff + Power Rule' },
    { q: 'f(x) = (2x + 3)(x² − 1)',            a: "f'(x) = 2(x²−1) + (2x+3)(2x) = 6x²+6x−2",                    rule: 'Product Rule' },
    { q: 'f(x) = x³ / (x − 2)',                a: "f'(x) = [3x²(x−2) − x³] / (x−2)²\n= (2x³−6x²) / (x−2)²",    rule: 'Quotient Rule' },
    { q: 'f(x) = (5x − 1)⁶',                  a: "f'(x) = 6(5x−1)⁵ · 5 = 30(5x−1)⁵",                           rule: 'Chain Rule' },
    { q: 'f(x) = √(x² + 4)',                   a: "Rewrite: (x²+4)^(1/2)\nf'(x) = (1/2)(x²+4)^(−1/2)·2x = x/√(x²+4)", rule: 'Chain Rule' },
    { q: 'f(x) = 4x⁻²',                        a: "f'(x) = −8x⁻³ = −8/x³",                                        rule: 'Power Rule (negative exp)' },
    { q: 'f(x) = x² · (3x + 1)³',             a: "f'(x) = 2x(3x+1)³ + x²·9(3x+1)²",                             rule: 'Product + Chain Rule' },
    { q: 'f(x) = (x²+1) / (2x−1)',            a: "f'(x) = [2x(2x−1) − 2(x²+1)] / (2x−1)²\n= (2x²−2x−2) / (2x−1)²", rule: 'Quotient Rule' },
    { q: 'f(x) = 5(x³ − 2x)⁴',               a: "f'(x) = 20(x³−2x)³(3x²−2)",                                    rule: 'Chain Rule' },
  ],

  /* Test III — Problem Solving (2 items) */
  test3: [
    {
      q: `A ball is thrown upward. Height in feet:
s(t) = −16t² + 64t + 6   (t in seconds)

(a) Average velocity from t = 1 to t = 3.
(b) Instantaneous velocity at t = 2.
(c) When does the ball reach maximum height?`,
      a: `(a) s(1)=−16+64+6=54;  s(3)=−144+192+6=54
v_avg = (54−54)/(3−1) = 0 ft/s

(b) v(t) = s'(t) = −32t + 64
v(2) = −64+64 = 0 ft/s

(c) Set v(t)=0:  −32t+64=0  →  t = 2 seconds`,
      hint: 'Max height occurs when velocity = 0. Set v(t)=0 and solve.',
    },
    {
      q: `A car's position in meters:
s(t) = t³ − 6t² + 9t + 2   (t in seconds)

(a) Average velocity from t = 0 to t = 3.
(b) Instantaneous velocity at t = 1.
(c) Acceleration at t = 2.`,
      a: `(a) s(0)=2;  s(3)=27−54+27+2=2
v_avg = (2−2)/3 = 0 m/s

(b) v(t)=3t²−12t+9
v(1)=3−12+9=0 m/s

(c) a(t)=6t−12
a(2)=12−12=0 m/s²`,
      hint: 'Acceleration = second derivative of position: a(t) = v\'(t).',
    },
  ],

}; // end Q
