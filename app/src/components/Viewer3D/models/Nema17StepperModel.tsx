import { MountingHole } from './parts';

const FACE_SIZE = 0.62;
const BODY_LEN = 0.65;

export const NEMA17_STEPPER_PIN_POSITIONS: Record<string, [number, number, number]> = {
  'Coil A+': [-0.64, 0.1, 0.62],
  'Coil A-': [-0.52, -0.1, 0.62],
  'Coil B+': [-0.4, 0.1, 0.62],
  'Coil B-': [-0.28, -0.1, 0.62],
};

export default function Nema17StepperModel() {
  return (
    <group>
      {/* Body cylinder */}
      <mesh position={[-0.25, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[FACE_SIZE / 2 - 0.03, FACE_SIZE / 2 - 0.03, BODY_LEN, 32]} />
        <meshStandardMaterial color="#7d838a" metalness={0.6} roughness={0.35} />
      </mesh>
      {/* Square front faceplate */}
      <mesh position={[0.08, 0, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <boxGeometry args={[FACE_SIZE, FACE_SIZE, 0.05]} />
        <meshStandardMaterial color="#3a4046" metalness={0.5} roughness={0.4} />
      </mesh>
      {[
        [FACE_SIZE / 2 - 0.07, FACE_SIZE / 2 - 0.07],
        [FACE_SIZE / 2 - 0.07, -(FACE_SIZE / 2 - 0.07)],
        [-(FACE_SIZE / 2 - 0.07), FACE_SIZE / 2 - 0.07],
        [-(FACE_SIZE / 2 - 0.07), -(FACE_SIZE / 2 - 0.07)],
      ].map(([y, z], i) => (
        <MountingHole key={i} position={[0.11, y, z]} radius={0.035} />
      ))}
      {/* Shaft */}
      <mesh position={[0.35, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.045, 0.045, 0.3, 16]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Wire bundle, bent toward the camera so the 4 coil leads clear the body's silhouette */}
      <mesh position={[-0.45, 0, 0.2]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.15, 12]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
      </mesh>
      {[
        [-0.64, 0.1],
        [-0.52, -0.1],
        [-0.4, 0.1],
        [-0.28, -0.1],
      ].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.42]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.012, 0.012, 0.4, 8]} />
          <meshStandardMaterial color="#c7ccd1" metalness={0.5} roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}
