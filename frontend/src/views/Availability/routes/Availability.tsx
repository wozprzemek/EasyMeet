import { EyeIcon, EyeSlashIcon, LinkIcon, PlusIcon, UserPlusIcon } from '@heroicons/react/24/outline'
import { getMeeting } from 'api/getMeeting'
import { Button } from 'components/Button/Button'
import { ContentLayout } from 'components/ContentLayout/ContentLayout'
import { Loading } from 'components/Loading/Loading'
import { Modal } from 'components/Modal/Modal'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useLocation, useParams } from 'react-router'
import { ButtonSize, ButtonType } from 'types'
import { Meeting } from 'types/Meeting'
import { User } from 'views/CreateMeeting/types'
import { AvailabilityGrid, TimeCell } from '../components/AvailabilityGrid/AvailabilityGrid'
import { AvailabilityLegend } from '../components/AvailabilityLegend/AvailabilityLegend'
import './availability.scss'

export const Availability = () => {
  const {id} = useParams()
  const location = useLocation();
  const [copied, setCopied] = useState(false)
  const {data: meetingData, status: meetingStatus, refetch: meetingRefetch} = useQuery<Meeting>(['meeting', id], () => getMeeting(id))
  const [user, setUser] = useState<User | undefined>()
  const [password, setPassword] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showAllAvailabilities, setShowAllAvailabilities] = useState(true) // Show all marked availabilities
  const [currentCell, setCurrentCell] = useState<TimeCell>() // Current hover position
  const [userCount, setUserNumber] = useState(Object.keys((meetingData && meetingData.users) ?? {}).length)
  
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
    setUser(undefined)
    setPassword('')
  }

  const handleInvite = async () => {
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
  }

  if (meetingStatus === 'loading' && meetingData === undefined) {
    return <Loading />
  }

  return (
    <ContentLayout>
        {showModal ? <Modal setEditMode={setEditMode} setShowAllAvailabilities={setShowAllAvailabilities}
        off={() => handleModalOff()} setUser={setUser}/>: null }
          <div className='AvailabilityWrapper'>
              <div className='AvailabilityWrapperContent'>
                  {/* <div className='AvailabilityHeaderWrapper'> */}
                    <div className='AvailabilityHeader'>
                        <h1>{meetingData?.name}</h1>
                        <h2>{userCount} participants</h2>
                        <Button type={ButtonType.OUTLINE_GRAY} size={ButtonSize.LG} onClick={() => handleInvite()}>
                          <LinkIcon className='Icon'  />
                          {copied ? 'Copied!' : 'Share'}
                        </Button>
                    </div>
                  <div className='GridButtonWrapper'>
                    <AvailabilityGrid userCount={userCount} setUserNumber={setUserNumber} currentCell={currentCell} setCurrentCell={setCurrentCell} 
                    editMode={editMode} user={user} meetingData={meetingData} showAllAvailabilities={showAllAvailabilities}/>
                    { editMode ? 
                    <>
                        <Button type={ButtonType.CIRCLE} size={ButtonSize.LG} onClick={() => visibilityToggle()}>
                        {
                          showAllAvailabilities ? <EyeSlashIcon className='Icon'/> : <EyeIcon className='Icon'/>
                        }
                      </Button> 
                      Toggle all availabilities
                    </>
                      : 
                    <>
                      <Button type={ButtonType.CIRCLE} size={ButtonSize.LG} onClick={() => handleModalOn()}><PlusIcon className='Icon'/></Button> 
                      Add your availability
                    </> 
                    }
                    <AvailabilityLegend userCount={userCount}/>
                  </div>
              </div>
          </div>
    </ContentLayout>
  )
}
