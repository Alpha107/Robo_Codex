import { Link } from 'react-router-dom';
import Footer from '../Shared/Footer';
import ThemeToggle from '../Shared/ThemeToggle';
import useDocumentTitle from '../Shared/useDocumentTitle';
import './BeforeYouStartPage.css';

export default function BeforeYouStartPage() {
  useDocumentTitle('Before You Start');

  return (
    <div className="guide-page">
      <header className="guide-header">
        <div className="guide-header-top">
          <Link to="/" className="guide-home-link">
            &larr; Home
          </Link>
          <ThemeToggle />
        </div>
        <h1>Before You Start</h1>
        <p className="guide-subtitle">
          Five minutes of reading here will save you an hour of confused troubleshooting later. This page covers
          what you actually need, how to read the diagrams on this site, and the handful of safety habits worth
          building from day one.
        </p>
      </header>

      <section className="guide-section">
        <h2>What you actually need</h2>
        <p>
          Every beginner project in the <Link to="/projects">project library</Link> lists its own exact tools list,
          but almost all of them share this same starting kit:
        </p>
        <ul>
          <li>A microcontroller board — an Arduino Uno is the easiest starting point and what most projects here assume.</li>
          <li>A USB cable to connect it to your computer.</li>
          <li>The free Arduino IDE, installed on your computer — this is where you write and upload code.</li>
          <li>A breadboard and a pack of jumper wires.</li>
          <li>A small assortment of resistors (220Ω–1kΩ covers most LED projects) — usually included in any "starter kit."</li>
        </ul>
        <p>
          You do not need to buy a soldering iron, a 3D printer, or any specialized tools to get started. Every
          project here is built with a breadboard, no soldering required.
        </p>
      </section>

      <section className="guide-section">
        <h2>How to read a breadboard</h2>
        <p>
          A breadboard looks like a grid of holes, but only certain holes are actually connected to each other
          underneath the plastic. Getting this wrong is the single most common reason a beginner's circuit "just
          doesn't work" — not bad code, just an unexpected disconnection.
        </p>
        <ul>
          <li>
            <strong>The two outer rows on each long edge</strong> (often marked with a red + and blue/black − stripe)
            run the full length of the board and are meant for power and ground. Every hole in the red row is
            connected to every other hole in that same red row — and likewise for the blue row.
          </li>
          <li>
            <strong>The main middle section</strong> is split into short vertical columns of 5 holes each, separated
            by a center gap. Each column of 5 is connected together, but not to the column next to it. Plugging a
            component's leg into one of these holes connects it to whatever else shares that same column of 5.
          </li>
          <li>
            The center gap (the "trench") down the middle of the board is <em>not</em> connected across — it exists
            specifically so a chip can straddle it without shorting its own left and right pins together.
          </li>
        </ul>
      </section>

      <section className="guide-section">
        <h2>How to read the circuit diagrams on this site</h2>
        <p>Every project's wiring diagram uses the same consistent color convention, so once you learn it once, every diagram on the site reads the same way:</p>
        <ul>
          <li><span className="legend-swatch" style={{ background: '#4dabf7' }} /> <strong>Blue</strong> — a digital or analog signal wire (data, not power).</li>
          <li><span className="legend-swatch" style={{ background: '#ff922b' }} /> <strong>Orange/red</strong> — motor power or a separate higher-current supply line.</li>
          <li><span className="legend-swatch" style={{ background: '#1a1d23' }} /> <strong>Black</strong> — ground (GND). Every component in a circuit needs a path back to the same ground.</li>
          <li><span className="legend-swatch" style={{ background: '#e03131' }} /> <strong>Red</strong> (thicker line) — a +12V or mains-power line, used only in the smart-home relay projects. Treat these with extra care.</li>
        </ul>
        <p>
          Each diagram is paired with a numbered, step-by-step wiring list underneath it — connect one wire at a
          time, check it off, and you'll always know exactly where you are if something doesn't light up.
        </p>
      </section>

      <section className="guide-section">
        <h2>Basic safety habits</h2>
        <ul>
          <li>Always disconnect USB/power before you rewire anything on the breadboard, not just when you finish.</li>
          <li>Double-check polarity before connecting any battery — reversing + and − can instantly damage components, especially LEDs, ICs, and LiPo batteries.</li>
          <li>Never power a motor directly from an Arduino pin — motors need a driver (like the L298N used throughout this site) and usually their own separate power supply.</li>
          <li>LiPo/Li-ion batteries need real respect: never puncture, over-discharge, or charge them unattended without a proper charging module.</li>
          <li>If a project involves a relay switching mains-powered devices (lamps, etc.), that side of the circuit is genuinely dangerous — get help from someone experienced if you're not confident with mains wiring.</li>
        </ul>
      </section>

      <section className="guide-section">
        <h2>Where to go next</h2>
        <p>
          Browse the <Link to="/library">component encyclopedia</Link> to explore any part in interactive 3D before
          you buy or wire it up, check the <Link to="/glossary">glossary</Link> whenever you hit an unfamiliar term,
          and when something goes wrong mid-build, the <Link to="/common-mistakes">Common Mistakes</Link> page
          collects every gotcha and fix from across the whole site in one place.
        </p>
      </section>

      <Footer />
    </div>
  );
}
