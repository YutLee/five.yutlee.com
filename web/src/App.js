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
// import loadAbout from 'bundle-loader?lazy!./components/About'

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
    // About(() => {})
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/discovery" component={Discovery} />
          <Route path="/focus" component={Focus} />
          <Route path="/mine" component={Mine} />
          <Nav/>
        </div>
      </BrowserRouter>
    );
  }
}
