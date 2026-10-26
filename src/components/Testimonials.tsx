import { motion } from 'framer-motion';
import { testimonials } from '../data/portfolio';
import { EASE, SectionHeading } from './fx';

/** Reviews from people Erika has worked with. Rendered only when `testimonials` has entries. */
export default function Testimonials() {
  return (
    <>
      <SectionHeading kicker="Worked with me" title="What People Say" />
      <div className="gutter grid gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
        {testimonials.map((t, i) => (
          <motion.figure
            key={`${t.name}-${i}`}
            className="glass relative flex flex-col overflow-hidden rounded-2xl p-5 lg:h-[clamp(170px,calc((100svh-20rem)/2),260px)]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.7, ease: EASE, delay: Math.min(i, 5) * 0.08 }}
          >
            <div className="flex items-start justify-between">
              <span aria-hidden className="font-display text-5xl leading-[0.8] text-crimson-2">“</span>
              {t.sample && <span className="rounded border border-white/25 px-1.5 py-px text-[9px] font-bold tracking-[0.2em] text-mist">SAMPLE</span>}
            </div>
            <blockquote className="mt-2 line-clamp-5 min-h-0 flex-1 font-serif text-[clamp(1rem,1.25vw,1.2rem)] italic leading-snug text-bone">{t.quote}</blockquote>
            <figcaption className="mt-3 shrink-0 border-t border-white/10 pt-3">
              <p className="text-sm font-semibold text-bone">{t.name}</p>
              <p className="text-xs text-mist">
                {t.role} · {t.org}
              </p>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </>
  );
}
