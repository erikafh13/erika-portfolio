import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { journey, type JourneyChapter } from '../data/portfolio';
import { useAutoScroll } from '../hooks/useAutoScroll';
import { useScrollLock } from '../hooks/smoothScroll';
import { useReducedMotionPref } from '../hooks/useMedia';
import { EASE, SectionHeading } from './fx';
import { PosterBackdrop } from './Poster';

export default function Journey() {
  const [active, setActive] = useState(0);
  const full = journey[active];
  // Hanya foto asli yang ditampilkan. Slot tanpa foto (kotak gradasi) disembunyikan.
  const chapter: JourneyChapter = { ...full, docs: full.docs.filter((d) => d.src) };
  const hasPhotos = journey.some((c) => c.docs.some((d) => d.src));
  const [open, setOpen] = useState<number | null>(null);
  const closeLightbox = useCallback(() => setOpen(null), []);

  return (
    <>
      <SectionHeading
        kicker={`${journey.length} Chapters`}
        title="My Experience"
        aside={<p className="max-w-xs text-sm text-mist">{hasPhotos ? 'Select a chapter to see its documentation. Swipe or drag to browse.' : 'Select a chapter to see the details.'}</p>}
      />

      <div className="rail gutter mb-5 flex gap-2 overflow-x-auto" role="tablist" aria-label="Experience chapters">
        {journey.map((c, i) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={i === active}
            type="button"
            onClick={() => {
              setActive(i);
              setOpen(null);
            }}
            className={`relative shrink-0 rounded-full px-5 py-2.5 text-left transition ${i === active ? 'text-ink' : 'text-mist hover:text-bone'}`}
          >
            {i === active && <motion.span layoutId="journey-pill" className="absolute inset-0 rounded-full bg-bone" transition={{ duration: 0.5, ease: EASE }} />}
            <span className="relative block whitespace-nowrap text-sm font-semibold">{c.tab}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={chapter.id}
          initial={{ opacity: 0, x: 40, filter: 'blur(8px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, x: -40, filter: 'blur(8px)' }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <div className="gutter mb-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h3 className="font-display text-3xl tracking-wide text-bone sm:text-4xl">{chapter.title}</h3>
            <span className="text-sm text-mist">
              {chapter.org} · {chapter.period}
            </span>
          </div>
          <p className="gutter max-w-3xl text-sm leading-relaxed text-bone/75">{chapter.summary}</p>
          <div className="gutter mt-5 grid gap-3 sm:grid-cols-3">
            {chapter.stats.map((s) => (
              <div key={s.label} className="glass rounded-xl px-5 py-4">
                <p className="font-display text-3xl leading-none tracking-wide text-bone sm:text-4xl">{s.value}</p>
                <p className="mt-1.5 text-xs text-mist">{s.label}</p>
              </div>
            ))}
          </div>
          {chapter.docs.length > 0 && (
            <div className="gutter">
              <DocRail chapter={chapter} onOpen={setOpen} />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* portal: the section is transformed, which would otherwise trap a fixed overlay inside it */}
      {createPortal(
        <AnimatePresence>{open !== null && <Lightbox key="lightbox" chapter={chapter} index={open} onIndex={setOpen} onClose={closeLightbox} />}</AnimatePresence>,
        document.body,
      )}
    </>
  );
}

/** Documentation rail - drifts on its own, pauses on hover/touch, swipeable and draggable. */
function DocRail({ chapter, onOpen }: { chapter: JourneyChapter; onOpen: (i: number) => void }) {
  const rail = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionPref();
  useAutoScroll(rail, { speed: 36, reducedMotion: reduced });
  const n = chapter.docs.length;

  return (
    <div ref={rail} className="rail flex gap-4 overflow-x-auto py-6" data-cursor="drag">
      {[...chapter.docs, ...chapter.docs].map((d, k) => {
        const i = k % n;
        const clone = k >= n;
        return (
          <figure
            key={`${chapter.id}-${k}`}
            role="button"
            tabIndex={clone ? -1 : 0}
            aria-hidden={clone || undefined}
            aria-label={`View ${d.caption} full screen`}
            data-cursor="view"
            onClick={() => onOpen(i)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpen(i);
              }
            }}
            className="focus-ring light:shadow-[0_8px_20px_-8px_rgba(190,80,110,0.45)] relative cursor-zoom-in aspect-[4/3] h-[220px] shrink-0 overflow-hidden rounded-xl ring-1 ring-white/10 lg:h-[calc(100svh-37rem)] lg:min-h-[200px]"
          >
            {d.src ? (
              <img src={d.src} alt={clone ? '' : d.caption} loading="lazy" draggable={false} className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <PosterBackdrop palette={d.palette}>
                <span className="absolute -bottom-6 right-3 font-display text-[9rem] leading-none text-white/[0.09] light:text-black/[0.08]">{String(i + 1).padStart(2, '0')}</span>
              </PosterBackdrop>
            )}
            <div aria-hidden className="poster-fade absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-4">
              <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.3em] text-mist">Documentation {String(i + 1).padStart(2, '0')}</span>
              <span className="block font-display text-2xl leading-none tracking-wide text-bone">{d.caption}</span>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}

/** Full-screen viewer for a documentation item. Esc closes, ← → browse. */
function Lightbox({ chapter, index, onIndex, onClose }: { chapter: JourneyChapter; index: number; onIndex: (i: number) => void; onClose: () => void }) {
  useScrollLock(true);
  const n = chapter.docs.length;
  const doc = chapter.docs[index];
  const go = useCallback((d: number) => onIndex((index + d + n) % n), [index, n, onIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, go]);

  return (
    <motion.div
      className="fixed inset-0 z-[150] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-md sm:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={doc.caption}
      onClick={onClose}
    >
      <motion.figure
        key={index}
        className="relative flex max-h-full w-full max-w-6xl flex-col items-center"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        {doc.src ? (
          <img src={doc.src} alt={doc.caption} className="max-h-[80vh] w-auto max-w-full rounded-xl object-contain" />
        ) : (
          <div className="relative aspect-[4/3] max-h-[80vh] w-full max-w-4xl overflow-hidden rounded-xl ring-1 ring-white/10">
            <PosterBackdrop palette={doc.palette} />
          </div>
        )}
        <figcaption className="mt-4 text-center">
          <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-crimson-2">
            {chapter.tab} · {String(index + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
          </span>
          <span className="mt-1 block font-display text-3xl tracking-wide text-bone">{doc.caption}</span>
        </figcaption>
      </motion.figure>

      <button type="button" onClick={onClose} data-cursor="close" aria-label="Close" className="absolute right-4 top-[max(1rem,env(safe-area-inset-top))] flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-lg text-bone transition hover:bg-white/20">
        ✕
      </button>
      {n > 1 && (
        <>
          <button type="button" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous" className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-bone transition hover:bg-white/20 sm:left-6">
            ‹
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next" className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-bone transition hover:bg-white/20 sm:right-6">
            ›
          </button>
        </>
      )}
    </motion.div>
  );
}
