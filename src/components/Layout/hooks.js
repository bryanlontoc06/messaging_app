import {useContext, useEffect} from 'react'
import {AppContext} from '../Global/AppContext'
import Cookies from 'js-cookie'


const useHooks = () => {
    const {isLogin, setIsLogin, loginUser, setLoginUser} = useContext(AppContext)

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
        setLoginUser
    }
}

export default useHooks