const W = 0.5;
const H = 0.7;

// Segment layout in local 2D (x, y) plane, converted to 3D on the front face
const SEG_LEN = 0.28;
const SEG_THICK = 0.05;

export const SEVEN_SEGMENT_DISPLAY_PIN_POSITIONS: Record<string, [number, number, number]> = {
  'Segment A': [0, H / 2 - 0.02, 0.09],
  'Segment B': [SEG_LEN / 2 + 0.02, H / 4 - 0.02, 0.09],
  'Segment C': [SEG_LEN / 2 + 0.02, -H / 4 + 0.02, 0.09],
  'Segment D': [0, -H / 2 + 0.02, 0.09],
  'Segment E': [-SEG_LEN / 2 - 0.02, -H / 4 + 0.02, 0.09],
  'Segment F': [-SEG_LEN / 2 - 0.02, H / 4 - 0.02, 0.09],
  'Segment G': [0, 0, 0.09],
  DP: [W / 2 - 0.03, -H / 2 + 0.02, 0.09],
  COM: [0, -H / 2 - 0.15, 0.09],
};

function HSeg({ y }: { y: number }) {
  return (
    <mesh position={[0, y, 0.076]}>
      <boxGeometry args={[SEG_LEN, SEG_THICK, 0.01]} />
      <meshStandardMaterial color="#e8302a" emissive="#e8302a" emissiveIntensity={1.4} />
    </mesh>
  );
}

function VSeg({ x, y }: { x: number; y: number }) {
  return (
    <mesh position={[x, y, 0.076]}>
      <boxGeometry args={[SEG_THICK, SEG_LEN, 0.01]} />
      <meshStandardMaterial color="#e8302a" emissive="#e8302a" emissiveIntensity={1.4} />
    </mesh>
  );
}

export default function SevenSegmentDisplayModel() {
  return (
    <group>
      {/* Black housing */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[W, H, 0.15]} />
        <meshStandardMaterial color="#0a0a0c" roughness={0.5} />
      </mesh>

      <HSeg y={H / 2 - 0.05} />
      <VSeg x={SEG_LEN / 2 + 0.02} y={H / 4 - 0.03} />
      <VSeg x={SEG_LEN / 2 + 0.02} y={-H / 4 + 0.03} />
      <HSeg y={-H / 2 + 0.05} />
      <VSeg x={-SEG_LEN / 2 - 0.02} y={-H / 4 + 0.03} />
      <VSeg x={-SEG_LEN / 2 - 0.02} y={H / 4 - 0.03} />
      <HSeg y={0} />

      {/* Decimal point */}
      <mesh position={[W / 2 - 0.03, -H / 2 + 0.04, 0.076]}>
        <boxGeometry args={[0.04, 0.04, 0.01]} />
        <meshStandardMaterial color="#e8302a" emissive="#e8302a" emissiveIntensity={1.4} />
      </mesh>
    </group>
  );
}
