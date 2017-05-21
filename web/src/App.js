import React from 'react'
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom'
import Bundle from './Bundle'
import Nav from './components/common/Nav'
import loadHome from 'bundle-loader?lazy!./components/Home'
import loadDiscovery from 'bundle-loader?lazy!./components/Discovery'
import loadFocus from 'bundle-loader?lazy!./components/Focus'
import loadMine from 'bundle-loader?lazy!./components/Mine'
import loadLogin from 'bundle-loader?lazy!./components/Login'
// import loadAbout from 'bundle-loader?lazy!./components/About'
import PrivateRoute from './components/common/PrivateRoute'

const Home = () => (
  <Bundle load={loadHome}>
    {(Home) => <Home/>}
  </Bundle>
)
const Discovery = () => (
  <Bundle load={loadDiscovery}>
    {(Discovery) => <Discovery/>}
  </Bundle>
)
const Focus = () => (
  <Bundle load={loadFocus}>
    {(Focus) => <Focus/>}
  </Bundle>
)
const Mine = () => (
  <Bundle load={loadMine}>
    {(Mine) => <Mine/>}
  </Bundle>
)
const Login = () => (
  <Bundle load={loadLogin}>
    {(Login) => <Login/>}
  </Bundle>
)

// const About = () => (
//   <Bundle load={loadAbout}>
//     {(About) => <About/>}
//   </Bundle>
// )

export default class App extends React.Component {
  componentDidMount() {
    // preloads the rest
    Home(() => {})
    Discovery(() => {})
    Focus(() => {})
    Mine(() => {})
    Login(() => {})
    // About(() => {})
  }

  render() {
    return (
      <BrowserRouter history={history}>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/discovery" component={Discovery} />
          <Route path="/focus" component={Focus} />
          <PrivateRoute path="/mine" component={Mine} />
          <Route path="/login" component={Login} />
          <Nav/>
        </div>
      </BrowserRouter>
    );
  }
}
