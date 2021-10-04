import {useRef, useState} from 'react'
import { useHistory } from 'react-router-dom';

const useHooks = () => {

    const email = useRef('')
    const password = useRef('')
    const retypePassword = useRef('')

    const [state, setState] = useState({
        open: false,
        loading: false,
        response: '',
        responseMessage: '',
        warning: false,
    });

    const history = useHistory();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        };
        setState({
            ...state, open: false,
        })
    };
    return {
        email,
        password,
        retypePassword,
        history,
        handleClose,
        state,
        setState
    }
}

export default useHooks
