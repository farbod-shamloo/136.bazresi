"use client";

import React from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Upload,
  Typography,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

const { TextArea } = Input;
const { Option } = Select;
const { Title } = Typography;

const CorruptionReportForm = () => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    console.log("Form Submitted: ", values);
    message.success("گزارش شما با موفقیت ارسال شد.");
    form.resetFields();
  };

  return (
    <div className="min-h-screen flex">

      <div className="flex-1 bg-white p-10 md:p-16 overflow-auto">
        <Form
          layout="vertical"
          form={form}
          onFinish={handleFinish}
          autoComplete="off"
          scrollToFirstError
          colon={false}
          className="max-w-xl mx-auto"
        >
          <Form.Item
            label="موضوع"
            name="topic"
            rules={[{ required: true, message: "لطفاً موضوع را انتخاب کنید" }]}
          >
            <Select placeholder="انتخاب کنید">
              <Option value="مالی">مالی</Option>
              <Option value="اداری">اداری</Option>
              <Option value="سیاسی">سیاسی</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="دستگاه اجرایی"
            name="organization"
            rules={[{ required: true, message: "لطفاً دستگاه اجرایی را انتخاب کنید" }]}
          >
            <Select placeholder="انتخاب کنید">
              <Option value="وزارتخانه">وزارتخانه</Option>
              <Option value="شهرداری">شهرداری</Option>
              <Option value="شرکت دولتی">شرکت دولتی</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="موضوع تخصصی"
            name="special_topic"
            rules={[{ required: true, message: "لطفاً موضوع تخصصی را انتخاب کنید" }]}
          >
            <Select placeholder="انتخاب کنید">
              <Option value="مناقصات">مناقصات</Option>
              <Option value="پروژه‌ها">پروژه‌ها</Option>
              <Option value="تخصیص بودجه">تخصیص بودجه</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="نوع گزارش"
            name="report_type"
            rules={[{ required: true, message: "لطفاً نوع گزارش را انتخاب کنید" }]}
          >
            <Select placeholder="انتخاب کنید">
              <Option value="گزارش مستند">گزارش مستند</Option>
              <Option value="مشاهده شخصی">مشاهده شخصی</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="فوریت رسیدگی به فساد"
            name="urgency"
            rules={[{ required: true, message: "لطفاً فوریت رسیدگی را انتخاب کنید" }]}
          >
            <Select placeholder="انتخاب کنید">
              <Option value="عادی">عادی</Option>
              <Option value="فوری">فوری</Option>
            </Select>
          </Form.Item>

          <Form.Item label="برآورد ارزش فساد (تومان)" name="estimated_value">
            <Input placeholder="مقدار تقریبی به تومان" type="number" min={0} />
          </Form.Item>

          <Form.Item
            label="محدوده جغرافیایی تاثیر فساد"
            name="location"
            rules={[{ required: true, message: "لطفاً محدوده جغرافیایی را انتخاب کنید" }]}
          >
            <Select placeholder="انتخاب کنید">
              <Option value="محلی">محلی</Option>
              <Option value="استانی">استانی</Option>
              <Option value="ملی">ملی</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="سطح سازمانی مشارکت در فساد"
            name="organization_level"
            rules={[{ required: true, message: "لطفاً سطح سازمانی را انتخاب کنید" }]}
          >
            <Select placeholder="انتخاب کنید">
              <Option value="کارشناسی">کارشناسی</Option>
              <Option value="مدیریتی">مدیریتی</Option>
              <Option value="عالی">عالی</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="شرح گزارش"
            name="description"
            rules={[{ required: true, message: "لطفاً شرح گزارش را وارد کنید" }]}
          >
            <TextArea rows={6} placeholder="توضیحات کامل درباره فساد" />
          </Form.Item>

          <Form.Item
            label="پیوست سند (اختیاری)"
            name="attachment"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          >
            <Upload beforeUpload={() => false} maxCount={1} accept=".pdf,.doc,.docx,.jpg,.png">
              <Button icon={<UploadOutlined />}>انتخاب فایل</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="کد امنیتی"
            name="captcha"
            rules={[{ required: true, message: "لطفاً کد امنیتی را وارد کنید" }]}
          >
            <Input placeholder="کد امنیتی را وارد کنید" />
          </Form.Item>

          <div className="flex justify-between mt-6">
            <Button
              htmlType="reset"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800"
            >
              انصراف
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-indigo-700 hover:bg-indigo-800 border-none"
            >
              ارسال گزارش
            </Button>
          </div>
        </Form>
      </div>


      <div className="hidden md:flex flex-1 bg-gradient-to-r from-[#004974] to-[#006f95] text-white flex-col relative justify-center items-center p-12">
        <Link href="/" className="absolute left-5 top-5 bg-black/50 hover:bg-black/40 rounded-[50%] p-1 ">
          <Icon icon="lets-icons:back" width="44" height="44" />
        </Link>
        <h2 className="text-4xl font-extrabold mb-6 text-center">فرم ثبت گزارش فساد (ناشناس)</h2>
        <p className="text-lg max-w-md text-center">
          لطفاً اطلاعات مربوط به فساد را با دقت وارد کنید.  
          گزارش شما ناشناس باقی خواهد ماند و به فوریت رسیدگی خواهد شد.
        </p>
        <div className="relative w-full h-64 mt-8 rounded-xl overflow-hidden">
          <Image
            src="/images/44.jpg"
            alt="ضد فساد"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black opacity-20" />
        </div>
      </div>
    </div>
  );
};

export default CorruptionReportForm;
