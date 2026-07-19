import { PcbBoard, DipChip, Crystal, Led, headerPositionsZ } from './parts';

const WIDTH = 0.75;
const DEPTH = 1.4;
const HEIGHT = 0.08;
const TOP = HEIGHT / 2;
const PIN_Y = TOP + 0.06;

const rowA = ['D0 (RX)', 'D1 (TX)', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11', 'D12', 'D13'];
const rowB = ['A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'VCC', 'GND', 'RESET', 'DTR'];

const LEFT_X = -WIDTH / 2;
const RIGHT_X = WIDTH / 2;

export const ARDUINO_PRO_MINI_PIN_POSITIONS: Record<string, [number, number, number]> = {
  ...headerPositionsZ(rowA, DEPTH / 2 - 0.08, -DEPTH / 2 + 0.08, LEFT_X, PIN_Y),
  ...headerPositionsZ(rowB, DEPTH / 2 - 0.08, -DEPTH / 2 + 0.08, RIGHT_X, PIN_Y),
};

export default function ArduinoProMiniModel() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#a52422" />
      <DipChip position={[0, TOP + 0.03, 0.05]} size={[0.36, 0.05, 0.5]} />
      <Crystal position={[0.2, TOP + 0.045, 0.5]} size={[0.12, 0.07, 0.07]} />
      <Led position={[0.15, TOP + 0.02, -0.5]} color="#ff9f43" />
      {/* 6-pin FTDI programming header (decorative, no separate hotspots) */}
      <mesh position={[0, TOP + 0.06, -DEPTH / 2 - 0.05]} castShadow>
        <boxGeometry args={[0.45, 0.1, 0.09]} />
        <meshStandardMaterial color="#111318" roughness={0.6} />
      </mesh>
    </group>
  );
}
