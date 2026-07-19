import { PcbBoard, HeaderStrip, UsbConnector, BarrelJack, DipChip, Crystal, TactileButton, Led, headerPositions } from './parts';

const BOARD_WIDTH = 2.7;
const BOARD_DEPTH = 2.1;
const BOARD_HEIGHT = 0.12;
const TOP = BOARD_HEIGHT / 2;
const HEADER_H = 0.12;
const PIN_Y = TOP + HEADER_H + 0.04;

const digitalA = ['AREF', 'GND', 'D13', 'D12', 'D11', 'D10', 'D9', 'D8'];
const digitalB = ['D7', 'D6', 'D5', 'D4', 'D3', 'D2', 'D1 (TX)', 'D0 (RX)'];
const analogBlock = ['A0', 'A1', 'A2', 'A3', 'A4', 'A5'];
const powerBlock = ['5V', '3.3V', 'VIN', 'RESET'];

const FRONT_Z = BOARD_DEPTH / 2 - 0.08;
const BACK_Z = -BOARD_DEPTH / 2 + 0.08;

export const ARDUINO_LEONARDO_PIN_POSITIONS: Record<string, [number, number, number]> = {
  ...headerPositions(digitalA, -1.15, -0.2, FRONT_Z, PIN_Y),
  ...headerPositions(digitalB, 0.2, 1.15, FRONT_Z, PIN_Y),
  ...headerPositions(analogBlock, -1.15, -0.3, BACK_Z, PIN_Y),
  ...headerPositions(powerBlock, 0.1, 1.0, BACK_Z, PIN_Y),
};

export default function ArduinoLeonardoModel() {
  return (
    <group>
      <PcbBoard width={BOARD_WIDTH} depth={BOARD_DEPTH} height={BOARD_HEIGHT} color="#1a5276" />

      <HeaderStrip position={[-0.675, TOP + HEADER_H / 2, FRONT_Z]} length={1.1} thickness={0.16} />
      <HeaderStrip position={[0.675, TOP + HEADER_H / 2, FRONT_Z]} length={1.1} thickness={0.16} />
      <HeaderStrip position={[-0.72, TOP + HEADER_H / 2, BACK_Z]} length={1.0} thickness={0.16} />
      <HeaderStrip position={[0.55, TOP + HEADER_H / 2, BACK_Z]} length={1.0} thickness={0.16} />

      <UsbConnector position={[-BOARD_WIDTH / 2 - 0.06, 0.1, 0.6]} type="microB" />
      <BarrelJack position={[-BOARD_WIDTH / 2 - 0.1, 0.06, 0.05]} />

      <DipChip position={[0.3, TOP + 0.03, -0.15]} size={[0.5, 0.06, 0.5]} />
      <Crystal position={[0.85, TOP + 0.04, -0.15]} />
      <TactileButton position={[-1.05, TOP + 0.03, 0.75]} />
      <Led position={[0.55, TOP + 0.02, 0.2]} />
    </group>
  );
}
