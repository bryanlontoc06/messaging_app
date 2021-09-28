// import {
//     Link
// } from './components.js';

// import HeaderComponent from './Header.js';
// import FooterComponent from './Footer.js';

import React, {useEffect} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

import SwitchComponent from '../Routes';
import useHooks from './hooks';
import Cookies from 'js-cookie'


const Index = () => {
    const { isLogin,
        setIsLogin,
        loginUser,
        setLoginUser } = useHooks();
    
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
        if(window.location.pathname === '/') 
        {
            window.location.pathname = `/app/${loginUser.data.data?.id}`
        }
        // } else {
        //     window.location.pathname = `/login`
        // }
    }, [])
    return (
        <>
            {/* <Router>
                <HeaderComponent useLocation={useLocation}/>
                <SwitchComponent Switch={Switch} Route={Route} useLocation={useLocation}/>
                <FooterComponent Link={Link} useLocation={useLocation}/>
                <Redirect to={`/`} />
            </Router> */}
            <Router>
                <SwitchComponent 
                    Switch={Switch} 
                    Route={Route} 
                    isLogin={isLogin}
                />
            </Router>
        </>
    )
}

export default Index
