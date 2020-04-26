import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { doCreateUserWithEmailAndPassword } from "../firebase/FirebaseFunctions";
import { AuthContext } from "../firebase/Auth";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import SocialSignIn from "./SocialSignIn";
function SignUp() {
  const [message, setMessage] = useState(undefined);
  useEffect(() => {}, [message]);
  const [validated, setValidated] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const handleSignUp = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    e.preventDefault();
    const {
      first,
      last,
      city,
      state,
      zip,
      email,
      passwordOne,
      passwordTwo,
    } = e.target.elements;

    if (
      first.value.trim() === "" ||
      last.value.trim() === "" ||
      city.value.trim() === "" ||
      zip.value.trim() === "" ||
      state.value.trim() === "" ||
      email.value.trim() === ""
    ) {
      setMessage(generateAlert("All form fields are required", "warning"));
      return false;
    }
    if (
      passwordOne.value !== passwordTwo.value &&
      passwordOne.value.trim() !== ""
    ) {
      setMessage(generateAlert("Passwords do not match", "danger"));
      return false;
    }

    if (zip.value.length < 4 || zip.value.length > 6) {
      setMessage(generateAlert("Invalid Zip Code", "danger"));
      return false;
    }
    if (passwordOne.value.length < 8) {
      setMessage(
        generateAlert("Password must be at least 8 characters long.", "danger")
      );
      return false;
    }

    setValidated(true);

    try {
      await doCreateUserWithEmailAndPassword(email.value, passwordOne.value, {
        city: city.value,
        state: state.value,
        name: {
          first: first.value,
          last: last.value,
        },
        zip: zip.value,
      });
    } catch (error) {
      if (typeof error === "string") {
        setMessage(generateAlert(error, "danger"));
      } else {
        setMessage(
          generateAlert(
            error.message ? error.message : JSON.stringify(error),
            "danger"
          )
        );
      }
    }
  };

  if (currentUser) {
    return <Redirect to="/" />;
  }
  function generateAlert(message, variant) {
    return <Alert variant={variant}>{message}</Alert>;
  }

  return (
    <div>
      {message}
      <Card>
        <Card.Header>Sign Up</Card.Header>
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSignUp}>
            <Row>
              <Col>
                <Form.Label>First Name</Form.Label>
                <Form.Control placeholder="First name" required name="first" />
              </Col>
              <Col>
                <Form.Label>Last Name</Form.Label>
                <Form.Control placeholder="Last name" required name="last" />
              </Col>
            </Row>
            <Form.Row>
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="City"
                  required
                  name="city"
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid city.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom04">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="State"
                  required
                  name="state"
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid state.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom05">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Zip"
                  required
                  name="zip"
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid zip.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <hr></hr>
            <Row>
              <Col>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  placeholder="Email"
                  required
                  name="email"
                  type="email"
                  placeholder="Email"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  placeholder="Password"
                  id="passwordOne"
                  name="passwordOne"
                  type="password"
                />
              </Col>
              <Col>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  placeholder="Confirm Your Password"
                  name="passwordTwo"
                  type="password"
                  placeholder="Confirm Password"
                />
              </Col>
            </Row>
            <hr></hr>
            <Button id="submitButton" name="submitButton" type="submit">
              Sign Up
            </Button>
            <hr></hr>
            <SocialSignIn></SocialSignIn>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );

  //   return (
  //     <div>
  //       <h1>Sign up</h1>
  //       {pwMatch && <h4 className="error">{pwMatch}</h4>}
  //       <form onSubmit={handleSignUp}>
  //         <div className="form-group">
  //           <label>
  //             Name:
  //             <input
  //               className="form-control"
  //               required
  //               name="displayName"
  //               type="text"
  //               placeholder="Name"
  //             />
  //           </label>
  //         </div>
  //         <div className="form-group">
  //           <label>
  //             Email:
  //             <input
  //               className="form-control"
  //               required
  //               name="email"
  //               type="email"
  //               placeholder="Email"
  //             />
  //           </label>
  //         </div>
  //         <div className="form-group">
  //           <label>
  //             Password:
  //             <input
  //               className="form-control"
  //               id="passwordOne"
  //               name="passwordOne"
  //               type="password"
  //               placeholder="Password"
  //               required
  //             />
  //           </label>
  //         </div>
  //         <div className="form-group">
  //           <label>
  //             Confirm Password:
  //             <input
  //               className="form-control"
  //               name="passwordTwo"
  //               type="password"
  //               placeholder="Confirm Password"
  //               required
  //             />
  //           </label>
  //         </div>
  //         <button id="submitButton" name="submitButton" type="submit">
  //           Sign Up
  //         </button>
  //       </form>
  //       <br />
  //     </div>
  //   );
}

export default SignUp;
