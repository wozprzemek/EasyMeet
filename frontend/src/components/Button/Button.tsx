import React from 'react'
import { ButtonSize, ButtonType } from 'types'
import './button.scss'

interface IButton {
    type: ButtonType,
    size: ButtonSize,
    text: string,
    onClick: () => void
}

export const Button = ({type, size, text, onClick} : IButton) => {
  return (
    <button onClick={onClick} className={`Button 
      ${type===ButtonType.OUTLINE ? 'Button--outline' :
          type===ButtonType.SOLID ? 'Button--solid' :
          type===ButtonType.TEXT ? 'Button--text' : ''}

      ${size===ButtonSize.SM ? 'Button--small' :
        size===ButtonSize.LG ? 'Button--large' : ''}`}
    >
        {text}
    </button>
  )
}
