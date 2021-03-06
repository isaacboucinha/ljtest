import React, { Component } from 'react';
import axios from 'axios'

import Routes from '../routes/App'

import {UserContext} from '../context/UserContext';

import { configs } from '../constants'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoggedIn: false,
      user: null
     };
  }

  componentDidMount() {
    this.loginStatus()
  }

  loginStatus = () => {
    const csrf_token = document.querySelector('meta[name="csrf-token"]').content
    const url = configs.urls.API_URL + '/logged_in'
    axios.get(url, {
      withCredentials: true, 
      headers: {
      'X-CSRF-TOKEN': csrf_token,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }})   
    .then(response => {
        if (response.data) {
          this.handleLogin(response.data)
        } else {
          this.handleLogout()
        }
      })
    .catch(error => console.log('api errors:', error))
  }

  redirectHome = () => {
    this.props.history.push('/')
  }

  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data
    })
  }
  
  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      user: {}
    })
  }

  render() {
    const userContext = {
      user: this.state.user,
      loginUser: this.handleLogin,
      logoutUser: this.handleLogout
    }

    return (
      <UserContext.Provider value={userContext}>
        <Routes />
      </UserContext.Provider>

    )
  }
}
export default App;
