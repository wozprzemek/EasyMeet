import React from 'react'
import './dayCheckbox.scss'

interface IDayCheckbox {
    day: {date: Date, current: boolean},
    selected: boolean,
    handleClick: () => void,
}

export const DayCheckbox = ({day, selected, handleClick} : IDayCheckbox) => {
    console.log(selected)
    return (
        <div className={`DayCheckbox ${selected ? 'DayCheckbox-selected' : ''} ${day.current ? 'DayCheckbox-current' : 'DayCheckbox-notCurrent'}`} onClick={handleClick}>
            {day.date.getDate()}
        </div>
    )
}
