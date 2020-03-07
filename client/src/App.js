import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import UserForm from './components/UserForm';
import Login from './components/Login';
import AdminView from './components/AdminView'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userOrAdmin: null
    }
  }

  async componentDidMount() {
    const adminStatus = localStorage.getItem("user")
    this.setState({
      userOrAdmin: adminStatus ? parseInt(adminStatus) : null
    })
  }


  setUserView(data) {
    this.setState({ userOrAdmin: data });
    localStorage.setItem("user", this.state.userOrAdmin);
  }

  displayForms() {
    if (this.state.userOrAdmin === null) {
      return <Login componentDidMount={(userType) => this.componentDidMount(userType)} userOrAdmin={this.state.userOrAdmin} setUserView={(data) => this.setUserView(data)} />;
    } else if (this.state.userOrAdmin === 1 && localStorage.getItem("token")) {
      // return <div><OrgForm /> <ViewOrgs /></div>;
      return <div><AdminView /></div>;
    } else if (this.state.userOrAdmin === 0 && localStorage.getItem("token")) {
      return <UserForm />;
    }
  }

  render() {


    return (

      <div className="App">
        <h1>Grant Tracker</h1>
        {this.displayForms()}
      </div>

    );
  }

}
