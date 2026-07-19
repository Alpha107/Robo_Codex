import { PcbBoard, HeaderStrip, UsbConnector, BarrelJack, DipChip, headerPositions } from './parts';

const BOARD_WIDTH = 4.0;
const BOARD_DEPTH = 2.1;
const BOARD_HEIGHT = 0.12;
const TOP = BOARD_HEIGHT / 2;
const HEADER_H = 0.12;
const PIN_Y = TOP + HEADER_H + 0.04;

const rowA = ['D0 (RX0)', 'D1 (TX0)', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11', 'D12', 'D13', 'D14 (TX3)', 'D15 (RX3)', 'D16 (TX2)'];
const rowB = ['D17 (RX2)', 'D18 (TX1)', 'D19 (RX1)', 'D20 (SDA)', 'D21 (SCL)', 'D22-D53', 'A0', 'A1-A11', 'DAC0', 'DAC1', '3.3V', '5V', 'VIN', 'GND', 'IOREF', 'RESET'];

const FRONT_Z = BOARD_DEPTH / 2 - 0.08;
const BACK_Z = -BOARD_DEPTH / 2 + 0.08;

export const ARDUINO_DUE_PIN_POSITIONS: Record<string, [number, number, number]> = {
  ...headerPositions(rowA, -1.9, 1.5, FRONT_Z, PIN_Y),
  ...headerPositions(rowB, -1.9, 1.5, BACK_Z, PIN_Y),
};

export default function ArduinoDueModel() {
  return (
    <group>
      <PcbBoard width={BOARD_WIDTH} depth={BOARD_DEPTH} height={BOARD_HEIGHT} color="#1857a4" />

      <HeaderStrip position={[-0.2, TOP + HEADER_H / 2, FRONT_Z]} length={3.6} thickness={0.16} />
      <HeaderStrip position={[-0.2, TOP + HEADER_H / 2, BACK_Z]} length={3.6} thickness={0.16} />

      <UsbConnector position={[-BOARD_WIDTH / 2 - 0.06, 0.1, 0.6]} type="microB" />
      <UsbConnector position={[-BOARD_WIDTH / 2 - 0.06, 0.1, 0.1]} type="microB" />
      <BarrelJack position={[-BOARD_WIDTH / 2 - 0.1, 0.06, -0.4]} />

      <DipChip position={[0.5, TOP + 0.03, -0.1]} size={[0.7, 0.06, 0.7]} />
    </group>
  );
}
