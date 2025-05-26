'use client'

import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Row, Col, message } from 'antd'
import { Icon } from '@iconify/react'
import MyJalaliDatePicker from '@/utils/MyJalaliDatePicker'
import Link from 'next/link'

const validateNationalCode = (_, value) => {
  if (!value) return Promise.reject(new Error('اجباری'))
  if (!/^\d{10}$/.test(value)) return Promise.reject(new Error('کد ملی معتبر نیست'))

  const check = +value[9]
  const sum = [...Array(9)].reduce((acc, _, i) => acc + +value[i] * (10 - i), 0) % 11
  if ((sum < 2 && check === sum) || (sum >= 2 && check === 11 - sum)) return Promise.resolve()
  return Promise.reject(new Error('کد ملی معتبر نیست'))
}

const RegisterPage = () => {
  const [form] = Form.useForm()
  const [captchaBase64, setCaptchaBase64] = useState('')
  const [loadingCaptcha, setLoadingCaptcha] = useState(false)

  const fetchCaptcha = async () => {
    setLoadingCaptcha(true)
    try {
      const res = await fetch(
        'https://api.bazresi.ir/api/v1/Authenticate/CreateExternalCaptcha?BackColor=red&ForeColor=blue&FontSize=24'
      )
      const data = await res.json()
      if (data && data.dntCaptchaImage) {
        setCaptchaBase64(data.dntCaptchaImage)
      }
    } catch (error) {
      console.error('خطا در دریافت کپچا:', error)
      message.error('خطا در دریافت کد امنیتی')
    } finally {
      setLoadingCaptcha(false)
    }
  }

  useEffect(() => {
    fetchCaptcha()
  }, [])

  const onFinish = (values) => {
    if (!values.captcha) {
      message.error('کد امنیتی را وارد کنید')
      return
    }
    // چون کد واقعی کپچا نداریم، فقط بررسی می‌کنیم چیزی وارد شده باشه
    message.success('ثبت نام با موفقیت انجام شد!')
    console.log('Form values:', values)
  }


  const onFocusValidate = (name) => {
    form.validateFields([name])
  }

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/images/31.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-70 z-0" />

      <div className="relative z-10 bg-white bg-opacity-95 p-6 rounded-lg shadow-lg w-full max-w-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl text-[#292b2c]">ثبت نام </h2>
          <Link href="/">
          <button>
            <Icon icon="ic:baseline-arrow-back" width="28" height="28" />
          </button></Link>
        </div>

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
                  { required: true, message: 'اجباری' },
                  { pattern: /^\d+$/, message: 'فقط عدد وارد کنید' },
                ]}
                validateTrigger={['onFocus', 'onBlur', 'onChange']}
              >
                <Input
                  className="w-full !py-1.5 !rounded-[12px]"
                  maxLength={11}
                  onFocus={() => onFocusValidate('phone')}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '')
                    form.setFieldsValue({ phone: val })
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
                validateTrigger={['onFocus', 'onBlur', 'onChange']}
              >
                <Input
                  className="w-full !py-1.5 !rounded-[12px]"
                  maxLength={10}
                  onFocus={() => onFocusValidate('nationalCode')}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '')
                    form.setFieldsValue({ nationalCode: val })
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
                rules={[{ required: true, message: 'اجباری' }]}
              >
                <Input className="w-full !py-1.5 !rounded-[12px]" onFocus={() => onFocusValidate('firstName')} />
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
                rules={[{ required: true, message: 'اجباری' }]}
              >
                <Input className="w-full !py-1.5 !rounded-[12px]" onFocus={() => onFocusValidate('lastName')} />
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
                rules={[{ required: true, message: 'اجباری' }]}
              >
                <Input className="w-full !py-1.5 !rounded-[12px]" onFocus={() => onFocusValidate('fatherName')} />
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
                rules={[{ required: true, message: 'اجباری' }]}
              >
                <MyJalaliDatePicker />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label={
                  <span>
                    کد امنیتی <span className="text-red-500">*</span>
                  </span>
                }
                name="captcha"
                rules={[{ required: true, message: 'اجباری' }]}
              >
                <Input
                  className="w-full !py-1.5 !rounded-[12px]"
                  placeholder="کد امنیتی را وارد کنید"
                  onFocus={() => onFocusValidate('captcha')}
                  autoComplete="off"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} className="flex items-center justify-center">
              {captchaBase64 ? (
                <img
                  src={`data:image/png;base64,${captchaBase64}`}
                  alt="کد امنیتی"
                  style={{ cursor: 'pointer', userSelect: 'none', borderRadius: 8 }}
                  onClick={fetchCaptcha} // کلیک برای رفرش کپچا
                  width={150}
                  height={50}
                  title="برای دریافت کپچا جدید کلیک کنید"
                />
              ) : loadingCaptcha ? (
                <div>در حال بارگذاری...</div>
              ) : (
                <div>کد امنیتی دریافت نشد</div>
              )}
            </Col>
          </Row>

          <Form.Item className="mt-4 text-center">
            <Button
              htmlType="submit"
              className="!bg-[#135388] hover:bg-[#0f3768] !text-white w-full md:w-[100%] !py-5 rounded-xl"
            >
              ثبت نام
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default RegisterPage
