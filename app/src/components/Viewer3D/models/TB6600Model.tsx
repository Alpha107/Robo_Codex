import { PcbBoard, headerPositions } from './parts';

const WIDTH = 1.4;
const DEPTH = 1.0;
const HEIGHT = 0.12;
const TOP = HEIGHT / 2;
const PIN_Y = TOP + 0.2;

const controlPins = ['PUL+', 'PUL-', 'DIR+', 'DIR-', 'ENA+', 'ENA-'];
const motorPins = ['A+', 'A-', 'B+', 'B-'];
const powerPins = ['VCC', 'GND'];

export const TB6600_PIN_POSITIONS: Record<string, [number, number, number]> = {
  ...headerPositions(controlPins, -0.6, 0.6, -DEPTH / 2 + 0.08, PIN_Y),
  ...headerPositions(motorPins, -0.35, 0.35, DEPTH / 2 - 0.08, PIN_Y),
  ...headerPositions(powerPins, 0.5, 0.65, DEPTH / 2 - 0.08, PIN_Y),
};

export default function TB6600Model() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#1c1c1e" />

      {/* Metal enclosure look - side heatsink fins */}
      <mesh position={[-0.6, TOP + 0.1, 0]} castShadow>
        <boxGeometry args={[0.15, 0.2, DEPTH - 0.1]} />
        <meshStandardMaterial color="#8a8f99" metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[0.6, TOP + 0.1, 0]} castShadow>
        <boxGeometry args={[0.15, 0.2, DEPTH - 0.1]} />
        <meshStandardMaterial color="#8a8f99" metalness={0.6} roughness={0.35} />
      </mesh>

      {/* DIP switch bank */}
      <mesh position={[0, TOP + 0.03, 0.1]} castShadow>
        <boxGeometry args={[0.35, 0.06, 0.2]} />
        <meshStandardMaterial color="#2b2f36" roughness={0.5} />
      </mesh>

      {/* Screw terminal blocks */}
      <mesh position={[-0.1, TOP + 0.06, -DEPTH / 2 + 0.08]} castShadow>
        <boxGeometry args={[1.1, 0.12, 0.14]} />
        <meshStandardMaterial color="#2a6ebb" roughness={0.5} />
      </mesh>
      <mesh position={[0, TOP + 0.06, DEPTH / 2 - 0.08]} castShadow>
        <boxGeometry args={[1.1, 0.12, 0.14]} />
        <meshStandardMaterial color="#2a6ebb" roughness={0.5} />
      </mesh>
    </group>
  );
}
