"use client";

import { Component, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bounds, ContactShadows, Environment, Html, useGLTF } from "@react-three/drei";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";
import * as THREE from "three";
import { ROBOT_FALLBACK_URL, ROBOT_MODEL_URL } from "../config/robot";

function RobotVisualFallback({ compact = false }) {
  const rootRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "120px" }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const handlePointerMove = (event) => {
    if (compact || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--robot-ry", `${x * 8}deg`);
    event.currentTarget.style.setProperty("--robot-rx", `${y * -5}deg`);
    event.currentTarget.style.setProperty("--robot-light-x", `${50 + x * 24}%`);
    event.currentTarget.style.setProperty("--robot-light-y", `${34 + y * 16}%`);
  };

  const resetPointer = (event) => {
    event.currentTarget.style.setProperty("--robot-ry", "0deg");
    event.currentTarget.style.setProperty("--robot-rx", "0deg");
    event.currentTarget.style.setProperty("--robot-light-x", "50%");
    event.currentTarget.style.setProperty("--robot-light-y", "34%");
  };

  return (
    <div
      ref={rootRef}
      className={`robot-visual-fallback${compact ? " is-compact" : ""}${active ? " is-active" : " is-paused"}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <span className="robot-fallback__aura" aria-hidden="true" />
      <span className="robot-fallback__grid" aria-hidden="true" />
      <div className="robot-fallback__body">
        <img src={ROBOT_FALLBACK_URL} alt="Monochrome humanoid robot concept" draggable="false" />
        <span className="robot-fallback__light robot-fallback__light--left" aria-hidden="true" />
        <span className="robot-fallback__light robot-fallback__light--right" aria-hidden="true" />
        <span className="robot-fallback__scan" aria-hidden="true" />
      </div>
    </div>
  );
}

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
  const model = useMemo(() => clone(scene), [scene]);
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
      if (!headRef.current && /(head|neck|helmet)/.test(name)) headRef.current = object;
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

  return <Bounds fit clip observe margin={1.14}><group ref={rootRef}><primitive object={model} /></group></Bounds>;
}

export default function RobotStage() {
  const [pointerEnabled] = useState(() => typeof window !== "undefined" && !window.matchMedia("(pointer: coarse)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  if (!ROBOT_MODEL_URL) return <RobotVisualFallback />;

  return (
    <RobotErrorBoundary fallback={<RobotVisualFallback />}>
      <Canvas className="robot-canvas" dpr={[1, 1.5]} camera={{ position: [0, 1.1, 4.6], fov: 34 }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }} shadows>
        <ambientLight intensity={0.65} />
        <directionalLight position={[3, 5, 4]} intensity={3.2} castShadow shadow-mapSize={[1024, 1024]} />
        <spotLight position={[-3, 4, 2]} intensity={2.2} angle={0.42} penumbra={0.8} />
        <Suspense fallback={<Html center><RobotVisualFallback compact /></Html>}>
          <RobotModel modelUrl={ROBOT_MODEL_URL} pointerEnabled={pointerEnabled} />
          <Environment preset="studio" environmentIntensity={0.55} />
          <ContactShadows position={[0, -1.35, 0]} opacity={0.42} scale={5} blur={2.4} far={4} />
        </Suspense>
      </Canvas>
    </RobotErrorBoundary>
  );
}
