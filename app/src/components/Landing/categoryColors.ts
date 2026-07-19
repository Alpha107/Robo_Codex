const CATEGORY_COLORS: Record<string, string> = {
  'Power Management': '#ff6b6b',
  'Motors & Actuators': '#ffa94d',
  'Motor Drivers & Controllers': '#f06595',
  'Motion & Orientation Sensors': '#51cf66',
  'Structural & Mechanical': '#adb5bd',
  'Microcontroller Board': '#4dabf7',
  'Prototyping Essentials': '#74c0fc',
  'Single Board Computer': '#339af0',
  'Environmental Sensors': '#66d9e8',
  'Displays & Feedback': '#e599f7',
  'Vision & Imaging': '#cc5de8',
  'Line Following / Encoders / Feedback': '#94d82d',
  'Distance & Proximity Sensors': '#22b8cf',
  'Communication Modules': '#845ef7',
  'Input Devices': '#ffd43b',
  'Force & Torque Sensing': '#20c997',
  'Control Theory': '#4dabf7',
  'Kinematics & Dynamics': '#51cf66',
  'Sensing, Estimation & Perception': '#22b8cf',
  'Motion Planning & Navigation': '#f08c00',
  'AI & Machine Learning': '#cc5de8',
  'Software & Systems': '#845ef7',
  'Actuation Foundations': '#ffa94d',
};

const FALLBACK_COLOR = '#4dabf7';

export function categoryColor(category: string): string {
  return CATEGORY_COLORS[category] ?? FALLBACK_COLOR;
}
