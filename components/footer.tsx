import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

const Footer = () => {
  const [iranTime, setIranTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date().toLocaleTimeString("fa-IR", {
        timeZone: "Asia/Tehran",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setIranTime(now);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-gradient-to-r from-[#004974] to-[#006f95] text-white fixed bottom-0 left-0 w-full z-50 py-4 shadow-lg">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center gap-2 mb-2">
          <Icon icon="mdi:clock-time-four-outline" width="28" height="28" />
          <h3 className="text-lg font-semibold">ساعت ایران</h3>
        </div>
        <div className="bg-white text-[#004974] text-4xl font-mono px-8 py-2 rounded-xl shadow-lg tracking-widest animate-pulse">
          {iranTime}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
