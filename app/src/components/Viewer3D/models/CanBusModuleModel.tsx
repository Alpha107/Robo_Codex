import { PcbBoard, DipChip, Crystal, headerPositionsZ, headerPositions } from './parts';

const WIDTH = 0.85;
const DEPTH = 0.55;
const HEIGHT = 0.06;
const TOP = HEIGHT / 2;

const spiPins = ['VCC', 'GND', 'CS', 'SO', 'SI', 'SCK', 'INT'];

export const CAN_BUS_MODULE_PIN_POSITIONS: Record<string, [number, number, number]> = {
  ...headerPositionsZ(spiPins, DEPTH / 2 - 0.05, -DEPTH / 2 + 0.1, -WIDTH / 2 + 0.03, TOP + 0.02),
  ...headerPositions(['CANH', 'CANL'], 0.18, 0.32, DEPTH / 2 - 0.03, TOP + 0.05),
};

export default function CanBusModuleModel() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#111318" />

      {/* MCP2515 controller (DIP-style) */}
      <DipChip position={[-0.15, TOP + 0.03, -0.02]} size={[0.4, 0.06, 0.22]} />

      {/* Oscillator crystal for the controller */}
      <Crystal position={[-0.15, TOP + 0.045, -0.2]} />

      {/* TJA1050-class transceiver chip (smaller) */}
      <mesh position={[0.2, TOP + 0.025, -0.02]} castShadow>
        <boxGeometry args={[0.16, 0.04, 0.12]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} />
      </mesh>

      {/* Termination-resistor solder jumper pads */}
      <mesh position={[0.3, TOP + 0.005, 0.12]}>
        <boxGeometry args={[0.06, 0.008, 0.03]} />
        <meshStandardMaterial color="#c9a227" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Screw terminal block for CANH/CANL */}
      <mesh position={[0.25, TOP + 0.045, DEPTH / 2 - 0.05]} castShadow>
        <boxGeometry args={[0.28, 0.09, 0.09]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
      </mesh>

      {/* SPI pin header along the left edge */}
      <mesh position={[-WIDTH / 2 + 0.04, TOP + 0.06, 0]} castShadow>
        <boxGeometry args={[0.08, 0.12, DEPTH - 0.14]} />
        <meshStandardMaterial color="#2b2f38" roughness={0.55} />
      </mesh>
    </group>
  );
}
