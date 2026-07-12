import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr, Float } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";

function seededRandom(seed) {
  const value = Math.sin(seed * 91.3458) * 47453.5453;
  return value - Math.floor(value);
}

function HolographicBrain() {
  const brainRef = useRef(null);
  const pulseRef = useRef(null);
  const energyRef = useRef(null);

  const geometry = useMemo(() => {
    const count = 760;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const links = [];
    const cyan = new THREE.Color("#5ee7ff");
    const violet = new THREE.Color("#8d6cff");

    for (let index = 0; index < count; index += 1) {
      const lobe = index % 2 === 0 ? -1 : 1;
      const theta = seededRandom(index + 11) * Math.PI;
      const phi = seededRandom(index + 47) * Math.PI * 2;
      const fold = 1 + Math.sin(phi * 5 + theta * 7) * 0.08;
      const shell = 0.72 + seededRandom(index + 89) * 0.28;
      const x = lobe * 0.34 + Math.sin(theta) * Math.cos(phi) * 0.62 * fold * shell;
      const y = Math.cos(theta) * 0.7 * shell + 0.08;
      const z = Math.sin(theta) * Math.sin(phi) * 0.54 * fold * shell;
      const offset = index * 3;
      const color = cyan.clone().lerp(violet, seededRandom(index + 131));

      positions[offset] = x;
      positions[offset + 1] = y;
      positions[offset + 2] = z;
      colors[offset] = color.r;
      colors[offset + 1] = color.g;
      colors[offset + 2] = color.b;

      if (index > 5 && index % 4 === 0) {
        const peer = index - (2 + (index % 7));
        const peerOffset = Math.max(peer, 0) * 3;
        links.push(
          x,
          y,
          z,
          positions[peerOffset],
          positions[peerOffset + 1],
          positions[peerOffset + 2]
        );
      }
    }

    const energyCount = 110;
    const energy = new Float32Array(energyCount * 3);
    for (let index = 0; index < energyCount; index += 1) {
      const angle = seededRandom(index + 211) * Math.PI * 2;
      const radius = 0.9 + seededRandom(index + 251) * 1.35;
      const offset = index * 3;
      energy[offset] = Math.cos(angle) * radius;
      energy[offset + 1] = (seededRandom(index + 271) - 0.5) * 2.25;
      energy[offset + 2] = Math.sin(angle) * radius * 0.65;
    }

    return {
      positions,
      colors,
      links: new Float32Array(links),
      energy,
    };
  }, []);

  useFrame((state, delta) => {
    if (brainRef.current) {
      brainRef.current.rotation.y += delta * 0.22;
      brainRef.current.rotation.x = THREE.MathUtils.lerp(
        brainRef.current.rotation.x,
        state.pointer.y * 0.18,
        0.04
      );
      brainRef.current.rotation.z = THREE.MathUtils.lerp(
        brainRef.current.rotation.z,
        -state.pointer.x * 0.12,
        0.04
      );
    }

    if (pulseRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.2) * 0.055;
      pulseRef.current.scale.setScalar(pulse);
    }

    if (energyRef.current) {
      energyRef.current.rotation.y -= delta * 0.36;
      energyRef.current.rotation.z += delta * 0.07;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.18}>
      <group ref={brainRef}>
        <group ref={pulseRef}>
          <points>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[geometry.positions, 3]} />
              <bufferAttribute attach="attributes-color" args={[geometry.colors, 3]} />
            </bufferGeometry>
            <pointsMaterial
              size={0.032}
              vertexColors
              transparent
              opacity={0.96}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </points>
          <lineSegments>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[geometry.links, 3]} />
            </bufferGeometry>
            <lineBasicMaterial color="#6bcfff" transparent opacity={0.22} depthWrite={false} />
          </lineSegments>
          <mesh position={[0, -0.64, 0]}>
            <cylinderGeometry args={[0.14, 0.22, 0.52, 18]} />
            <meshStandardMaterial color="#287ad8" emissive="#45d9ff" emissiveIntensity={2.4} transparent opacity={0.55} />
          </mesh>
        </group>

        <points ref={energyRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[geometry.energy, 3]} />
          </bufferGeometry>
          <pointsMaterial
            color="#73e8ff"
            size={0.026}
            transparent
            opacity={0.68}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>
    </Float>
  );
}

export default function BrainScene({ compact = false }) {
  return (
    <div className={compact ? "brain-canvas brain-canvas--compact" : "brain-canvas"}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.05, 3.4], fov: 42 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.24} />
        <pointLight position={[2, 2, 2]} color="#5edfff" intensity={6} />
        <pointLight position={[-2, -1, 1]} color="#765fff" intensity={4} />
        <HolographicBrain />
        <EffectComposer multisampling={0}>
          <Bloom mipmapBlur intensity={1.25} luminanceThreshold={0.08} luminanceSmoothing={0.7} />
        </EffectComposer>
        <AdaptiveDpr pixelated />
      </Canvas>
    </div>
  );
}
