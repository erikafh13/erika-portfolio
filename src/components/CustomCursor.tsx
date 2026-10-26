import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useFinePointer, useReducedMotionPref } from '../hooks/useMedia';
import { useTheme } from '../hooks/theme';

/**
 * Minimal cursor: a small round dot that swells a little while the mouse button is held.
 * Desktop only; disabled for reduced motion.
 */
export default function CustomCursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotionPref();
  const enabled = fine && !reduced;
  const [theme] = useTheme();
  const ink = theme === 'light' ? '22,22,27' : '244,241,236';

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 600, damping: 40, mass: 0.4 });
  const [visible, setVisible] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add('has-custom-cursor');
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const leave = () => setVisible(false);
    const press = () => setDown(true);
    const release = () => setDown(false);
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    window.addEventListener('pointerdown', press);
    window.addEventListener('pointerup', release);
    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
      window.removeEventListener('pointerdown', press);
      window.removeEventListener('pointerup', release);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[200] h-3 w-3 rounded-full"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%', backgroundColor: `rgb(${ink})` }}
      animate={{ opacity: visible ? 1 : 0, scale: down ? 2 : 1 }}
      transition={{ type: 'spring', stiffness: 420, damping: 28 }}
    />
  );
}
