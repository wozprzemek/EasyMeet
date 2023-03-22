import { EyeIcon, EyeSlashIcon, LinkIcon, PlusIcon, UserPlusIcon } from '@heroicons/react/24/outline'
import { getMeeting } from 'api/getMeeting'
import { Button } from 'components/Button/Button'
import { ContentLayout } from 'components/ContentLayout/ContentLayout'
import { Loading } from 'components/Loading/Loading'
import { Modal } from 'components/Modal/Modal'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router'
import { ButtonSize, ButtonType } from 'types'
import { Meeting } from 'types/Meeting'
import { AvailabilityDetails } from '../components/AvailabilityDetails/AvailabilityDetails'
import { AvailabilityGrid, TimeCell } from '../components/AvailabilityGrid/AvailabilityGrid'
import './availability.scss'

export const Availability = () => {
  const {id} = useParams()
  const {data: meetingData, status: meetingStatus, refetch: meetingRefetch} = useQuery<Meeting>(['meeting', id], () => getMeeting(id))
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showAllAvailabilities, setShowAllAvailabilities] = useState(true) // Show all marked availabilities
  const [currentCell, setCurrentCell] = useState<TimeCell>() // Current hover position
  const [userCount, setUserNumber] = useState(Object.keys((meetingData && meetingData.availabilities) ?? {}).length)
  
  const visibilityToggle = async () => {
    await meetingRefetch()
    setShowAllAvailabilities(!showAllAvailabilities)
  }
  
  const handleModalOff = async () => {
    await meetingRefetch()
    setShowModal(false)
    document.body.style.overflow = 'visible';
  }

  const handleModalOn = () => {
    document.body.style.overflow = 'hidden';
    setShowModal(true)
    setUser('')
    setPassword('')
  }

  const handleInvite = async () => {
    const message = `Meeting: ${meetingData?.name}\n${meetingData?.password ? `Password: ${meetingData.password}\n` : ''}localhost:3000/meetings/${id}`
    await navigator.clipboard.writeText(message)
  }

  if (meetingStatus === 'loading' && meetingData === undefined) {
    console.log('LOADING..');
    return <Loading />
  }
  
  return (
    <ContentLayout>
        {showModal ? <Modal setEditMode={setEditMode} setShowAllAvailabilities={setShowAllAvailabilities} password={meetingData?.password ? password : undefined}
        off={() => handleModalOff()} setUser={setUser} setPassword={meetingData?.password ? setPassword : undefined}/>: null }
          <div className='AvailabilityWrapper'>
              <div className='AvailabilityWrapperContent'>
                  <div className='AvailabilityHeader'>
                      <h1>{meetingData?.name}</h1>
                      <h2>{userCount} participants</h2>
                      <Button type={ButtonType.OUTLINE_GRAY} size={ButtonSize.LG} onClick={() => handleInvite()}>
                        <UserPlusIcon width='1.25rem'/>
                        Invite
                      </Button>
                  </div>
                  <div className='GridButtonWrapper'>
                    <AvailabilityGrid userCount={userCount} setUserNumber={setUserNumber} currentCell={currentCell} setCurrentCell={setCurrentCell} 
                    editMode={editMode} user={user} meetingData={meetingData} showAllAvailabilities={showAllAvailabilities}/>
                    { editMode ? 
                        <Button type={ButtonType.CIRCLE} size={ButtonSize.LG} onClick={() => visibilityToggle()}>
                        {
                          showAllAvailabilities ? <EyeSlashIcon className='Icon'/> : <EyeIcon className='Icon'/>
                        }
                      </Button> 
                      : <Button type={ButtonType.CIRCLE} size={ButtonSize.LG} onClick={() => handleModalOn()}><PlusIcon/></Button> 
                    }
                  </div>
                  <AvailabilityDetails userCount={userCount} setUserNumber={setUserNumber} currentCell={currentCell} />
              </div>
          </div>
    </ContentLayout>
  )
}
