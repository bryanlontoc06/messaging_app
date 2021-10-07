import { Typography } from './components';
import Popover from '@mui/material/Popover';
import {emailRemover} from '../helpers/helpers'
import {AvatarnButton, AvatarGroup, AvatarSmallGroup, Button} from './components'
import {LoadingChannelMembers} from '../ChannelSkeletonLoading'

const Index = (props) => {
    const {idPopOver, openPopOver, anchorEl, handleClosePopOver, loginUser, handleLogout, checkMembers, selectChannel, channel, selectUser, classes, handleOpenChannelMembers, handleOpen} = props;
    return (
        <Popover
            id={idPopOver}
            open={openPopOver}
            anchorEl={anchorEl}
            onClose={handleClosePopOver}
            anchorOrigin={{
                vertical: checkMembers? 'top' : 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            {checkMembers ? 
            <AvatarnButton>
                {(selectChannel || channel && !selectUser) ?
                    (channel ?
                    <AvatarGroup max={5} variant="rounded" className={classes.avatarSize} style={{marginRight: '0.5rem'}} onClick={() => {return (handleOpenChannelMembers(), handleClosePopOver())}}>
                        {channel.map((member, index) => {
                                return (
                                        <AvatarSmallGroup key={index} alt={emailRemover(member[0]?.uid).toUpperCase()} src="/static/images/avatar/5.jpg" variant="rounded" />
                                    )
                            })
                        }
                    </AvatarGroup>
                    : <LoadingChannelMembers/>)
                    :   ''
            }
            {selectChannel && 
                    <Button variant="contained" onClick={() => {return (handleOpen(), handleClosePopOver())}}>ADD USER</Button> 
            }
            </AvatarnButton>
         : 
            <>
                <Typography sx={{ p: 2 }} >ID No: {loginUser.data.data?.id}</Typography>
                <Typography sx={{ p: 2 }} >User ID: {emailRemover(loginUser.data.data?.uid)}</Typography>
                <Typography sx={{ p: 2 }} style={{cursor: 'pointer'}} onClick={() => handleLogout()}>Logout</Typography> 
            </>}
        </Popover>
    )
}

export default Index
