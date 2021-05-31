import React, { Component } from "react";
import { Link } from "react-router-dom";

import { UserContext } from '../context/UserContext';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  renderDefaultHome() {
    return (
      <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
        <div className="jumbotron jumbotron-fluid bg-transparent">
          <div className="container secondary-color">
            <h1 className="display-4">Github Profiles</h1>
            <p className="lead">
              Search for, and compare, different Github profiles
            </p>
            <hr className="my-4" />
            <Link
              to="/login"
              className="btn btn-lg custom-button"
              role="button"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="btn btn-lg custom-button"
              role="button"
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
    )
  }

  renderLoggedHome() {
    return <h1>Logged In</h1>
  }

  render() {
    return (
      <UserContext.Consumer>
        {({ user }) => {
          if (!user) {
            return null
          } else if (Object.keys(user).length === 0) {
            return this.renderDefaultHome()
          } else {
            return this.renderLoggedHome()
          }
        }}
      </UserContext.Consumer>
    )
  }
}

export default Home;