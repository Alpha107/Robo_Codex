import { PcbBoard, headerPositions } from './parts';

const TX_W = 0.35;
const TX_D = 0.3;
const RX_W = 0.5;
const RX_D = 0.35;
const HEIGHT = 0.05;
const TOP = HEIGHT / 2;

const GAP = 0.3;
const TX_X = -(TX_W + GAP + RX_W) / 2 + TX_W / 2;
const RX_X = TX_X + TX_W / 2 + GAP + RX_W / 2;

export const RF433_PAIR_PIN_POSITIONS: Record<string, [number, number, number]> = {
  ...headerPositions(['TX DATA', 'TX VCC', 'TX GND'], TX_X - 0.1, TX_X + 0.1, -TX_D / 2 + 0.03, TOP + 0.02),
  'TX ANT': [TX_X, TOP + 0.15, TX_D / 2 - 0.02],
  ...headerPositions(['RX DATA', 'RX VCC', 'RX GND'], RX_X - 0.14, RX_X + 0.14, -RX_D / 2 + 0.03, TOP + 0.02),
};

export default function Rf433PairModel() {
  return (
    <group>
      {/* Transmitter */}
      <group position={[TX_X, 0, 0]}>
        <PcbBoard width={TX_W} depth={TX_D} height={HEIGHT} color="#2e7d32" />
        <mesh position={[0, TOP + 0.03, 0.05]} castShadow>
          <boxGeometry args={[0.1, 0.06, 0.1]} />
          <meshStandardMaterial color="#c9a227" metalness={0.5} roughness={0.4} />
        </mesh>
        <mesh position={[0, TOP + 0.12, TX_D / 2 - 0.02]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.01, 0.01, 0.22, 8]} />
          <meshStandardMaterial color="#c7ccd1" metalness={0.6} roughness={0.3} />
        </mesh>
      </group>

      {/* Receiver */}
      <group position={[RX_X, 0, 0]}>
        <PcbBoard width={RX_W} depth={RX_D} height={HEIGHT} color="#2e7d32" />
        <mesh position={[-0.1, TOP + 0.02, 0.05]} castShadow>
          <boxGeometry args={[0.16, 0.04, 0.14]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.4} />
        </mesh>
        <mesh position={[0.1, TOP + 0.015, 0.05]} castShadow>
          <boxGeometry args={[0.1, 0.03, 0.1]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.4} />
        </mesh>
      </group>
    </group>
  );
}
