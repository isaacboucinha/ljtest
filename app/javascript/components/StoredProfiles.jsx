import React, { Component } from 'react';
import { Redirect } from 'react-router';

import { UserContext } from '../context/UserContext';

class StoredProfiles extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <UserContext.Consumer>
        {({ user }) => {
          if (!user) {
            return (<Redirect to="/"></Redirect>)
          } else {
            
          }
        }}
      </UserContext.Consumer>
    )
  }
}

export default StoredProfiles;
