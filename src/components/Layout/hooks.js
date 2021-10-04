import {useContext, useEffect} from 'react'
import {AppContext} from '../Global/AppContext'
import Cookies from 'js-cookie'
import useMediaQuery from '@mui/material/useMediaQuery';


const useHooks = () => {
    const {isLogin, setIsLogin, loginUser, setLoginUser} = useContext(AppContext)
    const matchesMD = useMediaQuery('(min-width: 768px)');

    const readCookie = () => {
        const user = Cookies.get("user")
        if(user) {
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }
    } 

    useEffect(() => {
        readCookie();
    }, [])
    
    return {
        isLogin,
        setIsLogin,
        loginUser,
        setLoginUser,
        matchesMD
    }
}

export default useHooks