"use client";

import { Component, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";
import * as THREE from "three";
import { ROBOT_FALLBACK_URL, ROBOT_MODEL_URL } from "../config/robot";

const NORMALIZED_ROBOT_HEIGHT = 4.2;

const ROBOT_LAYOUTS = {
  desktop: { cameraFov: 32, cameraZ: 8.3, modelScale: 1, modelY: 0.02 },
  tablet: { cameraFov: 35, cameraZ: 8.1, modelScale: 0.96, modelY: 0 },
  mobile: { cameraFov: 38, cameraZ: 7.9, modelScale: 0.98, modelY: -0.02 },
};

function hasFiniteComponents(value) {
  return Object.values(value).every((component) => typeof component !== "number" || Number.isFinite(component));
}

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, [query]);

  return matches;
}

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

function RobotModel({ active, layout, modelUrl, pointerEnabled, reducedMotion }) {
  const { scene } = useGLTF(modelUrl);
  const model = useMemo(() => clone(scene), [scene]);
  const rootRef = useRef(null);
  const headRef = useRef(null);
  const faceRef = useRef(null);
  const headBaseRef = useRef({ x: 0, y: 0 });
  const faceBaseRef = useRef({ x: 0, y: 0 });
  const normalization = useMemo(() => {
    model.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const validBounds = !box.isEmpty()
      && hasFiniteComponents(size)
      && hasFiniteComponents(center)
      && size.y > 0.0001;

    if (!validBounds) throw new Error("Robot GLB has invalid or non-finite bounds.");

    return {
      offset: center.multiplyScalar(-1),
      scale: NORMALIZED_ROBOT_HEIGHT / size.y,
    };
  }, [model]);

  useEffect(() => {
    model.traverse((object) => {
      if (!hasFiniteComponents(object.position) || !hasFiniteComponents(object.quaternion) || !hasFiniteComponents(object.scale)) {
        throw new Error(`Robot node ${object.name || object.uuid} has a non-finite transform.`);
      }
      if (Math.max(Math.abs(object.scale.x), Math.abs(object.scale.y), Math.abs(object.scale.z)) > 10000) {
        throw new Error(`Robot node ${object.name || object.uuid} has an extreme scale.`);
      }
      if (object.isMesh) {
        Object.values(object.geometry.attributes).forEach((attribute) => {
          if (Array.from(attribute.array).some((value) => !Number.isFinite(value))) {
            throw new Error(`Robot mesh ${object.name || object.uuid} contains invalid geometry values.`);
          }
        });
        object.castShadow = true;
        object.receiveShadow = true;
        const enhanceMaterial = (sourceMaterial) => {
          const material = sourceMaterial.clone();
          const materialName = material.name.toLowerCase();
          material.envMapIntensity = 1.45;
          if (materialName.includes("black")) {
            material.color.set("#071017");
            material.metalness = 0.88;
            material.roughness = 0.16;
            material.emissive.set("#1ea7c6");
            material.emissiveIntensity = 0.32;
          } else if (materialName.includes("main")) {
            material.color.set("#dce4e8");
            material.metalness = 0.86;
            material.roughness = 0.2;
          } else {
            material.color.set("#59646c");
            material.metalness = 0.72;
            material.roughness = 0.3;
          }
          material.needsUpdate = true;
          return material;
        };
        object.material = Array.isArray(object.material)
          ? object.material.map(enhanceMaterial)
          : enhanceMaterial(object.material);
      }
      const name = object.name.toLowerCase();
      if (!headRef.current && object.isBone && name === "head") {
        headRef.current = object;
        headBaseRef.current = { x: object.rotation.x, y: object.rotation.y };
      }
      if (!faceRef.current && name === "head_4") {
        faceRef.current = object;
        faceBaseRef.current = { x: object.rotation.x, y: object.rotation.y };
      }
    });
    return () => {
      headRef.current = null;
      faceRef.current = null;
    };
  }, [model]);

  useFrame((state, delta) => {
    if (!active) return;
    const elapsed = state.clock.elapsedTime;
    if (rootRef.current) {
      const motion = reducedMotion ? 0 : 1;
      rootRef.current.position.y = layout.modelY + Math.sin(elapsed * 0.9) * 0.022 * motion;
      rootRef.current.rotation.y = Math.sin(elapsed * 0.32) * 0.025 * motion;
      rootRef.current.scale.set(
        layout.modelScale,
        layout.modelScale * (1 + Math.sin(elapsed * 1.15) * 0.0025 * motion),
        layout.modelScale
      );
    }
    const targetX = pointerEnabled && !reducedMotion ? -state.pointer.y * 0.14 : 0;
    const targetY = pointerEnabled && !reducedMotion ? state.pointer.x * 0.3 : 0;
    if (headRef.current) {
      headRef.current.rotation.x = THREE.MathUtils.damp(headRef.current.rotation.x, headBaseRef.current.x + targetX, 4.5, delta);
      headRef.current.rotation.y = THREE.MathUtils.damp(headRef.current.rotation.y, headBaseRef.current.y + targetY, 4.5, delta);
    }
    if (faceRef.current) {
      faceRef.current.rotation.x = THREE.MathUtils.damp(faceRef.current.rotation.x, faceBaseRef.current.x + targetX * 0.08, 6, delta);
      faceRef.current.rotation.y = THREE.MathUtils.damp(faceRef.current.rotation.y, faceBaseRef.current.y + targetY * 0.1, 6, delta);
    }
  });

  return (
    <group ref={rootRef} position={[0, layout.modelY, 0]} scale={layout.modelScale}>
      <group scale={normalization.scale}>
        <group position={normalization.offset}>
          <primitive object={model} />
        </group>
      </group>
    </group>
  );
}

export default function RobotStage() {
  const stageRef = useRef(null);
  const [active, setActive] = useState(true);
  const [stageReady, setStageReady] = useState(false);
  const coarsePointer = useMediaQuery("(pointer: coarse)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const mobile = useMediaQuery("(max-width: 700px)");
  const tablet = useMediaQuery("(max-width: 1024px)");
  const layout = mobile ? ROBOT_LAYOUTS.mobile : tablet ? ROBOT_LAYOUTS.tablet : ROBOT_LAYOUTS.desktop;
  const contactShadowY = layout.modelY - (NORMALIZED_ROBOT_HEIGHT * layout.modelScale) / 2;

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { rootMargin: "160px" });
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    const update = () => {
      const { width, height } = stage.getBoundingClientRect();
      setStageReady(width > 0 && height > 0);
    };
    update();
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(stage);
    return () => resizeObserver.disconnect();
  }, []);

  if (!ROBOT_MODEL_URL) return <RobotVisualFallback />;

  return (
    <RobotErrorBoundary fallback={<RobotVisualFallback />}>
      <div ref={stageRef} className="robot-stage">
        {stageReady ? <Canvas
          className="robot-canvas"
          dpr={mobile ? [0.75, 1] : [1, 1.5]}
          gl={{ antialias: !mobile, alpha: true, powerPreference: "high-performance" }}
          frameloop={active && !reducedMotion ? "always" : "demand"}
          fallback={<RobotVisualFallback />}
          onCreated={({ gl }) => {
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFShadowMap;
            gl.setClearColor(0x000000, 0);
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.08;
          }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, layout.cameraZ]} fov={layout.cameraFov} near={0.1} far={100} />
          <ambientLight intensity={0.32} />
          <hemisphereLight args={["#e6f5ff", "#071018", 0.72]} />
          <directionalLight position={[4, 7, 5]} intensity={3.4} castShadow shadow-mapSize={[1024, 1024]} shadow-bias={-0.0004} />
          <spotLight position={[-4, 5, -3]} color="#83dcff" intensity={3} angle={0.48} penumbra={0.9} />
          <pointLight position={[0, 2.8, 4]} color="#ffffff" intensity={1.2} distance={10} />
          <Suspense fallback={null}>
            <RobotModel active={active} layout={layout} modelUrl={ROBOT_MODEL_URL} pointerEnabled={!coarsePointer} reducedMotion={reducedMotion} />
            <ContactShadows position={[0, contactShadowY, 0]} opacity={0.48} scale={5.2} blur={2.6} far={3.5} resolution={mobile ? 256 : 512} />
          </Suspense>
        </Canvas> : <RobotVisualFallback />}
      </div>
    </RobotErrorBoundary>
  );
}

if (ROBOT_MODEL_URL) useGLTF.preload(ROBOT_MODEL_URL);
