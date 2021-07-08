import React, { Component } from "react";
import { Formik } from "formik";
import { Form, Button, Row } from "react-bootstrap";

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
    this.props.nextStep();
  };
  render() {
    const { values } = this.props;
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "300px",
        }}
      >
        <Formik
          validationSchema={SignupSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={this.continue}
          initialValues={{
            email: values.email,
            password: values.password,
            confirmPass: values.confirmPass,
          }}
        >
          {({ handleSubmit, handleChange, values, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group controlId="validationFormikEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  controlId="validationFormikPass"
                  style={{ marginTop: "20px" }}
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  controlId="validationFormikConfirmPass"
                  style={{ margin: "20px 0" }}
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    name="confirmPass"
                    value={values.confirmPass}
                    onChange={handleChange}
                    isInvalid={!!errors.confirmPass}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPass}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Button type="submit">Submit form</Button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}
