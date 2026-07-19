import { useEffect, useState } from 'react';

const COMPLETED_KEY = 'robocodex:completed-projects';
const CHANGE_EVENT = 'robocodex:progress-changed';

function readCompleted(): Set<string> {
  try {
    const raw = localStorage.getItem(COMPLETED_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function writeCompleted(ids: Set<string>): void {
  localStorage.setItem(COMPLETED_KEY, JSON.stringify([...ids]));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function isProjectComplete(id: string): boolean {
  return readCompleted().has(id);
}

export function toggleProjectComplete(id: string): void {
  const set = readCompleted();
  if (set.has(id)) {
    set.delete(id);
  } else {
    set.add(id);
  }
  writeCompleted(set);
}

export function getCompletedCount(ids: string[]): number {
  const set = readCompleted();
  return ids.filter((id) => set.has(id)).length;
}

/** Subscribe a component to progress changes made anywhere (including other tabs/components). */
export function useCompletionVersion(): number {
  const [version, setVersion] = useState(0);
  useEffect(() => {
    const handler = () => setVersion((v) => v + 1);
    window.addEventListener(CHANGE_EVENT, handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener(CHANGE_EVENT, handler);
      window.removeEventListener('storage', handler);
    };
  }, []);
  return version;
}
