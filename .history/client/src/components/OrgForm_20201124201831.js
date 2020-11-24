import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

//linked to POST User
export default class OrgForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgName: "",
      projectName: "",
      projectCode: "",
      region: "",
      city: "",
      grantAmount: "",
      grantPeriod: "",
      admin: false,
      email: ""
    }
  }
  // post request to add a user 

  handleChange = input => e => {
    this.setState({ [input]: e.target.value, });
  }


  async addUser() {
    try {
      const response = await fetch('/users/newuser', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          org_name: this.state.orgName,
          project_name: this.state.projectName,
          project_code: this.state.projectCode,
          region: this.state.region,
          city: this.state.city,
          grant_amount: this.state.grantAmount,
          grant_period: this.state.grantPeriod,
          admin: this.state.admin,
          email: this.state.email
        })
      }); if (response.ok) {
        await response.json();
        alert('A new organisation was added!')
      } else throw new Error("New user not added")
    } catch (err) {
      console.log(err)
    }


  }

  render() {

    return (
      <MuiThemeProvider>
        <React.Fragment>
          <div>
            <TextField
              hintText="Insert Organisation Name"
              floatingLabelText="Organisation Name"
              onChange={this.handleChange('orgName')}
              defaultValue={this.state.orgName}
            />
            <br />
            <TextField
              hintText="Insert Project Name"
              floatingLabelText="Project Name"
              onChange={this.handleChange('projectName')}
              defaultValue={this.state.projectName}
            />
            <br />
            <TextField
              hintText="Insert Project Code"
              floatingLabelText="Project Code"
              onChange={this.handleChange('projectCode')}
              defaultValue={this.state.projectCode}
            />
            <br />
            <TextField
              hintText="Insert Region"
              floatingLabelText="Region"
              onChange={this.handleChange('region')}
              defaultValue={this.state.region}
            />
            <br />
            <TextField
              hintText="Insert City"
              floatingLabelText="City"
              onChange={this.handleChange('city')}
              defaultValue={this.state.city}
            />
            <br />
            <TextField
              hintText="Insert Grant Amount"
              floatingLabelText="Grant Amount"
              onChange={this.handleChange('grantAmount')}
              defaultValue={this.state.grantAmount}
            />
            <br />
            <TextField
              hintText="Insert Grant Period"
              floatingLabelText="Grant Period"
              onChange={this.handleChange('grantPeriod')}
              defaultValue={this.state.grantPeriod}
            />
            <br />
            <br />

            {/* <FormControl>
              <InputLabel id="admin">Admin?</InputLabel>
              <Select
                labelId="admin"
                className="text-muted"
                value={this.state.admin}
                onChange={this.handleChange('admin')}
              >
                <MenuItem value={false}>No</MenuItem>
                <MenuItem value={true}>Yes</MenuItem>
              </Select>
            </FormControl> */}

{/*             <br />
            <TextField
              hintText="Insert Email"
              floatingLabelText="Insert Email"
              onChange={this.handleChange('email')}
              defaultValue={this.state.email}
            />
            <br /> */}

            <RaisedButton label="Create User"
              primary={true}
              style={styles.button}
              onClick={() => this.addUser()}
            />
          </div>
        </React.Fragment>
      </MuiThemeProvider >
    )
  }
}

const styles = {
  button: {
    margin: 15
  }
}

