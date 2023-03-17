import { Dispatch } from 'react';
import { TimeCell } from '../AvailabilityGrid/AvailabilityGrid'
import './availabilityDetails.scss'

interface IAvailabilityDetails {
  currentCell?: TimeCell;
  userCount: number;
  setUserNumber: Dispatch<number>;
}

export const AvailabilityDetails = ({currentCell, userCount, setUserNumber} : IAvailabilityDetails) => {
  return (
    <div className='DetailsWrapper'>
      <div className='DetailsColumn'>
        <h1>Selected Availability</h1>
        <h2>{currentCell?.time.toString().split('GMT')[0]}</h2>
        <h3>{currentCell?.markedBy.length ?? 0}/{userCount} ({userCount ? Math.round((currentCell?.markedBy.length ?? 0) / userCount * 100) : 0}%)</h3>
        <div className=''>
          {currentCell?.markedBy.length ?
          currentCell?.markedBy.map((user) => {
            return <h4>{user}</h4>
          })
          : <h4>No users</h4>
          }
        </div>
      </div>
    </div>
  )
}
