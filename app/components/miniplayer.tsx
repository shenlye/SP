"use client";

import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/cn";

const bar = [5, 7, 10, 6, 4];

function Bars() {
  return (
    <div className="flex items-center gap-0.5">
      {bar.map((height, index) => (
        <motion.span
          key={index}
          className="w-0.5 bg-brand rounded-sm"
          style={{ height }}
          animate={{
            height: [height, height + 7, height],
          }}
          transition={{
            duration: 0.7,
            repeat: Infinity,
            delay: index * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function MusicPlayer({ className }: { className?: string }) {
  const playerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showCompactContent, setShowCompactContent] = useState(true);
  const [showExpandedContent, setShowExpandedContent] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  async function handlePlayPause(event: React.MouseEvent<HTMLButtonElement>) {
    // 阻止事件冒泡
    event.stopPropagation();

    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      await audio.play();
    } else {
      audio.pause();
    }
  }


  useEffect(() => {
    function handleClickOutside(event: PointerEvent) {
      if (!playerRef.current) return;

      const target = event.target as Node;

      if (!playerRef.current.contains(target)) {
        setShowExpandedContent(false);
        setIsOpen(false);
      }
    }
    document.addEventListener("pointerdown", handleClickOutside);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, []);

  return (
    <motion.div
      ref={playerRef}
      className={cn(
        isOpen
          ? "w-64 h-32 rounded-xl justify-center items-center"
          : "w-32 h-8 rounded-full justify-between items-center",
        "origin-center flex bg-gray-800 py-2 px-2  overflow-hidden",
        className,
      )}
      onAnimationComplete={() => {
        if (!isOpen) {
          setShowCompactContent(true);
        }
      }}
      layout
      animate={{
        scaleX: isOpen ? 1 : [1, 0.7, 1.03, 1],
      }}
      transition={{
        scaleX: {
          duration: 0.7,
          times: [0, 0.45, 0.75, 1],
          ease: "easeOut",
        },
        layout: {
          type: "spring",
          stiffness: 420,
          damping: 34,
        },
      }}
      onClick={() => {
        setShowCompactContent(false);
        setShowExpandedContent(true);
        setIsOpen(true);
      }}
    >
      <audio
        ref={audioRef}
        src="/audio/bg.mp3"
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />
      {showCompactContent && (
        <>
          <motion.div
            animate={{ scale: [0.7, 1] }}
            className="size-5 bg-zinc-500 rounded-sm"
          />
          <Bars />
        </>
      )}
      <AnimatePresence>
        {showExpandedContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0 } }}
            className="w-full"
          >
            <div className="flex flex-col gap-2 w-full h-full p-2">
              <div className="flex">
                <div
                  className="size-10 bg-zinc-500 rounded-sm"
                  aria-hidden="true"
                />

                <div className="flex flex-col min-w-0 pl-2">
                  <p className="truncate text-sm font-medium text-foreground">
                    歌曲名
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    歌手名
                  </p>
                </div>
              </div>
              <div className="flex gap-1 justify-between items-center">
                <time className="text-[10px]">00:00</time>
                <div className="h-1 flex-1 bg-white/20 rounded-full">
                  <div className="h-full w-1/3 bg-brand rounded-full" />
                </div>
                <time className="text-[10px]">03:30</time>
              </div>
              <div className="flex items-center justify-center gap-5">
                <button
                  type="button"
                  aria-label="上一首"
                  className="grid size-7 place-items-center rounded-full text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  <Icon
                    icon="lucide:skip-back"
                    aria-hidden="true"
                    className="size-4"
                  />
                </button>

                <button
                  type="button"
                  aria-label={isPlaying ? "暂停" : "播放"}
                  onClick={handlePlayPause}
                  className="grid size-7 place-items-center rounded-full text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  <Icon
                    icon={isPlaying ? "lucide:pause" : "lucide:play"}
                    aria-hidden="true"
                    className="size-4"
                  />
                </button>

                <button
                  type="button"
                  aria-label="下一首"
                  className="grid size-7 place-items-center rounded-full text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  <Icon
                    icon="lucide:skip-forward"
                    aria-hidden="true"
                    className="size-4"
                  />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
