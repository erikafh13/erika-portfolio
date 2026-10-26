import { lazy, Suspense, useCallback, useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { sectionOrder, type Project, type SectionId } from './data/portfolio';
import { SmoothScrollProvider, useSmoothScroll } from './hooks/smoothScroll';
import CustomCursor from './components/CustomCursor';
import OpeningSequence from './components/OpeningSequence';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Scene from './components/Scene';
import About from './components/About';
import Journey from './components/Journey';
import Originals from './components/Originals';
import Skills from './components/Skills';
import Testimonials from './components/Testimonials';
import Certifications from './components/Certifications';
import ResumeSection from './components/ResumeViewer';
import FinalCTA from './components/FinalCTA';
import { EASE } from './components/fx';

// Overlays are only needed on demand - split them out of the first load.
const PlayIntro = lazy(() => import('./components/PlayIntro'));
const ProjectModal = lazy(() => import('./components/ProjectModal'));
const ResumeModal = lazy(() => import('./components/ResumeModal'));

type Stage = 'opening' | 'home';

const SEEN_KEY = 'erika-portfolio-intro-seen';

function introSeen(): boolean {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

export default function App() {
  return (
    <SmoothScrollProvider>
      <Series />
    </SmoothScrollProvider>
  );
}

function Series() {
  const [stage, setStage] = useState<Stage>(introSeen() ? 'home' : 'opening');
  const [playing, setPlaying] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const { lock, unlock } = useSmoothScroll();

  const order = sectionOrder;

  useEffect(() => {
    if (stage === 'home') return;
    lock();
    return unlock;
  }, [stage, lock, unlock]);

  const finishOpening = useCallback(() => {
    try {
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      /* storage unavailable - the intro will simply play again next visit */
    }
    window.scrollTo(0, 0);
    setStage('home');
  }, []);

  const closeIntro = useCallback(() => setPlaying(false), []);
  const closeProject = useCallback(() => setProject(null), []);
  const closeResume = useCallback(() => setResumeOpen(false), []);

  const sections: Record<SectionId, ReactNode> = {
    about: <About />,
    journey: <Journey />,
    originals: <Originals onOpen={setProject} />,
    skills: <Skills />,
    certifications: <Certifications />,
    reviews: <Testimonials />,
    story: <ResumeSection onView={() => setResumeOpen(true)} />,
  };

  return (
    <LayoutGroup>
      <div className="grain" aria-hidden />
      <CustomCursor />

      <AnimatePresence>
        {stage === 'opening' && <OpeningSequence key="opening" onDone={finishOpening} />}
      </AnimatePresence>

      {/* outside the animated wrapper: a filter/transform ancestor would stop `fixed` from pinning to the viewport */}
      {stage === 'home' && <Navbar order={order} />}

      {stage === 'home' && (
        <motion.div initial={{ opacity: 0, scale: 1.03, filter: 'blur(10px)' }} animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} transition={{ duration: 1, ease: EASE }}>
          <main>
            <Hero onPlay={() => setPlaying(true)} />
            {order.map((id) => (
              <Scene key={id} id={id}>
                {sections[id]}
              </Scene>
            ))}
            <FinalCTA onReplay={() => setStage('opening')} />
          </main>
        </motion.div>
      )}

      <Suspense fallback={null}>
        <AnimatePresence>{playing && <PlayIntro key="intro" onClose={closeIntro} />}</AnimatePresence>
        <AnimatePresence>{project && <ProjectModal key="project" project={project} onClose={closeProject} onSwitch={setProject} />}</AnimatePresence>
        <AnimatePresence>{resumeOpen && <ResumeModal key="resume" onClose={closeResume} />}</AnimatePresence>
      </Suspense>

    </LayoutGroup>
  );
}
