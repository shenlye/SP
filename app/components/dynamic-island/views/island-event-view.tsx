"use client";

import { Icon } from "@iconify/react";
import type { ComponentType } from "react";
import type { IslandEvent, IslandIntent } from "../types";
import { CopySuccessView } from "./copy-success-view";

type IslandEventViewProps = {
  title: string;
  description?: string;
  icon?: string;
};

function NoticeEventView({
  title,
  description,
  icon,
}: IslandEventViewProps) {
  return (
    <div className="flex w-full items-center gap-2 px-2">
      <span
        aria-hidden="true"
        className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-soft text-brand-strong"
      >
        <Icon icon={icon ?? "solar:star-bold"} className="size-4" />
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

const islandEventViews: Partial<
  Record<IslandIntent, ComponentType<IslandEventViewProps>>
> = {
  "copy-success": CopySuccessView,
  welcome: NoticeEventView,
  "theme-change": NoticeEventView,
};

function DefaultIslandEventView({ title, description }: IslandEventViewProps) {
  return (
    <div className="flex w-full min-w-0 flex-col px-3">
      <span className="truncate text-sm font-medium text-foreground">
        {title}
      </span>
      {description ? (
        <span className="truncate text-[10px] leading-4 text-muted">
          {description}
        </span>
      ) : null}
    </div>
  );
}

export function IslandEventView({ event }: { event: IslandEvent }) {
  const View = islandEventViews[event.intent] ?? DefaultIslandEventView;

  return (
    <View
      title={event.title}
      description={event.description}
      icon={event.icon}
    />
  );
}
