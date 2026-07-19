const DISC_R = 0.35;

export const OPTICAL_WHEEL_ENCODER_PIN_POSITIONS: Record<string, [number, number, number]> = {
  VCC: [DISC_R + 0.18, 0.08, 0],
  GND: [DISC_R + 0.18, -0.08, 0],
  'OUT A': [DISC_R + 0.28, 0.08, 0],
  'OUT B': [DISC_R + 0.28, -0.08, 0],
};

export default function OpticalWheelEncoderModel() {
  const slots = 12;
  return (
    <group>
      {/* Slotted disc */}
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[DISC_R, DISC_R, 0.03, 32]} />
        <meshStandardMaterial color="#2b2f36" roughness={0.5} transparent opacity={0.85} />
      </mesh>
      {Array.from({ length: slots }).map((_, i) => {
        const a = (i / slots) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * (DISC_R - 0.06), Math.sin(a) * (DISC_R - 0.06), 0]}
            rotation={[0, 0, a]}
          >
            <boxGeometry args={[0.1, 0.03, 0.035]} />
            <meshStandardMaterial color="#0a0a0c" />
          </mesh>
        );
      })}

      {/* Fork sensor straddling the disc edge */}
      <group position={[DISC_R + 0.05, 0, 0]}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.14, 0.3, 0.1]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
        </mesh>
        <mesh position={[0.08, 0, 0]} castShadow>
          <boxGeometry args={[0.02, 0.3, 0.14]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
}
