import {
    style,
    useStyles,
    Container, 
    LogoContainer, 
    Logo,
    ContentContainer,
    Typography,
} from './components'
import channel_logo from '../../assets/sampleLogo.png'
import Popover from '@mui/material/Popover';
import useHooks from './hooks'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import AddChannelModalComponent from './NewChannelComponent'
import {emailRemover} from '../helpers/helpers'
import AddUserModalComponent from './AddUserComponent'
import SnackbarComponent from '../Snackbars/index'
import AddDMModalComponent from './AddDMModalComponent'
import ContentChatBoxSectionComponent from './ContentChatBoxSectionComponent';
import ContentChannelSectionComponent from './ContentChannelSectionComponent';


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
        channelName
    } = useHooks();

    return (
        <> 
        <Container>
           <LogoContainer>
                <Logo src={channel_logo} />
           </LogoContainer>
           <ContentContainer>
               <ContentChannelSectionComponent 
                    handleOpenAddChannel={handleOpenAddChannel}
                    handleOpenDM={handleOpenDM}
                    channels={channels}
                    selectChannel={selectChannel}
                    intervalRetrieveMessagesinChannel={intervalRetrieveMessagesinChannel}
               />

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
               />
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
            />
            }
            {isLoading  &&
                <Backdrop
                    sx={{ color: '#fff' ,zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={true}
                    onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            }

            {users.data?.data  &&
                <AddDMModalComponent
                    open={openDM}
                    handleClose={handleClose}
                    style={style}
                    classes={classes}
                    addUserEmail={addUserEmail}
                    searchUser={searchUserDM}
                    // getSearchUser={getSearchUserDM}
                    users={searchUserDM.length < 1 ? users.data?.data : searchResultsDM}
                    emailRemover={emailRemover}
                    selectChannel={selectChannel}
                    loginUser={loginUser}
                    intervalRetrieveMessagesinUser={intervalRetrieveMessagesinUser}
                    debounceOnChange={debounceOnChange}
                    filteredItems={filteredItems}
                />
            } 
            
            {/* For Logout */}
            <div>
                <Popover
                    id={idPopOver}
                    open={openPopOver}
                    anchorEl={anchorEl}
                    onClose={handleClosePopOver}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <Typography sx={{ p: 2 }} >ID No: {loginUser.data.data?.id}</Typography>
                    <Typography sx={{ p: 2 }} >User ID: {emailRemover(loginUser.data.data?.uid)}</Typography>
                    <Typography sx={{ p: 2 }} style={{cursor: 'pointer'}} onClick={() => handleLogout()}>Logout</Typography>
                </Popover>
            </div>

            {/* Modal for Add Channel */}
            {users.data?.data && 
                <AddChannelModalComponent
                    openAddChannel={openAddChannel}
                    handleCloseChannel={handleClose}
                    classes={classes}
                    createAChannel={createAChannel}
                    channelName={channelName}
                    // inputUsers={inputUsers}
                    usersList={users}
                    loginUser={loginUser}
                    intervalRetrieveMessagesinUser={intervalRetrieveMessagesinUser}
                    debounceOnChange={debounceOnChange}
                    filteredItems={filteredItems}
                />
            }

            {/* Snackbar */}
            <SnackbarComponent 
                isOpen={state.open} 
                close={handleCloseAddUserModal}
                message={state.message}
                status={state.warning ? `warning` : `success`}
            />
        </Container>
        </>
    )
}

export default Index;
