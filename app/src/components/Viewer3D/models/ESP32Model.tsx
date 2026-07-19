import { PcbBoard, HeaderStrip, UsbConnector, MetalCanModule, TactileButton, headerPositionsZ } from './parts';

const WIDTH = 1.15;
const DEPTH = 2.8;
const HEIGHT = 0.1;
const TOP = HEIGHT / 2;
const PIN_Y = TOP + 0.16;

const rowA = ['3V3', 'EN', 'GPIO36', 'GPIO39', 'GPIO34', 'GPIO35', 'GPIO32', 'GPIO33', 'GPIO25', 'GPIO26', 'GPIO27', 'GPIO14', 'GPIO12', 'GPIO13', 'GND'];
const rowB = ['VIN', 'GPIO23', 'GPIO22 (SCL)', 'GPIO1 (TX0)', 'GPIO3 (RX0)', 'GPIO21 (SDA)', 'GPIO19', 'GPIO18', 'GPIO5', 'GPIO17', 'GPIO16', 'GPIO4', 'GPIO0', 'GPIO2', 'GPIO15'];

const LEFT_X = -WIDTH / 2 - 0.04;
const RIGHT_X = WIDTH / 2 + 0.04;

export const ESP32_PIN_POSITIONS: Record<string, [number, number, number]> = {
  ...headerPositionsZ(rowA, DEPTH / 2 - 0.15, -DEPTH / 2 + 0.15, LEFT_X, PIN_Y),
  ...headerPositionsZ(rowB, DEPTH / 2 - 0.15, -DEPTH / 2 + 0.15, RIGHT_X, PIN_Y),
};

export default function ESP32Model() {
  return (
    <group>
      <PcbBoard width={WIDTH} depth={DEPTH} height={HEIGHT} color="#1c1c1e" />

      <HeaderStrip position={[LEFT_X, TOP + 0.08, 0]} length={DEPTH - 0.3} rotation={[0, Math.PI / 2, 0]} thickness={0.14} height={0.16} />
      <HeaderStrip position={[RIGHT_X, TOP + 0.08, 0]} length={DEPTH - 0.3} rotation={[0, Math.PI / 2, 0]} thickness={0.14} height={0.16} />

      <UsbConnector position={[0, 0.1, DEPTH / 2 + 0.09]} type="microB" />

      {/* WiFi/BT module metal RF shield can */}
      <MetalCanModule position={[0, TOP + 0.09, 0.55]} size={[0.75, 0.18, 0.85]} />

      {/* BOOT + EN buttons */}
      <TactileButton position={[-0.35, TOP + 0.03, -1.1]} radius={0.07} />
      <TactileButton position={[0.35, TOP + 0.03, -1.1]} radius={0.07} />
    </group>
  );
}
