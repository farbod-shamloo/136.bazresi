"use client";

import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Upload,
  Steps,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { createCaptcha } from "@/services/user"; // فرض بر این است که این فانکشن API کپچا را صدا می‌زند

const { TextArea } = Input;
const { Option } = Select;

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
          className="rounded-lg shadow-md flex-grow"
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

const CorruptionReportForm = () => {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [captchaValid, setCaptchaValid] = useState(false);

  const fieldsByStep = [
    [
      "topic",
      "organization",
      "special_topic",
      "report_type",
      "urgency",
      "location",
      "organization_level",
    ],
    ["estimated_value", "description"],
    ["attachment", "captchaText", "captchaId"],
  ];

  const steps = [
    {
      title: "مرحله اول",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "موضوع", name: "topic", options: ["مالی", "اداری", "سیاسی"] },
            { label: "سازمان مربوطه", name: "organization", options: ["شهرداری", "وزارت", "شرکت دولتی"] },
            { label: "موضوع تخصصی", name: "special_topic", options: ["مناقصات", "بودجه", "قرارداد"] },
            { label: "نوع گزارش", name: "report_type", options: ["شخصی", "مستند"] },
            { label: "فوریت", name: "urgency", options: ["عادی", "فوری"] },
            { label: "موقعیت جغرافیایی", name: "location", options: ["ملی", "استانی", "محلی"] },
            { label: "سطح سازمانی", name: "organization_level", options: ["کارشناسی", "مدیریتی", "عالی"] },
          ].map((field) => (
            <Form.Item
              key={field.name}
              name={field.name}
              label={<span className="font-medium">{field.label}</span>}
              rules={[{ required: true, message: `لطفاً ${field.label} را انتخاب کنید.` }]}
            >
              <Select placeholder="انتخاب کنید" className="rounded-lg shadow-md">
                {field.options.map((opt) => (
                  <Option key={opt} value={opt}>{opt}</Option>
                ))}
              </Select>
            </Form.Item>
          ))}
        </div>
      ),
    },
    {
      title: "توضیحات",
      content: (
        <div className="space-y-6">
          <Form.Item label="ارزش تقریبی (تومان)" name="estimated_value">
            <Input type="number" placeholder="مقدار به تومان" className="rounded-lg shadow-md" />
          </Form.Item>
          <Form.Item
            label="شرح گزارش"
            name="description"
            rules={[{ required: true, message: "توضیحات را وارد کنید" }]}
          >
            <TextArea rows={5} placeholder="شرح دقیق اتفاق..." className="rounded-lg shadow-md" />
          </Form.Item>
        </div>
      ),
    },
    {
      title: "پیوست و کد امنیتی",
      content: (
        <div className="space-y-6">
          <Form.Item
            name="attachment"
            label="پیوست سند (اختیاری)"
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList || []}
          >
            <Upload beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>آپلود فایل</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="کد امنیتی"
            required
            rules={[{ required: true, message: "لطفاً متن کپچا را وارد کنید" }]}
          >
            <Captcha
              onChange={(val) => {
                setCaptchaValid(val.trim() !== "");
                form.setFieldsValue({ captchaText: val });
              }}
              onIdChange={(id) => form.setFieldsValue({ captchaId: id })}
            />
          </Form.Item>

          {/* فیلدهای مخفی کپچا */}
          <Form.Item name="captchaText" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="captchaId" hidden>
            <Input />
          </Form.Item>
        </div>
      ),
    },
  ];

  const next = () => {
    form.validateFields(fieldsByStep[current])
      .then(() => setCurrent(current + 1))
      .catch(() => {}); // ارورها رو اینجا هندل می‌کنیم
  };

  const prev = () => setCurrent(current - 1);

  const onFinish = (values: any) => {
    console.log("Submitted: ", values);
    message.success("✅ گزارش شما با موفقیت ثبت شد.");
    form.resetFields();
    setCurrent(0);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#004974] to-[#006f95] flex flex-col md:flex-row text-white">
      <div className="w-full md:w-2/3 p-8 md:p-16 bg-white text-gray-800  shadow-2xl">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-indigo-800 mb-2">فرم گزارش فساد</h2>
          <p className="text-gray-600">لطفاً با دقت مراحل را پر کنید. اطلاعات شما محرمانه خواهد ماند.</p>
        </div>

        <Steps current={current} responsive className="mb-10">
          {steps.map((s) => <Steps.Step key={s.title} title={s.title} />)}
        </Steps>

        <Form layout="vertical" form={form} onFinish={onFinish} className="space-y-6">
          {steps[current].content}

          <div className="flex justify-between mt-8">
            {current > 0 && (
              <Button onClick={prev} className="rounded-md bg-gray-300 hover:bg-gray-400">
                مرحله قبل
              </Button>
            )}
            {current < steps.length - 1 ? (
              <Button
                type="primary"
                onClick={next}
                className="bg-indigo-600 hover:bg-indigo-700 rounded-md"
                disabled={current === 2 && !captchaValid}
              >
                مرحله بعد
              </Button>
            ) : (
              <Button
                type="primary"
                htmlType="submit"
                className="bg-green-600 hover:bg-green-700 rounded-md"
                disabled={!captchaValid}
              >
                ارسال گزارش
              </Button>
            )}
          </div>
        </Form>
      </div>

      <div className="hidden md:flex w-1/3 relative items-center justify-center p-10">
        <div className="relative w-full h-96 rounded-3xl overflow-hidden shadow-xl">
          <Image
            src="/images/44.jpg"
            alt="گزارش فساد"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-4">
            <h3 className="text-2xl font-bold mb-2">با ما همراه شوید</h3>
            <p className="text-sm">افشای فساد، گامی برای آینده بهتر کشورمان است</p>
          </div>
        </div>
        <Link href="/" className="absolute top-5 left-5 text-white hover:text-gray-300">
          <Icon icon="mdi:arrow-left" width="28" />
        </Link>
      </div>
    </div>
  );
};

export default CorruptionReportForm;

