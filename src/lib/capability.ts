export type SceneTier = "none" | "static" | "low" | "high";

/** Capability-based quality tier for the hero scene. No user-agent sniffing. */
export function detectSceneTier(): SceneTier {
  if (typeof window === "undefined") return "none";
  let gl: WebGLRenderingContext | WebGL2RenderingContext | null = null;
  try {
    const canvas = document.createElement("canvas");
    gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
  } catch {
    gl = null;
  }
  if (!gl) return "none";
  // Software rasterizers (no GPU) can't hold a continuous render loop; use the static poster instead.
  const info = gl.getExtension("WEBGL_debug_renderer_info");
  const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
  gl.getExtension("WEBGL_lose_context")?.loseContext();
  if (/swiftshader|llvmpipe|softpipe|software/i.test(renderer)) return "none";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "static";
  const cores = navigator.hardwareConcurrency ?? 4;
  const narrow = window.innerWidth < 768;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  if (cores <= 4 || narrow || coarse) return "low";
  return "high";
}
