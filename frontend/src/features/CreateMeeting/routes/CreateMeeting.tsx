import { createMeeting } from 'api/createMeeting'
import { Button } from 'components/Button/Button'
import { ContentLayout } from 'components/ContentLayout/ContentLayout'
import { DateType } from 'features/CreateMeeting/types'
import { useCallback, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { ButtonSize, ButtonType } from 'types'
import { Calendar } from '../components/Calendar/Calendar'
import { DetailsForm } from '../components/DetailsForm/DetailsForm'
import './createMeeting.scss'

export const CreateMeeting = () => {
  const navigate = useNavigate()
  const [name, setName] = useState<string>(``)
  const [enablePassword, setEnablePassword] = useState<boolean>(false)
  const [password, setPassword] = useState<string>(``)
  const [from, setFrom] = useState<string>(`09:00`)
  const [to, setTo] = useState<string>(`17:00`)
  const [selectedDates, setSelectedDates] = useState<DateType[]>([])

  const handleCreate = async () => {
    const today = new Date().toISOString().split('T')[0]
    const meeting = {
      name,
      password,
      from: `${today} ${from}`,
      to: `${today} ${to}`,
      dates: selectedDates
    }
    let createdMeeting = undefined
    try {
      createdMeeting = await createMeeting(meeting)
      
      if (createdMeeting) {
        navigate(`/meetings/${createdMeeting}`)
      }
    }
    catch (error) {
      console.error(error)
    }
  }

  useCallback(
    async () => {
      await handleCreate()
    },
    [name, enablePassword, password, from, to, selectedDates],
  )
  
  return (
    <ContentLayout>
        <div className='Wrapper'>
            <div className='WrapperContent'>
                <div className='TitleInputWrapper'>
                  <input type="text" placeholder='New Meeting Name' className='TitleInput' value={name} onChange={e => setName(e.target.value)}></input>
                  <span className='SetPasswordContainer'>
                    <span>
                      <input type="checkbox" className='PasswordCheckbox' checked={enablePassword} onChange={e => setEnablePassword(e.target.checked)}/>
                      <span>Set Password</span>
                    </span>
                      <input type='text' placeholder='Enter password' className={`PasswordInput ${enablePassword ? 'PasswordInput--enabled' : 'PasswordInput--disabled'}`}
                        value={password} disabled={!enablePassword} onChange={e => setPassword(e.target.value)}></input>
                  </span>
                </div>
                <div className='ColumnWrapper'>
                  <Calendar selectedDates={selectedDates} setSelectedDates={setSelectedDates}/>
                  <DetailsForm from={from} setFrom={setFrom} to={to} setTo={setTo}/>
                </div>
                <Button type={ButtonType.SOLID} size={ButtonSize.LG}onClick={handleCreate}>Create</Button>
            </div>
        </div>
    </ContentLayout>
  )
}
