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
    <div className="p-4 max-w-7xl mx-auto">
      {/* دکمه تغییر حالت نمایش */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={toggleViewMode}
          className="bg-[#65879c] hover:bg-[#769ab1] transition text-white p-3 rounded-md shadow-md focus:outline-none focus:ring-2 "
          aria-label="تغییر حالت نمایش"
          title="تغییر حالت نمایش"
        >
          <Icon icon={iconMap[viewMode]} width="28" height="28" />
        </button>
      </div>

      {/* حالت کارت */}
      {viewMode === "card" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {cards.map(({ id, title, image, Link }) => (
            <div
              key={id}
              className="group bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition duration-300 ease-in-out overflow-hidden flex flex-col max-w-full sm:max-w-[400px] mx-auto"
            >
              <div className="w-full h-52 bg-white flex items-center justify-center">
                <img
                  src={image}
                  alt={title}
                  className="object-contain max-h-full p-3 transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <h3 className="text-center text-lg font-semibold text-gray-800 mb-4 leading-tight group-hover:text-[#65879c] transition">
                  {title}
                </h3>

                {Link ? (
                  <a
                    href={Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-block text-center bg-[#65879c] hover:bg-[#7999ad] text-white py-2 px-4 rounded-md transition-all duration-200 shadow-md"
                  >
                    مشاهده
                  </a>
                ) : (
                  <span className="text-gray-400 text-sm text-center mt-auto">
                    لینک موجود نیست
                  </span>
                )}
              </div>
            </div>
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
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6 justify-center">
          {cards.map(({ id, title, image, Link }) => (
            <div
              key={id}
              className="group flex flex-col items-center text-center cursor-pointer bg-white border border-gray-200 rounded-xl p-4 shadow hover:shadow-md transition"
              onClick={() => Link && window.open(Link, "_blank")}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === "Enter" && Link) window.open(Link, "_blank");
              }}
            >
              <img
                src={image}
                alt={title}
                className="w-14 h-14 object-contain mb-2 transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <span className="text-sm font-medium text-gray-700 group-hover:text-[#65879c]">
                {title}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardList;
