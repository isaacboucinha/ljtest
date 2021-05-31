import React, { Component } from 'react';
import axios from 'axios'

import Routes from '../routes/App'

import {UserContext} from '../context/UserContext';

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
    axios.get('http://localhost:3000/logged_in', {
      withCredentials: true, 
      headers: {
      'X-CSRF-TOKEN': csrf_token,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }})   
    .then(response => {
        if (response.data.logged_in) {
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
      user: data.user
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
