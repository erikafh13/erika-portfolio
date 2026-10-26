import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { certifications } from '../data/portfolio';
import { useScrollLock } from '../hooks/smoothScroll';
import { useMedia } from '../hooks/useMedia';
import { EASE, SectionHeading } from './fx';

/** Certificates and credentials. Rendered only when `certifications` has entries. */
export default function Certifications() {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const [expanded, setExpanded] = useState(false);

  // collapsed view = two rows, whatever the number of columns at this width
  const isLg = useMedia('(min-width: 1024px)');
  const isMd = useMedia('(min-width: 768px)');
  const cols = isLg ? 3 : isMd ? 2 : 1;
  const limit = cols * 2;
  const visible = expanded ? certifications : certifications.slice(0, limit);

  return (
    <>
      <SectionHeading kicker="Credentials" title="Certifications" />
      <div className="gutter grid gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
        {visible.map((c, i) => (
          <motion.article
            key={`${c.issuer}-${c.name}-${i}`}
            className="glass relative flex flex-col justify-between overflow-hidden rounded-2xl p-5 lg:h-[clamp(150px,calc((100svh-20rem)/2),200px)]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.7, ease: EASE, delay: Math.min(i, 5) * 0.08 }}
          >
            <div className="flex items-start justify-between gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-crimson/15 text-crimson-2" aria-hidden>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="9" r="6" />
                  <path d="M8.5 14.5 7 22l5-3 5 3-1.5-7.5" />
                </svg>
              </span>
              <div className="flex items-center gap-2">
                {c.image ? (
                  <button
                    type="button"
                    onClick={() => setOpen(i)}
                    aria-label={`View ${c.name} certificate`}
                    className="rounded-full border border-white/25 bg-white/15 px-3.5 py-1 text-xs font-semibold text-bone transition hover:bg-white/25"
                  >
                    View
                  </button>
                ) : (
                  c.link && (
                    <a href={c.link} target="_blank" rel="noreferrer" aria-label={`Open ${c.name} credential`} className="rounded-full border border-white/25 bg-white/15 px-3.5 py-1 text-xs font-semibold text-bone transition hover:bg-white/25">
                      View ↗
                    </a>
                  )
                )}
              </div>
            </div>
            <div className="mt-3 min-h-0">
              <h3 className="line-clamp-2 font-sans text-base font-semibold leading-snug text-bone">{c.name}</h3>
              <p className="mt-1 text-xs text-mist">
                {c.issuer}
                {c.year ? ` · ${c.year}` : ''}
              </p>
            </div>
          </motion.article>
        ))}
      </div>

      {certifications.length > limit && (
        <div className="gutter mt-5 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="glass rounded-full px-6 py-2.5 text-sm font-semibold text-bone transition hover:bg-white/15"
          >
            {expanded ? 'Show less' : `View more (${certifications.length - limit})`}
          </button>
        </div>
      )}

      {/* portal: the section is transformed, which would otherwise trap a fixed overlay inside it */}
      {createPortal(<AnimatePresence>{open !== null && <Viewer key="viewer" index={open} onIndex={setOpen} onClose={close} />}</AnimatePresence>, document.body)}
    </>
  );
}

/** Full-screen certificate viewer. Esc closes, ← → browse. */
function Viewer({ index, onIndex, onClose }: { index: number; onIndex: (i: number) => void; onClose: () => void }) {
  useScrollLock(true);
  const withImage = certifications.map((c, i) => ({ c, i })).filter((x) => x.c.image);
  const pos = withImage.findIndex((x) => x.i === index);
  const cert = certifications[index];
  const go = useCallback(
    (d: number) => onIndex(withImage[(pos + d + withImage.length) % withImage.length].i),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pos, onIndex],
  );

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
      aria-label={cert.name}
      onClick={onClose}
    >
      <motion.figure
        key={index}
        className="relative flex max-h-full w-full max-w-5xl flex-col items-center"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        <img src={cert.image} alt={`${cert.name} certificate`} className="max-h-[78vh] w-auto max-w-full rounded-lg bg-white object-contain shadow-2xl" />
        <figcaption className="mt-4 text-center">
          <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-crimson-2">
            {cert.issuer}
            {cert.year ? ` · ${cert.year}` : ''}
          </span>
          <span className="mt-1 block font-display text-3xl tracking-wide text-bone">{cert.name}</span>
          <a href={cert.image} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs font-semibold text-mist hover:text-bone">
            Open full size ↗
          </a>
        </figcaption>
      </motion.figure>

      <button type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-[max(1rem,env(safe-area-inset-top))] flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-lg text-bone transition hover:bg-white/20">
        ✕
      </button>
      {withImage.length > 1 && (
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
