import { useRef } from 'react';
import { profile, projects, type Project } from '../data/portfolio';
import { useReducedMotionPref } from '../hooks/useMedia';
import { useAutoScroll } from '../hooks/useAutoScroll';
import { RevealText, SectionHeadingKicker } from './fx';
import ProjectCard from './ProjectCard';

const dashboards = projects.filter((p) => p.group === 'dashboard');
const models = projects.filter((p) => p.group === 'ml');
const sheets = projects.filter((p) => p.group === 'excel');

/**
 * PROJECTS: two rails that drift on their own in opposite directions. Dashboards on top,
 * machine learning and systems below. Each pauses while you hover, touch or drag it, and you
 * can swipe, drag or scroll sideways at any time.
 */
export default function Originals({ onOpen }: { onOpen: (p: Project) => void }) {
  return (
    <div className="py-2 sm:py-4">
      <div className="gutter mb-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <SectionHeadingKicker>{projects.length} Projects · Dashboards, ML &amp; more</SectionHeadingKicker>
          <RevealText as="h2" text="PROJECTS" className="font-display text-[clamp(2.8rem,min(5.5vw,8svh),5rem)] leading-[0.85] text-bone" />
        </div>
        <a
          href={profile.links.linkedin}
          target="_blank"
          rel="noreferrer"
          data-cursor="link"
          className="glass inline-flex min-h-11 items-center gap-2 self-start rounded-full px-5 text-sm font-semibold text-bone transition hover:bg-white/15 lg:self-auto"
        >
          More on LinkedIn ↗
        </a>
      </div>

      <ProjectRail label="Dashboards & Business Intelligence" items={dashboards} direction={1} speed={40} onOpen={onOpen} />
      <ProjectRail label="Machine Learning & Systems" items={models} direction={-1} speed={40} onOpen={onOpen} />
      <ProjectRail label="Excel & Automation" items={sheets} direction={1} speed={40} onOpen={onOpen} />
    </div>
  );
}

function ProjectRail({ label, items, direction, speed, onOpen }: { label: string; items: Project[]; direction: 1 | -1; speed: number; onOpen: (p: Project) => void }) {
  const rail = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionPref();
  useAutoScroll(rail, { speed, reducedMotion: reduced, direction });

  return (
    <div className="mt-2">
      <p className="gutter mb-1 text-[11px] font-bold uppercase tracking-[0.3em] text-mist">
        {label} <span className="text-smoke">· {items.length}</span>
      </p>
      <div className="gutter">
      <div ref={rail} className="rail relative -my-5 flex gap-5 overflow-x-auto py-8 [mask-image:linear-gradient(to_right,transparent,black_56px,black_calc(100%-56px),transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" data-cursor="drag">
        {items.map((p) => (
          <ProjectCard key={p.id} project={p} compact onOpen={() => onOpen(p)} />
        ))}
        {/* the looping copy is only needed once there are enough cards to fill the rail */}
        {items.length >= 4 && items.map((p) => (
          <ProjectCard key={`${p.id}-clone`} project={p} compact clone onOpen={() => onOpen(p)} />
        ))}
      </div>
      </div>
    </div>
  );
}
