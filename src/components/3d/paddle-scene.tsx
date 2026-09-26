"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";

/* ---------- Dimensions (scene units) ---------- */

const SHAFT_LENGTH = 4.2;
const SHAFT_HALF = SHAFT_LENGTH / 2;
const SHAFT_RADIUS_MID = 0.035;
const SHAFT_RADIUS_END = 0.028;

const BLADE_LENGTH = 1.1;
const BLADE_MAX_WIDTH = 0.42;
const BLADE_NECK_HALF_WIDTH = 0.035;
const BLADE_THICKNESS = 0.012;
/** Across-width dish: offset in z = BLADE_DISH * x^2 (about 0.026 at the edge). */
const BLADE_DISH = 0.6;
/** Gentle curve along the length, reaching this z offset at the tip. */
const BLADE_LENGTH_CURVE = 0.03;
/** The blade root sits slightly inside the shaft end; a ring covers the joint. */
const BLADE_OFFSET = SHAFT_HALF - 0.05;
const FEATHER_ANGLE = THREE.MathUtils.degToRad(70);

const RING_DEPTH = 0.02;
const RING_CLEARANCE = 0.004;

/**
 * The paddle is about 6.3 units tip to tip, but at fov 30 and distance 5.8 the
 * camera sees only about 3.1 units vertically. Scaling the whole model keeps it
 * fully in frame at the diagonal angle without changing any proportion.
 */
const PADDLE_SCALE = 0.46;

/* ---------- Presentation and motion ---------- */

const BASE_ROTATION: [number, number, number] = [-0.08, -0.15, -0.6];
const CAMERA_POSITION: [number, number, number] = [0, 0.15, 5.8];
const CAMERA_FOV = 30;

const SPIN_DELAY_MS = 250;
const SPIN_MS_DESKTOP = 3600;
const SPIN_MS_MOBILE = 3200;

const IDLE_TRAVEL = 0.04;
const IDLE_PERIOD_S = 6;

const POINTER_MAX_X = 0.035;
const POINTER_MAX_Y = 0.045;

const MOBILE_QUERY = "(max-width: 767px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const FINE_POINTER_QUERY = "(pointer: fine)";

type SceneEnv = {
  reducedMotion: boolean;
  finePointer: boolean;
  isMobile: boolean;
};

/* ---------- Helpers ---------- */

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Client-only (the scene is imported with ssr: false). Null means no WebGL. */
function detectEnv(): SceneEnv | null {
  if (typeof window === "undefined" || !hasWebGL()) return null;
  return {
    reducedMotion: window.matchMedia(REDUCED_MOTION_QUERY).matches,
    finePointer: window.matchMedia(FINE_POINTER_QUERY).matches,
    isMobile: window.matchMedia(MOBILE_QUERY).matches,
  };
}

/** CSS cubic-bezier(x1, y1, x2, y2) as an easing function of progress 0..1. */
function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t: number) => ((ay * t + by) * t + cy) * t;
  const slopeX = (t: number) => (3 * ax * t + 2 * bx) * t + cx;

  return (x: number): number => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;

    let t = x;
    for (let i = 0; i < 8; i++) {
      const error = sampleX(t) - x;
      if (Math.abs(error) < 1e-6) return sampleY(t);
      const slope = slopeX(t);
      if (Math.abs(slope) < 1e-6) break;
      t -= error / slope;
    }

    let lo = 0;
    let hi = 1;
    t = x;
    while (hi - lo > 1e-6) {
      if (sampleX(t) < x) lo = t;
      else hi = t;
      t = (lo + hi) / 2;
    }
    return sampleY(t);
  };
}

const spinEase = cubicBezier(0.22, 1, 0.36, 1);

function shaftRadiusAt(y: number): number {
  const u = y / SHAFT_HALF;
  return SHAFT_RADIUS_END + (SHAFT_RADIUS_MID - SHAFT_RADIUS_END) * (1 - u * u);
}

function createShaft(): THREE.LatheGeometry {
  const steps = 32;
  const profile: THREE.Vector2[] = [];
  for (let i = 0; i <= steps; i++) {
    const y = -SHAFT_HALF + (i / steps) * SHAFT_LENGTH;
    profile.push(new THREE.Vector2(shaftRadiusAt(y), y));
  }
  return new THREE.LatheGeometry(profile, 48);
}

/**
 * Elongated teardrop along +Y, root at y = 0, widest two thirds of the way up
 * (a third from the outer tip), then dished across its width.
 */
function createBlade(): THREE.BufferGeometry {
  const length = BLADE_LENGTH;
  const half = BLADE_MAX_WIDTH / 2;
  const neck = BLADE_NECK_HALF_WIDTH;
  const widest = length * (2 / 3);

  const shape = new THREE.Shape();
  shape.moveTo(-neck, 0);
  shape.bezierCurveTo(-neck * 1.6, length * 0.25, -half, widest - length * 0.18, -half, widest);
  shape.bezierCurveTo(-half, widest + length * 0.2, -half * 0.55, length, 0, length);
  shape.bezierCurveTo(half * 0.55, length, half, widest + length * 0.2, half, widest);
  shape.bezierCurveTo(half, widest - length * 0.18, neck * 1.6, length * 0.25, neck, 0);
  shape.closePath();

  const extruded = new THREE.ExtrudeGeometry(shape, {
    depth: BLADE_THICKNESS,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.004,
    bevelSegments: 3,
    curveSegments: 48,
  });
  extruded.translate(0, 0, -BLADE_THICKNESS / 2);

  // Merge shared positions so the dished faces shade smoothly, not faceted.
  extruded.deleteAttribute("uv");
  extruded.deleteAttribute("normal");
  const blade = mergeVertices(extruded, 1e-5);
  extruded.dispose();

  const position = blade.getAttribute("position");
  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i);
    const y = position.getY(i);
    const along = y / length;
    position.setZ(i, position.getZ(i) + BLADE_DISH * x * x + BLADE_LENGTH_CURVE * along * along);
  }
  position.needsUpdate = true;
  blade.computeVertexNormals();
  return blade;
}

function createRing(y: number): THREE.CylinderGeometry {
  const radius = shaftRadiusAt(y) + RING_CLEARANCE;
  return new THREE.CylinderGeometry(radius, radius, RING_DEPTH, 48);
}

/* ---------- The paddle ---------- */

function Paddle({
  env,
  startAtRef,
}: {
  env: SceneEnv;
  startAtRef: RefObject<number | null>;
}) {
  const outer = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const hasAnimated = useRef(false);
  const idleStartedAt = useRef<number | null>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const spinDuration = env.isMobile ? SPIN_MS_MOBILE : SPIN_MS_DESKTOP;
  const pointerEnabled = env.finePointer && !env.reducedMotion;

  const parts = useMemo(
    () => ({
      shaft: createShaft(),
      blade: createBlade(),
      ringEnd: createRing(BLADE_OFFSET),
      ringMid: createRing(0),
      carbon: new THREE.MeshStandardMaterial({
        color: "#0d0f0e",
        roughness: 0.26,
        metalness: 0.08,
      }),
      gold: new THREE.MeshStandardMaterial({
        color: "#D8B96A",
        roughness: 0.27,
        metalness: 0.88,
      }),
    }),
    []
  );

  useEffect(
    () => () => {
      parts.shaft.dispose();
      parts.blade.dispose();
      parts.ringEnd.dispose();
      parts.ringMid.dispose();
      parts.carbon.dispose();
      parts.gold.dispose();
    },
    [parts]
  );

  useEffect(() => {
    if (!pointerEnabled) return;
    const onMove = (event: PointerEvent) => {
      pointer.current.x = THREE.MathUtils.clamp((event.clientX / window.innerWidth) * 2 - 1, -1, 1);
      pointer.current.y = THREE.MathUtils.clamp((event.clientY / window.innerHeight) * 2 - 1, -1, 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [pointerEnabled]);

  useFrame((_, delta) => {
    const outerGroup = outer.current;
    const spinGroup = spin.current;
    if (!outerGroup || !spinGroup || env.reducedMotion) return;

    const now = performance.now();

    if (!hasAnimated.current) {
      const startAt = startAtRef.current;
      if (startAt === null || now < startAt) return;
      const progress = Math.min((now - startAt) / spinDuration, 1);
      spinGroup.rotation.y = spinEase(progress) * Math.PI * 2;
      if (progress === 1) {
        spinGroup.rotation.y = 0;
        hasAnimated.current = true;
        idleStartedAt.current = now;
      }
      return;
    }

    // Idle float and pointer tilt start only after the single turn, so they
    // can never compete with it.
    const idleSeconds = (now - (idleStartedAt.current ?? now)) / 1000;
    outerGroup.position.y =
      (IDLE_TRAVEL / 2) * (1 - Math.cos((2 * Math.PI * idleSeconds) / IDLE_PERIOD_S));

    if (pointerEnabled) {
      const follow = 1 - Math.exp(-delta * 3);
      const targetX = BASE_ROTATION[0] + pointer.current.y * POINTER_MAX_X;
      const targetY = BASE_ROTATION[1] + pointer.current.x * POINTER_MAX_Y;
      outerGroup.rotation.x += (targetX - outerGroup.rotation.x) * follow;
      outerGroup.rotation.y += (targetY - outerGroup.rotation.y) * follow;
    }
  });

  return (
    <group ref={outer} rotation={BASE_ROTATION}>
      <group ref={spin}>
        <group scale={PADDLE_SCALE}>
          <mesh geometry={parts.shaft} material={parts.carbon} />

          <mesh geometry={parts.blade} material={parts.carbon} position={[0, BLADE_OFFSET, 0]} />
          <group position={[0, -BLADE_OFFSET, 0]} rotation={[0, FEATHER_ANGLE, 0]}>
            <mesh geometry={parts.blade} material={parts.carbon} rotation={[0, 0, Math.PI]} />
          </group>

          <mesh geometry={parts.ringEnd} material={parts.gold} position={[0, BLADE_OFFSET, 0]} />
          <mesh geometry={parts.ringMid} material={parts.gold} />
          <mesh geometry={parts.ringEnd} material={parts.gold} position={[0, -BLADE_OFFSET, 0]} />
        </group>
      </group>
    </group>
  );
}

/* ---------- The scene ---------- */

export default function PaddleScene() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const startAtRef = useRef<number | null>(null);
  const [env] = useState<SceneEnv | null>(detectEnv);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || !env) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setVisible(entry.isIntersecting);
          if (entry.intersectionRatio >= 0.35 && startAtRef.current === null) {
            startAtRef.current = performance.now() + SPIN_DELAY_MS;
          }
        }
      },
      { threshold: [0, 0.35] }
    );
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, [env]);

  return (
    <div ref={wrapperRef} className="absolute inset-0">
      {env && (
        <Canvas
          dpr={env.isMobile ? [1, 1.5] : [1, 2]}
          camera={{ position: CAMERA_POSITION, fov: CAMERA_FOV }}
          gl={{ antialias: true, alpha: true }}
          frameloop={env.reducedMotion ? "demand" : visible ? "always" : "never"}
        >
          <ambientLight intensity={0.18} />
          <directionalLight position={[-3.5, 4, 5]} intensity={2.2} color="#FFEFD0" />
          <directionalLight position={[4, 0.5, 4]} intensity={0.8} color="#CFE8DF" />
          <directionalLight position={[1.5, 2.5, -5]} intensity={1.8} color="#D8B96A" />

          <Paddle env={env} startAtRef={startAtRef} />

          <ContactShadows
            position={[-0.72, -1.38, 0]}
            scale={1.4}
            far={0.45}
            blur={2.6}
            opacity={0.22}
            resolution={256}
            color="#000000"
            frames={env.reducedMotion ? 1 : Infinity}
          />
        </Canvas>
      )}
    </div>
  );
}
