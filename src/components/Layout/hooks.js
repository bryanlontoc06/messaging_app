import {useContext} from 'react'
import {AppContext} from '../Global/AppContext'


const useHooks = () => {
    const {isLogin, setIsLogin} = useContext(AppContext)
    return {
        isLogin,
        setIsLogin
    }
}

export default useHooks