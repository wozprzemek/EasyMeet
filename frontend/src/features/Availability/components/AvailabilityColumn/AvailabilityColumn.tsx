import React, { MouseEventHandler, useEffect, useState } from 'react'
import './availabilityColumn.scss'

type Position = {
  x: number,
  y: number
}

type TimeWindow = {
  time: Date,
  selected: boolean,
  position: Position,
  saved: boolean
}

const isBetween = (n : number, a: number, b: number) => (n - a) * (n - b) <= 0

export const AvailabilityColumn = () => {

  const timeWindowsPlaceholder = Array.from(
    {length: 8},
    (_, i) => Array.from(
      {length: 32},
      (_, j) => ({
        time: new Date(),
        selected: false,
        position: {x: i, y: j},
        saved: false
      })
    )
  )

  const handleTimeWindowClick = (i?: number, j?: number) => {
    setTimeWindows(timeWindows.map((column: any, i_: number) => 
      column.map((timeWindow: TimeWindow, j_: number) => {
        if (i === i_ && j === j_) {
              return { ...timeWindow, selected: !timeWindow.selected }
            } 
            else {
              return timeWindow
            }
      })
    ))
  }

  const handleGridSelect = () => {
    setTimeWindows(timeWindows.map((column: any, i: number) => 
      column.map((timeWindow: TimeWindow, j: number) => {
        if (isBetween(i, currentCell!.position.x, startCell!.position.x) && isBetween(j, currentCell!.position.y, startCell!.position.y)) {
          return { ...timeWindow, selected: !startCell?.selected }
        } 
        else {
          if (timeWindow.saved){
            return {...timeWindow}
          }
          else {
            return { ...timeWindow, selected: false}
          }
          
        }
      })
    ))
  }

  const gridSelect = (event: any, timeWindow: TimeWindow) => {
    if (event.type === 'mousedown') {
      setIsClicked(true)
      setStartCell(timeWindow)
    }
    else if (event.type === 'mouseup') {
      setIsClicked(false)

      // "save" the selected cells
      setTimeWindows(timeWindows.map((column: any, i: number) => 
        column.map((timeWindow: TimeWindow, j: number) => {
          if (timeWindow.selected) {
            return {...timeWindow, saved: true}
          }
          else {
            return {...timeWindow, saved: false}
          }
        })
      ))
    }

    if (event.type === 'mouseenter') {
      setCurrentCell(timeWindow)
    }
  }

  const [timeWindows, setTimeWindows] = useState(timeWindowsPlaceholder)

  const [startCell, setStartCell] = useState<TimeWindow>() // saved position at mouse click
  const [currentCell, setCurrentCell] = useState<TimeWindow>() // current hover position
  const [isClicked, setIsClicked] = useState(false) // is mouse currently down
  
  useEffect(() => {
    console.log(isClicked)
  }, [isClicked])
  
  useEffect(() => {
    console.log(startCell)
  }, [startCell])

  useEffect(() => {
    if (isClicked) {
      handleGridSelect()
    }
  }, [currentCell, startCell])
  

  const timeGrid = timeWindows.map((column : any, i: number) => {
    return (
      <div className='AvailabilityColumnWrapper' onDragStart={(e) => e.preventDefault()}>
        {column.map((timeWindow: TimeWindow, j: number) => {
          return (
            <div className={`TimeWindow ${timeWindow.selected ? 'TimeWindow--selected' : ''}`}
            onMouseEnter={e => gridSelect(e, timeWindow)} onMouseDown={e => gridSelect(e, timeWindow)} onMouseUp={e => gridSelect(e, timeWindow)}>
            </div>
          )
        })}
      </div>
    )
  })
  
  return (
    <div className='AvailabilityGrid'>
      {timeGrid}
    </div>
  )
}
