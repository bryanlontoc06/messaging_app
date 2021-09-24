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


const Index = () => {
    
    return (
        <>
            {/* <Router>
                <HeaderComponent useLocation={useLocation}/>
                <SwitchComponent Switch={Switch} Route={Route} useLocation={useLocation}/>
                <FooterComponent Link={Link} useLocation={useLocation}/>
                <Redirect to={`/`} />
            </Router> */}
            <Router>
                <SwitchComponent Switch={Switch} Route={Route} useLocation={useLocation}/>
            </Router>
        </>
    )
}

export default Index
