export interface ColorPalette {
  name: string;
  value: string;
  darkValue: string;
  ring: string;
  bgClass: string;
}

export const COLOR_PALETTES: ColorPalette[] = [
  {
    name: "Orange",
    value: "24.6 95% 53.1%",
    darkValue: "20.5 90.2% 48.2%",
    ring: "24.6 95% 53.1%",
    bgClass: "bg-orange-500",
  },
  {
    name: "Violet",
    value: "262.1 83.3% 57.8%",
    darkValue: "263.4 85% 62%",
    ring: "262.1 83.3% 57.8%",
    bgClass: "bg-violet-500",
  },
  {
    name: "Blue",
    value: "221.2 83.2% 53.3%",
    darkValue: "217.2 91.2% 59.8%",
    ring: "221.2 83.2% 53.3%",
    bgClass: "bg-blue-500",
  },
  {
    name: "Emerald",
    value: "142.1 76.2% 36.3%",
    darkValue: "142.1 70% 45%",
    ring: "142.1 76.2% 36.3%",
    bgClass: "bg-emerald-500",
  },
  {
    name: "Rose",
    value: "346.8 77.2% 49.8%",
    darkValue: "349.7 89.2% 60.2%",
    ring: "346.8 77.2% 49.8%",
    bgClass: "bg-rose-500",
  },
  {
    name: "Amber",
    value: "38 92% 50%",
    darkValue: "38 95% 52%",
    ring: "38 92% 50%",
    bgClass: "bg-amber-500",
  },
];

export const RADIUS_PRESETS = [
  { label: "0", value: "0rem", desc: "None" },
  { label: "0.3", value: "0.3rem", desc: "Compact" },
  { label: "0.5", value: "0.5rem", desc: "Standard" },
  { label: "0.75", value: "0.75rem", desc: "Modern" },
  { label: "1.0", value: "1.0rem", desc: "Smooth" },
];

export const useTheme = () => {
  const isDark = useState<boolean>("theme_is_dark", () => true);
  const currentColorName = useState<string>("theme_current_color", () => "Orange");
  const currentRadius = useState<string>("theme_current_radius", () => "0.75rem");

  const activePalette = computed(() => {
    return COLOR_PALETTES.find((c) => c.name === currentColorName.value) || COLOR_PALETTES[0];
  });

  const applyColors = () => {
    if (!import.meta.client) return;
    const palette = activePalette.value;
    const colorValue = isDark.value ? palette.darkValue : palette.value;
    document.documentElement.style.setProperty("--primary", colorValue);
    document.documentElement.style.setProperty("--ring", palette.ring);
  };

  const setPrimaryColor = (colorName: string) => {
    currentColorName.value = colorName;
    if (import.meta.client) {
      localStorage.setItem("cui_primary_color", colorName);
      applyColors();
    }
  };

  const setRadius = (radiusVal: string) => {
    currentRadius.value = radiusVal;
    if (import.meta.client) {
      localStorage.setItem("cui_radius", radiusVal);
      document.documentElement.style.setProperty("--radius", radiusVal);
    }
  };

  const toggleDarkMode = () => {
    isDark.value = !isDark.value;
    if (import.meta.client) {
      if (isDark.value) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("cui_theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("cui_theme", "light");
      }
      applyColors();
    }
  };

  const initTheme = () => {
    if (!import.meta.client) return;
    // 1. Dark / Light mode
    const savedTheme = localStorage.getItem("cui_theme");
    if (savedTheme === "light") {
      isDark.value = false;
      document.documentElement.classList.remove("dark");
    } else {
      isDark.value = true;
      document.documentElement.classList.add("dark");
    }

    // 2. Color Palette
    const savedColor = localStorage.getItem("cui_primary_color");
    if (savedColor && COLOR_PALETTES.some((c) => c.name === savedColor)) {
      currentColorName.value = savedColor;
    }
    applyColors();

    // 3. Border Radius
    const savedRadius = localStorage.getItem("cui_radius");
    if (savedRadius) {
      currentRadius.value = savedRadius;
      document.documentElement.style.setProperty("--radius", savedRadius);
    }
  };

  const resetTheme = () => {
    setPrimaryColor("Orange");
    setRadius("0.75rem");
  };

  return {
    isDark,
    currentColorName,
    currentRadius,
    activePalette,
    colorPalettes: COLOR_PALETTES,
    radiusPresets: RADIUS_PRESETS,
    setPrimaryColor,
    setRadius,
    toggleDarkMode,
    initTheme,
    resetTheme,
  };
};
