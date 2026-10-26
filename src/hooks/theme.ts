import { useSyncExternalStore } from 'react';

export type Theme = 'dark' | 'light';

const KEY = 'erika-portfolio-theme';
const listeners = new Set<() => void>();

function read(): Theme {
  try {
    return localStorage.getItem(KEY) === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}

let theme: Theme = read();

function apply(t: Theme) {
  document.documentElement.dataset.theme = t;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', t === 'light' ? '#fcebee' : '#07070a');
}

apply(theme);

export function setTheme(t: Theme) {
  theme = t;
  apply(t);
  try {
    localStorage.setItem(KEY, t);
  } catch {
    /* storage unavailable: the choice just won't be remembered */
  }
  listeners.forEach((l) => l());
}

/** Dark is the default; the visitor's choice is remembered. */
export function useTheme() {
  const t = useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => theme,
    () => 'dark' as Theme,
  );
  return [t, () => setTheme(t === 'dark' ? 'light' : 'dark')] as const;
}
