import React, { Component } from 'react';
import OrgForm from './OrgForm';
import ViewOrgs from './ViewOrgs';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

export default class AdminView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: true
    }
  }

  handleClick() {
    this.setState({
      form: !this.state.form
    })
  }

  render() {
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Grantee Organisation Details" />
          <div className="container p-2"></div>


          <RaisedButton label="Add a new Org"
            primary={true}
            style={styles.button}
            onClick={() => this.handleClick()}
          />

          <RaisedButton label="View org Details"
            primary={true}
            style={styles.button}
            onClick={() => this.handleClick()}
          />

          {/* <button onClick={() => this.handleClick()}>Org Form</button>
        <button onClick={() => this.handleClick()}>Org Details</button> */}

          {this.state.form ? <ViewOrgs /> : <OrgForm />}

        </React.Fragment>
      </MuiThemeProvider>

    )
  }
}

const styles = {
  button: {
    margin: 15
  }
}