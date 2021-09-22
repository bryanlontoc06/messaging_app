import {TextField} from './components'
import { withStyles } from '@material-ui/styles'

const Index = () => {
    const CustomTextField = withStyles({
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderRadius: `8px`,
            },
          },
        },
      })(TextField);
    return (
        <>
            <CustomTextField
                id="outlined-required"
                placeholder="Jump to..."
            />
        </>
    )
}

export default Index
