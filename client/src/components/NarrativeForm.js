import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export class NarrativeForm extends Component {

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  }


  render() {
    // const { handleChange } = this.props;
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Narrative Report" />
          <TextField
            hintText="Enter Date XXXX - XX - XX"
            floatingLabelText="Report Period"
            name="reportPeriod"
            onChange={this.props.handleChange('reportPeriod')}
            defaultValue={this.props.reportPeriod}
          />
          <br />
          <TextField
            hintText="Enter Project Summary"
            floatingLabelText=" Project Summary"
            name="projectSummary"
            onChange={this.props.handleChange('projectSummary')}
            defaultValue={this.props.projectSummary}
          />
          <br />
          <TextField
            hintText="Enter Task Completed"
            floatingLabelText="Task Completed"
            name="taskCompleted"
            onChange={this.props.handleChange('taskCompleted')}
            defaultValue={this.props.taskCompleted}
          />
          <br />
          <TextField
            hintText="Enter Task Pending"
            floatingLabelText="Task Pending"
            name="taskPending"
            onChange={this.props.handleChange('taskPending')}
            defaultValue={this.props.taskPending}
          />
          <br />
          <TextField
            hintText="Enter Task Delayed"
            floatingLabelText="TasksDelayed"
            name="taskDelayed"
            onChange={this.props.handleChange('taskDelayed')}
            defaultValue={this.props.taskDelayed}
          />
          <br />
          <TextField
            hintText="Enter Risks"
            floatingLabelText="Risks"
            name="risks"
            onChange={this.props.handleChange('risks')}
            defaultValue={this.props.risks}
          />
          <br />
          <TextField
            hintText="Enter Issues"
            floatingLabelText="Issues"
            name="issues"
            onChange={this.props.handleChange('issues')}
            defaultValue={this.props.issues}
          />
          <br />
          <RaisedButton label="Continue"
            primary={true}
            style={styles.button}
            onClick={(e) => { this.props.postNarrative(); this.continue(e); }}
          />
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

export default NarrativeForm;
