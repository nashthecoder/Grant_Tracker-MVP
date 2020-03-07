import React, { Component } from 'react';
//import OrgForm from './OrgForm';
import NarrativeForm from './NarrativeForm.js';
import FinancialForm from './FinancialForm.js';
import Success from './Success.js';

export default class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      reportPeriod: "",
      projectSummary: "",
      taskCompleted: "",
      taskPending: "",
      taskDelayed: "",
      risks: "",
      issues: "",
      budgetLine: "",
      projectBudget: "",
      forecastAmount: "",
      actualAmount: ""
    };
  }

  //Proceed to the next step
  nextStep = () => {
    this.setState({
      step: this.state.step + 1
    });
  }

  //Go back to the previous step
  prevStep = () => {
    this.setState({
      step: this.state.step - 1
    });
  }

  //Handle fields change
  handleChange = input => (e) => {
    this.setState({ [input]: e.target.value });
  }

  async postNarrative() {
    try {
      const response = await fetch('/users/narrative', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          report_period: this.state.reportPeriod,
          project_summary: this.state.projectSummary,
          task_completed: this.state.taskCompleted,
          task_delayed: this.state.taskDelayed,
          task_pending: this.state.taskPending,
          risks: this.state.risks,
          issues: this.state.issues
        })
      });
      if (response.ok) {
        await response.json();
      } else throw new Error("couldn't post")
    } catch (err) {
      console.log(err);
    };
  }

  async postFinancial() {
    try {
      const response = await fetch('/users/financial', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          budget_line: this.state.budgetLine,
          project_budget: this.state.projectBudget,
          forecast_amount: this.state.forecastAmount,
          actual_amount: this.state.actualAmount
        })
      });
      if (response.ok) {
        await response.json();
      } else throw new Error("couldn't post")
    } catch (err) {
      console.log(err);
    };
  }

  render() {



    switch (this.state.step) {
      case 1:
        return (
          < NarrativeForm
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            postNarrative={() => this.postNarrative()}
            reportPeriod={this.state.reportPeriod}
            projectSummary={this.state.projectSummary}
            taskCompleted={this.state.taskCompleted}
            taskPending={this.state.taskPending}
            taskDelayed={this.state.taskDelayed}
            risks={this.state.risks}
            issues={this.state.issues}
          />
        );
      case 2:
        return (
          < FinancialForm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            postFinancial={() => this.postFinancial()}
            budgetLine={this.state.budgetLine}
            projectBudget={this.state.projectBudget}
            forecastAmount={this.state.forecastAmount}
            actualAmount={this.state.actualAmount}
          />
        );
      case 3:
        return < Success />
      default: return
    }

  }
}

// export default UserForm
