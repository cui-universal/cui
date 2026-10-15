// Tailwind CSS plugin configuration for @cui
export const cuiTailwindPreset = {
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        success: {
          DEFAULT: "hsl(var(--success) / <alpha-value>)",
          foreground: "hsl(var(--success-foreground) / <alpha-value>)",
        },
        warning: {
          DEFAULT: "hsl(var(--warning) / <alpha-value>)",
          foreground: "hsl(var(--warning-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },
      },
      borderRadius: {
        "3xl": "calc(var(--radius) * 1.5)",
        "2xl": "var(--radius)",
        xl: "var(--radius)",
        lg: "var(--radius)",
        md: "calc(var(--radius) * 0.75)",
        sm: "calc(var(--radius) * 0.5)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--cui-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--cui-accordion-content-height)" },
          to: { height: "0" },
        },
        "popover-in": {
          from: { opacity: "0", transform: "scale(0.96) translateY(-2px)" },
          to: { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        "popover-out": {
          from: { opacity: "1", transform: "scale(1)" },
          to: { opacity: "0", transform: "scale(0.96)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "popover-in": "popover-in 0.14s cubic-bezier(0.16, 1, 0.3, 1)",
        "popover-out": "popover-out 0.1s ease-in",
      },
    },
  },
};

/**
 * Helper to generate Tailwind CSS content glob patterns for CUI packages.
 *
 * @example
 * ```ts
 * import { cuiTailwindPreset, cuiContent } from "@cui-universal/theme";
 *
 * export default {
 *   presets: [cuiTailwindPreset],
 *   content: [
 *     "./src/**\/*.{js,ts,jsx,tsx}",
 *     ...cuiContent("react"), // or "vue", or "all"
 *   ],
 * };
 * ```
 */
export function cuiContent(framework: "react" | "vue" | "all" = "all"): string[] {
  if (framework === "react") {
    return [
      "./node_modules/@cui-universal/react/dist/**/*.{js,mjs}",
      "./node_modules/@cui-universal/theme/dist/**/*.{js,mjs}",
    ];
  }
  if (framework === "vue") {
    return [
      "./node_modules/@cui-universal/vue/dist/**/*.{js,cjs}",
      "./node_modules/@cui-universal/theme/dist/**/*.{js,mjs}",
    ];
  }
  return [
    "./node_modules/@cui-universal/react/dist/**/*.{js,mjs}",
    "./node_modules/@cui-universal/vue/dist/**/*.{js,cjs}",
    "./node_modules/@cui-universal/theme/dist/**/*.{js,mjs}",
  ];
}
