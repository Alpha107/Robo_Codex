export const BASIC_PASSIVES_PIN_POSITIONS: Record<string, [number, number, number]> = {
  'Resistor Lead 1': [-0.85, -0.15, 0.35],
  'Resistor Lead 2': [-0.65, -0.15, 0.35],
  'Capacitor Lead (+)': [-0.28, -0.15, 0.35],
  'Capacitor Lead (-)': [-0.18, -0.15, 0.35],
  'Diode Anode': [0.2, -0.15, 0.35],
  'Diode Cathode': [0.35, -0.15, 0.35],
  'Transistor Base': [0.68, -0.2, 0.35],
  'Transistor Collector': [0.75, -0.2, 0.35],
  'Transistor Emitter': [0.82, -0.2, 0.35],
};

function Resistor() {
  const bandColors = ['#d1342a', '#8b4513', '#f0d020'];
  return (
    <group position={[-0.75, 0, 0]}>
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.3, 16]} />
        <meshStandardMaterial color="#d8c9a3" roughness={0.5} />
      </mesh>
      {bandColors.map((c, i) => (
        <mesh key={c} position={[-0.08 + i * 0.06, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.052, 0.052, 0.02, 16]} />
          <meshStandardMaterial color={c} />
        </mesh>
      ))}
      <mesh position={[-0.2, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.008, 0.008, 0.15, 8]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[0.2, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.008, 0.008, 0.15, 8]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.6} roughness={0.35} />
      </mesh>
    </group>
  );
}

function CapacitorPart() {
  return (
    <group position={[-0.23, 0, 0]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.001, 0.13, 0.03, 24]} />
        <meshStandardMaterial color="#3a6ea5" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <sphereGeometry args={[0.12, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#3a6ea5" roughness={0.5} />
      </mesh>
      <mesh position={[-0.05, -0.1, 0]} castShadow>
        <cylinderGeometry args={[0.006, 0.006, 0.12, 8]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[0.05, -0.1, 0]} castShadow>
        <cylinderGeometry args={[0.006, 0.006, 0.12, 8]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.6} roughness={0.35} />
      </mesh>
    </group>
  );
}

function DiodePart() {
  return (
    <group position={[0.28, 0, 0]}>
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.045, 0.045, 0.2, 16]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} />
      </mesh>
      <mesh position={[0.06, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.047, 0.047, 0.02, 16]} />
        <meshStandardMaterial color="#e8e8ec" />
      </mesh>
      <mesh position={[-0.15, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.008, 0.008, 0.15, 8]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[0.15, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.008, 0.008, 0.15, 8]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.6} roughness={0.35} />
      </mesh>
    </group>
  );
}

function TransistorPart() {
  return (
    <group position={[0.75, -0.05, 0]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.09, 0.09, 0.2, 24, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} side={2} />
      </mesh>
      <mesh position={[-0.001, 0, 0]}>
        <boxGeometry args={[0.02, 0.2, 0.18]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
      </mesh>
      {[-0.06, 0, 0.06].map((z) => (
        <mesh key={z} position={[0.06, -0.15, z]} castShadow>
          <cylinderGeometry args={[0.008, 0.008, 0.1, 8]} />
          <meshStandardMaterial color="#c7ccd1" metalness={0.6} roughness={0.35} />
        </mesh>
      ))}
    </group>
  );
}

export default function BasicPassivesModel() {
  return (
    <group>
      <Resistor />
      <CapacitorPart />
      <DiodePart />
      <TransistorPart />
    </group>
  );
}
