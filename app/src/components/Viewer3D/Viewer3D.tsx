import { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { Pin } from '../../types/component';
import { getBoardFootprint } from '../../data/hotspotLayout';
import { MODEL_REGISTRY } from './models/registry';
import PlaceholderModel from './PlaceholderModel';
import Hotspot from './Hotspot';
import './Viewer3D.css';

interface Viewer3DProps {
  componentId: string;
  pins: Pin[];
  selectedPin: Pin | null;
  onSelectPin: (pin: Pin) => void;
}

export default function Viewer3D({ componentId, pins, selectedPin, onSelectPin }: Viewer3DProps) {
  const registryEntry = MODEL_REGISTRY[componentId];
  const footprint = getBoardFootprint(componentId);
  const cameraDistance = registryEntry?.cameraDistance ?? 3;

  const resolvedPins = useMemo(
    () =>
      pins.map((pin) => ({
        ...pin,
        position: registryEntry?.pinPositions[pin.name] ?? pin.position,
      })),
    [pins, registryEntry],
  );

  const Model = registryEntry?.Model;

  // Hotspot radius is proportional to camera distance so every component's
  // pins read as the same apparent on-screen size, whether the model is a
  // tiny LED (cameraDistance ~0.8) or a full Mega board (cameraDistance ~5).
  // Floored so pins on very small/simple parts (bare LEDs, passives) don't
  // shrink past legibility.
  const pinRadius = Math.max(cameraDistance * 0.014, 0.02);
  const labelDistanceFactor = cameraDistance * 2.2;

  return (
    <div className="viewer3d">
      <Canvas shadows camera={{ position: [cameraDistance * 0.9, cameraDistance * 1.3, cameraDistance * 0.9], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[3, 4, 2]} intensity={1.3} castShadow />
          <directionalLight position={[-3, 2, -2]} intensity={0.4} />
          {Model ? <Model /> : <PlaceholderModel footprint={footprint} />}
          {resolvedPins.map((pin) => (
            <Hotspot
              key={pin.name}
              pin={pin}
              isSelected={selectedPin?.name === pin.name}
              onSelect={onSelectPin}
              radius={pinRadius}
              labelDistanceFactor={labelDistanceFactor}
            />
          ))}
        </Suspense>
        <OrbitControls enablePan={false} minDistance={1} maxDistance={8} />
      </Canvas>
      <p className="viewer3d-hint">Drag to orbit &middot; click a pin to inspect it</p>
    </div>
  );
}
