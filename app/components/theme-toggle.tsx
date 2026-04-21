"use client";

import { Icon } from "@iconify/react";
import clsx from "clsx";
import { useTheme } from "next-themes";
import { Button } from "./button";

type ThemeToggleProps = {
  className?: string;
  variant?: "default" | "header" | "menu";
};

const baseButtonClassName = "rounded-none border border-border/80 bg-surface";

const variants = {
  default: {
    baseClassName: "bg-border/80",
    buttonClassName: `${baseButtonClassName} h-10 w-10 text-muted`,
    iconClassName: "h-4.5 w-4.5",
  },
  header: {
    baseClassName: "bg-border/80 group-hover/pressable:bg-brand",
    buttonClassName: `${baseButtonClassName} h-10 w-10 text-foreground`,
    iconClassName: "h-4 w-4",
  },
  menu: {
    baseClassName: "bg-border/80 group-hover/pressable:bg-brand",
    buttonClassName: `${baseButtonClassName} h-11 w-11 text-foreground`,
    iconClassName: "h-4 w-4",
  },
} as const;

export function ThemeToggle({
  className,
  variant = "default",
}: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const config = variants[variant];

  return (
    <Button
      wrapperClassName="inline-flex shrink-0"
      className={clsx(
        config.buttonClassName,
        className,
      )}
      baseClassName={config.baseClassName}
      aria-label="切换深浅色模式"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <Icon
        icon={isDark ? "solar:sun-bold" : "solar:moon-stars-bold"}
        className={config.iconClassName}
      />
    </Button>
  );
}
