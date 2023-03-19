import { TopBar } from 'components/TopBar/TopBar'
import React, { ReactNode } from 'react'
import './mainLayout.scss'

interface IMainLayout {
  children : ReactNode
}

export const MainLayout = ({children} : IMainLayout) => {
  return (
    <main className='mainWrapper'>
      <TopBar />
      {children}
    </main>
    
  )
}
