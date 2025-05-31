import React from "react";
import { Icon } from "@iconify/react";

function ProfilePage() {
  const user = {
    name: "فربد شاملو",
    nationalId: "1234567890",
    ip: "192.168.1.1",
    fatherName: "محمود",
    gender: "مرد",
    birthDate: "1370/01/01",
    email: "farbod@example.com",
    phone: "09123456789",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  };

  return (
    <div className="w-[100%] mx-auto mt-24 p-8 bg-white rounded-xl shadow-lg font-sans">
      <button
        onClick={() => window.history.back()}
        className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors duration-300 font-medium mb-8 text-sm"
        aria-label="بازگشت"
      >
        <Icon icon="mdi:arrow-left" width={20} height={20} />
        بازگشت
      </button>

      <div className="flex gap-10 items-center border-b border-gray-200 pb-6">
        <img
          src={user.avatar}
          alt="عکس کاربر"
          className="w-28 h-28 rounded-full object-cover shadow-md"
          loading="lazy"
        />
        <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
        {[
          { icon: "mdi:id-card", label: "کد ملی", value: user.nationalId },
          { icon: "mdi:web", label: "IP", value: user.ip },
          { icon: "mdi:account-group", label: "نام پدر", value: user.fatherName },
          { icon: "mdi:gender-male-female", label: "جنسیت", value: user.gender },
          { icon: "mdi:calendar", label: "تاریخ تولد", value: user.birthDate },
          { icon: "mdi:email", label: "ایمیل", value: user.email },
          { icon: "mdi:cellphone", label: "شماره موبایل", value: user.phone },
        ].map(({ icon, label, value }) => (
          <div
            key={label}
            className="flex items-center gap-4 bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <Icon
              icon={icon}
              width={24}
              height={24}
              className="text-blue-500 flex-shrink-0"
            />
            <div className="text-gray-700 font-semibold w-32">{label}</div>
            <div className="text-gray-900 select-text break-all">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfilePage;
