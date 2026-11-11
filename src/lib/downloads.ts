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

// Pairs (per user request): Windows+Android, macOS+iOS, Linux+Ubuntu Touch.
// Released so far: Windows, Android, Linux. macOS and iOS folders are still empty.
export const builds: Build[] = [
  {
    platform: "Windows",
    note: "Windows 10 / 11 · x64, arm64 or x32",
    file: null,
    url: "https://drive.google.com/drive/folders/1IshkwMBT9NiD8ZXpco9pSQXIPPcYIxwC?usp=sharing",
  },
  {
    platform: "Android",
    note: "Android 8+ · Traks.apk",
    file: null,
    url: "https://drive.google.com/drive/folders/1eoYPwcoeUEBNYbkJOSpyzCzEr3JMCGgU?usp=sharing",
    size: "168 MB",
  },
  { platform: "macOS", note: "macOS 12+ · Intel & Apple Silicon", file: null },
  { platform: "iOS", note: "iPhone & iPad · App Store", file: null },
  {
    platform: "Linux",
    note: "x64, arm64, arm32 or x32",
    file: null,
    url: "https://drive.google.com/drive/folders/1Eivk3yng-ddJXGHdFblEArf7daq3kUSj?usp=sharing",
  },
  { platform: "Ubuntu Touch", note: "Ubuntu Touch · arm64", file: null },
];
