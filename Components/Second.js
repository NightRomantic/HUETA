import React, { Component } from "react";
import { Formik, Form, Field } from "formik";


export default class Second extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };
  render() {
    const { values, handleChange } = this.props;
    return (
      <div>
        
      </div>
    );
  }
}
