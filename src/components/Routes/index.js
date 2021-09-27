
import Home from '../../bak_pages/Home'
import DMs from '../../bak_pages/DMs'
import Mentions from '../../bak_pages/Mentions'
import You from '../../bak_pages/You'


import { Redirect } from 'react-router-dom'
import MainPage from '../Main'
import Login from '../Login'
import Register from "../Register";

const Index = (props) => {
  const {Switch, Route, isLogin, loginUser} = props;
  return (
    <>
      <Switch>
          <Route exact path="/app/:id" component={() => isLogin ? <MainPage/> : <Redirect to='/login'/>} />
          <Route exact path="/login" component={() => isLogin ? <Redirect to={`/app/${loginUser.data?.data?.id}`}/> : <Login />} />
          <Route exact path="/" component={() => isLogin ? <Redirect to={`/app/${loginUser.data?.data?.id}`}/> : <Login />} />
          <Route exact path="/register" component={() => isLogin ? <Redirect to={`/app/${loginUser.data?.data?.id}`}/> : <Register />} />
      </Switch>
    </>
  )
}

export default Index
