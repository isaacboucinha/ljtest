import React, { Component } from "react";
import { Link } from "react-router-dom";

import axios from 'axios'

import { UserContext } from '../context/UserContext';

import ProfileListEntry from './ProfileListEntry'

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      blurred: false,
      profile: {}
    }
  }

  handleChange = (event) => {
    const value = event.target.value
    this.setState({
      searchTerm: value
    })
  };

  submitSearch = (event) => {
    event.preventDefault()
    this.setState({
      blurred: true
    })

    axios
      .get('https://api.github.com/users/' + this.state.searchTerm)
      .then(response => {
        if (response.status === 200) {
          this.setState({
            profile: response.data,
            blurred: false
          })
        }
      })
      .catch((error) => {
        this.setState({
          profile: null,
          blurred: false
        })
      })
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

  renderLoggedHome(searchTerm, blurred) {
    const { profile } = this.state
    return (
      <div className={`vw-100 vh-100 primary-color d-flex align-items-center justify-content-center
                      ${blurred ? "blurred" : ""}`}>
        <div className="jumbotron jumbotron-fluid bg-transparent">
          <div className="container secondary-color">
            <h1 className="display-4">Search for a profile</h1>
            <div className="search-bar">
              <input placeholder="Enter the name of a user on Github" value={searchTerm} onChange={this.handleChange}/>
            </div>
            <div className="search-button">
              <button className="btn btn-lg custom-button" 
                      placeholder="go" type="submit" 
                      onClick={this.submitSearch}
                      autoFocus>
                Go
              </button>
            </div>
            <div className="search-result">
            {
              profile === null && (
                <p className="search-no-results">
                  Looks like no matches were found. Try again?
                </p>
              )
            }
            {
              profile && Object.keys(profile).length > 0 && (
                <>
                  <p className="search-results-found">
                    Found a match:
                  </p>
                  <ProfileListEntry profile={profile} />
                </>
              )
            }
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { searchTerm, blurred } = this.state
    return (
      <UserContext.Consumer>
        {({ user }) => {
          if (!user) {
            return null
          } else if (Object.keys(user).length === 0) {
            return this.renderDefaultHome()
          } else {
            return this.renderLoggedHome(searchTerm, blurred)
          }
        }}
      </UserContext.Consumer>
    )
  }
}

export default Home;