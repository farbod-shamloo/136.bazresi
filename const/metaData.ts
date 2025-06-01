import type { Metadata } from "next";

export const appMetadata: Metadata = {
  title: "درگـاه سـامانه‌های یکپـارچه سازمان بازرسی کل کشور",
  description: "توضیح درباره اپ",
  applicationName: "136.bazresi",
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/136.png",
    shortcut: "/icons/136.png",
    apple: "/icons/136.png",
  },
  appleWebApp: {
    capable: true,
    title: "136.bazresi",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
};
