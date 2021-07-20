import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import * as Yup from 'yup';


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// Wizard is a single Formik instance whose children are each page of the
// multi-step form. The form is submitted on each forward transition (can only
// progress with valid input), whereas a backwards step is allowed with
// incomplete data. A snapshot of form state is used as initialValues after each
// transition. Each page has an optional submit handler, and the top-level
// submit is called when the final page is submitted.
const Wizard = ({ children, initialValues, onSubmit }) => {
  const [stepNumber, setStepNumber] = useState(0);
  const steps = React.Children.toArray(children);
  const [snapshot, setSnapshot] = useState(initialValues);

  const step = steps[stepNumber];
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  const next = values => {
    setSnapshot(values);
    setStepNumber(Math.min(stepNumber + 1, totalSteps - 1));
  };

  const previous = values => {
    setSnapshot(values);
    setStepNumber(Math.max(stepNumber - 1, 0));
  };

  const handleSubmit = async (values, bag) => {
    if (step.props.onSubmit) {
      await step.props.onSubmit(values, bag);
    }
    if (isLastStep) {
      return onSubmit(values, bag);
    } else {
      bag.setTouched({});
      next(values);
    }
  };

  return (
    <Formik
      initialValues={snapshot}
      onSubmit={handleSubmit}
      validationSchema={step.props.validationSchema}
    >
      {formik => (
        <Form style={{ width: "25%" }}>
          {step}
          <div style={{ display: 'flex', marginTop: '30px' }}>
            {stepNumber > 0 && (
              <Button
                onClick={() => previous(formik.values)}
                color="primary" variant="contained"
                type="button"
                style={{marginRight: '15px'}}
              >
                Back
              </Button>
            )}
            <div>
              <Button
                disabled={formik.isSubmitting} type="submit"
                color="primary" variant="contained"
              >
                {isLastStep ? 'Submit' : 'Next'}
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const WizardStep = ({ children }) => children;

const UserForm = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "460px",
    }}
  >
    <Wizard
      initialValues={{
        email: '',
        password: '',
        confirmPass: '',
        birthday: '',
        phone: '',
        country: '',
        avatar: '',
        status: '',
        about: '',
      }}
      onSubmit={async values =>
        sleep(300).then(() => console.log('Wizard submit', values))
      }
    >
      <WizardStep
        onSubmit={() => console.log('Step1 onSubmit')}
        validationSchema={Yup.object({
          email: Yup.string().email("Invalid email").required("Required"),
          password: Yup.string().min(7, "Too Shot!").required("Required!"),
          confirmPass: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Required!"),
        })}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="email">Email</label>
          <Field
            id="email"
            name="email"
            placeholder="Email"
            type="text"
          />
          <ErrorMessage className="error" component="div" name="email" />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "30px",
          }}
        >
          <label htmlFor="password">Password</label>
          <Field
            id="password"
            name="password"
            placeholder="Password"
            type="password"
          />
          <ErrorMessage className="error" component="div" name="password" />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "30px",
          }}
        >
          <label htmlFor="confirmPass">Confirm password</label>
          <Field
            id="confirmPass"
            name="confirmPass"
            placeholder="Confirm password"
            type="password"
          />
          <ErrorMessage className="error" component="div" name="confirmPass" />
        </div>
      </WizardStep>
      <WizardStep
        onSubmit={() => console.log('Step2 onSubmit')}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="birthday">Birthday</label>
          <Field
            id="birthday"
            name="birthday"
            type="date"
          />
          <ErrorMessage className="error" component="div" name="birthday" />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "30px",
          }}
        >
          <label htmlFor="phone">Phone</label>
          <Field
            id="phone"
            name="phone"
            placeholder="Phone"
            type="text"
          />
          <ErrorMessage className="error" component="div" name="phone" />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "30px",
          }}
        >
          <label htmlFor="country">Country</label>
          <Field
            id="country"
            name="country"
            placeholder="Country"
            type="text"
          />
          <ErrorMessage className="error" component="div" name="country" />
        </div>
      </WizardStep>
      <WizardStep
        onSubmit={() => console.log('Step3 onSubmit')}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="avatar">Avatar</label>
          <Field
            id="avatar"
            name="avatar"
            type="text"
            placeholder="Avatar"
          />
          <ErrorMessage className="error" component="div" name="avatar" />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "30px",
          }}
        >
          <label htmlFor="status">Status</label>
          <Field
            id="status"
            name="status"
            placeholder="Status"
            type="text"
          />
          <ErrorMessage className="error" component="div" name="status" />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "30px",
          }}
        >
          <label htmlFor="about">About</label>
          <Field
            id="about"
            name="about"
            placeholder="About"
            type="text"
          />
          <ErrorMessage className="error" component="div" name="about" />
        </div>
      </WizardStep>
    </Wizard>
  </div>
);

export default UserForm;