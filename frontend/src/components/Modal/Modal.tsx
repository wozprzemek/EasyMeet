import { Button } from 'components/Button/Button'
import { useClickOutside } from 'hooks/useClickOutside';
import { Dispatch } from 'react';
import { text } from 'stream/consumers'
import { ButtonSize, ButtonType } from 'types'
import './modal.scss'

interface IModal {
    off: () => void;
    user: string;
    setUser: Dispatch<string>;
    password: string;
    setPassword: Dispatch<string>;
    setEditMode: Dispatch<boolean>;
}

export const Modal = ({off, user, setUser, password, setPassword, setEditMode} : IModal) => {
    const ref = useClickOutside(off);

    const handleSubmit = async () => {
        setEditMode(true)
        off()
    }

    return (
    <div className='ModalWrapper' >
        <div className='ModalWindow' ref={ref}>
            Mark availability
            <div>
                <label htmlFor='user'>User</label>
                <input type='text' name='user' value={user} onChange={(e) => setUser(e.target.value)} ></input>

                <label htmlFor='password'>Pasword</label>
                <input type='text' name='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <Button size={ButtonSize.LG} type={ButtonType.SOLID} onClick={() => handleSubmit()}>Continue</Button>
        </div>
    </div>

    )
}