import { updateAvailabilities } from 'api/updateUserAvailabilities'
import { queryClient } from 'config/react-query'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Meeting } from 'types/Meeting'
import { Availability as TAvailability } from 'types/Availability'
import './availabilityGrid.scss'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { Button } from 'components/Button/Button'
import { ButtonSize, ButtonType } from 'types'

type Position = {
  x: number,
  y: number
}

type Color = {
  r: number;
  g: number;
  b: number;
  a: number;
}

type TimeCell = {
  time: Date,
  markedBy: string[],
  currentUser: boolean,
  selected: boolean,
  position: Position,
  saved: boolean
}

// allows for easy cell color scaling
// source: https://stackoverflow.com/questions/21576092/convert-rgba-to-hex/21576659#21576659
const rgba2rgb = (background: Color, rgba: Color) : Color => {
    const alpha = rgba.a;

    return (
      {
          r: (1 - alpha) * background.r + alpha * rgba.r,
          g: (1 - alpha) * background.g + alpha * rgba.g,
          b: (1 - alpha) * background.b + alpha * rgba.b,
          a: 1
      }
    )
}

// get a css style string for cells based on the number of users 
const getCellColor = (cellUsers: number, totalUsers: number, background: Color, selectedCellColor: Color, baseCellColor: Color) => {
  if (cellUsers === 0) {
    return baseCellColor
  }
  else if (cellUsers === totalUsers) {
    return selectedCellColor
  }
  else {
    const alpha = cellUsers/totalUsers // cells with less users appear more transparent
    let cellColorRGBA = selectedCellColor 
    cellColorRGBA.a = alpha
    const cellColorRGB = rgba2rgb(background, cellColorRGBA)

    return cellColorRGB
  }
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
}

export const AvailabilityGrid = ({editMode, user, meetingData}: IAvailabilityGrid) => {
  console.log('AvailabilityGrid');
  
  const [availabilities, setAvailabilities] = useState<TAvailability[]>([])
  const [timeLabels, setTimeLabels] = useState(['']) // Time labels for the grid
  const [timeCells, setTimeCells] = useState<any[][]>([]) // TODO Change to TimeCell[][] type
  const [startCell, setStartCell] = useState<TimeCell>() // Saved position at mouse click
  const [currentCell, setCurrentCell] = useState<TimeCell>() // Current hover position
  const [isClicked, setIsClicked] = useState(false) // Is mouse currently down
  const [showAllAvailabilities, setShowAllAvailabilities] = useState(true) // Show all marked availabilities

  const [userNumber, setUserNumber] = useState(Object.keys((meetingData && meetingData.availabilities) ?? {}).length)
  
  const baseCellColor: Color = {r: 50, g: 53, b: 58, a: 1}
  const selectedCellColor: Color = {r: 224, g: 100, b: 97, a: 1}
  const backgroundColor: Color = {r: 16, g: 19, b: 25, a: 1}

  useEffect(() => {
    setUserNumber(Object.keys((meetingData && meetingData.availabilities) ?? {}).length)
  }, [meetingData])

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
        meeting: meetingData!.id,
        user: user,
        time: timeCell.time.toISOString()
      }
    })
  
    return availabilities
  }

  const visibilityToggle = async () => {
    await queryClient.refetchQueries(['meeting'])
    setShowAllAvailabilities(!showAllAvailabilities)
  }

  // Initializes the availability grid
  useEffect(() => {
    const startTime = moment(meetingData?.from, 'YYYY-MM-DD h:mm:ss a');
    const endTime = moment(meetingData?.to, 'YYYY-MM-DD h:mm:ss a');
    const duration = Math.ceil(endTime.diff(startTime, 'hours', true))
    console.log('init use effect');
    

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
              console.log('HERE');
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

  useEffect(() => {
    queryClient.refetchQueries(['meeting'])
    console.log('new user');
    
  }, [user])

  const persistCells = async () => {
    try {
      const updateData = {
        meeting: meetingData!.id,
        user: user,
        availabilities: availabilities
      }
      await updateAvailabilities(updateData)
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
    if (timeCell.markedBy.length !== 0 && showAllAvailabilities) {
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
  const timeGrid = timeCells.map((column : TimeCell[], index) => {
    return (
      <div key={index} className='AvailabilityColumn' onDragStart={(e) => e.preventDefault()}>
        {formattedColumnHeader(column[0])}
        {column.map((timeCell: TimeCell) => {
          const cellColorRGB = getCellColor(timeCell.markedBy.length, userNumber, backgroundColor, selectedCellColor, baseCellColor)
          
          return (
            <div className={`TimeCell ${selectTimeCellClass(timeCell)}`} style={showAllAvailabilities? {backgroundColor: `rgb(${cellColorRGB.r}, ${cellColorRGB.g}, ${cellColorRGB.b})`}: {}}
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
      <Button type={ButtonType.CIRCLE} size={ButtonSize.LG} onClick={() => visibilityToggle()}>
        {
          showAllAvailabilities ? <EyeSlashIcon className='Icon'/> : <EyeIcon className='Icon'/>
        }
      </Button> 
      <div className='TimesColumn'>
        {
          timeLabels.map(label => {
            return (
              <div key={label}>{label}</div>
            )
          })
        }
      </div>
      <div className='AvailabilityGrid' onMouseEnter={editMode ? () => handleMouseLeave() : undefined}>
        {timeGrid}
      </div>
    </div>
  )
}
