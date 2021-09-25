import React, {useState, forwardRef} from 'react'
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const Index = (props) => {
    const {isOpen, close, message, status} = props;

    
    return (
        <>
            <Snackbar open={isOpen} autoHideDuration={4000} 
                onClose={close} 
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}>
                <Alert 
                    onClose={close} 
                    severity={status} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>  
        </>
    )
}

export default Index
