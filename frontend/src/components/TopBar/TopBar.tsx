import React from 'react'
import './topBar.scss'
import logo from 'assets/logo.svg'
import { Button } from 'components/Button/Button'
import { ButtonType } from 'types'
import { Bars2Icon, Bars3Icon, SunIcon } from "@heroicons/react/24/outline";

const Logo = () => {
  return (
    <div className='Logo'>
      <img src={logo} className='LogoImage' />
      <span>MeetMe</span>
    </div>
  )
}

export const TopBar = () => {
  return (
    <div className='TopBarContainer'>
      <Logo />
      <div className='ButtonContainer'>
        <SunIcon className='ModeChangeButton'></SunIcon>
        <Button type={ButtonType.TEXT} text='About' onClick={() => console.log('about')} />
        <Button type={ButtonType.OUTLINE} text='Create' onClick={() => console.log('create')} />
      </div>
      <Bars3Icon className='ShowMenuButton'/>
    </div>
  )
}
