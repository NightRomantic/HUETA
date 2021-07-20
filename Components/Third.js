import React, { Component } from "react";
import { Formik } from "formik";
import { Form, Button, Row } from "react-bootstrap";

export default class Third extends Component {
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
            avatar: info.avatar,
            status: info.status,
            about: info.about,
          }}
        >
          {({ handleSubmit, handleChange, values }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group controlId="formikAvatar">
                  <Form.Label>Avatar</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Choose your avatar"
                    name="avatar"
                    value={values.avatar}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group
                  controlId="formikStatus"
                  style={{ marginTop: "20px" }}
                >
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Tell us your current status"
                    name="status"
                    value={values.status}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group
                  controlId="formikAbout"
                  style={{ margin: "20px 0" }}
                >
                  <Form.Label>About</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Tell us about yourself"
                    name="about"
                    value={values.about}
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
