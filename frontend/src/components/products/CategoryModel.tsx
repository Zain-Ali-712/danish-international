"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import type { ModelKind } from "@/lib/catalog";

type Mats = Record<"steel" | "graphite" | "crimson" | "glass" | "white" | "water", THREE.Material>;
type Built = { group: THREE.Group; radius: number; tick: (t: number) => void };

/* ---------- procedural models, one per product domain ---------- */

function calibrator(m: Mats): Built {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.15, 2.2, 72), m.steel);
  body.position.y = -0.5;
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.98, 0.09, 24, 96), m.steel);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.61;
  const well = new THREE.Mesh(new THREE.CircleGeometry(0.5, 48), m.graphite);
  well.rotation.x = -Math.PI / 2;
  well.position.y = 0.612;
  const base = new THREE.Mesh(new THREE.TorusGeometry(1.15, 0.07, 16, 96), m.graphite);
  base.rotation.x = Math.PI / 2;
  base.position.y = -1.6;
  const band = new THREE.Mesh(new THREE.CylinderGeometry(1.16, 1.16, 0.14, 72, 1, true), m.crimson);
  band.position.y = -0.15;
  const dip = new THREE.Group();
  const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.0, 12), m.graphite);
  rod.position.y = 0.5;
  const vial = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.5, 32), m.glass);
  const dose = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.3, 32), m.crimson);
  dose.position.y = -0.08;
  dip.add(rod, vial, dose);
  const haloMat = new THREE.MeshBasicMaterial({ color: 0xe2324f, transparent: true });
  const halo = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.02, 12, 80), haloMat);
  halo.rotation.x = Math.PI / 2;
  halo.position.y = 0.7;
  g.add(body, rim, well, base, band, dip, halo);
  g.position.y = -0.1;
  return {
    group: g,
    radius: 2.6,
    tick: (t) => {
      dip.position.y = 0.95 + Math.sin(t * 0.9) * 0.35;
      const f = (t * 0.6) % 1;
      halo.scale.setScalar(1 + f * 0.9);
      haloMat.opacity = 1 - f;
    },
  };
}

function immobilization(m: Mats): Built {
  const g = new THREE.Group();
  const board = new THREE.Mesh(new RoundedBoxGeometry(3.8, 0.14, 1.6, 4, 0.06), m.graphite);
  board.position.y = -0.9;
  const head = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 1.1, 40, 1, false, 0, Math.PI), m.steel);
  head.rotation.set(0, 0, Math.PI / 2);
  head.rotation.order = "ZYX";
  head.rotation.y = Math.PI / 2;
  head.position.set(0.9, -0.83, 0);
  const domeGeo = new THREE.SphereGeometry(1, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2);
  const dome = new THREE.Mesh(domeGeo, m.white);
  dome.scale.set(1.15, 0.95, 0.78);
  dome.position.set(0.9, -0.82, 0);
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(1.01, 30, 14, 0, Math.PI * 2, 0, Math.PI / 2),
    new THREE.MeshBasicMaterial({ color: 0x9aa1ab, wireframe: true, transparent: true, opacity: 0.55 })
  );
  mesh.scale.copy(dome.scale);
  mesh.position.copy(dome.position);
  const frame = new THREE.Mesh(new THREE.TorusGeometry(1, 0.05, 12, 80), m.crimson);
  frame.rotation.x = Math.PI / 2;
  frame.scale.set(1.25, 0.88, 1);
  frame.position.set(0.9, -0.8, 0);
  const pins = [-1.4, -0.9, -0.4].map((x) => {
    const p = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.12, 16), m.crimson);
    p.position.set(x, -0.78, 0.55);
    return p;
  });
  const laserMat = new THREE.MeshBasicMaterial({ color: 0xe2324f, transparent: true, opacity: 0.85 });
  const laserX = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.012, 0.012), laserMat);
  const laserZ = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.012, 2.2), laserMat);
  laserX.position.y = laserZ.position.y = 0.2;
  laserZ.position.x = 0.9;
  g.add(board, head, dome, mesh, frame, laserX, laserZ, ...pins);
  return {
    group: g,
    radius: 2.55,
    tick: (t) => {
      laserX.position.z = Math.sin(t * 0.8) * 0.55;
      laserX.position.y = -0.1 + Math.cos(t * 0.8) * 0.12;
    },
  };
}

function molecule(m: Mats): Built {
  const g = new THREE.Group();
  const vial = new THREE.Group();
  const glass = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 1.7, 48), m.glass);
  const liquid = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.85, 48), m.water);
  liquid.position.y = -0.38;
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.36, 48), m.steel);
  cap.position.y = 1.03;
  const seal = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.06, 32), m.crimson);
  seal.position.y = 1.23;
  vial.add(glass, liquid, cap, seal);
  vial.position.set(-1.15, -0.1, 0);
  // [18F]FDG-like ring: six ring atoms, substituents, one crimson fluorine
  const mol = new THREE.Group();
  const atom = (r: number, mat: THREE.Material, p: THREE.Vector3) => {
    const s = new THREE.Mesh(new THREE.SphereGeometry(r, 32, 24), mat);
    s.position.copy(p);
    mol.add(s);
    return p;
  };
  const bond = (a: THREE.Vector3, b: THREE.Vector3) => {
    const len = a.distanceTo(b);
    const c = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, len, 12), m.steel);
    c.position.copy(a.clone().add(b).multiplyScalar(0.5));
    c.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize());
    mol.add(c);
  };
  const ring: THREE.Vector3[] = [];
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    ring.push(atom(i === 0 ? 0.2 : 0.17, i === 0 ? m.white : m.graphite, new THREE.Vector3(Math.cos(a) * 0.62, Math.sin(a) * 0.62, (i % 2 ? 0.14 : -0.14))));
  }
  ring.forEach((p, i) => bond(p, ring[(i + 1) % 6]));
  ring.forEach((p, i) => {
    const out = p.clone().multiplyScalar(1.75);
    out.z += i % 2 ? 0.3 : -0.3;
    const isF = i === 3;
    atom(isF ? 0.24 : 0.13, isF ? m.crimson : i % 2 ? m.white : m.steel, out);
    bond(p, out);
  });
  mol.position.set(0.95, 0.15, 0);
  g.add(vial, mol);
  return {
    group: g,
    radius: 2.2,
    tick: (t) => {
      mol.rotation.y = t * 0.5;
      mol.rotation.x = Math.sin(t * 0.4) * 0.4;
      vial.rotation.y = -t * 0.3;
    },
  };
}

function dosimetry(m: Mats): Built {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new RoundedBoxGeometry(1.35, 2.1, 0.42, 6, 0.2), m.steel);
  const screen = new THREE.Mesh(new RoundedBoxGeometry(1.0, 0.72, 0.04, 4, 0.05), m.graphite);
  screen.position.set(0, 0.42, 0.22);
  const dial = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.06, 40), m.graphite);
  dial.rotation.x = Math.PI / 2;
  dial.position.set(0, -0.45, 0.22);
  const ledMat = (m.crimson as THREE.MeshPhysicalMaterial).clone();
  const led = new THREE.Mesh(new THREE.SphereGeometry(0.07, 20, 16), ledMat);
  led.position.set(0.42, 0.88, 0.2);
  const clip = new THREE.Mesh(new RoundedBoxGeometry(0.4, 1.3, 0.08, 3, 0.04), m.graphite);
  clip.position.set(0, 0.2, -0.27);
  const device = new THREE.Group();
  device.add(body, screen, dial, led, clip);
  // trefoil behind the device
  const tre = new THREE.Group();
  for (let i = 0; i < 3; i++) {
    const shape = new THREE.Shape();
    shape.absarc(0, 0, 1.7, -Math.PI / 6, Math.PI / 6, false);
    shape.absarc(0, 0, 0.55, Math.PI / 6, -Math.PI / 6, true);
    const blade = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: 0.08, bevelEnabled: false }), m.crimson);
    blade.rotation.z = (i / 3) * Math.PI * 2 + Math.PI / 2;
    tre.add(blade);
  }
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.08, 40), m.crimson);
  hub.rotation.x = Math.PI / 2;
  hub.position.z = 0.04;
  tre.add(hub);
  tre.position.set(0.1, 0.1, -1.1);
  tre.scale.setScalar(0.9);
  g.add(tre, device);
  return {
    group: g,
    radius: 2.5,
    tick: (t) => {
      tre.rotation.z = t * 0.25;
      ledMat.emissiveIntensity = 0.4 + (Math.sin(t * 4) > 0.6 ? 1.6 : 0);
      device.position.y = Math.sin(t * 0.8) * 0.06;
    },
  };
}

function phantom(m: Mats): Built {
  const g = new THREE.Group();
  const tankGeo = new THREE.BoxGeometry(2.8, 1.9, 2.2);
  const tank = new THREE.Mesh(tankGeo, m.glass);
  const edges = new THREE.LineSegments(new THREE.EdgesGeometry(tankGeo), new THREE.LineBasicMaterial({ color: 0x3b414a }));
  const water = new THREE.Mesh(new THREE.BoxGeometry(2.74, 1.3, 2.14), m.water);
  water.position.y = -0.27;
  const railA = new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.08, 0.1), m.graphite);
  railA.position.set(0, 0.98, 1.1);
  const railB = railA.clone();
  railB.position.z = -1.1;
  const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.1, 2.3), m.graphite);
  bridge.position.y = 1.04;
  const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.5, 12), m.steel);
  const det = new THREE.Mesh(new THREE.CapsuleGeometry(0.09, 0.22, 8, 16), m.crimson);
  const beam = new THREE.Mesh(
    new THREE.ConeGeometry(1.0, 2.2, 48, 1, true),
    new THREE.MeshBasicMaterial({ color: 0xe2324f, transparent: true, opacity: 0.07, side: THREE.DoubleSide, depthWrite: false })
  );
  beam.position.y = 1.0;
  g.add(water, tank, edges, railA, railB, bridge, arm, det, beam);
  return {
    group: g,
    radius: 2.25,
    tick: (t) => {
      const x = Math.sin(t * 0.7) * 1.0;
      const z = Math.sin(t * 0.23) * 0.75;
      bridge.position.x = x;
      arm.position.set(x, 0.3, z);
      det.position.set(x, -0.45 + Math.sin(t * 0.35) * 0.25, z);
    },
  };
}

function source(m: Mats): Built {
  const g = new THREE.Group();
  const plate = new THREE.Mesh(new RoundedBoxGeometry(3.0, 0.1, 2.0, 4, 0.04), m.graphite);
  plate.position.y = -1.0;
  const active = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.02, 1.5), m.crimson);
  active.position.y = -0.94;
  const cap = new THREE.Group();
  const shell = new THREE.Mesh(new THREE.CapsuleGeometry(0.34, 1.5, 12, 32), m.steel);
  shell.rotation.z = Math.PI / 2;
  const core = new THREE.Mesh(new THREE.CylinderGeometry(0.352, 0.352, 0.5, 40, 1, true), m.crimson);
  core.rotation.z = Math.PI / 2;
  const end = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.2, 40), m.graphite);
  end.rotation.z = Math.PI / 2;
  end.position.x = -0.75;
  cap.add(shell, core, end);
  cap.position.y = 0.25;
  // emitted particles
  const count = 70;
  const pos = new Float32Array(count * 3);
  const dirs: THREE.Vector3[] = [];
  for (let i = 0; i < count; i++) dirs.push(new THREE.Vector3().randomDirection());
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const pts = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xc41e3a, size: 0.05, transparent: true, opacity: 0.85 }));
  pts.position.copy(cap.position);
  g.add(plate, active, cap, pts);
  return {
    group: g,
    radius: 2.0,
    tick: (t) => {
      cap.rotation.y = t * 0.45;
      cap.position.y = 0.25 + Math.sin(t) * 0.08;
      for (let i = 0; i < count; i++) {
        const r = 0.45 + (((t * 0.35 + i / count) % 1) * 1.7);
        pos[i * 3] = dirs[i].x * r;
        pos[i * 3 + 1] = dirs[i].y * r * 0.7;
        pos[i * 3 + 2] = dirs[i].z * r;
      }
      geo.attributes.position.needsUpdate = true;
    },
  };
}

function neuro(m: Mats): Built {
  const g = new THREE.Group();
  const ipg = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 0.3, 64), m.steel);
  ipg.rotation.x = Math.PI / 2;
  ipg.scale.set(1.3, 1, 1);
  ipg.position.set(-0.9, -0.55, 0);
  const header = new THREE.Mesh(new RoundedBoxGeometry(1.2, 0.42, 0.32, 4, 0.12), m.glass);
  header.position.set(-0.9, 0.38, 0);
  const port = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.08, 0.34), m.crimson);
  port.position.set(-0.9, 0.38, 0);
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.6, 0.5, 0),
    new THREE.Vector3(-0.2, 1.3, 0.3),
    new THREE.Vector3(0.6, 1.1, -0.2),
    new THREE.Vector3(1.0, 0.3, 0.1),
    new THREE.Vector3(1.15, -0.4, 0),
    new THREE.Vector3(1.2, -1.1, 0),
  ]);
  const lead = new THREE.Mesh(new THREE.TubeGeometry(curve, 160, 0.05, 12, false), m.graphite);
  const contacts = [0, 1, 2, 3].map((i) => {
    const c = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.09, 24), i % 2 ? m.steel : m.crimson);
    c.position.copy(curve.getPointAt(0.9 + i * 0.03));
    return c;
  });
  const pulse = new THREE.Mesh(new THREE.SphereGeometry(0.09, 20, 16), m.crimson);
  g.add(ipg, header, port, lead, pulse, ...contacts);
  return {
    group: g,
    radius: 2.0,
    tick: (t) => {
      pulse.position.copy(curve.getPointAt((t * 0.3) % 1));
    },
  };
}

const BUILDERS: Record<ModelKind, (m: Mats) => Built> = {
  calibrator,
  immobilization,
  molecule,
  dosimetry,
  phantom,
  source,
  neuro,
};

/**
 * Interactive model for a product domain: slow auto-rotation, drag to orbit on desktop.
 * The WebGL context only exists while the stage is near the viewport.
 */
export default function CategoryModel({ kind, className = "" }: { kind: ModelKind; className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setNear(e.isIntersecting), { rootMargin: "300px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || !near) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.setAttribute("aria-hidden", "true");
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const key = new THREE.DirectionalLight(0xffffff, 2);
    key.position.set(4, 6, 5);
    const rim = new THREE.DirectionalLight(0xffd6dc, 1.2);
    rim.position.set(-5, -2, -4);
    scene.add(key, rim);

    const mats: Mats = {
      steel: new THREE.MeshPhysicalMaterial({ color: 0xdfe3e8, metalness: 1, roughness: 0.24, clearcoat: 0.6, clearcoatRoughness: 0.2 }),
      graphite: new THREE.MeshPhysicalMaterial({ color: 0x2a2f37, metalness: 0.7, roughness: 0.35, clearcoat: 0.4 }),
      crimson: new THREE.MeshPhysicalMaterial({
        color: 0xc41e3a,
        metalness: 0.3,
        roughness: 0.2,
        clearcoat: 1,
        emissive: 0x5a0a16,
        emissiveIntensity: 0.4,
        transparent: true,
      }),
      glass: new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0,
        roughness: 0.05,
        transparent: true,
        opacity: 0.22,
        clearcoat: 1,
        depthWrite: false,
      }),
      white: new THREE.MeshPhysicalMaterial({ color: 0xf3f4f6, roughness: 0.55, transparent: true, opacity: 0.9 }),
      water: new THREE.MeshPhysicalMaterial({ color: 0xd8344f, roughness: 0.2, transparent: true, opacity: 0.32, depthWrite: false }),
    };
    if (kind === "phantom") {
      const w = mats.water as THREE.MeshPhysicalMaterial;
      w.color.set(0x6f9fbd);
      w.opacity = 0.5;
    }

    const built = BUILDERS[kind](mats);
    const pivot = new THREE.Group();
    pivot.add(built.group);
    pivot.rotation.set(0.32, -0.55, 0);
    scene.add(pivot);

    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.autoRotate = !reduce;
    controls.autoRotateSpeed = 0.9;
    controls.minPolarAngle = Math.PI * 0.2;
    controls.maxPolarAngle = Math.PI * 0.62;
    controls.enabled = fine;
    renderer.domElement.style.touchAction = fine ? "none" : "pan-y";
    renderer.domElement.style.cursor = fine ? "grab" : "default";

    const resize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      const v = THREE.MathUtils.degToRad(camera.fov);
      const hf = 2 * Math.atan(Math.tan(v / 2) * camera.aspect);
      const dist = built.radius / Math.sin(Math.min(v, hf) / 2);
      camera.position.set(0, dist * 0.25, dist);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
      controls.update();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    const start = performance.now();
    let raf = 0;
    const render = (fixed?: number) => {
      const t = fixed ?? (performance.now() - start) / 1000;
      built.tick(t);
      controls.update();
      renderer.render(scene, camera);
    };
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!document.hidden) render();
    };
    if (reduce) render(1.5);
    else loop();
    const onDown = () => (renderer.domElement.style.cursor = "grabbing");
    const onUp = () => (renderer.domElement.style.cursor = fine ? "grab" : "default");
    renderer.domElement.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      controls.dispose();
      window.removeEventListener("pointerup", onUp);
      scene.traverse((o) => {
        const mesh = o as THREE.Mesh;
        mesh.geometry?.dispose();
        const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
        else mat?.dispose();
      });
      env.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [near, kind]);

  return <div ref={mountRef} className={className} />;
}
