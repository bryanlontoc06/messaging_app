
import Home from '../Home'
import DMs from '../DMs'
import Mentions from '../Mentions'
import You from '../You'

const Index = (props) => {
  const {Switch, Route, useLocation} = props;
  return (
    <>
      <Switch>
          <Route exact path="/" component={Home}>
              <Home useLocation={useLocation}/>
          </Route>
          <Route exact path="/dm" component={DMs}>
              <DMs useLocation={useLocation}/>
          </Route>
          <Route exact path="/mentions" component={Mentions}>
              <Mentions />
          </Route>
          <Route exact path="/profile" component={You}>
              <You />
          </Route>
      </Switch>
    </>
  )
}

export default Index
