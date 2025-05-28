import ActionForm from '@/components/ActionForm'
import React from 'react'

function page() {
  return (
     <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{ backgroundImage: "url('/images/31.jpg')" }}
    >

      <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
       <ActionForm />

    </div>
  )
}

export default page
