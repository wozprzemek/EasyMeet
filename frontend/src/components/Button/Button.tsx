import React from 'react'
import { ButtonSize, ButtonType } from 'types'
import './button.scss'

interface IButton {
    type: ButtonType,
    size: ButtonSize,
    onClick: () => void,
    children: React.ReactNode,
}

export const Button = ({type, size, onClick, children} : IButton) => {
  return (
    <button onClick={onClick} className={`Button 
      ${type===ButtonType.OUTLINE ? 'Button--outline' :
          type===ButtonType.SOLID ? 'Button--solid' :
          type===ButtonType.TEXT ? 'Button--text' :
          type===ButtonType.CIRCLE ? 'Button--circle' : ''}

      ${size===ButtonSize.SM ? 'Button--small' :
        size===ButtonSize.LG ? 'Button--large' : ''}`}
    >
        {children}
    </button>
  )
}
