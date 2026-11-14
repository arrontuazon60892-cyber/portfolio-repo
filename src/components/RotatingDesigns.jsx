"use client";

import { getImageProps } from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

/** Timing for the featured graphic-design slots. Edit these to retune the motion. */
export const ROTATION = {
  slotCount: 6,
  minInterval: 3500,
  maxInterval: 7000,
  duration: 800,
  maxSimultaneous: 2,
  initialOffsets: [1000, 2600, 4100, 1800, 3300, 5200],
  hoverResume: 800,
  collisionMin: 400,
  collisionMax: 800,
};

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

export function designImageProps(design, alt) {
  return getImageProps({
    alt,
    src: design.src,
    width: 960,
    height: 720,
    sizes: "(max-width: 760px) 90vw, (max-width: 1100px) 45vw, 33vw",
  }).props;
}

function preloadDesign(design) {
  const src = designImageProps(design, "").src;
  return new Promise((resolve) => {
    const image = new Image();
    const finish = () => resolve(src);
    image.onload = finish;
    image.onerror = finish;
    image.src = src;
    if (image.complete) finish();
  });
}

export function pickNextDesign(pool, visible, currentId, stats) {
  const visibleIds = new Set(visible.map((item) => item?.id).filter(Boolean));
  const candidates = pool.filter((item) => item.id !== currentId && !visibleIds.has(item.id));
  if (!candidates.length) return null;

  let bestScore = Infinity;
  const best = [];
  candidates.forEach((item) => {
    const stat = stats[item.id] || { count: 0, at: 0 };
    const score = stat.count * 1e15 + stat.at;
    if (score < bestScore) {
      bestScore = score;
      best.length = 0;
      best.push(item);
    } else if (score === bestScore) best.push(item);
  });
  return best[Math.floor(Math.random() * best.length)];
}

export function useRotatingSlots(designs, slotCount = ROTATION.slotCount, { enabled = true } = {}) {
  const poolKey = designs.map((item) => item.id).join("|");
  const visibleCount = Math.min(slotCount, designs.length);
  const rotating = enabled && designs.length > slotCount;
  const designsRef = useRef(designs);
  const slotsRef = useRef(designs.slice(0, visibleCount));
  const dueRef = useRef([]);
  const pausedRef = useRef(new Set());
  const wakeRef = useRef(() => {});
  const [slots, setSlots] = useState(() => designs.slice(0, visibleCount));
  const [activeKey, setActiveKey] = useState(poolKey);

  if (activeKey !== poolKey) {
    const next = designs.slice(0, Math.min(slotCount, designs.length));
    setActiveKey(poolKey);
    setSlots(next);
  }

  useEffect(() => {
    designsRef.current = designs;
  }, [designs]);

  const pauseSlot = useCallback((index) => {
    pausedRef.current.add(index);
  }, []);

  const resumeSlot = useCallback((index) => {
    pausedRef.current.delete(index);
    if (dueRef.current[index] != null) {
      dueRef.current[index] = Math.max(dueRef.current[index], performance.now() + ROTATION.hoverResume);
    }
    wakeRef.current();
  }, []);

  useEffect(() => {
    if (!rotating) return undefined;
    const pool = designsRef.current;
    const count = Math.min(slotCount, pool.length);
    const initial = pool.slice(0, count);
    slotsRef.current = initial;
    const now = performance.now();
    dueRef.current = Array.from({ length: count }, (_, index) => now + (ROTATION.initialOffsets[index] ?? 1000 + index * 850));
    const stats = {};
    pool.forEach((item) => {
      stats[item.id] = { count: 0, at: 0 };
    });
    slotsRef.current.forEach((item) => {
      if (item) stats[item.id] = { count: 1, at: now };
    });

    let cancelled = false;
    let active = 0;
    let running = false;
    let queued = false;
    let timer = 0;
    const timers = new Set();

    const arm = (ms) => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => kick(), ms);
    };

    const kick = () => {
      if (running) {
        queued = true;
        return;
      }
      void step();
    };

    wakeRef.current = () => arm(60);

    const step = async () => {
      running = true;
      if (cancelled) {
        running = false;
        return;
      }
      const currentPool = designsRef.current;
      const due = dueRef.current;
      const time = performance.now();
      const order = due
        .map((at, index) => ({ at, index }))
        .filter(({ index }) => index < count && !pausedRef.current.has(index))
        .sort((a, b) => a.at - b.at);
      const pausedOverdue = due.some((at, index) => pausedRef.current.has(index) && at <= time);

      const finish = (ms) => {
        running = false;
        if (cancelled) return;
        if (queued) {
          queued = false;
          arm(40);
          return;
        }
        arm(ms);
      };

      if (!order.length) {
        finish(pausedOverdue ? 300 : ROTATION.minInterval);
        return;
      }

      const ready = order.filter(({ at }) => at <= time);
      if (!ready.length) {
        finish(Math.max(80, order[0].at - time));
        return;
      }

      if (active >= ROTATION.maxSimultaneous) {
        ready.forEach(({ index }, offset) => {
          due[index] = time + randomBetween(ROTATION.collisionMin, ROTATION.collisionMax) + offset * 160;
        });
        finish(ROTATION.collisionMin);
        return;
      }

      const [first, ...rest] = ready;
      rest.forEach(({ index }, offset) => {
        due[index] = time + randomBetween(ROTATION.collisionMin, ROTATION.collisionMax) + offset * 160;
      });

      const currentSlots = slotsRef.current.slice(0, count);
      const nextDesign = pickNextDesign(currentPool, currentSlots, currentSlots[first.index]?.id, stats);
      if (!nextDesign) {
        due[first.index] = time + randomBetween(ROTATION.minInterval, ROTATION.maxInterval);
        finish(240);
        return;
      }

      const previous = currentSlots[first.index];
      const reserved = currentSlots.slice();
      reserved[first.index] = nextDesign;
      slotsRef.current = reserved;
      active += 1;
      await preloadDesign(nextDesign);

      if (cancelled || pausedRef.current.has(first.index)) {
        active = Math.max(0, active - 1);
        if (!cancelled) {
          const rolled = slotsRef.current.slice();
          rolled[first.index] = previous;
          slotsRef.current = rolled;
          due[first.index] = performance.now() + ROTATION.hoverResume;
          finish(ROTATION.hoverResume);
        }
        return;
      }

      stats[nextDesign.id] = { count: (stats[nextDesign.id]?.count || 0) + 1, at: performance.now() };
      setSlots(reserved.slice());
      due[first.index] = performance.now() + randomBetween(ROTATION.minInterval, ROTATION.maxInterval);
      const release = window.setTimeout(() => { active = Math.max(0, active - 1); }, ROTATION.duration);
      timers.add(release);
      finish(180);
    };

    arm(Math.max(80, Math.min(...dueRef.current) - now));
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      timers.forEach((id) => window.clearTimeout(id));
      wakeRef.current = () => {};
    };
  }, [rotating, poolKey, slotCount]);

  return { slots, rotating, pauseSlot, resumeSlot };
}

export function FlipCard({ item, onOpen, index = 0, onPause, onResume, onMouseMove }) {
  const [current, setCurrent] = useState(item);
  const [previous, setPrevious] = useState(null);
  const [flipping, setFlipping] = useState(false);
  const [late, setLate] = useState(false);
  const [dimmed, setDimmed] = useState(false);
  const currentRef = useRef(item);

  useEffect(() => {
    if (!item || item.id === currentRef.current?.id) return undefined;
    let cancelled = false;
    let started = false;
    const timers = [];
    const next = item;
    setPrevious(currentRef.current);
    setLate(false);
    setDimmed(true);

    const start = () => {
      if (cancelled || started) return;
      started = true;
      setFlipping(true);
      timers.push(window.setTimeout(() => {
        if (cancelled) return;
        currentRef.current = next;
        setCurrent(next);
        setLate(true);
        setDimmed(false);
      }, ROTATION.duration / 2));
      timers.push(window.setTimeout(() => {
        if (cancelled) return;
        setFlipping(false);
        setLate(false);
        setPrevious(null);
        setDimmed(false);
      }, ROTATION.duration));
    };

    const probe = new Image();
    probe.onload = start;
    probe.onerror = start;
    probe.src = designImageProps(next, "").src;
    if (probe.complete) start();

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [item]);

  const shownImage = flipping && previous ? previous : current;

  return (
    <article
      className={`v2-design-card v2-spot v2-flip-card${flipping ? " is-flipping" : ""}${late ? " is-late" : ""}${dimmed ? " is-dim" : ""}`}
      style={{ "--i": index, "--flip-ms": `${ROTATION.duration}ms` }}
      onMouseMove={onMouseMove}
      onMouseEnter={onPause}
      onMouseLeave={onResume}
      onFocusCapture={onPause}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) onResume?.();
      }}
    >
      <div className="v2-flip">
        <div className="v2-flip__scene">
          <button
            type="button"
            className="v2-design-card__image v2-flip__face is-out"
            onClick={() => onOpen(current)}
            aria-label={`Open ${current.title} design preview`}
          >
            <img {...designImageProps(shownImage, current.title)} />
            <span aria-hidden="true"><ExternalLink size={18} /></span>
          </button>
          {flipping && item && (
            <div className="v2-design-card__image v2-flip__face is-in" aria-hidden="true">
              <img {...designImageProps(item, "")} alt="" />
              <span aria-hidden="true"><ExternalLink size={18} /></span>
            </div>
          )}
        </div>
      </div>
      <div className="v2-design-card__meta">
        <div className="v2-flip-card__text">
          <h3>{current.title}</h3>
          <p>{current.categoryLabel || current.category}</p>
        </div>
        <button type="button" onClick={() => onOpen(current)} aria-label={`Expand ${current.title}`}>
          <ArrowRight size={17} />
        </button>
      </div>
    </article>
  );
}
