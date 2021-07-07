import React, { Component } from 'react';
import First from './First';
import Second from './Second';
import Third from './Third';
import Success from './Success';

export class UserForm extends Component {
  state = {
    step: 1,
    email: null,
    password: null,
    confirmPass: null,
    birthday: null,
    phone: null,
    country: null,
    avatar: null,
    status: null,
    about: null
  };

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  // Handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { step } = this.state;
    const { email, password, confirmPass, birthday, phone, country, avatar, status, about } = this.state;
    const values = { email, password, confirmPass, birthday, phone, country, avatar, status, about };

    switch (step) {
      case 1:
        return (
          <First
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <Second
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 3:
        return (
          <Third
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 4:
        return(
          <Success values={values} />
        )
      default:
        (console.log('This is a multi-step form built with React.'))
    }
  }
}

export default UserForm;