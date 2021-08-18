export interface StateResponse {
  gen: {
    break: {
      previousScene?: string;
      breakScene?: string;
    };
    reaper: {
      break: boolean;
      mic: boolean;
      speakers: boolean;
      preview: boolean;
    };
    scene: {
      sceneName: string;
      userTriggered: boolean;
    };
    stopwatch: {
      startDate?: string;
      pauseDate?: string;
    };
    timer: {
      endDate?: string;
    };
  };
  app: Record<string, never>;
}
