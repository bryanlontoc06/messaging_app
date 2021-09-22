import {
    HomeIcon,
    FilledHomeIcon,
    ForumOutlinedIcon,
    FilledForumIcon,
    RecordVoiceOverOutlinedIcon,
    FilledRecordVoiceOverIcon,
    SearchIcon,
    AccountCircleOutlinedIcon,
    FilledAccountCircleIcon,
} from './components'

const footerIcons = [
    {
        icons: <HomeIcon />,
        icons_filled: <FilledHomeIcon />,
        labels: `Home`,
        link: '/'
    },
    {
        icons: <ForumOutlinedIcon />,
        icons_filled: <FilledForumIcon />,
        labels: `DMs`,
        link: `/dm`
    },
    {
        icons: <RecordVoiceOverOutlinedIcon />,
        icons_filled: <FilledRecordVoiceOverIcon />,
        labels: `Mentions`,
        link: `mentions`
    },
    {
        icons: <SearchIcon />,
        icons_filled: <SearchIcon />,
        labels: `Search`,
        link: `search`
    },
    {
        icons: <AccountCircleOutlinedIcon />,
        icons_filled: <FilledAccountCircleIcon />,
        labels: `You`,
        link: `profile`
    },
]

export default footerIcons;