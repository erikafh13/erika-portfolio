import { motion } from 'framer-motion';
import type { Project } from '../data/portfolio';
import { Tilt } from './fx';
import { ProjectArt } from './Poster';

export default function ProjectCard({ project, onOpen, clone = false, compact = false }: { project: Project; onOpen: () => void; clone?: boolean; compact?: boolean }) {
  return (
    <article
      className={`shrink-0 ${compact ? 'w-[80vw] sm:w-[56vw] lg:w-[23vw] xl:w-[19vw]' : 'w-[84vw] sm:w-[62vw] lg:w-[40vw] xl:w-[34vw]'}`}
      aria-hidden={clone || undefined}
    >
      <Tilt max={5} className="group rounded-2xl">
        <div
          role="button"
          tabIndex={clone ? -1 : 0}
          data-cursor="view"
          onClick={onOpen}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onOpen();
            }
          }}
          aria-label={`Open ${project.title}`}
          className={`focus-ring light:shadow-[0_8px_20px_-8px_rgba(190,80,110,0.45)] relative aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-white/10 transition duration-500 group-hover:shadow-[0_14px_28px_-14px_rgba(0,0,0,0.7)] light:group-hover:shadow-[0_14px_28px_-12px_rgba(200,90,120,0.45)] group-hover:ring-white/25 sm:aspect-[16/12] lg:aspect-auto ${compact ? 'lg:h-[clamp(190px,23svh,260px)]' : 'lg:h-[66vh]'}`}
        >
          <motion.div layoutId={clone ? undefined : `art-${project.id}`} className="absolute inset-0 overflow-hidden rounded-2xl">
            <div className="absolute inset-0 transition-transform duration-[1.4s] ease-[var(--ease-cine)] group-hover:scale-[1.07]">
              <ProjectArt project={project} />
            </div>
          </motion.div>

          {/* colour glow, top-right, from the project's own palette */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(80% 85% at 100% 0%, ${project.palette.accent}99 0%, ${project.palette.accent}40 35%, transparent 75%)` }}
          />
          {/* soft shadow behind the text, bottom-left */}
          <div aria-hidden className="pointer-events-none absolute inset-0 card-shade bg-[radial-gradient(95%_90%_at_0%_100%,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.7)_40%,transparent_80%)]" />

          <div className={`absolute inset-x-0 bottom-0 [transform:translateZ(40px)] ${compact ? 'p-4' : 'p-5 sm:p-7'}`}>
            <motion.h3 layoutId={clone ? undefined : `title-${project.id}`} className={`truncate font-display ${compact ? 'text-[clamp(1.1rem,1.5vw,1.5rem)]' : 'text-[clamp(2.4rem,5vw,4.6rem)]'} leading-[1] tracking-wide text-bone`}>
              {project.title}
            </motion.h3>
            {!compact && <p className="mt-1.5 max-w-md text-sm leading-relaxed text-bone/75 sm:text-[15px]">{project.logline}</p>}
            <div className={`flex items-center justify-between gap-3 ${compact ? 'mt-2' : 'mt-5'}`}>
              <div className="flex items-center gap-2">
                <span className={`flex items-center gap-1.5 rounded bg-bone font-bold text-ink transition group-hover:bg-white ${compact ? 'min-h-6 px-2.5 text-[10px]' : 'min-h-10 rounded-md px-5 text-sm'}`}>▶ View Project</span>
                {project.links?.slice(0, 1).map((l) => (
                  <a
                    key={l.url}
                    href={l.url}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="link"
                    onClick={(e) => e.stopPropagation()}
                    className={`flex items-center gap-2 rounded border border-white/25 bg-black/30 light:bg-white/70 font-semibold text-bone backdrop-blur transition hover:border-bone ${compact ? 'min-h-6 px-2 text-[10px]' : 'min-h-10 px-4 text-sm'}`}
                  >
                    {l.label} ↗
                  </a>
                ))}
              </div>
              <span className={`shrink-0 rounded border border-white/30 bg-black/30 light:bg-white/70 px-1.5 py-px font-bold text-bone backdrop-blur ${compact ? 'text-[9px]' : 'text-[10px]'}`}>{project.tag}</span>
            </div>
          </div>
        </div>
      </Tilt>
    </article>
  );
}
