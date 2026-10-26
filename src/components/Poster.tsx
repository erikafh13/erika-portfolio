import type { ReactNode } from 'react';
import type { Palette, Project } from '../data/portfolio';

/**
 * Generated "key art" for thumbnails - layered gradients, light falloff and a motif.
 * No stock imagery: every card is art-directed from its palette.
 */
export function PosterBackdrop({ palette, children, className = '' }: { palette: Palette; children?: ReactNode; className?: string }) {
  return (
    <div
      className={`poster absolute inset-0 overflow-hidden ${className}`}
      style={{
        ['--pf' as string]: palette.from,
        ['--pv' as string]: palette.via,
        ['--pt' as string]: palette.to,
        ['--pa' as string]: palette.accent,
        background: `radial-gradient(120% 90% at 85% 10%, ${palette.via} 0%, transparent 60%),
          radial-gradient(90% 80% at 0% 100%, ${palette.from} 0%, transparent 70%),
          linear-gradient(160deg, ${palette.from} 0%, ${palette.to} 100%)`,
      }}
    >
      <div
        aria-hidden
        className="absolute -right-1/4 -top-1/3 h-[140%] w-[70%] rotate-[18deg] opacity-40 blur-2xl"
        style={{ background: `linear-gradient(90deg, transparent, ${palette.accent}55, transparent)` }}
      />
      <div aria-hidden className="absolute inset-0 opacity-[0.18] [background-image:repeating-linear-gradient(0deg,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_1px,transparent_1px,transparent_4px)]" />
      {children}
      <div aria-hidden className="poster-fade absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
    </div>
  );
}

/** Motif illustrations for each Original, built from the project's own architecture. */
export function ProjectArt({ project, className = '' }: { project: Project; className?: string }) {
  const a = project.palette.accent;
  return (
    <PosterBackdrop palette={project.palette} className={className}>
      {project.image ? (
        <>
          <img src={project.image} alt="" loading="lazy" draggable={false} className={`absolute inset-0 h-full w-full object-cover ${project.imageLight ? 'light:hidden' : ''}`} />
          {project.imageLight && <img src={project.imageLight} alt="" loading="lazy" draggable={false} className="absolute inset-0 hidden h-full w-full object-cover light:block" />}
        </>
      ) : (
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <radialGradient id={`g-${project.id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={a} stopOpacity="0.55" />
            <stop offset="100%" stopColor={a} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="290" cy="120" r="130" fill={`url(#g-${project.id})`} />
        {project.motif === 'bars' && (
          <g fill="none" stroke={a}>
            <rect x="196" y="44" width="170" height="124" rx="12" strokeWidth="2" strokeOpacity="0.8" />
            {[34, 58, 44, 82, 66, 96].map((h, i) => (
              <rect key={i} x={212 + i * 25} y={156 - h} width="14" height={h} rx="3" fill={a} fillOpacity={0.25 + (i % 3) * 0.2} strokeWidth="1.4" strokeOpacity="0.8" />
            ))}
            <path d="M212 118 L237 96 L262 108 L287 78 L312 88 L337 60" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="337" cy="60" r="4" fill={a} stroke="none" />
            <g transform="translate(196 190)">
              <circle cx="30" cy="30" r="26" strokeWidth="2" strokeOpacity="0.7" />
              <path d="M30 4 A26 26 0 0 1 56 30 L30 30 Z" fill={a} fillOpacity="0.45" strokeWidth="1.4" />
              <line x1="80" x2="170" y1="16" y2="16" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.5" />
              <line x1="80" x2="140" y1="32" y2="32" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.35" />
              <line x1="80" x2="156" y1="48" y2="48" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.25" />
            </g>
          </g>
        )}
        {project.motif === 'line' && (
          <g fill="none" stroke={a}>
            {[0, 1, 2, 3].map((i) => (
              <line key={i} x1="190" x2="372" y1={70 + i * 42} y2={70 + i * 42} strokeWidth="1" strokeOpacity="0.2" />
            ))}
            <path d="M190 190 C214 176 226 150 246 158 S282 120 300 128 S334 84 372 70" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.9" />
            <path d="M300 128 S334 84 372 70" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 7" strokeOpacity="0.9" transform="translate(0 0)" />
            <path d="M300 128 C330 104 346 86 372 40 L372 112 C346 112 330 124 300 128 Z" fill={a} fillOpacity="0.16" strokeWidth="0" />
            <circle cx="300" cy="128" r="5" fill={a} stroke="none" />
            <line x1="300" x2="300" y1="60" y2="214" strokeWidth="1" strokeDasharray="3 5" strokeOpacity="0.45" />
          </g>
        )}
        {project.motif === 'cluster' && (
          <g fill={a} stroke="none">
            {[[214,90],[232,110],[222,128],[246,98],[240,134],[258,118],[228,80],[252,146]].map(([x, y], i) => (
              <circle key={`a${i}`} cx={x} cy={y} r="5" fillOpacity="0.85" />
            ))}
            {[[316,176],[334,158],[346,190],[322,200],[352,170],[338,214],[306,188],[360,200]].map(([x, y], i) => (
              <circle key={`b${i}`} cx={x} cy={y} r="5" fillOpacity="0.45" />
            ))}
            <circle cx="236" cy="112" r="52" fill="none" stroke={a} strokeWidth="1.6" strokeDasharray="4 6" strokeOpacity="0.7" />
            <circle cx="336" cy="190" r="46" fill="none" stroke={a} strokeWidth="1.6" strokeDasharray="4 6" strokeOpacity="0.45" />
            <path d="M200 232 L372 56" fill="none" stroke={a} strokeWidth="1.6" strokeOpacity="0.5" />
          </g>
        )}
        {project.motif === 'route' && (
          <g fill="none" stroke={a}>
            {[[210,70],[290,56],[350,110],[250,130],[322,188],[222,196]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={i === 0 || i === 4 ? 9 : 6} fill={i === 0 || i === 4 ? a : 'none'} fillOpacity="0.85" strokeWidth="2" />
            ))}
            <path d="M210 70 L290 56 L350 110 L322 188" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M210 70 L250 130 L222 196 M250 130 L322 188 M290 56 L250 130 M350 110 L250 130" strokeWidth="1.4" strokeOpacity="0.4" strokeDasharray="5 6" />
          </g>
        )}
        {project.motif === 'stock' && (
          <g fill="none" stroke={a}>
            {[0, 1, 2].map((r) =>
              [0, 1, 2, 3].map((c) => (
                <g key={`${r}-${c}`} transform={`translate(${196 + c * 44} ${50 + r * 44})`}>
                  <rect width="34" height="34" rx="6" strokeWidth="1.6" strokeOpacity={0.25 + ((r + c) % 3) * 0.25} fill={(r * 4 + c) % 5 === 0 ? a : 'none'} fillOpacity="0.28" />
                  <path d="M8 12 H26 M8 20 H20" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.5" />
                </g>
              )),
            )}
            <path d="M188 200 h190" strokeWidth="2" strokeOpacity="0.7" />
            <path d="M188 200 L214 184 L240 192 L270 168 L300 176 L330 150 L378 158" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" />
            <path d="M188 216 h190" strokeWidth="1" strokeOpacity="0.35" />
            <path d="M188 230 h190" strokeWidth="1" strokeOpacity="0.2" />
          </g>
        )}
        {project.motif === 'sheet' && (
          <g fill="none" stroke={a}>
            <rect x="196" y="48" width="170" height="150" rx="10" strokeWidth="2" strokeOpacity="0.8" />
            {[0, 1, 2, 3, 4].map((r) => (
              <line key={`r${r}`} x1="196" x2="366" y1={78 + r * 24} y2={78 + r * 24} strokeWidth="1" strokeOpacity="0.35" />
            ))}
            {[0, 1, 2].map((c) => (
              <line key={`c${c}`} x1={236 + c * 44} x2={236 + c * 44} y1="48" y2="198" strokeWidth="1" strokeOpacity="0.35" />
            ))}
            <rect x="196" y="48" width="170" height="30" rx="10" fill={a} fillOpacity="0.22" strokeWidth="0" />
            <rect x="280" y="102" width="44" height="24" fill={a} fillOpacity="0.3" strokeWidth="1.6" />
            <text x="204" y="226" fontFamily="Inter" fontSize="13" fill={a} stroke="none" letterSpacing="2">L × W × H</text>
          </g>
        )}
        {project.motif === 'flow' && (
          <g fill="none" stroke={a}>
            <rect x="200" y="56" width="150" height="94" rx="12" strokeWidth="2" strokeOpacity="0.85" />
            <rect x="214" y="72" width="28" height="20" rx="4" strokeOpacity="0.7" />
            <line x1="214" x2="330" y1="124" y2="124" strokeWidth="3" strokeOpacity="0.4" strokeDasharray="18 8" />
            <g transform="translate(176 196)" fontFamily="Inter" fontSize="10" fill={a} stroke="none" letterSpacing="2">
              <circle cx="16" cy="16" r="16" fill="none" stroke={a} strokeWidth="2" />
              <path d="M34 16 h46" stroke={a} strokeWidth="2" />
              <circle cx="96" cy="16" r="16" fill="none" stroke={a} strokeWidth="2" strokeOpacity="0.8" />
              <path d="M112 8 l38 -22 M112 24 l38 22" stroke={a} strokeWidth="2" strokeOpacity="0.6" />
              <circle cx="166" cy="-18" r="10" fill={a} fillOpacity="0.8" />
              <circle cx="166" cy="50" r="10" fill="none" stroke={a} strokeWidth="2" strokeOpacity="0.5" />
            </g>
          </g>
        )}
      </svg>
      )}
    </PosterBackdrop>
  );
}

/** Small fictional platform mark used in the nav and on cards. */
export function SeriesMark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <span className="font-sans text-[0.62em] font-bold tracking-[0.36em] text-crimson">PORTFOLIO</span>
    </span>
  );
}
