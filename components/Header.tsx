// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import { Icon } from "@iconify/react";

// const Header = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(true);
//   const [activePage, setActivePage] = useState("home");
//   const userName = "فربد شاملونسب";

//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsDropdownOpen(false);
//       }
//     };

//     if (isDropdownOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isDropdownOpen]);

//   const handleLogout = () => {
//     alert("شما خارج شدید");
//     setIsLoggedIn(false);
//     setIsDropdownOpen(false);
//   };

//   return (
//     <header className="hidden md:flex items-center justify-between px-10 py-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-lg fixed top-0 left-0 right-0 z-50 backdrop-blur-md">
//       <div className="text-2xl font-extrabold cursor-default select-none tracking-wide">
//         سامانه سازمان بازرسی کل کشور
//       </div>

//       <nav className="flex items-center gap-8 text-sm font-medium relative">
//         {!isLoggedIn ? (
//           <>
//             <Link href="user/register" legacyBehavior>
//               <a className="px-6 py-2 rounded-full bg-blue-800 hover:bg-blue-700 transition shadow-md hover:shadow-lg">
//                 ثبت نام شهروند
//               </a>
//             </Link>
//             <Link href="user/login" legacyBehavior>
//               <a className="px-6 py-2 rounded-full bg-cyan-600 hover:bg-cyan-500 transition shadow-md hover:shadow-lg">
//                 ورود به حساب
//               </a>
//             </Link>
//           </>
//         ) : (
//           <div ref={dropdownRef} className="relative">
//             <button
//               aria-haspopup="true"
//               aria-expanded={isDropdownOpen}
//               onClick={() => setIsDropdownOpen((prev) => !prev)}
//               className="flex items-center gap-3 bg-white text-blue-900 rounded-full px-5 py-2 shadow-md hover:shadow-xl transition select-none focus:outline-none focus:ring-2 "
//             >
//               <Icon icon="mdi:account-circle-outline" className="text-3xl" />
//               <span className="font-semibold whitespace-nowrap">{userName}</span>
//               <Icon
//                 icon={isDropdownOpen ? "mdi:chevron-up" : "mdi:chevron-down"}
//                 className="text-xl transition-transform"
//               />
//             </button>

//             <ul
//               className={`absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl text-blue-900 py-2 transition-all duration-300 ease-in-out
//               ${
//                 isDropdownOpen
//                   ? "opacity-100 pointer-events-auto translate-y-0"
//                   : "opacity-0 pointer-events-none -translate-y-2"
//               }`}
//               role="menu"
//             >
//               <li
//                 role="menuitem"
//                 tabIndex={0}
//                 onClick={() => {
//                   setActivePage("profile");
//                   setIsDropdownOpen(false);
//                 }}
//                 className="flex items-center gap-3 px-5 py-2 hover:bg-blue-100 cursor-pointer transition rounded-lg"
//                 onKeyDown={(e) => e.key === "Enter" && alert("رفتن به پروفایل")}
//               >
//                 <Icon
//                   icon="mdi:account-circle-outline"
//                   className="text-xl text-blue-600"
//                 />
//                 پروفایل
//               </li>
//               <li
//                 role="menuitem"
//                 tabIndex={0}
//                 onClick={() => alert("تغییر رمز ورود")}
//                 className="flex items-center gap-3 px-5 py-2 hover:bg-yellow-100 cursor-pointer transition rounded-lg"
//                 onKeyDown={(e) => e.key === "Enter" && alert("تغییر رمز ورود")}
//               >
//                 <Icon icon="mdi:lock-reset" className="text-xl text-yellow-600" />
//                 تغییر رمز ورود
//               </li>
//               <li
//                 role="menuitem"
//                 tabIndex={0}
//                 onClick={() => alert("تغییر سمت")}
//                 className="flex items-center gap-3 px-5 py-2 hover:bg-purple-100 cursor-pointer transition rounded-lg"
//                 onKeyDown={(e) => e.key === "Enter" && alert("تغییر سمت")}
//               >
//                 <Icon
//                   icon="mdi:account-switch-outline"
//                   className="text-xl text-purple-600"
//                 />
//                 تغییر سمت
//               </li>
//               <hr className="my-2 border-gray-300" />
//               <li
//                 role="menuitem"
//                 tabIndex={0}
//                 onClick={handleLogout}
//                 className="flex items-center gap-3 px-5 py-2 hover:bg-red-100 cursor-pointer text-red-600 font-semibold rounded-lg transition"
//                 onKeyDown={(e) => e.key === "Enter" && handleLogout()}
//               >
//                 <Icon icon="mdi:logout" className="text-xl" />
//                 خروج از حساب کاربری
//               </li>
//             </ul>
//           </div>
//         )}
//       </nav>
//     </header>
//   );
// };

// export default Header;
