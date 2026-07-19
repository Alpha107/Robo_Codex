export type ConceptDiagramConfig =
  | { type: 'pwm'; label?: string }
  | { type: 'current-flow' };

/** Maps a project id to the concept diagram(s) worth showing alongside its "How It Works" section. */
export const CONCEPT_DIAGRAMS: Record<string, ConceptDiagramConfig[]> = {
  'led-blink': [{ type: 'current-flow' }],
  'pwm-led-fading': [{ type: 'pwm', label: 'brightness' }],
  'dc-motor-speed-control': [{ type: 'pwm', label: 'motor speed' }],
};
