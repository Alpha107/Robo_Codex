import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  /** Where to go if there's no in-app history to return to (e.g. a freshly opened link). */
  fallback: string;
  className?: string;
}

export default function BackButton({ fallback, className }: BackButtonProps) {
  const navigate = useNavigate();

  function handleBack() {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  }

  return (
    <button type="button" className={className ?? 'pager-btn'} onClick={handleBack}>
      &larr; Back
    </button>
  );
}
