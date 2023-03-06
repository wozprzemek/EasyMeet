import { PlusIcon } from '@heroicons/react/24/outline'
import { getMeeting } from 'api/getMeeting'
import { Button } from 'components/Button/Button'
import { ContentLayout } from 'components/ContentLayout/ContentLayout'
import { Modal } from 'components/Modal/Modal'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router'
import { ButtonSize, ButtonType } from 'types'
import { Meeting } from 'types/Meeting'
import { AvailabilityGrid } from '../components/AvailabilityGrid/AvailabilityGrid'
import './availability.scss'

export const Availability = () => {
  const {id} = useParams()
  const {data: meetingData, status: meetingStatus, refetch: meetingRefetch} = useQuery<Meeting>(['meeting', id], () => getMeeting(id))
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [showModal, setShowModal] = useState(false)

  console.log('AVAILABILITY');
  
  const handleModalOff = async () => {
    await meetingRefetch()
    setShowModal(false)
  }

  const handleModalOn = () => {
    setShowModal(true)
    setUser('')
    setPassword('')
  }


  if (meetingStatus === 'loading' && meetingData === undefined) {
    return null
  }
  
  // console.log(meetingData && Object.keys(meetingData?.availabilities).length)
  
  return (
    <ContentLayout>
        {showModal ? <Modal setEditMode={setEditMode} password={meetingData?.password ? password : undefined}
        off={() => handleModalOff()} setUser={setUser} setPassword={meetingData?.password ? setPassword : undefined}/>: null }
        <div className='Wrapper'>
            <div className='WrapperContent'>
                <div className='TitleWrapper'>
                    <h1>{meetingData?.name}</h1>
                    <h2>{meetingData && Object.keys(meetingData?.availabilities).length} participants</h2>
                </div>
                <AvailabilityGrid editMode={editMode} user={user} meetingData={meetingData}/>
                { editMode ? <span>Your input is saved automatically.</span>
                  : <Button type={ButtonType.CIRCLE} size={ButtonSize.LG} onClick={() => handleModalOn()}><PlusIcon/></Button> 
                }
            </div>
        </div>
    </ContentLayout>
  )
}