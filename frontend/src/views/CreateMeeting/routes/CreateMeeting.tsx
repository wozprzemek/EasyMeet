import { createMeeting } from 'api/createMeeting'
import { Button } from 'components/Button/Button'
import { ContentLayout } from 'components/ContentLayout/ContentLayout'
import { DateType } from 'views/CreateMeeting/types'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { ButtonSize, ButtonType } from 'types'
import { Calendar } from '../components/Calendar/Calendar'
import { TimeForm } from '../components/TimeForm/TimeForm'
import './createMeeting.scss'
import moment from 'moment'

export const CreateMeeting = () => {
  const navigate = useNavigate()
  const [name, setName] = useState(``)
  const [from, setFrom] = useState(`09:00`)
  const [to, setTo] = useState(`17:00`)
  const [selectedDates, setSelectedDates] = useState<DateType[]>([])

  const defaultErrorMsg = { name: '', to: '', from: '', dates: ''}
  const [errorMsg, setErrorMsg] = useState(defaultErrorMsg);

  const handleCreate = useCallback(async () => {
    const today = new Date().toISOString().split('T')[0]
    const meeting = {
      name,
      from: `${today} ${from}`,
      to: `${today} ${to}`,
      dates: selectedDates.map(date => {
        return {...date, month: date.month + 1} // adjust month
      }),
      users: []
    }
    let createdMeeting = undefined
    try {
      if (validate()) {
        createdMeeting = await createMeeting(meeting)
        if (createdMeeting) {
          navigate(`/meetings/${createdMeeting}`)
        }
      }
    }
    
    catch (error) {
      console.error(error)
    }
  }, [name, from, to, selectedDates])

  const validate = useCallback(() => {
    let correct = true;
    
    if (name.length === 0) {
      setErrorMsg(errorMsg => ({ ...errorMsg, 'name': 'Enter the meeting name' }));
      correct = false;
    }
    
    if (moment(to, "hh:mm").isSameOrBefore(moment(from, "hh:mm"))) {
      setErrorMsg(errorMsg => ({ ...errorMsg, 'to': 'End time must be after start time' }));
      correct = false;
    }
    
    if (selectedDates.length === 0) {
      setErrorMsg(errorMsg => ({ ...errorMsg, 'dates': 'You must select at least one date' }));
      correct = false;
    }

    return correct;
  }, [name, from, to, selectedDates])
  
  useEffect(() => {
    if (selectedDates.length > 0) setErrorMsg(errorMsg => ({ ...errorMsg, 'dates': '' }));
  }, [selectedDates])

  useEffect(() => {
    if (name.length > 0) setErrorMsg(errorMsg => ({ ...errorMsg, 'name': '' }));
  }, [name])

  useEffect(() => {
    if (moment(to, "hh:mm").isAfter(moment(from, "hh:mm"))) {
      setErrorMsg(errorMsg => ({ ...errorMsg, 'to': '' }));
    }
  }, [to])
  
  return (
    <ContentLayout>
        <div className='Wrapper'>
            <div className='WrapperContent'>
                <div className='TitleInputWrapper'>
                  <div>
                    <input type="text" placeholder='New Meeting Name' className={`TitleInput ${errorMsg.name.length > 0 ? 'ErrorInput' : ''}`} value={name} onChange={e => setName(e.target.value)}></input>
                    {errorMsg.name.length > 0 ? <span className='ErrorMsg'>{errorMsg.name}</span> : <span></span>}
                  </div>
                </div>
                <div className='ColumnWrapper'>
                  <Calendar errorMsg={errorMsg.dates} selectedDates={selectedDates} setSelectedDates={setSelectedDates}/>
                  <TimeForm from={from} setFrom={setFrom} to={to} setTo={setTo} errorMsg={{from: errorMsg.from, to: errorMsg.to}}/>
                </div>
                <Button type={ButtonType.SOLID} size={ButtonSize.LG} onClick={handleCreate}>Create</Button>
            </div>
        </div>
    </ContentLayout>
  )
}
