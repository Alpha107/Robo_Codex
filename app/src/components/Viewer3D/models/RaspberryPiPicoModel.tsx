import { PcbBoard, UsbConnector, TactileButton, headerPositionsZ } from './parts';

const WIDTH = 0.95;
const DEPTH = 2.1;
const HEIGHT = 0.09;
const TOP = HEIGHT / 2;
const PIN_Y = TOP + 0.03;

const rowA = ['GP0', 'GP1', 'GP2', 'GP3', 'GP4', 'GP5', 'GP6', 'GP7', 'GP8', 'GP9', 'GP10', 'GP11', 'GP12', 'GP13', 'GP14', 'GP15', 'GND'];
const rowB = ['GP16', 'GP17', 'GP18', 'GP19', 'GP20', 'GP21', 'GP22', 'RUN', 'GP26 (ADC0)', 'GP27 (ADC1)', 'GP28 (ADC2)', 'ADC_VREF', '3V3(OUT)', '3V3_EN', 'VSYS', 'VBUS'];

const LEFT_X = -WIDTH / 2 + 0.02;
const RIGHT_X = WIDTH / 2 - 0.02;

export const RASPBERRY_PI_PICO_PIN_POSITIONS: Record<string, [number, number, number]> = {
  ...headerPositionsZ(rowA, DEPTH / 2 - 0.08, -DEPTH / 2 + 0.08, LEFT_X, PIN_Y),
  ...headerPositionsZ(rowB, DEPTH / 2 - 0.08, -DEPTH / 2 + 0.08, RIGHT_X, PIN_Y),
};

export default function RaspberryPiPicoModel() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#0d1117" />

      {/* RP2040 QFN chip */}
      <mesh position={[0, TOP + 0.025, 0.1]} castShadow>
        <boxGeometry args={[0.3, 0.05, 0.3]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} />
      </mesh>
      {/* SPI flash chip */}
      <mesh position={[0, TOP + 0.02, 0.55]} castShadow>
        <boxGeometry args={[0.16, 0.04, 0.12]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} />
      </mesh>

      <UsbConnector position={[0, 0.09, DEPTH / 2 + 0.08]} type="microB" />
      <TactileButton position={[0, TOP + 0.03, DEPTH / 2 - 0.25]} radius={0.06} color="#e8e8ec" />
    </group>
  );
}
