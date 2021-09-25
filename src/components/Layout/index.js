// import {
//     Link
// } from './components.js';

// import HeaderComponent from './Header.js';
// import FooterComponent from './Footer.js';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation,
    Redirect
  } from "react-router-dom";

import SwitchComponent from '../Routes';
import useHooks from './hooks'


const Index = () => {
    const {
        isLogin,
        setIsLogin
      } = useHooks();
    
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
                    useLocation={useLocation}
                    isLogin={isLogin}
                    setIsLogin={setIsLogin}
                />
            </Router>
        </>
    )
}

export default Index
