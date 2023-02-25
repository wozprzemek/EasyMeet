import { TimePicker } from 'components/TimePicker/TimePicker';
import React from 'react'
import './detailsForm.scss'

interface IDetailsForm {
  from: string;
  setFrom: React.Dispatch<string>;
  to: string;
  setTo: React.Dispatch<string>;
}

export const DetailsForm = ({from, setFrom, to, setTo} : IDetailsForm) => {
  return (
    <form className='DetailsForm'>
        <span>From</span>
        <TimePicker defaultTime='09:00'></TimePicker>

        <span>To</span>
        <TimePicker defaultTime='09:00'></TimePicker>

        {/* <label htmlFor='from'>Time Zone</label> */}
        {/* <input name='from' type='time'></input> */}
    </form>
  )
}
