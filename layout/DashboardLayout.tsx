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
    <div className="flex flex-col md:flex-row h-[700px] rounded-lg overflow-hidden shadow-md">
      <div className="w-full md:w-4/5 p-6 bg-white overflow-auto">{children}</div>

      <div className="hidden md:block w-1/5 relative bg-gray-100">
        <Image
          src="/images/bazresi.jpg"
          alt="عکس داشبورد"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            pointerEvents: "none",
          }}
        />
        <div className="relative w-full h-full">
          <div
            className="absolute top-1/2 left-1/2 w-48 h-full -translate-x-1/2 -translate-y-1/2 
            rounded overflow-hidden flex flex-col items-center justify-center text-white"
          >
            <Image
              src="/images/allah.svg"
              alt="عکس دوم"
              width={160}
              height={160}
              style={{ objectFit: "contain" }}
            />
            <p className="mt-5 text-center text-[18px]">www.136.ir</p>

            <div className="absolute bottom-2 text-center">
              <p>{greeting}</p>
              <p>امروز {dayName} {persianDate}</p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
