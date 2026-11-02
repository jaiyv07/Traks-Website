// Game builds offered on the download section.
// To publish a build: drop the file into public/downloads/ and set `file` to its name,
// or set `url` to an external link (e.g. a Google Drive folder).
export type Build = {
  platform: string;
  note: string;
  file: string | null; // e.g. "traks-windows.zip"
  url?: string; // external download link, opened in a new tab
  size?: string;
};

export const GAME_VERSION = "v1";

export const builds: Build[] = [
  {
    platform: "Windows",
    note: "Windows 10 / 11 · 64-bit",
    file: null,
    url: "https://drive.google.com/drive/folders/1Bj4JJJw4ERNXyAJnceuCqbpYYAq8nXXs?usp=drive_link",
  },
  { platform: "macOS", note: "macOS 12+ · Intel & Apple Silicon", file: null },
  { platform: "Linux", note: "x86_64 · AppImage", file: null },
  { platform: "Android", note: "Android 8+ · APK", file: null },
  { platform: "iOS", note: "iPhone & iPad · App Store", file: null },
];
