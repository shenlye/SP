"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useState } from "react";

type MermaidProps = {
  chart: string;
  className?: string;
};

export function Mermaid({ chart, className }: MermaidProps) {
  const reactId = useId();
  const id = `mermaid-${reactId.replaceAll(":", "")}`;
  const [svg, setSvg] = useState("");
  const [error, setError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function renderDiagram() {
      try {
        setError(false);
        setSvg("");

        const mermaid = (await import("mermaid")).default;

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: "default",
        });

        const result = await mermaid.render(id, chart.trim());

        if (!cancelled) {
          setSvg(result.svg);
        }
      } catch (error) {
        console.error("Error rendering Mermaid diagram:", error);

        if (!cancelled) {
          setError(true);
        }
      }
    }

    renderDiagram();

    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  if (error) {
    return (
      <pre className="mt-6 overflow-x-auto rounded-2xl border border-border bg-surface p-4 font-mono text-sm text-foreground-soft">
        {chart}
      </pre>
    );
  }

  return (
    <figure
      className={clsx(
        "mt-6 overflow-x-auto rounded-2xl border border-border bg-surface p-4 [&_svg]:mx-auto [&_svg]:max-w-full",
        className,
      )}
    >
      <button
        type="button"
        className="block w-full cursor-zoom-in"
        onClick={() => setIsOpen(true)}
        aria-label="Enlarge Mermaid diagram"
      >
        <div dangerouslySetInnerHTML={{ __html: svg }} />
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            key="mermaid-preview"
            className="fixed inset-0 z-80 overflow-auto bg-background/55 p-5 backdrop-blur-sm sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onClick={() => setIsOpen(false)}
            role="button"
            tabIndex={0}
            aria-label="Close enlarged Mermaid diagram"
            onKeyDown={(event) => {
              if (event.key === "Escape" || event.key === "Enter") {
                setIsOpen(false);
              }
            }}
          >
            <div className="flex min-h-full min-w-max items-center justify-center">
              <motion.div
                className="rounded-2xl border border-border bg-surface p-4 shadow-2xl [&_svg]:h-auto [&_svg]:w-[clamp(36rem,80vw,56rem)] [&_svg]:max-w-none"
                initial={{ opacity: 0, scale: 0.96, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 4 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <div dangerouslySetInnerHTML={{ __html: svg }} />
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </figure>
  );
}
