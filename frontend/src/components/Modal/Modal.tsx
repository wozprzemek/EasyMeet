import { Button } from 'components/Button/Button';
import { queryClient } from 'config/react-query';
import { useClickOutside } from 'hooks/useClickOutside';
import { Dispatch, useCallback, useEffect, useState } from 'react';
import { ButtonSize, ButtonType } from 'types';
import './modal.scss';

interface IModal {
    off: () => void;
    setUser: Dispatch<string>;
    password?: string;
    setPassword?: Dispatch<string>;
    setEditMode: Dispatch<boolean>;
    setShowAllAvailabilities: Dispatch<boolean>
}

export const Modal = ({off, setUser, password, setPassword, setEditMode, setShowAllAvailabilities} : IModal) => {
    const ref = useClickOutside(off);
    const [localUser, setLocalUser] = useState('')
    const defaultErrorMsg = { localUser: '', password: ''}
    const [errorMsg, setErrorMsg] = useState(defaultErrorMsg);

    const validate = useCallback(() => {
        let correct = true;

        if (localUser.length === 0) {
          setErrorMsg(errorMsg => ({ ...errorMsg, 'localUser': 'Enter the username' }));
          correct = false;
        }
    
        if (password && password.length === 0) {
          setErrorMsg(errorMsg => ({ ...errorMsg, 'password': 'Enter the password' }));
          correct = false;
        }
    
        return correct;
      }, [localUser, password])

    useEffect(() => {
        if (localUser.length > 0) setErrorMsg(errorMsg => ({ ...errorMsg, 'localUser': '' }));
    }, [localUser])

    const handleSubmit = async () => {
        if (validate()) {
            setUser(localUser)
            setEditMode(true)
            setShowAllAvailabilities(false)
            off()
        }
    }

    return (
    <div className='ModalWrapper'>
        <div className='ModalWindow' ref={ref}>
            <header>
                Mark your availability
            </header>
            <div className='ModalContent'>
                <div>
                    <label htmlFor='user'>Your name</label>
                    <input type='text' name='user' value={localUser} className={`${errorMsg.localUser.length > 0 ? 'ErrorInput' : ''}`} onChange={(e) => setLocalUser(e.target.value)}></input>
                    {errorMsg.localUser.length > 0 ? <span className='ErrorMsg'>{errorMsg.localUser}</span> : <span></span>}
                    {
                        password !== undefined ?
                        <>
                            <label htmlFor='password'>Pasword</label>
                            <input type='text' name='password' value={password} onChange={(e) => setPassword && setPassword(e.target.value)}></input>
                            <span>This meeting is protected by a password.</span>
                        </>
                        : null
                    }
                </div>
            </div>
            <footer>
                <Button size={ButtonSize.LG} type={ButtonType.SOLID} onClick={() => handleSubmit()}>Continue</Button>   
            </footer>
        </div>
    </div>

    )
}