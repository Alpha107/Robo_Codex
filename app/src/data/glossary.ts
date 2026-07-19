export interface GlossaryEntry {
  term: string;
  aliases?: string[];
  definition: string;
}

export const GLOSSARY: GlossaryEntry[] = [
  { term: 'ADC', aliases: ['Analog-to-Digital Converter'], definition: 'The circuitry that turns a smoothly-varying voltage (like from a potentiometer) into a number your code can read — a microcontroller can only "think" in numbers, not voltages.' },
  { term: 'Actuator', definition: 'Any part that turns an electrical signal into physical movement or force — a motor, a servo, a solenoid, a linear actuator.' },
  { term: 'Baud rate', definition: 'How fast two devices agree to send serial data, measured in bits per second. Both sides of a serial connection must be set to the same baud rate or the data comes through as garbage.' },
  { term: 'Bootloader', definition: 'A small program pre-loaded onto a microcontroller that lets you upload new code over USB or serial, without needing a separate hardware programmer.' },
  { term: 'Breadboard rail', definition: 'The two long rows of holes running along the top and bottom edge of a breadboard, usually marked with red (+) and blue/black (−) stripes, meant for power and ground.' },
  { term: 'Brownout', definition: 'A reset or glitch caused by supply voltage dipping too low for a moment — commonly happens when a motor draws a sudden burst of current from the same battery powering the microcontroller.' },
  { term: 'Capacitor', definition: 'A small part that stores a little electrical charge and releases it quickly, used to smooth out voltage dips or filter noise.' },
  { term: 'Checksum', definition: 'An extra number sent along with data so the receiver can tell if the data got corrupted in transit — if the numbers don\'t match, something was lost or garbled.' },
  { term: 'Datasheet', definition: 'The official technical document a manufacturer publishes for a part, listing its exact pinout, voltage limits, and electrical behavior.' },
  { term: 'Debounce', definition: 'Filtering out the rapid, meaningless on/off flickering a mechanical switch or button produces for a few milliseconds the instant it\'s pressed, so your code only sees one clean press instead of several.' },
  { term: 'Decoupling capacitor', definition: 'A small capacitor placed right next to a chip\'s power pins to smooth out tiny voltage dips caused by the chip switching states, keeping its power supply steady.' },
  { term: 'Diode', definition: 'A part that lets current flow in only one direction — commonly used to protect a circuit from a battery being connected backwards, or to absorb the voltage spike a motor or relay coil produces when switched off.' },
  { term: 'Duty cycle', definition: 'The percentage of time a PWM signal spends "on" versus "off" during each cycle — a higher duty cycle means more average power, which is how PWM controls an LED\'s brightness or a motor\'s speed.' },
  { term: 'EEPROM', definition: 'A small amount of memory on a microcontroller that keeps its data even after power is switched off, useful for remembering settings between power cycles.' },
  { term: 'Encoder', aliases: ['rotary encoder', 'optical encoder'], definition: 'A sensor that reports rotation — either an exact angle, or just how many steps something has turned — by counting pulses as a disc or shaft spins.' },
  { term: 'Firmware', definition: 'The code that runs directly on a microcontroller or embedded chip, as opposed to an app running on a phone or computer.' },
  { term: 'Forward voltage', definition: 'The minimum voltage an LED (or diode) needs across it before it lets current through and lights up — this is why LEDs always need a current-limiting resistor in series, not a direct battery connection.' },
  { term: 'GPIO', aliases: ['General Purpose Input/Output'], definition: 'Any pin on a microcontroller that your code can freely set as an input (to read a signal) or an output (to send one), as opposed to a pin with one fixed dedicated job.' },
  { term: 'Ground', aliases: ['GND'], definition: 'The shared "zero volts" reference point every part of a circuit measures its voltage against. Every component in a circuit needs a path back to the same ground, or nothing works.' },
  { term: 'H-Bridge', definition: 'A small switching circuit (like the one inside an L298N) that can send current through a motor in either direction, which is what lets code reverse a DC motor\'s spin.' },
  { term: 'I2C', aliases: ['Inter-Integrated Circuit'], definition: 'A 2-wire communication protocol (one data wire, one clock wire) that lets a microcontroller talk to many sensors or displays on the same two wires, each identified by its own address.' },
  { term: 'IMU', aliases: ['Inertial Measurement Unit'], definition: 'A chip that combines motion sensors — typically an accelerometer and a gyroscope, sometimes a compass too — to report how something is tilted, spinning, or accelerating.' },
  { term: 'Interrupt', definition: 'A way of telling a microcontroller "stop whatever you\'re doing and run this code immediately" the instant something happens, like a pin changing state — instead of your code having to constantly check for it in a loop.' },
  { term: 'Level shifter', definition: 'A small circuit that safely converts a signal from one logic voltage to another, like 5V to 3.3V, so a 5V Arduino and a 3.3V sensor can talk without damaging the sensor.' },
  { term: 'Logic level', definition: 'The voltage a chip considers "on" (usually its full supply voltage, like 5V or 3.3V) versus "off" (0V). Mixing 5V and 3.3V logic-level parts without care can damage the 3.3V side.' },
  { term: 'Microcontroller', definition: 'A small chip that acts as the "brain" of a project — it runs your code and has pins for reading sensors and controlling outputs, but (unlike a computer) usually can\'t run a full operating system.' },
  { term: 'MOSFET', definition: 'An electronic switch that lets a small signal (like a microcontroller pin) turn a much larger current on or off, without any moving parts — used for switching motors, LED strips, and other higher-power loads.' },
  { term: 'NMEA sentence', definition: 'The standard, plain-text line format GPS modules use to report position, speed, and time — a library like TinyGPS++ reads and decodes these lines into usable coordinates.' },
  { term: "Ohm's Law", definition: 'The basic relationship between voltage, current, and resistance: Voltage = Current × Resistance. It\'s the formula behind picking the right resistor value for an LED.' },
  { term: 'Open-drain', aliases: ['open-collector'], definition: 'An output style where a pin can only actively pull a signal to ground, never to a high voltage — it needs a pull-up resistor to also reach a high state.' },
  { term: 'PID control', definition: 'A feedback technique that continuously adjusts an output (like motor speed) based on how far the current reading is from a target, correcting smoothly for error, its rate of change, and its accumulation over time.' },
  { term: 'Polling', definition: 'Repeatedly checking a sensor or pin\'s state in a loop, rather than waiting to be notified by an interrupt.' },
  { term: 'Potentiometer', aliases: ['pot'], definition: 'A knob-adjustable resistor, wired as a voltage divider so turning it produces a smoothly changing analog voltage.' },
  { term: 'Protocol', definition: 'An agreed-upon set of rules two devices follow to exchange data correctly — like I2C, SPI, or UART.' },
  { term: 'Pull-down resistor', definition: 'A resistor connecting a pin to ground so it reads a clean LOW when nothing else is driving it, preventing it from "floating" and picking up random noise.' },
  { term: 'Pull-up resistor', definition: 'A resistor connecting a pin to the supply voltage so it reads a clean HIGH by default, only going LOW when something (like a button) actively pulls it down.' },
  { term: 'PWM', aliases: ['Pulse Width Modulation'], definition: 'A way of faking an analog output using only fast on/off switching — by controlling what fraction of the time the signal is "on," it can dim an LED or set a motor\'s average speed.' },
  { term: 'Relay', definition: 'An electrically-controlled mechanical switch — a small coil pulls a metal contact closed, letting a low-power signal switch a much higher-power circuit safely.' },
  { term: 'Reflectance', definition: 'How much light bounces back off a surface — the basic principle IR line sensors and some obstacle sensors use, since dark surfaces reflect less light than light ones.' },
  { term: 'Resistor color code', definition: 'The colored bands printed on a resistor that encode its resistance value, letting you read its ohm rating without a multimeter.' },
  { term: 'RSSI', aliases: ['Received Signal Strength Indicator'], definition: 'A number representing how strong a received wireless signal is — used to judge how close or how clear a connection is.' },
  { term: 'RTC', aliases: ['Real-Time Clock'], definition: 'A small chip that keeps track of the actual date and time, usually backed by its own tiny battery so it keeps ticking even when the main project is powered off.' },
  { term: 'Schematic', definition: 'A diagram showing how components are electrically connected, using standardized symbols — the electronics equivalent of a circuit\'s blueprint.' },
  { term: 'Sensor', definition: 'Any part whose job is to measure something in the physical world — distance, light, temperature, motion — and turn it into an electrical signal a microcontroller can read.' },
  { term: 'Servo horn', definition: 'The small plastic or metal arm that attaches to a servo motor\'s output shaft, giving you something to physically bolt a mechanism onto.' },
  { term: 'Short circuit', definition: 'An unintended direct connection between two points that shouldn\'t be directly connected — usually power straight to ground — that lets current flow with almost no resistance, which can destroy parts or drain a battery instantly.' },
  { term: 'SPI', aliases: ['Serial Peripheral Interface'], definition: 'A fast communication protocol using separate clock, data-in, and data-out wires, typically used when speed matters more than pin count — common for displays, SD cards, and RFID readers.' },
  { term: 'Threshold', definition: 'A chosen cutoff value that a sensor reading is compared against to decide "yes" or "no" — like "turn on the lamp when light level drops below this number."' },
  { term: 'Time-of-flight', definition: 'A distance-measuring technique that works by timing exactly how long a pulse of light or sound takes to bounce back, then using its known speed to calculate distance.' },
  { term: 'Transistor', definition: 'A basic electronic building block that can act as either a tiny switch or an amplifier, controlled by a small voltage or current at one of its three legs.' },
  { term: 'Triangulation', definition: 'A distance-measuring technique that calculates distance from the angle at which reflected light returns, rather than by timing it.' },
  { term: 'UART', aliases: ['Serial'], definition: 'A simple two-wire (TX/RX) communication method for sending data one bit at a time between two devices — the same basic connection used by Serial.print() and Bluetooth/GPS modules.' },
  { term: 'VCC', definition: 'The label for a chip or module\'s main positive power supply pin.' },
  { term: 'Voltage divider', definition: 'A simple two-resistor (or resistor + sensor) circuit that splits a voltage down to a smaller, predictable fraction — the standard trick for turning a sensor\'s changing resistance into a readable analog voltage.' },
];

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const allAliases: { alias: string; entry: GlossaryEntry }[] = [];
for (const entry of GLOSSARY) {
  allAliases.push({ alias: entry.term, entry });
  for (const alias of entry.aliases ?? []) {
    allAliases.push({ alias, entry });
  }
}
allAliases.sort((a, b) => b.alias.length - a.alias.length);

export const GLOSSARY_LOOKUP = new Map<string, GlossaryEntry>(
  allAliases.map(({ alias, entry }) => [alias.toLowerCase(), entry]),
);

export const GLOSSARY_PATTERN = new RegExp(
  `\\b(${allAliases.map(({ alias }) => escapeRegex(alias)).join('|')})\\b`,
  'i',
);
