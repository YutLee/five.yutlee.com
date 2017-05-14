import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import '../../styles/common.css'
import '../../styles/nav.css'

const ActiveLink = ({ children, to, active }) => (
  <Route path={to} exact={active} children={({ match }) => (
    <Link to={to} className={match ? 'active item cell' : 'item cell'}>{children}</Link>
  )}/>
)

export default class Nav extends Component {
  render() {
    return (
      <nav className="m-nav flex">
        <ActiveLink to="/" active={true}><i className="icon icon-chose"></i><p>精选</p></ActiveLink>
        <ActiveLink to="/discovery"><i className="icon icon-discovery"></i><p>发现</p></ActiveLink>
        <ActiveLink to="/focus"><i className="icon icon-focus"></i><p>关注</p></ActiveLink>
        <ActiveLink to="/mine"><i className="icon icon-mine"></i><p>我的</p></ActiveLink>
      </nav>
    )
  }
}
