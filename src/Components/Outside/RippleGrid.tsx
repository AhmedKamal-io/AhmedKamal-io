"use client";

import { useRef, useEffect } from "react";

type Props = {
  enableRainbow?: boolean;
  gridColor?: string;
  rippleIntensity?: number;
  gridSize?: number;
  gridThickness?: number;
  fadeDistance?: number;
  vignetteStrength?: number;
  glowIntensity?: number;
  opacity?: number;
  gridRotation?: number;
};

const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255,
      ]
    : [1, 1, 1];
};

const RippleGrid: React.FC<Props> = ({
  enableRainbow = false,
  gridColor = "#ffffff",
  rippleIntensity = 0.05,
  gridSize = 10.0,
  gridThickness = 15.0,
  fadeDistance = 1.5,
  vignetteStrength = 2.0,
  glowIntensity = 0.1,
  opacity = 1.0,
  gridRotation = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const loadOglAndInit = async () => {
      const { Renderer, Program, Triangle, Mesh } = await import("ogl");

      const vert = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

      const frag = `
precision highp float;
uniform float iTime;
uniform vec2 iResolution;
uniform bool enableRainbow;
uniform vec3 gridColor;
uniform float rippleIntensity;
uniform float gridSize;
uniform float gridThickness;
uniform float fadeDistance;
uniform float vignetteStrength;
uniform float glowIntensity;
uniform float opacity;
uniform float gridRotation;

varying vec2 vUv;

float pi = 3.141592;

mat2 rotate(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat2(c, -s, s, c);
}

void main() {
  vec2 uv = vUv * 2.0 - 1.0;
  uv.x *= iResolution.x / iResolution.y;

  if (gridRotation != 0.0) {
    uv = rotate(gridRotation * pi / 180.0) * uv;
  }

  float dist = length(uv);
  float func = sin(pi * (iTime - dist));
  vec2 rippleUv = uv + uv * func * rippleIntensity;

  vec2 a = sin(gridSize * 0.5 * pi * rippleUv - pi / 2.0);
  vec2 b = abs(a);

  float aaWidth = 0.5;
  vec2 smoothB = vec2(
    smoothstep(0.0, aaWidth, b.x),
    smoothstep(0.0, aaWidth, b.y)
  );

  vec3 color = vec3(0.0);
  color += exp(-gridThickness * smoothB.x * (0.8 + 0.5 * sin(pi * iTime)));
  color += exp(-gridThickness * smoothB.y);
  color += 0.5 * exp(-(gridThickness / 4.0) * sin(smoothB.x));
  color += 0.5 * exp(-(gridThickness / 3.0) * smoothB.y);

  if (glowIntensity > 0.0) {
    color += glowIntensity * exp(-gridThickness * 0.5 * smoothB.x);
    color += glowIntensity * exp(-gridThickness * 0.5 * smoothB.y);
  }

  float ddd = exp(-2.0 * clamp(pow(dist, fadeDistance), 0.0, 1.0));

  vec2 vignetteCoords = vUv - 0.5;
  float vignetteDistance = length(vignetteCoords);
  float vignette = 1.0 - pow(vignetteDistance * 2.0, vignetteStrength);
  vignette = clamp(vignette, 0.0, 1.0);

  vec3 t;
  if (enableRainbow) {
    t = vec3(
      uv.x * 0.5 + 0.5 * sin(iTime),
      uv.y * 0.5 + 0.5 * cos(iTime),
      pow(cos(iTime), 4.0)
    ) + 0.5;
  } else {
    t = gridColor;
  }

  float finalFade = ddd * vignette;
  float alpha = length(color) * finalFade * opacity;
  gl_FragColor = vec4(color * t * finalFade * opacity, alpha);
}`;

      const renderer = new Renderer({
        dpr: Math.min(window.devicePixelRatio, 2),
        alpha: true,
      });
      const gl = renderer.gl;
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.canvas.style.width = "100%";
      gl.canvas.style.height = "100%";
      gl.canvas.style.display = "block";

      containerRef.current?.appendChild(gl.canvas);

      const uniforms = {
        iTime: { value: 0 },
        iResolution: { value: [1, 1] },
        enableRainbow: { value: enableRainbow },
        gridColor: { value: hexToRgb(gridColor) },
        rippleIntensity: { value: rippleIntensity },
        gridSize: { value: gridSize },
        gridThickness: { value: gridThickness },
        fadeDistance: { value: fadeDistance },
        vignetteStrength: { value: vignetteStrength },
        glowIntensity: { value: glowIntensity },
        opacity: { value: opacity },
        gridRotation: { value: gridRotation },
      };

      const geometry = new Triangle(gl);
      const program = new Program(gl, {
        vertex: vert,
        fragment: frag,
        uniforms,
      });
      const mesh = new Mesh(gl, { geometry, program });

      const resize = () => {
        if (!containerRef.current) return;
        const { clientWidth: w, clientHeight: h } = containerRef.current;
        renderer.setSize(w, h);
        uniforms.iResolution.value = [w, h];
      };

      const render = (t: number) => {
        uniforms.iTime.value = t * 0.001;
        renderer.render({ scene: mesh });
        animationFrameId.current = requestAnimationFrame(render);
      };

      resize();
      window.addEventListener("resize", resize);
      animationFrameId.current = requestAnimationFrame(render);

      // Cleanup
      return () => {
        if (animationFrameId.current)
          cancelAnimationFrame(animationFrameId.current);
        window.removeEventListener("resize", resize);
        renderer.gl.getExtension("WEBGL_lose_context")?.loseContext();
        containerRef.current?.removeChild(gl.canvas);
      };
    };

    loadOglAndInit();
  }, [
    enableRainbow,
    gridColor,
    rippleIntensity,
    gridSize,
    gridThickness,
    fadeDistance,
    vignetteStrength,
    glowIntensity,
    opacity,
    gridRotation,
  ]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden"
    />
  );
};

export default RippleGrid;
