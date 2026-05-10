export type IslandMode = "music" | "toast" | "notice";

export type IslandIntent =
  | "copy-success"
  | "welcome"
  | "theme-change";

export type IslandEvent = {
  mode: Exclude<IslandMode, "music">;
  intent: IslandIntent;
  title: string;
  description?: string;
  icon?: string;
  duration?: number;
};

export type IslandViewState =
  | {
      mode: "music";
      isExpanded: boolean;
      isContentVisible: boolean;
    }
  | {
      mode: "event";
      event: IslandEvent;
      isContentVisible: boolean;
    };

export type MusicState = {
  playing: boolean;
  title: string;
  artist?: string;
};
