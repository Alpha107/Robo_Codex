import { PcbBoard, HeaderStrip, UsbConnector, MetalCanModule, TactileButton, DipChip, headerPositionsZ } from './parts';

const WIDTH = 1.0;
const DEPTH = 2.4;
const HEIGHT = 0.1;
const TOP = HEIGHT / 2;
const PIN_Y = TOP + 0.16;

const rowA = ['3V3', 'EN', 'RST', 'A0', 'D0', 'D1', 'D2', 'D3'];
const rowB = ['D4', 'D5', 'D6', 'D7', 'D8', 'RX (D9)', 'TX (D10)', 'GND', 'VIN'];

const LEFT_X = -WIDTH / 2 - 0.04;
const RIGHT_X = WIDTH / 2 + 0.04;

export const ESP8266_PIN_POSITIONS: Record<string, [number, number, number]> = {
  ...headerPositionsZ(rowA, DEPTH / 2 - 0.13, -DEPTH / 2 + 0.13, LEFT_X, PIN_Y),
  ...headerPositionsZ(rowB, DEPTH / 2 - 0.13, -DEPTH / 2 + 0.13, RIGHT_X, PIN_Y),
};

export default function ESP8266Model() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#1c1c1e" />
      <HeaderStrip position={[LEFT_X, TOP + 0.08, 0]} length={DEPTH - 0.26} rotation={[0, Math.PI / 2, 0]} thickness={0.14} height={0.16} />
      <HeaderStrip position={[RIGHT_X, TOP + 0.08, 0]} length={DEPTH - 0.26} rotation={[0, Math.PI / 2, 0]} thickness={0.14} height={0.16} />
      <UsbConnector position={[0, 0.1, DEPTH / 2 + 0.09]} type="microB" />
      <MetalCanModule position={[0, TOP + 0.09, 0.4]} size={[0.7, 0.18, 1.1]} />
      <DipChip position={[0, TOP + 0.03, DEPTH / 2 - 0.5]} size={[0.24, 0.05, 0.24]} color="#1c1c1e" notch={false} />
      <TactileButton position={[-0.3, TOP + 0.03, -DEPTH / 2 + 0.2]} radius={0.06} />
      <TactileButton position={[0.3, TOP + 0.03, -DEPTH / 2 + 0.2]} radius={0.06} />
    </group>
  );
}
