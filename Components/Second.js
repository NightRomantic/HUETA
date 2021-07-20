import React, { Component } from "react";
import { Formik } from "formik";
import { Form, Button, Row } from "react-bootstrap";

export default class Second extends Component {
  continue = (e) => {
    this.props.nextStep();
  };
  render() {
    const { info } = this.props;
    console.log(info);
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
          onSubmit={this.continue}
          initialValues={{
            birthday: info.birthday,
            phone: info.phone,
            country: info.country,
          }}
        >
          {({ handleSubmit, handleChange, values }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group controlId="formikBirthday">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Enter your birthday date"
                    name="birthday"
                    value={values.birthday}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group
                  controlId="formikPhone"
                  style={{ marginTop: "20px" }}
                >
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="test"
                    placeholder="Phone"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group
                  controlId="formikCountry"
                  style={{ margin: "20px 0" }}
                >
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Country"
                    name="country"
                    value={values.country}
                    onChange={handleChange}
                  />
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
