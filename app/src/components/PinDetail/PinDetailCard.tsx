import type { Pin } from '../../types/component';
import { colorForCategory } from '../../utils/pinColors';
import './PinDetailCard.css';

interface PinDetailCardProps {
  pin: Pin | null;
  onClose: () => void;
}

export default function PinDetailCard({ pin, onClose }: PinDetailCardProps) {
  if (!pin) {
    return (
      <div className="pin-detail pin-detail-empty">
        <p>Click a pin on the 3D model to see what it does.</p>
      </div>
    );
  }

  return (
    <div className="pin-detail">
      <button className="pin-detail-close" onClick={onClose} aria-label="Close">
        &times;
      </button>
      <span
        className="pin-detail-category"
        style={{ backgroundColor: colorForCategory(pin.category) }}
      >
        {pin.category}
      </span>
      <h3>{pin.name}</h3>
      <p className="pin-detail-function">{pin.function}</p>

      <dl className="pin-detail-specs">
        <dt>Voltage</dt>
        <dd>{pin.voltageRange}</dd>
        <dt>Current</dt>
        <dd>{pin.currentLimit}</dd>
        {pin.alternateFunctions.length > 0 && (
          <>
            <dt>Alt. functions</dt>
            <dd>{pin.alternateFunctions.join(', ')}</dd>
          </>
        )}
      </dl>

      {pin.gotcha && (
        <div className="pin-detail-gotcha">
          <strong>Watch out:</strong> {pin.gotcha}
        </div>
      )}
    </div>
  );
}
