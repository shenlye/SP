"use client";

import { Icon } from "@iconify/react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="切换深浅色模式"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors duration-200 hover:bg-black/5 hover:text-foreground dark:hover:bg-white/8"
    >
      <Icon
        icon={isDark ? "solar:sun-bold" : "solar:moon-stars-bold"}
        className="h-4.5 w-4.5"
      />
    </button>
  );
}
