import { PcbBoard, headerPositionsZ } from './parts';

const PCB_W = 0.5;
const PCB_D = 0.3;
const PCB_H = 0.05;
const TOP = PCB_H / 2;

const CASE_W = 0.42;
const CASE_D = 0.55;
const CASE_H = 0.32;

export const DHT11_DHT22_PIN_POSITIONS: Record<string, [number, number, number]> = headerPositionsZ(
  ['VCC', 'DATA', 'GND'],
  -0.1,
  0.1,
  CASE_W / 2 + 0.03,
  TOP + 0.02,
);

export default function Dht11Model() {
  return (
    <group>
      <PcbBoard width={PCB_W} depth={PCB_D} height={PCB_H} color="#111318" />

      {/* Blue perforated sensor housing, overhanging the board */}
      <mesh position={[0, TOP + CASE_H / 2, 0.05]} castShadow>
        <boxGeometry args={[CASE_W, CASE_H, CASE_D]} />
        <meshStandardMaterial color="#3a7bd5" roughness={0.5} />
      </mesh>
      {/* Perforation slits on the front face */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i} position={[-CASE_W / 2 - 0.001, TOP + 0.06 + i * 0.045, 0.05]}>
          <boxGeometry args={[0.002, 0.02, CASE_D - 0.1]} />
          <meshStandardMaterial color="#1a3d6b" />
        </mesh>
      ))}
    </group>
  );
}
