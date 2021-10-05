import {useContext, useState, useRef} from 'react'
import {AppContext} from '../Global/AppContext'
import { useHistory } from 'react-router-dom';
import { creatingUserSessionAPI } from '../api/api'


const useHooks = () => {
    const {isLogin, setIsLogin, loginUser, setLoginUser} = useContext(AppContext)
    const email = useRef('')
    const password = useRef('')
    const [state, setState] = useState({
        open: false,
        isLoading: false,
        response: '',
        responseMessage: '',
        warning: false,
    })
    const history = useHistory();

    // Creating a User Session
    const handleLogin = async() => {
        setState({isLoading: true})
        creatingUserSessionAPI(email, password, state, setState, setLoginUser, setIsLogin, history)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        };
        setState({
          ...state, open: false,
        })
    };
  
    return {
        isLogin,
        setIsLogin,
        loginUser, 
        setLoginUser,
        handleClose,
        email,
        password,
        history,
        state,
        handleLogin
    }
}

export default useHooks