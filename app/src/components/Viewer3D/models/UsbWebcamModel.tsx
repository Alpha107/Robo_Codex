export const USB_WEBCAM_PIN_POSITIONS: Record<string, [number, number, number]> = {
  'USB Connector': [0, -0.15, -0.35],
};

export default function UsbWebcamModel() {
  return (
    <group>
      {/* Rounded camera body */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.16, 0.16, 0.22, 24]} />
        <meshStandardMaterial color="#1c1c1e" roughness={0.4} />
      </mesh>
      {/* Lens ring */}
      <mesh position={[0, 0, 0.1]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.11, 0.12, 0.06, 24]} />
        <meshStandardMaterial color="#0a0a0c" roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.13]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.01, 24]} />
        <meshStandardMaterial color="#0a1a2e" roughness={0.15} metalness={0.5} />
      </mesh>
      {/* Recording LED */}
      <mesh position={[0.1, 0.08, 0.1]}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshStandardMaterial color="#2ecc71" emissive="#2ecc71" emissiveIntensity={0.6} />
      </mesh>
      {/* Clip/stand base */}
      <mesh position={[0, -0.16, -0.05]} castShadow>
        <boxGeometry args={[0.18, 0.12, 0.2]} />
        <meshStandardMaterial color="#1c1c1e" roughness={0.5} />
      </mesh>
      {/* USB cable stub */}
      <mesh position={[0, -0.18, -0.3]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.25, 10]} />
        <meshStandardMaterial color="#2b2b2b" roughness={0.6} />
      </mesh>
    </group>
  );
}
