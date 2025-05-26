import DashboardLayout from '@/layout/DashboardLayout'
import React from 'react'
import CardList from './common/CardList'


function HomePage() {
  return (
    <div>
      <DashboardLayout>
       <CardList /> 
      </DashboardLayout>
    </div>
  )
}

export default HomePage
