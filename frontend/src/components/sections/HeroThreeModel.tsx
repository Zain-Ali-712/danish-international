"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/**
 * Stylized gantry / detector assembly lit for a light background.
 * The camera distance is solved from the container size so the model
 * always fits (no clipping on phones, no oversized render on desktop).
 */
export default function HeroThreeModel({ className = "" }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      return; // No WebGL: the CSS backdrop carries the hero.
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.setAttribute("aria-hidden", "true");
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;

    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);

    const root = new THREE.Group();
    scene.add(root);
    const tilt = new THREE.Group();
    root.add(tilt);

    // Materials
    const steel = new THREE.MeshPhysicalMaterial({
      color: 0xdfe3e8,
      metalness: 1,
      roughness: 0.22,
      clearcoat: 0.6,
      clearcoatRoughness: 0.2,
    });
    const graphite = new THREE.MeshPhysicalMaterial({
      color: 0x2a2f37,
      metalness: 0.8,
      roughness: 0.32,
      clearcoat: 0.4,
    });
    const crimson = new THREE.MeshPhysicalMaterial({
      color: 0xc41e3a,
      metalness: 0.35,
      roughness: 0.18,
      clearcoat: 1,
      clearcoatRoughness: 0.06,
      emissive: 0x5a0a16,
      emissiveIntensity: 0.35,
    });

    // 1. Outer gantry housing
    const gantry = new THREE.Mesh(new THREE.TorusGeometry(3, 0.16, 48, 180), steel);
    gantry.rotation.x = Math.PI / 3.2;
    tilt.add(gantry);

    // Detector blocks around the gantry
    const blockGeo = new THREE.BoxGeometry(0.22, 0.34, 0.16);
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2;
      const b = new THREE.Mesh(blockGeo, i % 6 === 0 ? crimson : graphite);
      b.position.set(Math.cos(a) * 3, Math.sin(a) * 3, 0);
      b.rotation.z = a;
      gantry.add(b);
    }

    // 2. Inner crimson ring
    const inner = new THREE.Mesh(new THREE.TorusGeometry(2.25, 0.05, 24, 140), crimson);
    inner.rotation.set(-Math.PI / 4, Math.PI / 6, 0);
    tilt.add(inner);
    const nodeGeo = new THREE.SphereGeometry(0.075, 16, 16);
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      const n = new THREE.Mesh(nodeGeo, steel);
      n.position.set(Math.cos(a) * 2.25, Math.sin(a) * 2.25, 0);
      inner.add(n);
    }

    // 3. Core: glossy source + faceted collimator shell + guide rail
    const core = new THREE.Group();
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.95, 64, 64), crimson);
    core.add(sphere);
    const shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.42, 1),
      new THREE.MeshBasicMaterial({ color: 0x8e1328, wireframe: true, transparent: true, opacity: 0.28 })
    );
    core.add(shell);
    const rail = new THREE.Mesh(new THREE.TorusGeometry(1.62, 0.035, 16, 120), graphite);
    rail.rotation.x = Math.PI / 2;
    core.add(rail);
    tilt.add(core);

    // 4. Particle field (normal blending so it reads on white)
    const dotTex = (() => {
      const c = document.createElement("canvas");
      c.width = c.height = 64;
      const ctx = c.getContext("2d")!;
      const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.5, "rgba(255,255,255,0.8)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 64, 64);
      const t = new THREE.CanvasTexture(c);
      t.colorSpace = THREE.SRGBColorSpace;
      return t;
    })();
    const makePoints = (count: number, spread: number, color: number, size: number, opacity: number) => {
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        // Shell distribution keeps the dots around, not inside, the model.
        const r = 3.6 + Math.random() * spread;
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
        pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.8;
        pos[i * 3 + 2] = r * Math.cos(ph) * 0.6;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      return new THREE.Points(
        geo,
        new THREE.PointsMaterial({ color, size, map: dotTex, transparent: true, opacity, depthWrite: false })
      );
    };
    const dustA = makePoints(140, 1.6, 0xc41e3a, 0.09, 0.75);
    const dustB = makePoints(180, 2.2, 0x6b727c, 0.06, 0.55);
    root.add(dustA, dustB);

    // Lights (environment does most of the work)
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(5, 7, 6);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xffd6dc, 1.4);
    rim.position.set(-6, -2, -4);
    scene.add(rim);

    // Fit camera to container
    const RADIUS = 3.55;
    const resize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      const vFov = THREE.MathUtils.degToRad(camera.fov);
      const hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect);
      const fit = Math.min(vFov, hFov);
      // 0.86 frames the gantry ~15% larger; the outer dust is allowed to bleed past the edges.
      camera.position.set(0, 0, (RADIUS / Math.sin(fit / 2)) * 0.86);
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // Pointer
    let px = 0;
    let py = 0;
    let tx = 0;
    let ty = 0;
    const onPointer = (e: PointerEvent) => {
      px = (e.clientX / window.innerWidth) * 2 - 1;
      py = (e.clientY / window.innerHeight) * 2 - 1;
    };
    if (finePointer && !reduce) window.addEventListener("pointermove", onPointer, { passive: true });

    // Render loop, paused while offscreen
    const start = performance.now();
    let raf = 0;
    let visible = true;
    const render = (fixed?: number) => {
      const t = fixed ?? (performance.now() - start) / 1000;
      const intro = Math.min(t / 1.8, 1);
      const ease = 1 - Math.pow(1 - intro, 4);

      tx += (px - tx) * 0.05;
      ty += (py - ty) * 0.05;

      root.scale.setScalar(0.86 + 0.14 * ease);
      tilt.rotation.y = t * 0.08 + tx * 0.35 + (1 - ease) * -0.8;
      tilt.rotation.x = Math.sin(t * 0.06) * 0.08 + ty * 0.2;
      gantry.rotation.z = t * 0.06;
      inner.rotation.z = -t * 0.09;
      core.rotation.y = -t * 0.12;
      shell.rotation.x = t * 0.05;
      const pulse = 1 + Math.sin(t * 1.2) * 0.018;
      sphere.scale.setScalar(pulse);
      dustA.rotation.y = t * 0.025;
      dustB.rotation.y = -t * 0.018;

      renderer.render(scene, camera);
    };
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (visible && !document.hidden) render();
    };

    let io: IntersectionObserver | undefined;
    if (reduce) {
      render(2);
    } else {
      io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { threshold: 0 });
      io.observe(mount);
      loop();
    }
    if (reduce) {
      // Re-render the static frame on resize.
      ro.disconnect();
      const ro2 = new ResizeObserver(() => {
        resize();
        render(2);
      });
      ro2.observe(mount);
      return () => {
        ro2.disconnect();
        dispose();
      };
    }

    function dispose() {
      cancelAnimationFrame(raf);
      io?.disconnect();
      window.removeEventListener("pointermove", onPointer);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
        else mat?.dispose();
      });
      dotTex.dispose();
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    }

    return () => {
      ro.disconnect();
      dispose();
    };
  }, []);

  return <div ref={mountRef} className={className} />;
}
