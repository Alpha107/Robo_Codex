# RoboCodex — Interactive 3D Hardware Reference

**An interactive learning platform for robotics hardware and theory** — 132 hand-modeled 3D components (from breadboard-level hobbyist parts through professional/industrial robotics hardware), 28 guided build projects (each with its own interactive 3D/2D assembly view), and 52 bachelor/masters-level theory topics with animated diagrams, all cross-linked into one site.

Click a component, spin a bespoke 3D model of it, click any pin, and get a real answer: what it does, its voltage/current limits, and the mistake that actually trips people up. Open a project and see the *whole build* assembled in 3D — chassis, motors, wheels, sensors, wired together — not just a list of parts. Then learn the theory underneath it.

![Landing page](app/docs/screenshots/landing.png)

---

## Why this exists

Most people learning embedded systems and robotics hit the same wall: a pinout diagram tells you *which pin is which*, but not what a pin actually **is** — is it 5V tolerant? What happens if you short it? Why does everyone's first ESP32 project break the moment they use GPIO2? Datasheets have the answer buried on page 34; forums have it scattered across ten years of threads. And once you're past individual parts, the theory that actually explains *why* a PID loop or a Kalman filter works is scattered across textbooks that assume you already have a university course's worth of context.

This project sits in the gap between several kinds of tools that already exist and are good at what they do, but don't do this:

- **Static pinout sites** — accurate, but flat. No interactivity, no "why," no sense of what the part physically looks like, and no sense of how it sits inside a *finished build*.
- **Circuit simulators** (Wokwi and similar) — great for *building and running* a circuit, but that's a different job from *learning one component deeply*. This project deliberately does **not** simulate circuits, execute code, or model electrical behavior — that scope is a distraction from the actual goal, and those tools already do it well.
- **University lecture notes / textbooks** — thorough, but written for someone already enrolled in the course, with no link back to the actual hardware sitting on your desk.

Instead, every component gets a hand-modeled (not generic-box) 3D model, a clickable pin map with real specs and gotchas, worked use cases, and links to the components it's commonly paired with, confused with, or upgraded to. Every project gets an interactive 3D/2D view of the *whole assembled build*, not just a parts list. And every project and theory topic links back to the exact components and concepts it depends on, so you can move between "what is this part," "how do I build with it," and "why does this actually work" without leaving the site.

This project also doubles as a portfolio piece demonstrating full-stack + 3D graphics + embedded/robotics domain knowledge, built while starting an MSc in Robotics and AI.

## Who it's for

- **Students & self-learners** building a mental model of hardware and control/robotics theory before (or instead of) reading a 40-page datasheet or a 400-page textbook.
- **Educators** who want a visual aid for "here's what a servo's pins actually do," "here's what this whole robot looks like assembled," or "here's what a Kalman filter is actually doing" without switching to a PDF.
- **Hobbyists** deciding between two similar parts (e.g. "SG90 vs MG996R servo," "ESP32 vs ESP8266") via the *Often Confused With* / *Often Upgraded To* links, or picking their next weekend build from the project library and previewing what it actually looks like assembled before buying parts.
- **Anyone prototyping** who needs a 30-second refresher on a part's voltage range, pin functions, or the theory behind a control loop, without a datasheet or textbook dive.

## Features

### Component encyclopedia
- **132 bespoke 3D models** across 16 categories (microcontrollers, SBCs, motors & actuators, motor drivers, distance sensors, IMUs, force/torque sensing, environmental sensors, vision, encoders/feedback, communication modules, displays, input devices, power management, structural/mechanical, prototyping essentials) — every part is modeled by hand, not a generic placeholder box. Spans two tiers: breadboard/Arduino-level hobbyist parts and professional/industrial robotics hardware (RGB-D depth cameras, 3D LiDAR, force/torque sensors, CAN bus, FOC servo drives, harmonic drives, a 6-DOF arm kit, and more) — see [Development journal](#development-journal).
- **Click-to-learn pin hotspots**, uniformly sized and color-coded by category (power / digital / analog / communication / special), with per-pin function, voltage range, current limit, alternate functions, and a "gotcha" where one exists.
- **Full encyclopedia content** per component: a "Simple vs Detailed" overview toggle, specifications table, worked use cases with difficulty ratings, common beginner mistakes, and related components — plus a **pin quiz mode** to test your recall of a component's pinout.
- **Related-component linking** — "Commonly paired with," "Often confused with," and "Often upgraded to" mentions are automatically cross-linked to the matching catalog entry where one exists.

### Project library
- **28 guided build projects** from LED Blink through a mecanum omnidirectional robot, organized into 4 progressive difficulty tiers (Beginner → Advanced), each with a goal, theory, hand-drawn circuit diagram, step-by-step wiring (with persisted checkboxes), full Arduino code with line-by-line explanation, expected behavior, and interactive troubleshooting reveal-cards.
- **Interactive 3D/2D project assembly views** *(new)* — every project has a "3D Build" section showing the *whole build assembled*, not just a parts list: drag to orbit, click any part to see what it is, toggle an **exploded view** that pulls the assembly apart along dashed wiring lines tracing real pin-to-pin connections, and switch to a **2D top-down layout** tab generated from the exact same placement data, so the 3D and 2D views can never drift out of sync. The five wheeled/vehicle builds (line-following robot, obstacle-avoidance robot, Bluetooth RC car, RF433 remote-control car, mecanum robot) get hand-authored, physically-arranged layouts; the rest use a generic auto-arrange layout so every project gets a working, interactive assembly. See [Development journal](#development-journal) for how this was built and the scale-normalization problem it ran into.
- **"Mark as Built" progress tracking** with per-tier completion badges, stored in `localStorage`.
- **Animated concept diagrams** (PWM duty cycle, current flow) embedded directly in the projects that teach those ideas.
- Every listed component and relevant theory concept in a project links straight back to its encyclopedia/theory page.

### Theory & Concepts
- **52 theory topics** across 7 categories — Control Theory, Kinematics & Dynamics, Sensing/Estimation/Perception, Motion Planning & Navigation, AI & Machine Learning, Software & Systems, and Actuation Foundations — written to build a real bachelor/masters-level robotics foundation, not just define jargon. Within each category, topics are ordered Foundational → Intermediate → Advanced.
- Each topic has a plain-English key idea, a **Simple vs Detailed** overview toggle, the actual equations with variables explained in words, an **animated hand-drawn diagram** (flowing signal paths, particles converging, gears spinning at the correct relative speed/direction, poles tracing toward instability, and more) with a concrete worked example, real-world examples, common misconceptions, and links to the exact components/projects/other concepts it connects to.

### Learning support (cuts across all three)
- **Glossary with inline tooltips** — technical terms anywhere on the site (PWM, I2C, Kalman filter, etc.) are underlined and show a definition on hover/focus, plus a dedicated searchable `/glossary` page.
- **Common Mistakes hub** (`/common-mistakes`) aggregating every component pin gotcha and project troubleshooting entry site-wide into one searchable, tabbed page.
- **Before You Start guide** (`/before-you-start`) covering required tools, how to read a breadboard, this site's circuit-diagram color conventions, and basic safety habits.
- **Search that actually searches** — matches on name, category, individual pin names, and use-case/theory text, not just the title.
- **Category browsing** from an animated landing page, each category tile deep-linking into a pre-filtered library view.
- **Prev/Next + breadcrumb navigation** throughout, so browsing never means bouncing back to a grid every time.
- **Dark/light theme toggle**, persisted across visits and defaulting to your OS preference.
- **Code-split routing** — the three.js/3D-model bundle is only fetched when a 3D view is actually needed, not on first load of the landing, library, project, or theory pages.

## Screenshots

| Landing | Library | Component workspace |
|---|---|---|
| ![Landing](app/docs/screenshots/landing.png) | ![Library](app/docs/screenshots/library.png) | ![Workspace](app/docs/screenshots/workspace.png) |

## Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) — dev server & build
- [React Three Fiber](https://r3f.docs.pmnd.rs/) + [drei](https://github.com/pmndrs/drei) + [three.js](https://threejs.org/) — 3D rendering, for both single-component viewing and whole-build assembly scenes
- [React Router](https://reactrouter.com/) — client-side routing
- Plain CSS (custom properties for theming) — no CSS framework, no component library
- [Oxlint](https://oxc.rs/) — linting

No backend, no database — content lives as versioned JSON files in the repo (`app/src/data/content/*.json`, `app/src/data/projects/*.json`, `app/src/data/concepts/*.json`), and 3D models are hand-authored React Three Fiber components (`app/src/components/Viewer3D/models/*.tsx`). The only client-side persistence is `localStorage`, used for the theme choice, project "Mark as Built" progress, and wiring-step checkboxes — there's no account system and nothing ever leaves your browser.

## Repository structure

This repo has two top-level folders with very different jobs:

```
robocodex/
├── app/              # The actual product — a React + Vite SPA. See app/README.md
│                      # for the full architecture writeup and dev setup instructions.
└── content-pilot/     # Phase 0 planning artifact: 3 fully-written component entries
                        # (Arduino Uno, HC-SR04, SG90 servo) used to validate the content
                        # schema before scaling to the full 99-component catalog. Kept
                        # for historical reference, not imported by the app.
```

Everything you'd actually run lives in `app/` — clone, `cd app`, `npm install`, `npm run dev`. See [`app/README.md`](app/README.md) for the full project-structure breakdown (`src/data`, `src/components`, `src/types`), the "how to add a new component/project/concept" guides, and OS-specific setup notes.

## Getting started

```bash
git clone <this-repo-url>
cd robocodex/app           # the npm project lives in app/, not the repo root
npm install
npm run dev                # opens on http://localhost:5173
```

Full prerequisites, OS-specific install notes (Linux/macOS/Windows), production build, and lint commands are documented in [`app/README.md`](app/README.md#getting-started) — this section is intentionally just the fast path.

## Project status

| Area | Status |
|---|---|
| Component encyclopedia (132 components, 3D models, pin maps, specs, use cases) | ✅ Complete |
| Project library (28 builds, wiring, code, troubleshooting) | ✅ Complete |
| Theory & concepts library (52 topics, animated diagrams) | ✅ Complete |
| Glossary, search, cross-linking, dark/light theme | ✅ Complete |
| Interactive 3D/2D project assembly views | ✅ Complete for all 28 projects — 5 vehicle builds hand-tuned, the rest auto-arranged |
| Physically hand-tuned assembly layouts beyond the 5 vehicle builds | 📋 Planned |
| Server-side rendering / per-page SEO previews | 📋 Planned |
| Automated content schema validation + test suite | 📋 Planned |
| Interactive (input-driven) theory diagrams | 📋 Planned |

See [Future improvements](#future-improvements) for the full backlog.

## Development journal

A rough phase-by-phase account of how this project actually got built, kept here rather than lost to commit history.

### Phase 0 — Content pilot (`content-pilot/`)

Before writing a line of app code or a single 3D model, the plan was validated on paper first: three deliberately different component types — a microcontroller board (Arduino Uno), a sensor (HC-SR04), and an actuator (SG90 servo) — got their *full* planned content schema written out (identity, overview, specs, pin map, use cases, related components) at real depth. The goal was to catch schema problems while the cost of a mistake was "edit a JSON file," not "restructure 99 components."

It worked: writing the servo and the HC-SR04 surfaced that a `beginnerMistakes` list was needed but hadn't been planned as a first-class field in the original Arduino Uno draft — it got folded in before the schema was locked and scaled. This phase also produced a real per-component time-cost estimate, used to budget the full catalog, and deliberately deferred 3D pin-hotspot coordinates (`"position": null` on every pin) to the modeling phase rather than guessing them upfront.

### Phase 1 — The 3D asset library

All 99 components got a hand-authored, stylized (explicitly *not* photorealistic) React Three Fiber model — built from primitive geometry (boxes, cylinders, etc.), not imported meshes or GLTF assets. That keeps the entire 3D layer dependency-free and the bundle small, at the cost of every model being built independently, at whatever internal scale looked good framed alone — a decision that came back to matter a lot in Phase 3. Each model exports its own named pin-position map (e.g. `ARDUINO_PIN_POSITIONS`), registered centrally in `MODEL_REGISTRY` — this one map is what drives the click-to-inspect pin hotspots, and later, the assembly view's wiring lines, without a second parallel geometry system.

### Phase 2 — The application

The actual site: component encyclopedia, the 28-project build library, the 52-topic theory library, glossary with inline tooltips, cross-referenced search, dark/light theming, and the "Common Mistakes" / "Before You Start" hub pages — all shipped as a static, backend-free React + Vite SPA with every piece of content living as versioned JSON, cross-linked by id.

### Phase 3 — Interactive 3D/2D project assembly

Instead of only ever viewing one component at a time, every project page now shows the *whole build* assembled — reusing the exact same model library, just arranged together. Shipped in one pass across all 28 projects: a shared assembly engine (auto-arrange fallback + hand-tuned layouts for the 5 wheeled/vehicle builds), wiring-line rendering translated from each project's existing wiring instructions, an exploded-view toggle, and a 2D top-down layout view projected from the same data as the 3D scene. See Challenges below for what went wrong on the first pass and how it got fixed.

### Phase 4 — Catalog expansion to 132 components (most recent)

The original 99 components were almost entirely hobbyist/Arduino-Pi tier. This phase added 33 more across two directions at once: filling genuine gaps at that same tier (a PIR motion sensor was, surprisingly, missing entirely), and adding a professional/industrial tier that didn't exist before — RGB-D depth cameras, 3D LiDAR, force/torque sensors, CAN bus, FOC BLDC servo drives, a harmonic drive gearbox, a 2-finger gripper, a 6-DOF arm kit, an industrial PLC, and more, introducing a new "Force & Torque Sensing" category alongside the existing 15. Built as six parallel batches (content + 3D model for ~5-6 components each), each working from the same schema/style spec and touching only new files, then wired into the shared model registry and category color/icon tables in one central integration pass — the same "many independent files, one shared integration point" pattern Phase 3's assembly engine used.

## Challenges faced

- **Cross-component scale inconsistency, discovered the hard way.** The first version of the assembly feature (Phase 3) shipped broken: because every model (Phase 1) was authored independently at whatever scale looked good *alone*, assembling them together produced motors rendering larger than the entire chassis, parts floating disconnected in mid-air, wiring lines drawn as straight lines through solid geometry, and a "jumper wires" placeholder rendering as an oversized, disconnected prop. This was diagnosed from real screenshots and fixed with a real-world-millimeter-based scale normalization system — every component gets an approximate real-world size, and its render scale is derived automatically relative to a robot-chassis-kit anchor — plus a shared ground plane, arced (not straight) wiring lines that no longer clip through geometry, and simply excluding "bulk count" items (jumper wires, passive components) from being placed as one misleading floating object.
- **Modeling 132 components with zero external assets.** No purchased or downloaded 3D models — every part is hand-built from primitives, which keeps the project dependency-free but means consistency (a shared "board surface" convention, a shared pin-hotspot sizing rule) had to be maintained by hand across every single model file, not enforced by a shared base asset.
- **Content depth vs. time cost at 132+28+52 entries.** The Phase 0 pilot's whole purpose was catching this early: getting the schema right on 3 components before multiplying the time cost by roughly 40x for the original catalog, and again for Phase 4's 33-component expansion.
- **Keeping a professional/industrial tier honest, not just "hobbyist parts but bigger."** Phase 4's higher-level components needed real differentiation from their hobbyist-tier catalog neighbors — e.g. an absolute encoder retaining position through a power cycle vs. an incremental one losing it, or CAN bus's multi-drop arbitration vs. a point-to-point UART link — not just a vaguer, more expensive version of the same thing.
- **Fuzzy related-component matching.** "Commonly paired with," "often confused with," and "often upgraded to" mentions are free text, matched against the catalog by name/word overlap rather than hand-curated one-by-one — this gets the large majority right without manually wiring hundreds of cross-links, but isn't perfect (see Future improvements).
- **Staying backend-free on purpose.** No database, no account system, no server — a deliberate constraint that keeps the project simple, free to host, and fast, at the cost of content needing a rebuild+redeploy to change, and progress tracking (`localStorage`) not syncing across devices.

## Future improvements

Roughly in order of expected value-to-effort:

- **Build projects that actually use the new professional/industrial-tier components (Phase 4).** All 33 new components are currently encyclopedia-only — none of the 28 build projects reference a depth camera, force/torque sensor, CAN bus module, or robotic arm yet. A handful of advanced projects built around them would be the natural next step.
- **Extend hand-tuned, physically-arranged assembly layouts beyond the 5 vehicle builds** — the rest currently use a generic (but fully interactive) auto-arrange layout rather than a bespoke one.
- **Auto-reframe the camera on exploded-view toggle** — currently the camera stays put and relies on the user zooming out manually for builds that spread out a lot.
- **Higher-precision real-world size data** for the assembly scale-normalization table — current values are researched-but-approximate; more precise per-component dimensions would make less-common parts sit even more proportionately.
- **Resolve same-category visual overlap in the 2D layout view** — parts sharing a category color (e.g. chassis/wheels, both "Structural & Mechanical") can be hard to tell apart at a glance where they legitimately overlap in a top-down projection.
- **Interactive (not just animated) versions of the flagship theory diagrams.** PID step-response with adjustable Kp/Ki/Kd, a 2-link arm inverse-kinematics dragger, an A*/Dijkstra grid you can click obstacles onto — diagrams already animate to illustrate their concept, but none of them accept your own input yet.
- **Per-model code-splitting.** The three.js/model-registry chunk is already lazy-loaded as a whole, but it still bundles all 132 models together. Splitting each model into its own dynamic import would mean opening one component only downloads that component's geometry.
- **Server-rendered or prerendered pages** for real SEO/link-preview support — this is a pure client-side SPA today, so shared links show a generic preview rather than a per-page one.
- **A real Open Graph preview image** (currently there's no `og:image`).
- **Automated content schema validation** (e.g. a Zod schema + a CI check) so a malformed or incomplete content JSON fails fast instead of silently rendering blank fields.
- **A lightweight test suite** (component/assembly render smoke tests, pin-position/content-name/cross-link consistency checks) wired into CI.
- **Higher-precision related-component matching** — extracting model numbers as a stronger signal than name/word overlap.
- **A side-by-side comparison view** — pick two components (e.g. SG90 vs MG996R) and see their specs/pins diffed.
- **Printable/exportable pinout cheat sheets and project build sheets.**
- **Accessibility pass for the 3D viewers** — keyboard navigation between pins/parts and a text-only equivalent view for screen reader users.
- **Optional account + cloud sync for progress tracking** — at the cost of introducing the backend this project has deliberately avoided so far.
- **Contribution guide** if this becomes a community-editable catalog rather than a solo-maintained one.

## License

No license file is currently included — all rights reserved by default. Add a `LICENSE` file (MIT is a common choice for a portfolio project like this) if you want to permit reuse.

## Author

**Developed by Abashesh Ranabhat**, built while starting an MSc in Robotics and AI.
