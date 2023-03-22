import { Bars3Icon, SunIcon } from "@heroicons/react/24/outline"
import logo from 'assets/logo.svg'
import { Button } from 'components/Button/Button'
import { Link } from 'react-router-dom'
import { ButtonSize, ButtonType } from 'types'
import './topBar.scss'

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
        <Link to='/create/'><Button type={ButtonType.OUTLINE} size={ButtonSize.SM}>Create</Button></Link>
      </div>
      <Bars3Icon className='ShowMenuButton'/>
    </div>
  )
}
