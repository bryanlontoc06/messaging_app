import React from 'react'
import useSessionStorage from '../helpers/useSessionStorage'
import useLocalStorage from '../helpers/useLocalStorage'
export const AppContext = React.createContext();

const AppProvider = (props) => {
    const [isLogin, setIsLogin] = useSessionStorage('isLogin', '');
    const [loginUser, setLoginUser] = useLocalStorage('loginUser', '')
    const state = {
        isLogin,
        loginUser
    }

    const func = {
        setIsLogin,
        setLoginUser
    }

    return (
        <AppContext.Provider value={{ ...state, ...func }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppProvider;