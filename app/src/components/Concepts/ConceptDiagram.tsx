import './ConceptDiagram.css';

interface ConceptDiagramProps {
  svg: string;
  caption?: string;
}

export default function ConceptDiagram({ svg, caption }: ConceptDiagramProps) {
  if (!svg) {
    return <p className="concept-diagram-missing">Diagram coming soon.</p>;
  }

  return (
    <figure className="concept-diagram">
      {/* eslint-disable-next-line react/no-danger */}
      <div className="concept-diagram-svg" dangerouslySetInnerHTML={{ __html: svg }} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
