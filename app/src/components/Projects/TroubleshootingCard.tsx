import { useState } from 'react';
import GlossaryText from '../Shared/GlossaryText';
import './TroubleshootingCard.css';

interface TroubleshootingCardProps {
  issue: string;
  fix: string;
}

export default function TroubleshootingCard({ issue, fix }: TroubleshootingCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={open ? 'troubleshooting-card open' : 'troubleshooting-card'}>
      <button
        type="button"
        className="troubleshooting-card-question"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="troubleshooting-card-icon" aria-hidden="true">
          {open ? '−' : '?'}
        </span>
        {issue}
      </button>
      {open && (
        <div className="troubleshooting-card-fix">
          <GlossaryText text={fix} as="span" />
        </div>
      )}
    </div>
  );
}
