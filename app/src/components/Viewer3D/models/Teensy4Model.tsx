import { PcbBoard, UsbConnector, DipChip, headerPositionsZ } from './parts';

const WIDTH = 0.85;
const DEPTH = 1.9;
const HEIGHT = 0.08;
const TOP = HEIGHT / 2;
const PIN_Y = TOP + 0.02;

const rowA = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];
const rowB = ['14 (A0)', '15 (A1)', '16 (A2)', '17 (A3)', '18 (A4)', '19 (A5)', '20 (A6)', '21 (A7)', '22 (A8)', '23 (A9)', '3.3V', 'GND', 'VIN'];

const LEFT_X = -WIDTH / 2 + 0.02;
const RIGHT_X = WIDTH / 2 - 0.02;

export const TEENSY4_PIN_POSITIONS: Record<string, [number, number, number]> = {
  ...headerPositionsZ(rowA, DEPTH / 2 - 0.1, -DEPTH / 2 + 0.1, LEFT_X, PIN_Y),
  ...headerPositionsZ(rowB, DEPTH / 2 - 0.1, -DEPTH / 2 + 0.1, RIGHT_X, PIN_Y),
};

export default function Teensy4Model() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#0b6e77" />
      <DipChip position={[0, TOP + 0.03, 0.1]} size={[0.5, 0.06, 0.6]} />
      <UsbConnector position={[0, 0.09, DEPTH / 2 + 0.08]} type="microB" />
    </group>
  );
}
