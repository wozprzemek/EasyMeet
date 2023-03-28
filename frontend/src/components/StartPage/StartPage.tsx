import { ContentLayout } from 'components/ContentLayout/ContentLayout'
import React from 'react'
import rect1 from 'assets/rect1.svg'
import rect2 from 'assets/rect2.svg'
import rect3 from 'assets/rect3.svg'
import rect4 from 'assets/rect4.svg'
import rect5 from 'assets/rect5.svg'
import rect6 from 'assets/rect6.svg'
import './startPage.scss'
import createMeetingImage from 'assets/createMeeting.svg'
import selectAvailabilityImage from 'assets/selectAvailability.svg'
import { Button } from 'components/Button/Button'
import { ButtonSize, ButtonType } from 'types'
import { Link } from 'react-router-dom'

export const StartPage = () => {
  const bannerRects = [rect1, rect2, rect3, rect4, rect5, rect6]
  return (
    <ContentLayout>
      <div className='HeroSectionWrapper'>
        <div className='HeroSectionContent'>
            <div className='HeroSectionText'>
              <h1>Schedule meetings with ease</h1>
              <h2>Organize your meetings easily with the help of simple availability polls.</h2>
              <Link to='/create/'><Button size={ButtonSize.LG} type={ButtonType.SOLID}>Create</Button></Link>
            </div>
        </div>
        <div className='BannerImageContainer'>
          {Array.from(Array(6).keys()).map((i) => {
            return (
              <img src={bannerRects[i]} className='hidden' />
            )
          })}
        </div>
      </div>
      <div className='InfoSection'>
        <div className='InfoSectionContent'>
          <img src={createMeetingImage} className='InfoSectionImage' />
          <div className='InfoSectionText'>
            <h1>Create a meeting first</h1>
            <h2>Select the possible date(s) for the meeting. You can limit availability hours for the selected dates.</h2>
          </div>
        </div>
      </div>
      <div className='InfoSection'>
          <div className='InfoSectionContent'>
            <div className='InfoSectionText'>
              <h1>Share the meeting with your colleagues</h1>
              <h2>They can mark their availability times using a simple poll. Bookmark the meeting and come back to decide the optimal meeting time based on your team's availability.</h2>
            </div>
            <img src={selectAvailabilityImage} className='InfoSectionImage' />
          </div>
      </div>
      <div className='Footer'>
        <span><a href='https://github.com/wozprzemek'>By Przemysław Woźniak</a></span>
      </div>
    </ContentLayout>
  )
}