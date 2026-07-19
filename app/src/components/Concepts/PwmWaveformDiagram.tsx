import './PwmWaveformDiagram.css';

interface PwmWaveformDiagramProps {
  label?: string;
}

export default function PwmWaveformDiagram({ label = 'brightness' }: PwmWaveformDiagramProps) {
  return (
    <div className="pwm-diagram">
      <div className="pwm-diagram-led" aria-hidden="true">
        <span className="pwm-diagram-led-dot" />
        <span className="pwm-diagram-led-label">Output</span>
      </div>
      <div className="pwm-diagram-track">
        <div className="pwm-diagram-on-segment" />
      </div>
      <p className="pwm-diagram-caption">
        The signal is only ever fully ON or fully OFF — it just switches faster than anything can visibly follow.
        The <strong>duty cycle</strong> (how much of each cycle is spent ON) is what controls the average {label}: a
        wider ON segment means more average power, a narrower one means less.
      </p>
    </div>
  );
}
