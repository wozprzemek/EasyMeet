import { loginOrCreateUser } from 'api/loginOrCreateUser';
import { Button } from 'components/Button/Button';
import { useClickOutside } from 'hooks/useClickOutside';
import { Dispatch, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ButtonSize, ButtonType } from 'types';
import { User } from 'views/CreateMeeting/types';
import './modal.scss';

interface IModal {
    off: () => void;
    setUser: Dispatch<User>;
    setEditMode: Dispatch<boolean>;
    setShowAllAvailabilities: Dispatch<boolean>
}

export const Modal = ({off, setUser, setEditMode, setShowAllAvailabilities} : IModal) => {

    const { id } = useParams()
    const ref = useClickOutside(off);
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const defaultErrorMsg = { name: '', password: ''}
    const [errorMsg, setErrorMsg] = useState(defaultErrorMsg);

    const validate = useCallback(() => {
        let correct = true;

        if (name.length === 0) {
          setErrorMsg(errorMsg => ({ ...errorMsg, 'name': 'Enter the username' }));
          correct = false;
        }
    
        return correct;
      }, [name, password])

    useEffect(() => {
        if (name.length > 0) setErrorMsg(errorMsg => ({ ...errorMsg, 'name': '' }));
    }, [name])

    const handleSubmit = async () => {
        if (validate()) {
            const user: User = await loginOrCreateUser(name, password, id)
            // Successful login or creation
            if (user) {
                setUser(user)
                setEditMode(true)
                setShowAllAvailabilities(false)
                off()
            }
            // Unsuccessful login
            else {
                setErrorMsg(errorMsg => ({ ...errorMsg, 'password': 'Wrong password' }));
            }
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
                    <input type='text' name='user' value={name} className={`${errorMsg.name.length > 0 ? 'ErrorInput' : ''}`} onChange={(e) => setName(e.target.value)}></input>
                    {errorMsg.name.length > 0 ? <span className='ErrorMsg'>{errorMsg.name}</span> : <span></span>}

                    <label htmlFor='password'>Password (optional)</label>
                    <input type='text' name='password' value={password} className={`${errorMsg.password.length > 0 ? 'ErrorInput' : ''}`} onChange={(e) => setPassword && setPassword(e.target.value)}></input>
                    {errorMsg.password.length > 0 ? <span className='ErrorMsg'>{errorMsg.password}</span> : <span></span>}

                </div>
            </div>
            <footer>
                <Button size={ButtonSize.LG} type={ButtonType.SOLID} onClick={() => handleSubmit()}>Continue</Button>   
            </footer>
        </div>
    </div>

    )
}