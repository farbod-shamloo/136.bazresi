'use client';

import React, { useEffect, useState } from "react";
import { Form, Input, Button, Typography, message, Row, Col, Image } from "antd";
import { CheckCircleTwoTone, CloseCircleTwoTone, ArrowLeftOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useQuery } from "@tanstack/react-query";
import { getCaptcha } from "@/services/user";

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

const { Title } = Typography;

const ActionForm = ({ onSubmit, type }) => {
  const [loading, setLoading] = useState(false);
  const [captchaBase64, setCaptchaBase64] = useState("");
  const [captchaText, setCaptchaText] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [loadingCaptcha, setLoadingCaptcha] = useState(false);

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
    }
  }, [captchaData]);

  const onFocusValidate = (name) => {
    form.validateFields([name]);
  };

  const title =
    type === "resetPassword"
      ? "فراموشی رمز عبور"
      : type === "changeNumber"
      ? "تغییر شماره همراه"
      : "تایید شماره"; 

  const handleFinish = async (values) => {
    setLoading(true);
    try {
      await onSubmit(values);
      message.success({
        content: (
          <span>
            <CheckCircleTwoTone twoToneColor="#52c41a" className="ml-2" />
            عملیات با موفقیت انجام شد
          </span>
        ),
        duration: 3,
      });
    } catch (error) {
      message.error({
        content: (
          <span>
            <CloseCircleTwoTone twoToneColor="#ff4d4f" className="ml-2" />
            خطا در انجام عملیات
          </span>
        ),
        duration: 3,
      });
    } finally {
      setLoading(false);
    }
  };


  const handleBack = () => {
  
    window.history.back();
  };

  return (
    <Form
      layout="vertical"
      onFinish={handleFinish}
      className="flex flex-col gap-4 p-8 rounded-xl max-w-md mx-auto"
    >
      <div className="flex justify-between items-center gap-2 mb-4 cursor-pointer select-none" onClick={handleBack}>
        <Title level={4} className="!m-0">
          {title}
        </Title>
        <ArrowLeftOutlined style={{ fontSize: 20 }} />
      </div>

     
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
          maxLength={10}
          onFocus={() => onFocusValidate("nationalCode")}
          className="w-full !py-1.5 !rounded-[12px]"
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, "");
            form.setFieldsValue({ nationalCode: val });
          }}
        />
      </Form.Item>

     
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

     
      <Form.Item
        label={
          <span>
            کد امنیتی <span className="text-red-500">*</span>
          </span>
        }
        name="captcha"
        rules={[{ required: true, message: "اجباری" }]}
        validateTrigger={["onFocus", "onBlur"]}
      >
        <Row gutter={16} align="middle" className="flex-col sm:flex-row">
          <Col flex="auto" className="w-full sm:w-auto mb-4 sm:mb-0">
            <Input
              placeholder="کد امنیتی را وارد کنید"
              onFocus={() => onFocusValidate("captcha")}
              className="w-full !py-1.5 !rounded-[12px]"
            />
          </Col>
          <Col xs={24} sm={12}>
            <div className="flex items-center gap-3 h-[50px] justify-center sm:justify-start">
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
                    width={150}
                    height={30}
                    unoptimized={true}
                    draggable={false}
                    className="select-none rounded"
                  />
                </>
              ) : (
                <div>کد امنیتی دریافت نشد</div>
              )}
            </div>
          </Col>
        </Row>
      </Form.Item>

      <Button type="primary" htmlType="submit" loading={loading} className="!bg-[#00375c] !p-5">
        ارسال کد تایید
      </Button>
    </Form>
  );
};

export default ActionForm;
