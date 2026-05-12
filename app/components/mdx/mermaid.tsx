"use client";

import clsx from "clsx";
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
      <div dangerouslySetInnerHTML={{ __html: svg }} />
    </figure>
  );
}
