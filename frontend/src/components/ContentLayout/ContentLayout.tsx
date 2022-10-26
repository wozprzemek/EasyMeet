import React, { ReactNode } from 'react'
import './contentLayout.scss'

interface IContentLayout {
  children : ReactNode
}

export const ContentLayout = ({children} : IContentLayout) => {
  return (
    <div className='contentLayoutContainer'>
      {children}
    </div>
  )
}
