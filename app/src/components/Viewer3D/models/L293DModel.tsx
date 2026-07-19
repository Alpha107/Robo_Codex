const BODY_W = 0.85;
const BODY_H = 0.14;
const BODY_D = 0.35;
const PIN_Y = 0.02;

function evenSpread(count: number, from: number, to: number): number[] {
  const step = (to - from) / (count - 1);
  return Array.from({ length: count }, (_, i) => from + step * i);
}

const leftPins = ['1,2EN', '1A', '2A', '1Y', 'GND', 'GND', '3Y', '3A'];
const rightPinsBottomUp = ['4A', '4Y', 'GND', 'GND', '2Y', 'VCC2', '3,4EN', 'VCC1'];

const leftX = -BODY_W / 2 - 0.08;
const rightX = BODY_W / 2 + 0.08;
const leftZ = evenSpread(8, BODY_D / 2 - 0.03, -BODY_D / 2 + 0.03);
const rightZ = evenSpread(8, -BODY_D / 2 + 0.03, BODY_D / 2 - 0.03);

export const L293D_PIN_POSITIONS: Record<string, [number, number, number]> = {};
leftPins.forEach((name, i) => {
  if (!(name in L293D_PIN_POSITIONS)) L293D_PIN_POSITIONS[name] = [leftX, PIN_Y, leftZ[i]];
});
rightPinsBottomUp.forEach((name, i) => {
  if (!(name in L293D_PIN_POSITIONS)) L293D_PIN_POSITIONS[name] = [rightX, PIN_Y, rightZ[i]];
});

export default function L293DModel() {
  return (
    <group>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[BODY_W, BODY_H, BODY_D]} />
        <meshStandardMaterial color="#17181c" roughness={0.5} />
      </mesh>
      <mesh position={[-BODY_W / 2 + 0.06, BODY_H / 2 + 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.03, 16]} />
        <meshStandardMaterial color="#8a8f99" />
      </mesh>
      {[...leftZ.map((z) => [leftX + 0.06, z] as const), ...rightZ.map((z) => [rightX - 0.06, z] as const)].map(
        ([x, z], i) => (
          <mesh key={i} position={[x, 0, z]} castShadow>
            <boxGeometry args={[0.12, 0.02, 0.035]} />
            <meshStandardMaterial color="#c7ccd1" metalness={0.7} roughness={0.3} />
          </mesh>
        ),
      )}
    </group>
  );
}
