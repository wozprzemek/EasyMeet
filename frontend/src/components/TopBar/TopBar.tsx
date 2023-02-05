import React from 'react'
import './topBar.scss'
import logo from 'assets/logo.svg'
import { Button } from 'components/Button/Button'
import { ButtonSize, ButtonType } from 'types'
import { Bars2Icon, Bars3Icon, SunIcon } from "@heroicons/react/24/outline";
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <div className='Logo'>
      <img src={logo} className='LogoImage' />
      <span>EasyMeet</span>
    </div>
  )
}

export const TopBar = () => {
  return (
    <div className='TopBarContainer'>
      <Link to='/'><Logo /></Link>
      <div className='ButtonContainer'>
        <SunIcon className='ModeChangeButton'></SunIcon>
        <Button type={ButtonType.TEXT} size={ButtonSize.SM} text='About' onClick={() => console.log('about')} />
        <Link to='/create/'><Button type={ButtonType.OUTLINE} size={ButtonSize.SM} text='Create' onClick={() => console.log('create')} /></Link>
      </div>
      <Bars3Icon className='ShowMenuButton'/>
    </div>
  )
}
