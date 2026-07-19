// Stylized (not photorealistic) stand-in for the real board: proportioned
// primitives instead of an imported mesh, until authored 3D assets exist.

const BOARD_WIDTH = 2.7;
const BOARD_DEPTH = 2.1;
const BOARD_HEIGHT = 0.12;
const TOP = BOARD_HEIGHT / 2;

const HEADER_H = 0.12;
const PIN_Y = TOP + HEADER_H + 0.04;

function evenSpread(count: number, from: number, to: number): number[] {
  if (count === 1) return [(from + to) / 2];
  const step = (to - from) / (count - 1);
  return Array.from({ length: count }, (_, i) => from + step * i);
}

const digitalBlockA = evenSpread(8, -1.15, -0.2); // AREF GND D13..D8
const digitalBlockB = evenSpread(8, 0.2, 1.15); // D7..D0
const analogBlock = evenSpread(6, -1.15, -0.3); // A0..A5
const powerBlock = evenSpread(5, 0.1, 1.15); // IOREF RESET 3.3V 5V VIN

const FRONT_Z = BOARD_DEPTH / 2 - 0.08;
const BACK_Z = -BOARD_DEPTH / 2 + 0.08;

export const ARDUINO_PIN_POSITIONS: Record<string, [number, number, number]> = {
  AREF: [digitalBlockA[0], PIN_Y, FRONT_Z],
  GND: [digitalBlockA[1], PIN_Y, FRONT_Z],
  D13: [digitalBlockA[2], PIN_Y, FRONT_Z],
  D12: [digitalBlockA[3], PIN_Y, FRONT_Z],
  D11: [digitalBlockA[4], PIN_Y, FRONT_Z],
  D10: [digitalBlockA[5], PIN_Y, FRONT_Z],
  D9: [digitalBlockA[6], PIN_Y, FRONT_Z],
  D8: [digitalBlockA[7], PIN_Y, FRONT_Z],
  D7: [digitalBlockB[0], PIN_Y, FRONT_Z],
  D6: [digitalBlockB[1], PIN_Y, FRONT_Z],
  D5: [digitalBlockB[2], PIN_Y, FRONT_Z],
  D4: [digitalBlockB[3], PIN_Y, FRONT_Z],
  D3: [digitalBlockB[4], PIN_Y, FRONT_Z],
  D2: [digitalBlockB[5], PIN_Y, FRONT_Z],
  'D1 (TX)': [digitalBlockB[6], PIN_Y, FRONT_Z],
  'D0 (RX)': [digitalBlockB[7], PIN_Y, FRONT_Z],
  A0: [analogBlock[0], PIN_Y, BACK_Z],
  A1: [analogBlock[1], PIN_Y, BACK_Z],
  A2: [analogBlock[2], PIN_Y, BACK_Z],
  A3: [analogBlock[3], PIN_Y, BACK_Z],
  A4: [analogBlock[4], PIN_Y, BACK_Z],
  A5: [analogBlock[5], PIN_Y, BACK_Z],
  IOREF: [powerBlock[0], PIN_Y, BACK_Z],
  RESET: [powerBlock[1], PIN_Y, BACK_Z],
  '3.3V': [powerBlock[2], PIN_Y, BACK_Z],
  '5V': [powerBlock[3], PIN_Y, BACK_Z],
  VIN: [powerBlock[4], PIN_Y, BACK_Z],
};

export default function ArduinoUnoModel() {
  return (
    <group>
      {/* PCB */}
      <mesh position={[0, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[BOARD_WIDTH, BOARD_HEIGHT, BOARD_DEPTH]} />
        <meshStandardMaterial color="#0b6e77" roughness={0.55} metalness={0.15} />
      </mesh>

      {/* Digital header strips (front edge) */}
      <mesh position={[(digitalBlockA[0] + digitalBlockA[7]) / 2, TOP + HEADER_H / 2, FRONT_Z]} castShadow>
        <boxGeometry args={[digitalBlockA[7] - digitalBlockA[0] + 0.15, HEADER_H, 0.16]} />
        <meshStandardMaterial color="#111318" roughness={0.6} />
      </mesh>
      <mesh position={[(digitalBlockB[0] + digitalBlockB[7]) / 2, TOP + HEADER_H / 2, FRONT_Z]} castShadow>
        <boxGeometry args={[digitalBlockB[7] - digitalBlockB[0] + 0.15, HEADER_H, 0.16]} />
        <meshStandardMaterial color="#111318" roughness={0.6} />
      </mesh>

      {/* Analog + power header strips (back edge) */}
      <mesh position={[(analogBlock[0] + analogBlock[5]) / 2, TOP + HEADER_H / 2, BACK_Z]} castShadow>
        <boxGeometry args={[analogBlock[5] - analogBlock[0] + 0.15, HEADER_H, 0.16]} />
        <meshStandardMaterial color="#111318" roughness={0.6} />
      </mesh>
      <mesh position={[(powerBlock[0] + powerBlock[4]) / 2, TOP + HEADER_H / 2, BACK_Z]} castShadow>
        <boxGeometry args={[powerBlock[4] - powerBlock[0] + 0.15, HEADER_H, 0.16]} />
        <meshStandardMaterial color="#111318" roughness={0.6} />
      </mesh>

      {/* USB-B connector */}
      <mesh position={[-BOARD_WIDTH / 2 - 0.09, 0.14, 0.62]} castShadow>
        <boxGeometry args={[0.32, 0.32, 0.4]} />
        <meshStandardMaterial color="#c7ccd1" roughness={0.35} metalness={0.7} />
      </mesh>

      {/* Barrel jack */}
      <mesh
        position={[-BOARD_WIDTH / 2 - 0.1, 0.06, 0.05]}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
      >
        <cylinderGeometry args={[0.22, 0.22, 0.3, 20]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} metalness={0.3} />
      </mesh>

      {/* ATmega328P chip */}
      <mesh position={[0.3, TOP + 0.03, -0.15]} castShadow>
        <boxGeometry args={[0.62, 0.06, 0.32]} />
        <meshStandardMaterial color="#15161a" roughness={0.4} />
      </mesh>
      <mesh position={[0.05, TOP + 0.065, -0.28]}>
        <circleGeometry args={[0.025, 12]} />
        <meshStandardMaterial color="#8a8f99" />
      </mesh>

      {/* Crystal oscillator */}
      <mesh position={[0.85, TOP + 0.04, -0.15]} castShadow>
        <boxGeometry args={[0.16, 0.09, 0.09]} />
        <meshStandardMaterial color="#b8bcc2" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Reset button */}
      <mesh position={[-1.05, TOP + 0.03, 0.75]} castShadow>
        <cylinderGeometry args={[0.09, 0.09, 0.06, 16]} />
        <meshStandardMaterial color="#d0433e" roughness={0.4} />
      </mesh>

      {/* Onboard "L" LED */}
      <mesh position={[0.55, TOP + 0.02, 0.2]}>
        <boxGeometry args={[0.05, 0.03, 0.03]} />
        <meshStandardMaterial color="#ff9f43" emissive="#ff9f43" emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
}
