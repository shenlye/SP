"use client";

import { motion } from "motion/react";
import { cn } from "@/app/lib/cn";
import { useDynamicIslandController } from "./hooks/use-dynamic-island-controller";
import { useAudioPlayer } from "./hooks/use-audio-player";
import { useIslandEvents } from "./hooks/use-island-events";
import { useIslandDismiss } from "./hooks/use-island-dismiss";
import { IslandContentView } from "./island-content-view";
import { MusicGlow } from "./views/music-player-view";
import type { IslandViewState } from "./types";

function getShellClassName(viewState: IslandViewState) {
  if (viewState.mode === "event") {
    return "h-12 w-48 rounded-full items-center";
  }

  return viewState.isExpanded
    ? "h-32 w-64 items-center justify-center rounded-xl"
    : "h-8 w-32 items-center rounded-full";
}

export function DynamicIsland({ className }: { className?: string }) {
  const {
    shellRef,
    viewState,
    isEventVisible,
    isMusicExpanded,
    isShellExpanded,
    closeIsland,
    openMusic,
    revealContent,
    showEvent,
  } = useDynamicIslandController();
  const {
    audioRef,
    isPlaying,
    currentTime,
    duration,
    togglePlayback,
    seek,
    handleLoadedMetadata,
    handleTimeUpdate,
    handlePlay,
    handlePause,
  } = useAudioPlayer({ shouldSyncTime: isMusicExpanded });

  useIslandDismiss({
    enabled: isShellExpanded,
    targetRef: shellRef,
    onDismiss: closeIsland,
  });

  useIslandEvents({
    onShowEvent: showEvent,
    showWelcome: viewState.mode === "music" && !viewState.isExpanded,
  });

  return (
    <motion.div
      ref={shellRef}
      className={cn(
        "relative flex origin-center overflow-hidden border border-border bg-surface px-2 py-2",
        getShellClassName(viewState),
        className,
      )}
      layout
      animate={{
        scaleX:
          viewState.mode === "music" && !viewState.isExpanded
            ? [1, 0.7, 1.03, 1]
            : 1,
      }}
      transition={{
        scaleX:
          viewState.mode === "music" && !viewState.isExpanded
            ? {
                duration: 0.7,
                times: [0, 0.45, 0.75, 1],
                ease: "easeOut",
              }
            : {
                type: "spring",
                stiffness: 420,
                damping: 34,
              },
        layout: {
          type: "spring",
          stiffness: 420,
          damping: 34,
        },
      }}
      onAnimationComplete={() => {
        if (viewState.mode === "music" && !viewState.isContentVisible) {
          revealContent();
        }
      }}
      onLayoutAnimationComplete={() => {
        if (viewState.mode === "event" && !viewState.isContentVisible) {
          revealContent();
        }
      }}
      role={isEventVisible ? "status" : undefined}
      aria-live={isEventVisible ? "polite" : undefined}
    >
      <audio
        ref={audioRef}
        src="/audio/bg.mp3"
        preload="metadata"
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handlePause}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
      />

      {isMusicExpanded ? <MusicGlow /> : null}

      <IslandContentView
        viewState={viewState}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        onClose={closeIsland}
        onOpen={openMusic}
        onSeek={seek}
        onTogglePlayback={togglePlayback}
      />
    </motion.div>
  );
}
