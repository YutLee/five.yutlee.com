import React from 'react'
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom'
import Bundle from './Bundle'
import loadHome from 'bundle-loader?lazy!./components/Home'
import loadAbout from 'bundle-loader?lazy!./components/About'

const Home = () => (
  <Bundle load={loadHome}>
    {(Home) => <Home/>}
  </Bundle>
)

const About = () => (
  <Bundle load={loadAbout}>
    {(About) => <About/>}
  </Bundle>
)

export default class App extends React.Component {
  componentDidMount() {
    // preloads the rest
    Home(() => {})
    About(() => {})
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
        </div>
      </BrowserRouter>
    );
  }
}
