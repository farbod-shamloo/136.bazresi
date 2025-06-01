"use client";
import { createContext, useContext, useState, useEffect } from "react";

type FontSettings = {
  size: number;
  weight: number;
  setSize: (size: number) => void;
  setWeight: (weight: number) => void;
};

const FontSettingsContext = createContext<FontSettings | null>(null);

export const FontSettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [size, setSize] = useState(16);
  const [weight, setWeight] = useState(400);

  useEffect(() => {
    const savedSize = localStorage.getItem("fontSize");
    const savedWeight = localStorage.getItem("fontWeight");
    if (savedSize) setSize(Number(savedSize));
    if (savedWeight) setWeight(Number(savedWeight));
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--font-size", `${size}px`);
    document.documentElement.style.setProperty("--font-weight", `${weight}`);
    localStorage.setItem("fontSize", size.toString());
    localStorage.setItem("fontWeight", weight.toString());
  }, [size, weight]);

  return (
    <FontSettingsContext.Provider value={{ size, weight, setSize, setWeight }}>
      {children}
    </FontSettingsContext.Provider>
  );
};

export const useFontSettings = () => useContext(FontSettingsContext)!;
