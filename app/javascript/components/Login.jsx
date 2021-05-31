import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

import axios from 'axios'

import { UserContext } from '../context/UserContext';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: ''
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  };

  handleSubmit = (event, handleLogin) => {
    event.preventDefault()
    const { email, password } = this.state
    const csrf_token = document.querySelector('meta[name="csrf-token"]').content
    let user = {
      email: email,
      password: password
    }

    const url = location.protocol + '//' + location.hostname + ':3000/users/sign_in'
    axios.post(url, { user }, {
      withCredentials: true,
      headers: {
        'X-CSRF-TOKEN': csrf_token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => {
        if (response.data.user) {
          handleLogin(response.data)
        }

        // TODO gracefully accept an empty user response
      })
      .catch(error => {
        let errorDetail = error.response.data.error
        this.setState({
          error: errorDetail
        })
      })
  };

  handleErrors = () => {
    return <p>{this.state.error}</p>
  };

  renderLoginPage(email, password, loginUser) {
    return (
      <div className="login-form vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
        <div className="form">
          <div className="form-header">
            <h1>Log in</h1>
          </div>
          <form onSubmit={(e) => this.handleSubmit(e, loginUser)}>
            <div className="form-group">
              <div className="form-label">
                <label htmlFor="email-input">Email</label>
                <input
                  id="email-input"
                  placeholder="Enter your email"
                  type="text"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <div className="form-label">
                <label htmlFor="password-input">Password</label>
                <input
                  id="password-input"
                  placeholder="Type in your password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="form-button">
              <button className="btn btn-lg custom-button" placeholder="submit" type="submit">
                Log in
              </button>
            </div>
          </form>
          <div className="form-errors">
            {
              this.state.error && this.handleErrors()
            }
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { email, password } = this.state
    return (
      <UserContext.Consumer>
        {({ user, loginUser }) => {
          if (!user) {
            return null
          } else if (Object.keys(user).length == 0) {
            return this.renderLoginPage(email, password, loginUser)
          } else {
            return (<Redirect to="/" />)
          }
        }}
      </UserContext.Consumer>
    );
  }
}

export default Login;
