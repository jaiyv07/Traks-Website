import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Download, Sprout, Users, Globe, Moon, Save, Cpu, Code2, Gamepad2, ChevronDown, Clock } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { builds, GAME_VERSION } from "@/lib/downloads";
import { TerrainPreview } from "@/components/traks/TerrainPreview";
import { KeyboardDemo } from "@/components/traks/KeyboardDemo";
import { CropGrowth } from "@/components/traks/CropGrowth";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TRAKS — A Tiny, Cozy 2D Survival Game" },
      { name: "description", content: "Plant, harvest and befriend an AI-powered village in TRAKS, a 2D survival game built in Godot. Download and play free." },
      { property: "og:title", content: "TRAKS — A Tiny, Cozy 2D Survival Game" },
      { property: "og:description", content: "Plant, harvest and befriend an AI-powered village. Built in Godot with C++ and Python." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [["Village", "#village"], ["World", "#world"], ["Farm", "#farm"], ["Controls", "#controls"], ["Tech", "#tech"], ["FAQ", "#faq"]];

const VILLAGERS = [
  { name: "John", role: "The Welcomer", text: "Your welcome to town: an intro first, then chats on whatever is on his mind.", emoji: "🧔" },
  { name: "Kaia", role: "AI Villager", text: "A villager you can really talk to. Replies are AI-written, so no two chats are the same.", emoji: "👩" },
  { name: "Mira", role: "AI Villager", text: "Short, friendly AI replies — with a written line ready if the AI is offline.", emoji: "👧" },
  { name: "Orin", role: "AI Villager", text: "Another neighbour to talk to. Every conversation is generated fresh by AI.", emoji: "🧑" },
  { name: "Seller", role: "Merchant", text: "Buys your harvest, and lets you know when you have nothing to sell.", emoji: "🧺" },
];

const STEPS = [
  ["Choose seeds", "Cycle through your seeds with C."],
  ["Pick a tool", "Switch tools with Q and E, then use them with Space."],
  ["Plant & wait", "Sow your seeds and let the days roll by. Tab skips ahead."],
  ["Harvest", "Collect ripe crops with P, then take them to town."],
  ["Sell them", "Visit the Seller and trade your crops in."],
];

const TECH = [
  { name: "Godot 4.7", icon: Gamepad2, text: "The engine. Draws the world, handles movement and runs everything on screen." },
  { name: "C++", icon: Cpu, text: "The engine room. Fast, low-level code that powers Godot and the AI steering the villagers." },
  { name: "Python", icon: Code2, text: "The helper. Scripts that tie the AI chat to the game and handle logic and tools." },
];

const FAQ = [
  ["Is TRAKS free?", "Yes — download it and play at no cost."],
  ["Do I need internet?", "Only for AI-written villager chats. Offline, villagers like Mira fall back to written lines."],
  ["Does my farm save?", "Yes. Your farm is saved automatically — hit Continue on the menu to pick up where you left off."],
  ["Is every world different?", "Every new game builds a fresh world from noise: new coastlines, forests and land."],
  ["What platforms are supported?", "Builds for Windows, macOS and Linux are planned. Check the download section for what's live."],
];

function Particles() {
  const [dots, setDots] = useState<{ l: number; d: number; s: number; delay: number }[]>([]);
  useEffect(() => {
    setDots(Array.from({ length: 28 }, () => ({ l: Math.random() * 100, d: 10 + Math.random() * 14, s: 2 + Math.random() * 3, delay: Math.random() * 12 })));
  }, []);
  return (
    <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
      {dots.map((p, i) => (
        <span key={i} className="absolute bottom-0 rounded-full bg-primary-glow animate-drift glow"
          style={{ left: `${p.l}%`, width: p.s, height: p.s, animationDuration: `${p.d}s`, animationDelay: `${p.delay}s` }} />
      ))}
    </div>
  );
}

function DayClock() {
  const [t, setT] = useState(0.3);
  useEffect(() => {
    const id = setInterval(() => setT((v) => (v + 0.005) % 1), 100);
    return () => clearInterval(id);
  }, []);
  const hours = Math.floor(t * 24), mins = Math.floor((t * 24 * 60) % 60);
  const isDay = hours >= 6 && hours < 19;
  return (
    <div className="glass rounded-2xl p-6 glow">
      <div className="flex items-center justify-between">
        <span className="font-pixel text-xs text-muted-foreground">IN-GAME CLOCK</span>
        <span className="text-2xl">{isDay ? "☀️" : "🌙"}</span>
      </div>
      <p className="font-pixel mt-4 text-4xl text-glow">{String(hours).padStart(2, "0")}:{String(mins).padStart(2, "0")}</p>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
        <div className="h-full bg-gradient-primary transition-all" style={{ width: `${t * 100}%` }} />
      </div>
      <button onClick={() => setT(0.25)} className="font-pixel mt-4 text-xs text-primary-glow hover:underline">
        ▸ New day (TAB)
      </button>
    </div>
  );
}

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-12 text-center">
      <p className="font-pixel text-xs tracking-widest text-primary-glow">{kicker}</p>
      <h2 className="font-pixel mt-3 text-3xl md:text-5xl text-glow">{title}</h2>
    </div>
  );
}

function Index() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Particles />

      <header className="fixed inset-x-0 top-0 z-50 glass border-x-0 border-t-0">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <a href="#" className="font-pixel text-xl text-glow">TRAKS</a>
          <div className="hidden gap-6 md:flex">
            {NAV.map(([l, h]) => <a key={h} href={h} className="text-sm text-muted-foreground transition hover:text-foreground">{l}</a>)}
          </div>
          <a href="#download" className="font-pixel rounded-md bg-gradient-primary px-4 py-2 text-xs text-primary-foreground animate-pulse-glow">Download</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center px-5 pt-20">
        <img src={hero} alt="TRAKS village at dusk" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/50 to-background" />
        <div className="relative z-10 text-center">
          <p className="font-pixel text-xs tracking-[0.3em] text-accent">A TINY, COZY SURVIVAL GAME</p>
          <h1 className="font-pixel mt-6 text-7xl md:text-9xl text-glow animate-float">TRAKS</h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">Plant. Harvest. Befriend the village.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="#download" className="font-pixel inline-flex items-center gap-2 rounded-lg bg-gradient-primary px-7 py-4 text-sm text-primary-foreground animate-pulse-glow transition hover:scale-105">
              <Download className="h-4 w-4" /> Download free
            </a>
            <a href="#village" className="font-pixel rounded-lg glass px-7 py-4 text-sm transition hover:glow">Explore</a>
          </div>
          <p className="mt-8 text-xs text-muted-foreground">Created by Navanit & Jaiyshaan · {GAME_VERSION}</p>
        </div>
        <a href="#stats" className="absolute bottom-8 z-10 animate-bounce text-muted-foreground"><ChevronDown /></a>
      </section>

      {/* Stats */}
      <section id="stats" className="relative z-10 mx-auto -mt-10 grid max-w-5xl grid-cols-2 gap-4 px-5 md:grid-cols-4">
        {[["5", "Villagers"], ["∞", "Worlds"], ["4", "Crop stages"], ["3", "Languages"]].map(([n, l]) => (
          <div key={l} className="glass rounded-xl p-5 text-center transition hover:glow">
            <p className="font-pixel text-3xl text-primary-glow text-glow">{n}</p>
            <p className="mt-1 text-sm text-muted-foreground">{l}</p>
          </div>
        ))}
      </section>

      {/* Village */}
      <section id="village" className="relative z-10 mx-auto max-w-6xl px-5 py-28">
        <SectionTitle kicker="WHO YOU'LL RUN INTO" title="Meet the Village" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {VILLAGERS.map((v) => (
            <div key={v.name} className="group glass rounded-2xl p-6 transition duration-300 hover:-translate-y-2 hover:glow-lg">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-muted text-4xl transition group-hover:scale-110">{v.emoji}</div>
              <h3 className="font-pixel text-lg">{v.name}</h3>
              <p className="text-xs text-accent">{v.role}</p>
              <p className="mt-3 text-sm text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-10 flex max-w-xl items-center gap-3 glass rounded-xl p-4 text-sm text-muted-foreground">
          <Users className="h-5 w-5 shrink-0 text-primary-glow" />
          Walk up to any villager and press <kbd className="font-pixel rounded bg-muted px-2 py-0.5 text-foreground">R</kbd> to start a conversation.
        </div>
      </section>

      {/* World */}
      <section id="world" className="relative z-10 mx-auto max-w-6xl px-5 py-20">
        <SectionTitle kicker="PROCEDURALLY GENERATED" title="A New World Every Time" />
        <div className="grid items-center gap-10 md:grid-cols-2">
          <TerrainPreview />
          <div className="space-y-6">
            {[[Globe, "Noise-built terrain", "Water, sand and grass are shaped by noise, so no two coastlines are alike."],
              [Sprout, "Forests to explore", "Trees fill the land. Plan your farm plot around them."],
              [Save, "New or continue", "Start a brand-new world, or hit Continue to reload your saved farm."]].map(([Icon, t, d]) => {
              const I = Icon as typeof Globe;
              return (
                <div key={t as string} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-primary glow"><I className="h-5 w-5 text-primary-foreground" /></div>
                  <div><h3 className="font-pixel">{t as string}</h3><p className="mt-1 text-muted-foreground">{d as string}</p></div>
                </div>
              );
            })}
            <p className="text-sm text-muted-foreground">↖ Try it: generate a world right here, just like the game does.</p>
          </div>
        </div>
      </section>

      {/* Farm */}
      <section id="farm" className="relative z-10 mx-auto max-w-6xl px-5 py-28">
        <SectionTitle kicker="FROM SEED TO SALE" title="Farm Life" />
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <ol className="relative space-y-4 border-l border-border pl-8">
            {STEPS.map(([t, d], i) => (
              <li key={t} className="relative glass rounded-xl p-5 transition hover:glow">
                <span className="font-pixel absolute -left-[3.05rem] top-5 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-primary text-sm text-primary-foreground glow">{i + 1}</span>
                <h3 className="font-pixel">{t}</h3>
                <p className="mt-1 text-muted-foreground">{d}</p>
              </li>
            ))}
          </ol>
          <div className="space-y-6">
            <CropGrowth />
            <DayClock />
          </div>
        </div>
      </section>

      {/* Controls */}
      <section id="controls" className="relative z-10 mx-auto max-w-5xl px-5 py-20">
        <SectionTitle kicker="KEYBOARD CONTROLS" title="How to Play" />
        <KeyboardDemo />
      </section>

      {/* Tech */}
      <section id="tech" className="relative z-10 mx-auto max-w-6xl px-5 py-28">
        <SectionTitle kicker="BUILT FROM SCRATCH" title="How It's Made" />
        <div className="grid gap-6 md:grid-cols-3">
          {TECH.map(({ name, icon: Icon, text }) => (
            <div key={name} className="glass rounded-2xl p-8 transition duration-300 hover:-translate-y-1 hover:glow-lg">
              <Icon className="h-10 w-10 text-primary-glow" />
              <h3 className="font-pixel mt-5 text-xl">{name}</h3>
              <p className="mt-3 text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {[[Moon, "A living clock", "The world keeps time. Press Tab to start a new day and watch day melt into night."],
            [Clock, "Save & continue", "Your farm is saved. Hit Continue to pick up exactly where you left off."]].map(([Icon, t, d]) => {
            const I = Icon as typeof Moon;
            return (
              <div key={t as string} className="flex gap-4 glass rounded-2xl p-6">
                <I className="h-6 w-6 shrink-0 text-accent" />
                <div><h3 className="font-pixel">{t as string}</h3><p className="mt-1 text-sm text-muted-foreground">{d as string}</p></div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Download */}
      <section id="download" className="relative z-10 mx-auto max-w-5xl px-5 py-20">
        <div className="glass relative overflow-hidden rounded-3xl p-8 text-center glow-lg md:p-14">
          <div className="absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary opacity-30 blur-3xl" />
          <SectionTitle kicker={GAME_VERSION.toUpperCase()} title="Play TRAKS" />
          <div className="relative grid gap-5 md:grid-cols-3">
            {builds.map((b) => (
              <div key={b.platform} className="rounded-2xl border border-border bg-card p-6 transition hover:border-primary">
                <h3 className="font-pixel text-lg">{b.platform}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{b.note}</p>
                {b.file ? (
                  <a href={`/downloads/${b.file}`} download={b.file}
                    className="font-pixel mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-primary py-3 text-xs text-primary-foreground animate-pulse-glow">
                    <Download className="h-4 w-4" /> Download {b.size ?? ""}
                  </a>
                ) : (
                  <span className="font-pixel mt-5 inline-flex w-full cursor-not-allowed items-center justify-center rounded-lg border border-dashed border-border py-3 text-xs text-muted-foreground">
                    Coming soon
                  </span>
                )}
              </div>
            ))}
          </div>
          <p className="relative mt-8 text-sm text-muted-foreground">Unzip, run TRAKS, and hit <span className="text-foreground">New Game</span>. Have fun!</p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative z-10 mx-auto max-w-3xl px-5 py-28">
        <SectionTitle kicker="GOT QUESTIONS?" title="FAQ" />
        <div className="space-y-3">
          {FAQ.map(([q, a], i) => (
            <div key={q} className="glass rounded-xl">
              <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between p-5 text-left font-semibold">
                {q}
                <ChevronDown className={`h-4 w-4 text-primary-glow transition ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && <p className="px-5 pb-5 text-muted-foreground animate-in fade-in">{a}</p>}
            </div>
          ))}
        </div>
      </section>

      <footer className="relative z-10 border-t border-border py-10 text-center">
        <p className="font-pixel text-2xl text-glow">TRAKS</p>
        <p className="mt-2 text-sm text-muted-foreground">Created by Navanit & Jaiyshaan · Made with Godot, C++ & Python</p>
      </footer>
    </div>
  );
}
