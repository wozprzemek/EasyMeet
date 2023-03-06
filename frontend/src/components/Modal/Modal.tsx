import { Button } from 'components/Button/Button';
import { queryClient } from 'config/react-query';
import { useClickOutside } from 'hooks/useClickOutside';
import { Dispatch, useState } from 'react';
import { ButtonSize, ButtonType } from 'types';
import './modal.scss';

interface IModal {
    off: () => void;
    setUser: Dispatch<string>;
    password?: string;
    setPassword?: Dispatch<string>;
    setEditMode: Dispatch<boolean>;
}

export const Modal = ({off, setUser, password, setPassword, setEditMode} : IModal) => {
    const ref = useClickOutside(off);
    const [localUser, setLocalUser] = useState('')
    
    const handleSubmit = async () => {
        setUser(localUser)
        // await queryClient.refetchQueries(['meeting'])
        setEditMode(true)
        off()
    }

    return (
    <div className='ModalWrapper' >
        <div className='ModalWindow' ref={ref}>
            Mark your availability
            <div>
                <label htmlFor='user'>Your name</label>
                <input type='text' name='user' value={localUser} onChange={(e) => setLocalUser(e.target.value)} ></input>

                {
                    password !== undefined      ?
                    <>
                        <label htmlFor='password'>Pasword</label>
                        <input type='text' name='password' value={password} onChange={(e) => setPassword && setPassword(e.target.value)}></input>
                        <span>This meeting is protected by a password.</span>
                    </>
                    : null
                }
            </div>
            <Button size={ButtonSize.LG} type={ButtonType.SOLID} onClick={() => handleSubmit()}>Continue</Button>
        </div>
    </div>

    )
}