import React, { useContext, useEffect, useState } from "react";
import SocialSignIn from "./SocialSignIn";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../firebase/Auth";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import {
  doSignInWithEmailAndPassword,
  doPasswordReset,
} from "../firebase/FirebaseFunctions";

function SignIn() {
  const [message, setMessage] = useState(undefined);
  useEffect(() => {}, [message]);
  const { currentUser } = useContext(AuthContext);
  const handleLogin = async (event) => {
    event.preventDefault();
    let { email, password } = event.target.elements;

    try {
      await doSignInWithEmailAndPassword(email.value, password.value);
    } catch (error) {
      if (typeof error === "string") {
        setMessage(generateAlert(error, "danger"));
      } else {
        setMessage(generateAlert(error.message, "danger"));
      }
    }
  };

  const passwordReset = (event) => {
    event.preventDefault();
    let email = document.getElementById("email").value;
    if (email) {
      doPasswordReset(email);
      setMessage(generateAlert("Password reset email was sent", "info"));
    } else {
      setMessage(
        generateAlert(
          "Please enter an email address below before you click the forgot password link",
          "warning"
        )
      );
    }
  };
  if (currentUser) {
    return <Redirect to="/home" />;
  }

  function generateAlert(message, variant) {
    return <Alert variant={variant}>{message}</Alert>;
  }
  return (
    <div className="login-form">
      {message}
      <Card>
        <Card.Header>Sign In</Card.Header>
        <Card.Body>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                id="email"
                name="email"
                placeholder="Enter email"
                required
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button
              className="forgotPassword"
              onClick={passwordReset}
              variant="secondary"
            >
              Forgot Password
            </Button>
          </Form>
          <hr></hr>
          <SocialSignIn></SocialSignIn>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SignIn;
