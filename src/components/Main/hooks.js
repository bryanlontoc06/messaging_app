import {useContext} from 'react'
import {AppContext} from '../Global/AppContext'


const useHooks = () => {
    const {isLogin, setIsLogin, loginUser, setLoginUser} = useContext(AppContext)
    return {
        isLogin,
        setIsLogin,
        loginUser, 
        setLoginUser
    }
}

export default useHooks