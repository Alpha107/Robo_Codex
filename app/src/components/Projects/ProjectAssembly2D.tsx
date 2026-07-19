import { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import type { ResolvedAssembly, ResolvedAssemblyPart } from '../../data/projectAssembly';
import { assemblyPartKey } from '../../data/projectAssembly';
import { getAssemblyFootprint } from '../../data/assemblyFootprints';
import { categoryColor } from '../Landing/categoryColors';
import './ProjectAssembly2D.css';

interface ProjectAssembly2DProps {
  assembly: ResolvedAssembly;
  selectedKey: string | null;
  onSelectPart: (part: ResolvedAssemblyPart) => void;
}

const PADDING = 1.2;

/** Nudges a center-to-center line endpoint out to the edge of `from`'s box, toward `to`. */
function edgePoint(from: [number, number], to: [number, number], radius: number): [number, number] {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const dist = Math.hypot(dx, dy) || 1;
  const t = Math.min(radius / dist, 0.45);
  return [from[0] + dx * t, from[1] + dy * t];
}

/** Top-down physical layout diagram, projected from the same placement/connection
 * data as the 3D assembly (ignores Y) — stays in sync with the 3D view for free. */
export default function ProjectAssembly2D({ assembly, selectedKey, onSelectPart }: ProjectAssembly2DProps) {
  const { parts, connections } = assembly;
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  const points = useMemo(
    () =>
      parts
        .map((part) => ({
          part,
          x: part.placement.position[0],
          z: part.placement.position[2],
          radius: getAssemblyFootprint(part.componentId).radius,
        }))
        // Biggest first, so large parts (a chassis) render as a backdrop
        // that smaller parts sitting on/beside it (wheels, boards) layer over.
        .sort((a, b) => b.radius - a.radius),
    [parts],
  );

  const byKey = useMemo(() => new Map(points.map((p) => [p.part.key, p])), [points]);

  const bounds = useMemo(() => {
    if (points.length === 0) return { minX: -2, maxX: 2, minZ: -2, maxZ: 2 };
    let minX = Infinity;
    let maxX = -Infinity;
    let minZ = Infinity;
    let maxZ = -Infinity;
    for (const p of points) {
      minX = Math.min(minX, p.x - p.radius);
      maxX = Math.max(maxX, p.x + p.radius);
      minZ = Math.min(minZ, p.z - p.radius);
      maxZ = Math.max(maxZ, p.z + p.radius);
    }
    return { minX: minX - PADDING, maxX: maxX + PADDING, minZ: minZ - PADDING, maxZ: maxZ + PADDING };
  }, [points]);

  const width = bounds.maxX - bounds.minX;
  const height = bounds.maxZ - bounds.minZ;
  // One consistent, readable text size for the whole diagram rather than
  // per-part (tiny sensors would otherwise get illegible micro-labels).
  const fontSize = Math.max(width, height) * 0.038;

  return (
    <div className="project-assembly-2d">
      <svg
        viewBox={`${bounds.minX} ${bounds.minZ} ${width} ${height}`}
        className="project-assembly-2d-svg"
        role="img"
        aria-label="Top-down physical layout diagram"
      >
        {connections.map((conn, i) => {
          const from = byKey.get(assemblyPartKey(conn.from.componentId, conn.from.instance));
          const to = byKey.get(assemblyPartKey(conn.to.componentId, conn.to.instance));
          if (!from || !to) return null;
          const [x1, y1] = edgePoint([from.x, from.z], [to.x, to.z], from.radius);
          const [x2, y2] = edgePoint([to.x, to.z], [from.x, from.z], to.radius);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className="project-assembly-2d-wire" />;
        })}
        {points.map(({ part, x, z, radius }) => {
          const color = categoryColor(part.component?.identity.category ?? '');
          const isSelected = selectedKey === part.key;
          const isHovered = hoveredKey === part.key;
          return (
            <g
              key={part.key}
              className={isSelected ? 'project-assembly-2d-part is-selected' : 'project-assembly-2d-part'}
              onClick={() => onSelectPart(part)}
              onMouseEnter={() => setHoveredKey(part.key)}
              onMouseLeave={() => setHoveredKey((k) => (k === part.key ? null : k))}
              tabIndex={0}
              role="button"
              aria-label={part.label}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onSelectPart(part);
              }}
            >
              <rect
                x={x - radius}
                y={z - radius}
                width={radius * 2}
                height={radius * 2}
                rx={Math.min(radius * 0.3, 0.12)}
                style={{ '--part-color': color } as CSSProperties}
              />
              {/* Label only for the part under the pointer or selected —
                  showing every label at once overlaps badly once several
                  small parts cluster near a much larger one (e.g. a chassis). */}
              {(isHovered || isSelected) && (
                <text x={x} y={z + radius + fontSize * 1.15} textAnchor="middle" fontSize={fontSize}>
                  {part.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
