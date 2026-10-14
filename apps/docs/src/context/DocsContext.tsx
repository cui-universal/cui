import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Framework, PackageManager, Section, ThemeColor } from "../types";
import { THEME_COLORS } from "../data/navigation";

interface DocsContextValue {
  framework: Framework;
  setFramework: (framework: Framework) => void;
  packageManager: PackageManager;
  setPackageManager: (pm: PackageManager) => void;
  activeTheme: ThemeColor;
  setActiveTheme: (theme: ThemeColor) => void;
  isDark: boolean;
  setIsDark: (isDark: boolean | ((prev: boolean) => boolean)) => void;
  currentSection: Section;
  setCurrentSection: (section: Section) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  copiedId: string | null;
  copyToClipboard: (text: string, id: string) => void;
}

const DocsContext = createContext<DocsContextValue | null>(null);

export function DocsProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(true);
  const [activeTheme, setActiveTheme] = useState(THEME_COLORS[0]);
  const [framework, setFramework] = useState<Framework>("react");
  const [packageManager, setPackageManager] = useState<PackageManager>("pnpm");
  const [currentSection, setCurrentSection] = useState<Section>("intro");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    document.documentElement.style.setProperty("--primary", activeTheme.primary);
    document.documentElement.style.setProperty("--ring", activeTheme.ring);
  }, [activeTheme]);

  const copyToClipboard = async (text: string, id: string) => {
    let success = false;
    try {
      if (typeof navigator !== "undefined" && navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        success = true;
      }
    } catch {
      // Fallback to execCommand below
    }

    if (!success && typeof document !== "undefined") {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.top = "-9999px";
        textarea.style.left = "-9999px";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        success = document.execCommand("copy");
        document.body.removeChild(textarea);
      } catch (err) {
        console.error("Failed to copy code to clipboard", err);
      }
    }

    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <DocsContext.Provider
      value={{
        framework,
        setFramework,
        packageManager,
        setPackageManager,
        activeTheme,
        setActiveTheme,
        isDark,
        setIsDark,
        currentSection,
        setCurrentSection,
        searchQuery,
        setSearchQuery,
        copiedId,
        copyToClipboard,
      }}
    >
      {children}
    </DocsContext.Provider>
  );
}

export function useDocs() {
  const ctx = useContext(DocsContext);
  if (!ctx) {
    throw new Error("useDocs must be used within a DocsProvider");
  }
  return ctx;
}
