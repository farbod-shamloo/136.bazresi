import ActionForm from "@/components/ActionForm";
import React from "react";

function page() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{ backgroundImage: "url('/images/31.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
      <div className="relative z-10 bg-white bg-opacity-90 rounded-2xl shadow-lg max-w-5xl p-5 mx-4 flex flex-col md:flex-row overflow-hidden">
        <ActionForm type="changeNumber" />
      </div>
    </div>
  );
}

export default page;
