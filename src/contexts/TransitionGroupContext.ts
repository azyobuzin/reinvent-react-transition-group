import { createContext } from "react";

export interface TransitionGroupContextValue {
  // 初回レンダリング中か
  isMounting: boolean;
}

export const TransitionGroupContext =
  createContext<TransitionGroupContextValue | null>(null);
