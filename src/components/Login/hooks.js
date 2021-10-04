import {useContext, useState, useRef} from 'react'
import {AppContext} from '../Global/AppContext'
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie'
import { creatingSessionAPI } from '../api/api'


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
        creatingSessionAPI(email, password)
        .then((res) => 
        {
            if(res.status === 200){     
                Cookies.set('user', 'loginTrue', { expires: 1 })
                setState({...state, 
                open: true,
                response: res?.data,
                })
                setLoginUser(res)
                setIsLogin(true)
            }
            setTimeout(() => {
                setState({...state, isLoading: false})
                history.push(`/app/${res.data?.data.id}`)
            },)
        } 
        )
        .catch((err) => 
        {
            const { errors } = err.response.data;
            if(err.response.status === 401) {
                setState({...state, 
                    open: true,
                    isLoading: false,
                    responseMessage: errors[errors.length - 1],
                    warning: true
                })
            } else {
                setState({...state, 
                    open: true,
                    isLoading: false,
                    responseMessage: `Internal Server Error`,
                    warning: true
                })
            } 
        }
        )
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