import { useEffect, useRef, useState } from "react";

// Tiny value-noise world generator, echoing the game's noise-built terrain.
function makeNoise(seed: number) {
  const rand = (x: number, y: number) => {
    const s = Math.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453;
    return s - Math.floor(s);
  };
  const smooth = (t: number) => t * t * (3 - 2 * t);
  const n = (x: number, y: number) => {
    const xi = Math.floor(x), yi = Math.floor(y);
    const xf = smooth(x - xi), yf = smooth(y - yi);
    const a = rand(xi, yi), b = rand(xi + 1, yi), c = rand(xi, yi + 1), d = rand(xi + 1, yi + 1);
    return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf;
  };
  return (x: number, y: number) => n(x, y) * 0.6 + n(x * 2, y * 2) * 0.3 + n(x * 4, y * 4) * 0.1;
}

const W = 64, H = 40;
const COLORS = {
  deep: "#2a1f6b", water: "#4b3fb3", sand: "#e8c98a", grass: "#4f9a5a", grass2: "#3f8450", tree: "#22573a",
};

export function TerrainPreview() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [seed, setSeed] = useState(1337);

  useEffect(() => {
    const ctx = ref.current?.getContext("2d");
    if (!ctx) return;
    const noise = makeNoise(seed);
    const trees = makeNoise(seed + 99);
    for (let y = 0; y < H; y++)
      for (let x = 0; x < W; x++) {
        const v = noise(x / 10, y / 10);
        let c = COLORS.deep;
        if (v > 0.62) c = trees(x / 3, y / 3) > 0.62 ? COLORS.tree : (x + y) % 2 ? COLORS.grass : COLORS.grass2;
        else if (v > 0.52) c = (x + y) % 2 ? COLORS.grass : COLORS.grass2;
        else if (v > 0.47) c = COLORS.sand;
        else if (v > 0.38) c = COLORS.water;
        ctx.fillStyle = c;
        ctx.fillRect(x, y, 1, 1);
      }
  }, [seed]);

  return (
    <div className="glass rounded-2xl p-4 glow">
      <canvas
        ref={ref}
        width={W}
        height={H}
        className="w-full rounded-lg"
        style={{ imageRendering: "pixelated", aspectRatio: `${W}/${H}` }}
        aria-label="Procedurally generated world preview"
      />
      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="font-pixel text-xs text-muted-foreground">SEED #{seed}</span>
        <button
          onClick={() => setSeed(Math.floor(Math.random() * 99999))}
          className="font-pixel rounded-md bg-gradient-primary px-4 py-2 text-xs text-primary-foreground transition hover:glow-lg"
        >
          Generate world
        </button>
      </div>
    </div>
  );
}
