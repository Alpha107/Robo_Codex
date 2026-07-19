import { PcbBoard } from './parts';

const WIDTH = 1.4;
const DEPTH = 0.35;
const HEIGHT = 0.06;
const TOP = HEIGHT / 2;

const sensorX = [-0.5, -0.25, 0, 0.25, 0.5];

export const IR_LINE_SENSOR_ARRAY_PIN_POSITIONS: Record<string, [number, number, number]> = {
  VCC: [-0.65, TOP + 0.03, -DEPTH / 2 + 0.04],
  GND: [-0.5, TOP + 0.03, -DEPTH / 2 + 0.04],
  OUT1: [sensorX[0], TOP + 0.1, 0.05],
  OUT2: [sensorX[1], TOP + 0.1, 0.05],
  OUT3: [sensorX[2], TOP + 0.1, 0.05],
  OUT4: [sensorX[3], TOP + 0.1, 0.05],
  OUT5: [sensorX[4], TOP + 0.1, 0.05],
};

export default function IrLineSensorArrayModel() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#1560bd" />

      {sensorX.map((x) => (
        <group key={x} position={[x, TOP + 0.03, 0.05]}>
          <mesh position={[-0.04, 0, 0]} castShadow>
            <boxGeometry args={[0.05, 0.06, 0.08]} />
            <meshStandardMaterial color="#1a1a2e" roughness={0.3} />
          </mesh>
          <mesh position={[0.04, 0, 0]} castShadow>
            <boxGeometry args={[0.05, 0.06, 0.08]} />
            <meshStandardMaterial color="#1a1a2e" roughness={0.3} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
