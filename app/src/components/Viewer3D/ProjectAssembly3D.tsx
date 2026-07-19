import { Suspense, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, QuadraticBezierLine } from '@react-three/drei';
import type { ResolvedAssembly, ResolvedAssemblyPart } from '../../data/projectAssembly';
import { assemblyPartKey } from '../../data/projectAssembly';
import type { Vec3 } from '../../utils/assemblyGeometry';
import { resolveWorldPoint } from '../../utils/assemblyGeometry';
import { categoryColor } from '../Landing/categoryColors';
import { getAssemblyFootprint } from '../../data/assemblyFootprints';
import AssemblyPart from './AssemblyPart';
import './Viewer3D.css';
import './ProjectAssembly3D.css';

interface ProjectAssembly3DProps {
  assembly: ResolvedAssembly;
  exploded: boolean;
  selectedKey: string | null;
  onSelectPart: (part: ResolvedAssemblyPart) => void;
}

interface AssemblySceneProps extends ProjectAssembly3DProps {
  labelDistanceFactor: number;
}

const EXPLODE_SCALE = 2.2;
const EASE = 0.09;

function explodedPosition(position: Vec3, centroid: Vec3, factor: number): Vec3 {
  return [
    position[0] + (position[0] - centroid[0]) * (EXPLODE_SCALE - 1) * factor,
    position[1] + (position[1] - centroid[1]) * (EXPLODE_SCALE - 1) * factor,
    position[2] + (position[2] - centroid[2]) * (EXPLODE_SCALE - 1) * factor,
  ];
}

function useEasedFactor(target: number): number {
  const [value, setValue] = useState(target);
  useFrame(() => {
    setValue((v) => {
      const next = v + (target - v) * EASE;
      return Math.abs(target - next) < 0.001 ? target : next;
    });
  });
  return value;
}

function AssemblyScene({ assembly, exploded, selectedKey, onSelectPart, labelDistanceFactor }: AssemblySceneProps) {
  const factor = useEasedFactor(exploded ? 1 : 0);

  const livePositions = useMemo(() => {
    const map = new Map<string, Vec3>();
    for (const part of assembly.parts) {
      map.set(part.key, explodedPosition(part.placement.position, assembly.centroid, factor));
    }
    return map;
  }, [assembly, factor]);

  const partsByKey = useMemo(() => new Map(assembly.parts.map((p) => [p.key, p])), [assembly]);

  const lines = useMemo(() => {
    return assembly.connections
      .map((conn) => {
        const fromPart = partsByKey.get(assemblyPartKey(conn.from.componentId, conn.from.instance));
        const toPart = partsByKey.get(assemblyPartKey(conn.to.componentId, conn.to.instance));
        if (!fromPart || !toPart) return null;
        const fromLocal = fromPart.pinPositions[conn.from.pin];
        const toLocal = toPart.pinPositions[conn.to.pin];
        if (!fromLocal || !toLocal) return null;
        const fromPos = livePositions.get(fromPart.key)!;
        const toPos = livePositions.get(toPart.key)!;
        const from = resolveWorldPoint({ position: fromPos, rotation: fromPart.placement.rotation, scale: fromPart.placement.scale }, fromLocal);
        const to = resolveWorldPoint({ position: toPos, rotation: toPart.placement.rotation, scale: toPart.placement.scale }, toLocal);
        // Arc the wire up and over rather than drawing a straight line through
        // whatever geometry sits between the two pins — reads like a real
        // wire draped over the assembly instead of a laser beam through it.
        const horiz = Math.hypot(to[0] - from[0], to[2] - from[2]);
        const midY = Math.max(from[1], to[1]) + Math.min(horiz * 0.3, 0.6) + 0.1;
        const mid: Vec3 = [(from[0] + to[0]) / 2, midY, (from[2] + to[2]) / 2];
        return { key: `${fromPart.key}:${conn.from.pin}->${toPart.key}:${conn.to.pin}`, from, mid, to };
      })
      .filter((l): l is { key: string; from: Vec3; mid: Vec3; to: Vec3 } => l !== null);
  }, [assembly.connections, partsByKey, livePositions]);

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 3]} intensity={1.3} castShadow />
      <directionalLight position={[-4, 3, -3]} intensity={0.4} />
      {assembly.parts.map((part) => (
        <AssemblyPart
          key={part.key}
          part={part}
          position={livePositions.get(part.key) ?? part.placement.position}
          isSelected={selectedKey === part.key}
          onSelect={onSelectPart}
          color={categoryColor(part.component?.identity.category ?? '')}
          labelDistanceFactor={labelDistanceFactor}
        />
      ))}
      {lines.map((line) => (
        <QuadraticBezierLine
          key={line.key}
          start={line.from}
          end={line.to}
          mid={line.mid}
          color="#ffb454"
          lineWidth={1.1}
          transparent
          opacity={0.55}
          dashed
          dashSize={0.06}
          gapSize={0.05}
        />
      ))}
    </>
  );
}

export default function ProjectAssembly3D({ assembly, exploded, selectedKey, onSelectPart }: ProjectAssembly3DProps) {
  const { cameraDistance, groundRadius } = useMemo(() => {
    if (assembly.parts.length === 0) return { cameraDistance: 3, groundRadius: 3 };
    const maxReach = assembly.parts.reduce((max, part) => {
      const [x, , z] = part.placement.position;
      const [cx, , cz] = assembly.centroid;
      const dist = Math.hypot(x - cx, z - cz) + getAssemblyFootprint(part.componentId).radius;
      return Math.max(max, dist);
    }, 0.3);
    // Camera position components are each cameraDistance*~0.9, so true
    // distance-from-target is roughly cameraDistance*1.5 — sized to fill
    // most of the frame at rest, with headroom for the exploded view.
    const cameraDistance = Math.max(1.8, maxReach * (1 + (EXPLODE_SCALE - 1) * 0.4) + 0.3);
    const groundRadius = Math.max(1.5, maxReach * 2.2 + 0.5);
    return { cameraDistance, groundRadius };
  }, [assembly]);

  return (
    <div className="viewer3d project-assembly-3d">
      <Canvas shadows camera={{ position: [cameraDistance * 0.85, cameraDistance * 0.95, cameraDistance * 0.85], fov: 42 }}>
        <Suspense fallback={null}>
          <AssemblyScene
            assembly={assembly}
            exploded={exploded}
            selectedKey={selectedKey}
            onSelectPart={onSelectPart}
            labelDistanceFactor={cameraDistance * 1.6}
          />
        </Suspense>
        {/* Ground reference plane, sized to the model rather than the camera
            — without it, parts read as scattered debris rather than a build
            sitting on a surface. */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.005, 0]} receiveShadow>
          <circleGeometry args={[groundRadius, 48]} />
          <meshStandardMaterial color="#1b1e26" roughness={0.95} />
        </mesh>
        <OrbitControls enablePan minDistance={0.8} maxDistance={cameraDistance * 4} />
      </Canvas>
      <p className="viewer3d-hint">Drag to orbit &middot; scroll to zoom &middot; click a part to inspect it</p>
    </div>
  );
}
