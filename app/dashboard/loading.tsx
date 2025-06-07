import React from "react";

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full 
      bg-gradient-to-tr from-blue-700 via-blue-600 to-cyan-500 rounded-none shadow-2xl
      ring-4 ring-cyan-400/50
      ">
      <img
        className="w-[150px] md:w-[200px] mb-8 animate-pulse hover:animate-spin-slow transition-transform duration-700"
        src="/images/allah.svg"
        alt="Loading Icon"
      />

      <p className="text-white text-3xl font-extrabold tracking-wide drop-shadow-lg text-center px-4">
        درگـاه سـامانه‌های یکپـارچه
      </p>
      <p className="text-white text-xl font-semibold mt-3 drop-shadow-md text-center px-4">
        سازمان بازرسی کل کشور
      </p>
    </div>
  );
}

export default Loading;
