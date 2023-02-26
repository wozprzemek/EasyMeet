import { getMeeting } from 'api/getMeeting'
import { Button } from 'components/Button/Button'
import { ContentLayout } from 'components/ContentLayout/ContentLayout'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router'
import { ButtonSize, ButtonType } from 'types'
import { Meeting } from 'types/Meeting'
import { AvailabilityGrid } from '../components/AvailabilityGrid/AvailabilityGrid'
import './availability.scss'

export const Availability = () => {

  const {id} = useParams()
  const {data: meetingData, status: meetingStatus} = useQuery<Meeting>(['meeting', id], () => getMeeting(id))
  const [availabilities, setAvailabilities] = useState<any[]>([])
  
  if (meetingStatus === 'loading' && meetingData === undefined) {
    return null
  }
  console.log(meetingData?.dates?.[0].date);
  console.log(new Date(meetingData!.dates[0].date).toString().split(' ').slice(0, 3));
  
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
            <Button type={ButtonType.SOLID} size={ButtonSize.LG} text="Save" onClick={() => console.log('Save')}/>
        </div>
    </ContentLayout>
  )
}
