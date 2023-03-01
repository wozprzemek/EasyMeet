import { Button } from 'components/Button/Button'
import { useClickOutside } from 'hooks/useClickOutside';
import { Dispatch } from 'react';
import { text } from 'stream/consumers'
import { ButtonSize, ButtonType } from 'types'
import './modal.scss'

interface IModal {
    off: () => void;
    setUser: Dispatch<string>;
    setPassword: Dispatch<string>;
}

export const Modal = ({off, setUser, setPassword} : IModal) => {
    const ref = useClickOutside(off);
    return (
    <div className='ModalWrapper' >
        <div className='ModalWindow' ref={ref}>
            Mark availability
            <div>
                <label htmlFor='user'>User</label>
                <input type='text' name='user'></input>

                <label htmlFor='password'>Pasword</label>
                <input type='text' name='password'></input>
            </div>
            <Button size={ButtonSize.LG} type={ButtonType.SOLID} onClick={() => console.log('OK')} text='Continue' />
        </div>
    </div>

    )
}