// components/FontSettingsToggle.tsx
"use client";
import { useState } from "react";
import { useFontSettings } from "@/context/FontSettingsContext";
import { Icon } from "@iconify/react";

const FontSettingsToggle = () => {
  const { size, weight, setSize, setWeight } = useFontSettings();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-30 left-4 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="bg-blue-600 text-white p-3 rounded-full shadow-md hover:bg-blue-700 transition"
        title="تنظیم فونت"
      >
      <Icon icon="ph:magic-wand-bold" width={24} height={24} />

      </button>

      {open && (
        <div className="mt-2 w-60 bg-white border rounded-xl p-4 shadow-lg space-y-4 text-sm text-gray-700">
          <div>
            <label className="block mb-1 font-medium">اندازه فونت: {size}px</label>
            <input
              type="range"
              min={12}
              max={20}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">ضخامت فونت: {weight}</label>
            <input
              type="range"
              min={100}
              max={900}
              step={100}
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FontSettingsToggle;
