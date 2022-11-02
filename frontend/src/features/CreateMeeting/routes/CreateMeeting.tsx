import { Button } from 'components/Button/Button'
import { ContentLayout } from 'components/ContentLayout/ContentLayout'
import React from 'react'
import { ButtonType } from 'types'
import { Calendar } from '../components/Calendar/Calendar'
import { DetailsForm } from '../components/DetailsForm/DetailsForm'
import './createMeeting.scss'

export const CreateMeeting = () => {
  return (
    <ContentLayout>
        <div className='Wrapper'>
            <div className='WrapperContent'>
                <div className='TitleInputWrapper'>
                  <input type="text" placeholder='New Meeting Name' className='TitleInput'></input>
                  <span className='SetPasswordContainer'><input type="checkbox" className='PasswordCheckbox' />
                      <span>Set Password</span>
                      <input type='text' className='PasswordInput'></input>
                  </span>
                </div>
                <div className='ColumnWrapper'>
                  <Calendar />
                  <DetailsForm />
                </div>
                <Button type={ButtonType.SOLID} text="Create" onClick={() => console.log('CREATE')}/>
            </div>
        </div>
    </ContentLayout>
  )
}
