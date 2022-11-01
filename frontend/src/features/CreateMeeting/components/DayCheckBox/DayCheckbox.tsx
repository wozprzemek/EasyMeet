import React from 'react'
import './dayCheckbox.scss'

interface IDayCheckbox {
    day: Date,
    selected: boolean,
    handleClick: () => void,
}

export const DayCheckbox = ({day, selected, handleClick} : IDayCheckbox) => {
    console.log(selected)
    return (
        <div className={`DayCheckbox ${selected ? 'DayCheckbox-selected' : ''}`} onClick={handleClick}>
            {day.getDate()}
        </div>
    )
}
