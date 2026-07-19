const W = 1.2;
const D = 0.8;
const H = 0.04;
const TOP = H / 2;

export const PERFBOARD_PIN_POSITIONS: Record<string, [number, number, number]> = {
  'Pad/Strip': [0, TOP + 0.001, 0],
  'Mounting Hole': [W / 2 - 0.08, TOP + 0.001, D / 2 - 0.08],
};

export default function PerfboardModel() {
  const cols = 16;
  const rows = 10;
  return (
    <group>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[W, H, D]} />
        <meshStandardMaterial color="#8b6f47" roughness={0.6} />
      </mesh>

      {/* Copper strips on underside look (visible from top as rows) */}
      {Array.from({ length: rows }).map((_, r) => (
        <mesh
          key={r}
          position={[0, TOP + 0.001, -D / 2 + 0.08 + r * (D - 0.16) / (rows - 1)]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[W - 0.1, 0.015]} />
          <meshStandardMaterial color="#c9a227" metalness={0.5} roughness={0.4} />
        </mesh>
      ))}

      {/* Holes */}
      {Array.from({ length: cols }).map((_, c) =>
        Array.from({ length: rows }).map((_, r) => (
          <mesh
            key={`${c}-${r}`}
            position={[
              -W / 2 + 0.08 + c * ((W - 0.16) / (cols - 1)),
              TOP + 0.002,
              -D / 2 + 0.08 + r * ((D - 0.16) / (rows - 1)),
            ]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <circleGeometry args={[0.012, 8]} />
            <meshStandardMaterial color="#2b2318" />
          </mesh>
        )),
      )}
    </group>
  );
}
