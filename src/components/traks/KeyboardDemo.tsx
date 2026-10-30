import { useEffect, useState } from "react";

const KEYS: [string, string][] = [
  ["W", "Move up"], ["A", "Move left"], ["S", "Move down"], ["D", "Move right"],
  ["SPACE", "Use your tool"], ["R", "Talk / interact"], ["P", "Pick up"],
  ["E", "Next tool"], ["Q", "Previous tool"], ["C", "Next seed"],
  ["G", "Switch style"], ["TAB", "New day"], ["ESC", "Back"],
];

const normalize = (k: string) => (k === " " ? "SPACE" : k === "Escape" ? "ESC" : k === "Tab" ? "TAB" : k.toUpperCase());

export function KeyboardDemo() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const k = normalize(e.key);
      if (KEYS.some(([key]) => key === k)) {
        if (k === "SPACE" || k === "TAB") {
          const t = e.target as HTMLElement;
          if (t.tagName !== "INPUT" && t.tagName !== "BUTTON") e.preventDefault();
        }
        setActive(k);
      }
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, []);

  const action = KEYS.find(([k]) => k === active)?.[1];

  return (
    <div className="glass rounded-2xl p-6 md:p-8">
      <div className="mb-6 flex h-14 items-center justify-center rounded-lg bg-muted">
        <p className="font-pixel text-sm text-primary-glow text-glow">
          {action ? `${active} → ${action}` : "Press any game key on your keyboard"}
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {KEYS.map(([k, label]) => (
          <button
            key={k}
            onClick={() => setActive(k)}
            title={label}
            className={`font-pixel min-w-12 rounded-md border px-3 py-3 text-sm transition-all duration-150 ${
              active === k
                ? "translate-y-0.5 border-primary bg-primary text-primary-foreground glow-lg"
                : "border-border bg-secondary text-secondary-foreground hover:border-primary"
            }`}
          >
            {k}
          </button>
        ))}
      </div>
    </div>
  );
}
