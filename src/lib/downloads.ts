// Game builds offered on the download section.
// To publish a build: drop the file into public/downloads/ and set `file` to its name.
export type Build = {
  platform: string;
  note: string;
  file: string | null; // e.g. "traks-windows.zip"
  size?: string;
};

export const GAME_VERSION = "v0.9 (pre-release)";

export const builds: Build[] = [
  { platform: "Windows", note: "Windows 10 / 11 · 64-bit", file: null },
  { platform: "macOS", note: "macOS 12+ · Intel & Apple Silicon", file: null },
  { platform: "Linux", note: "x86_64 · AppImage", file: null },
];
