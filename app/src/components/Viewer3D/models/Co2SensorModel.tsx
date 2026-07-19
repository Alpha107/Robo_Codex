import { headerPositions } from './parts';

const CASE_W = 0.62;
const CASE_D = 0.42;
const CASE_H = 0.16;
const TOP = CASE_H / 2;

const HEADER_Z = CASE_D / 2 - 0.04;

export const CO2_SENSOR_PIN_POSITIONS: Record<string, [number, number, number]> = headerPositions(
  ['VCC', 'GND', 'TX', 'RX', 'PWM', 'HD'],
  -0.22,
  0.22,
  HEADER_Z,
  TOP * 2 + 0.02,
);

export default function Co2SensorModel() {
  return (
    <group>
      {/* Enclosed plastic housing — real MH-Z19 modules are boxed, not a bare PCB */}
      <mesh position={[0, TOP, 0]} castShadow receiveShadow>
        <boxGeometry args={[CASE_W, CASE_H, CASE_D]} />
        <meshStandardMaterial color="#e2e4e8" roughness={0.55} />
      </mesh>

      {/* Gas sampling chamber on top (cylindrical NDIR optical chamber) */}
      <mesh position={[0, CASE_H + 0.07, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.09, 0.09, 0.5, 20]} />
        <meshStandardMaterial color="#c7ccd1" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Sampling vent holes on the chamber */}
      {[-0.15, 0, 0.15].map((x) => (
        <mesh key={x} position={[x, CASE_H + 0.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.025, 12]} />
          <meshStandardMaterial color="#15161a" />
        </mesh>
      ))}

      {/* Pin header strip at the connector edge */}
      <mesh position={[0, TOP * 2 + 0.01, HEADER_Z]} castShadow>
        <boxGeometry args={[0.5, 0.02, 0.12]} />
        <meshStandardMaterial color="#111318" roughness={0.6} />
      </mesh>
    </group>
  );
}
