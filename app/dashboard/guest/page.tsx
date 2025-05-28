"use client";

import React, { useState } from "react";
import Link from "next/link";
import HomePage from "@/components/HomePage";
import { Icon } from "@iconify/react";
import { Button, Dropdown, Menu } from "antd";
import Image from "next/image";

function page() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const userName = "کاربر عزیز";

  const handleLogout = () => {
    alert("شما خارج شدید");
    setIsLoggedIn(false);
    setIsDrawerOpen(false);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex flex-col">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/bg.svg"
          alt="بک‌گراند"
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
        />
      </div>

      <div className="hidden md:block w-full h-[400px] bg-[#00385d]" />

      <div className="flex-grow w-full bg-transparent min-h-[250px] md:min-h-[calc(100vh-400px)]" />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4">
        <div className="pointer-events-auto w-full max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between gap-4 md:items-center">
            <div className="text-center md:text-right"></div>

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
                <Dropdown
                  overlay={
                    <Menu
                      className="min-w-[200px] rounded-lg shadow-lg"
                      style={{ padding: "8px 0", borderRadius: "12px" }}
                    >
                      <Menu.Item
                        key="profile"
                        icon={
                          <Icon
                            icon="mdi:account-circle-outline"
                            className="text-xl text-blue-500"
                          />
                        }
                        onClick={() => alert("رفتن به پروفایل")}
                      >
                        پروفایل
                      </Menu.Item>
                      <Menu.Item
                        key="change-password"
                        icon={
                          <Icon
                            icon="mdi:lock-reset"
                            className="text-xl text-yellow-500"
                          />
                        }
                        onClick={() => alert("تغییر رمز ورود")}
                      >
                        تغییر رمز ورود
                      </Menu.Item>
                      <Menu.Item
                        key="change-role"
                        icon={
                          <Icon
                            icon="mdi:account-switch-outline"
                            className="text-xl text-purple-500"
                          />
                        }
                        onClick={() => alert("تغییر سمت")}
                      >
                        تغییر سمت
                      </Menu.Item>
                      <Menu.Divider />
                      <Menu.Item
                        key="logout"
                        icon={
                          <Icon
                            icon="mdi:logout"
                            className="text-xl text-red-500"
                          />
                        }
                        onClick={handleLogout}
                        danger
                      >
                        خروج از حساب کاربری
                      </Menu.Item>
                    </Menu>
                  }
                  trigger={["click"]}
                  placement="bottomRight"
                  arrow
                >
                  <Button className="flex items-center gap-2 bg-white hover:bg-gray-100 border border-gray-300 rounded-full px-4 py-2 shadow-sm transition duration-150">
                    <Icon
                      icon="mdi:account-circle-outline"
                      className="text-2xl text-gray-700"
                    />
                    <span className="text-gray-800 font-semibold">
                      {userName}
                    </span>
                    <Icon
                      icon="mdi:chevron-down"
                      className="text-gray-500 text-lg"
                    />
                  </Button>
                </Dropdown>
              )}
            </div>
          </div>

          <div className="mt-6">
            <HomePage />
          </div>
        </div>
      </div>

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

      {isDrawerOpen && (
        <div
          className="md:hidden fixed inset-0 bg-[rgba(0,0,0,0.7)] z-50 flex justify-center items-end"
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawer-title"
        >
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 animate-slide-up shadow-2xl">
            <div className="flex justify-between items-center mb-5">
              <h2
                id="drawer-title"
                className="text-[#004974] font-extrabold text-lg"
              >
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
                  <Link
                    href="user/register"
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    <button className="w-full bg-[#004974] hover:bg-[#006f95] text-white py-3 rounded-3xl font-semibold shadow-md transition">
                      ثبت نام شهروند
                    </button>
                  </Link>
                  <Link
                    href="user/login"
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    <button className="w-full bg-[#0098b3] hover:bg-[#00b8d4] text-white py-3 rounded-3xl font-semibold shadow-md transition">
                      ورود به حساب
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <Dropdown
                    overlay={
                      <Menu
                        className="min-w-[200px] rounded-lg shadow-lg"
                        style={{ padding: "8px 0", borderRadius: "12px" }}
                      >
                        <Menu.Item
                          key="profile"
                          icon={
                            <Icon
                              icon="mdi:account-circle-outline"
                              className="text-xl text-blue-500"
                            />
                          }
                          onClick={() => alert("رفتن به پروفایل")}
                        >
                          پروفایل
                        </Menu.Item>
                        <Menu.Item
                          key="change-password"
                          icon={
                            <Icon
                              icon="mdi:lock-reset"
                              className="text-xl text-yellow-500"
                            />
                          }
                          onClick={() => alert("تغییر رمز ورود")}
                        >
                          تغییر رمز ورود
                        </Menu.Item>
                        <Menu.Item
                          key="change-role"
                          icon={
                            <Icon
                              icon="mdi:account-switch-outline"
                              className="text-xl text-purple-500"
                            />
                          }
                          onClick={() => alert("تغییر سمت")}
                        >
                          تغییر سمت
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item
                          key="logout"
                          icon={
                            <Icon
                              icon="mdi:logout"
                              className="text-xl text-red-500"
                            />
                          }
                          onClick={handleLogout}
                          danger
                        >
                          خروج از حساب کاربری
                        </Menu.Item>
                      </Menu>
                    }
                    trigger={["click"]}
                    placement="bottomRight"
                    arrow
                  >
                    <Button className="flex items-center gap-2 bg-white hover:bg-gray-100 border border-gray-300 rounded-full px-4 py-2 shadow-sm transition duration-150">
                      <Icon
                        icon="mdi:account-circle-outline"
                        className="text-2xl text-gray-700"
                      />
                      <span className="text-gray-800 font-semibold">
                        {userName}
                      </span>
                      <Icon
                        icon="mdi:chevron-down"
                        className="text-gray-500 text-lg"
                      />
                    </Button>
                  </Dropdown>
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
  );
}

export default page;
