"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const layers = [
  { id: 1, src: "/city 1/1.png", depth: 5 },
  { id: 2, src: "/city 1/2.png", depth: 9 },
  { id: 3, src: "/city 1/3.png", depth: 13 },
  { id: 4, src: "/city 1/4.png", depth: 18 },
  { id: 5, src: "/city 1/5.png", depth: 24 },
] as const;

const PARALLAX_STRENGTH = 0.55;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function CityParallaxPage({
  title = "Posts",
  eyebrow = "",
  description = "Long-form notes about UI experiments, implementation details, and the small choices worth finding again later.",
  meta,
}: {
  title?: string;
  eyebrow?: string;
  description?: string;
  meta?: string;
}) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const currentOffsetRef = useRef({ x: 0, y: 0 });
  const targetOffsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const scene = sceneRef.current;

    if (!scene) {
      return;
    }

    const paint = () => {
      const current = currentOffsetRef.current;
      const target = targetOffsetRef.current;

      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;

      scene.style.setProperty("--parallax-x", current.x.toFixed(4));
      scene.style.setProperty("--parallax-y", current.y.toFixed(4));

      const isSettled =
        Math.abs(target.x - current.x) < 0.001 &&
        Math.abs(target.y - current.y) < 0.001;

      if (isSettled) {
        current.x = target.x;
        current.y = target.y;
        scene.style.setProperty("--parallax-x", current.x.toFixed(4));
        scene.style.setProperty("--parallax-y", current.y.toFixed(4));
        frameRef.current = 0;
        return;
      }

      frameRef.current = window.requestAnimationFrame(paint);
    };

    const ensurePaint = () => {
      if (frameRef.current === 0) {
        frameRef.current = window.requestAnimationFrame(paint);
      }
    };

    const updateTarget = (clientX: number, clientY: number) => {
      const rect = scene.getBoundingClientRect();

      if (!rect.width || !rect.height) {
        return;
      }

      targetOffsetRef.current = {
        x:
          clamp(((clientX - rect.left) / rect.width - 0.5) * 2, -1, 1) *
          PARALLAX_STRENGTH,
        y:
          clamp(((clientY - rect.top) / rect.height - 0.5) * 2, -1, 1) *
          PARALLAX_STRENGTH,
      };

      ensurePaint();
    };

    const onPointerMove = (event: PointerEvent) => {
      updateTarget(event.clientX, event.clientY);
    };

    const onPointerLeave = () => {
      targetOffsetRef.current = { x: 0, y: 0 };
      ensurePaint();
    };

    scene.addEventListener("pointermove", onPointerMove);
    scene.addEventListener("pointerleave", onPointerLeave);

    return () => {
      scene.removeEventListener("pointermove", onPointerMove);
      scene.removeEventListener("pointerleave", onPointerLeave);

      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <section className="mx-auto w-full max-w-5xl px-6 pt-10 sm:px-8 sm:pt-14">
      <div
        ref={sceneRef}
        aria-label="带有 Posts 文字的视差卡片"
        className="relative isolate aspect-2/1 w-full overflow-hidden  border border-border/70 bg-[#c7dcff] shadow-[0_24px_70px_rgba(60,86,140,0.18)] [--parallax-x:0] [--parallax-y:0] dark:bg-[#172238]"
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#dff0ff_0%,#bdd6ff_48%,#91b5f2_100%)] dark:bg-[linear-gradient(180deg,#25395c_0%,#1b2d4c_55%,#0f1726_100%)]" />
        <div className="absolute inset-x-0 top-0 h-2/3 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.72),transparent_28%)] dark:bg-[radial-gradient(circle_at_50%_18%,rgba(173,210,255,0.16),transparent_24%)]" />
        <div className="absolute inset-0 opacity-35 bg-[linear-gradient(rgba(255,255,255,0.24)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] bg-size-[32px_32px] mask-[linear-gradient(180deg,rgba(0,0,0,0.32),transparent_72%)]" />

        {layers.map((layer) => (
          <div
            key={layer.id}
            className="pointer-events-none absolute -inset-x-8 -inset-y-6 will-change-transform"
            style={{
              transform: `translate3d(calc(var(--parallax-x) * ${layer.depth}px), calc(var(--parallax-y) * ${layer.depth}px), 0)`,
              zIndex: layer.id * 10,
            }}
          >
            <Image
              src={layer.src}
              alt=""
              fill
              priority
              sizes="(min-width: 1280px) 64rem, 100vw"
              unoptimized
              className="select-none object-cover [image-rendering:pixelated]"
              draggable={false}
            />
          </div>
        ))}

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(12,20,35,0.02),rgba(12,20,35,0.1)_48%,rgba(12,20,35,0.72))]" />

        <div className="absolute inset-0 z-80 flex flex-col justify-between px-5 py-5 sm:px-7 sm:py-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/72 sm:text-[11px]">
            {eyebrow}
          </p>

          <div className="max-w-lg">
            <h1 className="font-display text-[2rem] leading-none text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.34)] sm:text-[3.1rem]">
              {title}
            </h1>

            <p className="mt-3 max-w-md text-sm leading-6 text-white/82 sm:text-[0.95rem] sm:leading-7">
              {description}
            </p>

            {meta ? (
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.26em] text-white/68 sm:text-[11px]">
                {meta}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
