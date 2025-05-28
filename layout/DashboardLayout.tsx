import Image from "next/image";
import React, { ReactNode } from "react";
import { getPersianDateAndDay, getGreetingByTime } from "@/utils/dateHelper";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { dayName, persianDate } = getPersianDateAndDay();
  const greeting = getGreetingByTime();

  return (
    <main className="min-h-[700px] flex flex-col md:flex-row gap-6 bg-gradient-to-tr from-indigo-200 via-white to-indigo-100 p-8 rounded-lg shadow-lg">
      {/* بخش محتوا */}
      <section className="flex-1 bg-white rounded-xl shadow-lg p-8 overflow-auto">
        {children}
      </section>

      {/* کارت جانبی شناور */}
      <aside className="hidden md:flex flex-col w-80 bg-gradient-to-br from-cyan-600 to-blue-500 rounded-xl shadow-xl text-white p-6 relative overflow-hidden">
        {/* تصویر پس‌زمینه با افکت بلر */}
        <Image
          src="/images/bazresi.jpg"
          alt="پس‌زمینه"
          fill
          style={{ objectFit: "cover", filter: "blur(6px) brightness(0.7)" }}
          priority
        />

        {/* لایه تار برای خوانایی */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent pointer-events-none rounded-xl" />

        {/* محتوای روی کارت */}
        <div className="relative z-10 flex flex-col items-center gap-6">
          <Image
            src="/images/allah.svg"
            alt="لوگو"
            width={140}
            height={140}
            style={{ objectFit: "contain" }}
          />
          <h2 className="text-2xl font-bold tracking-wide drop-shadow-md">
            www.136.ir
          </h2>

          {/* خوش‌آمدگویی و تاریخ */}
          <div className="mt-auto text-center space-y-2">
            <p className="text-xl font-semibold drop-shadow">{greeting}</p>
            <p className="text-sm tracking-wide drop-shadow">
              امروز <span className="font-semibold">{dayName}</span> {persianDate}
            </p>
          </div>
        </div>
      </aside>
    </main>
  );
}
