"use client";

import { Component, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bounds, ContactShadows, Environment, Html, useGLTF } from "@react-three/drei";
import { Box } from "lucide-react";
import * as THREE from "three";
import { ROBOT_MODEL_URL } from "../config/robot";

class RobotErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

function RobotModel({ modelUrl, pointerEnabled }) {
  const { scene } = useGLTF(modelUrl);
  const model = useMemo(() => scene.clone(true), [scene]);
  const rootRef = useRef(null);
  const headRef = useRef(null);
  const eyesRef = useRef([]);

  useEffect(() => {
    model.traverse((object) => {
      if (object.isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
      const name = object.name.toLowerCase();
      if (!headRef.current && /(head|neck)/.test(name)) headRef.current = object;
      if (/(eye|visor|face)/.test(name)) eyesRef.current.push(object);
    });
    return () => { eyesRef.current = []; };
  }, [model]);

  useFrame((state, delta) => {
    const elapsed = state.clock.elapsedTime;
    if (rootRef.current) {
      rootRef.current.position.y = Math.sin(elapsed * 1.15) * 0.025;
      rootRef.current.rotation.y = Math.sin(elapsed * 0.42) * 0.035;
    }
    if (!pointerEnabled || !headRef.current) return;
    headRef.current.rotation.y = THREE.MathUtils.damp(headRef.current.rotation.y, state.pointer.x * 0.42, 5, delta);
    headRef.current.rotation.x = THREE.MathUtils.damp(headRef.current.rotation.x, -state.pointer.y * 0.22, 5, delta);
    eyesRef.current.forEach((eye) => {
      eye.rotation.y = THREE.MathUtils.damp(eye.rotation.y, state.pointer.x * 0.1, 6, delta);
      eye.rotation.x = THREE.MathUtils.damp(eye.rotation.x, -state.pointer.y * 0.06, 6, delta);
    });
  });

  return <Bounds fit clip observe margin={1.18}><group ref={rootRef}><primitive object={model} /></group></Bounds>;
}

function ModelFallback({ compact = false }) {
  return (
    <div className="robot-model-fallback" role="status">
      <Box aria-hidden="true" />
      <strong>{compact ? "Preparing 3D model" : "3D robot model required"}</strong>
      {!compact && <span>Add a GLB or GLTF model to enable the interactive robot.</span>}
    </div>
  );
}

export default function RobotStage() {
  const [pointerEnabled] = useState(() => typeof window !== "undefined" && !window.matchMedia("(pointer: coarse)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  if (!ROBOT_MODEL_URL) return <ModelFallback />;
  return (
    <RobotErrorBoundary fallback={<ModelFallback />}>
      <Canvas className="robot-canvas" dpr={[1, 1.5]} camera={{ position: [0, 1.1, 4.6], fov: 34 }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }} shadows>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 5, 4]} intensity={3.2} castShadow shadow-mapSize={[1024, 1024]} />
        <spotLight position={[-3, 4, 2]} intensity={2.2} angle={0.42} penumbra={0.8} />
        <Suspense fallback={<Html center><ModelFallback compact /></Html>}>
          <RobotModel modelUrl={ROBOT_MODEL_URL} pointerEnabled={pointerEnabled} />
          <Environment preset="studio" environmentIntensity={0.55} />
          <ContactShadows position={[0, -1.35, 0]} opacity={0.42} scale={5} blur={2.4} far={4} />
        </Suspense>
      </Canvas>
    </RobotErrorBoundary>
  );
}
