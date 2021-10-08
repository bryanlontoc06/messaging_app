import {
    ContentChannelSection,
    ContentChannelTitle,
    ChannelsAndMessagesContainer,
    ChannelsTitleHeader,
    AddIcon,
    ChannelsContainer,
    Channel,
    LogoContainer,
    Logo,
    ContentUserProfileContainer,
    Avatar,
    UidInputContainer,
    TextField,
    useStyles,
    UsersContainer,
    AddUserUsersContainer,
    User,
    ButtonAddUser,
    UsersContainerDM
} from './components'
import UserChatBoxComponent from './UserChatBoxComponent';
import channel_logo from '../../assets/sampleLogo.png'
import { emailRemover } from '../helpers/helpers';
import React from 'react';
import { LoadingChannels } from '../ChannelSkeletonLoading';

import DirectMessagesContentComponent from './DirectMessagesContentComponent'
import {LoadingDMSearchBox} from '../ChannelSkeletonLoading'

const ContentChannelSectionComponent = (props) => {
    const {
        handleOpenAddChannel,
        channels,
        selectChannel,
        intervalRetrieveMessagesinChannel,
        handleOpenDM,
        matchesMD,
        handleClickPopOver,
        loginUser,
        users,
        addUserEmail,
        debounceOnChange,
        filteredItems,
        intervalRetrieveMessagesinUser,
        toggleDrawer
    } = props;
    const classes = useStyles();

    return (
        <ContentChannelSection>
            {/* Mobile view for user Profile */}
            {!matchesMD &&
                <LogoContainer>
                    <Logo src={channel_logo} loading='eager'/>
                </LogoContainer>
            }
            <ContentChannelTitle>Avion School</ContentChannelTitle>

            {!matchesMD && 
            <ContentUserProfileContainer onClick={handleClickPopOver}>
                <Avatar sx={{ bgcolor: 'green' }} variant="rounded">
                    {loginUser.data?.data ? emailRemover(loginUser.data.data?.email).charAt(0).toUpperCase() : null}
                </Avatar>
            </ContentUserProfileContainer>
            }
            {/* *************************************** */}


            {/* Desktop View for Channels and DMs */}
            {matchesMD &&
                <ChannelsAndMessagesContainer>
                    <ChannelsTitleHeader>Channels <AddIcon onClick={handleOpenAddChannel}/></ChannelsTitleHeader>
                    <ChannelsContainer>
                        {(users && channels) ?
                            (channels ?
                                channels.map((data) => {
                                    return (<Channel key={data?.id} active={selectChannel?.id === data?.id} 
                                        onClick={() => {
                                            return (
                                                intervalRetrieveMessagesinChannel(data)
                                            ) 
                                        }}>{data?.name}</Channel>)
                                    })
                                : 
                                <LoadingChannels />)
                            : ''
                        }
                    </ChannelsContainer>
                    <ChannelsTitleHeader>Direct Messages {/*<AddIcon onClick={handleOpenDM}/> */}</ChannelsTitleHeader>
                    {users ? <DirectMessagesContentComponent  
                        addUserEmail={addUserEmail}
                        debounceOnChange={debounceOnChange}
                        filteredItems={filteredItems}
                        intervalRetrieveMessagesinUser={intervalRetrieveMessagesinUser}
                        toggleDrawer={toggleDrawer}
                        classes={classes}
                        matchesMD={matchesMD}
                    />: <LoadingDMSearchBox />}
                </ChannelsAndMessagesContainer>
            }
        </ContentChannelSection>
    )
}

export default ContentChannelSectionComponent
