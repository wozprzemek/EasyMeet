import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import React from 'react'
import './calendar.scss'

interface ICalendar {
    setDates: () => void,
}

export const Calendar = () => {
    var now = new Date();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
    const monthName = now.toLocaleString('en-GB', { month: 'long' });

    console.log(daysInMonth);
    
    return (
        <div className='CalendarWrapper'>
            <div className='MonthHeader'>
                <ChevronLeftIcon className='MonthHeader--chevron'/>
                {monthName}
                <ChevronRightIcon className='MonthHeader--chevron' />
            </div>
            <div className='CalendarDaysContainer'>
                {Array.from(Array(42).keys()).map((i) => {
                    return (
                        <div>
                            
                        </div>
                    )
                })}
            </div>
        </div>
    ) 
}
