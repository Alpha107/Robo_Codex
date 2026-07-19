import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import type { RoboticsProject } from '../../types/project';
import { getProjectAssembly } from '../../data/projectAssembly';
import type { ResolvedAssemblyPart } from '../../data/projectAssembly';
import { categoryColor } from '../Landing/categoryColors';
import ProjectAssembly3D from '../Viewer3D/ProjectAssembly3D';
import ProjectAssembly2D from './ProjectAssembly2D';
import './ProjectAssemblyPanel.css';

interface ProjectAssemblyPanelProps {
  project: RoboticsProject;
}

export default function ProjectAssemblyPanel({ project }: ProjectAssemblyPanelProps) {
  const assembly = useMemo(() => getProjectAssembly(project), [project]);
  const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d');
  const [exploded, setExploded] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const selected = assembly.parts.find((p) => p.key === selectedKey) ?? null;

  function selectPart(part: ResolvedAssemblyPart) {
    setSelectedKey((prev) => (prev === part.key ? null : part.key));
  }

  if (assembly.parts.length === 0) {
    return null;
  }

  return (
    <div className="project-assembly-panel">
      <div className="project-assembly-toolbar">
        <div className="project-assembly-tabs" role="tablist" aria-label="View mode">
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === '3d'}
            className={viewMode === '3d' ? 'assembly-tab is-active' : 'assembly-tab'}
            onClick={() => setViewMode('3d')}
          >
            3D
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={viewMode === '2d'}
            className={viewMode === '2d' ? 'assembly-tab is-active' : 'assembly-tab'}
            onClick={() => setViewMode('2d')}
          >
            2D Layout
          </button>
        </div>
        {viewMode === '3d' && (
          <button
            type="button"
            className={exploded ? 'assembly-explode-btn is-active' : 'assembly-explode-btn'}
            onClick={() => setExploded((v) => !v)}
          >
            {exploded ? '⊟ Assembled view' : '⊞ Exploded view'}
          </button>
        )}
      </div>

      <div className="project-assembly-body">
        {viewMode === '3d' ? (
          <ProjectAssembly3D assembly={assembly} exploded={exploded} selectedKey={selectedKey} onSelectPart={selectPart} />
        ) : (
          <ProjectAssembly2D assembly={assembly} selectedKey={selectedKey} onSelectPart={selectPart} />
        )}

        <div className="assembly-part-card">
          {selected ? (
            <>
              <span
                className="assembly-part-card-category"
                style={{ backgroundColor: categoryColor(selected.component?.identity.category ?? '') }}
              >
                {selected.component?.identity.category ?? 'Component'}
              </span>
              <h3>{selected.name}</h3>
              {selected.note && <p className="assembly-part-card-note">{selected.note}</p>}
              {selected.ref && selected.ref.quantity > 1 && (
                <p className="assembly-part-card-qty">Uses {selected.ref.quantity} of these in this build.</p>
              )}
              {selected.component && (
                <Link to={`/component/${selected.component.identity.id}`} className="assembly-part-card-link">
                  View full component &rarr;
                </Link>
              )}
            </>
          ) : (
            <p className="assembly-part-card-empty">Click a part in the {viewMode === '3d' ? '3D model' : '2D diagram'} to see what it is.</p>
          )}
        </div>
      </div>
      <p className="project-assembly-caption">
        A physical layout of this build — not to exact scale. Dashed lines trace the same connections listed in
        Step-by-Step Wiring below.
      </p>
    </div>
  );
}
