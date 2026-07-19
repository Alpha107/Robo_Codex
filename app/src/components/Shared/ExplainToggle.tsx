import { useState } from 'react';
import GlossaryText from './GlossaryText';
import './ExplainToggle.css';

interface ExplainToggleProps {
  simple: string;
  detailed: string;
}

export default function ExplainToggle({ simple, detailed }: ExplainToggleProps) {
  const [mode, setMode] = useState<'simple' | 'detailed'>('simple');

  return (
    <div className="explain-toggle">
      <div className="explain-toggle-switch" role="tablist" aria-label="Explanation detail level">
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'simple'}
          className={mode === 'simple' ? 'explain-toggle-btn active' : 'explain-toggle-btn'}
          onClick={() => setMode('simple')}
        >
          Simple
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'detailed'}
          className={mode === 'detailed' ? 'explain-toggle-btn active' : 'explain-toggle-btn'}
          onClick={() => setMode('detailed')}
        >
          Detailed
        </button>
      </div>
      {mode === 'simple' ? <p className="explain-simple">{simple}</p> : <GlossaryText text={detailed} />}
    </div>
  );
}
