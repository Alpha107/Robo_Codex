const BODY_W = 0.5;
const BODY_H = 0.14;
const BODY_D = 0.28;
const TOP = BODY_H / 2;
const PIN_Y = 0.02;

const leftX = -BODY_W / 2 - 0.09;
const rightX = BODY_W / 2 + 0.09;
const leftPins = ['PB5 (RESET)', 'PB3 (XTAL1)', 'PB4 (XTAL2)', 'GND'];
const rightPinsBottomUp = ['PB0 (MOSI)', 'PB1 (MISO)', 'PB2 (SCK)', 'VCC'];

function evenSpread(count: number, from: number, to: number): number[] {
  const step = (to - from) / (count - 1);
  return Array.from({ length: count }, (_, i) => from + step * i);
}

const leftZ = evenSpread(4, BODY_D / 2 - 0.03, -BODY_D / 2 + 0.03);
const rightZ = evenSpread(4, -BODY_D / 2 + 0.03, BODY_D / 2 - 0.03);

export const ATTINY85_PIN_POSITIONS: Record<string, [number, number, number]> = {};
leftPins.forEach((name, i) => {
  ATTINY85_PIN_POSITIONS[name] = [leftX, PIN_Y, leftZ[i]];
});
rightPinsBottomUp.forEach((name, i) => {
  ATTINY85_PIN_POSITIONS[name] = [rightX, PIN_Y, rightZ[i]];
});

export default function ATtiny85Model() {
  return (
    <group>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[BODY_W, BODY_H, BODY_D]} />
        <meshStandardMaterial color="#17181c" roughness={0.5} />
      </mesh>
      {/* pin-1 notch indicator */}
      <mesh position={[-BODY_W / 2 + 0.04, TOP + 0.001, 0]}>
        <circleGeometry args={[0.025, 12]} />
        <meshStandardMaterial color="#8a8f99" />
      </mesh>
      {[...leftZ.map((z) => [leftX + 0.045, z] as const), ...rightZ.map((z) => [rightX - 0.045, z] as const)].map(
        ([x, z], i) => (
          <mesh key={i} position={[x, 0, z]} castShadow>
            <boxGeometry args={[0.09, 0.02, 0.03]} />
            <meshStandardMaterial color="#c7ccd1" metalness={0.7} roughness={0.3} />
          </mesh>
        ),
      )}
    </group>
  );
}
