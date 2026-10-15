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
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DocsContext = createContext<DocsContextValue | null>(null);

const VALID_SECTIONS = new Set<string>([
  "intro",
  "installation",
  "theming",
  "button",
  "input",
  "textarea",
  "checkbox",
  "switch",
  "badge",
  "card",
  "tabs",
  "accordion",
  "separator",
  "alert",
  "progress",
  "skeleton",
  "tooltip",
  "dialog",
  "avatar",
  "select",
  "popover",
  "dropdown",
  "radio",
  "table",
  "kbd",
  "steps",
  "datepicker",
  "texteditor",
  "breadcrumb",
  "pagination",
  "timeline",
  "empty-state",
  "rating",
  "color-picker",
  "colorpicker",
  "input-number",
  "inputnumber",
]);

function parseSectionFromUrl(): Section {
  if (typeof window === "undefined") return "intro";

  const pathname = window.location.pathname
    .replace(/^\/components\//, "")
    .replace(/^\//, "")
    .trim()
    .toLowerCase();

  if (pathname && VALID_SECTIONS.has(pathname)) {
    if (pathname === "colorpicker") return "color-picker";
    if (pathname === "inputnumber") return "input-number";
    return pathname as Section;
  }

  const hash = window.location.hash
    .replace(/^#\/?/, "")
    .replace(/^components\//, "")
    .trim()
    .toLowerCase();

  if (hash && VALID_SECTIONS.has(hash)) {
    if (hash === "colorpicker") return "color-picker";
    if (hash === "inputnumber") return "input-number";
    return hash as Section;
  }

  return "intro";
}

export function DocsProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(true);
  const [activeTheme, setActiveTheme] = useState(THEME_COLORS[0]);
  const [framework, setFramework] = useState<Framework>("react");
  const [packageManager, setPackageManager] = useState<PackageManager>("pnpm");
  const [currentSection, setCurrentSectionState] = useState<Section>(() => parseSectionFromUrl());
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const setCurrentSection = (section: Section, updateHistory = true) => {
    setCurrentSectionState(section);
    setMobileMenuOpen(false);
    if (updateHistory && typeof window !== "undefined") {
      const targetPath = section === "intro" ? "/" : `/${section}`;
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ section }, "", targetPath);
      }
    }
  };

  useEffect(() => {
    const handleUrlChange = () => {
      const section = parseSectionFromUrl();
      setCurrentSectionState(section);
    };

    window.addEventListener("popstate", handleUrlChange);
    window.addEventListener("hashchange", handleUrlChange);
    return () => {
      window.removeEventListener("popstate", handleUrlChange);
      window.removeEventListener("hashchange", handleUrlChange);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentSection]);

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
        mobileMenuOpen,
        setMobileMenuOpen,
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
