import {
    ContentChannelSection,
    ContentChannelTitle,
    ChannelsAndMessagesContainer,
    ChannelsTitleHeader,
    AddIcon,
    ChannelsContainer,
    Channel
} from './components'
import UserChatBoxComponent from './UserChatBoxComponent';

const ContentChannelSectionComponent = (props) => {
    const {
        handleOpenAddChannel,
        channels,
        selectChannel,
        intervalRetrieveMessagesinChannel,
        handleOpenDM
    } = props;
    return (
        <ContentChannelSection>
            <ContentChannelTitle>Avion School</ContentChannelTitle>
            <ChannelsAndMessagesContainer>
            <ChannelsTitleHeader>Channels <AddIcon onClick={handleOpenAddChannel}/></ChannelsTitleHeader>
            <ChannelsContainer>
                {channels &&
                    channels.map((data) => {
                        return (<Channel key={data.id} active={selectChannel.id === data.id} onClick={() => {return intervalRetrieveMessagesinChannel(data)}}>{data.name}</Channel>)
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
        </ContentChannelSection>
    )
}

export default ContentChannelSectionComponent
