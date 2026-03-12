/* ============================================================
   graphs.js  —  Final Exam Reviewer
   All SVG graph drawing functions.

   Public API (called from app.js):
     drawGraph(key)  →  returns an SVG string or ''

   Keys:
     'inequality' | 'absolute'  | 'points'     | 'intercepts' |
     'function'   | 'slope'     | 'slopeform'  | 'parabola'   |
     'circle'     | 'domain'    | 'limit'      | 'graphlimits'|
     'velocity'
   ============================================================ */


/* ── SHARED SVG HELPERS ───────────────────────────────────── */

/**
 * Wrap content in an <svg> with a given viewBox.
 * All graphs are responsive (width:100%).
 */
function mkSVG(viewBox, content) {
  return `<svg viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg"
    style="width:100%;height:auto;display:block">${content}</svg>`;
}

/** Draw x-axis and y-axis lines (no arrowheads, clean look). */
function axes(W, H, ox, oy) {
  return `
    <line x1="12" y1="${oy}" x2="${W - 8}" y2="${oy}" stroke="#c0b8a8" stroke-width="1.5"/>
    <line x1="${ox}" y1="${H - 8}" x2="${ox}" y2="10" stroke="#c0b8a8" stroke-width="1.5"/>`;
}

/** Small tick label in JetBrains Mono. */
function lbl(x, y, text, color = '#a8a098', fontSize = 9.5) {
  return `<text x="${x}" y="${y}" fill="${color}" font-size="${fontSize}"
    font-family="JetBrains Mono,monospace" text-anchor="middle">${text}</text>`;
}

/** Convert an array of [x, y] data points to an SVG path string. */
function buildPath(pts) {
  return pts.map(([px, py], i) => `${i === 0 ? 'M' : 'L'}${px},${py}`).join(' ');
}


/* ── GRAPH DISPATCHER ─────────────────────────────────────── */

/**
 * drawGraph(key)
 * Returns an SVG string for the requested graph, or '' if key is unknown.
 */
function drawGraph(key) {
  switch (key) {
    case 'inequality':  return graphInequality();
    case 'absolute':    return graphAbsolute();
    case 'points':      return graphPoints();
    case 'intercepts':  return graphIntercepts();
    case 'function':    return graphFunction();
    case 'slope':       return graphSlope();
    case 'slopeform':   return graphSlopeForm();
    case 'parabola':    return graphParabola();
    case 'circle':      return graphCircle();
    case 'domain':      return graphDomain();
    case 'limit':       return graphLimit();
    case 'graphlimits': return graphGraphLimits();
    case 'velocity':    return graphVelocity();
    default:            return '';
  }
}


/* ── INDIVIDUAL GRAPH FUNCTIONS ───────────────────────────── */

/** Topic 1 — Inequality number line: x > 1 */
function graphInequality() {
  let s = `<line x1="15" y1="40" x2="265" y2="40" stroke="#c0b8a8" stroke-width="1.5"/>`;

  // tick marks and labels for integers −2 … 8
  for (let i = 0; i <= 10; i++) {
    const n = i - 2;
    const x = 20 + i * 22;
    s += `<line x1="${x}" y1="36" x2="${x}" y2="44" stroke="#c0b8a8" stroke-width="1"/>`;
    s += lbl(x, 55, n);
  }

  // solution ray: open circle at x=1 (index 3), arrow to right
  const cx = 20 + 3 * 22; // x=1 maps to i=3
  s += `<line x1="${cx}" y1="40" x2="258" y2="40" stroke="#1d52a8" stroke-width="4"/>`;
  s += `<circle cx="${cx}" cy="40" r="7" fill="white" stroke="#1d52a8" stroke-width="2.5"/>`;
  s += `<polygon points="254,34 266,40 254,46" fill="#1d52a8"/>`;
  s += `<text x="${cx}" y="25" text-anchor="middle" fill="#1d52a8"
    font-size="12" font-weight="600" font-family="JetBrains Mono,monospace">x &gt; 1</text>`;

  return mkSVG('0 0 280 68', s);
}

/** Topic 2 — y = |x| V-shaped graph */
function graphAbsolute() {
  const W = 280, H = 150, ox = 140, oy = 110, sx = 18, sy = 12;
  let s = axes(W, H, ox, oy);

  // axis tick labels
  for (let i = -5; i <= 5; i++) if (i) s += lbl(ox + i * sx, oy + 13, i);

  // plot y = |x|
  const pts = [];
  for (let x = -5; x <= 5; x += 0.15) {
    pts.push([ox + x * sx, oy - Math.abs(x) * sy]);
  }
  s += `<path d="${buildPath(pts)}" fill="none" stroke="#1d52a8" stroke-width="2.5"/>`;
  s += `<text x="218" y="28" fill="#1d52a8" font-size="12" font-weight="600"
    font-family="JetBrains Mono,monospace">y = |x|</text>`;

  return mkSVG(`0 0 ${W} ${H}`, s);
}

/** Topic 3 — Four-quadrant coordinate plane with labeled points */
function graphPoints() {
  const W = 280, H = 150, ox = 140, oy = 78, sx = 20, sy = 16;
  let s = axes(W, H, ox, oy);

  // sample points: [x, y, color]
  const pts = [
    [-3,  2, '#1d52a8'],
    [ 2,  3, '#047857'],
    [ 3, -2, '#b45309'],
    [-2, -3, '#b91c1c'],
  ];
  pts.forEach(([x, y, c]) => {
    const px = ox + x * sx, py = oy - y * sy;
    s += `<circle cx="${px}" cy="${py}" r="6" fill="${c}"/>`;
    s += `<text x="${px + 8}" y="${py + 4}" fill="${c}"
      font-size="9.5" font-family="JetBrains Mono,monospace">(${x},${y})</text>`;
  });

  // quadrant labels
  [['Q I', 1.5, 1.5], ['Q II', -2.5, 1.5], ['Q III', -2.5, -1.5], ['Q IV', 2, -1.5]]
    .forEach(([l, x, y]) => s += lbl(ox + x * sx, oy - y * sy, l, '#d0c8b8', 9.5));

  return mkSVG(`0 0 ${W} ${H}`, s);
}

/** Topic 4 — Line 2x+3y=6 with x-intercept and y-intercept marked */
function graphIntercepts() {
  const W = 280, H = 150, ox = 60, oy = 105, sx = 35, sy = 22;
  let s = axes(W, H, ox, oy);

  // line from x=−0.3 to x=4
  const linePts = [[-0.3, 2.4], [0, 2], [3, 0], [4, -0.67]]
    .map(([x, y]) => [ox + x * sx, oy - y * sy]);
  s += `<path d="${buildPath(linePts)}" stroke="#1d52a8" stroke-width="2.5" fill="none"/>`;

  // x-intercept (3, 0)
  s += `<circle cx="${ox + 3 * sx}" cy="${oy}" r="7" fill="#b91c1c"/>`;
  s += `<text x="${ox + 3 * sx + 9}" y="${oy + 4}" fill="#b91c1c"
    font-size="10.5" font-weight="600" font-family="JetBrains Mono,monospace">(3,0) x-int</text>`;

  // y-intercept (0, 2)
  s += `<circle cx="${ox}" cy="${oy - 2 * sy}" r="7" fill="#047857"/>`;
  s += `<text x="${ox + 9}" y="${oy - 2 * sy + 4}" fill="#047857"
    font-size="10.5" font-weight="600" font-family="JetBrains Mono,monospace">(0,2) y-int</text>`;

  return mkSVG(`0 0 ${W} ${H}`, s);
}

/** Topic 5 — y = x²/4 − 1 parabola showing function shape */
function graphFunction() {
  const W = 280, H = 150, ox = 140, oy = 100, sx = 22, sy = 13;
  let s = axes(W, H, ox, oy);

  const pts = [];
  for (let x = -4; x <= 4; x += 0.1) {
    const py = oy - (x * x / 4 - 1) * sy;
    if (py > 8 && py < 145) pts.push([ox + x * sx, py]);
  }
  s += `<path d="${buildPath(pts)}" fill="none" stroke="#1d52a8" stroke-width="2.5"/>`;
  s += `<text x="220" y="22" fill="#1d52a8" font-size="11" font-weight="600"
    font-family="JetBrains Mono,monospace">y=x²/4−1</text>`;
  s += `<text x="${W / 2}" y="${H - 4}" text-anchor="middle" fill="#a8a098"
    font-size="9.5" font-family="DM Sans,sans-serif">✓ Passes Vertical Line Test</text>`;

  return mkSVG(`0 0 ${W} ${H}`, s);
}

/** Topic 6 — y = 2x + 1 with rise/run triangle */
function graphSlope() {
  const W = 280, H = 170, ox = 55, oy = 130, sx = 26, sy = 14;
  let s = axes(W, H, ox, oy);

  // line points
  const linePts = [[-1, -1], [0, 1], [1, 3], [2, 5], [3, 7], [4, 9], [5, 11]]
    .filter(([, y]) => y <= 10)
    .map(([x, y]) => [ox + x * sx, oy - y * sy]);
  s += `<path d="${buildPath(linePts)}" stroke="#1d52a8" stroke-width="2.5" fill="none"/>`;

  // rise/run dashes between (1,3) and (3,7)
  const [x1, y1] = [1, 3], [x2, y2] = [3, 7];
  const px1 = ox + x1 * sx, py1 = oy - y1 * sy;
  const px2 = ox + x2 * sx, py2 = oy - y2 * sy;

  s += `<line x1="${px1}" y1="${py1}" x2="${px2}" y2="${py1}"
    stroke="#b91c1c" stroke-width="1.5" stroke-dasharray="5,3"/>`;
  s += `<line x1="${px2}" y1="${py1}" x2="${px2}" y2="${py2}"
    stroke="#b45309" stroke-width="1.5" stroke-dasharray="5,3"/>`;

  s += `<text x="${(px1 + px2) / 2}" y="${py1 + 14}" text-anchor="middle"
    fill="#b91c1c" font-size="10" font-family="JetBrains Mono,monospace">run=2</text>`;
  s += `<text x="${px2 + 14}" y="${(py1 + py2) / 2 + 4}"
    fill="#b45309" font-size="10" font-family="JetBrains Mono,monospace">rise=4</text>`;

  s += `<text x="200" y="20" fill="#1d52a8" font-size="13" font-weight="700"
    font-family="JetBrains Mono,monospace">m = 2</text>`;

  return mkSVG(`0 0 ${W} ${H}`, s);
}

/** Topic 7 — y = 2x+3 with y-intercept highlighted */
function graphSlopeForm() {
  const W = 280, H = 150, ox = 80, oy = 120, sx = 26, sy = 16;
  let s = axes(W, H, ox, oy);

  const pts = [[-2, -1], [-1, 1], [0, 3], [1, 5], [2, 7]]
    .filter(([, y]) => y <= 7.2)
    .map(([x, y]) => [ox + x * sx, oy - y * sy]);
  s += `<path d="${buildPath(pts)}" stroke="#1d52a8" stroke-width="2.5" fill="none"/>`;

  // y-intercept dot
  s += `<circle cx="${ox}" cy="${oy - 3 * sy}" r="6" fill="#047857"/>`;
  s += `<text x="${ox + 8}" y="${oy - 3 * sy + 4}" fill="#047857"
    font-size="10.5" font-weight="600" font-family="JetBrains Mono,monospace">b=(0,3)</text>`;
  s += `<text x="185" y="20" fill="#a8a098" font-size="11"
    font-family="JetBrains Mono,monospace">y=2x+3</text>`;

  return mkSVG(`0 0 ${W} ${H}`, s);
}

/** Topic 8 — y = x²−4x+3 with vertex and latus rectum */
function graphParabola() {
  const W = 280, H = 160, ox = 110, oy = 130, sx = 26, sy = 16;
  let s = axes(W, H, ox, oy);

  // plot parabola
  const pts = [];
  for (let x = -0.5; x <= 5; x += 0.08) {
    const y = x * x - 4 * x + 3;
    if (y <= 7.5) pts.push([ox + x * sx, oy - y * sy]);
  }
  s += `<path d="${buildPath(pts)}" fill="none" stroke="#6d28d9" stroke-width="2.5"/>`;

  // axis of symmetry dashed line
  s += `<line x1="${ox + 2 * sx}" y1="8" x2="${ox + 2 * sx}" y2="${oy + 8}"
    stroke="#e5e1d8" stroke-width="1" stroke-dasharray="5,3"/>`;

  // vertex (2, −1)
  s += `<circle cx="${ox + 2 * sx}" cy="${oy + 1 * sy}" r="6" fill="#b45309"/>`;
  s += `<text x="${ox + 2 * sx + 8}" y="${oy + 1 * sy + 4}" fill="#b45309"
    font-size="10.5" font-weight="600" font-family="JetBrains Mono,monospace">V(2,−1)</text>`;

  // latus rectum segment (length 1 unit, centred on axis at y = focus)
  const lrY = oy + 0.75 * sy;
  s += `<line x1="${ox + 1.5 * sx}" y1="${lrY}" x2="${ox + 2.5 * sx}" y2="${lrY}"
    stroke="#1d52a8" stroke-width="2.5"/>`;
  s += `<text x="${ox + 3.2 * sx}" y="${lrY + 4}" fill="#1d52a8"
    font-size="9.5" font-family="DM Sans,sans-serif">L.R.</text>`;

  s += `<text x="18" y="20" fill="#a8a098" font-size="10.5"
    font-family="JetBrains Mono,monospace">y=x²−4x+3</text>`;

  return mkSVG(`0 0 ${W} ${H}`, s);
}

/** Topic 9 — Circle with center (1, −1) and radius 4 */
function graphCircle() {
  const W = 280, H = 200;
  const cx = 150, cy = 105, sc = 20;
  const h = 1, k = -1, r = 4;
  const px = cx + h * sc, py = cy - k * sc;

  let s = `<line x1="10" y1="${cy}" x2="${W - 10}" y2="${cy}" stroke="#c0b8a8" stroke-width="1.5"/>`;
  s += `<line x1="${cx}" y1="${H - 10}" x2="${cx}" y2="10" stroke="#c0b8a8" stroke-width="1.5"/>`;

  // filled circle
  s += `<circle cx="${px}" cy="${py}" r="${r * sc}" fill="#eff6ff" stroke="#1d52a8" stroke-width="2.5"/>`;
  // center dot
  s += `<circle cx="${px}" cy="${py}" r="4" fill="#1d52a8"/>`;
  s += `<text x="${px + 7}" y="${py - 7}" fill="#1d52a8" font-size="11" font-weight="600"
    font-family="JetBrains Mono,monospace">(${h},${k})</text>`;

  // radius dashed line
  s += `<line x1="${px}" y1="${py}" x2="${px + r * sc}" y2="${py}"
    stroke="#b45309" stroke-width="1.5" stroke-dasharray="5,3"/>`;
  s += lbl(px + (r * sc) / 2, py - 7, `r=${r}`, '#b45309', 11);

  return mkSVG(`0 0 ${W} ${H}`, s);
}

/** Topic 10 — f(x) = √(x−2) showing domain start at x=2 */
function graphDomain() {
  const W = 280, H = 150, ox = 75, oy = 100, sx = 28, sy = 14;
  let s = axes(W, H, ox, oy);

  const pts = [];
  for (let x = 2; x <= 6.5; x += 0.1) {
    pts.push([ox + x * sx, oy - Math.sqrt(x - 2) * sy]);
  }
  s += `<path d="${buildPath(pts)}" fill="none" stroke="#047857" stroke-width="2.5"/>`;

  // closed dot at domain start
  s += `<circle cx="${ox + 2 * sx}" cy="${oy}" r="6" fill="#047857"/>`;
  s += lbl(ox + 2 * sx, oy + 15, 'x=2', '#047857', 10);

  s += `<text x="200" y="22" fill="#047857" font-size="11" font-weight="600"
    font-family="JetBrains Mono,monospace">f(x)=√(x−2)</text>`;
  s += `<text x="200" y="36" fill="#a8a098" font-size="10"
    font-family="DM Sans,sans-serif">Domain: [2, ∞)</text>`;

  return mkSVG(`0 0 ${W} ${H}`, s);
}

/** Topic 12 — Limit with removable discontinuity at x=2 */
function graphLimit() {
  const W = 280, H = 150, ox = 140, oy = 88, sx = 30, sy = 16;
  let s = axes(W, H, ox, oy);

  // left branch: y = x + 2  for x < 2
  const leftPts = [];
  for (let x = -3; x < 1.93; x += 0.08) {
    const py = oy - (x + 2) * sy;
    if (py > 6 && py < 145) leftPts.push([ox + x * sx, py]);
  }
  s += `<path d="${buildPath(leftPts)}" fill="none" stroke="#6d28d9" stroke-width="2.5"/>`;

  // right branch: y = −x + 4  for x > 2
  const rightPts = [];
  for (let x = 2.07; x <= 3.5; x += 0.08) {
    const py = oy - (-x + 4) * sy;
    if (py > 6 && py < 145) rightPts.push([ox + x * sx, py]);
  }
  s += `<path d="${buildPath(rightPts)}" fill="none" stroke="#6d28d9" stroke-width="2.5"/>`;

  // open circle at limit value (2, 4)
  s += `<circle cx="${ox + 2 * sx}" cy="${oy - 4 * sy}" r="6"
    fill="white" stroke="#6d28d9" stroke-width="2"/>`;

  // solid dot at actual value f(2)=1
  s += `<circle cx="${ox + 2 * sx}" cy="${oy - 1 * sy}" r="6" fill="#b45309"/>`;

  s += `<text x="${ox + 2 * sx + 10}" y="${oy - 4 * sy + 4}" fill="#a8a098"
    font-size="9.5" font-family="DM Sans,sans-serif">lim=4</text>`;
  s += `<text x="${ox + 2 * sx + 10}" y="${oy - 1 * sy + 4}" fill="#b45309"
    font-size="9.5" font-family="DM Sans,sans-serif">f(2)=1</text>`;

  s += `<text x="14" y="16" fill="#a8a098" font-size="9.5"
    font-family="DM Sans,sans-serif">Removable discontinuity at x=2</text>`;

  return mkSVG(`0 0 ${W} ${H}`, s);
}

/** Topic 13 — Jump discontinuity at x=1 */
function graphGraphLimits() {
  const W = 280, H = 150, ox = 140, oy = 80, sx = 28, sy = 16;
  let s = axes(W, H, ox, oy);

  // integer tick marks
  for (let n = -3; n <= 3; n++) {
    const px = ox + n * sx;
    s += `<line x1="${px}" y1="${oy - 3}" x2="${px}" y2="${oy + 3}"
      stroke="#c0b8a8" stroke-width="1"/>`;
    s += lbl(px, oy + 14, n);
  }

  // left branch: y = x + 1  for x < 1
  const leftPts = [];
  for (let x = -3; x < 0.93; x += 0.08) {
    const py = oy - (x + 1) * sy;
    if (py > 5 && py < 145) leftPts.push([ox + x * sx, py]);
  }
  s += `<path d="${buildPath(leftPts)}" fill="none" stroke="#047857" stroke-width="2.5"/>`;

  // right branch: y = −0.5x + 2  for x > 1
  const rightPts = [];
  for (let x = 1.07; x <= 3.5; x += 0.08) {
    const py = oy - (-0.5 * x + 2) * sy;
    if (py > 5 && py < 145) rightPts.push([ox + x * sx, py]);
  }
  s += `<path d="${buildPath(rightPts)}" fill="none" stroke="#047857" stroke-width="2.5"/>`;

  // open circle at left limit (1, 2)
  s += `<circle cx="${ox + 1 * sx}" cy="${oy - 2 * sy}" r="6"
    fill="white" stroke="#047857" stroke-width="2"/>`;

  // solid dot at f(1) = 1.5 (actual defined value)
  s += `<circle cx="${ox + 1 * sx}" cy="${oy - 1.5 * sy}" r="6" fill="#b91c1c"/>`;

  s += `<text x="14" y="16" fill="#a8a098" font-size="9.5"
    font-family="DM Sans,sans-serif">Jump at x=1 → Limit DNE</text>`;
  s += `<text x="14" y="28" fill="#b91c1c" font-size="9"
    font-family="DM Sans,sans-serif">● f(1) defined   ○ limit from left</text>`;

  return mkSVG(`0 0 ${W} ${H}`, s);
}

/** Topic 15 — s(t) position curve and v(t) velocity dashed line */
function graphVelocity() {
  const W = 280, H = 150, ox = 45, oy = 120, sx = 26, sc = 1.1;

  let s = axes(W, H, ox, oy);

  // s(t) = −16t²+64t+6  (height)
  const sPts = [];
  for (let t = 0; t <= 4.1; t += 0.06) {
    const pos = -16 * t * t + 64 * t + 6;
    if (pos >= 0) sPts.push([ox + t * sx, oy - pos * sc]);
  }
  s += `<path d="${buildPath(sPts)}" fill="none" stroke="#1d52a8" stroke-width="2.5"/>`;

  // v(t) = −32t+64  (velocity)
  const vPts = [];
  for (let t = 0; t <= 4.1; t += 0.06) {
    const vel = -32 * t + 64;
    const py  = oy - vel * sc;
    if (py > 5 && py < 145) vPts.push([ox + t * sx, py]);
  }
  s += `<path d="${buildPath(vPts)}" fill="none" stroke="#b91c1c"
    stroke-width="1.8" stroke-dasharray="6,3"/>`;

  // max-height dot at t=2
  const maxY = oy - (-16 * 4 + 128 + 6) * sc;
  s += `<circle cx="${ox + 2 * sx}" cy="${maxY}" r="5" fill="#b45309"/>`;
  s += `<text x="${ox + 2 * sx + 7}" y="${maxY - 4}" fill="#b45309"
    font-size="9.5" font-family="DM Sans,sans-serif">max t=2</text>`;

  // t-axis labels
  for (let t = 0; t <= 4; t++) s += lbl(ox + t * sx, oy + 13, t);

  // legend
  s += `<text x="205" y="22" fill="#1d52a8" font-size="9.5" font-family="DM Sans,sans-serif">— s(t)</text>`;
  s += `<text x="205" y="34" fill="#b91c1c" font-size="9.5" font-family="DM Sans,sans-serif">-- v(t)</text>`;

  return mkSVG(`0 0 ${W} ${H}`, s);
}
