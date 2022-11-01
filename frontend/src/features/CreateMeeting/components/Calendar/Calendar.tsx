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

const getAllDaysInMonth = (month : number, year : number) =>
  Array.from(
    { length: new Date(year, month, 0).getDate() },
    (_, i) => new Date(year, month - 1, i + 1)
);

const getPreviousMonthDays = () => {

}

const getNextMonthDays = () => {

}

export const Calendar = () => {
    const changeMonth = (offset : number) => {
        const newDate = new Date(selectedMonth.year, selectedMonth.month + offset + 1, 0)
        setSelectedMonth({month: newDate.getMonth(), year: newDate.getFullYear()})
    }

    const getDisplayedDays = () => {

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

    const selectedMonthDays = (getAllDaysInMonth(10,2022))
    const previousMonthDays = (getAllDaysInMonth(10,2022))
    const nextMonthDays = (getAllDaysInMonth(10,2022))

    var now = new Date() // current date
    const [selectedMonth, setSelectedMonth] = useState({month: now.getMonth(), year: now.getFullYear()}) // used for selected year and month
    const [selectedDays, setSelectedDays] = useState<StateProperties[]>([]) // used for selected days
    const [displayedDays, setDisplayedDays] = useState(getAllDaysInMonth(selectedMonth.month + 1, selectedMonth.year))
    const weekDays = ['M', 'Tu', 'W', 'Th', 'F', 'Sa', 'Su']
    
    useEffect(() => {
        setDisplayedDays(getAllDaysInMonth(selectedMonth.month + 1, selectedMonth.year))
    }, [selectedMonth])

    useEffect(() => {
        console.log(selectedDays)
    }, [selectedDays])
    
    return (
        <div className='CalendarWrapper'>
            <div className='MonthHeader'>
                <ChevronLeftIcon className='MonthHeader--chevron' onClick={() => changeMonth(-1)}/>
                    {new Date(selectedMonth.year, selectedMonth.month + 1, 0).toLocaleString('en-GB', { month: 'long' })}
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
                        <DayCheckbox key={day.getDate()} day={day} selected={isDaySelected({day: day.getDate(), month: day.getMonth(), year: day.getFullYear()})} handleClick={() => handleDayCheckboxClick(day)} /> //????????????????????????????
                    )
                })}
            </div>
        </div>
    ) 
}
