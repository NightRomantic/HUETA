import React, { Component } from "react";
import { Formik, Form, Field, yupToFormErrors } from "formik";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(7, "Too Shot!").required("Required!"),
  confirmPass: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required!"),
});

export default class First extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };
  render() {
    const { values, handleChange } = this.props;
    return (
      <div>
        <Formik
          validationSchema={schema}
          onSubmit
        >
          
        </Formik>
      </div>
    );
  }
}
