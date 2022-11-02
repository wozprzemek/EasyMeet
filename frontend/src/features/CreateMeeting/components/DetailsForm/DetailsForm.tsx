import React from 'react'
import './detailsForm.scss'

export const DetailsForm = () => {
  return (
    <form className='DetailsForm'>
        <label htmlFor='from'>From</label>
        <input name='from' type='time'></input>

        <label htmlFor='from'>To</label>
        <input name='from' type='time'></input>

        <label htmlFor='from'>Time Zone</label>
        <input name='from' type='time'></input>
    </form>
  )
}
