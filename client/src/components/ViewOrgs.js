import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class ViewOrgs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      organisations: null
    }
  }
  async getOrgs() {
    try {
      const response = await fetch(`/users`)
      if (response.ok) {
        const jsonResponse = await response.json();
        this.setState({ organisations: jsonResponse })
      }
    } catch (err) {
      console.log(err)
    }

  }

  viewOrgs() {
    return this.state.organisations.map((org, i) => {
      console.log(org);
      return (
        <div className="card w-100" key={i}>
          <div className="card-body">
            <h4 className="card-title">{org.org_name}</h4>

            <div className="bg-light  p-5 border">
              <h5 className="font-weight-bold">Org Info</h5>
              <div className="d-flex justify-content-around flex-wrap">
                <p className="card-text p-2"><span style={{ fontWeight: 700 }}>Project name:</span> {org.project_name}</p>
                <p className="card-text p-2"><span style={{ fontWeight: 700 }}>Region:</span> {org.region}</p>
                <p className="card-text p-2"><span style={{ fontWeight: 700 }}>City:</span> {org.city}</p>
                <p className="card-text p-2"><span style={{ fontWeight: 700 }}>Grant amount:</span> {org.grant_amount}</p>
                <p className="card-text p-2"><span style={{ fontWeight: 700 }}>Grant period:</span> {org.grant_period}</p>
              </div>
              {/* <p className="card-text"><span style={{ fontWeight: 700 }}>Project description:</span> {org.project_summary}</p> */}
            </div>

            <div className="p-5 border">
              <h5 className="font-weight-bold">Org Narrative</h5>
              <div className="d-flex justify-content-around flex-wrap">
                <p className="card-text p-2"><span style={{ fontWeight: 700 }}>Report period:</span> {org.report_period}</p>
                <p className="card-text p-2"><span style={{ fontWeight: 700 }}>Task completed:</span> {org.task_completed}</p>
                <p className="card-text p-2"><span style={{ fontWeight: 700 }}>Task pending:</span> {org.task_pending}</p>
                <p className="card-text p-2"><span style={{ fontWeight: 700 }}>Task delayed:</span> {org.task_delayed}</p>
                <p className="card-text p-2"><span style={{ fontWeight: 700 }}>Risks:</span> {org.risks}</p>
                <p className="card-text p-2"><span style={{ fontWeight: 700 }}>Issues:</span> {org.issues}</p>
              </div>
              <p className="card-text"><span style={{ fontWeight: 700 }}>Project description:</span> {org.project_summary}</p>
            </div>

            <div className="bg-light p-5 border">
              <h5 className="font-weight-bold">Org Financial</h5>
              <div className="d-flex justify-content-around flex-wrap">
                <p className="card-text p-2"><span style={{ fontWeight: 700 }}>Budget line:</span> {org.budget_line}</p>
                <p className="card-text p-2"><span style={{ fontWeight: 700 }}>Project budget:</span> {org.project_budget}</p>
                <p className="card-text p-2"><span style={{ fontWeight: 700 }}>Forecast amount:</span> {org.forecast_amount}</p>
                <p className="card-text p-2"><span style={{ fontWeight: 700 }}>Actual amount:</span> {org.actual_amount}</p>
              </div>
            </div>

          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="container p-5 bg-light mb-5">
        <h3>Organisation Details</h3>

        <MuiThemeProvider>
          <RaisedButton label="Get all organisation info"
            primary={true}
            style={styles.button}
            onClick={() => this.getOrgs()}
          />
        </MuiThemeProvider>

        <div className="list-group mt-5">{this.state.organisations ? this.viewOrgs() : null}</div>
      </div>
    )
  }
}

const styles = {
  button: {
    margin: 15
  }
}