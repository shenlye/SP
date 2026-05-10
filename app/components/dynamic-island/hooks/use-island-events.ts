import { useEffect, useRef } from "react";
import type { IslandEvent } from "../types";

type UseIslandEventsOptions = {
  onShowEvent: (event: IslandEvent) => void;
  showWelcome: boolean;
};

function createThemeChangeEvent(theme?: string): IslandEvent {
  if (theme === "dark") {
    return {
      mode: "notice",
      intent: "theme-change",
      title: "Dark mode",
      description: "Display updated",
      icon: "solar:moon-stars-bold",
      duration: 1300,
    };
  }

  if (theme === "light") {
    return {
      mode: "notice",
      intent: "theme-change",
      title: "Light mode",
      description: "Display updated",
      icon: "solar:sun-bold",
      duration: 1300,
    };
  }

  return {
    mode: "notice",
    intent: "theme-change",
    title: "Theme updated",
    description: "Display refreshed",
    icon: "solar:palette-bold",
    duration: 1300,
  };
}

export function useIslandEvents({
  onShowEvent,
  showWelcome,
}: UseIslandEventsOptions) {
  const hasQueuedWelcomeRef = useRef(false);

  useEffect(() => {
    if (!showWelcome || hasQueuedWelcomeRef.current) {
      return;
    }

    hasQueuedWelcomeRef.current = true;

    const timer = setTimeout(() => {
      onShowEvent({
        mode: "notice",
        intent: "welcome",
        title: "Welcome back",
        description: "Session ready",
        icon: "solar:star-fall-bold",
        duration: 1800,
      });
    }, 600);

    return () => {
      clearTimeout(timer);
    };
  }, [onShowEvent, showWelcome]);

  useEffect(() => {
    function handleDocumentCopy() {
      onShowEvent({
        mode: "toast",
        intent: "copy-success",
        title: "Copied",
        description: "Selection saved",
      });
    }

    function handleIslandCopySuccess(event: Event) {
      const detail = (event as CustomEvent<{ message?: string }>).detail;

      onShowEvent({
        mode: "toast",
        intent: "copy-success",
        title: detail?.message ?? "Copied",
      });
    }

    function handleIslandThemeChange(event: Event) {
      const detail = (event as CustomEvent<{ theme?: string }>).detail;

      onShowEvent(createThemeChangeEvent(detail?.theme));
    }

    document.addEventListener("copy", handleDocumentCopy);
    window.addEventListener("island:copy-success", handleIslandCopySuccess);
    window.addEventListener("island:theme-change", handleIslandThemeChange);

    return () => {
      document.removeEventListener("copy", handleDocumentCopy);
      window.removeEventListener(
        "island:copy-success",
        handleIslandCopySuccess,
      );
      window.removeEventListener(
        "island:theme-change",
        handleIslandThemeChange,
      );
    };
  }, [onShowEvent]);
}
