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

  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch JSON");
        return res.json();
      })
      .then((data: CardData[]) => setCards(data))
      .catch((err) => console.error(err));
  }, []);

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

  return (
    <div className=" max-w-7xl mx-auto">
  
      <div className="mb-6 flex justify-end">
        <button
          onClick={toggleViewMode}
          className="bg-[#4c58ff] hover:bg-[#759de6] transition text-white p-3 rounded-md shadow-md focus:outline-none focus:ring-2 "
          aria-label="تغییر حالت نمایش"
          title="تغییر حالت نمایش"
        >
          <Icon icon={iconMap[viewMode]} width="28" height="28" />
        </button>
      </div>

      {viewMode === "card" && (
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 max-w-6xl mx-auto">
  {cards.map(({ id, title, image, Link }) => (
    <div
      key={id}
      className="flex flex-col border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors duration-200 cursor-pointer"
      onClick={() => Link && window.open(Link, "_blank")}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" && Link) window.open(Link, "_blank");
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


      )}

    
      {viewMode === "table" && (
       <div className="grid gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-3">
  {cards.map(({ id, title, image, Link }, index) => (
    <div
      key={id}
      className="bg-white rounded-xl shadow hover:shadow-md transition border border-gray-200 p-4 cursor-pointer hover:bg-blue-50"
      onClick={() => Link && window.open(Link, "_blank")}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" && Link) window.open(Link, "_blank");
      }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="text-sm text-gray-500 font-medium bg-gray-100 w-8 h-8 flex items-center justify-center rounded-full">
          {index + 1}
        </div>
        <img
          src={image}
          alt={title}
          className="w-14 h-14 object-contain rounded-md border"
          loading="lazy"
        />
      </div>
      <h3 className="text-base font-semibold text-gray-800 mb-2">{title}</h3>
      {Link ? (
        <a
          href={Link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[#135388] underline hover:text-[#0d3d66]"
          onClick={(e) => e.stopPropagation()}
        >
          مشاهده لینک
        </a>
      ) : (
        <span className="text-sm text-gray-400">لینکی موجود نیست</span>
      )}
    </div>
  ))}
</div>

      )}

      {/* حالت آیکونی جدید */}
      {viewMode === "icon" && (
 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 px-4">
  {cards.map(({ id, title, image, Link }) => (
    <a
      key={id}
      href={Link || '#'}
      target={Link ? '_blank' : undefined}
      rel="noopener noreferrer"
      className="flex flex-col items-center bg-white rounded-lg border border-gray-300 hover:border-indigo-500 transition-colors shadow-sm hover:shadow-lg p-6 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
      tabIndex={0}
      aria-label={`باز کردن لینک ${title}`}
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

      )}
    </div>
  );
};

export default CardList;
