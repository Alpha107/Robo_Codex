import './CircuitDiagram.css';

interface CircuitDiagramProps {
  svg: string;
  caption?: string;
}

export default function CircuitDiagram({ svg, caption }: CircuitDiagramProps) {
  if (!svg) {
    return <p className="circuit-diagram-missing">Circuit diagram coming soon.</p>;
  }

  return (
    <figure className="circuit-diagram">
      {/* eslint-disable-next-line react/no-danger */}
      <div className="circuit-diagram-svg" dangerouslySetInnerHTML={{ __html: svg }} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
