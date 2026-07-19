const W = 1.6;
const D = 0.9;
const H = 0.08;
const TOP = H / 2;

export const BREADBOARD_PIN_POSITIONS: Record<string, [number, number, number]> = {
  'Power Rail (+)': [0, TOP + 0.001, D / 2 - 0.08],
  'Power Rail (-)': [0, TOP + 0.001, D / 2 - 0.15],
  'Terminal Strip': [0, TOP + 0.001, 0],
};

export default function BreadboardModel() {
  const holesPerRow = 30;
  return (
    <group>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[W, H, D]} />
        <meshStandardMaterial color="#f2f0e6" roughness={0.6} />
      </mesh>

      {/* Red/blue rail stripes */}
      <mesh position={[0, TOP + 0.001, D / 2 - 0.06]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[W - 0.1, 0.02]} />
        <meshStandardMaterial color="#d1342a" />
      </mesh>
      <mesh position={[0, TOP + 0.001, D / 2 - 0.16]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[W - 0.1, 0.02]} />
        <meshStandardMaterial color="#2255aa" />
      </mesh>
      <mesh position={[0, TOP + 0.001, -D / 2 + 0.06]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[W - 0.1, 0.02]} />
        <meshStandardMaterial color="#d1342a" />
      </mesh>
      <mesh position={[0, TOP + 0.001, -D / 2 + 0.16]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[W - 0.1, 0.02]} />
        <meshStandardMaterial color="#2255aa" />
      </mesh>

      {/* Center gap */}
      <mesh position={[0, TOP + 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[W - 0.1, 0.06]} />
        <meshStandardMaterial color="#d8d4c4" />
      </mesh>

      {/* Sparse hole grid for visual texture */}
      {Array.from({ length: holesPerRow }).map((_, col) =>
        [0.3, 0.15, -0.15, -0.3].map((z, ri) => (
          <mesh
            key={`${col}-${ri}`}
            position={[-W / 2 + 0.1 + col * ((W - 0.2) / (holesPerRow - 1)), TOP + 0.001, z]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <circleGeometry args={[0.012, 8]} />
            <meshStandardMaterial color="#3a3a3a" />
          </mesh>
        )),
      )}
    </group>
  );
}
