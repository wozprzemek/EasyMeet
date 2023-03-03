import { PlusIcon } from '@heroicons/react/24/outline'
import { getMeeting } from 'api/getMeeting'
import { updateAvailabilities } from 'api/updateUserAvailabilities'
import { Button } from 'components/Button/Button'
import { ContentLayout } from 'components/ContentLayout/ContentLayout'
import { Modal } from 'components/Modal/Modal'
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
  const [user, setUser] = useState('test')
  const [password, setPassword] = useState('')
  const [availabilities, setAvailabilities] = useState<TAvailability[]>([])
  const [editMode, setEditMode] = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    console.log(availabilities);
  }, [availabilities])

  useEffect(() => {
    console.log(user);
  }, [user])

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

  return (
    <ContentLayout>
        {showModal ? <Modal setEditMode={setEditMode} user={user} password={password} off={() => setShowModal(false)} setUser={setUser} setPassword={setPassword}/>: null }
        <div className='Wrapper'>
            <div className='WrapperContent'>
                <div className='TitleWrapper'>
                    <h1>{meetingData?.name}</h1>
                    <h2>5 participants</h2>
                </div>
                <AvailabilityGrid editMode={editMode} user={user} meetingData={meetingData} availabilities={availabilities} setAvailabilities={setAvailabilities}/>
            </div>
            { editMode ? <Button type={ButtonType.SOLID} size={ButtonSize.LG} onClick={() => handleSave()}>Create</Button>
              : <Button type={ButtonType.CIRCLE} size={ButtonSize.LG} onClick={() => setShowModal(true)}><PlusIcon/></Button> 
            }
        </div>
    </ContentLayout>
  )
}