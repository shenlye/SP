"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type SyntheticEvent,
} from "react";

export function useAudioPlayer({
  shouldSyncTime,
}: {
  shouldSyncTime: boolean;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const shouldSyncTimeRef = useRef(shouldSyncTime);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    shouldSyncTimeRef.current = shouldSyncTime;

    if (shouldSyncTime && audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }, [shouldSyncTime]);

  const togglePlayback = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    try {
      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
      }
    } catch {
      setIsPlaying(false);
    }
  }, []);

  const seek = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const nextTime = Number(event.target.value);
      const audio = audioRef.current;

      setCurrentTime(nextTime);

      if (audio) {
        audio.currentTime = nextTime;
      }
    },
    [],
  );

  const handleLoadedMetadata = useCallback(
    (event: SyntheticEvent<HTMLAudioElement>) => {
      setDuration(event.currentTarget.duration);
    },
    [],
  );

  const handleTimeUpdate = useCallback(
    (event: SyntheticEvent<HTMLAudioElement>) => {
      const audio = event.currentTarget;

      if (shouldSyncTimeRef.current) {
        setCurrentTime(audio.currentTime);
      }
    },
    [],
  );

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  return {
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
  };
}
