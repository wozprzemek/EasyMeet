import { Dispatch, useCallback, useEffect, useRef, useState } from 'react';
import { TimeCell } from '../AvailabilityGrid/AvailabilityGrid'
import './availabilityDetails.scss'
import { useWindowDimensions } from 'hooks/useWindowDimensions';

interface IAvailabilityDetails {
  currentCell?: TimeCell;
  userCount: number;
  setUserNumber: Dispatch<number>;
  detailsRef: React.RefObject<HTMLDivElement>;
}

export const AvailabilityDetails = ({currentCell, userCount, setUserNumber, detailsRef} : IAvailabilityDetails) => {
  const handleRef = useRef<HTMLDivElement>(null);
  const initialPosition = window.innerHeight - 140;
  const [position, setPosition] = useState(initialPosition);
  const touchStartPosition = useRef(0);
  const breakpoints = {header: initialPosition - 92, participants: initialPosition - 300}  // Breakpoints for details panel to snap to
  const [transitionEnabled, setTransitionEnabled] = useState(false);
  const [hidePanel, setHidePanel] = useState(false);

  const { height } = useWindowDimensions()

  const handlePanelPosition = useCallback(() => {
    if(position < breakpoints.participants - (breakpoints.participants - 0) / 2) {
      setPosition(0)
    }
    else if(position < breakpoints.header - (breakpoints.header - breakpoints.participants) / 2) {
      setPosition(breakpoints.participants)
    }
    else if (position >= initialPosition - (initialPosition- breakpoints.header) / 2) {
        setHidePanel(true)
        setPosition(initialPosition)
    }
    else if (position < initialPosition - (initialPosition- breakpoints.header) / 2) {
      setPosition(breakpoints.header)
    }
  }, [position, height])

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
      transform: `translateY(${position}px)`,
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
        <div>
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
