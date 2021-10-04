import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Container, 
  Button, 
  Link, 
  Box,
  TextField,
  Typography
} from './components'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '../Snackbars'
import useHooks from './hooks'


const Index = (props) => {
  const {
    handleClose,
    email,
    password,
    state,
    handleLogin} = useHooks();
  
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
              password: ''
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            // onSubmit={() => {
            //   navigate('/app/dashboard', { replace: true });
            // }}
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
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3, textAlign: 'center', }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    {`{App Logo}`}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    pb: 1,
                    pt: 3
                  }}
                >
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                  >
                    Login your email address
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
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={!state.warning && isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    onClick={() => handleLogin()}
                  >
                    Sign in now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Don&apos;t have an account?
                  {' '}
                  <Link component={RouterLink} to="/register" variant="h6" underline="hover">
                    Sign up
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
        {state.isLoading && 
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
            // onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          }
          <Snackbar 
            isOpen={state.open} 
            close={handleClose}
            message={state.responseMessage}
            status={state.warning ? 'warning': 'success'}
          />
        </Box>
        </>
    )
}

export default Index
