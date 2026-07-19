export interface Tier {
  key: 'Beginner' | 'Beginner-Intermediate' | 'Intermediate' | 'Advanced';
  label: string;
  tagline: string;
  color: string;
  encouragement: string;
}

export const TIERS: Tier[] = [
  {
    key: 'Beginner',
    label: 'Beginner',
    tagline: 'Start here — one component, one idea, no prerequisites.',
    color: '#2f9e44',
    encouragement: "This is a great first build. Take it slow, follow each wiring step in order, and don't worry about understanding everything perfectly the first time — that comes with building.",
  },
  {
    key: 'Beginner-Intermediate',
    label: 'Beginner → Intermediate',
    tagline: 'A sensor or a display enters the picture.',
    color: '#0ca678',
    encouragement: "You're past the basics now. This project adds one new idea on top of what you already know — if something in it feels unfamiliar, that's normal, and it's exactly what this step is for.",
  },
  {
    key: 'Intermediate',
    label: 'Intermediate',
    tagline: 'Motors, motion, and combining what came before.',
    color: '#f08c00',
    encouragement: "This build combines several parts working together. If it doesn't work first try, that's completely normal — check each connection against the diagram one at a time rather than guessing.",
  },
  {
    key: 'Advanced',
    label: 'Advanced',
    tagline: 'Full robots and connected systems — everything at once.',
    color: '#e03131',
    encouragement: "This is a full system with a lot of moving parts. Build and test it in stages rather than all at once — get the wiring confirmed, then the basic code, then the full behavior — and it's very manageable.",
  },
];

export function getTier(key: string): Tier | undefined {
  return TIERS.find((t) => t.key === key);
}
