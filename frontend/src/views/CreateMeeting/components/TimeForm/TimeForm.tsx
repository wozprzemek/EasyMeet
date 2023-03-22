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
  console.log(errorMsg);
  
  return (
    <form className='TimeForm'>
        <div>
          <span>From</span>
          <TimePicker selectedTime={from} setSelectedTime={setFrom} errorMsg={errorMsg.from}></TimePicker>
        </div>

        <div>
          <span>To</span>
          <TimePicker selectedTime={to} setSelectedTime={setTo} errorMsg={errorMsg.to}></TimePicker>
        </div>
    </form>
  )
}
