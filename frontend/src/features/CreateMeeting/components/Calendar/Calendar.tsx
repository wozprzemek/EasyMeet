import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react'
import { DayCheckbox } from '../DayCheckBox/DayCheckbox';
import './calendar.scss'

interface ICalendar {
    setDates: () => void,
}

interface StateProperties {
    day: number;
    month: number;
    year: number;
}  

const getCurrentMonthDays = (month : number, year : number) =>
  Array.from(
    { length: new Date(year, month, 0).getDate() },
    (_, i) => new Date(year, month - 1, i + 1)
)

const getPreviousMonthDays = (month : number, year : number) => {
    const firstDayOfCurrentMonth = new Date(year, month, 1).getDay() !== 0 ? new Date(year, month, 1).getDay() : 7
    return(
        Array.from(
            { length: firstDayOfCurrentMonth - 1},
            (_, i) => new Date(year, month, 1 - i - 1)
        ).reverse()
    )
}

const getAllDays = (month : number, year : number) => {
    const previousMonthDays = getPreviousMonthDays(month, year)
    const currentMonthDays = getCurrentMonthDays(month+1, year)
    const nextMonthDays = getNextMonthDays(month, year, previousMonthDays, currentMonthDays)

    const allDays = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays]
    console.log(allDays)
    return allDays

}

const getNextMonthDays = (month : number, year : number, previousMonthDays : Date[], currentMonthDays : Date[]) => {
    return(
        Array.from(
            { length: 42 - previousMonthDays.length - currentMonthDays.length},
            (_, i) => new Date(year, month + 1, i + 1)
        )
    )
}

export const Calendar = () => {
    const changeMonth = (offset : number) => {
        const newDate = new Date(selectedMonth.year, selectedMonth.month + offset + 1, 0)
        setSelectedMonth({month: newDate.getMonth(), year: newDate.getFullYear()})
    }


    const isDaySelected = (dateObject: StateProperties) => {
        for (let i=0; i < selectedDays.length; i++) {
            if (selectedDays[i].day === dateObject.day && selectedDays[i].month === dateObject.month && selectedDays[i].year === dateObject.year) {
                return true
            }
        }
        return false
    }

    const handleDaySelection = (dateObject : StateProperties) => {
        for (let i=0; i < selectedDays.length; i++) {
            if (selectedDays[i].day === dateObject.day && selectedDays[i].month === dateObject.month && selectedDays[i].year === dateObject.year) {
                setSelectedDays(selectedDays.filter((_, index) => index !== i))
                return true
            }
        }
        setSelectedDays([...selectedDays, dateObject])
        return false
    }

    const handleDayCheckboxClick = (day : Date) => {
        const dateObject = {
            day: day.getDate(),
            month: day.getMonth(),
            year: day.getFullYear()
        }
        handleDaySelection(dateObject)
    }

    var now = new Date() // current date
    const [selectedMonth, setSelectedMonth] = useState({month: now.getMonth(), year: now.getFullYear()}) // used for selected year and month
    const [selectedDays, setSelectedDays] = useState<StateProperties[]>([]) // used for selected days
    const [displayedDays, setDisplayedDays] = useState(getCurrentMonthDays(selectedMonth.month + 1, selectedMonth.year))
    const weekDays = ['M', 'Tu', 'W', 'Th', 'F', 'Sa', 'Su']
    
    useEffect(() => {
        setDisplayedDays(getAllDays(selectedMonth.month, selectedMonth.year))
        console.log(new Date(selectedMonth.year, selectedMonth.month, 1), new Date(selectedMonth.year, selectedMonth.month, 1).getDay())
        console.log('previous month days', getPreviousMonthDays(selectedMonth.month, selectedMonth.year))
    }, [selectedMonth])

    useEffect(() => {
        console.log(selectedDays)
    }, [selectedDays])
    
    return (
        <div className='CalendarWrapper'>
            <div className='MonthHeader'>
                <ChevronLeftIcon className='MonthHeader--chevron' onClick={() => changeMonth(-1)}/>
                    <div className='MonthHeader--textContainer'>
                        <span>{new Date(selectedMonth.year, selectedMonth.month + 1, 0).toLocaleString('en-GB', { month: 'long' })}</span>
                        <span>{selectedMonth.year}</span>
                    </div>
                <ChevronRightIcon className='MonthHeader--chevron' onClick={() => changeMonth(1)} />
            </div>
            <div className='CalendarDaysContainer'>
                {weekDays.map((i) => {
                    return (
                        <span className='WeekDayText'>{i}</span>
                    )
                })}
                {displayedDays.map((day) => {   
                    return (
                        <DayCheckbox key={null} day={day} selected={isDaySelected({day: day.getDate(), month: day.getMonth(), year: day.getFullYear()})} handleClick={() => handleDayCheckboxClick(day)} /> //????????????????????????????
                    )
                })}
            </div>
        </div>
    ) 
}
