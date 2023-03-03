import { useClickOutside } from 'hooks/useClickOutside';
import { Dispatch, useState } from 'react';
import './timePicker.scss';

interface ITimePicker {
    selectedTime: string;
    setSelectedTime: Dispatch<string>;
}

export const TimePicker = ({selectedTime, setSelectedTime}: ITimePicker) => {
    const ref = useClickOutside(() => setShowDropdown(false));
    let times = [...Array(24).keys()].map(i => {
        return `${i.toString().padStart(2, '0')}:00`
    })

    const [showDropdown, setShowDropdown] = useState<boolean>(false)

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
            <div className='TimePickerDropdown' ref={ref}>
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
