import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

import axios from 'axios'

import { UserContext } from '../context/UserContext';


class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      errors: ''
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
    const { username, email, password, password_confirmation } = this.state
    const csrf_token = document.querySelector('meta[name="csrf-token"]').content
    let user = {
      username: username,
      email: email,
      password: password,
      password_confirmation: password_confirmation
    }

    axios.post('http://localhost:3000/users', { user }, { 
      withCredentials: true,
      headers: { 
        'X-CSRF-TOKEN': csrf_token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => {
        if (response.status === 200) {
          handleLogin({user: response.data})
        } else {
          this.setState({
            errors: response.data.errors
          })
        }
      })
      .catch(error => {
        let errorDetail = error.response.data.errors[0].detail
        this.setState({
          errors: errorDetail
        })
      })
  };


  handleErrors = () => {
    return Object.keys(this.state.errors).map((field) => {
      return (
        <div>
          Errors on field "{field}"
          {
            this.state.errors[field].map((error, index) => {
              return <li key={index}>{error}</li>
            })
          }
        </div>
      )
    })
  }

  renderSignupPage(username, email, password, password_confirmation, loginUser) {
    return (
      <div className="signup-form vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
        <div className="form">
          <div className="form-header">
            <h1>Sign Up</h1>
          </div>
          <form onSubmit={(e) => this.handleSubmit(e, loginUser)}>
            <div className="form-group">
              <div className="form-label">
                <label htmlFor="username-input">Username</label>
                <input
                  id="username-input"
                  placeholder="Enter a username"
                  type="text"
                  name="username"
                  value={username}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-note">
                <small id="username-help" className="form-text text-muted">Pick a good one</small>
              </div>
            </div>

            <div className="form-group">
              <div className="form-label">
                <label htmlFor="email-input">Email</label>
                <input
                  id="email-input"
                  placeholder="Enter an email"
                  type="text"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-note">
                <small id="email-help" className="form-text text-muted">This one needs to be unique</small>
              </div>
            </div>

            <div className="form-group">
              <div className="form-label">
                <label htmlFor="password-input">Password</label>
                <input
                  id="password-input"
                  placeholder="Choose a password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-note">
                <small id="password-help" className="form-text text-muted">Make sure it's at least 6 characters long</small>
              </div>
            </div>

            <div className="form-group">
              <div className="form-label">
                <label htmlFor="password-confirmation-input">Password Confirmation</label>
                <input
                  id="password-confirmation-input"
                  placeholder="Retype password"
                  type="password"
                  name="password_confirmation"
                  value={password_confirmation}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-note">
                <small id="password-confirmation-help" className="form-text text-muted">Make sure it matches what you previously typed</small>
              </div>
            </div>

            <div className="form-button">
              <button className="btn btn-lg custom-button" placeholder="submit" type="submit">
                Sign Up
              </button>
            </div>
          </form>

          <div className="form-errors">
            {
              this.state.errors && this.handleErrors()
            }
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { username, email, password, password_confirmation } = this.state
    return (
      <UserContext.Consumer>
        {({ user, loginUser }) => {
          if (!user) {
            return null
          } else if (Object.keys(user).length === 0) {
            return this.renderSignupPage(username, email, password, password_confirmation, loginUser)
          } else { 
            return (<Redirect to="/" />)
          }
        }}
      </UserContext.Consumer>
    );
  }
}

export default Signup;
