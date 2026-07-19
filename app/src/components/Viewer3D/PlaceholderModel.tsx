import type { BoardFootprint } from '../../data/hotspotLayout';

interface PlaceholderModelProps {
  footprint: BoardFootprint;
}

// Stand-in geometry until authored 3D models exist for each component
// (see content-pilot/README.md). A flat box reads reasonably as "a board"
// for every MVP component without needing per-part art yet.
export default function PlaceholderModel({ footprint }: PlaceholderModelProps) {
  const { width, depth, height } = footprint;

  return (
    <mesh castShadow receiveShadow>
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial color="#2f6f3e" roughness={0.6} metalness={0.1} />
    </mesh>
  );
}
