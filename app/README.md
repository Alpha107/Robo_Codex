# RoboCodex

**An interactive learning platform for robotics hardware and theory** — 132 hand-modeled 3D components (hobbyist through professional/industrial tier), 28 guided build projects, and 52 bachelor/masters-level theory topics with animated diagrams, all cross-linked into one site. Click a component, spin a bespoke 3D model of it, click any pin, and get a real answer: what it does, its voltage/current limits, and the mistake that actually trips people up. Then build something with it, and learn the theory underneath it.

![Landing page](docs/screenshots/landing.png)

---

## Why this exists

Most people learning embedded systems and robotics hit the same wall: a pinout diagram tells you *which pin is which*, but not what a pin actually **is** — is it 5V tolerant? What happens if you short it? Why does everyone's first ESP32 project break the moment they use GPIO2? Datasheets have the answer buried on page 34; forums have it scattered across ten years of threads. And once you're past individual parts, the theory that actually explains *why* a PID loop or a Kalman filter works is scattered across textbooks that assume you already have a university course's worth of context.

This project sits in the gap between several kinds of tools that already exist and are good at what they do, but don't do this:

- **Static pinout sites** — accurate, but flat. No interactivity, no "why," no sense of what the part physically looks like.
- **Circuit simulators** (Wokwi and similar) — great for *building and running* a circuit, but that's a different job from *learning one component deeply*. This project deliberately does **not** simulate circuits, execute code, or model electrical behavior — that scope is a distraction from the actual goal, and those tools already do it well.
- **University lecture notes / textbooks** — thorough, but written for someone already enrolled in the course, with no link back to the actual hardware sitting on your desk.

Instead, every component gets a hand-modeled (not generic-box) 3D model, a clickable pin map with real specs and gotchas, worked use cases, and links to the components it's commonly paired with, confused with, or upgraded to — and every project and theory topic links back to the exact components and concepts it depends on, so you can move between "what is this part," "how do I build with it," and "why does this actually work" without leaving the site.

This project also doubles as a portfolio piece demonstrating full-stack + 3D graphics + embedded/robotics domain knowledge, built while starting an MSc in Robotics and AI.

## Who it's for

- **Students & self-learners** building a mental model of hardware and control/robotics theory before (or instead of) reading a 40-page datasheet or a 400-page textbook.
- **Educators** who want a visual aid for "here's what a servo's pins actually do" or "here's what a Kalman filter is actually doing" without switching to a PDF.
- **Hobbyists** deciding between two similar parts (e.g. "SG90 vs MG996R servo," "ESP32 vs ESP8266") via the *Often Confused With* / *Often Upgraded To* links, or picking their next weekend build from the project library.
- **Anyone prototyping** who needs a 30-second refresher on a part's voltage range, pin functions, or the theory behind a control loop, without a datasheet or textbook dive.

## Features

### Component encyclopedia
- **132 bespoke 3D models** across 16 categories (microcontrollers, SBCs, motors & actuators, motor drivers, distance sensors, IMUs, force/torque sensing, environmental sensors, vision, encoders/feedback, communication modules, displays, input devices, power management, structural/mechanical, prototyping essentials) — every part is modeled by hand, not a generic placeholder box. Spans hobbyist/Arduino-tier parts through professional/industrial robotics hardware (depth cameras, 3D LiDAR, force/torque sensors, CAN bus, FOC servo drives, a 6-DOF arm kit, and more).
- **Click-to-learn pin hotspots**, uniformly sized and color-coded by category (power / digital / analog / communication / special), with per-pin function, voltage range, current limit, alternate functions, and a "gotcha" where one exists.
- **Full encyclopedia content** per component: a "Simple vs Detailed" overview toggle, specifications table, worked use cases with difficulty ratings, common beginner mistakes, and related components — plus a **pin quiz mode** to test your recall of a component's pinout.
- **Related-component linking** — "Commonly paired with," "Often confused with," and "Often upgraded to" mentions are automatically cross-linked to the matching catalog entry where one exists.

### Project library
- **28 guided build projects** from LED Blink through a mecanum omnidirectional robot, organized into 4 progressive difficulty tiers (Beginner → Advanced), each with a goal, theory, hand-drawn circuit diagram, step-by-step wiring (with persisted checkboxes), full Arduino code with line-by-line explanation, expected behavior, and interactive troubleshooting reveal-cards.
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
| ![Landing](docs/screenshots/landing.png) | ![Library](docs/screenshots/library.png) | ![Workspace](docs/screenshots/workspace.png) |

## Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) — dev server & build
- [React Three Fiber](https://r3f.docs.pmnd.rs/) + [drei](https://github.com/pmndrs/drei) + [three.js](https://threejs.org/) — 3D rendering
- [React Router](https://reactrouter.com/) — client-side routing
- Plain CSS (custom properties for theming) — no CSS framework, no component library
- [Oxlint](https://oxc.rs/) — linting

No backend, no database — content lives as versioned JSON files in the repo (`src/data/content/*.json`, `src/data/projects/*.json`, `src/data/concepts/*.json`), and 3D models are hand-authored React Three Fiber components (`src/components/Viewer3D/models/*.tsx`). The only client-side persistence is `localStorage`, used for the theme choice, project "Mark as Built" progress, and wiring-step checkboxes — there's no account system and nothing ever leaves your browser.

## Getting started

### Prerequisites

- **Node.js 20 LTS or newer** (20.19+ / 22.x recommended) — this project uses Vite 8 and React 19, which need a reasonably current Node.
- **npm** (bundled with Node). Yarn/pnpm will also work if you prefer, but the commands below assume npm.
- No native build tools, database, or account/API keys are required — it's a static front-end app.

Check your Node version with `node -v` before starting. If it's older than 20, install a newer version first (see OS-specific notes below).

### Clone and install

```bash
git clone <this-repo-url>
cd robocodex/app   # the actual npm project lives in the "app" subfolder, not the repo root
npm install
```

### Run the dev server

```bash
cd app   # skip if you're already inside the app/ folder
npm run dev
```

Vite will print a local URL (typically `http://localhost:5173`) — open it in a browser. Hot reload is on by default.

> **Common error:** if `npm run dev` (or any `npm run ...` command) fails with `npm error enoent Could not read package.json`, it means the command was run from the repo root (`robocodex/`) instead of the `app/` subfolder where `package.json` actually lives. Run `cd app` first (or `cd robocodex/app` from further up), then retry.

### Build for production

```bash
npm run build      # type-checks with tsc, then builds an optimized bundle into dist/
npm run preview     # serve the production build locally to sanity-check it
```

### Lint

```bash
npm run lint
```

---

### Setup notes per OS

**Linux**

```bash
# Install Node 20+ via nvm (recommended over your distro's package manager, which is often outdated)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc   # or restart your terminal
nvm install 20
nvm use 20

git clone <this-repo-url>
cd robocodex/app
npm install
npm run dev
```

**macOS**

```bash
# Option A: nvm (same as Linux)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.zshrc     # zsh is the default shell on modern macOS
nvm install 20
nvm use 20

# Option B: Homebrew
brew install node@20

git clone <this-repo-url>
cd robocodex/app
npm install
npm run dev
```

**Windows**

Two good options — pick one:

```powershell
# Option A: winget (built into Windows 11 / recent Windows 10)
winget install OpenJS.NodeJS.LTS

# Option B: nvm-windows — https://github.com/coreybutler/nvm-windows/releases
# install it, then in a new terminal:
nvm install 20
nvm use 20
```

Then, in **PowerShell**, **Command Prompt**, or **Git Bash**:

```powershell
git clone <this-repo-url>
cd robocodex\app
npm install
npm run dev
```

> If you're using this repo's dev environment via Git Bash, forward slashes (`cd robocodex/app`) work fine too — Git Bash handles both.
>
> If you see `npm error enoent Could not read package.json` in PowerShell, you're most likely still in `robocodex\` rather than `robocodex\app` — run `cd app` and retry.

---

## Project structure

```
app/
├── src/
│   ├── data/
│   │   ├── content/*.json           # one JSON file per component: specs, pins, use cases, gotchas
│   │   ├── components.ts            # loads + indexes content, search, related-component matching
│   │   ├── projects/
│   │   │   ├── *.json               # one JSON file per project: goal, wiring, code, troubleshooting
│   │   │   └── diagrams/*.svg       # hand-authored circuit diagram per project
│   │   ├── projects.ts              # loads + indexes projects, resolves component refs
│   │   ├── concepts/
│   │   │   ├── *.json               # one JSON file per theory topic
│   │   │   └── diagrams/*.svg       # hand-authored concept diagram per topic
│   │   ├── concepts.ts              # loads + indexes concepts, cross-links to components/projects
│   │   ├── glossary.ts              # ~50-term glossary + the term-detection regex used for tooltips
│   │   ├── tiers.ts                 # shared difficulty-tier metadata (color, encouragement copy)
│   │   ├── progress.ts              # localStorage-backed "mark as built" progress tracking
│   │   └── conceptDiagrams.ts       # maps a project id to the animated concept diagram(s) to embed
│   ├── components/
│   │   ├── Landing/                  # animated landing page, category grid, hero 3D showcase
│   │   ├── Library/                  # searchable/filterable component grid
│   │   ├── Workspace/                # per-component page: 3D viewer + pin detail + knowledge panel
│   │   ├── Viewer3D/
│   │   │   └── models/               # one hand-authored R3F model + hotspot map per component
│   │   ├── Knowledge/                # overview/specs/use-cases/related-components panel
│   │   ├── PinDetail/                # selected-pin detail card + pin quiz mode
│   │   ├── Projects/                 # project library grid + per-project workspace
│   │   ├── Concepts/                 # theory library grid + per-concept workspace + animated diagrams
│   │   ├── Glossary/                 # /glossary page
│   │   ├── Guide/                    # /before-you-start and /common-mistakes pages
│   │   └── Shared/                   # footer, theme toggle, glossary tooltip, explain-toggle, route fallback
│   └── types/
│       ├── component.ts              # RoboticsComponent / Pin / UseCase types
│       ├── project.ts                # RoboticsProject / WiringStep / ProjectCode types
│       └── concept.ts                # RoboticsConcept / ConceptEquation types
└── docs/screenshots/                 # images used in this README
```

### Adding a new component

1. Add a JSON file to `src/data/content/` following the shape in `src/types/component.ts` (identity, overview, simpleSummary, specifications, pinMap, useCases, relatedComponents, optional beginnerMistakes).
2. Author a 3D model in `src/components/Viewer3D/models/`, exporting the model component and a `..._PIN_POSITIONS` map keyed by pin name.
3. Register the id → `{ Model, pinPositions, cameraDistance }` in `src/components/Viewer3D/models/registry.ts`.
4. That's it — the library, search, related-component linking, and pin quiz all pick it up automatically from `src/data/components.ts`.

### Adding a new project

1. Add a JSON file to `src/data/projects/` following the shape in `src/types/project.ts` (identity, goal, simpleSummary, howItWorks, toolsNeeded, components, wiringSteps, code, expectedBehavior, troubleshooting).
2. Add a matching SVG at `src/data/projects/diagrams/<project-id>.svg` — it's matched to the project purely by filename.
3. Reference any existing component ids in `components[].componentId` to get automatic linking back to the encyclopedia.
4. That's it — the project library, tier grouping, and progress tracking all pick it up automatically from `src/data/projects.ts`.

### Adding a new theory concept

1. Add a JSON file to `src/data/concepts/` following the shape in `src/types/concept.ts` (identity, simpleSummary, keyIdea, overview, equations, howItWorks, realWorldExamples, commonMisconceptions, relatedComponents, relatedProjects, relatedConcepts).
2. Add a matching SVG at `src/data/concepts/diagrams/<concept-id>.svg` — matched by filename, same convention as projects.
3. Reference existing component/project/concept ids in the `related*` arrays to wire up cross-linking in both directions.
4. That's it — the theory library, category grouping, and backlinks from components/projects all pick it up automatically from `src/data/concepts.ts`.

## Design notes / known trade-offs

- **No backend.** Content is static JSON shipped with the app. This keeps the project simple and free to host, at the cost of needing a rebuild+redeploy to edit content — fine for a curated catalog like this, worth reconsidering if this grows into something community-editable.
- **The 3D viewport stays dark in both themes.** This is deliberate — most 3D product viewers (CAD tools, Sketchfab, etc.) use a fixed neutral/dark stage regardless of the surrounding UI theme, since it's what makes small hotspot colors and model shading read consistently.
- **Related-component links are fuzzy-matched, not hand-curated.** Free-text mentions like "SG90 servo motor" are matched against the catalog by name/word overlap; matches with no plausible catalog entry are left as plain text rather than guessing. This gets the great majority of mentions right but isn't perfect — see Future Improvements.
- **Progress tracking is local-only.** "Mark as Built" and wiring-step checkboxes live in your browser's `localStorage`, not an account — clearing site data resets them, and progress doesn't sync across devices. That's a deliberate trade for "no backend, no login, works offline."
- **Theory diagrams are animated, but not interactive simulations.** Every diagram is a hand-authored SVG with embedded CSS/SMIL animation (a signal flowing, a particle filter converging, a pole crossing into instability) to make one specific idea click — but none of them accept your own input numbers or let you drag a parameter around. See Future Improvements for where that could go next.

## Future improvements

Roughly in order of expected value-to-effort:

- **Interactive (not just animated) versions of the flagship theory diagrams.** PID step-response with adjustable Kp/Ki/Kd, a 2-link arm inverse-kinematics dragger, an A*/Dijkstra grid you can click obstacles onto — diagrams already animate to illustrate their concept, but none of them accept your own input yet; a handful of the most foundational concepts would benefit the most from becoming small interactive tools.
- **Per-model code-splitting.** The three.js/model-registry chunk is already lazy-loaded as a whole, but it still bundles all 132 models together. Splitting each model into its own dynamic import would mean opening one component only downloads that component's geometry.
- **Server-rendered or prerendered pages** for real SEO/link-preview support — this is a pure client-side SPA today, so the static Open Graph tags in `index.html` describe the site generically rather than per-page. Prerendering each `/component/:id`, `/projects/:id`, and `/concepts/:id` route would let a shared link show its own title/description/image in Slack/Discord/Twitter previews.
- **A real Open Graph preview image** (currently there's no `og:image` — would need a generated or hand-made social card).
- **Automated content schema validation** (e.g. a Zod schema + a CI check) so a malformed or incomplete content JSON fails fast instead of silently rendering blank fields.
- **A lightweight test suite** (component render smoke tests + the pin-position/content-name/cross-link consistency checks that were done manually during development) wired into CI.
- **Higher-precision related-component matching** — the current fuzzy matcher gets the majority of "commonly paired with / confused with / upgraded to" mentions right, but free-text mentions describing a general category ("push buttons," "stepper drivers") rather than a specific part sometimes match an arbitrary/approximate catalog entry. Extracting model numbers as a stronger signal would improve precision further.
- **A side-by-side comparison view** — pick two components (e.g. SG90 vs MG996R) and see their specs/pins diffed.
- **Printable/exportable pinout cheat sheets and project build sheets** — a one-page PDF or image export per component/project for quick reference away from the app.
- **Accessibility pass for the 3D viewer** — keyboard navigation between pins and a text-only equivalent view for screen reader users, since the canvas itself is inherently visual.
- **Optional account + cloud sync for progress tracking** — would let "Mark as Built" and wiring-step progress survive across devices, at the cost of introducing the backend this project has deliberately avoided so far.
- **Contribution guide** if this becomes a community-editable catalog rather than a solo-maintained one.

## License

No license file is currently included — all rights reserved by default. Add a `LICENSE` file (MIT is a common choice for a portfolio project like this) if you want to permit reuse.

## Author

**Developed by Abashesh Ranabhat.**
