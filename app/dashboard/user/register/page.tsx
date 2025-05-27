'use client'

import React, { useState, useEffect } from 'react'

import Registerotp from '../otp/Registerotp'
import OtpForm from '../otp/OtpForm'



const RegisterPage = () => {


  const [step , setStep] = useState(1)

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/images/31.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-70 z-0" />
  { step === 1 && <Registerotp setStep={setStep}/>}
  { step === 2 && <OtpForm setStep={setStep}/>}
      </div>
    
  )
}

export default RegisterPage
