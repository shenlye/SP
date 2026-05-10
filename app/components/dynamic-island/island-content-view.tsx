"use client";

import { AnimatePresence, motion } from "motion/react";
import type { ChangeEvent } from "react";
import type { IslandViewState } from "./types";
import { IslandEventView } from "./views/island-event-view";
import {
  CompactMusicView,
  ExpandedMusicView,
} from "./views/music-player-view";

const MUSIC_TITLE = "Ambient Study";
const MUSIC_ARTIST = "SavePoint Radio";

type IslandContentViewProps = {
  viewState: IslandViewState;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onClose: () => void;
  onOpen: () => void;
  onSeek: (event: ChangeEvent<HTMLInputElement>) => void;
  onTogglePlayback: () => void;
};

export function IslandContentView({
  viewState,
  isPlaying,
  currentTime,
  duration,
  onClose,
  onOpen,
  onSeek,
  onTogglePlayback,
}: IslandContentViewProps) {
  const isEventView = viewState.mode === "event";
  const isExpanded = viewState.mode === "music" && viewState.isExpanded;
  const isContentVisible = viewState.isContentVisible;

  if (!isContentVisible) {
    return null;
  }

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={`${isEventView ? viewState.event.intent : "music"}-${
          isExpanded ? "expanded" : "compact"
        }`}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.08 } }}
        className="relative z-10 w-full"
      >
        {isEventView ? (
          <IslandEventView event={viewState.event} />
        ) : isExpanded ? (
          <ExpandedMusicView
            music={{
              playing: isPlaying,
              title: MUSIC_TITLE,
              artist: MUSIC_ARTIST,
            }}
            currentTime={currentTime}
            duration={duration}
            onClose={onClose}
            onSeek={onSeek}
            onTogglePlayback={onTogglePlayback}
          />
        ) : (
          <CompactMusicView isPlaying={isPlaying} onOpen={onOpen} />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
