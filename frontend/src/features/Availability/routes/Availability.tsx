import { getMeeting } from 'api/getMeeting'
import { ContentLayout } from 'components/ContentLayout/ContentLayout'
import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router'
import { Meeting } from 'types/Meeting'
import { AvailabilityColumn } from '../components/AvailabilityColumn/AvailabilityColumn'
import './availability.scss'

export const Availability = () => {

  const {id} = useParams()

  const {data: meetingData, status: meetingStatus} = useQuery<Meeting>(['meeting'], () => getMeeting(id))

 
  
  
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
                <AvailabilityColumn />
            </div>
        </div>
    </ContentLayout>
  )
}
