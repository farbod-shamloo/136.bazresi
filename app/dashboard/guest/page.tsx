'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import HomePage from '@/components/HomePage'
import { Icon } from '@iconify/react'

function page() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // حالت ورود کاربر
  const userName = 'کاربر عزیز' // نام کاربر (مثال)

  // تابع خروج کاربر (شبیه سازی)
  const handleLogout = () => {
    alert('شما خارج شدید')
    setIsLoggedIn(false)
    setIsDrawerOpen(false)
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex flex-col">

      {/* بک‌گراند تصویر */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/bg.svg"
          alt="بک‌گراند"
          className="w-full h-full object-cover"
        />
      </div>

      {/* حذف بک‌گراند آبی یا نمایش فقط روی دسکتاپ */}
      <div className="hidden md:block w-full h-[400px] bg-[#00385d]" />

      <div className="flex-grow w-full bg-transparent min-h-[250px] md:min-h-[calc(100vh-400px)]" />

      {/* محتوای مرکزی */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4">
        <div className="pointer-events-auto w-full max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between gap-4 md:items-center">

            <div className="text-center md:text-right">
              {/* این متن حذف شده بر اساس درخواست */}
            </div>

            <div className="hidden md:flex text-white text-sm gap-2 justify-center md:justify-end">
              {!isLoggedIn && (
                <>
                  <Link href="user/register">
                    <button className="bg-[#124b8a] py-2 px-5 rounded-3xl hover:bg-[#1d5799]">
                      ثبت نام شهروند
                    </button>
                  </Link>
                  <Link href="user/login">
                    <button className="bg-[#18a0b7] py-2 px-5 rounded-3xl hover:bg-[#29b2ca]">
                      ورود به حساب
                    </button>
                  </Link>
                </>
              )}

              {isLoggedIn && (
                <>
                  <button
                    onClick={() => alert('رفتن به پروفایل')}
                    className="bg-[#124b8a] py-2 px-5 rounded-3xl hover:bg-[#1d5799]"
                  >
                    {userName}
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-[#e02424] py-2 px-5 rounded-3xl hover:bg-[#ff3b3b]"
                  >
                    خروج
                  </button>
                </>
              )}
            </div>

          </div>

          <div className="mt-6">
            <HomePage />
          </div>
        </div>
      </div>

      {/* نوار پایین فقط برای موبایل با UI/UX حرفه‌ای */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-[#004974] text-white text-base shadow-lg py-3 px-5 z-50">
        <span>سامانه سازمان بازرسی کل کشور</span>
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

      {/* دراور پایین برای موبایل با UI/UX بهبود یافته */}
      {isDrawerOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-end"
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawer-title"
        >
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 animate-slide-up shadow-2xl">
            <div className="flex justify-between items-center mb-5">
              <h2 id="drawer-title" className="text-[#004974] font-extrabold text-lg">
                منوی دسترسی
              </h2>
              <button
                onClick={() => setIsDrawerOpen(false)}
                aria-label="بستن منو"
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                <Icon icon="mdi:close" className="text-3xl text-gray-700" />
              </button>
            </div>

            <nav className="flex flex-col gap-5">
              {!isLoggedIn ? (
                <>
                  <Link href="user/register" onClick={() => setIsDrawerOpen(false)}>
                    <button className="w-full bg-[#004974] hover:bg-[#006f95] text-white py-3 rounded-3xl font-semibold shadow-md transition">
                      ثبت نام شهروند
                    </button>
                  </Link>
                  <Link href="user/login" onClick={() => setIsDrawerOpen(false)}>
                    <button className="w-full bg-[#0098b3] hover:bg-[#00b8d4] text-white py-3 rounded-3xl font-semibold shadow-md transition">
                      ورود به حساب
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/profile" onClick={() => setIsDrawerOpen(false)}>
                    <button className="w-full bg-[#004974] hover:bg-[#006f95] text-white py-3 rounded-3xl font-semibold shadow-md transition">
                      پروفایل
                    </button>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-[#e02424] hover:bg-[#ff3b3b] text-white py-3 rounded-3xl font-semibold shadow-md transition"
                  >
                    خروج
                  </button>
                </>
              )}
            </nav>
          </div>
        </div>
      )}

      {/* انیمیشن دراور */}
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
          animation: slide-up 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  )
}

export default page
