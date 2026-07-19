import { PcbBoard, HeaderStrip, UsbConnector, BarrelJack, DipChip, Crystal, TactileButton, Led, headerPositions } from './parts';

const BOARD_WIDTH = 4.0;
const BOARD_DEPTH = 2.1;
const BOARD_HEIGHT = 0.12;
const TOP = BOARD_HEIGHT / 2;
const HEADER_H = 0.12;
const PIN_Y = TOP + HEADER_H + 0.04;

const rowA = ['D0 (RX0)', 'D1 (TX0)', 'D2', 'D3', 'D4-D9', 'D10-D13', 'D14 (TX3)', 'D15 (RX3)', 'D16 (TX2)', 'D17 (RX2)', 'D18 (TX1)', 'D19 (RX1)', 'D20 (SDA)', 'D21 (SCL)'];
const rowB = ['D22-D49', 'D50 (MISO)', 'D51 (MOSI)', 'D52 (SCK)', 'D53 (SS)', 'A0-A15', '5V', '3.3V', 'VIN', 'GND', 'IOREF', 'RESET', 'AREF'];

const FRONT_Z = BOARD_DEPTH / 2 - 0.08;
const BACK_Z = -BOARD_DEPTH / 2 + 0.08;

export const ARDUINO_MEGA_PIN_POSITIONS: Record<string, [number, number, number]> = {
  ...headerPositions(rowA, -1.9, 1.5, FRONT_Z, PIN_Y),
  ...headerPositions(rowB, -1.9, 1.5, BACK_Z, PIN_Y),
};

export default function ArduinoMegaModel() {
  return (
    <group>
      <PcbBoard width={BOARD_WIDTH} depth={BOARD_DEPTH} height={BOARD_HEIGHT} color="#0b6e77" />

      <HeaderStrip position={[-0.2, TOP + HEADER_H / 2, FRONT_Z]} length={3.6} thickness={0.16} />
      <HeaderStrip position={[-0.2, TOP + HEADER_H / 2, BACK_Z]} length={3.6} thickness={0.16} />

      <UsbConnector position={[-BOARD_WIDTH / 2 - 0.06, 0.14, 0.6]} type="B" />
      <BarrelJack position={[-BOARD_WIDTH / 2 - 0.1, 0.06, 0.05]} />

      <DipChip position={[0.6, TOP + 0.03, -0.15]} size={[0.9, 0.06, 0.5]} />
      <Crystal position={[1.4, TOP + 0.04, -0.15]} />
      <TactileButton position={[-1.7, TOP + 0.03, 0.75]} />
      <Led position={[0.9, TOP + 0.02, 0.2]} />
    </group>
  );
}
