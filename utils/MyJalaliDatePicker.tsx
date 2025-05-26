'use client'

import React from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const MyJalaliDatePicker = ({ value, onChange }) => {
  return (
    <DatePicker
      calendar={persian}
      locale={persian_fa}
      value={value}
      onChange={onChange}
      format="YYYY/MM/DD"
      inputClass="w-full p-2 border border-gray-300 rounded-[12px]"
    />
  );
};

export default MyJalaliDatePicker;
