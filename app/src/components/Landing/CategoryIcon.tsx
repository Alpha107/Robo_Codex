import type { ReactElement } from 'react';

interface CategoryIconProps {
  category: string;
  className?: string;
}

const ICON_PATHS: Record<string, ReactElement> = {
  'Power Management': (
    <>
      <rect x="4" y="7" width="14" height="10" rx="2" />
      <path d="M18 10h2v4h-2" />
      <path d="M11 9l-2.5 4H11l-2 3.5" />
    </>
  ),
  'Motors & Actuators': (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3v2.4M12 18.6V21M21 12h-2.4M5.4 12H3M18.4 5.6l-1.7 1.7M7.3 16.7l-1.7 1.7M18.4 18.4l-1.7-1.7M7.3 7.3L5.6 5.6" />
    </>
  ),
  'Motor Drivers & Controllers': (
    <>
      <rect x="6" y="6" width="12" height="12" rx="1.5" />
      <path d="M2 9h4M2 15h4M18 9h4M18 15h4M9 2v4M15 2v4M9 18v4M15 18v4" />
      <path d="M9.5 12h5M13 9.5L15.5 12 13 14.5" />
    </>
  ),
  'Motion & Orientation Sensors': (
    <>
      <circle cx="12" cy="12" r="8" />
      <ellipse cx="12" cy="12" rx="8" ry="3.2" transform="rotate(30 12 12)" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  'Force & Torque Sensing': (
    <>
      <circle cx="12" cy="13" r="7.5" />
      <path d="M12 13L16 9.5" />
      <path d="M12 4.5v2M6 8l1.4 1.4M18 8l-1.4 1.4" />
    </>
  ),
  'Structural & Mechanical': (
    <>
      <path d="M12 3l3 1.7v3.4L12 9.8 9 8.1V4.7z" />
      <path d="M19.6 7.5l1 3.3-2.6 2.4-3-1.3-.6-3.3z" />
      <path d="M20.6 16.5l-2 2.8-3.3-.7-.9-3.3 2.6-2.3z" />
      <path d="M13.6 21.4l-3.2-.9-.5-3.3 2.7-2.2 3 1.4z" />
      <path d="M5.3 18.2l-2-2.8 1.7-3 3.3.6 1 3.2z" />
      <path d="M4.1 10.7l1-3.2 3.3-.5 1.7 2.8-2 2.7z" />
      <circle cx="12" cy="12" r="2.6" />
    </>
  ),
  'Microcontroller Board': (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1.2" />
      <rect x="9.8" y="9.8" width="4.4" height="4.4" rx="0.6" />
      <path d="M4 9h3M4 12h3M4 15h3M17 9h3M17 12h3M17 15h3M9 4v3M12 4v3M15 4v3M9 17v3M12 17v3M15 17v3" />
    </>
  ),
  'Prototyping Essentials': (
    <>
      <rect x="3.5" y="5" width="17" height="14" rx="1.5" />
      <path d="M3.5 9.5h17M3.5 14.5h17" />
      {[6.5, 9.5, 12, 14.5, 17.5].map((x) => (
        <path key={x} d={`M${x} 5v1.6M${x} 17.4V19`} />
      ))}
    </>
  ),
  'Single Board Computer': (
    <>
      <rect x="4" y="5.5" width="16" height="13" rx="1.5" />
      <rect x="7" y="8.5" width="5" height="5" rx="0.6" />
      <path d="M15 9h3M15 12h3M15 15h-3M2 8h2M2 12h2M2 16h2M20 8h2" />
    </>
  ),
  'Environmental Sensors': (
    <>
      <path d="M12 3.5c2.6 3.3 4.5 6 4.5 8.6a4.5 4.5 0 1 1-9 0c0-2.6 1.9-5.3 4.5-8.6z" />
      <path d="M9.8 13.4a2.4 2.4 0 0 0 2.4 2.3" />
    </>
  ),
  'Displays & Feedback': (
    <>
      <rect x="3.5" y="5" width="17" height="11.5" rx="1.5" />
      <path d="M9 20.5h6M12 16.5v4" />
      <path d="M7 9.5h6M7 12.5h4" />
    </>
  ),
  'Vision & Imaging': (
    <>
      <path d="M3.5 8.5A2.5 2.5 0 0 1 6 6h1.5l1-1.6h7l1 1.6H18a2.5 2.5 0 0 1 2.5 2.5v8A2.5 2.5 0 0 1 18 19H6a2.5 2.5 0 0 1-2.5-2.5z" />
      <circle cx="12" cy="12.5" r="3.4" />
    </>
  ),
  'Line Following / Encoders / Feedback': (
    <>
      <circle cx="12" cy="12" r="7.5" />
      <path d="M12 4.5v3M18.5 8v3M18.5 16v-2.5M12 19.5v-3M5.5 16v3M5.5 8V6" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
    </>
  ),
  'Distance & Proximity Sensors': (
    <>
      <path d="M4 18.5V13a8 8 0 0 1 16 0v5.5" />
      <path d="M7.2 18.5v-3.7a4.8 4.8 0 0 1 9.6 0v3.7" />
      <circle cx="12" cy="18.5" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  'Communication Modules': (
    <>
      <path d="M12 21v-7" />
      <circle cx="12" cy="10.5" r="2.3" />
      <path d="M8.3 8.8a5.2 5.2 0 0 0 0 7.4M15.7 8.8a5.2 5.2 0 0 1 0 7.4M5.6 6.1a9 9 0 0 0 0 11.8M18.4 6.1a9 9 0 0 1 0 11.8" />
    </>
  ),
  'Input Devices': (
    <>
      <circle cx="12" cy="9" r="4" />
      <path d="M12 13v3" />
      <rect x="7" y="16" width="10" height="4" rx="1.2" />
    </>
  ),
  'Control Theory': (
    <>
      <rect x="3" y="10" width="6" height="4" rx="1" />
      <rect x="15" y="10" width="6" height="4" rx="1" />
      <path d="M9 12h6" />
      <path d="M12 10V6a3 3 0 0 1 3-3h2" />
      <path d="M12 14v4a3 3 0 0 1-3 3H7" />
    </>
  ),
  'Kinematics & Dynamics': (
    <>
      <circle cx="6" cy="18" r="2" />
      <path d="M6 16v-5l6-3 6 3v3" />
      <circle cx="12" cy="8" r="2" />
      <path d="M18 14v2a2 2 0 1 1-2 2" />
    </>
  ),
  'Sensing, Estimation & Perception': (
    <>
      <path d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z" />
      <circle cx="12" cy="12" r="2.6" />
    </>
  ),
  'Motion Planning & Navigation': (
    <>
      <circle cx="5" cy="18" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="19" cy="6" r="1.6" fill="currentColor" stroke="none" />
      <path d="M5 18c3-2 2-6 5-8s5 1 9-4" strokeDasharray="2.4 2.2" />
    </>
  ),
  'AI & Machine Learning': (
    <>
      <circle cx="5" cy="7" r="1.6" />
      <circle cx="5" cy="17" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="19" cy="7" r="1.6" />
      <circle cx="19" cy="17" r="1.6" />
      <path d="M6.4 8.1L10.7 11M6.4 15.9L10.7 13M13.3 11L17.6 8.1M13.3 13L17.6 15.9" />
    </>
  ),
  'Software & Systems': (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1.2" />
      <rect x="13" y="4" width="7" height="7" rx="1.2" />
      <rect x="8.5" y="13" width="7" height="7" rx="1.2" />
      <path d="M7.5 11v2.5M16.5 11v2.5M9.7 16.5H8" />
    </>
  ),
  'Actuation Foundations': (
    <>
      <circle cx="9" cy="9" r="4" />
      <circle cx="9" cy="9" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="17" cy="16" r="2.6" />
      <path d="M11.8 11.3l3.3 3.3M9 5.3V4M9 14V12.7M5.3 9H4M14 9h-1.3" />
    </>
  ),
};

const FALLBACK_ICON = (
  <>
    <rect x="5" y="5" width="14" height="14" rx="2" />
    <path d="M9 9h6v6H9z" />
  </>
);

export default function CategoryIcon({ category, className }: CategoryIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICON_PATHS[category] ?? FALLBACK_ICON}
    </svg>
  );
}
