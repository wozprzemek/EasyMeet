import { ContentLayout } from 'components/ContentLayout/ContentLayout'
import React from 'react'
import { AvailabilityColumn } from '../components/AvailabilityColumn/AvailabilityColumn'
import './availability.scss'

export const Availability = () => {
  return (
    <ContentLayout>
        <div className='Wrapper'>
            <div className='WrapperContent'>
                <div className='TitleWrapper'>
                    <h1>Important Team Meeting</h1>
                    <h2>5 participants</h2>
                </div>
                <AvailabilityColumn />
            </div>
        </div>
    </ContentLayout>
  )
}
