const R = 0.45;
const WIDTH = 0.25;

export const ROBOT_WHEEL_PIN_POSITIONS: Record<string, [number, number, number]> = {
  'Hub Bore': [0, WIDTH / 2 + 0.02, 0],
  'Set Screw': [0.1, WIDTH / 2 + 0.02, 0.1],
  'Tire Tread': [R, 0, 0],
};

export default function RobotWheelModel() {
  return (
    <group>
      {/* Tire */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[R, R, WIDTH, 32]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.7} />
      </mesh>
      {/* Hub */}
      <mesh castShadow>
        <cylinderGeometry args={[R - 0.12, R - 0.12, WIDTH + 0.01, 6]} />
        <meshStandardMaterial color="#e8e8ec" roughness={0.4} />
      </mesh>
      {/* D-shaft bore */}
      <mesh castShadow>
        <cylinderGeometry args={[0.06, 0.06, WIDTH + 0.02, 16]} />
        <meshStandardMaterial color="#0a0a0c" />
      </mesh>
    </group>
  );
}
