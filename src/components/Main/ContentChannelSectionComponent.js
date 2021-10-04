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
    Avatar
} from './components'
import UserChatBoxComponent from './UserChatBoxComponent';
import channel_logo from '../../assets/sampleLogo.png'
import { emailRemover } from '../helpers/helpers';


const ContentChannelSectionComponent = (props) => {
    const {
        handleOpenAddChannel,
        channels,
        selectChannel,
        intervalRetrieveMessagesinChannel,
        handleOpenDM,
        matchesMD,
        handleClickPopOver,
        loginUser
    } = props;

    return (
        <ContentChannelSection>
            {!matchesMD &&
                <LogoContainer>
                    <Logo src={channel_logo} />
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
            {matchesMD &&
                <ChannelsAndMessagesContainer>
                    <ChannelsTitleHeader>Channels <AddIcon onClick={handleOpenAddChannel}/></ChannelsTitleHeader>
                    <ChannelsContainer>
                        {channels &&
                            channels.map((data) => {
                                return (<Channel key={data.id} active={selectChannel.id === data.id} 
                                    onClick={() => {
                                        return (
                                            intervalRetrieveMessagesinChannel(data)
                                        ) 
                                    }}>{data.name}</Channel>)
                                })
                        }
                    </ChannelsContainer>
                    <ChannelsTitleHeader>Direct Messages <AddIcon onClick={handleOpenDM}/></ChannelsTitleHeader>
                    {/* <ChannelsContainer>
                        <UserChatBoxComponent initial={`M`} imgSrc={``} name={`Mike Camino`}/>
                        <UserChatBoxComponent initial={`M`} imgSrc={``} name={`Mike Camino`}/>
                        <UserChatBoxComponent initial={`M`} imgSrc={``} name={`Mike Camino`}/>
                    </ChannelsContainer> */}
                </ChannelsAndMessagesContainer>
            }
        </ContentChannelSection>
    )
}

export default ContentChannelSectionComponent
