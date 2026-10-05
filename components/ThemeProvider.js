"use client";

import { createContext, useContext, useEffect, useSyncExternalStore } from "react";

const ThemeContext = createContext({ theme: "dark", setTheme: () => {} });
const themeListeners = new Set();

function subscribe(listener) {
  themeListeners.add(listener);
  return () => themeListeners.delete(listener);
}

function getThemeSnapshot() {
  const storedTheme = window.localStorage.getItem("theme");
  return storedTheme === "dark" || storedTheme === "light" ? storedTheme : "dark";
}

function getServerThemeSnapshot() {
  return "dark";
}

export function ThemeProvider({ children }) {
  const theme = useSyncExternalStore(subscribe, getThemeSnapshot, getServerThemeSnapshot);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function setTheme(nextTheme) {
    window.localStorage.setItem("theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    themeListeners.forEach((listener) => listener());
  }

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}