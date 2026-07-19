import { Led, headerPositions } from './parts';

// Industrial PLC: a rectangular DIN-rail-mount enclosure - a plain grey/black box,
// wider and flatter than a dev board - with a row of terminal-block screw
// connectors along the bottom front edge and a couple of status LEDs on the face.
// Fully enclosed, NOT a bare PCB - real PLCs ship this way.

const ENC_WIDTH = 2.2;
const ENC_HEIGHT = 1.6;
const ENC_DEPTH = 1.0;
const ENC_Y = ENC_HEIGHT / 2;

const FRONT_Z = ENC_DEPTH / 2;
const TERMINAL_Z = FRONT_Z + 0.06;
const TERMINAL_Y = 0.2;

const terminalNames = [
  '24V DC Power In (L+)',
  '24V DC Power In (M)',
  'Protective Earth (PE)',
  'Digital Input Common (DI COM)',
  'Digital Input 0 (DI0)',
  'Digital Input 1 (DI1)',
  'Digital Input 2 (DI2)',
  'Digital Input 3 (DI3)',
  'Digital Output 0 (DO0 - Relay)',
  'Digital Output 1 (DO1 - Relay)',
  'Analog Input (AI0, 4-20mA)',
];

export const INDUSTRIAL_PLC_PIN_POSITIONS: Record<string, [number, number, number]> = {
  ...headerPositions(terminalNames, -0.95, 0.95, TERMINAL_Z, TERMINAL_Y),
  'RS-485 Port (Modbus RTU)': [ENC_WIDTH / 2 + 0.1, 1.15, 0.2],
  'Ethernet Port (Modbus TCP)': [ENC_WIDTH / 2 + 0.1, 1.15, -0.2],
  'DIN Rail Mounting Clip': [0, -0.05, -ENC_DEPTH / 2 - 0.05],
};

export default function IndustrialPlcModel() {
  const terminalXs = Object.values(headerPositions(terminalNames, -0.95, 0.95, TERMINAL_Z, TERMINAL_Y)).map(
    (p) => p[0],
  );

  return (
    <group>
      {/* DIN rail behind/below the enclosure */}
      <mesh position={[0, 0.08, -ENC_DEPTH / 2 - 0.06]} castShadow>
        <boxGeometry args={[2.6, 0.16, 0.14]} />
        <meshStandardMaterial color="#b8bcc2" metalness={0.7} roughness={0.35} />
      </mesh>

      {/* Main enclosure */}
      <mesh position={[0, ENC_Y, 0]} castShadow receiveShadow>
        <boxGeometry args={[ENC_WIDTH, ENC_HEIGHT, ENC_DEPTH]} />
        <meshStandardMaterial color="#3a3f47" metalness={0.3} roughness={0.6} />
      </mesh>

      {/* Front face plate (slightly lighter grey, inset) */}
      <mesh position={[0, ENC_Y + 0.1, FRONT_Z + 0.005]} castShadow>
        <boxGeometry args={[ENC_WIDTH - 0.1, ENC_HEIGHT - 0.5, 0.01]} />
        <meshStandardMaterial color="#545968" metalness={0.2} roughness={0.7} />
      </mesh>

      {/* Status LEDs on the front face */}
      <Led position={[-0.85, ENC_HEIGHT - 0.25, FRONT_Z + 0.02]} color="#22c55e" />
      <Led position={[-0.65, ENC_HEIGHT - 0.25, FRONT_Z + 0.02]} color="#22c55e" />
      <Led position={[-0.45, ENC_HEIGHT - 0.25, FRONT_Z + 0.02]} color="#ef4444" />
      <Led position={[-0.25, ENC_HEIGHT - 0.25, FRONT_Z + 0.02]} color="#eab308" />

      {/* Terminal block strip along the bottom front edge */}
      <mesh position={[0, TERMINAL_Y + 0.02, FRONT_Z + 0.03]} castShadow>
        <boxGeometry args={[2.0, 0.3, 0.15]} />
        <meshStandardMaterial color="#2b2f38" roughness={0.55} />
      </mesh>

      {/* Individual terminal screws */}
      {terminalXs.map((x, i) => (
        <mesh key={i} position={[x, TERMINAL_Y, TERMINAL_Z]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.045, 0.045, 0.08, 12]} />
          <meshStandardMaterial color="#c7ccd1" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}

      {/* RS-485 connector block (right side) */}
      <mesh position={[ENC_WIDTH / 2 + 0.02, 1.15, 0.2]} castShadow>
        <boxGeometry args={[0.08, 0.14, 0.2]} />
        <meshStandardMaterial color="#111318" roughness={0.5} />
      </mesh>

      {/* Ethernet jack (right side) */}
      <mesh position={[ENC_WIDTH / 2 + 0.03, 1.15, -0.2]} castShadow>
        <boxGeometry args={[0.1, 0.18, 0.22]} />
        <meshStandardMaterial color="#8a8f99" metalness={0.5} roughness={0.4} />
      </mesh>
    </group>
  );
}
