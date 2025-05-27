// components/FormLayout.tsx
import React, { ReactNode } from 'react'

type FormLayoutProps = {
  title: string
  children: ReactNode
}

const FormLayout = ({ title, children }: FormLayoutProps) => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white">
     
      {children}
    </div>
  )
}

export default FormLayout
