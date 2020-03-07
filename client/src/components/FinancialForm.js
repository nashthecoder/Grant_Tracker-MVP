import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export class FinancialForm extends Component {

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };
  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    // const { handleChange } = this.props;
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Financial Report" />
          <TextField
            hintText="Enter Budget Line"
            floatingLabelText="Budget Line"
            onChange={this.props.handleChange('budgetLine')}
            defaultValue={this.props.budgetLine}
          />
          <br />

          <TextField
            hintText="Enter Project Budget"
            floatingLabelText="Project Budget"
            onChange={this.props.handleChange('projectBudget')}
            defaultValue={this.props.projectBudget}
          />
          <br />
          <TextField
            hintText="Enter Forecast Amount"
            floatingLabelText="Forecast Amount"
            onChange={this.props.handleChange('forecastAmount')}
            defaultValue={this.props.forecastAmount}
          />
          <br />
          <TextField
            hintText="Enter Actual Amount"
            floatingLabelText="Actual Amount"
            onChange={this.props.handleChange('actualAmount')}
            defaultValue={this.props.actualAmount}
          />
          {/* <br/>
                <TextField 
                hintText="Enter Totals"
                floatingLabeltext="Totals"
                onChange={handleChange('totals')}
                defaultValue={values.totals} */}

          <br />
          <RaisedButton label="Continue"
            primary={true}
            style={styles.button}
            onClick={e => { this.props.postFinancial(); this.continue(e) }}
          />
          <br />
          <RaisedButton label="Back"
            primary={false}
            style={styles.button}
            onClick={this.back}
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

export default FinancialForm
