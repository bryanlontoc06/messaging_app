import {
  Container, 
  ProfileDetailsContainer, 
  ProfileName, 
  ActiveState, 
  ProfileDetails, 
  NotificationsOffOutlinedIcon,
  EventBusyIcon
} from './components'
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import {TextField} from './components'
import { withStyles } from '@material-ui/styles'
import BodyIconsComponent from './BodyIconsComponent';

const shapeStyles = { bgcolor: 'primary.main', width: 56, height: 56, borderRadius: '5px' };
const rectangle = <Box component="span" sx={shapeStyles} />;
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: `3px`,
        top: `30px`,
        border: `3px solid #fff`,
        padding: `0 4px`,
        background: `green`
    },
  }));


const Index = () => {

    const CustomTextField = withStyles({
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderRadius: `8px`,
            },
          },
        },
      })(TextField);
    return (
        <Container>
            <ProfileDetailsContainer>
                <StyledBadge color="secondary" badgeContent=" " anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}>
                    {rectangle}
                </StyledBadge>
                <ProfileDetails>
                    <ProfileName>Bryan Lontoc</ProfileName>
                    <ActiveState>Active</ActiveState>
                </ProfileDetails>
            </ProfileDetailsContainer>
            <CustomTextField
                id="outlined-required"
                placeholder="Update your status"
            />
            <BodyIconsComponent icons={<NotificationsOffOutlinedIcon/>} labels={`Pause notifications`}/>
            <BodyIconsComponent icons={<EventBusyIcon/>} labels={`Set yourself as away`}/>
            <BodyIconsComponent icons={<NotificationsOffOutlinedIcon/>} labels={`Saved items`}/>
            <BodyIconsComponent icons={<NotificationsOffOutlinedIcon/>} labels={`View profile`}/>
            <BodyIconsComponent icons={<NotificationsOffOutlinedIcon/>} labels={`Notifications`}/>
            <BodyIconsComponent icons={<NotificationsOffOutlinedIcon/>} labels={`Preferences`}/>
        </Container>
    )
}

export default Index
