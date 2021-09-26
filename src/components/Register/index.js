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







const Register = (props) => {
  const {isLogin, setIsLogin} = props;
  const email = useRef('')
  const password = useRef('')
  const retypePassword = useRef('')

  const [state, setState] = useState({
    open: false,
    loading: false,
    response: '',
    responseMessage: '',
    warning: false,
  });

  const history = useHistory();

  const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      };
      setState({
        ...state, open: false,
      })
  };


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
                await axios({
                  url: 'http://206.189.91.54/api/v1/auth',
                  data: {
                    'email': email.current.value,
                    'password': password.current.value,
                    'password_confirmation': retypePassword.current.value,
                  },
                  headers: {},
                  method: 'POST'
                })
                .then((res) => 
                  {
                      if(res.status === 200){
                          setState({...state, 
                            open: true,
                            loading: false,
                            response: res,
                            responseMessage: `Registered successfully!`,
                            warning: false
                          })
                          setTimeout(() => {
                            history.push('/login')
                          }, 1500)
                      }
                  },
                )
                .catch((err) =>
                  { 
                    const {full_messages} = err.response.data?.errors;
                    console.log({full_messages})
                    if(err.response.status === 422) {
                      setState({...state, 
                        open: true,
                        loading: false,
                        response: err.response, 
                        responseMessage: full_messages[full_messages.length - 1], 
                        warning: true
                      })
                    }
                  }
                )
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