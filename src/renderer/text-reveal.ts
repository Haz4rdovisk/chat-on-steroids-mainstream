/**
 * Bounded presentation-only reveal for canonical streaming text.
 *
 * The recorder still owns the complete assistant revision. This helper merely bridges the
 * coalesced gaps between those revisions so the renderer does not expose each snapshot
 * as a visual jump. It never delays publication, invents text, or stores a second durable copy.
 */

// Rich Markdown is rebuilt at each visible step. Twenty paints per second remains visually
// continuous while avoiding the previous ~31 full parses per second on long final answers.
const PAINT_INTERVAL_MS = 50;
const BASE_CHARS_PER_SECOND = 68;
const CATCH_UP_CHARS_PER_SECOND = 160;
const FINAL_CHARS_PER_SECOND = 185;
const CATCH_UP_START = 48;
const CATCH_UP_FULL = 320;
const MAX_ELAPSED_MS = 80;
const MAX_CHARS_PER_PAINT = 12;
const MAX_ANIMATED_TEXT = 32 * 1024;
const MAX_ANIMATED_DELTA = 4 * 1024;

export interface TextReveal {
  update: (target: string, options: { animate: boolean; final: boolean }) => void;
  value: () => string;
  settled: () => boolean;
  finish: () => void;
  dispose: () => void;
}

function unitEnd(value: string, start: number): number {
  if (start >= value.length) return value.length;
  const first = value.charCodeAt(start);
  return first >= 0xD800 && first <= 0xDBFF && start + 1 < value.length &&
    value.charCodeAt(start + 1) >= 0xDC00 && value.charCodeAt(start + 1) <= 0xDFFF
    ? start + 2 : start + 1;
}

function unitCost(value: string, start: number, end: number): number {
  const unit = value.slice(start, end);
  if (unit === '\n') return 3.2;
  if (/[.!?]/u.test(unit)) return 3.8;
  if (/[,;:]/u.test(unit)) return 2.1;
  return 1;
}

function revealSpeed(backlog: number, final: boolean): number {
  const raw = Math.max(0, Math.min(1, (backlog - CATCH_UP_START) / (CATCH_UP_FULL - CATCH_UP_START)));
  const pressure = raw * raw * (3 - 2 * raw);
  const live = BASE_CHARS_PER_SECOND + (CATCH_UP_CHARS_PER_SECOND - BASE_CHARS_PER_SECOND) * pressure;
  return final ? Math.min(FINAL_CHARS_PER_SECOND, live * 1.18) : live;
}

/**
 * Consumes one continuously growing presentation backlog. Canonical revisions only extend
 * the target; they never restart a per-revision sprint, so recorder bursts read as one stream.
 */
export function createTextReveal(
  render: (visible: string, settled: boolean) => void,
  reduceMotion: () => boolean = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
): TextReveal {
  let target = '';
  let visible = 0;
  let frame: number | undefined;
  let final = false;
  let credit = 0;
  let lastTickAt: number | undefined;
  let lastPaintAt = 0;

  const cancel = () => {
    if (frame !== undefined) window.cancelAnimationFrame(frame);
    frame = undefined;
  };
  const settle = (next: string) => {
    cancel();
    target = next;
    visible = target.length;
    credit = 0;
    lastTickAt = undefined;
    lastPaintAt = 0;
    render(target, true);
  };
  const tick = (now: number) => {
    frame = undefined;
    if (lastTickAt === undefined) {
      // Leave one real paint between the confirmed user receipt/thinking feedback and
      // the first response glyph, even when both canonical records arrived together.
      lastTickAt = now;
      frame = window.requestAnimationFrame(tick);
      return;
    }
    const elapsed = Math.min(MAX_ELAPSED_MS, Math.max(0, now - lastTickAt));
    lastTickAt = now;
    credit += elapsed * revealSpeed(target.length - visible, final) / 1000;
    if (now - lastPaintAt < PAINT_INTERVAL_MS) {
      frame = window.requestAnimationFrame(tick);
      return;
    }
    lastPaintAt = now;
    let wanted = visible;
    let advanced = 0;
    while (wanted < target.length && advanced < MAX_CHARS_PER_PAINT) {
      const end = unitEnd(target, wanted);
      const cost = unitCost(target, wanted, end);
      if (credit < cost) break;
      credit -= cost;
      wanted = end;
      advanced++;
    }
    if (wanted !== visible) {
      visible = wanted;
      render(target.slice(0, visible), visible === target.length);
    }
    if (visible < target.length) frame = window.requestAnimationFrame(tick);
    else {
      credit = 0;
      lastTickAt = undefined;
      lastPaintAt = 0;
    }
  };

  return {
    update(next, options) {
      final = options.final;
      if (next === target && visible === target.length) {
        // Final/captured markup can become available without changing canonical text.
        render(target, true);
        return;
      }
      const appended = next.startsWith(target);
      const delta = Math.max(0, next.length - visible);
      if (!options.animate || reduceMotion() || document.visibilityState === 'hidden' || !appended ||
          next.length > MAX_ANIMATED_TEXT || delta > MAX_ANIMATED_DELTA) {
        settle(next);
        return;
      }
      target = next;
      if (frame === undefined) frame = window.requestAnimationFrame(tick);
    },
    value: () => target,
    settled: () => visible === target.length,
    finish: () => { if (visible < target.length) settle(target); },
    dispose: cancel
  };
}
