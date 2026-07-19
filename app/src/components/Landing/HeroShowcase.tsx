import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import type { Group } from 'three';
import { MODEL_REGISTRY } from '../Viewer3D/models/registry';
import './HeroShowcase.css';

// A curated pool of visually distinctive, previously-verified models — the
// hero picks a fresh random 5 of these each page load rather than always
// showing the same lineup.
const SHOWCASE_POOL = [
  'arduino-uno-r3',
  'esp32-devkit',
  'raspberry-pi-4',
  'mg996r-servo',
  'sg90-servo',
  'nema17-stepper',
  'bldc-motor',
  'mecanum-wheel',
  'robot-wheel',
  'rplidar',
  'hc-sr04',
  'mpu6050',
  'ssd1306-oled',
  'lcd1602',
  'ws2812b-neopixel',
  'rc522-rfid',
  'neo6m-gps',
  'robot-chassis-kit',
  'ball-bearing',
  'esc',
  'l298n',
  'vl53l0x',
];

function pickRandomShowcase(count: number): string[] {
  const pool = [...SHOWCASE_POOL];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}

// Keeps the model fully framed regardless of the container's aspect ratio.
// The base distance/fov combo is tuned for a wide desktop panel; on a
// narrower or more square container (mobile layouts collapse the hero panel
// toward 1:1), the same fixed distance shows less horizontal extent, so wide
// boards get cropped at the sides. Pulling the camera back further when the
// container is narrower than the reference aspect keeps the whole model in
// frame at any size.
const REFERENCE_ASPECT = 1.4;

function CameraRig({ cameraDistance }: { cameraDistance: number }) {
  const { camera, size } = useThree();

  useEffect(() => {
    const aspect = size.width / size.height;
    const aspectCorrection = Math.max(1, REFERENCE_ASPECT / aspect);
    const d = cameraDistance * aspectCorrection;
    camera.position.set(d * 0.9, d * 0.9, d * 1.1);
    camera.lookAt(0, 0, 0);
  }, [camera, size, cameraDistance]);

  return null;
}

function SpinningModel({ componentId }: { componentId: string }) {
  const groupRef = useRef<Group>(null);
  const entry = MODEL_REGISTRY[componentId];
  const Model = entry?.Model;

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.45;
  });

  if (!Model) return null;

  return (
    <group ref={groupRef}>
      <Model />
    </group>
  );
}

export default function HeroShowcase() {
  const [showcaseIds] = useState(() => pickRandomShowcase(5));
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % showcaseIds.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [showcaseIds.length]);

  const componentId = showcaseIds[index];
  const cameraDistance = MODEL_REGISTRY[componentId]?.cameraDistance ?? 3;

  return (
    <div className="hero-showcase">
      <div className="hero-showcase-glow" aria-hidden="true" />
      <Canvas camera={{ fov: 42 }} dpr={[1, 1.75]}>
        <Suspense fallback={null}>
          <CameraRig cameraDistance={cameraDistance} />
          <ambientLight intensity={0.8} />
          <directionalLight position={[3, 4, 2]} intensity={1.4} />
          <directionalLight position={[-3, 2, -2]} intensity={0.5} color="#4dabf7" />
          <SpinningModel key={componentId} componentId={componentId} />
        </Suspense>
      </Canvas>
      <div className="hero-showcase-dots" aria-hidden="true">
        {showcaseIds.map((id, i) => (
          <span key={id} className={i === index ? 'dot dot-active' : 'dot'} />
        ))}
      </div>
    </div>
  );
}
