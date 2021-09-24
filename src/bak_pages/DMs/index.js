import {Container, ChatRow, UserChatBoxContainer, UserName, ChatBody, ChatDate} from './components.js'
import JumpToComponent from '../JumpToComponent'
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

const shapeStyles = { bgcolor: 'primary.main', width: 40, height: 40, borderRadius: '5px' };
const rectangle = <Box component="span" sx={shapeStyles} />;


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: `3px`,
        top: `13px`,
        border: `3px solid #fff`,
        padding: `0 4px`,
        background: `green`
    },
  }));

const Index = (props) => {
    const {useLocation} = props;
    const location = useLocation();
    return (
        <Container>
            {(location.pathname === '/' || location.pathname === '/dm') && <JumpToComponent />}
            <ChatRow>
                <StyledBadge color="secondary" badgeContent=" " anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}>
                    {rectangle}
                </StyledBadge>
                <UserChatBoxContainer>
                    <UserName>Slackbot</UserName>
                    <ChatBody>{`slackbot: Hello I'm slackbot Hello I'm slackbot Hello I'm slackbot Hello I'm slackbot`.substring(0,65)+  `... `}</ChatBody>
                </UserChatBoxContainer>
                <ChatDate>3h</ChatDate>
            </ChatRow>
            <ChatRow>
                <StyledBadge color="secondary" badgeContent=" " anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}>
                    {rectangle}
                </StyledBadge>
                <UserChatBoxContainer>
                    <UserName>Slackbot</UserName>
                    <ChatBody>{`slackbot: Hello I'm slackbot Hello I'm slackbot Hello I'm slackbot Hello I'm slackbot`.substring(0,65)+  `... `}</ChatBody>
                </UserChatBoxContainer>
                <ChatDate>3h</ChatDate>
            </ChatRow>
        </Container>
    )
}

export default Index
