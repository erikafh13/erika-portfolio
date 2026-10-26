import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/portfolio';
import { useScrollLock } from '../hooks/smoothScroll';
import { EASE, Particles } from './fx';

/** Full-screen resume viewer, with the original PDF one click away. */
export default function ResumeModal({ onClose }: { onClose: () => void }) {
  useScrollLock(true);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[140] flex flex-col overflow-hidden bg-ink"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label="Resume"
    >
      {/* backdrop: soft colour glows, a faint grid and drifting dust */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[10%] -top-[20%] h-[70vh] w-[60vw] rounded-full bg-[radial-gradient(closest-side,rgba(229,19,43,0.32),transparent)] blur-2xl" />
        <div className="absolute -bottom-[25%] -right-[10%] h-[75vh] w-[60vw] rounded-full bg-[radial-gradient(closest-side,rgba(90,40,150,0.35),transparent)] blur-2xl" />
        <div className="absolute inset-0 opacity-[0.5] [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(70%_70%_at_50%_40%,black,transparent)]" />
        <Particles count={34} />
      </div>
      <div className="gutter relative flex h-16 shrink-0 items-center justify-between gap-3 pt-[env(safe-area-inset-top)]">
        <p className="truncate font-display text-2xl tracking-wide text-bone">The Full Story</p>
        <div className="flex items-center gap-2">
          <a href={profile.resumePdf} download={profile.resumeFile} className="rounded-md bg-bone px-4 py-2 text-xs font-bold text-ink">
            ⤓ Download
          </a>
          <button type="button" onClick={onClose} aria-label="Close resume" data-cursor="close" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-bone hover:bg-white/25">
            ✕
          </button>
        </div>
      </div>
      <motion.div
        className="gutter relative min-h-0 flex-1 pb-6"
        // opacity only: Chrome's PDF viewer renders blank inside transformed or backdrop-filtered parents
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        {/* page images, not an <iframe>: download managers (e.g. IDM) hijack PDF requests and leave a frame blank */}
        <div data-lenis-prevent className="h-full overflow-y-auto">
          <div className="mx-auto max-w-4xl">
            {profile.resumePages.map((src, i) => (
              <img key={src} src={src} alt={`${profile.displayName} CV, page ${i + 1}`} draggable={false} className="mb-4 block w-full select-none rounded-sm bg-white shadow-[0_8px_40px_rgba(0,0,0,0.35)]" />
            ))}
            <a href={profile.resumePdf} target="_blank" rel="noreferrer" className="mb-4 flex min-h-12 items-center justify-center rounded-md bg-bone text-sm font-semibold text-ink">
              Open original PDF ↗
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
