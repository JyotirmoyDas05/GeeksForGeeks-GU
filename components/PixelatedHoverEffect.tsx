"use client";

import React, { useEffect, useRef, ReactNode } from "react";
import * as THREE from "three";

interface PixelatedHoverEffectProps {
  children: ReactNode;
  intensity?: number;
  pixelSize?: number;
  hoverRadius?: number;
  className?: string;
  style?: React.CSSProperties;
}

interface ShaderUniforms {
  [uniform: string]: THREE.IUniform;
  uTexture: THREE.IUniform;
  uMouse: THREE.IUniform;
  uPrevMouse: THREE.IUniform;
  uIntensity: THREE.IUniform;
  uPixelSize: THREE.IUniform;
  uHoverRadius: THREE.IUniform;
  uResolution: THREE.IUniform;
  uTime: THREE.IUniform;
}

const PixelatedHoverEffect: React.FC<PixelatedHoverEffectProps> = ({
  children,
  intensity = 0.3,
  pixelSize = 20,
  hoverRadius = 0.4,
  className = "",
  style = {},
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const uniformsRef = useRef<ShaderUniforms | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 });
  const [textureReady, setTextureReady] = React.useState(false);

  // Convert DOM content (including SVG) to canvas texture
  const createTextureFromDOM = async (): Promise<THREE.Texture> => {
    return new Promise((resolve, reject) => {
      if (!contentRef.current || !containerRef.current) {
        reject(new Error("Refs not ready"));
        return;
      }

      const container = containerRef.current;
      const content = contentRef.current;

      // Wait for fonts to be loaded BEFORE measuring dimensions
      document.fonts.ready
        .then(() => {
          // Add a small delay to ensure fonts are rendered and layout is settled
          return new Promise<void>((resolveDelay) => {
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                resolveDelay();
              });
            });
          });
        })
        .then(() => {
          // Now measure bbox after fonts are loaded AND layout is settled
          const bbox = container.getBoundingClientRect();
          // Add small padding to prevent edge clipping
          const paddingPx = 27; // Small padding in physical pixels
          const width = (bbox.width + paddingPx) * 2; // High DPI
          const height = (bbox.height) * 2; // High DPI

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");

          if (!ctx) {
            reject(new Error("Could not get 2D context"));
            return;
          }

          // Clear canvas with transparent background
          ctx.clearRect(0, 0, width, height);

          // Clone the content to avoid modifying original
          const clone = content.cloneNode(true) as HTMLElement;
          clone.style.position = "absolute";
          clone.style.left = "-9999px";
          clone.style.top = "-9999px";
          document.body.appendChild(clone);

          // Serialize content to SVG for rendering
          const serializer = new XMLSerializer();
          const contentHTML = clone.innerHTML;

          // Check if content contains SVG
          const svgElements = clone.querySelectorAll("svg");

          if (svgElements.length > 0) {
            // Handle SVG content
            const svgElement = svgElements[0] as SVGSVGElement;
            const svgString = serializer.serializeToString(svgElement);
            const svgBlob = new Blob([svgString], {
              type: "image/svg+xml;charset=utf-8",
            });
            const url = URL.createObjectURL(svgBlob);
            const img = new Image();

            img.onload = () => {
              // Calculate scaling to fit canvas
              const scale = Math.min(width / img.width, height / img.height);
              const x = (width - img.width * scale) / 2;
              const y = (height - img.height * scale) / 2;

              ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
              URL.revokeObjectURL(url);
              document.body.removeChild(clone);

              const texture = new THREE.CanvasTexture(canvas);
              texture.minFilter = THREE.LinearFilter;
              texture.magFilter = THREE.LinearFilter;
              texture.needsUpdate = true;
              resolve(texture);
            };

            img.onerror = () => {
              URL.revokeObjectURL(url);
              document.body.removeChild(clone);
              reject(new Error("Failed to load SVG image"));
            };

            img.src = url;
          } else {
            // Handle text content - properly capture font styles
            const firstChild = content.children[0] as HTMLElement;
            const targetElement = firstChild || content;
            const computedStyle = window.getComputedStyle(targetElement);

            const fontSize = parseFloat(computedStyle.fontSize) * 2; // Scale for DPI
            const fontFamily = computedStyle.fontFamily;
            const fontWeight = computedStyle.fontWeight;
            const fontStyle = computedStyle.fontStyle;
            const letterSpacing = computedStyle.letterSpacing;
            const color = computedStyle.color;
            const textAlign = computedStyle.textAlign as CanvasTextAlign;
            const textContent = content.textContent || "";

            // Fonts are already loaded from the outer promise, so render directly
            ctx.fillStyle = color;
            ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;
            ctx.textBaseline = "top"; // Use top for consistent positioning
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";

            // Parse letter spacing (convert from px/em to number)
            let tracking = 0;
            if (letterSpacing && letterSpacing !== "normal") {
              const letterSpacingValue = parseFloat(letterSpacing);
              // Scale for DPI
              tracking = letterSpacingValue * 2;
            }

            // Draw text
            const lines = textContent.split("\n").filter((line) => line.trim());
            const lineHeight = fontSize * 1.2;
            const totalHeight = lines.length * lineHeight;
            const startY = 0; // Start from top edge

            lines.forEach((line, index) => {
              const text = line.trim();
              const y = startY + index * lineHeight;

              // Calculate text metrics
              const words = text.split(" ");
              let totalTextWidth = 0;

              // Measure total width with letter spacing
              for (let word of words) {
                for (let char of word) {
                  totalTextWidth += ctx.measureText(char).width + tracking;
                }
                // Add space width
                if (word !== words[words.length - 1]) {
                  totalTextWidth += ctx.measureText(" ").width;
                }
              }

              // Determine starting X position based on alignment
              // Add small horizontal padding to prevent left-side clipping
              const horizontalPadding = 16; // Scaled for DPI (8px * 2)
              let x = horizontalPadding;
              if (textAlign === "right") {
                // Right align: position from the right edge with padding
                x = width - totalTextWidth - horizontalPadding;
              } else if (textAlign === "center") {
                x = (width - totalTextWidth) / 2;
              }

              // Draw text with proper letter spacing
              for (let word of words) {
                for (let char of word) {
                  ctx.fillText(char, x, y);
                  x += ctx.measureText(char).width + tracking;
                }
                // Add space between words
                if (word !== words[words.length - 1]) {
                  x += ctx.measureText(" ").width;
                }
              }
            });

            document.body.removeChild(clone);

            const texture = new THREE.CanvasTexture(canvas);
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.needsUpdate = true;
            resolve(texture);
          }
        })
        .catch((err) => {
          console.error("Font loading error:", err);
          reject(err);
        });
    });
  };

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    let mounted = true;

    const initScene = async () => {
      try {
        const container = containerRef.current;
        if (!container) return;

        const width = container.clientWidth;
        const height = container.clientHeight;

        // Validate dimensions to prevent NaN errors
        if (!width || !height || width <= 0 || height <= 0) {
          console.warn("Invalid container dimensions:", { width, height });
          return;
        }

        const aspect = width / height;

        // Create scene
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // Create camera
        const camera = new THREE.OrthographicCamera(
          -aspect,
          aspect,
          1,
          -1,
          0.1,
          10
        );
        camera.position.z = 1;
        cameraRef.current = camera;

        // Create renderer
        const renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        rendererRef.current = renderer;

        canvasRef.current = renderer.domElement;
        canvasRef.current.style.position = "absolute";
        canvasRef.current.style.top = "0";
        canvasRef.current.style.left = "0";
        canvasRef.current.style.width = "100%";
        canvasRef.current.style.height = "100%";
        canvasRef.current.style.pointerEvents = "none";
        canvasRef.current.style.zIndex = "10";
        container.appendChild(renderer.domElement);

        // Create texture from DOM content
        const texture = await createTextureFromDOM();

        // Mark texture as ready so we can hide the original content
        setTextureReady(true);

        // Shader uniforms
        const uniforms: ShaderUniforms = {
          uTexture: { value: texture },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uPrevMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uIntensity: { value: intensity },
          uPixelSize: { value: pixelSize },
          uHoverRadius: { value: hoverRadius },
          uResolution: { value: new THREE.Vector2(width, height) },
          uTime: { value: 0 },
        };
        uniformsRef.current = uniforms;

        // Vertex shader
        const vertexShader = `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `;

        // Fragment shader with pixelation and distortion
        const fragmentShader = `
          uniform sampler2D uTexture;
          uniform vec2 uMouse;
          uniform vec2 uPrevMouse;
          uniform float uIntensity;
          uniform float uPixelSize;
          uniform float uHoverRadius;
          uniform vec2 uResolution;
          uniform float uTime;
          varying vec2 vUv;

          void main() {
            vec2 uv = vUv;
            
            // Calculate distance from mouse
            float dist = distance(uv, uMouse);
            
            // Create smooth hover effect
            float hoverEffect = smoothstep(uHoverRadius, 0.0, dist);
            
            // Calculate motion direction
            vec2 direction = uMouse - uPrevMouse;
            float motionStrength = length(direction) * 10.0;
            
            // Apply pixelation based on hover
            vec2 pixelSize = vec2(uPixelSize) / uResolution;
            vec2 pixelatedUV = floor(uv / pixelSize) * pixelSize + pixelSize * 0.5;
            
            // Mix between original and pixelated based on effect strength
            float effectStrength = hoverEffect * uIntensity;
            vec2 finalUV = mix(uv, pixelatedUV, effectStrength);
            
            // Add distortion based on mouse movement
            vec2 distortion = direction * hoverEffect * motionStrength * uIntensity;
            finalUV += distortion;
            
            // Sample texture
            vec4 color = texture2D(uTexture, finalUV);
            
            // Add slight chromatic aberration on hover
            if (effectStrength > 0.1) {
              float aberration = 0.002 * effectStrength;
              vec4 colorR = texture2D(uTexture, finalUV + vec2(aberration, 0.0));
              vec4 colorB = texture2D(uTexture, finalUV - vec2(aberration, 0.0));
              color.r = colorR.r;
              color.b = colorB.b;
            }
            
            gl_FragColor = color;
          }
        `;

        // Create material
        const material = new THREE.ShaderMaterial({
          uniforms,
          vertexShader,
          fragmentShader,
          transparent: true,
        });

        // Create geometry and mesh with validation
        const geometryWidth = 2 * aspect;
        const geometryHeight = 2;

        // Ensure valid dimensions
        if (
          isNaN(geometryWidth) ||
          isNaN(geometryHeight) ||
          geometryWidth <= 0 ||
          geometryHeight <= 0
        ) {
          console.error("Invalid geometry dimensions:", {
            geometryWidth,
            geometryHeight,
            aspect,
          });
          return;
        }

        const geometry = new THREE.PlaneGeometry(geometryWidth, geometryHeight);
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        meshRef.current = mesh;

        // Animation loop
        const animate = () => {
          if (!mounted) return;

          // Smooth easing for mouse movement
          mouseRef.current.x +=
            (targetMouseRef.current.x - mouseRef.current.x) * 0.1;
          mouseRef.current.y +=
            (targetMouseRef.current.y - mouseRef.current.y) * 0.1;

          if (uniformsRef.current) {
            uniformsRef.current.uPrevMouse.value.copy(
              uniformsRef.current.uMouse.value
            );
            uniformsRef.current.uMouse.value.set(
              mouseRef.current.x,
              mouseRef.current.y
            );
            uniformsRef.current.uTime.value += 0.01;
          }

          if (rendererRef.current && sceneRef.current && cameraRef.current) {
            rendererRef.current.render(sceneRef.current, cameraRef.current);
          }

          animationFrameRef.current = requestAnimationFrame(animate);
        };
        animate();
      } catch (error) {
        console.error("Failed to initialize PixelatedHoverEffect:", error);
      }
    };

    initScene();

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      targetMouseRef.current.x = (e.clientX - rect.left) / rect.width;
      targetMouseRef.current.y = 1.0 - (e.clientY - rect.top) / rect.height;
    };

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current)
        return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      // Validate dimensions
      if (!width || !height || width <= 0 || height <= 0) {
        return;
      }

      const aspect = width / height;

      cameraRef.current.left = -aspect;
      cameraRef.current.right = aspect;
      cameraRef.current.top = 1;
      cameraRef.current.bottom = -1;
      cameraRef.current.updateProjectionMatrix();

      rendererRef.current.setSize(width, height);

      if (uniformsRef.current) {
        uniformsRef.current.uResolution.value.set(width, height);
      }

      if (meshRef.current) {
        const geometryWidth = 2 * aspect;
        const geometryHeight = 2;

        // Validate before creating new geometry
        if (
          !isNaN(geometryWidth) &&
          !isNaN(geometryHeight) &&
          geometryWidth > 0 &&
          geometryHeight > 0
        ) {
          (meshRef.current.geometry as THREE.PlaneGeometry).dispose();
          meshRef.current.geometry = new THREE.PlaneGeometry(
            geometryWidth,
            geometryHeight
          );
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      mounted = false;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (meshRef.current) {
        meshRef.current.geometry.dispose();
        (meshRef.current.material as THREE.Material).dispose();
      }

      if (uniformsRef.current?.uTexture.value) {
        uniformsRef.current.uTexture.value.dispose();
      }

      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (canvasRef.current && containerRef.current) {
          containerRef.current.removeChild(canvasRef.current);
        }
      }

      if (sceneRef.current) {
        sceneRef.current.clear();
      }
    };
  }, [children, intensity, pixelSize, hoverRadius]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        ...style,
      }}
    >
      {/* Content that will be captured by canvas - hidden once texture is ready */}
      <div
        ref={contentRef}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          zIndex: 0,
          opacity: textureReady ? 0 : 1,
          pointerEvents: "none",
          transition: "opacity 0.3s ease",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PixelatedHoverEffect;
