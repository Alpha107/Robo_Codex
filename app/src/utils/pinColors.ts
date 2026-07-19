import type { PinCategory } from '../types/component';

export const PIN_CATEGORY_COLORS: Record<PinCategory, string> = {
  power: '#ff6b6b',
  digital: '#4dabf7',
  analog: '#51cf66',
  communication: '#cc5de8',
  special: '#ffd43b',
};

export function colorForCategory(category: PinCategory): string {
  return PIN_CATEGORY_COLORS[category] ?? PIN_CATEGORY_COLORS.special;
}
