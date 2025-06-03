"use client";

import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

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
    const savedViewMode = localStorage.getItem("viewMode") as
      | "card"
      | "table"
      | "icon"
      | null;
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
          <Icon
            icon="line-md:loading-twotone-loop"
            width="40"
            height="40"
            className="animate-spin mr-2"
          />
          در حال بارگذاری...
        </div>
      ) : (
        <>
          {/* حالت کارت */}
          {viewMode === "card" && (
             <div className="bg-gradient-to-tr  px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto py-8">
        {filteredCards.map(({ id, title, image, Link }, index) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07, duration: 0.4 }}
            onClick={() => handleClick(id, Link)}
            onKeyDown={(e) => e.key === "Enter" && handleClick(id, Link)}
            role="button"
            tabIndex={0}
            aria-label={`کلیک روی ${title}`}
            className="relative bg-white/40 backdrop-blur-xl  bg-gradient-to-br from-white via-gray-50 to-indigo-100 rounded-3xl p-5 border border-white/30 shadow-md transition-all hover:shadow-xl hover:scale-[1.02] cursor-pointer group"
          >
            <div className="w-16 h-16 rounded-full bg-white shadow-sm border border-gray-200 mx-auto flex items-center justify-center mb-4 transition group-hover:scale-110">
              <img
                src={image}
                alt={title}
                className="w-8 h-8 object-contain"
                loading="lazy"
              />
            </div>

            <h3 className="text-center text-gray-800 text-lg font-semibold tracking-tight">
              {title}
            </h3>

            {Link ? (
              <a
                href={Link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="block mt-3 text-center text-sm text-[#0a4c75] font-medium hover:underline transition"
              >
                مشاهده لینک
              </a>
            ) : (
              <p className="text-center mt-3 text-sm text-gray-400 select-none">
                لینک ندارد
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
          )}

          {/* حالت جدول */}
          {viewMode === "table" && (
               <div className="space-y-4">
      {filteredCards.map(({ id, title, image, Link }, index) => (
        <motion.div
          key={id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: index * 0.05,
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border  bg-gradient-to-br from-white via-gray-50 to-indigo-100 border-gray-200 bg-gradient-to-br from-white to-gray-50 px-4 py-4 shadow-sm hover:shadow-md hover:border-indigo-400 transition-all cursor-pointer"
          onClick={() => handleClick(id, Link)}
        >
          {/* راست: آیکون و متن */}
          <div className="flex items-center gap-4">
            {/* شماره ردیف */}
            <div className="w-6 h-6 text-xs flex items-center justify-center text-gray-600 bg-gray-100 rounded-full font-semibold">
              {index + 1}
            </div>

            {/* تصویر */}
            <img
              src={image}
              alt={title}
              className="w-10 h-10 object-contain rounded-lg border border-gray-200"
            />

            {/* عنوان */}
            <span className="text-base font-semibold text-gray-800 tracking-tight leading-snug">
              {title}
            </span>
          </div>

          {/* چپ: دکمه یا متن */}
          <div>
            {Link ? (
              <a
                href={Link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-xs sm:text-sm px-3 py-1.5 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                مشاهده لینک
              </a>
            ) : (
              <span className="text-sm text-gray-400 italic">ندارد</span>
            )}
          </div>
        </motion.div>
      ))}
    </div>
          )}

          {/* حالت آیکون */}
          {viewMode === "icon" && (
            <div className="max-h-[600px] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6 px-4">
                {filteredCards.map(({ id, title, image, Link }, index) => (
                  <motion.a
                    key={id}
                    href={Link || "#"}
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="relative flex flex-col items-center bg-gradient-to-br from-white via-gray-50 to-indigo-100 rounded-xl border border-gray-200 hover:border-indigo-500 shadow-sm hover:shadow-lg p-6 cursor-pointer focus:outline-none transform transition-transform duration-300"
                    tabIndex={0}
                    aria-label={`باز کردن لینک ${title}`}
                    onClick={(e) => {
                      if (id === 5 && isMobile) {
                        e.preventDefault();
                        window.location.href = `tel:${phoneNumber}`;
                      }
                    }}
                  >
                    <div className="w-20 h-20 mb-4 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shadow-sm">
                      <img
                        src={image}
                        alt={title}
                        className="object-contain w-12 h-12 transition-transform duration-300 hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    <p className="text-center text-gray-800 font-semibold text-lg hover:text-indigo-600 transition-colors">
                      {title}
                    </p>
                   
                  </motion.a>
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
