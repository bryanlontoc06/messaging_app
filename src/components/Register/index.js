import { useState, useEffect, useRef } from 'react';
import { Link as RouterLink, useHistory} from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Container, 
  Button, 
  Link, 
  Box,
  // Checkbox,
  // FormHelperText,
  TextField,
  Typography} from './components'
import axios from 'axios'
import Snackbar from '../Snackbars'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import useHooks from './hooks'
import { userRegistrationAPI } from '../api/api';


const Register = (props) => {
  const {email,
    password,
    retypePassword,
    history,
    handleClose,
    state,
    setState} = useHooks();
  

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              firstName: '',
              lastName: '',
              password: '',
              retypepassword: '',
              policy: false
            }}
            validationSchema={
            Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required'),
              retypepassword: Yup.string().max(255).required('Retype password is required').oneOf([Yup.ref('password'), null], 'Passwords must match'),
              // policy: Yup.boolean().oneOf([true], 'This field must be checked')
            })
          }

          // User Registration
            onSubmit={async() => {
              setState({...state, loading: true})
              userRegistrationAPI(email, password, retypePassword, state, setState, history)
            }}
          >
            
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              
              <form onSubmit={handleSubmit} method="POST">
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Create new account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use your email to create new account
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                  inputRef={email}
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                  inputRef={password}
                />
                <TextField
                  error={Boolean(touched.retypepassword && errors.retypepassword)}
                  fullWidth
                  helperText={touched.retypepassword && errors.retypepassword}
                  label="Retype Password"
                  margin="normal"
                  name="retypepassword"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.retypepassword}
                  variant="outlined"
                  inputRef={retypePassword}
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    {state.loading && 
                    <Backdrop
                      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                      open={true}
                      onClick={handleClose}
                    >
                      <CircularProgress color="inherit" />
                    </Backdrop>
                    }
                    Sign up now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Have an account?
                  {' '}
                  <Link component={RouterLink} to="/login" variant="h6" underline="hover">
                    Sign in
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
          <Snackbar 
            isOpen={state.open} 
            close={handleClose}
            message={state.responseMessage}
            status={state.warning ? 'warning' : 'success'}
          />
      </Box>
    </>
  );
};

export default Register;