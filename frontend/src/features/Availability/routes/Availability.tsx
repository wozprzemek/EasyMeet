import { getMeeting } from 'api/getMeeting'
import { updateMeeting } from 'api/updateMeeting'
import { Button } from 'components/Button/Button'
import { ContentLayout } from 'components/ContentLayout/ContentLayout'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router'
import { ButtonSize, ButtonType } from 'types'
import { Availability as TAvailability} from 'types/Availability'
import { Meeting } from 'types/Meeting'
import { AvailabilityGrid } from '../components/AvailabilityGrid/AvailabilityGrid'
import './availability.scss'

export const Availability = () => {

  const {id} = useParams()
  const {data: meetingData, status: meetingStatus} = useQuery<Meeting>(['meeting', id], () => getMeeting(id))
  const [availabilities, setAvailabilities] = useState<any[]>([])

  useEffect(() => {
    console.log(availabilities);
  }, [availabilities])

  const handleSave = async () => {
    const updateData = meetingData
    if (updateData) {
      updateData.availabilities = availabilities
      await updateMeeting(id, updateData)
    }
  }
  
  
  if (meetingStatus === 'loading' && meetingData === undefined) {
    return null
  }
  
  return (
    <ContentLayout>
        <div className='Wrapper'>
            <div className='WrapperContent'>
                <div className='TitleWrapper'>
                    <h1>{meetingData?.name}</h1>
                    <h2>5 participants</h2>
                </div>
                <AvailabilityGrid meetingData={meetingData} availabilities={availabilities} setAvailabilities={setAvailabilities}/>
            </div>
            <Button type={ButtonType.SOLID} size={ButtonSize.LG} text="Save" onClick={() => handleSave()}/>
        </div>
    </ContentLayout>
  )
}
