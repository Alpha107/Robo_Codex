import { useState } from 'react';
import { Html } from '@react-three/drei';
import type { ResolvedAssemblyPart } from '../../data/projectAssembly';
import type { Vec3 } from '../../utils/assemblyGeometry';
import { MODEL_REGISTRY } from './models/registry';
import PlaceholderModel from './PlaceholderModel';
import { getAssemblyFootprint } from '../../data/assemblyFootprints';

interface AssemblyPartProps {
  part: ResolvedAssemblyPart;
  position: Vec3;
  isSelected: boolean;
  onSelect: (part: ResolvedAssemblyPart) => void;
  color: string;
  labelDistanceFactor: number;
}

const PLACEHOLDER_FOOTPRINT = { width: 1, depth: 1, height: 0.5 };

/** One placed component instance in a project assembly scene: click/hover to
 * select, mirroring the pin-level interaction pattern in Hotspot.tsx but at
 * whole-component granularity. */
export default function AssemblyPart({ part, position, isSelected, onSelect, color, labelDistanceFactor }: AssemblyPartProps) {
  const [hovered, setHovered] = useState(false);
  const registryEntry = MODEL_REGISTRY[part.componentId];
  const Model = registryEntry?.Model;
  const rotation = part.placement.rotation ?? [0, 0, 0];
  const scale = (part.placement.scale ?? 1) * (isSelected ? 1.08 : hovered ? 1.04 : 1);
  const ringRadius = getAssemblyFootprint(part.componentId).radius;

  return (
    <group
      position={position}
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(part);
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
      <group scale={scale}>{Model ? <Model /> : <PlaceholderModel footprint={PLACEHOLDER_FOOTPRINT} />}</group>
      {(hovered || isSelected) && (
        <>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
            <ringGeometry args={[ringRadius * 1.15, ringRadius * 1.32, 32]} />
            <meshBasicMaterial color={color} transparent opacity={isSelected ? 0.9 : 0.45} depthWrite={false} />
          </mesh>
          <Html distanceFactor={labelDistanceFactor} style={{ pointerEvents: 'none' }}>
            <div className="assembly-part-label" style={{ borderColor: color }}>
              {part.label}
            </div>
          </Html>
        </>
      )}
    </group>
  );
}
