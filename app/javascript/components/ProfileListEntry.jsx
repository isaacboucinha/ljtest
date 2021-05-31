import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

import axios from 'axios'

import { UserContext } from '../context/UserContext';

import { configs } from '../constants'

class ProfileListEntry extends Component {
  constructor(props) {
    super(props);
  }

  handleSubscription() {

  }

  render() {
    return (
      <UserContext.Consumer>
        {({ user }) => {
          return (
            <div className="profile-simple-container">
              <div className="avatar-container">
                <img src={this.props.profile.avatar_url}></img>
              </div>
              <div className="user-info-container">
                <small>Username: {this.props.profile.name}</small>
                <small>Followers: {this.props.profile.followers}</small>
                <small>Following: {this.props.profile.following}</small>
              </div>
              <div className="actions-container">
                <input type="checkbox"></input>
              </div>
            </div>
          )
        }}
      </UserContext.Consumer>
    );
  }
}

export default ProfileListEntry;
