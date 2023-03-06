import { updateAvailabilities } from 'api/updateUserAvailabilities'
import { queryClient } from 'config/react-query'
import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import { Availability } from 'types/Availability'
import { Meeting } from 'types/Meeting'
import './availabilityGrid.scss'

type Position = {
  x: number,
  y: number
}

type TimeCell = {
  time: Date,
  markedBy: string[],
  currentUser: boolean,
  selected: boolean,
  position: Position,
  saved: boolean
}

// Check if time cell is between starting and current cell
const isBetween = (n : number, a: number, b: number) => (n - a) * (n - b) <= 0

// Format column header containing month, day and week day
const formattedColumnHeader = (time: any) => {
  const dateSplit = time.time.toString().split(' ').slice(0, 3)
  return (
    <span className='ColumnHeader'>
      <h1>{dateSplit[0]}</h1>
      <h2>{dateSplit[1]} {dateSplit[2]}</h2>
    </span>
  )
}

interface IAvailabilityGrid {
  editMode: boolean;
  user: string;
  meetingData: Meeting | undefined;
  availabilities: any[];
  setAvailabilities: React.Dispatch<any[]>;  
}

export const AvailabilityGrid = ({editMode, user, meetingData, availabilities, setAvailabilities}: IAvailabilityGrid) => {
  console.log('AvailabilityGrid');
  
  const [timeLabels, setTimeLabels] = useState(['']) // Time labels for the grid
  const [timeCells, setTimeCells] = useState<any[][]>([]) // TODO Change to TimeCell[][] type
  const [startCell, setStartCell] = useState<TimeCell>() // Saved position at mouse click
  const [currentCell, setCurrentCell] = useState<TimeCell>() // Current hover position
  const [isClicked, setIsClicked] = useState(false) // Is mouse currently down

  // Run grid selection on current or start cell change
  useEffect(() => {
    if (isClicked && editMode) {
      handleGridSelect()
    }
  }, [currentCell, startCell])

  // Persists time cells on change
  useEffect(() => {
    meetingData?.id && setAvailabilities(timeCells2Avail())
  }, [timeCells])

  // Converts time cells to availability array
  const timeCells2Avail = () => {
    const selectedCells = timeCells.flat().filter((timeCell) => timeCell.selected).map((timeCell) => {
      return timeCell
    })
  
    const availabilities = selectedCells.map((timeCell) => {
      return {
        meeting: meetingData?.id,
        user: user,
        time: timeCell.time.toISOString()
      }
    })
  
    return availabilities
  }

  // Initializes the availability grid
  useEffect(() => {
    const startTime = moment(meetingData?.from, 'YYYY-MM-DD h:mm:ss a');
    const endTime = moment(meetingData?.to, 'YYYY-MM-DD h:mm:ss a');
    const duration = Math.ceil(endTime.diff(startTime, 'hours', true))

    // Initialize empty time grid
    const initTimeCells = Array.from(
      {length: meetingData?.dates?.length ?? 0},
      (_, i) => Array.from(
        {length: duration*2},
        (_, j) => ({
          time: moment(meetingData?.dates[i].date).clone().add(startTime.hour(), 'hours').add(j*30, 'minutes'),
          selected: false,
          position: {x: i, y: j},
          saved: false,
          markedBy: [] as string[]
        })
      )
    )

    // Loop over all marked user availabilities and display them
    initTimeCells.flat().map(timeCell => {
      for (let usr of Object.entries(meetingData!.availabilities)) {
        for (let av of usr[1]) {
          if (timeCell.time.isSame(moment(av.time))) {
            timeCell.markedBy.push(user[0])
            if (usr[0] === user) {
              timeCell.saved = true
              timeCell.selected = true
            }
          }
        }
      }
      timeCell.time.toDate() 
    });  

    // Format time labels
    const timeLabels = Array.from(
      {length: duration + 1},
      (_, i) => {
        return `${startTime.clone().add(i, 'hours').toDate().getHours().toString().padStart(2, '0')}:00`
      }
    )

    setTimeCells(initTimeCells)
    setTimeLabels(timeLabels)
  }, [meetingData, user])
    
  // Handles time cell selection
  const handleGridSelect = () => {
    setTimeCells(timeCells.map((column: TimeCell[], i: number) => 
      column.map((timeCell: TimeCell, j: number) => {
        if (isBetween(i, currentCell!.position.x, startCell!.position.x) && isBetween(j, currentCell!.position.y, startCell!.position.y)) {
          return { ...timeCell, selected: !startCell?.selected}
        } 
        else {
          if (timeCell.saved){
            return {...timeCell, selected: true}
          }
          else {
            return { ...timeCell, selected: false}
          }
        }
      })
    ))
  }

  // Handles saving selected time cells and persisting them in the database
  const saveCells = () => {
    setTimeCells(timeCells.map((column: TimeCell[]) => 
      column.map((timeCell: TimeCell, j: number) => {
        if (timeCell.selected) {
          return {...timeCell, saved: true}
        }
        else {
          return {...timeCell, saved: false}
        }
      })
    ))
  }

  const persistCells = async () => {
    try {
      const updateData = {
        meeting: meetingData!.id,
        user: user,
        availabilities: availabilities
      }
      await updateAvailabilities(updateData)
      queryClient.refetchQueries(['meeting'])
    }
    catch(error){ 
      console.error(error)
    }
  }

  // Handles grid actions based on mouse events
  const gridSelect = (event: any, timeCell: TimeCell) => {
    if (event.type === 'mousedown') {
      setIsClicked(true)
      setStartCell(timeCell)
    }
    else if (event.type === 'mouseup') {
      setIsClicked(false)
      saveCells()
      persistCells()
    }

    if (event.type === 'mouseenter') {
      setCurrentCell(timeCell)
    }
  }


  // Handles mouse leaving the grid
  const handleMouseLeave = () => {
    setIsClicked(false)
    saveCells()
  }

  // Handles time cell appearance based on the state
  const selectTimeCellClass = (timeCell: TimeCell) => {
    // select the class based on the timeCell cell state
    if (timeCell.markedBy.length !== 0 && !editMode) {
      return 'TimeCell--others'
    }

    if (timeCell.saved) {
      if (timeCell.selected) {
        return 'TimeCell--saved'
      }
      else {
        return 'TimeCell--deselected'
      }
    }
    else {
      if (timeCell.selected) {
        return 'TimeCell--selected'
      }
    }

    return ''
  }
  
  // Main time grid component
  const timeGrid = timeCells.map((column : TimeCell[]) => {
    return (
      <div className='AvailabilityColumn' onDragStart={(e) => e.preventDefault()}>
        {formattedColumnHeader(column[0])}
        {column.map((timeCell: TimeCell) => {
          return (
            <div className={`TimeCell ${selectTimeCellClass(timeCell)}`}
              onMouseEnter={editMode ? e => gridSelect(e, timeCell) : undefined}
              onMouseDown={editMode ? e => gridSelect(e, timeCell) : undefined}
              onMouseUp={editMode ? e => gridSelect(e, timeCell) : undefined}>
            </div>
          )
        })}
      </div>
    )
  })
  
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
