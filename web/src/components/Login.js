import React from 'react'
import { Redirect } from 'react-router-dom'
import Auth from './common/Auth'

export default class Login extends React.Component {

  state = {
    redirectToReferrer: false
  }

  login = () => {
    Auth.authenticate(() => {
      this.setState({ redirectToReferrer: true })
    })
  }

  render() {
    const { from } = {from: {pathname: '/'}}
    const { redirectToReferrer } = this.state

    if(redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }

    return (
      <div>
        <p>请登录 {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}
