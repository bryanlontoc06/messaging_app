import {
    Container, 
    LockOutlinedIcon, 
    CommentOutlinedIcon,
    SectionTitle,
    AddBoxIcon,
    FavoriteIcon,
    Body
} from './components'
import './App.css'
import BodyIconsComponent from './BodyIconsComponent';
import JumpToComponent from '../JumpToComponent'


const Index = (props) => {
    const {useLocation} = props;
    const location = useLocation();


    return (
        <Container>
            <Body>
                {(location.pathname === '/' || location.pathname === '/dm') && <JumpToComponent /> }
                <BodyIconsComponent icons={<CommentOutlinedIcon />} labels={`Threads`}/>
                <SectionTitle>Channels</SectionTitle>
                <BodyIconsComponent icons={<LockOutlinedIcon />} labels={`batch 11`}/>
                <BodyIconsComponent icons={<AddBoxIcon />} labels={`Add channel`}/>
                <SectionTitle>Direct messages</SectionTitle>
                <BodyIconsComponent icons={<FavoriteIcon />} labels={`slackbot`}/>
            </Body>
        </Container>
    )
}

export default Index
