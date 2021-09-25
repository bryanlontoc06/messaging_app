
import Home from '../../bak_pages/Home'
import DMs from '../../bak_pages/DMs'
import Mentions from '../../bak_pages/Mentions'
import You from '../../bak_pages/You'


import MainPage from '../Main'
import Login from '../Login'
import Register from "../Register";

const Index = (props) => {
  const {Switch, Route, useLocation, isLogin, setIsLogin} = props;
  return (
    <>
      <Switch>
          <Route exact path="/" component={() => <MainPage authorized={isLogin} setIsLogin={setIsLogin}/>} />
          <Route exact path="/login" component={() => <Login isLogin={isLogin} setIsLogin={setIsLogin}/>} />
          <Route exact path="/register" component={() => <Register />} />
      </Switch>
    </>
  )
}

export default Index
