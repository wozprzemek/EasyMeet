import { useEffect, useState } from 'react'
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

const formattedColumnHeader = (time: any) => {
  const dateSplit = time.time.toString().split(' ').slice(0, 3)
  // console.log(dateSplit)
  return (
    <span className='ColumnHeader'>
      <h1>{dateSplit[0]}</h1>
      <h2>{dateSplit[1]} {dateSplit[2]}</h2>
    </span>
  )
}

export const AvailabilityColumn = () => {

  const timeWindowsPlaceholder = Array.from(
    {length: 16},
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

  const handleGridSelect = () => {
    setTimeWindows(timeWindows.map((column: TimeWindow[], i: number) => 
      column.map((timeWindow: TimeWindow, j: number) => {
        if (isBetween(i, currentCell!.position.x, startCell!.position.x) && isBetween(j, currentCell!.position.y, startCell!.position.y)) {
          console.log('BETWEEN')
          return { ...timeWindow, selected: !startCell?.selected}
        } 
        else {
          if (timeWindow.saved){
            return {...timeWindow, selected: true}
          }
          else {
            return { ...timeWindow, selected: false}
          }
        }
      })
    ))
  }

  const saveCells = () => {
    setTimeWindows(timeWindows.map((column: TimeWindow[]) => 
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

  const gridSelect = (event: any, timeWindow: TimeWindow) => {
    if (event.type === 'mousedown') {
      setIsClicked(true)
      setStartCell(timeWindow)
    }
    else if (event.type === 'mouseup') {
      setIsClicked(false)
      saveCells()
    }

    if (event.type === 'mouseenter') {
      setCurrentCell(timeWindow)
    }
  }

  const handleMouseLeave = () => {
    setIsClicked(false)
    saveCells()
  }

  const [timeWindows, setTimeWindows] = useState(timeWindowsPlaceholder)

  const [startCell, setStartCell] = useState<TimeWindow>() // saved position at mouse click
  const [currentCell, setCurrentCell] = useState<TimeWindow>() // current hover position
  const [isClicked, setIsClicked] = useState(false) // is mouse currently down

  useEffect(() => {
    if (isClicked) {
      handleGridSelect()
    }
    // console.log|()
  }, [currentCell, startCell])

  useEffect(() => {
    console.log(startCell?.position, startCell?.selected)
    // console.log(timeWindows.flat().filter((cell: TimeWindow) => cell.selected).map(x => x.position))
  }, [timeWindows])


  const selectTimeWindowClass = (timeWindow: TimeWindow) => {
    // select the class based on the timeWindow cell state
    if (timeWindow.saved) {
      if (timeWindow.selected) {
        return 'TimeWindow--saved'
      }
      else {
        return 'TimeWindow--deselected'
      }
    }
    else {
      if (timeWindow.selected) {
        return 'TimeWindow--selected'
      }
    }

    return ''
  }
  

  const timeGrid = timeWindows.map((column : TimeWindow[]) => {
    return (
      <div className='AvailabilityColumn' onDragStart={(e) => e.preventDefault()}>
        {formattedColumnHeader(column[0])}
        {column.map((timeWindow: TimeWindow) => {
          return (
            <div className={`TimeWindow ${selectTimeWindowClass(timeWindow)}`}
            onMouseEnter={e => gridSelect(e, timeWindow)} onMouseDown={e => gridSelect(e, timeWindow)} onMouseUp={e => gridSelect(e, timeWindow)}>
            </div>
          )
        })}
      </div>
    )
  })
  
  return (
    <div className='AvailabilityGridWrapper'>
      <div className='TimesColumn'>
        {Array.from({length: 17}, (_, i) => i).map((i) => {
          return (
            <div>
              {i+8}:00
            </div>
          )
        })}
      </div>
      <div className='AvailabilityGrid' onMouseEnter={() => handleMouseLeave()}>
        {timeGrid}
      </div>
    </div>
  )
}
