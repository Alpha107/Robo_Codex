import './CurrentFlowDiagram.css';

export default function CurrentFlowDiagram() {
  return (
    <div className="flow-diagram">
      <div className="flow-loop">
        <span className="flow-node flow-node-top-left">Battery / USB +</span>
        <span className="flow-node flow-node-top-right">Resistor</span>
        <span className="flow-node flow-node-bottom-right">LED</span>
        <span className="flow-node flow-node-bottom-left">GND / −</span>
        <span className="flow-dot" />
      </div>
      <p className="flow-diagram-caption">
        Current only flows if it has a complete loop to travel around — out from the positive supply, through
        every part in the circuit, and back to ground. The resistor limits how much current can flow so the LED
        doesn't burn out; break the loop anywhere (a loose wire, a missing ground connection) and nothing lights up
        at all.
      </p>
    </div>
  );
}
