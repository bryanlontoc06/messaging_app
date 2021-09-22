import {Header, LogoContainer, HeaderTitle} from './components'
import channel_logo from '../../assets/sampleLogo.png'

const HeaderComponent = (props) => {
    const { useLocation} = props;
    const location = useLocation();

    let headertitle = null;
    if(location.pathname === '/') {
        headertitle = 'Avion School'
    } else if (location.pathname === '/dm') {
        headertitle = 'Direct messages'
    }  else if (location.pathname === '/mentions') {
        headertitle = 'Mentions & reactions'
    } else if (location.pathname === '/profile') {
        headertitle = 'You'
    }

    return (
        <>
           <Header>
           {location.pathname === '/' && <LogoContainer src={channel_logo}/> }
            <HeaderTitle>{headertitle}</HeaderTitle>
            </Header> 
        </>
    )
}

export default HeaderComponent
