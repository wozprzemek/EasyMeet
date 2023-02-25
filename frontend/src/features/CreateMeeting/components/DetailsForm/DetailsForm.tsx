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
        <label htmlFor='from'>From</label>
        <input name='from' type='time' value={from} onChange={e => setFrom(e.target.value)}></input>

        <label htmlFor='to'>To</label>
        <input name='to' type='time' value={to} onChange={e => setTo(e.target.value)}></input>

        {/* <label htmlFor='from'>Time Zone</label> */}
        {/* <input name='from' type='time'></input> */}
    </form>
  )
}
