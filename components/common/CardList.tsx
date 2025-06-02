"use client";

import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

type CardData = {
  id: number;
  title: string;
  image: string;
  Link: string;
};

const CardList = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [viewMode, setViewMode] = useState<"card" | "table" | "icon">("icon");
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // لودینگ جدید

  const phoneNumber = "131";

  useEffect(() => {
    setLoading(true);
    fetch("/data/data.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch JSON");
        return res.json();
      })
      .then((data: CardData[]) => setCards(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false)); // بعد از لود یا ارور
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

    useEffect(() => {
    const savedViewMode = localStorage.getItem("viewMode") as "card" | "table" | "icon" | null;
    if (savedViewMode) {
      setViewMode(savedViewMode);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  

  const iconMap = {
    card: "mdi:view-grid-outline",
    table: "mdi:view-list",
    icon: "mdi:table",
  };

  const toggleViewMode = () => {
    if (viewMode === "card") setViewMode("table");
    else if (viewMode === "table") setViewMode("icon");
    else setViewMode("card");
  };

  const filteredCards = cards.filter((card) => {
    if (card.id === 5) return isMobile;
    return true;
  });

  const handleClick = (id: number, Link: string) => {
    if (id === 5 && isMobile) {
      window.location.href = `tel:${phoneNumber}`;
    } else if (Link) {
      window.open(Link, "_blank");
    }
  };

  return (
    <div className="max-w-8xl mx-auto ">
      <div className="mb-6 flex justify-end">
        <button
          onClick={toggleViewMode}
          className="bg-[#006e94] hover:bg-[#006f94da] transition text-white p-3 rounded-md shadow-md focus:outline-none focus:ring-2"
          aria-label="تغییر حالت نمایش"
          title="تغییر حالت نمایش"
        >
          <Icon icon={iconMap[viewMode]} width="28" height="28" />
        </button>
      </div>

      
      {loading ? (
        <div className="flex justify-center items-center h-60 text-gray-500 text-lg">
          <Icon icon="line-md:loading-twotone-loop" width="40" height="40" className="animate-spin mr-2" />
          در حال بارگذاری...
        </div>
      ) : (
        <>
          {/* حالت کارت */}
          {viewMode === "card" && (
            <div className="max-h-[600px] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 max-w-6xl mx-auto">
                {filteredCards.map(({ id, title, image, Link }) => (
                  <div
                    key={id}
                    className="flex flex-col border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors duration-200 cursor-pointer"
                    onClick={() => handleClick(id, Link)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleClick(id, Link);
                    }}
                    role="button"
                    aria-label={`مشاهده کارت ${title}`}
                  >
                    <div className="bg-white p-4 h-40 flex items-center justify-center">
                      <img
                        src={image}
                        alt={title}
                        loading="lazy"
                        className="h-full object-contain"
                      />
                    </div>
                    <div className="border-t border-gray-100 px-4 py-3">
                      <h3 className="text-sm font-medium text-gray-800 text-center truncate">
                        {title}
                      </h3>
                      {Link ? (
                        <a
                          href={Link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="block text-center text-[#135388] text-sm mt-2 hover:underline"
                        >
                          مشاهده لینک
                        </a>
                      ) : (
                        <span className="block text-center text-gray-400 text-sm mt-2 select-none">
                          لینک ندارد
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* حالت جدول */}
          {viewMode === "table" && (
          <div className="space-y-4">
  {filteredCards.map(({ id, title, image, Link }, index) => (
    <div
      key={id}
      className="flex items-center justify-between rounded-xl border border-gray-100 bg- px-4 py-3 shadow-sm hover:shadow-md transition cursor-pointer"
      onClick={() => handleClick(id, Link)}
    >
      <div className="flex items-center gap-3">
        <div className="text-xs text-gray-400 w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full">
          {index + 1}
        </div>
        <img
          src={image}
          alt={title}
          className="w-10 h-10 object-contain rounded-md border border-gray-200"
        />
        <span className="text-sm font-medium text-gray-800">{title}</span>
      </div>
      <div>
        {Link ? (
          <a
            href={Link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] p-1 text-white bg-[#006e94] rounded-3xl hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            مشاهده لینک
          </a>
        ) : (
          <span className="text-sm text-gray-300">ندارد</span>
        )}
      </div>
    </div>
  ))}
</div>

          )}

          {/* حالت آیکون */}
          {viewMode === "icon" && (
            <div className="max-h-[600px] overflow-y-auto pr-2">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6 px-4">
    {filteredCards.map(({ id, title, image, Link }) => (
      <a
        key={id}
        href={Link || "#"}
        rel="noopener noreferrer"
        className="flex flex-col items-center bg-white rounded-lg border border-gray-300 hover:border-indigo-500 transition-colors shadow-sm hover:shadow-lg p-6 cursor-pointer focus:outline-none"
        tabIndex={0}
        aria-label={`باز کردن لینک ${title}`}
        onClick={(e) => {
          if (id === 5 && isMobile) {
            e.preventDefault();
            window.location.href = `tel:${phoneNumber}`;
          }
        }}
      >
        <div className="w-20 h-20 mb-4 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
          <img
            src={image}
            alt={title}
            className="object-contain w-12 h-12 transition-transform duration-300 hover:scale-110"
            loading="lazy"
          />
        </div>
        <p className="text-center text-gray-800 font-medium text-base hover:text-indigo-600 transition-colors">
          {title}
        </p>
      </a>
    ))}
  </div>
</div>

          )}
        </>
      )}
    </div>
  );
};

export default CardList;
