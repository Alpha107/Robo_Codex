const HOUSING_RADIUS = 0.28;
const HOUSING_LENGTH = 0.5;
const SHAFT_RADIUS = 0.055;
const SHAFT_LENGTH = 0.24;
const FRONT_X = HOUSING_LENGTH / 2;
const BACK_X = -HOUSING_LENGTH / 2;

// Connector protrudes from the back face of the housing.
const CONNECTOR_LENGTH = 0.14;
const CONNECTOR_X = BACK_X - CONNECTOR_LENGTH / 2;
const CONNECTOR_FACE_X = BACK_X - CONNECTOR_LENGTH;

export const INDUSTRIAL_ABSOLUTE_ENCODER_PIN_POSITIONS: Record<string, [number, number, number]> = {
  'V+': [CONNECTOR_FACE_X - 0.02, 0.06, 0.06],
  'V-': [CONNECTOR_FACE_X - 0.02, 0.06, -0.06],
  'CLK+': [CONNECTOR_FACE_X - 0.02, 0, 0.09],
  'CLK-': [CONNECTOR_FACE_X - 0.02, 0, -0.09],
  'DATA+': [CONNECTOR_FACE_X - 0.02, -0.06, 0.06],
  'DATA-': [CONNECTOR_FACE_X - 0.02, -0.06, -0.06],
  SHIELD: [CONNECTOR_FACE_X - 0.02, 0, 0],
};

export default function IndustrialAbsoluteEncoderModel() {
  return (
    <group>
      {/* Main cylindrical housing */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[HOUSING_RADIUS, HOUSING_RADIUS, HOUSING_LENGTH, 32]} />
        <meshStandardMaterial color="#9a9fa6" metalness={0.7} roughness={0.32} />
      </mesh>

      {/* Front face plate */}
      <mesh position={[FRONT_X, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[HOUSING_RADIUS + 0.008, HOUSING_RADIUS + 0.008, 0.02, 32]} />
        <meshStandardMaterial color="#4a4e55" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Bearing collar around the shaft */}
      <mesh position={[FRONT_X + 0.04, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.09, 0.09, 0.06, 24]} />
        <meshStandardMaterial color="#2b2f38" metalness={0.55} roughness={0.4} />
      </mesh>

      {/* Shaft protruding from the front */}
      <mesh position={[FRONT_X + 0.08 + SHAFT_LENGTH / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[SHAFT_RADIUS, SHAFT_RADIUS, SHAFT_LENGTH, 20]} />
        <meshStandardMaterial color="#d7dbe0" metalness={0.75} roughness={0.25} />
      </mesh>

      {/* Rear connector housing */}
      <mesh position={[CONNECTOR_X, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.12, 0.14, CONNECTOR_LENGTH, 20]} />
        <meshStandardMaterial color="#111318" roughness={0.55} />
      </mesh>
      {/* Connector face (where the cable/pins exit) */}
      <mesh position={[CONNECTOR_FACE_X, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <circleGeometry args={[0.12, 20]} />
        <meshStandardMaterial color="#c9a227" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Mounting flange ribs on the housing body */}
      {[-0.12, 0.02].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[HOUSING_RADIUS + 0.004, HOUSING_RADIUS + 0.004, 0.015, 32]} />
          <meshStandardMaterial color="#7d838a" metalness={0.6} roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}
