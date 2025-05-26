'use client'

import React, { useState } from 'react'
import { Form, Input, Button, Row, Col, message } from 'antd'
import Link from 'next/link'

const validateNationalCode = (_, value) => {
  if (!value) return Promise.reject(new Error('اجباری'))
  if (!/^\d{10}$/.test(value)) return Promise.reject(new Error('کد ملی معتبر نیست'))

  const check = +value[9]
  const sum = [...Array(9)].reduce((acc, _, i) => acc + +value[i] * (10 - i), 0) % 11
  if ((sum < 2 && check === sum) || (sum >= 2 && check === 11 - sum)) return Promise.resolve()
  return Promise.reject(new Error('کد ملی معتبر نیست'))
}

const LoginPage = () => {
  const [form] = Form.useForm()
  const [captchaCode, setCaptchaCode] = useState('A1b2C')

  const onFinish = (values) => {
    if (values.captcha !== captchaCode) {
      message.error('کد امنیتی صحیح نیست')
      return
    }
    message.success('ورود با موفقیت انجام شد!')
    console.log('Form values:', values)
  }

  const onFocusValidate = (name) => {
    form.validateFields([name])
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{ backgroundImage: "url('/images/31.jpg')" }}
    >
      {/* لایه نیمه شفاف روی عکس */}
      <div className="absolute inset-0 bg-black opacity-60 z-0"></div>

      {/* فرم */}
      <div className="relative z-10 bg-white bg-opacity-90 rounded-2xl shadow-lg max-w-5xl w-full mx-4 flex overflow-hidden">
        {/* سمت چپ */}
        <div className="flex-1 bg-[#135388] p-10 flex flex-col justify-center text-white">
         <img className='w-[200px] m-auto' src="/images/allah.svg" alt="" />
          <div className="m-auto text-sm opacity-70">
           <p> درگـاه سـامانه‌های یکپـارچه </p>
           <p> سازمان بازرسی کل کشور </p>
           <br />
           <Link href="#"> www.136.ir </Link>
          </div>
        </div>

        {/* سمت راست - فرم */}
        <div className="flex-1 p-10">
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
              validateTrigger={['onFocus', 'onBlur', 'onChange']}
            >
              <Input
                maxLength={10}
                onFocus={() => onFocusValidate('nationalCode')}
                className="w-full !py-1.5 !rounded-[12px]"
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '')
                  form.setFieldsValue({ nationalCode: val })
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
              rules={[{ required: true, message: 'اجباری' }]}
              validateTrigger={['onFocus', 'onBlur']}
            >
              <Input.Password
                onFocus={() => onFocusValidate('password')}
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
              rules={[{ required: true, message: 'اجباری' }]}
              validateTrigger={['onFocus', 'onBlur']}
            >
              <Row gutter={16} align="middle">
                <Col flex="auto">
                  <Input
                    placeholder="کد امنیتی را وارد کنید"
                    onFocus={() => onFocusValidate('captcha')}
                    className="w-full !py-1.5 !rounded-[12px]"
                  />
                </Col>
                <Col>
                  <div className="mt-2 bg-gray-300 rounded text-center py-2 text-gray-800 font-bold select-none px-4">
                    🔒 {captchaCode}
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
              <a href="#" className="text-[#135388] hover:underline">
                ثبت نام شهروند
              </a>
            </div>

            <div className="flex justify-center items-center gap-4">
              <a href="#" className="text-[#135388] hover:underline">
                فراموشی رمز عبور
              </a>
              <span>|</span>
              <a href="#" className="text-[#135388] hover:underline">
                تغییر شماره
              </a>
            </div>

            <div className="flex items-center justify-center gap-2 mt-6 mb-2 text-gray-500">
              <div className="flex-grow border-t border-gray-300"></div>
              <span>ورود از طریق</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="flex justify-center gap-4">
              <Button className="bg-[#135388] text-white rounded-lg px-6 py-2 hover:bg-[#0f3768]">
                دولت من
              </Button>
              <Button className="bg-[#ccc] text-[#333] rounded-lg px-6 py-2 hover:bg-[#bbb]">
                ثنا قوه قضاییه
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
