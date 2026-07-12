import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";

function seededRandom(seed) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function NeuralField() {
  const pointsRef = useRef(null);
  const networkRef = useRef(null);

  const { positions, colors, connections } = useMemo(() => {
    const count = 1500;
    const pointPositions = new Float32Array(count * 3);
    const pointColors = new Float32Array(count * 3);
    const linePositions = [];
    const cyan = new THREE.Color("#55d8ff");
    const violet = new THREE.Color("#7868ff");

    for (let index = 0; index < count; index += 1) {
      const radius = 5.5 + seededRandom(index + 2) * 8.5;
      const angle = seededRandom(index + 31) * Math.PI * 2;
      const height = (seededRandom(index + 73) - 0.5) * 9;
      const x = Math.cos(angle) * radius;
      const y = height;
      const z = Math.sin(angle) * radius - 3;
      const offset = index * 3;
      const color = cyan.clone().lerp(violet, seededRandom(index + 101));

      pointPositions[offset] = x;
      pointPositions[offset + 1] = y;
      pointPositions[offset + 2] = z;
      pointColors[offset] = color.r;
      pointColors[offset + 1] = color.g;
      pointColors[offset + 2] = color.b;

      if (index < 180 && index % 2 === 0) {
        const next = ((index + 17) % 180) * 3;
        linePositions.push(
          x,
          y,
          z,
          pointPositions[next] || Math.cos(angle + 0.5) * radius,
          pointPositions[next + 1] || height + 0.4,
          pointPositions[next + 2] || Math.sin(angle + 0.5) * radius - 3
        );
      }
    }

    return {
      positions: pointPositions,
      colors: pointColors,
      connections: new Float32Array(linePositions),
    };
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.012;
      pointsRef.current.rotation.x = state.pointer.y * 0.025;
      pointsRef.current.position.x = THREE.MathUtils.lerp(
        pointsRef.current.position.x,
        state.pointer.x * 0.2,
        0.025
      );
    }

    if (networkRef.current) {
      networkRef.current.rotation.y -= delta * 0.018;
      networkRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.08) * 0.08;
    }
  });

  return (
    <group>
      <points ref={pointsRef} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          transparent
          opacity={0.7}
          vertexColors
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>

      <lineSegments ref={networkRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[connections, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#55cfff" transparent opacity={0.13} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

export default function AtmosphereScene() {
  return (
    <Canvas
      className="ambient-webgl-canvas"
      dpr={[0.75, 1.35]}
      camera={{ position: [0, 0, 9], fov: 56 }}
      gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
      eventSource={typeof document !== "undefined" ? document.body : undefined}
    >
      <fogExp2 attach="fog" args={["#03060d", 0.055]} />
      <NeuralField />
      <AdaptiveDpr pixelated />
    </Canvas>
  );
}
