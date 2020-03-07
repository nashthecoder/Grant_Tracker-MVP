import React, { Component } from 'react';
import './Login.scss'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "naijeria@email.com",
      password: "admin",
      error: false
    }
  }

  async login(e) {
    e.preventDefault();
    try {
      const response = await fetch('/users/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        })
      });
      if (response.ok) {
        const results = await response.json();
        localStorage.setItem("token", results.token, "user", results.admin);
        this.props.setUserView(results.admin)
      } else {
        this.setState({ error: true })
        throw new Error("Login unsuccessful")
      }
    } catch (err) {
      console.log(err)
    }
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    })
  }

  error() {
    return <p className="text-danger">Wrong username or password</p>
  }


  render() {
    return (
      <div className="wrapper">
        <form onSubmit={(e) => this.login(e)} className="login">
          <p className="title">Log in</p>
          <input type="email" placeholder="Email" name="email" value={this.state.email}
            onChange={(e) => this.handleChange(e)} />
          <i className="fa fa-user"></i>
          <input type="password" placeholder="Password" name="password" value={this.state.password}
            onChange={(e) => this.handleChange(e)} />
          <i className="fa fa-key"></i>
          {/* <a href="#">Forgot your password?</a> */}
          {this.state.error ? this.error() : null}
          <button>
            <i className="spinner"></i>
            <span className="state">Log in</span>
          </button>
        </form>


      </div>
    )
  }
}
