"use client";

import { Icon } from "@iconify/react";
import { motion, useAnimationControls } from "motion/react";
import {
  memo,
  useLayoutEffect,
  type CSSProperties,
  type ChangeEvent,
} from "react";
import { cn } from "@/app/lib/cn";
import styles from "./music-player-view.module.css";
import type { MusicState } from "../types";

const bars = [5, 7, 10, 6, 4];
const controlButtonClassName =
  "grid size-7 place-items-center rounded-full text-muted transition-colors duration-200 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";
const compactCoverEnterTransition = {
  type: "spring",
  stiffness: 520,
  damping: 24,
} as const;

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) {
    return "00:00";
  }

  const minutes = Math.floor(seconds / 60);
  const restSeconds = Math.floor(seconds % 60);

  return `${minutes}:${restSeconds.toString().padStart(2, "0")}`;
}

const Bars = memo(function Bars({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className="flex items-center gap-0.5">
      {bars.map((height, index) => (
        <span
          key={height}
          className={cn(
            "block w-0.5 rounded-sm bg-brand",
            isPlaying && styles.musicBarPlaying,
          )}
          style={
            {
              height: isPlaying ? `${height}px` : 3,
              "--island-bar-height": `${height}px`,
              "--island-bar-peak": `${height + 7}px`,
              "--island-bar-delay": `${index * 0.15}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
});

function CompactCover() {
  const controls = useAnimationControls();

  useLayoutEffect(() => {
    controls.set({ opacity: 0, scale: 0.72 });
    void controls.start({
      opacity: 1,
      scale: 1,
      transition: compactCoverEnterTransition,
    });
  }, [controls]);

  return (
    <motion.div
      animate={controls}
      className="size-5 rounded-sm bg-zinc-500"
    />
  );
}

function PlayerIconButton({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      className={controlButtonClassName}
    >
      <Icon icon={icon} aria-hidden="true" className="size-4" />
    </button>
  );
}

export function MusicGlow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-14 overflow-hidden"
    >
      <motion.span
        className="absolute top-3 left-0 h-32 w-32 rounded-full bg-radial from-sky-400/45 via-cyan-300/20 to-transparent blur-sm"
        animate={{ x: [-50, -30, -20, -50] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute top-5 left-20 h-24 w-24 rounded-full bg-radial from-fuchsia-400/35 via-pink-300/15 to-transparent blur-sm"
        animate={{ x: [0, -30, 18, 0] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.span
        className="absolute top-2 right-0 h-32 w-32 rounded-full bg-radial from-amber-300/35 via-orange-300/15 to-transparent blur-sm"
        animate={{ x: [30, 10, 0, 30] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

export const CompactMusicView = memo(function CompactMusicView({
  isPlaying,
  onOpen,
}: {
  isPlaying: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      aria-label="Open music player"
      onClick={(event) => {
        event.stopPropagation();
        onOpen();
      }}
      className="flex h-full w-full items-center justify-between rounded-full bg-transparent text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand"
    >
      <CompactCover />
      <Bars isPlaying={isPlaying} />
    </button>
  );
});

export function ExpandedMusicView({
  music,
  currentTime,
  duration,
  onClose,
  onSeek,
  onTogglePlayback,
}: {
  music: MusicState;
  currentTime: number;
  duration: number;
  onClose: () => void;
  onSeek: (event: ChangeEvent<HTMLInputElement>) => void;
  onTogglePlayback: () => void;
}) {
  return (
    <div className="relative z-10 flex h-full w-full flex-col gap-2 p-2">
      <div className="flex">
        <div className="size-10 rounded-sm bg-zinc-500" aria-hidden="true" />

        <div className="flex min-w-0 flex-col pl-2">
          <p className="truncate text-sm font-medium text-foreground">
            {music.title}
          </p>
          {music.artist ? (
            <p className="truncate text-xs text-muted">{music.artist}</p>
          ) : null}
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <time className="text-[10px] text-muted">{formatTime(currentTime)}</time>
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={currentTime}
          onChange={onSeek}
          onClick={(event) => event.stopPropagation()}
          aria-label="Playback position"
          className="h-1 flex-1"
        />
        <time className="text-[10px] text-muted">{formatTime(duration)}</time>
      </div>

      <div className="flex items-center justify-center gap-5">
        <PlayerIconButton
          label={music.playing ? "Pause" : "Play"}
          icon={music.playing ? "lucide:pause" : "lucide:play"}
          onClick={onTogglePlayback}
        />
        <PlayerIconButton
          label="Collapse player"
          icon="lucide:x"
          onClick={onClose}
        />
      </div>
    </div>
  );
}
