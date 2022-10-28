import React from 'react'
import { ButtonType } from 'types'
import './button.scss'

interface IButton {
    type: ButtonType,
    text: string,
    onClick: () => void
}

export const Button = ({type, text, onClick} : IButton) => {
  return (
    <button onClick={onClick} className={`Button ${type===ButtonType.OUTLINE ? 'Button--outline' : type===ButtonType.SOLID ? 'Button--solid' : type===ButtonType.TEXT ? 'Button--text' : ''}`}>
        {text}
    </button>
  )
}
