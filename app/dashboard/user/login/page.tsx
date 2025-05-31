"use client";

import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col, message } from "antd";
import Link from "next/link";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCaptcha, LoginWithExternalCaptcha } from "@/services/user";
import { Icon } from "@iconify/react/dist/iconify.js";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
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

const LoginPage = () => {
  const router = useRouter();
  const [form] = Form.useForm();
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

  const loginMutation = useMutation({
    mutationFn: LoginWithExternalCaptcha,
    onSuccess: (data) => {
      Swal.fire({
        icon: "success",
        title: "ورود با موفقیت انجام شد!",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        didClose: () => {
          router.push("/");
        },
      });
      console.log("Login Success:", data);
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "خطا",
        text: error?.message || "ورود ناموفق بود",
        confirmButtonText: "باشه",
      });
      console.error("Login Error:", error);
      fetchCaptcha();
    },
  });

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("UserName", values.nationalCode);
    formData.append("Password", values.password);
    formData.append("DNTCaptchaInputText", values.captcha);
    formData.append("DNTCaptchaText", captchaText);
    formData.append("DNTCaptchaToken", captchaToken);

    loginMutation.mutate(formData);
  };

  const onFocusValidate = (name) => {
    form.validateFields([name]);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{ backgroundImage: "url('/images/31.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-60 z-0"></div>

      <div className="relative z-10 bg-white bg-opacity-90 rounded-2xl shadow-lg max-w-5xl w-full mx-4 flex flex-col md:flex-row overflow-hidden">
        <div className="flex-1 p-8 md:p-10 flex flex-col justify-center text-white items-center text-center animated-gradient-bg">
          <img
            className="w-[150px] md:w-[200px] mb-6"
            src="/images/allah.svg"
            alt=""
          />
          <div className="text-sm opacity-70 leading-relaxed">
            <p>درگـاه سـامانه‌های یکپـارچه</p>
            <p>سازمان بازرسی کل کشور</p>
            <br />
            <Link href="#">
              <p className="hover:underline cursor-pointer">www.136.ir</p>
            </Link>
          </div>
        </div>

        <div className="flex-1 p-6 md:p-10">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            requiredMark="optional"
            scrollToFirstError
          >
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
                  رمز عبور <span className="text-red-500">*</span>
                </span>
              }
              name="password"
              rules={[{ required: true, message: "اجباری" }]}
              validateTrigger={["onFocus", "onBlur"]}
            >
              <Input.Password
                onFocus={() => onFocusValidate("password")}
                className="w-full !py-1.5 !rounded-[12px]"
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
              <Row gutter={[12, 12]} align="middle" wrap>
                <Col flex="1 1 150px" className="min-w-[150px]">
                  <Input
                    placeholder="کد امنیتی را وارد کنید"
                    onFocus={() => onFocusValidate("captcha")}
                    className="w-full !py-1.5 !rounded-[12px]"
                  />
                </Col>

                <Col flex="0 0 auto" className="min-w-[180px]">
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
                          height={50}
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

            <Form.Item className="mt-6">
              <Button
                htmlType="submit"
                className="!bg-[#135388] hover:!bg-[#0f3768] !text-white w-full !py-5 rounded-xl"
              >
                ورود
              </Button>
            </Form.Item>
          </Form>

          <div className="mt-6 text-center text-sm space-y-2">
          <div>
              <Link href="./register" className="text-[#135388] hover:underline">
              <Button className="w-[100%] border py-1.5 border-gray-300 rounded-3xl">
                ثبت نام شهروند
              </Button>
            </Link>

          </div>
            <div className="flex justify-center items-center gap-4">
              <Link
                href="login/forgot"
                className="text-[#135388] hover:underline"
              >
                فراموشی رمز عبور
              </Link>
              <span>|</span>
              <Link
                href="login/changeNumber"
                className="text-[#135388] hover:underline"
              >
                تغییر شماره
              </Link>
            </div>

            <div className="flex items-center justify-center gap-2 mt-6 mb-2 text-gray-500">
              <div className="flex-grow border-t border-gray-300"></div>
              <span>ورود از طریق</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="flex flex-row justify-center items-center gap-4">
              <Button
                onClick={() =>
                  (window.location.href = "https://sso.my.gov.ir/login")
                }
                className="bg-[#135388] text-white rounded-lg px-6 py-2 hover:bg-[#0f3768] w-auto flex items-center justify-center gap-2"
              >
                <Image
                  src="/images/dolatMan.png"
                  alt="دولت من"
                  width={20}
                  height={20}
                />
                دولت من
              </Button>

              <Button
                onClick={() =>
                  (window.location.href =
                    "https://iehraz.adliran.ir/Login/Authenticate?ReturnUrl=https://my.adliran.ir/RealPerson/Index&SystemName=RealPersonService&isSelectNaturalPerson=True&isSelectNaturalForigenPerson=True&isSelectLegalPerson=False&isSelectJudPerson=False&LoginTitle=%d8%ae%d8%af%d9%85%d8%a7%d8%aa%20%d9%82%d8%b6%d8%a7%db%8c%db%8c%20%d9%85%d9%86")
                }
                className="bg-[#ccc] text-[#333] rounded-lg px-6 py-2 hover:bg-[#bbb] w-auto flex items-center justify-center gap-2"
              >
                <Image
                  src="/images/sanalogo.png"
                  alt="ثنا قوه قضاییه"
                  width={20}
                  height={20}
                />
                ثنا قوه قضاییه
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
