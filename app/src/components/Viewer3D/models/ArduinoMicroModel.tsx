import { PcbBoard, HeaderStrip, UsbConnector, DipChip, Crystal, Led, headerPositionsZ } from './parts';

const WIDTH = 0.95;
const DEPTH = 2.2;
const HEIGHT = 0.1;
const TOP = HEIGHT / 2;
const PIN_Y = TOP + 0.16;

const rowA = ['D0 (RX)', 'D1 (TX)', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11', 'D12', 'D13'];
const rowB = ['A0', 'A1', 'A2', 'A3', 'A4', 'A5', '5V', 'VIN', 'GND', 'RESET'];

const LEFT_X = -WIDTH / 2 - 0.04;
const RIGHT_X = WIDTH / 2 + 0.04;

export const ARDUINO_MICRO_PIN_POSITIONS: Record<string, [number, number, number]> = {
  ...headerPositionsZ(rowA, DEPTH / 2 - 0.13, -DEPTH / 2 + 0.13, LEFT_X, PIN_Y),
  ...headerPositionsZ(rowB, DEPTH / 2 - 0.13, -DEPTH / 2 + 0.13, RIGHT_X, PIN_Y),
};

export default function ArduinoMicroModel() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#1a5276" />
      <HeaderStrip position={[LEFT_X, TOP + 0.08, 0]} length={DEPTH - 0.24} rotation={[0, Math.PI / 2, 0]} thickness={0.14} height={0.16} />
      <HeaderStrip position={[RIGHT_X, TOP + 0.08, 0]} length={DEPTH - 0.24} rotation={[0, Math.PI / 2, 0]} thickness={0.14} height={0.16} />
      <UsbConnector position={[0, 0.1, DEPTH / 2 + 0.09]} type="microB" />
      <DipChip position={[0, TOP + 0.03, 0.1]} size={[0.4, 0.06, 0.5]} />
      <Crystal position={[0.25, TOP + 0.05, 0.5]} />
      <Led position={[0.2, TOP + 0.02, -0.4]} />
    </group>
  );
}
