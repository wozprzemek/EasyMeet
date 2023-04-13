import { Dispatch, useCallback, useEffect, useRef, useState } from 'react';
import { TimeCell } from '../AvailabilityGrid/AvailabilityGrid'
import './availabilityDetails.scss'
import { useWindowDimensions } from 'hooks/useWindowDimensions';
import { Meeting } from 'types/Meeting';

interface IAvailabilityDetails {
  currentCell?: TimeCell;
  userCount: number;
  setUserNumber: Dispatch<number>;
  detailsRef: React.RefObject<HTMLDivElement>;
  meetingData: Meeting | undefined;
}

export const AvailabilityDetails = ({currentCell, userCount, setUserNumber, detailsRef, meetingData} : IAvailabilityDetails) => {
  const handleRef = useRef<HTMLDivElement>(null);
  const initialPosition = window.innerHeight - 140;
  const [position, setPosition] = useState(initialPosition);
  const touchStartPosition = useRef(0);
  const breakpoints = {initial: initialPosition, header: initialPosition - 92, participants: initialPosition - 300, full: 0}  // Breakpoints for details panel to snap to
  const currentBreakpoint = useRef(breakpoints.initial)
  const [transitionEnabled, setTransitionEnabled] = useState(false);
  const [hidePanel, setHidePanel] = useState(false);

  const { width, height } = useWindowDimensions()

  const handlePanelPosition = useCallback(() => {
    if(position < breakpoints.participants - (breakpoints.participants - 0) / 2) {
      currentBreakpoint.current = breakpoints.full
      setPosition(breakpoints.full)
    }
    else if(position < breakpoints.header - (breakpoints.header - breakpoints.participants) / 2) {
      currentBreakpoint.current = breakpoints.participants
      setPosition(breakpoints.participants)
    }
    else if (position >= initialPosition - (initialPosition- breakpoints.header) / 2) {
      setHidePanel(true)
      currentBreakpoint.current = breakpoints.initial
      setPosition(initialPosition)
    }
    else if (position < initialPosition - (initialPosition- breakpoints.header) / 2) {
      currentBreakpoint.current = breakpoints.header
      setPosition(breakpoints.header)
    }
    console.log(currentBreakpoint);
    
  }, [position])

  useEffect(() => {
    console.log(currentBreakpoint);
    setPosition(currentBreakpoint.current)    
  }, [height])

  useEffect(() => {
    // Hide the panel if the window is resized
    if (position !== initialPosition) {
      setPosition(initialPosition)
    }
  }, [height])

  useEffect(() => {
    // Show the panel if a cell is selected and the panel is hidden
    if (currentCell && !hidePanel && position === initialPosition) {
      setPosition(breakpoints.header)
    }
  }, [currentCell])

  const handleTouchStart = (event: any) => {
    touchStartPosition.current = event.touches[0].clientY
    // if (position == initialPosition) {
    //   setPosition(breakpoints.header)
    // }
  };

  const handleTouchMove = (event: any) => {
    setTransitionEnabled(false)
    const touchCurrentPosition = event.touches[0].clientY
    const delta = touchCurrentPosition - touchStartPosition.current;
    
    if (position + delta >= 0 && position + delta <= initialPosition) {
      setPosition(position + delta);
    }
    touchStartPosition.current = touchCurrentPosition;
  };

  const handleTouchEnd = (event: any) => {
    setTransitionEnabled(true)
    handlePanelPosition()
  }

  const preventDefault = (event: any) => {
    event.preventDefault()
  }

  useEffect(() => {
    handleRef.current?.addEventListener('touchmove', preventDefault, {passive: false})
  }, [])
  
  return (
    <div className='DetailsWrapper' ref={detailsRef}  style={{
      transform: `${width <= 768 ? `translateY(${position}px`: ''}`,
      transition: transitionEnabled ? "transform 0.2s ease-out" : "none", // Apply transition only on touchend
    }}>
      <div className='DetailsHandle' ref={handleRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div></div>
      </div>
      <div className='DetailsContent'>
        <div className='DetailsHeader'>
          <h1>Selected Availability</h1>
          {currentCell ? 
            <h3>{currentCell?.markedBy.length ?? 0}/{userCount} ({userCount ? Math.round((currentCell?.markedBy.length ?? 0) / userCount * 100) : 0}%)</h3>
            : <h3>-/-</h3>
          }
          <h2>{currentCell?.time.toString().split('GMT')[0] ?? 'Select a date'}</h2>
        </div>
        <div className='DetailsColumns'>
          <div className='DetailsColumn'>
            <h4>Available</h4>
            <div>
              {currentCell?.markedBy.length ?
              currentCell?.markedBy.map((user) => {
                return <h5>{user}</h5>
              })
              : null
              }
            </div>
          </div>

          <div className='DetailsColumn'>
            <h4>Unavailable</h4>
            <div>
              {meetingData ?
              meetingData.users.map((user) => {
                if (!currentCell?.markedBy.includes(user.name)) {
                  return <h5>{user.name}</h5>
                }
              })
              : <h5>-</h5>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
