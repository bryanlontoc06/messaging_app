import {
    Link
} from './components.js';

import HeaderComponent from './Header.js';
import FooterComponent from './Footer.js';
import SwitchComponent from '../Routes';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation,
    Redirect
  } from "react-router-dom";


const Index = () => {
    
    return (
        <>
            <Router>
                <HeaderComponent useLocation={useLocation}/>
                <SwitchComponent Switch={Switch} Route={Route} useLocation={useLocation}/>
                <FooterComponent Link={Link} useLocation={useLocation}/>
                <Redirect to={`/`} />
            </Router>
        </>
    )
}

export default Index
