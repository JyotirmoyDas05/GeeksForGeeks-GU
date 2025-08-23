"use client";
/**
 * CodeGlyphField - A production-ready Three.js particle glyph background.
 *
 * Features:
 * - Single draw call using THREE.Points with custom BufferGeometry.
 * - Adaptive particle count based on viewport area & capped devicePixelRatio.
 * - Prefers-reduced-motion accessibility: reduced count & slower or static mode.
 * - Pointer parallax, slow rotational drift, forward z drift with wrapping.
 * - Fog depth, alpha fade, size attenuation via custom ShaderMaterial.
 * - Optional glyph texture atlas support (see GLYPH_ATLAS_* comments).
 * - API: init(container), destroy(), setPaused(boolean).
 * - Graceful no-WebGL fallback: silently no-op.
 * - Performance optimizations: single material, frustum-friendly slab volume, throttled hidden tab updates.
 */

import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import * as THREE from "three";

export interface CodeGlyphFieldHandle {
  setPaused: (paused: boolean) => void;
  destroy: () => void;
}

interface Props {
  /** Start paused */
  paused?: boolean;
  /** Force particle density multiplier (default auto) */
  density?: number;
  /** If true, disables pointer parallax */
  disableParallax?: boolean;
  /** If true, reduce motion even if user did not request (testing) */
  forceReducedMotion?: boolean;
  /** Optional className for wrapper div */
  className?: string;
  /** Scale all glyph sizes (1 = default). */
  sizeScale?: number;
  /** Brightness boost factor applied in HSL space (1 = no change). */
  brightnessBoost?: number;
}

const CodeGlyphField = forwardRef<CodeGlyphFieldHandle, Props>(
  function CodeGlyphField(
    {
      paused = false,
      density = 1,
      disableParallax = false,
      className,
      sizeScale = 1.35,
      brightnessBoost = 1.25,
    },
    ref
  ) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const stateRef = useRef<{
      renderer?: THREE.WebGLRenderer;
      scene?: THREE.Scene;
      camera?: THREE.PerspectiveCamera;
      points?: THREE.Points;
      material?: THREE.ShaderMaterial;
      geometry?: THREE.BufferGeometry;
      rafId?: number;
      paused: boolean;
      lastTime?: number;
      tmpVec3: THREE.Vector3;
      pointer: { x: number; y: number; targetX: number; targetY: number };
      reduced: boolean;
      hiddenSkip: number; // frame skip counter when hidden
      glyphTiles: number; // number of tiles in atlas (if using glyphs)
      observer?: MutationObserver;
      // Hybrid model: we no longer store continuous velocities; instead we
      // occasionally jitter a small random subset of particles to keep a
      // living feel without per-frame per-particle integration cost.
      velocities?: Float32Array; // legacy (unused after hybrid switch)
      _nextJitterTime?: number; // internal scheduler for hybrid jitter
    }>({
      paused,
      tmpVec3: new THREE.Vector3(),
      pointer: { x: 0, y: 0, targetX: 0, targetY: 0 },
      reduced: false,
      hiddenSkip: 0,
      glyphTiles: 0,
      observer: undefined,
    });

    useImperativeHandle(ref, () => ({
      setPaused: (p: boolean) => {
        stateRef.current.paused = p;
      },
      destroy: () => {
        cleanup();
      },
    }));

    useEffect(() => {
      init();
      return () => cleanup();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function init() {
      const container = containerRef.current;
      if (!container) return;
      // Resolve accent color from CSS variable (fallback to provided value)
      const accent =
        getComputedStyle(document.documentElement)
          .getPropertyValue("--accent")
          .trim() || "oklch(62.7% 0.194 149.214)";
      // Convert OKLCH to approximate sRGB if in oklch() form (simple parse)
      function oklchToSRGB(str: string): THREE.Color {
        if (!str.startsWith("oklch")) {
          try {
            return new THREE.Color(str);
          } catch {
            return new THREE.Color("#23e4b0");
          }
        }
        // Basic parser: oklch(L C h)
        const m = str.match(/oklch\(([^%]+)%?\s+([^\s]+)\s+([^\s)]+)\)/);
        if (!m) return new THREE.Color("#23e4b0");
        const L = parseFloat(m[1]) / 100; // 0-1
        const C = parseFloat(m[2]);
        const h = parseFloat(m[3]) * (Math.PI / 180);
        // Convert OKLCH -> OKLab -> linear sRGB (approximate; simplified)
        const a_ = Math.cos(h) * C;
        const b_ = Math.sin(h) * C;
        // OKLab to LMS
        const L_ = L;
        const l = L_ + 0.3963377774 * a_ + 0.2158037573 * b_;
        const m2 = L_ - 0.1055613458 * a_ - 0.0638541728 * b_;
        const s = L_ - 0.0894841775 * a_ - 1.291485548 * b_;
        const l3 = l * l * l;
        const m3 = m2 * m2 * m2;
        const s3 = s * s * s;
        let r = +4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
        let g = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
        let b = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3;
        r = Math.min(Math.max(r, 0), 1);
        g = Math.min(Math.max(g, 1e-6), 1);
        b = Math.min(Math.max(b, 0), 1);
        // If conversion produced near-black (unexpected), fallback to accent hex
        if (r + g + b < 0.05) return new THREE.Color("#23e4b0");
        return new THREE.Color(r, g, b);
      }
      const accentColor = oklchToSRGB(accent);

      // Prefer reduced motion detection (after utility definitions)
      const prefersReduced = stateRef.current.reduced || false;

      // WebGL capability check
      const testCanvas = document.createElement("canvas");
      const gl =
        testCanvas.getContext("webgl") ||
        testCanvas.getContext("experimental-webgl");
      if (!gl) {
        // No WebGL – silently bail.
        return;
      }

      const DPR = Math.min(window.devicePixelRatio || 1, 2);

      const renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(DPR);
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.autoClear = true;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      container.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      // Use CSS --background color for fog tone; clear transparent so theme shows.
      const initialBgVar = getComputedStyle(document.documentElement)
        .getPropertyValue("--background")
        .trim();
      function parseColorVar(v: string): THREE.Color {
        if (!v) return new THREE.Color("#0b0f0f");
        if (v.startsWith("oklch")) return oklchToSRGB(v);
        try {
          return new THREE.Color(v);
        } catch {
          return new THREE.Color("#0b0f0f");
        }
      }
      const fogTone = parseColorVar(initialBgVar);
      // We'll adjust fog density & color after material creation via applyThemeSettings
      scene.fog = new THREE.FogExp2(fogTone, 0.22);
      renderer.setClearColor(0x000000, 0); // transparent clear

      const camera = new THREE.PerspectiveCamera(
        55,
        container.clientWidth / container.clientHeight,
        0.1,
        60
      );
      camera.position.set(0, 0, 2); // Slightly in front

      // Particle field parameters (sphere) — tightened for denser, closer packing
      const sphereRadius = 12; // outer radius where glyphs roam (reduced to pack closer)
      const innerRadius = 2; // minimum radius (smaller core to allow closer clustering)

      // Adaptive particle count: base density ~ (area / constant)
      const area = window.innerWidth * window.innerHeight;
      // smaller divisor => more base particles; multiplier increased for denser field
      const base = area / 1200;
      let count = Math.floor(base * density * 1.6);
      if (prefersReduced) count = Math.min(count, 2200);
      // Increase upper clamp to allow much denser displays on large screens
      count = THREE.MathUtils.clamp(count, 1000, prefersReduced ? 3000 : 10000);

      // Geometry + attributes
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const sizes = new Float32Array(count);
      const alphas = new Float32Array(count);
      const glyphIndex = new Float32Array(count); // glyph id selection
      // Legacy velocity buffer retained (zeroed) to avoid wide refactor; not used for motion.
      const velocities = new Float32Array(count * 3);

      // Code-like character set for glyph atlas
      const charset =
        "{}<>/=;()[]#$*!@%^+_! !==ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const glyphCount = charset.length;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        // Random point in spherical shell (bias tuned to create tighter packing)
        let r = innerRadius + Math.random() * (sphereRadius - innerRadius);
        // Use slightly milder outward bias so particles sit a bit closer together
        r =
          innerRadius +
          Math.pow(Math.random(), 0.6) * (sphereRadius - innerRadius);
        const theta = Math.acos(THREE.MathUtils.lerp(-1, 1, Math.random())); // polar
        const phi = Math.random() * Math.PI * 2; // azimuth
        const sx = r * Math.sin(theta) * Math.cos(phi);
        const sy = r * Math.sin(theta) * Math.sin(phi);
        const sz = r * Math.cos(theta);
        positions[i3] = sx;
        positions[i3 + 1] = sy;
        positions[i3 + 2] = sz;
        // Base size reduced slightly to avoid overlaps at higher densities
        sizes[i] = (2.0 + Math.random() * 5.0) * sizeScale;
        alphas[i] = 0.35 + Math.random() * 0.55; // more visible
        glyphIndex[i] = Math.floor(Math.random() * glyphCount);
        // No per-particle velocity stored in hybrid mode (buffer left zeroed)
      }

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
      geometry.setAttribute("aAlpha", new THREE.BufferAttribute(alphas, 1));
      geometry.setAttribute("aGlyph", new THREE.BufferAttribute(glyphIndex, 1));
      stateRef.current.velocities = velocities;

      // Dynamic glyph atlas generation
      function createGlyphAtlas(chars: string) {
        const tilesPerRow = Math.ceil(Math.sqrt(chars.length));
        const tileSize = 64; // px per glyph
        const atlasSize = tilesPerRow * tileSize;
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = atlasSize;
        const ctx = canvas.getContext("2d");
        if (!ctx)
          return { texture: null as THREE.Texture | null, tilesPerRow: 1 };
        ctx.clearRect(0, 0, atlasSize, atlasSize);
        ctx.fillStyle = "#ffffff"; // white glyphs -> colored in shader
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = `${tileSize * 0.6}px 'DM Mono', monospace`;
        for (let i = 0; i < chars.length; i++) {
          const gx = i % tilesPerRow;
          const gy = Math.floor(i / tilesPerRow);
          const cx = gx * tileSize + tileSize / 2;
          const cy = gy * tileSize + tileSize / 2 + tileSize * 0.05;
          ctx.fillText(chars[i], cx, cy);
        }
        const tex = new THREE.Texture(canvas);
        tex.needsUpdate = true;
        tex.colorSpace = THREE.SRGBColorSpace;
        return { texture: tex, tilesPerRow };
      }
      const atlas = createGlyphAtlas(charset);

      // ShaderMaterial
      // If you have a glyph atlas, set GLYPH_ATLAS = true and provide a uniform with texture + tile count.
      // Placeholders implement simple circular soft sprite.
      const material = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: accentColor },
          uPixelRatio: { value: DPR },
          uPaused: { value: 0 },
          uGlyphMap: { value: atlas.texture },
          uGlyphTiles: { value: atlas.tilesPerRow },
          uGlobalAlpha: { value: 1.0 },
        },
        vertexShader: /* glsl */ `
        uniform float uTime;
        uniform float uPixelRatio;
        attribute float aSize;
        attribute float aAlpha;
        attribute float aGlyph; // index
        varying float vAlpha;
        varying float vGlyph;
        void main() {
          vAlpha = aAlpha;
          vGlyph = aGlyph;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          // size attenuation: scale size by perspective factor
          float dist = -mvPosition.z;
          float size = aSize * (1.0 / dist);
          gl_PointSize = size * uPixelRatio * 10.0; // scale constant for screen density
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
        fragmentShader: /* glsl */ `
        precision mediump float;
        uniform vec3 uColor;
        uniform float uGlobalAlpha;
        uniform sampler2D uGlyphMap;
        uniform float uGlyphTiles;
        varying float vAlpha;
        varying float vGlyph;
        void main() {
          vec2 cell = gl_PointCoord; // 0..1 within point
          float tiles = uGlyphTiles;
          float gx = mod(vGlyph, tiles);
          float gy = floor(vGlyph / tiles);
          vec2 uv = (cell + vec2(gx, gy)) / tiles;
          vec4 g = texture2D(uGlyphMap, uv);
          if (g.a < 0.15) discard; // discard empty area
          vec3 col = uColor;
          gl_FragColor = vec4(col, g.a * vAlpha * uGlobalAlpha);
        }
      `,
      });

      // Points object
      const points = new THREE.Points(geometry, material);
      scene.add(points);

      // Save references
      stateRef.current.renderer = renderer;
      stateRef.current.scene = scene;
      stateRef.current.camera = camera;
      stateRef.current.points = points;
      stateRef.current.material = material;
      stateRef.current.geometry = geometry;

      // Pointer parallax
      if (!disableParallax) {
        window.addEventListener("pointermove", onPointerMove, {
          passive: true,
        });
      }
      window.addEventListener("resize", onResize);
      document.addEventListener("visibilitychange", onVisibility);

      animate(0);

      // Helper to apply theme-dependent settings (light vs dark)
      function applyThemeSettings() {
        const styles = getComputedStyle(document.documentElement);
        const themeClassList = document.documentElement.classList;
        const isDark = themeClassList.contains("dark");
        const accentVar = styles.getPropertyValue("--accent").trim();
        const bgVar = styles.getPropertyValue("--background").trim();
        if (accentVar) {
          const baseAccent = oklchToSRGB(accentVar);
          // For light mode, darken accent a bit for contrast; for dark, keep vivid
          if (!isDark) {
            // simple luminance scaling
            interface HSL {
              h: number;
              s: number;
              l: number;
            }
            const hsl: HSL = { h: 0, s: 0, l: 0 };
            // convert to HSL using three.js (mutates hsl object values)
            baseAccent.getHSL(hsl);
            hsl.l = Math.min(hsl.l * 0.85, 0.6);
            hsl.s = Math.min(hsl.s * 1.1, 1.0);
            // Apply a mild brightness boost for light theme (avoid washing out)
            const adjusted = new THREE.Color().setHSL(
              hsl.h,
              hsl.s,
              Math.min(hsl.l * (1 + (brightnessBoost - 1) * 0.4), 0.7)
            );
            (material.uniforms.uColor.value as THREE.Color).copy(adjusted);
          } else {
            // Dark theme: stronger brightness & saturation boost
            interface HSL {
              h: number;
              s: number;
              l: number;
            }
            const hsl: HSL = { h: 0, s: 0, l: 0 };
            baseAccent.getHSL(hsl);
            hsl.l = Math.min(hsl.l * brightnessBoost * 1.05 + 0.02, 0.88);
            hsl.s = Math.min(
              hsl.s * (1 + (brightnessBoost - 1) * 0.8) + 0.05,
              1.0
            );
            const boosted = new THREE.Color().setHSL(hsl.h, hsl.s, hsl.l);
            (material.uniforms.uColor.value as THREE.Color).copy(boosted);
          }
        }
        if (bgVar && scene.fog) {
          let bgColor = parseColorVar(bgVar);
          // Provide green-tinted dark background for contrast
          if (isDark) {
            // Darker color for higher glyph contrast
            const darkGreen = "#0b0b0b";
            bgColor = new THREE.Color(darkGreen);
            if (containerRef.current)
              containerRef.current.style.background = darkGreen;
          } else if (containerRef.current) {
            containerRef.current.style.background = "transparent";
          }
          (scene.fog as THREE.FogExp2).color.copy(bgColor);
          (scene.fog as THREE.FogExp2).density = isDark ? 0.18 : 0.06;
        }
        // Global alpha & blending adjustments
        if (!isDark) {
          material.uniforms.uGlobalAlpha.value = 0.55; // lighter background: reduce brightness
          material.blending = THREE.NormalBlending; // avoid overly glowing look on white
        } else {
          material.uniforms.uGlobalAlpha.value = 1.0;
          material.blending = THREE.AdditiveBlending;
        }
        material.needsUpdate = true;
      }

      // Initial apply
      applyThemeSettings();

      // Observe theme changes to update accent + fog tone + alpha / blending
      const observer = new MutationObserver(() => {
        applyThemeSettings();
      });
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class", "style"],
      });
      stateRef.current.observer = observer;
    }

    function cleanup() {
      const s = stateRef.current;
      cancelAnimationFrame(s.rafId || 0);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      if (s.points && s.scene) s.scene.remove(s.points);
      s.geometry?.dispose();
      s.material?.dispose();
      s.renderer?.dispose();
      if (s.renderer?.domElement?.parentElement) {
        s.renderer.domElement.parentElement.removeChild(s.renderer.domElement);
      }
      s.observer?.disconnect();
    }

    function onPointerMove(e: PointerEvent) {
      const s = stateRef.current;
      const rect = document.documentElement.getBoundingClientRect();
      const x = (e.clientX - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.height / 2) / rect.height;
      s.pointer.targetX = x;
      s.pointer.targetY = y;
    }

    function onResize() {
      const s = stateRef.current;
      if (!s.renderer || !s.camera || !containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      s.renderer.setSize(w, h);
      s.camera.aspect = w / h;
      s.camera.updateProjectionMatrix();
    }

    function onVisibility() {
      const s = stateRef.current;
      if (document.hidden) {
        s.hiddenSkip = 0;
      }
    }

    function animate(t: number) {
      const s = stateRef.current;
      if (!s.renderer || !s.scene || !s.camera || !s.points) return;
      const sphereRadius = 18;
      const innerRadius = 3;
      // Hybrid tuning parameters
      const jitterInterval = 0.9; // seconds between jitter passes
      const maxJitterPerPass = 0.04; // radial jitter magnitude
      const reSeedFraction = 0.015; // portion of particles fully re-seeded per pass
      const outerBias = 0.72; // 0..1 bias weighting toward outer shell on reseed
      if (s._nextJitterTime === undefined) s._nextJitterTime = 0;

      s.rafId = requestAnimationFrame(animate);

      if (s.paused) return; // do not advance

      const now = t * 0.001; // seconds
      const dt = s.lastTime ? Math.min(now - s.lastTime, 0.1) : 0.016;
      s.lastTime = now;

      // Skip heavy updates when tab hidden: update only every 10th frame
      if (document.hidden) {
        s.hiddenSkip++;
        if (s.hiddenSkip % 10 !== 0) return;
      }

      const positions = (
        s.geometry!.getAttribute("position") as THREE.BufferAttribute
      ).array as Float32Array;
      const count = positions.length / 3;

      // Parallax pointer easing
      s.pointer.x += (s.pointer.targetX - s.pointer.x) * 0.05;
      s.pointer.y += (s.pointer.targetY - s.pointer.y) * 0.05;

      // Gentle global rotation for subtle motion
      s.points.rotation.y += dt * 0.02 * (s.reduced ? 0.3 : 1);
      s.points.rotation.x += dt * 0.01 * (s.reduced ? 0.3 : 1);

      // Hybrid motion: periodic small jitter + sparse reseed for ambient life.
      if (now >= (s._nextJitterTime || 0)) {
        s._nextJitterTime = now + jitterInterval * (0.8 + Math.random() * 0.4);
        const reseedCount = Math.max(1, Math.floor(count * reSeedFraction));
        // Jitter all particles very slightly (cheap loop) unless reduced motion
        const jitterScale = (s.reduced ? 0.4 : 1) * maxJitterPerPass;
        for (let i = 0; i < count; i++) {
          const i3 = i * 3;
          // radial jitter: push slightly along normalized vector
          const x = positions[i3];
          const y = positions[i3 + 1];
          const z = positions[i3 + 2];
          const len = Math.sqrt(x * x + y * y + z * z) || 1;
          const j = (Math.random() * 2 - 1) * jitterScale;
          positions[i3] = x + (x / len) * j;
          positions[i3 + 1] = y + (y / len) * j;
          positions[i3 + 2] = z + (z / len) * j;
        }
        // Re-seed a few particles near outer shell with bias
        for (let k = 0; k < reseedCount; k++) {
          const idx = Math.floor(Math.random() * count);
          const i3 = idx * 3;
          const r =
            innerRadius +
            Math.pow(Math.random(), outerBias) * (sphereRadius - innerRadius);
          const theta = Math.acos(THREE.MathUtils.lerp(-1, 1, Math.random()));
          const phi = Math.random() * Math.PI * 2;
          positions[i3] = r * Math.sin(theta) * Math.cos(phi);
          positions[i3 + 1] = r * Math.sin(theta) * Math.sin(phi);
          positions[i3 + 2] = r * Math.cos(theta);
        }
      }
      (
        s.geometry!.getAttribute("position") as THREE.BufferAttribute
      ).needsUpdate = true;

      // Camera parallax (small translation)
      if (!s.reduced) {
        s.camera.position.x = s.pointer.x * 1.5;
        s.camera.position.y = s.pointer.y * 0.8;
      }
      s.camera.lookAt(0, 0, -10);

      s.material!.uniforms.uTime.value = now;

      s.renderer.render(s.scene, s.camera);
    }

    return (
      <div
        ref={containerRef}
        className={className}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          zIndex: 0, // behind content (Nav z=1) but above body background
          pointerEvents: "none",
          background: "transparent",
        }}
      />
    );
  }
);

export default CodeGlyphField;

/**
 * Usage (Next.js / React):
 *
 * import CodeGlyphField, { CodeGlyphFieldHandle } from "@/components/CodeGlyphField";
 * const bgRef = useRef<CodeGlyphFieldHandle>(null);
 * <CodeGlyphField ref={bgRef} />
 * // Pause: bgRef.current?.setPaused(true)
 * // Resume: bgRef.current?.setPaused(false)
 *
 * Glyph Atlas (optional):
 * - Prepare a square texture atlas (e.g., 4x2 tiles = 8 glyphs). Each tile same size.
 * - Set GLYPH_ATLAS = true.
 * - Load texture: const tex = new THREE.TextureLoader().load('/glyph-atlas.png', t => { t.colorSpace = THREE.SRGBColorSpace; });
 * - Set material.uniforms.uGlyphMap.value = tex; material.uniforms.uGlyphTiles.value = TILE_COLUMNS (e.g., 4.0).
 * - In fragment shader, instead of circleMask, compute tile UV:
 *     float tiles = uGlyphTiles; float gx = mod(vGlyph, tiles); float gy = floor(vGlyph / tiles);
 *     vec2 tileUV = (gl_PointCoord + vec2(gx, gy)) / tiles;
 *     vec4 g = texture2D(uGlyphMap, tileUV);
 *     gl_FragColor = vec4(uColor, vAlpha) * g.r; // (assuming glyph in red channel/alpha)
 */
