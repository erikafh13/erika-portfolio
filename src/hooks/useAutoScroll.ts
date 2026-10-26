import { useEffect, type RefObject } from 'react';

/**
 * Makes a horizontal rail drift on its own, like a marquee - while staying fully
 * swipeable / draggable. It pauses on hover, touch, drag and keyboard focus, resumes
 * a moment later, and only runs while the rail is on screen.
 *
 * The rail must render its items twice (the second copy marked aria-hidden) so the
 * loop is seamless: when the first copy has scrolled out, the position wraps back.
 */
export function useAutoScroll(ref: RefObject<HTMLDivElement | null>, { speed = 38, reducedMotion = false, direction = 1 }: { speed?: number; reducedMotion?: boolean; direction?: 1 | -1 } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let last = 0;
    let pos = el.scrollLeft;
    let paused = false;
    let visible = false;
    let resumeTimer = 0;
    let dragging = false;
    let dragStartX = 0;
    let dragStartScroll = 0;
    let moved = false;

    // distance between an item and its twin in the second copy
    const period = () => {
      const n = el.children.length;
      if (n < 2) return 0;
      return (el.children[n / 2] as HTMLElement).offsetLeft - (el.children[0] as HTMLElement).offsetLeft;
    };

    const wrap = () => {
      const p = period();
      if (p <= 0) return;
      if (el.scrollLeft >= p) {
        el.scrollLeft -= p;
        pos = el.scrollLeft;
      } else if (direction < 0 && el.scrollLeft <= 0) {
        el.scrollLeft += p;
        pos = el.scrollLeft;
      }
    };

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(64, t - last);
      last = t;
      if (paused || !visible || reducedMotion) return;
      pos += (direction * speed * dt) / 1000;
      el.scrollLeft = pos;
      // browsers may snap scrollLeft to whole pixels - keep our own float position in step
      if (Math.abs(el.scrollLeft - pos) > 2) pos = el.scrollLeft;
      wrap();
    };

    const pause = () => {
      paused = true;
      window.clearTimeout(resumeTimer);
    };
    const resume = (delay = 0) => {
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => {
        pos = el.scrollLeft;
        paused = false;
      }, delay);
    };

    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') pause();
    };
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && !dragging) resume(400);
    };
    const onTouchStart = () => pause();
    const onTouchEnd = () => resume(2500);
    const onWheel = () => {
      pause();
      resume(1800);
    };
    const onScroll = () => {
      if (paused) pos = el.scrollLeft;
      wrap();
    };

    // mouse drag-to-scroll
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      dragging = true;
      moved = false;
      dragStartX = e.clientX;
      dragStartScroll = el.scrollLeft;
      pause();
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - dragStartX;
      if (Math.abs(dx) > 5) moved = true;
      if (moved) {
        el.scrollLeft = dragStartScroll - dx;
        pos = el.scrollLeft;
        el.style.cursor = 'grabbing';
      }
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      el.style.cursor = '';
    };
    // swallow the click that ends a drag so cards don't open by accident
    const onClickCapture = (e: MouseEvent) => {
      if (moved) {
        e.stopPropagation();
        e.preventDefault();
        moved = false;
      }
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(el);

    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointerleave', onLeave);
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    el.addEventListener('wheel', onWheel, { passive: true });
    el.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('focusin', pause);
    el.addEventListener('focusout', () => resume(600));
    el.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    el.addEventListener('click', onClickCapture, true);

    raf = requestAnimationFrame((t) => {
      last = t;
      // a reverse rail starts on the second copy so it has room to travel backwards
      if (direction < 0) {
        el.scrollLeft = period();
        pos = el.scrollLeft;
      }
      tick(t);
    });

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resumeTimer);
      io.disconnect();
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointerleave', onLeave);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('scroll', onScroll);
      el.removeEventListener('focusin', pause);
      el.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      el.removeEventListener('click', onClickCapture, true);
    };
  }, [ref, speed, reducedMotion, direction]);
}
