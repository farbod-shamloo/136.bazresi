export const getPersianDateAndDay = () => {
  const days = [
    "یکشنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنج‌شنبه",
    "جمعه",
    "شنبه",
  ];
  const now = new Date();

  const persianDate = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(now);

  const dayName = days[now.getDay()];

  return { dayName, persianDate };
};

export const getGreetingByTime = () => {
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 5 && hour < 12) return "صبح بخیر";
  if (hour >= 12 && hour < 13) return "ظهر بخیر";
  if (hour >= 13 && hour < 16) return "بعد از ظهر بخیر";
  if (hour >= 16 && hour < 20) return "عصر بخیر";
};
