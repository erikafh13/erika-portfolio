import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { sectionMeta, type SectionId } from '../data/portfolio';
import { useSmoothScroll } from '../hooks/smoothScroll';
import { useTheme } from '../hooks/theme';
import { SeriesMark } from './Poster';
import { EASE } from './fx';

export default function Navbar({ order }: { order: SectionId[] }) {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [active, setActive] = useState<string>('top');
  const { scrollTo } = useSmoothScroll();
  const [theme, toggleTheme] = useTheme();

  useMotionValueEvent(scrollY, 'change', (y) => {
    setSolid(y > 40);
  });

  useEffect(() => {
    const ids = ['top', ...order];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [order]);

  const go = (id: string) => {
    setMobileNav(false);
    scrollTo(`#${id}`, { offset: 0 });
  };

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-[60]"
    >
      <div
        className={`gutter flex h-16 items-center justify-between gap-6 border-b border-white/25 transition-[background,backdrop-filter] duration-500 md:h-[72px] ${
          solid || mobileNav ? 'bg-ink/80 backdrop-blur-xl' : 'bg-gradient-to-b from-ink/80 to-transparent'
        }`}
      >
        <div className="flex items-center gap-8 lg:gap-10">
          <button type="button" onClick={() => go('top')} className="text-[22px]" aria-label="Back to top">
            <SeriesMark />
          </button>
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Sections">
            <NavLink label="Home" active={active === 'top'} onClick={() => go('top')} />
            {order.map((id) => (
              <NavLink key={id} label={sectionMeta[id].nav} active={active === id} onClick={() => go(id)} />
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-bone transition hover:bg-white/10"
          >
            {theme === 'dark' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
              </svg>
            )}
          </button>
          <button
            type="button"
            onClick={() => go('contact')}
            className="hidden rounded-full bg-bone px-5 py-2 text-xs font-bold tracking-[0.14em] text-ink shadow-[0_0_30px_rgba(229,19,43,0.35)] transition hover:bg-white sm:block"
          >
            LET&apos;S CONNECT
          </button>
          <button
            type="button"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-label={mobileNav ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileNav}
            onClick={() => setMobileNav((v) => !v)}
          >
            <motion.span className="block h-0.5 w-5 bg-bone" animate={{ rotate: mobileNav ? 45 : 0, y: mobileNav ? 4 : 0 }} />
            <motion.span className="block h-0.5 w-5 bg-bone" animate={{ rotate: mobileNav ? -45 : 0, y: mobileNav ? -4 : 0 }} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileNav && (
          <motion.nav
            aria-label="Sections"
            className="gutter border-b border-white/5 bg-ink/95 pb-6 pt-2 backdrop-blur-xl lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            {[{ id: 'top', label: 'Home' }, ...order.map((id) => ({ id, label: sectionMeta[id].nav })), { id: 'contact', label: "Let's Connect" }].map((l, i) => (
              <motion.button
                key={l.id}
                type="button"
                onClick={() => go(l.id)}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i }}
                className={`block w-full py-3 text-left font-display text-3xl tracking-wide ${active === l.id ? 'text-crimson-2' : 'text-bone'}`}
              >
                {l.label}
              </motion.button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function NavLink({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={`relative text-[13px] font-medium transition ${active ? 'text-bone' : 'text-mist hover:text-bone'}`}>
      {label}
      {active && <motion.span layoutId="nav-underline" className="absolute -bottom-1.5 left-0 right-0 h-[2px] rounded bg-crimson" />}
    </button>
  );
}
