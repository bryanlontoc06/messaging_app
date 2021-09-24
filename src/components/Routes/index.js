
import Home from '../../bak_pages/Home'
import DMs from '../../bak_pages/DMs'
import Mentions from '../../bak_pages/Mentions'
import You from '../../bak_pages/You'

import MainPage from '../Main'
import Login from '../Login'
import Register from "../Register";

const Index = (props) => {
  const {Switch, Route, useLocation} = props;
  return (
    <>
      <Switch>
          <Route exact path="/" component={MainPage}>
              {/* <Home useLocation={useLocation}/> */}
              <MainPage />
          </Route>
          <Route exact path="/login" component={Login}>
              {/* <DMs useLocation={useLocation}/> */}
              <Login />
          </Route>
          <Route exact path="/register" component={Register}>
              {/* <Mentions /> */}
              <Register/>
          </Route>
      </Switch>
    </>
  )
}

export default Index
