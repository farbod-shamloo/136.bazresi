"use client";

import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col, message, Spin } from "antd";
import { Icon } from "@iconify/react";
import MyJalaliDatePicker from "@/utils/MyJalaliDatePicker";
import Link from "next/link";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {
  getCaptcha,
  generateExternalUserRegisterOTPWithCaptcha,
} from "@/services/user";
import FormLayout from "@/layout/FormLayout";
import Image from "next/image";

const validateNationalCode = (_, value) => {
  if (!value) return Promise.reject(new Error("اجباری"));
  if (!/^\d{10}$/.test(value))
    return Promise.reject(new Error("کد ملی معتبر نیست"));

  const check = +value[9];
  const sum =
    [...Array(9)].reduce((acc, _, i) => acc + +value[i] * (10 - i), 0) % 11;
  if ((sum < 2 && check === sum) || (sum >= 2 && check === 11 - sum))
    return Promise.resolve();
  return Promise.reject(new Error("کد ملی معتبر نیست"));
};

function Registerotp({ setStep }) {
  const [form] = Form.useForm();
  const [captchaBase64, setCaptchaBase64] = useState("");
  const [captchaText, setCaptchaText] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [loadingCaptcha, setLoadingCaptcha] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true); // اضافه شد

  const {
    data: captchaData,
    isLoading: captchaIsLoading,
    refetch: fetchCaptcha,
  } = useQuery({
    queryKey: ["captcha"],
    queryFn: getCaptcha,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (captchaData?.dntCaptchaImage && captchaData?.dntCaptchaText) {
      setCaptchaBase64(captchaData.dntCaptchaImage);
      setCaptchaText(captchaData.dntCaptchaText);
      setCaptchaToken(captchaData.dntCaptchaToken);
      setInitialLoading(false);
    }
  }, [captchaData]);

const mutation = useMutation({
  mutationFn: generateExternalUserRegisterOTPWithCaptcha,
  onSuccess: (data) => {
    toast.success("ثبت نام با موفقیت انجام شد!");
    setStep(2);
  },
  onError: (error) => {
    toast.error(error.message || "خطا در ثبت نام");
    fetchCaptcha();
  },
});
  const onFinish = async (values) => {
    console.log("bith date" ,values.birthDate)
    
    const birthDateUnix = values.birthDate?.unix;
    const birthDateISO = birthDateUnix
    ? new Date(birthDateUnix * 1000).toISOString().split("T")[0]
    : "";
    
    const formData = new FormData();
    formData.append("LastName", values.lastName);
    formData.append("Mobile", values.phone);
    formData.append("FatherName", values.fatherName);
    formData.append("DNTCaptchaInputText", values.captcha);
    formData.append("DNTCaptchaText", captchaText);
    formData.append("DNTCaptchaToken", captchaToken);
    formData.append("BirthDate", birthDateISO);
    formData.append("FirstName", values.firstName);
    formData.append("NationalCode", values.nationalCode);

    mutation.mutate(formData);
  };

  const onFocusValidate = (name) => {
    form.validateFields([name]);
  };

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Spin size="large" tip="در حال بارگذاری..." />
      </div>
    );
  }

  return (
    <div>
      <div className="relative z-10 bg-white bg-opacity-95 p-9 rounded-lg shadow-lg w-full max-w-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl text-[#292b2c]">ثبت نام </h2>
          <Link href="./login">
            
              <Icon icon="ic:baseline-arrow-back" width="28" height="28" />
            
          </Link>
        </div>

        {/* <FormLayout title="ثبت نام"> */}
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            requiredMark="optional"
            scrollToFirstError
          >
                        <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label={
                    <span>
                      شماره موبایل <span className="text-red-500">*</span>
                    </span>
                  }
                  name="phone"
                  rules={[
                    { required: true, message: "اجباری" },
                    { pattern: /^\d+$/, message: "فقط عدد وارد کنید" },
                  ]}
                  validateTrigger={["onFocus", "onBlur", "onChange"]}
                >
                  <Input
                    className="w-full !py-1.5 !rounded-[12px]"
                    maxLength={11}
                    onFocus={() => onFocusValidate("phone")}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      form.setFieldsValue({ phone: val });
                    }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  label={
                    <span>
                      کد ملی <span className="text-red-500">*</span>
                    </span>
                  }
                  name="nationalCode"
                  rules={[{ validator: validateNationalCode }]}
                  validateTrigger={["onFocus", "onBlur", "onChange"]}
                >
                  <Input
                    className="w-full !py-1.5 !rounded-[12px]"
                    maxLength={10}
                    onFocus={() => onFocusValidate("nationalCode")}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      form.setFieldsValue({ nationalCode: val });
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label={
                    <span>
                      نام <span className="text-red-500">*</span>
                    </span>
                  }
                  name="firstName"
                  rules={[{ required: true, message: "اجباری" }]}
                >
                  <Input
                    className="w-full !py-1.5 !rounded-[12px]"
                    onFocus={() => onFocusValidate("firstName")}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  label={
                    <span>
                      نام خانوادگی <span className="text-red-500">*</span>
                    </span>
                  }
                  name="lastName"
                  rules={[{ required: true, message: "اجباری" }]}
                >
                  <Input
                    className="w-full !py-1.5 !rounded-[12px]"
                    onFocus={() => onFocusValidate("lastName")}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label={
                    <span>
                      نام پدر <span className="text-red-500">*</span>
                    </span>
                  }
                  name="fatherName"
                  rules={[{ required: true, message: "اجباری" }]}
                >
                  <Input
                    className="w-full !py-1.5 !rounded-[12px]"
                    onFocus={() => onFocusValidate("fatherName")}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  label={
                    <span>
                      تاریخ تولد <span className="text-red-500">*</span>
                    </span>
                  }
                  name="birthDate"
                  rules={[{ required: true, message: "اجباری" }]}
                >
                  <MyJalaliDatePicker />
                </Form.Item>
              </Col>
            </Row>


            <Row gutter={16} align="middle">
              <Col xs={24} sm={12}>
                <Form.Item
                  label={
                    <span>
                      کد امنیتی <span className="text-red-500">*</span>
                    </span>
                  }
                  name="captcha"
                  rules={[
                    { required: true, message: "اجباری" },
                   
                  ]}
                >
                  <Input
                    className="w-full !py-1.5 !rounded-[12px]"
                    onFocus={() => onFocusValidate("captcha")}
                    autoComplete="off"
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <div className="flex items-center gap-3 h-[50px]">
                  {captchaIsLoading || loadingCaptcha ? (
                    <div className="w-[150px] h-[50px] flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : captchaBase64 ? (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          setLoadingCaptcha(true);
                          fetchCaptcha()
                            .then((res) => {
                              if (res?.data?.dntCaptchaImage) {
                                setCaptchaBase64(res.data.dntCaptchaImage);
                              }
                            })
                            .catch(() => {
                              message.error("خطا در دریافت کد امنیتی");
                            })
                            .finally(() => setLoadingCaptcha(false));
                        }}
                        className="text-gray-600 hover:text-blue-600 transition"
                        title="بارگذاری کپچا جدید"
                      >
                        <Icon icon="mdi:refresh" width="24" height="24" />
                      </button>
                      <Image
                        src={`data:image/png;base64,${captchaBase64}`}
                        alt="کد امنیتی"
                        width={140}
                        height={50}
                        className="select-none rounded"
                      />
                    </>
                  ) : (
                    <div>کد امنیتی دریافت نشد</div>
                  )}
                </div>
              </Col>
            </Row>

            <Form.Item className="mt-4 text-center">
              <Button
                htmlType="submit"
                className="!bg-[#135388] hover:bg-[#0f3768] !text-white w-full !py-5 rounded-xl"
              >
                ثبت نام
              </Button>
            </Form.Item>
            
          </Form>
        {/* </FormLayout> */}
      </div>
    </div>
  );
}

export default Registerotp;
