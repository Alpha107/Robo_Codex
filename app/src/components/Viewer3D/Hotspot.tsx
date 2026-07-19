import { useState } from 'react';
import { Html } from '@react-three/drei';
import type { Pin } from '../../types/component';
import { colorForCategory } from '../../utils/pinColors';

interface HotspotProps {
  pin: Pin;
  isSelected: boolean;
  onSelect: (pin: Pin) => void;
  radius: number;
  labelDistanceFactor: number;
}

export default function Hotspot({ pin, isSelected, onSelect, radius, labelDistanceFactor }: HotspotProps) {
  const [hovered, setHovered] = useState(false);
  const color = colorForCategory(pin.category);
  const scale = isSelected ? 1.45 : hovered ? 1.25 : 1;

  if (!pin.position) return null;

  return (
    <group position={pin.position}>
      <mesh
        scale={scale}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(pin);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[radius, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isSelected ? 0.8 : hovered ? 0.5 : 0.2}
        />
      </mesh>
      {(hovered || isSelected) && (
        <Html distanceFactor={labelDistanceFactor} style={{ pointerEvents: 'none' }}>
          <div className="hotspot-label">{pin.name}</div>
        </Html>
      )}
    </group>
  );
}
