import { PcbBoard, HeaderStrip, UsbConnector, DipChip, Crystal, Led, headerPositionsZ } from './parts';

const WIDTH = 1.0;
const DEPTH = 2.6;
const HEIGHT = 0.1;
const TOP = HEIGHT / 2;
const PIN_Y = TOP + 0.16;

const rowA = ['D1 (TX)', 'D0 (RX)', 'RESET', 'GND', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11', 'D12', 'D13'];
const rowB = ['3.3V', 'AREF', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', '5V', 'VIN'];

const LEFT_X = -WIDTH / 2 - 0.04;
const RIGHT_X = WIDTH / 2 + 0.04;

export const ARDUINO_NANO_PIN_POSITIONS: Record<string, [number, number, number]> = {
  ...headerPositionsZ(rowA, DEPTH / 2 - 0.15, -DEPTH / 2 + 0.15, LEFT_X, PIN_Y),
  ...headerPositionsZ(rowB, DEPTH / 2 - 0.15, -DEPTH / 2 + 0.15, RIGHT_X, PIN_Y),
};

export default function ArduinoNanoModel() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#0b6e77" />

      <HeaderStrip
        position={[LEFT_X, TOP + 0.08, 0]}
        length={DEPTH - 0.3}
        rotation={[0, Math.PI / 2, 0]}
        thickness={0.14}
        height={0.16}
      />
      <HeaderStrip
        position={[RIGHT_X, TOP + 0.08, 0]}
        length={DEPTH - 0.3}
        rotation={[0, Math.PI / 2, 0]}
        thickness={0.14}
        height={0.16}
      />

      <UsbConnector position={[0, 0.12, DEPTH / 2 + 0.1]} type="microB" />
      <DipChip position={[0, TOP + 0.03, 0.1]} size={[0.42, 0.06, 0.55]} />
      <Crystal position={[0.28, TOP + 0.05, 0.55]} />
      <Led position={[0.2, TOP + 0.02, -0.5]} color="#ff9f43" />
    </group>
  );
}
