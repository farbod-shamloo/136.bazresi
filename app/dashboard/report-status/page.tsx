"use client";

import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

const Captcha = ({ onChange }: { onChange: (value: string) => void }) => {
  const [num1] = useState(Math.floor(Math.random() * 10));
  const [num2] = useState(Math.floor(Math.random() * 10));
  const [userInput, setUserInput] = useState("");

  return (
    <div className="mb-4">
      <label htmlFor="captcha-input" className="block mb-1 font-semibold text-gray-700">
        لطفا جمع {num1} + {num2} را وارد کنید
      </label>
      <Input
        id="captcha-input"
        placeholder="نتیجه را وارد کنید"
        value={userInput}
        onChange={(e) => {
          setUserInput(e.target.value);
          onChange(e.target.value);
        }}
      />
    </div>
  );
};

const ReportStatusPage = () => {
  const [form] = Form.useForm();
  const [captchaValid, setCaptchaValid] = useState(false);

  const onCaptchaChange = (value: string) => {
    setCaptchaValid(value.trim() !== "");
  };

  const onFinish = (values: any) => {
    const { trackingNumber, captcha } = values;
   
    message.success(`وضعیت گزارش با شماره رهگیری ${trackingNumber} بررسی شد (نمونه)`);
  };

  return (
    <div className="min-h-screen flex">
    
      <div className="hidden md:flex flex-1 bg-gradient-to-r from-[#004974] to-[#006f95] text-white flex-col justify-center items-center p-12">
         <Link href="/" className="absolute left-5 top-5 bg-black/50 hover:bg-black/40 rounded-[50%] p-1 ">
          <Icon icon="lets-icons:back" width="44" height="44" />
        </Link>
        <h2 className="text-4xl font-extrabold mb-6">وضعیت گزارش فساد ناشناس</h2>
        <p className="text-lg max-w-md">
          شما می‌توانید با وارد کردن شماره رهگیری، وضعیت گزارش فساد خود را به صورت ناشناس پیگیری کنید.
        </p>
      </div>

  
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
            بررسی وضعیت گزارش
          </h1>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
          >
            <Form.Item
              label="شماره رهگیری"
              name="trackingNumber"
              rules={[{ required: true, message: "لطفا شماره رهگیری را وارد کنید" }]}
            >
              <Input placeholder="شماره رهگیری" />
            </Form.Item>

            <Form.Item
              label="کپچا"
              name="captcha"
              rules={[{ required: true, message: "لطفا کپچا را وارد کنید" }]}
            >
              <Captcha onChange={onCaptchaChange} />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                disabled={!captchaValid}
                className="w-full"
              >
                ارسال
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ReportStatusPage;
