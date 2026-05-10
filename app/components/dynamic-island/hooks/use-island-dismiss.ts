import { useEffect } from "react";
import type { RefObject } from "react";

type UseIslandDismissOptions<T extends HTMLElement> = {
  enabled: boolean;
  targetRef: RefObject<T | null>;
  onDismiss: () => void;
};

export function useIslandDismiss<T extends HTMLElement>({
  enabled,
  targetRef,
  onDismiss,
}: UseIslandDismissOptions<T>) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      const target = targetRef.current;
      const eventTarget = event.target;

      if (!target || !(eventTarget instanceof Node)) {
        return;
      }

      if (!target.contains(eventTarget)) {
        onDismiss();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onDismiss();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [enabled, onDismiss, targetRef]);
}
