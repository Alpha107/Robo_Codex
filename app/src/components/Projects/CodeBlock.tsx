import { useState } from 'react';
import './CodeBlock.css';

interface CodeBlockProps {
  filename: string;
  source: string;
}

const TOKEN_REGEX =
  /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|("(?:[^"\\]|\\.)*")|('(?:[^'\\]|\\.)*')|(#\w+)|(\b\d+\.?\d*\b)|(\b(?:void|int|float|double|char|bool|byte|long|unsigned|const|static|struct|class|if|else|for|while|do|return|break|continue|switch|case|default|new|delete|true|false)\b)|(\b(?:setup|loop|pinMode|digitalWrite|digitalRead|analogWrite|analogRead|delay|delayMicroseconds|millis|micros|Serial|attachInterrupt|pulseIn|map|constrain|min|max|abs|HIGH|LOW|INPUT|INPUT_PULLUP|OUTPUT)\b)/gm;

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function highlight(source: string): string {
  const escaped = escapeHtml(source);
  return escaped.replace(
    TOKEN_REGEX,
    (match, comment1, comment2, dstr, sstr, preproc, num, keyword, builtin) => {
      if (comment1 || comment2) return `<span class="tok-comment">${match}</span>`;
      if (dstr || sstr) return `<span class="tok-string">${match}</span>`;
      if (preproc) return `<span class="tok-preproc">${match}</span>`;
      if (num) return `<span class="tok-number">${match}</span>`;
      if (keyword) return `<span class="tok-keyword">${match}</span>`;
      if (builtin) return `<span class="tok-builtin">${match}</span>`;
      return match;
    },
  );
}

export default function CodeBlock({ filename, source }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(source);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="code-block">
      <div className="code-block-bar">
        <span className="code-block-filename">{filename}</span>
        <button type="button" className="code-block-copy" onClick={handleCopy}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="code-block-pre">
        <code dangerouslySetInnerHTML={{ __html: highlight(source) }} />
      </pre>
    </div>
  );
}
