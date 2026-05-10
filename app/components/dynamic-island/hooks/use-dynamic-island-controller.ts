import { useCallback, useEffect, useRef, useState } from "react";
import type { IslandEvent, IslandViewState } from "../types";

// Music states are split so collapse can briefly hide compact content
// until the shell resize animation finishes.
const COPY_FEEDBACK_DURATION = 1500;
const COMPACT_MUSIC_STATE: IslandViewState = {
  mode: "music",
  isExpanded: false,
  isContentVisible: true,
};
const COLLAPSING_MUSIC_STATE: IslandViewState = {
  mode: "music",
  isExpanded: false,
  isContentVisible: false,
};
const EXPANDED_MUSIC_STATE: IslandViewState = {
  mode: "music",
  isExpanded: true,
  isContentVisible: true,
};

export function useDynamicIslandController() {
  const shellRef = useRef<HTMLDivElement>(null);

  // Store the pending timer that will return temporary event back to music mode.
  // Keeping the id lets us cancel stale timers when a newer event appears.
  const returnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [viewState, setViewState] =
    useState<IslandViewState>(COMPACT_MUSIC_STATE);
  const isEventVisible = viewState.mode === "event";
  const isMusicExpanded = viewState.mode === "music" && viewState.isExpanded;
  const isShellExpanded = isEventVisible || isMusicExpanded;

  const clearReturnTimer = useCallback(() => {
    if (returnTimerRef.current === null) {
      return;
    }

    clearTimeout(returnTimerRef.current);
    returnTimerRef.current = null;
  }, []);

  const collapseToMusic = useCallback(() => {
    setViewState(COLLAPSING_MUSIC_STATE);
  }, []);

  const closeIsland = useCallback(() => {
    clearReturnTimer();
    collapseToMusic();
  }, [clearReturnTimer, collapseToMusic]);

  const openMusic = useCallback(() => {
    clearReturnTimer();
    setViewState(EXPANDED_MUSIC_STATE);
  }, [clearReturnTimer]);

  // Restores compact content after the shell collapse animation finishes
  // Guard against stale animation callbacks if the island has changed state.
  const revealContent = useCallback(() => {
    setViewState((currentState) => {
      if (currentState.mode === "event") {
        return {
          ...currentState,
          isContentVisible: true,
        };
      }

      if (currentState.mode !== "music" || currentState.isExpanded) {
        return currentState;
      }

      return COMPACT_MUSIC_STATE;
    });
  }, []);

  const showEvent = useCallback(
    (nextEvent: IslandEvent) => {
      clearReturnTimer();
      // Set isContentVisible to true here to disply the text immediately instead of waiting for the animation to complete.
      setViewState({
        mode: "event",
        event: nextEvent,
        isContentVisible: true,
      });

      returnTimerRef.current = setTimeout(() => {
        returnTimerRef.current = null;
        collapseToMusic();
      }, nextEvent.duration ?? COPY_FEEDBACK_DURATION);
    },
    [clearReturnTimer, collapseToMusic],
  );

  useEffect(() => {
    return clearReturnTimer;
  }, [clearReturnTimer]);

  return {
    shellRef,
    viewState,
    isEventVisible,
    isMusicExpanded,
    isShellExpanded,
    closeIsland,
    openMusic,
    revealContent,
    showEvent,
  };
}
