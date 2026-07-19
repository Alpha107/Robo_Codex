// Rough physical footprint for placing existing Viewer3D models together in a
// project assembly scene.
//
// Two separate problems, two separate fields:
//
// 1. Every model is built centered on its own local origin with no shared
//    "ground contact" convention (see model files under
//    components/Viewer3D/models) — `groundOffset` raises a placement's Y so
//    the model's lowest point rests on the shared scene floor.
// 2. Every model was also authored independently, at whatever internal scale
//    made it look good framed alone (see each MODEL_REGISTRY `cameraDistance`)
//    — NOT at a scale consistent with other components. A DC geared motor's
//    native geometry is nearly as large as an entire robot chassis kit's,
//    which is backwards from reality. `scale` corrects this: it's derived
//    from each component's approximate real-world size (`REAL_SIZE_MM`,
//    longest dimension) relative to the robot-chassis-kit, which is used as
//    the normalization anchor since most hand-authored layouts are vehicles.

import { MODEL_REGISTRY } from '../components/Viewer3D/models/registry';

export interface AssemblyFootprint {
  /** Effective (already scale-corrected) horizontal half-extent, in scene units. */
  radius: number;
  /** Effective (already scale-corrected) Y offset so the model rests on the floor. */
  groundOffset: number;
  /** The normalization multiplier baked into the two fields above — apply this to the model's own scale. */
  scale: number;
}

interface NativeFootprint {
  radius: number;
  groundOffset: number;
}

// Measured directly from each model's own source (box/cylinder args + surface
// offsets), in that model's native (unscaled) units.
const NATIVE: Record<string, NativeFootprint> = {
  'arduino-uno-r3': { radius: 1.35, groundOffset: 0.06 },
  'esp32-devkit': { radius: 1.1, groundOffset: 0.05 },
  'hc-sr04': { radius: 0.9, groundOffset: 0.06 },
  'sg90-servo': { radius: 0.35, groundOffset: 0.425 },
  'mg996r-servo': { radius: 0.4, groundOffset: 0.48 },
  'continuous-rotation-servo': { radius: 0.35, groundOffset: 0.425 },
  l298n: { radius: 0.9, groundOffset: 0.17 },
  'dc-geared-motor': { radius: 0.5, groundOffset: 0.22 },
  'robot-chassis-kit': { radius: 0.7, groundOffset: 0.02 },
  'robot-wheel': { radius: 0.45, groundOffset: 0.45 },
  'mecanum-wheel': { radius: 0.45, groundOffset: 0.45 },
  'caster-wheel': { radius: 0.15, groundOffset: 0.28 },
  '18650-holder': { radius: 0.35, groundOffset: 0.22 },
  'lipo-battery': { radius: 0.5, groundOffset: 0.2 },
  breadboard: { radius: 0.8, groundOffset: 0.04 },
};

const DEFAULT_RADIUS_FACTOR = 0.3;
const DEFAULT_GROUND_FACTOR = 0.15;
const MIN_NATIVE_RADIUS = 0.4;
const MIN_NATIVE_GROUND_OFFSET = 0.15;

function nativeFootprint(componentId: string): NativeFootprint {
  const known = NATIVE[componentId];
  if (known) return known;
  const cameraDistance = MODEL_REGISTRY[componentId]?.cameraDistance ?? 2.0;
  return {
    radius: Math.max(MIN_NATIVE_RADIUS, cameraDistance * DEFAULT_RADIUS_FACTOR),
    groundOffset: Math.max(MIN_NATIVE_GROUND_OFFSET, cameraDistance * DEFAULT_GROUND_FACTOR),
  };
}

// Approximate real-world longest dimension, in millimeters, for every
// component that appears in a project's build (rough — this whole library is
// "stylized, not photorealistic," per the model files' own convention — the
// goal is proportionate, not CAD-accurate).
const REAL_SIZE_MM: Record<string, number> = {
  'arduino-uno-r3': 68.6,
  'esp32-devkit': 55,
  'hc05-bluetooth': 37,
  l298n: 43,
  l293d: 43,
  tb6600: 60,
  'dc-geared-motor': 65,
  'robot-chassis-kit': 180,
  'robot-wheel': 65,
  'mecanum-wheel': 65,
  'caster-wheel': 25,
  'lipo-battery': 70,
  buzzer: 12,
  'push-button': 12,
  'tactile-switch': 6,
  breadboard: 83,
  'hc-sr04': 45,
  lcd1602: 80,
  'ssd1306-oled': 27,
  potentiometer: 16,
  '18650-holder': 70,
  'seven-segment-display': 20,
  'neo6m-gps': 35,
  'joystick-module': 35,
  'sg90-servo': 35,
  'mg996r-servo': 40,
  'continuous-rotation-servo': 35,
  'membrane-keypad': 77,
  'standard-led': 5,
  ldr: 11,
  'ir-line-sensor-array': 95,
  'relay-module': 50,
  'dht11-dht22': 28,
  bme280: 15,
  'soil-moisture-sensor': 60,
  'rain-sensor': 54,
  'rotary-encoder': 20,
  'ws2812b-neopixel': 5,
  'rc522-rfid': 40,
  'rf433-pair': 30,
  nrf24l01: 30,
  hc12: 25,
  sim800l: 25,
  'lora-sx1278': 17,
  mpu6050: 21,
  mpu9250: 21,
  adxl345: 15,
  bno055: 27,
  'vl53l0x': 13,
  'sharp-gp2y0a21': 45,
  'ir-obstacle-sensor': 32,
  'hall-effect-sensor': 20,
};

const REFERENCE_ID = 'robot-chassis-kit';
const referenceNative = NATIVE[REFERENCE_ID];
// scene-units per millimeter, anchored to the chassis's own native size.
const UNITS_PER_MM = referenceNative.radius / (REAL_SIZE_MM[REFERENCE_ID] / 2);

const MIN_SCALE = 0.22;
const MAX_SCALE = 1.05;
const DEFAULT_SCALE = 0.35; // assume "probably a small module" for anything unlisted

function normalizedScale(componentId: string, native: NativeFootprint): number {
  const realSize = REAL_SIZE_MM[componentId];
  if (!realSize) return DEFAULT_SCALE;
  const raw = (realSize / 2) * UNITS_PER_MM / native.radius;
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, raw));
}

/**
 * Effective (already scale-corrected) footprint: `radius`/`groundOffset` are
 * ready to use directly for spacing and Y-positioning, and `scale` is what
 * to multiply onto the model's own render scale.
 */
export function getAssemblyFootprint(componentId: string): AssemblyFootprint {
  const native = nativeFootprint(componentId);
  const scale = normalizedScale(componentId, native);
  return {
    radius: native.radius * scale,
    groundOffset: native.groundOffset * scale,
    scale,
  };
}
