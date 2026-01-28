import * as React from "react";

import { PLACEHOLDER_CONTENT } from "@/content/placeholders";
import { REAL_CONTENT } from "@/content/realContent";

export type ContentMode = "placeholders" | "real";
export type ContentModel = typeof REAL_CONTENT;

const STORAGE_KEY = "jkkn_content_mode";

function readInitialMode(): ContentMode {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    if (v === "real" || v === "placeholders") return v;
  } catch {
    // ignore
  }
  return "placeholders";
}

type ContentModeContextValue = {
  mode: ContentMode;
  setMode: (mode: ContentMode) => void;
  toggleMode: () => void;
  content: ContentModel;
};

const ContentModeContext = React.createContext<ContentModeContextValue | null>(null);

export function ContentModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = React.useState<ContentMode>(readInitialMode);

  const setMode = React.useCallback((next: ContentMode) => {
    setModeState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  const toggleMode = React.useCallback(() => {
    setMode(mode === "placeholders" ? "real" : "placeholders");
  }, [mode, setMode]);

  const content = React.useMemo<ContentModel>(() => {
    return (mode === "real" ? REAL_CONTENT : PLACEHOLDER_CONTENT) as unknown as ContentModel;
  }, [mode]);

  return (
    <ContentModeContext.Provider value={{ mode, setMode, toggleMode, content }}>
      {children}
    </ContentModeContext.Provider>
  );
}

export function useContentMode() {
  const ctx = React.useContext(ContentModeContext);
  if (!ctx) throw new Error("useContentMode must be used within ContentModeProvider");
  return ctx;
}
