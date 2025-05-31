'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Registerotp from '../otp/Registerotp'
import OtpForm from '../otp/OtpForm'

const RegisterPage = () => {
  const [step, setStep] = useState(1)
  const todayDate = useMemo(() => {
    const today = new Date()
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', weekday: 'long' }
    return today.toLocaleDateString('fa-IR', options)
  }, [])

  return (
    <div>
      <div
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center px-4"
        style={{ backgroundImage: "url('/images/31.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-70 z-0" />
        {step === 1 && <Registerotp setStep={setStep} />}
        {step === 2 && <OtpForm setStep={setStep} />}
      </div>

      <footer className="fixed bottom-0 w-full bg-[rgba(0,0,0,0.6)] text-white text-center py-2 text-sm z-50">
        {todayDate}
      </footer>
    </div>
  )
}

export default RegisterPage
