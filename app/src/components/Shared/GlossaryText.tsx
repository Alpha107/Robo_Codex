import { Fragment, useState } from 'react';
import { GLOSSARY_LOOKUP, GLOSSARY_PATTERN } from '../../data/glossary';
import './GlossaryText.css';

interface GlossaryTermProps {
  label: string;
  definition: string;
}

function GlossaryTerm({ label, definition }: GlossaryTermProps) {
  const [open, setOpen] = useState(false);
  return (
    <span
      className="glossary-term"
      tabIndex={0}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {label}
      {open && <span className="glossary-tooltip">{definition}</span>}
    </span>
  );
}

interface GlossaryTextProps {
  text: string;
  as?: 'p' | 'span';
}

export default function GlossaryText({ text, as: Tag = 'p' }: GlossaryTextProps) {
  const seen = new Set<string>();
  const parts = text.split(GLOSSARY_PATTERN);

  return (
    <Tag>
      {parts.map((part, i) => {
        const entry = GLOSSARY_LOOKUP.get(part.toLowerCase());
        if (entry && !seen.has(entry.term)) {
          seen.add(entry.term);
          return <GlossaryTerm key={i} label={part} definition={entry.definition} />;
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </Tag>
  );
}
