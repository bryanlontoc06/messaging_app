import {
    style,
    useStyles,
    Container, 
    LogoContainer, 
    Logo,
    ContentContainer,
    Typography,
    ChannelsAndMessagesContainer,
    ChannelsTitleHeader,
    AddIcon,
    Channel,
    ChannelsContainer
} from './components'
import channel_logo from '../../assets/sampleLogo.png'
import useHooks from './hooks'
import AddChannelModalComponent from './NewChannelComponent'
import {emailRemover} from '../helpers/helpers'
import AddUserModalComponent from './AddUserComponent'
import SnackbarComponent from '../Snackbars/index'
import AddDMModalComponent from './AddDMModalComponent'
import ContentChatBoxSectionComponent from './ContentChatBoxSectionComponent';
import ContentChannelSectionComponent from './ContentChannelSectionComponent';
import Drawer from '@mui/material/Drawer';
import ContentChatBoxBodyComponent from './ContentChatBoxBody';
import DirectMessagesContentComponent from './DirectMessagesContentComponent'
import {LoadingDMSearchBox} from '../ChannelSkeletonLoading'
import BackdropComponent from '../Backdrop'
import PopoverComponent from '../ProfilePopover'
import { LoadingChannels } from '../ChannelSkeletonLoading';

const Index = () => {
    const classes = useStyles();
    const {
        loginUser, 
        addUserEmail,
        userID,
        searchUserDM,
        searchResultsDM,
        allMessages,
        isLoading,
        handleOpen,
        handleAddUser,
        handleCloseAddUserModal,
        openAddChannel,
        handleClickPopOver,
        handleClosePopOver,
        openPopOver,
        idPopOver,
        handleOpenAddChannel,
        intervalRetrieveMessagesinChannel,
        intervalRetrieveMessagesinUser,
        createAMessage,
        handleLogout,
        openDM,
        handleOpenDM,
        filteredItems,
        debounceOnChange,
        channels,
        selectChannel,
        selectUser,
        users,
        chatMessage,
        open,
        handleClose,
        query,
        anchorEl,
        state,
        createAChannel,
        channelName,
        matchesMD,
        channel,
        openChannelMembersModal,
        handleOpenChannelMembers,
        setOpenChannelMembersModal,
        toggleDrawer,
        handleCloseDrawer
    } = useHooks();

    return (
        <> 
        <Container>
            {/* Desktop view Logo */}
            {matchesMD &&
            <LogoContainer>
                    <Logo src={channel_logo} />
            </LogoContainer>}

           <ContentContainer>
               <ContentChannelSectionComponent 
                    handleOpenAddChannel={handleOpenAddChannel}
                    handleOpenDM={handleOpenDM}
                    channels={channels}
                    selectChannel={selectChannel}
                    intervalRetrieveMessagesinChannel={intervalRetrieveMessagesinChannel}
                    matchesMD={matchesMD}
                    handleClickPopOver={handleClickPopOver}
                    loginUser={loginUser}
                    users={users}
                    addUserEmail={addUserEmail}
                    debounceOnChange={debounceOnChange}
                    filteredItems={filteredItems}
                    intervalRetrieveMessagesinUser={intervalRetrieveMessagesinUser}
                    toggleDrawer={toggleDrawer}
               />

                {/* Mobile view Channels and DMs */}
                {!matchesMD &&
                    <ChannelsAndMessagesContainer>
                        <ChannelsTitleHeader>Channels <AddIcon onClick={handleOpenAddChannel}/></ChannelsTitleHeader>
                        <ChannelsContainer>
                            {users &&
                                channels ?
                                channels.map((data) => {
                                    return (<Channel key={data?.id} active={selectChannel?.id === data?.id} 
                                        onClick={() => {
                                            return (
                                                intervalRetrieveMessagesinChannel(data),
                                                toggleDrawer()
                                            ) 
                                        }}>{data?.name}</Channel>)
                                    })
                                : 
                                <LoadingChannels />
                            }
                        </ChannelsContainer>
                        <ChannelsTitleHeader>Direct Messages <AddIcon onClick={handleOpenDM}/></ChannelsTitleHeader>
                        {users ?
                        <DirectMessagesContentComponent  
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

                {/* Desktop View Chat Box Section*/}
                {matchesMD &&
                    <ContentChatBoxSectionComponent 
                            loginUser={loginUser}
                            handleClickPopOver={handleClickPopOver}
                            selectChannel={selectChannel}
                            selectUser={selectUser}
                            allMessages={allMessages}
                            handleOpen={handleOpen}
                            createAMessage={createAMessage}
                            classes={classes}
                            chatMessage={chatMessage}
                            matchesMD={matchesMD}
                            channel={channel}
                            openChannelMembersModal={openChannelMembersModal}
                            handleOpenChannelMembers={handleOpenChannelMembers}
                            setOpenChannelMembersModal={setOpenChannelMembersModal}
                    /> 
                }
           </ContentContainer>

            {/* Modal for Add User  */}
            {users.data?.data  &&
                <AddUserModalComponent
                    open={open}
                    handleClose={handleClose}
                    style={style}
                    classes={classes}
                    userID={userID}
                    emailRemover={emailRemover}
                    handleAddUser={handleAddUser}
                    selectChannel={selectChannel}
                    loginUser={loginUser}
                    debounceOnChange={debounceOnChange}
                    filteredItems={filteredItems}
                    query={query}
                    matchesMD={matchesMD}
                />
            }
            
            {/* Modal for Add DM */}
            {users.data?.data  &&
                <AddDMModalComponent
                    open={openDM}
                    handleClose={handleClose}
                    style={style}
                    classes={classes}
                    addUserEmail={addUserEmail}
                    emailRemover={emailRemover}
                    searchUser={searchUserDM}
                    selectChannel={selectChannel}
                    loginUser={loginUser}
                    debounceOnChange={debounceOnChange}
                    filteredItems={filteredItems}
                    users={searchUserDM.length < 1 ? users.data?.data : searchResultsDM}
                    intervalRetrieveMessagesinUser={intervalRetrieveMessagesinUser}
                    matchesMD={matchesMD}
                    toggleDrawer={toggleDrawer}
                />
            } 
            
            {/* Modal for Add Channel */}
            {users.data?.data && 
                <AddChannelModalComponent
                    openAddChannel={openAddChannel}
                    handleCloseChannel={handleClose}
                    classes={classes}
                    createAChannel={createAChannel}
                    channelName={channelName}
                    usersList={users}
                    loginUser={loginUser}
                    debounceOnChange={debounceOnChange}
                    filteredItems={filteredItems}
                    intervalRetrieveMessagesinUser={intervalRetrieveMessagesinUser}
                    matchesMD={matchesMD}
                />
            }

            {/* For Logout */}
            <PopoverComponent idPopOver={idPopOver} openPopOver={openPopOver} anchorEl={anchorEl} handleClosePopOver={handleClosePopOver} loginUser={loginUser} handleLogout={handleLogout}/>

            {/* Mobile View Drawer for chat box body */}
            {!matchesMD &&
                <Drawer
                    anchor='right'
                    open={state.right}
                    style={{ width: '100%'}}
                    classes={{ paper: classes.paper }}
                >
                    <ContentChatBoxBodyComponent 
                        selectChannel={selectChannel}
                        selectUser={selectUser}
                        handleOpen={handleOpen}
                        allMessages={allMessages}
                        loginUser={loginUser}
                        createAMessage={createAMessage}
                        classes={classes}
                        chatMessage={chatMessage}
                        handleCloseDrawer={handleCloseDrawer}
                        channel={channel}
                        openChannelMembersModal={openChannelMembersModal}
                        handleOpenChannelMembers={handleOpenChannelMembers}
                        setOpenChannelMembersModal={setOpenChannelMembersModal}
                        idPopOver={idPopOver}
                        anchorEl={anchorEl}
                    />
                </Drawer>
            }

            {/* Snackbar */}
            <SnackbarComponent 
                isOpen={state.open} 
                close={handleCloseAddUserModal}
                message={state.message}
                status={state.warning ? `warning` : `success`}
            />

            {/* Component for Loading State */}
            {isLoading  &&
                <BackdropComponent handleClose={handleClose}/>
            }
        </Container>
        </>
    )
}

export default Index;
