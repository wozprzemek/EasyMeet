import { ContentLayout } from 'components/ContentLayout/ContentLayout'
import React from 'react'
import { Calendar } from '../components/Calendar/Calendar'
import './createMeeting.scss'

export const CreateMeeting = () => {
  return (
    <ContentLayout>
        <div className='Wrapper'>
            <div className='WrapperContent'>
                <input type="text" placeholder='New Meeting Name' className='TitleInput'></input>
                <span className='SetPasswordContainer'><input type="checkbox" className='PasswordCheckbox' />
                    <span>Set Password</span>
                    <input type='text' className='PasswordInput'></input>
                </span>
                <Calendar />
            </div>
            
        </div>
        
    </ContentLayout>
  )
}
