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
      {/* دکمه تغییر حالت نمایش */}
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

      {/* حالت کارت */}
      {viewMode === "card" && (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 max-w-7xl mx-auto">
  {cards.map(({ id, title, image, Link }) => (
    <article
      key={id}
      className="flex flex-col bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden"
      onClick={() => Link && window.open(Link, "_blank")}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" && Link) window.open(Link, "_blank");
      }}
      role="button"
      aria-label={`مشاهده کارت ${title}`}
    >
      <div className="flex justify-center items-center bg-gray-50 p-6 h-48">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-center text-lg font-semibold text-gray-900 mb-4 truncate">
          {title}
        </h3>
        {Link ? (
          <a
            href={Link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mt-auto inline-block bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md text-center text-sm font-medium shadow-sm transition-colors duration-200"
          >
            مشاهده
          </a>
        ) : (
          <span className="mt-auto text-center text-gray-400 text-sm select-none">
            لینک موجود نیست
          </span>
        )}
      </div>
    </article>
  ))}
</div>

      )}

      {/* حالت جدولی */}
      {viewMode === "table" && (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 shadow-md rounded-lg overflow-hidden text-sm sm:text-base">
            <thead className="bg-[#65879c] text-white">
              <tr>
                <th className="p-2 sm:p-3 text-center">ردیف</th>
                <th className="p-2 sm:p-3 text-center">تصویر</th>
                <th className="p-2 sm:p-3 text-center">عنوان</th>
                <th className="p-2 sm:p-3 text-center">لینک</th>
              </tr>
            </thead>
            <tbody>
              {cards.map(({ id, title, image, Link }, index) => (
                <tr
                  key={id}
                  className={`text-center border-b border-gray-300 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-blue-100 transition cursor-pointer`}
                  onClick={() => Link && window.open(Link, "_blank")}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && Link) window.open(Link, "_blank");
                  }}
                >
                  <td className="p-1 sm:p-2">{index + 1}</td>
                  <td className="p-1 sm:p-2">
                    <img
                      src={image}
                      alt={title}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-contain mx-auto rounded"
                      loading="lazy"
                    />
                  </td>
                  <td className="p-1 sm:p-2">{title}</td>
                  <td className="p-1 sm:p-2">
                    {Link ? (
                      <a
                        href={Link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#65879c] underline hover:text-[#6f8fa3]"
                        onClick={(e) => e.stopPropagation()}
                      >
                        مشاهده
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
