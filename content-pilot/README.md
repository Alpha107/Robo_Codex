# Phase 0 — Content Pilot

Full structured content for 3 components, written exactly as it would appear in the final
product, before any 3D modeling or app code. Purpose: validate that the Section 6 schema
(identity, overview, specs, pin map, use cases, related components) holds up at real depth
across genuinely different component types — a microcontroller, a sensor, and an actuator.

## Components covered

- [arduino-uno.json](arduino-uno.json) — microcontroller board, 27 pins fully documented
- [hc-sr04.json](hc-sr04.json) — ultrasonic distance sensor, 4 pins + beginner-mistakes list
- [sg90-servo.json](sg90-servo.json) — hobby servo motor, 3 pins + beginner-mistakes list

## What to check before scaling to a full library

1. **Depth consistency** — does each pin entry actually teach something (function +
   voltage/current + gotcha), or did some pins get a lazy one-liner?
2. **Time cost per component** — how long did each of these three actually take to write?
   Multiply by the 8-12 components needed for MVP to get a real time budget.
3. **Schema gaps** — the servo and HC-SR04 both needed a `beginnerMistakes` list that
   wasn't in the original Arduino Uno draft; it got folded into `useCases`/pin `gotcha`
   fields there instead. Decide whether `beginnerMistakes` should be a top-level field
   for every component (recommended) rather than inconsistently placed.
4. **Position field** — every pin has `"position": null` as a placeholder for the 3D
   hotspot coordinate that gets filled in during modeling (Phase 1). Confirm this is the
   right point to defer that data rather than guessing coordinates now.
5. **Reuse care** — this JSON is meant to be lifted directly into the CMS/data layer
   once building starts, not rewritten.

## Suggested next step

Pick one more component from a *different* category (e.g., a communication module like
HC-05 Bluetooth, or a power component like the L298N motor driver) to confirm the schema
generalizes beyond "board / sensor / actuator" before committing to the MVP list of 8-12.
