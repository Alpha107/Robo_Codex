import { QuadraticBezierCurve3, Vector3, TubeGeometry } from 'three';

const COLORS = ['#d1342a', '#e8901f', '#f0d020', '#2ecc71', '#4dabf7', '#9b59b6'];

export const JUMPER_WIRES_PIN_POSITIONS: Record<string, [number, number, number]> = {
  'Male End': [-0.5, 0, 0.15],
  'Female End': [0.5, 0, -0.15],
};

function WireStrand({ color, offset }: { color: string; offset: number }) {
  const curve = new QuadraticBezierCurve3(
    new Vector3(-0.5, 0, offset),
    new Vector3(0, 0.25 + offset * 0.3, 0),
    new Vector3(0.5, 0, -offset),
  );
  const geometry = new TubeGeometry(curve, 20, 0.02, 8, false);
  return (
    <mesh geometry={geometry} castShadow>
      <meshStandardMaterial color={color} roughness={0.5} />
    </mesh>
  );
}

export default function JumperWiresModel() {
  return (
    <group>
      {COLORS.map((color, i) => (
        <WireStrand key={color} color={color} offset={(i - COLORS.length / 2) * 0.06} />
      ))}
      {/* Male pin end */}
      <mesh position={[-0.55, 0, 0.15]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 0.15, 8]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Female socket end */}
      <mesh position={[0.57, 0, -0.15]} castShadow>
        <boxGeometry args={[0.1, 0.05, 0.05]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
      </mesh>
    </group>
  );
}
