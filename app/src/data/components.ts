import type { RoboticsComponent } from '../types/component';
import { getBoardFootprint, perimeterPositions } from './hotspotLayout';

const contentModules = import.meta.glob('./content/*.json', { eager: true }) as Record<
  string,
  { default: unknown }
>;

const RAW_COMPONENTS = Object.values(contentModules).map((m) => m.default) as RoboticsComponent[];

function withComputedHotspots(component: RoboticsComponent): RoboticsComponent {
  const footprint = getBoardFootprint(component.identity.id);
  const positions = perimeterPositions(component.pinMap.length, footprint);

  return {
    ...component,
    pinMap: component.pinMap.map((pin, i) => ({ ...pin, position: positions[i] })),
  };
}

export const components: RoboticsComponent[] = RAW_COMPONENTS.map(withComputedHotspots).sort((a, b) =>
  a.identity.name.localeCompare(b.identity.name),
);

export function getComponentById(id: string): RoboticsComponent | undefined {
  return components.find((c) => c.identity.id === id);
}

export function getCategories(): string[] {
  return Array.from(new Set(components.map((c) => c.identity.category))).sort();
}

export interface ComponentMistake {
  component: RoboticsComponent;
  text: string;
  source: 'gotcha' | 'mistake';
  pinName?: string;
}

/** Every pin-level gotcha and beginner-mistake across the whole catalog, for the Common Mistakes hub. */
export function getAllComponentMistakes(): ComponentMistake[] {
  const out: ComponentMistake[] = [];
  for (const c of components) {
    for (const pin of c.pinMap) {
      if (pin.gotcha) {
        out.push({ component: c, text: pin.gotcha, source: 'gotcha', pinName: pin.name });
      }
    }
    for (const m of c.beginnerMistakes ?? []) {
      out.push({ component: c, text: m, source: 'mistake' });
    }
  }
  return out;
}

/** Previous/next component in the same alphabetical ordering the library grid uses. */
export function getAdjacentComponents(id: string): {
  prev: RoboticsComponent | null;
  next: RoboticsComponent | null;
} {
  const index = components.findIndex((c) => c.identity.id === id);
  if (index === -1) return { prev: null, next: null };
  const prev = index > 0 ? components[index - 1] : null;
  const next = index < components.length - 1 ? components[index + 1] : null;
  return { prev, next };
}

/**
 * Loosely resolve a related-component mention (e.g. "Arduino Nano (same chip,
 * smaller board, micro-USB)") to an actual catalog entry, stripping
 * parenthetical asides and matching by name prefix. Returns null if nothing
 * in the catalog plausibly matches, so callers can fall back to plain text.
 */
function normalizeWord(word: string): string {
  // crude singularization so "buttons"/"potentiometers" match a singular
  // catalog name like "Push Button"/"Potentiometer"
  return word.length > 3 && word.endsWith('s') ? word.slice(0, -1) : word;
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map(normalizeWord);
}

export function resolveRelatedComponent(mention: string): RoboticsComponent | undefined {
  const clean = mention.replace(/\s*\([^)]*\)\s*/g, '').trim();
  if (!clean) return undefined;
  const cleanLower = clean.toLowerCase();

  // Tiered, most-confident-first: an exact name match or "mention is the
  // catalog name plus more descriptive words" (e.g. "ESP32" -> "ESP32
  // DevKit") should always win over a same-string-prefix match against an
  // unrelated sibling product (e.g. "ESP32-CAM") or the generic word-overlap
  // fallback below.
  const exact = components.find((c) => c.identity.name.toLowerCase() === cleanLower);
  if (exact) return exact;

  const nameExtendsClean = components.find((c) => c.identity.name.toLowerCase().startsWith(`${cleanLower} `));
  if (nameExtendsClean) return nameExtendsClean;

  const cleanExtendsName = components.find((c) => cleanLower.startsWith(c.identity.name.toLowerCase()));
  if (cleanExtendsName) return cleanExtendsName;

  const loosePrefix = components.find((c) => c.identity.name.toLowerCase().startsWith(cleanLower));
  if (loosePrefix) return loosePrefix;

  // Loose fallback for mentions worded differently from the catalog name
  // (e.g. "SG90 servo motor" vs. "SG90 Micro Servo Motor"): match if every
  // significant word in the mention also appears in the component's name.
  const cleanWords = tokenize(clean);
  if (cleanWords.length === 0) return undefined;
  return components.find((c) => {
    const nameWords = new Set(tokenize(c.identity.name));
    return cleanWords.every((w) => nameWords.has(w));
  });
}
