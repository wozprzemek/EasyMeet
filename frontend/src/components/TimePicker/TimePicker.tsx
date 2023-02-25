import React, { useState } from 'react'
import './timePicker.scss'

interface ITimePicker {
    defaultTime: string;
    fullHoursOnly?: boolean;
}

export const TimePicker = ({defaultTime, fullHoursOnly=false}: ITimePicker) => {
    let times = []

    if (fullHoursOnly) {
        times = [...Array(24).keys()].map(i => {
            return `${i.toString().padStart(2, '0')}:00`
        })
    }
    else {
        times = [...Array(48).keys()].map(i => {
            return `${Math.floor(i/2).toString().padStart(2, '0')}:${i % 2 == 0 ? '00' : '30'}`
        })
    }

    const [showDropdown, setShowDropdown] = useState<boolean>(false)
    const [selectedTime, setSelectedTime] = useState<string>(defaultTime)

    const handleSelect = (time: string) => {
        setSelectedTime(time)
        setShowDropdown(false)
    }

    return (
    <div className='TimePickerContainer'>
        <div className='TimePickerButton' onClick={() => setShowDropdown(!showDropdown)}>
            {selectedTime}
        </div>
        { showDropdown ? 
            <div className='TimePickerDropdown'>
                {
                    times.map(time => {
                        return (
                            <div className='TimePickerOption' key={time} onClick={() => handleSelect(time)}>{time}</div>
                        )
                    })
                }
            </div> : null
        }
    </div>
    )
}
