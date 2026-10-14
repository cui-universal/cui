import React from "react";

export type Framework = "react" | "vue";
export type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

export type Section =
  | "intro"
  | "installation"
  | "theming"
  | "button"
  | "input"
  | "textarea"
  | "checkbox"
  | "switch"
  | "badge"
  | "card"
  | "tabs"
  | "accordion"
  | "separator"
  | "alert"
  | "progress"
  | "skeleton"
  | "tooltip"
  | "dialog"
  | "avatar"
  | "select"
  | "popover"
  | "dropdown"
  | "radio"
  | "table"
  | "kbd";

export interface ThemeColor {
  name: string;
  primary: string;
  ring: string;
}

export interface NavItem {
  id: Section;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  count?: string;
}

export interface NavGroup {
  category: string;
  items: NavItem[];
}
