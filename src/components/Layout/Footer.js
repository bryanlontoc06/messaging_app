import {useState, useEffect} from 'react'
import {Footer, FooterIcons, PencilSquare} from './components'
import FooterIconsComponent from './FooterIconsComponent';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import footerIcons from './FooterIconsContent';

const actions = [
    { icon: <FileCopyIcon />, name: 'Copy' },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <PrintIcon />, name: 'Print' },
    { icon: <ShareIcon />, name: 'Share' },
  ];

const FooterComponent = (props) => {
    const {Link, useLocation} = props;
    const [activeMenu, setActiveMenu] = useState(0)
    const location = useLocation();


    return (
        <>
            <Footer>
                {(location.pathname === '/search' || location.pathname === '/profile') ?
                    '':
                    <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
                        <SpeedDial
                            ariaLabel="SpeedDial basic example"
                            sx={{ position: 'absolute', bottom: 28, right: 6 }}
                            icon={<PencilSquare />      }
                            // icon={<SpeedDialIcon />}
                        >
                            {actions.map((action) => (
                                <SpeedDialAction
                                    style={{background: '#450a44' }}
                                    key={action.name}
                                    icon={action.icon}
                                    tooltipTitle={action.name}
                                />
                            ))}
                        </SpeedDial>
                    </Box>
                }

                <FooterIcons>
                    {footerIcons.map((item, index) => {
                        return (
                            <Link key={index} to={item.link} onClick={() => setActiveMenu(index)}>
                                <FooterIconsComponent 
                                    icons={item.icons} 
                                    filledIcons={item.icons_filled}
                                    labels={item.labels} 
                                    location={location}
                                    activeMenu={activeMenu}
                                    index={index}
                                />
                            </Link>
                        )
                    })}
                </FooterIcons>
            </Footer>
        </>
    )
}

export default FooterComponent
