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



const Index = () => {
    const { isLogin,
        loginUser, 
        matchesMD } = useHooks();
    
    
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
                    loginUser={loginUser}
                    matchesMD={matchesMD}
                />
            </Router>
        </>
    )
}

export default Index
