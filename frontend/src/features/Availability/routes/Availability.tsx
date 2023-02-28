import { getMeeting } from 'api/getMeeting'
import { updateAvailabilities } from 'api/updateUserAvailabilities'
import { Button } from 'components/Button/Button'
import { ContentLayout } from 'components/ContentLayout/ContentLayout'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router'
import { ButtonSize, ButtonType } from 'types'
import { Availability as TAvailability } from 'types/Availability'
import { Meeting } from 'types/Meeting'
import { AvailabilityGrid } from '../components/AvailabilityGrid/AvailabilityGrid'
import './availability.scss'

export const Availability = () => {

  const {id} = useParams()
  const {data: meetingData, status: meetingStatus} = useQuery<Meeting>(['meeting', id], () => getMeeting(id))
  const [user, setUser] = useState<string>('test')
  const [availabilities, setAvailabilities] = useState<TAvailability[]>([])

  useEffect(() => {
    console.log(availabilities);
  }, [availabilities])

  const handleSave = async () => {
    try {
      const updateData = {
        meeting: id!,
        user: user,
        availabilities: availabilities
      }
      await updateAvailabilities(updateData)
    }
    catch(error){ 
      console.error(error)
    }
  }

  if (meetingStatus === 'loading' && meetingData === undefined) {
    return null
  }

  console.log(meetingData, meetingStatus);
  
  
  return (
    <ContentLayout>
        <div className='Wrapper'>
            <div className='WrapperContent'>
                <div className='TitleWrapper'>
                    <h1>{meetingData?.name}</h1>
                    <h2>5 participants</h2>
                </div>
                <AvailabilityGrid user={user} meetingData={meetingData} availabilities={availabilities} setAvailabilities={setAvailabilities}/>
            </div>
            <Button type={ButtonType.SOLID} size={ButtonSize.LG} text="Save" onClick={() => handleSave()}/>
        </div>
    </ContentLayout>
  )
}
