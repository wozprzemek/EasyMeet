import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { DateType } from 'views/CreateMeeting/types';
import { useEffect, useState } from 'react';
import { DayCheckbox } from '../DayCheckBox/DayCheckbox';
import './calendar.scss';

const getCurrentMonthDays = (month : number, year : number) =>
  Array.from(
    { length: new Date(year, month, 0).getDate() },
    (_, i) => ({
        date: new Date(year, month - 1, i + 1),
        current: true
    })
)

const getPreviousMonthDays = (month : number, year : number) => {
    const firstDayOfCurrentMonth = new Date(year, month, 1).getDay() !== 0 ? new Date(year, month, 1).getDay() : 7
    return(
        Array.from(
            { length: firstDayOfCurrentMonth - 1},
            (_, i) => ({
                date: new Date(year, month, 1 - i - 1),
                current: false
            })
        ).reverse()
    )
}

const getNextMonthDays = (month : number, year : number, previousMonthDays : Date[], currentMonthDays : Date[]) => {
    return(
        Array.from(
            { length: 42 - previousMonthDays.length - currentMonthDays.length},
            (_, i) => ({
                date: new Date(year, month + 1, i + 1),
                current: false
            })
        )
    )
}

const getAllDays = (month : number, year : number) => {
    const previousMonthDays = getPreviousMonthDays(month, year)
    const currentMonthDays = getCurrentMonthDays(month+1, year)
    const nextMonthDays = getNextMonthDays(month, year, Array.from(previousMonthDays, x => x.date), Array.from(currentMonthDays, x => x.date))

    const allDays = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays]
    return allDays

}

const getDayKey = (day: Date) => {
    return day.getDate().toString() + day.getMonth() + day.getFullYear()
}


interface ICalendar {
    selectedDates: DateType[];
    setSelectedDates: React.Dispatch<DateType[]>;
}

export const Calendar = ({selectedDates, setSelectedDates}: ICalendar) => {
    const changeMonth = (offset : number) => {
        const newDate = new Date(selectedMonth.year, selectedMonth.month + offset + 1, 0)
        setSelectedMonth({month: newDate.getMonth(), year: newDate.getFullYear()})
    }

    const isDaySelected = (dateObject: DateType) => {
        for (let i=0; i < selectedDates.length; i++) {
            if (selectedDates[i].day === dateObject.day && selectedDates[i].month === dateObject.month && selectedDates[i].year === dateObject.year) {
                return true
            }
        }
        return false
    }

    const handleDaySelection = (dateObject : DateType) => {
        for (let i=0; i < selectedDates.length; i++) {
            if (selectedDates[i].day === dateObject.day && selectedDates[i].month === dateObject.month && selectedDates[i].year === dateObject.year) {
                setSelectedDates(selectedDates.filter((_, index) => index !== i)) // remove an already selected day
                return true
            }
        }
        setSelectedDates([...selectedDates, dateObject])
        changeMonth(dateObject.month - selectedMonth.month) // change the month only if a date has not been selected
        return false
    }

    const handleDayCheckboxClick = (day : {date: Date, current: boolean}) => {
        console.log(day.date.getMonth());
        
        const dateObject = {
            day: day.date.getDate(),
            month: day.date.getMonth(),
            year: day.date.getFullYear()
        }
        handleDaySelection(dateObject) // select/deselect day and handle month change if clicked on a part off different month
    }

    var now = new Date() // current date
    const [selectedMonth, setSelectedMonth] = useState({month: now.getMonth(), year: now.getFullYear()}) // used for selected year and month
    const [displayedDays, setDisplayedDays] = useState(getCurrentMonthDays(selectedMonth.month + 1, selectedMonth.year))
    const weekDays = ['M', 'Tu', 'W', 'Th', 'F', 'Sa', 'Su']
    
    useEffect(() => {
        setDisplayedDays(getAllDays(selectedMonth.month, selectedMonth.year))
    }, [selectedMonth])
    
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
                        <DayCheckbox key={getDayKey(day.date)} day={day} selected={isDaySelected({day: day.date.getDate(), month: day.date.getMonth(), year: day.date.getFullYear()})} handleClick={() => handleDayCheckboxClick(day)} /> //????????????????????????????
                    )
                })}
            </div>
        </div>
    ) 
}
