"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import HomePage from "@/components/HomePage";
import Image from "next/image";


const page = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const userName = "فربد شاملونسب";

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  const handleLogout = () => {
    alert("شما خارج شدید");
    setIsLoggedIn(false);
    setIsDrawerOpen(false);
    setIsDropdownOpen(false);
  };

  return (
    <>
      <header className="hidden md:flex items-center justify-between px-10 py-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-lg fixed top-0 left-0 right-0 z-50 backdrop-blur-md">
        <div className="text-2xl font-extrabold cursor-default select-none tracking-wide">
          سامانه سازمان بازرسی کل کشور
        </div>

        <nav className="flex items-center gap-8 text-sm font-medium relative">
          {!isLoggedIn ? (
            <>
              <Link href="user/register" legacyBehavior>
                <a className="px-6 py-2 rounded-full bg-blue-800 hover:bg-blue-700 transition shadow-md hover:shadow-lg">
                  ثبت نام شهروند
                </a>
              </Link>
              <Link href="user/login" legacyBehavior>
                <a className="px-6 py-2 rounded-full bg-cyan-600 hover:bg-cyan-500 transition shadow-md hover:shadow-lg">
                  ورود به حساب
                </a>
              </Link>
            </>
          ) : (
            <div ref={dropdownRef} className="relative">
              <button
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="flex items-center gap-3 bg-white text-blue-900 rounded-full px-5 py-2 shadow-md hover:shadow-xl transition select-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <Icon icon="mdi:account-circle-outline" className="text-3xl" />
                <span className="font-semibold whitespace-nowrap">
                  {userName}
                </span>
                <Icon
                  icon={isDropdownOpen ? "mdi:chevron-up" : "mdi:chevron-down"}
                  className="text-xl transition-transform"
                />
              </button>

              <ul
                className={`absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl text-blue-900 py-2 transition-all duration-300 ease-in-out
                ${
                  isDropdownOpen
                    ? "opacity-100 pointer-events-auto translate-y-0"
                    : "opacity-0 pointer-events-none -translate-y-2"
                }`}
                role="menu"
              >
                <li
                  role="menuitem"
                  tabIndex={0}
                  onClick={() => {
                    setActivePage("profile");
                    setIsDropdownOpen(false);
                  }}
                  className="flex items-center gap-3 px-5 py-2 hover:bg-blue-100 cursor-pointer transition rounded-lg"
                  onKeyDown={(e) =>
                    e.key === "Enter" && alert("رفتن به پروفایل")
                  }
                >
                  <Icon
                    icon="mdi:account-circle-outline"
                    className="text-xl text-blue-600"
                  />
                  پروفایل
                </li>
                <li
                  role="menuitem"
                  tabIndex={0}
                  onClick={() => alert("تغییر رمز ورود")}
                  className="flex items-center gap-3 px-5 py-2 hover:bg-yellow-100 cursor-pointer transition rounded-lg"
                  onKeyDown={(e) =>
                    e.key === "Enter" && alert("تغییر رمز ورود")
                  }
                >
                  <Icon
                    icon="mdi:lock-reset"
                    className="text-xl text-yellow-600"
                  />
                  تغییر رمز ورود
                </li>
                <li
                  role="menuitem"
                  tabIndex={0}
                  onClick={() => alert("تغییر سمت")}
                  className="flex items-center gap-3 px-5 py-2 hover:bg-purple-100 cursor-pointer transition rounded-lg"
                  onKeyDown={(e) => e.key === "Enter" && alert("تغییر سمت")}
                >
                  <Icon
                    icon="mdi:account-switch-outline"
                    className="text-xl text-purple-600"
                  />
                  تغییر سمت
                </li>
                <hr className="my-2 border-gray-300" />
                <li
                  role="menuitem"
                  tabIndex={0}
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-5 py-2 hover:bg-red-100 cursor-pointer text-red-600 font-semibold rounded-lg transition"
                  onKeyDown={(e) => e.key === "Enter" && handleLogout()}
                >
                  <Icon icon="mdi:logout" className="text-xl" />
                  خروج از حساب کاربری
                </li>
              </ul>
            </div>
          )}
        </nav>
      </header>

      <div className="flex items-center md:hidden fixed top-0 left-0 w-full bg-[#004974] text-white text-base shadow-lg py-3 px-5 z-50">
        <Image 
        src="/images/136.png"
        alt="136"
        width={50}
        height={50}
        className="mr-3"
        />
        <span>درگاه سامانه‌های یکپارچه </span>
      </div>

      {!isLoggedIn ? (
        <div className="md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] bg-gradient-to-r from-[#004974] to-[#006f95] text-white text-base rounded-3xl shadow-xl flex items-center justify-between px-6 py-4 z-50">
          <div className="flex items-center gap-3">
            <Icon icon="mdi:user-circle" className="text-3xl" />
            <span className="font-semibold">کاربر مهمان</span>
          </div>
          <button
            onClick={() => setIsDrawerOpen(true)}
            aria-label="باز کردن منو"
            className="bg-white text-[#004974] p-3 rounded-full shadow-md hover:bg-gray-100 transition"
          >
            <Icon icon="mdi:menu" className="text-3xl" />
          </button>
        </div>
      ) : (
        <div className="md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] bg-gradient-to-r from-[#004974] to-[#006f95] text-white text-base rounded-3xl shadow-xl flex items-center justify-between px-6 py-4 z-50">
          <div className="flex items-center gap-3">
            <Icon icon="mdi:account-circle" className="text-3xl" />
            <span className="font-semibold">{userName}</span>
          </div>
          <button
            onClick={() => setIsDrawerOpen(true)}
            aria-label="نمایش منوی پروفایل"
            className="bg-white text-[#004974] p-3 rounded-full shadow-md hover:bg-gray-100 transition"
          >
            <Icon icon="mdi:menu" className="text-3xl" />
          </button>
        </div>
      )}

      <main className="pt-12 md:pt-20">
        <HomePage activePage={activePage} />
      </main>

      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.7)] z-50 flex flex-col justify-end"
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawer-title"
        >
          <div className="bg-white rounded-t-3xl p-6 max-w-md mx-auto w-full animate-slide-up shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2
                id="drawer-title"
                className="text-blue-900 font-extrabold text-xl tracking-wide"
              >
                منوی دسترسی
              </h2>
              <button
                onClick={() => setIsDrawerOpen(false)}
                aria-label="بستن منو"
                className="p-2 rounded-full hover:bg-gray-200 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <Icon icon="mdi:close" className="text-2xl text-blue-900" />
              </button>
            </div>

            {!isLoggedIn ? (
              <>
                <Link href="user/register" legacyBehavior>
                  <a
                    onClick={() => setIsDrawerOpen(false)}
                    className="block mb-3 px-6 py-3 rounded-full bg-blue-800 hover:bg-blue-700 transition text-center text-white shadow-md hover:shadow-lg"
                  >
                    ثبت نام شهروند
                  </a>
                </Link>
                <Link href="user/login" legacyBehavior>
                  <a
                    onClick={() => setIsDrawerOpen(false)}
                    className="block px-6 py-3 rounded-full bg-cyan-600 hover:bg-cyan-500 transition text-center text-white shadow-md hover:shadow-lg"
                  >
                    ورود به حساب
                  </a>
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setActivePage("profile");
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-blue-900 font-semibold rounded-lg py-3 mb-2 hover:bg-blue-100 transition flex items-center gap-3 px-5"
                >
                  <Icon icon="mdi:account-circle-outline" className="text-xl" />
                  پروفایل
                </button>
                <button
                  onClick={() => {
                    alert("تغییر رمز ورود");
                    setIsDrawerOpen(false);
                  }}
                  className="w-full text-yellow-700 font-semibold rounded-lg py-3 mb-2 hover:bg-yellow-100 transition flex items-center gap-3 px-5"
                >
                  <Icon icon="mdi:lock-reset" className="text-xl" />
                  تغییر رمز ورود
                </button>
                <button
                  onClick={() => {
                    alert("تغییر سمت");
                    setIsDrawerOpen(false);
                  }}
                  className="w-full text-purple-700 font-semibold rounded-lg py-3 mb-2 hover:bg-purple-100 transition flex items-center gap-3 px-5"
                >
                  <Icon icon="mdi:account-switch-outline" className="text-xl" />
                  تغییر سمت
                </button>
                <hr className="my-4 border-gray-300" />
                <button
                  onClick={() => {
                    handleLogout();
                  }}
                  className="w-full text-red-600 font-bold rounded-lg py-3 hover:bg-red-100 transition flex items-center gap-3 px-5"
                >
                  <Icon icon="mdi:logout" className="text-xl" />
                  خروج از حساب کاربری
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease forwards;
        }
      `}</style>
    </>
  );
};

export default page;
