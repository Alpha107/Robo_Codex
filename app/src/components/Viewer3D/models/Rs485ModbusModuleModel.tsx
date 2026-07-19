import { PcbBoard, DipChip, headerPositionsZ, headerPositions, Led } from './parts';

const WIDTH = 0.65;
const DEPTH = 0.4;
const HEIGHT = 0.06;
const TOP = HEIGHT / 2;

const uartPins = ['VCC', 'GND', 'RO', 'DI', 'DE', 'RE'];

export const RS485_MODBUS_MODULE_PIN_POSITIONS: Record<string, [number, number, number]> = {
  ...headerPositionsZ(uartPins, DEPTH / 2 - 0.04, -DEPTH / 2 + 0.1, -WIDTH / 2 + 0.03, TOP + 0.02),
  ...headerPositions(['A', 'B'], -0.1, 0.1, DEPTH / 2 - 0.03, TOP + 0.05),
};

export default function Rs485ModbusModuleModel() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#0b6e77" />

      {/* MAX485-class transceiver (8-pin DIP) */}
      <DipChip position={[-0.05, TOP + 0.03, -0.02]} size={[0.3, 0.06, 0.16]} />

      {/* Bus-activity status LEDs */}
      <Led position={[0.18, TOP + 0.005, -0.1]} color="#2ecc71" />
      <Led position={[0.18, TOP + 0.005, 0.02]} color="#e64545" />

      {/* Screw terminal block for A/B differential pair */}
      <mesh position={[0, TOP + 0.045, DEPTH / 2 - 0.04]} castShadow>
        <boxGeometry args={[0.24, 0.09, 0.08]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
      </mesh>

      {/* UART-side pin header along the left edge */}
      <mesh position={[-WIDTH / 2 + 0.04, TOP + 0.06, 0]} castShadow>
        <boxGeometry args={[0.08, 0.12, DEPTH - 0.1]} />
        <meshStandardMaterial color="#2b2f38" roughness={0.55} />
      </mesh>
    </group>
  );
}
