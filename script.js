// Extracted from index.html. Scripts run in their original order.
/* data-8b-part: section-script:navigation */
(() => {
  const nav = document.getElementById('navigation');
  const menu = document.getElementById('menu');
  const openButton = nav.querySelector('.nav__menu');
  const closeButton = menu.querySelector('.menu__close');
  let last = scrollY, ticking = false;
  const update = () => {
    ticking = false;
    const y = scrollY, delta = y - last;
    if (Math.abs(delta) > 3) {
      nav.classList.toggle('is-hidden', delta > 0 && y > 160);
      last = y;
    }
    const probe = nav.getBoundingClientRect().height / 2;
    const dark = [...document.querySelectorAll('[data-ground="dark"]')].some(el => {
      const r = el.getBoundingClientRect();
      return r.top <= probe && r.bottom >= probe;
    });
    nav.classList.toggle('is-on-dark', dark);
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
  const setMenu = open => {
    menu.hidden = !open;
    openButton.setAttribute('aria-expanded', String(open));
    if (open) { window.motionKit?.wheel?.stop(); closeButton.focus(); } else { window.motionKit?.wheel?.start(); openButton.focus(); }
  };
  openButton.addEventListener('click', () => setMenu(true));
  closeButton.addEventListener('click', () => setMenu(false));
  menu.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
  addEventListener('keydown', event => { if (event.key === 'Escape' && !menu.hidden) setMenu(false); });
})();

/* data-8b-part: section-script:opening */
(() => {
  const stage = document.querySelector('#opening .opening__stage');
  if (!('IntersectionObserver' in window)) return;
  new IntersectionObserver(([entry]) => stage.classList.toggle('is-paused', !entry.isIntersecting)).observe(stage);
})();

/* data-8b-part: section-script:visit */
(() => {
  const form = document.querySelector('#visit .visit__form');
  if (!form) return;
  const fields = form.querySelector('.visit__fields');
  const done = form.querySelector('.visit__done');
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    fields.hidden = true;
    done.hidden = false;
  });
})();

/* data-8b-part: motion-kit */
(() => {
const live = document.documentElement.hasAttribute('data-8b-live');
const measures = new Set();
let queued = false;
const run = fn => { try { fn(); } catch (error) { console.error('[motion-kit] measure failed', error); } };
const remeasure = () => {
if (queued) return;
queued = true;
requestAnimationFrame(() => { queued = false; measures.forEach(run); realign(); });
};
const realign = () => document.getAnimations().forEach(animation => {
if (animation.timeline && animation.timeline !== document.timeline && animation.playState === 'running') { animation.pause(); animation.play(); }
});
window.motionKit = {
live,
box(element) {
if (!(element instanceof HTMLElement)) { const r = element.getBoundingClientRect(); return { x: r.left + scrollX, y: r.top + scrollY, w: r.width, h: r.height }; }
let x = 0, y = 0, node = element;
while (node) { x += node.offsetLeft; y += node.offsetTop; node = node.offsetParent; }
return { x, y, w: element.offsetWidth, h: element.offsetHeight };
},
set(element, vars) { for (const [name, value] of Object.entries(vars)) element.style.setProperty(name, String(value)); },
measure(fn) { if (!live) return; measures.add(fn); run(fn); },
scene(id, fn) {
if (!live) return;
try { fn(); } catch (error) {
console.error(`[motion-kit] scene ${id} failed; its section stays static`, error);
document.querySelector(`style[data-8b-part="scene:${id}"]`)?.setAttribute('media', 'not all');
}
}
};
if (!live) { window.motionReady = Promise.resolve(); return; }
const number = () => document.querySelectorAll('[data-8b-items]').forEach(group => {
let items;
try { items = [...group.querySelectorAll(group.getAttribute('data-8b-items'))]; } catch { return; }
items.forEach((item, index) => { item.style.setProperty('--i', index); item.style.setProperty('--n', items.length); });
});
number();
measures.add(number);
requestAnimationFrame(realign);
new ResizeObserver(remeasure).observe(document.body);
document.fonts.ready.then(remeasure);
addEventListener('load', remeasure);
window.motionReady = document.fonts.ready.then(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
})();
(() => {
const kit = window.motionKit;
if (!kit.live || !matchMedia('(pointer: fine)').matches) return;
let target = scrollY, current = scrollY, last = 0, running = false, paused = false;
const inner = (node, dy) => {
for (; node && node !== document.body && node !== document.documentElement; node = node.parentElement) {
if (!/(auto|scroll)/.test(getComputedStyle(node).overflowY) || node.scrollHeight <= node.clientHeight) continue;
if (dy > 0 ? node.scrollTop + node.clientHeight < node.scrollHeight - 1 : node.scrollTop > 0) return true;
}
return false;
};
const step = now => {
current += (target - current) * (1 - Math.exp(-5.3 * Math.min(0.05, (now - last) / 1000)));
last = now;
if (Math.abs(target - current) < 0.5) current = target;
scrollTo({ top: current, behavior: 'instant' });
if (current !== target) requestAnimationFrame(step); else running = false;
};
addEventListener('wheel', event => {
if (paused || event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY) || inner(event.target, event.deltaY)) return;
event.preventDefault();
if (!running) target = current = scrollY;
const unit = event.deltaMode === 1 ? 40 : event.deltaMode === 2 ? innerHeight : 1;
target = Math.max(0, Math.min(document.documentElement.scrollHeight - innerHeight, target + event.deltaY * unit * 0.95));
if (!running) { running = true; last = performance.now(); requestAnimationFrame(step); }
}, { passive: false });
kit.wheel = { stop() { paused = true; }, start() { paused = false; } };
})();
(() => {
const kit = window.motionKit;
if (!kit.live) return;
const at = element => {
const own = parseFloat(element.getAttribute('data-8b-enter'));
return own >= 0 && own <= 100 ? own / 100 : 0.88;
};
let pending = [...document.querySelectorAll('[data-8b-motion]')].map(element => ({ element, y: 0, at: at(element) }));
let queued = false;
const check = () => {
queued = false;
pending = pending.filter(item => {
if (item.y > scrollY + innerHeight * item.at) return true;
item.element.classList.add('is-in');
return false;
});
};
const queue = () => { if (!queued) { queued = true; requestAnimationFrame(check); } };
kit.measure(() => { pending.forEach(item => { item.y = kit.box(item.element).y; }); queue(); });
addEventListener('scroll', queue, { passive: true });
})();
(() => {
const kit = window.motionKit;
if (!kit.live) return;
const sheet = new CSSStyleSheet();
sheet.replaceSync('[data-8b-split=lines]>.line{display:block;overflow:clip;padding-block:.12em;margin-block:-.12em}[data-8b-split=lines]>.line:not(:last-child){margin-bottom:0}[data-8b-split=lines]>.line+.line{margin-top:-.24em}.line+.line>.line__in{text-indent:0}:where(h1,h2,h3,h4,h5,h6,p,div,blockquote,figcaption,dd,dt):where([data-8b-split="lines"]:has(>.line)){display:flow-root}.line__in{display:block}.kit-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}');
document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
const sources = new WeakMap(), widths = new WeakMap();
const graphemes = text => [...new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(text)].map(part => part.segment);
const span = (className, text) => { const element = document.createElement('span'); element.className = className; if (text != null) element.textContent = text; return element; };
const split = element => {
const mode = element.getAttribute('data-8b-split'), again = sources.has(element);
if (again) element.innerHTML = sources.get(element); else sources.set(element, element.innerHTML);
const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT), texts = [];
while (walker.nextNode()) texts.push(walker.currentNode);
let index = 0;
for (const node of texts) {
const fragment = document.createDocumentFragment();
for (const piece of node.data.split(/(\s+)/)) {
if (!piece) continue;
if (/^\s+$/.test(piece)) { fragment.append(piece); continue; }
const word = span('w');
if (mode === 'chars') {
word.setAttribute('aria-hidden', 'true');
for (const character of graphemes(piece)) { const c = span('c', character); c.style.setProperty('--i', index++); word.append(c); }
} else {
word.textContent = piece;
if (mode === 'words') word.style.setProperty('--i', index++);
}
fragment.append(word);
}
node.replaceWith(fragment);
}
if (mode === 'chars') element.append(span('kit-sr', element.textContent.replace(/\s+/g, ' ').trim()));
if (mode === 'lines') {
const lines = [];
let top = null;
for (const child of [...element.childNodes]) {
const probe = child.nodeType === 1 ? child : null;
const at = probe ? probe.getBoundingClientRect().top : top;
if (probe && (top === null || Math.abs(at - top) > 2)) { lines.push([]); top = at; }
if (!lines.length) lines.push([]);
lines.at(-1).push(child);
}
lines.forEach((nodes, i) => {
const line = span('line'), inner = span('line__in');
line.style.setProperty('--i', i);
nodes[0].before(line);
inner.append(...nodes);
line.append(inner);
});
index = lines.length;
widths.set(element, element.clientWidth);
}
element.style.setProperty('--n', index);
if (again) element.getAnimations({ subtree: true }).forEach(animation => { if (animation.timeline === document.timeline) try { animation.finish(); } catch {} });
};
const pending = [];
let busy = false;
const drain = () => {
if (busy) return;
const element = pending.shift();
if (!element) return;
busy = true;
setTimeout(() => { try { split(element); } catch (error) { console.error('[motion-kit] split failed', error); } busy = false; drain(); }, 0);
};
const near = new IntersectionObserver(entries => entries.forEach(entry => {
if (!entry.isIntersecting) return;
near.unobserve(entry.target);
pending.push(entry.target);
drain();
}), { rootMargin: '100% 0px' });
document.fonts.ready.then(() => document.querySelectorAll('[data-8b-split]').forEach(element => near.observe(element)));
kit.measure(() => document.querySelectorAll('[data-8b-split="lines"]').forEach(element => {
if (sources.has(element) && widths.get(element) !== element.clientWidth) { pending.push(element); drain(); }
}));
})();
(() => {
if (!window.motionKit.live) return;
const sheet = new CSSStyleSheet();
sheet.replaceSync('[data-8b-off],[data-8b-off]::before,[data-8b-off]::after{animation-play-state:paused!important}');
document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
const seen = new Set(), loops = new Map();
const watch = new IntersectionObserver(entries => {
entries.forEach(entry => entry.isIntersecting ? seen.add(entry.target) : seen.delete(entry.target));
loops.forEach((section, element) => element.toggleAttribute('data-8b-off', !seen.has(element) && !seen.has(section)));
});
const scan = () => document.getAnimations().forEach(animation => {
const element = animation.effect?.target;
if (!element || loops.has(element) || animation.effect.getTiming().iterations !== Infinity || animation.timeline !== document.timeline) return;
const section = element.closest('section,header,footer') || element;
loops.set(element, section);
watch.observe(element);
watch.observe(section);
});
scan();
addEventListener('load', scan);
document.addEventListener('animationstart', scan, true);
})();

/* data-8b-part: scene-script:classes */
motionKit.scene('classes', () => {
  const deck = document.querySelector('#classes .classes__deck');
  motionKit.measure(() => {
    for (const card of deck.children) motionKit.set(card, {
      '--classes-dx': `${deck.clientWidth / 2 - (card.offsetLeft + card.offsetWidth / 2)}px`,
      '--classes-dy': `${deck.clientHeight / 2 - (card.offsetTop + card.offsetHeight / 2)}px`
    });
  });
});
