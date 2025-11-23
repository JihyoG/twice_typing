export { };

declare global {
  interface YTPlayer {
    playVideo(): void;
    destroy(): void;
  }

  interface YTPlayerEvent {
    target: YTPlayer;
  }

  interface YTPlayerOptions {
    videoId: string;
    playerVars?: {
      playsinline?: number;
      controls?: number;
      disablekb?: number;
    };
    events?: {
      onReady?: (event: YTPlayerEvent) => void;
    };
  }

  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: {
      Player: new (elementId: string, options: YTPlayerOptions) => YTPlayer;
    };
  }
}
