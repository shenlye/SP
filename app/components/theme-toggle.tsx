"use client";

import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="切换深浅色模式"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="rounded-full border border-border px-3 py-1.5 text-sm font-medium text-muted transition-colors duration-200 hover:text-foreground"
    >
      Theme
    </button>
  );
}
