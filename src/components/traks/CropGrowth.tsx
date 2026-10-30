import { useState } from "react";

const STAGES = [
  { label: "Seed Packet", icon: "🌰", day: 0 },
  { label: "Seedling", icon: "🌱", day: 1 },
  { label: "Plant", icon: "🌿", day: 2 },
  { label: "Carrot", icon: "🥕", day: 3 },
];

export function CropGrowth() {
  const [day, setDay] = useState(0);
  const stage = STAGES[day];
  return (
    <div className="glass rounded-2xl p-6 text-center glow">
      <p className="font-pixel text-xs text-muted-foreground">DAY {day + 1}</p>
      <div key={day} className="my-6 text-7xl animate-in zoom-in-50 duration-300">{stage.icon}</div>
      <p className="font-pixel text-lg text-primary-glow text-glow">{stage.label}</p>
      <div className="mt-5 flex justify-center gap-2">
        {STAGES.map((s, i) => (
          <span key={s.label} className={`h-2 w-8 rounded-full ${i <= day ? "bg-gradient-primary" : "bg-muted"}`} />
        ))}
      </div>
      <button
        onClick={() => setDay((d) => (d + 1) % STAGES.length)}
        className="font-pixel mt-6 rounded-md border border-primary px-4 py-2 text-xs text-foreground transition hover:bg-primary hover:text-primary-foreground"
      >
        {day === STAGES.length - 1 ? "Harvest (P) & replant" : "Skip day (TAB)"}
      </button>
    </div>
  );
}
