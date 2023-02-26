import moment from 'moment'
import { useEffect, useState } from 'react'
import { Availability } from 'types/Availability'
import { Meeting } from 'types/Meeting'
import './availabilityGrid.scss'

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
  return (
    <span className='ColumnHeader'>
      <h1>{dateSplit[0]}</h1>
      <h2>{dateSplit[1]} {dateSplit[2]}</h2>
    </span>
  )
}

const AvailabilityColumn = () => {
  
}

interface IAvailabilityGrid {
  meetingData: Meeting | undefined;
  availabilities: any[];
  setAvailabilities: React.Dispatch<any[]>;  
}

export const AvailabilityGrid = ({meetingData, availabilities, setAvailabilities}: IAvailabilityGrid) => {

  console.log('GRIIIIIIIIIIIIIIIIID');
  useEffect(() => {
    console.log('data changed');
    
  }, [meetingData])
  
  // const timeLabels = () => {
  //   {Array.from({length: 17}, (_, i) => i).map((i) => {
  //     return (
  //       <div>
  //         {i+8}:00
  //       </div>
  //     )
  //   })}
  // }

  const initGrid = (meeting: Meeting) => {
    console.log('MEETING', meeting);
    
    // create a formatted time window array from fetched meeting data
    const start_time = moment(meeting.from, 'YYYY-MM-DD h:mm:ss a');
    const end_time = moment(meeting.to, 'YYYY-MM-DD h:mm:ss a');
    const duration = Math.ceil(end_time.diff(start_time, 'hours', true))

    const initTimeWindows = Array.from(
      {length: meeting.dates.length},
      (_, i) => Array.from(
        {length: duration*2},
        (_, j) => ({
          time: start_time.clone().add(j*30, 'minutes').toDate(),
          selected: false,
          position: {x: i, y: j},
          saved: false
        })
      )
    )

    console.log(initTimeWindows)

    const timeLabels = Array.from(
      {length: duration + 1},
      (_, i) => {
        return `${start_time.clone().add(i, 'hours').toDate().getHours().toString().padStart(2, '0')}:00`
      }
    )

    return {initTimeWindows, timeLabels}
  }
  
  const handleGridSelect = () => {
    setTimeWindows(timeWindows.map((column: TimeWindow[], i: number) => 
      column.map((timeWindow: TimeWindow, j: number) => {
        if (isBetween(i, currentCell!.position.x, startCell!.position.x) && isBetween(j, currentCell!.position.y, startCell!.position.y)) {
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

  const {initTimeWindows, timeLabels} = initGrid(meetingData!)
  
  const [timeWindows, setTimeWindows] = useState<TimeWindow[][]>(initTimeWindows)

  useEffect(() => {
    setTimeWindows(initTimeWindows)
  }, [meetingData])
  

  const [startCell, setStartCell] = useState<TimeWindow>() // saved position at mouse click
  const [currentCell, setCurrentCell] = useState<TimeWindow>() // current hover position
  const [isClicked, setIsClicked] = useState(false) // is mouse currently down

  console.log(initTimeWindows, timeLabels);
  console.log(timeWindows);

  useEffect(() => {
    if (isClicked) {
      handleGridSelect()
    }
  }, [currentCell, startCell])

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
  
  // useEffect(() => {

  // }, [timeWindows])
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

  console.log(timeGrid, timeWindows);
  
  
  return (
    <div className='AvailabilityGridWrapper'>
      <div className='TimesColumn'>
        {
          timeLabels.map(label => {
            return (
              <div>{label}</div>
            )
          })
        }
      </div>
      <div className='AvailabilityGrid' onMouseEnter={() => handleMouseLeave()}>
        {timeGrid}
      </div>
    </div>
  )
}
