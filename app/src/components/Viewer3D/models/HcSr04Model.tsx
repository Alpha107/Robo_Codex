const BOARD_WIDTH = 1.8;
const BOARD_DEPTH = 0.8;
const BOARD_HEIGHT = 0.12;
const TOP = BOARD_HEIGHT / 2;
const HEADER_H = 0.12;

function evenSpread(count: number, from: number, to: number): number[] {
  const step = (to - from) / (count - 1);
  return Array.from({ length: count }, (_, i) => from + step * i);
}

const headerX = evenSpread(4, -0.55, 0.55);
const HEADER_Z = -BOARD_DEPTH / 2 + 0.07;
const PIN_Y = TOP + 0.7;

export const HC_SR04_PIN_POSITIONS: Record<string, [number, number, number]> = {
  VCC: [headerX[0], PIN_Y, HEADER_Z],
  TRIG: [headerX[1], PIN_Y, HEADER_Z],
  ECHO: [headerX[2], PIN_Y, HEADER_Z],
  GND: [headerX[3], PIN_Y, HEADER_Z],
};

export default function HcSr04Model() {
  return (
    <group>
      {/* PCB */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={[BOARD_WIDTH, BOARD_HEIGHT, BOARD_DEPTH]} />
        <meshStandardMaterial color="#2f6fae" roughness={0.5} metalness={0.1} />
      </mesh>

      {/* Ultrasonic transducers ("eyes") */}
      {[-0.42, 0.42].map((x) => (
        <group key={x} position={[x, TOP + 0.2, 0.08]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.28, 0.28, 0.4, 24]} />
            <meshStandardMaterial color="#c9cdd3" metalness={0.75} roughness={0.25} />
          </mesh>
          <mesh position={[0, 0.201, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 0.02, 24]} />
            <meshStandardMaterial color="#4a4e55" metalness={0.6} roughness={0.4} />
          </mesh>
        </group>
      ))}

      {/* 4-pin header */}
      <mesh position={[0, TOP + HEADER_H / 2, HEADER_Z]} castShadow>
        <boxGeometry args={[1.25, HEADER_H, 0.16]} />
        <meshStandardMaterial color="#111318" roughness={0.6} />
      </mesh>
    </group>
  );
}
