import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  AdaptiveDpr,
  ContactShadows,
  Environment,
  Float,
  Lightformer,
  RoundedBox,
} from "@react-three/drei";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  SSAO,
  Vignette,
} from "@react-three/postprocessing";
import * as THREE from "three";

function WhiteArmor({ color = "#eaf4ff" }) {
  return (
    <meshPhysicalMaterial
      color={color}
      metalness={0.62}
      roughness={0.19}
      clearcoat={1}
      clearcoatRoughness={0.12}
      envMapIntensity={1.8}
    />
  );
}

function DarkMechanism({ emissive = "#061120" }) {
  return (
    <meshPhysicalMaterial
      color="#07101c"
      metalness={0.82}
      roughness={0.22}
      clearcoat={0.8}
      emissive={emissive}
      emissiveIntensity={0.45}
    />
  );
}

function Eye({ x, eyeRef }) {
  return (
    <group position={[x, 0.08, 0.578]} ref={eyeRef}>
      <RoundedBox args={[0.32, 0.095, 0.055]} radius={0.045} smoothness={6}>
        <meshStandardMaterial
          color="#dffaff"
          emissive="#49d8ff"
          emissiveIntensity={8}
          toneMapped={false}
        />
      </RoundedBox>
      <pointLight color="#45d9ff" intensity={1.25} distance={1.25} />
    </group>
  );
}

function MechanicalArm({ side = 1 }) {
  return (
    <group position={[side * 1.16, -0.42, 0]} rotation={[0, 0, side * -0.16]}>
      <mesh scale={[0.82, 1, 0.9]} castShadow>
        <sphereGeometry args={[0.48, 32, 24]} />
        <WhiteArmor />
      </mesh>
      <mesh position={[side * 0.02, -0.72, 0]} rotation={[0, 0, side * -0.04]} castShadow>
        <capsuleGeometry args={[0.26, 0.82, 8, 24]} />
        <DarkMechanism />
      </mesh>
      <mesh position={[side * 0.015, -0.71, 0.13]} rotation={[0, 0, side * -0.04]} castShadow>
        <capsuleGeometry args={[0.2, 0.66, 8, 24]} />
        <WhiteArmor color="#cddbed" />
      </mesh>
      <mesh position={[0, -1.23, 0]}>
        <torusGeometry args={[0.23, 0.045, 12, 28]} />
        <meshStandardMaterial color="#5ce5ff" emissive="#38cfff" emissiveIntensity={4} toneMapped={false} />
      </mesh>
    </group>
  );
}

function HumanoidRobot() {
  const rigRef = useRef(null);
  const chestRef = useRef(null);
  const headRef = useRef(null);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const coreRef = useRef(null);

  useFrame((state, delta) => {
    const elapsed = state.clock.elapsedTime;
    const lookX = state.pointer.x;
    const lookY = state.pointer.y;

    if (rigRef.current) {
      rigRef.current.rotation.y = THREE.MathUtils.lerp(
        rigRef.current.rotation.y,
        0.12 + lookX * 0.11,
        1 - Math.pow(0.001, delta)
      );
      rigRef.current.position.y = -0.25 + Math.sin(elapsed * 0.72) * 0.035;
    }

    if (headRef.current) {
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        lookX * 0.19,
        1 - Math.pow(0.0001, delta)
      );
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        -lookY * 0.1 + Math.sin(elapsed * 0.45) * 0.014,
        1 - Math.pow(0.0001, delta)
      );
    }

    if (chestRef.current) {
      chestRef.current.scale.y = 1 + Math.sin(elapsed * 1.1) * 0.012;
      chestRef.current.position.y = Math.sin(elapsed * 1.1) * 0.01;
    }

    const blinkCycle = elapsed % 5.6;
    const blink = blinkCycle > 5.38 ? Math.max(0.08, Math.abs(blinkCycle - 5.49) * 8.5) : 1;
    if (leftEyeRef.current) leftEyeRef.current.scale.y = blink;
    if (rightEyeRef.current) rightEyeRef.current.scale.y = blink;

    if (coreRef.current) {
      const pulse = 1 + Math.sin(elapsed * 2.4) * 0.065;
      coreRef.current.scale.setScalar(pulse);
      coreRef.current.rotation.z += delta * 0.35;
    }
  });

  return (
    <Float speed={0.72} rotationIntensity={0.035} floatIntensity={0.08}>
      <group ref={rigRef} position={[0, -0.25, 0]} scale={1.08}>
        <group ref={headRef} position={[0, 1.18, 0.05]}>
          <RoundedBox args={[1.46, 1.08, 0.94]} radius={0.36} smoothness={8} castShadow>
            <WhiteArmor />
          </RoundedBox>

          <RoundedBox
            args={[1.16, 0.62, 0.16]}
            radius={0.22}
            smoothness={8}
            position={[0, -0.02, 0.47]}
          >
            <meshPhysicalMaterial
              color="#020711"
              metalness={0.72}
              roughness={0.1}
              clearcoat={1}
              clearcoatRoughness={0.04}
              envMapIntensity={2.4}
            />
          </RoundedBox>

          <Eye x={-0.3} eyeRef={leftEyeRef} />
          <Eye x={0.3} eyeRef={rightEyeRef} />

          {[-1, 1].map((side) => (
            <group key={side} position={[side * 0.77, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <mesh>
                <cylinderGeometry args={[0.19, 0.19, 0.11, 28]} />
                <DarkMechanism emissive="#123a63" />
              </mesh>
              <mesh position={[0, side * 0.058, 0]}>
                <torusGeometry args={[0.12, 0.025, 12, 32]} />
                <meshStandardMaterial color="#59dfff" emissive="#36ceff" emissiveIntensity={4} toneMapped={false} />
              </mesh>
            </group>
          ))}

          <mesh position={[0, 0.56, 0.03]} scale={[0.55, 0.055, 0.48]}>
            <sphereGeometry args={[1, 24, 16]} />
            <DarkMechanism />
          </mesh>
        </group>

        <group position={[0, 0.48, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.29, 0.34, 0.55, 24]} />
            <DarkMechanism />
          </mesh>
          {[0, 0.13, 0.26].map((height) => (
            <mesh key={height} position={[0, height - 0.13, 0]}>
              <torusGeometry args={[0.25, 0.025, 10, 28]} />
              <meshStandardMaterial color="#4c637d" metalness={0.9} roughness={0.28} />
            </mesh>
          ))}
        </group>

        <group ref={chestRef} position={[0, -0.35, 0]}>
          <RoundedBox args={[1.78, 1.62, 0.94]} radius={0.38} smoothness={8} castShadow>
            <WhiteArmor color="#dbe8f7" />
          </RoundedBox>

          <RoundedBox
            args={[1.26, 0.75, 0.14]}
            radius={0.2}
            smoothness={8}
            position={[0, 0.26, 0.49]}
          >
            <DarkMechanism emissive="#092342" />
          </RoundedBox>

          <group ref={coreRef} position={[0, 0.27, 0.59]} rotation={[Math.PI / 2, 0, 0]}>
            <mesh>
              <torusGeometry args={[0.27, 0.06, 16, 48]} />
              <meshStandardMaterial color="#c8f8ff" emissive="#36cbff" emissiveIntensity={7} toneMapped={false} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.15, 0.15, 0.04, 32]} />
              <meshStandardMaterial color="#8df2ff" emissive="#247bff" emissiveIntensity={6} toneMapped={false} />
            </mesh>
          </group>

          <RoundedBox args={[0.72, 0.5, 0.12]} radius={0.14} smoothness={6} position={[0, -0.52, 0.49]}>
            <DarkMechanism />
          </RoundedBox>

          {[-1, 1].map((side) => (
            <group key={side}>
              <mesh position={[side * 0.58, -0.35, 0.52]} rotation={[0, 0, side * 0.12]}>
                <boxGeometry args={[0.06, 0.48, 0.035]} />
                <meshStandardMaterial color="#54dcff" emissive="#35cfff" emissiveIntensity={4} toneMapped={false} />
              </mesh>
              <mesh position={[side * 0.78, 0.24, 0.25]} rotation={[0, 0, side * 0.35]}>
                <boxGeometry args={[0.42, 0.045, 0.5]} />
                <DarkMechanism />
              </mesh>
            </group>
          ))}
        </group>

        <MechanicalArm side={-1} />
        <MechanicalArm side={1} />
      </group>
    </Float>
  );
}

function EnergyRings() {
  const ringRef = useRef(null);
  const particlesRef = useRef(null);
  const particlePositions = useMemo(() => {
    const count = 900;
    const positions = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const angle = (index / count) * Math.PI * 2 * 8;
      const radius = 1.8 + ((index * 37) % 100) / 72;
      const offset = index * 3;
      positions[offset] = Math.cos(angle) * radius;
      positions[offset + 1] = -1.9 + ((index * 17) % 100) / 420;
      positions[offset + 2] = Math.sin(angle) * radius * 0.36;
    }

    return positions;
  }, []);

  useFrame((state, delta) => {
    if (ringRef.current) ringRef.current.rotation.z += delta * 0.08;
    if (particlesRef.current) {
      particlesRef.current.rotation.y -= delta * 0.14;
      particlesRef.current.position.x = state.pointer.x * 0.06;
    }
  });

  return (
    <group>
      <group ref={ringRef} position={[0, -1.82, 0]} rotation={[Math.PI / 2, 0, 0]}>
        {[1.45, 1.95, 2.45].map((radius, index) => (
          <mesh key={radius} rotation={[0, 0, index * 0.4]}>
            <torusGeometry args={[radius, index === 1 ? 0.022 : 0.012, 8, 128]} />
            <meshStandardMaterial
              color={index === 1 ? "#755fff" : "#4edcff"}
              emissive={index === 1 ? "#624cff" : "#35cfff"}
              emissiveIntensity={5}
              transparent
              opacity={0.65 - index * 0.1}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>

      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#67ddff"
          size={0.026}
          transparent
          opacity={0.72}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.18} />
      <hemisphereLight args={["#9edfff", "#050713", 1.25]} />
      <spotLight
        position={[-4, 6, 5]}
        angle={0.42}
        penumbra={0.9}
        intensity={55}
        color="#d8f6ff"
        castShadow
        shadow-bias={-0.0002}
      />
      <spotLight position={[4, 2.5, 3]} angle={0.5} penumbra={1} intensity={34} color="#5576ff" />
      <pointLight position={[0, 0, 3]} intensity={8} distance={7} color="#40d7ff" />
      <Environment resolution={128} background={false}>
        <Lightformer form="ring" color="#dff8ff" intensity={5} scale={4} position={[-3, 4, 3]} target={[0, 0, 0]} />
        <Lightformer form="rect" color="#5878ff" intensity={7} scale={[3, 5, 1]} position={[5, 1, 2]} target={[0, 0, 0]} />
        <Lightformer form="rect" color="#ffffff" intensity={3} scale={[2, 4, 1]} position={[0, -3, 4]} target={[0, 0, 0]} />
      </Environment>
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="hero-webgl" aria-label="Interactive 3D humanoid AI robot">
      <Canvas
        shadows
        dpr={[1, 1.65]}
        camera={{ position: [0, 0.15, 6.35], fov: 36 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <fog attach="fog" args={["#050913", 7.5, 12]} />
        <SceneLighting />
        <group position={[0.35, -0.05, 0]}>
          <HumanoidRobot />
          <EnergyRings />
        </group>
        <ContactShadows position={[0, -2.05, 0]} opacity={0.36} scale={6} blur={2.6} far={4} color="#1d83ff" />
        <EffectComposer multisampling={0}>
          <SSAO intensity={0.42} radius={0.05} luminanceInfluence={0.55} />
          <Bloom mipmapBlur intensity={0.85} luminanceThreshold={0.38} luminanceSmoothing={0.7} />
          <DepthOfField focusDistance={0.012} focalLength={0.018} bokehScale={0.6} height={420} />
          <Vignette eskil={false} offset={0.22} darkness={0.48} />
        </EffectComposer>
        <AdaptiveDpr pixelated />
      </Canvas>
      <div className="webgl-scanline" aria-hidden="true" />
      <div className="webgl-status font-mono" aria-hidden="true">
        <span className="webgl-status__dot" />
        SYNTHETIC UNIT / ONLINE
      </div>
    </div>
  );
}
