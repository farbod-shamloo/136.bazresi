"use client";

import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useQuery, useMutation } from "@tanstack/react-query";
import { createCaptcha, PeigiriGozaresh } from "@/services/user";

const Captcha = ({
  onChange,
  onIdChange,
}: {
  onChange: (val: string) => void;
  onIdChange: (id: string) => void;
}) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["captcha"],
    queryFn: createCaptcha,
    refetchOnWindowFocus: false,
  });

  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    if (data?.dntCaptchaId) {
      onIdChange(data.dntCaptchaId);
    }
  }, [data, onIdChange]);

  return (
    <div className="mb-4">
      <div className="flex items-center gap-3">
        <Input
          placeholder="متن داخل تصویر را وارد کنید"
          value={userInput}
          onChange={(e) => {
            setUserInput(e.target.value);
            onChange(e.target.value);
          }}
          className="rounded-md flex-grow"
        />
        {isLoading ? (
          <div className="text-sm text-gray-500">در حال بارگذاری...</div>
        ) : (
          data?.dntCaptchaImage && (
            <img
              src={`data:image/png;base64,${data.dntCaptchaImage}`}
              alt="captcha"
              className="rounded-md cursor-pointer"
              onClick={() => {
                setUserInput("");
                onChange("");
                refetch();
              }}
              title="برای بارگذاری مجدد کلیک کنید"
              style={{ userSelect: "none", width: 120, height: 40 }}
            />
          )
        )}
      </div>
    </div>
  );
};

const ReportStatusPage = () => {
  const [form] = Form.useForm();
  const [captchaValid, setCaptchaValid] = useState(false);

  const mutation = useMutation({
    mutationFn: (formData: FormData) => PeigiriGozaresh(formData),
    onSuccess: (data, variables, context) => {
      message.success("گزارش با موفقیت ارسال شد");
      // میتونی فرم رو ریست کنی
      form.resetFields();
      setCaptchaValid(false);
    },
    onError: (error) => {
      message.error("خطا در ارسال گزارش");
    },
  });

  const onFinish = (values: any) => {
    const formData = new FormData();
    formData.append("trackingNumber", values.trackingNumber);
    formData.append("captchaText", values.captchaText);
    formData.append("captchaId", values.captchaId);

    mutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#004974] to-[#006f95] flex items-center justify-center p-6 relative">
      <Link
        href="/"
        className="absolute left-6 top-6 text-white hover:text-gray-300 transition"
      >
        <Icon icon="lets-icons:back" width="30" height="30" />
      </Link>

      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-6 md:p-8">
        <h1 className="text-xl font-semibold text-center text-gray-800 mb-6">
          بررسی وضعیت گزارش
        </h1>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
        >
          <Form.Item
            label={<span className="text-sm text-gray-600">شماره رهگیری</span>}
            name="trackingNumber"
            rules={[{ required: true, message: "شماره رهگیری را وارد کنید" }]}
          >
            <Input placeholder="مثلاً 12345678" className="rounded-md" />
          </Form.Item>

          <Form.Item
            label={<span className="text-sm text-gray-600">کد امنیتی</span>}
            name="captchaText"
            rules={[{ required: true, message: "لطفاً متن کپچا را وارد کنید" }]}
          >
            <Captcha
              onChange={(val) => setCaptchaValid(val.trim() !== "")}
              onIdChange={(id) => form.setFieldsValue({ captchaId: id })}
            />
          </Form.Item>

          <Form.Item name="captchaId" hidden>
            <Input />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={!captchaValid || mutation.isLoading}
              loading={mutation.isLoading}
              className="w-full bg-[#004974] hover:bg-[#003c5c] transition text-white font-medium rounded-md py-2"
            >
              بررسی
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ReportStatusPage;
