import { Icon } from '@iconify/react';

const Footer = () => (
  <footer className="bg-gradient-to-r from-[#004974] to-[#006f95] text-white py-12 px-6 md:px-20 ">
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
      <div>
        <h3 className="text-2xl font-extrabold mb-4">درباره ما</h3>
        <p className="text-gray-300 leading-relaxed">
          ما یک تیم خلاق و حرفه‌ای هستیم که بهترین خدمات را برای شما فراهم می‌کنیم. هدف ما رضایت کامل شماست.
        </p>
      </div>

      <div>
        <h3 className="text-2xl font-extrabold mb-4">لینک‌های سریع</h3>
        <ul className="space-y-3 text-gray-300">
          <li><a href="/" className="hover:text-cyan-400 transition">صفحه اصلی</a></li>
          <li><a href="/about" className="hover:text-cyan-400 transition">درباره ما</a></li>
          <li><a href="/services" className="hover:text-cyan-400 transition">خدمات</a></li>
          <li><a href="/contact" className="hover:text-cyan-400 transition">تماس با ما</a></li>
        </ul>
      </div>

      <div>
        <h3 className="text-2xl font-extrabold mb-4">تماس با ما</h3>
        <ul className="text-gray-300 space-y-2">
          <li><Icon icon="ic:baseline-email" className="inline-block mr-2 text-cyan-400" /> info@example.com</li>
          <li><Icon icon="ic:baseline-phone" className="inline-block mr-2 text-cyan-400" /> 021-12345678</li>
          <li><Icon icon="ic:outline-location-on" className="inline-block mr-2 text-cyan-400" /> تهران، خیابان انقلاب</li>
        </ul>
      </div>

      <div>
        <h3 className="text-2xl font-extrabold mb-4">ما را دنبال کنید</h3>
        <div className="flex space-x-6 rtl:space-x-reverse text-3xl text-gray-300">
          <a href="https://www.instagram.com/yourpage" target="_blank" rel="noopener noreferrer" aria-label="اینستاگرام" className="hover:text-pink-500 transition">
            <Icon icon="mdi:instagram" />
          </a>
          <a href="https://www.linkedin.com/yourpage" target="_blank" rel="noopener noreferrer" aria-label="لینکدین" className="hover:text-blue-600 transition">
            <Icon icon="mdi:linkedin" />
          </a>
          <a href="https://twitter.com/yourpage" target="_blank" rel="noopener noreferrer" aria-label="توییتر" className="hover:text-blue-400 transition">
            <Icon icon="mdi:twitter" />
          </a>
          <a href="https://github.com/yourpage" target="_blank" rel="noopener noreferrer" aria-label="گیت‌هاب" className="hover:text-gray-400 transition">
            <Icon icon="mdi:github" />
          </a>
        </div>
      </div>
    </div>

    <div className="mt-12 border-t border-white/20 pt-6 text-center text-gray-400 text-sm select-none">
      © ۱۴۰۲ شرکت شما. تمامی حقوق محفوظ است.
    </div>
  </footer>
);

export default Footer;
