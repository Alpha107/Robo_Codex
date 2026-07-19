const SIZE = 0.3;
const HEIGHT = 0.08;
const TOP = HEIGHT / 2;

export const WS2812B_PIN_POSITIONS: Record<string, [number, number, number]> = {
  '5V': [-SIZE / 2 - 0.03, -TOP - 0.02, SIZE / 2 - 0.03],
  GND: [-SIZE / 2 - 0.03, -TOP - 0.02, -SIZE / 2 + 0.03],
  DIN: [SIZE / 2 + 0.03, -TOP - 0.02, -SIZE / 2 + 0.03],
  DOUT: [SIZE / 2 + 0.03, -TOP - 0.02, SIZE / 2 - 0.03],
};

export default function Ws2812bModel() {
  return (
    <group>
      {/* White SMD package body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[SIZE, HEIGHT, SIZE]} />
        <meshStandardMaterial color="#f2f2f2" roughness={0.4} />
      </mesh>

      {/* Diffused RGB emitting window */}
      <mesh position={[0, TOP + 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.1, 24]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ff3355"
          emissiveIntensity={0.7}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Corner pin pads */}
      {[
        [-SIZE / 2 + 0.02, SIZE / 2 - 0.02],
        [-SIZE / 2 + 0.02, -SIZE / 2 + 0.02],
        [SIZE / 2 - 0.02, -SIZE / 2 + 0.02],
        [SIZE / 2 - 0.02, SIZE / 2 - 0.02],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, -TOP - 0.005, z]}>
          <boxGeometry args={[0.05, 0.01, 0.05]} />
          <meshStandardMaterial color="#c7ccd1" metalness={0.6} roughness={0.35} />
        </mesh>
      ))}
    </group>
  );
}
