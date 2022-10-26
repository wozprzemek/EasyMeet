import { ContentLayout } from 'components/ContentLayout/ContentLayout'
import React from 'react'
import banner from 'assets/banner.svg'
import './heroPage.scss'

export const HeroPage = () => {
  return (
    <ContentLayout>
      <div className='HeroLayoutWrapper'>
        <div className='HeroLayoutContainer'>
          <div className='HeroTextSectionContainer'>
            <h1 className='HeroTextSectionHeader'>Schedule meetings with ease</h1>
            <h2 className='HeroTextDescription'>Organize your meetings easily with the help of simple availability polls.</h2>
          </div>
          <img src={banner} className='BannerImage'></img>
        </div>
      </div>
    </ContentLayout>
  )
}