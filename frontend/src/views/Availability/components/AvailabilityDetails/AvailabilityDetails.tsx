import { Dispatch, useEffect, useRef, useState } from 'react';
import { TimeCell } from '../AvailabilityGrid/AvailabilityGrid'
import './availabilityDetails.scss'

interface IAvailabilityDetails {
  currentCell?: TimeCell;
  userCount: number;
  setUserNumber: Dispatch<number>;
  detailsRef: React.RefObject<HTMLDivElement>;
}

export const AvailabilityDetails = ({currentCell, userCount, setUserNumber, detailsRef} : IAvailabilityDetails) => {
  const handleRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(window.innerHeight - 144);
  const touchStartPosition = useRef(0);

  const handleTouchStart = (event: any) => {
    touchStartPosition.current = event.touches[0].clientY
  };

  const handleTouchMove = (event: any) => {
    const touchCurrentPosition = event.touches[0].clientY
    const delta = touchCurrentPosition - touchStartPosition.current;
    console.log(position + delta);
    
    setPosition(position + delta);
    touchStartPosition.current = touchCurrentPosition;
  };

  const preventDefault = (event: any) => {
    event.preventDefault()
  }

  useEffect(() => {
    handleRef.current?.addEventListener('touchmove', preventDefault, {passive: false})
  }, [])
  
  return (
    <div className='DetailsWrapper' ref={detailsRef}  style={{
      transform: `translateY(${position}px)`,
    }}>
      <div className='DetailsHandle' ref={handleRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >

        <div></div>
      </div>
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
