import React from 'react'
import './dayCheckbox.scss'

interface IDayCheckbox {
    day: {date: Date, current: boolean},
    selected: boolean,
    handleClick: () => void,
    errorMsg: string,
}

export const DayCheckbox = ({day, selected, handleClick, errorMsg} : IDayCheckbox) => {
    console.log(errorMsg.length);
    
    return (
        <div className={`DayCheckbox ${selected ? 'DayCheckbox-selected' : ''} ${day.current ? 'DayCheckbox-current' : 'DayCheckbox-notCurrent'} ${errorMsg.length > 0 ? 'DayCheckbox--error' : ''}`} onClick={handleClick}>
            {day.date.getDate()}
        </div>
    )
}
