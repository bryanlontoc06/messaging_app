import React from 'react'
import useSessionStorage from '../helpers/useSessionStorage'
export const AppContext = React.createContext();

const AppProvider = (props) => {
    const [isLogin, setIsLogin] = useSessionStorage('isLogin', '');
    const state = {
        isLogin
    }

    const func = {
        setIsLogin
    }

    return (
        <AppContext.Provider value={{ ...state, ...func }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppProvider;