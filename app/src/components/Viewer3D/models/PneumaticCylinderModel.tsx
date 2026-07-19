const BARREL_LEN = 1.0;
const BARREL_RADIUS = 0.22;
const BARREL_CENTER_X = -0.3;
const BARREL_LEFT_X = BARREL_CENTER_X - BARREL_LEN / 2; // cap end
const BARREL_RIGHT_X = BARREL_CENTER_X + BARREL_LEN / 2; // rod end
const ROD_LEN = 0.65;
const ROD_CENTER_X = BARREL_RIGHT_X + ROD_LEN / 2;
const ROD_TIP_X = BARREL_RIGHT_X + ROD_LEN;
const VALVE_X = BARREL_LEFT_X - 0.05;

export const PNEUMATIC_CYLINDER_PIN_POSITIONS: Record<string, [number, number, number]> = {
  PORT_A: [BARREL_LEFT_X + 0.08, BARREL_RADIUS + 0.03, 0],
  PORT_B: [BARREL_RIGHT_X - 0.08, BARREL_RADIUS + 0.03, 0],
  SUPPLY_AIR: [VALVE_X, -0.34, 0.09],
  EXHAUST: [VALVE_X, -0.34, -0.09],
  'SOLENOID_COIL+': [VALVE_X - 0.14, -0.25, 0.05],
  'SOLENOID_COIL-': [VALVE_X - 0.14, -0.25, -0.05],
  REED_RETRACT: [BARREL_LEFT_X + 0.15, BARREL_RADIUS + 0.02, 0],
  REED_EXTEND: [BARREL_RIGHT_X - 0.12, BARREL_RADIUS + 0.02, 0],
};

export default function PneumaticCylinderModel() {
  return (
    <group>
      {/* Cylinder barrel */}
      <mesh position={[BARREL_CENTER_X, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[BARREL_RADIUS, BARREL_RADIUS, BARREL_LEN, 28]} />
        <meshStandardMaterial color="#8a8f99" metalness={0.65} roughness={0.3} />
      </mesh>

      {/* End cap flanges */}
      <mesh position={[BARREL_LEFT_X, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[BARREL_RADIUS + 0.02, BARREL_RADIUS + 0.02, 0.05, 28]} />
        <meshStandardMaterial color="#4a4e55" metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[BARREL_RIGHT_X, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[BARREL_RADIUS + 0.02, BARREL_RADIUS + 0.02, 0.05, 28]} />
        <meshStandardMaterial color="#4a4e55" metalness={0.6} roughness={0.35} />
      </mesh>

      {/* Piston rod, partially extended */}
      <mesh position={[ROD_CENTER_X, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, ROD_LEN, 20]} />
        <meshStandardMaterial color="#e2e5e9" metalness={0.85} roughness={0.2} />
      </mesh>
      {/* Rod-end clevis */}
      <mesh position={[ROD_TIP_X + 0.04, 0, 0]} castShadow>
        <boxGeometry args={[0.1, 0.14, 0.06]} />
        <meshStandardMaterial color="#2b2f36" roughness={0.5} />
      </mesh>
      <mesh position={[ROD_TIP_X + 0.04, 0, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.12, 16]} />
        <meshStandardMaterial color="#111318" roughness={0.5} />
      </mesh>

      {/* Cap-end air port fitting (PORT_A - extend) */}
      <mesh position={[BARREL_LEFT_X + 0.08, BARREL_RADIUS + 0.015, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.09, 12]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.5} />
      </mesh>
      {/* Rod-end air port fitting (PORT_B - retract) */}
      <mesh position={[BARREL_RIGHT_X - 0.08, BARREL_RADIUS + 0.015, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.09, 12]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.5} />
      </mesh>

      {/* Reed position switches, mounted in barrel slots */}
      <mesh position={[BARREL_LEFT_X + 0.15, BARREL_RADIUS + 0.01, 0]} castShadow>
        <boxGeometry args={[0.09, 0.03, 0.05]} />
        <meshStandardMaterial color="#e8901f" roughness={0.4} />
      </mesh>
      <mesh position={[BARREL_RIGHT_X - 0.12, BARREL_RADIUS + 0.01, 0]} castShadow>
        <boxGeometry args={[0.09, 0.03, 0.05]} />
        <meshStandardMaterial color="#39d353" roughness={0.4} />
      </mesh>

      {/* Solenoid valve block, mounted near the cap end */}
      <mesh position={[VALVE_X, -0.25, 0]} castShadow>
        <boxGeometry args={[0.22, 0.18, 0.2]} />
        <meshStandardMaterial color="#1c1c1e" roughness={0.5} metalness={0.2} />
      </mesh>
      {/* Solenoid coil housing on the valve's end */}
      <mesh position={[VALVE_X - 0.14, -0.25, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.12, 16]} />
        <meshStandardMaterial color="#2a6ebb" roughness={0.45} />
      </mesh>
      {/* Supply air fitting */}
      <mesh position={[VALVE_X, -0.34, 0.09]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 0.07, 10]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.5} />
      </mesh>
      {/* Exhaust fitting (with small muffler bulge) */}
      <mesh position={[VALVE_X, -0.34, -0.09]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 0.07, 10]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.5} />
      </mesh>
      <mesh position={[VALVE_X, -0.4, -0.09]} castShadow>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshStandardMaterial color="#3d4148" roughness={0.5} />
      </mesh>

      {/* Mounting bracket under the barrel */}
      <mesh position={[BARREL_CENTER_X, -0.28, 0]} castShadow>
        <boxGeometry args={[0.5, 0.05, 0.28]} />
        <meshStandardMaterial color="#5a5f66" metalness={0.5} roughness={0.4} />
      </mesh>
    </group>
  );
}
