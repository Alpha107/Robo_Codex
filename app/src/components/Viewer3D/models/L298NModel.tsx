import { PcbBoard, headerPositions } from './parts';

const WIDTH = 1.8;
const DEPTH = 1.2;
const HEIGHT = 0.1;
const TOP = HEIGHT / 2;

const logicPins = ['IN1', 'IN2', 'IN3', 'IN4', 'ENA', 'ENB'];
const LOGIC_Z = -DEPTH / 2 + 0.08;
const PIN_Y = TOP + 0.16;

export const L298N_PIN_POSITIONS: Record<string, [number, number, number]> = {
  ...headerPositions(logicPins, -0.55, 0.1, LOGIC_Z, PIN_Y),
  OUT1: [-0.75, 0.24, DEPTH / 2 - 0.1],
  OUT2: [-0.6, 0.24, DEPTH / 2 - 0.1],
  OUT3: [0.6, 0.24, DEPTH / 2 - 0.1],
  OUT4: [0.75, 0.24, DEPTH / 2 - 0.1],
  '+12V': [-0.85, 0.24, 0.15],
  GND: [-0.85, 0.24, -0.05],
  '+5V': [0.85, 0.16, -0.35],
};

export default function L298NModel() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#1e824c" />

      {/* Black heatsink block */}
      <mesh position={[0, TOP + 0.11, 0.05]} castShadow>
        <boxGeometry args={[0.55, 0.22, 0.5]} />
        <meshStandardMaterial color="#0d0d0d" roughness={0.5} />
      </mesh>

      {/* Motor output screw terminals */}
      <mesh position={[-0.68, TOP + 0.07, DEPTH / 2 - 0.1]} castShadow>
        <boxGeometry args={[0.28, 0.14, 0.16]} />
        <meshStandardMaterial color="#2a6ebb" roughness={0.5} />
      </mesh>
      <mesh position={[0.68, TOP + 0.07, DEPTH / 2 - 0.1]} castShadow>
        <boxGeometry args={[0.28, 0.14, 0.16]} />
        <meshStandardMaterial color="#2a6ebb" roughness={0.5} />
      </mesh>
      {/* Power screw terminal */}
      <mesh position={[-0.85, TOP + 0.07, 0.05]} castShadow>
        <boxGeometry args={[0.16, 0.14, 0.35]} />
        <meshStandardMaterial color="#2a6ebb" roughness={0.5} />
      </mesh>

      {/* Logic pin header housing */}
      <mesh position={[-0.2, TOP + 0.08, LOGIC_Z]} castShadow>
        <boxGeometry args={[1.1, 0.12, 0.12]} />
        <meshStandardMaterial color="#111318" roughness={0.6} />
      </mesh>

      {/* 5V regulator jumper */}
      <mesh position={[0.85, TOP + 0.03, -0.35]} castShadow>
        <boxGeometry args={[0.1, 0.06, 0.1]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.6} />
      </mesh>
    </group>
  );
}
