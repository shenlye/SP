"use client";

import { useCallback, useEffect, useRef } from "react";

type UseIslandHoverProps = {
  title: string;
  description?: string;
  icon?: string;
  delay?: number;
};

export function useIslandHover({
  title,
  description,
  icon,
  delay = 500,
}: UseIslandHoverProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHoverTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const onMouseEnter = useCallback(() => {
    clearHoverTimer();

    timerRef.current = setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("island:highlight", {
          detail: { title, description, icon },
        }),
      );
    }, delay);
  }, [title, description, icon, delay, clearHoverTimer]);

  const onMouseLeave = useCallback(() => {
    clearHoverTimer();
  }, [clearHoverTimer]);

  useEffect(() => {
    return clearHoverTimer;
  }, [clearHoverTimer]);

  return {
    onMouseEnter,
    onMouseLeave,
  };
}
