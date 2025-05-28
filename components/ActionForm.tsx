// components/ActionForm.jsx
import React from "react";

const ActionForm = ({ type, onSubmit }) => {
  const title = type === "resetPassword" ? "فراموشی رمز عبور" : "تغییر شماره";
  const label = type === "resetPassword" ? "ایمیل" : "شماره جدید";
  const placeholder = type === "resetPassword" ? "ایمیل خود را وارد کنید" : "شماره جدید را وارد کنید";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 p-4 border rounded-xl shadow">
      <h2 className="text-xl font-bold">{title}</h2>
      <input
        type={type === "resetPassword" ? "email" : "tel"}
        placeholder={placeholder}
        className="p-2 border rounded"
        required
      />
      <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        ارسال
      </button>
    </form>
  );
};

export default ActionForm;
