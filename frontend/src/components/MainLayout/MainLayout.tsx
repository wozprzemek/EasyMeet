import { TopBar } from 'components/TopBar/TopBar'
import React, { ReactNode } from 'react'
import './mainLayout.scss'

interface IMainLayout {
  children : ReactNode
}

export const MainLayout = ({children} : IMainLayout) => {
  console.log(process.env.REACT_APP_API_BASE_URL);
  console.log(process.env.REACT_APP_TEST);
  console.log(process.env.TEST);
  console.log(process.env.NODE_ENV);
  return (
    <main className='mainWrapper'>
      <TopBar />
      {children}
    </main>
    
  )
}
