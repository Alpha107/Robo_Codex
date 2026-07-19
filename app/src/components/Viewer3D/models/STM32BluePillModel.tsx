import { PcbBoard, HeaderStrip, UsbConnector, Crystal, TactileButton, headerPositionsZ } from './parts';

const WIDTH = 1.05;
const DEPTH = 2.5;
const HEIGHT = 0.1;
const TOP = HEIGHT / 2;
const PIN_Y = TOP + 0.16;

const rowA = ['PA0', 'PA1', 'PA2', 'PA3', 'PA4', 'PA5', 'PA6', 'PA7', 'PA8', 'PA9', 'PA10', 'PA11', 'PA12', 'PA13', 'PA14', 'PA15', 'PB0', 'PB1', 'GND'];
const rowB = ['PB3', 'PB4', 'PB5', 'PB6', 'PB7', 'PB8', 'PB9', 'PB10', 'PB11', 'PB12', 'PB13', 'PB14', 'PB15', 'PC13', '3V3', '5V', 'VBAT', 'RESET', 'BOOT0'];

const LEFT_X = -WIDTH / 2 - 0.04;
const RIGHT_X = WIDTH / 2 + 0.04;

export const STM32_BLUE_PILL_PIN_POSITIONS: Record<string, [number, number, number]> = {
  ...headerPositionsZ(rowA, DEPTH / 2 - 0.13, -DEPTH / 2 + 0.13, LEFT_X, PIN_Y),
  ...headerPositionsZ(rowB, DEPTH / 2 - 0.13, -DEPTH / 2 + 0.13, RIGHT_X, PIN_Y),
};

export default function STM32BluePillModel() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#12379e" />
      <HeaderStrip position={[LEFT_X, TOP + 0.08, 0]} length={DEPTH - 0.2} rotation={[0, Math.PI / 2, 0]} thickness={0.14} height={0.16} />
      <HeaderStrip position={[RIGHT_X, TOP + 0.08, 0]} length={DEPTH - 0.2} rotation={[0, Math.PI / 2, 0]} thickness={0.14} height={0.16} />

      {/* LQFP48 chip */}
      <mesh position={[0, TOP + 0.03, 0.2]} castShadow>
        <boxGeometry args={[0.55, 0.05, 0.55]} />
        <meshStandardMaterial color="#111318" roughness={0.4} />
      </mesh>
      <Crystal position={[0, TOP + 0.05, -0.35]} />

      <UsbConnector position={[0, 0.1, DEPTH / 2 + 0.09]} type="microB" />
      <TactileButton position={[-0.35, TOP + 0.03, DEPTH / 2 - 0.25]} radius={0.06} />

      {/* BOOT0 jumper block */}
      <mesh position={[0.35, TOP + 0.03, DEPTH / 2 - 0.25]} castShadow>
        <boxGeometry args={[0.16, 0.06, 0.1]} />
        <meshStandardMaterial color="#111318" roughness={0.6} />
      </mesh>
    </group>
  );
}
