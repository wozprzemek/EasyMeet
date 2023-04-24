import { updateAvailabilities } from 'api/updateUserAvailabilities'
import { queryClient } from 'config/react-query'
import moment from 'moment'
import { Dispatch, useEffect, useRef, useState } from 'react'
import { Availability as TAvailability } from 'types/Availability'
import { Meeting } from 'types/Meeting'
import { User } from 'views/CreateMeeting/types'
import { AvailabilityDetails } from '../AvailabilityDetails/AvailabilityDetails'
import './availabilityGrid.scss'

export interface Position {
  x: number,
  y: number
}

export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}
export interface TimeCell {
  time: Date,
  markedBy: string[],
  currentUser: boolean,
  selected: boolean,
  position: Position,
  saved: boolean
}

// Color definitions for time cell coloring
export const baseCellColor: Color = {r: 50, g: 53, b: 58, a: 1}
export const selectedCellColor: Color = {r: 224, g: 100, b: 97, a: 1}
export const backgroundColor: Color = {r: 16, g: 19, b: 25, a: 1}

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

// calculates color for cells based on the number of users
export const calculateCellColor = (cellUsers: number, totalUsers: number, background: Color, selectedCellColor: Color, baseCellColor: Color) : Color => {
  if (cellUsers === 0) {
    return baseCellColor
  }
  else if (cellUsers === totalUsers) {
    return selectedCellColor
  }
  else {
    const alpha = (cellUsers / totalUsers) // cells with less users appear more transparent
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

const preventDefault = (event: any) => {
  event.preventDefault()
}

interface IAvailabilityGrid {
  editMode: boolean;
  user: User | undefined;
  meetingData: Meeting | undefined;
  showAllAvailabilities: boolean;
  currentCell?: TimeCell;
  setCurrentCell: Dispatch<TimeCell>;
  userCount: number;
  setUserNumber: Dispatch<number>;
}

export const AvailabilityGrid = ({editMode, user, meetingData, showAllAvailabilities, currentCell, setCurrentCell, userCount, setUserNumber}: IAvailabilityGrid) => {
  const [availabilities, setAvailabilities] = useState<TAvailability[]>([])
  const [timeLabels, setTimeLabels] = useState(['']) // Time labels for the grid
  const [timeCells, setTimeCells] = useState<any[][]>([]) // TODO Change to TimeCell[][] type
  const [startCell, setStartCell] = useState<TimeCell>() // Saved position at mouse click
  const [isClicked, setIsClicked] = useState(false) // Is mouse currently down
  const longTouchDuration = 100 // Duration for long touch in ms
  const [dragEnabled, setDragEnabled] = useState(false) // Is drag enabled
  const gridRef = useRef<HTMLDivElement>(null)
  const clearTimerRef = useRef<number|undefined>(undefined)
  const detailsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setUserNumber(Object.keys((meetingData && meetingData.users) ?? {}).length)
  }, [meetingData])

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
        // user: user!.id,
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

    // Loop through users and mark time cells
    initTimeCells.flat().map(timeCell => {
      for (const usr of meetingData!.users) {
        for (const av of usr!.availabilities!) {
          if (timeCell.time.isSame(moment(av.time))) {
            timeCell.markedBy.push(usr.name)
            if (usr.id === user?.id) {
              timeCell.saved = true
              timeCell.selected = true
            }
          }
        }
      }
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
  }, [user])

  const persistCells = async () => {
    try {
      if (user) {
        const updateData = {
          user: user.id,
          password: user?.password,
          availabilities: availabilities
        }
        await updateAvailabilities(updateData)
      }
    }
    catch(error){}
  }

  const onCellEnter = (event: any, timeCell: TimeCell) => {
    setCurrentCell(timeCell)
    let currentCell = document.elementFromPoint(event.clientX, event.clientY)
    if (isClicked && currentCell?.classList.contains('TimeCell') && startCell) {
      let x = parseInt(currentCell.getAttribute('data-x') || "0")
      let y = parseInt(currentCell.getAttribute('data-y') || "0")

      setTimeCells(timeCells.map((column: TimeCell[], i: number) =>
        column.map((timeCell: TimeCell, j: number) => {
          if (isBetween(i, x, startCell.position.x) && isBetween(j, y, startCell.position.y)) {
            return { ...timeCell, selected: !startCell?.selected}
          }
          else {
            if (timeCell.saved)
              return {...timeCell, selected: true}
            else
              return { ...timeCell, selected: false}
          }
        })
      ))
    }
  }

  const startSelect = (event: any, timeCell: TimeCell) => {
    setIsClicked(true)
    setStartCell(timeCell)
    setCurrentCell(timeCell)
  }

  const startTouchSelect = (event: any, timeCell: TimeCell) => {
    clearTimerRef.current = window.setTimeout(() => {enableDrag(event)}, longTouchDuration)
    setCurrentCell(timeCell)
    setIsClicked(true)
    setStartCell(timeCell)
  }

  const enableDrag = (event: any) => {
    gridRef.current?.addEventListener('touchmove', preventDefault, {passive: false})
    setDragEnabled(true)
  }

  const touchDragSelect = (event: any, timeCell: TimeCell) => {
    const touch = event && event.touches[0];
    window.clearTimeout(clearTimerRef.current)

    if (touch && dragEnabled) {
      event.preventDefault()
      const currentCell = document.elementFromPoint(touch.clientX, touch.clientY)
      console.log(touch.clienX, touch.clientY);

      if (currentCell?.classList.contains('TimeCell')) {
        let x = parseInt(currentCell.getAttribute('data-x') || "0")
        let y = parseInt(currentCell.getAttribute('data-y') || "0")

        setTimeCells(timeCells.map((column: TimeCell[], i: number) =>
          column.map((timeCell: TimeCell, j: number) => {
            if (isBetween(i, x, startCell!.position.x) && isBetween(j, y, startCell!.position.y)) {
              return { ...timeCell, selected: !startCell?.selected}
            }
            else {
              if (timeCell.saved)
                return {...timeCell, selected: true}
              else
                return { ...timeCell, selected: false}
            }
          })
        ))
      }
    }
  }

  const endSelect = (event: any, timeCell: TimeCell) => {
    setIsClicked(false)
    saveCells()
    persistCells()
  }

  const endTouchSelect = (event: any, timeCell: TimeCell) => {
    gridRef.current?.removeEventListener('touchmove', preventDefault, false)

    if (clearTimerRef.current) {
      window.clearTimeout(clearTimerRef.current)
      clearTimerRef.current = undefined
      setDragEnabled(false)
    }
    endSelect(event, timeCell)
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
  const timeGrid = timeCells.map((column : TimeCell[], col) => {
    return (
      <div key={col} className='AvailabilityColumn' onDragStart={(e) => e.preventDefault()}>
        {formattedColumnHeader(column[0])}
        {column.map((timeCell: TimeCell, row) => {
          const cellColorRGB = calculateCellColor(timeCell.markedBy.length, userCount, backgroundColor, selectedCellColor, baseCellColor)

          return (
            <div data-x={timeCell.position.x} data-y={timeCell.position.y} className={`TimeCell ${selectTimeCellClass(timeCell)}`} style={showAllAvailabilities? {backgroundColor: `rgb(${cellColorRGB.r}, ${cellColorRGB.g}, ${cellColorRGB.b})`}: {}}
              onMouseEnter={e => onCellEnter(e, timeCell)}
              onMouseDown={editMode ? e => startSelect(e, timeCell) : undefined}
              onMouseUp={editMode ? e => endSelect(e, timeCell) : undefined}
              onTouchStart={editMode ? e => startTouchSelect(e, timeCell) : undefined}
              onTouchMove={editMode ? e => touchDragSelect(e, timeCell) : undefined}
              onTouchEnd={editMode ? e => endTouchSelect(e, timeCell) : undefined}>
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
              <div key={label}>{label}</div>
            )
          })
        }
      </div>
      <div ref={gridRef} className='AvailabilityGrid' onMouseEnter={editMode ? () => handleMouseLeave() : undefined}>
        {timeGrid}
      </div>
      <AvailabilityDetails userCount={userCount} setUserNumber={setUserNumber} currentCell={currentCell} detailsRef={detailsRef} meetingData={meetingData}/>
    </div>
  )
}
