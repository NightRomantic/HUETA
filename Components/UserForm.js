import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import * as Yup from 'yup';


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const Wizard = ({ children, initialValues, onSubmit }) => {
  const isDisabled = false;
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
      next();
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
                variant="primary"
                disabled={formik.isSubmitting}
                type="button"
                style={{marginRight: '15px'}}
              >
                Back
              </Button>
            )}
            <div>
              <Button
                disabled={formik.isSubmitting} type="submit"
                variant="primary"
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
        await sleep(3000).then(() => console.log('Wizard submit', values))
      }
    >
      <WizardStep
        onSubmit={async values =>
          await sleep(3000).then(() => console.log('Step 1 submit'))
        }
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
            as={FormControl}
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
            as={FormControl}
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
            as={FormControl}
            id="confirmPass"
            name="confirmPass"
            placeholder="Confirm password"
            type="password"
          />
          <ErrorMessage className="error" component="div" name="confirmPass" />
        </div>
      </WizardStep>
      <WizardStep
        onSubmit={async values =>
          await sleep(3000).then(() => console.log('Step 2 submit'))
        }
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="birthday">Birthday</label>
          <Field
            as={FormControl}
            id="birthday"
            name="birthday"
            type="date"
          />
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
            as={FormControl}
            id="phone"
            name="phone"
            placeholder="Phone"
            type="text"
          />
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
            as={FormControl}
            id="country"
            name="country"
            placeholder="Country"
            type="text"
          />
        </div>
      </WizardStep>
      <WizardStep
        onSubmit={async values =>
          await sleep(3000).then(() => console.log('Step 3 submit'))
        }
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="avatar">Avatar</label>
          <Field
            as={FormControl}
            id="avatar"
            name="avatar"
            type="text"
            placeholder="Avatar"
          />
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
            as={FormControl}
            id="status"
            name="status"
            placeholder="Status"
            type="text"
          />
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
            as={FormControl}
            id="about"
            name="about"
            placeholder="About"
            type="text"
          />
        </div>
      </WizardStep>
    </Wizard>
  </div>
);

export default UserForm;