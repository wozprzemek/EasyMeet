import { TimePicker } from 'components/TimePicker/TimePicker';
import React from 'react'
import './timeForm.scss'

interface ITimeForm {
  from: string;
  setFrom: React.Dispatch<string>;
  to: string;
  setTo: React.Dispatch<string>;
  errorMsg: {from: string, to: string};
}

export const TimeForm = ({from, setFrom, to, setTo, errorMsg} : ITimeForm) => {
  return (
    <form className='TimeForm'>
        <div className='TimePickerContainer'>
          <span>From</span>
          <TimePicker selectedTime={from} setSelectedTime={setFrom} errorMsg={errorMsg.from}></TimePicker>
          {errorMsg.from.length > 0 ? <span className='ErrorMsg'>{errorMsg.from}</span> : <span></span>}
        </div>

        <div className='TimePickerContainer'>
          <span>To</span>
          <TimePicker selectedTime={to} setSelectedTime={setTo} errorMsg={errorMsg.to}></TimePicker>
          {errorMsg.to.length > 0 ? <span className='ErrorMsg'>{errorMsg.to}</span> : <span></span>}
        </div>
    </form>
  )
}
