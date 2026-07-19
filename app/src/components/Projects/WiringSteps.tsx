import { useEffect, useState } from 'react';
import type { WiringStep } from '../../types/project';
import './WiringSteps.css';

interface WiringStepsProps {
  projectId: string;
  steps: WiringStep[];
}

function storageKey(projectId: string): string {
  return `robocodex:wiring-progress:${projectId}`;
}

function readDone(projectId: string): Set<number> {
  try {
    const raw = localStorage.getItem(storageKey(projectId));
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

export default function WiringSteps({ projectId, steps }: WiringStepsProps) {
  const [done, setDone] = useState<Set<number>>(() => readDone(projectId));

  useEffect(() => {
    setDone(readDone(projectId));
  }, [projectId]);

  function toggleStep(step: number) {
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(step)) {
        next.delete(step);
      } else {
        next.add(step);
      }
      localStorage.setItem(storageKey(projectId), JSON.stringify([...next]));
      return next;
    });
  }

  return (
    <div>
      <p className="wiring-steps-progress">
        {done.size} of {steps.length} steps checked off
      </p>
      <ol className="wiring-steps">
        {steps.map((step) => (
          <li key={step.step} className={done.has(step.step) ? 'wiring-step-done' : ''}>
            <label className="wiring-step-checkbox">
              <input type="checkbox" checked={done.has(step.step)} onChange={() => toggleStep(step.step)} />
            </label>
            <span className="wiring-step-instruction">{step.instruction}</span>
            {step.detail && <span className="wiring-step-detail">{step.detail}</span>}
          </li>
        ))}
      </ol>
    </div>
  );
}
