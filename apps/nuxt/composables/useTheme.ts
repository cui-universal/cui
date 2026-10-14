export const useTheme = () => {
  const isDark = useState<boolean>("theme_is_dark", () => true);

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
    }
  };

  const initTheme = () => {
    if (import.meta.client) {
      const saved = localStorage.getItem("cui_theme");
      if (saved === "light") {
        isDark.value = false;
        document.documentElement.classList.remove("dark");
      } else {
        isDark.value = true;
        document.documentElement.classList.add("dark");
      }
    }
  };

  return {
    isDark,
    toggleDarkMode,
    initTheme,
  };
};
