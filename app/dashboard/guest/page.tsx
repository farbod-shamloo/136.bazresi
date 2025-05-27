'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import HomePage from '@/components/HomePage'
import { Icon } from '@iconify/react'

function page() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const isLoggedIn = false // فرضی

  return (
    <div className="relative w-full h-screen overflow-hidden">

      {/* بک‌گراند */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/bg.svg"
          alt="بک‌گراند"
          className="w-full h-full object-cover"
        />
      </div>

      {/* نوار آبی بالا */}
      <div className="w-full h-[300px] md:h-[400px] bg-[#00385d]" />

      {/* فضای بین */}
      <div className="w-full h-[calc(100vh-250px)] md:h-[calc(100vh-300px)] bg-transparent" />

      {/* محتوای وسط */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="pointer-events-auto w-[90%] max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between gap-4 md:items-center">
            <div className="text-center md:text-right">
              <p className="text-base sm:text-lg md:text-xl text-white mb-1 leading-relaxed">
                درگاه سامانه‌های یکپارچه سازمان بازرسی کل کشور
              </p>
            </div>

            {/* دکمه‌ها - فقط در سایز md به بالا */}
            <div className="hidden md:flex text-white text-sm gap-2 justify-center md:justify-end">
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
            </div>
          </div>

          <div className="mt-6">
            <HomePage />
          </div>
        </div>
      </div>

      {/* نوار پایین فقط برای موبایل */}
      {!isLoggedIn && (
        <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#00385d] text-white text-sm flex items-center justify-between px-4 py-3 shadow-inner z-50">
          <div className="flex items-center gap-2">
            <Icon icon="mdi:user" className="text-xl" />
            <span>کاربر مهمان</span>
          </div>
          <button onClick={() => setIsDrawerOpen(true)}>
            <Icon icon="mdi:menu" className="text-2xl" />
          </button>
        </div>
      )}

      {/* دراور پایین برای موبایل */}
      {isDrawerOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-end">
          <div className="bg-white w-full rounded-t-2xl p-5 animate-slide-up shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[#00385d] font-semibold">منوی دسترسی</span>
              <button onClick={() => setIsDrawerOpen(false)}>
                <Icon icon="mdi:close" className="text-2xl text-gray-600" />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <Link href="user/register" onClick={() => setIsDrawerOpen(false)}>
                <button className="w-full bg-[#124b8a] text-white py-2 rounded-2xl">
                  ثبت نام شهروند
                </button>
              </Link>
              <Link href="user/login" onClick={() => setIsDrawerOpen(false)}>
                <button className="w-full bg-[#18a0b7] text-white py-2 rounded-2xl">
                  ورود به حساب
                </button>
              </Link>
            </div>
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
          animation: slide-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default page
