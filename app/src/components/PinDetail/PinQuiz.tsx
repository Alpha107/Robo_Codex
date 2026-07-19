import { useMemo, useState } from 'react';
import type { Pin } from '../../types/component';
import './PinQuiz.css';

interface PinQuizProps {
  componentName: string;
  pins: Pin[];
  onClose: () => void;
}

function shuffled<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildChoices(pins: Pin[], correct: Pin): Pin[] {
  const others = pins.filter((p) => p.name !== correct.name);
  const distractors = shuffled(others).slice(0, 3);
  return shuffled([correct, ...distractors]);
}

export default function PinQuiz({ componentName, pins, onClose }: PinQuizProps) {
  const questionOrder = useMemo(() => shuffled(pins), [pins]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const current = questionOrder[index];
  const choices = useMemo(() => (current ? buildChoices(pins, current) : []), [current, pins]);
  const finished = index >= questionOrder.length;

  function handleAnswer(name: string) {
    if (selected) return;
    setSelected(name);
    if (name === current.name) setScore((s) => s + 1);
  }

  function handleNext() {
    setSelected(null);
    setIndex((i) => i + 1);
  }

  function handleRestart() {
    setSelected(null);
    setIndex(0);
    setScore(0);
  }

  return (
    <div className="pin-quiz-backdrop" onClick={onClose}>
      <div className="pin-quiz-modal" onClick={(e) => e.stopPropagation()}>
        <div className="pin-quiz-header">
          <h3>Pin Quiz — {componentName}</h3>
          <button type="button" className="pin-quiz-close" onClick={onClose} aria-label="Close quiz">
            ×
          </button>
        </div>

        {!finished && current && (
          <>
            <p className="pin-quiz-progress">
              Question {index + 1} of {questionOrder.length}
            </p>
            <p className="pin-quiz-question">Which pin does this describe?</p>
            <p className="pin-quiz-function">{current.function}</p>
            <div className="pin-quiz-choices">
              {choices.map((choice) => {
                const isCorrect = choice.name === current.name;
                const isSelected = choice.name === selected;
                let className = 'pin-quiz-choice';
                if (selected) {
                  if (isCorrect) className += ' pin-quiz-choice-correct';
                  else if (isSelected) className += ' pin-quiz-choice-wrong';
                }
                return (
                  <button
                    key={choice.name}
                    type="button"
                    className={className}
                    onClick={() => handleAnswer(choice.name)}
                    disabled={Boolean(selected)}
                  >
                    {choice.name}
                  </button>
                );
              })}
            </div>
            {selected && (
              <button type="button" className="pin-quiz-next" onClick={handleNext}>
                {index + 1 === questionOrder.length ? 'See Results' : 'Next Question →'}
              </button>
            )}
          </>
        )}

        {finished && (
          <div className="pin-quiz-results">
            <p className="pin-quiz-score">
              You scored {score} / {questionOrder.length}
            </p>
            <p className="pin-quiz-score-note">
              {score === questionOrder.length
                ? "Perfect score — you know this component's pinout cold."
                : 'Review the pin details and try again whenever you like.'}
            </p>
            <div className="pin-quiz-results-actions">
              <button type="button" className="pin-quiz-next" onClick={handleRestart}>
                Try Again
              </button>
              <button type="button" className="pin-quiz-close-btn" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
