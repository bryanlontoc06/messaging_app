import {
    IconsNLabels,
    Labels
} from './components'

const BodyIconsComponent = (props) => {
    const {icons, labels} = props;

    return (
        <>
           <IconsNLabels>
                {icons}
                <Labels>{labels}</Labels>
            </IconsNLabels> 
        </>
    )
}

export default BodyIconsComponent
