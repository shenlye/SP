"use client";

import { Icon } from "@iconify/react";

export function CopySuccessView({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="flex w-full items-center gap-2 px-2">
      <span
        aria-hidden="true"
        className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-soft text-brand-strong"
      >
        <Icon icon="lucide:check" className="size-4" />
      </span>

      <span className="min-w-0">
        <span className="block truncate text-sm font-medium text-foreground">
          {title}
        </span>
        {description ? (
          <span className="block truncate text-[10px] leading-4 text-muted">
            {description}
          </span>
        ) : null}
      </span>
    </div>
  );
}
